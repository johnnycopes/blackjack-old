import { Game } from './game';
import { Wallet } from './wallet';
import { Utility } from './utility';

import { IGame } from '../interfaces/game.interface';
import { IWallet } from '../interfaces/wallet.interface';

export class Table {
	public $titleScreen = $('.title-screen');
	public $message = $('.message');
	public $modal = $('.modal');
	public $modalBtn = $('.modal-btn');
	public $deal = $('.deal');
	public $hit = $('.hit');
	public $stand = $('.stand');
	public $doubleDown = $('.double-down');
	public $split = $('.split');

	private game: IGame;
	private wallet: IWallet;

	constructor() {
		this.$deal.on('click', () => { this.deal(); });
		this.$hit.on('click', () => { this.hit(); });
		this.$stand.on('click', () => { this.stand(); });
		this.$doubleDown.on('click', () => { this.doubleDown(); });
		this.$split.on('click', () => { this.split(); });
		this.init();
	}

	private init(): void {
		this.game = new Game();
		this.wallet = new Wallet();
		this.wallet.openBetting();
	}

	private deal(): void {
		this.prepareRound();
		this.game.deal();
		this.game.outcome ? this.forceOutcome() : this.startRound();
	}

	private hit(): void {
		Utility.disable(this.$doubleDown, this.$split);
		this.game.hit();
		if (this.game.outcome) {
			this.forceOutcome();
		}
	}

	private stand(): void {
		if (this.game.splitInPlay) {

		}
		Utility.disable(this.$hit, this.$stand, this.$doubleDown, this.$split);
		this.game.stand();
		if (this.game.outcome) {
			this.forceOutcome();
		}
		// if (this.splitInPlay) {
		// 	this.currentHand = Utility.getCurrentHand(this.playerHand1, this.playerHand2);
		// 	this.splitGameplay();
		// }
		// else {
		// 	Utility.disable(this.$hit, this.$stand, this.$doubleDown, this.$split);
		// 	this.highlightOff(this.playerHand1);
		// 	this.dealerTurn(true);
		// 	this.playerHand1.outcome = Utility.evaluateHand(this.playerHand1, this.dealerHand);
		// 	this.outcome(this.playerHand1.outcome);
		// }
	}

	private doubleDown(): void {
		Utility.disable(this.$doubleDown);
		this.wallet.doubleBet();
		this.game.doubleDown();
		this.forceOutcome();
	}

	private split(): void {
		Utility.disable(this.$split);
		this.wallet.doubleBet();
		this.game.split();
	}

	private prepareRound() {
		Utility.disable(this.$deal);
		Utility.hide(this.$titleScreen);
		this.wallet.closeBetting();
		this.updateMessage('');
		this.game.init();
	}

	private startRound(): void {
		this.game.startRound();
		Utility.enable(this.$hit, this.$stand);
		if (this.wallet.money > this.wallet.bet * 2) {
			if (this.game.canDoubleDown) {
				Utility.enable(this.$doubleDown);
			}
			if (this.game.canSplit) {
				Utility.enable(this.$split);
			}
		}
	}

	private endRound(): void {
		Utility.disable(this.$hit, this.$stand);
		Utility.enable(this.$deal);
		this.wallet.update();
		this.wallet.assessChange();
		this.wallet.openBetting();
	}

	private forceOutcome() {
		const outcome = this.game.outcome;
		this.wallet.payout(outcome);
		if (outcome === 'blackjack' || outcome === 'win') {
			this.updateMessage('You win!');
		}
		else if (outcome === 'push') {
			this.updateMessage('Push');
		}
		else if (outcome === 'lose') {
			this.updateMessage('Dealer wins');
			if (this.wallet.money - this.wallet.bet <= 0) {
				this.openModal('bankrupt');
			}
		}
		this.endRound();
	}

	private multipleOutcomes() {
		// const message = Utility.assessSplit(this.playerHand1, this.playerHand2);
		// // this.wallet.bet /= 2;
		// console.log(this.playerHand1);
		// console.log(this.playerHand2);
		// this.wallet.splitPayout(this.playerHand1.outcome, this.playerHand2.outcome);
		// // this.wallet.payout(this.playerHand1.outcome);
		// // this.wallet.payout(this.playerHand2.outcome);
		// this.updateMessage(message);
		// this.endRound();
	}

	private openModal(modalType: string): void {
		if (modalType === 'bankrupt') {
			this.$modal.removeClass('hide');
			this.$modalBtn.on('click', () => {
				this.$modal.addClass('hide');
				this.init();
			});
		}
		else if (modalType === 'help') {
			// future game feature: instructions available in help modal
		}
	}

	private updateMessage(message: string): void {
		this.$message.text(message);
	}
}
