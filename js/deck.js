import Card from "./card";
import Hand from "./hand";

export default class Deck {
  constructor() {
    this.cards = [];
  }

  draw() {
    return this.cards.pop();
  }

  generate(numDecks) {
    if (!numDecks) {
      numDecks = 1;
    }
    while (numDecks > 0) {
      for (var i = 1; i <= 13; i++) {
        this.cards.push(new Card(i, "spades"));
        this.cards.push(new Card(i, "diamonds"));
        this.cards.push(new Card(i, "hearts"));
        this.cards.push(new Card(i, "clubs"));
      }
      numDecks--;
    }
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i]] = [this.cards[j]];
    }
  }
}
