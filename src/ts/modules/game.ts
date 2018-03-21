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
	private playerHand1: IHand;
	private playerHand2: IHand;
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
			this.playerHand1.$wrapper.css('grid-column', '4 / 6');
			this.playerHand2.$wrapper.css('grid-column', '6 / 8');
		}
		else {
			this.dealerHand.$wrapper.css('grid-column', '2 / 5');
			this.playerHand1.$wrapper.css('grid-column', '5 / 8');
		}
	}

	private assessBlackjacks() {
		if (this.dealerHand.points === 21 && this.playerHand1.points === 21) {
			this.dealerBlackjack();
			this.playerHand1.updateDisplay('BLACKJACK, HOT DAMN!');
			this.outcome('push');
		}
		else if (this.dealerHand.points === 21) {
			this.dealerBlackjack();
			this.outcome('lose');
		}
		else if (this.playerHand1.points === 21) {
			this.dealerTurn(false);
			this.playerHand1.updateDisplay('BLACKJACK, HOT DAMN!');
			this.outcome('blackjack');
		}
	}

	private deal(): void {
		this.prepareRound();
		this.dealHands();
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
		this.dealOneCard(this.playerHand1);
		this.dealOneCard(this.dealerHand);
		this.dealOneCard(this.playerHand1);
		this.dealerHand.updateDisplay('?'); // conceal dealer total

		if (this.playerHand1.points === 21 || this.dealerHand.points === 21) {
			this.assessBlackjacks();
		}
		else {
			this.startRound();
		}
	}

	private dealerBlackjack(): void {
		this.dealerHand.revealHole();
		this.dealerHand.updateDisplay('Blackjack');
	}

	private dealerTurn(hasTurn: boolean): void {
		this.dealerHand.revealHole();
		while (hasTurn && this.dealerHand.points < 17) {
			this.dealOneCard(this.dealerHand);
		}
		this.dealerHand.updateDisplay(this.dealerHand.points);
	}

	private doubleDown(): void {
		this.wallet.doubleBet();
		// deal the player one more card and then move on to the dealer's turn
		this.dealOneCard(this.playerHand1, 'double-down');
		this.stand();
	}

	private endRound(): void {
		Utility.disable(this.$hit, this.$stand);
		Utility.enable(this.$deal);
		this.wallet.update();
		this.wallet.assessChange();
		this.wallet.openBetting();

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
		if (this.splitInPlay) {
			this.currentHand = Utility.getCurrentHand(this.playerHand1, this.playerHand2);
			this.dealOneCard(this.currentHand);
			if (this.currentHand.points > 21) {
				this.splitGameplay();
			}
		}
		else {
			this.dealOneCard(this.playerHand1);
			if (this.playerHand1.points > 21) {
				this.highlightOff(this.playerHand1);
				this.dealerTurn(false);
				this.outcome('lose');
			}
		}
	}

	private multipleOutcomes() {
		const message = Utility.assessSplit(this.playerHand1, this.playerHand2);
		this.wallet.bet /= 2;
		this.wallet.payout(this.playerHand1.outcome);
		this.wallet.payout(this.playerHand2.outcome);
		this.updateMessage(message);
		this.endRound();
	}

	private init(): void {
		this.wallet = new Wallet();
		this.gameDeck = new Deck(1);
		this.dealerHand = new Hand('dealer');
		this.playerHand1 = new Hand('player', 1);
		this.playerHand2 = new Hand('player', 2);
		this.splitInPlay = false;
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
		this.endRound();
	}

	private prepareRound() {
		Utility.disable(this.$deal);
		this.$titleScreen.hide();
		this.wallet.closeBetting();
		this.updateMessage('');
		this.resetSplit();
		this.gameDeck = new Deck(1);
		this.dealerHand.init();
		this.playerHand1.init();
		this.playerHand2.init();
	}

	private resetSplit(): void {
		this.splitInPlay = false;
		this.currentHand = this.playerHand1;
		this.adjustSpace();
	}

	private split(): void {
		Utility.disable(this.$split);
		this.splitInPlay = true;
		this.wallet.doubleBet();
		this.adjustSpace();
		let removedCard = this.playerHand1.removeCard();
		this.playerHand2.addCard(removedCard);
		this.dealOneCard(this.playerHand1);
		this.dealOneCard(this.playerHand2);
	}

	private splitGameplay(): void {
		if (this.currentHand === this.playerHand1) {
			this.highlightOff(this.playerHand1);
			this.highlightOn(this.playerHand2);
		}
		else if (this.currentHand === this.playerHand2) {
			this.highlightOff(this.playerHand2);
			this.dealerTurn(true);
			this.playerHand1.outcome = Utility.evaluateHand(this.playerHand1, this.dealerHand);
			this.playerHand2.outcome = Utility.evaluateHand(this.playerHand2, this.dealerHand);
			this.multipleOutcomes();
		}
	}

	private stand(): void {
		if (this.splitInPlay) {
			this.currentHand = Utility.getCurrentHand(this.playerHand1, this.playerHand2);
			this.splitGameplay();
		}
		else {
			Utility.disable(this.$hit, this.$stand, this.$doubleDown, this.$split);
			this.highlightOff(this.playerHand1);
			this.dealerTurn(true);
			this.playerHand1.outcome = Utility.evaluateHand(this.playerHand1, this.dealerHand);
			this.outcome(this.playerHand1.outcome);
		}
	}

	private startRound(): void {
		this.highlightOn(this.playerHand1);
		Utility.enable(this.$hit, this.$stand);
		if (this.wallet.money > this.wallet.bet * 2) {
			if (this.playerHand1.canDoubleDown()) {
				Utility.enable(this.$doubleDown);
			}
			if (this.playerHand1.canSplit()) {
				Utility.enable(this.$split);
			}
		}
	}

	private updateMessage(message: string): void {
		this.$message.text(message);
	}
}
