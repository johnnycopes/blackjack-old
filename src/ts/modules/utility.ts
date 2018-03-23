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
}
