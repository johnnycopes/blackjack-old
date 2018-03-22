import { IWallet } from '../interfaces/wallet.interface';

import { Utility } from './utility';

export class Wallet implements IWallet {
	public money: number;
	public bet: number;
	public change: number;
	public $betting = $('.betting');
	public $total = $('.total');
	public $bet = $('.current-bet');
	public $change = $('.change');
	public $range = $('.slider-range');
	public $value = $('.slider-value');
	
	constructor() {
		this.init();
	}

	assessChange(): void {
		let className = '';
		let symbol = '';
		if (this.change > 0) {
			className = 'positive';
			symbol = '+';
		} else if (this.change < 0) {
			className = 'negative';
			symbol = '-';
		}
		this.$change.append(`<span class='${className}'>${symbol} $${Math.abs(this.change)}</span>`);
	}

	calibrateSlider(): void {
		this.$range.prop('max', this.money);
		this.$range.on('input', () => {
			console.log(this.$range.prop('value'));
			this.$bet.text(this.$range.prop('value')); // TODO: fix range slider bug
		});
	}

	closeBetting(): void {
		Utility.hide(this.$betting);
		this.resetChange();
	}
	
	doubleBet(): void {
		this.money -= this.bet;
		this.bet *= 2;
		this.update();
	}

	init(): void {
		this.money = 500;
		this.bet = 10;
		this.resetChange();
		this.update();
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
		this.money += this.change;
	}

	splitPayout(...outcomes: string[]): void {
		this.bet /= outcomes.length;
		outcomes.forEach((outcome) => this.payout(outcome));
	}

	resetChange(): void {
		this.change = 0;
		this.$change.empty();
	}

	update(): void {
		this.$total.text(this.money);
		this.$bet.text(this.bet);
	}
}
