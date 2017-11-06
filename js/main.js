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
          var handValue1 = this.wallet.bet / 2;
          var handValue2 = this.wallet.bet / 2;
          if (hand1 === "blackjack" || hand2 === "blackjack") {
            handValue1 = this.wallet.bet * 1.5;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZWNlMmFiYjkzOWM3ZDk4ZTNlY2UiLCJ3ZWJwYWNrOi8vLy4vanMvaGFuZC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jYXJkLmpzIiwid2VicGFjazovLy8uL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9nYW1lLmpzIiwid2VicGFjazovLy8uL2pzL2RlY2suanMiLCJ3ZWJwYWNrOi8vLy4vanMvd2FsbGV0LmpzIl0sIm5hbWVzIjpbIkhhbmQiLCJvd25lciIsImhhbmROdW1iZXIiLCJzZWxlY3RvciIsIiR3cmFwcGVyIiwiJCIsIiRoYW5kIiwiJHBvaW50cyIsInBsYXlpbmciLCJjYXJkcyIsIm91dGNvbWUiLCJjYXJkIiwiJGNhcmQiLCJwdXNoIiwiYXBwZW5kIiwicG9pbnQiLCJ0b3RhbCIsImFjZXMiLCJwb3AiLCJmaW5kIiwicmVtb3ZlIiwiYXR0ciIsImdldEltYWdlVXJsIiwiaW5kZXgiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwiY29udGVudCIsInRleHQiLCJDYXJkIiwic3VpdCIsInZhbHVlIiwiY3VycmVudEdhbWUiLCJtYWtlQmV0Iiwib24iLCJyZXNldEdhbWUiLCJnYW1lRGVjayIsImdlbmVyYXRlIiwiZGVhbCIsImhpdCIsInN0YW5kIiwiZG91YmxlRG93biIsInNwbGl0IiwiR2FtZSIsIndhbGxldCIsImRlYWxlckhhbmQiLCJwbGF5ZXJIYW5kIiwic3BsaXRJblBsYXkiLCIkdG90YWwiLCIkYmV0IiwiJGNoYW5nZSIsIiRkZWFsIiwiJGhpdCIsIiRzdGFuZCIsIiRkb3VibGVEb3duIiwiJHNwbGl0Iiwic2l6ZSIsImNzcyIsInN0YXJ0R2FtZU1vZGUiLCJzaHVmZmxlIiwiZGVhbE9uZUNhcmQiLCJkZWFsZXJQb2ludHMiLCJwbGF5ZXJQb2ludHMiLCJ1cGRhdGVEaXNwbGF5IiwidXBkYXRlTWVzc2FnZSIsIm1vbmV5IiwiYmV0IiwiZW5hYmxlIiwiY2FuU3BsaXQiLCJoYW5kIiwic3BlY2lhbCIsImRyYXciLCJhZGRDYXJkIiwiZ2V0UG9pbnRzIiwicmV2ZWFsSG9sZSIsImhhbmRzIiwiZm9yRWFjaCIsImV2YWx1YXRlSGFuZCIsImVsZW1lbnRzIiwiZWxlbWVudCIsImRvdWJsZUJldCIsInNlbGVjdEN1cnJlbnRIYW5kIiwidXBkYXRlIiwiYXNzZXNzQ2hhbmdlIiwic2hvdyIsImRpc2FibGUiLCJjdXJyZW50SGFuZCIsInBsYXllckhhbmQyIiwiaW52b2tlT3V0Y29tZSIsImhhbmQxIiwibGVuZ3RoIiwiaGFuZDIiLCJoYW5kVmFsdWUxIiwiaGFuZFZhbHVlMiIsImN1cnJlbnRCZXQiLCJnYW1lIiwicG9zc2libGVCZXQiLCJoYXNDbGFzcyIsIm1vZGFsVHlwZSIsImh0bWwiLCJyZXNldCIsInJlc3VsdCIsImNoYW5nZSIsIm1vZGFsIiwiZW5kR2FtZU1vZGUiLCJlbXB0eSIsInRvZ2dsZUhpZ2hsaWdodCIsImFkanVzdFNwYWNlIiwicmVtb3ZlZENhcmQiLCJyZW1vdmVDYXJkIiwiY2FsbGVyIiwiZGVhbGVyVHVybiIsImhpZGUiLCJtZXNzYWdlIiwiRGVjayIsIm51bURlY2tzIiwiaSIsImoiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJXYWxsZXQiLCJjbGFzc05hbWUiLCJzeW1ib2wiLCJhYnMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7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TUFBTDtBQUNBOzs7MEJBRU87QUFDUCxRQUFLakIsS0FBTCxHQUFhLEdBQWI7QUFDQSxRQUFLQyxHQUFMLEdBQVcsRUFBWDtBQUNBLFFBQUtvQyxNQUFMLEdBQWMsRUFBZDtBQUNBLFFBQUtwQixNQUFMO0FBQ0E7OzsyQkFFUTtBQUNSLFFBQUtsQyxNQUFMLENBQVlwQixJQUFaLENBQWlCLEtBQUtxQyxLQUF0QjtBQUNBLFFBQUtoQixJQUFMLENBQVVyQixJQUFWLENBQWUsS0FBS3NDLEdBQXBCO0FBQ0E7Ozs7OztrQkF4Q21CdUQsTSIsImZpbGUiOiIuL2pzL21haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBlY2UyYWJiOTM5YzdkOThlM2VjZSIsImltcG9ydCBDYXJkIGZyb20gXCIuL2NhcmRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhhbmQge1xyXG4gIGNvbnN0cnVjdG9yKG93bmVyLCBoYW5kTnVtYmVyKSB7XHJcbiAgICBsZXQgc2VsZWN0b3I7XHJcbiAgICBpZiAob3duZXIgPT09ICdkZWFsZXInKSB7XHJcbiAgICAgIHNlbGVjdG9yID0gXCIjZGVhbGVyXCI7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChvd25lciA9PT0gJ3BsYXllcicpIHtcclxuICAgICAgaWYgKGhhbmROdW1iZXIgPT09IDEpIHtcclxuICAgICAgICBzZWxlY3RvciA9IFwiI2hhbmQxXCI7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAoaGFuZE51bWJlciA9PT0gMikge1xyXG4gICAgICAgIHNlbGVjdG9yID0gXCIjaGFuZDJcIjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy4kd3JhcHBlciA9ICQoYCR7c2VsZWN0b3J9YCk7XHJcbiAgICB0aGlzLiRoYW5kID0gJChgJHtzZWxlY3Rvcn0gLmhhbmRgKTtcclxuICAgIHRoaXMuJHBvaW50cyA9ICQoYCR7c2VsZWN0b3J9IC5wb2ludHNgKTtcclxuICAgIHRoaXMucGxheWluZyA9IGZhbHNlO1xyXG4gICAgdGhpcy5jYXJkcyA9IFtdO1xyXG4gICAgdGhpcy5vdXRjb21lO1xyXG4gIH1cclxuXHJcbiAgYWRkQ2FyZChjYXJkLCAkY2FyZCkge1xyXG4gICAgdGhpcy5jYXJkcy5wdXNoKGNhcmQpO1xyXG4gICAgdGhpcy4kaGFuZC5hcHBlbmQoJGNhcmQpO1xyXG4gIH1cclxuXHJcbiAgY2FuU3BsaXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jYXJkc1swXS5wb2ludCA9PT0gdGhpcy5jYXJkc1sxXS5wb2ludDtcclxuICB9XHJcblxyXG4gIGdldFBvaW50cygpIHtcclxuICAgIGxldCB0b3RhbCA9IDA7XHJcbiAgICBsZXQgYWNlcyA9IDA7XHJcbiAgICBmb3IgKGxldCBjYXJkIG9mIHRoaXMuY2FyZHMpIHtcclxuICAgICAgbGV0IHBvaW50ID0gY2FyZC5wb2ludDtcclxuICAgICAgaWYgKHBvaW50ID09PSAxKSB7XHJcbiAgICAgICAgdG90YWwgKz0gMTA7XHJcbiAgICAgICAgYWNlcysrO1xyXG4gICAgICB9IFxyXG4gICAgICBlbHNlIGlmIChwb2ludCA+IDEwKSB7XHJcbiAgICAgICAgcG9pbnQgPSAxMDtcclxuICAgICAgfVxyXG4gICAgICB0b3RhbCArPSBwb2ludDtcclxuICAgICAgd2hpbGUgKHRvdGFsID4gMjEgJiYgYWNlcyA+IDApIHtcclxuICAgICAgICB0b3RhbCAtPSAxMDtcclxuICAgICAgICBhY2VzLS07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0b3RhbDtcclxuICB9XHJcblxyXG4gIHJlbW92ZUNhcmQoKSB7XHJcbiAgICBsZXQgY2FyZCA9IHRoaXMuY2FyZHMucG9wKCk7XHJcbiAgICBsZXQgJGNhcmQgPSB0aGlzLiRoYW5kLmZpbmQoXCJpbWc6bGFzdC1jaGlsZFwiKS5yZW1vdmUoKTtcclxuICAgIHJldHVybiB7Y2FyZCwgJGNhcmR9O1xyXG4gIH1cclxuXHJcbiAgcmV2ZWFsSG9sZSgpIHtcclxuICAgIHRoaXMuJGhhbmQuZmluZCgnaW1nOmZpcnN0LWNoaWxkJykuYXR0cignc3JjJywgdGhpcy5jYXJkc1swXS5nZXRJbWFnZVVybCgpKTtcclxuICB9XHJcblxyXG4gIHNlZUNhcmQoaW5kZXgpIHtcclxuICAgIHJldHVybiB0aGlzLmNhcmRzW2luZGV4IC0gMV07XHJcbiAgfVxyXG5cclxuICB0b2dnbGVIaWdobGlnaHQoKSB7XHJcbiAgICB0aGlzLnBsYXlpbmcgPyB0aGlzLiR3cmFwcGVyLmFkZENsYXNzKFwiY3VycmVudEhhbmRcIikgOiB0aGlzLiR3cmFwcGVyLnJlbW92ZUNsYXNzKFwiY3VycmVudEhhbmRcIik7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVEaXNwbGF5KGNvbnRlbnQpIHtcclxuICAgIHRoaXMuJHBvaW50cy50ZXh0KGNvbnRlbnQpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9oYW5kLmpzIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FyZCB7XHJcbiAgY29uc3RydWN0b3IocG9pbnQsIHN1aXQpIHtcclxuICAgIHRoaXMucG9pbnQgPSBwb2ludDtcclxuICAgIHRoaXMuc3VpdCA9IHN1aXQ7XHJcbiAgfVxyXG5cclxuICBnZXRJbWFnZVVybCgpIHtcclxuICAgIGxldCB2YWx1ZSA9IHRoaXMucG9pbnQ7XHJcbiAgICBpZiAodGhpcy5wb2ludCA9PT0gMTEpIHtcclxuICAgICAgdmFsdWUgPSBcImphY2tcIjtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXMucG9pbnQgPT09IDEyKSB7XHJcbiAgICAgIHZhbHVlID0gXCJxdWVlblwiO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodGhpcy5wb2ludCA9PT0gMTMpIHtcclxuICAgICAgdmFsdWUgPSBcImtpbmdcIjtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXMucG9pbnQgPT09IDEpIHtcclxuICAgICAgdmFsdWUgPSBcImFjZVwiO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGBpbWFnZXMvJHt2YWx1ZX1fb2ZfJHt0aGlzLnN1aXR9LnN2Z2A7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2NhcmQuanMiLCJpbXBvcnQgR2FtZSBmcm9tICcuL2dhbWUnO1xuXG52YXIgY3VycmVudEdhbWUgPSBuZXcgR2FtZTtcblxuY3VycmVudEdhbWUubWFrZUJldCgpO1xuXG4kKCcuZGVhbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICBjdXJyZW50R2FtZS5yZXNldEdhbWUoKTtcbiAgY3VycmVudEdhbWUuZ2FtZURlY2suZ2VuZXJhdGUoMyk7XG4gIGN1cnJlbnRHYW1lLmRlYWwoKTtcbn0pO1xuXG4kKCcuaGl0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gIGN1cnJlbnRHYW1lLmhpdCgpO1xufSk7XG5cbiQoJy5zdGFuZCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICBjdXJyZW50R2FtZS5zdGFuZCgpO1xufSk7XG5cbiQoJy5kb3VibGUtZG93bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICBjdXJyZW50R2FtZS5kb3VibGVEb3duKCk7XG59KTtcblxuJCgnLnNwbGl0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gIGN1cnJlbnRHYW1lLnNwbGl0KCk7XG59KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2FwcC5qcyIsImltcG9ydCBIYW5kIGZyb20gXCIuL2hhbmRcIjtcclxuaW1wb3J0IERlY2sgZnJvbSBcIi4vZGVja1wiO1xyXG5pbXBvcnQgV2FsbGV0IGZyb20gXCIuL3dhbGxldFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZSB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLndhbGxldCA9IG5ldyBXYWxsZXQ7XHJcbiAgICB0aGlzLmdhbWVEZWNrID0gbmV3IERlY2s7XHJcbiAgICB0aGlzLmRlYWxlckhhbmQgPSBuZXcgSGFuZCgnZGVhbGVyJyk7XHJcbiAgICB0aGlzLnBsYXllckhhbmQgPSBuZXcgSGFuZCgncGxheWVyJywgMSk7XHJcbiAgICB0aGlzLnNwbGl0SW5QbGF5ID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy4kdG90YWwgPSAkKFwiLnRvdGFsXCIpO1xyXG4gICAgdGhpcy4kYmV0ID0gJChcIi5jdXJyZW50QmV0XCIpO1xyXG4gICAgdGhpcy4kY2hhbmdlID0gJChcIi5jaGFuZ2VcIik7XHJcbiAgICBcclxuICAgIHRoaXMuJGRlYWwgPSAkKFwiLmRlYWxcIik7XHJcbiAgICB0aGlzLiRoaXQgPSAkKFwiLmhpdFwiKTtcclxuICAgIHRoaXMuJHN0YW5kID0gJChcIi5zdGFuZFwiKTtcclxuICAgIHRoaXMuJGRvdWJsZURvd24gPSAkKFwiLmRvdWJsZS1kb3duXCIpO1xyXG4gICAgdGhpcy4kc3BsaXQgPSAkKFwiLnNwbGl0XCIpO1xyXG4gIH1cclxuXHJcbiAgYWRqdXN0U3BhY2UoKSB7XHJcbiAgICBsZXQgc2l6ZTtcclxuICAgIHRoaXMuc3BsaXRJblBsYXkgPyBzaXplID0gNTAgOiBzaXplID0gMTAwO1xyXG4gICAgJChcIi5wbGF5ZXJIYW5kLWRpdlwiKS5jc3MoXCJ3aWR0aFwiLCBgJHtzaXplfSVgKTtcclxuICB9XHJcblxyXG4gIGRlYWwoKSB7XHJcbiAgICB0aGlzLnN0YXJ0R2FtZU1vZGUoKTtcclxuICAgIHRoaXMuZ2FtZURlY2suc2h1ZmZsZSgpO1xyXG4gICAgdGhpcy5kZWFsT25lQ2FyZCh0aGlzLmRlYWxlckhhbmQsIFwiaG9sZVwiKTtcclxuICAgIHRoaXMuZGVhbE9uZUNhcmQodGhpcy5wbGF5ZXJIYW5kKTtcclxuICAgIGxldCBkZWFsZXJQb2ludHMgPSB0aGlzLmRlYWxPbmVDYXJkKHRoaXMuZGVhbGVySGFuZCk7XHJcbiAgICBsZXQgcGxheWVyUG9pbnRzID0gdGhpcy5kZWFsT25lQ2FyZCh0aGlzLnBsYXllckhhbmQpO1xyXG4gICAgdGhpcy5kZWFsZXJIYW5kLnVwZGF0ZURpc3BsYXkoXCI/XCIpOyAvLyBjb25jZWFsIGRlYWxlciB0b3RhbFxyXG5cclxuICAgIGlmIChkZWFsZXJQb2ludHMgPT09IDIxICYmIHBsYXllclBvaW50cyA9PT0gMjEpIHtcclxuICAgICAgdGhpcy5vdXRjb21lKFwicHVzaFwiKTtcclxuICAgICAgdGhpcy5kZWFsZXJIYW5kLnVwZGF0ZURpc3BsYXkoXCJCbGFja2phY2tcIik7XHJcbiAgICAgIHRoaXMucGxheWVySGFuZC51cGRhdGVEaXNwbGF5KFwiQkxBQ0tKQUNLLCBIT1QgREFNTiFcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChkZWFsZXJQb2ludHMgPT09IDIxKSB7XHJcbiAgICAgIHRoaXMub3V0Y29tZShcImxvc2VcIik7XHJcbiAgICAgIHRoaXMuZGVhbGVySGFuZC51cGRhdGVEaXNwbGF5KFwiQmxhY2tqYWNrXCIpO1xyXG4gICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJEZWFsZXIgd2luc1wiKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHBsYXllclBvaW50cyA9PT0gMjEpIHtcclxuICAgICAgdGhpcy5vdXRjb21lKFwiYmxhY2tqYWNrXCIpO1xyXG4gICAgICB0aGlzLmRlYWxlckhhbmQudXBkYXRlRGlzcGxheShkZWFsZXJQb2ludHMpO1xyXG4gICAgICB0aGlzLnBsYXllckhhbmQudXBkYXRlRGlzcGxheShcIkJMQUNLSkFDSywgSE9UIERBTU4hXCIpO1xyXG4gICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJZb3Ugd2luIVwiKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXMud2FsbGV0Lm1vbmV5ID4gdGhpcy53YWxsZXQuYmV0ICogMikge1xyXG4gICAgICBpZiAocGxheWVyUG9pbnRzID09PSAxMSkgIHtcclxuICAgICAgICB0aGlzLmVuYWJsZSh0aGlzLiRkb3VibGVEb3duKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5wbGF5ZXJIYW5kLmNhblNwbGl0KCkpIHtcclxuICAgICAgICB0aGlzLmVuYWJsZSh0aGlzLiRzcGxpdCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRlYWxPbmVDYXJkKGhhbmQsIHNwZWNpYWwpIHtcclxuICAgIGxldCBjYXJkID0gdGhpcy5nYW1lRGVjay5kcmF3KCk7XHJcbiAgICBsZXQgJGNhcmQgPSAkKFwiPGltZyAvPlwiLCB7XHJcbiAgICAgIFwiY2xhc3NcIjogXCJjYXJkXCIsIFxyXG4gICAgICBcInNyY1wiOiBgJHtjYXJkLmdldEltYWdlVXJsKCl9YFxyXG4gICAgfSk7XHJcbiAgICBpZiAoc3BlY2lhbCA9PT0gXCJob2xlXCIpIHtcclxuICAgICAgJGNhcmQuYXR0cignc3JjJywgXCJpbWFnZXMvYmFjay1zdWl0cy1yZWQuc3ZnXCIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoc3BlY2lhbCA9PT0gXCJkb3VibGUtZG93blwiKSB7XHJcbiAgICAgICRjYXJkLmFkZENsYXNzKCdjYXJkLWRkJyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChzcGVjaWFsID09PSBcInNwbGl0XCIpIHtcclxuICAgICAgJGNhcmQuYWRkQ2xhc3MoJ3NwbGl0Jyk7XHJcbiAgICB9XHJcbiAgICBoYW5kLmFkZENhcmQoY2FyZCwgJGNhcmQpO1xyXG4gICAgaGFuZC51cGRhdGVEaXNwbGF5KGhhbmQuZ2V0UG9pbnRzKCkpO1xyXG4gICAgcmV0dXJuIGhhbmQuZ2V0UG9pbnRzKCk7XHJcbiAgfVxyXG5cclxuICBkZWFsZXJUdXJuKC4uLmhhbmRzKSB7XHJcbiAgICB0aGlzLmRlYWxlckhhbmQucmV2ZWFsSG9sZSgpO1xyXG4gICAgd2hpbGUgKHRoaXMuZGVhbGVySGFuZC5nZXRQb2ludHMoKSA8IDE3KSB7XHJcbiAgICAgIHRoaXMuZGVhbE9uZUNhcmQodGhpcy5kZWFsZXJIYW5kKTtcclxuICAgIH1cclxuICAgIGhhbmRzLmZvckVhY2goaGFuZCA9PiB7dGhpcy5ldmFsdWF0ZUhhbmQoaGFuZCl9KTtcclxuICB9XHJcblxyXG4gIGRpc2FibGUoLi4uZWxlbWVudHMpIHtcclxuICAgIGZvciAobGV0IGVsZW1lbnQgb2YgZWxlbWVudHMpIHtcclxuICAgICAgZWxlbWVudC5hdHRyKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkb3VibGVEb3duKCkge1xyXG4gICAgdGhpcy53YWxsZXQuZG91YmxlQmV0KCk7XHJcbiAgICAvLyBkZWFsIHRoZSBwbGF5ZXIgb25lIG1vcmUgY2FyZCBhbmQgdGhlbiBtb3ZlIG9uIHRvIHRoZSBkZWFsZXIncyB0dXJuXHJcbiAgICB0aGlzLmRlYWxPbmVDYXJkKHRoaXMucGxheWVySGFuZCwgXCJkb3VibGUtZG93blwiKTtcclxuICAgIHRoaXMuc3RhbmQoXCJkb3VibGUtZG93blwiKTtcclxuICB9XHJcblxyXG4gIGVuYWJsZSguLi5lbGVtZW50cykge1xyXG4gICAgZm9yIChsZXQgZWxlbWVudCBvZiBlbGVtZW50cykge1xyXG4gICAgICBlbGVtZW50LmF0dHIoXCJkaXNhYmxlZFwiLCBmYWxzZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBlbmRHYW1lTW9kZSgpIHtcclxuICAgIHRoaXMucGxheWVySGFuZC5wbGF5aW5nID0gZmFsc2U7XHJcbiAgICB0aGlzLnNlbGVjdEN1cnJlbnRIYW5kKHRoaXMucGxheWVySGFuZCk7XHJcbiAgICB0aGlzLmRlYWxlckhhbmQucmV2ZWFsSG9sZSgpO1xyXG4gICAgdGhpcy5kZWFsZXJIYW5kLnVwZGF0ZURpc3BsYXkodGhpcy5kZWFsZXJIYW5kLmdldFBvaW50cygpKTtcclxuXHJcbiAgICB0aGlzLndhbGxldC51cGRhdGUoKTtcclxuICAgIHRoaXMud2FsbGV0LmFzc2Vzc0NoYW5nZSgpO1xyXG4gICAgJChcIi5iZXR0aW5nIC5idXR0b25zXCIpLnNob3coKTtcclxuICAgIHRoaXMuZW5hYmxlKHRoaXMuJGRlYWwpO1xyXG4gICAgdGhpcy5kaXNhYmxlKHRoaXMuJGhpdCwgdGhpcy4kc3RhbmQpO1xyXG4gIH1cclxuXHJcbiAgZXZhbHVhdGVIYW5kKGhhbmQpIHtcclxuICAgIGxldCBkZWFsZXJQb2ludHMgPSB0aGlzLmRlYWxlckhhbmQuZ2V0UG9pbnRzKCk7XHJcbiAgICBsZXQgcGxheWVyUG9pbnRzID0gaGFuZC5nZXRQb2ludHMoKTtcclxuICAgIGlmIChkZWFsZXJQb2ludHMgPiAyMSB8fCBwbGF5ZXJQb2ludHMgPiBkZWFsZXJQb2ludHMpIHtcclxuICAgICAgaGFuZC5vdXRjb21lID0gXCJ3aW5cIjtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHBsYXllclBvaW50cyA8IGRlYWxlclBvaW50cykge1xyXG4gICAgICBoYW5kLm91dGNvbWUgPSBcImxvc2VcIjtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBoYW5kLm91dGNvbWUgPSBcInB1c2hcIjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGhpdCgpIHtcclxuICAgIHRoaXMuZGlzYWJsZSh0aGlzLiRkb3VibGVEb3duLCB0aGlzLiRzcGxpdCk7XHJcbiAgICBpZiAoIXRoaXMuc3BsaXRJblBsYXkpIHtcclxuICAgICAgbGV0IHBsYXllclBvaW50cyA9IHRoaXMuZGVhbE9uZUNhcmQodGhpcy5wbGF5ZXJIYW5kKTtcclxuICAgICAgaWYgKHBsYXllclBvaW50cyA+IDIxKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiWW91IGJ1c3RcIik7XHJcbiAgICAgICAgdGhpcy5vdXRjb21lKFwibG9zZVwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIGxldCBjdXJyZW50SGFuZCA9IHRoaXMuc2VsZWN0Q3VycmVudEhhbmQodGhpcy5wbGF5ZXJIYW5kLCB0aGlzLnBsYXllckhhbmQyKTtcclxuICAgICAgbGV0IHBsYXllclBvaW50cyA9IHRoaXMuZGVhbE9uZUNhcmQoY3VycmVudEhhbmQsIFwic3BsaXRcIik7XHJcbiAgICAgIGlmIChwbGF5ZXJQb2ludHMgPiAyMSkge1xyXG4gICAgICAgIGlmIChjdXJyZW50SGFuZCA9PT0gdGhpcy5wbGF5ZXJIYW5kKSB7XHJcbiAgICAgICAgICB0aGlzLnBsYXllckhhbmQub3V0Y29tZSA9IFwibG9zZVwiO1xyXG4gICAgICAgICAgdGhpcy5wbGF5ZXJIYW5kLnBsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMucGxheWVySGFuZDIucGxheWluZyA9IHRydWU7XHJcbiAgICAgICAgICB0aGlzLnNlbGVjdEN1cnJlbnRIYW5kKHRoaXMucGxheWVySGFuZCwgdGhpcy5wbGF5ZXJIYW5kMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGN1cnJlbnRIYW5kID09PSB0aGlzLnBsYXllckhhbmQyKSB7XHJcbiAgICAgICAgICB0aGlzLnBsYXllckhhbmQyLm91dGNvbWUgPSBcImxvc2VcIjtcclxuICAgICAgICAgIHRoaXMucGxheWVySGFuZDIucGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5zZWxlY3RDdXJyZW50SGFuZCh0aGlzLnBsYXllckhhbmQsIHRoaXMucGxheWVySGFuZDIpO1xyXG4gICAgICAgICAgdGhpcy5pbnZva2VPdXRjb21lKHRoaXMucGxheWVySGFuZCwgdGhpcy5wbGF5ZXJIYW5kMik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpbnZva2VPdXRjb21lKC4uLmhhbmRzKSB7XHJcbiAgICBsZXQgaGFuZDEgPSBoYW5kc1swXS5vdXRjb21lO1xyXG4gICAgaWYgKGhhbmRzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICBpZiAoaGFuZDEgPT09IFwid2luXCIpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJZb3Ugd2luIVwiKTtcclxuICAgICAgICB0aGlzLm91dGNvbWUoXCJ3aW5cIik7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAoaGFuZDEgPT09IFwibG9zZVwiKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiRGVhbGVyIHdpbnNcIik7XHJcbiAgICAgICAgdGhpcy5vdXRjb21lKFwibG9zZVwiKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICB0aGlzLm91dGNvbWUoXCJwdXNoXCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChoYW5kcy5sZW5ndGggPT09IDIpIHtcclxuICAgICAgbGV0IGhhbmQyID0gaGFuZHNbMV0ub3V0Y29tZTtcclxuICAgICAgaWYgKGhhbmQxID09PSBoYW5kMikge1xyXG4gICAgICAgIGlmIChoYW5kMSA9PT0gXCJibGFja2phY2tcIiAmJiBoYW5kMiA9PT0gXCJibGFja2phY2tcIikge1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiVFdPIEJMQUNLSkFDS1MhISFcIik7XHJcbiAgICAgICAgICB0aGlzLm91dGNvbWUoXCJibGFja2phY2tcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGhhbmQxID09PSBcIndpblwiICYmIGhhbmQyID09PSBcIndpblwiKSB7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJZb3Ugd2luIGJvdGghXCIpO1xyXG4gICAgICAgICAgdGhpcy5vdXRjb21lKFwid2luXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChoYW5kMSA9PT0gXCJsb3NlXCIgJiYgaGFuZDIgPT09IFwibG9zZVwiKSB7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJEZWFsZXIgd2lucyBib3RoXCIpO1xyXG4gICAgICAgICAgdGhpcy5vdXRjb21lKFwibG9zZVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLm91dGNvbWUoXCJwdXNoXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmIChoYW5kMSAhPT0gaGFuZDIpIHtcclxuICAgICAgICAvLyBjYWxjdWxhdGUgdmFsdWUgb2YgZWFjaCBoYW5kIG91dGNvbWUgYW5kIGNvbWJpbmUgdGhlIHR3byBiZWZvcmUgY2FsbGluZyBvdXRjb21lIGZ1bmN0aW9uXHJcbiAgICAgICAgbGV0IGhhbmRWYWx1ZTEgPSB0aGlzLndhbGxldC5iZXQgLyAyO1xyXG4gICAgICAgIGxldCBoYW5kVmFsdWUyID0gdGhpcy53YWxsZXQuYmV0IC8gMjtcclxuICAgICAgICBpZiAoaGFuZDEgPT09IFwiYmxhY2tqYWNrXCIgfHwgaGFuZDIgPT09IFwiYmxhY2tqYWNrXCIpIHtcclxuICAgICAgICAgIGhhbmRWYWx1ZTEgPSB0aGlzLndhbGxldC5iZXQgKiAxLjU7XHJcbiAgICAgICAgICBpZiAoaGFuZDEgPT09IFwid2luXCIgfHwgaGFuZDIgPT09IFwid2luXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5vdXRjb21lKFwid2luXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRCZXQgKz0gYmV0O1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJZb3Ugd2luIGJvdGghXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZSBpZiAoaGFuZDEgPT09IFwibG9zZVwiIHx8IGhhbmQyID09PSBcImxvc2VcIikge1xyXG4gICAgICAgICAgICB0aGlzLm91dGNvbWUoXCJ3aW5cIik7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEJldCAtPSBiZXQ7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIllvdSBhbmQgZGVhbGVyIGVhY2ggd2luIG9uZVwiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm91dGNvbWUoXCJ3aW5cIik7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIllvdSB3aW4gb25lLCBwdXNoXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChoYW5kMSA9PT0gXCJ3aW5cIiB8fCBoYW5kMiA9PT0gXCJ3aW5cIikge1xyXG4gICAgICAgICAgaWYgKGhhbmQxID09PSBcInB1c2hcIiB8fCBoYW5kMiA9PT0gXCJwdXNoXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5vdXRjb21lKFwid2luXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJZb3Ugd2luIG9uZSwgcHVzaFwiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm91dGNvbWUoXCJwdXNoXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChoYW5kMSA9PT0gXCJsb3NlXCIgfHwgaGFuZDIgPT09IFwibG9zZVwiKSB7XHJcbiAgICAgICAgICB0aGlzLm91dGNvbWUoXCJsb3NlXCIpO1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiRGVhbGVyIHdpbnMgb25lLCBwdXNoXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc3BsaXRJblBsYXkgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG1ha2VCZXQoKSB7XHJcbiAgICBjb25zdCBnYW1lID0gdGhpcztcclxuICAgIHRoaXMud2FsbGV0LnVwZGF0ZSgpO1xyXG4gICAgJChcIi5iZXQtYnRuXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgIGNvbnN0IHBvc3NpYmxlQmV0ID0gZ2FtZS53YWxsZXQubW9uZXkgLSBnYW1lLndhbGxldC5iZXQ7XHJcbiAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKFwiYWRkMTBcIikgJiYgcG9zc2libGVCZXQgPj0gMTApIHtcclxuICAgICAgICBnYW1lLndhbGxldC5iZXQgKz0gMTA7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAoJCh0aGlzKS5oYXNDbGFzcyhcImFkZDUwXCIpICYmIHBvc3NpYmxlQmV0ID49IDUwKSB7XHJcbiAgICAgICAgZ2FtZS53YWxsZXQuYmV0ICs9IDUwO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKCQodGhpcykuaGFzQ2xhc3MoXCJhZGQxMDBcIikgJiYgcG9zc2libGVCZXQgPj0gMTAwKSB7XHJcbiAgICAgICAgZ2FtZS53YWxsZXQuYmV0ICs9IDEwMDtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmICgkKHRoaXMpLmhhc0NsYXNzKFwiYWRkNTAwXCIpICYmIHBvc3NpYmxlQmV0ID49IDUwMCkge1xyXG4gICAgICAgIGdhbWUud2FsbGV0LmJldCArPSA1MDA7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAoJCh0aGlzKS5oYXNDbGFzcyhcImFsbC1pblwiKSkge1xyXG4gICAgICAgIGdhbWUud2FsbGV0LmJldCA9IGdhbWUud2FsbGV0Lm1vbmV5O1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKCQodGhpcykuaGFzQ2xhc3MoXCJyZXNldFwiKSkge1xyXG4gICAgICAgIGdhbWUud2FsbGV0LmJldCA9IDEwO1xyXG4gICAgICB9XHJcbiAgICAgIGdhbWUuJGJldC50ZXh0KGdhbWUud2FsbGV0LmJldCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG1vZGFsKG1vZGFsVHlwZSkge1xyXG4gICAgaWYgKG1vZGFsVHlwZSA9PT0gXCJiYW5rcnVwdFwiKSB7XHJcbiAgICAgICQoXCIubW9kYWwsIC5tb2RhbC1vdmVybGF5XCIpLnJlbW92ZUNsYXNzKFwiaGlkZVwiKTtcclxuICAgICAgJChcIi5tb2RhbCAubWVzc2FnZVwiKS5odG1sKFxyXG4gICAgICAgIFwiWW91J3ZlIGxvc3QgZXZlcnl0aGluZy5cIiArXHJcbiAgICAgICAgICBcIjxici8+PGJyLz5cIiArXHJcbiAgICAgICAgICBcIkdvb2QgdGhpbmcgaXQncyBub3QgcmVhbCBtb25leSFcIlxyXG4gICAgICApO1xyXG4gICAgICAkKFwiLm1vZGFsLWd1dHMgYnV0dG9uXCIpLnRleHQoXCJQbGF5IGFnYWluXCIpO1xyXG4gICAgICAkKFwiLm1vZGFsLWd1dHMgYnV0dG9uXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJChcIi5tb2RhbCwgLm1vZGFsLW92ZXJsYXlcIikuYWRkQ2xhc3MoXCJoaWRlXCIpO1xyXG4gICAgICAgICQoXCIudGl0bGUtc2NyZWVuXCIpLnNob3coKTtcclxuICAgICAgICBnYW1lLnJlc2V0R2FtZSgpO1xyXG4gICAgICAgIHRoaXMud2FsbGV0LnJlc2V0KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIGlmIChtb2RhbFR5cGUgPT09IFwiaGVscFwiKSB7XHJcbiAgICAgIC8vIGZ1dHVyZSBnYW1lIGZlYXR1cmU6IGluc3RydWN0aW9ucyBhdmFpbGFibGUgaW4gaGVscCBtb2RhbFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb3V0Y29tZShyZXN1bHQpIHtcclxuICAgIGlmIChyZXN1bHQgPT09IFwiYmxhY2tqYWNrXCIpIHtcclxuICAgICAgdGhpcy53YWxsZXQubW9uZXkgKz0gdGhpcy53YWxsZXQuYmV0ICogMS41O1xyXG4gICAgICB0aGlzLndhbGxldC5jaGFuZ2UgPSB0aGlzLndhbGxldC5iZXQgKiAxLjU7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChyZXN1bHQgPT09IFwid2luXCIpIHtcclxuICAgICAgdGhpcy53YWxsZXQubW9uZXkgKz0gdGhpcy53YWxsZXQuYmV0O1xyXG4gICAgICB0aGlzLndhbGxldC5jaGFuZ2UgPSB0aGlzLndhbGxldC5iZXQ7XHJcbiAgICB9IFxyXG4gICAgZWxzZSBpZiAocmVzdWx0ID09PSBcInB1c2hcIikge1xyXG4gICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJQdXNoXCIpO1xyXG4gICAgICB0aGlzLndhbGxldC5jaGFuZ2UgPSAwO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAocmVzdWx0ID09PSBcImxvc2VcIikge1xyXG4gICAgICBpZiAodGhpcy53YWxsZXQubW9uZXkgLSB0aGlzLndhbGxldC5iZXQgPj0gMTApIHtcclxuICAgICAgICB0aGlzLndhbGxldC5tb25leSAtPSB0aGlzLndhbGxldC5iZXQ7XHJcbiAgICAgICAgdGhpcy53YWxsZXQuY2hhbmdlID0gLXRoaXMud2FsbGV0LmJldDtcclxuICAgICAgICAvLyBkcm9wIHRoZSBiZXQgYW1vdW50IGRvd24gdG8gZXF1YWwgd2FsbGV0Lm1vbmV5IGFtb3VudCBvZiBsYXN0IGJldCB2YWx1ZSBpcyBncmVhdGVyIHRoYW4gdG90YWwgd2FsbGV0Lm1vbmV5IHZhbHVlXHJcbiAgICAgICAgaWYgKHRoaXMud2FsbGV0LmJldCA+IHRoaXMud2FsbGV0Lm1vbmV5KSB7XHJcbiAgICAgICAgICB0aGlzLndhbGxldC5iZXQgPSB0aGlzLndhbGxldC5tb25leTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gXHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHRoaXMubW9kYWwoXCJiYW5rcnVwdFwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5lbmRHYW1lTW9kZSgpO1xyXG4gIH1cclxuXHJcbiAgcmVzZXRHYW1lKCkge1xyXG4gICAgdGhpcy5nYW1lRGVjayA9IG5ldyBEZWNrO1xyXG4gICAgdGhpcy5kZWFsZXJIYW5kID0gbmV3IEhhbmQoXCJkZWFsZXJcIik7XHJcbiAgICB0aGlzLnBsYXllckhhbmQgPSBuZXcgSGFuZChcInBsYXllclwiLCAxKTtcclxuICAgICQoXCIubWVzc2FnZXNcIikuZW1wdHkoKTtcclxuICAgICQoXCIucGxheWVyLWhhbmRcIikuZW1wdHkoKTtcclxuICAgICQoXCIuZGVhbGVyLWhhbmRcIikuZW1wdHkoKTtcclxuICAgICQoXCIucGxheWVyLXBvaW50c1wiKS5lbXB0eSgpO1xyXG4gICAgJChcIi5kZWFsZXItcG9pbnRzXCIpLmVtcHR5KCk7XHJcbiAgICAkKFwiLmNoYW5nZVwiKS5lbXB0eSgpO1xyXG4gIH1cclxuXHJcbiAgc2VsZWN0Q3VycmVudEhhbmQoLi4uaGFuZHMpIHtcclxuICAgIGxldCBjdXJyZW50SGFuZDtcclxuICAgIGZvciAobGV0IGhhbmQgb2YgaGFuZHMpIHtcclxuICAgICAgaGFuZC50b2dnbGVIaWdobGlnaHQoKTtcclxuICAgICAgaWYgKGhhbmQucGxheWluZykge1xyXG4gICAgICAgIGN1cnJlbnRIYW5kID0gaGFuZDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGN1cnJlbnRIYW5kO1xyXG4gIH1cclxuXHJcbiAgc3BsaXQoKSB7XHJcbiAgICB0aGlzLnNwbGl0SW5QbGF5ID0gdHJ1ZTtcclxuICAgIHRoaXMuZGlzYWJsZSh0aGlzLiRzcGxpdCk7XHJcbiAgICB0aGlzLndhbGxldC5kb3VibGVCZXQoKTtcclxuXHJcbiAgICAvLyBzdGFydCBhZGRpdGlvbmFsIGhhbmQgYW5kIG1vdmUgb25lIGNhcmQgZnJvbSBoYW5kIDEgdG8gaGFuZCAyXHJcbiAgICB0aGlzLmFkanVzdFNwYWNlKCk7XHJcbiAgICB0aGlzLnBsYXllckhhbmQyID0gbmV3IEhhbmQoXCJwbGF5ZXJcIiwgMik7XHJcbiAgICBsZXQgcmVtb3ZlZENhcmQgPSB0aGlzLnBsYXllckhhbmQucmVtb3ZlQ2FyZCgpO1xyXG4gICAgdGhpcy5wbGF5ZXJIYW5kMi5hZGRDYXJkKHJlbW92ZWRDYXJkLmNhcmQsIHJlbW92ZWRDYXJkLiRjYXJkKTtcclxuICAgIHRoaXMuZGVhbE9uZUNhcmQodGhpcy5wbGF5ZXJIYW5kKTtcclxuICAgIHRoaXMuZGVhbE9uZUNhcmQodGhpcy5wbGF5ZXJIYW5kMik7XHJcbiAgfVxyXG5cclxuICBzdGFuZChjYWxsZXIpIHtcclxuICAgIGlmICghdGhpcy5zcGxpdEluUGxheSkge1xyXG4gICAgICB0aGlzLmRpc2FibGUodGhpcy4kaGl0LCB0aGlzLiRzdGFuZCwgdGhpcy4kZG91YmxlRG93biwgdGhpcy4kc3BsaXQpO1xyXG4gICAgICAvLyBpZiBzdGFuZCB3YXMgY2FsbGVkIGJ5IGNsaWNraW5nICdkb3VibGUgZG93bicsIGRvIGFkZGl0aW9uYWwgd29ya1xyXG4gICAgICBpZiAoY2FsbGVyID09PSBcImRvdWJsZS1kb3duXCIpIHtcclxuICAgICAgICB0aGlzLmJldCA9IHRoaXMuYmV0IC8gMjtcclxuICAgICAgICAkKFwiLmJldFwiKS50ZXh0KHRoaXMuYmV0KTtcclxuICAgICAgICB0aGlzLmRpc2FibGUodGhpcy4kZG91YmxlRG93bik7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5kZWFsZXJUdXJuKHRoaXMucGxheWVySGFuZCk7XHJcbiAgICAgIHRoaXMuaW52b2tlT3V0Y29tZSh0aGlzLnBsYXllckhhbmQpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIGxldCBjdXJyZW50SGFuZCA9IHRoaXMuc2VsZWN0Q3VycmVudEhhbmQodGhpcy5wbGF5ZXJIYW5kLCB0aGlzLnBsYXllckhhbmQyKTtcclxuICAgICAgaWYgKGN1cnJlbnRIYW5kID09PSB0aGlzLnBsYXllckhhbmQpIHtcclxuICAgICAgICB0aGlzLnBsYXllckhhbmQucGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucGxheWVySGFuZDIucGxheWluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RDdXJyZW50SGFuZCh0aGlzLnBsYXllckhhbmQsIHRoaXMucGxheWVySGFuZDIpO1xyXG4gICAgICB9IFxyXG4gICAgICBlbHNlIGlmIChjdXJyZW50SGFuZCA9PT0gdGhpcy5wbGF5ZXJIYW5kMikge1xyXG4gICAgICAgIHRoaXMucGxheWVySGFuZDIucGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0Q3VycmVudEhhbmQodGhpcy5wbGF5ZXJIYW5kLCB0aGlzLnBsYXllckhhbmQyKTtcclxuICAgICAgICB0aGlzLmRlYWxlclR1cm4odGhpcy5wbGF5ZXJIYW5kLCB0aGlzLnBsYXllckhhbmQyKTtcclxuICAgICAgICB0aGlzLmludm9rZU91dGNvbWUodGhpcy5wbGF5ZXJIYW5kLCB0aGlzLnBsYXllckhhbmQyKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhcnRHYW1lTW9kZSgpIHtcclxuICAgICQoXCIudGl0bGUtc2NyZWVuXCIpLmhpZGUoKTtcclxuICAgIHRoaXMuYWRqdXN0U3BhY2UoKTtcclxuICAgIHRoaXMuZW5hYmxlKHRoaXMuJGhpdCwgdGhpcy4kc3RhbmQpO1xyXG4gICAgdGhpcy5kaXNhYmxlKHRoaXMuJGRlYWwpO1xyXG4gICAgJChcIi5iZXR0aW5nIC5idXR0b25zXCIpLmhpZGUoKTtcclxuICAgIHRoaXMucGxheWVySGFuZC5wbGF5aW5nID0gdHJ1ZTtcclxuICAgIHRoaXMuc2VsZWN0Q3VycmVudEhhbmQodGhpcy5wbGF5ZXJIYW5kKTsgIFxyXG4gIH1cclxuXHJcbiAgdXBkYXRlTWVzc2FnZShtZXNzYWdlKSB7XHJcbiAgICAkKFwiLm1lc3NhZ2VzXCIpLmFwcGVuZChgPGgxPiR7bWVzc2FnZX08L2gxPmApO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9nYW1lLmpzIiwiaW1wb3J0IENhcmQgZnJvbSBcIi4vY2FyZFwiO1xyXG5pbXBvcnQgSGFuZCBmcm9tIFwiLi9oYW5kXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZWNrIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuY2FyZHMgPSBbXTtcclxuICB9XHJcblxyXG4gIGRyYXcoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jYXJkcy5wb3AoKTtcclxuICB9XHJcblxyXG4gIGdlbmVyYXRlKG51bURlY2tzKSB7XHJcbiAgICBpZiAoIW51bURlY2tzKSB7XHJcbiAgICAgIG51bURlY2tzID0gMTtcclxuICAgIH1cclxuICAgIHdoaWxlIChudW1EZWNrcyA+IDApIHtcclxuICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gMTM7IGkrKykge1xyXG4gICAgICAgIHRoaXMuY2FyZHMucHVzaChuZXcgQ2FyZChpLCBcInNwYWRlc1wiKSk7XHJcbiAgICAgICAgdGhpcy5jYXJkcy5wdXNoKG5ldyBDYXJkKGksIFwiZGlhbW9uZHNcIikpO1xyXG4gICAgICAgIHRoaXMuY2FyZHMucHVzaChuZXcgQ2FyZChpLCBcImhlYXJ0c1wiKSk7XHJcbiAgICAgICAgdGhpcy5jYXJkcy5wdXNoKG5ldyBDYXJkKGksIFwiY2x1YnNcIikpO1xyXG4gICAgICB9XHJcbiAgICAgIG51bURlY2tzLS07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzaHVmZmxlKCkge1xyXG4gICAgZm9yIChsZXQgaSA9IHRoaXMuY2FyZHMubGVuZ3RoIC0gMTsgaSA+IDA7IGktLSkge1xyXG4gICAgICBjb25zdCBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGkgKyAxKSk7XHJcbiAgICAgIFt0aGlzLmNhcmRzW2ldXSA9IFt0aGlzLmNhcmRzW2pdXTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvZGVjay5qcyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhbGxldCB7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHR0aGlzLm1vbmV5ID0gNTAwO1xyXG5cdFx0dGhpcy5iZXQgPSAxMDtcclxuXHRcdHRoaXMuY2hhbmdlID0gXCJcIjtcclxuXHJcblx0XHR0aGlzLiR0b3RhbCA9ICQoXCIudG90YWxcIik7XHJcblx0XHR0aGlzLiRiZXQgPSAkKFwiLmN1cnJlbnRCZXRcIik7XHJcblx0XHR0aGlzLiRjaGFuZ2UgPSAkKFwiLmNoYW5nZVwiKTtcclxuXHR9XHJcblxyXG5cdGFzc2Vzc0NoYW5nZSgpIHtcclxuXHRcdGxldCBjbGFzc05hbWUgPSBcIlwiO1xyXG5cdFx0bGV0IHN5bWJvbCA9IFwiXCI7XHJcblx0XHRpZiAodGhpcy5jaGFuZ2UgPiAwKSB7XHJcblx0XHRcdGNsYXNzTmFtZSA9IFwicG9zaXRpdmVcIjtcclxuXHRcdFx0c3ltYm9sID0gXCIrXCI7XHJcblx0XHR9IGVsc2UgaWYgKHRoaXMuY2hhbmdlIDwgMCkge1xyXG5cdFx0XHRjbGFzc05hbWUgPSBcIm5lZ2F0aXZlXCI7XHJcblx0XHRcdHN5bWJvbCA9IFwiLVwiO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy4kY2hhbmdlLmFwcGVuZChgPHNwYW4gY2xhc3M9XCIke2NsYXNzTmFtZX1cIj4ke3N5bWJvbH0gJCR7TWF0aC5hYnModGhpcy5jaGFuZ2UpfTwvc3Bhbj5gKTtcclxuXHR9XHJcblx0XHJcblx0ZG91YmxlQmV0KCkge1xyXG5cdFx0dGhpcy5tb25leSAtPSB0aGlzLmJldDtcclxuXHRcdHRoaXMuYmV0ICo9IDI7XHJcblx0XHR0aGlzLnVwZGF0ZSgpO1xyXG5cdH1cclxuXHJcblx0cmVzZXQoKSB7XHJcblx0XHR0aGlzLm1vbmV5ID0gNTAwO1xyXG5cdFx0dGhpcy5iZXQgPSAxMDtcclxuXHRcdHRoaXMuY2hhbmdlID0gXCJcIjtcclxuXHRcdHRoaXMudXBkYXRlKCk7XHJcblx0fVxyXG5cclxuXHR1cGRhdGUoKSB7XHJcblx0XHR0aGlzLiR0b3RhbC50ZXh0KHRoaXMubW9uZXkpO1xyXG5cdFx0dGhpcy4kYmV0LnRleHQodGhpcy5iZXQpO1xyXG5cdH1cclxuXHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy93YWxsZXQuanMiXSwic291cmNlUm9vdCI6IiJ9