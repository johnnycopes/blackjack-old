export class Utility {
	static disable(...elements: JQuery<HTMLElement>[]): void {
		elements.forEach((element) => element.prop('disabled', true));
	}

	static enable(...elements: JQuery<HTMLElement>[]): void {
		elements.forEach((element) => element.prop('disabled', false));
	}
}
