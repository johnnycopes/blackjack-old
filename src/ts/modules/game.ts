import { Hand } from './hand';
import { Deck } from './deck';
import { Utility } from './utility';

import { IHand } from '../interfaces/hand.interface';
import { IDeck } from '../interfaces/deck.interface';
import { IGame } from '../interfaces/game.interface';

export class Game implements IGame {
	public outcome: string;
	public canDoubleDown: boolean;
	public canSplit: boolean;
	public splitInPlay: boolean;
	private gameDeck: IDeck;
	private currentHand: IHand;
	private dealerHand: IHand;
	private playerHand1: IHand;
	private playerHand2: IHand;

	constructor() {
		this.init();
	}

	public init() {
		this.gameDeck = new Deck(1);
		this.dealerHand = new Hand('dealer');
		this.playerHand1 = new Hand('player', 1);
		this.playerHand2 = new Hand('player', 2);
		this.currentHand = this.playerHand1;
		this.canDoubleDown = false;
		this.canSplit = false;
		this.splitInPlay = false;
		this.outcome = '';
		this.adjustSpace();
	}

	public deal(): void {
		this.dealOneCard(this.dealerHand, 'hole');
		this.dealOneCard(this.playerHand1);
		this.dealOneCard(this.dealerHand);
		this.dealOneCard(this.playerHand1);
		this.dealerHand.updateDisplay('?'); // conceal dealer total
		this.checkForBlackjacks();
	}

	public hit(): void {
		if (this.splitInPlay) {
			this.getCurrentHand;
			this.dealOneCard(this.currentHand);
			if (this.currentHand.points > 21) {
				this.splitGameplay();
			}
		}
		else {
			this.dealOneCard(this.playerHand1);
			if (this.playerHand1.points > 21) {
				this.highlightOff(this.playerHand1);
				this.dealerGoes(false);
				this.outcome = 'lose';
			}
		}
	}

	public stand() {
		if (this.splitInPlay) {
			this.getCurrentHand();
			this.splitGameplay();
		}
		else {
			this.highlightOff(this.playerHand1);
			this.dealerGoes(true);
			this.getOutcome();
		}
	}

	public doubleDown(): void {
		this.dealOneCard(this.playerHand1, 'double-down');
		this.stand();
	}

	public split() {
		// this.adjustSpace();
		// let removedCard = this.playerHand1.removeCard();
		// this.playerHand2.addCard(removedCard);
		// this.dealOneCard(this.playerHand1);
		// this.dealOneCard(this.playerHand2);
	}

	public startRound() {
		this.highlightOn(this.playerHand1);
		this.canDoubleDown = this.playerHand1.canDoubleDown();
		this.canSplit = this.playerHand1.canSplit();
	}

	// =======================

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

	private checkForBlackjacks(): void {
		const dealerPoints = this.dealerHand.points;
		const playerPoints = this.playerHand1.points;
		if (dealerPoints === 21 && playerPoints === 21) {
			this.dealerBlackjack();
			this.playerHand1.updateDisplay('BLACKJACK, HOT DAMN!');
			this.outcome = 'push';
		}
		else if (dealerPoints === 21) {
			this.dealerBlackjack();
			this.outcome = 'lose';
		}
		else if (playerPoints === 21) {
			this.dealerGoes(false);
			this.playerHand1.updateDisplay('BLACKJACK, HOT DAMN!');
			this.outcome = 'blackjack';
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

	private dealerBlackjack(): void {
		this.dealerHand.revealHole();
		this.dealerHand.updateDisplay('Blackjack');
	}

	private dealerGoes(hasTurn: boolean): void {
		this.dealerHand.revealHole();
		while (hasTurn && this.dealerHand.points < 17) {
			this.dealOneCard(this.dealerHand);
		}
		this.dealerHand.updateDisplay(this.dealerHand.points);
	}

	private getOutcome() {
		const playerPoints = this.playerHand1.points;
		const dealerPoints = this.dealerHand.points;
		if (playerPoints > 21 || dealerPoints > 21) {
			this.outcome = playerPoints > 21 ? 'lose' : 'win';
		}
		else if (playerPoints !== dealerPoints) {
			this.outcome = playerPoints < dealerPoints ? 'lose' : 'win'
		}
		else {
			this.outcome = 'push';
		}
	}

	private getCurrentHand(): void {
		const playerHands = [this.playerHand1, this.playerHand2];
		this.currentHand = playerHands.filter(hand => hand.playing === true)[0];
	}

	private highlightOff(hand: IHand): void {
		hand.playing = false;
		hand.toggleHighlight();
	}

	private highlightOn(hand: IHand): void {
		hand.playing = true;
		hand.toggleHighlight();
	}

	private resetSplit(): void {
		this.splitInPlay = false;
		this.currentHand = this.playerHand1;
		this.adjustSpace();
	}

	private splitGameplay(): void {
		// if (this.currentHand === this.playerHand1) {
		// 	this.highlightOff(this.playerHand1);
		// 	this.highlightOn(this.playerHand2);
		// }
		// else if (this.currentHand === this.playerHand2) {
		// 	this.highlightOff(this.playerHand2);
		// 	this.dealerGoes(true);
		// 	this.playerHand1.outcome = Utility.evaluateHand(this.playerHand1, this.dealerHand);
		// 	this.playerHand2.outcome = Utility.evaluateHand(this.playerHand2, this.dealerHand);
		// 	this.multipleOutcomes();
		// }
	}
}
