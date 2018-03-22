import { Card } from './card';

import { IHand } from '../interfaces/hand.interface';
import { ICard } from '../interfaces/card.interface';

export class Hand implements IHand {
	public cards: ICard[];
	public points: number;
	public playing: boolean;
	public outcome: string;
	public $wrapper: JQuery<HTMLElement>;
	public $hand: JQuery<HTMLElement>;
	public $points: JQuery<HTMLElement>;
	private selector: string;

	constructor(
		private owner: string,
		private hand?: number
	) {
		this.initUI();
		this.init();
	}

	addCard(card: ICard): void {
		this.cards.push(card);
		this.$hand.append(card.$card);
		this.getPoints();
	}

	canDoubleDown(): boolean {
		return this.points === 11;
	}

	canSplit(): boolean {
		return this.cards[0].point === this.cards[1].point;
	}

	toggleHighlight(): void {
		this.playing ? this.$wrapper.addClass('current-hand') : this.$wrapper.removeClass('current-hand');
	}

	removeCard(): ICard {
		return this.cards.pop()!;
	}

	revealHole(): void {
		this.$hand.find('img:first-child').attr('src', this.cards[0].cardUrl);
	}

	seeCard(card: number): ICard {
		return this.cards[card - 1];
	}

	updateDisplay(content: number | string): void {
		this.$points.text(content);
	}

	// =======================

	private getPoints(): void {
		let total = 0;
		let aces = 0;
		this.cards.forEach((card) => {
			let point = card.point;
			if (point === 1) {
				total += 10;
				aces++;
			}
			else if (point > 10) {
				point = 10;
			}
			total += point;
			while (total > 21 && aces > 0) {
				total -= 10;
				aces--;
			}
		});
		this.points = total;
		this.updateDisplay(this.points);
	}

	private clearUI(): void {
		this.$hand.empty();
		this.$points.empty();
	}

	private initUI(): void {
		this.selector = `#${this.owner}`;
		if (this.hand) {
			this.selector += this.hand.toString();
		}
		this.$wrapper = $(`${this.selector}`);
		this.$hand = $(`${this.selector} .hand`);
		this.$points = $(`${this.selector} .points`);
	}

	private init(): void {
		this.cards = [];
		this.points = 0;
		this.playing = false;
		this.outcome = '';
		this.clearUI();
	}
}
