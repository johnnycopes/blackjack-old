export class Utility {

	public static disable(...elements: JQuery<HTMLElement>[]): void {
		elements.forEach((element) => element.prop('disabled', true));
	}

	public static enable(...elements: JQuery<HTMLElement>[]): void {
		elements.forEach((element) => element.prop('disabled', false));
	}

	public static hide(...elements: JQuery<HTMLElement>[]): void {
		elements.forEach((element) => element.addClass('hide'));
	}

	public static show(...elements: JQuery<HTMLElement>[]): void {
		elements.forEach((element) => element.removeClass('hide'));
	}


	// Game logic

	// static assessSplit(...playerHands: IHand[]): string {
	// 	const hand1 = playerHands[0].outcome;
	// 	const hand2 = playerHands[1].outcome;
	// 	const sameOutcome = hand1 === hand2;
	// 	let message: string = '';

	// 	if (sameOutcome) {
	// 		if (hand1 === 'blackjack') {
	// 			message = 'TWO BLACKJACKS!!!';
	// 		}
	// 		else if (hand1 === 'win') {
	// 			message = 'You win both!';
	// 		}
	// 		else if (hand1 === 'lose') {
	// 			message = 'Dealer wins both';
	// 		}
	// 		else {
	// 			message = 'Push both';
	// 		}
	// 	}
	// 	else if (!sameOutcome) {
	// 		if (hand1 === 'blackjack' || hand2 === 'blackjack') {
	// 			if (hand1 === 'win' || hand2 === 'win') {
	// 				message = 'You win both!'
	// 			}
	// 			else if (hand1 === 'lose' || hand2 === 'lose') {
	// 				message = 'You and dealer each win one';
	// 			}
	// 			else {
	// 				message = 'You win one, push';
	// 			}
	// 		}
	// 		else if (hand1 === 'win' || hand2 === 'win') {
	// 			if (hand1 === 'lose' || hand2 === 'lose') {
	// 				message = 'You and dealer each win one';
	// 			}
	// 			else {
	// 				message = 'You win one, push';
	// 			}
	// 		}
	// 		else if (hand1 === 'lose' || hand2 === 'lose') {
	// 			message = 'Dealer wins one, push';
	// 		}
	// 	}

	// 	return message;
	// }
}
