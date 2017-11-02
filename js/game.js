// import { Card } from "./card";
import Hand from "./hand";
import Deck from "./deck";

export default class Game {
  constructor() {
    this.gameDeck = new Deck;
    this.dealerHand = new Hand('dealer');
    this.playerHand = new Hand('player', 1);
    this.currentHand = "hand1";
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
    this.$change.append(`<span class="${className}">${symbol} $${this.change}</span>`);
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
  }

  deal() {
    this.gameMode();

    // shuffle deck(s) and deal cards
    this.gameDeck.shuffle();
    this.dealOneCard(this.dealerHand, "hole");
    this.dealOneCard(this.playerHand);
    this.dealOneCard(this.dealerHand);
    this.dealOneCard(this.playerHand);

    // conceal dealer total and display user total
    let dealerPoints = this.dealerHand.getPoints();
    let playerPoints = this.playerHand.getPoints();
    this.dealerHand.updateDisplay("?");
    this.playerHand.updateDisplay(playerPoints);

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
    this.playerHand.updateDisplay(this.playerHand.getPoints());
    this.stand("double-down");
  }

  enable(...elements) {
    for (let element of elements) {
      element.attr("disabled", false);
    }
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

  gameMode() {
    $(".title-screen").hide();
    $(".playerHand-div").css("width", "100%"); // reset hand adjustment for mobile in case of 'split'
    this.enable(this.$hit, this.$stand);
    this.disable(this.$deal);
    $(".betting .buttons").hide();
  }

  hit() {
    this.disable(this.$doubleDown, this.$split);
    if (this.currentHand === "hand1") {
      if (!this.splitInPlay) {
        this.dealOneCard(this.playerHand);
        let playerPoints = this.playerHand.getPoints();
        this.playerHand.updateDisplay(playerPoints);
        if (playerPoints > 21) {
          this.updateMessage("You bust");
          this.outcome("lose");
        }
      }
      else { // split is in play
        this.dealOneCard(this.playerHand, "split");
        let playerPoints = this.playerHand.getPoints();
        this.playerHand.updateDisplay(playerPoints);
        if (playerPoints > 21) {
          this.splitInPlay = false;
          this.currentHand = "hand2";
          $("#hand1").removeClass("currentHand");
          $("#hand2").addClass("currentHand");
        }
      }
    }
    else if (this.currentHand === "hand2") {
      this.dealOneCard(this.playerHand2, "split");
      let playerPoints = this.playerHand2.getPoints();
      this.playerHand2.updateDisplay(playerPoints);
      if (playerPoints > 21) {
        $("#hand2").removeClass("currentHand");
        this.stand();
      }
    }
  }

  invokeOutcome(...hands) {
    let hand1 = hands[0];
    if (hands.length === 1) {
      if (hand1.outcome === "win") {
        this.updateMessage("You win!");
        this.outcome("win");
      }
      else if (hand1.outcome === "lose") {
        this.updateMessage("Dealer wins");
        this.outcome("lose");
      }
      else {
        this.outcome("push");
      }
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
    this.dealerHand.revealHole();
    this.dealerHand.updateDisplay(this.dealerHand.getPoints());
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
    $(".total").text(this.money);
    $(".prevBet").append(`<span>$${this.prevBet}</span>`);
    this.assessChange();
    this.enable(this.$deal);
    this.disable(this.$hit, this.$stand);
    $(".betting .buttons").show();
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
    $("#hand2").remove();
    $(".change").empty();
    $(".prevBet").empty();
  }

  resetMoney() {
    this.money = 500;
    this.currentBet = 10;
    $(".total").text(this.money);
    $(".currentBet").text(this.currentBet);
  }

  stand(caller) {
    // if splitting, give hand2 opportunity to hit
    if (this.splitInPlay) {
      this.splitInPlay = false;
      this.currentHand = "hand2";
      $("#hand1").removeClass("currentHand");
      $("#hand2").addClass("currentHand");
    }
    else if (this.currentHand === "hand2") {
      // if splitting, calculate the outcome of both of the player's hands
      this.currentHand = "hand1";
      this.dealerHand.revealHole();
      while (this.dealerHand.getPoints() < 17) {
        this.dealOneCard(this.dealerHand);
      }
      let dealerPoints = this.dealerHand.getPoints();
      this.dealerHand.updateDisplay(dealerPoints);
      if (dealerPoints > 21) {
        this.playerHand.outcome = "win";
        this.playerHand2.outcome = "win";
      }
      else {
        this.evaluateHand(this.playerHand);
        this.evaluateHand(this.playerHand2);
      }
      this.splitOutcome();
    } 
    else {
      this.disable(this.$hit, this.$stand, this.$doubleDown, this.$split);
      $("#hand1, #hand2").removeClass("currentHand");
      // if stand was called by clicking 'double down', do additional work
      if (caller === "double-down") {
        this.bet = this.bet / 2;
        $(".bet").text(this.bet);
        this.disable(this.$doubleDown);
      }
      // dealer's turn
      this.dealerHand.revealHole();
      while (this.dealerHand.getPoints() < 17) {
        this.dealOneCard(this.dealerHand);
        this.dealerHand.updateDisplay(this.dealerHand.getPoints());
      }
      if (this.dealerHand.getPoints() > 21) {
        this.updateMessage("Dealer busts");
        this.outcome("win");
      }
      else {
        this.evaluateHand(this.playerHand);
        this.invokeOutcome(this.playerHand);
      }
    }
  }

  split() {
    this.splitInPlay = true;
    $("#hand1").addClass("currentHand");
    // double bet and display it
    this.currentBet = this.currentBet * 2;
    $(".currentBet").text(this.currentBet);
    // start additional hand and move one card from hand 1 to hand 2
    let card = this.playerHand.removeCard();
    this.playerHand2 = new Hand("player", 2);
    this.playerHand2.addCard(card);
    // update all visual representation of changes on screen
    $(".player").append(
      '<div id="hand2" class="playerHand-div">' +
        '<div class="player-hand" class="hand">' +
        '<img class="card" src="' +
        this.playerHand2.seeCard(1).getImageUrl() +
        '"/>' +
        "</div>" +
        '<h1 class="player-points" class="points"></h1>' +
        "</div>"
    );
    $(".playerHand-div").css("width", "50%");
    $("#hand1 .player-hand img:last-child").remove();
    this.disable(this.$split);
    this.playerHand.updateDisplay(this.playerHand.getPoints());
  }

  // TODO: evaluate this logic and reduce where possible
  splitOutcome() {
    let hand1 = this.playerHand.outcome;
    let hand2 = this.playerHand2.outcome;
    if (hand1 === hand2) {
      if (hand1 === "blackjack" && hand2 === "blackjack") {
        this.outcome("blackjack");
        this.updateMessage("TWO BLACKJACKS!!!");
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
        this.updateMessage("Push");
      }
    } 
    else {
      this.currentBet /= 2;
      if (hand1 === "blackjack" || hand2 === "blackjack") {
        // calculate combined outcomes before calling the outcome method
        var bet = currentBet;
        this.currentBet *= 1.5;
        if (hand1 === "win" || hand2 === "win") {
          this.currentBet += bet;
          this.outcome("win");
          $(".messages").append("<h1>You win both!");
        } 
        else if (hand1 === "lose" || hand2 === "lose") {
          this.currentBet -= bet;
          this.outcome("win");
          $(".messages").append("<h1>You and dealer each win one</h1>");
        } 
        else {
          this.outcome("win");
          $(".messages").append("<h1>You win one, push</h1>");
        }
      } else if (hand1 === "win" || hand2 === "win") {
        if (hand1 === "push" || hand2 === "push") {
          this.outcome("win");
          $(".messages").append("<h1>You win one, push</h1>");
        } else {
          this.outcome("push");
          $(".messages").append("<h1>Push</h1>");
        }
      } else if (hand1 === "lose" || hand2 === "lose") {
        this.outcome("lose");
        $(".messages").append("<h1>Dealer wins one, push</h1>");
      }
    }
  }

  updateMessage(message) {
    $(".messages").append(`<h1>${message}</h1>`);
  }
}
