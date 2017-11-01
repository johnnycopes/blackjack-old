/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _card = __webpack_require__(1);

var _card2 = _interopRequireDefault(_card);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Hand = function () {
  function Hand(owner, hand) {
    _classCallCheck(this, Hand);

    var selector = void 0;
    if (owner === 'dealer') {
      selector = "#dealer";
    } else if (owner === 'player') {
      if (hand === 1) {
        selector = "#hand1";
      } else if (hand === 2) {
        selector = "#hand2";
      }
    }
    this.$hand = $(selector + " .hand");
    this.$points = $(selector + " .points");
    this.currentHand = hand;
    this.cards = [];
  }

  _createClass(Hand, [{
    key: "addCard",
    value: function addCard(card, $card) {
      this.cards.push(card);
      this.$hand.append($card);
    }
  }, {
    key: "getPoints",
    value: function getPoints() {
      var total = 0;
      var aces = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.cards[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var card = _step.value;

          var point = card.point;
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
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return total;
    }
  }, {
    key: "removeCard",
    value: function removeCard() {
      return this.cards.pop();
    }
  }, {
    key: "revealHole",
    value: function revealHole() {
      $(".dealer-hand img:first-child").attr("src", this.cards[0].getImageUrl());
    }
  }, {
    key: "seeCard",
    value: function seeCard(index) {
      return this.cards[index - 1];
    }
  }, {
    key: "updateDisplay",
    value: function updateDisplay(points) {
      this.$points.text(points);
    }
  }]);

  return Hand;
}();

exports.default = Hand;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Card = function () {
  function Card(point, suit) {
    _classCallCheck(this, Card);

    this.point = point;
    this.suit = suit;
  }

  _createClass(Card, [{
    key: "getImageUrl",
    value: function getImageUrl() {
      var value = this.point;
      if (this.point === 11) {
        value = "jack";
      } else if (this.point === 12) {
        value = "queen";
      } else if (this.point === 13) {
        value = "king";
      } else if (this.point === 1) {
        value = "ace";
      }
      return "images/" + value + "_of_" + this.suit + ".svg";
    }
  }]);

  return Card;
}();

exports.default = Card;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(3);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var currentGame = new _game2.default();

currentGame.makeBet();

$('.deal').on('click', function () {
  currentGame.resetGame();
  currentGame.gameDeck.generate(3);
  currentGame.deal();
});

$('.hit').on('click', function () {
  currentGame.hit();
});

$('.stand').on('click', function () {
  currentGame.stand();
});

$('.double-down').on('click', function () {
  currentGame.doubleDown();
});

$('.split').on('click', function () {
  currentGame.split();
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // import { Card } from "./card";


var _hand = __webpack_require__(0);

var _hand2 = _interopRequireDefault(_hand);

var _deck = __webpack_require__(4);

var _deck2 = _interopRequireDefault(_deck);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.gameDeck = new _deck2.default();
    this.dealerHand = new _hand2.default('dealer');
    this.playerHand = new _hand2.default('player', 1);
    this.currentHand = "hand1";
    this.splitInPlay = false;
    this.money = 500;
    this.currentBet = 10;
  }

  _createClass(Game, [{
    key: "assessChange",
    value: function assessChange() {
      var $change = $(".change");
      if (this.change > 0) {
        $change.append('<span class="positive">+ $' + this.change + "</span>");
      } else if (this.change < 0) {
        $change.append('<span class="negative">- $' + Math.abs(this.change) + "</span>");
      } else if (this.change === 0) {
        $change.append("<span>" + this.change + "</span>");
      }
    }
  }, {
    key: "dealOneCard",
    value: function dealOneCard(hand, special) {
      var card = this.gameDeck.draw();
      var $card = $("<img />", {
        "class": "card",
        "src": "" + card.getImageUrl()
      });
      if (special === "hole") {
        $card.attr('src', "images/back-suits-red.svg");
      } else if (special === "double-down") {
        $card.addClass('card-dd');
      } else if (special === "split") {
        $card.addClass('split');
      }
      hand.addCard(card, $card);
    }
  }, {
    key: "deal",
    value: function deal() {
      $(".title-screen").hide();
      $(".playerHand-div").css("width", "100%"); // reset hand adjustment for mobile in case of 'split'
      $(".hit, .stand").attr("disabled", false); // change button availability
      $(".deal").attr("disabled", true);
      $(".betting .buttons").hide();

      // shuffle deck(s) and deal cards
      this.gameDeck.shuffle();
      this.dealOneCard(this.dealerHand, "hole");
      this.dealOneCard(this.playerHand);
      this.dealOneCard(this.dealerHand);
      this.dealOneCard(this.playerHand);

      // conceal dealer total and display user total
      var dealerPoints = this.dealerHand.getPoints();
      var playerPoints = this.playerHand.getPoints();
      this.dealerHand.updateDisplay("?");
      this.playerHand.updateDisplay(playerPoints);

      if (dealerPoints === 21 && playerPoints === 21) {
        this.outcome("push");
        $(".dealer-points").text("Blackjack");
        $(".player-points").text("BLACKJACK HOT DAMN!");
        $(".messages").append("<h1>Push</h1>");
      } else if (dealerPoints === 21) {
        this.outcome("lose");
        $(".dealer-points").text("Blackjack");
        $(".messages").append("<h1>Dealer wins</h1>");
      } else if (playerPoints === 21) {
        this.outcome("blackjack");
        $(".dealer-points").text(this.dealerHand.getPoints());
        $(".player-points").text("BLACKJACK, HOT DAMN!");
        $(".messages").append("<h1>You win!</h1>");
      } else if (playerPoints === 11) {
        this.showDoubleDownBtn();
      } else if (this.playerHand.seeCard(1).point === this.playerHand.seeCard(2).point) {
        this.showSplitBtn();
      }
    }
  }, {
    key: "doubleDown",
    value: function doubleDown() {
      // double bet and display it
      this.currentBet *= 2;
      $(".currentBet").text(this.currentBet);
      // deal the player one more card and then move on to the dealer's turn
      this.dealOneCard(this.playerHand, ".player-hand", "double-down");
      $(".player-points").text(this.playerHand.getPoints());
      this.stand("double-down");
    }
  }, {
    key: "hit",
    value: function hit() {
      // disable 'double-down' and 'split' btns if the user doesn't click them right away
      $(".double-down, .split").attr("disabled", true);
      if (this.currentHand === "hand1") {
        // split/no split determines how the card looks when dealt and what happens when the first hand busts
        if (!this.splitInPlay) {
          this.dealOneCard(this.playerHand, "#hand1 .player-hand");
          var playerPoints = this.playerHand.getPoints();
          $("#hand1 .player-points").text(playerPoints);
          if (playerPoints > 21) {
            this.outcome("lose");
            $(".messages").append("<h1>You bust</h1>");
            $("#hand1").removeClass("currentHand");
          }
        } else {
          this.dealOneCard(this.playerHand, "#hand1 .player-hand", "split");
          var _playerPoints = this.playerHand.getPoints();
          $("#hand1 .player-points").text(_playerPoints);
          if (_playerPoints > 21) {
            this.splitInPlay = false;
            this.currentHand = "hand2";
            $("#hand1").removeClass("currentHand");
            $("#hand2").addClass("currentHand");
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
  }, {
    key: "makeBet",
    value: function makeBet() {
      var $total = $(".total"),
          $currentBet = $(".currentBet"),
          game = this;
      $total.text(this.money);
      $currentBet.text(this.currentBet);
      $(".bet-btn").on("click", function () {
        if ($(this).hasClass("add10") && game.money - game.currentBet >= 10) {
          game.currentBet += 10;
        } else if ($(this).hasClass("add50") && game.money - game.currentBet >= 50) {
          game.currentBet += 50;
        } else if ($(this).hasClass("add100") && game.money - game.currentBet >= 100) {
          game.currentBet += 100;
        } else if ($(this).hasClass("add500") && game.money - game.currentBet >= 500) {
          game.currentBet += 500;
        } else if ($(this).hasClass("all-in")) {
          game.currentBet = game.money;
        } else if ($(this).hasClass("reset")) {
          game.currentBet = 10;
        }
        $currentBet.text(game.currentBet);
      });
    }
  }, {
    key: "modal",
    value: function modal(modalType) {
      if (modalType === "bankrupt") {
        $(".modal, .modal-overlay").removeClass("hide");
        $(".modal .message").html("You've lost everything." + "<br/><br/>" + "Good thing it's not real money!");
        $(".modal-guts button").text("Play again");
        $(".modal-guts button").on("click", function () {
          $(".modal, .modal-overlay").addClass("hide");
          $(".title-screen").show();
          game.resetGame();
          game.resetMoney();
        });
      } else if (modalType === "help") {
        // future game feature: instructions available in help modal
      }
    }
  }, {
    key: "outcome",
    value: function outcome(result) {
      this.dealerHand.revealHole();
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
  }, {
    key: "resetGame",
    value: function resetGame() {
      this.gameDeck = new _deck2.default();
      this.dealerHand = new _hand2.default("dealer");
      this.playerHand = new _hand2.default("player", 1);
      $(".messages").empty();
      $(".player-hand").empty();
      $(".dealer-hand").empty();
      $(".player-points").empty();
      $(".dealer-points").empty();
      $("#hand2").remove();
      $(".change").empty();
      $(".prevBet").empty();
    }
  }, {
    key: "resetMoney",
    value: function resetMoney() {
      this.money = 500;
      this.currentBet = 10;
      $(".total").text(this.money);
      $(".currentBet").text(this.currentBet);
    }
  }, {
    key: "showDoubleDownBtn",
    value: function showDoubleDownBtn() {
      // only show the button if the player has enough money
      if (this.money > this.currentBet * 2) {
        $(".double-down").attr("disabled", false);
      }
    }
  }, {
    key: "showSplitBtn",
    value: function showSplitBtn() {
      // only show the button if the player 1) has enough money and 2) is dealt two cards of the same point value (suit doesn't matter)
      if (this.money > this.currentBet * 2 && this.playerHand.seeCard(1).point === this.playerHand.seeCard(2).point) {
        $(".split").attr("disabled", false);
      }
    }
  }, {
    key: "stand",
    value: function stand(caller) {
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
  }, {
    key: "split",
    value: function split() {
      this.splitInPlay = true;
      $("#hand1").addClass("currentHand");
      // double bet and display it
      this.currentBet = this.currentBet * 2;
      $(".currentBet").text(this.currentBet);
      // start additional hand and move one card from hand 1 to hand 2
      var card = this.playerHand.removeCard();
      this.playerHand2 = new _hand2.default();
      this.playerHand2.addCard(card);
      // update all visual representation of changes on screen
      $(".player").append('<div id="hand2" class="playerHand-div">' + '<div class="player-hand" class="hand">' + '<img class="card" src="' + this.playerHand2.seeCard(1).getImageUrl() + '"/>' + "</div>" + '<h1 class="player-points" class="points"></h1>' + "</div>");
      $(".playerHand-div").css("width", "50%");
      $("#hand1 .player-hand img:last-child").remove();
      $(".split").attr("disabled", true);
      $(".player-points").text(this.playerHand.getPoints());
    }
  }, {
    key: "splitOutcome",
    value: function splitOutcome(hand1, hand2) {
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
  }]);

  return Game;
}();

exports.default = Game;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _card = __webpack_require__(1);

var _card2 = _interopRequireDefault(_card);

var _hand = __webpack_require__(0);

var _hand2 = _interopRequireDefault(_hand);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Deck = function () {
  function Deck() {
    _classCallCheck(this, Deck);

    this.cards = [];
  }

  _createClass(Deck, [{
    key: "draw",
    value: function draw() {
      return this.cards.pop();
    }
  }, {
    key: "generate",
    value: function generate(numDecks) {
      if (!numDecks) {
        numDecks = 1;
      }
      while (numDecks > 0) {
        for (var i = 1; i <= 13; i++) {
          this.cards.push(new _card2.default(i, "spades"));
          this.cards.push(new _card2.default(i, "diamonds"));
          this.cards.push(new _card2.default(i, "hearts"));
          this.cards.push(new _card2.default(i, "clubs"));
        }
        numDecks--;
      }
    }
  }, {
    key: "shuffle",
    value: function shuffle() {
      for (var i = this.cards.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var _ref = [this.cards[j]];
        this.cards[i] = _ref[0];
      }
    }
  }]);

  return Deck;
}();

exports.default = Deck;

/***/ })
/******/ ]);