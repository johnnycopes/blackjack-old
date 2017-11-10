import Hand from "./hand";
import Deck from "./deck";
import Wallet from "./wallet";

export default class Game {
  constructor() {
    this.animationDuration = 500;
    this.$titleScreen = $(".title-screen");
    this.$betting = $(".betting");
    this.$modal = $(".modal");
    this.$message = $(".message");
    this.$hand = $(".hand");
    this.$deal = $(".deal");
    this.$hit = $(".hit");
    this.$stand = $(".stand");
    this.$doubleDown = $(".double-down");
    this.$split = $(".split");
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
    this.startGameMode();
    this.dealOneCard(this.dealerHand, "hole");
    this.dealOneCard(this.playerHand);
    let dealerPoints = this.dealOneCard(this.dealerHand);
    let playerPoints = this.dealOneCard(this.playerHand);
    this.dealerHand.updateDisplay("?"); // conceal dealer total

    if (dealerPoints === 21 && playerPoints === 21) {
      this.updateMessage("Push");
      this.dealerHand.updateDisplay("Blackjack");
      this.playerHand.updateDisplay("BLACKJACK, HOT DAMN!");
    }
    else if (dealerPoints === 21) {
      this.updateMessage("Dealer wins");
      this.dealerHand.updateDisplay("Blackjack");
      this.outcome("lose");
    }
    else if (playerPoints === 21) {
      this.updateMessage("You win!");
      this.dealerHand.updateDisplay(dealerPoints);
      this.playerHand.updateDisplay("BLACKJACK, HOT DAMN!");
      this.outcome("blackjack");
    }
    else if (this.wallet.money > this.wallet.bet * 2) {
      if (playerPoints === 11)  {
        this.enable(this.$doubleDown);
      }
      if (this.playerHand.canSplit()) {
        this.enable(this.$split);
      }
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

  dealerTurn(...hands) {
    this.dealerHand.revealHole();
    while (this.dealerHand.getPoints() < 17) {
      this.dealOneCard(this.dealerHand);
    }
    hands.forEach(hand => {
      if (!hand.outcome) {
        this.evaluateHand(hand)
      }
    });
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

  endGameMode() {
    this.highlightOff(this.playerHand);
    this.dealerHand.revealHole();
    this.dealerHand.updateDisplay(this.dealerHand.getPoints());
    this.wallet.update();
    this.wallet.assessChange();
    $(".betting").show();
    this.enable(this.$deal);
    this.disable(this.$hit, this.$stand);
  }

  evaluateHand(hand) {
    let dealerPoints = this.dealerHand.getPoints();
    let playerPoints = hand.getPoints();
    if (dealerPoints > 21 || playerPoints > dealerPoints) {
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
        if (currentHand === this.playerHand) {
          this.highlightOff(this.playerHand);
          this.highlightOn(this.playerHand2);
        }
        else if (currentHand === this.playerHand2) {
          this.highlightOff(this.playerHand2);
          this.invokeOutcome(this.playerHand, this.playerHand2);
        }
      }
    }
  }

  invokeOutcome(...hands) {
    let hand1 = hands[0].outcome;
    if (hands.length === 1) {
      if (hand1 === "win") {
        this.updateMessage("You win!");
      }
      else if (hand1 === "lose") {
        this.updateMessage("Dealer wins");
      }
      this.outcome(hand1)
    }
    else if (hands.length === 2) {
      this.multipleOutcomes(hands);
    }
  }

  makeBet() {
    const game = this;
    this.wallet.update();
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

  multipleOutcomes(hands) {
    let hand1 = hands[0].outcome;
    let hand2 = hands[1].outcome;
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
    this.endGameMode();
  }

  modal(modalType) {
    if (modalType === "bankrupt") {
      const game = this;
      $(".modal, .modal-overlay").removeClass("hide");
      $(".modal-guts button").on("click", function() {
        $(".modal, .modal-overlay").addClass("hide");
        game.newGame();
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
    this.makeBet();
  }

  outcome(result) {
    this.wallet.payout(result);
    if (result === "push") {
      this.updateMessage("Push");
    }
    else if (result === "lose") {
      if (this.wallet.money - this.wallet.bet <= 0) {
        this.modal("bankrupt");
      }
    }
    this.endGameMode();
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

  stand() {
    if (!this.splitInPlay) {
      this.disable(this.$hit, this.$stand, this.$doubleDown, this.$split);
      this.highlightOff(this.playerHand);
      this.dealerTurn(this.playerHand);
      this.invokeOutcome(this.playerHand);
    }
    else {
      let currentHand = this.getCurrentHand();
      if (currentHand === this.playerHand) {
        this.highlightOff(this.playerHand);
        this.highlightOn(this.playerHand2);
      } 
      else if (currentHand === this.playerHand2) {
        this.highlightOff(this.playerHand2);
        this.dealerTurn(this.playerHand, this.playerHand2);
        this.invokeOutcome(this.playerHand, this.playerHand2);
      }
    }
  }

  startGameMode() {
    this.$titleScreen.hide();
    this.$betting.hide();
    this.disable(this.$deal);
    this.splitInPlay = false;
    this.updateMessage("");
    this.adjustSpace();
    this.removeHand(this.playerHand2);
    this.wallet.resetChange();
    this.playerHand.newHand();
    this.dealerHand.newHand();
    this.highlightOn(this.playerHand);
    this.enable(this.$hit, this.$stand);
  }

  updateMessage(message) {
    this.$message.text(message);
  }
}
