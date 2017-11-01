import Card from "./card";

export default class Hand {
  constructor(owner, hand) {
    let selector;
    if (owner === 'dealer') {
      selector = "#dealer";
    }
    else if (owner === 'player') {
      if (hand === 1) {
        selector = "#hand1";
      }
      else if (hand === 2) {
        selector = "#hand2";
      }
    }
    this.$hand = $(`${selector} .hand`);
    this.$points = $(`${selector} .points`);
    this.currentHand = hand;
    this.cards = [];
  }

  addCard(card, $card) {
    this.cards.push(card);
    this.$hand.append($card);
  }

  getPoints() {
    let total = 0;
    let aces = 0;
    for (let card of this.cards) {
      let point = card.point;
      if (point === 1) {
        total += 10;
        aces++;
      } 
      else if (point > 10) {
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

  updateDisplay(points) {
    this.$points.text(points);
  }
}
