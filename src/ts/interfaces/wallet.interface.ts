export interface IWallet {
	money: number;
	bet: number;
	change: number;
	$total: JQuery<HTMLElement>;
	$bet: JQuery<HTMLElement>;
	$change: JQuery<HTMLElement>;
	assessChange(): void;
	closeBetting(): void;
	doubleBet(): void;
	init(): void;
	openBetting(): void;
	payout(outcome: string): void;
	resetChange(): void;
	splitPayout(...outcomes: string[]): void;
	update(): void;
}
