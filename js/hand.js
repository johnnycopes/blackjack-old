import Card from "./card";

export default class Hand {
  constructor(card) {
    this.cards = [];
  }

  addCard(card) {
    this.cards.push(card);
  }

  getPoints() {
    var total = 0,
      aces = 0;
    for (var i = 0; i < this.cards.length; i++) {
      var point = this.cards[i].point;
      if (point === 1) {
        total += 10;
        aces++;
      } else if (point > 10) {
        point = 10;
      }
      total += point;
      while (total > 21 && aces > 0) {
        total -= 10;
        aces--;
      }
    }
    return total;
  }

  removeCard() {
    return this.cards.pop();
  }

  revealHole() {
    $(".dealer-hand img:first-child").attr("src", this.cards[0].getImageUrl());
  }

  seeCard(index) {
    return this.cards[index - 1];
  }
}
