// import { Card } from "./card";
import Hand from "./hand";
import Deck from "./deck";

export default class Game {
  constructor() {
    this.gameDeck = new Deck;
    this.playerHand = new Hand;
    this.dealerHand = new Hand;
    this.currentHand = "hand1";
    this.money = 500;
    this.currentBet = 10;
  }

  assessChange() {
    var $change = $(".change");
    if (this.change > 0) {
      $change.append('<span class="positive">+ $' + this.change + "</span>");
    } else if (this.change < 0) {
      $change.append(
        '<span class="negative">- $' + Math.abs(this.change) + "</span>"
      );
    } else if (this.change === 0) {
      $change.append("<span>" + this.change + "</span>");
    }
  }

  dealOneCard(hand, handSelector, special) {
    var card = this.gameDeck.draw();
    hand.addCard(card);
    if (special === "hole") {
      $(handSelector).append(
        '<img class="card" src="images/back-suits-red.svg"/>'
      );
    } else if (special === "double-down") {
      $(handSelector).append(
        '<img class="card card-dd" src="' + card.getImageUrl() + '"/>'
      );
    } else if (special === "split") {
      $(handSelector).append(
        '<img class="card split" src="' + card.getImageUrl() + '"/>'
      );
    } else {
      $(handSelector).append(
        '<img class="card" src="' + card.getImageUrl() + '"/>'
      );
    }
  }

  deal() {
    $(".title-screen").hide();
    $(".playerHand-div").css("width", "100%"); // reset hand adjustment for mobile in case of 'split'
    $(".hit, .stand").attr("disabled", false); // change button availability
    $(".deal").attr("disabled", true);
    $(".betting .buttons").hide();

    // shuffle deck(s) and deal cards
    this.gameDeck.shuffle();
    this.dealOneCard(this.dealerHand, ".dealer-hand", "hole");
    this.dealOneCard(this.playerHand, ".player-hand");
    this.dealOneCard(this.dealerHand, ".dealer-hand");
    this.dealOneCard(this.playerHand, ".player-hand");

    // conceal dealer total and display user total
    let dealerPoints = this.dealerHand.getPoints();
    let playerPoints = this.playerHand.getPoints();
    $(".dealer-points").text("?");
    $(".player-points").text(playerPoints);

    if (dealerPoints === 21 && playerPoints === 21) {
      this.outcome("push");
      this.dealerHand.revealHole();
      $(".dealer-points").text("Blackjack");
      $(".player-points").text("BLACKJACK HOT DAMN!");
      $(".messages").append("<h1>Push</h1>");
    } else if (dealerPoints === 21) {
      this.outcome("lose");
      this.dealerHand.revealHole();
      $(".dealer-points").text("Blackjack");
      $(".messages").append("<h1>Dealer wins</h1>");
    } else if (playerPoints === 21) {
      this.outcome("blackjack");
      this.dealerHand.revealHole();
      $(".dealer-points").text(this.dealerHand.getPoints());
      $(".player-points").text("BLACKJACK, HOT DAMN!");
      $(".messages").append("<h1>You win!</h1>");
    } else if (playerPoints === 11) {
      this.showDoubleDownBtn();
    } else if (this.playerHand.seeCard(1).point === this.playerHand.seeCard(2).point) {
      this.showSplitBtn();
    }
  }

  doubleDown() {
    // double bet and display it
    this.currentBet *= 2;
    $(".currentBet").text(this.currentBet);
    // deal the player one more card and then move on to the dealer's turn
    this.dealOneCard(this.playerHand, ".player-hand", "double-down");
    $(".player-points").text(this.playerHand.getPoints());
    this.stand("double-down");
  }

