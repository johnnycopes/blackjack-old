import { ICard } from '../interfaces/card.interface';

export class Card implements ICard {
	public cardUrl: string;
	public $card: JQuery<HTMLElement>;

	constructor(public point: number, public suit: string) {
		this.getCardUrl();
		this.$card = $('<img />', {
			'class': 'card',
			'src': `${this.cardUrl}`
		});
	}

	// =======================

	private getCardUrl(): void {
		let value = this.point.toString();
		if (this.point === 11) {
			value = 'jack';
		}
		else if (this.point === 12) {
			value = 'queen';
		}
		else if (this.point === 13) {
			value = 'king';
		}
		else if (this.point === 1) {
			value = 'ace';
		}
		this.cardUrl = `img/${value}_of_${this.suit}.svg`;
	}
}