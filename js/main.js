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
    this.outcome;
  }

  _createClass(Hand, [{
    key: "addCard",
    value: function addCard(card, $card) {
      this.cards.push(card);
      this.$hand.append($card);
    }
  }, {
    key: "canSplit",
    value: function canSplit() {
      return this.cards[0].point === this.cards[1].point;
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
      this.$hand.find('img:first-child').attr('src', this.cards[0].getImageUrl());
    }
  }, {
    key: "seeCard",
    value: function seeCard(index) {
      return this.cards[index - 1];
    }
  }, {
    key: "updateDisplay",
    value: function updateDisplay(content) {
      this.$points.text(content);
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
    this.change;

    this.$deal = $(".deal");
    this.$hit = $(".hit");
    this.$stand = $(".stand");
    this.$doubleDown = $(".double-down");
    this.$split = $(".split");
    this.$change = $(".change");
  }

  _createClass(Game, [{
    key: "assessChange",
    value: function assessChange() {
      var className = "";
      var symbol = "";
      if (this.change > 0) {
        className = "positive";
        symbol = "+";
      } else if (this.change < 0) {
        className = "negative";
        symbol = "-";
      }
      this.$change.append("<span class=\"" + className + "\">" + symbol + " $" + this.change + "</span>");
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
      this.gameMode();

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
        this.dealerHand.updateDisplay("Blackjack");
        this.playerHand.updateDisplay("BLACKJACK HOT DAMN!");
      } else if (dealerPoints === 21) {
        this.outcome("lose");
        this.dealerHand.updateDisplay("Blackjack");
        this.updateMessage("Dealer wins");
      } else if (playerPoints === 21) {
        this.outcome("blackjack");
        this.dealerHand.updateDisplay(dealerPoints);
        this.playerHand.updateDisplay("BLACKJACK, HOT DAMN!");
        this.updateMessage("You win!");
      } else if (this.money > this.currentBet * 2) {
        if (playerPoints === 11) {
          this.enable(this.$doubleDown);
        }
        if (this.playerHand.canSplit()) {
          this.enable(this.$split);
        }
      }
    }
  }, {
    key: "disable",
    value: function disable() {
      for (var _len = arguments.length, elements = Array(_len), _key = 0; _key < _len; _key++) {
        elements[_key] = arguments[_key];
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var element = _step.value;

          element.attr("disabled", true);
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
    }
  }, {
    key: "doubleDown",
    value: function doubleDown() {
      // double bet and display it
      this.currentBet *= 2;
      $(".currentBet").text(this.currentBet);
      // deal the player one more card and then move on to the dealer's turn
      this.dealOneCard(this.playerHand, "double-down");
      this.playerHand.updateDisplay(this.playerHand.getPoints());
      this.stand("double-down");
    }
  }, {
    key: "enable",
    value: function enable() {
      for (var _len2 = arguments.length, elements = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        elements[_key2] = arguments[_key2];
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = elements[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var element = _step2.value;

          element.attr("disabled", false);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }, {
    key: "evaluateHand",
    value: function evaluateHand(hand) {
      var dealerPoints = this.dealerHand.getPoints();
      var playerPoints = hand.getPoints();
      if (playerPoints > dealerPoints) {
        this.outcome("win");
      } else if (playerPoints < dealerPoints) {
        this.outcome("lose");
      } else {
        this.outcome("push");
      }
    }
  }, {
    key: "gameMode",
    value: function gameMode() {
      $(".title-screen").hide();
      $(".playerHand-div").css("width", "100%"); // reset hand adjustment for mobile in case of 'split'
      this.enable(this.$hit, this.$stand);
      this.disable(this.$deal);
      $(".betting .buttons").hide();
    }
  }, {
    key: "hit",
    value: function hit() {
      this.disable(this.$doubleDown, this.$split);
      if (this.currentHand === "hand1") {
        // split/no split determines how the card looks when dealt and what happens when the first hand busts
        if (!this.splitInPlay) {
          this.dealOneCard(this.playerHand);
          var playerPoints = this.playerHand.getPoints();
          this.playerHand.updateDisplay(playerPoints);
          if (playerPoints > 21) {
            this.outcome("lose");
            this.updateMessage("You bust");
          }
        } else {
          this.dealOneCard(this.playerHand, "split");
          var _playerPoints = this.playerHand.getPoints();
          this.playerHand.updateDisplay(_playerPoints);
          if (_playerPoints > 21) {
            this.splitInPlay = false;
            this.currentHand = "hand2";
            $("#hand1").removeClass("currentHand");
            $("#hand2").addClass("currentHand");
          }
        }
      } else if (this.currentHand === "hand2") {
        this.dealOneCard(this.playerHand2, "split");
        var _playerPoints2 = this.playerHand2.getPoints();
        this.playerHand2.updateDisplay(_playerPoints2);
        if (_playerPoints2 > 21) {
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
      this.dealerHand.$points = this.dealerHand.getPoints();
      this.prevBet = this.currentBet;
      if (result === "blackjack") {
        this.updateMessage("BLACKJACK HOT DAMN!!!");
        this.money += this.currentBet * 1.5;
        this.change = this.currentBet * 1.5;
      } else if (result === "win") {
        this.updateMessage("Player wins");
        this.money += this.currentBet;
        this.change = this.currentBet;
      } else if (result === "push") {
        this.updateMessage("Push");
        this.money = this.money;
        this.change = 0;
      } else if (result === "lose") {
        this.updateMessage("Dealer wins");
        if (this.money - this.currentBet >= 10) {
          this.money -= this.currentBet;
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
      this.enable(this.$deal);
      this.disable(this.$hit, this.$stand);
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
          this.dealOneCard(this.dealerHand);
        }
        var dealerPoints = this.dealerHand.getPoints();
        this.dealerHand.updateDisplay(dealerPoints);
        if (dealerPoints > 21) {
          this.playerHand.outcome = "win";
          this.playerHand2.outcome = "win";
        } else {
          // this.evaluateHand(this.playerHand);
          // this.evaluateHand(this.playerHand2);
        }
        this.splitOutcome();
      } else {
        this.disable(this.$hit, this.$stand, this.$doubleDown, this.$split);
        $("#hand1, #hand2").removeClass("currentHand");
        // dealer's turn
        this.dealerHand.revealHole();
        while (this.dealerHand.getPoints() < 17) {
          this.dealOneCard(this.dealerHand);
          this.dealerHand.updateDisplay(this.dealerHand.getPoints());
        }
        this.evaluateHand(this.playerHand);
        // if stand was called by clicking 'double down', do additional work
        if (caller === "double-down") {
          this.bet = this.bet / 2;
          $(".bet").text(this.bet);
          this.disable(this.$doubleDown);
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
      this.playerHand2 = new _hand2.default("player", 2);
      this.playerHand2.addCard(card);
      // update all visual representation of changes on screen
      $(".player").append('<div id="hand2" class="playerHand-div">' + '<div class="player-hand" class="hand">' + '<img class="card" src="' + this.playerHand2.seeCard(1).getImageUrl() + '"/>' + "</div>" + '<h1 class="player-points" class="points"></h1>' + "</div>");
      $(".playerHand-div").css("width", "50%");
      $("#hand1 .player-hand img:last-child").remove();
      this.disable(this.$split);
      this.playerHand.updateDisplay(this.playerHand.getPoints());
    }

    // TODO: evaluate this logic and reduce where possible

  }, {
    key: "splitOutcome",
    value: function splitOutcome() {
      var hand1 = this.playerHand.outcome;
      var hand2 = this.playerHand2.outcome;
      if (hand1 === hand2) {
        if (hand1 === "blackjack" && hand2 === "blackjack") {
          this.outcome("blackjack");
          this.updateMessage("TWO BLACKJACKS!!!");
        } else if (hand1 === "win" && hand2 === "win") {
          this.outcome("win");
          this.updateMessage("You win both!");
        } else if (hand1 === "lose" && hand2 === "lose") {
          this.outcome("lose");
          this.updateMessage("Dealer wins both");
        } else {
          this.outcome("push");
          this.updateMessage("Push");
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
  }, {
    key: "updateMessage",
    value: function updateMessage(message) {
      $(".messages").append("<h1>" + message + "</h1>");
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