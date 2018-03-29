import { Hand } from './hand';
import { Deck } from './deck';
import { Utility } from './utility';

import { IHand } from '../interfaces/hand.interface';
import { IDeck } from '../interfaces/deck.interface';
import { IGame } from '../interfaces/game.interface';

type outcomeMessages = { [outcome: string]: string };

export class Game implements IGame {
	public outcome: string[];
	public outcomeMessage: string;
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
	private singleOutcomeMessages: outcomeMessages;
	private multipleOutcomeMessages: outcomeMessages;

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
		this.singleOutcomeMessages= {
			blackjack: 'You win!',
			win: 'You win!',
			push: 'Push',
			lose: 'Dealer wins'
		};
		this.multipleOutcomeMessages = {
			blackjack: 'TWO BLACKJACKS!!!',
			win: 'You win both!',
			push: 'Push both',
			lose: 'Dealer wins both',
			'win/lose': 'You and dealer each win one',
			'win/push': 'You win one, push',
			'lose/push': 'Dealer wins one, push'
		};
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
		this.finishPlayerHand(true);
	}

	split(): void {
		this.splitInPlay = true;
		this.playerHands.push(this.playerHand2);
		const removedCard = this.playerHand1.removeCard();
		this.playerHand2.addCard(removedCard);
		this.adjustSpace();
		this.dealOneCard(this.playerHand1);
		this.dealOneCard(this.playerHand2);
		this.checkForBlackjacks();
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
		this.playerHands.forEach(hand => {
			const playerPoints = hand.points;
			const dealerPoints = this.dealerHand.points;
			if (dealerPoints === 21 || playerPoints === 21) {
				if (dealerPoints === 21 && playerPoints === 21) {
					hand.updateDisplay('BLACKJACK, HOT DAMN!');
					hand.outcome = 'push';
					this.finishPlayerHand(false);
				}
				else if (playerPoints === 21) {
					hand.updateDisplay('BLACKJACK, HOT DAMN!');
					hand.outcome = 'blackjack';
					this.finishPlayerHand(false);
				}
				else if (dealerPoints === 21) {
					hand.outcome = 'lose';
					this.finishPlayerHand(false, true);
				}
			}
		});
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
		this.dealerHand.revealHole();
		while (drawsCards && this.dealerHand.points < 17) {
			this.dealOneCard(this.dealerHand);
		}
		this.dealerHand.updateDisplay(this.dealerHand.points);
	}

	private evaluatePlayerHands(): void {
		this.playerHands.forEach(hand => {
			if (hand.outcome) {
				// do nothing -- checkForBlackjacks() has already assigned the hand.outcome
			}
			else if (hand.points > 21 || this.dealerHand.points > 21) {
				hand.outcome = hand.points > 21 ? 'lose' : 'win';
			}
			else if (hand.points !== this.dealerHand.points) {
				hand.outcome = hand.points < this.dealerHand.points ? 'lose' : 'win';
			}
			else {
				hand.outcome = 'push';
			}
			this.outcome.push(hand.outcome);
		});
	}

	private finishPlayerHand(dealerHasTurn: boolean, dealerBlackjack?: boolean) {
		this.highlightOff(this.currentHand);
		if (this.splitInPlay && this.currentHand === this.playerHand1) {
			this.highlightOn(this.playerHand2);
			this.currentHand = this.playerHand2;
		}
		else {
			dealerBlackjack ? this.dealerBlackjack() : this.dealerGoes(dealerHasTurn);
			this.getOutcome();
		}
	}

	private getOutcome(): void {
		this.evaluatePlayerHands();
		this.getOutcomeMessage();
		this.playerTurnFinished = true;
	}

	private getOutcomeMessage(): void {
		if (this.outcome.length === 1) {
			this.outcomeMessage = this.singleOutcomeMessages[this.outcome[0]];
		}
		else if (this.outcome[0] === this.outcome[1]) {
			this.outcomeMessage = this.multipleOutcomeMessages[this.outcome[0]];
		}
		else {
			const outcomeKey1 = `${this.outcome[0]}/${this.outcome[1]}`;
			const outcomeKey2 = `${this.outcome[1]}/${this.outcome[0]}`;
			if (this.multipleOutcomeMessages[outcomeKey1]) {
				this.outcomeMessage = this.multipleOutcomeMessages[outcomeKey1]
			}
			else {
				this.outcomeMessage = this.multipleOutcomeMessages[outcomeKey2];
			}
		}
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