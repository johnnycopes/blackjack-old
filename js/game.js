import Hand from "./hand";
import Deck from "./deck";

export default class Game {
  constructor() {
    this.gameDeck = new Deck;
    this.dealerHand = new Hand('dealer');
    this.playerHand = new Hand('player', 1);
    this.splitInPlay = false;
    this.money = 500;
    this.currentBet = 10;
    this.change;
    
    this.$deal = $(".deal");
    this.$hit = $(".hit");
    this.$stand = $(".stand");
    this.$doubleDown = $(".double-down");
    this.$split = $(".split");
    this.$change = $(".change");
  }

  adjustSpace() {
    let size;
    this.splitInPlay ? size = 50 : size = 100;
    $(".playerHand-div").css("width", `${size}%`);
  }

  assessChange() {
    let className = "";
    let symbol = "";
    if (this.change > 0) {
      className = "positive";
      symbol = "+";
    }
    else if (this.change < 0) {
      className = "negative";
      symbol = "-";
    }
    this.$change.append(`<span class="${className}">${symbol} $${Math.abs(this.change)}</span>`);
  }

  dealOneCard(hand, special) {
    let card = this.gameDeck.draw();
    let $card = $("<img />", {
      "class": "card", 
      "src": `${card.getImageUrl()}`
    });
    if (special === "hole") {
      $card.attr('src', "images/back-suits-red.svg");
    }
    else if (special === "double-down") {
      $card.addClass('card-dd');
    }
    else if (special === "split") {
      $card.addClass('split');
    }
    hand.addCard(card, $card);
    hand.updateDisplay(hand.getPoints());
    return hand.getPoints();
  }

  deal() {
    this.startGameMode();
    this.gameDeck.shuffle();
    this.dealOneCard(this.dealerHand, "hole");
    this.dealOneCard(this.playerHand);
    let dealerPoints = this.dealOneCard(this.dealerHand);
    let playerPoints = this.dealOneCard(this.playerHand);
    this.dealerHand.updateDisplay("?"); // conceal dealer total

    if (dealerPoints === 21 && playerPoints === 21) {
      this.outcome("push");
      this.dealerHand.updateDisplay("Blackjack");
      this.playerHand.updateDisplay("BLACKJACK, HOT DAMN!");
    }
    else if (dealerPoints === 21) {
      this.outcome("lose");
      this.dealerHand.updateDisplay("Blackjack");
      this.updateMessage("Dealer wins");
    }
    else if (playerPoints === 21) {
      this.outcome("blackjack");
      this.dealerHand.updateDisplay(dealerPoints);
      this.playerHand.updateDisplay("BLACKJACK, HOT DAMN!");
      this.updateMessage("You win!");
    }
    else if (this.money > this.currentBet * 2) {
      if (playerPoints === 11)  {
        this.enable(this.$doubleDown);
      }
      if (this.playerHand.canSplit()) {
        this.enable(this.$split);
      }
    }
  }

  dealerTurn(...hands) {
    this.dealerHand.revealHole();
    while (this.dealerHand.getPoints() < 17) {
      this.dealOneCard(this.dealerHand);
    }
    hands.forEach(hand => {this.evaluateHand(hand)});
  }

  disable(...elements) {
    for (let element of elements) {
      element.attr("disabled", true);
    }
  }

  doubleDown() {
    // double bet and display it
    this.currentBet *= 2;
    $(".currentBet").text(this.currentBet);
    // deal the player one more card and then move on to the dealer's turn
    this.dealOneCard(this.playerHand, "double-down");
    this.stand("double-down");
  }

  enable(...elements) {
    for (let element of elements) {
      element.attr("disabled", false);
    }
  }

