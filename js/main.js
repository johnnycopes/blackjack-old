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
        this.updateMessage("Push");
        this.dealerHand.updateDisplay("Blackjack");
        this.playerHand.updateDisplay("BLACKJACK, HOT DAMN!");
      } else if (dealerPoints === 21) {
        this.updateMessage("Dealer wins");
        this.dealerHand.updateDisplay("Blackjack");
        this.outcome("lose");
      } else if (playerPoints === 21) {
        this.updateMessage("You win!");
        this.dealerHand.updateDisplay(dealerPoints);
        this.playerHand.updateDisplay("BLACKJACK, HOT DAMN!");
        this.outcome("win");
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
      this.stand();
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
        } else if (hand1 === "lose") {
          this.updateMessage("Dealer wins");
        }
        this.outcome(hand1);
      } else if (hands.length === 2) {
        this.multipleOutcomes(hands);
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
    key: "multipleOutcomes",
    value: function multipleOutcomes(hands) {
      var hand1 = hands[0].outcome;
      var hand2 = hands[1].outcome;
      if (hand1 === hand2) {
        if (hand1 === "blackjack" && hand2 === "blackjack") {
          this.updateMessage("TWO BLACKJACKS!!!");
          this.wallet.blackjack();
        } else if (hand1 === "win" && hand2 === "win") {
          this.updateMessage("You win both!");
          this.wallet.win();
        } else if (hand1 === "lose" && hand2 === "lose") {
          this.updateMessage("Dealer wins both");
          this.wallet.lose();
        } else {
          this.updateMessage("Push both");
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

        // this.change = handValue1 + handValue2;

        // if (this.wallet.bet > 0) {
        //   this.outcome("win");
        // }
        // else if (this.wallet.bet < 0) {
        //   this.outcome("lose");
        // }
        // else {
        //   this.outcome("push");
        // }
      }
      this.splitInPlay = false;
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

    // this function can likely be replaced with wallet functions to handle money

  }, {
    key: "outcome",
    value: function outcome(result) {
      if (result === "blackjack") {
        this.wallet.blackjack();
      } else if (result === "win") {
        this.wallet.win();
      } else if (result === "push") {
        this.updateMessage("Push");
      } else if (result === "lose") {
        if (this.wallet.money - this.wallet.bet >= 10) {
          this.wallet.lose();
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
    value: function stand() {
      if (!this.splitInPlay) {
        this.disable(this.$hit, this.$stand, this.$doubleDown, this.$split);
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
		key: "blackjack",
		value: function blackjack() {
			this.money += this.bet * 1.5;
			this.change = this.bet * 1.5;
		}
	}, {
		key: "doubleBet",
		value: function doubleBet() {
			this.money -= this.bet;
			this.bet *= 2;
			this.update();
		}
	}, {
		key: "lose",
		value: function lose() {
			this.money -= this.bet;
			this.change = -this.bet;
			// drop the bet amount down to equal money amount of last bet value is greater than total money value
			if (this.bet > this.money) {
				this.bet = this.money;
			}
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
	}, {
		key: "win",
		value: function win() {
			this.money += this.bet;
			this.change = this.bet;
		}
	}]);

	return Wallet;
}();

exports.default = Wallet;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgN2U2YWVlOWZhZWM2MTQ4ZmQwYjQiLCJ3ZWJwYWNrOi8vLy4vanMvaGFuZC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jYXJkLmpzIiwid2VicGFjazovLy8uL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9nYW1lLmpzIiwid2VicGFjazovLy8uL2pzL2RlY2suanMiLCJ3ZWJwYWNrOi8vLy4vanMvd2FsbGV0LmpzIl0sIm5hbWVzIjpbIkhhbmQiLCJvd25lciIsImhhbmROdW1iZXIiLCJzZWxlY3RvciIsIiR3cmFwcGVyIiwiJCIsIiRoYW5kIiwiJHBvaW50cyIsInBsYXlpbmciLCJjYXJkcyIsIm91dGNvbWUiLCJjYXJkIiwiJGNhcmQiLCJwdXNoIiwiYXBwZW5kIiwicG9pbnQiLCJ0b3RhbCIsImFjZXMiLCJwb3AiLCJmaW5kIiwicmVtb3ZlIiwiYXR0ciIsImdldEltYWdlVXJsIiwiaW5kZXgiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwiY29udGVudCIsInRleHQiLCJDYXJkIiwic3VpdCIsInZhbHVlIiwiY3VycmVudEdhbWUiLCJtYWtlQmV0Iiwib24iLCJyZXNldEdhbWUiLCJnYW1lRGVjayIsImdlbmVyYXRlIiwiZGVhbCIsImhpdCIsInN0YW5kIiwiZG91YmxlRG93biIsInNwbGl0IiwiR2FtZSIsIndhbGxldCIsImRlYWxlckhhbmQiLCJwbGF5ZXJIYW5kIiwic3BsaXRJblBsYXkiLCIkdG90YWwiLCIkYmV0IiwiJGNoYW5nZSIsIiRkZWFsIiwiJGhpdCIsIiRzdGFuZCIsIiRkb3VibGVEb3duIiwiJHNwbGl0Iiwic2l6ZSIsImNzcyIsInN0YXJ0R2FtZU1vZGUiLCJzaHVmZmxlIiwiZGVhbE9uZUNhcmQiLCJkZWFsZXJQb2ludHMiLCJwbGF5ZXJQb2ludHMiLCJ1cGRhdGVEaXNwbGF5IiwidXBkYXRlTWVzc2FnZSIsIm1vbmV5IiwiYmV0IiwiZW5hYmxlIiwiY2FuU3BsaXQiLCJoYW5kIiwic3BlY2lhbCIsImRyYXciLCJhZGRDYXJkIiwiZ2V0UG9pbnRzIiwicmV2ZWFsSG9sZSIsImhhbmRzIiwiZm9yRWFjaCIsImV2YWx1YXRlSGFuZCIsImVsZW1lbnRzIiwiZWxlbWVudCIsImRvdWJsZUJldCIsInNlbGVjdEN1cnJlbnRIYW5kIiwidXBkYXRlIiwiYXNzZXNzQ2hhbmdlIiwic2hvdyIsImRpc2FibGUiLCJjdXJyZW50SGFuZCIsInBsYXllckhhbmQyIiwiaW52b2tlT3V0Y29tZSIsImhhbmQxIiwibGVuZ3RoIiwibXVsdGlwbGVPdXRjb21lcyIsImdhbWUiLCJwb3NzaWJsZUJldCIsImhhc0NsYXNzIiwiaGFuZDIiLCJibGFja2phY2siLCJ3aW4iLCJsb3NlIiwiaW5pdGlhbEJldCIsImhhbmRWYWx1ZTEiLCJoYW5kVmFsdWUyIiwibW9kYWxUeXBlIiwiaHRtbCIsInJlc2V0IiwicmVzdWx0IiwibW9kYWwiLCJlbmRHYW1lTW9kZSIsImVtcHR5IiwidG9nZ2xlSGlnaGxpZ2h0IiwiYWRqdXN0U3BhY2UiLCJyZW1vdmVkQ2FyZCIsInJlbW92ZUNhcmQiLCJkZWFsZXJUdXJuIiwiaGlkZSIsIm1lc3NhZ2UiLCJEZWNrIiwibnVtRGVja3MiLCJpIiwiaiIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIldhbGxldCIsImNoYW5nZSIsImNsYXNzTmFtZSIsInN5bWJvbCIsImFicyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDN0RBOzs7Ozs7OztJQUVxQkEsSTtBQUNuQixnQkFBWUMsS0FBWixFQUFtQkMsVUFBbkIsRUFBK0I7QUFBQTs7QUFDN0IsUUFBSUMsaUJBQUo7QUFDQSxRQUFJRixVQUFVLFFBQWQsRUFBd0I7QUFDdEJFLGlCQUFXLFNBQVg7QUFDRCxLQUZELE1BR0ssSUFBSUYsVUFBVSxRQUFkLEVBQXdCO0FBQzNCLFVBQUlDLGVBQWUsQ0FBbkIsRUFBc0I7QUFDcEJDLG1CQUFXLFFBQVg7QUFDRCxPQUZELE1BR0ssSUFBSUQsZUFBZSxDQUFuQixFQUFzQjtBQUN6QkMsbUJBQVcsUUFBWDtBQUNEO0FBQ0Y7QUFDRCxTQUFLQyxRQUFMLEdBQWdCQyxPQUFLRixRQUFMLENBQWhCO0FBQ0EsU0FBS0csS0FBTCxHQUFhRCxFQUFLRixRQUFMLFlBQWI7QUFDQSxTQUFLSSxPQUFMLEdBQWVGLEVBQUtGLFFBQUwsY0FBZjtBQUNBLFNBQUtLLE9BQUwsR0FBZSxLQUFmO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLEVBQWI7QUFDQSxTQUFLQyxPQUFMO0FBQ0Q7Ozs7NEJBRU9DLEksRUFBTUMsSyxFQUFPO0FBQ25CLFdBQUtILEtBQUwsQ0FBV0ksSUFBWCxDQUFnQkYsSUFBaEI7QUFDQSxXQUFLTCxLQUFMLENBQVdRLE1BQVgsQ0FBa0JGLEtBQWxCO0FBQ0Q7OzsrQkFFVTtBQUNULGFBQU8sS0FBS0gsS0FBTCxDQUFXLENBQVgsRUFBY00sS0FBZCxLQUF3QixLQUFLTixLQUFMLENBQVcsQ0FBWCxFQUFjTSxLQUE3QztBQUNEOzs7Z0NBRVc7QUFDVixVQUFJQyxRQUFRLENBQVo7QUFDQSxVQUFJQyxPQUFPLENBQVg7QUFGVTtBQUFBO0FBQUE7O0FBQUE7QUFHViw2QkFBaUIsS0FBS1IsS0FBdEIsOEhBQTZCO0FBQUEsY0FBcEJFLElBQW9COztBQUMzQixjQUFJSSxRQUFRSixLQUFLSSxLQUFqQjtBQUNBLGNBQUlBLFVBQVUsQ0FBZCxFQUFpQjtBQUNmQyxxQkFBUyxFQUFUO0FBQ0FDO0FBQ0QsV0FIRCxNQUlLLElBQUlGLFFBQVEsRUFBWixFQUFnQjtBQUNuQkEsb0JBQVEsRUFBUjtBQUNEO0FBQ0RDLG1CQUFTRCxLQUFUO0FBQ0EsaUJBQU9DLFFBQVEsRUFBUixJQUFjQyxPQUFPLENBQTVCLEVBQStCO0FBQzdCRCxxQkFBUyxFQUFUO0FBQ0FDO0FBQ0Q7QUFDRjtBQWpCUztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQWtCVixhQUFPRCxLQUFQO0FBQ0Q7OztpQ0FFWTtBQUNYLFVBQUlMLE9BQU8sS0FBS0YsS0FBTCxDQUFXUyxHQUFYLEVBQVg7QUFDQSxVQUFJTixRQUFRLEtBQUtOLEtBQUwsQ0FBV2EsSUFBWCxDQUFnQixnQkFBaEIsRUFBa0NDLE1BQWxDLEVBQVo7QUFDQSxhQUFPLEVBQUNULFVBQUQsRUFBT0MsWUFBUCxFQUFQO0FBQ0Q7OztpQ0FFWTtBQUNYLFdBQUtOLEtBQUwsQ0FBV2EsSUFBWCxDQUFnQixpQkFBaEIsRUFBbUNFLElBQW5DLENBQXdDLEtBQXhDLEVBQStDLEtBQUtaLEtBQUwsQ0FBVyxDQUFYLEVBQWNhLFdBQWQsRUFBL0M7QUFDRDs7OzRCQUVPQyxLLEVBQU87QUFDYixhQUFPLEtBQUtkLEtBQUwsQ0FBV2MsUUFBUSxDQUFuQixDQUFQO0FBQ0Q7OztzQ0FFaUI7QUFDaEIsV0FBS2YsT0FBTCxHQUFlLEtBQUtKLFFBQUwsQ0FBY29CLFFBQWQsQ0FBdUIsYUFBdkIsQ0FBZixHQUF1RCxLQUFLcEIsUUFBTCxDQUFjcUIsV0FBZCxDQUEwQixhQUExQixDQUF2RDtBQUNEOzs7a0NBRWFDLE8sRUFBUztBQUNyQixXQUFLbkIsT0FBTCxDQUFhb0IsSUFBYixDQUFrQkQsT0FBbEI7QUFDRDs7Ozs7O2tCQXhFa0IxQixJOzs7Ozs7Ozs7Ozs7Ozs7OztJQ0ZBNEIsSTtBQUNuQixnQkFBWWIsS0FBWixFQUFtQmMsSUFBbkIsRUFBeUI7QUFBQTs7QUFDdkIsU0FBS2QsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS2MsSUFBTCxHQUFZQSxJQUFaO0FBQ0Q7Ozs7a0NBRWE7QUFDWixVQUFJQyxRQUFRLEtBQUtmLEtBQWpCO0FBQ0EsVUFBSSxLQUFLQSxLQUFMLEtBQWUsRUFBbkIsRUFBdUI7QUFDckJlLGdCQUFRLE1BQVI7QUFDRCxPQUZELE1BR0ssSUFBSSxLQUFLZixLQUFMLEtBQWUsRUFBbkIsRUFBdUI7QUFDMUJlLGdCQUFRLE9BQVI7QUFDRCxPQUZJLE1BR0EsSUFBSSxLQUFLZixLQUFMLEtBQWUsRUFBbkIsRUFBdUI7QUFDMUJlLGdCQUFRLE1BQVI7QUFDRCxPQUZJLE1BR0EsSUFBSSxLQUFLZixLQUFMLEtBQWUsQ0FBbkIsRUFBc0I7QUFDekJlLGdCQUFRLEtBQVI7QUFDRDtBQUNELHlCQUFpQkEsS0FBakIsWUFBNkIsS0FBS0QsSUFBbEM7QUFDRDs7Ozs7O2tCQXJCa0JELEk7Ozs7Ozs7OztBQ0FyQjs7Ozs7O0FBRUEsSUFBSUcsY0FBYyxvQkFBbEI7O0FBRUFBLFlBQVlDLE9BQVo7O0FBRUEzQixFQUFFLE9BQUYsRUFBVzRCLEVBQVgsQ0FBYyxPQUFkLEVBQXVCLFlBQVc7QUFDaENGLGNBQVlHLFNBQVo7QUFDQUgsY0FBWUksUUFBWixDQUFxQkMsUUFBckIsQ0FBOEIsQ0FBOUI7QUFDQUwsY0FBWU0sSUFBWjtBQUNELENBSkQ7O0FBTUFoQyxFQUFFLE1BQUYsRUFBVTRCLEVBQVYsQ0FBYSxPQUFiLEVBQXNCLFlBQVc7QUFDL0JGLGNBQVlPLEdBQVo7QUFDRCxDQUZEOztBQUlBakMsRUFBRSxRQUFGLEVBQVk0QixFQUFaLENBQWUsT0FBZixFQUF3QixZQUFXO0FBQ2pDRixjQUFZUSxLQUFaO0FBQ0QsQ0FGRDs7QUFJQWxDLEVBQUUsY0FBRixFQUFrQjRCLEVBQWxCLENBQXFCLE9BQXJCLEVBQThCLFlBQVc7QUFDdkNGLGNBQVlTLFVBQVo7QUFDRCxDQUZEOztBQUlBbkMsRUFBRSxRQUFGLEVBQVk0QixFQUFaLENBQWUsT0FBZixFQUF3QixZQUFXO0FBQ2pDRixjQUFZVSxLQUFaO0FBQ0QsQ0FGRCxFOzs7Ozs7Ozs7Ozs7Ozs7QUN4QkE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztJQUVxQkMsSTtBQUNuQixrQkFBYztBQUFBOztBQUNaLFNBQUtDLE1BQUwsR0FBYyxzQkFBZDtBQUNBLFNBQUtSLFFBQUwsR0FBZ0Isb0JBQWhCO0FBQ0EsU0FBS1MsVUFBTCxHQUFrQixtQkFBUyxRQUFULENBQWxCO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQixtQkFBUyxRQUFULEVBQW1CLENBQW5CLENBQWxCO0FBQ0EsU0FBS0MsV0FBTCxHQUFtQixLQUFuQjs7QUFFQSxTQUFLQyxNQUFMLEdBQWMxQyxFQUFFLFFBQUYsQ0FBZDtBQUNBLFNBQUsyQyxJQUFMLEdBQVkzQyxFQUFFLGFBQUYsQ0FBWjtBQUNBLFNBQUs0QyxPQUFMLEdBQWU1QyxFQUFFLFNBQUYsQ0FBZjs7QUFFQSxTQUFLNkMsS0FBTCxHQUFhN0MsRUFBRSxPQUFGLENBQWI7QUFDQSxTQUFLOEMsSUFBTCxHQUFZOUMsRUFBRSxNQUFGLENBQVo7QUFDQSxTQUFLK0MsTUFBTCxHQUFjL0MsRUFBRSxRQUFGLENBQWQ7QUFDQSxTQUFLZ0QsV0FBTCxHQUFtQmhELEVBQUUsY0FBRixDQUFuQjtBQUNBLFNBQUtpRCxNQUFMLEdBQWNqRCxFQUFFLFFBQUYsQ0FBZDtBQUNEOzs7O2tDQUVhO0FBQ1osVUFBSWtELGFBQUo7QUFDQSxXQUFLVCxXQUFMLEdBQW1CUyxPQUFPLEVBQTFCLEdBQStCQSxPQUFPLEdBQXRDO0FBQ0FsRCxRQUFFLGlCQUFGLEVBQXFCbUQsR0FBckIsQ0FBeUIsT0FBekIsRUFBcUNELElBQXJDO0FBQ0Q7OzsyQkFFTTtBQUNMLFdBQUtFLGFBQUw7QUFDQSxXQUFLdEIsUUFBTCxDQUFjdUIsT0FBZDtBQUNBLFdBQUtDLFdBQUwsQ0FBaUIsS0FBS2YsVUFBdEIsRUFBa0MsTUFBbEM7QUFDQSxXQUFLZSxXQUFMLENBQWlCLEtBQUtkLFVBQXRCO0FBQ0EsVUFBSWUsZUFBZSxLQUFLRCxXQUFMLENBQWlCLEtBQUtmLFVBQXRCLENBQW5CO0FBQ0EsVUFBSWlCLGVBQWUsS0FBS0YsV0FBTCxDQUFpQixLQUFLZCxVQUF0QixDQUFuQjtBQUNBLFdBQUtELFVBQUwsQ0FBZ0JrQixhQUFoQixDQUE4QixHQUE5QixFQVBLLENBTytCOztBQUVwQyxVQUFJRixpQkFBaUIsRUFBakIsSUFBdUJDLGlCQUFpQixFQUE1QyxFQUFnRDtBQUM5QyxhQUFLRSxhQUFMLENBQW1CLE1BQW5CO0FBQ0EsYUFBS25CLFVBQUwsQ0FBZ0JrQixhQUFoQixDQUE4QixXQUE5QjtBQUNBLGFBQUtqQixVQUFMLENBQWdCaUIsYUFBaEIsQ0FBOEIsc0JBQTlCO0FBQ0QsT0FKRCxNQUtLLElBQUlGLGlCQUFpQixFQUFyQixFQUF5QjtBQUM1QixhQUFLRyxhQUFMLENBQW1CLGFBQW5CO0FBQ0EsYUFBS25CLFVBQUwsQ0FBZ0JrQixhQUFoQixDQUE4QixXQUE5QjtBQUNBLGFBQUtwRCxPQUFMLENBQWEsTUFBYjtBQUNELE9BSkksTUFLQSxJQUFJbUQsaUJBQWlCLEVBQXJCLEVBQXlCO0FBQzVCLGFBQUtFLGFBQUwsQ0FBbUIsVUFBbkI7QUFDQSxhQUFLbkIsVUFBTCxDQUFnQmtCLGFBQWhCLENBQThCRixZQUE5QjtBQUNBLGFBQUtmLFVBQUwsQ0FBZ0JpQixhQUFoQixDQUE4QixzQkFBOUI7QUFDQSxhQUFLcEQsT0FBTCxDQUFhLEtBQWI7QUFDRCxPQUxJLE1BTUEsSUFBSSxLQUFLaUMsTUFBTCxDQUFZcUIsS0FBWixHQUFvQixLQUFLckIsTUFBTCxDQUFZc0IsR0FBWixHQUFrQixDQUExQyxFQUE2QztBQUNoRCxZQUFJSixpQkFBaUIsRUFBckIsRUFBMEI7QUFDeEIsZUFBS0ssTUFBTCxDQUFZLEtBQUtiLFdBQWpCO0FBQ0Q7QUFDRCxZQUFJLEtBQUtSLFVBQUwsQ0FBZ0JzQixRQUFoQixFQUFKLEVBQWdDO0FBQzlCLGVBQUtELE1BQUwsQ0FBWSxLQUFLWixNQUFqQjtBQUNEO0FBQ0Y7QUFDRjs7O2dDQUVXYyxJLEVBQU1DLE8sRUFBUztBQUN6QixVQUFJMUQsT0FBTyxLQUFLd0IsUUFBTCxDQUFjbUMsSUFBZCxFQUFYO0FBQ0EsVUFBSTFELFFBQVFQLEVBQUUsU0FBRixFQUFhO0FBQ3ZCLGlCQUFTLE1BRGM7QUFFdkIsb0JBQVVNLEtBQUtXLFdBQUw7QUFGYSxPQUFiLENBQVo7QUFJQSxVQUFJK0MsWUFBWSxNQUFoQixFQUF3QjtBQUN0QnpELGNBQU1TLElBQU4sQ0FBVyxLQUFYLEVBQWtCLDJCQUFsQjtBQUNELE9BRkQsTUFHSyxJQUFJZ0QsWUFBWSxhQUFoQixFQUErQjtBQUNsQ3pELGNBQU1ZLFFBQU4sQ0FBZSxTQUFmO0FBQ0QsT0FGSSxNQUdBLElBQUk2QyxZQUFZLE9BQWhCLEVBQXlCO0FBQzVCekQsY0FBTVksUUFBTixDQUFlLE9BQWY7QUFDRDtBQUNENEMsV0FBS0csT0FBTCxDQUFhNUQsSUFBYixFQUFtQkMsS0FBbkI7QUFDQXdELFdBQUtOLGFBQUwsQ0FBbUJNLEtBQUtJLFNBQUwsRUFBbkI7QUFDQSxhQUFPSixLQUFLSSxTQUFMLEVBQVA7QUFDRDs7O2lDQUVvQjtBQUFBOztBQUNuQixXQUFLNUIsVUFBTCxDQUFnQjZCLFVBQWhCO0FBQ0EsYUFBTyxLQUFLN0IsVUFBTCxDQUFnQjRCLFNBQWhCLEtBQThCLEVBQXJDLEVBQXlDO0FBQ3ZDLGFBQUtiLFdBQUwsQ0FBaUIsS0FBS2YsVUFBdEI7QUFDRDs7QUFKa0Isd0NBQVA4QixLQUFPO0FBQVBBLGFBQU87QUFBQTs7QUFLbkJBLFlBQU1DLE9BQU4sQ0FBYyxnQkFBUTtBQUNwQixZQUFJLENBQUNQLEtBQUsxRCxPQUFWLEVBQW1CO0FBQ2pCLGdCQUFLa0UsWUFBTCxDQUFrQlIsSUFBbEI7QUFDRDtBQUNGLE9BSkQ7QUFLRDs7OzhCQUVvQjtBQUFBLHlDQUFWUyxRQUFVO0FBQVZBLGdCQUFVO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQ25CLDZCQUFvQkEsUUFBcEIsOEhBQThCO0FBQUEsY0FBckJDLE9BQXFCOztBQUM1QkEsa0JBQVF6RCxJQUFSLENBQWEsVUFBYixFQUF5QixJQUF6QjtBQUNEO0FBSGtCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJcEI7OztpQ0FFWTtBQUNYLFdBQUtzQixNQUFMLENBQVlvQyxTQUFaO0FBQ0E7QUFDQSxXQUFLcEIsV0FBTCxDQUFpQixLQUFLZCxVQUF0QixFQUFrQyxhQUFsQztBQUNBLFdBQUtOLEtBQUw7QUFDRDs7OzZCQUVtQjtBQUFBLHlDQUFWc0MsUUFBVTtBQUFWQSxnQkFBVTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUNsQiw4QkFBb0JBLFFBQXBCLG1JQUE4QjtBQUFBLGNBQXJCQyxPQUFxQjs7QUFDNUJBLGtCQUFRekQsSUFBUixDQUFhLFVBQWIsRUFBeUIsS0FBekI7QUFDRDtBQUhpQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSW5COzs7a0NBRWE7QUFDWixXQUFLd0IsVUFBTCxDQUFnQnJDLE9BQWhCLEdBQTBCLEtBQTFCO0FBQ0EsV0FBS3dFLGlCQUFMLENBQXVCLEtBQUtuQyxVQUE1QjtBQUNBLFdBQUtELFVBQUwsQ0FBZ0I2QixVQUFoQjtBQUNBLFdBQUs3QixVQUFMLENBQWdCa0IsYUFBaEIsQ0FBOEIsS0FBS2xCLFVBQUwsQ0FBZ0I0QixTQUFoQixFQUE5Qjs7QUFFQSxXQUFLN0IsTUFBTCxDQUFZc0MsTUFBWjtBQUNBLFdBQUt0QyxNQUFMLENBQVl1QyxZQUFaO0FBQ0E3RSxRQUFFLG1CQUFGLEVBQXVCOEUsSUFBdkI7QUFDQSxXQUFLakIsTUFBTCxDQUFZLEtBQUtoQixLQUFqQjtBQUNBLFdBQUtrQyxPQUFMLENBQWEsS0FBS2pDLElBQWxCLEVBQXdCLEtBQUtDLE1BQTdCO0FBQ0Q7OztpQ0FFWWdCLEksRUFBTTtBQUNqQixVQUFJUixlQUFlLEtBQUtoQixVQUFMLENBQWdCNEIsU0FBaEIsRUFBbkI7QUFDQSxVQUFJWCxlQUFlTyxLQUFLSSxTQUFMLEVBQW5CO0FBQ0EsVUFBSVosZUFBZSxFQUFmLElBQXFCQyxlQUFlRCxZQUF4QyxFQUFzRDtBQUNwRFEsYUFBSzFELE9BQUwsR0FBZSxLQUFmO0FBQ0QsT0FGRCxNQUdLLElBQUltRCxlQUFlRCxZQUFuQixFQUFpQztBQUNwQ1EsYUFBSzFELE9BQUwsR0FBZSxNQUFmO0FBQ0QsT0FGSSxNQUdBO0FBQ0gwRCxhQUFLMUQsT0FBTCxHQUFlLE1BQWY7QUFDRDtBQUNGOzs7MEJBRUs7QUFDSixXQUFLMEUsT0FBTCxDQUFhLEtBQUsvQixXQUFsQixFQUErQixLQUFLQyxNQUFwQztBQUNBLFVBQUksQ0FBQyxLQUFLUixXQUFWLEVBQXVCO0FBQ3JCLFlBQUllLGVBQWUsS0FBS0YsV0FBTCxDQUFpQixLQUFLZCxVQUF0QixDQUFuQjtBQUNBLFlBQUlnQixlQUFlLEVBQW5CLEVBQXVCO0FBQ3JCLGVBQUtFLGFBQUwsQ0FBbUIsVUFBbkI7QUFDQSxlQUFLckQsT0FBTCxDQUFhLE1BQWI7QUFDRDtBQUNGLE9BTkQsTUFPSztBQUNILFlBQUkyRSxjQUFjLEtBQUtMLGlCQUFMLENBQXVCLEtBQUtuQyxVQUE1QixFQUF3QyxLQUFLeUMsV0FBN0MsQ0FBbEI7QUFDQSxZQUFJekIsZ0JBQWUsS0FBS0YsV0FBTCxDQUFpQjBCLFdBQWpCLEVBQThCLE9BQTlCLENBQW5CO0FBQ0EsWUFBSXhCLGdCQUFlLEVBQW5CLEVBQXVCO0FBQ3JCLGNBQUl3QixnQkFBZ0IsS0FBS3hDLFVBQXpCLEVBQXFDO0FBQ25DLGlCQUFLQSxVQUFMLENBQWdCbkMsT0FBaEIsR0FBMEIsTUFBMUI7QUFDQSxpQkFBS21DLFVBQUwsQ0FBZ0JyQyxPQUFoQixHQUEwQixLQUExQjtBQUNBLGlCQUFLOEUsV0FBTCxDQUFpQjlFLE9BQWpCLEdBQTJCLElBQTNCO0FBQ0EsaUJBQUt3RSxpQkFBTCxDQUF1QixLQUFLbkMsVUFBNUIsRUFBd0MsS0FBS3lDLFdBQTdDO0FBQ0QsV0FMRCxNQU1LLElBQUlELGdCQUFnQixLQUFLQyxXQUF6QixFQUFzQztBQUN6QyxpQkFBS0EsV0FBTCxDQUFpQjVFLE9BQWpCLEdBQTJCLE1BQTNCO0FBQ0EsaUJBQUs0RSxXQUFMLENBQWlCOUUsT0FBakIsR0FBMkIsS0FBM0I7QUFDQSxpQkFBS3dFLGlCQUFMLENBQXVCLEtBQUtuQyxVQUE1QixFQUF3QyxLQUFLeUMsV0FBN0M7QUFDQSxpQkFBS0MsYUFBTCxDQUFtQixLQUFLMUMsVUFBeEIsRUFBb0MsS0FBS3lDLFdBQXpDO0FBQ0Q7QUFDRjtBQUNGO0FBQ0Y7OztvQ0FFdUI7QUFBQSx5Q0FBUFosS0FBTztBQUFQQSxhQUFPO0FBQUE7O0FBQ3RCLFVBQUljLFFBQVFkLE1BQU0sQ0FBTixFQUFTaEUsT0FBckI7QUFDQSxVQUFJZ0UsTUFBTWUsTUFBTixLQUFpQixDQUFyQixFQUF3QjtBQUN0QixZQUFJRCxVQUFVLEtBQWQsRUFBcUI7QUFDbkIsZUFBS3pCLGFBQUwsQ0FBbUIsVUFBbkI7QUFDRCxTQUZELE1BR0ssSUFBSXlCLFVBQVUsTUFBZCxFQUFzQjtBQUN6QixlQUFLekIsYUFBTCxDQUFtQixhQUFuQjtBQUNEO0FBQ0QsYUFBS3JELE9BQUwsQ0FBYThFLEtBQWI7QUFDRCxPQVJELE1BU0ssSUFBSWQsTUFBTWUsTUFBTixLQUFpQixDQUFyQixFQUF3QjtBQUMzQixhQUFLQyxnQkFBTCxDQUFzQmhCLEtBQXRCO0FBQ0Q7QUFDRjs7OzhCQUVTO0FBQ1IsVUFBTWlCLE9BQU8sSUFBYjtBQUNBLFdBQUtoRCxNQUFMLENBQVlzQyxNQUFaO0FBQ0E1RSxRQUFFLFVBQUYsRUFBYzRCLEVBQWQsQ0FBaUIsT0FBakIsRUFBMEIsWUFBVztBQUNuQyxZQUFNMkQsY0FBY0QsS0FBS2hELE1BQUwsQ0FBWXFCLEtBQVosR0FBb0IyQixLQUFLaEQsTUFBTCxDQUFZc0IsR0FBcEQ7QUFDQSxZQUFJNUQsRUFBRSxJQUFGLEVBQVF3RixRQUFSLENBQWlCLE9BQWpCLEtBQTZCRCxlQUFlLEVBQWhELEVBQW9EO0FBQ2xERCxlQUFLaEQsTUFBTCxDQUFZc0IsR0FBWixJQUFtQixFQUFuQjtBQUNELFNBRkQsTUFHSyxJQUFJNUQsRUFBRSxJQUFGLEVBQVF3RixRQUFSLENBQWlCLE9BQWpCLEtBQTZCRCxlQUFlLEVBQWhELEVBQW9EO0FBQ3ZERCxlQUFLaEQsTUFBTCxDQUFZc0IsR0FBWixJQUFtQixFQUFuQjtBQUNELFNBRkksTUFHQSxJQUFJNUQsRUFBRSxJQUFGLEVBQVF3RixRQUFSLENBQWlCLFFBQWpCLEtBQThCRCxlQUFlLEdBQWpELEVBQXNEO0FBQ3pERCxlQUFLaEQsTUFBTCxDQUFZc0IsR0FBWixJQUFtQixHQUFuQjtBQUNELFNBRkksTUFHQSxJQUFJNUQsRUFBRSxJQUFGLEVBQVF3RixRQUFSLENBQWlCLFFBQWpCLEtBQThCRCxlQUFlLEdBQWpELEVBQXNEO0FBQ3pERCxlQUFLaEQsTUFBTCxDQUFZc0IsR0FBWixJQUFtQixHQUFuQjtBQUNELFNBRkksTUFHQSxJQUFJNUQsRUFBRSxJQUFGLEVBQVF3RixRQUFSLENBQWlCLFFBQWpCLENBQUosRUFBZ0M7QUFDbkNGLGVBQUtoRCxNQUFMLENBQVlzQixHQUFaLEdBQWtCMEIsS0FBS2hELE1BQUwsQ0FBWXFCLEtBQTlCO0FBQ0QsU0FGSSxNQUdBLElBQUkzRCxFQUFFLElBQUYsRUFBUXdGLFFBQVIsQ0FBaUIsT0FBakIsQ0FBSixFQUErQjtBQUNsQ0YsZUFBS2hELE1BQUwsQ0FBWXNCLEdBQVosR0FBa0IsRUFBbEI7QUFDRDtBQUNEMEIsYUFBSzNDLElBQUwsQ0FBVXJCLElBQVYsQ0FBZWdFLEtBQUtoRCxNQUFMLENBQVlzQixHQUEzQjtBQUNELE9BckJEO0FBc0JEOzs7cUNBRWdCUyxLLEVBQU87QUFDdEIsVUFBSWMsUUFBUWQsTUFBTSxDQUFOLEVBQVNoRSxPQUFyQjtBQUNBLFVBQUlvRixRQUFRcEIsTUFBTSxDQUFOLEVBQVNoRSxPQUFyQjtBQUNBLFVBQUk4RSxVQUFVTSxLQUFkLEVBQXFCO0FBQ25CLFlBQUlOLFVBQVUsV0FBVixJQUF5Qk0sVUFBVSxXQUF2QyxFQUFvRDtBQUNsRCxlQUFLL0IsYUFBTCxDQUFtQixtQkFBbkI7QUFDQSxlQUFLcEIsTUFBTCxDQUFZb0QsU0FBWjtBQUNELFNBSEQsTUFHTyxJQUFJUCxVQUFVLEtBQVYsSUFBbUJNLFVBQVUsS0FBakMsRUFBd0M7QUFDN0MsZUFBSy9CLGFBQUwsQ0FBbUIsZUFBbkI7QUFDQSxlQUFLcEIsTUFBTCxDQUFZcUQsR0FBWjtBQUNELFNBSE0sTUFHQSxJQUFJUixVQUFVLE1BQVYsSUFBb0JNLFVBQVUsTUFBbEMsRUFBMEM7QUFDL0MsZUFBSy9CLGFBQUwsQ0FBbUIsa0JBQW5CO0FBQ0EsZUFBS3BCLE1BQUwsQ0FBWXNELElBQVo7QUFDRCxTQUhNLE1BR0E7QUFDTCxlQUFLbEMsYUFBTCxDQUFtQixXQUFuQjtBQUNEO0FBQ0YsT0FiRCxNQWFPLElBQUl5QixVQUFVTSxLQUFkLEVBQXFCO0FBQzFCO0FBQ0EsWUFBSUksYUFBYSxLQUFLdkQsTUFBTCxDQUFZc0IsR0FBWixHQUFrQixDQUFuQztBQUNBLFlBQUlrQyxhQUFhLENBQWpCO0FBQ0EsWUFBSUMsYUFBYSxDQUFqQjtBQUNBLFlBQUlaLFVBQVUsV0FBVixJQUF5Qk0sVUFBVSxXQUF2QyxFQUFvRDtBQUNsREssdUJBQWFELGFBQWEsR0FBMUI7QUFDQSxjQUFJVixVQUFVLEtBQVYsSUFBbUJNLFVBQVUsS0FBakMsRUFBd0M7QUFDdENNLHlCQUFhRixVQUFiO0FBQ0EsaUJBQUtuQyxhQUFMLENBQW1CLGVBQW5CO0FBQ0QsV0FIRCxNQUdPLElBQUl5QixVQUFVLE1BQVYsSUFBb0JNLFVBQVUsTUFBbEMsRUFBMEM7QUFDL0NNLHlCQUFhLENBQUNGLFVBQWQ7QUFDQSxpQkFBS25DLGFBQUwsQ0FBbUIsNkJBQW5CO0FBQ0QsV0FITSxNQUdBO0FBQ0wsaUJBQUtBLGFBQUwsQ0FBbUIsbUJBQW5CO0FBQ0Q7QUFDRixTQVhELE1BV08sSUFBSXlCLFVBQVUsS0FBVixJQUFtQk0sVUFBVSxLQUFqQyxFQUF3QztBQUM3Q0ssdUJBQWFELFVBQWI7QUFDQSxjQUFJVixVQUFVLE1BQVYsSUFBb0JNLFVBQVUsTUFBbEMsRUFBMEM7QUFDeENNLHlCQUFhLENBQUNGLFVBQWQ7QUFDQSxpQkFBS25DLGFBQUwsQ0FBbUIsNkJBQW5CO0FBQ0QsV0FIRCxNQUdPO0FBQ0wsaUJBQUtBLGFBQUwsQ0FBbUIsbUJBQW5CO0FBQ0Q7QUFDRixTQVJNLE1BUUEsSUFBSXlCLFVBQVUsTUFBVixJQUFvQk0sVUFBVSxNQUFsQyxFQUEwQztBQUMvQ0ssdUJBQWEsQ0FBQ0QsVUFBZDtBQUNBLGVBQUtuQyxhQUFMLENBQW1CLHVCQUFuQjtBQUNEOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNEO0FBQ0QsV0FBS2pCLFdBQUwsR0FBbUIsS0FBbkI7QUFDRDs7OzBCQUVLdUQsUyxFQUFXO0FBQ2YsVUFBSUEsY0FBYyxVQUFsQixFQUE4QjtBQUM1QmhHLFVBQUUsd0JBQUYsRUFBNEJvQixXQUE1QixDQUF3QyxNQUF4QztBQUNBcEIsVUFBRSxpQkFBRixFQUFxQmlHLElBQXJCLENBQ0UsNEJBQ0UsWUFERixHQUVFLGlDQUhKO0FBS0FqRyxVQUFFLG9CQUFGLEVBQXdCc0IsSUFBeEIsQ0FBNkIsWUFBN0I7QUFDQXRCLFVBQUUsb0JBQUYsRUFBd0I0QixFQUF4QixDQUEyQixPQUEzQixFQUFvQyxZQUFXO0FBQzdDNUIsWUFBRSx3QkFBRixFQUE0Qm1CLFFBQTVCLENBQXFDLE1BQXJDO0FBQ0FuQixZQUFFLGVBQUYsRUFBbUI4RSxJQUFuQjtBQUNBUSxlQUFLekQsU0FBTDtBQUNBLGVBQUtTLE1BQUwsQ0FBWTRELEtBQVo7QUFDRCxTQUxEO0FBTUQsT0FkRCxNQWNPLElBQUlGLGNBQWMsTUFBbEIsRUFBMEI7QUFDL0I7QUFDRDtBQUNGOztBQUVEOzs7OzRCQUNRRyxNLEVBQVE7QUFDZCxVQUFJQSxXQUFXLFdBQWYsRUFBNEI7QUFDMUIsYUFBSzdELE1BQUwsQ0FBWW9ELFNBQVo7QUFDRCxPQUZELE1BR0ssSUFBSVMsV0FBVyxLQUFmLEVBQXNCO0FBQ3pCLGFBQUs3RCxNQUFMLENBQVlxRCxHQUFaO0FBQ0QsT0FGSSxNQUdBLElBQUlRLFdBQVcsTUFBZixFQUF1QjtBQUMxQixhQUFLekMsYUFBTCxDQUFtQixNQUFuQjtBQUNELE9BRkksTUFHQSxJQUFJeUMsV0FBVyxNQUFmLEVBQXVCO0FBQzFCLFlBQUksS0FBSzdELE1BQUwsQ0FBWXFCLEtBQVosR0FBb0IsS0FBS3JCLE1BQUwsQ0FBWXNCLEdBQWhDLElBQXVDLEVBQTNDLEVBQStDO0FBQzdDLGVBQUt0QixNQUFMLENBQVlzRCxJQUFaO0FBQ0QsU0FGRCxNQUdLO0FBQ0gsZUFBS1EsS0FBTCxDQUFXLFVBQVg7QUFDRDtBQUNGO0FBQ0QsV0FBS0MsV0FBTDtBQUNEOzs7Z0NBRVc7QUFDVixXQUFLdkUsUUFBTCxHQUFnQixvQkFBaEI7QUFDQSxXQUFLUyxVQUFMLEdBQWtCLG1CQUFTLFFBQVQsQ0FBbEI7QUFDQSxXQUFLQyxVQUFMLEdBQWtCLG1CQUFTLFFBQVQsRUFBbUIsQ0FBbkIsQ0FBbEI7QUFDQXhDLFFBQUUsV0FBRixFQUFlc0csS0FBZjtBQUNBdEcsUUFBRSxjQUFGLEVBQWtCc0csS0FBbEI7QUFDQXRHLFFBQUUsY0FBRixFQUFrQnNHLEtBQWxCO0FBQ0F0RyxRQUFFLGdCQUFGLEVBQW9Cc0csS0FBcEI7QUFDQXRHLFFBQUUsZ0JBQUYsRUFBb0JzRyxLQUFwQjtBQUNBdEcsUUFBRSxTQUFGLEVBQWFzRyxLQUFiO0FBQ0Q7Ozt3Q0FFMkI7QUFDMUIsVUFBSXRCLG9CQUFKOztBQUQwQix5Q0FBUFgsS0FBTztBQUFQQSxhQUFPO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBRTFCLDhCQUFpQkEsS0FBakIsbUlBQXdCO0FBQUEsY0FBZk4sSUFBZTs7QUFDdEJBLGVBQUt3QyxlQUFMO0FBQ0EsY0FBSXhDLEtBQUs1RCxPQUFULEVBQWtCO0FBQ2hCNkUsMEJBQWNqQixJQUFkO0FBQ0Q7QUFDRjtBQVB5QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQVExQixhQUFPaUIsV0FBUDtBQUNEOzs7NEJBRU87QUFDTixXQUFLdkMsV0FBTCxHQUFtQixJQUFuQjtBQUNBLFdBQUtzQyxPQUFMLENBQWEsS0FBSzlCLE1BQWxCO0FBQ0EsV0FBS1gsTUFBTCxDQUFZb0MsU0FBWjs7QUFFQTtBQUNBLFdBQUs4QixXQUFMO0FBQ0EsV0FBS3ZCLFdBQUwsR0FBbUIsbUJBQVMsUUFBVCxFQUFtQixDQUFuQixDQUFuQjtBQUNBLFVBQUl3QixjQUFjLEtBQUtqRSxVQUFMLENBQWdCa0UsVUFBaEIsRUFBbEI7QUFDQSxXQUFLekIsV0FBTCxDQUFpQmYsT0FBakIsQ0FBeUJ1QyxZQUFZbkcsSUFBckMsRUFBMkNtRyxZQUFZbEcsS0FBdkQ7QUFDQSxXQUFLK0MsV0FBTCxDQUFpQixLQUFLZCxVQUF0QjtBQUNBLFdBQUtjLFdBQUwsQ0FBaUIsS0FBSzJCLFdBQXRCO0FBQ0Q7Ozs0QkFFTztBQUNOLFVBQUksQ0FBQyxLQUFLeEMsV0FBVixFQUF1QjtBQUNyQixhQUFLc0MsT0FBTCxDQUFhLEtBQUtqQyxJQUFsQixFQUF3QixLQUFLQyxNQUE3QixFQUFxQyxLQUFLQyxXQUExQyxFQUF1RCxLQUFLQyxNQUE1RDtBQUNBLGFBQUswRCxVQUFMLENBQWdCLEtBQUtuRSxVQUFyQjtBQUNBLGFBQUswQyxhQUFMLENBQW1CLEtBQUsxQyxVQUF4QjtBQUNELE9BSkQsTUFLSztBQUNILFlBQUl3QyxjQUFjLEtBQUtMLGlCQUFMLENBQXVCLEtBQUtuQyxVQUE1QixFQUF3QyxLQUFLeUMsV0FBN0MsQ0FBbEI7QUFDQSxZQUFJRCxnQkFBZ0IsS0FBS3hDLFVBQXpCLEVBQXFDO0FBQ25DLGVBQUtBLFVBQUwsQ0FBZ0JyQyxPQUFoQixHQUEwQixLQUExQjtBQUNBLGVBQUs4RSxXQUFMLENBQWlCOUUsT0FBakIsR0FBMkIsSUFBM0I7QUFDQSxlQUFLd0UsaUJBQUwsQ0FBdUIsS0FBS25DLFVBQTVCLEVBQXdDLEtBQUt5QyxXQUE3QztBQUNELFNBSkQsTUFLSyxJQUFJRCxnQkFBZ0IsS0FBS0MsV0FBekIsRUFBc0M7QUFDekMsZUFBS0EsV0FBTCxDQUFpQjlFLE9BQWpCLEdBQTJCLEtBQTNCO0FBQ0EsZUFBS3dFLGlCQUFMLENBQXVCLEtBQUtuQyxVQUE1QixFQUF3QyxLQUFLeUMsV0FBN0M7QUFDQSxlQUFLMEIsVUFBTCxDQUFnQixLQUFLbkUsVUFBckIsRUFBaUMsS0FBS3lDLFdBQXRDO0FBQ0EsZUFBS0MsYUFBTCxDQUFtQixLQUFLMUMsVUFBeEIsRUFBb0MsS0FBS3lDLFdBQXpDO0FBQ0Q7QUFDRjtBQUNGOzs7b0NBRWU7QUFDZGpGLFFBQUUsZUFBRixFQUFtQjRHLElBQW5CO0FBQ0EsV0FBS0osV0FBTDtBQUNBLFdBQUszQyxNQUFMLENBQVksS0FBS2YsSUFBakIsRUFBdUIsS0FBS0MsTUFBNUI7QUFDQSxXQUFLZ0MsT0FBTCxDQUFhLEtBQUtsQyxLQUFsQjtBQUNBN0MsUUFBRSxtQkFBRixFQUF1QjRHLElBQXZCO0FBQ0EsV0FBS3BFLFVBQUwsQ0FBZ0JyQyxPQUFoQixHQUEwQixJQUExQjtBQUNBLFdBQUt3RSxpQkFBTCxDQUF1QixLQUFLbkMsVUFBNUI7QUFDRDs7O2tDQUVhcUUsTyxFQUFTO0FBQ3JCN0csUUFBRSxXQUFGLEVBQWVTLE1BQWYsVUFBNkJvRyxPQUE3QjtBQUNEOzs7Ozs7a0JBL1hrQnhFLEk7Ozs7Ozs7Ozs7Ozs7OztBQ0pyQjs7OztBQUNBOzs7Ozs7OztJQUVxQnlFLEk7QUFDbkIsa0JBQWM7QUFBQTs7QUFDWixTQUFLMUcsS0FBTCxHQUFhLEVBQWI7QUFDRDs7OzsyQkFFTTtBQUNMLGFBQU8sS0FBS0EsS0FBTCxDQUFXUyxHQUFYLEVBQVA7QUFDRDs7OzZCQUVRa0csUSxFQUFVO0FBQ2pCLFVBQUksQ0FBQ0EsUUFBTCxFQUFlO0FBQ2JBLG1CQUFXLENBQVg7QUFDRDtBQUNELGFBQU9BLFdBQVcsQ0FBbEIsRUFBcUI7QUFDbkIsYUFBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLEtBQUssRUFBckIsRUFBeUJBLEdBQXpCLEVBQThCO0FBQzVCLGVBQUs1RyxLQUFMLENBQVdJLElBQVgsQ0FBZ0IsbUJBQVN3RyxDQUFULEVBQVksUUFBWixDQUFoQjtBQUNBLGVBQUs1RyxLQUFMLENBQVdJLElBQVgsQ0FBZ0IsbUJBQVN3RyxDQUFULEVBQVksVUFBWixDQUFoQjtBQUNBLGVBQUs1RyxLQUFMLENBQVdJLElBQVgsQ0FBZ0IsbUJBQVN3RyxDQUFULEVBQVksUUFBWixDQUFoQjtBQUNBLGVBQUs1RyxLQUFMLENBQVdJLElBQVgsQ0FBZ0IsbUJBQVN3RyxDQUFULEVBQVksT0FBWixDQUFoQjtBQUNEO0FBQ0REO0FBQ0Q7QUFDRjs7OzhCQUVTO0FBQ1IsV0FBSyxJQUFJQyxJQUFJLEtBQUs1RyxLQUFMLENBQVdnRixNQUFYLEdBQW9CLENBQWpDLEVBQW9DNEIsSUFBSSxDQUF4QyxFQUEyQ0EsR0FBM0MsRUFBZ0Q7QUFDOUMsWUFBTUMsSUFBSUMsS0FBS0MsS0FBTCxDQUFXRCxLQUFLRSxNQUFMLE1BQWlCSixJQUFJLENBQXJCLENBQVgsQ0FBVjtBQUQ4QyxtQkFFNUIsQ0FBQyxLQUFLNUcsS0FBTCxDQUFXNkcsQ0FBWCxDQUFELENBRjRCO0FBRTdDLGFBQUs3RyxLQUFMLENBQVc0RyxDQUFYLENBRjZDO0FBRy9DO0FBQ0Y7Ozs7OztrQkE3QmtCRixJOzs7Ozs7Ozs7Ozs7Ozs7OztJQ0hBTyxNO0FBQ3BCLG1CQUFjO0FBQUE7O0FBQ2IsT0FBSzFELEtBQUwsR0FBYSxHQUFiO0FBQ0EsT0FBS0MsR0FBTCxHQUFXLEVBQVg7QUFDQSxPQUFLMEQsTUFBTCxHQUFjLEVBQWQ7O0FBRUEsT0FBSzVFLE1BQUwsR0FBYzFDLEVBQUUsUUFBRixDQUFkO0FBQ0EsT0FBSzJDLElBQUwsR0FBWTNDLEVBQUUsYUFBRixDQUFaO0FBQ0EsT0FBSzRDLE9BQUwsR0FBZTVDLEVBQUUsU0FBRixDQUFmO0FBQ0E7Ozs7aUNBRWM7QUFDZCxPQUFJdUgsWUFBWSxFQUFoQjtBQUNBLE9BQUlDLFNBQVMsRUFBYjtBQUNBLE9BQUksS0FBS0YsTUFBTCxHQUFjLENBQWxCLEVBQXFCO0FBQ3BCQyxnQkFBWSxVQUFaO0FBQ0FDLGFBQVMsR0FBVDtBQUNBLElBSEQsTUFHTyxJQUFJLEtBQUtGLE1BQUwsR0FBYyxDQUFsQixFQUFxQjtBQUMzQkMsZ0JBQVksVUFBWjtBQUNBQyxhQUFTLEdBQVQ7QUFDQTtBQUNELFFBQUs1RSxPQUFMLENBQWFuQyxNQUFiLG9CQUFvQzhHLFNBQXBDLFdBQWtEQyxNQUFsRCxVQUE2RE4sS0FBS08sR0FBTCxDQUFTLEtBQUtILE1BQWQsQ0FBN0Q7QUFDQTs7OzhCQUVXO0FBQ1gsUUFBSzNELEtBQUwsSUFBYyxLQUFLQyxHQUFMLEdBQVcsR0FBekI7QUFDRSxRQUFLMEQsTUFBTCxHQUFjLEtBQUsxRCxHQUFMLEdBQVcsR0FBekI7QUFDRjs7OzhCQUVXO0FBQ1gsUUFBS0QsS0FBTCxJQUFjLEtBQUtDLEdBQW5CO0FBQ0EsUUFBS0EsR0FBTCxJQUFZLENBQVo7QUFDQSxRQUFLZ0IsTUFBTDtBQUNBOzs7eUJBRU07QUFDTixRQUFLakIsS0FBTCxJQUFjLEtBQUtDLEdBQW5CO0FBQ0UsUUFBSzBELE1BQUwsR0FBYyxDQUFDLEtBQUsxRCxHQUFwQjtBQUNBO0FBQ0EsT0FBSSxLQUFLQSxHQUFMLEdBQVcsS0FBS0QsS0FBcEIsRUFBMkI7QUFDekIsU0FBS0MsR0FBTCxHQUFXLEtBQUtELEtBQWhCO0FBQ0Q7QUFDSDs7OzBCQUVPO0FBQ1AsUUFBS0EsS0FBTCxHQUFhLEdBQWI7QUFDQSxRQUFLQyxHQUFMLEdBQVcsRUFBWDtBQUNBLFFBQUswRCxNQUFMLEdBQWMsRUFBZDtBQUNBLFFBQUsxQyxNQUFMO0FBQ0E7OzsyQkFFUTtBQUNSLFFBQUtsQyxNQUFMLENBQVlwQixJQUFaLENBQWlCLEtBQUtxQyxLQUF0QjtBQUNBLFFBQUtoQixJQUFMLENBQVVyQixJQUFWLENBQWUsS0FBS3NDLEdBQXBCO0FBQ0E7Ozt3QkFFSztBQUNMLFFBQUtELEtBQUwsSUFBYyxLQUFLQyxHQUFuQjtBQUNFLFFBQUswRCxNQUFMLEdBQWMsS0FBSzFELEdBQW5CO0FBQ0Y7Ozs7OztrQkEzRG1CeUQsTSIsImZpbGUiOiIuL2pzL21haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3ZTZhZWU5ZmFlYzYxNDhmZDBiNCIsImltcG9ydCBDYXJkIGZyb20gXCIuL2NhcmRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhhbmQge1xyXG4gIGNvbnN0cnVjdG9yKG93bmVyLCBoYW5kTnVtYmVyKSB7XHJcbiAgICBsZXQgc2VsZWN0b3I7XHJcbiAgICBpZiAob3duZXIgPT09ICdkZWFsZXInKSB7XHJcbiAgICAgIHNlbGVjdG9yID0gXCIjZGVhbGVyXCI7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChvd25lciA9PT0gJ3BsYXllcicpIHtcclxuICAgICAgaWYgKGhhbmROdW1iZXIgPT09IDEpIHtcclxuICAgICAgICBzZWxlY3RvciA9IFwiI2hhbmQxXCI7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAoaGFuZE51bWJlciA9PT0gMikge1xyXG4gICAgICAgIHNlbGVjdG9yID0gXCIjaGFuZDJcIjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy4kd3JhcHBlciA9ICQoYCR7c2VsZWN0b3J9YCk7XHJcbiAgICB0aGlzLiRoYW5kID0gJChgJHtzZWxlY3Rvcn0gLmhhbmRgKTtcclxuICAgIHRoaXMuJHBvaW50cyA9ICQoYCR7c2VsZWN0b3J9IC5wb2ludHNgKTtcclxuICAgIHRoaXMucGxheWluZyA9IGZhbHNlO1xyXG4gICAgdGhpcy5jYXJkcyA9IFtdO1xyXG4gICAgdGhpcy5vdXRjb21lO1xyXG4gIH1cclxuXHJcbiAgYWRkQ2FyZChjYXJkLCAkY2FyZCkge1xyXG4gICAgdGhpcy5jYXJkcy5wdXNoKGNhcmQpO1xyXG4gICAgdGhpcy4kaGFuZC5hcHBlbmQoJGNhcmQpO1xyXG4gIH1cclxuXHJcbiAgY2FuU3BsaXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jYXJkc1swXS5wb2ludCA9PT0gdGhpcy5jYXJkc1sxXS5wb2ludDtcclxuICB9XHJcblxyXG4gIGdldFBvaW50cygpIHtcclxuICAgIGxldCB0b3RhbCA9IDA7XHJcbiAgICBsZXQgYWNlcyA9IDA7XHJcbiAgICBmb3IgKGxldCBjYXJkIG9mIHRoaXMuY2FyZHMpIHtcclxuICAgICAgbGV0IHBvaW50ID0gY2FyZC5wb2ludDtcclxuICAgICAgaWYgKHBvaW50ID09PSAxKSB7XHJcbiAgICAgICAgdG90YWwgKz0gMTA7XHJcbiAgICAgICAgYWNlcysrO1xyXG4gICAgICB9IFxyXG4gICAgICBlbHNlIGlmIChwb2ludCA+IDEwKSB7XHJcbiAgICAgICAgcG9pbnQgPSAxMDtcclxuICAgICAgfVxyXG4gICAgICB0b3RhbCArPSBwb2ludDtcclxuICAgICAgd2hpbGUgKHRvdGFsID4gMjEgJiYgYWNlcyA+IDApIHtcclxuICAgICAgICB0b3RhbCAtPSAxMDtcclxuICAgICAgICBhY2VzLS07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0b3RhbDtcclxuICB9XHJcblxyXG4gIHJlbW92ZUNhcmQoKSB7XHJcbiAgICBsZXQgY2FyZCA9IHRoaXMuY2FyZHMucG9wKCk7XHJcbiAgICBsZXQgJGNhcmQgPSB0aGlzLiRoYW5kLmZpbmQoXCJpbWc6bGFzdC1jaGlsZFwiKS5yZW1vdmUoKTtcclxuICAgIHJldHVybiB7Y2FyZCwgJGNhcmR9O1xyXG4gIH1cclxuXHJcbiAgcmV2ZWFsSG9sZSgpIHtcclxuICAgIHRoaXMuJGhhbmQuZmluZCgnaW1nOmZpcnN0LWNoaWxkJykuYXR0cignc3JjJywgdGhpcy5jYXJkc1swXS5nZXRJbWFnZVVybCgpKTtcclxuICB9XHJcblxyXG4gIHNlZUNhcmQoaW5kZXgpIHtcclxuICAgIHJldHVybiB0aGlzLmNhcmRzW2luZGV4IC0gMV07XHJcbiAgfVxyXG5cclxuICB0b2dnbGVIaWdobGlnaHQoKSB7XHJcbiAgICB0aGlzLnBsYXlpbmcgPyB0aGlzLiR3cmFwcGVyLmFkZENsYXNzKFwiY3VycmVudEhhbmRcIikgOiB0aGlzLiR3cmFwcGVyLnJlbW92ZUNsYXNzKFwiY3VycmVudEhhbmRcIik7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVEaXNwbGF5KGNvbnRlbnQpIHtcclxuICAgIHRoaXMuJHBvaW50cy50ZXh0KGNvbnRlbnQpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9oYW5kLmpzIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FyZCB7XHJcbiAgY29uc3RydWN0b3IocG9pbnQsIHN1aXQpIHtcclxuICAgIHRoaXMucG9pbnQgPSBwb2ludDtcclxuICAgIHRoaXMuc3VpdCA9IHN1aXQ7XHJcbiAgfVxyXG5cclxuICBnZXRJbWFnZVVybCgpIHtcclxuICAgIGxldCB2YWx1ZSA9IHRoaXMucG9pbnQ7XHJcbiAgICBpZiAodGhpcy5wb2ludCA9PT0gMTEpIHtcclxuICAgICAgdmFsdWUgPSBcImphY2tcIjtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXMucG9pbnQgPT09IDEyKSB7XHJcbiAgICAgIHZhbHVlID0gXCJxdWVlblwiO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodGhpcy5wb2ludCA9PT0gMTMpIHtcclxuICAgICAgdmFsdWUgPSBcImtpbmdcIjtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXMucG9pbnQgPT09IDEpIHtcclxuICAgICAgdmFsdWUgPSBcImFjZVwiO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGBpbWFnZXMvJHt2YWx1ZX1fb2ZfJHt0aGlzLnN1aXR9LnN2Z2A7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2NhcmQuanMiLCJpbXBvcnQgR2FtZSBmcm9tICcuL2dhbWUnO1xuXG52YXIgY3VycmVudEdhbWUgPSBuZXcgR2FtZTtcblxuY3VycmVudEdhbWUubWFrZUJldCgpO1xuXG4kKCcuZGVhbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICBjdXJyZW50R2FtZS5yZXNldEdhbWUoKTtcbiAgY3VycmVudEdhbWUuZ2FtZURlY2suZ2VuZXJhdGUoMyk7XG4gIGN1cnJlbnRHYW1lLmRlYWwoKTtcbn0pO1xuXG4kKCcuaGl0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gIGN1cnJlbnRHYW1lLmhpdCgpO1xufSk7XG5cbiQoJy5zdGFuZCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICBjdXJyZW50R2FtZS5zdGFuZCgpO1xufSk7XG5cbiQoJy5kb3VibGUtZG93bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICBjdXJyZW50R2FtZS5kb3VibGVEb3duKCk7XG59KTtcblxuJCgnLnNwbGl0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gIGN1cnJlbnRHYW1lLnNwbGl0KCk7XG59KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2FwcC5qcyIsImltcG9ydCBIYW5kIGZyb20gXCIuL2hhbmRcIjtcclxuaW1wb3J0IERlY2sgZnJvbSBcIi4vZGVja1wiO1xyXG5pbXBvcnQgV2FsbGV0IGZyb20gXCIuL3dhbGxldFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZSB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLndhbGxldCA9IG5ldyBXYWxsZXQ7XHJcbiAgICB0aGlzLmdhbWVEZWNrID0gbmV3IERlY2s7XHJcbiAgICB0aGlzLmRlYWxlckhhbmQgPSBuZXcgSGFuZCgnZGVhbGVyJyk7XHJcbiAgICB0aGlzLnBsYXllckhhbmQgPSBuZXcgSGFuZCgncGxheWVyJywgMSk7XHJcbiAgICB0aGlzLnNwbGl0SW5QbGF5ID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy4kdG90YWwgPSAkKFwiLnRvdGFsXCIpO1xyXG4gICAgdGhpcy4kYmV0ID0gJChcIi5jdXJyZW50QmV0XCIpO1xyXG4gICAgdGhpcy4kY2hhbmdlID0gJChcIi5jaGFuZ2VcIik7XHJcbiAgICBcclxuICAgIHRoaXMuJGRlYWwgPSAkKFwiLmRlYWxcIik7XHJcbiAgICB0aGlzLiRoaXQgPSAkKFwiLmhpdFwiKTtcclxuICAgIHRoaXMuJHN0YW5kID0gJChcIi5zdGFuZFwiKTtcclxuICAgIHRoaXMuJGRvdWJsZURvd24gPSAkKFwiLmRvdWJsZS1kb3duXCIpO1xyXG4gICAgdGhpcy4kc3BsaXQgPSAkKFwiLnNwbGl0XCIpO1xyXG4gIH1cclxuXHJcbiAgYWRqdXN0U3BhY2UoKSB7XHJcbiAgICBsZXQgc2l6ZTtcclxuICAgIHRoaXMuc3BsaXRJblBsYXkgPyBzaXplID0gNTAgOiBzaXplID0gMTAwO1xyXG4gICAgJChcIi5wbGF5ZXJIYW5kLWRpdlwiKS5jc3MoXCJ3aWR0aFwiLCBgJHtzaXplfSVgKTtcclxuICB9XHJcblxyXG4gIGRlYWwoKSB7XHJcbiAgICB0aGlzLnN0YXJ0R2FtZU1vZGUoKTtcclxuICAgIHRoaXMuZ2FtZURlY2suc2h1ZmZsZSgpO1xyXG4gICAgdGhpcy5kZWFsT25lQ2FyZCh0aGlzLmRlYWxlckhhbmQsIFwiaG9sZVwiKTtcclxuICAgIHRoaXMuZGVhbE9uZUNhcmQodGhpcy5wbGF5ZXJIYW5kKTtcclxuICAgIGxldCBkZWFsZXJQb2ludHMgPSB0aGlzLmRlYWxPbmVDYXJkKHRoaXMuZGVhbGVySGFuZCk7XHJcbiAgICBsZXQgcGxheWVyUG9pbnRzID0gdGhpcy5kZWFsT25lQ2FyZCh0aGlzLnBsYXllckhhbmQpO1xyXG4gICAgdGhpcy5kZWFsZXJIYW5kLnVwZGF0ZURpc3BsYXkoXCI/XCIpOyAvLyBjb25jZWFsIGRlYWxlciB0b3RhbFxyXG5cclxuICAgIGlmIChkZWFsZXJQb2ludHMgPT09IDIxICYmIHBsYXllclBvaW50cyA9PT0gMjEpIHtcclxuICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiUHVzaFwiKTtcclxuICAgICAgdGhpcy5kZWFsZXJIYW5kLnVwZGF0ZURpc3BsYXkoXCJCbGFja2phY2tcIik7XHJcbiAgICAgIHRoaXMucGxheWVySGFuZC51cGRhdGVEaXNwbGF5KFwiQkxBQ0tKQUNLLCBIT1QgREFNTiFcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChkZWFsZXJQb2ludHMgPT09IDIxKSB7XHJcbiAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIkRlYWxlciB3aW5zXCIpO1xyXG4gICAgICB0aGlzLmRlYWxlckhhbmQudXBkYXRlRGlzcGxheShcIkJsYWNramFja1wiKTtcclxuICAgICAgdGhpcy5vdXRjb21lKFwibG9zZVwiKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHBsYXllclBvaW50cyA9PT0gMjEpIHtcclxuICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiWW91IHdpbiFcIik7XHJcbiAgICAgIHRoaXMuZGVhbGVySGFuZC51cGRhdGVEaXNwbGF5KGRlYWxlclBvaW50cyk7XHJcbiAgICAgIHRoaXMucGxheWVySGFuZC51cGRhdGVEaXNwbGF5KFwiQkxBQ0tKQUNLLCBIT1QgREFNTiFcIik7XHJcbiAgICAgIHRoaXMub3V0Y29tZShcIndpblwiKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXMud2FsbGV0Lm1vbmV5ID4gdGhpcy53YWxsZXQuYmV0ICogMikge1xyXG4gICAgICBpZiAocGxheWVyUG9pbnRzID09PSAxMSkgIHtcclxuICAgICAgICB0aGlzLmVuYWJsZSh0aGlzLiRkb3VibGVEb3duKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5wbGF5ZXJIYW5kLmNhblNwbGl0KCkpIHtcclxuICAgICAgICB0aGlzLmVuYWJsZSh0aGlzLiRzcGxpdCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRlYWxPbmVDYXJkKGhhbmQsIHNwZWNpYWwpIHtcclxuICAgIGxldCBjYXJkID0gdGhpcy5nYW1lRGVjay5kcmF3KCk7XHJcbiAgICBsZXQgJGNhcmQgPSAkKFwiPGltZyAvPlwiLCB7XHJcbiAgICAgIFwiY2xhc3NcIjogXCJjYXJkXCIsIFxyXG4gICAgICBcInNyY1wiOiBgJHtjYXJkLmdldEltYWdlVXJsKCl9YFxyXG4gICAgfSk7XHJcbiAgICBpZiAoc3BlY2lhbCA9PT0gXCJob2xlXCIpIHtcclxuICAgICAgJGNhcmQuYXR0cignc3JjJywgXCJpbWFnZXMvYmFjay1zdWl0cy1yZWQuc3ZnXCIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoc3BlY2lhbCA9PT0gXCJkb3VibGUtZG93blwiKSB7XHJcbiAgICAgICRjYXJkLmFkZENsYXNzKCdjYXJkLWRkJyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChzcGVjaWFsID09PSBcInNwbGl0XCIpIHtcclxuICAgICAgJGNhcmQuYWRkQ2xhc3MoJ3NwbGl0Jyk7XHJcbiAgICB9XHJcbiAgICBoYW5kLmFkZENhcmQoY2FyZCwgJGNhcmQpO1xyXG4gICAgaGFuZC51cGRhdGVEaXNwbGF5KGhhbmQuZ2V0UG9pbnRzKCkpO1xyXG4gICAgcmV0dXJuIGhhbmQuZ2V0UG9pbnRzKCk7XHJcbiAgfVxyXG5cclxuICBkZWFsZXJUdXJuKC4uLmhhbmRzKSB7XHJcbiAgICB0aGlzLmRlYWxlckhhbmQucmV2ZWFsSG9sZSgpO1xyXG4gICAgd2hpbGUgKHRoaXMuZGVhbGVySGFuZC5nZXRQb2ludHMoKSA8IDE3KSB7XHJcbiAgICAgIHRoaXMuZGVhbE9uZUNhcmQodGhpcy5kZWFsZXJIYW5kKTtcclxuICAgIH1cclxuICAgIGhhbmRzLmZvckVhY2goaGFuZCA9PiB7XHJcbiAgICAgIGlmICghaGFuZC5vdXRjb21lKSB7XHJcbiAgICAgICAgdGhpcy5ldmFsdWF0ZUhhbmQoaGFuZClcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBkaXNhYmxlKC4uLmVsZW1lbnRzKSB7XHJcbiAgICBmb3IgKGxldCBlbGVtZW50IG9mIGVsZW1lbnRzKSB7XHJcbiAgICAgIGVsZW1lbnQuYXR0cihcImRpc2FibGVkXCIsIHRydWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZG91YmxlRG93bigpIHtcclxuICAgIHRoaXMud2FsbGV0LmRvdWJsZUJldCgpO1xyXG4gICAgLy8gZGVhbCB0aGUgcGxheWVyIG9uZSBtb3JlIGNhcmQgYW5kIHRoZW4gbW92ZSBvbiB0byB0aGUgZGVhbGVyJ3MgdHVyblxyXG4gICAgdGhpcy5kZWFsT25lQ2FyZCh0aGlzLnBsYXllckhhbmQsIFwiZG91YmxlLWRvd25cIik7XHJcbiAgICB0aGlzLnN0YW5kKCk7XHJcbiAgfVxyXG5cclxuICBlbmFibGUoLi4uZWxlbWVudHMpIHtcclxuICAgIGZvciAobGV0IGVsZW1lbnQgb2YgZWxlbWVudHMpIHtcclxuICAgICAgZWxlbWVudC5hdHRyKFwiZGlzYWJsZWRcIiwgZmFsc2UpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZW5kR2FtZU1vZGUoKSB7XHJcbiAgICB0aGlzLnBsYXllckhhbmQucGxheWluZyA9IGZhbHNlO1xyXG4gICAgdGhpcy5zZWxlY3RDdXJyZW50SGFuZCh0aGlzLnBsYXllckhhbmQpO1xyXG4gICAgdGhpcy5kZWFsZXJIYW5kLnJldmVhbEhvbGUoKTtcclxuICAgIHRoaXMuZGVhbGVySGFuZC51cGRhdGVEaXNwbGF5KHRoaXMuZGVhbGVySGFuZC5nZXRQb2ludHMoKSk7XHJcblxyXG4gICAgdGhpcy53YWxsZXQudXBkYXRlKCk7XHJcbiAgICB0aGlzLndhbGxldC5hc3Nlc3NDaGFuZ2UoKTtcclxuICAgICQoXCIuYmV0dGluZyAuYnV0dG9uc1wiKS5zaG93KCk7XHJcbiAgICB0aGlzLmVuYWJsZSh0aGlzLiRkZWFsKTtcclxuICAgIHRoaXMuZGlzYWJsZSh0aGlzLiRoaXQsIHRoaXMuJHN0YW5kKTtcclxuICB9XHJcblxyXG4gIGV2YWx1YXRlSGFuZChoYW5kKSB7XHJcbiAgICBsZXQgZGVhbGVyUG9pbnRzID0gdGhpcy5kZWFsZXJIYW5kLmdldFBvaW50cygpO1xyXG4gICAgbGV0IHBsYXllclBvaW50cyA9IGhhbmQuZ2V0UG9pbnRzKCk7XHJcbiAgICBpZiAoZGVhbGVyUG9pbnRzID4gMjEgfHwgcGxheWVyUG9pbnRzID4gZGVhbGVyUG9pbnRzKSB7XHJcbiAgICAgIGhhbmQub3V0Y29tZSA9IFwid2luXCI7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChwbGF5ZXJQb2ludHMgPCBkZWFsZXJQb2ludHMpIHtcclxuICAgICAgaGFuZC5vdXRjb21lID0gXCJsb3NlXCI7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgaGFuZC5vdXRjb21lID0gXCJwdXNoXCI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBoaXQoKSB7XHJcbiAgICB0aGlzLmRpc2FibGUodGhpcy4kZG91YmxlRG93biwgdGhpcy4kc3BsaXQpO1xyXG4gICAgaWYgKCF0aGlzLnNwbGl0SW5QbGF5KSB7XHJcbiAgICAgIGxldCBwbGF5ZXJQb2ludHMgPSB0aGlzLmRlYWxPbmVDYXJkKHRoaXMucGxheWVySGFuZCk7XHJcbiAgICAgIGlmIChwbGF5ZXJQb2ludHMgPiAyMSkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIllvdSBidXN0XCIpO1xyXG4gICAgICAgIHRoaXMub3V0Y29tZShcImxvc2VcIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBsZXQgY3VycmVudEhhbmQgPSB0aGlzLnNlbGVjdEN1cnJlbnRIYW5kKHRoaXMucGxheWVySGFuZCwgdGhpcy5wbGF5ZXJIYW5kMik7XHJcbiAgICAgIGxldCBwbGF5ZXJQb2ludHMgPSB0aGlzLmRlYWxPbmVDYXJkKGN1cnJlbnRIYW5kLCBcInNwbGl0XCIpO1xyXG4gICAgICBpZiAocGxheWVyUG9pbnRzID4gMjEpIHtcclxuICAgICAgICBpZiAoY3VycmVudEhhbmQgPT09IHRoaXMucGxheWVySGFuZCkge1xyXG4gICAgICAgICAgdGhpcy5wbGF5ZXJIYW5kLm91dGNvbWUgPSBcImxvc2VcIjtcclxuICAgICAgICAgIHRoaXMucGxheWVySGFuZC5wbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLnBsYXllckhhbmQyLnBsYXlpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgdGhpcy5zZWxlY3RDdXJyZW50SGFuZCh0aGlzLnBsYXllckhhbmQsIHRoaXMucGxheWVySGFuZDIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjdXJyZW50SGFuZCA9PT0gdGhpcy5wbGF5ZXJIYW5kMikge1xyXG4gICAgICAgICAgdGhpcy5wbGF5ZXJIYW5kMi5vdXRjb21lID0gXCJsb3NlXCI7XHJcbiAgICAgICAgICB0aGlzLnBsYXllckhhbmQyLnBsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuc2VsZWN0Q3VycmVudEhhbmQodGhpcy5wbGF5ZXJIYW5kLCB0aGlzLnBsYXllckhhbmQyKTtcclxuICAgICAgICAgIHRoaXMuaW52b2tlT3V0Y29tZSh0aGlzLnBsYXllckhhbmQsIHRoaXMucGxheWVySGFuZDIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaW52b2tlT3V0Y29tZSguLi5oYW5kcykge1xyXG4gICAgbGV0IGhhbmQxID0gaGFuZHNbMF0ub3V0Y29tZTtcclxuICAgIGlmIChoYW5kcy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgaWYgKGhhbmQxID09PSBcIndpblwiKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiWW91IHdpbiFcIik7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAoaGFuZDEgPT09IFwibG9zZVwiKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiRGVhbGVyIHdpbnNcIik7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5vdXRjb21lKGhhbmQxKVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoaGFuZHMubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgIHRoaXMubXVsdGlwbGVPdXRjb21lcyhoYW5kcyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBtYWtlQmV0KCkge1xyXG4gICAgY29uc3QgZ2FtZSA9IHRoaXM7XHJcbiAgICB0aGlzLndhbGxldC51cGRhdGUoKTtcclxuICAgICQoXCIuYmV0LWJ0blwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICBjb25zdCBwb3NzaWJsZUJldCA9IGdhbWUud2FsbGV0Lm1vbmV5IC0gZ2FtZS53YWxsZXQuYmV0O1xyXG4gICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcyhcImFkZDEwXCIpICYmIHBvc3NpYmxlQmV0ID49IDEwKSB7XHJcbiAgICAgICAgZ2FtZS53YWxsZXQuYmV0ICs9IDEwO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKCQodGhpcykuaGFzQ2xhc3MoXCJhZGQ1MFwiKSAmJiBwb3NzaWJsZUJldCA+PSA1MCkge1xyXG4gICAgICAgIGdhbWUud2FsbGV0LmJldCArPSA1MDtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmICgkKHRoaXMpLmhhc0NsYXNzKFwiYWRkMTAwXCIpICYmIHBvc3NpYmxlQmV0ID49IDEwMCkge1xyXG4gICAgICAgIGdhbWUud2FsbGV0LmJldCArPSAxMDA7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAoJCh0aGlzKS5oYXNDbGFzcyhcImFkZDUwMFwiKSAmJiBwb3NzaWJsZUJldCA+PSA1MDApIHtcclxuICAgICAgICBnYW1lLndhbGxldC5iZXQgKz0gNTAwO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKCQodGhpcykuaGFzQ2xhc3MoXCJhbGwtaW5cIikpIHtcclxuICAgICAgICBnYW1lLndhbGxldC5iZXQgPSBnYW1lLndhbGxldC5tb25leTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmICgkKHRoaXMpLmhhc0NsYXNzKFwicmVzZXRcIikpIHtcclxuICAgICAgICBnYW1lLndhbGxldC5iZXQgPSAxMDtcclxuICAgICAgfVxyXG4gICAgICBnYW1lLiRiZXQudGV4dChnYW1lLndhbGxldC5iZXQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBtdWx0aXBsZU91dGNvbWVzKGhhbmRzKSB7XHJcbiAgICBsZXQgaGFuZDEgPSBoYW5kc1swXS5vdXRjb21lO1xyXG4gICAgbGV0IGhhbmQyID0gaGFuZHNbMV0ub3V0Y29tZTtcclxuICAgIGlmIChoYW5kMSA9PT0gaGFuZDIpIHtcclxuICAgICAgaWYgKGhhbmQxID09PSBcImJsYWNramFja1wiICYmIGhhbmQyID09PSBcImJsYWNramFja1wiKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiVFdPIEJMQUNLSkFDS1MhISFcIik7XHJcbiAgICAgICAgdGhpcy53YWxsZXQuYmxhY2tqYWNrKCk7XHJcbiAgICAgIH0gZWxzZSBpZiAoaGFuZDEgPT09IFwid2luXCIgJiYgaGFuZDIgPT09IFwid2luXCIpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJZb3Ugd2luIGJvdGghXCIpO1xyXG4gICAgICAgIHRoaXMud2FsbGV0LndpbigpO1xyXG4gICAgICB9IGVsc2UgaWYgKGhhbmQxID09PSBcImxvc2VcIiAmJiBoYW5kMiA9PT0gXCJsb3NlXCIpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJEZWFsZXIgd2lucyBib3RoXCIpO1xyXG4gICAgICAgIHRoaXMud2FsbGV0Lmxvc2UoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJQdXNoIGJvdGhcIik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoaGFuZDEgIT09IGhhbmQyKSB7XHJcbiAgICAgIC8vIGNhbGN1bGF0ZSB2YWx1ZSBvZiBlYWNoIGhhbmQgb3V0Y29tZSBhbmQgY29tYmluZSB0aGUgdHdvIGJlZm9yZSBjYWxsaW5nIG91dGNvbWUgZnVuY3Rpb25cclxuICAgICAgbGV0IGluaXRpYWxCZXQgPSB0aGlzLndhbGxldC5iZXQgLyAyO1xyXG4gICAgICBsZXQgaGFuZFZhbHVlMSA9IDA7XHJcbiAgICAgIGxldCBoYW5kVmFsdWUyID0gMDtcclxuICAgICAgaWYgKGhhbmQxID09PSBcImJsYWNramFja1wiIHx8IGhhbmQyID09PSBcImJsYWNramFja1wiKSB7XHJcbiAgICAgICAgaGFuZFZhbHVlMSA9IGluaXRpYWxCZXQgKiAxLjU7XHJcbiAgICAgICAgaWYgKGhhbmQxID09PSBcIndpblwiIHx8IGhhbmQyID09PSBcIndpblwiKSB7XHJcbiAgICAgICAgICBoYW5kVmFsdWUyID0gaW5pdGlhbEJldDtcclxuICAgICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIllvdSB3aW4gYm90aCFcIik7XHJcbiAgICAgICAgfSBlbHNlIGlmIChoYW5kMSA9PT0gXCJsb3NlXCIgfHwgaGFuZDIgPT09IFwibG9zZVwiKSB7XHJcbiAgICAgICAgICBoYW5kVmFsdWUyID0gLWluaXRpYWxCZXQ7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJZb3UgYW5kIGRlYWxlciBlYWNoIHdpbiBvbmVcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIllvdSB3aW4gb25lLCBwdXNoXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmIChoYW5kMSA9PT0gXCJ3aW5cIiB8fCBoYW5kMiA9PT0gXCJ3aW5cIikge1xyXG4gICAgICAgIGhhbmRWYWx1ZTEgPSBpbml0aWFsQmV0O1xyXG4gICAgICAgIGlmIChoYW5kMSA9PT0gXCJsb3NlXCIgfHwgaGFuZDIgPT09IFwibG9zZVwiKSB7XHJcbiAgICAgICAgICBoYW5kVmFsdWUyID0gLWluaXRpYWxCZXQ7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJZb3UgYW5kIGRlYWxlciBlYWNoIHdpbiBvbmVcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIllvdSB3aW4gb25lLCBwdXNoXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmIChoYW5kMSA9PT0gXCJsb3NlXCIgfHwgaGFuZDIgPT09IFwibG9zZVwiKSB7XHJcbiAgICAgICAgaGFuZFZhbHVlMSA9IC1pbml0aWFsQmV0O1xyXG4gICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIkRlYWxlciB3aW5zIG9uZSwgcHVzaFwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gdGhpcy5jaGFuZ2UgPSBoYW5kVmFsdWUxICsgaGFuZFZhbHVlMjtcclxuXHJcbiAgICAgIC8vIGlmICh0aGlzLndhbGxldC5iZXQgPiAwKSB7XHJcbiAgICAgIC8vICAgdGhpcy5vdXRjb21lKFwid2luXCIpO1xyXG4gICAgICAvLyB9XHJcbiAgICAgIC8vIGVsc2UgaWYgKHRoaXMud2FsbGV0LmJldCA8IDApIHtcclxuICAgICAgLy8gICB0aGlzLm91dGNvbWUoXCJsb3NlXCIpO1xyXG4gICAgICAvLyB9XHJcbiAgICAgIC8vIGVsc2Uge1xyXG4gICAgICAvLyAgIHRoaXMub3V0Y29tZShcInB1c2hcIik7XHJcbiAgICAgIC8vIH1cclxuICAgIH1cclxuICAgIHRoaXMuc3BsaXRJblBsYXkgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIG1vZGFsKG1vZGFsVHlwZSkge1xyXG4gICAgaWYgKG1vZGFsVHlwZSA9PT0gXCJiYW5rcnVwdFwiKSB7XHJcbiAgICAgICQoXCIubW9kYWwsIC5tb2RhbC1vdmVybGF5XCIpLnJlbW92ZUNsYXNzKFwiaGlkZVwiKTtcclxuICAgICAgJChcIi5tb2RhbCAubWVzc2FnZVwiKS5odG1sKFxyXG4gICAgICAgIFwiWW91J3ZlIGxvc3QgZXZlcnl0aGluZy5cIiArXHJcbiAgICAgICAgICBcIjxici8+PGJyLz5cIiArXHJcbiAgICAgICAgICBcIkdvb2QgdGhpbmcgaXQncyBub3QgcmVhbCBtb25leSFcIlxyXG4gICAgICApO1xyXG4gICAgICAkKFwiLm1vZGFsLWd1dHMgYnV0dG9uXCIpLnRleHQoXCJQbGF5IGFnYWluXCIpO1xyXG4gICAgICAkKFwiLm1vZGFsLWd1dHMgYnV0dG9uXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJChcIi5tb2RhbCwgLm1vZGFsLW92ZXJsYXlcIikuYWRkQ2xhc3MoXCJoaWRlXCIpO1xyXG4gICAgICAgICQoXCIudGl0bGUtc2NyZWVuXCIpLnNob3coKTtcclxuICAgICAgICBnYW1lLnJlc2V0R2FtZSgpO1xyXG4gICAgICAgIHRoaXMud2FsbGV0LnJlc2V0KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIGlmIChtb2RhbFR5cGUgPT09IFwiaGVscFwiKSB7XHJcbiAgICAgIC8vIGZ1dHVyZSBnYW1lIGZlYXR1cmU6IGluc3RydWN0aW9ucyBhdmFpbGFibGUgaW4gaGVscCBtb2RhbFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gdGhpcyBmdW5jdGlvbiBjYW4gbGlrZWx5IGJlIHJlcGxhY2VkIHdpdGggd2FsbGV0IGZ1bmN0aW9ucyB0byBoYW5kbGUgbW9uZXlcclxuICBvdXRjb21lKHJlc3VsdCkge1xyXG4gICAgaWYgKHJlc3VsdCA9PT0gXCJibGFja2phY2tcIikge1xyXG4gICAgICB0aGlzLndhbGxldC5ibGFja2phY2soKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHJlc3VsdCA9PT0gXCJ3aW5cIikge1xyXG4gICAgICB0aGlzLndhbGxldC53aW4oKTtcclxuICAgIH0gXHJcbiAgICBlbHNlIGlmIChyZXN1bHQgPT09IFwicHVzaFwiKSB7XHJcbiAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIlB1c2hcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChyZXN1bHQgPT09IFwibG9zZVwiKSB7XHJcbiAgICAgIGlmICh0aGlzLndhbGxldC5tb25leSAtIHRoaXMud2FsbGV0LmJldCA+PSAxMCkge1xyXG4gICAgICAgIHRoaXMud2FsbGV0Lmxvc2UoKTtcclxuICAgICAgfSBcclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgdGhpcy5tb2RhbChcImJhbmtydXB0XCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLmVuZEdhbWVNb2RlKCk7XHJcbiAgfVxyXG5cclxuICByZXNldEdhbWUoKSB7XHJcbiAgICB0aGlzLmdhbWVEZWNrID0gbmV3IERlY2s7XHJcbiAgICB0aGlzLmRlYWxlckhhbmQgPSBuZXcgSGFuZChcImRlYWxlclwiKTtcclxuICAgIHRoaXMucGxheWVySGFuZCA9IG5ldyBIYW5kKFwicGxheWVyXCIsIDEpO1xyXG4gICAgJChcIi5tZXNzYWdlc1wiKS5lbXB0eSgpO1xyXG4gICAgJChcIi5wbGF5ZXItaGFuZFwiKS5lbXB0eSgpO1xyXG4gICAgJChcIi5kZWFsZXItaGFuZFwiKS5lbXB0eSgpO1xyXG4gICAgJChcIi5wbGF5ZXItcG9pbnRzXCIpLmVtcHR5KCk7XHJcbiAgICAkKFwiLmRlYWxlci1wb2ludHNcIikuZW1wdHkoKTtcclxuICAgICQoXCIuY2hhbmdlXCIpLmVtcHR5KCk7XHJcbiAgfVxyXG5cclxuICBzZWxlY3RDdXJyZW50SGFuZCguLi5oYW5kcykge1xyXG4gICAgbGV0IGN1cnJlbnRIYW5kO1xyXG4gICAgZm9yIChsZXQgaGFuZCBvZiBoYW5kcykge1xyXG4gICAgICBoYW5kLnRvZ2dsZUhpZ2hsaWdodCgpO1xyXG4gICAgICBpZiAoaGFuZC5wbGF5aW5nKSB7XHJcbiAgICAgICAgY3VycmVudEhhbmQgPSBoYW5kO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY3VycmVudEhhbmQ7XHJcbiAgfVxyXG5cclxuICBzcGxpdCgpIHtcclxuICAgIHRoaXMuc3BsaXRJblBsYXkgPSB0cnVlO1xyXG4gICAgdGhpcy5kaXNhYmxlKHRoaXMuJHNwbGl0KTtcclxuICAgIHRoaXMud2FsbGV0LmRvdWJsZUJldCgpO1xyXG5cclxuICAgIC8vIHN0YXJ0IGFkZGl0aW9uYWwgaGFuZCBhbmQgbW92ZSBvbmUgY2FyZCBmcm9tIGhhbmQgMSB0byBoYW5kIDJcclxuICAgIHRoaXMuYWRqdXN0U3BhY2UoKTtcclxuICAgIHRoaXMucGxheWVySGFuZDIgPSBuZXcgSGFuZChcInBsYXllclwiLCAyKTtcclxuICAgIGxldCByZW1vdmVkQ2FyZCA9IHRoaXMucGxheWVySGFuZC5yZW1vdmVDYXJkKCk7XHJcbiAgICB0aGlzLnBsYXllckhhbmQyLmFkZENhcmQocmVtb3ZlZENhcmQuY2FyZCwgcmVtb3ZlZENhcmQuJGNhcmQpO1xyXG4gICAgdGhpcy5kZWFsT25lQ2FyZCh0aGlzLnBsYXllckhhbmQpO1xyXG4gICAgdGhpcy5kZWFsT25lQ2FyZCh0aGlzLnBsYXllckhhbmQyKTtcclxuICB9XHJcblxyXG4gIHN0YW5kKCkge1xyXG4gICAgaWYgKCF0aGlzLnNwbGl0SW5QbGF5KSB7XHJcbiAgICAgIHRoaXMuZGlzYWJsZSh0aGlzLiRoaXQsIHRoaXMuJHN0YW5kLCB0aGlzLiRkb3VibGVEb3duLCB0aGlzLiRzcGxpdCk7XHJcbiAgICAgIHRoaXMuZGVhbGVyVHVybih0aGlzLnBsYXllckhhbmQpO1xyXG4gICAgICB0aGlzLmludm9rZU91dGNvbWUodGhpcy5wbGF5ZXJIYW5kKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBsZXQgY3VycmVudEhhbmQgPSB0aGlzLnNlbGVjdEN1cnJlbnRIYW5kKHRoaXMucGxheWVySGFuZCwgdGhpcy5wbGF5ZXJIYW5kMik7XHJcbiAgICAgIGlmIChjdXJyZW50SGFuZCA9PT0gdGhpcy5wbGF5ZXJIYW5kKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJIYW5kLnBsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBsYXllckhhbmQyLnBsYXlpbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0Q3VycmVudEhhbmQodGhpcy5wbGF5ZXJIYW5kLCB0aGlzLnBsYXllckhhbmQyKTtcclxuICAgICAgfSBcclxuICAgICAgZWxzZSBpZiAoY3VycmVudEhhbmQgPT09IHRoaXMucGxheWVySGFuZDIpIHtcclxuICAgICAgICB0aGlzLnBsYXllckhhbmQyLnBsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNlbGVjdEN1cnJlbnRIYW5kKHRoaXMucGxheWVySGFuZCwgdGhpcy5wbGF5ZXJIYW5kMik7XHJcbiAgICAgICAgdGhpcy5kZWFsZXJUdXJuKHRoaXMucGxheWVySGFuZCwgdGhpcy5wbGF5ZXJIYW5kMik7XHJcbiAgICAgICAgdGhpcy5pbnZva2VPdXRjb21lKHRoaXMucGxheWVySGFuZCwgdGhpcy5wbGF5ZXJIYW5kMik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXJ0R2FtZU1vZGUoKSB7XHJcbiAgICAkKFwiLnRpdGxlLXNjcmVlblwiKS5oaWRlKCk7XHJcbiAgICB0aGlzLmFkanVzdFNwYWNlKCk7XHJcbiAgICB0aGlzLmVuYWJsZSh0aGlzLiRoaXQsIHRoaXMuJHN0YW5kKTtcclxuICAgIHRoaXMuZGlzYWJsZSh0aGlzLiRkZWFsKTtcclxuICAgICQoXCIuYmV0dGluZyAuYnV0dG9uc1wiKS5oaWRlKCk7XHJcbiAgICB0aGlzLnBsYXllckhhbmQucGxheWluZyA9IHRydWU7XHJcbiAgICB0aGlzLnNlbGVjdEN1cnJlbnRIYW5kKHRoaXMucGxheWVySGFuZCk7ICBcclxuICB9XHJcblxyXG4gIHVwZGF0ZU1lc3NhZ2UobWVzc2FnZSkge1xyXG4gICAgJChcIi5tZXNzYWdlc1wiKS5hcHBlbmQoYDxoMT4ke21lc3NhZ2V9PC9oMT5gKTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvZ2FtZS5qcyIsImltcG9ydCBDYXJkIGZyb20gXCIuL2NhcmRcIjtcclxuaW1wb3J0IEhhbmQgZnJvbSBcIi4vaGFuZFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVjayB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmNhcmRzID0gW107XHJcbiAgfVxyXG5cclxuICBkcmF3KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2FyZHMucG9wKCk7XHJcbiAgfVxyXG5cclxuICBnZW5lcmF0ZShudW1EZWNrcykge1xyXG4gICAgaWYgKCFudW1EZWNrcykge1xyXG4gICAgICBudW1EZWNrcyA9IDE7XHJcbiAgICB9XHJcbiAgICB3aGlsZSAobnVtRGVja3MgPiAwKSB7XHJcbiAgICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IDEzOyBpKyspIHtcclxuICAgICAgICB0aGlzLmNhcmRzLnB1c2gobmV3IENhcmQoaSwgXCJzcGFkZXNcIikpO1xyXG4gICAgICAgIHRoaXMuY2FyZHMucHVzaChuZXcgQ2FyZChpLCBcImRpYW1vbmRzXCIpKTtcclxuICAgICAgICB0aGlzLmNhcmRzLnB1c2gobmV3IENhcmQoaSwgXCJoZWFydHNcIikpO1xyXG4gICAgICAgIHRoaXMuY2FyZHMucHVzaChuZXcgQ2FyZChpLCBcImNsdWJzXCIpKTtcclxuICAgICAgfVxyXG4gICAgICBudW1EZWNrcy0tO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2h1ZmZsZSgpIHtcclxuICAgIGZvciAobGV0IGkgPSB0aGlzLmNhcmRzLmxlbmd0aCAtIDE7IGkgPiAwOyBpLS0pIHtcclxuICAgICAgY29uc3QgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChpICsgMSkpO1xyXG4gICAgICBbdGhpcy5jYXJkc1tpXV0gPSBbdGhpcy5jYXJkc1tqXV07XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2RlY2suanMiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBXYWxsZXQge1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0dGhpcy5tb25leSA9IDUwMDtcclxuXHRcdHRoaXMuYmV0ID0gMTA7XHJcblx0XHR0aGlzLmNoYW5nZSA9IFwiXCI7XHJcblxyXG5cdFx0dGhpcy4kdG90YWwgPSAkKFwiLnRvdGFsXCIpO1xyXG5cdFx0dGhpcy4kYmV0ID0gJChcIi5jdXJyZW50QmV0XCIpO1xyXG5cdFx0dGhpcy4kY2hhbmdlID0gJChcIi5jaGFuZ2VcIik7XHJcblx0fVxyXG5cclxuXHRhc3Nlc3NDaGFuZ2UoKSB7XHJcblx0XHRsZXQgY2xhc3NOYW1lID0gXCJcIjtcclxuXHRcdGxldCBzeW1ib2wgPSBcIlwiO1xyXG5cdFx0aWYgKHRoaXMuY2hhbmdlID4gMCkge1xyXG5cdFx0XHRjbGFzc05hbWUgPSBcInBvc2l0aXZlXCI7XHJcblx0XHRcdHN5bWJvbCA9IFwiK1wiO1xyXG5cdFx0fSBlbHNlIGlmICh0aGlzLmNoYW5nZSA8IDApIHtcclxuXHRcdFx0Y2xhc3NOYW1lID0gXCJuZWdhdGl2ZVwiO1xyXG5cdFx0XHRzeW1ib2wgPSBcIi1cIjtcclxuXHRcdH1cclxuXHRcdHRoaXMuJGNoYW5nZS5hcHBlbmQoYDxzcGFuIGNsYXNzPVwiJHtjbGFzc05hbWV9XCI+JHtzeW1ib2x9ICQke01hdGguYWJzKHRoaXMuY2hhbmdlKX08L3NwYW4+YCk7XHJcblx0fVxyXG5cclxuXHRibGFja2phY2soKSB7XHJcblx0XHR0aGlzLm1vbmV5ICs9IHRoaXMuYmV0ICogMS41O1xyXG4gICAgdGhpcy5jaGFuZ2UgPSB0aGlzLmJldCAqIDEuNTtcclxuXHR9XHJcblx0XHJcblx0ZG91YmxlQmV0KCkge1xyXG5cdFx0dGhpcy5tb25leSAtPSB0aGlzLmJldDtcclxuXHRcdHRoaXMuYmV0ICo9IDI7XHJcblx0XHR0aGlzLnVwZGF0ZSgpO1xyXG5cdH1cclxuXHJcblx0bG9zZSgpIHtcclxuXHRcdHRoaXMubW9uZXkgLT0gdGhpcy5iZXQ7XHJcbiAgICB0aGlzLmNoYW5nZSA9IC10aGlzLmJldDtcclxuICAgIC8vIGRyb3AgdGhlIGJldCBhbW91bnQgZG93biB0byBlcXVhbCBtb25leSBhbW91bnQgb2YgbGFzdCBiZXQgdmFsdWUgaXMgZ3JlYXRlciB0aGFuIHRvdGFsIG1vbmV5IHZhbHVlXHJcbiAgICBpZiAodGhpcy5iZXQgPiB0aGlzLm1vbmV5KSB7XHJcbiAgICAgIHRoaXMuYmV0ID0gdGhpcy5tb25leTtcclxuICAgIH1cclxuXHR9XHJcblxyXG5cdHJlc2V0KCkge1xyXG5cdFx0dGhpcy5tb25leSA9IDUwMDtcclxuXHRcdHRoaXMuYmV0ID0gMTA7XHJcblx0XHR0aGlzLmNoYW5nZSA9IFwiXCI7XHJcblx0XHR0aGlzLnVwZGF0ZSgpO1xyXG5cdH1cclxuXHJcblx0dXBkYXRlKCkge1xyXG5cdFx0dGhpcy4kdG90YWwudGV4dCh0aGlzLm1vbmV5KTtcclxuXHRcdHRoaXMuJGJldC50ZXh0KHRoaXMuYmV0KTtcclxuXHR9XHJcblxyXG5cdHdpbigpIHtcclxuXHRcdHRoaXMubW9uZXkgKz0gdGhpcy5iZXQ7XHJcbiAgICB0aGlzLmNoYW5nZSA9IHRoaXMuYmV0O1xyXG5cdH1cclxuXHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy93YWxsZXQuanMiXSwic291cmNlUm9vdCI6IiJ9