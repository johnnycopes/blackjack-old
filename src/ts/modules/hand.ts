import { Card } from './card';

import { ICard } from '../interfaces/card.interface';
import { IHand } from '../interfaces/hand.interface';

export class Hand implements IHand {
	public cards: ICard[];
	public points: number;
	public playing: boolean;
	public outcome: string;
	public $wrapper: JQuery<HTMLElement>;
	public $cards: JQuery<HTMLElement>;
	public $points: JQuery<HTMLElement>;
	private selector: string;

	constructor(private owner: string, private hand?: number) {
		this.selector = `#${this.owner}`;
		if (this.hand) {
			this.selector += this.hand.toString();
		}
		this.$wrapper = $(`${this.selector}`);
		this.$cards = $(`${this.selector} .cards`);
		this.$points = $(`${this.selector} .points`);
		this.cards = [];
		this.points = 0;
		this.playing = false;
		this.outcome = '';
		this.clearUI();
	}

	addCard(card: ICard): void {
		this.cards.push(card);
		this.$cards.append(card.$card);
		this.getPoints();
	}

	canDoubleDown(): boolean {
		return this.points === 11;
	}

	canSplit(): boolean {
		return this.cards[0].point === this.cards[1].point;
	}

	toggleHighlight(): void {
		this.playing ? this.$wrapper.addClass('.hand--current-hand') : this.$wrapper.removeClass('.hand--current-hand');
	}

	removeCard(): ICard {
		// TODO: find a way to avoid using the ! operator
		return this.cards.pop()!;
	}

	revealHole(): void {
		this.$cards.find('img:first-child').attr('src', this.cards[0].cardUrl);
	}

	seeCard(card: number): ICard {
		return this.cards[card - 1];
	}

	updateDisplay(content: number | string): void {
		this.$points.text(content);
	}

	// =======================

	private clearUI(): void {
		this.$cards.empty();
		this.$points.empty();
	}

	private getPoints(): void {
		let total = 0;
		let aces = 0;
		this.cards.forEach(card => {
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
		aces > 0 ? this.updateDisplay(`${total} / ${total - 10}`) : this.updateDisplay(total);
	}
}