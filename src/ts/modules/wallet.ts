import { IWallet } from '../interfaces/wallet.interface';

export class Wallet implements IWallet {
	public money: number;
	public bet: number;
	public change: number;
	public $betting = $('.betting');
	public $total = $('.total');
	public $bet = $('.currentBet');
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
		this.$range.attr('max', this.money);
		this.$range.on('input', () => {
			// this.$value.html(this.value); // TODO: fix range slider bug
		});
	}

	closeBetting(): void {
		this.$betting.hide();
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
		this.$betting.show();
		this.calibrateSlider();
	}

	payout(outcome: string, hand1Value?: number, hand2Value?: number): void {
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
		else if (outcome === 'multiple') {
			if (hand1Value && hand2Value) {
				this.change = hand1Value + hand2Value;
			}
		}
		this.money += this.change;
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
