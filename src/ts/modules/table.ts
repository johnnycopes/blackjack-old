import { Game } from './game';
import { Wallet } from './wallet';
import { Utility } from './utility';

import { IGame } from '../interfaces/game.interface';
import { IWallet } from '../interfaces/wallet.interface';

export class Table {
	private game: IGame;
	private wallet: IWallet;
	private $titleScreen = $('.title-screen');
	private $message = $('.message');
	private $modal = $('.modal');
	private $modalBtn = $('.modal-btn');
	private $deal = $('.deal');
	private $hit = $('.hit');
	private $stand = $('.stand');
	private $doubleDown = $('.double-down');
	private $split = $('.split');

	constructor() {
		this.$deal.on('click', () => { this.deal(); });
		this.$hit.on('click', () => { this.hit(); });
		this.$stand.on('click', () => { this.stand(); });
		this.$doubleDown.on('click', () => { this.doubleDown(); });
		this.$split.on('click', () => { this.split(); });
		this.init();
	}

	// =======================

	private init(): void {
		this.game = new Game();
		this.wallet = new Wallet();
		Utility.show(this.$titleScreen);
		Utility.hide(this.$modal);
		this.updateMessage('');
		this.wallet.openBetting();
	}

	private deal(): void {
		this.prepareRound();
		this.game.deal();
		this.game.outcome.length ? this.forceOutcome() : this.startRound();
	}

	private hit(): void {
		Utility.disable(this.$doubleDown, this.$split);
		this.game.hit();
		if (this.game.playerTurnFinished) {
			this.forceOutcome();
		}
	}

	private stand(): void {
		Utility.disable(this.$doubleDown, this.$split);
		this.game.stand();
		if (this.game.playerTurnFinished) {
			this.forceOutcome();
		}
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

	private prepareRound(): void {
		Utility.disable(this.$deal);
		Utility.hide(this.$titleScreen);
		this.updateMessage('');
		this.wallet.closeBetting();
		this.game.init();
	}

	private startRound(): void {
		this.game.startRound();
		Utility.enable(this.$hit, this.$stand);
		if (this.wallet.total > this.wallet.bet * 2) {
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
		this.wallet.openBetting();
	}

	private forceOutcome(): void {
		this.wallet.payout(this.game.outcome);
		this.game.outcome.length === 1 ? this.singleOutcome() : this.multipleOutcomes();
		this.endRound();
	}

	private singleOutcome(): void {
		const outcome = this.game.outcome[0];
		if (outcome === 'blackjack' || outcome === 'win') {
			this.updateMessage('You win!');
		}
		else if (outcome === 'push') {
			this.updateMessage('Push');
		}
		else if (outcome === 'lose') {
			this.updateMessage('Dealer wins');
			if (this.wallet.total <= 0) {
				this.openModal('bankrupt');
			}
		}
	}

	private multipleOutcomes(): void {
		// TODO: combine single and multiple outcomes into a single function
		// TODO: correctly calculate money in case of split
		const outcome1 = this.game.outcome[0];
		const outcome2 = this.game.outcome[1];
		let message: string = '';
		if (outcome1 === outcome2) {
			if (outcome1 === 'blackjack') {
				message = 'TWO BLACKJACKS!!!';
			}
			else if (outcome1 === 'win') {
				message = 'You win both!';
			}
			else if (outcome1 === 'lose') {
				message = 'Dealer wins both';
			}
			else {
				message = 'Push both';
			}
		}
		else {
			if (outcome1 === 'blackjack' || outcome2 === 'blackjack') {
				if (outcome1 === 'win' || outcome2 === 'win') {
					message = 'You win both!'
				}
				else if (outcome1 === 'lose' || outcome2 === 'lose') {
					message = 'You and dealer each win one';
				}
				else {
					message = 'You win one, push';
				}
			}
			else if (outcome1 === 'win' || outcome2 === 'win') {
				if (outcome1 === 'lose' || outcome2 === 'lose') {
					message = 'You and dealer each win one';
				}
				else {
					message = 'You win one, push';
				}
			}
			else if (outcome1 === 'lose' || outcome2 === 'lose') {
				message = 'Dealer wins one, push';
			}
		}
		this.updateMessage(message);
	}

	private openModal(modalType: string): void {
		if (modalType === 'bankrupt') {
			Utility.show(this.$modal);
			this.$modalBtn.on('click', () => {
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
