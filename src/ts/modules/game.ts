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
	public $hand = $('.hand');
	public $deal = $('.deal');
	public $hit = $('.hit');
	public $stand = $('.stand');
	public $doubleDown = $('.double-down');
	public $split = $('.split');

	public readonly animationDuration = 500;
	private gameDeck: IDeck;
	private dealerHand: IHand;
	private playerHand: IHand;
	private playerHand2: IHand;
	private playing: boolean;
	private splitInPlay: boolean;
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

	deal(): void {
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
		}
		else if (this.dealerHand.points === 21) {
			this.dealerHand.updateDisplay('Blackjack');
			this.outcome('lose');
		}
		else if (this.playerHand.points === 21) {
			this.updateMessage('You win!');
			this.dealerHand.updateDisplay(this.dealerHand.points);
			this.playerHand.updateDisplay('BLACKJACK, HOT DAMN!');
			this.outcome('blackjack');
		}
		else {
			this.playing = true;
		}
	}

	dealerTurn(): void {
		this.dealerHand.revealHole();
		while (this.dealerHand.points < 17) {
			this.dealOneCard(this.dealerHand);
		}
		this.dealerHand.updateDisplay(this.dealerHand.points);
	}

	doubleDown(): void {
		this.wallet.doubleBet();
		// deal the player one more card and then move on to the dealer's turn
		this.dealOneCard(this.playerHand, 'double-down');
		this.stand();
	}

	endRound(): void {
		this.playing = false;
		this.highlightOff(this.playerHand);

		this.dealerTurn();
		this.wallet.update();
		this.wallet.assessChange();
		
		this.wallet.openBetting();
		Utility.enable(this.$deal);
		Utility.disable(this.$hit, this.$stand);
	}

	evaluateHand(hand: IHand): void {
		let dealerPoints = this.dealerHand.points;
		let playerPoints = hand.points;
		if (hand.outcome) {
			return;
		}
		else if (dealerPoints > 21 || playerPoints > dealerPoints) {
			hand.outcome = 'win';
		}
		else if (playerPoints < dealerPoints) {
			hand.outcome = 'lose';
		}
		else {
			hand.outcome = 'push';
		}
	}
	
	getCurrentHand(): IHand {
		const hands = [this.playerHand, this.playerHand2];
		return hands.filter((hand) => hand.playing === true)[0];
	}

	highlightOff(hand: IHand): void {
		hand.playing = false;
		hand.toggleHighlight();
	}

	highlightOn(hand: IHand): void {
		hand.playing = true;
		hand.toggleHighlight();
	}

	hit(): void {
		Utility.disable(this.$doubleDown, this.$split);
		if (!this.splitInPlay) {
			this.dealOneCard(this.playerHand);
			if (this.playerHand.points > 21) {
				this.updateMessage('You bust');
				this.outcome('lose');
			}
		}
		else {
			let currentHand = this.getCurrentHand();
			this.dealOneCard(currentHand);
			if (currentHand.points > 21) {
				currentHand.outcome = 'lose';
				this.splitGameplay(currentHand);
			}
		}
	}

	multipleOutcomes() {
		let hand1 = this.playerHand.outcome;
		let hand2 = this.playerHand2.outcome;
		if (hand1 === hand2) {
			if (hand1 === 'blackjack') {
				this.updateMessage('TWO BLACKJACKS!!!');
			}
			else if (hand1 === 'win') {
				this.updateMessage('You win both!');
			}
			else if (hand1 === 'lose') {
				this.updateMessage('Dealer wins both');
			}
			else {
				this.updateMessage('Push both');
			}
			this.wallet.payout(hand1);
		}
		else if (hand1 !== hand2) {
			// calculate value of each hand outcome before calling payout function
			let initialBet = this.wallet.bet / 2;
			let hand1Value = 0;
			let hand2Value = 0;
			if (hand1 === 'blackjack' || hand2 === 'blackjack') {
				hand1Value = initialBet * 1.5;
				if (hand1 === 'win' || hand2 === 'win') {
					hand2Value = initialBet;
					this.updateMessage('You win both!');
				}
				else if (hand1 === 'lose' || hand2 === 'lose') {
					hand2Value = -initialBet;
					this.updateMessage('You and dealer each win one');
				}
				else {
					this.updateMessage('You win one, push');
				}
			} 
			else if (hand1 === 'win' || hand2 === 'win') {
				hand1Value = initialBet;
				if (hand1 === 'lose' || hand2 === 'lose') {
					hand2Value = -initialBet;
					this.updateMessage('You and dealer each win one');
				}
				else {
					this.updateMessage('You win one, push');
				}
			}
			else if (hand1 === 'lose' || hand2 === 'lose') {
				hand1Value = -initialBet;
				this.updateMessage('Dealer wins one, push');
			}
			this.wallet.payout('custom', hand1Value, hand2Value);
		}
		this.endRound();
	}

	init(): void {
		this.wallet = new Wallet();
		this.gameDeck = new Deck(3);
		this.dealerHand = new Hand('dealer');
		this.playerHand = new Hand('player', 1);
		this.splitInPlay = false;
		this.playing = false;
		this.wallet.openBetting();
	}

	outcome(result: string) {
		this.wallet.payout(result);
		if (result === 'win') {
			this.updateMessage('You win!');
		}
		else if (result === 'push') {
			this.updateMessage('Push');
		}
		else if (result === 'lose') {
			this.updateMessage('Dealer wins');
			if (this.wallet.money - this.wallet.bet <= 0) {
				Utility.openModal('bankrupt');
			}
		}
		this.endRound();
	}

	prepareRound() {
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

	split(): void {
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

	splitGameplay(currentHand: IHand): void {
		if (currentHand === this.playerHand) {
			this.highlightOff(this.playerHand);
			this.highlightOn(this.playerHand2);
		}
		else if (currentHand === this.playerHand2) {
			this.highlightOff(this.playerHand2);
			this.evaluateHand(this.playerHand);
			this.evaluateHand(this.playerHand2);
			this.multipleOutcomes();
		}
	}

	stand(): void {
		if (!this.splitInPlay) {
			Utility.disable(this.$hit, this.$stand, this.$doubleDown, this.$split);
			this.highlightOff(this.playerHand);
			this.dealerTurn();
			this.evaluateHand(this.playerHand);
			this.outcome(this.playerHand.outcome);
		}
		else {
			let currentHand = this.getCurrentHand();
			this.splitGameplay(currentHand);
		}
	}

	startRound(): void {
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

	updateMessage(message: string): void {
		this.$message.text(message);
	}
}
