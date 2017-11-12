import Hand from "./hand";
import Deck from "./deck";
import Wallet from "./wallet";

export default class Game {
  constructor() {
    this.animationDuration = 500;
    this.$titleScreen = $(".title-screen");
    this.$betting = $(".betting");
    this.$modal = $(".modal");
    this.$modalBtn = $(".modal-btn");
    this.$message = $(".message");
    this.$hand = $(".hand");
    this.$deal = $(".deal");
    this.$hit = $(".hit");
    this.$stand = $(".stand");
    this.$doubleDown = $(".double-down");
    this.$split = $(".split");
    
    this.$deal.on("click", () => { this.deal(); });
    this.$hit.on("click", () => { this.hit(); });
    this.$stand.on("click", () => { this.stand(); });
    this.$doubleDown.on("click", () => { this.doubleDown(); });
    this.$split.on("click", () => { this.split(); });
    
    this.newGame();
  }

  adjustSpace() {
    if (this.splitInPlay) {
      this.dealerHand.$wrapper.css("grid-column", "2 / 4");
      this.playerHand.$wrapper.css("grid-column", "4 / 6");
      this.playerHand2.$wrapper.css("grid-column", "6 / 8");
    }
    else {
      this.dealerHand.$wrapper.css("grid-column", "2 / 5");
      this.playerHand.$wrapper.css("grid-column", "5 / 8");
    }
  }

  calibrateSlider() {

  }

  deal() {
    this.prepareRound();
    this.dealHands();
    if (this.playing) {
      this.startRound();
    }
  }

  dealOneCard(hand, special) {
    let card = this.gameDeck.draw();
    let $card = $("<img />", {
      "class": "card",
      "src": `${card.getImageUrl()}`
    });
    if (special === "hole") {
      $card.attr('src', "img/back-suits-red.svg");
    }
    else if (special === "double-down") {
      $card.addClass('card-dd');
    }
    hand.addCard(card, $card);
    hand.updateDisplay(hand.getPoints());
    return hand.getPoints();
  }

  dealHands() {
    this.dealOneCard(this.dealerHand, "hole");
    this.dealOneCard(this.playerHand);
    let dealerPoints = this.dealOneCard(this.dealerHand);
    let playerPoints = this.dealOneCard(this.playerHand);
    this.dealerHand.updateDisplay("?"); // conceal dealer total
    if (dealerPoints === 21 && playerPoints === 21) {
      this.dealerHand.updateDisplay("Blackjack");
      this.playerHand.updateDisplay("BLACKJACK, HOT DAMN!");
      this.outcome("push");
    }
    else if (dealerPoints === 21) {
      this.dealerHand.updateDisplay("Blackjack");
      this.outcome("lose");
    }
    else if (playerPoints === 21) {
      this.updateMessage("You win!");
      this.dealerHand.updateDisplay(dealerPoints);
      this.playerHand.updateDisplay("BLACKJACK, HOT DAMN!");
      this.outcome("blackjack");
    }
    else {
      this.playing = true;
    }
  }

  dealerTurn() {
    this.dealerHand.revealHole();
    while (this.dealerHand.getPoints() < 17) {
      this.dealOneCard(this.dealerHand);
    }
    this.dealerHand.updateDisplay(this.dealerHand.getPoints());
  }

  disable(...elements) {
    for (let element of elements) {
      element.attr("disabled", true);
    }
  }

  doubleDown() {
    this.wallet.doubleBet();
    // deal the player one more card and then move on to the dealer's turn
    this.dealOneCard(this.playerHand, "double-down");
    this.stand();
  }

  enable(...elements) {
    for (let element of elements) {
      element.attr("disabled", false);
    }
  }

  endRound() {
    this.playing = false;
    this.highlightOff(this.playerHand);

    this.dealerTurn();
    this.wallet.assessChange();
    
    this.$betting.show();
    this.enable(this.$deal);
    this.disable(this.$hit, this.$stand);
  }

  evaluateHand(hand) {
    let dealerPoints = this.dealerHand.getPoints();
    let playerPoints = hand.getPoints();
    if (hand.outcome) {
      return;
    }
    else if (dealerPoints > 21 || playerPoints > dealerPoints) {
      hand.outcome = "win";
    }
    else if (playerPoints < dealerPoints) {
      hand.outcome = "lose";
    }
    else {
      hand.outcome = "push";
    }
  }
  
  getCurrentHand() {
    const hands = [this.playerHand, this.playerHand2];
    return hands.filter(hand => hand.playing === true)[0];
  }

  hideElement(element) {
    element.addClass("hide-animation");
    setTimeout(function() {
      element.addClass("hide");
    }, this.animationDuration);
  }

  highlightOff(hand) {
    hand.playing = false;
    hand.toggleHighlight();
  }

  highlightOn(hand) {
    hand.playing = true;
    hand.toggleHighlight();
  }

  hit() {
    this.disable(this.$doubleDown, this.$split);
    if (!this.splitInPlay) {
      let playerPoints = this.dealOneCard(this.playerHand);
      if (playerPoints > 21) {
        this.updateMessage("You bust");
        this.outcome("lose");
      }
    }
    else {
      let currentHand = this.getCurrentHand();
      let playerPoints = this.dealOneCard(currentHand);
      if (playerPoints > 21) {
        currentHand.outcome = "lose";
        this.splitGameplay(currentHand);
      }
    }
  }

