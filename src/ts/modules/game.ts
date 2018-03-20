import { Hand } from './hand';
import { Deck } from './deck';
import { Wallet } from './wallet';
import { Utility } from './utility';

import { ICard } from '../interfaces/card.interface';
import { IHand } from '../interfaces/hand.interface';
import { IDeck } from '../interfaces/deck.interface';
import { IWallet } from '../interfaces/wallet.interface';

export class Game {
	public $titleScreen = $('.title-screen');
	public $modal = $('.modal');
	public $modalBtn = $('.modal-btn');
	public $message = $('.message');
	public $deal = $('.deal');
	public $hit = $('.hit');
	public $stand = $('.stand');
	public $doubleDown = $('.double-down');
	public $split = $('.split');

	private gameDeck: IDeck;
	private dealerHand: IHand;
	private playerHand: IHand;
	private playerHand2: IHand | null;
	private playing: boolean;
	private splitInPlay: boolean;
	private currentHand: IHand;
	private wallet: IWallet;

	constructor() {
		this.$deal.on('click', () => { this.deal(); });
		this.$hit.on('click', () => { this.hit(); });
		this.$stand.on('click', () => { this.stand(); });
		this.$doubleDown.on('click', () => { this.doubleDown(); });
		this.$split.on('click', () => { this.split(); });

		this.init();
	}

	private adjustSpace() {
		if (this.splitInPlay) {
			this.dealerHand.$wrapper.css('grid-column', '2 / 4');
			this.playerHand.$wrapper.css('grid-column', '4 / 6');
			this.playerHand2.$wrapper.css('grid-column', '6 / 8');
		}
		else {
			this.dealerHand.$wrapper.css('grid-column', '2 / 5');
			this.playerHand.$wrapper.css('grid-column', '5 / 8');
		}
	}

	private deal(): void {
		this.prepareRound();
		this.dealHands();
		if (this.playing) {
			this.startRound();
		}
	}

	private dealOneCard(hand: IHand, special?: string): void {
		const card = this.gameDeck.draw();
		if (special === 'hole') {
			card.$card.attr('src', 'img/back-suits-red.svg');
		}
		else if (special === 'double-down') {
			card.$card.addClass('card-dd');
		}
		hand.addCard(card);
	}

	private dealHands(): void {
		this.dealOneCard(this.dealerHand, 'hole');
		this.dealOneCard(this.playerHand);
		this.dealOneCard(this.dealerHand);
		this.dealOneCard(this.playerHand);
		this.dealerHand.updateDisplay('?'); // conceal dealer total

		if (this.dealerHand.points === 21 && this.playerHand.points === 21) {
			this.dealerHand.updateDisplay('Blackjack');
			this.playerHand.updateDisplay('BLACKJACK, HOT DAMN!');
			this.outcome('push');
			this.endRound();
		}
		else if (this.dealerHand.points === 21) {
			this.dealerHand.updateDisplay('Blackjack');
			this.outcome('lose');
			this.endRound();
		}
		else if (this.playerHand.points === 21) {
			this.dealerHand.updateDisplay(this.dealerHand.points);
			this.playerHand.updateDisplay('BLACKJACK, HOT DAMN!');
			this.outcome('blackjack');
			this.endRound();
		}
		else {
			this.playing = true;
		}
	}

	private dealerTurn(): void {
		this.dealerHand.revealHole();
		while (this.dealerHand.points < 17) {
			this.dealOneCard(this.dealerHand);
		}
		this.dealerHand.updateDisplay(this.dealerHand.points);
	}

	private doubleDown(): void {
		this.wallet.doubleBet();
		// deal the player one more card and then move on to the dealer's turn
		this.dealOneCard(this.playerHand, 'double-down');
		this.stand();
	}

	private endRound(): void {
		this.playing = false;
		this.highlightOff(this.playerHand);
		this.dealerTurn();

		this.wallet.update();
		this.wallet.assessChange();
		this.wallet.openBetting();

		Utility.enable(this.$deal);
		Utility.disable(this.$hit, this.$stand);
	}

	private highlightOff(hand: IHand): void {
		hand.playing = false;
		hand.toggleHighlight();
	}

	private highlightOn(hand: IHand): void {
		hand.playing = true;
		hand.toggleHighlight();
	}

