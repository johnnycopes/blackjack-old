export default class Card {
	public $card: JQuery<HTMLElement>;

	constructor(
		public point: number | string,
		public suit: string
	) {
		this.$card = $('.card');
	}

	getImageUrl(): string {
		let value = this.point;
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
		return `img/${value}_of_${this.suit}.svg`;
	}

	slide(): void {
		this.$card.addClass('card-animation');
	}
}
