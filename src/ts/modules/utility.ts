export class Utility {
	static disable(...elements: JQuery<HTMLElement>[]): void {
		elements.forEach((element) => element.prop('disabled', true));
	}

	static enable(...elements: JQuery<HTMLElement>[]): void {
		elements.forEach((element) => element.prop('disabled', false));
	}

	static hide(...elements: JQuery<HTMLElement>[]): void {
		elements.forEach((element) => element.addClass('hide'));
	}

	static show(...elements: JQuery<HTMLElement>[]): void {
		elements.forEach((element) => element.removeClass('hide'));
	}
}
