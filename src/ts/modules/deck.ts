import { Card } from './card';

import { ICard } from '../interfaces/card.interface';
import { IDeck } from '../interfaces/deck.interface';

export class Deck implements IDeck {
	public cards: ICard[];
	
	constructor(private decks: number) {
		this.cards = [];
		this.init(this.decks);
		this.shuffle();
	}

	draw(): ICard {
		// TODO: find a way to avoid using the ! operator
		return this.cards.pop()!;
	}

	// =======================

	private init(decks?: number) {
		if (!decks) {
			decks = 1;
		}
		while (decks > 0) {
			for (var i = 1; i <= 13; i++) {
				this.cards.push(new Card(i, 'spades'));
				this.cards.push(new Card(i, 'diamonds'));
				this.cards.push(new Card(i, 'hearts'));
				this.cards.push(new Card(i, 'clubs'));
			}
			decks--;
		}
	}

	private shuffle(): void {
		for (let i = this.cards.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
		}	
	}
}