  endGameMode() {
    this.playerHand.playing = false;
    this.selectCurrentHand(this.playerHand);
    this.dealerHand.revealHole();
    this.dealerHand.updateDisplay(this.dealerHand.getPoints());

    $(".total").text(this.money);
    $(".prevBet").append(`<span>$${this.prevBet}</span>`);
    this.assessChange();
    this.enable(this.$deal);
    this.disable(this.$hit, this.$stand);
    $(".betting .buttons").show();
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
      let currentHand = this.selectCurrentHand(this.playerHand, this.playerHand2);
      let playerPoints = this.dealOneCard(currentHand, "split");
      if (playerPoints > 21) {
        if (currentHand === this.playerHand) {
          this.playerHand.outcome = "lose";
          this.playerHand.playing = false;
          this.playerHand2.playing = true;
          this.selectCurrentHand(this.playerHand, this.playerHand2);
        }
        else if (currentHand === this.playerHand2) {
          this.playerHand2.outcome = "lose";
          this.playerHand2.playing = false;
          this.selectCurrentHand(this.playerHand, this.playerHand2);
          this.invokeOutcome(this.playerHand, this.playerHand2);
        }
      }
    }
  }

  invokeOutcome(...hands) {
    console.log(hands);
    let hand1 = hands[0].outcome;
    console.log(hand1);
    if (hands.length === 1) {
      if (hand1 === "win") {
        this.updateMessage("You win!");
        this.outcome("win");
      }
      else if (hand1 === "lose") {
        this.updateMessage("Dealer wins");
        this.outcome("lose");
      }
      else {
        this.outcome("push");
      }
    }
    else if (hands.length === 2) {
      let hand2 = hands[1].outcome;
      if (hand1 === hand2) {
        if (hand1 === "blackjack" && hand2 === "blackjack") {
          this.updateMessage("TWO BLACKJACKS!!!");
          this.outcome("blackjack");
        }
        else if (hand1 === "win" && hand2 === "win") {
          this.outcome("win");
          this.updateMessage("You win both!");
        }
        else if (hand1 === "lose" && hand2 === "lose") {
          this.outcome("lose");
          this.updateMessage("Dealer wins both");
        }
        else {
          this.outcome("push");
        }
      }
      else {
        this.currentBet /= 2;
        if (hand1 === "blackjack" || hand2 === "blackjack") {
          // calculate combined outcomes before calling the outcome method
          let bet = currentBet;
          this.currentBet *= 1.5;
          if (hand1 === "win" || hand2 === "win") {
            this.outcome("win");
            this.currentBet += bet;
            this.updateMessage("You win both!");
          }
          else if (hand1 === "lose" || hand2 === "lose") {
            this.outcome("win");
            this.currentBet -= bet;
            this.updateMessage("You and dealer each win one");
          }
          else {
            this.outcome("win");
            this.updateMessage("You win one, push");
          }
        }
        else if (hand1 === "win" || hand2 === "win") {
          if (hand1 === "push" || hand2 === "push") {
            this.outcome("win");
            this.updateMessage("You win one, push");
          }
          else {
            this.outcome("push");
          }
        }
        else if (hand1 === "lose" || hand2 === "lose") {
          this.outcome("lose");
          this.updateMessage("Dealer wins one, push")
        }
      }
      this.splitInPlay = false;
    }
  }

  makeBet() {
    var $total = $(".total"),
        $currentBet = $(".currentBet"),
        game = this;
    $total.text(this.money);
    $currentBet.text(this.currentBet);
    $(".bet-btn").on("click", function() {
      if ($(this).hasClass("add10") && game.money - game.currentBet >= 10) {
        game.currentBet += 10;
      } else if (
        $(this).hasClass("add50") &&
        game.money - game.currentBet >= 50
      ) {
        game.currentBet += 50;
      } else if (
        $(this).hasClass("add100") &&
        game.money - game.currentBet >= 100
      ) {
        game.currentBet += 100;
      } else if (
        $(this).hasClass("add500") &&
        game.money - game.currentBet >= 500
      ) {
        game.currentBet += 500;
      } else if ($(this).hasClass("all-in")) {
        game.currentBet = game.money;
      } else if ($(this).hasClass("reset")) {
        game.currentBet = 10;
      }
      $currentBet.text(game.currentBet);
    });
  }

  modal(modalType) {
    if (modalType === "bankrupt") {
      $(".modal, .modal-overlay").removeClass("hide");
      $(".modal .message").html(
        "You've lost everything." +
          "<br/><br/>" +
          "Good thing it's not real money!"
      );
      $(".modal-guts button").text("Play again");
      $(".modal-guts button").on("click", function() {
        $(".modal, .modal-overlay").addClass("hide");
        $(".title-screen").show();
        game.resetGame();
        game.resetMoney();
      });
    } else if (modalType === "help") {
      // future game feature: instructions available in help modal
    }
  }

  outcome(result) {
    this.endGameMode();

    this.prevBet = this.currentBet;
    if (result === "blackjack") {
      this.money += this.currentBet * 1.5;
      this.change = this.currentBet * 1.5;
    }
    else if (result === "win") {
      this.money += this.currentBet;
      this.change = this.currentBet;
    } 
    else if (result === "push") {
      this.updateMessage("Push");
      this.money = this.money;
      this.change = 0;
    }
    else if (result === "lose") {
      if (this.money - this.currentBet >= 10) {
        this.money -= this.currentBet;
        this.change = -this.currentBet;
        // drop the bet amount down to equal money amount of last bet value is greater than total money value
        if (this.currentBet > this.money) {
          this.currentBet = this.money;
          $(".currentBet").text(this.currentBet);
        }
      } 
      else {
        this.modal("bankrupt");
      }
    }
  }

  resetGame() {
    this.gameDeck = new Deck;
    this.dealerHand = new Hand("dealer");
    this.playerHand = new Hand("player", 1);
    $(".messages").empty();
    $(".player-hand").empty();
    $(".dealer-hand").empty();
    $(".player-points").empty();
    $(".dealer-points").empty();
    $(".change").empty();
    $(".prevBet").empty();
  }

  resetMoney() {
    this.money = 500;
    this.currentBet = 10;
    $(".total").text(this.money);
    $(".currentBet").text(this.currentBet);
  }

  selectCurrentHand(...hands) {
    let currentHand;
    for (let hand of hands) {
      hand.toggleHighlight();
      if (hand.playing) {
        currentHand = hand;
      }
    }
    return currentHand;
  }

  split() {
    this.splitInPlay = true;
    this.disable(this.$split);

    // double bet and display it
    this.currentBet = this.currentBet * 2;
    $(".currentBet").text(this.currentBet);

    // start additional hand and move one card from hand 1 to hand 2
    this.adjustSpace();
    this.playerHand2 = new Hand("player", 2);
    let removedCard = this.playerHand.removeCard();
    this.playerHand2.addCard(removedCard.card, removedCard.$card);
    this.dealOneCard(this.playerHand);
    this.dealOneCard(this.playerHand2);
  }

  stand(caller) {
    if (!this.splitInPlay) {
      this.disable(this.$hit, this.$stand, this.$doubleDown, this.$split);
      // if stand was called by clicking 'double down', do additional work
      if (caller === "double-down") {
        this.bet = this.bet / 2;
        $(".bet").text(this.bet);
        this.disable(this.$doubleDown);
      }
      this.dealerTurn(this.playerHand);
      this.invokeOutcome(this.playerHand);
    }
    else {
      let currentHand = this.selectCurrentHand(this.playerHand, this.playerHand2);
      if (currentHand === this.playerHand) {
        this.playerHand.playing = false;
        this.playerHand2.playing = true;
        this.selectCurrentHand(this.playerHand, this.playerHand2);
      } 
      else if (currentHand === this.playerHand2) {
        this.playerHand2.playing = false;
        this.selectCurrentHand(this.playerHand, this.playerHand2);
        this.dealerTurn(this.playerHand, this.playerHand2);
        this.invokeOutcome(this.playerHand, this.playerHand2);
      }
    }
  }

  startGameMode() {
    $(".title-screen").hide();
    this.adjustSpace();
    this.enable(this.$hit, this.$stand);
    this.disable(this.$deal);
    $(".betting .buttons").hide();
    this.playerHand.playing = true;
    this.selectCurrentHand(this.playerHand);  
  }

  updateMessage(message) {
    $(".messages").append(`<h1>${message}</h1>`);
  }
}
