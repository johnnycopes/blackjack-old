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
      this.startGameMode();

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
    key: "endGameMode",
    value: function endGameMode() {
      this.playerHand.playing = false;
      this.selectCurrentHand(this.playerHand);
      this.dealerHand.revealHole();
      this.dealerHand.updateDisplay(this.dealerHand.getPoints());

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
    key: "hit",
    value: function hit() {
      this.disable(this.$doubleDown, this.$split);
      if (!this.splitInPlay) {
        console.log('here');
        var playerPoints = this.dealOneCard(this.playerHand);
        if (playerPoints > 21) {
          this.updateMessage("You bust");
          this.outcome("lose");
        }
      } else {
        var currentHand = this.selectCurrentHand(this.playerHand, this.playerHand2);
        var _playerPoints = this.dealOneCard(currentHand, "split");
        if (_playerPoints > 21) {
          if (currentHand === this.playerHand) {
            this.playerHand.outcome = "lose";
            this.playerHand.playing = false;
            this.playerHand2.playing = true;
            this.selectCurrentHand(this.playerHand, this.playerHand2);
          } else if (currentHand === this.playerHand2) {
            this.playerHand2.outcome = "lose";
            this.playerHand2.playing = false;
            this.selectCurrentHand(this.playerHand, this.playerHand2);
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
        }
        this.splitInPlay = false;
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
      this.endGameMode();

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
    key: "selectCurrentHand",
    value: function selectCurrentHand() {
      var currentHand = void 0;

      for (var _len4 = arguments.length, hands = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        hands[_key4] = arguments[_key4];
      }

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = hands[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var hand = _step3.value;

          hand.toggleHighlight();
          if (hand.playing) {
            currentHand = hand;
          }
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

      return currentHand;
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
    key: "startGameMode",
    value: function startGameMode() {
      $(".title-screen").hide();
      this.adjustSpace();
      this.enable(this.$hit, this.$stand);
      this.disable(this.$deal);
      $(".betting .buttons").hide();
      this.playerHand.playing = true;
      this.selectCurrentHand(this.playerHand);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNmIwYWQ0YTMzM2UwMTE5ODM2YTUiLCJ3ZWJwYWNrOi8vLy4vanMvaGFuZC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jYXJkLmpzIiwid2VicGFjazovLy8uL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9nYW1lLmpzIiwid2VicGFjazovLy8uL2pzL2RlY2suanMiXSwibmFtZXMiOlsiSGFuZCIsIm93bmVyIiwiaGFuZE51bWJlciIsInNlbGVjdG9yIiwiJHdyYXBwZXIiLCIkIiwiJGhhbmQiLCIkcG9pbnRzIiwicGxheWluZyIsImNhcmRzIiwib3V0Y29tZSIsImNhcmQiLCIkY2FyZCIsInB1c2giLCJhcHBlbmQiLCJwb2ludCIsInRvdGFsIiwiYWNlcyIsInBvcCIsImZpbmQiLCJyZW1vdmUiLCJhdHRyIiwiZ2V0SW1hZ2VVcmwiLCJpbmRleCIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJjb250ZW50IiwidGV4dCIsIkNhcmQiLCJzdWl0IiwidmFsdWUiLCJjdXJyZW50R2FtZSIsIm1ha2VCZXQiLCJvbiIsInJlc2V0R2FtZSIsImdhbWVEZWNrIiwiZ2VuZXJhdGUiLCJkZWFsIiwiaGl0Iiwic3RhbmQiLCJkb3VibGVEb3duIiwic3BsaXQiLCJHYW1lIiwiZGVhbGVySGFuZCIsInBsYXllckhhbmQiLCJzcGxpdEluUGxheSIsIm1vbmV5IiwiY3VycmVudEJldCIsImNoYW5nZSIsIiRkZWFsIiwiJGhpdCIsIiRzdGFuZCIsIiRkb3VibGVEb3duIiwiJHNwbGl0IiwiJGNoYW5nZSIsInNpemUiLCJjc3MiLCJjbGFzc05hbWUiLCJzeW1ib2wiLCJNYXRoIiwiYWJzIiwiaGFuZCIsInNwZWNpYWwiLCJkcmF3IiwiYWRkQ2FyZCIsInVwZGF0ZURpc3BsYXkiLCJnZXRQb2ludHMiLCJzdGFydEdhbWVNb2RlIiwiZGVhbE9uZUNhcmQiLCJkZWFsZXJQb2ludHMiLCJwbGF5ZXJQb2ludHMiLCJ1cGRhdGVNZXNzYWdlIiwiZW5hYmxlIiwiY2FuU3BsaXQiLCJlbGVtZW50cyIsImVsZW1lbnQiLCJzZWxlY3RDdXJyZW50SGFuZCIsInJldmVhbEhvbGUiLCJwcmV2QmV0IiwiYXNzZXNzQ2hhbmdlIiwiZGlzYWJsZSIsInNob3ciLCJjb25zb2xlIiwibG9nIiwiY3VycmVudEhhbmQiLCJwbGF5ZXJIYW5kMiIsImludm9rZU91dGNvbWUiLCJoYW5kcyIsImhhbmQxIiwibGVuZ3RoIiwiaGFuZDIiLCJiZXQiLCIkdG90YWwiLCIkY3VycmVudEJldCIsImdhbWUiLCJoYXNDbGFzcyIsIm1vZGFsVHlwZSIsImh0bWwiLCJyZXNldE1vbmV5IiwicmVzdWx0IiwiZW5kR2FtZU1vZGUiLCJtb2RhbCIsImVtcHR5IiwidG9nZ2xlSGlnaGxpZ2h0IiwiYWRqdXN0U3BhY2UiLCJyZW1vdmVkQ2FyZCIsInJlbW92ZUNhcmQiLCJjYWxsZXIiLCJldmFsdWF0ZUhhbmQiLCJoaWRlIiwibWVzc2FnZSIsIkRlY2siLCJudW1EZWNrcyIsImkiLCJqIiwiZmxvb3IiLCJyYW5kb20iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzdEQTs7Ozs7Ozs7SUFFcUJBLEk7QUFDbkIsZ0JBQVlDLEtBQVosRUFBbUJDLFVBQW5CLEVBQStCO0FBQUE7O0FBQzdCLFFBQUlDLGlCQUFK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QUFMLENBQVd3RyxDQUFYLENBRjZDO0FBRy9DO0FBQ0Y7Ozs7OztrQkE3QmtCRixJIiwiZmlsZSI6Ii4vanMvbWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDZiMGFkNGEzMzNlMDExOTgzNmE1IiwiaW1wb3J0IENhcmQgZnJvbSBcIi4vY2FyZFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGFuZCB7XHJcbiAgY29uc3RydWN0b3Iob3duZXIsIGhhbmROdW1iZXIpIHtcclxuICAgIGxldCBzZWxlY3RvcjtcclxuICAgIGlmIChvd25lciA9PT0gJ2RlYWxlcicpIHtcclxuICAgICAgc2VsZWN0b3IgPSBcIiNkZWFsZXJcIjtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKG93bmVyID09PSAncGxheWVyJykge1xyXG4gICAgICBpZiAoaGFuZE51bWJlciA9PT0gMSkge1xyXG4gICAgICAgIHNlbGVjdG9yID0gXCIjaGFuZDFcIjtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmIChoYW5kTnVtYmVyID09PSAyKSB7XHJcbiAgICAgICAgc2VsZWN0b3IgPSBcIiNoYW5kMlwiO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLiR3cmFwcGVyID0gJChgJHtzZWxlY3Rvcn1gKTtcclxuICAgIHRoaXMuJGhhbmQgPSAkKGAke3NlbGVjdG9yfSAuaGFuZGApO1xyXG4gICAgdGhpcy4kcG9pbnRzID0gJChgJHtzZWxlY3Rvcn0gLnBvaW50c2ApO1xyXG4gICAgdGhpcy5wbGF5aW5nID0gZmFsc2U7XHJcbiAgICB0aGlzLmNhcmRzID0gW107XHJcbiAgICB0aGlzLm91dGNvbWU7XHJcbiAgfVxyXG5cclxuICBhZGRDYXJkKGNhcmQsICRjYXJkKSB7XHJcbiAgICB0aGlzLmNhcmRzLnB1c2goY2FyZCk7XHJcbiAgICB0aGlzLiRoYW5kLmFwcGVuZCgkY2FyZCk7XHJcbiAgfVxyXG5cclxuICBjYW5TcGxpdCgpIHtcclxuICAgIHJldHVybiB0aGlzLmNhcmRzWzBdLnBvaW50ID09PSB0aGlzLmNhcmRzWzFdLnBvaW50O1xyXG4gIH1cclxuXHJcbiAgZ2V0UG9pbnRzKCkge1xyXG4gICAgbGV0IHRvdGFsID0gMDtcclxuICAgIGxldCBhY2VzID0gMDtcclxuICAgIGZvciAobGV0IGNhcmQgb2YgdGhpcy5jYXJkcykge1xyXG4gICAgICBsZXQgcG9pbnQgPSBjYXJkLnBvaW50O1xyXG4gICAgICBpZiAocG9pbnQgPT09IDEpIHtcclxuICAgICAgICB0b3RhbCArPSAxMDtcclxuICAgICAgICBhY2VzKys7XHJcbiAgICAgIH0gXHJcbiAgICAgIGVsc2UgaWYgKHBvaW50ID4gMTApIHtcclxuICAgICAgICBwb2ludCA9IDEwO1xyXG4gICAgICB9XHJcbiAgICAgIHRvdGFsICs9IHBvaW50O1xyXG4gICAgICB3aGlsZSAodG90YWwgPiAyMSAmJiBhY2VzID4gMCkge1xyXG4gICAgICAgIHRvdGFsIC09IDEwO1xyXG4gICAgICAgIGFjZXMtLTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRvdGFsO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlQ2FyZCgpIHtcclxuICAgIGxldCBjYXJkID0gdGhpcy5jYXJkcy5wb3AoKTtcclxuICAgIGxldCAkY2FyZCA9IHRoaXMuJGhhbmQuZmluZChcImltZzpsYXN0LWNoaWxkXCIpLnJlbW92ZSgpO1xyXG4gICAgcmV0dXJuIHtjYXJkLCAkY2FyZH07XHJcbiAgfVxyXG5cclxuICByZXZlYWxIb2xlKCkge1xyXG4gICAgdGhpcy4kaGFuZC5maW5kKCdpbWc6Zmlyc3QtY2hpbGQnKS5hdHRyKCdzcmMnLCB0aGlzLmNhcmRzWzBdLmdldEltYWdlVXJsKCkpO1xyXG4gIH1cclxuXHJcbiAgc2VlQ2FyZChpbmRleCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2FyZHNbaW5kZXggLSAxXTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZUhpZ2hsaWdodCgpIHtcclxuICAgIHRoaXMucGxheWluZyA/IHRoaXMuJHdyYXBwZXIuYWRkQ2xhc3MoXCJjdXJyZW50SGFuZFwiKSA6IHRoaXMuJHdyYXBwZXIucmVtb3ZlQ2xhc3MoXCJjdXJyZW50SGFuZFwiKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZURpc3BsYXkoY29udGVudCkge1xyXG4gICAgdGhpcy4kcG9pbnRzLnRleHQoY29udGVudCk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2hhbmQuanMiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJkIHtcclxuICBjb25zdHJ1Y3Rvcihwb2ludCwgc3VpdCkge1xyXG4gICAgdGhpcy5wb2ludCA9IHBvaW50O1xyXG4gICAgdGhpcy5zdWl0ID0gc3VpdDtcclxuICB9XHJcblxyXG4gIGdldEltYWdlVXJsKCkge1xyXG4gICAgbGV0IHZhbHVlID0gdGhpcy5wb2ludDtcclxuICAgIGlmICh0aGlzLnBvaW50ID09PSAxMSkge1xyXG4gICAgICB2YWx1ZSA9IFwiamFja1wiO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodGhpcy5wb2ludCA9PT0gMTIpIHtcclxuICAgICAgdmFsdWUgPSBcInF1ZWVuXCI7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0aGlzLnBvaW50ID09PSAxMykge1xyXG4gICAgICB2YWx1ZSA9IFwia2luZ1wiO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodGhpcy5wb2ludCA9PT0gMSkge1xyXG4gICAgICB2YWx1ZSA9IFwiYWNlXCI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYGltYWdlcy8ke3ZhbHVlfV9vZl8ke3RoaXMuc3VpdH0uc3ZnYDtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvY2FyZC5qcyIsImltcG9ydCBHYW1lIGZyb20gJy4vZ2FtZSc7XG5cbnZhciBjdXJyZW50R2FtZSA9IG5ldyBHYW1lO1xuXG5jdXJyZW50R2FtZS5tYWtlQmV0KCk7XG5cbiQoJy5kZWFsJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gIGN1cnJlbnRHYW1lLnJlc2V0R2FtZSgpO1xuICBjdXJyZW50R2FtZS5nYW1lRGVjay5nZW5lcmF0ZSgzKTtcbiAgY3VycmVudEdhbWUuZGVhbCgpO1xufSk7XG5cbiQoJy5oaXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgY3VycmVudEdhbWUuaGl0KCk7XG59KTtcblxuJCgnLnN0YW5kJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gIGN1cnJlbnRHYW1lLnN0YW5kKCk7XG59KTtcblxuJCgnLmRvdWJsZS1kb3duJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gIGN1cnJlbnRHYW1lLmRvdWJsZURvd24oKTtcbn0pO1xuXG4kKCcuc3BsaXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgY3VycmVudEdhbWUuc3BsaXQoKTtcbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvYXBwLmpzIiwiaW1wb3J0IEhhbmQgZnJvbSBcIi4vaGFuZFwiO1xyXG5pbXBvcnQgRGVjayBmcm9tIFwiLi9kZWNrXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuZ2FtZURlY2sgPSBuZXcgRGVjaztcclxuICAgIHRoaXMuZGVhbGVySGFuZCA9IG5ldyBIYW5kKCdkZWFsZXInKTtcclxuICAgIHRoaXMucGxheWVySGFuZCA9IG5ldyBIYW5kKCdwbGF5ZXInLCAxKTtcclxuICAgIHRoaXMuc3BsaXRJblBsYXkgPSBmYWxzZTtcclxuICAgIHRoaXMubW9uZXkgPSA1MDA7XHJcbiAgICB0aGlzLmN1cnJlbnRCZXQgPSAxMDtcclxuICAgIHRoaXMuY2hhbmdlO1xyXG4gICAgXHJcbiAgICB0aGlzLiRkZWFsID0gJChcIi5kZWFsXCIpO1xyXG4gICAgdGhpcy4kaGl0ID0gJChcIi5oaXRcIik7XHJcbiAgICB0aGlzLiRzdGFuZCA9ICQoXCIuc3RhbmRcIik7XHJcbiAgICB0aGlzLiRkb3VibGVEb3duID0gJChcIi5kb3VibGUtZG93blwiKTtcclxuICAgIHRoaXMuJHNwbGl0ID0gJChcIi5zcGxpdFwiKTtcclxuICAgIHRoaXMuJGNoYW5nZSA9ICQoXCIuY2hhbmdlXCIpO1xyXG4gIH1cclxuXHJcbiAgYWRqdXN0U3BhY2UoKSB7XHJcbiAgICBsZXQgc2l6ZTtcclxuICAgIHRoaXMuc3BsaXRJblBsYXkgPyBzaXplID0gNTAgOiBzaXplID0gMTAwO1xyXG4gICAgJChcIi5wbGF5ZXJIYW5kLWRpdlwiKS5jc3MoXCJ3aWR0aFwiLCBgJHtzaXplfSVgKTtcclxuICB9XHJcblxyXG4gIGFzc2Vzc0NoYW5nZSgpIHtcclxuICAgIGxldCBjbGFzc05hbWUgPSBcIlwiO1xyXG4gICAgbGV0IHN5bWJvbCA9IFwiXCI7XHJcbiAgICBpZiAodGhpcy5jaGFuZ2UgPiAwKSB7XHJcbiAgICAgIGNsYXNzTmFtZSA9IFwicG9zaXRpdmVcIjtcclxuICAgICAgc3ltYm9sID0gXCIrXCI7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0aGlzLmNoYW5nZSA8IDApIHtcclxuICAgICAgY2xhc3NOYW1lID0gXCJuZWdhdGl2ZVwiO1xyXG4gICAgICBzeW1ib2wgPSBcIi1cIjtcclxuICAgIH1cclxuICAgIHRoaXMuJGNoYW5nZS5hcHBlbmQoYDxzcGFuIGNsYXNzPVwiJHtjbGFzc05hbWV9XCI+JHtzeW1ib2x9ICQke01hdGguYWJzKHRoaXMuY2hhbmdlKX08L3NwYW4+YCk7XHJcbiAgfVxyXG5cclxuICBkZWFsT25lQ2FyZChoYW5kLCBzcGVjaWFsKSB7XHJcbiAgICBsZXQgY2FyZCA9IHRoaXMuZ2FtZURlY2suZHJhdygpO1xyXG4gICAgbGV0ICRjYXJkID0gJChcIjxpbWcgLz5cIiwge1xyXG4gICAgICBcImNsYXNzXCI6IFwiY2FyZFwiLCBcclxuICAgICAgXCJzcmNcIjogYCR7Y2FyZC5nZXRJbWFnZVVybCgpfWBcclxuICAgIH0pO1xyXG4gICAgaWYgKHNwZWNpYWwgPT09IFwiaG9sZVwiKSB7XHJcbiAgICAgICRjYXJkLmF0dHIoJ3NyYycsIFwiaW1hZ2VzL2JhY2stc3VpdHMtcmVkLnN2Z1wiKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHNwZWNpYWwgPT09IFwiZG91YmxlLWRvd25cIikge1xyXG4gICAgICAkY2FyZC5hZGRDbGFzcygnY2FyZC1kZCcpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoc3BlY2lhbCA9PT0gXCJzcGxpdFwiKSB7XHJcbiAgICAgICRjYXJkLmFkZENsYXNzKCdzcGxpdCcpO1xyXG4gICAgfVxyXG4gICAgaGFuZC5hZGRDYXJkKGNhcmQsICRjYXJkKTtcclxuICAgIGhhbmQudXBkYXRlRGlzcGxheShoYW5kLmdldFBvaW50cygpKTtcclxuICAgIHJldHVybiBoYW5kLmdldFBvaW50cygpO1xyXG4gIH1cclxuXHJcbiAgZGVhbCgpIHtcclxuICAgIHRoaXMuc3RhcnRHYW1lTW9kZSgpO1xyXG5cclxuICAgIC8vIHNodWZmbGUgZGVjayhzKSBhbmQgZGVhbCBjYXJkc1xyXG4gICAgLy8gdGhpcy5nYW1lRGVjay5zaHVmZmxlKCk7XHJcbiAgICB0aGlzLmRlYWxPbmVDYXJkKHRoaXMuZGVhbGVySGFuZCwgXCJob2xlXCIpO1xyXG4gICAgdGhpcy5kZWFsT25lQ2FyZCh0aGlzLnBsYXllckhhbmQpO1xyXG4gICAgbGV0IGRlYWxlclBvaW50cyA9IHRoaXMuZGVhbE9uZUNhcmQodGhpcy5kZWFsZXJIYW5kKTtcclxuICAgIGxldCBwbGF5ZXJQb2ludHMgPSB0aGlzLmRlYWxPbmVDYXJkKHRoaXMucGxheWVySGFuZCk7XHJcblxyXG4gICAgLy8gY29uY2VhbCBkZWFsZXIgdG90YWxcclxuICAgIHRoaXMuZGVhbGVySGFuZC51cGRhdGVEaXNwbGF5KFwiP1wiKTtcclxuXHJcbiAgICBpZiAoZGVhbGVyUG9pbnRzID09PSAyMSAmJiBwbGF5ZXJQb2ludHMgPT09IDIxKSB7XHJcbiAgICAgIHRoaXMub3V0Y29tZShcInB1c2hcIik7XHJcbiAgICAgIHRoaXMuZGVhbGVySGFuZC51cGRhdGVEaXNwbGF5KFwiQmxhY2tqYWNrXCIpO1xyXG4gICAgICB0aGlzLnBsYXllckhhbmQudXBkYXRlRGlzcGxheShcIkJMQUNLSkFDSywgSE9UIERBTU4hXCIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoZGVhbGVyUG9pbnRzID09PSAyMSkge1xyXG4gICAgICB0aGlzLm91dGNvbWUoXCJsb3NlXCIpO1xyXG4gICAgICB0aGlzLmRlYWxlckhhbmQudXBkYXRlRGlzcGxheShcIkJsYWNramFja1wiKTtcclxuICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiRGVhbGVyIHdpbnNcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChwbGF5ZXJQb2ludHMgPT09IDIxKSB7XHJcbiAgICAgIHRoaXMub3V0Y29tZShcImJsYWNramFja1wiKTtcclxuICAgICAgdGhpcy5kZWFsZXJIYW5kLnVwZGF0ZURpc3BsYXkoZGVhbGVyUG9pbnRzKTtcclxuICAgICAgdGhpcy5wbGF5ZXJIYW5kLnVwZGF0ZURpc3BsYXkoXCJCTEFDS0pBQ0ssIEhPVCBEQU1OIVwiKTtcclxuICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiWW91IHdpbiFcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0aGlzLm1vbmV5ID4gdGhpcy5jdXJyZW50QmV0ICogMikge1xyXG4gICAgICBpZiAocGxheWVyUG9pbnRzID09PSAxMSkgIHtcclxuICAgICAgICB0aGlzLmVuYWJsZSh0aGlzLiRkb3VibGVEb3duKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5wbGF5ZXJIYW5kLmNhblNwbGl0KCkpIHtcclxuICAgICAgICB0aGlzLmVuYWJsZSh0aGlzLiRzcGxpdCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRpc2FibGUoLi4uZWxlbWVudHMpIHtcclxuICAgIGZvciAobGV0IGVsZW1lbnQgb2YgZWxlbWVudHMpIHtcclxuICAgICAgZWxlbWVudC5hdHRyKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkb3VibGVEb3duKCkge1xyXG4gICAgLy8gZG91YmxlIGJldCBhbmQgZGlzcGxheSBpdFxyXG4gICAgdGhpcy5jdXJyZW50QmV0ICo9IDI7XHJcbiAgICAkKFwiLmN1cnJlbnRCZXRcIikudGV4dCh0aGlzLmN1cnJlbnRCZXQpO1xyXG4gICAgLy8gZGVhbCB0aGUgcGxheWVyIG9uZSBtb3JlIGNhcmQgYW5kIHRoZW4gbW92ZSBvbiB0byB0aGUgZGVhbGVyJ3MgdHVyblxyXG4gICAgdGhpcy5kZWFsT25lQ2FyZCh0aGlzLnBsYXllckhhbmQsIFwiZG91YmxlLWRvd25cIik7XHJcbiAgICB0aGlzLnN0YW5kKFwiZG91YmxlLWRvd25cIik7XHJcbiAgfVxyXG5cclxuICBlbmFibGUoLi4uZWxlbWVudHMpIHtcclxuICAgIGZvciAobGV0IGVsZW1lbnQgb2YgZWxlbWVudHMpIHtcclxuICAgICAgZWxlbWVudC5hdHRyKFwiZGlzYWJsZWRcIiwgZmFsc2UpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZW5kR2FtZU1vZGUoKSB7XHJcbiAgICB0aGlzLnBsYXllckhhbmQucGxheWluZyA9IGZhbHNlO1xyXG4gICAgdGhpcy5zZWxlY3RDdXJyZW50SGFuZCh0aGlzLnBsYXllckhhbmQpO1xyXG4gICAgdGhpcy5kZWFsZXJIYW5kLnJldmVhbEhvbGUoKTtcclxuICAgIHRoaXMuZGVhbGVySGFuZC51cGRhdGVEaXNwbGF5KHRoaXMuZGVhbGVySGFuZC5nZXRQb2ludHMoKSk7XHJcblxyXG4gICAgJChcIi50b3RhbFwiKS50ZXh0KHRoaXMubW9uZXkpO1xyXG4gICAgJChcIi5wcmV2QmV0XCIpLmFwcGVuZChgPHNwYW4+JCR7dGhpcy5wcmV2QmV0fTwvc3Bhbj5gKTtcclxuICAgIHRoaXMuYXNzZXNzQ2hhbmdlKCk7XHJcbiAgICB0aGlzLmVuYWJsZSh0aGlzLiRkZWFsKTtcclxuICAgIHRoaXMuZGlzYWJsZSh0aGlzLiRoaXQsIHRoaXMuJHN0YW5kKTtcclxuICAgICQoXCIuYmV0dGluZyAuYnV0dG9uc1wiKS5zaG93KCk7XHJcbiAgfVxyXG5cclxuICBldmFsdWF0ZUhhbmQoaGFuZCkge1xyXG4gICAgbGV0IGRlYWxlclBvaW50cyA9IHRoaXMuZGVhbGVySGFuZC5nZXRQb2ludHMoKTtcclxuICAgIGxldCBwbGF5ZXJQb2ludHMgPSBoYW5kLmdldFBvaW50cygpO1xyXG4gICAgaWYgKGRlYWxlclBvaW50cyA+IDIxIHx8IHBsYXllclBvaW50cyA+IGRlYWxlclBvaW50cykge1xyXG4gICAgICBoYW5kLm91dGNvbWUgPSBcIndpblwiO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAocGxheWVyUG9pbnRzIDwgZGVhbGVyUG9pbnRzKSB7XHJcbiAgICAgIGhhbmQub3V0Y29tZSA9IFwibG9zZVwiO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIGhhbmQub3V0Y29tZSA9IFwicHVzaFwiO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaGl0KCkge1xyXG4gICAgdGhpcy5kaXNhYmxlKHRoaXMuJGRvdWJsZURvd24sIHRoaXMuJHNwbGl0KTtcclxuICAgIGlmICghdGhpcy5zcGxpdEluUGxheSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnaGVyZScpO1xyXG4gICAgICBsZXQgcGxheWVyUG9pbnRzID0gdGhpcy5kZWFsT25lQ2FyZCh0aGlzLnBsYXllckhhbmQpO1xyXG4gICAgICBpZiAocGxheWVyUG9pbnRzID4gMjEpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJZb3UgYnVzdFwiKTtcclxuICAgICAgICB0aGlzLm91dGNvbWUoXCJsb3NlXCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgbGV0IGN1cnJlbnRIYW5kID0gdGhpcy5zZWxlY3RDdXJyZW50SGFuZCh0aGlzLnBsYXllckhhbmQsIHRoaXMucGxheWVySGFuZDIpO1xyXG4gICAgICBsZXQgcGxheWVyUG9pbnRzID0gdGhpcy5kZWFsT25lQ2FyZChjdXJyZW50SGFuZCwgXCJzcGxpdFwiKTtcclxuICAgICAgaWYgKHBsYXllclBvaW50cyA+IDIxKSB7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRIYW5kID09PSB0aGlzLnBsYXllckhhbmQpIHtcclxuICAgICAgICAgIHRoaXMucGxheWVySGFuZC5vdXRjb21lID0gXCJsb3NlXCI7XHJcbiAgICAgICAgICB0aGlzLnBsYXllckhhbmQucGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5wbGF5ZXJIYW5kMi5wbGF5aW5nID0gdHJ1ZTtcclxuICAgICAgICAgIHRoaXMuc2VsZWN0Q3VycmVudEhhbmQodGhpcy5wbGF5ZXJIYW5kLCB0aGlzLnBsYXllckhhbmQyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY3VycmVudEhhbmQgPT09IHRoaXMucGxheWVySGFuZDIpIHtcclxuICAgICAgICAgIHRoaXMucGxheWVySGFuZDIub3V0Y29tZSA9IFwibG9zZVwiO1xyXG4gICAgICAgICAgdGhpcy5wbGF5ZXJIYW5kMi5wbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLnNlbGVjdEN1cnJlbnRIYW5kKHRoaXMucGxheWVySGFuZCwgdGhpcy5wbGF5ZXJIYW5kMik7XHJcbiAgICAgICAgICB0aGlzLmludm9rZU91dGNvbWUodGhpcy5wbGF5ZXJIYW5kLCB0aGlzLnBsYXllckhhbmQyKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGludm9rZU91dGNvbWUoLi4uaGFuZHMpIHtcclxuICAgIGxldCBoYW5kMSA9IGhhbmRzWzBdLm91dGNvbWU7XHJcbiAgICBpZiAoaGFuZHMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgIGlmIChoYW5kMS5vdXRjb21lID09PSBcIndpblwiKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiWW91IHdpbiFcIik7XHJcbiAgICAgICAgdGhpcy5vdXRjb21lKFwid2luXCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKGhhbmQxLm91dGNvbWUgPT09IFwibG9zZVwiKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiRGVhbGVyIHdpbnNcIik7XHJcbiAgICAgICAgdGhpcy5vdXRjb21lKFwibG9zZVwiKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICB0aGlzLm91dGNvbWUoXCJwdXNoXCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChoYW5kcy5sZW5ndGggPT09IDIpIHtcclxuICAgICAgbGV0IGhhbmQyID0gaGFuZHNbMV0ub3V0Y29tZTtcclxuICAgICAgaWYgKGhhbmQxID09PSBoYW5kMikge1xyXG4gICAgICAgIGlmIChoYW5kMSA9PT0gXCJibGFja2phY2tcIiAmJiBoYW5kMiA9PT0gXCJibGFja2phY2tcIikge1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiVFdPIEJMQUNLSkFDS1MhISFcIik7XHJcbiAgICAgICAgICB0aGlzLm91dGNvbWUoXCJibGFja2phY2tcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGhhbmQxID09PSBcIndpblwiICYmIGhhbmQyID09PSBcIndpblwiKSB7XHJcbiAgICAgICAgICB0aGlzLm91dGNvbWUoXCJ3aW5cIik7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJZb3Ugd2luIGJvdGghXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChoYW5kMSA9PT0gXCJsb3NlXCIgJiYgaGFuZDIgPT09IFwibG9zZVwiKSB7XHJcbiAgICAgICAgICB0aGlzLm91dGNvbWUoXCJsb3NlXCIpO1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiRGVhbGVyIHdpbnMgYm90aFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLm91dGNvbWUoXCJwdXNoXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICB0aGlzLmN1cnJlbnRCZXQgLz0gMjtcclxuICAgICAgICBpZiAoaGFuZDEgPT09IFwiYmxhY2tqYWNrXCIgfHwgaGFuZDIgPT09IFwiYmxhY2tqYWNrXCIpIHtcclxuICAgICAgICAgIC8vIGNhbGN1bGF0ZSBjb21iaW5lZCBvdXRjb21lcyBiZWZvcmUgY2FsbGluZyB0aGUgb3V0Y29tZSBtZXRob2RcclxuICAgICAgICAgIGxldCBiZXQgPSBjdXJyZW50QmV0O1xyXG4gICAgICAgICAgdGhpcy5jdXJyZW50QmV0ICo9IDEuNTtcclxuICAgICAgICAgIGlmIChoYW5kMSA9PT0gXCJ3aW5cIiB8fCBoYW5kMiA9PT0gXCJ3aW5cIikge1xyXG4gICAgICAgICAgICB0aGlzLm91dGNvbWUoXCJ3aW5cIik7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEJldCArPSBiZXQ7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIllvdSB3aW4gYm90aCFcIik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNlIGlmIChoYW5kMSA9PT0gXCJsb3NlXCIgfHwgaGFuZDIgPT09IFwibG9zZVwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3V0Y29tZShcIndpblwiKTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50QmV0IC09IGJldDtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiWW91IGFuZCBkZWFsZXIgZWFjaCB3aW4gb25lXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMub3V0Y29tZShcIndpblwiKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiWW91IHdpbiBvbmUsIHB1c2hcIik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGhhbmQxID09PSBcIndpblwiIHx8IGhhbmQyID09PSBcIndpblwiKSB7XHJcbiAgICAgICAgICBpZiAoaGFuZDEgPT09IFwicHVzaFwiIHx8IGhhbmQyID09PSBcInB1c2hcIikge1xyXG4gICAgICAgICAgICB0aGlzLm91dGNvbWUoXCJ3aW5cIik7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIllvdSB3aW4gb25lLCBwdXNoXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMub3V0Y29tZShcInB1c2hcIik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGhhbmQxID09PSBcImxvc2VcIiB8fCBoYW5kMiA9PT0gXCJsb3NlXCIpIHtcclxuICAgICAgICAgIHRoaXMub3V0Y29tZShcImxvc2VcIik7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJEZWFsZXIgd2lucyBvbmUsIHB1c2hcIilcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zcGxpdEluUGxheSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbWFrZUJldCgpIHtcclxuICAgIHZhciAkdG90YWwgPSAkKFwiLnRvdGFsXCIpLFxyXG4gICAgICAgICRjdXJyZW50QmV0ID0gJChcIi5jdXJyZW50QmV0XCIpLFxyXG4gICAgICAgIGdhbWUgPSB0aGlzO1xyXG4gICAgJHRvdGFsLnRleHQodGhpcy5tb25leSk7XHJcbiAgICAkY3VycmVudEJldC50ZXh0KHRoaXMuY3VycmVudEJldCk7XHJcbiAgICAkKFwiLmJldC1idG5cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcclxuICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoXCJhZGQxMFwiKSAmJiBnYW1lLm1vbmV5IC0gZ2FtZS5jdXJyZW50QmV0ID49IDEwKSB7XHJcbiAgICAgICAgZ2FtZS5jdXJyZW50QmV0ICs9IDEwO1xyXG4gICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICQodGhpcykuaGFzQ2xhc3MoXCJhZGQ1MFwiKSAmJlxyXG4gICAgICAgIGdhbWUubW9uZXkgLSBnYW1lLmN1cnJlbnRCZXQgPj0gNTBcclxuICAgICAgKSB7XHJcbiAgICAgICAgZ2FtZS5jdXJyZW50QmV0ICs9IDUwO1xyXG4gICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICQodGhpcykuaGFzQ2xhc3MoXCJhZGQxMDBcIikgJiZcclxuICAgICAgICBnYW1lLm1vbmV5IC0gZ2FtZS5jdXJyZW50QmV0ID49IDEwMFxyXG4gICAgICApIHtcclxuICAgICAgICBnYW1lLmN1cnJlbnRCZXQgKz0gMTAwO1xyXG4gICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICQodGhpcykuaGFzQ2xhc3MoXCJhZGQ1MDBcIikgJiZcclxuICAgICAgICBnYW1lLm1vbmV5IC0gZ2FtZS5jdXJyZW50QmV0ID49IDUwMFxyXG4gICAgICApIHtcclxuICAgICAgICBnYW1lLmN1cnJlbnRCZXQgKz0gNTAwO1xyXG4gICAgICB9IGVsc2UgaWYgKCQodGhpcykuaGFzQ2xhc3MoXCJhbGwtaW5cIikpIHtcclxuICAgICAgICBnYW1lLmN1cnJlbnRCZXQgPSBnYW1lLm1vbmV5O1xyXG4gICAgICB9IGVsc2UgaWYgKCQodGhpcykuaGFzQ2xhc3MoXCJyZXNldFwiKSkge1xyXG4gICAgICAgIGdhbWUuY3VycmVudEJldCA9IDEwO1xyXG4gICAgICB9XHJcbiAgICAgICRjdXJyZW50QmV0LnRleHQoZ2FtZS5jdXJyZW50QmV0KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbW9kYWwobW9kYWxUeXBlKSB7XHJcbiAgICBpZiAobW9kYWxUeXBlID09PSBcImJhbmtydXB0XCIpIHtcclxuICAgICAgJChcIi5tb2RhbCwgLm1vZGFsLW92ZXJsYXlcIikucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpO1xyXG4gICAgICAkKFwiLm1vZGFsIC5tZXNzYWdlXCIpLmh0bWwoXHJcbiAgICAgICAgXCJZb3UndmUgbG9zdCBldmVyeXRoaW5nLlwiICtcclxuICAgICAgICAgIFwiPGJyLz48YnIvPlwiICtcclxuICAgICAgICAgIFwiR29vZCB0aGluZyBpdCdzIG5vdCByZWFsIG1vbmV5IVwiXHJcbiAgICAgICk7XHJcbiAgICAgICQoXCIubW9kYWwtZ3V0cyBidXR0b25cIikudGV4dChcIlBsYXkgYWdhaW5cIik7XHJcbiAgICAgICQoXCIubW9kYWwtZ3V0cyBidXR0b25cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKFwiLm1vZGFsLCAubW9kYWwtb3ZlcmxheVwiKS5hZGRDbGFzcyhcImhpZGVcIik7XHJcbiAgICAgICAgJChcIi50aXRsZS1zY3JlZW5cIikuc2hvdygpO1xyXG4gICAgICAgIGdhbWUucmVzZXRHYW1lKCk7XHJcbiAgICAgICAgZ2FtZS5yZXNldE1vbmV5KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIGlmIChtb2RhbFR5cGUgPT09IFwiaGVscFwiKSB7XHJcbiAgICAgIC8vIGZ1dHVyZSBnYW1lIGZlYXR1cmU6IGluc3RydWN0aW9ucyBhdmFpbGFibGUgaW4gaGVscCBtb2RhbFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb3V0Y29tZShyZXN1bHQpIHtcclxuICAgIHRoaXMuZW5kR2FtZU1vZGUoKTtcclxuXHJcbiAgICB0aGlzLnByZXZCZXQgPSB0aGlzLmN1cnJlbnRCZXQ7XHJcbiAgICBpZiAocmVzdWx0ID09PSBcImJsYWNramFja1wiKSB7XHJcbiAgICAgIHRoaXMubW9uZXkgKz0gdGhpcy5jdXJyZW50QmV0ICogMS41O1xyXG4gICAgICB0aGlzLmNoYW5nZSA9IHRoaXMuY3VycmVudEJldCAqIDEuNTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHJlc3VsdCA9PT0gXCJ3aW5cIikge1xyXG4gICAgICB0aGlzLm1vbmV5ICs9IHRoaXMuY3VycmVudEJldDtcclxuICAgICAgdGhpcy5jaGFuZ2UgPSB0aGlzLmN1cnJlbnRCZXQ7XHJcbiAgICB9IFxyXG4gICAgZWxzZSBpZiAocmVzdWx0ID09PSBcInB1c2hcIikge1xyXG4gICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJQdXNoXCIpO1xyXG4gICAgICB0aGlzLm1vbmV5ID0gdGhpcy5tb25leTtcclxuICAgICAgdGhpcy5jaGFuZ2UgPSAwO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAocmVzdWx0ID09PSBcImxvc2VcIikge1xyXG4gICAgICBpZiAodGhpcy5tb25leSAtIHRoaXMuY3VycmVudEJldCA+PSAxMCkge1xyXG4gICAgICAgIHRoaXMubW9uZXkgLT0gdGhpcy5jdXJyZW50QmV0O1xyXG4gICAgICAgIHRoaXMuY2hhbmdlID0gLXRoaXMuY3VycmVudEJldDtcclxuICAgICAgICAvLyBkcm9wIHRoZSBiZXQgYW1vdW50IGRvd24gdG8gZXF1YWwgbW9uZXkgYW1vdW50IG9mIGxhc3QgYmV0IHZhbHVlIGlzIGdyZWF0ZXIgdGhhbiB0b3RhbCBtb25leSB2YWx1ZVxyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRCZXQgPiB0aGlzLm1vbmV5KSB7XHJcbiAgICAgICAgICB0aGlzLmN1cnJlbnRCZXQgPSB0aGlzLm1vbmV5O1xyXG4gICAgICAgICAgJChcIi5jdXJyZW50QmV0XCIpLnRleHQodGhpcy5jdXJyZW50QmV0KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gXHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHRoaXMubW9kYWwoXCJiYW5rcnVwdFwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVzZXRHYW1lKCkge1xyXG4gICAgdGhpcy5nYW1lRGVjayA9IG5ldyBEZWNrO1xyXG4gICAgdGhpcy5kZWFsZXJIYW5kID0gbmV3IEhhbmQoXCJkZWFsZXJcIik7XHJcbiAgICB0aGlzLnBsYXllckhhbmQgPSBuZXcgSGFuZChcInBsYXllclwiLCAxKTtcclxuICAgICQoXCIubWVzc2FnZXNcIikuZW1wdHkoKTtcclxuICAgICQoXCIucGxheWVyLWhhbmRcIikuZW1wdHkoKTtcclxuICAgICQoXCIuZGVhbGVyLWhhbmRcIikuZW1wdHkoKTtcclxuICAgICQoXCIucGxheWVyLXBvaW50c1wiKS5lbXB0eSgpO1xyXG4gICAgJChcIi5kZWFsZXItcG9pbnRzXCIpLmVtcHR5KCk7XHJcbiAgICAkKFwiLmNoYW5nZVwiKS5lbXB0eSgpO1xyXG4gICAgJChcIi5wcmV2QmV0XCIpLmVtcHR5KCk7XHJcbiAgfVxyXG5cclxuICByZXNldE1vbmV5KCkge1xyXG4gICAgdGhpcy5tb25leSA9IDUwMDtcclxuICAgIHRoaXMuY3VycmVudEJldCA9IDEwO1xyXG4gICAgJChcIi50b3RhbFwiKS50ZXh0KHRoaXMubW9uZXkpO1xyXG4gICAgJChcIi5jdXJyZW50QmV0XCIpLnRleHQodGhpcy5jdXJyZW50QmV0KTtcclxuICB9XHJcblxyXG4gIHNlbGVjdEN1cnJlbnRIYW5kKC4uLmhhbmRzKSB7XHJcbiAgICBsZXQgY3VycmVudEhhbmQ7XHJcbiAgICBmb3IgKGxldCBoYW5kIG9mIGhhbmRzKSB7XHJcbiAgICAgIGhhbmQudG9nZ2xlSGlnaGxpZ2h0KCk7XHJcbiAgICAgIGlmIChoYW5kLnBsYXlpbmcpIHtcclxuICAgICAgICBjdXJyZW50SGFuZCA9IGhhbmQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjdXJyZW50SGFuZDtcclxuICB9XHJcblxyXG4gIHNwbGl0KCkge1xyXG4gICAgdGhpcy5zcGxpdEluUGxheSA9IHRydWU7XHJcbiAgICB0aGlzLmRpc2FibGUodGhpcy4kc3BsaXQpO1xyXG4gICAgdGhpcy5wbGF5ZXJIYW5kLiR3cmFwcGVyLmFkZENsYXNzKFwiY3VycmVudEhhbmRcIik7XHJcblxyXG4gICAgLy8gZG91YmxlIGJldCBhbmQgZGlzcGxheSBpdFxyXG4gICAgdGhpcy5jdXJyZW50QmV0ID0gdGhpcy5jdXJyZW50QmV0ICogMjtcclxuICAgICQoXCIuY3VycmVudEJldFwiKS50ZXh0KHRoaXMuY3VycmVudEJldCk7XHJcblxyXG4gICAgLy8gc3RhcnQgYWRkaXRpb25hbCBoYW5kIGFuZCBtb3ZlIG9uZSBjYXJkIGZyb20gaGFuZCAxIHRvIGhhbmQgMlxyXG4gICAgdGhpcy5hZGp1c3RTcGFjZSgpO1xyXG4gICAgdGhpcy5wbGF5ZXJIYW5kMiA9IG5ldyBIYW5kKFwicGxheWVyXCIsIDIpO1xyXG4gICAgbGV0IHJlbW92ZWRDYXJkID0gdGhpcy5wbGF5ZXJIYW5kLnJlbW92ZUNhcmQoKTtcclxuICAgIHRoaXMucGxheWVySGFuZDIuYWRkQ2FyZChyZW1vdmVkQ2FyZC5jYXJkLCByZW1vdmVkQ2FyZC4kY2FyZCk7XHJcbiAgICB0aGlzLmRlYWxPbmVDYXJkKHRoaXMucGxheWVySGFuZCk7XHJcbiAgICB0aGlzLmRlYWxPbmVDYXJkKHRoaXMucGxheWVySGFuZDIpO1xyXG4gIH1cclxuXHJcbiAgc3RhbmQoY2FsbGVyKSB7XHJcbiAgICAvLyBpZiBzcGxpdHRpbmcsIGdpdmUgaGFuZDIgb3Bwb3J0dW5pdHkgdG8gaGl0XHJcbiAgICBpZiAodGhpcy5zcGxpdEluUGxheSkge1xyXG4gICAgICB0aGlzLnNwbGl0SW5QbGF5ID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuY3VycmVudEhhbmQgPSBcImhhbmQyXCI7XHJcbiAgICAgICQoXCIjaGFuZDFcIikucmVtb3ZlQ2xhc3MoXCJjdXJyZW50SGFuZFwiKTtcclxuICAgICAgJChcIiNoYW5kMlwiKS5hZGRDbGFzcyhcImN1cnJlbnRIYW5kXCIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodGhpcy5jdXJyZW50SGFuZCA9PT0gXCJoYW5kMlwiKSB7XHJcbiAgICAgIC8vIGlmIHNwbGl0dGluZywgY2FsY3VsYXRlIHRoZSBvdXRjb21lIG9mIGJvdGggb2YgdGhlIHBsYXllcidzIGhhbmRzXHJcbiAgICAgIHRoaXMuY3VycmVudEhhbmQgPSBcImhhbmQxXCI7XHJcbiAgICAgIHRoaXMuZGVhbGVySGFuZC5yZXZlYWxIb2xlKCk7XHJcbiAgICAgIHdoaWxlICh0aGlzLmRlYWxlckhhbmQuZ2V0UG9pbnRzKCkgPCAxNykge1xyXG4gICAgICAgIHRoaXMuZGVhbE9uZUNhcmQodGhpcy5kZWFsZXJIYW5kKTtcclxuICAgICAgfVxyXG4gICAgICBsZXQgZGVhbGVyUG9pbnRzID0gdGhpcy5kZWFsZXJIYW5kLmdldFBvaW50cygpO1xyXG4gICAgICB0aGlzLmRlYWxlckhhbmQudXBkYXRlRGlzcGxheShkZWFsZXJQb2ludHMpO1xyXG4gICAgICBpZiAoZGVhbGVyUG9pbnRzID4gMjEpIHtcclxuICAgICAgICB0aGlzLnBsYXllckhhbmQub3V0Y29tZSA9IFwid2luXCI7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJIYW5kMi5vdXRjb21lID0gXCJ3aW5cIjtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICB0aGlzLmV2YWx1YXRlSGFuZCh0aGlzLnBsYXllckhhbmQpO1xyXG4gICAgICAgIHRoaXMuZXZhbHVhdGVIYW5kKHRoaXMucGxheWVySGFuZDIpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuaW52b2tlT3V0Y29tZSh0aGlzLnBsYXllckhhbmQsIHRoaXMucGxheWVySGFuZDIpO1xyXG4gICAgfSBcclxuICAgIGVsc2Uge1xyXG4gICAgICB0aGlzLmRpc2FibGUodGhpcy4kaGl0LCB0aGlzLiRzdGFuZCwgdGhpcy4kZG91YmxlRG93biwgdGhpcy4kc3BsaXQpO1xyXG4gICAgICAkKFwiI2hhbmQxLCAjaGFuZDJcIikucmVtb3ZlQ2xhc3MoXCJjdXJyZW50SGFuZFwiKTtcclxuICAgICAgLy8gaWYgc3RhbmQgd2FzIGNhbGxlZCBieSBjbGlja2luZyAnZG91YmxlIGRvd24nLCBkbyBhZGRpdGlvbmFsIHdvcmtcclxuICAgICAgaWYgKGNhbGxlciA9PT0gXCJkb3VibGUtZG93blwiKSB7XHJcbiAgICAgICAgdGhpcy5iZXQgPSB0aGlzLmJldCAvIDI7XHJcbiAgICAgICAgJChcIi5iZXRcIikudGV4dCh0aGlzLmJldCk7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlKHRoaXMuJGRvdWJsZURvd24pO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIGRlYWxlcidzIHR1cm5cclxuICAgICAgdGhpcy5kZWFsZXJIYW5kLnJldmVhbEhvbGUoKTtcclxuICAgICAgd2hpbGUgKHRoaXMuZGVhbGVySGFuZC5nZXRQb2ludHMoKSA8IDE3KSB7XHJcbiAgICAgICAgdGhpcy5kZWFsT25lQ2FyZCh0aGlzLmRlYWxlckhhbmQpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLmRlYWxlckhhbmQuZ2V0UG9pbnRzKCkgPiAyMSkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIkRlYWxlciBidXN0c1wiKTtcclxuICAgICAgICB0aGlzLm91dGNvbWUoXCJ3aW5cIik7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgdGhpcy5ldmFsdWF0ZUhhbmQodGhpcy5wbGF5ZXJIYW5kKTtcclxuICAgICAgICB0aGlzLmludm9rZU91dGNvbWUodGhpcy5wbGF5ZXJIYW5kKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhcnRHYW1lTW9kZSgpIHtcclxuICAgICQoXCIudGl0bGUtc2NyZWVuXCIpLmhpZGUoKTtcclxuICAgIHRoaXMuYWRqdXN0U3BhY2UoKTtcclxuICAgIHRoaXMuZW5hYmxlKHRoaXMuJGhpdCwgdGhpcy4kc3RhbmQpO1xyXG4gICAgdGhpcy5kaXNhYmxlKHRoaXMuJGRlYWwpO1xyXG4gICAgJChcIi5iZXR0aW5nIC5idXR0b25zXCIpLmhpZGUoKTtcclxuICAgIHRoaXMucGxheWVySGFuZC5wbGF5aW5nID0gdHJ1ZTtcclxuICAgIHRoaXMuc2VsZWN0Q3VycmVudEhhbmQodGhpcy5wbGF5ZXJIYW5kKTsgIFxyXG4gIH1cclxuXHJcbiAgdXBkYXRlTWVzc2FnZShtZXNzYWdlKSB7XHJcbiAgICAkKFwiLm1lc3NhZ2VzXCIpLmFwcGVuZChgPGgxPiR7bWVzc2FnZX08L2gxPmApO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9nYW1lLmpzIiwiaW1wb3J0IENhcmQgZnJvbSBcIi4vY2FyZFwiO1xyXG5pbXBvcnQgSGFuZCBmcm9tIFwiLi9oYW5kXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZWNrIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuY2FyZHMgPSBbXTtcclxuICB9XHJcblxyXG4gIGRyYXcoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jYXJkcy5wb3AoKTtcclxuICB9XHJcblxyXG4gIGdlbmVyYXRlKG51bURlY2tzKSB7XHJcbiAgICBpZiAoIW51bURlY2tzKSB7XHJcbiAgICAgIG51bURlY2tzID0gMTtcclxuICAgIH1cclxuICAgIHdoaWxlIChudW1EZWNrcyA+IDApIHtcclxuICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gMTM7IGkrKykge1xyXG4gICAgICAgIHRoaXMuY2FyZHMucHVzaChuZXcgQ2FyZChpLCBcInNwYWRlc1wiKSk7XHJcbiAgICAgICAgdGhpcy5jYXJkcy5wdXNoKG5ldyBDYXJkKGksIFwiZGlhbW9uZHNcIikpO1xyXG4gICAgICAgIHRoaXMuY2FyZHMucHVzaChuZXcgQ2FyZChpLCBcImhlYXJ0c1wiKSk7XHJcbiAgICAgICAgdGhpcy5jYXJkcy5wdXNoKG5ldyBDYXJkKGksIFwiY2x1YnNcIikpO1xyXG4gICAgICB9XHJcbiAgICAgIG51bURlY2tzLS07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzaHVmZmxlKCkge1xyXG4gICAgZm9yIChsZXQgaSA9IHRoaXMuY2FyZHMubGVuZ3RoIC0gMTsgaSA+IDA7IGktLSkge1xyXG4gICAgICBjb25zdCBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGkgKyAxKSk7XHJcbiAgICAgIFt0aGlzLmNhcmRzW2ldXSA9IFt0aGlzLmNhcmRzW2pdXTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvZGVjay5qcyJdLCJzb3VyY2VSb290IjoiIn0=