	private hit(): void {
		Utility.disable(this.$doubleDown, this.$split);
		if (!this.splitInPlay) {
			this.dealOneCard(this.playerHand);
			if (this.playerHand.points > 21) {
				this.outcome('lose');
			}
		}
		else {
			this.currentHand = Utility.getCurrentHand(this.playerHand, this.playerHand2);
			this.dealOneCard(this.currentHand);
			if (this.currentHand.points > 21) {
				this.currentHand.outcome = 'lose';
				this.splitGameplay();
			}
		}
	}

	private multipleOutcomes() {
		const message = Utility.assessSplit(this.playerHand, this.playerHand2);
		this.updateMessage(message);
		this.wallet.payout(this.playerHand.outcome);
		this.wallet.payout(this.playerHand2.outcome);
		this.endRound();
	}

	private init(): void {
		this.wallet = new Wallet();
		this.gameDeck = new Deck(3);
		this.dealerHand = new Hand('dealer');
		this.playerHand = new Hand('player', 1);
		this.splitInPlay = false;
		this.playing = false;
		this.wallet.openBetting();
	}

	private openModal(modalType: string): void {
		if (modalType === 'bankrupt') {
			this.$modal.removeClass('hide');
			this.$modalBtn.on('click', () => {
					this.$modal.addClass('hide');
					this.init();
				});
		}
		else if (modalType === 'help') {
			// future game feature: instructions available in help modal
		}
	}

	private outcome(result: string) {
		this.wallet.payout(result);
		if (result === 'blackjack' || result === 'win') {
			this.updateMessage('You win!');
		}
		else if (result === 'push') {
			this.updateMessage('Push');
		}
		else if (result === 'lose') {
			this.updateMessage('Dealer wins');
			if (this.wallet.money - this.wallet.bet <= 0) {
				this.openModal('bankrupt');
			}
		}
	}

	private prepareRound() {
		Utility.disable(this.$deal);
		this.$titleScreen.hide();
		this.wallet.closeBetting();
		this.wallet.resetChange();
		this.updateMessage('');
		this.resetSplit();
		this.playerHand.init();
		this.dealerHand.init();
	}

	private resetSplit(): void {
		if (this.playerHand2) {
			this.playerHand2.clear();
		}
		this.splitInPlay = false;
		this.adjustSpace();
	}

	private split(): void {
		Utility.disable(this.$split);
		this.splitInPlay = true;
		this.wallet.doubleBet();

		// start additional hand and move one card from hand 1 to hand 2
		this.playerHand2 = new Hand('player', 2);
		this.adjustSpace();
		let removedCard = this.playerHand.removeCard();
		this.playerHand2.addCard(removedCard);
		this.dealOneCard(this.playerHand);
		this.dealOneCard(this.playerHand2);
	}

	private splitGameplay(): void {
		if (this.currentHand === this.playerHand) {
			this.highlightOff(this.playerHand);
			this.highlightOn(this.playerHand2);
		}
		else if (this.currentHand === this.playerHand2) {
			this.highlightOff(this.playerHand2);
			this.playerHand.outcome = Utility.evaluateHand(this.playerHand, this.dealerHand);
			this.playerHand2.outcome = Utility.evaluateHand(this.playerHand2, this.dealerHand);
			this.multipleOutcomes();
		}
	}

	private stand(): void {
		if (!this.splitInPlay) {
			Utility.disable(this.$hit, this.$stand, this.$doubleDown, this.$split);
			this.highlightOff(this.playerHand);
			this.dealerTurn();
			this.playerHand.outcome = Utility.evaluateHand(this.playerHand, this.dealerHand);
			this.outcome(this.playerHand.outcome);
			this.endRound();
		}
		else {
			this.currentHand = Utility.getCurrentHand(this.playerHand, this.playerHand2);
			this.splitGameplay();
		}
	}

	private startRound(): void {
		this.highlightOn(this.playerHand);
		Utility.enable(this.$hit, this.$stand);
		if (this.wallet.money > this.wallet.bet * 2) {
			if (this.playerHand.canDoubleDown()) {
				Utility.enable(this.$doubleDown);
			}
			if (this.playerHand.canSplit()) {
				Utility.enable(this.$split);
			}
		}
	}

	private updateMessage(message: string): void {
		this.$message.text(message);
	}
}
