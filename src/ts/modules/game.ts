import { Hand } from './hand';
import { Deck } from './deck';
import { Utility } from './utility';

import { IHand } from '../interfaces/hand.interface';
import { IDeck } from '../interfaces/deck.interface';
import { IGame } from '../interfaces/game.interface';

export class Game implements IGame {
	public outcome: string[];
	public canDoubleDown: boolean;
	public canSplit: boolean;
	public splitInPlay: boolean;
	public playerTurnFinished: boolean;
	private gameDeck: IDeck;
	private dealerHand: IHand;
	private playerHand1: IHand;
	private playerHand2: IHand;
	private playerHands: IHand[];
	private currentHand: IHand;

	constructor() {
		this.init();
	}

	init() {
		this.gameDeck = new Deck(1);
		this.dealerHand = new Hand('dealer');
		this.playerHand1 = new Hand('player', 1);
		this.playerHand2 = new Hand('player', 2);
		this.playerHands = [this.playerHand1];
		this.currentHand = this.playerHand1;
		this.canDoubleDown = false;
		this.canSplit = false;
		this.splitInPlay = false;
		this.playerTurnFinished = false;
		this.outcome = [];
		this.adjustSpace();
	}

	deal(): void {
		this.dealOneCard(this.dealerHand, 'hole');
		this.dealOneCard(this.playerHand1);
		this.dealOneCard(this.dealerHand);
		this.dealOneCard(this.playerHand1);
		this.dealerHand.updateDisplay('?'); // conceal dealer total
		this.checkForBlackjacks();
	}

	hit(): void {
		this.dealOneCard(this.currentHand);
		if (this.currentHand.points > 21) {
			this.finishPlayerHand(false);
		}
	}

	stand(): void {
		this.finishPlayerHand(true);
	}

	doubleDown(): void {
		this.dealOneCard(this.playerHand1, 'double-down');
		this.stand();
	}

	split(): void {
		this.splitInPlay = true;
		this.playerHands.push(this.playerHand2);
		const removedCard = this.playerHand1.removeCard();
		this.playerHand2.addCard(removedCard);
		this.dealOneCard(this.playerHand1);
		this.dealOneCard(this.playerHand2);
		this.adjustSpace();
	}

	startRound(): void {
		this.highlightOn(this.playerHand1);
		this.canDoubleDown = this.playerHand1.canDoubleDown();
		this.canSplit = this.playerHand1.canSplit();
	}

	// =======================

	private adjustSpace(): void {
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
			this.outcome.push('push');
		}
		else if (dealerPoints === 21) {
			this.dealerBlackjack();
			this.outcome.push('lose');
		}
		else if (playerPoints === 21) {
			this.dealerGoes(false);
			this.playerHand1.updateDisplay('BLACKJACK, HOT DAMN!');
			this.outcome.push('blackjack');
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

	private dealerGoes(drawsCards: boolean): void {
		// TODO: make it so dealer tries to beat the player even if they bust one hand in split
		this.dealerHand.revealHole();
		while (drawsCards && this.dealerHand.points < 17) {
			this.dealOneCard(this.dealerHand);
		}
		this.dealerHand.updateDisplay(this.dealerHand.points);
	}

	private evaluatePlayerHand(hand: IHand): void {
		const playerPoints = hand.points;
		const dealerPoints = this.dealerHand.points;
		if (playerPoints > 21 || dealerPoints > 21) {
			hand.outcome = playerPoints > 21 ? 'lose' : 'win';
		}
		else if (playerPoints !== dealerPoints) {
			hand.outcome = playerPoints < dealerPoints ? 'lose' : 'win'
		}
		else {
			hand.outcome = 'push';
		}
	}

	private finishPlayerHand(dealerHasTurn: boolean) {
		this.highlightOff(this.currentHand);
		if (this.splitInPlay && this.currentHand === this.playerHand1) {
			this.highlightOn(this.playerHand2);
			this.currentHand = this.playerHand2;
		}
		else {
			this.dealerGoes(dealerHasTurn);
			this.getOutcome();
		}
	}

	private getOutcome(): void {
		this.playerHands.forEach(hand => {
			this.evaluatePlayerHand(hand);
			this.outcome.push(hand.outcome);
		});
		this.playerTurnFinished = true;
	}

	private highlightOff(hand: IHand): void {
		hand.playing = false;
		hand.toggleHighlight();
	}

	private highlightOn(hand: IHand): void {
		hand.playing = true;
		hand.toggleHighlight();
	}
}
