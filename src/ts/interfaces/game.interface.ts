export interface IGame {
	outcome: string[];
	outcomeMessage: string;
	canDoubleDown: boolean;
	canSplit: boolean;
	splitInPlay: boolean;
	playerTurnFinished: boolean;
	init(): void;
	deal(): void;
	startRound(): void;
	hit(): void;
	stand(): void;
	doubleDown(): void;
	split(): void;
}
