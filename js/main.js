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

var _wallet = __webpack_require__(5);

var _wallet2 = _interopRequireDefault(_wallet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.wallet = new _wallet2.default();
    this.gameDeck = new _deck2.default();
    this.dealerHand = new _hand2.default('dealer');
    this.playerHand = new _hand2.default('player', 1);
    this.splitInPlay = false;

    this.$total = $(".total");
    this.$bet = $(".currentBet");
    this.$change = $(".change");

    this.$deal = $(".deal");
    this.$hit = $(".hit");
    this.$stand = $(".stand");
    this.$doubleDown = $(".double-down");
    this.$split = $(".split");
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

      var hand1 = hands[0].outcome;
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
            this.updateMessage("You win both!");
            this.outcome("win");
          } else if (hand1 === "lose" && hand2 === "lose") {
            this.updateMessage("Dealer wins both");
            this.outcome("lose");
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
      var game = this;
      this.$total.text(this.wallet.money);
      this.$bet.text(this.wallet.bet);
      $(".bet-btn").on("click", function () {
        var possibleBet = game.wallet.money - game.wallet.bet;
        if ($(this).hasClass("add10") && possibleBet >= 10) {
          game.wallet.bet += 10;
        } else if ($(this).hasClass("add50") && possibleBet >= 50) {
          game.wallet.bet += 50;
        } else if ($(this).hasClass("add100") && possibleBet >= 100) {
          game.wallet.bet += 100;
        } else if ($(this).hasClass("add500") && possibleBet >= 500) {
          game.wallet.bet += 500;
        } else if ($(this).hasClass("all-in")) {
          game.wallet.bet = game.wallet.money;
        } else if ($(this).hasClass("reset")) {
          game.wallet.bet = 10;
        }
        game.$bet.text(game.wallet.bet);
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

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Wallet = function Wallet() {
	_classCallCheck(this, Wallet);

	this.money = 500;
	this.bet = 10;
	this.change;
};

exports.default = Wallet;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjdlZjgyMzExMDRkYjZkNzExMTMiLCJ3ZWJwYWNrOi8vLy4vanMvaGFuZC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jYXJkLmpzIiwid2VicGFjazovLy8uL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9nYW1lLmpzIiwid2VicGFjazovLy8uL2pzL2RlY2suanMiLCJ3ZWJwYWNrOi8vLy4vanMvd2FsbGV0LmpzIl0sIm5hbWVzIjpbIkhhbmQiLCJvd25lciIsImhhbmROdW1iZXIiLCJzZWxlY3RvciIsIiR3cmFwcGVyIiwiJCIsIiRoYW5kIiwiJHBvaW50cyIsInBsYXlpbmciLCJjYXJkcyIsIm91dGNvbWUiLCJjYXJkIiwiJGNhcmQiLCJwdXNoIiwiYXBwZW5kIiwicG9pbnQiLCJ0b3RhbCIsImFjZXMiLCJwb3AiLCJmaW5kIiwicmVtb3ZlIiwiYXR0ciIsImdldEltYWdlVXJsIiwiaW5kZXgiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwiY29udGVudCIsInRleHQiLCJDYXJkIiwic3VpdCIsInZhbHVlIiwiY3VycmVudEdhbWUiLCJtYWtlQmV0Iiwib24iLCJyZXNldEdhbWUiLCJnYW1lRGVjayIsImdlbmVyYXRlIiwiZGVhbCIsImhpdCIsInN0YW5kIiwiZG91YmxlRG93biIsInNwbGl0IiwiR2FtZSIsIndhbGxldCIsImRlYWxlckhhbmQiLCJwbGF5ZXJIYW5kIiwic3BsaXRJblBsYXkiLCIkdG90YWwiLCIkYmV0IiwiJGNoYW5nZSIsIiRkZWFsIiwiJGhpdCIsIiRzdGFuZCIsIiRkb3VibGVEb3duIiwiJHNwbGl0Iiwic2l6ZSIsImNzcyIsImNsYXNzTmFtZSIsInN5bWJvbCIsImNoYW5nZSIsIk1hdGgiLCJhYnMiLCJoYW5kIiwic3BlY2lhbCIsImRyYXciLCJhZGRDYXJkIiwidXBkYXRlRGlzcGxheSIsImdldFBvaW50cyIsInN0YXJ0R2FtZU1vZGUiLCJzaHVmZmxlIiwiZGVhbE9uZUNhcmQiLCJkZWFsZXJQb2ludHMiLCJwbGF5ZXJQb2ludHMiLCJ1cGRhdGVNZXNzYWdlIiwibW9uZXkiLCJjdXJyZW50QmV0IiwiZW5hYmxlIiwiY2FuU3BsaXQiLCJyZXZlYWxIb2xlIiwiaGFuZHMiLCJmb3JFYWNoIiwiZXZhbHVhdGVIYW5kIiwiZWxlbWVudHMiLCJlbGVtZW50Iiwic2VsZWN0Q3VycmVudEhhbmQiLCJhc3Nlc3NDaGFuZ2UiLCJkaXNhYmxlIiwic2hvdyIsImN1cnJlbnRIYW5kIiwicGxheWVySGFuZDIiLCJpbnZva2VPdXRjb21lIiwiaGFuZDEiLCJsZW5ndGgiLCJoYW5kMiIsImJldCIsImdhbWUiLCJwb3NzaWJsZUJldCIsImhhc0NsYXNzIiwibW9kYWxUeXBlIiwiaHRtbCIsInJlc2V0TW9uZXkiLCJyZXN1bHQiLCJlbmRHYW1lTW9kZSIsIm1vZGFsIiwiZW1wdHkiLCJ0b2dnbGVIaWdobGlnaHQiLCJhZGp1c3RTcGFjZSIsInJlbW92ZWRDYXJkIiwicmVtb3ZlQ2FyZCIsImNhbGxlciIsImRlYWxlclR1cm4iLCJoaWRlIiwibWVzc2FnZSIsIkRlY2siLCJudW1EZWNrcyIsImkiLCJqIiwiZmxvb3IiLCJyYW5kb20iLCJXYWxsZXQiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzdEQTs7Ozs7Ozs7SUFFcUJBLEk7QUFDbkIsZ0JBQVlDLEtBQVosRUFBbUJDLFVBQW5CLEVBQStCO0FBQUE7O0FBQzdCLFFBQUlDLGlCQUFKO0FBQ0EsUUFBSUYsVUFBVSxRQUFkLEVBQXdCO0FBQ3RCRSxpQkFBVyxTQUFYO0FBQ0QsS0FGRCxNQUdLLElBQUlGLFVBQVUsUUFBZCxFQUF3QjtBQUMzQixVQUFJQyxlQUFlLENBQW5CLEVBQXNCO0FBQ3BCQyxtQkFBVyxRQUFYO0FBQ0QsT0FGRCxNQUdLLElBQUlELGVBQWUsQ0FBbkIsRUFBc0I7QUFDekJDLG1CQUFXLFFBQVg7QUFDRDtBQUNGO0FBQ0QsU0FBS0MsUUFBTCxHQUFnQkMsT0FBS0YsUUFBTCxDQUFoQjtBQUNBLFNBQUtHLEtBQUwsR0FBYUQsRUFBS0YsUUFBTCxZQUFiO0FBQ0EsU0FBS0ksT0FBTCxHQUFlRixFQUFLRixRQUFMLGNBQWY7QUFDQSxTQUFLSyxPQUFMLEdBQWUsS0FBZjtBQUNBLFNBQUtDLEtBQUwsR0FBYSxFQUFiO0FBQ0EsU0FBS0MsT0FBTDtBQUNEOzs7OzRCQUVPQyxJLEVBQU1DLEssRUFBTztBQUNuQixXQUFLSCxLQUFMLENBQVdJLElBQVgsQ0FBZ0JGLElBQWhCO0FBQ0EsV0FBS0wsS0FBTCxDQUFXUSxNQUFYLENBQWtCRixLQUFsQjtBQUNEOzs7K0JBRVU7QUFDVCxhQUFPLEtBQUtILEtBQUwsQ0FBVyxDQUFYLEVBQWNNLEtBQWQsS0FBd0IsS0FBS04sS0FBTCxDQUFXLENBQVgsRUFBY00sS0FBN0M7QUFDRDs7O2dDQUVXO0FBQ1YsVUFBSUMsUUFBUSxDQUFaO0FBQ0EsVUFBSUMsT0FBTyxDQUFYO0FBRlU7QUFBQTtBQUFBOztBQUFBO0FBR1YsNkJBQWlCLEtBQUtSLEtBQXRCLDhIQUE2QjtBQUFBLGNBQXBCRSxJQUFvQjs7QUFDM0IsY0FBSUksUUFBUUosS0FBS0ksS0FBakI7QUFDQSxjQUFJQSxVQUFVLENBQWQsRUFBaUI7QUFDZkMscUJBQVMsRUFBVDtBQUNBQztBQUNELFdBSEQsTUFJSyxJQUFJRixRQUFRLEVBQVosRUFBZ0I7QUFDbkJBLG9CQUFRLEVBQVI7QUFDRDtBQUNEQyxtQkFBU0QsS0FBVDtBQUNBLGlCQUFPQyxRQUFRLEVBQVIsSUFBY0MsT0FBTyxDQUE1QixFQUErQjtBQUM3QkQscUJBQVMsRUFBVDtBQUNBQztBQUNEO0FBQ0Y7QUFqQlM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFrQlYsYUFBT0QsS0FBUDtBQUNEOzs7aUNBRVk7QUFDWCxVQUFJTCxPQUFPLEtBQUtGLEtBQUwsQ0FBV1MsR0FBWCxFQUFYO0FBQ0EsVUFBSU4sUUFBUSxLQUFLTixLQUFMLENBQVdhLElBQVgsQ0FBZ0IsZ0JBQWhCLEVBQWtDQyxNQUFsQyxFQUFaO0FBQ0EsYUFBTyxFQUFDVCxVQUFELEVBQU9DLFlBQVAsRUFBUDtBQUNEOzs7aUNBRVk7QUFDWCxXQUFLTixLQUFMLENBQVdhLElBQVgsQ0FBZ0IsaUJBQWhCLEVBQW1DRSxJQUFuQyxDQUF3QyxLQUF4QyxFQUErQyxLQUFLWixLQUFMLENBQVcsQ0FBWCxFQUFjYSxXQUFkLEVBQS9DO0FBQ0Q7Ozs0QkFFT0MsSyxFQUFPO0FBQ2IsYUFBTyxLQUFLZCxLQUFMLENBQVdjLFFBQVEsQ0FBbkIsQ0FBUDtBQUNEOzs7c0NBRWlCO0FBQ2hCLFdBQUtmLE9BQUwsR0FBZSxLQUFLSixRQUFMLENBQWNvQixRQUFkLENBQXVCLGFBQXZCLENBQWYsR0FBdUQsS0FBS3BCLFFBQUwsQ0FBY3FCLFdBQWQsQ0FBMEIsYUFBMUIsQ0FBdkQ7QUFDRDs7O2tDQUVhQyxPLEVBQVM7QUFDckIsV0FBS25CLE9BQUwsQ0FBYW9CLElBQWIsQ0FBa0JELE9BQWxCO0FBQ0Q7Ozs7OztrQkF4RWtCMUIsSTs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNGQTRCLEk7QUFDbkIsZ0JBQVliLEtBQVosRUFBbUJjLElBQW5CLEVBQXlCO0FBQUE7O0FBQ3ZCLFNBQUtkLEtBQUwsR0FBYUEsS0FBYjtBQUNBLFNBQUtjLElBQUwsR0FBWUEsSUFBWjtBQUNEOzs7O2tDQUVhO0FBQ1osVUFBSUMsUUFBUSxLQUFLZixLQUFqQjtBQUNBLFVBQUksS0FBS0EsS0FBTCxLQUFlLEVBQW5CLEVBQXVCO0FBQ3JCZSxnQkFBUSxNQUFSO0FBQ0QsT0FGRCxNQUdLLElBQUksS0FBS2YsS0FBTCxLQUFlLEVBQW5CLEVBQXVCO0FBQzFCZSxnQkFBUSxPQUFSO0FBQ0QsT0FGSSxNQUdBLElBQUksS0FBS2YsS0FBTCxLQUFlLEVBQW5CLEVBQXVCO0FBQzFCZSxnQkFBUSxNQUFSO0FBQ0QsT0FGSSxNQUdBLElBQUksS0FBS2YsS0FBTCxLQUFlLENBQW5CLEVBQXNCO0FBQ3pCZSxnQkFBUSxLQUFSO0FBQ0Q7QUFDRCx5QkFBaUJBLEtBQWpCLFlBQTZCLEtBQUtELElBQWxDO0FBQ0Q7Ozs7OztrQkFyQmtCRCxJOzs7Ozs7Ozs7QUNBckI7Ozs7OztBQUVBLElBQUlHLGNBQWMsb0JBQWxCOztBQUVBQSxZQUFZQyxPQUFaOztBQUVBM0IsRUFBRSxPQUFGLEVBQVc0QixFQUFYLENBQWMsT0FBZCxFQUF1QixZQUFXO0FBQ2hDRixjQUFZRyxTQUFaO0FBQ0FILGNBQVlJLFFBQVosQ0FBcUJDLFFBQXJCLENBQThCLENBQTlCO0FBQ0FMLGNBQVlNLElBQVo7QUFDRCxDQUpEOztBQU1BaEMsRUFBRSxNQUFGLEVBQVU0QixFQUFWLENBQWEsT0FBYixFQUFzQixZQUFXO0FBQy9CRixjQUFZTyxHQUFaO0FBQ0QsQ0FGRDs7QUFJQWpDLEVBQUUsUUFBRixFQUFZNEIsRUFBWixDQUFlLE9BQWYsRUFBd0IsWUFBVztBQUNqQ0YsY0FBWVEsS0FBWjtBQUNELENBRkQ7O0FBSUFsQyxFQUFFLGNBQUYsRUFBa0I0QixFQUFsQixDQUFxQixPQUFyQixFQUE4QixZQUFXO0FBQ3ZDRixjQUFZUyxVQUFaO0FBQ0QsQ0FGRDs7QUFJQW5DLEVBQUUsUUFBRixFQUFZNEIsRUFBWixDQUFlLE9BQWYsRUFBd0IsWUFBVztBQUNqQ0YsY0FBWVUsS0FBWjtBQUNELENBRkQsRTs7Ozs7Ozs7Ozs7Ozs7O0FDeEJBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7SUFFcUJDLEk7QUFDbkIsa0JBQWM7QUFBQTs7QUFDWixTQUFLQyxNQUFMLEdBQWMsc0JBQWQ7QUFDQSxTQUFLUixRQUFMLEdBQWdCLG9CQUFoQjtBQUNBLFNBQUtTLFVBQUwsR0FBa0IsbUJBQVMsUUFBVCxDQUFsQjtBQUNBLFNBQUtDLFVBQUwsR0FBa0IsbUJBQVMsUUFBVCxFQUFtQixDQUFuQixDQUFsQjtBQUNBLFNBQUtDLFdBQUwsR0FBbUIsS0FBbkI7O0FBRUEsU0FBS0MsTUFBTCxHQUFjMUMsRUFBRSxRQUFGLENBQWQ7QUFDQSxTQUFLMkMsSUFBTCxHQUFZM0MsRUFBRSxhQUFGLENBQVo7QUFDQSxTQUFLNEMsT0FBTCxHQUFlNUMsRUFBRSxTQUFGLENBQWY7O0FBRUEsU0FBSzZDLEtBQUwsR0FBYTdDLEVBQUUsT0FBRixDQUFiO0FBQ0EsU0FBSzhDLElBQUwsR0FBWTlDLEVBQUUsTUFBRixDQUFaO0FBQ0EsU0FBSytDLE1BQUwsR0FBYy9DLEVBQUUsUUFBRixDQUFkO0FBQ0EsU0FBS2dELFdBQUwsR0FBbUJoRCxFQUFFLGNBQUYsQ0FBbkI7QUFDQSxTQUFLaUQsTUFBTCxHQUFjakQsRUFBRSxRQUFGLENBQWQ7QUFDRDs7OztrQ0FFYTtBQUNaLFVBQUlrRCxhQUFKO0FBQ0EsV0FBS1QsV0FBTCxHQUFtQlMsT0FBTyxFQUExQixHQUErQkEsT0FBTyxHQUF0QztBQUNBbEQsUUFBRSxpQkFBRixFQUFxQm1ELEdBQXJCLENBQXlCLE9BQXpCLEVBQXFDRCxJQUFyQztBQUNEOzs7bUNBRWM7QUFDYixVQUFJRSxZQUFZLEVBQWhCO0FBQ0EsVUFBSUMsU0FBUyxFQUFiO0FBQ0EsVUFBSSxLQUFLQyxNQUFMLEdBQWMsQ0FBbEIsRUFBcUI7QUFDbkJGLG9CQUFZLFVBQVo7QUFDQUMsaUJBQVMsR0FBVDtBQUNELE9BSEQsTUFJSyxJQUFJLEtBQUtDLE1BQUwsR0FBYyxDQUFsQixFQUFxQjtBQUN4QkYsb0JBQVksVUFBWjtBQUNBQyxpQkFBUyxHQUFUO0FBQ0Q7QUFDRCxXQUFLVCxPQUFMLENBQWFuQyxNQUFiLG9CQUFvQzJDLFNBQXBDLFdBQWtEQyxNQUFsRCxVQUE2REUsS0FBS0MsR0FBTCxDQUFTLEtBQUtGLE1BQWQsQ0FBN0Q7QUFDRDs7O2dDQUVXRyxJLEVBQU1DLE8sRUFBUztBQUN6QixVQUFJcEQsT0FBTyxLQUFLd0IsUUFBTCxDQUFjNkIsSUFBZCxFQUFYO0FBQ0EsVUFBSXBELFFBQVFQLEVBQUUsU0FBRixFQUFhO0FBQ3ZCLGlCQUFTLE1BRGM7QUFFdkIsb0JBQVVNLEtBQUtXLFdBQUw7QUFGYSxPQUFiLENBQVo7QUFJQSxVQUFJeUMsWUFBWSxNQUFoQixFQUF3QjtBQUN0Qm5ELGNBQU1TLElBQU4sQ0FBVyxLQUFYLEVBQWtCLDJCQUFsQjtBQUNELE9BRkQsTUFHSyxJQUFJMEMsWUFBWSxhQUFoQixFQUErQjtBQUNsQ25ELGNBQU1ZLFFBQU4sQ0FBZSxTQUFmO0FBQ0QsT0FGSSxNQUdBLElBQUl1QyxZQUFZLE9BQWhCLEVBQXlCO0FBQzVCbkQsY0FBTVksUUFBTixDQUFlLE9BQWY7QUFDRDtBQUNEc0MsV0FBS0csT0FBTCxDQUFhdEQsSUFBYixFQUFtQkMsS0FBbkI7QUFDQWtELFdBQUtJLGFBQUwsQ0FBbUJKLEtBQUtLLFNBQUwsRUFBbkI7QUFDQSxhQUFPTCxLQUFLSyxTQUFMLEVBQVA7QUFDRDs7OzJCQUVNO0FBQ0wsV0FBS0MsYUFBTDtBQUNBLFdBQUtqQyxRQUFMLENBQWNrQyxPQUFkO0FBQ0EsV0FBS0MsV0FBTCxDQUFpQixLQUFLMUIsVUFBdEIsRUFBa0MsTUFBbEM7QUFDQSxXQUFLMEIsV0FBTCxDQUFpQixLQUFLekIsVUFBdEI7QUFDQSxVQUFJMEIsZUFBZSxLQUFLRCxXQUFMLENBQWlCLEtBQUsxQixVQUF0QixDQUFuQjtBQUNBLFVBQUk0QixlQUFlLEtBQUtGLFdBQUwsQ0FBaUIsS0FBS3pCLFVBQXRCLENBQW5CO0FBQ0EsV0FBS0QsVUFBTCxDQUFnQnNCLGFBQWhCLENBQThCLEdBQTlCLEVBUEssQ0FPK0I7O0FBRXBDLFVBQUlLLGlCQUFpQixFQUFqQixJQUF1QkMsaUJBQWlCLEVBQTVDLEVBQWdEO0FBQzlDLGFBQUs5RCxPQUFMLENBQWEsTUFBYjtBQUNBLGFBQUtrQyxVQUFMLENBQWdCc0IsYUFBaEIsQ0FBOEIsV0FBOUI7QUFDQSxhQUFLckIsVUFBTCxDQUFnQnFCLGFBQWhCLENBQThCLHNCQUE5QjtBQUNELE9BSkQsTUFLSyxJQUFJSyxpQkFBaUIsRUFBckIsRUFBeUI7QUFDNUIsYUFBSzdELE9BQUwsQ0FBYSxNQUFiO0FBQ0EsYUFBS2tDLFVBQUwsQ0FBZ0JzQixhQUFoQixDQUE4QixXQUE5QjtBQUNBLGFBQUtPLGFBQUwsQ0FBbUIsYUFBbkI7QUFDRCxPQUpJLE1BS0EsSUFBSUQsaUJBQWlCLEVBQXJCLEVBQXlCO0FBQzVCLGFBQUs5RCxPQUFMLENBQWEsV0FBYjtBQUNBLGFBQUtrQyxVQUFMLENBQWdCc0IsYUFBaEIsQ0FBOEJLLFlBQTlCO0FBQ0EsYUFBSzFCLFVBQUwsQ0FBZ0JxQixhQUFoQixDQUE4QixzQkFBOUI7QUFDQSxhQUFLTyxhQUFMLENBQW1CLFVBQW5CO0FBQ0QsT0FMSSxNQU1BLElBQUksS0FBS0MsS0FBTCxHQUFhLEtBQUtDLFVBQUwsR0FBa0IsQ0FBbkMsRUFBc0M7QUFDekMsWUFBSUgsaUJBQWlCLEVBQXJCLEVBQTBCO0FBQ3hCLGVBQUtJLE1BQUwsQ0FBWSxLQUFLdkIsV0FBakI7QUFDRDtBQUNELFlBQUksS0FBS1IsVUFBTCxDQUFnQmdDLFFBQWhCLEVBQUosRUFBZ0M7QUFDOUIsZUFBS0QsTUFBTCxDQUFZLEtBQUt0QixNQUFqQjtBQUNEO0FBQ0Y7QUFDRjs7O2lDQUVvQjtBQUFBOztBQUNuQixXQUFLVixVQUFMLENBQWdCa0MsVUFBaEI7QUFDQSxhQUFPLEtBQUtsQyxVQUFMLENBQWdCdUIsU0FBaEIsS0FBOEIsRUFBckMsRUFBeUM7QUFDdkMsYUFBS0csV0FBTCxDQUFpQixLQUFLMUIsVUFBdEI7QUFDRDs7QUFKa0Isd0NBQVBtQyxLQUFPO0FBQVBBLGFBQU87QUFBQTs7QUFLbkJBLFlBQU1DLE9BQU4sQ0FBYyxnQkFBUTtBQUFDLGNBQUtDLFlBQUwsQ0FBa0JuQixJQUFsQjtBQUF3QixPQUEvQztBQUNEOzs7OEJBRW9CO0FBQUEseUNBQVZvQixRQUFVO0FBQVZBLGdCQUFVO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQ25CLDZCQUFvQkEsUUFBcEIsOEhBQThCO0FBQUEsY0FBckJDLE9BQXFCOztBQUM1QkEsa0JBQVE5RCxJQUFSLENBQWEsVUFBYixFQUF5QixJQUF6QjtBQUNEO0FBSGtCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJcEI7OztpQ0FFWTtBQUNYO0FBQ0EsV0FBS3NELFVBQUwsSUFBbUIsQ0FBbkI7QUFDQXRFLFFBQUUsYUFBRixFQUFpQnNCLElBQWpCLENBQXNCLEtBQUtnRCxVQUEzQjtBQUNBO0FBQ0EsV0FBS0wsV0FBTCxDQUFpQixLQUFLekIsVUFBdEIsRUFBa0MsYUFBbEM7QUFDQSxXQUFLTixLQUFMLENBQVcsYUFBWDtBQUNEOzs7NkJBRW1CO0FBQUEseUNBQVYyQyxRQUFVO0FBQVZBLGdCQUFVO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQ2xCLDhCQUFvQkEsUUFBcEIsbUlBQThCO0FBQUEsY0FBckJDLE9BQXFCOztBQUM1QkEsa0JBQVE5RCxJQUFSLENBQWEsVUFBYixFQUF5QixLQUF6QjtBQUNEO0FBSGlCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJbkI7OztrQ0FFYTtBQUNaLFdBQUt3QixVQUFMLENBQWdCckMsT0FBaEIsR0FBMEIsS0FBMUI7QUFDQSxXQUFLNEUsaUJBQUwsQ0FBdUIsS0FBS3ZDLFVBQTVCO0FBQ0EsV0FBS0QsVUFBTCxDQUFnQmtDLFVBQWhCO0FBQ0EsV0FBS2xDLFVBQUwsQ0FBZ0JzQixhQUFoQixDQUE4QixLQUFLdEIsVUFBTCxDQUFnQnVCLFNBQWhCLEVBQTlCOztBQUVBOUQsUUFBRSxRQUFGLEVBQVlzQixJQUFaLENBQWlCLEtBQUsrQyxLQUF0QjtBQUNBLFdBQUtXLFlBQUw7QUFDQSxXQUFLVCxNQUFMLENBQVksS0FBSzFCLEtBQWpCO0FBQ0EsV0FBS29DLE9BQUwsQ0FBYSxLQUFLbkMsSUFBbEIsRUFBd0IsS0FBS0MsTUFBN0I7QUFDQS9DLFFBQUUsbUJBQUYsRUFBdUJrRixJQUF2QjtBQUNEOzs7aUNBRVl6QixJLEVBQU07QUFDakIsVUFBSVMsZUFBZSxLQUFLM0IsVUFBTCxDQUFnQnVCLFNBQWhCLEVBQW5CO0FBQ0EsVUFBSUssZUFBZVYsS0FBS0ssU0FBTCxFQUFuQjtBQUNBLFVBQUlJLGVBQWUsRUFBZixJQUFxQkMsZUFBZUQsWUFBeEMsRUFBc0Q7QUFDcERULGFBQUtwRCxPQUFMLEdBQWUsS0FBZjtBQUNELE9BRkQsTUFHSyxJQUFJOEQsZUFBZUQsWUFBbkIsRUFBaUM7QUFDcENULGFBQUtwRCxPQUFMLEdBQWUsTUFBZjtBQUNELE9BRkksTUFHQTtBQUNIb0QsYUFBS3BELE9BQUwsR0FBZSxNQUFmO0FBQ0Q7QUFDRjs7OzBCQUVLO0FBQ0osV0FBSzRFLE9BQUwsQ0FBYSxLQUFLakMsV0FBbEIsRUFBK0IsS0FBS0MsTUFBcEM7QUFDQSxVQUFJLENBQUMsS0FBS1IsV0FBVixFQUF1QjtBQUNyQixZQUFJMEIsZUFBZSxLQUFLRixXQUFMLENBQWlCLEtBQUt6QixVQUF0QixDQUFuQjtBQUNBLFlBQUkyQixlQUFlLEVBQW5CLEVBQXVCO0FBQ3JCLGVBQUtDLGFBQUwsQ0FBbUIsVUFBbkI7QUFDQSxlQUFLL0QsT0FBTCxDQUFhLE1BQWI7QUFDRDtBQUNGLE9BTkQsTUFPSztBQUNILFlBQUk4RSxjQUFjLEtBQUtKLGlCQUFMLENBQXVCLEtBQUt2QyxVQUE1QixFQUF3QyxLQUFLNEMsV0FBN0MsQ0FBbEI7QUFDQSxZQUFJakIsZ0JBQWUsS0FBS0YsV0FBTCxDQUFpQmtCLFdBQWpCLEVBQThCLE9BQTlCLENBQW5CO0FBQ0EsWUFBSWhCLGdCQUFlLEVBQW5CLEVBQXVCO0FBQ3JCLGNBQUlnQixnQkFBZ0IsS0FBSzNDLFVBQXpCLEVBQXFDO0FBQ25DLGlCQUFLQSxVQUFMLENBQWdCbkMsT0FBaEIsR0FBMEIsTUFBMUI7QUFDQSxpQkFBS21DLFVBQUwsQ0FBZ0JyQyxPQUFoQixHQUEwQixLQUExQjtBQUNBLGlCQUFLaUYsV0FBTCxDQUFpQmpGLE9BQWpCLEdBQTJCLElBQTNCO0FBQ0EsaUJBQUs0RSxpQkFBTCxDQUF1QixLQUFLdkMsVUFBNUIsRUFBd0MsS0FBSzRDLFdBQTdDO0FBQ0QsV0FMRCxNQU1LLElBQUlELGdCQUFnQixLQUFLQyxXQUF6QixFQUFzQztBQUN6QyxpQkFBS0EsV0FBTCxDQUFpQi9FLE9BQWpCLEdBQTJCLE1BQTNCO0FBQ0EsaUJBQUsrRSxXQUFMLENBQWlCakYsT0FBakIsR0FBMkIsS0FBM0I7QUFDQSxpQkFBSzRFLGlCQUFMLENBQXVCLEtBQUt2QyxVQUE1QixFQUF3QyxLQUFLNEMsV0FBN0M7QUFDQSxpQkFBS0MsYUFBTCxDQUFtQixLQUFLN0MsVUFBeEIsRUFBb0MsS0FBSzRDLFdBQXpDO0FBQ0Q7QUFDRjtBQUNGO0FBQ0Y7OztvQ0FFdUI7QUFBQSx5Q0FBUFYsS0FBTztBQUFQQSxhQUFPO0FBQUE7O0FBQ3RCLFVBQUlZLFFBQVFaLE1BQU0sQ0FBTixFQUFTckUsT0FBckI7QUFDQSxVQUFJcUUsTUFBTWEsTUFBTixLQUFpQixDQUFyQixFQUF3QjtBQUN0QixZQUFJRCxVQUFVLEtBQWQsRUFBcUI7QUFDbkIsZUFBS2xCLGFBQUwsQ0FBbUIsVUFBbkI7QUFDQSxlQUFLL0QsT0FBTCxDQUFhLEtBQWI7QUFDRCxTQUhELE1BSUssSUFBSWlGLFVBQVUsTUFBZCxFQUFzQjtBQUN6QixlQUFLbEIsYUFBTCxDQUFtQixhQUFuQjtBQUNBLGVBQUsvRCxPQUFMLENBQWEsTUFBYjtBQUNELFNBSEksTUFJQTtBQUNILGVBQUtBLE9BQUwsQ0FBYSxNQUFiO0FBQ0Q7QUFDRixPQVpELE1BYUssSUFBSXFFLE1BQU1hLE1BQU4sS0FBaUIsQ0FBckIsRUFBd0I7QUFDM0IsWUFBSUMsUUFBUWQsTUFBTSxDQUFOLEVBQVNyRSxPQUFyQjtBQUNBLFlBQUlpRixVQUFVRSxLQUFkLEVBQXFCO0FBQ25CLGNBQUlGLFVBQVUsV0FBVixJQUF5QkUsVUFBVSxXQUF2QyxFQUFvRDtBQUNsRCxpQkFBS3BCLGFBQUwsQ0FBbUIsbUJBQW5CO0FBQ0EsaUJBQUsvRCxPQUFMLENBQWEsV0FBYjtBQUNELFdBSEQsTUFJSyxJQUFJaUYsVUFBVSxLQUFWLElBQW1CRSxVQUFVLEtBQWpDLEVBQXdDO0FBQzNDLGlCQUFLcEIsYUFBTCxDQUFtQixlQUFuQjtBQUNBLGlCQUFLL0QsT0FBTCxDQUFhLEtBQWI7QUFDRCxXQUhJLE1BSUEsSUFBSWlGLFVBQVUsTUFBVixJQUFvQkUsVUFBVSxNQUFsQyxFQUEwQztBQUM3QyxpQkFBS3BCLGFBQUwsQ0FBbUIsa0JBQW5CO0FBQ0EsaUJBQUsvRCxPQUFMLENBQWEsTUFBYjtBQUNELFdBSEksTUFJQTtBQUNILGlCQUFLQSxPQUFMLENBQWEsTUFBYjtBQUNEO0FBQ0YsU0FoQkQsTUFpQks7QUFDSCxlQUFLaUUsVUFBTCxJQUFtQixDQUFuQjtBQUNBLGNBQUlnQixVQUFVLFdBQVYsSUFBeUJFLFVBQVUsV0FBdkMsRUFBb0Q7QUFDbEQ7QUFDQSxnQkFBSUMsTUFBTW5CLFVBQVY7QUFDQSxpQkFBS0EsVUFBTCxJQUFtQixHQUFuQjtBQUNBLGdCQUFJZ0IsVUFBVSxLQUFWLElBQW1CRSxVQUFVLEtBQWpDLEVBQXdDO0FBQ3RDLG1CQUFLbkYsT0FBTCxDQUFhLEtBQWI7QUFDQSxtQkFBS2lFLFVBQUwsSUFBbUJtQixHQUFuQjtBQUNBLG1CQUFLckIsYUFBTCxDQUFtQixlQUFuQjtBQUNELGFBSkQsTUFLSyxJQUFJa0IsVUFBVSxNQUFWLElBQW9CRSxVQUFVLE1BQWxDLEVBQTBDO0FBQzdDLG1CQUFLbkYsT0FBTCxDQUFhLEtBQWI7QUFDQSxtQkFBS2lFLFVBQUwsSUFBbUJtQixHQUFuQjtBQUNBLG1CQUFLckIsYUFBTCxDQUFtQiw2QkFBbkI7QUFDRCxhQUpJLE1BS0E7QUFDSCxtQkFBSy9ELE9BQUwsQ0FBYSxLQUFiO0FBQ0EsbUJBQUsrRCxhQUFMLENBQW1CLG1CQUFuQjtBQUNEO0FBQ0YsV0FsQkQsTUFtQkssSUFBSWtCLFVBQVUsS0FBVixJQUFtQkUsVUFBVSxLQUFqQyxFQUF3QztBQUMzQyxnQkFBSUYsVUFBVSxNQUFWLElBQW9CRSxVQUFVLE1BQWxDLEVBQTBDO0FBQ3hDLG1CQUFLbkYsT0FBTCxDQUFhLEtBQWI7QUFDQSxtQkFBSytELGFBQUwsQ0FBbUIsbUJBQW5CO0FBQ0QsYUFIRCxNQUlLO0FBQ0gsbUJBQUsvRCxPQUFMLENBQWEsTUFBYjtBQUNEO0FBQ0YsV0FSSSxNQVNBLElBQUlpRixVQUFVLE1BQVYsSUFBb0JFLFVBQVUsTUFBbEMsRUFBMEM7QUFDN0MsaUJBQUtuRixPQUFMLENBQWEsTUFBYjtBQUNBLGlCQUFLK0QsYUFBTCxDQUFtQix1QkFBbkI7QUFDRDtBQUNGO0FBQ0QsYUFBSzNCLFdBQUwsR0FBbUIsS0FBbkI7QUFDRDtBQUNGOzs7OEJBRVM7QUFDUixVQUFNaUQsT0FBTyxJQUFiO0FBQ0EsV0FBS2hELE1BQUwsQ0FBWXBCLElBQVosQ0FBaUIsS0FBS2dCLE1BQUwsQ0FBWStCLEtBQTdCO0FBQ0EsV0FBSzFCLElBQUwsQ0FBVXJCLElBQVYsQ0FBZSxLQUFLZ0IsTUFBTCxDQUFZbUQsR0FBM0I7QUFDQXpGLFFBQUUsVUFBRixFQUFjNEIsRUFBZCxDQUFpQixPQUFqQixFQUEwQixZQUFXO0FBQ25DLFlBQU0rRCxjQUFjRCxLQUFLcEQsTUFBTCxDQUFZK0IsS0FBWixHQUFvQnFCLEtBQUtwRCxNQUFMLENBQVltRCxHQUFwRDtBQUNBLFlBQUl6RixFQUFFLElBQUYsRUFBUTRGLFFBQVIsQ0FBaUIsT0FBakIsS0FBNkJELGVBQWUsRUFBaEQsRUFBb0Q7QUFDbERELGVBQUtwRCxNQUFMLENBQVltRCxHQUFaLElBQW1CLEVBQW5CO0FBQ0QsU0FGRCxNQUdLLElBQUl6RixFQUFFLElBQUYsRUFBUTRGLFFBQVIsQ0FBaUIsT0FBakIsS0FBNkJELGVBQWUsRUFBaEQsRUFBb0Q7QUFDdkRELGVBQUtwRCxNQUFMLENBQVltRCxHQUFaLElBQW1CLEVBQW5CO0FBQ0QsU0FGSSxNQUdBLElBQUl6RixFQUFFLElBQUYsRUFBUTRGLFFBQVIsQ0FBaUIsUUFBakIsS0FBOEJELGVBQWUsR0FBakQsRUFBc0Q7QUFDekRELGVBQUtwRCxNQUFMLENBQVltRCxHQUFaLElBQW1CLEdBQW5CO0FBQ0QsU0FGSSxNQUdBLElBQUl6RixFQUFFLElBQUYsRUFBUTRGLFFBQVIsQ0FBaUIsUUFBakIsS0FBOEJELGVBQWUsR0FBakQsRUFBc0Q7QUFDekRELGVBQUtwRCxNQUFMLENBQVltRCxHQUFaLElBQW1CLEdBQW5CO0FBQ0QsU0FGSSxNQUdBLElBQUl6RixFQUFFLElBQUYsRUFBUTRGLFFBQVIsQ0FBaUIsUUFBakIsQ0FBSixFQUFnQztBQUNuQ0YsZUFBS3BELE1BQUwsQ0FBWW1ELEdBQVosR0FBa0JDLEtBQUtwRCxNQUFMLENBQVkrQixLQUE5QjtBQUNELFNBRkksTUFHQSxJQUFJckUsRUFBRSxJQUFGLEVBQVE0RixRQUFSLENBQWlCLE9BQWpCLENBQUosRUFBK0I7QUFDbENGLGVBQUtwRCxNQUFMLENBQVltRCxHQUFaLEdBQWtCLEVBQWxCO0FBQ0Q7QUFDREMsYUFBSy9DLElBQUwsQ0FBVXJCLElBQVYsQ0FBZW9FLEtBQUtwRCxNQUFMLENBQVltRCxHQUEzQjtBQUNELE9BckJEO0FBc0JEOzs7MEJBRUtJLFMsRUFBVztBQUNmLFVBQUlBLGNBQWMsVUFBbEIsRUFBOEI7QUFDNUI3RixVQUFFLHdCQUFGLEVBQTRCb0IsV0FBNUIsQ0FBd0MsTUFBeEM7QUFDQXBCLFVBQUUsaUJBQUYsRUFBcUI4RixJQUFyQixDQUNFLDRCQUNFLFlBREYsR0FFRSxpQ0FISjtBQUtBOUYsVUFBRSxvQkFBRixFQUF3QnNCLElBQXhCLENBQTZCLFlBQTdCO0FBQ0F0QixVQUFFLG9CQUFGLEVBQXdCNEIsRUFBeEIsQ0FBMkIsT0FBM0IsRUFBb0MsWUFBVztBQUM3QzVCLFlBQUUsd0JBQUYsRUFBNEJtQixRQUE1QixDQUFxQyxNQUFyQztBQUNBbkIsWUFBRSxlQUFGLEVBQW1Ca0YsSUFBbkI7QUFDQVEsZUFBSzdELFNBQUw7QUFDQTZELGVBQUtLLFVBQUw7QUFDRCxTQUxEO0FBTUQsT0FkRCxNQWNPLElBQUlGLGNBQWMsTUFBbEIsRUFBMEI7QUFDL0I7QUFDRDtBQUNGOzs7NEJBRU9HLE0sRUFBUTtBQUNkLFdBQUtDLFdBQUw7O0FBRUEsVUFBSUQsV0FBVyxXQUFmLEVBQTRCO0FBQzFCLGFBQUszQixLQUFMLElBQWMsS0FBS0MsVUFBTCxHQUFrQixHQUFoQztBQUNBLGFBQUtoQixNQUFMLEdBQWMsS0FBS2dCLFVBQUwsR0FBa0IsR0FBaEM7QUFDRCxPQUhELE1BSUssSUFBSTBCLFdBQVcsS0FBZixFQUFzQjtBQUN6QixhQUFLM0IsS0FBTCxJQUFjLEtBQUtDLFVBQW5CO0FBQ0EsYUFBS2hCLE1BQUwsR0FBYyxLQUFLZ0IsVUFBbkI7QUFDRCxPQUhJLE1BSUEsSUFBSTBCLFdBQVcsTUFBZixFQUF1QjtBQUMxQixhQUFLNUIsYUFBTCxDQUFtQixNQUFuQjtBQUNBLGFBQUtDLEtBQUwsR0FBYSxLQUFLQSxLQUFsQjtBQUNBLGFBQUtmLE1BQUwsR0FBYyxDQUFkO0FBQ0QsT0FKSSxNQUtBLElBQUkwQyxXQUFXLE1BQWYsRUFBdUI7QUFDMUIsWUFBSSxLQUFLM0IsS0FBTCxHQUFhLEtBQUtDLFVBQWxCLElBQWdDLEVBQXBDLEVBQXdDO0FBQ3RDLGVBQUtELEtBQUwsSUFBYyxLQUFLQyxVQUFuQjtBQUNBLGVBQUtoQixNQUFMLEdBQWMsQ0FBQyxLQUFLZ0IsVUFBcEI7QUFDQTtBQUNBLGNBQUksS0FBS0EsVUFBTCxHQUFrQixLQUFLRCxLQUEzQixFQUFrQztBQUNoQyxpQkFBS0MsVUFBTCxHQUFrQixLQUFLRCxLQUF2QjtBQUNBckUsY0FBRSxhQUFGLEVBQWlCc0IsSUFBakIsQ0FBc0IsS0FBS2dELFVBQTNCO0FBQ0Q7QUFDRixTQVJELE1BU0s7QUFDSCxlQUFLNEIsS0FBTCxDQUFXLFVBQVg7QUFDRDtBQUNGO0FBQ0Y7OztnQ0FFVztBQUNWLFdBQUtwRSxRQUFMLEdBQWdCLG9CQUFoQjtBQUNBLFdBQUtTLFVBQUwsR0FBa0IsbUJBQVMsUUFBVCxDQUFsQjtBQUNBLFdBQUtDLFVBQUwsR0FBa0IsbUJBQVMsUUFBVCxFQUFtQixDQUFuQixDQUFsQjtBQUNBeEMsUUFBRSxXQUFGLEVBQWVtRyxLQUFmO0FBQ0FuRyxRQUFFLGNBQUYsRUFBa0JtRyxLQUFsQjtBQUNBbkcsUUFBRSxjQUFGLEVBQWtCbUcsS0FBbEI7QUFDQW5HLFFBQUUsZ0JBQUYsRUFBb0JtRyxLQUFwQjtBQUNBbkcsUUFBRSxnQkFBRixFQUFvQm1HLEtBQXBCO0FBQ0FuRyxRQUFFLFNBQUYsRUFBYW1HLEtBQWI7QUFDRDs7O2lDQUVZO0FBQ1gsV0FBSzlCLEtBQUwsR0FBYSxHQUFiO0FBQ0EsV0FBS0MsVUFBTCxHQUFrQixFQUFsQjtBQUNBdEUsUUFBRSxRQUFGLEVBQVlzQixJQUFaLENBQWlCLEtBQUsrQyxLQUF0QjtBQUNBckUsUUFBRSxhQUFGLEVBQWlCc0IsSUFBakIsQ0FBc0IsS0FBS2dELFVBQTNCO0FBQ0Q7Ozt3Q0FFMkI7QUFDMUIsVUFBSWEsb0JBQUo7O0FBRDBCLHlDQUFQVCxLQUFPO0FBQVBBLGFBQU87QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFFMUIsOEJBQWlCQSxLQUFqQixtSUFBd0I7QUFBQSxjQUFmakIsSUFBZTs7QUFDdEJBLGVBQUsyQyxlQUFMO0FBQ0EsY0FBSTNDLEtBQUt0RCxPQUFULEVBQWtCO0FBQ2hCZ0YsMEJBQWMxQixJQUFkO0FBQ0Q7QUFDRjtBQVB5QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQVExQixhQUFPMEIsV0FBUDtBQUNEOzs7NEJBRU87QUFDTixXQUFLMUMsV0FBTCxHQUFtQixJQUFuQjtBQUNBLFdBQUt3QyxPQUFMLENBQWEsS0FBS2hDLE1BQWxCOztBQUVBO0FBQ0EsV0FBS3FCLFVBQUwsR0FBa0IsS0FBS0EsVUFBTCxHQUFrQixDQUFwQztBQUNBdEUsUUFBRSxhQUFGLEVBQWlCc0IsSUFBakIsQ0FBc0IsS0FBS2dELFVBQTNCOztBQUVBO0FBQ0EsV0FBSytCLFdBQUw7QUFDQSxXQUFLakIsV0FBTCxHQUFtQixtQkFBUyxRQUFULEVBQW1CLENBQW5CLENBQW5CO0FBQ0EsVUFBSWtCLGNBQWMsS0FBSzlELFVBQUwsQ0FBZ0IrRCxVQUFoQixFQUFsQjtBQUNBLFdBQUtuQixXQUFMLENBQWlCeEIsT0FBakIsQ0FBeUIwQyxZQUFZaEcsSUFBckMsRUFBMkNnRyxZQUFZL0YsS0FBdkQ7QUFDQSxXQUFLMEQsV0FBTCxDQUFpQixLQUFLekIsVUFBdEI7QUFDQSxXQUFLeUIsV0FBTCxDQUFpQixLQUFLbUIsV0FBdEI7QUFDRDs7OzBCQUVLb0IsTSxFQUFRO0FBQ1osVUFBSSxDQUFDLEtBQUsvRCxXQUFWLEVBQXVCO0FBQ3JCLGFBQUt3QyxPQUFMLENBQWEsS0FBS25DLElBQWxCLEVBQXdCLEtBQUtDLE1BQTdCLEVBQXFDLEtBQUtDLFdBQTFDLEVBQXVELEtBQUtDLE1BQTVEO0FBQ0E7QUFDQSxZQUFJdUQsV0FBVyxhQUFmLEVBQThCO0FBQzVCLGVBQUtmLEdBQUwsR0FBVyxLQUFLQSxHQUFMLEdBQVcsQ0FBdEI7QUFDQXpGLFlBQUUsTUFBRixFQUFVc0IsSUFBVixDQUFlLEtBQUttRSxHQUFwQjtBQUNBLGVBQUtSLE9BQUwsQ0FBYSxLQUFLakMsV0FBbEI7QUFDRDtBQUNELGFBQUt5RCxVQUFMLENBQWdCLEtBQUtqRSxVQUFyQjtBQUNBLGFBQUs2QyxhQUFMLENBQW1CLEtBQUs3QyxVQUF4QjtBQUNELE9BVkQsTUFXSztBQUNILFlBQUkyQyxjQUFjLEtBQUtKLGlCQUFMLENBQXVCLEtBQUt2QyxVQUE1QixFQUF3QyxLQUFLNEMsV0FBN0MsQ0FBbEI7QUFDQSxZQUFJRCxnQkFBZ0IsS0FBSzNDLFVBQXpCLEVBQXFDO0FBQ25DLGVBQUtBLFVBQUwsQ0FBZ0JyQyxPQUFoQixHQUEwQixLQUExQjtBQUNBLGVBQUtpRixXQUFMLENBQWlCakYsT0FBakIsR0FBMkIsSUFBM0I7QUFDQSxlQUFLNEUsaUJBQUwsQ0FBdUIsS0FBS3ZDLFVBQTVCLEVBQXdDLEtBQUs0QyxXQUE3QztBQUNELFNBSkQsTUFLSyxJQUFJRCxnQkFBZ0IsS0FBS0MsV0FBekIsRUFBc0M7QUFDekMsZUFBS0EsV0FBTCxDQUFpQmpGLE9BQWpCLEdBQTJCLEtBQTNCO0FBQ0EsZUFBSzRFLGlCQUFMLENBQXVCLEtBQUt2QyxVQUE1QixFQUF3QyxLQUFLNEMsV0FBN0M7QUFDQSxlQUFLcUIsVUFBTCxDQUFnQixLQUFLakUsVUFBckIsRUFBaUMsS0FBSzRDLFdBQXRDO0FBQ0EsZUFBS0MsYUFBTCxDQUFtQixLQUFLN0MsVUFBeEIsRUFBb0MsS0FBSzRDLFdBQXpDO0FBQ0Q7QUFDRjtBQUNGOzs7b0NBRWU7QUFDZHBGLFFBQUUsZUFBRixFQUFtQjBHLElBQW5CO0FBQ0EsV0FBS0wsV0FBTDtBQUNBLFdBQUs5QixNQUFMLENBQVksS0FBS3pCLElBQWpCLEVBQXVCLEtBQUtDLE1BQTVCO0FBQ0EsV0FBS2tDLE9BQUwsQ0FBYSxLQUFLcEMsS0FBbEI7QUFDQTdDLFFBQUUsbUJBQUYsRUFBdUIwRyxJQUF2QjtBQUNBLFdBQUtsRSxVQUFMLENBQWdCckMsT0FBaEIsR0FBMEIsSUFBMUI7QUFDQSxXQUFLNEUsaUJBQUwsQ0FBdUIsS0FBS3ZDLFVBQTVCO0FBQ0Q7OztrQ0FFYW1FLE8sRUFBUztBQUNyQjNHLFFBQUUsV0FBRixFQUFlUyxNQUFmLFVBQTZCa0csT0FBN0I7QUFDRDs7Ozs7O2tCQW5ha0J0RSxJOzs7Ozs7Ozs7Ozs7Ozs7QUNKckI7Ozs7QUFDQTs7Ozs7Ozs7SUFFcUJ1RSxJO0FBQ25CLGtCQUFjO0FBQUE7O0FBQ1osU0FBS3hHLEtBQUwsR0FBYSxFQUFiO0FBQ0Q7Ozs7MkJBRU07QUFDTCxhQUFPLEtBQUtBLEtBQUwsQ0FBV1MsR0FBWCxFQUFQO0FBQ0Q7Ozs2QkFFUWdHLFEsRUFBVTtBQUNqQixVQUFJLENBQUNBLFFBQUwsRUFBZTtBQUNiQSxtQkFBVyxDQUFYO0FBQ0Q7QUFDRCxhQUFPQSxXQUFXLENBQWxCLEVBQXFCO0FBQ25CLGFBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxLQUFLLEVBQXJCLEVBQXlCQSxHQUF6QixFQUE4QjtBQUM1QixlQUFLMUcsS0FBTCxDQUFXSSxJQUFYLENBQWdCLG1CQUFTc0csQ0FBVCxFQUFZLFFBQVosQ0FBaEI7QUFDQSxlQUFLMUcsS0FBTCxDQUFXSSxJQUFYLENBQWdCLG1CQUFTc0csQ0FBVCxFQUFZLFVBQVosQ0FBaEI7QUFDQSxlQUFLMUcsS0FBTCxDQUFXSSxJQUFYLENBQWdCLG1CQUFTc0csQ0FBVCxFQUFZLFFBQVosQ0FBaEI7QUFDQSxlQUFLMUcsS0FBTCxDQUFXSSxJQUFYLENBQWdCLG1CQUFTc0csQ0FBVCxFQUFZLE9BQVosQ0FBaEI7QUFDRDtBQUNERDtBQUNEO0FBQ0Y7Ozs4QkFFUztBQUNSLFdBQUssSUFBSUMsSUFBSSxLQUFLMUcsS0FBTCxDQUFXbUYsTUFBWCxHQUFvQixDQUFqQyxFQUFvQ3VCLElBQUksQ0FBeEMsRUFBMkNBLEdBQTNDLEVBQWdEO0FBQzlDLFlBQU1DLElBQUl4RCxLQUFLeUQsS0FBTCxDQUFXekQsS0FBSzBELE1BQUwsTUFBaUJILElBQUksQ0FBckIsQ0FBWCxDQUFWO0FBRDhDLG1CQUU1QixDQUFDLEtBQUsxRyxLQUFMLENBQVcyRyxDQUFYLENBQUQsQ0FGNEI7QUFFN0MsYUFBSzNHLEtBQUwsQ0FBVzBHLENBQVgsQ0FGNkM7QUFHL0M7QUFDRjs7Ozs7O2tCQTdCa0JGLEk7Ozs7Ozs7Ozs7Ozs7OztJQ0hBTSxNLEdBQ3BCLGtCQUFjO0FBQUE7O0FBQ2IsTUFBSzdDLEtBQUwsR0FBYSxHQUFiO0FBQ0EsTUFBS29CLEdBQUwsR0FBVyxFQUFYO0FBQ0EsTUFBS25DLE1BQUw7QUFDQSxDOztrQkFMbUI0RCxNIiwiZmlsZSI6Ii4vanMvbWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDY3ZWY4MjMxMTA0ZGI2ZDcxMTEzIiwiaW1wb3J0IENhcmQgZnJvbSBcIi4vY2FyZFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGFuZCB7XHJcbiAgY29uc3RydWN0b3Iob3duZXIsIGhhbmROdW1iZXIpIHtcclxuICAgIGxldCBzZWxlY3RvcjtcclxuICAgIGlmIChvd25lciA9PT0gJ2RlYWxlcicpIHtcclxuICAgICAgc2VsZWN0b3IgPSBcIiNkZWFsZXJcIjtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKG93bmVyID09PSAncGxheWVyJykge1xyXG4gICAgICBpZiAoaGFuZE51bWJlciA9PT0gMSkge1xyXG4gICAgICAgIHNlbGVjdG9yID0gXCIjaGFuZDFcIjtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmIChoYW5kTnVtYmVyID09PSAyKSB7XHJcbiAgICAgICAgc2VsZWN0b3IgPSBcIiNoYW5kMlwiO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLiR3cmFwcGVyID0gJChgJHtzZWxlY3Rvcn1gKTtcclxuICAgIHRoaXMuJGhhbmQgPSAkKGAke3NlbGVjdG9yfSAuaGFuZGApO1xyXG4gICAgdGhpcy4kcG9pbnRzID0gJChgJHtzZWxlY3Rvcn0gLnBvaW50c2ApO1xyXG4gICAgdGhpcy5wbGF5aW5nID0gZmFsc2U7XHJcbiAgICB0aGlzLmNhcmRzID0gW107XHJcbiAgICB0aGlzLm91dGNvbWU7XHJcbiAgfVxyXG5cclxuICBhZGRDYXJkKGNhcmQsICRjYXJkKSB7XHJcbiAgICB0aGlzLmNhcmRzLnB1c2goY2FyZCk7XHJcbiAgICB0aGlzLiRoYW5kLmFwcGVuZCgkY2FyZCk7XHJcbiAgfVxyXG5cclxuICBjYW5TcGxpdCgpIHtcclxuICAgIHJldHVybiB0aGlzLmNhcmRzWzBdLnBvaW50ID09PSB0aGlzLmNhcmRzWzFdLnBvaW50O1xyXG4gIH1cclxuXHJcbiAgZ2V0UG9pbnRzKCkge1xyXG4gICAgbGV0IHRvdGFsID0gMDtcclxuICAgIGxldCBhY2VzID0gMDtcclxuICAgIGZvciAobGV0IGNhcmQgb2YgdGhpcy5jYXJkcykge1xyXG4gICAgICBsZXQgcG9pbnQgPSBjYXJkLnBvaW50O1xyXG4gICAgICBpZiAocG9pbnQgPT09IDEpIHtcclxuICAgICAgICB0b3RhbCArPSAxMDtcclxuICAgICAgICBhY2VzKys7XHJcbiAgICAgIH0gXHJcbiAgICAgIGVsc2UgaWYgKHBvaW50ID4gMTApIHtcclxuICAgICAgICBwb2ludCA9IDEwO1xyXG4gICAgICB9XHJcbiAgICAgIHRvdGFsICs9IHBvaW50O1xyXG4gICAgICB3aGlsZSAodG90YWwgPiAyMSAmJiBhY2VzID4gMCkge1xyXG4gICAgICAgIHRvdGFsIC09IDEwO1xyXG4gICAgICAgIGFjZXMtLTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRvdGFsO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlQ2FyZCgpIHtcclxuICAgIGxldCBjYXJkID0gdGhpcy5jYXJkcy5wb3AoKTtcclxuICAgIGxldCAkY2FyZCA9IHRoaXMuJGhhbmQuZmluZChcImltZzpsYXN0LWNoaWxkXCIpLnJlbW92ZSgpO1xyXG4gICAgcmV0dXJuIHtjYXJkLCAkY2FyZH07XHJcbiAgfVxyXG5cclxuICByZXZlYWxIb2xlKCkge1xyXG4gICAgdGhpcy4kaGFuZC5maW5kKCdpbWc6Zmlyc3QtY2hpbGQnKS5hdHRyKCdzcmMnLCB0aGlzLmNhcmRzWzBdLmdldEltYWdlVXJsKCkpO1xyXG4gIH1cclxuXHJcbiAgc2VlQ2FyZChpbmRleCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2FyZHNbaW5kZXggLSAxXTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZUhpZ2hsaWdodCgpIHtcclxuICAgIHRoaXMucGxheWluZyA/IHRoaXMuJHdyYXBwZXIuYWRkQ2xhc3MoXCJjdXJyZW50SGFuZFwiKSA6IHRoaXMuJHdyYXBwZXIucmVtb3ZlQ2xhc3MoXCJjdXJyZW50SGFuZFwiKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZURpc3BsYXkoY29udGVudCkge1xyXG4gICAgdGhpcy4kcG9pbnRzLnRleHQoY29udGVudCk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2hhbmQuanMiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJkIHtcclxuICBjb25zdHJ1Y3Rvcihwb2ludCwgc3VpdCkge1xyXG4gICAgdGhpcy5wb2ludCA9IHBvaW50O1xyXG4gICAgdGhpcy5zdWl0ID0gc3VpdDtcclxuICB9XHJcblxyXG4gIGdldEltYWdlVXJsKCkge1xyXG4gICAgbGV0IHZhbHVlID0gdGhpcy5wb2ludDtcclxuICAgIGlmICh0aGlzLnBvaW50ID09PSAxMSkge1xyXG4gICAgICB2YWx1ZSA9IFwiamFja1wiO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodGhpcy5wb2ludCA9PT0gMTIpIHtcclxuICAgICAgdmFsdWUgPSBcInF1ZWVuXCI7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0aGlzLnBvaW50ID09PSAxMykge1xyXG4gICAgICB2YWx1ZSA9IFwia2luZ1wiO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodGhpcy5wb2ludCA9PT0gMSkge1xyXG4gICAgICB2YWx1ZSA9IFwiYWNlXCI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYGltYWdlcy8ke3ZhbHVlfV9vZl8ke3RoaXMuc3VpdH0uc3ZnYDtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvY2FyZC5qcyIsImltcG9ydCBHYW1lIGZyb20gJy4vZ2FtZSc7XG5cbnZhciBjdXJyZW50R2FtZSA9IG5ldyBHYW1lO1xuXG5jdXJyZW50R2FtZS5tYWtlQmV0KCk7XG5cbiQoJy5kZWFsJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gIGN1cnJlbnRHYW1lLnJlc2V0R2FtZSgpO1xuICBjdXJyZW50R2FtZS5nYW1lRGVjay5nZW5lcmF0ZSgzKTtcbiAgY3VycmVudEdhbWUuZGVhbCgpO1xufSk7XG5cbiQoJy5oaXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgY3VycmVudEdhbWUuaGl0KCk7XG59KTtcblxuJCgnLnN0YW5kJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gIGN1cnJlbnRHYW1lLnN0YW5kKCk7XG59KTtcblxuJCgnLmRvdWJsZS1kb3duJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gIGN1cnJlbnRHYW1lLmRvdWJsZURvd24oKTtcbn0pO1xuXG4kKCcuc3BsaXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgY3VycmVudEdhbWUuc3BsaXQoKTtcbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvYXBwLmpzIiwiaW1wb3J0IEhhbmQgZnJvbSBcIi4vaGFuZFwiO1xyXG5pbXBvcnQgRGVjayBmcm9tIFwiLi9kZWNrXCI7XHJcbmltcG9ydCBXYWxsZXQgZnJvbSBcIi4vd2FsbGV0XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMud2FsbGV0ID0gbmV3IFdhbGxldDtcclxuICAgIHRoaXMuZ2FtZURlY2sgPSBuZXcgRGVjaztcclxuICAgIHRoaXMuZGVhbGVySGFuZCA9IG5ldyBIYW5kKCdkZWFsZXInKTtcclxuICAgIHRoaXMucGxheWVySGFuZCA9IG5ldyBIYW5kKCdwbGF5ZXInLCAxKTtcclxuICAgIHRoaXMuc3BsaXRJblBsYXkgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLiR0b3RhbCA9ICQoXCIudG90YWxcIik7XHJcbiAgICB0aGlzLiRiZXQgPSAkKFwiLmN1cnJlbnRCZXRcIik7XHJcbiAgICB0aGlzLiRjaGFuZ2UgPSAkKFwiLmNoYW5nZVwiKTtcclxuICAgIFxyXG4gICAgdGhpcy4kZGVhbCA9ICQoXCIuZGVhbFwiKTtcclxuICAgIHRoaXMuJGhpdCA9ICQoXCIuaGl0XCIpO1xyXG4gICAgdGhpcy4kc3RhbmQgPSAkKFwiLnN0YW5kXCIpO1xyXG4gICAgdGhpcy4kZG91YmxlRG93biA9ICQoXCIuZG91YmxlLWRvd25cIik7XHJcbiAgICB0aGlzLiRzcGxpdCA9ICQoXCIuc3BsaXRcIik7XHJcbiAgfVxyXG5cclxuICBhZGp1c3RTcGFjZSgpIHtcclxuICAgIGxldCBzaXplO1xyXG4gICAgdGhpcy5zcGxpdEluUGxheSA/IHNpemUgPSA1MCA6IHNpemUgPSAxMDA7XHJcbiAgICAkKFwiLnBsYXllckhhbmQtZGl2XCIpLmNzcyhcIndpZHRoXCIsIGAke3NpemV9JWApO1xyXG4gIH1cclxuXHJcbiAgYXNzZXNzQ2hhbmdlKCkge1xyXG4gICAgbGV0IGNsYXNzTmFtZSA9IFwiXCI7XHJcbiAgICBsZXQgc3ltYm9sID0gXCJcIjtcclxuICAgIGlmICh0aGlzLmNoYW5nZSA+IDApIHtcclxuICAgICAgY2xhc3NOYW1lID0gXCJwb3NpdGl2ZVwiO1xyXG4gICAgICBzeW1ib2wgPSBcIitcIjtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXMuY2hhbmdlIDwgMCkge1xyXG4gICAgICBjbGFzc05hbWUgPSBcIm5lZ2F0aXZlXCI7XHJcbiAgICAgIHN5bWJvbCA9IFwiLVwiO1xyXG4gICAgfVxyXG4gICAgdGhpcy4kY2hhbmdlLmFwcGVuZChgPHNwYW4gY2xhc3M9XCIke2NsYXNzTmFtZX1cIj4ke3N5bWJvbH0gJCR7TWF0aC5hYnModGhpcy5jaGFuZ2UpfTwvc3Bhbj5gKTtcclxuICB9XHJcblxyXG4gIGRlYWxPbmVDYXJkKGhhbmQsIHNwZWNpYWwpIHtcclxuICAgIGxldCBjYXJkID0gdGhpcy5nYW1lRGVjay5kcmF3KCk7XHJcbiAgICBsZXQgJGNhcmQgPSAkKFwiPGltZyAvPlwiLCB7XHJcbiAgICAgIFwiY2xhc3NcIjogXCJjYXJkXCIsIFxyXG4gICAgICBcInNyY1wiOiBgJHtjYXJkLmdldEltYWdlVXJsKCl9YFxyXG4gICAgfSk7XHJcbiAgICBpZiAoc3BlY2lhbCA9PT0gXCJob2xlXCIpIHtcclxuICAgICAgJGNhcmQuYXR0cignc3JjJywgXCJpbWFnZXMvYmFjay1zdWl0cy1yZWQuc3ZnXCIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoc3BlY2lhbCA9PT0gXCJkb3VibGUtZG93blwiKSB7XHJcbiAgICAgICRjYXJkLmFkZENsYXNzKCdjYXJkLWRkJyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChzcGVjaWFsID09PSBcInNwbGl0XCIpIHtcclxuICAgICAgJGNhcmQuYWRkQ2xhc3MoJ3NwbGl0Jyk7XHJcbiAgICB9XHJcbiAgICBoYW5kLmFkZENhcmQoY2FyZCwgJGNhcmQpO1xyXG4gICAgaGFuZC51cGRhdGVEaXNwbGF5KGhhbmQuZ2V0UG9pbnRzKCkpO1xyXG4gICAgcmV0dXJuIGhhbmQuZ2V0UG9pbnRzKCk7XHJcbiAgfVxyXG5cclxuICBkZWFsKCkge1xyXG4gICAgdGhpcy5zdGFydEdhbWVNb2RlKCk7XHJcbiAgICB0aGlzLmdhbWVEZWNrLnNodWZmbGUoKTtcclxuICAgIHRoaXMuZGVhbE9uZUNhcmQodGhpcy5kZWFsZXJIYW5kLCBcImhvbGVcIik7XHJcbiAgICB0aGlzLmRlYWxPbmVDYXJkKHRoaXMucGxheWVySGFuZCk7XHJcbiAgICBsZXQgZGVhbGVyUG9pbnRzID0gdGhpcy5kZWFsT25lQ2FyZCh0aGlzLmRlYWxlckhhbmQpO1xyXG4gICAgbGV0IHBsYXllclBvaW50cyA9IHRoaXMuZGVhbE9uZUNhcmQodGhpcy5wbGF5ZXJIYW5kKTtcclxuICAgIHRoaXMuZGVhbGVySGFuZC51cGRhdGVEaXNwbGF5KFwiP1wiKTsgLy8gY29uY2VhbCBkZWFsZXIgdG90YWxcclxuXHJcbiAgICBpZiAoZGVhbGVyUG9pbnRzID09PSAyMSAmJiBwbGF5ZXJQb2ludHMgPT09IDIxKSB7XHJcbiAgICAgIHRoaXMub3V0Y29tZShcInB1c2hcIik7XHJcbiAgICAgIHRoaXMuZGVhbGVySGFuZC51cGRhdGVEaXNwbGF5KFwiQmxhY2tqYWNrXCIpO1xyXG4gICAgICB0aGlzLnBsYXllckhhbmQudXBkYXRlRGlzcGxheShcIkJMQUNLSkFDSywgSE9UIERBTU4hXCIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoZGVhbGVyUG9pbnRzID09PSAyMSkge1xyXG4gICAgICB0aGlzLm91dGNvbWUoXCJsb3NlXCIpO1xyXG4gICAgICB0aGlzLmRlYWxlckhhbmQudXBkYXRlRGlzcGxheShcIkJsYWNramFja1wiKTtcclxuICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiRGVhbGVyIHdpbnNcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChwbGF5ZXJQb2ludHMgPT09IDIxKSB7XHJcbiAgICAgIHRoaXMub3V0Y29tZShcImJsYWNramFja1wiKTtcclxuICAgICAgdGhpcy5kZWFsZXJIYW5kLnVwZGF0ZURpc3BsYXkoZGVhbGVyUG9pbnRzKTtcclxuICAgICAgdGhpcy5wbGF5ZXJIYW5kLnVwZGF0ZURpc3BsYXkoXCJCTEFDS0pBQ0ssIEhPVCBEQU1OIVwiKTtcclxuICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiWW91IHdpbiFcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0aGlzLm1vbmV5ID4gdGhpcy5jdXJyZW50QmV0ICogMikge1xyXG4gICAgICBpZiAocGxheWVyUG9pbnRzID09PSAxMSkgIHtcclxuICAgICAgICB0aGlzLmVuYWJsZSh0aGlzLiRkb3VibGVEb3duKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5wbGF5ZXJIYW5kLmNhblNwbGl0KCkpIHtcclxuICAgICAgICB0aGlzLmVuYWJsZSh0aGlzLiRzcGxpdCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRlYWxlclR1cm4oLi4uaGFuZHMpIHtcclxuICAgIHRoaXMuZGVhbGVySGFuZC5yZXZlYWxIb2xlKCk7XHJcbiAgICB3aGlsZSAodGhpcy5kZWFsZXJIYW5kLmdldFBvaW50cygpIDwgMTcpIHtcclxuICAgICAgdGhpcy5kZWFsT25lQ2FyZCh0aGlzLmRlYWxlckhhbmQpO1xyXG4gICAgfVxyXG4gICAgaGFuZHMuZm9yRWFjaChoYW5kID0+IHt0aGlzLmV2YWx1YXRlSGFuZChoYW5kKX0pO1xyXG4gIH1cclxuXHJcbiAgZGlzYWJsZSguLi5lbGVtZW50cykge1xyXG4gICAgZm9yIChsZXQgZWxlbWVudCBvZiBlbGVtZW50cykge1xyXG4gICAgICBlbGVtZW50LmF0dHIoXCJkaXNhYmxlZFwiLCB0cnVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRvdWJsZURvd24oKSB7XHJcbiAgICAvLyBkb3VibGUgYmV0IGFuZCBkaXNwbGF5IGl0XHJcbiAgICB0aGlzLmN1cnJlbnRCZXQgKj0gMjtcclxuICAgICQoXCIuY3VycmVudEJldFwiKS50ZXh0KHRoaXMuY3VycmVudEJldCk7XHJcbiAgICAvLyBkZWFsIHRoZSBwbGF5ZXIgb25lIG1vcmUgY2FyZCBhbmQgdGhlbiBtb3ZlIG9uIHRvIHRoZSBkZWFsZXIncyB0dXJuXHJcbiAgICB0aGlzLmRlYWxPbmVDYXJkKHRoaXMucGxheWVySGFuZCwgXCJkb3VibGUtZG93blwiKTtcclxuICAgIHRoaXMuc3RhbmQoXCJkb3VibGUtZG93blwiKTtcclxuICB9XHJcblxyXG4gIGVuYWJsZSguLi5lbGVtZW50cykge1xyXG4gICAgZm9yIChsZXQgZWxlbWVudCBvZiBlbGVtZW50cykge1xyXG4gICAgICBlbGVtZW50LmF0dHIoXCJkaXNhYmxlZFwiLCBmYWxzZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBlbmRHYW1lTW9kZSgpIHtcclxuICAgIHRoaXMucGxheWVySGFuZC5wbGF5aW5nID0gZmFsc2U7XHJcbiAgICB0aGlzLnNlbGVjdEN1cnJlbnRIYW5kKHRoaXMucGxheWVySGFuZCk7XHJcbiAgICB0aGlzLmRlYWxlckhhbmQucmV2ZWFsSG9sZSgpO1xyXG4gICAgdGhpcy5kZWFsZXJIYW5kLnVwZGF0ZURpc3BsYXkodGhpcy5kZWFsZXJIYW5kLmdldFBvaW50cygpKTtcclxuXHJcbiAgICAkKFwiLnRvdGFsXCIpLnRleHQodGhpcy5tb25leSk7XHJcbiAgICB0aGlzLmFzc2Vzc0NoYW5nZSgpO1xyXG4gICAgdGhpcy5lbmFibGUodGhpcy4kZGVhbCk7XHJcbiAgICB0aGlzLmRpc2FibGUodGhpcy4kaGl0LCB0aGlzLiRzdGFuZCk7XHJcbiAgICAkKFwiLmJldHRpbmcgLmJ1dHRvbnNcIikuc2hvdygpO1xyXG4gIH1cclxuXHJcbiAgZXZhbHVhdGVIYW5kKGhhbmQpIHtcclxuICAgIGxldCBkZWFsZXJQb2ludHMgPSB0aGlzLmRlYWxlckhhbmQuZ2V0UG9pbnRzKCk7XHJcbiAgICBsZXQgcGxheWVyUG9pbnRzID0gaGFuZC5nZXRQb2ludHMoKTtcclxuICAgIGlmIChkZWFsZXJQb2ludHMgPiAyMSB8fCBwbGF5ZXJQb2ludHMgPiBkZWFsZXJQb2ludHMpIHtcclxuICAgICAgaGFuZC5vdXRjb21lID0gXCJ3aW5cIjtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHBsYXllclBvaW50cyA8IGRlYWxlclBvaW50cykge1xyXG4gICAgICBoYW5kLm91dGNvbWUgPSBcImxvc2VcIjtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBoYW5kLm91dGNvbWUgPSBcInB1c2hcIjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGhpdCgpIHtcclxuICAgIHRoaXMuZGlzYWJsZSh0aGlzLiRkb3VibGVEb3duLCB0aGlzLiRzcGxpdCk7XHJcbiAgICBpZiAoIXRoaXMuc3BsaXRJblBsYXkpIHtcclxuICAgICAgbGV0IHBsYXllclBvaW50cyA9IHRoaXMuZGVhbE9uZUNhcmQodGhpcy5wbGF5ZXJIYW5kKTtcclxuICAgICAgaWYgKHBsYXllclBvaW50cyA+IDIxKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiWW91IGJ1c3RcIik7XHJcbiAgICAgICAgdGhpcy5vdXRjb21lKFwibG9zZVwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIGxldCBjdXJyZW50SGFuZCA9IHRoaXMuc2VsZWN0Q3VycmVudEhhbmQodGhpcy5wbGF5ZXJIYW5kLCB0aGlzLnBsYXllckhhbmQyKTtcclxuICAgICAgbGV0IHBsYXllclBvaW50cyA9IHRoaXMuZGVhbE9uZUNhcmQoY3VycmVudEhhbmQsIFwic3BsaXRcIik7XHJcbiAgICAgIGlmIChwbGF5ZXJQb2ludHMgPiAyMSkge1xyXG4gICAgICAgIGlmIChjdXJyZW50SGFuZCA9PT0gdGhpcy5wbGF5ZXJIYW5kKSB7XHJcbiAgICAgICAgICB0aGlzLnBsYXllckhhbmQub3V0Y29tZSA9IFwibG9zZVwiO1xyXG4gICAgICAgICAgdGhpcy5wbGF5ZXJIYW5kLnBsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMucGxheWVySGFuZDIucGxheWluZyA9IHRydWU7XHJcbiAgICAgICAgICB0aGlzLnNlbGVjdEN1cnJlbnRIYW5kKHRoaXMucGxheWVySGFuZCwgdGhpcy5wbGF5ZXJIYW5kMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGN1cnJlbnRIYW5kID09PSB0aGlzLnBsYXllckhhbmQyKSB7XHJcbiAgICAgICAgICB0aGlzLnBsYXllckhhbmQyLm91dGNvbWUgPSBcImxvc2VcIjtcclxuICAgICAgICAgIHRoaXMucGxheWVySGFuZDIucGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5zZWxlY3RDdXJyZW50SGFuZCh0aGlzLnBsYXllckhhbmQsIHRoaXMucGxheWVySGFuZDIpO1xyXG4gICAgICAgICAgdGhpcy5pbnZva2VPdXRjb21lKHRoaXMucGxheWVySGFuZCwgdGhpcy5wbGF5ZXJIYW5kMik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpbnZva2VPdXRjb21lKC4uLmhhbmRzKSB7XHJcbiAgICBsZXQgaGFuZDEgPSBoYW5kc1swXS5vdXRjb21lO1xyXG4gICAgaWYgKGhhbmRzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICBpZiAoaGFuZDEgPT09IFwid2luXCIpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJZb3Ugd2luIVwiKTtcclxuICAgICAgICB0aGlzLm91dGNvbWUoXCJ3aW5cIik7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAoaGFuZDEgPT09IFwibG9zZVwiKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiRGVhbGVyIHdpbnNcIik7XHJcbiAgICAgICAgdGhpcy5vdXRjb21lKFwibG9zZVwiKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICB0aGlzLm91dGNvbWUoXCJwdXNoXCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChoYW5kcy5sZW5ndGggPT09IDIpIHtcclxuICAgICAgbGV0IGhhbmQyID0gaGFuZHNbMV0ub3V0Y29tZTtcclxuICAgICAgaWYgKGhhbmQxID09PSBoYW5kMikge1xyXG4gICAgICAgIGlmIChoYW5kMSA9PT0gXCJibGFja2phY2tcIiAmJiBoYW5kMiA9PT0gXCJibGFja2phY2tcIikge1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiVFdPIEJMQUNLSkFDS1MhISFcIik7XHJcbiAgICAgICAgICB0aGlzLm91dGNvbWUoXCJibGFja2phY2tcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGhhbmQxID09PSBcIndpblwiICYmIGhhbmQyID09PSBcIndpblwiKSB7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJZb3Ugd2luIGJvdGghXCIpO1xyXG4gICAgICAgICAgdGhpcy5vdXRjb21lKFwid2luXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChoYW5kMSA9PT0gXCJsb3NlXCIgJiYgaGFuZDIgPT09IFwibG9zZVwiKSB7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJEZWFsZXIgd2lucyBib3RoXCIpO1xyXG4gICAgICAgICAgdGhpcy5vdXRjb21lKFwibG9zZVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLm91dGNvbWUoXCJwdXNoXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICB0aGlzLmN1cnJlbnRCZXQgLz0gMjtcclxuICAgICAgICBpZiAoaGFuZDEgPT09IFwiYmxhY2tqYWNrXCIgfHwgaGFuZDIgPT09IFwiYmxhY2tqYWNrXCIpIHtcclxuICAgICAgICAgIC8vIGNhbGN1bGF0ZSBjb21iaW5lZCBvdXRjb21lcyBiZWZvcmUgY2FsbGluZyB0aGUgb3V0Y29tZSBtZXRob2RcclxuICAgICAgICAgIGxldCBiZXQgPSBjdXJyZW50QmV0O1xyXG4gICAgICAgICAgdGhpcy5jdXJyZW50QmV0ICo9IDEuNTtcclxuICAgICAgICAgIGlmIChoYW5kMSA9PT0gXCJ3aW5cIiB8fCBoYW5kMiA9PT0gXCJ3aW5cIikge1xyXG4gICAgICAgICAgICB0aGlzLm91dGNvbWUoXCJ3aW5cIik7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEJldCArPSBiZXQ7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIllvdSB3aW4gYm90aCFcIik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNlIGlmIChoYW5kMSA9PT0gXCJsb3NlXCIgfHwgaGFuZDIgPT09IFwibG9zZVwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3V0Y29tZShcIndpblwiKTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50QmV0IC09IGJldDtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiWW91IGFuZCBkZWFsZXIgZWFjaCB3aW4gb25lXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMub3V0Y29tZShcIndpblwiKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiWW91IHdpbiBvbmUsIHB1c2hcIik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGhhbmQxID09PSBcIndpblwiIHx8IGhhbmQyID09PSBcIndpblwiKSB7XHJcbiAgICAgICAgICBpZiAoaGFuZDEgPT09IFwicHVzaFwiIHx8IGhhbmQyID09PSBcInB1c2hcIikge1xyXG4gICAgICAgICAgICB0aGlzLm91dGNvbWUoXCJ3aW5cIik7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIllvdSB3aW4gb25lLCBwdXNoXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMub3V0Y29tZShcInB1c2hcIik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGhhbmQxID09PSBcImxvc2VcIiB8fCBoYW5kMiA9PT0gXCJsb3NlXCIpIHtcclxuICAgICAgICAgIHRoaXMub3V0Y29tZShcImxvc2VcIik7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJEZWFsZXIgd2lucyBvbmUsIHB1c2hcIilcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zcGxpdEluUGxheSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbWFrZUJldCgpIHtcclxuICAgIGNvbnN0IGdhbWUgPSB0aGlzO1xyXG4gICAgdGhpcy4kdG90YWwudGV4dCh0aGlzLndhbGxldC5tb25leSk7XHJcbiAgICB0aGlzLiRiZXQudGV4dCh0aGlzLndhbGxldC5iZXQpO1xyXG4gICAgJChcIi5iZXQtYnRuXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgIGNvbnN0IHBvc3NpYmxlQmV0ID0gZ2FtZS53YWxsZXQubW9uZXkgLSBnYW1lLndhbGxldC5iZXQ7XHJcbiAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKFwiYWRkMTBcIikgJiYgcG9zc2libGVCZXQgPj0gMTApIHtcclxuICAgICAgICBnYW1lLndhbGxldC5iZXQgKz0gMTA7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAoJCh0aGlzKS5oYXNDbGFzcyhcImFkZDUwXCIpICYmIHBvc3NpYmxlQmV0ID49IDUwKSB7XHJcbiAgICAgICAgZ2FtZS53YWxsZXQuYmV0ICs9IDUwO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKCQodGhpcykuaGFzQ2xhc3MoXCJhZGQxMDBcIikgJiYgcG9zc2libGVCZXQgPj0gMTAwKSB7XHJcbiAgICAgICAgZ2FtZS53YWxsZXQuYmV0ICs9IDEwMDtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmICgkKHRoaXMpLmhhc0NsYXNzKFwiYWRkNTAwXCIpICYmIHBvc3NpYmxlQmV0ID49IDUwMCkge1xyXG4gICAgICAgIGdhbWUud2FsbGV0LmJldCArPSA1MDA7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAoJCh0aGlzKS5oYXNDbGFzcyhcImFsbC1pblwiKSkge1xyXG4gICAgICAgIGdhbWUud2FsbGV0LmJldCA9IGdhbWUud2FsbGV0Lm1vbmV5O1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKCQodGhpcykuaGFzQ2xhc3MoXCJyZXNldFwiKSkge1xyXG4gICAgICAgIGdhbWUud2FsbGV0LmJldCA9IDEwO1xyXG4gICAgICB9XHJcbiAgICAgIGdhbWUuJGJldC50ZXh0KGdhbWUud2FsbGV0LmJldCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG1vZGFsKG1vZGFsVHlwZSkge1xyXG4gICAgaWYgKG1vZGFsVHlwZSA9PT0gXCJiYW5rcnVwdFwiKSB7XHJcbiAgICAgICQoXCIubW9kYWwsIC5tb2RhbC1vdmVybGF5XCIpLnJlbW92ZUNsYXNzKFwiaGlkZVwiKTtcclxuICAgICAgJChcIi5tb2RhbCAubWVzc2FnZVwiKS5odG1sKFxyXG4gICAgICAgIFwiWW91J3ZlIGxvc3QgZXZlcnl0aGluZy5cIiArXHJcbiAgICAgICAgICBcIjxici8+PGJyLz5cIiArXHJcbiAgICAgICAgICBcIkdvb2QgdGhpbmcgaXQncyBub3QgcmVhbCBtb25leSFcIlxyXG4gICAgICApO1xyXG4gICAgICAkKFwiLm1vZGFsLWd1dHMgYnV0dG9uXCIpLnRleHQoXCJQbGF5IGFnYWluXCIpO1xyXG4gICAgICAkKFwiLm1vZGFsLWd1dHMgYnV0dG9uXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJChcIi5tb2RhbCwgLm1vZGFsLW92ZXJsYXlcIikuYWRkQ2xhc3MoXCJoaWRlXCIpO1xyXG4gICAgICAgICQoXCIudGl0bGUtc2NyZWVuXCIpLnNob3coKTtcclxuICAgICAgICBnYW1lLnJlc2V0R2FtZSgpO1xyXG4gICAgICAgIGdhbWUucmVzZXRNb25leSgpO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSBpZiAobW9kYWxUeXBlID09PSBcImhlbHBcIikge1xyXG4gICAgICAvLyBmdXR1cmUgZ2FtZSBmZWF0dXJlOiBpbnN0cnVjdGlvbnMgYXZhaWxhYmxlIGluIGhlbHAgbW9kYWxcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG91dGNvbWUocmVzdWx0KSB7XHJcbiAgICB0aGlzLmVuZEdhbWVNb2RlKCk7XHJcblxyXG4gICAgaWYgKHJlc3VsdCA9PT0gXCJibGFja2phY2tcIikge1xyXG4gICAgICB0aGlzLm1vbmV5ICs9IHRoaXMuY3VycmVudEJldCAqIDEuNTtcclxuICAgICAgdGhpcy5jaGFuZ2UgPSB0aGlzLmN1cnJlbnRCZXQgKiAxLjU7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChyZXN1bHQgPT09IFwid2luXCIpIHtcclxuICAgICAgdGhpcy5tb25leSArPSB0aGlzLmN1cnJlbnRCZXQ7XHJcbiAgICAgIHRoaXMuY2hhbmdlID0gdGhpcy5jdXJyZW50QmV0O1xyXG4gICAgfSBcclxuICAgIGVsc2UgaWYgKHJlc3VsdCA9PT0gXCJwdXNoXCIpIHtcclxuICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiUHVzaFwiKTtcclxuICAgICAgdGhpcy5tb25leSA9IHRoaXMubW9uZXk7XHJcbiAgICAgIHRoaXMuY2hhbmdlID0gMDtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHJlc3VsdCA9PT0gXCJsb3NlXCIpIHtcclxuICAgICAgaWYgKHRoaXMubW9uZXkgLSB0aGlzLmN1cnJlbnRCZXQgPj0gMTApIHtcclxuICAgICAgICB0aGlzLm1vbmV5IC09IHRoaXMuY3VycmVudEJldDtcclxuICAgICAgICB0aGlzLmNoYW5nZSA9IC10aGlzLmN1cnJlbnRCZXQ7XHJcbiAgICAgICAgLy8gZHJvcCB0aGUgYmV0IGFtb3VudCBkb3duIHRvIGVxdWFsIG1vbmV5IGFtb3VudCBvZiBsYXN0IGJldCB2YWx1ZSBpcyBncmVhdGVyIHRoYW4gdG90YWwgbW9uZXkgdmFsdWVcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50QmV0ID4gdGhpcy5tb25leSkge1xyXG4gICAgICAgICAgdGhpcy5jdXJyZW50QmV0ID0gdGhpcy5tb25leTtcclxuICAgICAgICAgICQoXCIuY3VycmVudEJldFwiKS50ZXh0KHRoaXMuY3VycmVudEJldCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IFxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICB0aGlzLm1vZGFsKFwiYmFua3J1cHRcIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlc2V0R2FtZSgpIHtcclxuICAgIHRoaXMuZ2FtZURlY2sgPSBuZXcgRGVjaztcclxuICAgIHRoaXMuZGVhbGVySGFuZCA9IG5ldyBIYW5kKFwiZGVhbGVyXCIpO1xyXG4gICAgdGhpcy5wbGF5ZXJIYW5kID0gbmV3IEhhbmQoXCJwbGF5ZXJcIiwgMSk7XHJcbiAgICAkKFwiLm1lc3NhZ2VzXCIpLmVtcHR5KCk7XHJcbiAgICAkKFwiLnBsYXllci1oYW5kXCIpLmVtcHR5KCk7XHJcbiAgICAkKFwiLmRlYWxlci1oYW5kXCIpLmVtcHR5KCk7XHJcbiAgICAkKFwiLnBsYXllci1wb2ludHNcIikuZW1wdHkoKTtcclxuICAgICQoXCIuZGVhbGVyLXBvaW50c1wiKS5lbXB0eSgpO1xyXG4gICAgJChcIi5jaGFuZ2VcIikuZW1wdHkoKTtcclxuICB9XHJcblxyXG4gIHJlc2V0TW9uZXkoKSB7XHJcbiAgICB0aGlzLm1vbmV5ID0gNTAwO1xyXG4gICAgdGhpcy5jdXJyZW50QmV0ID0gMTA7XHJcbiAgICAkKFwiLnRvdGFsXCIpLnRleHQodGhpcy5tb25leSk7XHJcbiAgICAkKFwiLmN1cnJlbnRCZXRcIikudGV4dCh0aGlzLmN1cnJlbnRCZXQpO1xyXG4gIH1cclxuXHJcbiAgc2VsZWN0Q3VycmVudEhhbmQoLi4uaGFuZHMpIHtcclxuICAgIGxldCBjdXJyZW50SGFuZDtcclxuICAgIGZvciAobGV0IGhhbmQgb2YgaGFuZHMpIHtcclxuICAgICAgaGFuZC50b2dnbGVIaWdobGlnaHQoKTtcclxuICAgICAgaWYgKGhhbmQucGxheWluZykge1xyXG4gICAgICAgIGN1cnJlbnRIYW5kID0gaGFuZDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGN1cnJlbnRIYW5kO1xyXG4gIH1cclxuXHJcbiAgc3BsaXQoKSB7XHJcbiAgICB0aGlzLnNwbGl0SW5QbGF5ID0gdHJ1ZTtcclxuICAgIHRoaXMuZGlzYWJsZSh0aGlzLiRzcGxpdCk7XHJcblxyXG4gICAgLy8gZG91YmxlIGJldCBhbmQgZGlzcGxheSBpdFxyXG4gICAgdGhpcy5jdXJyZW50QmV0ID0gdGhpcy5jdXJyZW50QmV0ICogMjtcclxuICAgICQoXCIuY3VycmVudEJldFwiKS50ZXh0KHRoaXMuY3VycmVudEJldCk7XHJcblxyXG4gICAgLy8gc3RhcnQgYWRkaXRpb25hbCBoYW5kIGFuZCBtb3ZlIG9uZSBjYXJkIGZyb20gaGFuZCAxIHRvIGhhbmQgMlxyXG4gICAgdGhpcy5hZGp1c3RTcGFjZSgpO1xyXG4gICAgdGhpcy5wbGF5ZXJIYW5kMiA9IG5ldyBIYW5kKFwicGxheWVyXCIsIDIpO1xyXG4gICAgbGV0IHJlbW92ZWRDYXJkID0gdGhpcy5wbGF5ZXJIYW5kLnJlbW92ZUNhcmQoKTtcclxuICAgIHRoaXMucGxheWVySGFuZDIuYWRkQ2FyZChyZW1vdmVkQ2FyZC5jYXJkLCByZW1vdmVkQ2FyZC4kY2FyZCk7XHJcbiAgICB0aGlzLmRlYWxPbmVDYXJkKHRoaXMucGxheWVySGFuZCk7XHJcbiAgICB0aGlzLmRlYWxPbmVDYXJkKHRoaXMucGxheWVySGFuZDIpO1xyXG4gIH1cclxuXHJcbiAgc3RhbmQoY2FsbGVyKSB7XHJcbiAgICBpZiAoIXRoaXMuc3BsaXRJblBsYXkpIHtcclxuICAgICAgdGhpcy5kaXNhYmxlKHRoaXMuJGhpdCwgdGhpcy4kc3RhbmQsIHRoaXMuJGRvdWJsZURvd24sIHRoaXMuJHNwbGl0KTtcclxuICAgICAgLy8gaWYgc3RhbmQgd2FzIGNhbGxlZCBieSBjbGlja2luZyAnZG91YmxlIGRvd24nLCBkbyBhZGRpdGlvbmFsIHdvcmtcclxuICAgICAgaWYgKGNhbGxlciA9PT0gXCJkb3VibGUtZG93blwiKSB7XHJcbiAgICAgICAgdGhpcy5iZXQgPSB0aGlzLmJldCAvIDI7XHJcbiAgICAgICAgJChcIi5iZXRcIikudGV4dCh0aGlzLmJldCk7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlKHRoaXMuJGRvdWJsZURvd24pO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuZGVhbGVyVHVybih0aGlzLnBsYXllckhhbmQpO1xyXG4gICAgICB0aGlzLmludm9rZU91dGNvbWUodGhpcy5wbGF5ZXJIYW5kKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBsZXQgY3VycmVudEhhbmQgPSB0aGlzLnNlbGVjdEN1cnJlbnRIYW5kKHRoaXMucGxheWVySGFuZCwgdGhpcy5wbGF5ZXJIYW5kMik7XHJcbiAgICAgIGlmIChjdXJyZW50SGFuZCA9PT0gdGhpcy5wbGF5ZXJIYW5kKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJIYW5kLnBsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBsYXllckhhbmQyLnBsYXlpbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0Q3VycmVudEhhbmQodGhpcy5wbGF5ZXJIYW5kLCB0aGlzLnBsYXllckhhbmQyKTtcclxuICAgICAgfSBcclxuICAgICAgZWxzZSBpZiAoY3VycmVudEhhbmQgPT09IHRoaXMucGxheWVySGFuZDIpIHtcclxuICAgICAgICB0aGlzLnBsYXllckhhbmQyLnBsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNlbGVjdEN1cnJlbnRIYW5kKHRoaXMucGxheWVySGFuZCwgdGhpcy5wbGF5ZXJIYW5kMik7XHJcbiAgICAgICAgdGhpcy5kZWFsZXJUdXJuKHRoaXMucGxheWVySGFuZCwgdGhpcy5wbGF5ZXJIYW5kMik7XHJcbiAgICAgICAgdGhpcy5pbnZva2VPdXRjb21lKHRoaXMucGxheWVySGFuZCwgdGhpcy5wbGF5ZXJIYW5kMik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXJ0R2FtZU1vZGUoKSB7XHJcbiAgICAkKFwiLnRpdGxlLXNjcmVlblwiKS5oaWRlKCk7XHJcbiAgICB0aGlzLmFkanVzdFNwYWNlKCk7XHJcbiAgICB0aGlzLmVuYWJsZSh0aGlzLiRoaXQsIHRoaXMuJHN0YW5kKTtcclxuICAgIHRoaXMuZGlzYWJsZSh0aGlzLiRkZWFsKTtcclxuICAgICQoXCIuYmV0dGluZyAuYnV0dG9uc1wiKS5oaWRlKCk7XHJcbiAgICB0aGlzLnBsYXllckhhbmQucGxheWluZyA9IHRydWU7XHJcbiAgICB0aGlzLnNlbGVjdEN1cnJlbnRIYW5kKHRoaXMucGxheWVySGFuZCk7ICBcclxuICB9XHJcblxyXG4gIHVwZGF0ZU1lc3NhZ2UobWVzc2FnZSkge1xyXG4gICAgJChcIi5tZXNzYWdlc1wiKS5hcHBlbmQoYDxoMT4ke21lc3NhZ2V9PC9oMT5gKTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvZ2FtZS5qcyIsImltcG9ydCBDYXJkIGZyb20gXCIuL2NhcmRcIjtcclxuaW1wb3J0IEhhbmQgZnJvbSBcIi4vaGFuZFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVjayB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmNhcmRzID0gW107XHJcbiAgfVxyXG5cclxuICBkcmF3KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2FyZHMucG9wKCk7XHJcbiAgfVxyXG5cclxuICBnZW5lcmF0ZShudW1EZWNrcykge1xyXG4gICAgaWYgKCFudW1EZWNrcykge1xyXG4gICAgICBudW1EZWNrcyA9IDE7XHJcbiAgICB9XHJcbiAgICB3aGlsZSAobnVtRGVja3MgPiAwKSB7XHJcbiAgICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IDEzOyBpKyspIHtcclxuICAgICAgICB0aGlzLmNhcmRzLnB1c2gobmV3IENhcmQoaSwgXCJzcGFkZXNcIikpO1xyXG4gICAgICAgIHRoaXMuY2FyZHMucHVzaChuZXcgQ2FyZChpLCBcImRpYW1vbmRzXCIpKTtcclxuICAgICAgICB0aGlzLmNhcmRzLnB1c2gobmV3IENhcmQoaSwgXCJoZWFydHNcIikpO1xyXG4gICAgICAgIHRoaXMuY2FyZHMucHVzaChuZXcgQ2FyZChpLCBcImNsdWJzXCIpKTtcclxuICAgICAgfVxyXG4gICAgICBudW1EZWNrcy0tO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2h1ZmZsZSgpIHtcclxuICAgIGZvciAobGV0IGkgPSB0aGlzLmNhcmRzLmxlbmd0aCAtIDE7IGkgPiAwOyBpLS0pIHtcclxuICAgICAgY29uc3QgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChpICsgMSkpO1xyXG4gICAgICBbdGhpcy5jYXJkc1tpXV0gPSBbdGhpcy5jYXJkc1tqXV07XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2RlY2suanMiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBXYWxsZXQge1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0dGhpcy5tb25leSA9IDUwMDtcclxuXHRcdHRoaXMuYmV0ID0gMTA7XHJcblx0XHR0aGlzLmNoYW5nZTtcclxuXHR9XHJcblxyXG5cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL3dhbGxldC5qcyJdLCJzb3VyY2VSb290IjoiIn0=