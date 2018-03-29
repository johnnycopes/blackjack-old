import { Utility } from './utility';

import { IWallet } from '../interfaces/wallet.interface';

export class Wallet implements IWallet {
	public total: number;
	public bet: number;
	public change: number;
	private $total = $('.wallet__total');
	private $bet = $('.wallet__current-bet');
	private $change = $('.wallet__change');
	private $slider = $('.wallet__slider');
	
	constructor() {
		this.updateTotal(500);
		this.updateBet(10);
		this.clearChange();
	}

	closeBetting(): void {
		Utility.hide(this.$slider);
		this.clearChange();
	}
	
	doubleBet(): void {
		this.updateBet(this.bet * 2);
	}

	openBetting(): void {
		Utility.show(this.$slider);
		this.calibrateSlider();
	}

	payout(outcome: string[]): void {
		let change = 0;
		let bet = this.bet / outcome.length;
		outcome.forEach(outcome => {
			if (outcome === 'blackjack') {
				change += Math.ceil((bet * 1.5) / 10) * 10; // rounds up because bet range slider can only increment by 10
			}
			else if (outcome === 'win') {
				change += bet;
			}
			else if (outcome === 'lose') {
				change += -bet;
			}
		});
		let total = this.total + change;
		this.updateChange(change);
		this.updateTotal(total);
	}

	// =======================

	private calibrateSlider(): void {
		let sliderValue = this.bet;
		if (this.bet > this.total) {
			sliderValue = this.total;
		}
		this.updateBet(sliderValue);
		this.$slider.prop('value', sliderValue);
		this.$slider.prop('max', this.total);
		this.$slider.on('input', () => {
			const bet = Number(this.$slider.prop('value'));
			this.updateBet(bet);
		});
	}

	private clearChange(): void {
		this.change = 0;
		this.$change.empty();
	}
	
	private updateBet(bet: number): void {
		this.bet = bet;
		this.$bet.text(this.bet.toString());
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