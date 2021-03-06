import { ICard } from './card.interface';

export interface IHand {
	cards: ICard[];
	points: number;
	playing: boolean;
	outcome: string;
	$hand: JQuery<HTMLElement>;
	$cards: JQuery<HTMLElement>;
	$points: JQuery<HTMLElement>;
	addCard(card: ICard): void;
	canDoubleDown(): boolean;
	canSplit(): boolean;
	removeCard(): ICard;
	revealHole(): void;
	seeCard(card: number): ICard;
	toggleHighlight(): void;
	updateDisplay(content: number | string): void;
}