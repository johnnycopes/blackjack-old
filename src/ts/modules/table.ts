import { Game } from './game';
import { Wallet } from './wallet';
import { Utility } from './utility';

import { IGame } from '../interfaces/game.interface';
import { IWallet } from '../interfaces/wallet.interface';

export class Table {
	private game: IGame;
	private wallet: IWallet;
	private $table = $('.table');
	private $titleScreen = $('.title-screen');
	private $message = $('.message');
	private $modal = $('.modal');
	private $modalBtn = $('.modal__btn');
	private $deal = $('.game-actions__deal');
	private $hit = $('.game-actions__hit');
	private $stand = $('.game-actions__stand');
	private $doubleDown = $('.game-actions__double-down');
	private $split = $('.game-actions__split');

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
		Utility.show(this.$table);
		Utility.show(this.$titleScreen);
		Utility.hide(this.$modal);
		this.updateMessage('');
		this.game = new Game();
		this.wallet = new Wallet();
		this.wallet.openBetting();
	}

	private deal(): void {
		this.prepareRound();
		this.game.deal();
		this.game.playerTurnFinished ? this.forceOutcome() : this.startRound();
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
		if (this.game.playerTurnFinished) {
			this.forceOutcome();
		}
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
		if (this.wallet.total <= 0) {
			this.openModal('bankrupt');
		}
		Utility.disable(this.$hit, this.$stand);
		Utility.enable(this.$deal);
		this.wallet.openBetting();
	}

	private forceOutcome(): void {
		this.wallet.payout(this.game.outcome);
		this.updateMessage(this.game.outcomeMessage);
		this.endRound();
	}

	private updateMessage(message: string): void {
		this.$message.text(message);
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
}