  hit() {
    // disable 'double-down' and 'split' btns if the user doesn't click them right away
    $(".double-down, .split").attr("disabled", true);
    if (this.currentHand === "hand1") {
      // split/no split determines how the card looks when dealt and what happens when the first hand busts
      if (this.splitInPlay) {
        this.dealOneCard(this.playerHand, "#hand1 .player-hand", "split");
        $("#hand1 .player-points").text(this.playerHand.getPoints());
        if (this.playerHand.getPoints() > 21) {
          this.splitInPlay = false;
          this.currentHand = "hand2";
          $("#hand1").removeClass("currentHand");
          $("#hand2").addClass("currentHand");
        }
      } else {
        // 'hit' under most circumstumstances
        this.dealOneCard(this.playerHand, "#hand1 .player-hand");
        $("#hand1 .player-points").text(this.playerHand.getPoints());
        if (this.playerHand.getPoints() > 21) {
          this.outcome("lose");
          $(".messages").append("<h1>You bust</h1>");
          $("#hand1").removeClass("currentHand");
        }
      }
    } else if (this.currentHand === "hand2") {
      this.dealOneCard(this.playerHand2, "#hand2 .player-hand", "split");
      $("#hand2 .player-points").text(this.playerHand2.getPoints());
      if (this.playerHand2.getPoints() > 21) {
        $("#hand2").removeClass("currentHand");
        // call 'stay' to evaluate outcomes
        this.stand();
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
    this.prevBet = this.currentBet;
    if (result === "blackjack") {
      this.money += this.currentBet * 1.5;
      this.change = this.currentBet * 1.5;
    } else if (result === "win") {
      this.money += this.currentBet;
      this.change = +this.currentBet;
    } else if (result === "push") {
      this.money = this.money;
      this.change = 0;
    } else if (result === "lose") {
      if (this.money - this.currentBet >= 10) {
        this.money += -this.currentBet;
        this.change = -this.currentBet;
        // drop the bet amount down to equal money amount of last bet value is greater than total money value
        if (this.currentBet > this.money) {
          this.currentBet = this.money;
          $(".currentBet").text(this.currentBet);
        }
      } else {
        this.modal("bankrupt");
      }
    }
    $(".total").text(this.money);
    $(".prevBet").append("<span>$" + this.prevBet + "</span>");
    this.assessChange();
    // change button availability
    $(".deal").attr("disabled", false);
    $(".hit, .stand").attr("disabled", true);
    $(".betting .buttons").show();
  }

  resetGame() {
    this.gameDeck = new Deck;
    this.playerHand = new Hand;
    this.dealerHand = new Hand;
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

  showDoubleDownBtn() {
    // only show the button if the player has enough money
    if (this.money > this.currentBet * 2) {
      $(".double-down").attr("disabled", false);
    }
  }

  showSplitBtn() {
    // only show the button if the player 1) has enough money and 2) is dealt two cards of the same point value (suit doesn't matter)
    if (
      this.money > this.currentBet * 2 &&
      this.playerHand.seeCard(1).point === this.playerHand.seeCard(2).point
    ) {
      $(".split").attr("disabled", false);
    }
  }

  stand(caller) {
    // if splitting, pass opportunity to split to hand2
    if (this.splitInPlay) {
      this.splitInPlay = false;
      this.currentHand = "hand2";
      $("#hand1").removeClass("currentHand");
      $("#hand2").addClass("currentHand");
    } else if (this.currentHand === "hand2") {
      // if splitting, calculate the outcome of both of the player's hands
      this.currentHand = "hand1";
      this.dealerHand.revealHole();
      while (this.dealerHand.getPoints() < 17) {
        this.dealOneCard(this.dealerHand, ".dealer-hand");
      }
      var dealerPoints = this.dealerHand.getPoints(),
        hand1Points = this.playerHand.getPoints(),
        hand2Points = this.playerHand2.getPoints();
      $(".dealer-points").text(dealerPoints);
      // evaluate player hands
      if (dealerPoints <= 21) {
        if (hand1Points > 21) {
          this.playerHand1Outcome = "lose";
        } else if (hand1Points > dealerPoints) {
          this.playerHand1Outcome = "win";
        } else if (hand1Points < dealerPoints) {
          this.playerHand1Outcome = "lose";
        } else {
          this.playerHand1Outcome = "push";
        }
        if (hand2Points > 21) {
          this.playerHand2Outcome = "lose";
        } else if (hand2Points > dealerPoints) {
          this.playerHand2Outcome = "win";
        } else if (hand2Points < dealerPoints) {
          this.playerHand2Outcome = "lose";
        } else {
          this.playerHand2Outcome = "push";
        }
      } else {
        if (hand1Points <= 21) {
          this.playerHand1Outcome = "win";
        } else {
          this.playerHand1Outcome = "lose";
        }
        if (hand2Points <= 21) {
          this.playerHand2Outcome = "win";
        } else {
          this.playerHand2Outcome = "lose";
        }
      }
      this.splitOutcome(this.playerHand1Outcome, this.playerHand2Outcome);
    } else {
      // 'stand' protocol for most games (player has only one hand)
      // disable game action buttons
      $(".hit, .stand, .double-down, .split").attr("disabled", true);
      $("#hand1, #hand2").removeClass("currentHand");
      // dealer's turn
      this.dealerHand.revealHole();
      while (this.dealerHand.getPoints() < 17) {
        this.dealOneCard(this.dealerHand, ".dealer-hand");
      }
      $(".dealer-points").text(this.dealerHand.getPoints());
      if (this.dealerHand.getPoints() > 21) {
        this.outcome("win");
        $(".messages").append("<h1>Dealer busts</h1>");
      } else if (this.dealerHand.getPoints() < this.playerHand.getPoints()) {
        this.outcome("win");
        $(".messages").append("<h1>You win!</h1>");
      } else if (this.dealerHand.getPoints() > this.playerHand.getPoints()) {
        this.outcome("lose");
        $(".messages").append("<h1>Dealer wins</h1>");
      } else {
        this.outcome("push");
        $(".messages").append("<h1>Push</h1>");
      }
      // if stand was called by clicking 'double down', do additional work
      if (caller === "double-down") {
        this.bet = this.bet / 2;
        $(".bet").text(this.bet);
        $(".double-down").attr("disabled", true);
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
    var card = this.playerHand.removeCard();
    this.playerHand2 = new Hand();
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
    $(".split").attr("disabled", true);
    $(".player-points").text(this.playerHand.getPoints());
  }

  splitOutcome(hand1, hand2) {
    if (hand1 === hand2) {
      if (hand1 === "blackjack" && hand2 === "blackjack") {
        this.outcome("blackjack");
        $(".messages").append("<h1>You win both!</h1>");
      } else if (hand1 === "win" && hand2 === "win") {
        this.outcome("win");
        $(".messages").append("<h1>You win both!</h1>");
      } else if (hand1 === "lose" && hand2 === "lose") {
        this.outcome("lose");
        $(".messages").append("<h1>Dealer wins both</h1>");
      } else {
        this.outcome("push");
        $(".messages").append("<h1>Push</h1>");
      }
    } else {
      this.currentBet /= 2;
      if (hand1 === "blackjack" || hand2 === "blackjack") {
        // calculate combined outcomes before calling the outcome method
        var bet = currentBet;
        this.currentBet *= 1.5;
        if (hand1 === "win" || hand2 === "win") {
          this.currentBet += bet;
          this.outcome("win");
          $(".messages").append("<h1>You win both!");
        } else if (hand1 === "lose" || hand2 === "lose") {
          this.currentBet -= bet;
          this.outcome("win");
          $(".messages").append("<h1>You and dealer each win one</h1>");
        } else {
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
}
