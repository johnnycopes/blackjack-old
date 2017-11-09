export default class Wallet {
	constructor() {
		this.$total = $(".total");
		this.$bet = $(".currentBet");
		this.$change = $(".change");
		this.newWallet();
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

	newWallet() {
		this.money = 500;
		this.bet = 10;
		this.change = "";
		this.update();
	}

	payout(outcome, hand1Value, hand2Value) {
		if (outcome === "blackjack") {
			this.change = this.bet * 1.5;
		}
		else if (outcome === "win") {
			this.change = this.bet;
		}
		else if (outcome === "lose") {
			this.change = -this.bet;
		}
		else if (outcome === "push") {
			this.change = 0;
		}
		else if (outcome === "multiple") {
			this.change = hand1Value + hand2Value;
		}
		this.money += this.change;
	}

	resetChange() {
		this.change = "";
		this.$change.empty();
	}

	update() {
		this.$total.text(this.money);
		this.$bet.text(this.bet);
	}

}