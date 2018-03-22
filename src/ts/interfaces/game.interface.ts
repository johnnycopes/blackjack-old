export interface IGame {
	outcome: string;
	canDoubleDown: boolean;
	canSplit: boolean;
	splitInPlay: boolean;
	init(): void;
	deal(): void;
	startRound(): void;
	hit(): void;
	stand(): void;
	doubleDown(): void;
	split(): void;
}
