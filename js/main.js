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
  function Hand(owner, handNumber) {
    _classCallCheck(this, Hand);

    var selector = void 0;
    if (owner === 'dealer') {
      selector = "#dealer";
    } else if (owner === 'player') {
      if (handNumber === 1) {
        selector = "#hand1";
      } else if (handNumber === 2) {
        selector = "#hand2";
      }
    }
    this.$wrapper = $("" + selector);
    this.$hand = $(selector + " .hand");
    this.$points = $(selector + " .points");
    this.playing = false;
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
      var card = this.cards.pop();
      var $card = this.$hand.find("img:last-child").remove();
      return { card: card, $card: $card };
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
    key: "toggleHighlight",
    value: function toggleHighlight() {
      this.playing ? this.$wrapper.addClass("currentHand") : this.$wrapper.removeClass("currentHand");
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
    key: "adjustSpace",
    value: function adjustSpace() {
      var size = void 0;
      this.splitInPlay ? size = 50 : size = 100;
      $(".playerHand-div").css("width", size + "%");
    }
  }, {
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
      this.$change.append("<span class=\"" + className + "\">" + symbol + " $" + Math.abs(this.change) + "</span>");
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
      hand.updateDisplay(hand.getPoints());
      return hand.getPoints();
    }
  }, {
    key: "deal",
    value: function deal() {
      this.gameMode();
      this.playerHand.playing = true;
      this.playerHand.toggleHighlight();

      // shuffle deck(s) and deal cards
      // this.gameDeck.shuffle();
      this.dealOneCard(this.dealerHand, "hole");
      this.dealOneCard(this.playerHand);
      var dealerPoints = this.dealOneCard(this.dealerHand);
      var playerPoints = this.dealOneCard(this.playerHand);

      // conceal dealer total
      this.dealerHand.updateDisplay("?");

      if (dealerPoints === 21 && playerPoints === 21) {
        this.outcome("push");
        this.dealerHand.updateDisplay("Blackjack");
        this.playerHand.updateDisplay("BLACKJACK, HOT DAMN!");
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
    key: "determineCurrentHand",
    value: function determineCurrentHand() {
      var hands = [this.playerHand, this.playerHand2];
      var currentHand = void 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = hands[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var hand = _step.value;

          hand.toggleHighlight();
          if (hand.playing) {
            currentHand = hand;
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

      return currentHand;
    }
  }, {
    key: "disable",
    value: function disable() {
      for (var _len = arguments.length, elements = Array(_len), _key = 0; _key < _len; _key++) {
        elements[_key] = arguments[_key];
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = elements[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var element = _step2.value;

          element.attr("disabled", true);
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
    key: "doubleDown",
    value: function doubleDown() {
      // double bet and display it
      this.currentBet *= 2;
      $(".currentBet").text(this.currentBet);
      // deal the player one more card and then move on to the dealer's turn
      this.dealOneCard(this.playerHand, "double-down");
      this.stand("double-down");
    }
  }, {
    key: "enable",
    value: function enable() {
      for (var _len2 = arguments.length, elements = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        elements[_key2] = arguments[_key2];
      }

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = elements[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var element = _step3.value;

          element.attr("disabled", false);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
  }, {
    key: "endGameMode",
    value: function endGameMode() {
      $(".total").text(this.money);
      $(".prevBet").append("<span>$" + this.prevBet + "</span>");
      this.assessChange();
      this.enable(this.$deal);
      this.disable(this.$hit, this.$stand);
      $(".betting .buttons").show();
    }
  }, {
    key: "evaluateHand",
    value: function evaluateHand(hand) {
      var dealerPoints = this.dealerHand.getPoints();
      var playerPoints = hand.getPoints();
      if (dealerPoints > 21 || playerPoints > dealerPoints) {
        hand.outcome = "win";
      } else if (playerPoints < dealerPoints) {
        hand.outcome = "lose";
      } else {
        hand.outcome = "push";
      }
    }
  }, {
    key: "gameMode",
    value: function gameMode() {
      $(".title-screen").hide();
      this.adjustSpace();
      this.enable(this.$hit, this.$stand);
      this.disable(this.$deal);
      $(".betting .buttons").hide();
    }
  }, {
    key: "hit",
    value: function hit() {
      this.disable(this.$doubleDown, this.$split);
      if (!this.splitInPlay) {
        var playerPoints = this.dealOneCard(this.playerHand);
        if (playerPoints > 21) {
          this.updateMessage("You bust");
          this.outcome("lose");
        }
      } else {
        var currentHand = this.determineCurrentHand();
        var _playerPoints = this.dealOneCard(currentHand, "split");
        if (_playerPoints > 21) {
          if (currentHand === this.playerHand) {
            this.playerHand.outcome = "lose";
            this.playerHand.playing = false;
            this.playerHand2.playing = true;
            this.determineCurrentHand();
          } else if (currentHand === this.playerHand2) {
            this.playerHand2.outcome = "lose";
            this.playerHand2.playing = false;
            this.determineCurrentHand();
            this.invokeOutcome(this.playerHand, this.playerHand2);
          }
        }
      }
    }
  }, {
    key: "invokeOutcome",
    value: function invokeOutcome() {
      for (var _len3 = arguments.length, hands = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        hands[_key3] = arguments[_key3];
      }

      var hand1 = hands[0].outcome;
      if (hands.length === 1) {
        if (hand1.outcome === "win") {
          this.updateMessage("You win!");
          this.outcome("win");
        } else if (hand1.outcome === "lose") {
          this.updateMessage("Dealer wins");
          this.outcome("lose");
        } else {
          this.outcome("push");
        }
      } else if (hands.length === 2) {
        var hand2 = hands[1].outcome;
        if (hand1 === hand2) {
          if (hand1 === "blackjack" && hand2 === "blackjack") {
            this.updateMessage("TWO BLACKJACKS!!!");
            this.outcome("blackjack");
          } else if (hand1 === "win" && hand2 === "win") {
            this.outcome("win");
            this.updateMessage("You win both!");
          } else if (hand1 === "lose" && hand2 === "lose") {
            this.outcome("lose");
            this.updateMessage("Dealer wins both");
          } else {
            this.outcome("push");
          }
        } else {
          this.currentBet /= 2;
          if (hand1 === "blackjack" || hand2 === "blackjack") {
            // calculate combined outcomes before calling the outcome method
            var bet = currentBet;
            this.currentBet *= 1.5;
            if (hand1 === "win" || hand2 === "win") {
              this.outcome("win");
              this.currentBet += bet;
              this.updateMessage("You win both!");
            } else if (hand1 === "lose" || hand2 === "lose") {
              this.outcome("win");
              this.currentBet -= bet;
              this.updateMessage("You and dealer each win one");
            } else {
              this.outcome("win");
              this.updateMessage("You win one, push");
            }
          } else if (hand1 === "win" || hand2 === "win") {
            if (hand1 === "push" || hand2 === "push") {
              this.outcome("win");
              this.updateMessage("You win one, push");
            } else {
              this.outcome("push");
            }
          } else if (hand1 === "lose" || hand2 === "lose") {
            this.outcome("lose");
            this.updateMessage("Dealer wins one, push");
          }
          this.splitInPlay = false;
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
      this.playerHand.playing = false;
      this.dealerHand.revealHole();
      this.dealerHand.updateDisplay(this.dealerHand.getPoints());
      this.prevBet = this.currentBet;
      if (result === "blackjack") {
        this.money += this.currentBet * 1.5;
        this.change = this.currentBet * 1.5;
      } else if (result === "win") {
        this.money += this.currentBet;
        this.change = this.currentBet;
      } else if (result === "push") {
        this.updateMessage("Push");
        this.money = this.money;
        this.change = 0;
      } else if (result === "lose") {
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
      this.endGameMode();
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
      // if splitting, give hand2 opportunity to hit
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
          this.evaluateHand(this.playerHand);
          this.evaluateHand(this.playerHand2);
        }
        this.invokeOutcome(this.playerHand, this.playerHand2);
      } else {
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
        }
        if (this.dealerHand.getPoints() > 21) {
          this.updateMessage("Dealer busts");
          this.outcome("win");
        } else {
          this.evaluateHand(this.playerHand);
          this.invokeOutcome(this.playerHand);
        }
      }
    }
  }, {
    key: "split",
    value: function split() {
      this.splitInPlay = true;
      this.disable(this.$split);
      this.playerHand.$wrapper.addClass("currentHand");

      // double bet and display it
      this.currentBet = this.currentBet * 2;
      $(".currentBet").text(this.currentBet);

      // start additional hand and move one card from hand 1 to hand 2
      this.adjustSpace();
      this.playerHand2 = new _hand2.default("player", 2);
      var removedCard = this.playerHand.removeCard();
      this.playerHand2.addCard(removedCard.card, removedCard.$card);
      this.dealOneCard(this.playerHand);
      this.dealOneCard(this.playerHand2);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTRlMTk4Y2EzYjBkNDIzMTEzNzkiLCJ3ZWJwYWNrOi8vLy4vanMvaGFuZC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jYXJkLmpzIiwid2VicGFjazovLy8uL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9nYW1lLmpzIiwid2VicGFjazovLy8uL2pzL2RlY2suanMiXSwibmFtZXMiOlsiSGFuZCIsIm93bmVyIiwiaGFuZE51bWJlciIsInNlbGVjdG9yIiwiJHdyYXBwZXIiLCIkIiwiJGhhbmQiLCIkcG9pbnRzIiwicGxheWluZyIsImNhcmRzIiwib3V0Y29tZSIsImNhcmQiLCIkY2FyZCIsInB1c2giLCJhcHBlbmQiLCJwb2ludCIsInRvdGFsIiwiYWNlcyIsInBvcCIsImZpbmQiLCJyZW1vdmUiLCJhdHRyIiwiZ2V0SW1hZ2VVcmwiLCJpbmRleCIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJjb250ZW50IiwidGV4dCIsIkNhcmQiLCJzdWl0IiwidmFsdWUiLCJjdXJyZW50R2FtZSIsIm1ha2VCZXQiLCJvbiIsInJlc2V0R2FtZSIsImdhbWVEZWNrIiwiZ2VuZXJhdGUiLCJkZWFsIiwiaGl0Iiwic3RhbmQiLCJkb3VibGVEb3duIiwic3BsaXQiLCJHYW1lIiwiZGVhbGVySGFuZCIsInBsYXllckhhbmQiLCJzcGxpdEluUGxheSIsIm1vbmV5IiwiY3VycmVudEJldCIsImNoYW5nZSIsIiRkZWFsIiwiJGhpdCIsIiRzdGFuZCIsIiRkb3VibGVEb3duIiwiJHNwbGl0IiwiJGNoYW5nZSIsInNpemUiLCJjc3MiLCJjbGFzc05hbWUiLCJzeW1ib2wiLCJNYXRoIiwiYWJzIiwiaGFuZCIsInNwZWNpYWwiLCJkcmF3IiwiYWRkQ2FyZCIsInVwZGF0ZURpc3BsYXkiLCJnZXRQb2ludHMiLCJnYW1lTW9kZSIsInRvZ2dsZUhpZ2hsaWdodCIsImRlYWxPbmVDYXJkIiwiZGVhbGVyUG9pbnRzIiwicGxheWVyUG9pbnRzIiwidXBkYXRlTWVzc2FnZSIsImVuYWJsZSIsImNhblNwbGl0IiwiaGFuZHMiLCJwbGF5ZXJIYW5kMiIsImN1cnJlbnRIYW5kIiwiZWxlbWVudHMiLCJlbGVtZW50IiwicHJldkJldCIsImFzc2Vzc0NoYW5nZSIsImRpc2FibGUiLCJzaG93IiwiaGlkZSIsImFkanVzdFNwYWNlIiwiZGV0ZXJtaW5lQ3VycmVudEhhbmQiLCJpbnZva2VPdXRjb21lIiwiaGFuZDEiLCJsZW5ndGgiLCJoYW5kMiIsImJldCIsIiR0b3RhbCIsIiRjdXJyZW50QmV0IiwiZ2FtZSIsImhhc0NsYXNzIiwibW9kYWxUeXBlIiwiaHRtbCIsInJlc2V0TW9uZXkiLCJyZXN1bHQiLCJyZXZlYWxIb2xlIiwibW9kYWwiLCJlbmRHYW1lTW9kZSIsImVtcHR5IiwiY2FsbGVyIiwiZXZhbHVhdGVIYW5kIiwicmVtb3ZlZENhcmQiLCJyZW1vdmVDYXJkIiwibWVzc2FnZSIsIkRlY2siLCJudW1EZWNrcyIsImkiLCJqIiwiZmxvb3IiLCJyYW5kb20iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzdEQTs7Ozs7Ozs7SUFFcUJBLEk7QUFDbkIsZ0JBQVlDLEtBQVosRUFBbUJDLFVBQW5CLEVBQStCO0FBQUE7O0FBQzdCLFFBQUlDLGlCQUFKO0FBQ0EsUUFBSUYsVUFBVSxR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QUwsQ0FBV1MsR0FBWCxFQUFQO0FBQ0Q7Ozs2QkFFUTRGLFEsRUFBVTtBQUNqQixVQUFJLENBQUNBLFFBQUwsRUFBZTtBQUNiQSxtQkFBVyxDQUFYO0FBQ0Q7QUFDRCxhQUFPQSxXQUFXLENBQWxCLEVBQXFCO0FBQ25CLGFBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxLQUFLLEVBQXJCLEVBQXlCQSxHQUF6QixFQUE4QjtBQUM1QixlQUFLdEcsS0FBTCxDQUFXSSxJQUFYLENBQWdCLG1CQUFTa0csQ0FBVCxFQUFZLFFBQVosQ0FBaEI7QUFDQSxlQUFLdEcsS0FBTCxDQUFXSSxJQUFYLENBQWdCLG1CQUFTa0csQ0FBVCxFQUFZLFVBQVosQ0FBaEI7QUFDQSxlQUFLdEcsS0FBTCxDQUFXSSxJQUFYLENBQWdCLG1CQUFTa0csQ0FBVCxFQUFZLFFBQVosQ0FBaEI7QUFDQSxlQUFLdEcsS0FBTCxDQUFXSSxJQUFYLENBQWdCLG1CQUFTa0csQ0FBVCxFQUFZLE9BQVosQ0FBaEI7QUFDRDtBQUNERDtBQUNEO0FBQ0Y7Ozs4QkFFUztBQUNSLFdBQUssSUFBSUMsSUFBSSxLQUFLdEcsS0FBTCxDQUFXZ0YsTUFBWCxHQUFvQixDQUFqQyxFQUFvQ3NCLElBQUksQ0FBeEMsRUFBMkNBLEdBQTNDLEVBQWdEO0FBQzlDLFlBQU1DLElBQUlyRCxLQUFLc0QsS0FBTCxDQUFXdEQsS0FBS3VELE1BQUwsTUFBaUJILElBQUksQ0FBckIsQ0FBWCxDQUFWO0FBRDhDLG1CQUU1QixDQUFDLEtBQUt0RyxLQUFMLENBQVd1RyxDQUFYLENBQUQsQ0FGNEI7QUFFN0MsYUFBS3ZHLEtBQUwsQ0FBV3NHLENBQVgsQ0FGNkM7QUFHL0M7QUFDRjs7Ozs7O2tCQTdCa0JGLEkiLCJmaWxlIjoiLi9qcy9tYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMTRlMTk4Y2EzYjBkNDIzMTEzNzkiLCJpbXBvcnQgQ2FyZCBmcm9tIFwiLi9jYXJkXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIYW5kIHtcclxuICBjb25zdHJ1Y3Rvcihvd25lciwgaGFuZE51bWJlcikge1xyXG4gICAgbGV0IHNlbGVjdG9yO1xyXG4gICAgaWYgKG93bmVyID09PSAnZGVhbGVyJykge1xyXG4gICAgICBzZWxlY3RvciA9IFwiI2RlYWxlclwiO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAob3duZXIgPT09ICdwbGF5ZXInKSB7XHJcbiAgICAgIGlmIChoYW5kTnVtYmVyID09PSAxKSB7XHJcbiAgICAgICAgc2VsZWN0b3IgPSBcIiNoYW5kMVwiO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKGhhbmROdW1iZXIgPT09IDIpIHtcclxuICAgICAgICBzZWxlY3RvciA9IFwiI2hhbmQyXCI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuJHdyYXBwZXIgPSAkKGAke3NlbGVjdG9yfWApO1xyXG4gICAgdGhpcy4kaGFuZCA9ICQoYCR7c2VsZWN0b3J9IC5oYW5kYCk7XHJcbiAgICB0aGlzLiRwb2ludHMgPSAkKGAke3NlbGVjdG9yfSAucG9pbnRzYCk7XHJcbiAgICB0aGlzLnBsYXlpbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuY2FyZHMgPSBbXTtcclxuICAgIHRoaXMub3V0Y29tZTtcclxuICB9XHJcblxyXG4gIGFkZENhcmQoY2FyZCwgJGNhcmQpIHtcclxuICAgIHRoaXMuY2FyZHMucHVzaChjYXJkKTtcclxuICAgIHRoaXMuJGhhbmQuYXBwZW5kKCRjYXJkKTtcclxuICB9XHJcblxyXG4gIGNhblNwbGl0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2FyZHNbMF0ucG9pbnQgPT09IHRoaXMuY2FyZHNbMV0ucG9pbnQ7XHJcbiAgfVxyXG5cclxuICBnZXRQb2ludHMoKSB7XHJcbiAgICBsZXQgdG90YWwgPSAwO1xyXG4gICAgbGV0IGFjZXMgPSAwO1xyXG4gICAgZm9yIChsZXQgY2FyZCBvZiB0aGlzLmNhcmRzKSB7XHJcbiAgICAgIGxldCBwb2ludCA9IGNhcmQucG9pbnQ7XHJcbiAgICAgIGlmIChwb2ludCA9PT0gMSkge1xyXG4gICAgICAgIHRvdGFsICs9IDEwO1xyXG4gICAgICAgIGFjZXMrKztcclxuICAgICAgfSBcclxuICAgICAgZWxzZSBpZiAocG9pbnQgPiAxMCkge1xyXG4gICAgICAgIHBvaW50ID0gMTA7XHJcbiAgICAgIH1cclxuICAgICAgdG90YWwgKz0gcG9pbnQ7XHJcbiAgICAgIHdoaWxlICh0b3RhbCA+IDIxICYmIGFjZXMgPiAwKSB7XHJcbiAgICAgICAgdG90YWwgLT0gMTA7XHJcbiAgICAgICAgYWNlcy0tO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG90YWw7XHJcbiAgfVxyXG5cclxuICByZW1vdmVDYXJkKCkge1xyXG4gICAgbGV0IGNhcmQgPSB0aGlzLmNhcmRzLnBvcCgpO1xyXG4gICAgbGV0ICRjYXJkID0gdGhpcy4kaGFuZC5maW5kKFwiaW1nOmxhc3QtY2hpbGRcIikucmVtb3ZlKCk7XHJcbiAgICByZXR1cm4ge2NhcmQsICRjYXJkfTtcclxuICB9XHJcblxyXG4gIHJldmVhbEhvbGUoKSB7XHJcbiAgICB0aGlzLiRoYW5kLmZpbmQoJ2ltZzpmaXJzdC1jaGlsZCcpLmF0dHIoJ3NyYycsIHRoaXMuY2FyZHNbMF0uZ2V0SW1hZ2VVcmwoKSk7XHJcbiAgfVxyXG5cclxuICBzZWVDYXJkKGluZGV4KSB7XHJcbiAgICByZXR1cm4gdGhpcy5jYXJkc1tpbmRleCAtIDFdO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlSGlnaGxpZ2h0KCkge1xyXG4gICAgdGhpcy5wbGF5aW5nID8gdGhpcy4kd3JhcHBlci5hZGRDbGFzcyhcImN1cnJlbnRIYW5kXCIpIDogdGhpcy4kd3JhcHBlci5yZW1vdmVDbGFzcyhcImN1cnJlbnRIYW5kXCIpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlRGlzcGxheShjb250ZW50KSB7XHJcbiAgICB0aGlzLiRwb2ludHMudGV4dChjb250ZW50KTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvaGFuZC5qcyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcmQge1xyXG4gIGNvbnN0cnVjdG9yKHBvaW50LCBzdWl0KSB7XHJcbiAgICB0aGlzLnBvaW50ID0gcG9pbnQ7XHJcbiAgICB0aGlzLnN1aXQgPSBzdWl0O1xyXG4gIH1cclxuXHJcbiAgZ2V0SW1hZ2VVcmwoKSB7XHJcbiAgICBsZXQgdmFsdWUgPSB0aGlzLnBvaW50O1xyXG4gICAgaWYgKHRoaXMucG9pbnQgPT09IDExKSB7XHJcbiAgICAgIHZhbHVlID0gXCJqYWNrXCI7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0aGlzLnBvaW50ID09PSAxMikge1xyXG4gICAgICB2YWx1ZSA9IFwicXVlZW5cIjtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXMucG9pbnQgPT09IDEzKSB7XHJcbiAgICAgIHZhbHVlID0gXCJraW5nXCI7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0aGlzLnBvaW50ID09PSAxKSB7XHJcbiAgICAgIHZhbHVlID0gXCJhY2VcIjtcclxuICAgIH1cclxuICAgIHJldHVybiBgaW1hZ2VzLyR7dmFsdWV9X29mXyR7dGhpcy5zdWl0fS5zdmdgO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9jYXJkLmpzIiwiaW1wb3J0IEdhbWUgZnJvbSAnLi9nYW1lJztcblxudmFyIGN1cnJlbnRHYW1lID0gbmV3IEdhbWU7XG5cbmN1cnJlbnRHYW1lLm1ha2VCZXQoKTtcblxuJCgnLmRlYWwnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgY3VycmVudEdhbWUucmVzZXRHYW1lKCk7XG4gIGN1cnJlbnRHYW1lLmdhbWVEZWNrLmdlbmVyYXRlKDMpO1xuICBjdXJyZW50R2FtZS5kZWFsKCk7XG59KTtcblxuJCgnLmhpdCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICBjdXJyZW50R2FtZS5oaXQoKTtcbn0pO1xuXG4kKCcuc3RhbmQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgY3VycmVudEdhbWUuc3RhbmQoKTtcbn0pO1xuXG4kKCcuZG91YmxlLWRvd24nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgY3VycmVudEdhbWUuZG91YmxlRG93bigpO1xufSk7XG5cbiQoJy5zcGxpdCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICBjdXJyZW50R2FtZS5zcGxpdCgpO1xufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9hcHAuanMiLCJpbXBvcnQgSGFuZCBmcm9tIFwiLi9oYW5kXCI7XHJcbmltcG9ydCBEZWNrIGZyb20gXCIuL2RlY2tcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWUge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5nYW1lRGVjayA9IG5ldyBEZWNrO1xyXG4gICAgdGhpcy5kZWFsZXJIYW5kID0gbmV3IEhhbmQoJ2RlYWxlcicpO1xyXG4gICAgdGhpcy5wbGF5ZXJIYW5kID0gbmV3IEhhbmQoJ3BsYXllcicsIDEpO1xyXG4gICAgdGhpcy5zcGxpdEluUGxheSA9IGZhbHNlO1xyXG4gICAgdGhpcy5tb25leSA9IDUwMDtcclxuICAgIHRoaXMuY3VycmVudEJldCA9IDEwO1xyXG4gICAgdGhpcy5jaGFuZ2U7XHJcbiAgICBcclxuICAgIHRoaXMuJGRlYWwgPSAkKFwiLmRlYWxcIik7XHJcbiAgICB0aGlzLiRoaXQgPSAkKFwiLmhpdFwiKTtcclxuICAgIHRoaXMuJHN0YW5kID0gJChcIi5zdGFuZFwiKTtcclxuICAgIHRoaXMuJGRvdWJsZURvd24gPSAkKFwiLmRvdWJsZS1kb3duXCIpO1xyXG4gICAgdGhpcy4kc3BsaXQgPSAkKFwiLnNwbGl0XCIpO1xyXG4gICAgdGhpcy4kY2hhbmdlID0gJChcIi5jaGFuZ2VcIik7XHJcbiAgfVxyXG5cclxuICBhZGp1c3RTcGFjZSgpIHtcclxuICAgIGxldCBzaXplO1xyXG4gICAgdGhpcy5zcGxpdEluUGxheSA/IHNpemUgPSA1MCA6IHNpemUgPSAxMDA7XHJcbiAgICAkKFwiLnBsYXllckhhbmQtZGl2XCIpLmNzcyhcIndpZHRoXCIsIGAke3NpemV9JWApO1xyXG4gIH1cclxuXHJcbiAgYXNzZXNzQ2hhbmdlKCkge1xyXG4gICAgbGV0IGNsYXNzTmFtZSA9IFwiXCI7XHJcbiAgICBsZXQgc3ltYm9sID0gXCJcIjtcclxuICAgIGlmICh0aGlzLmNoYW5nZSA+IDApIHtcclxuICAgICAgY2xhc3NOYW1lID0gXCJwb3NpdGl2ZVwiO1xyXG4gICAgICBzeW1ib2wgPSBcIitcIjtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXMuY2hhbmdlIDwgMCkge1xyXG4gICAgICBjbGFzc05hbWUgPSBcIm5lZ2F0aXZlXCI7XHJcbiAgICAgIHN5bWJvbCA9IFwiLVwiO1xyXG4gICAgfVxyXG4gICAgdGhpcy4kY2hhbmdlLmFwcGVuZChgPHNwYW4gY2xhc3M9XCIke2NsYXNzTmFtZX1cIj4ke3N5bWJvbH0gJCR7TWF0aC5hYnModGhpcy5jaGFuZ2UpfTwvc3Bhbj5gKTtcclxuICB9XHJcblxyXG4gIGRlYWxPbmVDYXJkKGhhbmQsIHNwZWNpYWwpIHtcclxuICAgIGxldCBjYXJkID0gdGhpcy5nYW1lRGVjay5kcmF3KCk7XHJcbiAgICBsZXQgJGNhcmQgPSAkKFwiPGltZyAvPlwiLCB7XHJcbiAgICAgIFwiY2xhc3NcIjogXCJjYXJkXCIsIFxyXG4gICAgICBcInNyY1wiOiBgJHtjYXJkLmdldEltYWdlVXJsKCl9YFxyXG4gICAgfSk7XHJcbiAgICBpZiAoc3BlY2lhbCA9PT0gXCJob2xlXCIpIHtcclxuICAgICAgJGNhcmQuYXR0cignc3JjJywgXCJpbWFnZXMvYmFjay1zdWl0cy1yZWQuc3ZnXCIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoc3BlY2lhbCA9PT0gXCJkb3VibGUtZG93blwiKSB7XHJcbiAgICAgICRjYXJkLmFkZENsYXNzKCdjYXJkLWRkJyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChzcGVjaWFsID09PSBcInNwbGl0XCIpIHtcclxuICAgICAgJGNhcmQuYWRkQ2xhc3MoJ3NwbGl0Jyk7XHJcbiAgICB9XHJcbiAgICBoYW5kLmFkZENhcmQoY2FyZCwgJGNhcmQpO1xyXG4gICAgaGFuZC51cGRhdGVEaXNwbGF5KGhhbmQuZ2V0UG9pbnRzKCkpO1xyXG4gICAgcmV0dXJuIGhhbmQuZ2V0UG9pbnRzKCk7XHJcbiAgfVxyXG5cclxuICBkZWFsKCkge1xyXG4gICAgdGhpcy5nYW1lTW9kZSgpO1xyXG4gICAgdGhpcy5wbGF5ZXJIYW5kLnBsYXlpbmcgPSB0cnVlO1xyXG4gICAgdGhpcy5wbGF5ZXJIYW5kLnRvZ2dsZUhpZ2hsaWdodCgpO1xyXG5cclxuICAgIC8vIHNodWZmbGUgZGVjayhzKSBhbmQgZGVhbCBjYXJkc1xyXG4gICAgLy8gdGhpcy5nYW1lRGVjay5zaHVmZmxlKCk7XHJcbiAgICB0aGlzLmRlYWxPbmVDYXJkKHRoaXMuZGVhbGVySGFuZCwgXCJob2xlXCIpO1xyXG4gICAgdGhpcy5kZWFsT25lQ2FyZCh0aGlzLnBsYXllckhhbmQpO1xyXG4gICAgbGV0IGRlYWxlclBvaW50cyA9IHRoaXMuZGVhbE9uZUNhcmQodGhpcy5kZWFsZXJIYW5kKTtcclxuICAgIGxldCBwbGF5ZXJQb2ludHMgPSB0aGlzLmRlYWxPbmVDYXJkKHRoaXMucGxheWVySGFuZCk7XHJcblxyXG4gICAgLy8gY29uY2VhbCBkZWFsZXIgdG90YWxcclxuICAgIHRoaXMuZGVhbGVySGFuZC51cGRhdGVEaXNwbGF5KFwiP1wiKTtcclxuXHJcbiAgICBpZiAoZGVhbGVyUG9pbnRzID09PSAyMSAmJiBwbGF5ZXJQb2ludHMgPT09IDIxKSB7XHJcbiAgICAgIHRoaXMub3V0Y29tZShcInB1c2hcIik7XHJcbiAgICAgIHRoaXMuZGVhbGVySGFuZC51cGRhdGVEaXNwbGF5KFwiQmxhY2tqYWNrXCIpO1xyXG4gICAgICB0aGlzLnBsYXllckhhbmQudXBkYXRlRGlzcGxheShcIkJMQUNLSkFDSywgSE9UIERBTU4hXCIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoZGVhbGVyUG9pbnRzID09PSAyMSkge1xyXG4gICAgICB0aGlzLm91dGNvbWUoXCJsb3NlXCIpO1xyXG4gICAgICB0aGlzLmRlYWxlckhhbmQudXBkYXRlRGlzcGxheShcIkJsYWNramFja1wiKTtcclxuICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiRGVhbGVyIHdpbnNcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChwbGF5ZXJQb2ludHMgPT09IDIxKSB7XHJcbiAgICAgIHRoaXMub3V0Y29tZShcImJsYWNramFja1wiKTtcclxuICAgICAgdGhpcy5kZWFsZXJIYW5kLnVwZGF0ZURpc3BsYXkoZGVhbGVyUG9pbnRzKTtcclxuICAgICAgdGhpcy5wbGF5ZXJIYW5kLnVwZGF0ZURpc3BsYXkoXCJCTEFDS0pBQ0ssIEhPVCBEQU1OIVwiKTtcclxuICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiWW91IHdpbiFcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0aGlzLm1vbmV5ID4gdGhpcy5jdXJyZW50QmV0ICogMikge1xyXG4gICAgICBpZiAocGxheWVyUG9pbnRzID09PSAxMSkgIHtcclxuICAgICAgICB0aGlzLmVuYWJsZSh0aGlzLiRkb3VibGVEb3duKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5wbGF5ZXJIYW5kLmNhblNwbGl0KCkpIHtcclxuICAgICAgICB0aGlzLmVuYWJsZSh0aGlzLiRzcGxpdCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRldGVybWluZUN1cnJlbnRIYW5kKCkge1xyXG4gICAgbGV0IGhhbmRzID0gW3RoaXMucGxheWVySGFuZCwgdGhpcy5wbGF5ZXJIYW5kMl07XHJcbiAgICBsZXQgY3VycmVudEhhbmQ7XHJcbiAgICBmb3IgKGxldCBoYW5kIG9mIGhhbmRzKSB7XHJcbiAgICAgIGhhbmQudG9nZ2xlSGlnaGxpZ2h0KCk7XHJcbiAgICAgIGlmIChoYW5kLnBsYXlpbmcpIHtcclxuICAgICAgICBjdXJyZW50SGFuZCA9IGhhbmQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjdXJyZW50SGFuZDtcclxuICB9XHJcblxyXG4gIGRpc2FibGUoLi4uZWxlbWVudHMpIHtcclxuICAgIGZvciAobGV0IGVsZW1lbnQgb2YgZWxlbWVudHMpIHtcclxuICAgICAgZWxlbWVudC5hdHRyKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkb3VibGVEb3duKCkge1xyXG4gICAgLy8gZG91YmxlIGJldCBhbmQgZGlzcGxheSBpdFxyXG4gICAgdGhpcy5jdXJyZW50QmV0ICo9IDI7XHJcbiAgICAkKFwiLmN1cnJlbnRCZXRcIikudGV4dCh0aGlzLmN1cnJlbnRCZXQpO1xyXG4gICAgLy8gZGVhbCB0aGUgcGxheWVyIG9uZSBtb3JlIGNhcmQgYW5kIHRoZW4gbW92ZSBvbiB0byB0aGUgZGVhbGVyJ3MgdHVyblxyXG4gICAgdGhpcy5kZWFsT25lQ2FyZCh0aGlzLnBsYXllckhhbmQsIFwiZG91YmxlLWRvd25cIik7XHJcbiAgICB0aGlzLnN0YW5kKFwiZG91YmxlLWRvd25cIik7XHJcbiAgfVxyXG5cclxuICBlbmFibGUoLi4uZWxlbWVudHMpIHtcclxuICAgIGZvciAobGV0IGVsZW1lbnQgb2YgZWxlbWVudHMpIHtcclxuICAgICAgZWxlbWVudC5hdHRyKFwiZGlzYWJsZWRcIiwgZmFsc2UpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZW5kR2FtZU1vZGUoKSB7XHJcbiAgICAkKFwiLnRvdGFsXCIpLnRleHQodGhpcy5tb25leSk7XHJcbiAgICAkKFwiLnByZXZCZXRcIikuYXBwZW5kKGA8c3Bhbj4kJHt0aGlzLnByZXZCZXR9PC9zcGFuPmApO1xyXG4gICAgdGhpcy5hc3Nlc3NDaGFuZ2UoKTtcclxuICAgIHRoaXMuZW5hYmxlKHRoaXMuJGRlYWwpO1xyXG4gICAgdGhpcy5kaXNhYmxlKHRoaXMuJGhpdCwgdGhpcy4kc3RhbmQpO1xyXG4gICAgJChcIi5iZXR0aW5nIC5idXR0b25zXCIpLnNob3coKTtcclxuICB9XHJcblxyXG4gIGV2YWx1YXRlSGFuZChoYW5kKSB7XHJcbiAgICBsZXQgZGVhbGVyUG9pbnRzID0gdGhpcy5kZWFsZXJIYW5kLmdldFBvaW50cygpO1xyXG4gICAgbGV0IHBsYXllclBvaW50cyA9IGhhbmQuZ2V0UG9pbnRzKCk7XHJcbiAgICBpZiAoZGVhbGVyUG9pbnRzID4gMjEgfHwgcGxheWVyUG9pbnRzID4gZGVhbGVyUG9pbnRzKSB7XHJcbiAgICAgIGhhbmQub3V0Y29tZSA9IFwid2luXCI7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChwbGF5ZXJQb2ludHMgPCBkZWFsZXJQb2ludHMpIHtcclxuICAgICAgaGFuZC5vdXRjb21lID0gXCJsb3NlXCI7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgaGFuZC5vdXRjb21lID0gXCJwdXNoXCI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnYW1lTW9kZSgpIHtcclxuICAgICQoXCIudGl0bGUtc2NyZWVuXCIpLmhpZGUoKTtcclxuICAgIHRoaXMuYWRqdXN0U3BhY2UoKTtcclxuICAgIHRoaXMuZW5hYmxlKHRoaXMuJGhpdCwgdGhpcy4kc3RhbmQpO1xyXG4gICAgdGhpcy5kaXNhYmxlKHRoaXMuJGRlYWwpO1xyXG4gICAgJChcIi5iZXR0aW5nIC5idXR0b25zXCIpLmhpZGUoKTtcclxuICB9XHJcblxyXG4gIGhpdCgpIHtcclxuICAgIHRoaXMuZGlzYWJsZSh0aGlzLiRkb3VibGVEb3duLCB0aGlzLiRzcGxpdCk7XHJcbiAgICBpZiAoIXRoaXMuc3BsaXRJblBsYXkpIHtcclxuICAgICAgbGV0IHBsYXllclBvaW50cyA9IHRoaXMuZGVhbE9uZUNhcmQodGhpcy5wbGF5ZXJIYW5kKTtcclxuICAgICAgaWYgKHBsYXllclBvaW50cyA+IDIxKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiWW91IGJ1c3RcIik7XHJcbiAgICAgICAgdGhpcy5vdXRjb21lKFwibG9zZVwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIGxldCBjdXJyZW50SGFuZCA9IHRoaXMuZGV0ZXJtaW5lQ3VycmVudEhhbmQoKTtcclxuICAgICAgbGV0IHBsYXllclBvaW50cyA9IHRoaXMuZGVhbE9uZUNhcmQoY3VycmVudEhhbmQsIFwic3BsaXRcIik7XHJcbiAgICAgIGlmIChwbGF5ZXJQb2ludHMgPiAyMSkge1xyXG4gICAgICAgIGlmIChjdXJyZW50SGFuZCA9PT0gdGhpcy5wbGF5ZXJIYW5kKSB7XHJcbiAgICAgICAgICB0aGlzLnBsYXllckhhbmQub3V0Y29tZSA9IFwibG9zZVwiO1xyXG4gICAgICAgICAgdGhpcy5wbGF5ZXJIYW5kLnBsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMucGxheWVySGFuZDIucGxheWluZyA9IHRydWU7XHJcbiAgICAgICAgICB0aGlzLmRldGVybWluZUN1cnJlbnRIYW5kKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGN1cnJlbnRIYW5kID09PSB0aGlzLnBsYXllckhhbmQyKSB7XHJcbiAgICAgICAgICB0aGlzLnBsYXllckhhbmQyLm91dGNvbWUgPSBcImxvc2VcIjtcclxuICAgICAgICAgIHRoaXMucGxheWVySGFuZDIucGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5kZXRlcm1pbmVDdXJyZW50SGFuZCgpO1xyXG4gICAgICAgICAgdGhpcy5pbnZva2VPdXRjb21lKHRoaXMucGxheWVySGFuZCwgdGhpcy5wbGF5ZXJIYW5kMik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpbnZva2VPdXRjb21lKC4uLmhhbmRzKSB7XHJcbiAgICBsZXQgaGFuZDEgPSBoYW5kc1swXS5vdXRjb21lO1xyXG4gICAgaWYgKGhhbmRzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICBpZiAoaGFuZDEub3V0Y29tZSA9PT0gXCJ3aW5cIikge1xyXG4gICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIllvdSB3aW4hXCIpO1xyXG4gICAgICAgIHRoaXMub3V0Y29tZShcIndpblwiKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmIChoYW5kMS5vdXRjb21lID09PSBcImxvc2VcIikge1xyXG4gICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIkRlYWxlciB3aW5zXCIpO1xyXG4gICAgICAgIHRoaXMub3V0Y29tZShcImxvc2VcIik7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgdGhpcy5vdXRjb21lKFwicHVzaFwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoaGFuZHMubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgIGxldCBoYW5kMiA9IGhhbmRzWzFdLm91dGNvbWU7XHJcbiAgICAgIGlmIChoYW5kMSA9PT0gaGFuZDIpIHtcclxuICAgICAgICBpZiAoaGFuZDEgPT09IFwiYmxhY2tqYWNrXCIgJiYgaGFuZDIgPT09IFwiYmxhY2tqYWNrXCIpIHtcclxuICAgICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIlRXTyBCTEFDS0pBQ0tTISEhXCIpO1xyXG4gICAgICAgICAgdGhpcy5vdXRjb21lKFwiYmxhY2tqYWNrXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChoYW5kMSA9PT0gXCJ3aW5cIiAmJiBoYW5kMiA9PT0gXCJ3aW5cIikge1xyXG4gICAgICAgICAgdGhpcy5vdXRjb21lKFwid2luXCIpO1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiWW91IHdpbiBib3RoIVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoaGFuZDEgPT09IFwibG9zZVwiICYmIGhhbmQyID09PSBcImxvc2VcIikge1xyXG4gICAgICAgICAgdGhpcy5vdXRjb21lKFwibG9zZVwiKTtcclxuICAgICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIkRlYWxlciB3aW5zIGJvdGhcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5vdXRjb21lKFwicHVzaFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50QmV0IC89IDI7XHJcbiAgICAgICAgaWYgKGhhbmQxID09PSBcImJsYWNramFja1wiIHx8IGhhbmQyID09PSBcImJsYWNramFja1wiKSB7XHJcbiAgICAgICAgICAvLyBjYWxjdWxhdGUgY29tYmluZWQgb3V0Y29tZXMgYmVmb3JlIGNhbGxpbmcgdGhlIG91dGNvbWUgbWV0aG9kXHJcbiAgICAgICAgICBsZXQgYmV0ID0gY3VycmVudEJldDtcclxuICAgICAgICAgIHRoaXMuY3VycmVudEJldCAqPSAxLjU7XHJcbiAgICAgICAgICBpZiAoaGFuZDEgPT09IFwid2luXCIgfHwgaGFuZDIgPT09IFwid2luXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5vdXRjb21lKFwid2luXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRCZXQgKz0gYmV0O1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJZb3Ugd2luIGJvdGghXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZSBpZiAoaGFuZDEgPT09IFwibG9zZVwiIHx8IGhhbmQyID09PSBcImxvc2VcIikge1xyXG4gICAgICAgICAgICB0aGlzLm91dGNvbWUoXCJ3aW5cIik7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEJldCAtPSBiZXQ7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIllvdSBhbmQgZGVhbGVyIGVhY2ggd2luIG9uZVwiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm91dGNvbWUoXCJ3aW5cIik7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIllvdSB3aW4gb25lLCBwdXNoXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChoYW5kMSA9PT0gXCJ3aW5cIiB8fCBoYW5kMiA9PT0gXCJ3aW5cIikge1xyXG4gICAgICAgICAgaWYgKGhhbmQxID09PSBcInB1c2hcIiB8fCBoYW5kMiA9PT0gXCJwdXNoXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5vdXRjb21lKFwid2luXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJZb3Ugd2luIG9uZSwgcHVzaFwiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm91dGNvbWUoXCJwdXNoXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChoYW5kMSA9PT0gXCJsb3NlXCIgfHwgaGFuZDIgPT09IFwibG9zZVwiKSB7XHJcbiAgICAgICAgICB0aGlzLm91dGNvbWUoXCJsb3NlXCIpO1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiRGVhbGVyIHdpbnMgb25lLCBwdXNoXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc3BsaXRJblBsYXkgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbWFrZUJldCgpIHtcclxuICAgIHZhciAkdG90YWwgPSAkKFwiLnRvdGFsXCIpLFxyXG4gICAgICAgICRjdXJyZW50QmV0ID0gJChcIi5jdXJyZW50QmV0XCIpLFxyXG4gICAgICAgIGdhbWUgPSB0aGlzO1xyXG4gICAgJHRvdGFsLnRleHQodGhpcy5tb25leSk7XHJcbiAgICAkY3VycmVudEJldC50ZXh0KHRoaXMuY3VycmVudEJldCk7XHJcbiAgICAkKFwiLmJldC1idG5cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcclxuICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoXCJhZGQxMFwiKSAmJiBnYW1lLm1vbmV5IC0gZ2FtZS5jdXJyZW50QmV0ID49IDEwKSB7XHJcbiAgICAgICAgZ2FtZS5jdXJyZW50QmV0ICs9IDEwO1xyXG4gICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICQodGhpcykuaGFzQ2xhc3MoXCJhZGQ1MFwiKSAmJlxyXG4gICAgICAgIGdhbWUubW9uZXkgLSBnYW1lLmN1cnJlbnRCZXQgPj0gNTBcclxuICAgICAgKSB7XHJcbiAgICAgICAgZ2FtZS5jdXJyZW50QmV0ICs9IDUwO1xyXG4gICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICQodGhpcykuaGFzQ2xhc3MoXCJhZGQxMDBcIikgJiZcclxuICAgICAgICBnYW1lLm1vbmV5IC0gZ2FtZS5jdXJyZW50QmV0ID49IDEwMFxyXG4gICAgICApIHtcclxuICAgICAgICBnYW1lLmN1cnJlbnRCZXQgKz0gMTAwO1xyXG4gICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICQodGhpcykuaGFzQ2xhc3MoXCJhZGQ1MDBcIikgJiZcclxuICAgICAgICBnYW1lLm1vbmV5IC0gZ2FtZS5jdXJyZW50QmV0ID49IDUwMFxyXG4gICAgICApIHtcclxuICAgICAgICBnYW1lLmN1cnJlbnRCZXQgKz0gNTAwO1xyXG4gICAgICB9IGVsc2UgaWYgKCQodGhpcykuaGFzQ2xhc3MoXCJhbGwtaW5cIikpIHtcclxuICAgICAgICBnYW1lLmN1cnJlbnRCZXQgPSBnYW1lLm1vbmV5O1xyXG4gICAgICB9IGVsc2UgaWYgKCQodGhpcykuaGFzQ2xhc3MoXCJyZXNldFwiKSkge1xyXG4gICAgICAgIGdhbWUuY3VycmVudEJldCA9IDEwO1xyXG4gICAgICB9XHJcbiAgICAgICRjdXJyZW50QmV0LnRleHQoZ2FtZS5jdXJyZW50QmV0KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbW9kYWwobW9kYWxUeXBlKSB7XHJcbiAgICBpZiAobW9kYWxUeXBlID09PSBcImJhbmtydXB0XCIpIHtcclxuICAgICAgJChcIi5tb2RhbCwgLm1vZGFsLW92ZXJsYXlcIikucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpO1xyXG4gICAgICAkKFwiLm1vZGFsIC5tZXNzYWdlXCIpLmh0bWwoXHJcbiAgICAgICAgXCJZb3UndmUgbG9zdCBldmVyeXRoaW5nLlwiICtcclxuICAgICAgICAgIFwiPGJyLz48YnIvPlwiICtcclxuICAgICAgICAgIFwiR29vZCB0aGluZyBpdCdzIG5vdCByZWFsIG1vbmV5IVwiXHJcbiAgICAgICk7XHJcbiAgICAgICQoXCIubW9kYWwtZ3V0cyBidXR0b25cIikudGV4dChcIlBsYXkgYWdhaW5cIik7XHJcbiAgICAgICQoXCIubW9kYWwtZ3V0cyBidXR0b25cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKFwiLm1vZGFsLCAubW9kYWwtb3ZlcmxheVwiKS5hZGRDbGFzcyhcImhpZGVcIik7XHJcbiAgICAgICAgJChcIi50aXRsZS1zY3JlZW5cIikuc2hvdygpO1xyXG4gICAgICAgIGdhbWUucmVzZXRHYW1lKCk7XHJcbiAgICAgICAgZ2FtZS5yZXNldE1vbmV5KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIGlmIChtb2RhbFR5cGUgPT09IFwiaGVscFwiKSB7XHJcbiAgICAgIC8vIGZ1dHVyZSBnYW1lIGZlYXR1cmU6IGluc3RydWN0aW9ucyBhdmFpbGFibGUgaW4gaGVscCBtb2RhbFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb3V0Y29tZShyZXN1bHQpIHtcclxuICAgIHRoaXMucGxheWVySGFuZC5wbGF5aW5nID0gZmFsc2U7XHJcbiAgICB0aGlzLmRlYWxlckhhbmQucmV2ZWFsSG9sZSgpO1xyXG4gICAgdGhpcy5kZWFsZXJIYW5kLnVwZGF0ZURpc3BsYXkodGhpcy5kZWFsZXJIYW5kLmdldFBvaW50cygpKTtcclxuICAgIHRoaXMucHJldkJldCA9IHRoaXMuY3VycmVudEJldDtcclxuICAgIGlmIChyZXN1bHQgPT09IFwiYmxhY2tqYWNrXCIpIHtcclxuICAgICAgdGhpcy5tb25leSArPSB0aGlzLmN1cnJlbnRCZXQgKiAxLjU7XHJcbiAgICAgIHRoaXMuY2hhbmdlID0gdGhpcy5jdXJyZW50QmV0ICogMS41O1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAocmVzdWx0ID09PSBcIndpblwiKSB7XHJcbiAgICAgIHRoaXMubW9uZXkgKz0gdGhpcy5jdXJyZW50QmV0O1xyXG4gICAgICB0aGlzLmNoYW5nZSA9IHRoaXMuY3VycmVudEJldDtcclxuICAgIH0gXHJcbiAgICBlbHNlIGlmIChyZXN1bHQgPT09IFwicHVzaFwiKSB7XHJcbiAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIlB1c2hcIik7XHJcbiAgICAgIHRoaXMubW9uZXkgPSB0aGlzLm1vbmV5O1xyXG4gICAgICB0aGlzLmNoYW5nZSA9IDA7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChyZXN1bHQgPT09IFwibG9zZVwiKSB7XHJcbiAgICAgIGlmICh0aGlzLm1vbmV5IC0gdGhpcy5jdXJyZW50QmV0ID49IDEwKSB7XHJcbiAgICAgICAgdGhpcy5tb25leSAtPSB0aGlzLmN1cnJlbnRCZXQ7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2UgPSAtdGhpcy5jdXJyZW50QmV0O1xyXG4gICAgICAgIC8vIGRyb3AgdGhlIGJldCBhbW91bnQgZG93biB0byBlcXVhbCBtb25leSBhbW91bnQgb2YgbGFzdCBiZXQgdmFsdWUgaXMgZ3JlYXRlciB0aGFuIHRvdGFsIG1vbmV5IHZhbHVlXHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudEJldCA+IHRoaXMubW9uZXkpIHtcclxuICAgICAgICAgIHRoaXMuY3VycmVudEJldCA9IHRoaXMubW9uZXk7XHJcbiAgICAgICAgICAkKFwiLmN1cnJlbnRCZXRcIikudGV4dCh0aGlzLmN1cnJlbnRCZXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBcclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgdGhpcy5tb2RhbChcImJhbmtydXB0XCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLmVuZEdhbWVNb2RlKCk7XHJcbiAgfVxyXG5cclxuICByZXNldEdhbWUoKSB7XHJcbiAgICB0aGlzLmdhbWVEZWNrID0gbmV3IERlY2s7XHJcbiAgICB0aGlzLmRlYWxlckhhbmQgPSBuZXcgSGFuZChcImRlYWxlclwiKTtcclxuICAgIHRoaXMucGxheWVySGFuZCA9IG5ldyBIYW5kKFwicGxheWVyXCIsIDEpO1xyXG4gICAgJChcIi5tZXNzYWdlc1wiKS5lbXB0eSgpO1xyXG4gICAgJChcIi5wbGF5ZXItaGFuZFwiKS5lbXB0eSgpO1xyXG4gICAgJChcIi5kZWFsZXItaGFuZFwiKS5lbXB0eSgpO1xyXG4gICAgJChcIi5wbGF5ZXItcG9pbnRzXCIpLmVtcHR5KCk7XHJcbiAgICAkKFwiLmRlYWxlci1wb2ludHNcIikuZW1wdHkoKTtcclxuICAgICQoXCIuY2hhbmdlXCIpLmVtcHR5KCk7XHJcbiAgICAkKFwiLnByZXZCZXRcIikuZW1wdHkoKTtcclxuICB9XHJcblxyXG4gIHJlc2V0TW9uZXkoKSB7XHJcbiAgICB0aGlzLm1vbmV5ID0gNTAwO1xyXG4gICAgdGhpcy5jdXJyZW50QmV0ID0gMTA7XHJcbiAgICAkKFwiLnRvdGFsXCIpLnRleHQodGhpcy5tb25leSk7XHJcbiAgICAkKFwiLmN1cnJlbnRCZXRcIikudGV4dCh0aGlzLmN1cnJlbnRCZXQpO1xyXG4gIH1cclxuXHJcbiAgc3RhbmQoY2FsbGVyKSB7XHJcbiAgICAvLyBpZiBzcGxpdHRpbmcsIGdpdmUgaGFuZDIgb3Bwb3J0dW5pdHkgdG8gaGl0XHJcbiAgICBpZiAodGhpcy5zcGxpdEluUGxheSkge1xyXG4gICAgICB0aGlzLnNwbGl0SW5QbGF5ID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuY3VycmVudEhhbmQgPSBcImhhbmQyXCI7XHJcbiAgICAgICQoXCIjaGFuZDFcIikucmVtb3ZlQ2xhc3MoXCJjdXJyZW50SGFuZFwiKTtcclxuICAgICAgJChcIiNoYW5kMlwiKS5hZGRDbGFzcyhcImN1cnJlbnRIYW5kXCIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodGhpcy5jdXJyZW50SGFuZCA9PT0gXCJoYW5kMlwiKSB7XHJcbiAgICAgIC8vIGlmIHNwbGl0dGluZywgY2FsY3VsYXRlIHRoZSBvdXRjb21lIG9mIGJvdGggb2YgdGhlIHBsYXllcidzIGhhbmRzXHJcbiAgICAgIHRoaXMuY3VycmVudEhhbmQgPSBcImhhbmQxXCI7XHJcbiAgICAgIHRoaXMuZGVhbGVySGFuZC5yZXZlYWxIb2xlKCk7XHJcbiAgICAgIHdoaWxlICh0aGlzLmRlYWxlckhhbmQuZ2V0UG9pbnRzKCkgPCAxNykge1xyXG4gICAgICAgIHRoaXMuZGVhbE9uZUNhcmQodGhpcy5kZWFsZXJIYW5kKTtcclxuICAgICAgfVxyXG4gICAgICBsZXQgZGVhbGVyUG9pbnRzID0gdGhpcy5kZWFsZXJIYW5kLmdldFBvaW50cygpO1xyXG4gICAgICB0aGlzLmRlYWxlckhhbmQudXBkYXRlRGlzcGxheShkZWFsZXJQb2ludHMpO1xyXG4gICAgICBpZiAoZGVhbGVyUG9pbnRzID4gMjEpIHtcclxuICAgICAgICB0aGlzLnBsYXllckhhbmQub3V0Y29tZSA9IFwid2luXCI7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJIYW5kMi5vdXRjb21lID0gXCJ3aW5cIjtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICB0aGlzLmV2YWx1YXRlSGFuZCh0aGlzLnBsYXllckhhbmQpO1xyXG4gICAgICAgIHRoaXMuZXZhbHVhdGVIYW5kKHRoaXMucGxheWVySGFuZDIpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuaW52b2tlT3V0Y29tZSh0aGlzLnBsYXllckhhbmQsIHRoaXMucGxheWVySGFuZDIpO1xyXG4gICAgfSBcclxuICAgIGVsc2Uge1xyXG4gICAgICB0aGlzLmRpc2FibGUodGhpcy4kaGl0LCB0aGlzLiRzdGFuZCwgdGhpcy4kZG91YmxlRG93biwgdGhpcy4kc3BsaXQpO1xyXG4gICAgICAkKFwiI2hhbmQxLCAjaGFuZDJcIikucmVtb3ZlQ2xhc3MoXCJjdXJyZW50SGFuZFwiKTtcclxuICAgICAgLy8gaWYgc3RhbmQgd2FzIGNhbGxlZCBieSBjbGlja2luZyAnZG91YmxlIGRvd24nLCBkbyBhZGRpdGlvbmFsIHdvcmtcclxuICAgICAgaWYgKGNhbGxlciA9PT0gXCJkb3VibGUtZG93blwiKSB7XHJcbiAgICAgICAgdGhpcy5iZXQgPSB0aGlzLmJldCAvIDI7XHJcbiAgICAgICAgJChcIi5iZXRcIikudGV4dCh0aGlzLmJldCk7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlKHRoaXMuJGRvdWJsZURvd24pO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIGRlYWxlcidzIHR1cm5cclxuICAgICAgdGhpcy5kZWFsZXJIYW5kLnJldmVhbEhvbGUoKTtcclxuICAgICAgd2hpbGUgKHRoaXMuZGVhbGVySGFuZC5nZXRQb2ludHMoKSA8IDE3KSB7XHJcbiAgICAgICAgdGhpcy5kZWFsT25lQ2FyZCh0aGlzLmRlYWxlckhhbmQpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLmRlYWxlckhhbmQuZ2V0UG9pbnRzKCkgPiAyMSkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIkRlYWxlciBidXN0c1wiKTtcclxuICAgICAgICB0aGlzLm91dGNvbWUoXCJ3aW5cIik7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgdGhpcy5ldmFsdWF0ZUhhbmQodGhpcy5wbGF5ZXJIYW5kKTtcclxuICAgICAgICB0aGlzLmludm9rZU91dGNvbWUodGhpcy5wbGF5ZXJIYW5kKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3BsaXQoKSB7XHJcbiAgICB0aGlzLnNwbGl0SW5QbGF5ID0gdHJ1ZTtcclxuICAgIHRoaXMuZGlzYWJsZSh0aGlzLiRzcGxpdCk7XHJcbiAgICB0aGlzLnBsYXllckhhbmQuJHdyYXBwZXIuYWRkQ2xhc3MoXCJjdXJyZW50SGFuZFwiKTtcclxuXHJcbiAgICAvLyBkb3VibGUgYmV0IGFuZCBkaXNwbGF5IGl0XHJcbiAgICB0aGlzLmN1cnJlbnRCZXQgPSB0aGlzLmN1cnJlbnRCZXQgKiAyO1xyXG4gICAgJChcIi5jdXJyZW50QmV0XCIpLnRleHQodGhpcy5jdXJyZW50QmV0KTtcclxuXHJcbiAgICAvLyBzdGFydCBhZGRpdGlvbmFsIGhhbmQgYW5kIG1vdmUgb25lIGNhcmQgZnJvbSBoYW5kIDEgdG8gaGFuZCAyXHJcbiAgICB0aGlzLmFkanVzdFNwYWNlKCk7XHJcbiAgICB0aGlzLnBsYXllckhhbmQyID0gbmV3IEhhbmQoXCJwbGF5ZXJcIiwgMik7XHJcbiAgICBsZXQgcmVtb3ZlZENhcmQgPSB0aGlzLnBsYXllckhhbmQucmVtb3ZlQ2FyZCgpO1xyXG4gICAgdGhpcy5wbGF5ZXJIYW5kMi5hZGRDYXJkKHJlbW92ZWRDYXJkLmNhcmQsIHJlbW92ZWRDYXJkLiRjYXJkKTtcclxuICAgIHRoaXMuZGVhbE9uZUNhcmQodGhpcy5wbGF5ZXJIYW5kKTtcclxuICAgIHRoaXMuZGVhbE9uZUNhcmQodGhpcy5wbGF5ZXJIYW5kMik7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVNZXNzYWdlKG1lc3NhZ2UpIHtcclxuICAgICQoXCIubWVzc2FnZXNcIikuYXBwZW5kKGA8aDE+JHttZXNzYWdlfTwvaDE+YCk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2dhbWUuanMiLCJpbXBvcnQgQ2FyZCBmcm9tIFwiLi9jYXJkXCI7XHJcbmltcG9ydCBIYW5kIGZyb20gXCIuL2hhbmRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlY2sge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5jYXJkcyA9IFtdO1xyXG4gIH1cclxuXHJcbiAgZHJhdygpIHtcclxuICAgIHJldHVybiB0aGlzLmNhcmRzLnBvcCgpO1xyXG4gIH1cclxuXHJcbiAgZ2VuZXJhdGUobnVtRGVja3MpIHtcclxuICAgIGlmICghbnVtRGVja3MpIHtcclxuICAgICAgbnVtRGVja3MgPSAxO1xyXG4gICAgfVxyXG4gICAgd2hpbGUgKG51bURlY2tzID4gMCkge1xyXG4gICAgICBmb3IgKHZhciBpID0gMTsgaSA8PSAxMzsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5jYXJkcy5wdXNoKG5ldyBDYXJkKGksIFwic3BhZGVzXCIpKTtcclxuICAgICAgICB0aGlzLmNhcmRzLnB1c2gobmV3IENhcmQoaSwgXCJkaWFtb25kc1wiKSk7XHJcbiAgICAgICAgdGhpcy5jYXJkcy5wdXNoKG5ldyBDYXJkKGksIFwiaGVhcnRzXCIpKTtcclxuICAgICAgICB0aGlzLmNhcmRzLnB1c2gobmV3IENhcmQoaSwgXCJjbHVic1wiKSk7XHJcbiAgICAgIH1cclxuICAgICAgbnVtRGVja3MtLTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNodWZmbGUoKSB7XHJcbiAgICBmb3IgKGxldCBpID0gdGhpcy5jYXJkcy5sZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XHJcbiAgICAgIGNvbnN0IGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoaSArIDEpKTtcclxuICAgICAgW3RoaXMuY2FyZHNbaV1dID0gW3RoaXMuY2FyZHNbal1dO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9kZWNrLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==