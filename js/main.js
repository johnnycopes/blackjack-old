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
      this.gameDeck.shuffle();
      this.dealOneCard(this.dealerHand, "hole");
      this.dealOneCard(this.playerHand);
      var dealerPoints = this.dealOneCard(this.dealerHand);
      var playerPoints = this.dealOneCard(this.playerHand);
      this.dealerHand.updateDisplay("?"); // conceal dealer total

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
    key: "dealerTurn",
    value: function dealerTurn() {
      var _this = this;

      this.dealerHand.revealHole();
      while (this.dealerHand.getPoints() < 17) {
        this.dealOneCard(this.dealerHand);
      }

      for (var _len = arguments.length, hands = Array(_len), _key = 0; _key < _len; _key++) {
        hands[_key] = arguments[_key];
      }

      hands.forEach(function (hand) {
        _this.evaluateHand(hand);
      });
    }
  }, {
    key: "disable",
    value: function disable() {
      for (var _len2 = arguments.length, elements = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        elements[_key2] = arguments[_key2];
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
      for (var _len3 = arguments.length, elements = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        elements[_key3] = arguments[_key3];
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
      for (var _len4 = arguments.length, hands = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        hands[_key4] = arguments[_key4];
      }

      console.log(hands);
      var hand1 = hands[0].outcome;
      console.log(hand1);
      if (hands.length === 1) {
        if (hand1 === "win") {
          this.updateMessage("You win!");
          this.outcome("win");
        } else if (hand1 === "lose") {
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

      for (var _len5 = arguments.length, hands = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        hands[_key5] = arguments[_key5];
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
      } else {
        var currentHand = this.selectCurrentHand(this.playerHand, this.playerHand2);
        if (currentHand === this.playerHand) {
          this.playerHand.playing = false;
          this.playerHand2.playing = true;
          this.selectCurrentHand(this.playerHand, this.playerHand2);
        } else if (currentHand === this.playerHand2) {
          this.playerHand2.playing = false;
          this.selectCurrentHand(this.playerHand, this.playerHand2);
          this.dealerTurn(this.playerHand, this.playerHand2);
          this.invokeOutcome(this.playerHand, this.playerHand2);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjc4OWFlZDk0ZjM1NDE4ZjY1NDUiLCJ3ZWJwYWNrOi8vLy4vanMvaGFuZC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jYXJkLmpzIiwid2VicGFjazovLy8uL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9nYW1lLmpzIiwid2VicGFjazovLy8uL2pzL2RlY2suanMiXSwibmFtZXMiOlsiSGFuZCIsIm93bmVyIiwiaGFuZE51bWJlciIsInNlbGVjdG9yIiwiJHdyYXBwZXIiLCIkIiwiJGhhbmQiLCIkcG9pbnRzIiwicGxheWluZyIsImNhcmRzIiwib3V0Y29tZSIsImNhcmQiLCIkY2FyZCIsInB1c2giLCJhcHBlbmQiLCJwb2ludCIsInRvdGFsIiwiYWNlcyIsInBvcCIsImZpbmQiLCJyZW1vdmUiLCJhdHRyIiwiZ2V0SW1hZ2VVcmwiLCJpbmRleCIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJjb250ZW50IiwidGV4dCIsIkNhcmQiLCJzdWl0IiwidmFsdWUiLCJjdXJyZW50R2FtZSIsIm1ha2VCZXQiLCJvbiIsInJlc2V0R2FtZSIsImdhbWVEZWNrIiwiZ2VuZXJhdGUiLCJkZWFsIiwiaGl0Iiwic3RhbmQiLCJkb3VibGVEb3duIiwic3BsaXQiLCJHYW1lIiwiZGVhbGVySGFuZCIsInBsYXllckhhbmQiLCJzcGxpdEluUGxheSIsIm1vbmV5IiwiY3VycmVudEJldCIsImNoYW5nZSIsIiRkZWFsIiwiJGhpdCIsIiRzdGFuZCIsIiRkb3VibGVEb3duIiwiJHNwbGl0IiwiJGNoYW5nZSIsInNpemUiLCJjc3MiLCJjbGFzc05hbWUiLCJzeW1ib2wiLCJNYXRoIiwiYWJzIiwiaGFuZCIsInNwZWNpYWwiLCJkcmF3IiwiYWRkQ2FyZCIsInVwZGF0ZURpc3BsYXkiLCJnZXRQb2ludHMiLCJzdGFydEdhbWVNb2RlIiwic2h1ZmZsZSIsImRlYWxPbmVDYXJkIiwiZGVhbGVyUG9pbnRzIiwicGxheWVyUG9pbnRzIiwidXBkYXRlTWVzc2FnZSIsImVuYWJsZSIsImNhblNwbGl0IiwicmV2ZWFsSG9sZSIsImhhbmRzIiwiZm9yRWFjaCIsImV2YWx1YXRlSGFuZCIsImVsZW1lbnRzIiwiZWxlbWVudCIsInNlbGVjdEN1cnJlbnRIYW5kIiwicHJldkJldCIsImFzc2Vzc0NoYW5nZSIsImRpc2FibGUiLCJzaG93IiwiY3VycmVudEhhbmQiLCJwbGF5ZXJIYW5kMiIsImludm9rZU91dGNvbWUiLCJjb25zb2xlIiwibG9nIiwiaGFuZDEiLCJsZW5ndGgiLCJoYW5kMiIsImJldCIsIiR0b3RhbCIsIiRjdXJyZW50QmV0IiwiZ2FtZSIsImhhc0NsYXNzIiwibW9kYWxUeXBlIiwiaHRtbCIsInJlc2V0TW9uZXkiLCJyZXN1bHQiLCJlbmRHYW1lTW9kZSIsIm1vZGFsIiwiZW1wdHkiLCJ0b2dnbGVIaWdobGlnaHQiLCJhZGp1c3RTcGFjZSIsInJlbW92ZWRDYXJkIiwicmVtb3ZlQ2FyZCIsImNhbGxlciIsImRlYWxlclR1cm4iLCJoaWRlIiwibWVzc2FnZSIsIkRlY2siLCJudW1EZWNrcyIsImkiLCJqIiwiZmxvb3IiLCJyYW5kb20iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzdEQTs7Ozs7Ozs7SUFFcUJBLEk7QUFDbkIsZ0JBQVlDLEtBQVosRUFBbUJDLFVB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Q2pCLFVBQUksQ0FBQ0EsUUFBTCxFQUFlO0FBQ2JBLG1CQUFXLENBQVg7QUFDRDtBQUNELGFBQU9BLFdBQVcsQ0FBbEIsRUFBcUI7QUFDbkIsYUFBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLEtBQUssRUFBckIsRUFBeUJBLEdBQXpCLEVBQThCO0FBQzVCLGVBQUszRyxLQUFMLENBQVdJLElBQVgsQ0FBZ0IsbUJBQVN1RyxDQUFULEVBQVksUUFBWixDQUFoQjtBQUNBLGVBQUszRyxLQUFMLENBQVdJLElBQVgsQ0FBZ0IsbUJBQVN1RyxDQUFULEVBQVksVUFBWixDQUFoQjtBQUNBLGVBQUszRyxLQUFMLENBQVdJLElBQVgsQ0FBZ0IsbUJBQVN1RyxDQUFULEVBQVksUUFBWixDQUFoQjtBQUNBLGVBQUszRyxLQUFMLENBQVdJLElBQVgsQ0FBZ0IsbUJBQVN1RyxDQUFULEVBQVksT0FBWixDQUFoQjtBQUNEO0FBQ0REO0FBQ0Q7QUFDRjs7OzhCQUVTO0FBQ1IsV0FBSyxJQUFJQyxJQUFJLEtBQUszRyxLQUFMLENBQVdtRixNQUFYLEdBQW9CLENBQWpDLEVBQW9Dd0IsSUFBSSxDQUF4QyxFQUEyQ0EsR0FBM0MsRUFBZ0Q7QUFDOUMsWUFBTUMsSUFBSTFELEtBQUsyRCxLQUFMLENBQVczRCxLQUFLNEQsTUFBTCxNQUFpQkgsSUFBSSxDQUFyQixDQUFYLENBQVY7QUFEOEMsbUJBRTVCLENBQUMsS0FBSzNHLEtBQUwsQ0FBVzRHLENBQVgsQ0FBRCxDQUY0QjtBQUU3QyxhQUFLNUcsS0FBTCxDQUFXMkcsQ0FBWCxDQUY2QztBQUcvQztBQUNGOzs7Ozs7a0JBN0JrQkYsSSIsImZpbGUiOiIuL2pzL21haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAyNzg5YWVkOTRmMzU0MThmNjU0NSIsImltcG9ydCBDYXJkIGZyb20gXCIuL2NhcmRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhhbmQge1xyXG4gIGNvbnN0cnVjdG9yKG93bmVyLCBoYW5kTnVtYmVyKSB7XHJcbiAgICBsZXQgc2VsZWN0b3I7XHJcbiAgICBpZiAob3duZXIgPT09ICdkZWFsZXInKSB7XHJcbiAgICAgIHNlbGVjdG9yID0gXCIjZGVhbGVyXCI7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChvd25lciA9PT0gJ3BsYXllcicpIHtcclxuICAgICAgaWYgKGhhbmROdW1iZXIgPT09IDEpIHtcclxuICAgICAgICBzZWxlY3RvciA9IFwiI2hhbmQxXCI7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAoaGFuZE51bWJlciA9PT0gMikge1xyXG4gICAgICAgIHNlbGVjdG9yID0gXCIjaGFuZDJcIjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy4kd3JhcHBlciA9ICQoYCR7c2VsZWN0b3J9YCk7XHJcbiAgICB0aGlzLiRoYW5kID0gJChgJHtzZWxlY3Rvcn0gLmhhbmRgKTtcclxuICAgIHRoaXMuJHBvaW50cyA9ICQoYCR7c2VsZWN0b3J9IC5wb2ludHNgKTtcclxuICAgIHRoaXMucGxheWluZyA9IGZhbHNlO1xyXG4gICAgdGhpcy5jYXJkcyA9IFtdO1xyXG4gICAgdGhpcy5vdXRjb21lO1xyXG4gIH1cclxuXHJcbiAgYWRkQ2FyZChjYXJkLCAkY2FyZCkge1xyXG4gICAgdGhpcy5jYXJkcy5wdXNoKGNhcmQpO1xyXG4gICAgdGhpcy4kaGFuZC5hcHBlbmQoJGNhcmQpO1xyXG4gIH1cclxuXHJcbiAgY2FuU3BsaXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jYXJkc1swXS5wb2ludCA9PT0gdGhpcy5jYXJkc1sxXS5wb2ludDtcclxuICB9XHJcblxyXG4gIGdldFBvaW50cygpIHtcclxuICAgIGxldCB0b3RhbCA9IDA7XHJcbiAgICBsZXQgYWNlcyA9IDA7XHJcbiAgICBmb3IgKGxldCBjYXJkIG9mIHRoaXMuY2FyZHMpIHtcclxuICAgICAgbGV0IHBvaW50ID0gY2FyZC5wb2ludDtcclxuICAgICAgaWYgKHBvaW50ID09PSAxKSB7XHJcbiAgICAgICAgdG90YWwgKz0gMTA7XHJcbiAgICAgICAgYWNlcysrO1xyXG4gICAgICB9IFxyXG4gICAgICBlbHNlIGlmIChwb2ludCA+IDEwKSB7XHJcbiAgICAgICAgcG9pbnQgPSAxMDtcclxuICAgICAgfVxyXG4gICAgICB0b3RhbCArPSBwb2ludDtcclxuICAgICAgd2hpbGUgKHRvdGFsID4gMjEgJiYgYWNlcyA+IDApIHtcclxuICAgICAgICB0b3RhbCAtPSAxMDtcclxuICAgICAgICBhY2VzLS07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0b3RhbDtcclxuICB9XHJcblxyXG4gIHJlbW92ZUNhcmQoKSB7XHJcbiAgICBsZXQgY2FyZCA9IHRoaXMuY2FyZHMucG9wKCk7XHJcbiAgICBsZXQgJGNhcmQgPSB0aGlzLiRoYW5kLmZpbmQoXCJpbWc6bGFzdC1jaGlsZFwiKS5yZW1vdmUoKTtcclxuICAgIHJldHVybiB7Y2FyZCwgJGNhcmR9O1xyXG4gIH1cclxuXHJcbiAgcmV2ZWFsSG9sZSgpIHtcclxuICAgIHRoaXMuJGhhbmQuZmluZCgnaW1nOmZpcnN0LWNoaWxkJykuYXR0cignc3JjJywgdGhpcy5jYXJkc1swXS5nZXRJbWFnZVVybCgpKTtcclxuICB9XHJcblxyXG4gIHNlZUNhcmQoaW5kZXgpIHtcclxuICAgIHJldHVybiB0aGlzLmNhcmRzW2luZGV4IC0gMV07XHJcbiAgfVxyXG5cclxuICB0b2dnbGVIaWdobGlnaHQoKSB7XHJcbiAgICB0aGlzLnBsYXlpbmcgPyB0aGlzLiR3cmFwcGVyLmFkZENsYXNzKFwiY3VycmVudEhhbmRcIikgOiB0aGlzLiR3cmFwcGVyLnJlbW92ZUNsYXNzKFwiY3VycmVudEhhbmRcIik7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVEaXNwbGF5KGNvbnRlbnQpIHtcclxuICAgIHRoaXMuJHBvaW50cy50ZXh0KGNvbnRlbnQpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9oYW5kLmpzIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FyZCB7XHJcbiAgY29uc3RydWN0b3IocG9pbnQsIHN1aXQpIHtcclxuICAgIHRoaXMucG9pbnQgPSBwb2ludDtcclxuICAgIHRoaXMuc3VpdCA9IHN1aXQ7XHJcbiAgfVxyXG5cclxuICBnZXRJbWFnZVVybCgpIHtcclxuICAgIGxldCB2YWx1ZSA9IHRoaXMucG9pbnQ7XHJcbiAgICBpZiAodGhpcy5wb2ludCA9PT0gMTEpIHtcclxuICAgICAgdmFsdWUgPSBcImphY2tcIjtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXMucG9pbnQgPT09IDEyKSB7XHJcbiAgICAgIHZhbHVlID0gXCJxdWVlblwiO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodGhpcy5wb2ludCA9PT0gMTMpIHtcclxuICAgICAgdmFsdWUgPSBcImtpbmdcIjtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXMucG9pbnQgPT09IDEpIHtcclxuICAgICAgdmFsdWUgPSBcImFjZVwiO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGBpbWFnZXMvJHt2YWx1ZX1fb2ZfJHt0aGlzLnN1aXR9LnN2Z2A7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2NhcmQuanMiLCJpbXBvcnQgR2FtZSBmcm9tICcuL2dhbWUnO1xuXG52YXIgY3VycmVudEdhbWUgPSBuZXcgR2FtZTtcblxuY3VycmVudEdhbWUubWFrZUJldCgpO1xuXG4kKCcuZGVhbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICBjdXJyZW50R2FtZS5yZXNldEdhbWUoKTtcbiAgY3VycmVudEdhbWUuZ2FtZURlY2suZ2VuZXJhdGUoMyk7XG4gIGN1cnJlbnRHYW1lLmRlYWwoKTtcbn0pO1xuXG4kKCcuaGl0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gIGN1cnJlbnRHYW1lLmhpdCgpO1xufSk7XG5cbiQoJy5zdGFuZCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICBjdXJyZW50R2FtZS5zdGFuZCgpO1xufSk7XG5cbiQoJy5kb3VibGUtZG93bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICBjdXJyZW50R2FtZS5kb3VibGVEb3duKCk7XG59KTtcblxuJCgnLnNwbGl0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gIGN1cnJlbnRHYW1lLnNwbGl0KCk7XG59KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2FwcC5qcyIsImltcG9ydCBIYW5kIGZyb20gXCIuL2hhbmRcIjtcclxuaW1wb3J0IERlY2sgZnJvbSBcIi4vZGVja1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZSB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmdhbWVEZWNrID0gbmV3IERlY2s7XHJcbiAgICB0aGlzLmRlYWxlckhhbmQgPSBuZXcgSGFuZCgnZGVhbGVyJyk7XHJcbiAgICB0aGlzLnBsYXllckhhbmQgPSBuZXcgSGFuZCgncGxheWVyJywgMSk7XHJcbiAgICB0aGlzLnNwbGl0SW5QbGF5ID0gZmFsc2U7XHJcbiAgICB0aGlzLm1vbmV5ID0gNTAwO1xyXG4gICAgdGhpcy5jdXJyZW50QmV0ID0gMTA7XHJcbiAgICB0aGlzLmNoYW5nZTtcclxuICAgIFxyXG4gICAgdGhpcy4kZGVhbCA9ICQoXCIuZGVhbFwiKTtcclxuICAgIHRoaXMuJGhpdCA9ICQoXCIuaGl0XCIpO1xyXG4gICAgdGhpcy4kc3RhbmQgPSAkKFwiLnN0YW5kXCIpO1xyXG4gICAgdGhpcy4kZG91YmxlRG93biA9ICQoXCIuZG91YmxlLWRvd25cIik7XHJcbiAgICB0aGlzLiRzcGxpdCA9ICQoXCIuc3BsaXRcIik7XHJcbiAgICB0aGlzLiRjaGFuZ2UgPSAkKFwiLmNoYW5nZVwiKTtcclxuICB9XHJcblxyXG4gIGFkanVzdFNwYWNlKCkge1xyXG4gICAgbGV0IHNpemU7XHJcbiAgICB0aGlzLnNwbGl0SW5QbGF5ID8gc2l6ZSA9IDUwIDogc2l6ZSA9IDEwMDtcclxuICAgICQoXCIucGxheWVySGFuZC1kaXZcIikuY3NzKFwid2lkdGhcIiwgYCR7c2l6ZX0lYCk7XHJcbiAgfVxyXG5cclxuICBhc3Nlc3NDaGFuZ2UoKSB7XHJcbiAgICBsZXQgY2xhc3NOYW1lID0gXCJcIjtcclxuICAgIGxldCBzeW1ib2wgPSBcIlwiO1xyXG4gICAgaWYgKHRoaXMuY2hhbmdlID4gMCkge1xyXG4gICAgICBjbGFzc05hbWUgPSBcInBvc2l0aXZlXCI7XHJcbiAgICAgIHN5bWJvbCA9IFwiK1wiO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodGhpcy5jaGFuZ2UgPCAwKSB7XHJcbiAgICAgIGNsYXNzTmFtZSA9IFwibmVnYXRpdmVcIjtcclxuICAgICAgc3ltYm9sID0gXCItXCI7XHJcbiAgICB9XHJcbiAgICB0aGlzLiRjaGFuZ2UuYXBwZW5kKGA8c3BhbiBjbGFzcz1cIiR7Y2xhc3NOYW1lfVwiPiR7c3ltYm9sfSAkJHtNYXRoLmFicyh0aGlzLmNoYW5nZSl9PC9zcGFuPmApO1xyXG4gIH1cclxuXHJcbiAgZGVhbE9uZUNhcmQoaGFuZCwgc3BlY2lhbCkge1xyXG4gICAgbGV0IGNhcmQgPSB0aGlzLmdhbWVEZWNrLmRyYXcoKTtcclxuICAgIGxldCAkY2FyZCA9ICQoXCI8aW1nIC8+XCIsIHtcclxuICAgICAgXCJjbGFzc1wiOiBcImNhcmRcIiwgXHJcbiAgICAgIFwic3JjXCI6IGAke2NhcmQuZ2V0SW1hZ2VVcmwoKX1gXHJcbiAgICB9KTtcclxuICAgIGlmIChzcGVjaWFsID09PSBcImhvbGVcIikge1xyXG4gICAgICAkY2FyZC5hdHRyKCdzcmMnLCBcImltYWdlcy9iYWNrLXN1aXRzLXJlZC5zdmdcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChzcGVjaWFsID09PSBcImRvdWJsZS1kb3duXCIpIHtcclxuICAgICAgJGNhcmQuYWRkQ2xhc3MoJ2NhcmQtZGQnKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHNwZWNpYWwgPT09IFwic3BsaXRcIikge1xyXG4gICAgICAkY2FyZC5hZGRDbGFzcygnc3BsaXQnKTtcclxuICAgIH1cclxuICAgIGhhbmQuYWRkQ2FyZChjYXJkLCAkY2FyZCk7XHJcbiAgICBoYW5kLnVwZGF0ZURpc3BsYXkoaGFuZC5nZXRQb2ludHMoKSk7XHJcbiAgICByZXR1cm4gaGFuZC5nZXRQb2ludHMoKTtcclxuICB9XHJcblxyXG4gIGRlYWwoKSB7XHJcbiAgICB0aGlzLnN0YXJ0R2FtZU1vZGUoKTtcclxuICAgIHRoaXMuZ2FtZURlY2suc2h1ZmZsZSgpO1xyXG4gICAgdGhpcy5kZWFsT25lQ2FyZCh0aGlzLmRlYWxlckhhbmQsIFwiaG9sZVwiKTtcclxuICAgIHRoaXMuZGVhbE9uZUNhcmQodGhpcy5wbGF5ZXJIYW5kKTtcclxuICAgIGxldCBkZWFsZXJQb2ludHMgPSB0aGlzLmRlYWxPbmVDYXJkKHRoaXMuZGVhbGVySGFuZCk7XHJcbiAgICBsZXQgcGxheWVyUG9pbnRzID0gdGhpcy5kZWFsT25lQ2FyZCh0aGlzLnBsYXllckhhbmQpO1xyXG4gICAgdGhpcy5kZWFsZXJIYW5kLnVwZGF0ZURpc3BsYXkoXCI/XCIpOyAvLyBjb25jZWFsIGRlYWxlciB0b3RhbFxyXG5cclxuICAgIGlmIChkZWFsZXJQb2ludHMgPT09IDIxICYmIHBsYXllclBvaW50cyA9PT0gMjEpIHtcclxuICAgICAgdGhpcy5vdXRjb21lKFwicHVzaFwiKTtcclxuICAgICAgdGhpcy5kZWFsZXJIYW5kLnVwZGF0ZURpc3BsYXkoXCJCbGFja2phY2tcIik7XHJcbiAgICAgIHRoaXMucGxheWVySGFuZC51cGRhdGVEaXNwbGF5KFwiQkxBQ0tKQUNLLCBIT1QgREFNTiFcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChkZWFsZXJQb2ludHMgPT09IDIxKSB7XHJcbiAgICAgIHRoaXMub3V0Y29tZShcImxvc2VcIik7XHJcbiAgICAgIHRoaXMuZGVhbGVySGFuZC51cGRhdGVEaXNwbGF5KFwiQmxhY2tqYWNrXCIpO1xyXG4gICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJEZWFsZXIgd2luc1wiKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHBsYXllclBvaW50cyA9PT0gMjEpIHtcclxuICAgICAgdGhpcy5vdXRjb21lKFwiYmxhY2tqYWNrXCIpO1xyXG4gICAgICB0aGlzLmRlYWxlckhhbmQudXBkYXRlRGlzcGxheShkZWFsZXJQb2ludHMpO1xyXG4gICAgICB0aGlzLnBsYXllckhhbmQudXBkYXRlRGlzcGxheShcIkJMQUNLSkFDSywgSE9UIERBTU4hXCIpO1xyXG4gICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJZb3Ugd2luIVwiKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXMubW9uZXkgPiB0aGlzLmN1cnJlbnRCZXQgKiAyKSB7XHJcbiAgICAgIGlmIChwbGF5ZXJQb2ludHMgPT09IDExKSAge1xyXG4gICAgICAgIHRoaXMuZW5hYmxlKHRoaXMuJGRvdWJsZURvd24pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLnBsYXllckhhbmQuY2FuU3BsaXQoKSkge1xyXG4gICAgICAgIHRoaXMuZW5hYmxlKHRoaXMuJHNwbGl0KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZGVhbGVyVHVybiguLi5oYW5kcykge1xyXG4gICAgdGhpcy5kZWFsZXJIYW5kLnJldmVhbEhvbGUoKTtcclxuICAgIHdoaWxlICh0aGlzLmRlYWxlckhhbmQuZ2V0UG9pbnRzKCkgPCAxNykge1xyXG4gICAgICB0aGlzLmRlYWxPbmVDYXJkKHRoaXMuZGVhbGVySGFuZCk7XHJcbiAgICB9XHJcbiAgICBoYW5kcy5mb3JFYWNoKGhhbmQgPT4ge3RoaXMuZXZhbHVhdGVIYW5kKGhhbmQpfSk7XHJcbiAgfVxyXG5cclxuICBkaXNhYmxlKC4uLmVsZW1lbnRzKSB7XHJcbiAgICBmb3IgKGxldCBlbGVtZW50IG9mIGVsZW1lbnRzKSB7XHJcbiAgICAgIGVsZW1lbnQuYXR0cihcImRpc2FibGVkXCIsIHRydWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZG91YmxlRG93bigpIHtcclxuICAgIC8vIGRvdWJsZSBiZXQgYW5kIGRpc3BsYXkgaXRcclxuICAgIHRoaXMuY3VycmVudEJldCAqPSAyO1xyXG4gICAgJChcIi5jdXJyZW50QmV0XCIpLnRleHQodGhpcy5jdXJyZW50QmV0KTtcclxuICAgIC8vIGRlYWwgdGhlIHBsYXllciBvbmUgbW9yZSBjYXJkIGFuZCB0aGVuIG1vdmUgb24gdG8gdGhlIGRlYWxlcidzIHR1cm5cclxuICAgIHRoaXMuZGVhbE9uZUNhcmQodGhpcy5wbGF5ZXJIYW5kLCBcImRvdWJsZS1kb3duXCIpO1xyXG4gICAgdGhpcy5zdGFuZChcImRvdWJsZS1kb3duXCIpO1xyXG4gIH1cclxuXHJcbiAgZW5hYmxlKC4uLmVsZW1lbnRzKSB7XHJcbiAgICBmb3IgKGxldCBlbGVtZW50IG9mIGVsZW1lbnRzKSB7XHJcbiAgICAgIGVsZW1lbnQuYXR0cihcImRpc2FibGVkXCIsIGZhbHNlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGVuZEdhbWVNb2RlKCkge1xyXG4gICAgdGhpcy5wbGF5ZXJIYW5kLnBsYXlpbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuc2VsZWN0Q3VycmVudEhhbmQodGhpcy5wbGF5ZXJIYW5kKTtcclxuICAgIHRoaXMuZGVhbGVySGFuZC5yZXZlYWxIb2xlKCk7XHJcbiAgICB0aGlzLmRlYWxlckhhbmQudXBkYXRlRGlzcGxheSh0aGlzLmRlYWxlckhhbmQuZ2V0UG9pbnRzKCkpO1xyXG5cclxuICAgICQoXCIudG90YWxcIikudGV4dCh0aGlzLm1vbmV5KTtcclxuICAgICQoXCIucHJldkJldFwiKS5hcHBlbmQoYDxzcGFuPiQke3RoaXMucHJldkJldH08L3NwYW4+YCk7XHJcbiAgICB0aGlzLmFzc2Vzc0NoYW5nZSgpO1xyXG4gICAgdGhpcy5lbmFibGUodGhpcy4kZGVhbCk7XHJcbiAgICB0aGlzLmRpc2FibGUodGhpcy4kaGl0LCB0aGlzLiRzdGFuZCk7XHJcbiAgICAkKFwiLmJldHRpbmcgLmJ1dHRvbnNcIikuc2hvdygpO1xyXG4gIH1cclxuXHJcbiAgZXZhbHVhdGVIYW5kKGhhbmQpIHtcclxuICAgIGxldCBkZWFsZXJQb2ludHMgPSB0aGlzLmRlYWxlckhhbmQuZ2V0UG9pbnRzKCk7XHJcbiAgICBsZXQgcGxheWVyUG9pbnRzID0gaGFuZC5nZXRQb2ludHMoKTtcclxuICAgIGlmIChkZWFsZXJQb2ludHMgPiAyMSB8fCBwbGF5ZXJQb2ludHMgPiBkZWFsZXJQb2ludHMpIHtcclxuICAgICAgaGFuZC5vdXRjb21lID0gXCJ3aW5cIjtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHBsYXllclBvaW50cyA8IGRlYWxlclBvaW50cykge1xyXG4gICAgICBoYW5kLm91dGNvbWUgPSBcImxvc2VcIjtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBoYW5kLm91dGNvbWUgPSBcInB1c2hcIjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGhpdCgpIHtcclxuICAgIHRoaXMuZGlzYWJsZSh0aGlzLiRkb3VibGVEb3duLCB0aGlzLiRzcGxpdCk7XHJcbiAgICBpZiAoIXRoaXMuc3BsaXRJblBsYXkpIHtcclxuICAgICAgbGV0IHBsYXllclBvaW50cyA9IHRoaXMuZGVhbE9uZUNhcmQodGhpcy5wbGF5ZXJIYW5kKTtcclxuICAgICAgaWYgKHBsYXllclBvaW50cyA+IDIxKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiWW91IGJ1c3RcIik7XHJcbiAgICAgICAgdGhpcy5vdXRjb21lKFwibG9zZVwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIGxldCBjdXJyZW50SGFuZCA9IHRoaXMuc2VsZWN0Q3VycmVudEhhbmQodGhpcy5wbGF5ZXJIYW5kLCB0aGlzLnBsYXllckhhbmQyKTtcclxuICAgICAgbGV0IHBsYXllclBvaW50cyA9IHRoaXMuZGVhbE9uZUNhcmQoY3VycmVudEhhbmQsIFwic3BsaXRcIik7XHJcbiAgICAgIGlmIChwbGF5ZXJQb2ludHMgPiAyMSkge1xyXG4gICAgICAgIGlmIChjdXJyZW50SGFuZCA9PT0gdGhpcy5wbGF5ZXJIYW5kKSB7XHJcbiAgICAgICAgICB0aGlzLnBsYXllckhhbmQub3V0Y29tZSA9IFwibG9zZVwiO1xyXG4gICAgICAgICAgdGhpcy5wbGF5ZXJIYW5kLnBsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMucGxheWVySGFuZDIucGxheWluZyA9IHRydWU7XHJcbiAgICAgICAgICB0aGlzLnNlbGVjdEN1cnJlbnRIYW5kKHRoaXMucGxheWVySGFuZCwgdGhpcy5wbGF5ZXJIYW5kMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGN1cnJlbnRIYW5kID09PSB0aGlzLnBsYXllckhhbmQyKSB7XHJcbiAgICAgICAgICB0aGlzLnBsYXllckhhbmQyLm91dGNvbWUgPSBcImxvc2VcIjtcclxuICAgICAgICAgIHRoaXMucGxheWVySGFuZDIucGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5zZWxlY3RDdXJyZW50SGFuZCh0aGlzLnBsYXllckhhbmQsIHRoaXMucGxheWVySGFuZDIpO1xyXG4gICAgICAgICAgdGhpcy5pbnZva2VPdXRjb21lKHRoaXMucGxheWVySGFuZCwgdGhpcy5wbGF5ZXJIYW5kMik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpbnZva2VPdXRjb21lKC4uLmhhbmRzKSB7XHJcbiAgICBjb25zb2xlLmxvZyhoYW5kcyk7XHJcbiAgICBsZXQgaGFuZDEgPSBoYW5kc1swXS5vdXRjb21lO1xyXG4gICAgY29uc29sZS5sb2coaGFuZDEpO1xyXG4gICAgaWYgKGhhbmRzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICBpZiAoaGFuZDEgPT09IFwid2luXCIpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJZb3Ugd2luIVwiKTtcclxuICAgICAgICB0aGlzLm91dGNvbWUoXCJ3aW5cIik7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAoaGFuZDEgPT09IFwibG9zZVwiKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiRGVhbGVyIHdpbnNcIik7XHJcbiAgICAgICAgdGhpcy5vdXRjb21lKFwibG9zZVwiKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICB0aGlzLm91dGNvbWUoXCJwdXNoXCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChoYW5kcy5sZW5ndGggPT09IDIpIHtcclxuICAgICAgbGV0IGhhbmQyID0gaGFuZHNbMV0ub3V0Y29tZTtcclxuICAgICAgaWYgKGhhbmQxID09PSBoYW5kMikge1xyXG4gICAgICAgIGlmIChoYW5kMSA9PT0gXCJibGFja2phY2tcIiAmJiBoYW5kMiA9PT0gXCJibGFja2phY2tcIikge1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiVFdPIEJMQUNLSkFDS1MhISFcIik7XHJcbiAgICAgICAgICB0aGlzLm91dGNvbWUoXCJibGFja2phY2tcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGhhbmQxID09PSBcIndpblwiICYmIGhhbmQyID09PSBcIndpblwiKSB7XHJcbiAgICAgICAgICB0aGlzLm91dGNvbWUoXCJ3aW5cIik7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJZb3Ugd2luIGJvdGghXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChoYW5kMSA9PT0gXCJsb3NlXCIgJiYgaGFuZDIgPT09IFwibG9zZVwiKSB7XHJcbiAgICAgICAgICB0aGlzLm91dGNvbWUoXCJsb3NlXCIpO1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiRGVhbGVyIHdpbnMgYm90aFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLm91dGNvbWUoXCJwdXNoXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICB0aGlzLmN1cnJlbnRCZXQgLz0gMjtcclxuICAgICAgICBpZiAoaGFuZDEgPT09IFwiYmxhY2tqYWNrXCIgfHwgaGFuZDIgPT09IFwiYmxhY2tqYWNrXCIpIHtcclxuICAgICAgICAgIC8vIGNhbGN1bGF0ZSBjb21iaW5lZCBvdXRjb21lcyBiZWZvcmUgY2FsbGluZyB0aGUgb3V0Y29tZSBtZXRob2RcclxuICAgICAgICAgIGxldCBiZXQgPSBjdXJyZW50QmV0O1xyXG4gICAgICAgICAgdGhpcy5jdXJyZW50QmV0ICo9IDEuNTtcclxuICAgICAgICAgIGlmIChoYW5kMSA9PT0gXCJ3aW5cIiB8fCBoYW5kMiA9PT0gXCJ3aW5cIikge1xyXG4gICAgICAgICAgICB0aGlzLm91dGNvbWUoXCJ3aW5cIik7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEJldCArPSBiZXQ7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIllvdSB3aW4gYm90aCFcIik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNlIGlmIChoYW5kMSA9PT0gXCJsb3NlXCIgfHwgaGFuZDIgPT09IFwibG9zZVwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3V0Y29tZShcIndpblwiKTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50QmV0IC09IGJldDtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiWW91IGFuZCBkZWFsZXIgZWFjaCB3aW4gb25lXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMub3V0Y29tZShcIndpblwiKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiWW91IHdpbiBvbmUsIHB1c2hcIik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGhhbmQxID09PSBcIndpblwiIHx8IGhhbmQyID09PSBcIndpblwiKSB7XHJcbiAgICAgICAgICBpZiAoaGFuZDEgPT09IFwicHVzaFwiIHx8IGhhbmQyID09PSBcInB1c2hcIikge1xyXG4gICAgICAgICAgICB0aGlzLm91dGNvbWUoXCJ3aW5cIik7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIllvdSB3aW4gb25lLCBwdXNoXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMub3V0Y29tZShcInB1c2hcIik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGhhbmQxID09PSBcImxvc2VcIiB8fCBoYW5kMiA9PT0gXCJsb3NlXCIpIHtcclxuICAgICAgICAgIHRoaXMub3V0Y29tZShcImxvc2VcIik7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJEZWFsZXIgd2lucyBvbmUsIHB1c2hcIilcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zcGxpdEluUGxheSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbWFrZUJldCgpIHtcclxuICAgIHZhciAkdG90YWwgPSAkKFwiLnRvdGFsXCIpLFxyXG4gICAgICAgICRjdXJyZW50QmV0ID0gJChcIi5jdXJyZW50QmV0XCIpLFxyXG4gICAgICAgIGdhbWUgPSB0aGlzO1xyXG4gICAgJHRvdGFsLnRleHQodGhpcy5tb25leSk7XHJcbiAgICAkY3VycmVudEJldC50ZXh0KHRoaXMuY3VycmVudEJldCk7XHJcbiAgICAkKFwiLmJldC1idG5cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcclxuICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoXCJhZGQxMFwiKSAmJiBnYW1lLm1vbmV5IC0gZ2FtZS5jdXJyZW50QmV0ID49IDEwKSB7XHJcbiAgICAgICAgZ2FtZS5jdXJyZW50QmV0ICs9IDEwO1xyXG4gICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICQodGhpcykuaGFzQ2xhc3MoXCJhZGQ1MFwiKSAmJlxyXG4gICAgICAgIGdhbWUubW9uZXkgLSBnYW1lLmN1cnJlbnRCZXQgPj0gNTBcclxuICAgICAgKSB7XHJcbiAgICAgICAgZ2FtZS5jdXJyZW50QmV0ICs9IDUwO1xyXG4gICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICQodGhpcykuaGFzQ2xhc3MoXCJhZGQxMDBcIikgJiZcclxuICAgICAgICBnYW1lLm1vbmV5IC0gZ2FtZS5jdXJyZW50QmV0ID49IDEwMFxyXG4gICAgICApIHtcclxuICAgICAgICBnYW1lLmN1cnJlbnRCZXQgKz0gMTAwO1xyXG4gICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICQodGhpcykuaGFzQ2xhc3MoXCJhZGQ1MDBcIikgJiZcclxuICAgICAgICBnYW1lLm1vbmV5IC0gZ2FtZS5jdXJyZW50QmV0ID49IDUwMFxyXG4gICAgICApIHtcclxuICAgICAgICBnYW1lLmN1cnJlbnRCZXQgKz0gNTAwO1xyXG4gICAgICB9IGVsc2UgaWYgKCQodGhpcykuaGFzQ2xhc3MoXCJhbGwtaW5cIikpIHtcclxuICAgICAgICBnYW1lLmN1cnJlbnRCZXQgPSBnYW1lLm1vbmV5O1xyXG4gICAgICB9IGVsc2UgaWYgKCQodGhpcykuaGFzQ2xhc3MoXCJyZXNldFwiKSkge1xyXG4gICAgICAgIGdhbWUuY3VycmVudEJldCA9IDEwO1xyXG4gICAgICB9XHJcbiAgICAgICRjdXJyZW50QmV0LnRleHQoZ2FtZS5jdXJyZW50QmV0KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbW9kYWwobW9kYWxUeXBlKSB7XHJcbiAgICBpZiAobW9kYWxUeXBlID09PSBcImJhbmtydXB0XCIpIHtcclxuICAgICAgJChcIi5tb2RhbCwgLm1vZGFsLW92ZXJsYXlcIikucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpO1xyXG4gICAgICAkKFwiLm1vZGFsIC5tZXNzYWdlXCIpLmh0bWwoXHJcbiAgICAgICAgXCJZb3UndmUgbG9zdCBldmVyeXRoaW5nLlwiICtcclxuICAgICAgICAgIFwiPGJyLz48YnIvPlwiICtcclxuICAgICAgICAgIFwiR29vZCB0aGluZyBpdCdzIG5vdCByZWFsIG1vbmV5IVwiXHJcbiAgICAgICk7XHJcbiAgICAgICQoXCIubW9kYWwtZ3V0cyBidXR0b25cIikudGV4dChcIlBsYXkgYWdhaW5cIik7XHJcbiAgICAgICQoXCIubW9kYWwtZ3V0cyBidXR0b25cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKFwiLm1vZGFsLCAubW9kYWwtb3ZlcmxheVwiKS5hZGRDbGFzcyhcImhpZGVcIik7XHJcbiAgICAgICAgJChcIi50aXRsZS1zY3JlZW5cIikuc2hvdygpO1xyXG4gICAgICAgIGdhbWUucmVzZXRHYW1lKCk7XHJcbiAgICAgICAgZ2FtZS5yZXNldE1vbmV5KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIGlmIChtb2RhbFR5cGUgPT09IFwiaGVscFwiKSB7XHJcbiAgICAgIC8vIGZ1dHVyZSBnYW1lIGZlYXR1cmU6IGluc3RydWN0aW9ucyBhdmFpbGFibGUgaW4gaGVscCBtb2RhbFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb3V0Y29tZShyZXN1bHQpIHtcclxuICAgIHRoaXMuZW5kR2FtZU1vZGUoKTtcclxuXHJcbiAgICB0aGlzLnByZXZCZXQgPSB0aGlzLmN1cnJlbnRCZXQ7XHJcbiAgICBpZiAocmVzdWx0ID09PSBcImJsYWNramFja1wiKSB7XHJcbiAgICAgIHRoaXMubW9uZXkgKz0gdGhpcy5jdXJyZW50QmV0ICogMS41O1xyXG4gICAgICB0aGlzLmNoYW5nZSA9IHRoaXMuY3VycmVudEJldCAqIDEuNTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHJlc3VsdCA9PT0gXCJ3aW5cIikge1xyXG4gICAgICB0aGlzLm1vbmV5ICs9IHRoaXMuY3VycmVudEJldDtcclxuICAgICAgdGhpcy5jaGFuZ2UgPSB0aGlzLmN1cnJlbnRCZXQ7XHJcbiAgICB9IFxyXG4gICAgZWxzZSBpZiAocmVzdWx0ID09PSBcInB1c2hcIikge1xyXG4gICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJQdXNoXCIpO1xyXG4gICAgICB0aGlzLm1vbmV5ID0gdGhpcy5tb25leTtcclxuICAgICAgdGhpcy5jaGFuZ2UgPSAwO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAocmVzdWx0ID09PSBcImxvc2VcIikge1xyXG4gICAgICBpZiAodGhpcy5tb25leSAtIHRoaXMuY3VycmVudEJldCA+PSAxMCkge1xyXG4gICAgICAgIHRoaXMubW9uZXkgLT0gdGhpcy5jdXJyZW50QmV0O1xyXG4gICAgICAgIHRoaXMuY2hhbmdlID0gLXRoaXMuY3VycmVudEJldDtcclxuICAgICAgICAvLyBkcm9wIHRoZSBiZXQgYW1vdW50IGRvd24gdG8gZXF1YWwgbW9uZXkgYW1vdW50IG9mIGxhc3QgYmV0IHZhbHVlIGlzIGdyZWF0ZXIgdGhhbiB0b3RhbCBtb25leSB2YWx1ZVxyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRCZXQgPiB0aGlzLm1vbmV5KSB7XHJcbiAgICAgICAgICB0aGlzLmN1cnJlbnRCZXQgPSB0aGlzLm1vbmV5O1xyXG4gICAgICAgICAgJChcIi5jdXJyZW50QmV0XCIpLnRleHQodGhpcy5jdXJyZW50QmV0KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gXHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHRoaXMubW9kYWwoXCJiYW5rcnVwdFwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVzZXRHYW1lKCkge1xyXG4gICAgdGhpcy5nYW1lRGVjayA9IG5ldyBEZWNrO1xyXG4gICAgdGhpcy5kZWFsZXJIYW5kID0gbmV3IEhhbmQoXCJkZWFsZXJcIik7XHJcbiAgICB0aGlzLnBsYXllckhhbmQgPSBuZXcgSGFuZChcInBsYXllclwiLCAxKTtcclxuICAgICQoXCIubWVzc2FnZXNcIikuZW1wdHkoKTtcclxuICAgICQoXCIucGxheWVyLWhhbmRcIikuZW1wdHkoKTtcclxuICAgICQoXCIuZGVhbGVyLWhhbmRcIikuZW1wdHkoKTtcclxuICAgICQoXCIucGxheWVyLXBvaW50c1wiKS5lbXB0eSgpO1xyXG4gICAgJChcIi5kZWFsZXItcG9pbnRzXCIpLmVtcHR5KCk7XHJcbiAgICAkKFwiLmNoYW5nZVwiKS5lbXB0eSgpO1xyXG4gICAgJChcIi5wcmV2QmV0XCIpLmVtcHR5KCk7XHJcbiAgfVxyXG5cclxuICByZXNldE1vbmV5KCkge1xyXG4gICAgdGhpcy5tb25leSA9IDUwMDtcclxuICAgIHRoaXMuY3VycmVudEJldCA9IDEwO1xyXG4gICAgJChcIi50b3RhbFwiKS50ZXh0KHRoaXMubW9uZXkpO1xyXG4gICAgJChcIi5jdXJyZW50QmV0XCIpLnRleHQodGhpcy5jdXJyZW50QmV0KTtcclxuICB9XHJcblxyXG4gIHNlbGVjdEN1cnJlbnRIYW5kKC4uLmhhbmRzKSB7XHJcbiAgICBsZXQgY3VycmVudEhhbmQ7XHJcbiAgICBmb3IgKGxldCBoYW5kIG9mIGhhbmRzKSB7XHJcbiAgICAgIGhhbmQudG9nZ2xlSGlnaGxpZ2h0KCk7XHJcbiAgICAgIGlmIChoYW5kLnBsYXlpbmcpIHtcclxuICAgICAgICBjdXJyZW50SGFuZCA9IGhhbmQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjdXJyZW50SGFuZDtcclxuICB9XHJcblxyXG4gIHNwbGl0KCkge1xyXG4gICAgdGhpcy5zcGxpdEluUGxheSA9IHRydWU7XHJcbiAgICB0aGlzLmRpc2FibGUodGhpcy4kc3BsaXQpO1xyXG5cclxuICAgIC8vIGRvdWJsZSBiZXQgYW5kIGRpc3BsYXkgaXRcclxuICAgIHRoaXMuY3VycmVudEJldCA9IHRoaXMuY3VycmVudEJldCAqIDI7XHJcbiAgICAkKFwiLmN1cnJlbnRCZXRcIikudGV4dCh0aGlzLmN1cnJlbnRCZXQpO1xyXG5cclxuICAgIC8vIHN0YXJ0IGFkZGl0aW9uYWwgaGFuZCBhbmQgbW92ZSBvbmUgY2FyZCBmcm9tIGhhbmQgMSB0byBoYW5kIDJcclxuICAgIHRoaXMuYWRqdXN0U3BhY2UoKTtcclxuICAgIHRoaXMucGxheWVySGFuZDIgPSBuZXcgSGFuZChcInBsYXllclwiLCAyKTtcclxuICAgIGxldCByZW1vdmVkQ2FyZCA9IHRoaXMucGxheWVySGFuZC5yZW1vdmVDYXJkKCk7XHJcbiAgICB0aGlzLnBsYXllckhhbmQyLmFkZENhcmQocmVtb3ZlZENhcmQuY2FyZCwgcmVtb3ZlZENhcmQuJGNhcmQpO1xyXG4gICAgdGhpcy5kZWFsT25lQ2FyZCh0aGlzLnBsYXllckhhbmQpO1xyXG4gICAgdGhpcy5kZWFsT25lQ2FyZCh0aGlzLnBsYXllckhhbmQyKTtcclxuICB9XHJcblxyXG4gIHN0YW5kKGNhbGxlcikge1xyXG4gICAgaWYgKCF0aGlzLnNwbGl0SW5QbGF5KSB7XHJcbiAgICAgIHRoaXMuZGlzYWJsZSh0aGlzLiRoaXQsIHRoaXMuJHN0YW5kLCB0aGlzLiRkb3VibGVEb3duLCB0aGlzLiRzcGxpdCk7XHJcbiAgICAgIC8vIGlmIHN0YW5kIHdhcyBjYWxsZWQgYnkgY2xpY2tpbmcgJ2RvdWJsZSBkb3duJywgZG8gYWRkaXRpb25hbCB3b3JrXHJcbiAgICAgIGlmIChjYWxsZXIgPT09IFwiZG91YmxlLWRvd25cIikge1xyXG4gICAgICAgIHRoaXMuYmV0ID0gdGhpcy5iZXQgLyAyO1xyXG4gICAgICAgICQoXCIuYmV0XCIpLnRleHQodGhpcy5iZXQpO1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZSh0aGlzLiRkb3VibGVEb3duKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmRlYWxlclR1cm4odGhpcy5wbGF5ZXJIYW5kKTtcclxuICAgICAgdGhpcy5pbnZva2VPdXRjb21lKHRoaXMucGxheWVySGFuZCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgbGV0IGN1cnJlbnRIYW5kID0gdGhpcy5zZWxlY3RDdXJyZW50SGFuZCh0aGlzLnBsYXllckhhbmQsIHRoaXMucGxheWVySGFuZDIpO1xyXG4gICAgICBpZiAoY3VycmVudEhhbmQgPT09IHRoaXMucGxheWVySGFuZCkge1xyXG4gICAgICAgIHRoaXMucGxheWVySGFuZC5wbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJIYW5kMi5wbGF5aW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNlbGVjdEN1cnJlbnRIYW5kKHRoaXMucGxheWVySGFuZCwgdGhpcy5wbGF5ZXJIYW5kMik7XHJcbiAgICAgIH0gXHJcbiAgICAgIGVsc2UgaWYgKGN1cnJlbnRIYW5kID09PSB0aGlzLnBsYXllckhhbmQyKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJIYW5kMi5wbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RDdXJyZW50SGFuZCh0aGlzLnBsYXllckhhbmQsIHRoaXMucGxheWVySGFuZDIpO1xyXG4gICAgICAgIHRoaXMuZGVhbGVyVHVybih0aGlzLnBsYXllckhhbmQsIHRoaXMucGxheWVySGFuZDIpO1xyXG4gICAgICAgIHRoaXMuaW52b2tlT3V0Y29tZSh0aGlzLnBsYXllckhhbmQsIHRoaXMucGxheWVySGFuZDIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGFydEdhbWVNb2RlKCkge1xyXG4gICAgJChcIi50aXRsZS1zY3JlZW5cIikuaGlkZSgpO1xyXG4gICAgdGhpcy5hZGp1c3RTcGFjZSgpO1xyXG4gICAgdGhpcy5lbmFibGUodGhpcy4kaGl0LCB0aGlzLiRzdGFuZCk7XHJcbiAgICB0aGlzLmRpc2FibGUodGhpcy4kZGVhbCk7XHJcbiAgICAkKFwiLmJldHRpbmcgLmJ1dHRvbnNcIikuaGlkZSgpO1xyXG4gICAgdGhpcy5wbGF5ZXJIYW5kLnBsYXlpbmcgPSB0cnVlO1xyXG4gICAgdGhpcy5zZWxlY3RDdXJyZW50SGFuZCh0aGlzLnBsYXllckhhbmQpOyAgXHJcbiAgfVxyXG5cclxuICB1cGRhdGVNZXNzYWdlKG1lc3NhZ2UpIHtcclxuICAgICQoXCIubWVzc2FnZXNcIikuYXBwZW5kKGA8aDE+JHttZXNzYWdlfTwvaDE+YCk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2dhbWUuanMiLCJpbXBvcnQgQ2FyZCBmcm9tIFwiLi9jYXJkXCI7XHJcbmltcG9ydCBIYW5kIGZyb20gXCIuL2hhbmRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlY2sge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5jYXJkcyA9IFtdO1xyXG4gIH1cclxuXHJcbiAgZHJhdygpIHtcclxuICAgIHJldHVybiB0aGlzLmNhcmRzLnBvcCgpO1xyXG4gIH1cclxuXHJcbiAgZ2VuZXJhdGUobnVtRGVja3MpIHtcclxuICAgIGlmICghbnVtRGVja3MpIHtcclxuICAgICAgbnVtRGVja3MgPSAxO1xyXG4gICAgfVxyXG4gICAgd2hpbGUgKG51bURlY2tzID4gMCkge1xyXG4gICAgICBmb3IgKHZhciBpID0gMTsgaSA8PSAxMzsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5jYXJkcy5wdXNoKG5ldyBDYXJkKGksIFwic3BhZGVzXCIpKTtcclxuICAgICAgICB0aGlzLmNhcmRzLnB1c2gobmV3IENhcmQoaSwgXCJkaWFtb25kc1wiKSk7XHJcbiAgICAgICAgdGhpcy5jYXJkcy5wdXNoKG5ldyBDYXJkKGksIFwiaGVhcnRzXCIpKTtcclxuICAgICAgICB0aGlzLmNhcmRzLnB1c2gobmV3IENhcmQoaSwgXCJjbHVic1wiKSk7XHJcbiAgICAgIH1cclxuICAgICAgbnVtRGVja3MtLTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNodWZmbGUoKSB7XHJcbiAgICBmb3IgKGxldCBpID0gdGhpcy5jYXJkcy5sZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XHJcbiAgICAgIGNvbnN0IGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoaSArIDEpKTtcclxuICAgICAgW3RoaXMuY2FyZHNbaV1dID0gW3RoaXMuY2FyZHNbal1dO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9kZWNrLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==