  makeBet() {
    const game = this;
    $(".bet-btn").on("click", function() {
      const possibleBet = game.wallet.money - game.wallet.bet;
      if ($(this).hasClass("add10") && possibleBet >= 10) {
        game.wallet.bet += 10;
      }
      else if ($(this).hasClass("add50") && possibleBet >= 50) {
        game.wallet.bet += 50;
      }
      else if ($(this).hasClass("add100") && possibleBet >= 100) {
        game.wallet.bet += 100;
      }
      else if ($(this).hasClass("add500") && possibleBet >= 500) {
        game.wallet.bet += 500;
      }
      else if ($(this).hasClass("all-in")) {
        game.wallet.bet = game.wallet.money;
      }
      else if ($(this).hasClass("reset")) {
        game.wallet.bet = 10;
      }
      game.wallet.update();
    });
  }

  multipleOutcomes(...hands) {
    let hand1 = hands[0];
    let hand2 = hands[1];
    if (hand1 === hand2) {
      if (hand1 === "blackjack") {
        this.updateMessage("TWO BLACKJACKS!!!");
      }
      else if (hand1 === "win") {
        this.updateMessage("You win both!");
      }
      else if (hand1 === "lose") {
        this.updateMessage("Dealer wins both");
      }
      else {
        this.updateMessage("Push both");
      }
      this.wallet.payout(hand1);
    }
    else if (hand1 !== hand2) {
      // calculate value of each hand outcome before calling payout function
      let initialBet = this.wallet.bet / 2;
      let hand1Value = 0;
      let hand2Value = 0;
      if (hand1 === "blackjack" || hand2 === "blackjack") {
        hand1Value = initialBet * 1.5;
        if (hand1 === "win" || hand2 === "win") {
          hand2Value = initialBet;
          this.updateMessage("You win both!");
        }
        else if (hand1 === "lose" || hand2 === "lose") {
          hand2Value = -initialBet;
          this.updateMessage("You and dealer each win one");
        }
        else {
          this.updateMessage("You win one, push");
        }
      } 
      else if (hand1 === "win" || hand2 === "win") {
        hand1Value = initialBet;
        if (hand1 === "lose" || hand2 === "lose") {
          hand2Value = -initialBet;
          this.updateMessage("You and dealer each win one");
        }
        else {
          this.updateMessage("You win one, push");
        }
      }
      else if (hand1 === "lose" || hand2 === "lose") {
        hand1Value = -initialBet;
        this.updateMessage("Dealer wins one, push");
      }
      this.wallet.payout("custom", hand1Value, hand2Value);
    }
    this.endRound();
  }

  modal(modalType) {
    if (modalType === "bankrupt") {
      this.$modal.removeClass("hide");
      this.$modalBtn.on("click", () => {
        this.$modal.addClass("hide");
        this.newGame();
      });
    }
    else if (modalType === "help") {
      // future game feature: instructions available in help modal
    }
  }

  newGame() {
    this.wallet = new Wallet();
    this.gameDeck = new Deck();
    this.gameDeck.generate(3);
    this.gameDeck.shuffle();
    this.dealerHand = new Hand("dealer");
    this.playerHand = new Hand("player", 1);
    this.playerHand2 = null;
    this.splitInPlay = false;
    this.playing = false;
    this.makeBet();
  }

  outcome(result) {
    this.wallet.payout(result);
    if (result === "win") {
      this.updateMessage("You win!");
    }
    else if (result === "push") {
      this.updateMessage("Push");
    }
    else if (result === "lose") {
      this.updateMessage("Dealer wins");
      if (this.wallet.money - this.wallet.bet <= 0) {
        this.modal("bankrupt");
      }
    }
    this.endRound();
  }

  prepareRound() {
    this.$titleScreen.hide();
    this.$betting.hide();
    this.disable(this.$deal);

    this.removeHand(this.playerHand2);
    this.splitInPlay = false;
    this.adjustSpace();

    this.updateMessage("");
    this.wallet.resetChange();
    this.playerHand.newHand();
    this.dealerHand.newHand();
  }

  removeHand(hand) {
    if (hand) {
      hand.clear();
      hand = null;
    }
  }

  showElement(element) {
    element.removeClass("hide-animation");
    setTimeout(function() {
      element.removeClass("hide");
    }, this.animationDuration);
  }

  split() {
    this.splitInPlay = true;
    this.disable(this.$split);
    this.wallet.doubleBet();

    // start additional hand and move one card from hand 1 to hand 2
    this.playerHand2 = new Hand("player", 2);
    this.adjustSpace();
    let removedCard = this.playerHand.removeCard();
    this.playerHand2.addCard(removedCard.card, removedCard.$card);
    this.dealOneCard(this.playerHand);
    this.dealOneCard(this.playerHand2);
  }

  splitGameplay(currentHand) {
    if (currentHand === this.playerHand) {
      this.highlightOff(this.playerHand);
      this.highlightOn(this.playerHand2);
    }
    else if (currentHand === this.playerHand2) {
      this.highlightOff(this.playerHand2);
      this.evaluateHand(this.playerHand);
      this.evaluateHand(this.playerHand2);
      this.multipleOutcomes(this.playerHand.outcome, this.playerHand2.outcome);
    }
  }

  stand() {
    if (!this.splitInPlay) {
      this.disable(this.$hit, this.$stand, this.$doubleDown, this.$split);
      this.highlightOff(this.playerHand);
      this.dealerTurn();
      this.evaluateHand(this.playerHand);
      this.outcome(this.playerHand.outcome);
    }
    else {
      let currentHand = this.getCurrentHand();
      this.splitGameplay(currentHand);
    }
  }

  startRound() {
    this.highlightOn(this.playerHand);
    this.enable(this.$hit, this.$stand);
    if (this.wallet.money > this.wallet.bet * 2) {
      if (this.playerHand.canDoubleDown()) {
        this.enable(this.$doubleDown);
      }
      if (this.playerHand.canSplit()) {
        this.enable(this.$split);
      }
    }
  }

  updateMessage(message) {
    this.$message.text(message);
  }
}
