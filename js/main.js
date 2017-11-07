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
    key: "calibrateSlider",
    value: function calibrateSlider() {}
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
        this.outcome("blackjack");
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
        if (hand1 === "blackjack") {
          this.updateMessage("TWO BLACKJACKS!!!");
        } else if (hand1 === "win") {
          this.updateMessage("You win both!");
        } else if (hand1 === "lose") {
          this.updateMessage("Dealer wins both");
        } else {
          this.updateMessage("Push both");
        }
        this.wallet.payout(hand1);
      } else if (hand1 !== hand2) {
        // calculate value of each hand outcome before calling payout function
        var initialBet = this.wallet.bet / 2;
        var hand1Value = 0;
        var hand2Value = 0;
        if (hand1 === "blackjack" || hand2 === "blackjack") {
          hand1Value = initialBet * 1.5;
          if (hand1 === "win" || hand2 === "win") {
            hand2Value = initialBet;
            this.updateMessage("You win both!");
          } else if (hand1 === "lose" || hand2 === "lose") {
            hand2Value = -initialBet;
            this.updateMessage("You and dealer each win one");
          } else {
            this.updateMessage("You win one, push");
          }
        } else if (hand1 === "win" || hand2 === "win") {
          hand1Value = initialBet;
          if (hand1 === "lose" || hand2 === "lose") {
            hand2Value = -initialBet;
            this.updateMessage("You and dealer each win one");
          } else {
            this.updateMessage("You win one, push");
          }
        } else if (hand1 === "lose" || hand2 === "lose") {
          hand1Value = -initialBet;
          this.updateMessage("Dealer wins one, push");
        }
        this.wallet.payout("custom", hand1Value, hand2Value);
      }
      this.splitInPlay = false;
      this.endGameMode();
    }
  }, {
    key: "modal",
    value: function modal(modalType) {
      if (modalType === "bankrupt") {
        $(".modal, .modal-overlay").removeClass("hide");
        $(".modal-guts button").on("click", function () {
          $(".modal, .modal-overlay").addClass("hide");
          $(".title-screen").show();
          this.resetGame();
          this.wallet.reset();
        });
      } else if (modalType === "help") {
        // future game feature: instructions available in help modal
      }
    }
  }, {
    key: "outcome",
    value: function outcome(result) {
      this.wallet.payout(result);
      if (result === "push") {
        this.updateMessage("Push");
      } else if (result === "lose") {
        if (this.wallet.money - this.wallet.bet <= 0) {
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
		key: "doubleBet",
		value: function doubleBet() {
			this.money -= this.bet;
			this.bet *= 2;
			this.update();
		}
	}, {
		key: "payout",
		value: function payout(outcome, hand1Value, hand2Value) {
			if (outcome === "blackjack") {
				this.change = this.bet * 1.5;
			} else if (outcome === "win") {
				this.change = this.bet;
			} else if (outcome === "lose") {
				this.change = -this.bet;
			} else if (outcome === "push") {
				this.change = 0;
			} else if (outcome === "multiple") {
				this.change = hand1Value + hand2Value;
			}
			this.money += this.change;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGIzMTgxYWU3M2RjZTZkODg0MzgiLCJ3ZWJwYWNrOi8vLy4vanMvaGFuZC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jYXJkLmpzIiwid2VicGFjazovLy8uL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9nYW1lLmpzIiwid2VicGFjazovLy8uL2pzL2RlY2suanMiLCJ3ZWJwYWNrOi8vLy4vanMvd2FsbGV0LmpzIl0sIm5hbWVzIjpbIkhhbmQiLCJvd25lciIsImhhbmROdW1iZXIiLCJzZWxlY3RvciIsIiR3cmFwcGVyIiwiJCIsIiRoYW5kIiwiJHBvaW50cyIsInBsYXlpbmciLCJjYXJkcyIsIm91dGNvbWUiLCJjYXJkIiwiJGNhcmQiLCJwdXNoIiwiYXBwZW5kIiwicG9pbnQiLCJ0b3RhbCIsImFjZXMiLCJwb3AiLCJmaW5kIiwicmVtb3ZlIiwiYXR0ciIsImdldEltYWdlVXJsIiwiaW5kZXgiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwiY29udGVudCIsInRleHQiLCJDYXJkIiwic3VpdCIsInZhbHVlIiwiY3VycmVudEdhbWUiLCJtYWtlQmV0Iiwib24iLCJyZXNldEdhbWUiLCJnYW1lRGVjayIsImdlbmVyYXRlIiwiZGVhbCIsImhpdCIsInN0YW5kIiwiZG91YmxlRG93biIsInNwbGl0IiwiR2FtZSIsIndhbGxldCIsImRlYWxlckhhbmQiLCJwbGF5ZXJIYW5kIiwic3BsaXRJblBsYXkiLCIkdG90YWwiLCIkYmV0IiwiJGNoYW5nZSIsIiRkZWFsIiwiJGhpdCIsIiRzdGFuZCIsIiRkb3VibGVEb3duIiwiJHNwbGl0Iiwic2l6ZSIsImNzcyIsInN0YXJ0R2FtZU1vZGUiLCJzaHVmZmxlIiwiZGVhbE9uZUNhcmQiLCJkZWFsZXJQb2ludHMiLCJwbGF5ZXJQb2ludHMiLCJ1cGRhdGVEaXNwbGF5IiwidXBkYXRlTWVzc2FnZSIsIm1vbmV5IiwiYmV0IiwiZW5hYmxlIiwiY2FuU3BsaXQiLCJoYW5kIiwic3BlY2lhbCIsImRyYXciLCJhZGRDYXJkIiwiZ2V0UG9pbnRzIiwicmV2ZWFsSG9sZSIsImhhbmRzIiwiZm9yRWFjaCIsImV2YWx1YXRlSGFuZCIsImVsZW1lbnRzIiwiZWxlbWVudCIsImRvdWJsZUJldCIsInNlbGVjdEN1cnJlbnRIYW5kIiwidXBkYXRlIiwiYXNzZXNzQ2hhbmdlIiwic2hvdyIsImRpc2FibGUiLCJjdXJyZW50SGFuZCIsInBsYXllckhhbmQyIiwiaW52b2tlT3V0Y29tZSIsImhhbmQxIiwibGVuZ3RoIiwibXVsdGlwbGVPdXRjb21lcyIsImdhbWUiLCJwb3NzaWJsZUJldCIsImhhc0NsYXNzIiwiaGFuZDIiLCJwYXlvdXQiLCJpbml0aWFsQmV0IiwiaGFuZDFWYWx1ZSIsImhhbmQyVmFsdWUiLCJlbmRHYW1lTW9kZSIsIm1vZGFsVHlwZSIsInJlc2V0IiwicmVzdWx0IiwibW9kYWwiLCJlbXB0eSIsInRvZ2dsZUhpZ2hsaWdodCIsImFkanVzdFNwYWNlIiwicmVtb3ZlZENhcmQiLCJyZW1vdmVDYXJkIiwiZGVhbGVyVHVybiIsImhpZGUiLCJtZXNzYWdlIiwiRGVjayIsIm51bURlY2tzIiwiaSIsImoiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJXYWxsZXQiLCJjaGFuZ2UiLCJjbGFzc05hbWUiLCJzeW1ib2wiLCJhYnMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJI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QUE2QjtBQUM1QixTQUFLOEcsTUFBTCxHQUFjLEtBQUt2RCxHQUFMLEdBQVcsR0FBekI7QUFDQSxJQUZELE1BR0ssSUFBSXZELFlBQVksS0FBaEIsRUFBdUI7QUFDM0IsU0FBSzhHLE1BQUwsR0FBYyxLQUFLdkQsR0FBbkI7QUFDQSxJQUZJLE1BR0EsSUFBSXZELFlBQVksTUFBaEIsRUFBd0I7QUFDNUIsU0FBSzhHLE1BQUwsR0FBYyxDQUFDLEtBQUt2RCxHQUFwQjtBQUNBLElBRkksTUFHQSxJQUFJdkQsWUFBWSxNQUFoQixFQUF3QjtBQUM1QixTQUFLOEcsTUFBTCxHQUFjLENBQWQ7QUFDQSxJQUZJLE1BR0EsSUFBSTlHLFlBQVksVUFBaEIsRUFBNEI7QUFDaEMsU0FBSzhHLE1BQUwsR0FBY3ZCLGFBQWFDLFVBQTNCO0FBQ0E7QUFDRCxRQUFLbEMsS0FBTCxJQUFjLEtBQUt3RCxNQUFuQjtBQUNBOzs7MEJBRU87QUFDUCxRQUFLeEQsS0FBTCxHQUFhLEdBQWI7QUFDQSxRQUFLQyxHQUFMLEdBQVcsRUFBWDtBQUNBLFFBQUt1RCxNQUFMLEdBQWMsRUFBZDtBQUNBLFFBQUt2QyxNQUFMO0FBQ0E7OzsyQkFFUTtBQUNSLFFBQUtsQyxNQUFMLENBQVlwQixJQUFaLENBQWlCLEtBQUtxQyxLQUF0QjtBQUNBLFFBQUtoQixJQUFMLENBQVVyQixJQUFWLENBQWUsS0FBS3NDLEdBQXBCO0FBQ0E7Ozs7OztrQkEzRG1Cc0QsTSIsImZpbGUiOiIuL2pzL21haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA0YjMxODFhZTczZGNlNmQ4ODQzOCIsImltcG9ydCBDYXJkIGZyb20gXCIuL2NhcmRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhhbmQge1xyXG4gIGNvbnN0cnVjdG9yKG93bmVyLCBoYW5kTnVtYmVyKSB7XHJcbiAgICBsZXQgc2VsZWN0b3I7XHJcbiAgICBpZiAob3duZXIgPT09ICdkZWFsZXInKSB7XHJcbiAgICAgIHNlbGVjdG9yID0gXCIjZGVhbGVyXCI7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChvd25lciA9PT0gJ3BsYXllcicpIHtcclxuICAgICAgaWYgKGhhbmROdW1iZXIgPT09IDEpIHtcclxuICAgICAgICBzZWxlY3RvciA9IFwiI2hhbmQxXCI7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAoaGFuZE51bWJlciA9PT0gMikge1xyXG4gICAgICAgIHNlbGVjdG9yID0gXCIjaGFuZDJcIjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy4kd3JhcHBlciA9ICQoYCR7c2VsZWN0b3J9YCk7XHJcbiAgICB0aGlzLiRoYW5kID0gJChgJHtzZWxlY3Rvcn0gLmhhbmRgKTtcclxuICAgIHRoaXMuJHBvaW50cyA9ICQoYCR7c2VsZWN0b3J9IC5wb2ludHNgKTtcclxuICAgIHRoaXMucGxheWluZyA9IGZhbHNlO1xyXG4gICAgdGhpcy5jYXJkcyA9IFtdO1xyXG4gICAgdGhpcy5vdXRjb21lO1xyXG4gIH1cclxuXHJcbiAgYWRkQ2FyZChjYXJkLCAkY2FyZCkge1xyXG4gICAgdGhpcy5jYXJkcy5wdXNoKGNhcmQpO1xyXG4gICAgdGhpcy4kaGFuZC5hcHBlbmQoJGNhcmQpO1xyXG4gIH1cclxuXHJcbiAgY2FuU3BsaXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jYXJkc1swXS5wb2ludCA9PT0gdGhpcy5jYXJkc1sxXS5wb2ludDtcclxuICB9XHJcblxyXG4gIGdldFBvaW50cygpIHtcclxuICAgIGxldCB0b3RhbCA9IDA7XHJcbiAgICBsZXQgYWNlcyA9IDA7XHJcbiAgICBmb3IgKGxldCBjYXJkIG9mIHRoaXMuY2FyZHMpIHtcclxuICAgICAgbGV0IHBvaW50ID0gY2FyZC5wb2ludDtcclxuICAgICAgaWYgKHBvaW50ID09PSAxKSB7XHJcbiAgICAgICAgdG90YWwgKz0gMTA7XHJcbiAgICAgICAgYWNlcysrO1xyXG4gICAgICB9IFxyXG4gICAgICBlbHNlIGlmIChwb2ludCA+IDEwKSB7XHJcbiAgICAgICAgcG9pbnQgPSAxMDtcclxuICAgICAgfVxyXG4gICAgICB0b3RhbCArPSBwb2ludDtcclxuICAgICAgd2hpbGUgKHRvdGFsID4gMjEgJiYgYWNlcyA+IDApIHtcclxuICAgICAgICB0b3RhbCAtPSAxMDtcclxuICAgICAgICBhY2VzLS07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0b3RhbDtcclxuICB9XHJcblxyXG4gIHJlbW92ZUNhcmQoKSB7XHJcbiAgICBsZXQgY2FyZCA9IHRoaXMuY2FyZHMucG9wKCk7XHJcbiAgICBsZXQgJGNhcmQgPSB0aGlzLiRoYW5kLmZpbmQoXCJpbWc6bGFzdC1jaGlsZFwiKS5yZW1vdmUoKTtcclxuICAgIHJldHVybiB7Y2FyZCwgJGNhcmR9O1xyXG4gIH1cclxuXHJcbiAgcmV2ZWFsSG9sZSgpIHtcclxuICAgIHRoaXMuJGhhbmQuZmluZCgnaW1nOmZpcnN0LWNoaWxkJykuYXR0cignc3JjJywgdGhpcy5jYXJkc1swXS5nZXRJbWFnZVVybCgpKTtcclxuICB9XHJcblxyXG4gIHNlZUNhcmQoaW5kZXgpIHtcclxuICAgIHJldHVybiB0aGlzLmNhcmRzW2luZGV4IC0gMV07XHJcbiAgfVxyXG5cclxuICB0b2dnbGVIaWdobGlnaHQoKSB7XHJcbiAgICB0aGlzLnBsYXlpbmcgPyB0aGlzLiR3cmFwcGVyLmFkZENsYXNzKFwiY3VycmVudEhhbmRcIikgOiB0aGlzLiR3cmFwcGVyLnJlbW92ZUNsYXNzKFwiY3VycmVudEhhbmRcIik7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVEaXNwbGF5KGNvbnRlbnQpIHtcclxuICAgIHRoaXMuJHBvaW50cy50ZXh0KGNvbnRlbnQpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9oYW5kLmpzIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FyZCB7XHJcbiAgY29uc3RydWN0b3IocG9pbnQsIHN1aXQpIHtcclxuICAgIHRoaXMucG9pbnQgPSBwb2ludDtcclxuICAgIHRoaXMuc3VpdCA9IHN1aXQ7XHJcbiAgfVxyXG5cclxuICBnZXRJbWFnZVVybCgpIHtcclxuICAgIGxldCB2YWx1ZSA9IHRoaXMucG9pbnQ7XHJcbiAgICBpZiAodGhpcy5wb2ludCA9PT0gMTEpIHtcclxuICAgICAgdmFsdWUgPSBcImphY2tcIjtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXMucG9pbnQgPT09IDEyKSB7XHJcbiAgICAgIHZhbHVlID0gXCJxdWVlblwiO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodGhpcy5wb2ludCA9PT0gMTMpIHtcclxuICAgICAgdmFsdWUgPSBcImtpbmdcIjtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXMucG9pbnQgPT09IDEpIHtcclxuICAgICAgdmFsdWUgPSBcImFjZVwiO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGBpbWFnZXMvJHt2YWx1ZX1fb2ZfJHt0aGlzLnN1aXR9LnN2Z2A7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2NhcmQuanMiLCJpbXBvcnQgR2FtZSBmcm9tICcuL2dhbWUnO1xuXG52YXIgY3VycmVudEdhbWUgPSBuZXcgR2FtZTtcblxuY3VycmVudEdhbWUubWFrZUJldCgpO1xuXG4kKCcuZGVhbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICBjdXJyZW50R2FtZS5yZXNldEdhbWUoKTtcbiAgY3VycmVudEdhbWUuZ2FtZURlY2suZ2VuZXJhdGUoMyk7XG4gIGN1cnJlbnRHYW1lLmRlYWwoKTtcbn0pO1xuXG4kKCcuaGl0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gIGN1cnJlbnRHYW1lLmhpdCgpO1xufSk7XG5cbiQoJy5zdGFuZCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICBjdXJyZW50R2FtZS5zdGFuZCgpO1xufSk7XG5cbiQoJy5kb3VibGUtZG93bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICBjdXJyZW50R2FtZS5kb3VibGVEb3duKCk7XG59KTtcblxuJCgnLnNwbGl0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gIGN1cnJlbnRHYW1lLnNwbGl0KCk7XG59KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2FwcC5qcyIsImltcG9ydCBIYW5kIGZyb20gXCIuL2hhbmRcIjtcclxuaW1wb3J0IERlY2sgZnJvbSBcIi4vZGVja1wiO1xyXG5pbXBvcnQgV2FsbGV0IGZyb20gXCIuL3dhbGxldFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZSB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLndhbGxldCA9IG5ldyBXYWxsZXQ7XHJcbiAgICB0aGlzLmdhbWVEZWNrID0gbmV3IERlY2s7XHJcbiAgICB0aGlzLmRlYWxlckhhbmQgPSBuZXcgSGFuZCgnZGVhbGVyJyk7XHJcbiAgICB0aGlzLnBsYXllckhhbmQgPSBuZXcgSGFuZCgncGxheWVyJywgMSk7XHJcbiAgICB0aGlzLnNwbGl0SW5QbGF5ID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy4kdG90YWwgPSAkKFwiLnRvdGFsXCIpO1xyXG4gICAgdGhpcy4kYmV0ID0gJChcIi5jdXJyZW50QmV0XCIpO1xyXG4gICAgdGhpcy4kY2hhbmdlID0gJChcIi5jaGFuZ2VcIik7XHJcbiAgICBcclxuICAgIHRoaXMuJGRlYWwgPSAkKFwiLmRlYWxcIik7XHJcbiAgICB0aGlzLiRoaXQgPSAkKFwiLmhpdFwiKTtcclxuICAgIHRoaXMuJHN0YW5kID0gJChcIi5zdGFuZFwiKTtcclxuICAgIHRoaXMuJGRvdWJsZURvd24gPSAkKFwiLmRvdWJsZS1kb3duXCIpO1xyXG4gICAgdGhpcy4kc3BsaXQgPSAkKFwiLnNwbGl0XCIpO1xyXG4gIH1cclxuXHJcbiAgYWRqdXN0U3BhY2UoKSB7XHJcbiAgICBsZXQgc2l6ZTtcclxuICAgIHRoaXMuc3BsaXRJblBsYXkgPyBzaXplID0gNTAgOiBzaXplID0gMTAwO1xyXG4gICAgJChcIi5wbGF5ZXJIYW5kLWRpdlwiKS5jc3MoXCJ3aWR0aFwiLCBgJHtzaXplfSVgKTtcclxuICB9XHJcblxyXG4gIGNhbGlicmF0ZVNsaWRlcigpIHtcclxuXHJcbiAgfVxyXG5cclxuICBkZWFsKCkge1xyXG4gICAgdGhpcy5zdGFydEdhbWVNb2RlKCk7XHJcbiAgICB0aGlzLmdhbWVEZWNrLnNodWZmbGUoKTtcclxuICAgIHRoaXMuZGVhbE9uZUNhcmQodGhpcy5kZWFsZXJIYW5kLCBcImhvbGVcIik7XHJcbiAgICB0aGlzLmRlYWxPbmVDYXJkKHRoaXMucGxheWVySGFuZCk7XHJcbiAgICBsZXQgZGVhbGVyUG9pbnRzID0gdGhpcy5kZWFsT25lQ2FyZCh0aGlzLmRlYWxlckhhbmQpO1xyXG4gICAgbGV0IHBsYXllclBvaW50cyA9IHRoaXMuZGVhbE9uZUNhcmQodGhpcy5wbGF5ZXJIYW5kKTtcclxuICAgIHRoaXMuZGVhbGVySGFuZC51cGRhdGVEaXNwbGF5KFwiP1wiKTsgLy8gY29uY2VhbCBkZWFsZXIgdG90YWxcclxuXHJcbiAgICBpZiAoZGVhbGVyUG9pbnRzID09PSAyMSAmJiBwbGF5ZXJQb2ludHMgPT09IDIxKSB7XHJcbiAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIlB1c2hcIik7XHJcbiAgICAgIHRoaXMuZGVhbGVySGFuZC51cGRhdGVEaXNwbGF5KFwiQmxhY2tqYWNrXCIpO1xyXG4gICAgICB0aGlzLnBsYXllckhhbmQudXBkYXRlRGlzcGxheShcIkJMQUNLSkFDSywgSE9UIERBTU4hXCIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoZGVhbGVyUG9pbnRzID09PSAyMSkge1xyXG4gICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJEZWFsZXIgd2luc1wiKTtcclxuICAgICAgdGhpcy5kZWFsZXJIYW5kLnVwZGF0ZURpc3BsYXkoXCJCbGFja2phY2tcIik7XHJcbiAgICAgIHRoaXMub3V0Y29tZShcImxvc2VcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChwbGF5ZXJQb2ludHMgPT09IDIxKSB7XHJcbiAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIllvdSB3aW4hXCIpO1xyXG4gICAgICB0aGlzLmRlYWxlckhhbmQudXBkYXRlRGlzcGxheShkZWFsZXJQb2ludHMpO1xyXG4gICAgICB0aGlzLnBsYXllckhhbmQudXBkYXRlRGlzcGxheShcIkJMQUNLSkFDSywgSE9UIERBTU4hXCIpO1xyXG4gICAgICB0aGlzLm91dGNvbWUoXCJibGFja2phY2tcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0aGlzLndhbGxldC5tb25leSA+IHRoaXMud2FsbGV0LmJldCAqIDIpIHtcclxuICAgICAgaWYgKHBsYXllclBvaW50cyA9PT0gMTEpICB7XHJcbiAgICAgICAgdGhpcy5lbmFibGUodGhpcy4kZG91YmxlRG93bik7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMucGxheWVySGFuZC5jYW5TcGxpdCgpKSB7XHJcbiAgICAgICAgdGhpcy5lbmFibGUodGhpcy4kc3BsaXQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkZWFsT25lQ2FyZChoYW5kLCBzcGVjaWFsKSB7XHJcbiAgICBsZXQgY2FyZCA9IHRoaXMuZ2FtZURlY2suZHJhdygpO1xyXG4gICAgbGV0ICRjYXJkID0gJChcIjxpbWcgLz5cIiwge1xyXG4gICAgICBcImNsYXNzXCI6IFwiY2FyZFwiLCBcclxuICAgICAgXCJzcmNcIjogYCR7Y2FyZC5nZXRJbWFnZVVybCgpfWBcclxuICAgIH0pO1xyXG4gICAgaWYgKHNwZWNpYWwgPT09IFwiaG9sZVwiKSB7XHJcbiAgICAgICRjYXJkLmF0dHIoJ3NyYycsIFwiaW1hZ2VzL2JhY2stc3VpdHMtcmVkLnN2Z1wiKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHNwZWNpYWwgPT09IFwiZG91YmxlLWRvd25cIikge1xyXG4gICAgICAkY2FyZC5hZGRDbGFzcygnY2FyZC1kZCcpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoc3BlY2lhbCA9PT0gXCJzcGxpdFwiKSB7XHJcbiAgICAgICRjYXJkLmFkZENsYXNzKCdzcGxpdCcpO1xyXG4gICAgfVxyXG4gICAgaGFuZC5hZGRDYXJkKGNhcmQsICRjYXJkKTtcclxuICAgIGhhbmQudXBkYXRlRGlzcGxheShoYW5kLmdldFBvaW50cygpKTtcclxuICAgIHJldHVybiBoYW5kLmdldFBvaW50cygpO1xyXG4gIH1cclxuXHJcbiAgZGVhbGVyVHVybiguLi5oYW5kcykge1xyXG4gICAgdGhpcy5kZWFsZXJIYW5kLnJldmVhbEhvbGUoKTtcclxuICAgIHdoaWxlICh0aGlzLmRlYWxlckhhbmQuZ2V0UG9pbnRzKCkgPCAxNykge1xyXG4gICAgICB0aGlzLmRlYWxPbmVDYXJkKHRoaXMuZGVhbGVySGFuZCk7XHJcbiAgICB9XHJcbiAgICBoYW5kcy5mb3JFYWNoKGhhbmQgPT4ge1xyXG4gICAgICBpZiAoIWhhbmQub3V0Y29tZSkge1xyXG4gICAgICAgIHRoaXMuZXZhbHVhdGVIYW5kKGhhbmQpXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZGlzYWJsZSguLi5lbGVtZW50cykge1xyXG4gICAgZm9yIChsZXQgZWxlbWVudCBvZiBlbGVtZW50cykge1xyXG4gICAgICBlbGVtZW50LmF0dHIoXCJkaXNhYmxlZFwiLCB0cnVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRvdWJsZURvd24oKSB7XHJcbiAgICB0aGlzLndhbGxldC5kb3VibGVCZXQoKTtcclxuICAgIC8vIGRlYWwgdGhlIHBsYXllciBvbmUgbW9yZSBjYXJkIGFuZCB0aGVuIG1vdmUgb24gdG8gdGhlIGRlYWxlcidzIHR1cm5cclxuICAgIHRoaXMuZGVhbE9uZUNhcmQodGhpcy5wbGF5ZXJIYW5kLCBcImRvdWJsZS1kb3duXCIpO1xyXG4gICAgdGhpcy5zdGFuZCgpO1xyXG4gIH1cclxuXHJcbiAgZW5hYmxlKC4uLmVsZW1lbnRzKSB7XHJcbiAgICBmb3IgKGxldCBlbGVtZW50IG9mIGVsZW1lbnRzKSB7XHJcbiAgICAgIGVsZW1lbnQuYXR0cihcImRpc2FibGVkXCIsIGZhbHNlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGVuZEdhbWVNb2RlKCkge1xyXG4gICAgdGhpcy5wbGF5ZXJIYW5kLnBsYXlpbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuc2VsZWN0Q3VycmVudEhhbmQodGhpcy5wbGF5ZXJIYW5kKTtcclxuICAgIHRoaXMuZGVhbGVySGFuZC5yZXZlYWxIb2xlKCk7XHJcbiAgICB0aGlzLmRlYWxlckhhbmQudXBkYXRlRGlzcGxheSh0aGlzLmRlYWxlckhhbmQuZ2V0UG9pbnRzKCkpO1xyXG5cclxuICAgIHRoaXMud2FsbGV0LnVwZGF0ZSgpO1xyXG4gICAgdGhpcy53YWxsZXQuYXNzZXNzQ2hhbmdlKCk7XHJcbiAgICAkKFwiLmJldHRpbmcgLmJ1dHRvbnNcIikuc2hvdygpO1xyXG4gICAgdGhpcy5lbmFibGUodGhpcy4kZGVhbCk7XHJcbiAgICB0aGlzLmRpc2FibGUodGhpcy4kaGl0LCB0aGlzLiRzdGFuZCk7XHJcbiAgfVxyXG5cclxuICBldmFsdWF0ZUhhbmQoaGFuZCkge1xyXG4gICAgbGV0IGRlYWxlclBvaW50cyA9IHRoaXMuZGVhbGVySGFuZC5nZXRQb2ludHMoKTtcclxuICAgIGxldCBwbGF5ZXJQb2ludHMgPSBoYW5kLmdldFBvaW50cygpO1xyXG4gICAgaWYgKGRlYWxlclBvaW50cyA+IDIxIHx8IHBsYXllclBvaW50cyA+IGRlYWxlclBvaW50cykge1xyXG4gICAgICBoYW5kLm91dGNvbWUgPSBcIndpblwiO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAocGxheWVyUG9pbnRzIDwgZGVhbGVyUG9pbnRzKSB7XHJcbiAgICAgIGhhbmQub3V0Y29tZSA9IFwibG9zZVwiO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIGhhbmQub3V0Y29tZSA9IFwicHVzaFwiO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaGl0KCkge1xyXG4gICAgdGhpcy5kaXNhYmxlKHRoaXMuJGRvdWJsZURvd24sIHRoaXMuJHNwbGl0KTtcclxuICAgIGlmICghdGhpcy5zcGxpdEluUGxheSkge1xyXG4gICAgICBsZXQgcGxheWVyUG9pbnRzID0gdGhpcy5kZWFsT25lQ2FyZCh0aGlzLnBsYXllckhhbmQpO1xyXG4gICAgICBpZiAocGxheWVyUG9pbnRzID4gMjEpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJZb3UgYnVzdFwiKTtcclxuICAgICAgICB0aGlzLm91dGNvbWUoXCJsb3NlXCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgbGV0IGN1cnJlbnRIYW5kID0gdGhpcy5zZWxlY3RDdXJyZW50SGFuZCh0aGlzLnBsYXllckhhbmQsIHRoaXMucGxheWVySGFuZDIpO1xyXG4gICAgICBsZXQgcGxheWVyUG9pbnRzID0gdGhpcy5kZWFsT25lQ2FyZChjdXJyZW50SGFuZCwgXCJzcGxpdFwiKTtcclxuICAgICAgaWYgKHBsYXllclBvaW50cyA+IDIxKSB7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRIYW5kID09PSB0aGlzLnBsYXllckhhbmQpIHtcclxuICAgICAgICAgIHRoaXMucGxheWVySGFuZC5vdXRjb21lID0gXCJsb3NlXCI7XHJcbiAgICAgICAgICB0aGlzLnBsYXllckhhbmQucGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5wbGF5ZXJIYW5kMi5wbGF5aW5nID0gdHJ1ZTtcclxuICAgICAgICAgIHRoaXMuc2VsZWN0Q3VycmVudEhhbmQodGhpcy5wbGF5ZXJIYW5kLCB0aGlzLnBsYXllckhhbmQyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY3VycmVudEhhbmQgPT09IHRoaXMucGxheWVySGFuZDIpIHtcclxuICAgICAgICAgIHRoaXMucGxheWVySGFuZDIub3V0Y29tZSA9IFwibG9zZVwiO1xyXG4gICAgICAgICAgdGhpcy5wbGF5ZXJIYW5kMi5wbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLnNlbGVjdEN1cnJlbnRIYW5kKHRoaXMucGxheWVySGFuZCwgdGhpcy5wbGF5ZXJIYW5kMik7XHJcbiAgICAgICAgICB0aGlzLmludm9rZU91dGNvbWUodGhpcy5wbGF5ZXJIYW5kLCB0aGlzLnBsYXllckhhbmQyKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGludm9rZU91dGNvbWUoLi4uaGFuZHMpIHtcclxuICAgIGxldCBoYW5kMSA9IGhhbmRzWzBdLm91dGNvbWU7XHJcbiAgICBpZiAoaGFuZHMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgIGlmIChoYW5kMSA9PT0gXCJ3aW5cIikge1xyXG4gICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIllvdSB3aW4hXCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKGhhbmQxID09PSBcImxvc2VcIikge1xyXG4gICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIkRlYWxlciB3aW5zXCIpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMub3V0Y29tZShoYW5kMSlcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGhhbmRzLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICB0aGlzLm11bHRpcGxlT3V0Y29tZXMoaGFuZHMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbWFrZUJldCgpIHtcclxuICAgIGNvbnN0IGdhbWUgPSB0aGlzO1xyXG4gICAgdGhpcy53YWxsZXQudXBkYXRlKCk7XHJcbiAgICAkKFwiLmJldC1idG5cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcclxuICAgICAgY29uc3QgcG9zc2libGVCZXQgPSBnYW1lLndhbGxldC5tb25leSAtIGdhbWUud2FsbGV0LmJldDtcclxuICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoXCJhZGQxMFwiKSAmJiBwb3NzaWJsZUJldCA+PSAxMCkge1xyXG4gICAgICAgIGdhbWUud2FsbGV0LmJldCArPSAxMDtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmICgkKHRoaXMpLmhhc0NsYXNzKFwiYWRkNTBcIikgJiYgcG9zc2libGVCZXQgPj0gNTApIHtcclxuICAgICAgICBnYW1lLndhbGxldC5iZXQgKz0gNTA7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAoJCh0aGlzKS5oYXNDbGFzcyhcImFkZDEwMFwiKSAmJiBwb3NzaWJsZUJldCA+PSAxMDApIHtcclxuICAgICAgICBnYW1lLndhbGxldC5iZXQgKz0gMTAwO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKCQodGhpcykuaGFzQ2xhc3MoXCJhZGQ1MDBcIikgJiYgcG9zc2libGVCZXQgPj0gNTAwKSB7XHJcbiAgICAgICAgZ2FtZS53YWxsZXQuYmV0ICs9IDUwMDtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmICgkKHRoaXMpLmhhc0NsYXNzKFwiYWxsLWluXCIpKSB7XHJcbiAgICAgICAgZ2FtZS53YWxsZXQuYmV0ID0gZ2FtZS53YWxsZXQubW9uZXk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAoJCh0aGlzKS5oYXNDbGFzcyhcInJlc2V0XCIpKSB7XHJcbiAgICAgICAgZ2FtZS53YWxsZXQuYmV0ID0gMTA7XHJcbiAgICAgIH1cclxuICAgICAgZ2FtZS4kYmV0LnRleHQoZ2FtZS53YWxsZXQuYmV0KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbXVsdGlwbGVPdXRjb21lcyhoYW5kcykge1xyXG4gICAgbGV0IGhhbmQxID0gaGFuZHNbMF0ub3V0Y29tZTtcclxuICAgIGxldCBoYW5kMiA9IGhhbmRzWzFdLm91dGNvbWU7XHJcbiAgICBpZiAoaGFuZDEgPT09IGhhbmQyKSB7XHJcbiAgICAgIGlmIChoYW5kMSA9PT0gXCJibGFja2phY2tcIikge1xyXG4gICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIlRXTyBCTEFDS0pBQ0tTISEhXCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKGhhbmQxID09PSBcIndpblwiKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiWW91IHdpbiBib3RoIVwiKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmIChoYW5kMSA9PT0gXCJsb3NlXCIpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJEZWFsZXIgd2lucyBib3RoXCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIlB1c2ggYm90aFwiKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLndhbGxldC5wYXlvdXQoaGFuZDEpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoaGFuZDEgIT09IGhhbmQyKSB7XHJcbiAgICAgIC8vIGNhbGN1bGF0ZSB2YWx1ZSBvZiBlYWNoIGhhbmQgb3V0Y29tZSBiZWZvcmUgY2FsbGluZyBwYXlvdXQgZnVuY3Rpb25cclxuICAgICAgbGV0IGluaXRpYWxCZXQgPSB0aGlzLndhbGxldC5iZXQgLyAyO1xyXG4gICAgICBsZXQgaGFuZDFWYWx1ZSA9IDA7XHJcbiAgICAgIGxldCBoYW5kMlZhbHVlID0gMDtcclxuICAgICAgaWYgKGhhbmQxID09PSBcImJsYWNramFja1wiIHx8IGhhbmQyID09PSBcImJsYWNramFja1wiKSB7XHJcbiAgICAgICAgaGFuZDFWYWx1ZSA9IGluaXRpYWxCZXQgKiAxLjU7XHJcbiAgICAgICAgaWYgKGhhbmQxID09PSBcIndpblwiIHx8IGhhbmQyID09PSBcIndpblwiKSB7XHJcbiAgICAgICAgICBoYW5kMlZhbHVlID0gaW5pdGlhbEJldDtcclxuICAgICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIllvdSB3aW4gYm90aCFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGhhbmQxID09PSBcImxvc2VcIiB8fCBoYW5kMiA9PT0gXCJsb3NlXCIpIHtcclxuICAgICAgICAgIGhhbmQyVmFsdWUgPSAtaW5pdGlhbEJldDtcclxuICAgICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIllvdSBhbmQgZGVhbGVyIGVhY2ggd2luIG9uZVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJZb3Ugd2luIG9uZSwgcHVzaFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gXHJcbiAgICAgIGVsc2UgaWYgKGhhbmQxID09PSBcIndpblwiIHx8IGhhbmQyID09PSBcIndpblwiKSB7XHJcbiAgICAgICAgaGFuZDFWYWx1ZSA9IGluaXRpYWxCZXQ7XHJcbiAgICAgICAgaWYgKGhhbmQxID09PSBcImxvc2VcIiB8fCBoYW5kMiA9PT0gXCJsb3NlXCIpIHtcclxuICAgICAgICAgIGhhbmQyVmFsdWUgPSAtaW5pdGlhbEJldDtcclxuICAgICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIllvdSBhbmQgZGVhbGVyIGVhY2ggd2luIG9uZVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJZb3Ugd2luIG9uZSwgcHVzaFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAoaGFuZDEgPT09IFwibG9zZVwiIHx8IGhhbmQyID09PSBcImxvc2VcIikge1xyXG4gICAgICAgIGhhbmQxVmFsdWUgPSAtaW5pdGlhbEJldDtcclxuICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJEZWFsZXIgd2lucyBvbmUsIHB1c2hcIik7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy53YWxsZXQucGF5b3V0KFwiY3VzdG9tXCIsIGhhbmQxVmFsdWUsIGhhbmQyVmFsdWUpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zcGxpdEluUGxheSA9IGZhbHNlO1xyXG4gICAgdGhpcy5lbmRHYW1lTW9kZSgpO1xyXG4gIH1cclxuXHJcbiAgbW9kYWwobW9kYWxUeXBlKSB7XHJcbiAgICBpZiAobW9kYWxUeXBlID09PSBcImJhbmtydXB0XCIpIHtcclxuICAgICAgJChcIi5tb2RhbCwgLm1vZGFsLW92ZXJsYXlcIikucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpO1xyXG4gICAgICAkKFwiLm1vZGFsLWd1dHMgYnV0dG9uXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJChcIi5tb2RhbCwgLm1vZGFsLW92ZXJsYXlcIikuYWRkQ2xhc3MoXCJoaWRlXCIpO1xyXG4gICAgICAgICQoXCIudGl0bGUtc2NyZWVuXCIpLnNob3coKTtcclxuICAgICAgICB0aGlzLnJlc2V0R2FtZSgpO1xyXG4gICAgICAgIHRoaXMud2FsbGV0LnJlc2V0KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAobW9kYWxUeXBlID09PSBcImhlbHBcIikge1xyXG4gICAgICAvLyBmdXR1cmUgZ2FtZSBmZWF0dXJlOiBpbnN0cnVjdGlvbnMgYXZhaWxhYmxlIGluIGhlbHAgbW9kYWxcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG91dGNvbWUocmVzdWx0KSB7XHJcbiAgICB0aGlzLndhbGxldC5wYXlvdXQocmVzdWx0KTtcclxuICAgIGlmIChyZXN1bHQgPT09IFwicHVzaFwiKSB7XHJcbiAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIlB1c2hcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChyZXN1bHQgPT09IFwibG9zZVwiKSB7XHJcbiAgICAgIGlmICh0aGlzLndhbGxldC5tb25leSAtIHRoaXMud2FsbGV0LmJldCA8PSAwKSB7XHJcbiAgICAgICAgdGhpcy5tb2RhbChcImJhbmtydXB0XCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLmVuZEdhbWVNb2RlKCk7XHJcbiAgfVxyXG5cclxuICByZXNldEdhbWUoKSB7XHJcbiAgICB0aGlzLmdhbWVEZWNrID0gbmV3IERlY2s7XHJcbiAgICB0aGlzLmRlYWxlckhhbmQgPSBuZXcgSGFuZChcImRlYWxlclwiKTtcclxuICAgIHRoaXMucGxheWVySGFuZCA9IG5ldyBIYW5kKFwicGxheWVyXCIsIDEpO1xyXG4gICAgJChcIi5tZXNzYWdlc1wiKS5lbXB0eSgpO1xyXG4gICAgJChcIi5wbGF5ZXItaGFuZFwiKS5lbXB0eSgpO1xyXG4gICAgJChcIi5kZWFsZXItaGFuZFwiKS5lbXB0eSgpO1xyXG4gICAgJChcIi5wbGF5ZXItcG9pbnRzXCIpLmVtcHR5KCk7XHJcbiAgICAkKFwiLmRlYWxlci1wb2ludHNcIikuZW1wdHkoKTtcclxuICAgICQoXCIuY2hhbmdlXCIpLmVtcHR5KCk7XHJcbiAgfVxyXG5cclxuICBzZWxlY3RDdXJyZW50SGFuZCguLi5oYW5kcykge1xyXG4gICAgbGV0IGN1cnJlbnRIYW5kO1xyXG4gICAgZm9yIChsZXQgaGFuZCBvZiBoYW5kcykge1xyXG4gICAgICBoYW5kLnRvZ2dsZUhpZ2hsaWdodCgpO1xyXG4gICAgICBpZiAoaGFuZC5wbGF5aW5nKSB7XHJcbiAgICAgICAgY3VycmVudEhhbmQgPSBoYW5kO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY3VycmVudEhhbmQ7XHJcbiAgfVxyXG5cclxuICBzcGxpdCgpIHtcclxuICAgIHRoaXMuc3BsaXRJblBsYXkgPSB0cnVlO1xyXG4gICAgdGhpcy5kaXNhYmxlKHRoaXMuJHNwbGl0KTtcclxuICAgIHRoaXMud2FsbGV0LmRvdWJsZUJldCgpO1xyXG5cclxuICAgIC8vIHN0YXJ0IGFkZGl0aW9uYWwgaGFuZCBhbmQgbW92ZSBvbmUgY2FyZCBmcm9tIGhhbmQgMSB0byBoYW5kIDJcclxuICAgIHRoaXMuYWRqdXN0U3BhY2UoKTtcclxuICAgIHRoaXMucGxheWVySGFuZDIgPSBuZXcgSGFuZChcInBsYXllclwiLCAyKTtcclxuICAgIGxldCByZW1vdmVkQ2FyZCA9IHRoaXMucGxheWVySGFuZC5yZW1vdmVDYXJkKCk7XHJcbiAgICB0aGlzLnBsYXllckhhbmQyLmFkZENhcmQocmVtb3ZlZENhcmQuY2FyZCwgcmVtb3ZlZENhcmQuJGNhcmQpO1xyXG4gICAgdGhpcy5kZWFsT25lQ2FyZCh0aGlzLnBsYXllckhhbmQpO1xyXG4gICAgdGhpcy5kZWFsT25lQ2FyZCh0aGlzLnBsYXllckhhbmQyKTtcclxuICB9XHJcblxyXG4gIHN0YW5kKCkge1xyXG4gICAgaWYgKCF0aGlzLnNwbGl0SW5QbGF5KSB7XHJcbiAgICAgIHRoaXMuZGlzYWJsZSh0aGlzLiRoaXQsIHRoaXMuJHN0YW5kLCB0aGlzLiRkb3VibGVEb3duLCB0aGlzLiRzcGxpdCk7XHJcbiAgICAgIHRoaXMuZGVhbGVyVHVybih0aGlzLnBsYXllckhhbmQpO1xyXG4gICAgICB0aGlzLmludm9rZU91dGNvbWUodGhpcy5wbGF5ZXJIYW5kKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBsZXQgY3VycmVudEhhbmQgPSB0aGlzLnNlbGVjdEN1cnJlbnRIYW5kKHRoaXMucGxheWVySGFuZCwgdGhpcy5wbGF5ZXJIYW5kMik7XHJcbiAgICAgIGlmIChjdXJyZW50SGFuZCA9PT0gdGhpcy5wbGF5ZXJIYW5kKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJIYW5kLnBsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBsYXllckhhbmQyLnBsYXlpbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0Q3VycmVudEhhbmQodGhpcy5wbGF5ZXJIYW5kLCB0aGlzLnBsYXllckhhbmQyKTtcclxuICAgICAgfSBcclxuICAgICAgZWxzZSBpZiAoY3VycmVudEhhbmQgPT09IHRoaXMucGxheWVySGFuZDIpIHtcclxuICAgICAgICB0aGlzLnBsYXllckhhbmQyLnBsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNlbGVjdEN1cnJlbnRIYW5kKHRoaXMucGxheWVySGFuZCwgdGhpcy5wbGF5ZXJIYW5kMik7XHJcbiAgICAgICAgdGhpcy5kZWFsZXJUdXJuKHRoaXMucGxheWVySGFuZCwgdGhpcy5wbGF5ZXJIYW5kMik7XHJcbiAgICAgICAgdGhpcy5pbnZva2VPdXRjb21lKHRoaXMucGxheWVySGFuZCwgdGhpcy5wbGF5ZXJIYW5kMik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXJ0R2FtZU1vZGUoKSB7XHJcbiAgICAkKFwiLnRpdGxlLXNjcmVlblwiKS5oaWRlKCk7XHJcbiAgICB0aGlzLmFkanVzdFNwYWNlKCk7XHJcbiAgICB0aGlzLmVuYWJsZSh0aGlzLiRoaXQsIHRoaXMuJHN0YW5kKTtcclxuICAgIHRoaXMuZGlzYWJsZSh0aGlzLiRkZWFsKTtcclxuICAgICQoXCIuYmV0dGluZyAuYnV0dG9uc1wiKS5oaWRlKCk7XHJcbiAgICB0aGlzLnBsYXllckhhbmQucGxheWluZyA9IHRydWU7XHJcbiAgICB0aGlzLnNlbGVjdEN1cnJlbnRIYW5kKHRoaXMucGxheWVySGFuZCk7ICBcclxuICB9XHJcblxyXG4gIHVwZGF0ZU1lc3NhZ2UobWVzc2FnZSkge1xyXG4gICAgJChcIi5tZXNzYWdlc1wiKS5hcHBlbmQoYDxoMT4ke21lc3NhZ2V9PC9oMT5gKTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvZ2FtZS5qcyIsImltcG9ydCBDYXJkIGZyb20gXCIuL2NhcmRcIjtcclxuaW1wb3J0IEhhbmQgZnJvbSBcIi4vaGFuZFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVjayB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmNhcmRzID0gW107XHJcbiAgfVxyXG5cclxuICBkcmF3KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2FyZHMucG9wKCk7XHJcbiAgfVxyXG5cclxuICBnZW5lcmF0ZShudW1EZWNrcykge1xyXG4gICAgaWYgKCFudW1EZWNrcykge1xyXG4gICAgICBudW1EZWNrcyA9IDE7XHJcbiAgICB9XHJcbiAgICB3aGlsZSAobnVtRGVja3MgPiAwKSB7XHJcbiAgICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IDEzOyBpKyspIHtcclxuICAgICAgICB0aGlzLmNhcmRzLnB1c2gobmV3IENhcmQoaSwgXCJzcGFkZXNcIikpO1xyXG4gICAgICAgIHRoaXMuY2FyZHMucHVzaChuZXcgQ2FyZChpLCBcImRpYW1vbmRzXCIpKTtcclxuICAgICAgICB0aGlzLmNhcmRzLnB1c2gobmV3IENhcmQoaSwgXCJoZWFydHNcIikpO1xyXG4gICAgICAgIHRoaXMuY2FyZHMucHVzaChuZXcgQ2FyZChpLCBcImNsdWJzXCIpKTtcclxuICAgICAgfVxyXG4gICAgICBudW1EZWNrcy0tO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2h1ZmZsZSgpIHtcclxuICAgIGZvciAobGV0IGkgPSB0aGlzLmNhcmRzLmxlbmd0aCAtIDE7IGkgPiAwOyBpLS0pIHtcclxuICAgICAgY29uc3QgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChpICsgMSkpO1xyXG4gICAgICBbdGhpcy5jYXJkc1tpXV0gPSBbdGhpcy5jYXJkc1tqXV07XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2RlY2suanMiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBXYWxsZXQge1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0dGhpcy5tb25leSA9IDUwMDtcclxuXHRcdHRoaXMuYmV0ID0gMTA7XHJcblx0XHR0aGlzLmNoYW5nZSA9IFwiXCI7XHJcblxyXG5cdFx0dGhpcy4kdG90YWwgPSAkKFwiLnRvdGFsXCIpO1xyXG5cdFx0dGhpcy4kYmV0ID0gJChcIi5jdXJyZW50QmV0XCIpO1xyXG5cdFx0dGhpcy4kY2hhbmdlID0gJChcIi5jaGFuZ2VcIik7XHJcblx0fVxyXG5cclxuXHRhc3Nlc3NDaGFuZ2UoKSB7XHJcblx0XHRsZXQgY2xhc3NOYW1lID0gXCJcIjtcclxuXHRcdGxldCBzeW1ib2wgPSBcIlwiO1xyXG5cdFx0aWYgKHRoaXMuY2hhbmdlID4gMCkge1xyXG5cdFx0XHRjbGFzc05hbWUgPSBcInBvc2l0aXZlXCI7XHJcblx0XHRcdHN5bWJvbCA9IFwiK1wiO1xyXG5cdFx0fSBlbHNlIGlmICh0aGlzLmNoYW5nZSA8IDApIHtcclxuXHRcdFx0Y2xhc3NOYW1lID0gXCJuZWdhdGl2ZVwiO1xyXG5cdFx0XHRzeW1ib2wgPSBcIi1cIjtcclxuXHRcdH1cclxuXHRcdHRoaXMuJGNoYW5nZS5hcHBlbmQoYDxzcGFuIGNsYXNzPVwiJHtjbGFzc05hbWV9XCI+JHtzeW1ib2x9ICQke01hdGguYWJzKHRoaXMuY2hhbmdlKX08L3NwYW4+YCk7XHJcblx0fVxyXG5cdFxyXG5cdGRvdWJsZUJldCgpIHtcclxuXHRcdHRoaXMubW9uZXkgLT0gdGhpcy5iZXQ7XHJcblx0XHR0aGlzLmJldCAqPSAyO1xyXG5cdFx0dGhpcy51cGRhdGUoKTtcclxuXHR9XHJcblxyXG5cdHBheW91dChvdXRjb21lLCBoYW5kMVZhbHVlLCBoYW5kMlZhbHVlKSB7XHJcblx0XHRpZiAob3V0Y29tZSA9PT0gXCJibGFja2phY2tcIikge1xyXG5cdFx0XHR0aGlzLmNoYW5nZSA9IHRoaXMuYmV0ICogMS41O1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAob3V0Y29tZSA9PT0gXCJ3aW5cIikge1xyXG5cdFx0XHR0aGlzLmNoYW5nZSA9IHRoaXMuYmV0O1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAob3V0Y29tZSA9PT0gXCJsb3NlXCIpIHtcclxuXHRcdFx0dGhpcy5jaGFuZ2UgPSAtdGhpcy5iZXQ7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmIChvdXRjb21lID09PSBcInB1c2hcIikge1xyXG5cdFx0XHR0aGlzLmNoYW5nZSA9IDA7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmIChvdXRjb21lID09PSBcIm11bHRpcGxlXCIpIHtcclxuXHRcdFx0dGhpcy5jaGFuZ2UgPSBoYW5kMVZhbHVlICsgaGFuZDJWYWx1ZTtcclxuXHRcdH1cclxuXHRcdHRoaXMubW9uZXkgKz0gdGhpcy5jaGFuZ2U7XHJcblx0fVxyXG5cclxuXHRyZXNldCgpIHtcclxuXHRcdHRoaXMubW9uZXkgPSA1MDA7XHJcblx0XHR0aGlzLmJldCA9IDEwO1xyXG5cdFx0dGhpcy5jaGFuZ2UgPSBcIlwiO1xyXG5cdFx0dGhpcy51cGRhdGUoKTtcclxuXHR9XHJcblxyXG5cdHVwZGF0ZSgpIHtcclxuXHRcdHRoaXMuJHRvdGFsLnRleHQodGhpcy5tb25leSk7XHJcblx0XHR0aGlzLiRiZXQudGV4dCh0aGlzLmJldCk7XHJcblx0fVxyXG5cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL3dhbGxldC5qcyJdLCJzb3VyY2VSb290IjoiIn0=