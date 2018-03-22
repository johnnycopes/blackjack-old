import { IWallet } from '../interfaces/wallet.interface';

import { Utility } from './utility';

export class Wallet implements IWallet {
	public total: number;
	public bet: number;
	public change: number;
	private $betting = $('.betting');
	private $total = $('.total');
	private $bet = $('.current-bet');
	private $change = $('.change');
	private $range = $('.slider-range');
	private $value = $('.slider-value');
	
	constructor() {
		this.init();
	}

	closeBetting(): void {
		Utility.hide(this.$betting);
		this.clearChange();
	}
	
	doubleBet(): void {
		this.updateBet(this.bet * 2);
	}

	openBetting(): void {
		Utility.show(this.$betting);
		this.calibrateSlider();
	}

	payout(outcome: string): void {
		if (outcome === 'blackjack') {
			this.change = this.bet * 1.5;
		}
		else if (outcome === 'win') {
			this.change = this.bet;
		}
		else if (outcome === 'lose') {
			this.change = -this.bet;
		}
		else if (outcome === 'push') {
			this.change = 0;
		}
		this.total += this.change;
		this.updateChange(this.change);
		this.updateTotal(this.total);
	}

	splitPayout(...outcomes: string[]): void {
		this.bet /= outcomes.length;
		outcomes.forEach((outcome) => this.payout(outcome));
	}

	// =======================

	private calibrateSlider(): void {
		this.$range.prop('max', this.total);
		this.$range.on('input', () => {
			const bet = Number(this.$range.prop('value'));
			this.updateBet(bet);
		});
	}

	private updateBet(bet: number): void {
		this.bet = bet;
		this.$bet.text(this.bet.toString());
	}

	private clearChange(): void {
		this.change = 0;
		this.$change.empty();
	}

	private init(): void {
		this.updateTotal(500);
		this.updateBet(10);
		this.clearChange();
	}

	private updateChange(change: number): void {
		this.change = change;
		let className = '';
		let symbol = '';
		if (change > 0) {
			className = 'positive';
			symbol = '+';
		}
		else if (change < 0) {
			className = 'negative';
			symbol = '-';
		}
		this.$change.append(`
			<span class='${className}'>
				${symbol} $${Math.abs(change).toString()}
			</span>
		`);
	}

	private updateTotal(total: number): void {
		this.total = total;
		this.$total.text(total.toString());
	}
}
