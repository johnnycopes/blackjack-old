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
	payout(outcome: string, hand1Value?: number, hand2Value?: number): void;
	resetChange(): void;
	update(): void;
}
