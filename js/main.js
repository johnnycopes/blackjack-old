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
      } else if (this.wallet.money > this.wallet.bet * 2) {
        if (playerPoints === 11) {
          this.enable(this.$doubleDown);
        }
        if (this.playerHand.canSplit()) {
          this.enable(this.$split);
        }
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
      hand.updateDisplay(hand.getPoints());
      return hand.getPoints();
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
        if (!hand.outcome) {
          _this.evaluateHand(hand);
        }
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
      this.wallet.doubleBet();
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

      this.wallet.update();
      this.wallet.assessChange();
      $(".betting .buttons").show();
      this.enable(this.$deal);
      this.disable(this.$hit, this.$stand);
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
        } else if (hand1 !== hand2) {
          // calculate value of each hand outcome and combine the two before calling outcome function
          var initialBet = this.wallet.bet / 2;
          var handValue1 = 0;
          var handValue2 = 0;
          if (hand1 === "blackjack" || hand2 === "blackjack") {
            handValue1 = initialBet * 1.5;
            if (hand1 === "win" || hand2 === "win") {
              handValue2 = initialBet;
              this.updateMessage("You win both!");
            } else if (hand1 === "lose" || hand2 === "lose") {
              handValue2 = -initialBet;
              this.updateMessage("You and dealer each win one");
            } else {
              this.updateMessage("You win one, push");
            }
          } else if (hand1 === "win" || hand2 === "win") {
            handValue1 = initialBet;
            if (hand1 === "lose" || hand2 === "lose") {
              handValue2 = -initialBet;
              this.updateMessage("You and dealer each win one");
            } else {
              this.updateMessage("You win one, push");
            }
          } else if (hand1 === "lose" || hand2 === "lose") {
            handValue1 = -initialBet;
            this.updateMessage("Dealer wins one, push");
          }

          this.wallet.bet = handValue1 + handValue2;
          if (this.wallet.bet > 0) {
            this.outcome("win");
          } else if (this.wallet.bet < 0) {
            this.outcome("lose");
          } else {
            this.outcome("push");
          }
        }
        this.splitInPlay = false;
      }
    }
  }, {
    key: "makeBet",
    value: function makeBet() {
      var game = this;
      this.wallet.update();
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
          this.wallet.reset();
        });
      } else if (modalType === "help") {
        // future game feature: instructions available in help modal
      }
    }
  }, {
    key: "outcome",
    value: function outcome(result) {
      if (result === "blackjack") {
        this.wallet.money += this.wallet.bet * 1.5;
        this.wallet.change = this.wallet.bet * 1.5;
      } else if (result === "win") {
        this.wallet.money += this.wallet.bet;
        this.wallet.change = this.wallet.bet;
      } else if (result === "push") {
        this.updateMessage("Push");
        this.wallet.change = 0;
      } else if (result === "lose") {
        if (this.wallet.money - this.wallet.bet >= 10) {
          this.wallet.money -= this.wallet.bet;
          this.wallet.change = -this.wallet.bet;
          // drop the bet amount down to equal wallet.money amount of last bet value is greater than total wallet.money value
          if (this.wallet.bet > this.wallet.money) {
            this.wallet.bet = this.wallet.money;
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
      this.wallet.doubleBet();

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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Wallet = function () {
	function Wallet() {
		_classCallCheck(this, Wallet);

		this.money = 500;
		this.bet = 10;
		this.change = "";

		this.$total = $(".total");
		this.$bet = $(".currentBet");
		this.$change = $(".change");
	}

	_createClass(Wallet, [{
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
		key: "doubleBet",
		value: function doubleBet() {
			this.money -= this.bet;
			this.bet *= 2;
			this.update();
		}
	}, {
		key: "reset",
		value: function reset() {
			this.money = 500;
			this.bet = 10;
			this.change = "";
			this.update();
		}
	}, {
		key: "update",
		value: function update() {
			this.$total.text(this.money);
			this.$bet.text(this.bet);
		}
	}]);

	return Wallet;
}();

exports.default = Wallet;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjU2Y2Y5ZDc2NDI2ZWJlZGYxMWQiLCJ3ZWJwYWNrOi8vLy4vanMvaGFuZC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jYXJkLmpzIiwid2VicGFjazovLy8uL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9nYW1lLmpzIiwid2VicGFjazovLy8uL2pzL2RlY2suanMiLCJ3ZWJwYWNrOi8vLy4vanMvd2FsbGV0LmpzIl0sIm5hbWVzIjpbIkhhbmQiLCJvd25lciIsImhhbmROdW1iZXIiLCJzZWxlY3RvciIsIiR3cmFwcGVyIiwiJCIsIiRoYW5kIiwiJHBvaW50cyIsInBsYXlpbmciLCJjYXJkcyIsIm91dGNvbWUiLCJjYXJkIiwiJGNhcmQiLCJwdXNoIiwiYXBwZW5kIiwicG9pbnQiLCJ0b3RhbCIsImFjZXMiLCJwb3AiLCJmaW5kIiwicmVtb3ZlIiwiYXR0ciIsImdldEltYWdlVXJsIiwiaW5kZXgiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwiY29udGVudCIsInRleHQiLCJDYXJkIiwic3VpdCIsInZhbHVlIiwiY3VycmVudEdhbWUiLCJtYWtlQmV0Iiwib24iLCJyZXNldEdhbWUiLCJnYW1lRGVjayIsImdlbmVyYXRlIiwiZGVhbCIsImhpdCIsInN0YW5kIiwiZG91YmxlRG93biIsInNwbGl0IiwiR2FtZSIsIndhbGxldCIsImRlYWxlckhhbmQiLCJwbGF5ZXJIYW5kIiwic3BsaXRJblBsYXkiLCIkdG90YWwiLCIkYmV0IiwiJGNoYW5nZSIsIiRkZWFsIiwiJGhpdCIsIiRzdGFuZCIsIiRkb3VibGVEb3duIiwiJHNwbGl0Iiwic2l6ZSIsImNzcyIsInN0YXJ0R2FtZU1vZGUiLCJzaHVmZmxlIiwiZGVhbE9uZUNhcmQiLCJkZWFsZXJQb2ludHMiLCJwbGF5ZXJQb2ludHMiLCJ1cGRhdGVEaXNwbGF5IiwidXBkYXRlTWVzc2FnZSIsIm1vbmV5IiwiYmV0IiwiZW5hYmxlIiwiY2FuU3BsaXQiLCJoYW5kIiwic3BlY2lhbCIsImRyYXciLCJhZGRDYXJkIiwiZ2V0UG9pbnRzIiwicmV2ZWFsSG9sZSIsImhhbmRzIiwiZm9yRWFjaCIsImV2YWx1YXRlSGFuZCIsImVsZW1lbnRzIiwiZWxlbWVudCIsImRvdWJsZUJldCIsInNlbGVjdEN1cnJlbnRIYW5kIiwidXBkYXRlIiwiYXNzZXNzQ2hhbmdlIiwic2hvdyIsImRpc2FibGUiLCJjdXJyZW50SGFuZCIsInBsYXllckhhbmQyIiwiaW52b2tlT3V0Y29tZSIsImhhbmQxIiwibGVuZ3RoIiwiaGFuZDIiLCJpbml0aWFsQmV0IiwiaGFuZFZhbHVlMSIsImhhbmRWYWx1ZTIiLCJnYW1lIiwicG9zc2libGVCZXQiLCJoYXNDbGFzcyIsIm1vZGFsVHlwZSIsImh0bWwiLCJyZXNldCIsInJlc3VsdCIsImNoYW5nZSIsIm1vZGFsIiwiZW5kR2FtZU1vZGUiLCJlbXB0eSIsInRvZ2dsZUhpZ2hsaWdodCIsImFkanVzdFNwYWNlIiwicmVtb3ZlZENhcmQiLCJyZW1vdmVDYXJkIiwiY2FsbGVyIiwiZGVhbGVyVHVybiIsImhpZGUiLCJtZXNzYWdlIiwiRGVjayIsIm51bURlY2tzIiwiaSIsImoiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJXYWxsZXQiLCJjbGFzc05hbWUiLCJzeW1ib2wiLCJhYnMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7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UUFBS3pFLE9BQUwsQ0FBYW5DLE1BQWIsb0JBQW9DMkcsU0FBcEMsV0FBa0RDLE1BQWxELFVBQTZETCxLQUFLTSxHQUFMLENBQVMsS0FBS3RCLE1BQWQsQ0FBN0Q7QUFDQTs7OzhCQUVXO0FBQ1gsUUFBS3JDLEtBQUwsSUFBYyxLQUFLQyxHQUFuQjtBQUNBLFFBQUtBLEdBQUwsSUFBWSxDQUFaO0FBQ0EsUUFBS2dCLE1BQUw7QUFDQTs7OzBCQUVPO0FBQ1AsUUFBS2pCLEtBQUwsR0FBYSxHQUFiO0FBQ0EsUUFBS0MsR0FBTCxHQUFXLEVBQVg7QUFDQSxRQUFLb0MsTUFBTCxHQUFjLEVBQWQ7QUFDQSxRQUFLcEIsTUFBTDtBQUNBOzs7MkJBRVE7QUFDUixRQUFLbEMsTUFBTCxDQUFZcEIsSUFBWixDQUFpQixLQUFLcUMsS0FBdEI7QUFDQSxRQUFLaEIsSUFBTCxDQUFVckIsSUFBVixDQUFlLEtBQUtzQyxHQUFwQjtBQUNBOzs7Ozs7a0JBeENtQnVELE0iLCJmaWxlIjoiLi9qcy9tYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYjU2Y2Y5ZDc2NDI2ZWJlZGYxMWQiLCJpbXBvcnQgQ2FyZCBmcm9tIFwiLi9jYXJkXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIYW5kIHtcclxuICBjb25zdHJ1Y3Rvcihvd25lciwgaGFuZE51bWJlcikge1xyXG4gICAgbGV0IHNlbGVjdG9yO1xyXG4gICAgaWYgKG93bmVyID09PSAnZGVhbGVyJykge1xyXG4gICAgICBzZWxlY3RvciA9IFwiI2RlYWxlclwiO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAob3duZXIgPT09ICdwbGF5ZXInKSB7XHJcbiAgICAgIGlmIChoYW5kTnVtYmVyID09PSAxKSB7XHJcbiAgICAgICAgc2VsZWN0b3IgPSBcIiNoYW5kMVwiO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKGhhbmROdW1iZXIgPT09IDIpIHtcclxuICAgICAgICBzZWxlY3RvciA9IFwiI2hhbmQyXCI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuJHdyYXBwZXIgPSAkKGAke3NlbGVjdG9yfWApO1xyXG4gICAgdGhpcy4kaGFuZCA9ICQoYCR7c2VsZWN0b3J9IC5oYW5kYCk7XHJcbiAgICB0aGlzLiRwb2ludHMgPSAkKGAke3NlbGVjdG9yfSAucG9pbnRzYCk7XHJcbiAgICB0aGlzLnBsYXlpbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuY2FyZHMgPSBbXTtcclxuICAgIHRoaXMub3V0Y29tZTtcclxuICB9XHJcblxyXG4gIGFkZENhcmQoY2FyZCwgJGNhcmQpIHtcclxuICAgIHRoaXMuY2FyZHMucHVzaChjYXJkKTtcclxuICAgIHRoaXMuJGhhbmQuYXBwZW5kKCRjYXJkKTtcclxuICB9XHJcblxyXG4gIGNhblNwbGl0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2FyZHNbMF0ucG9pbnQgPT09IHRoaXMuY2FyZHNbMV0ucG9pbnQ7XHJcbiAgfVxyXG5cclxuICBnZXRQb2ludHMoKSB7XHJcbiAgICBsZXQgdG90YWwgPSAwO1xyXG4gICAgbGV0IGFjZXMgPSAwO1xyXG4gICAgZm9yIChsZXQgY2FyZCBvZiB0aGlzLmNhcmRzKSB7XHJcbiAgICAgIGxldCBwb2ludCA9IGNhcmQucG9pbnQ7XHJcbiAgICAgIGlmIChwb2ludCA9PT0gMSkge1xyXG4gICAgICAgIHRvdGFsICs9IDEwO1xyXG4gICAgICAgIGFjZXMrKztcclxuICAgICAgfSBcclxuICAgICAgZWxzZSBpZiAocG9pbnQgPiAxMCkge1xyXG4gICAgICAgIHBvaW50ID0gMTA7XHJcbiAgICAgIH1cclxuICAgICAgdG90YWwgKz0gcG9pbnQ7XHJcbiAgICAgIHdoaWxlICh0b3RhbCA+IDIxICYmIGFjZXMgPiAwKSB7XHJcbiAgICAgICAgdG90YWwgLT0gMTA7XHJcbiAgICAgICAgYWNlcy0tO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG90YWw7XHJcbiAgfVxyXG5cclxuICByZW1vdmVDYXJkKCkge1xyXG4gICAgbGV0IGNhcmQgPSB0aGlzLmNhcmRzLnBvcCgpO1xyXG4gICAgbGV0ICRjYXJkID0gdGhpcy4kaGFuZC5maW5kKFwiaW1nOmxhc3QtY2hpbGRcIikucmVtb3ZlKCk7XHJcbiAgICByZXR1cm4ge2NhcmQsICRjYXJkfTtcclxuICB9XHJcblxyXG4gIHJldmVhbEhvbGUoKSB7XHJcbiAgICB0aGlzLiRoYW5kLmZpbmQoJ2ltZzpmaXJzdC1jaGlsZCcpLmF0dHIoJ3NyYycsIHRoaXMuY2FyZHNbMF0uZ2V0SW1hZ2VVcmwoKSk7XHJcbiAgfVxyXG5cclxuICBzZWVDYXJkKGluZGV4KSB7XHJcbiAgICByZXR1cm4gdGhpcy5jYXJkc1tpbmRleCAtIDFdO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlSGlnaGxpZ2h0KCkge1xyXG4gICAgdGhpcy5wbGF5aW5nID8gdGhpcy4kd3JhcHBlci5hZGRDbGFzcyhcImN1cnJlbnRIYW5kXCIpIDogdGhpcy4kd3JhcHBlci5yZW1vdmVDbGFzcyhcImN1cnJlbnRIYW5kXCIpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlRGlzcGxheShjb250ZW50KSB7XHJcbiAgICB0aGlzLiRwb2ludHMudGV4dChjb250ZW50KTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvaGFuZC5qcyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcmQge1xyXG4gIGNvbnN0cnVjdG9yKHBvaW50LCBzdWl0KSB7XHJcbiAgICB0aGlzLnBvaW50ID0gcG9pbnQ7XHJcbiAgICB0aGlzLnN1aXQgPSBzdWl0O1xyXG4gIH1cclxuXHJcbiAgZ2V0SW1hZ2VVcmwoKSB7XHJcbiAgICBsZXQgdmFsdWUgPSB0aGlzLnBvaW50O1xyXG4gICAgaWYgKHRoaXMucG9pbnQgPT09IDExKSB7XHJcbiAgICAgIHZhbHVlID0gXCJqYWNrXCI7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0aGlzLnBvaW50ID09PSAxMikge1xyXG4gICAgICB2YWx1ZSA9IFwicXVlZW5cIjtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXMucG9pbnQgPT09IDEzKSB7XHJcbiAgICAgIHZhbHVlID0gXCJraW5nXCI7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0aGlzLnBvaW50ID09PSAxKSB7XHJcbiAgICAgIHZhbHVlID0gXCJhY2VcIjtcclxuICAgIH1cclxuICAgIHJldHVybiBgaW1hZ2VzLyR7dmFsdWV9X29mXyR7dGhpcy5zdWl0fS5zdmdgO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9jYXJkLmpzIiwiaW1wb3J0IEdhbWUgZnJvbSAnLi9nYW1lJztcblxudmFyIGN1cnJlbnRHYW1lID0gbmV3IEdhbWU7XG5cbmN1cnJlbnRHYW1lLm1ha2VCZXQoKTtcblxuJCgnLmRlYWwnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgY3VycmVudEdhbWUucmVzZXRHYW1lKCk7XG4gIGN1cnJlbnRHYW1lLmdhbWVEZWNrLmdlbmVyYXRlKDMpO1xuICBjdXJyZW50R2FtZS5kZWFsKCk7XG59KTtcblxuJCgnLmhpdCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICBjdXJyZW50R2FtZS5oaXQoKTtcbn0pO1xuXG4kKCcuc3RhbmQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgY3VycmVudEdhbWUuc3RhbmQoKTtcbn0pO1xuXG4kKCcuZG91YmxlLWRvd24nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgY3VycmVudEdhbWUuZG91YmxlRG93bigpO1xufSk7XG5cbiQoJy5zcGxpdCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICBjdXJyZW50R2FtZS5zcGxpdCgpO1xufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9hcHAuanMiLCJpbXBvcnQgSGFuZCBmcm9tIFwiLi9oYW5kXCI7XHJcbmltcG9ydCBEZWNrIGZyb20gXCIuL2RlY2tcIjtcclxuaW1wb3J0IFdhbGxldCBmcm9tIFwiLi93YWxsZXRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWUge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy53YWxsZXQgPSBuZXcgV2FsbGV0O1xyXG4gICAgdGhpcy5nYW1lRGVjayA9IG5ldyBEZWNrO1xyXG4gICAgdGhpcy5kZWFsZXJIYW5kID0gbmV3IEhhbmQoJ2RlYWxlcicpO1xyXG4gICAgdGhpcy5wbGF5ZXJIYW5kID0gbmV3IEhhbmQoJ3BsYXllcicsIDEpO1xyXG4gICAgdGhpcy5zcGxpdEluUGxheSA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuJHRvdGFsID0gJChcIi50b3RhbFwiKTtcclxuICAgIHRoaXMuJGJldCA9ICQoXCIuY3VycmVudEJldFwiKTtcclxuICAgIHRoaXMuJGNoYW5nZSA9ICQoXCIuY2hhbmdlXCIpO1xyXG4gICAgXHJcbiAgICB0aGlzLiRkZWFsID0gJChcIi5kZWFsXCIpO1xyXG4gICAgdGhpcy4kaGl0ID0gJChcIi5oaXRcIik7XHJcbiAgICB0aGlzLiRzdGFuZCA9ICQoXCIuc3RhbmRcIik7XHJcbiAgICB0aGlzLiRkb3VibGVEb3duID0gJChcIi5kb3VibGUtZG93blwiKTtcclxuICAgIHRoaXMuJHNwbGl0ID0gJChcIi5zcGxpdFwiKTtcclxuICB9XHJcblxyXG4gIGFkanVzdFNwYWNlKCkge1xyXG4gICAgbGV0IHNpemU7XHJcbiAgICB0aGlzLnNwbGl0SW5QbGF5ID8gc2l6ZSA9IDUwIDogc2l6ZSA9IDEwMDtcclxuICAgICQoXCIucGxheWVySGFuZC1kaXZcIikuY3NzKFwid2lkdGhcIiwgYCR7c2l6ZX0lYCk7XHJcbiAgfVxyXG5cclxuICBkZWFsKCkge1xyXG4gICAgdGhpcy5zdGFydEdhbWVNb2RlKCk7XHJcbiAgICB0aGlzLmdhbWVEZWNrLnNodWZmbGUoKTtcclxuICAgIHRoaXMuZGVhbE9uZUNhcmQodGhpcy5kZWFsZXJIYW5kLCBcImhvbGVcIik7XHJcbiAgICB0aGlzLmRlYWxPbmVDYXJkKHRoaXMucGxheWVySGFuZCk7XHJcbiAgICBsZXQgZGVhbGVyUG9pbnRzID0gdGhpcy5kZWFsT25lQ2FyZCh0aGlzLmRlYWxlckhhbmQpO1xyXG4gICAgbGV0IHBsYXllclBvaW50cyA9IHRoaXMuZGVhbE9uZUNhcmQodGhpcy5wbGF5ZXJIYW5kKTtcclxuICAgIHRoaXMuZGVhbGVySGFuZC51cGRhdGVEaXNwbGF5KFwiP1wiKTsgLy8gY29uY2VhbCBkZWFsZXIgdG90YWxcclxuXHJcbiAgICBpZiAoZGVhbGVyUG9pbnRzID09PSAyMSAmJiBwbGF5ZXJQb2ludHMgPT09IDIxKSB7XHJcbiAgICAgIHRoaXMub3V0Y29tZShcInB1c2hcIik7XHJcbiAgICAgIHRoaXMuZGVhbGVySGFuZC51cGRhdGVEaXNwbGF5KFwiQmxhY2tqYWNrXCIpO1xyXG4gICAgICB0aGlzLnBsYXllckhhbmQudXBkYXRlRGlzcGxheShcIkJMQUNLSkFDSywgSE9UIERBTU4hXCIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoZGVhbGVyUG9pbnRzID09PSAyMSkge1xyXG4gICAgICB0aGlzLm91dGNvbWUoXCJsb3NlXCIpO1xyXG4gICAgICB0aGlzLmRlYWxlckhhbmQudXBkYXRlRGlzcGxheShcIkJsYWNramFja1wiKTtcclxuICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiRGVhbGVyIHdpbnNcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChwbGF5ZXJQb2ludHMgPT09IDIxKSB7XHJcbiAgICAgIHRoaXMub3V0Y29tZShcImJsYWNramFja1wiKTtcclxuICAgICAgdGhpcy5kZWFsZXJIYW5kLnVwZGF0ZURpc3BsYXkoZGVhbGVyUG9pbnRzKTtcclxuICAgICAgdGhpcy5wbGF5ZXJIYW5kLnVwZGF0ZURpc3BsYXkoXCJCTEFDS0pBQ0ssIEhPVCBEQU1OIVwiKTtcclxuICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiWW91IHdpbiFcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0aGlzLndhbGxldC5tb25leSA+IHRoaXMud2FsbGV0LmJldCAqIDIpIHtcclxuICAgICAgaWYgKHBsYXllclBvaW50cyA9PT0gMTEpICB7XHJcbiAgICAgICAgdGhpcy5lbmFibGUodGhpcy4kZG91YmxlRG93bik7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMucGxheWVySGFuZC5jYW5TcGxpdCgpKSB7XHJcbiAgICAgICAgdGhpcy5lbmFibGUodGhpcy4kc3BsaXQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkZWFsT25lQ2FyZChoYW5kLCBzcGVjaWFsKSB7XHJcbiAgICBsZXQgY2FyZCA9IHRoaXMuZ2FtZURlY2suZHJhdygpO1xyXG4gICAgbGV0ICRjYXJkID0gJChcIjxpbWcgLz5cIiwge1xyXG4gICAgICBcImNsYXNzXCI6IFwiY2FyZFwiLCBcclxuICAgICAgXCJzcmNcIjogYCR7Y2FyZC5nZXRJbWFnZVVybCgpfWBcclxuICAgIH0pO1xyXG4gICAgaWYgKHNwZWNpYWwgPT09IFwiaG9sZVwiKSB7XHJcbiAgICAgICRjYXJkLmF0dHIoJ3NyYycsIFwiaW1hZ2VzL2JhY2stc3VpdHMtcmVkLnN2Z1wiKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHNwZWNpYWwgPT09IFwiZG91YmxlLWRvd25cIikge1xyXG4gICAgICAkY2FyZC5hZGRDbGFzcygnY2FyZC1kZCcpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoc3BlY2lhbCA9PT0gXCJzcGxpdFwiKSB7XHJcbiAgICAgICRjYXJkLmFkZENsYXNzKCdzcGxpdCcpO1xyXG4gICAgfVxyXG4gICAgaGFuZC5hZGRDYXJkKGNhcmQsICRjYXJkKTtcclxuICAgIGhhbmQudXBkYXRlRGlzcGxheShoYW5kLmdldFBvaW50cygpKTtcclxuICAgIHJldHVybiBoYW5kLmdldFBvaW50cygpO1xyXG4gIH1cclxuXHJcbiAgZGVhbGVyVHVybiguLi5oYW5kcykge1xyXG4gICAgdGhpcy5kZWFsZXJIYW5kLnJldmVhbEhvbGUoKTtcclxuICAgIHdoaWxlICh0aGlzLmRlYWxlckhhbmQuZ2V0UG9pbnRzKCkgPCAxNykge1xyXG4gICAgICB0aGlzLmRlYWxPbmVDYXJkKHRoaXMuZGVhbGVySGFuZCk7XHJcbiAgICB9XHJcbiAgICBoYW5kcy5mb3JFYWNoKGhhbmQgPT4ge1xyXG4gICAgICBpZiAoIWhhbmQub3V0Y29tZSkge1xyXG4gICAgICAgIHRoaXMuZXZhbHVhdGVIYW5kKGhhbmQpXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZGlzYWJsZSguLi5lbGVtZW50cykge1xyXG4gICAgZm9yIChsZXQgZWxlbWVudCBvZiBlbGVtZW50cykge1xyXG4gICAgICBlbGVtZW50LmF0dHIoXCJkaXNhYmxlZFwiLCB0cnVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRvdWJsZURvd24oKSB7XHJcbiAgICB0aGlzLndhbGxldC5kb3VibGVCZXQoKTtcclxuICAgIC8vIGRlYWwgdGhlIHBsYXllciBvbmUgbW9yZSBjYXJkIGFuZCB0aGVuIG1vdmUgb24gdG8gdGhlIGRlYWxlcidzIHR1cm5cclxuICAgIHRoaXMuZGVhbE9uZUNhcmQodGhpcy5wbGF5ZXJIYW5kLCBcImRvdWJsZS1kb3duXCIpO1xyXG4gICAgdGhpcy5zdGFuZChcImRvdWJsZS1kb3duXCIpO1xyXG4gIH1cclxuXHJcbiAgZW5hYmxlKC4uLmVsZW1lbnRzKSB7XHJcbiAgICBmb3IgKGxldCBlbGVtZW50IG9mIGVsZW1lbnRzKSB7XHJcbiAgICAgIGVsZW1lbnQuYXR0cihcImRpc2FibGVkXCIsIGZhbHNlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGVuZEdhbWVNb2RlKCkge1xyXG4gICAgdGhpcy5wbGF5ZXJIYW5kLnBsYXlpbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuc2VsZWN0Q3VycmVudEhhbmQodGhpcy5wbGF5ZXJIYW5kKTtcclxuICAgIHRoaXMuZGVhbGVySGFuZC5yZXZlYWxIb2xlKCk7XHJcbiAgICB0aGlzLmRlYWxlckhhbmQudXBkYXRlRGlzcGxheSh0aGlzLmRlYWxlckhhbmQuZ2V0UG9pbnRzKCkpO1xyXG5cclxuICAgIHRoaXMud2FsbGV0LnVwZGF0ZSgpO1xyXG4gICAgdGhpcy53YWxsZXQuYXNzZXNzQ2hhbmdlKCk7XHJcbiAgICAkKFwiLmJldHRpbmcgLmJ1dHRvbnNcIikuc2hvdygpO1xyXG4gICAgdGhpcy5lbmFibGUodGhpcy4kZGVhbCk7XHJcbiAgICB0aGlzLmRpc2FibGUodGhpcy4kaGl0LCB0aGlzLiRzdGFuZCk7XHJcbiAgfVxyXG5cclxuICBldmFsdWF0ZUhhbmQoaGFuZCkge1xyXG4gICAgbGV0IGRlYWxlclBvaW50cyA9IHRoaXMuZGVhbGVySGFuZC5nZXRQb2ludHMoKTtcclxuICAgIGxldCBwbGF5ZXJQb2ludHMgPSBoYW5kLmdldFBvaW50cygpO1xyXG4gICAgaWYgKGRlYWxlclBvaW50cyA+IDIxIHx8IHBsYXllclBvaW50cyA+IGRlYWxlclBvaW50cykge1xyXG4gICAgICBoYW5kLm91dGNvbWUgPSBcIndpblwiO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAocGxheWVyUG9pbnRzIDwgZGVhbGVyUG9pbnRzKSB7XHJcbiAgICAgIGhhbmQub3V0Y29tZSA9IFwibG9zZVwiO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIGhhbmQub3V0Y29tZSA9IFwicHVzaFwiO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaGl0KCkge1xyXG4gICAgdGhpcy5kaXNhYmxlKHRoaXMuJGRvdWJsZURvd24sIHRoaXMuJHNwbGl0KTtcclxuICAgIGlmICghdGhpcy5zcGxpdEluUGxheSkge1xyXG4gICAgICBsZXQgcGxheWVyUG9pbnRzID0gdGhpcy5kZWFsT25lQ2FyZCh0aGlzLnBsYXllckhhbmQpO1xyXG4gICAgICBpZiAocGxheWVyUG9pbnRzID4gMjEpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJZb3UgYnVzdFwiKTtcclxuICAgICAgICB0aGlzLm91dGNvbWUoXCJsb3NlXCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgbGV0IGN1cnJlbnRIYW5kID0gdGhpcy5zZWxlY3RDdXJyZW50SGFuZCh0aGlzLnBsYXllckhhbmQsIHRoaXMucGxheWVySGFuZDIpO1xyXG4gICAgICBsZXQgcGxheWVyUG9pbnRzID0gdGhpcy5kZWFsT25lQ2FyZChjdXJyZW50SGFuZCwgXCJzcGxpdFwiKTtcclxuICAgICAgaWYgKHBsYXllclBvaW50cyA+IDIxKSB7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRIYW5kID09PSB0aGlzLnBsYXllckhhbmQpIHtcclxuICAgICAgICAgIHRoaXMucGxheWVySGFuZC5vdXRjb21lID0gXCJsb3NlXCI7XHJcbiAgICAgICAgICB0aGlzLnBsYXllckhhbmQucGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5wbGF5ZXJIYW5kMi5wbGF5aW5nID0gdHJ1ZTtcclxuICAgICAgICAgIHRoaXMuc2VsZWN0Q3VycmVudEhhbmQodGhpcy5wbGF5ZXJIYW5kLCB0aGlzLnBsYXllckhhbmQyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY3VycmVudEhhbmQgPT09IHRoaXMucGxheWVySGFuZDIpIHtcclxuICAgICAgICAgIHRoaXMucGxheWVySGFuZDIub3V0Y29tZSA9IFwibG9zZVwiO1xyXG4gICAgICAgICAgdGhpcy5wbGF5ZXJIYW5kMi5wbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLnNlbGVjdEN1cnJlbnRIYW5kKHRoaXMucGxheWVySGFuZCwgdGhpcy5wbGF5ZXJIYW5kMik7XHJcbiAgICAgICAgICB0aGlzLmludm9rZU91dGNvbWUodGhpcy5wbGF5ZXJIYW5kLCB0aGlzLnBsYXllckhhbmQyKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGludm9rZU91dGNvbWUoLi4uaGFuZHMpIHtcclxuICAgIGxldCBoYW5kMSA9IGhhbmRzWzBdLm91dGNvbWU7XHJcbiAgICBpZiAoaGFuZHMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgIGlmIChoYW5kMSA9PT0gXCJ3aW5cIikge1xyXG4gICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIllvdSB3aW4hXCIpO1xyXG4gICAgICAgIHRoaXMub3V0Y29tZShcIndpblwiKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmIChoYW5kMSA9PT0gXCJsb3NlXCIpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJEZWFsZXIgd2luc1wiKTtcclxuICAgICAgICB0aGlzLm91dGNvbWUoXCJsb3NlXCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHRoaXMub3V0Y29tZShcInB1c2hcIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGhhbmRzLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICBsZXQgaGFuZDIgPSBoYW5kc1sxXS5vdXRjb21lO1xyXG4gICAgICBpZiAoaGFuZDEgPT09IGhhbmQyKSB7XHJcbiAgICAgICAgaWYgKGhhbmQxID09PSBcImJsYWNramFja1wiICYmIGhhbmQyID09PSBcImJsYWNramFja1wiKSB7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJUV08gQkxBQ0tKQUNLUyEhIVwiKTtcclxuICAgICAgICAgIHRoaXMub3V0Y29tZShcImJsYWNramFja1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoaGFuZDEgPT09IFwid2luXCIgJiYgaGFuZDIgPT09IFwid2luXCIpIHtcclxuICAgICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIllvdSB3aW4gYm90aCFcIik7XHJcbiAgICAgICAgICB0aGlzLm91dGNvbWUoXCJ3aW5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGhhbmQxID09PSBcImxvc2VcIiAmJiBoYW5kMiA9PT0gXCJsb3NlXCIpIHtcclxuICAgICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIkRlYWxlciB3aW5zIGJvdGhcIik7XHJcbiAgICAgICAgICB0aGlzLm91dGNvbWUoXCJsb3NlXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIHRoaXMub3V0Y29tZShcInB1c2hcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKGhhbmQxICE9PSBoYW5kMikge1xyXG4gICAgICAgIC8vIGNhbGN1bGF0ZSB2YWx1ZSBvZiBlYWNoIGhhbmQgb3V0Y29tZSBhbmQgY29tYmluZSB0aGUgdHdvIGJlZm9yZSBjYWxsaW5nIG91dGNvbWUgZnVuY3Rpb25cclxuICAgICAgICBsZXQgaW5pdGlhbEJldCA9IHRoaXMud2FsbGV0LmJldCAvIDI7XHJcbiAgICAgICAgbGV0IGhhbmRWYWx1ZTEgPSAwO1xyXG4gICAgICAgIGxldCBoYW5kVmFsdWUyID0gMDtcclxuICAgICAgICBpZiAoaGFuZDEgPT09IFwiYmxhY2tqYWNrXCIgfHwgaGFuZDIgPT09IFwiYmxhY2tqYWNrXCIpIHtcclxuICAgICAgICAgIGhhbmRWYWx1ZTEgPSBpbml0aWFsQmV0ICogMS41O1xyXG4gICAgICAgICAgaWYgKGhhbmQxID09PSBcIndpblwiIHx8IGhhbmQyID09PSBcIndpblwiKSB7XHJcbiAgICAgICAgICAgIGhhbmRWYWx1ZTIgPSBpbml0aWFsQmV0O1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJZb3Ugd2luIGJvdGghXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZSBpZiAoaGFuZDEgPT09IFwibG9zZVwiIHx8IGhhbmQyID09PSBcImxvc2VcIikge1xyXG4gICAgICAgICAgICBoYW5kVmFsdWUyID0gLWluaXRpYWxCZXQ7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIllvdSBhbmQgZGVhbGVyIGVhY2ggd2luIG9uZVwiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJZb3Ugd2luIG9uZSwgcHVzaFwiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoaGFuZDEgPT09IFwid2luXCIgfHwgaGFuZDIgPT09IFwid2luXCIpIHtcclxuICAgICAgICAgIGhhbmRWYWx1ZTEgPSBpbml0aWFsQmV0O1xyXG4gICAgICAgICAgaWYgKGhhbmQxID09PSBcImxvc2VcIiB8fCBoYW5kMiA9PT0gXCJsb3NlXCIpIHtcclxuICAgICAgICAgICAgaGFuZFZhbHVlMiA9IC1pbml0aWFsQmV0O1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJZb3UgYW5kIGRlYWxlciBlYWNoIHdpbiBvbmVcIik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiWW91IHdpbiBvbmUsIHB1c2hcIik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGhhbmQxID09PSBcImxvc2VcIiB8fCBoYW5kMiA9PT0gXCJsb3NlXCIpIHtcclxuICAgICAgICAgIGhhbmRWYWx1ZTEgPSAtaW5pdGlhbEJldDtcclxuICAgICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIkRlYWxlciB3aW5zIG9uZSwgcHVzaFwiKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy53YWxsZXQuYmV0ID0gaGFuZFZhbHVlMSArIGhhbmRWYWx1ZTI7XHJcbiAgICAgICAgaWYgKHRoaXMud2FsbGV0LmJldCA+IDApIHtcclxuICAgICAgICAgIHRoaXMub3V0Y29tZShcIndpblwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy53YWxsZXQuYmV0IDwgMCkge1xyXG4gICAgICAgICAgdGhpcy5vdXRjb21lKFwibG9zZVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLm91dGNvbWUoXCJwdXNoXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICB0aGlzLnNwbGl0SW5QbGF5ID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBtYWtlQmV0KCkge1xyXG4gICAgY29uc3QgZ2FtZSA9IHRoaXM7XHJcbiAgICB0aGlzLndhbGxldC51cGRhdGUoKTtcclxuICAgICQoXCIuYmV0LWJ0blwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICBjb25zdCBwb3NzaWJsZUJldCA9IGdhbWUud2FsbGV0Lm1vbmV5IC0gZ2FtZS53YWxsZXQuYmV0O1xyXG4gICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcyhcImFkZDEwXCIpICYmIHBvc3NpYmxlQmV0ID49IDEwKSB7XHJcbiAgICAgICAgZ2FtZS53YWxsZXQuYmV0ICs9IDEwO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKCQodGhpcykuaGFzQ2xhc3MoXCJhZGQ1MFwiKSAmJiBwb3NzaWJsZUJldCA+PSA1MCkge1xyXG4gICAgICAgIGdhbWUud2FsbGV0LmJldCArPSA1MDtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmICgkKHRoaXMpLmhhc0NsYXNzKFwiYWRkMTAwXCIpICYmIHBvc3NpYmxlQmV0ID49IDEwMCkge1xyXG4gICAgICAgIGdhbWUud2FsbGV0LmJldCArPSAxMDA7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAoJCh0aGlzKS5oYXNDbGFzcyhcImFkZDUwMFwiKSAmJiBwb3NzaWJsZUJldCA+PSA1MDApIHtcclxuICAgICAgICBnYW1lLndhbGxldC5iZXQgKz0gNTAwO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKCQodGhpcykuaGFzQ2xhc3MoXCJhbGwtaW5cIikpIHtcclxuICAgICAgICBnYW1lLndhbGxldC5iZXQgPSBnYW1lLndhbGxldC5tb25leTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmICgkKHRoaXMpLmhhc0NsYXNzKFwicmVzZXRcIikpIHtcclxuICAgICAgICBnYW1lLndhbGxldC5iZXQgPSAxMDtcclxuICAgICAgfVxyXG4gICAgICBnYW1lLiRiZXQudGV4dChnYW1lLndhbGxldC5iZXQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBtb2RhbChtb2RhbFR5cGUpIHtcclxuICAgIGlmIChtb2RhbFR5cGUgPT09IFwiYmFua3J1cHRcIikge1xyXG4gICAgICAkKFwiLm1vZGFsLCAubW9kYWwtb3ZlcmxheVwiKS5yZW1vdmVDbGFzcyhcImhpZGVcIik7XHJcbiAgICAgICQoXCIubW9kYWwgLm1lc3NhZ2VcIikuaHRtbChcclxuICAgICAgICBcIllvdSd2ZSBsb3N0IGV2ZXJ5dGhpbmcuXCIgK1xyXG4gICAgICAgICAgXCI8YnIvPjxici8+XCIgK1xyXG4gICAgICAgICAgXCJHb29kIHRoaW5nIGl0J3Mgbm90IHJlYWwgbW9uZXkhXCJcclxuICAgICAgKTtcclxuICAgICAgJChcIi5tb2RhbC1ndXRzIGJ1dHRvblwiKS50ZXh0KFwiUGxheSBhZ2FpblwiKTtcclxuICAgICAgJChcIi5tb2RhbC1ndXRzIGJ1dHRvblwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoXCIubW9kYWwsIC5tb2RhbC1vdmVybGF5XCIpLmFkZENsYXNzKFwiaGlkZVwiKTtcclxuICAgICAgICAkKFwiLnRpdGxlLXNjcmVlblwiKS5zaG93KCk7XHJcbiAgICAgICAgZ2FtZS5yZXNldEdhbWUoKTtcclxuICAgICAgICB0aGlzLndhbGxldC5yZXNldCgpO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSBpZiAobW9kYWxUeXBlID09PSBcImhlbHBcIikge1xyXG4gICAgICAvLyBmdXR1cmUgZ2FtZSBmZWF0dXJlOiBpbnN0cnVjdGlvbnMgYXZhaWxhYmxlIGluIGhlbHAgbW9kYWxcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG91dGNvbWUocmVzdWx0KSB7XHJcbiAgICBpZiAocmVzdWx0ID09PSBcImJsYWNramFja1wiKSB7XHJcbiAgICAgIHRoaXMud2FsbGV0Lm1vbmV5ICs9IHRoaXMud2FsbGV0LmJldCAqIDEuNTtcclxuICAgICAgdGhpcy53YWxsZXQuY2hhbmdlID0gdGhpcy53YWxsZXQuYmV0ICogMS41O1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAocmVzdWx0ID09PSBcIndpblwiKSB7XHJcbiAgICAgIHRoaXMud2FsbGV0Lm1vbmV5ICs9IHRoaXMud2FsbGV0LmJldDtcclxuICAgICAgdGhpcy53YWxsZXQuY2hhbmdlID0gdGhpcy53YWxsZXQuYmV0O1xyXG4gICAgfSBcclxuICAgIGVsc2UgaWYgKHJlc3VsdCA9PT0gXCJwdXNoXCIpIHtcclxuICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiUHVzaFwiKTtcclxuICAgICAgdGhpcy53YWxsZXQuY2hhbmdlID0gMDtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHJlc3VsdCA9PT0gXCJsb3NlXCIpIHtcclxuICAgICAgaWYgKHRoaXMud2FsbGV0Lm1vbmV5IC0gdGhpcy53YWxsZXQuYmV0ID49IDEwKSB7XHJcbiAgICAgICAgdGhpcy53YWxsZXQubW9uZXkgLT0gdGhpcy53YWxsZXQuYmV0O1xyXG4gICAgICAgIHRoaXMud2FsbGV0LmNoYW5nZSA9IC10aGlzLndhbGxldC5iZXQ7XHJcbiAgICAgICAgLy8gZHJvcCB0aGUgYmV0IGFtb3VudCBkb3duIHRvIGVxdWFsIHdhbGxldC5tb25leSBhbW91bnQgb2YgbGFzdCBiZXQgdmFsdWUgaXMgZ3JlYXRlciB0aGFuIHRvdGFsIHdhbGxldC5tb25leSB2YWx1ZVxyXG4gICAgICAgIGlmICh0aGlzLndhbGxldC5iZXQgPiB0aGlzLndhbGxldC5tb25leSkge1xyXG4gICAgICAgICAgdGhpcy53YWxsZXQuYmV0ID0gdGhpcy53YWxsZXQubW9uZXk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IFxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICB0aGlzLm1vZGFsKFwiYmFua3J1cHRcIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuZW5kR2FtZU1vZGUoKTtcclxuICB9XHJcblxyXG4gIHJlc2V0R2FtZSgpIHtcclxuICAgIHRoaXMuZ2FtZURlY2sgPSBuZXcgRGVjaztcclxuICAgIHRoaXMuZGVhbGVySGFuZCA9IG5ldyBIYW5kKFwiZGVhbGVyXCIpO1xyXG4gICAgdGhpcy5wbGF5ZXJIYW5kID0gbmV3IEhhbmQoXCJwbGF5ZXJcIiwgMSk7XHJcbiAgICAkKFwiLm1lc3NhZ2VzXCIpLmVtcHR5KCk7XHJcbiAgICAkKFwiLnBsYXllci1oYW5kXCIpLmVtcHR5KCk7XHJcbiAgICAkKFwiLmRlYWxlci1oYW5kXCIpLmVtcHR5KCk7XHJcbiAgICAkKFwiLnBsYXllci1wb2ludHNcIikuZW1wdHkoKTtcclxuICAgICQoXCIuZGVhbGVyLXBvaW50c1wiKS5lbXB0eSgpO1xyXG4gICAgJChcIi5jaGFuZ2VcIikuZW1wdHkoKTtcclxuICB9XHJcblxyXG4gIHNlbGVjdEN1cnJlbnRIYW5kKC4uLmhhbmRzKSB7XHJcbiAgICBsZXQgY3VycmVudEhhbmQ7XHJcbiAgICBmb3IgKGxldCBoYW5kIG9mIGhhbmRzKSB7XHJcbiAgICAgIGhhbmQudG9nZ2xlSGlnaGxpZ2h0KCk7XHJcbiAgICAgIGlmIChoYW5kLnBsYXlpbmcpIHtcclxuICAgICAgICBjdXJyZW50SGFuZCA9IGhhbmQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjdXJyZW50SGFuZDtcclxuICB9XHJcblxyXG4gIHNwbGl0KCkge1xyXG4gICAgdGhpcy5zcGxpdEluUGxheSA9IHRydWU7XHJcbiAgICB0aGlzLmRpc2FibGUodGhpcy4kc3BsaXQpO1xyXG4gICAgdGhpcy53YWxsZXQuZG91YmxlQmV0KCk7XHJcblxyXG4gICAgLy8gc3RhcnQgYWRkaXRpb25hbCBoYW5kIGFuZCBtb3ZlIG9uZSBjYXJkIGZyb20gaGFuZCAxIHRvIGhhbmQgMlxyXG4gICAgdGhpcy5hZGp1c3RTcGFjZSgpO1xyXG4gICAgdGhpcy5wbGF5ZXJIYW5kMiA9IG5ldyBIYW5kKFwicGxheWVyXCIsIDIpO1xyXG4gICAgbGV0IHJlbW92ZWRDYXJkID0gdGhpcy5wbGF5ZXJIYW5kLnJlbW92ZUNhcmQoKTtcclxuICAgIHRoaXMucGxheWVySGFuZDIuYWRkQ2FyZChyZW1vdmVkQ2FyZC5jYXJkLCByZW1vdmVkQ2FyZC4kY2FyZCk7XHJcbiAgICB0aGlzLmRlYWxPbmVDYXJkKHRoaXMucGxheWVySGFuZCk7XHJcbiAgICB0aGlzLmRlYWxPbmVDYXJkKHRoaXMucGxheWVySGFuZDIpO1xyXG4gIH1cclxuXHJcbiAgc3RhbmQoY2FsbGVyKSB7XHJcbiAgICBpZiAoIXRoaXMuc3BsaXRJblBsYXkpIHtcclxuICAgICAgdGhpcy5kaXNhYmxlKHRoaXMuJGhpdCwgdGhpcy4kc3RhbmQsIHRoaXMuJGRvdWJsZURvd24sIHRoaXMuJHNwbGl0KTtcclxuICAgICAgLy8gaWYgc3RhbmQgd2FzIGNhbGxlZCBieSBjbGlja2luZyAnZG91YmxlIGRvd24nLCBkbyBhZGRpdGlvbmFsIHdvcmtcclxuICAgICAgaWYgKGNhbGxlciA9PT0gXCJkb3VibGUtZG93blwiKSB7XHJcbiAgICAgICAgdGhpcy5iZXQgPSB0aGlzLmJldCAvIDI7XHJcbiAgICAgICAgJChcIi5iZXRcIikudGV4dCh0aGlzLmJldCk7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlKHRoaXMuJGRvdWJsZURvd24pO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuZGVhbGVyVHVybih0aGlzLnBsYXllckhhbmQpO1xyXG4gICAgICB0aGlzLmludm9rZU91dGNvbWUodGhpcy5wbGF5ZXJIYW5kKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBsZXQgY3VycmVudEhhbmQgPSB0aGlzLnNlbGVjdEN1cnJlbnRIYW5kKHRoaXMucGxheWVySGFuZCwgdGhpcy5wbGF5ZXJIYW5kMik7XHJcbiAgICAgIGlmIChjdXJyZW50SGFuZCA9PT0gdGhpcy5wbGF5ZXJIYW5kKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJIYW5kLnBsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBsYXllckhhbmQyLnBsYXlpbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0Q3VycmVudEhhbmQodGhpcy5wbGF5ZXJIYW5kLCB0aGlzLnBsYXllckhhbmQyKTtcclxuICAgICAgfSBcclxuICAgICAgZWxzZSBpZiAoY3VycmVudEhhbmQgPT09IHRoaXMucGxheWVySGFuZDIpIHtcclxuICAgICAgICB0aGlzLnBsYXllckhhbmQyLnBsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNlbGVjdEN1cnJlbnRIYW5kKHRoaXMucGxheWVySGFuZCwgdGhpcy5wbGF5ZXJIYW5kMik7XHJcbiAgICAgICAgdGhpcy5kZWFsZXJUdXJuKHRoaXMucGxheWVySGFuZCwgdGhpcy5wbGF5ZXJIYW5kMik7XHJcbiAgICAgICAgdGhpcy5pbnZva2VPdXRjb21lKHRoaXMucGxheWVySGFuZCwgdGhpcy5wbGF5ZXJIYW5kMik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXJ0R2FtZU1vZGUoKSB7XHJcbiAgICAkKFwiLnRpdGxlLXNjcmVlblwiKS5oaWRlKCk7XHJcbiAgICB0aGlzLmFkanVzdFNwYWNlKCk7XHJcbiAgICB0aGlzLmVuYWJsZSh0aGlzLiRoaXQsIHRoaXMuJHN0YW5kKTtcclxuICAgIHRoaXMuZGlzYWJsZSh0aGlzLiRkZWFsKTtcclxuICAgICQoXCIuYmV0dGluZyAuYnV0dG9uc1wiKS5oaWRlKCk7XHJcbiAgICB0aGlzLnBsYXllckhhbmQucGxheWluZyA9IHRydWU7XHJcbiAgICB0aGlzLnNlbGVjdEN1cnJlbnRIYW5kKHRoaXMucGxheWVySGFuZCk7ICBcclxuICB9XHJcblxyXG4gIHVwZGF0ZU1lc3NhZ2UobWVzc2FnZSkge1xyXG4gICAgJChcIi5tZXNzYWdlc1wiKS5hcHBlbmQoYDxoMT4ke21lc3NhZ2V9PC9oMT5gKTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvZ2FtZS5qcyIsImltcG9ydCBDYXJkIGZyb20gXCIuL2NhcmRcIjtcclxuaW1wb3J0IEhhbmQgZnJvbSBcIi4vaGFuZFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVjayB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmNhcmRzID0gW107XHJcbiAgfVxyXG5cclxuICBkcmF3KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2FyZHMucG9wKCk7XHJcbiAgfVxyXG5cclxuICBnZW5lcmF0ZShudW1EZWNrcykge1xyXG4gICAgaWYgKCFudW1EZWNrcykge1xyXG4gICAgICBudW1EZWNrcyA9IDE7XHJcbiAgICB9XHJcbiAgICB3aGlsZSAobnVtRGVja3MgPiAwKSB7XHJcbiAgICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IDEzOyBpKyspIHtcclxuICAgICAgICB0aGlzLmNhcmRzLnB1c2gobmV3IENhcmQoaSwgXCJzcGFkZXNcIikpO1xyXG4gICAgICAgIHRoaXMuY2FyZHMucHVzaChuZXcgQ2FyZChpLCBcImRpYW1vbmRzXCIpKTtcclxuICAgICAgICB0aGlzLmNhcmRzLnB1c2gobmV3IENhcmQoaSwgXCJoZWFydHNcIikpO1xyXG4gICAgICAgIHRoaXMuY2FyZHMucHVzaChuZXcgQ2FyZChpLCBcImNsdWJzXCIpKTtcclxuICAgICAgfVxyXG4gICAgICBudW1EZWNrcy0tO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2h1ZmZsZSgpIHtcclxuICAgIGZvciAobGV0IGkgPSB0aGlzLmNhcmRzLmxlbmd0aCAtIDE7IGkgPiAwOyBpLS0pIHtcclxuICAgICAgY29uc3QgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChpICsgMSkpO1xyXG4gICAgICBbdGhpcy5jYXJkc1tpXV0gPSBbdGhpcy5jYXJkc1tqXV07XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2RlY2suanMiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBXYWxsZXQge1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0dGhpcy5tb25leSA9IDUwMDtcclxuXHRcdHRoaXMuYmV0ID0gMTA7XHJcblx0XHR0aGlzLmNoYW5nZSA9IFwiXCI7XHJcblxyXG5cdFx0dGhpcy4kdG90YWwgPSAkKFwiLnRvdGFsXCIpO1xyXG5cdFx0dGhpcy4kYmV0ID0gJChcIi5jdXJyZW50QmV0XCIpO1xyXG5cdFx0dGhpcy4kY2hhbmdlID0gJChcIi5jaGFuZ2VcIik7XHJcblx0fVxyXG5cclxuXHRhc3Nlc3NDaGFuZ2UoKSB7XHJcblx0XHRsZXQgY2xhc3NOYW1lID0gXCJcIjtcclxuXHRcdGxldCBzeW1ib2wgPSBcIlwiO1xyXG5cdFx0aWYgKHRoaXMuY2hhbmdlID4gMCkge1xyXG5cdFx0XHRjbGFzc05hbWUgPSBcInBvc2l0aXZlXCI7XHJcblx0XHRcdHN5bWJvbCA9IFwiK1wiO1xyXG5cdFx0fSBlbHNlIGlmICh0aGlzLmNoYW5nZSA8IDApIHtcclxuXHRcdFx0Y2xhc3NOYW1lID0gXCJuZWdhdGl2ZVwiO1xyXG5cdFx0XHRzeW1ib2wgPSBcIi1cIjtcclxuXHRcdH1cclxuXHRcdHRoaXMuJGNoYW5nZS5hcHBlbmQoYDxzcGFuIGNsYXNzPVwiJHtjbGFzc05hbWV9XCI+JHtzeW1ib2x9ICQke01hdGguYWJzKHRoaXMuY2hhbmdlKX08L3NwYW4+YCk7XHJcblx0fVxyXG5cdFxyXG5cdGRvdWJsZUJldCgpIHtcclxuXHRcdHRoaXMubW9uZXkgLT0gdGhpcy5iZXQ7XHJcblx0XHR0aGlzLmJldCAqPSAyO1xyXG5cdFx0dGhpcy51cGRhdGUoKTtcclxuXHR9XHJcblxyXG5cdHJlc2V0KCkge1xyXG5cdFx0dGhpcy5tb25leSA9IDUwMDtcclxuXHRcdHRoaXMuYmV0ID0gMTA7XHJcblx0XHR0aGlzLmNoYW5nZSA9IFwiXCI7XHJcblx0XHR0aGlzLnVwZGF0ZSgpO1xyXG5cdH1cclxuXHJcblx0dXBkYXRlKCkge1xyXG5cdFx0dGhpcy4kdG90YWwudGV4dCh0aGlzLm1vbmV5KTtcclxuXHRcdHRoaXMuJGJldC50ZXh0KHRoaXMuYmV0KTtcclxuXHR9XHJcblxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvd2FsbGV0LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==