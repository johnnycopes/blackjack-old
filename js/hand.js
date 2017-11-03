import Card from "./card";

export default class Hand {
  constructor(owner, handNumber) {
    let selector;
    if (owner === 'dealer') {
      selector = "#dealer";
    }
    else if (owner === 'player') {
      if (handNumber === 1) {
        selector = "#hand1";
      }
      else if (handNumber === 2) {
        selector = "#hand2";
      }
    }
    this.$wrapper = $(`${selector}`);
    this.$hand = $(`${selector} .hand`);
    this.$points = $(`${selector} .points`);
    this.playing = false;
    this.cards = [];
    this.outcome;
  }

  addCard(card, $card) {
    this.cards.push(card);
    this.$hand.append($card);
  }

  canSplit() {
    return this.cards[0].point === this.cards[1].point;
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
    let card = this.cards.pop();
    let $card = this.$hand.find("img:last-child").remove();
    return {card, $card};
  }

  revealHole() {
    this.$hand.find('img:first-child').attr('src', this.cards[0].getImageUrl());
  }

  seeCard(index) {
    return this.cards[index - 1];
  }

  updateDisplay(content) {
    this.$points.text(content);
  }
}
