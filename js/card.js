export default class Card {
  constructor(point, suit) {
    this.point = point;
    this.suit = suit;
  }

  getImageUrl() {
    let value = this.point;
    if (this.point === 11) {
      value = "jack";
    } else if (this.point === 12) {
      value = "queen";
    } else if (this.point === 13) {
      value = "king";
    } else if (this.point === 1) {
      value = "ace";
    }
    return `images/${value}_of_${this.suit}.svg`;
  }
}
