import Card from "./card";
import Hand from "./hand";

export default class Deck {
  constructor(num) {
    this.cards = [];
  }

  draw() {
    return this.cards.pop();
  }

  generate(num) {
    if (num === undefined) {
      num = 1;
    }
    while (num > 0) {
      for (var i = 1; i <= 13; i++) {
        this.cards.push(new Card(i, "spades"));
        this.cards.push(new Card(i, "diamonds"));
        this.cards.push(new Card(i, "hearts"));
        this.cards.push(new Card(i, "clubs"));
      }
      num--;
    }
  }

  shuffle() {
    var i = 0,
      j = 0,
      temp = null;
    for (i = this.cards.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = this.cards[i];
      this.cards[i] = this.cards[j];
      this.cards[j] = temp;
    }
  }
}
