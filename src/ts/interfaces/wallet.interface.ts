export interface IWallet {
	total: number;
	bet: number;
	change: number;
	closeBetting(): void;
	doubleBet(): void;
	openBetting(): void;
	payout(outcome: string[]): void;
}