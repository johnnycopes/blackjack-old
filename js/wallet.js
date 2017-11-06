export default class Wallet {
	constructor() {
		this.money = 500;
		this.bet = 10;
		this.change = "";

		this.$total = $(".total");
		this.$bet = $(".currentBet");
		this.$change = $(".change");
	}

	assessChange() {
		let className = "";
		let symbol = "";
		if (this.change > 0) {
			className = "positive";
			symbol = "+";
		} else if (this.change < 0) {
			className = "negative";
			symbol = "-";
		}
		this.$change.append(`<span class="${className}">${symbol} $${Math.abs(this.change)}</span>`);
	}
	
	doubleBet() {
		this.money -= this.bet;
		this.bet *= 2;
		this.update();
	}

	reset() {
		this.money = 500;
		this.bet = 10;
		this.change = "";
		this.update();
	}

	update() {
		this.$total.text(this.money);
		this.$bet.text(this.bet);
	}

}