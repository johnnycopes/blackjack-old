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
        if (hand1 === "blackjack" && hand2 === "blackjack") {
          this.updateMessage("TWO BLACKJACKS!!!");
        } else if (hand1 === "win" && hand2 === "win") {
          this.updateMessage("You win both!");
        } else if (hand1 === "lose" && hand2 === "lose") {
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
      this.wallet.payout(result);
      if (result === "push") {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzAyN2E2YTI3OGEwMmRkZDg4MDgiLCJ3ZWJwYWNrOi8vLy4vanMvaGFuZC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jYXJkLmpzIiwid2VicGFjazovLy8uL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9nYW1lLmpzIiwid2VicGFjazovLy8uL2pzL2RlY2suanMiLCJ3ZWJwYWNrOi8vLy4vanMvd2FsbGV0LmpzIl0sIm5hbWVzIjpbIkhhbmQiLCJvd25lciIsImhhbmROdW1iZXIiLCJzZWxlY3RvciIsIiR3cmFwcGVyIiwiJCIsIiRoYW5kIiwiJHBvaW50cyIsInBsYXlpbmciLCJjYXJkcyIsIm91dGNvbWUiLCJjYXJkIiwiJGNhcmQiLCJwdXNoIiwiYXBwZW5kIiwicG9pbnQiLCJ0b3RhbCIsImFjZXMiLCJwb3AiLCJmaW5kIiwicmVtb3ZlIiwiYXR0ciIsImdldEltYWdlVXJsIiwiaW5kZXgiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwiY29udGVudCIsInRleHQiLCJDYXJkIiwic3VpdCIsInZhbHVlIiwiY3VycmVudEdhbWUiLCJtYWtlQmV0Iiwib24iLCJyZXNldEdhbWUiLCJnYW1lRGVjayIsImdlbmVyYXRlIiwiZGVhbCIsImhpdCIsInN0YW5kIiwiZG91YmxlRG93biIsInNwbGl0IiwiR2FtZSIsIndhbGxldCIsImRlYWxlckhhbmQiLCJwbGF5ZXJIYW5kIiwic3BsaXRJblBsYXkiLCIkdG90YWwiLCIkYmV0IiwiJGNoYW5nZSIsIiRkZWFsIiwiJGhpdCIsIiRzdGFuZCIsIiRkb3VibGVEb3duIiwiJHNwbGl0Iiwic2l6ZSIsImNzcyIsInN0YXJ0R2FtZU1vZGUiLCJzaHVmZmxlIiwiZGVhbE9uZUNhcmQiLCJkZWFsZXJQb2ludHMiLCJwbGF5ZXJQb2ludHMiLCJ1cGRhdGVEaXNwbGF5IiwidXBkYXRlTWVzc2FnZSIsIm1vbmV5IiwiYmV0IiwiZW5hYmxlIiwiY2FuU3BsaXQiLCJoYW5kIiwic3BlY2lhbCIsImRyYXciLCJhZGRDYXJkIiwiZ2V0UG9pbnRzIiwicmV2ZWFsSG9sZSIsImhhbmRzIiwiZm9yRWFjaCIsImV2YWx1YXRlSGFuZCIsImVsZW1lbnRzIiwiZWxlbWVudCIsImRvdWJsZUJldCIsInNlbGVjdEN1cnJlbnRIYW5kIiwidXBkYXRlIiwiYXNzZXNzQ2hhbmdlIiwic2hvdyIsImRpc2FibGUiLCJjdXJyZW50SGFuZCIsInBsYXllckhhbmQyIiwiaW52b2tlT3V0Y29tZSIsImhhbmQxIiwibGVuZ3RoIiwibXVsdGlwbGVPdXRjb21lcyIsImdhbWUiLCJwb3NzaWJsZUJldCIsImhhc0NsYXNzIiwiaGFuZDIiLCJwYXlvdXQiLCJpbml0aWFsQmV0IiwiaGFuZDFWYWx1ZSIsImhhbmQyVmFsdWUiLCJlbmRHYW1lTW9kZSIsIm1vZGFsVHlwZSIsImh0bWwiLCJyZXNldCIsInJlc3VsdCIsImxvc2UiLCJtb2RhbCIsImVtcHR5IiwidG9nZ2xlSGlnaGxpZ2h0IiwiYWRqdXN0U3BhY2UiLCJyZW1vdmVkQ2FyZCIsInJlbW92ZUNhcmQiLCJkZWFsZXJUdXJuIiwiaGlkZSIsIm1lc3NhZ2UiLCJEZWNrIiwibnVtRGVja3MiLCJpIiwiaiIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIldhbGxldCIsImNoYW5nZSIsImNsYXNzTmFtZSIsInN5bWJvbCIsImFicyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDN0RBOzs7Ozs7OztJQUVxQkEsSTtBQUNuQixnQkFBWUMsS0FBWixFQUFtQkMsVUFBbkIsRUFBK0I7QUFBQTs7QUFDN0IsUUFBSUMsaUJBQUo7QUFDQSxRQUFJRixVQUFVLFFBQWQsRUFBd0I7QUFDdEJFLGlCQUFXLFNBQVg7QUFDRCxLQUZELE1BR0ssSUFBSUYsVUFBVSxRQUFkLEVBQXdCO0FBQzNCLFVBQUlDLGVBQWUsQ0FBbkIsRUFBc0I7QUFDcEJDLG1CQUFXLFFBQVg7QUFDRCxPQUZELE1BR0ssSUFBSUQsZUFBZSxDQUFuQixFQUFzQjtBQUN6QkMsbUJBQVcsUUFBWDtBQUNEO0FBQ0Y7QUFDRCxTQUFLQyxRQUFMLEdBQWdCQyxPQUFLRixRQUFMLENBQWhCO0FBQ0EsU0FBS0csS0FBTCxHQUFhRCxFQUFLRixRQUFMLFlBQWI7QUFDQSxTQUFLSSxPQUFMLEdBQWVGLEVBQUtGLFFBQUwsY0FBZjtBQUNBLFNBQUtLLE9BQUwsR0FBZSxLQUFmO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLEVBQWI7QUFDQSxTQUFLQyxPQUFMO0FBQ0Q7Ozs7NEJBRU9DLEksRUFBTUMsSyxFQUFPO0FBQ25CLFdBQUtILEtBQUwsQ0FBV0ksSUFBWCxDQUFnQkYsSUFBaEI7QUFDQSxXQUFLTCxLQUFMLENBQVdRLE1BQVgsQ0FBa0JGLEtBQWxCO0FBQ0Q7OzsrQkFFVTtBQUNULGFBQU8sS0FBS0gsS0FBTCxDQUFXLENBQVgsRUFBY00sS0FBZCxLQUF3QixLQUFLTixLQUFMLENBQVcsQ0FBWCxFQUFjTSxLQUE3QztBQUNEOzs7Z0NBRVc7QUFDVixVQUFJQyxRQUFRLENBQVo7QUFDQSxVQUFJQyxPQUFPLENBQVg7QUFGVTtBQUFBO0FBQUE7O0FBQUE7QUFHViw2QkFBaUIsS0FBS1IsS0FBdEIsOEhBQTZCO0FBQUEsY0FBcEJFLElBQW9COztBQUMzQixjQUFJSSxRQUFRSixLQUFLSSxLQUFqQjtBQUNBLGNBQUlBLFVBQVUsQ0FBZCxFQUFpQjtBQUNmQyxxQkFBUyxFQUFUO0FBQ0FDO0FBQ0QsV0FIRCxNQUlLLElBQUlGLFFBQVEsRUFBWixFQUFnQjtBQUNuQkEsb0JBQVEsRUFBUjtBQUNEO0FBQ0RDLG1CQUFTRCxLQUFUO0FBQ0EsaUJBQU9DLFFBQVEsRUFBUixJQUFjQyxPQUFPLENBQTVCLEVBQStCO0FBQzdCRCxxQkFBUyxFQUFUO0FBQ0FDO0FBQ0Q7QUFDRjtBQWpCUztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQWtCVixhQUFPRCxLQUFQO0FBQ0Q7OztpQ0FFWTtBQUNYLFVBQUlMLE9BQU8sS0FBS0YsS0FBTCxDQUFXUyxHQUFYLEVBQVg7QUFDQSxVQUFJTixRQUFRLEtBQUtOLEtBQUwsQ0FBV2EsSUFBWCxDQUFnQixnQkFBaEIsRUFBa0NDLE1BQWxDLEVBQVo7QUFDQSxhQUFPLEVBQUNULFVBQUQsRUFBT0MsWUFBUCxFQUFQO0FBQ0Q7OztpQ0FFWTtBQUNYLFdBQUtOLEtBQUwsQ0FBV2EsSUFBWCxDQUFnQixpQkFBaEIsRUFBbUNFLElBQW5DLENBQXdDLEtBQXhDLEVBQStDLEtBQUtaLEtBQUwsQ0FBVyxDQUFYLEVBQWNhLFdBQWQsRUFBL0M7QUFDRDs7OzRCQUVPQyxLLEVBQU87QUFDYixhQUFPLEtBQUtkLEtBQUwsQ0FBV2MsUUFBUSxDQUFuQixDQUFQO0FBQ0Q7OztzQ0FFaUI7QUFDaEIsV0FBS2YsT0FBTCxHQUFlLEtBQUtKLFFBQUwsQ0FBY29CLFFBQWQsQ0FBdUIsYUFBdkIsQ0FBZixHQUF1RCxLQUFLcEIsUUFBTCxDQUFjcUIsV0FBZCxDQUEwQixhQUExQixDQUF2RDtBQUNEOzs7a0NBRWFDLE8sRUFBUztBQUNyQixXQUFLbkIsT0FBTCxDQUFhb0IsSUFBYixDQUFrQkQsT0FBbEI7QUFDRDs7Ozs7O2tCQXhFa0IxQixJOzs7Ozs7Ozs7Ozs7Ozs7OztJQ0ZBNEIsSTtBQUNuQixnQkFBWWIsS0FBWixFQUFtQmMsSUFBbkIsRUFBeUI7QUFBQTs7QUFDdkIsU0FBS2QsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS2MsSUFBTCxHQUFZQSxJQUFaO0FBQ0Q7Ozs7a0NBRWE7QUFDWixVQUFJQyxRQUFRLEtBQUtmLEtBQWpCO0FBQ0EsVUFBSSxLQUFLQSxLQUFMLEtBQWUsRUFBbkIsRUFBdUI7QUFDckJlLGdCQUFRLE1BQVI7QUFDRCxPQUZELE1BR0ssSUFBSSxLQUFLZixLQUFMLEtBQWUsRUFBbkIsRUFBdUI7QUFDMUJlLGdCQUFRLE9BQVI7QUFDRCxPQUZJLE1BR0EsSUFBSSxLQUFLZixLQUFMLEtBQWUsRUFBbkIsRUFBdUI7QUFDMUJlLGdCQUFRLE1BQVI7QUFDRCxPQUZJLE1BR0EsSUFBSSxLQUFLZixLQUFMLEtBQWUsQ0FBbkIsRUFBc0I7QUFDekJlLGdCQUFRLEtBQVI7QUFDRDtBQUNELHlCQUFpQkEsS0FBakIsWUFBNkIsS0FBS0QsSUFBbEM7QUFDRDs7Ozs7O2tCQXJCa0JELEk7Ozs7Ozs7OztBQ0FyQjs7Ozs7O0FBRUEsSUFBSUcsY0FBYyxvQkFBbEI7O0FBRUFBLFlBQVlDLE9BQVo7O0FBRUEzQixFQUFFLE9BQUYsRUFBVzRCLEVBQVgsQ0FBYyxPQUFkLEVBQXVCLFlBQVc7QUFDaENGLGNBQVlHLFNBQVo7QUFDQUgsY0FBWUksUUFBWixDQUFxQkMsUUFBckIsQ0FBOEIsQ0FBOUI7QUFDQUwsY0FBWU0sSUFBWjtBQUNELENBSkQ7O0FBTUFoQyxFQUFFLE1BQUYsRUFBVTRCLEVBQVYsQ0FBYSxPQUFiLEVBQXNCLFlBQVc7QUFDL0JGLGNBQVlPLEdBQVo7QUFDRCxDQUZEOztBQUlBakMsRUFBRSxRQUFGLEVBQVk0QixFQUFaLENBQWUsT0FBZixFQUF3QixZQUFXO0FBQ2pDRixjQUFZUSxLQUFaO0FBQ0QsQ0FGRDs7QUFJQWxDLEVBQUUsY0FBRixFQUFrQjRCLEVBQWxCLENBQXFCLE9BQXJCLEVBQThCLFlBQVc7QUFDdkNGLGNBQVlTLFVBQVo7QUFDRCxDQUZEOztBQUlBbkMsRUFBRSxRQUFGLEVBQVk0QixFQUFaLENBQWUsT0FBZixFQUF3QixZQUFXO0FBQ2pDRixjQUFZVSxLQUFaO0FBQ0QsQ0FGRCxFOzs7Ozs7Ozs7Ozs7Ozs7QUN4QkE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztJQUVxQkMsSTtBQUNuQixrQkFBYztBQUFBOztBQUNaLFNBQUtDLE1BQUwsR0FBYyxzQkFBZDtBQUNBLFNBQUtSLFFBQUwsR0FBZ0Isb0JBQWhCO0FBQ0EsU0FBS1MsVUFBTCxHQUFrQixtQkFBUyxRQUFULENBQWxCO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQixtQkFBUyxRQUFULEVBQW1CLENBQW5CLENBQWxCO0FBQ0EsU0FBS0MsV0FBTCxHQUFtQixLQUFuQjs7QUFFQSxTQUFLQyxNQUFMLEdBQWMxQyxFQUFFLFFBQUYsQ0FBZDtBQUNBLFNBQUsyQyxJQUFMLEdBQVkzQyxFQUFFLGFBQUYsQ0FBWjtBQUNBLFNBQUs0QyxPQUFMLEdBQWU1QyxFQUFFLFNBQUYsQ0FBZjs7QUFFQSxTQUFLNkMsS0FBTCxHQUFhN0MsRUFBRSxPQUFGLENBQWI7QUFDQSxTQUFLOEMsSUFBTCxHQUFZOUMsRUFBRSxNQUFGLENBQVo7QUFDQSxTQUFLK0MsTUFBTCxHQUFjL0MsRUFBRSxRQUFGLENBQWQ7QUFDQSxTQUFLZ0QsV0FBTCxHQUFtQmhELEVBQUUsY0FBRixDQUFuQjtBQUNBLFNBQUtpRCxNQUFMLEdBQWNqRCxFQUFFLFFBQUYsQ0FBZDtBQUNEOzs7O2tDQUVhO0FBQ1osVUFBSWtELGFBQUo7QUFDQSxXQUFLVCxXQUFMLEdBQW1CUyxPQUFPLEVBQTFCLEdBQStCQSxPQUFPLEdBQXRDO0FBQ0FsRCxRQUFFLGlCQUFGLEVBQXFCbUQsR0FBckIsQ0FBeUIsT0FBekIsRUFBcUNELElBQXJDO0FBQ0Q7OzsyQkFFTTtBQUNMLFdBQUtFLGFBQUw7QUFDQSxXQUFLdEIsUUFBTCxDQUFjdUIsT0FBZDtBQUNBLFdBQUtDLFdBQUwsQ0FBaUIsS0FBS2YsVUFBdEIsRUFBa0MsTUFBbEM7QUFDQSxXQUFLZSxXQUFMLENBQWlCLEtBQUtkLFVBQXRCO0FBQ0EsVUFBSWUsZUFBZSxLQUFLRCxXQUFMLENBQWlCLEtBQUtmLFVBQXRCLENBQW5CO0FBQ0EsVUFBSWlCLGVBQWUsS0FBS0YsV0FBTCxDQUFpQixLQUFLZCxVQUF0QixDQUFuQjtBQUNBLFdBQUtELFVBQUwsQ0FBZ0JrQixhQUFoQixDQUE4QixHQUE5QixFQVBLLENBTytCOztBQUVwQyxVQUFJRixpQkFBaUIsRUFBakIsSUFBdUJDLGlCQUFpQixFQUE1QyxFQUFnRDtBQUM5QyxhQUFLRSxhQUFMLENBQW1CLE1BQW5CO0FBQ0EsYUFBS25CLFVBQUwsQ0FBZ0JrQixhQUFoQixDQUE4QixXQUE5QjtBQUNBLGFBQUtqQixVQUFMLENBQWdCaUIsYUFBaEIsQ0FBOEIsc0JBQTlCO0FBQ0QsT0FKRCxNQUtLLElBQUlGLGlCQUFpQixFQUFyQixFQUF5QjtBQUM1QixhQUFLRyxhQUFMLENBQW1CLGFBQW5CO0FBQ0EsYUFBS25CLFVBQUwsQ0FBZ0JrQixhQUFoQixDQUE4QixXQUE5QjtBQUNBLGFBQUtwRCxPQUFMLENBQWEsTUFBYjtBQUNELE9BSkksTUFLQSxJQUFJbUQsaUJBQWlCLEVBQXJCLEVBQXlCO0FBQzVCLGFBQUtFLGFBQUwsQ0FBbUIsVUFBbkI7QUFDQSxhQUFLbkIsVUFBTCxDQUFnQmtCLGFBQWhCLENBQThCRixZQUE5QjtBQUNBLGFBQUtmLFVBQUwsQ0FBZ0JpQixhQUFoQixDQUE4QixzQkFBOUI7QUFDQSxhQUFLcEQsT0FBTCxDQUFhLFdBQWI7QUFDRCxPQUxJLE1BTUEsSUFBSSxLQUFLaUMsTUFBTCxDQUFZcUIsS0FBWixHQUFvQixLQUFLckIsTUFBTCxDQUFZc0IsR0FBWixHQUFrQixDQUExQyxFQUE2QztBQUNoRCxZQUFJSixpQkFBaUIsRUFBckIsRUFBMEI7QUFDeEIsZUFBS0ssTUFBTCxDQUFZLEtBQUtiLFdBQWpCO0FBQ0Q7QUFDRCxZQUFJLEtBQUtSLFVBQUwsQ0FBZ0JzQixRQUFoQixFQUFKLEVBQWdDO0FBQzlCLGVBQUtELE1BQUwsQ0FBWSxLQUFLWixNQUFqQjtBQUNEO0FBQ0Y7QUFDRjs7O2dDQUVXYyxJLEVBQU1DLE8sRUFBUztBQUN6QixVQUFJMUQsT0FBTyxLQUFLd0IsUUFBTCxDQUFjbUMsSUFBZCxFQUFYO0FBQ0EsVUFBSTFELFFBQVFQLEVBQUUsU0FBRixFQUFhO0FBQ3ZCLGlCQUFTLE1BRGM7QUFFdkIsb0JBQVVNLEtBQUtXLFdBQUw7QUFGYSxPQUFiLENBQVo7QUFJQSxVQUFJK0MsWUFBWSxNQUFoQixFQUF3QjtBQUN0QnpELGNBQU1TLElBQU4sQ0FBVyxLQUFYLEVBQWtCLDJCQUFsQjtBQUNELE9BRkQsTUFHSyxJQUFJZ0QsWUFBWSxhQUFoQixFQUErQjtBQUNsQ3pELGNBQU1ZLFFBQU4sQ0FBZSxTQUFmO0FBQ0QsT0FGSSxNQUdBLElBQUk2QyxZQUFZLE9BQWhCLEVBQXlCO0FBQzVCekQsY0FBTVksUUFBTixDQUFlLE9BQWY7QUFDRDtBQUNENEMsV0FBS0csT0FBTCxDQUFhNUQsSUFBYixFQUFtQkMsS0FBbkI7QUFDQXdELFdBQUtOLGFBQUwsQ0FBbUJNLEtBQUtJLFNBQUwsRUFBbkI7QUFDQSxhQUFPSixLQUFLSSxTQUFMLEVBQVA7QUFDRDs7O2lDQUVvQjtBQUFBOztBQUNuQixXQUFLNUIsVUFBTCxDQUFnQjZCLFVBQWhCO0FBQ0EsYUFBTyxLQUFLN0IsVUFBTCxDQUFnQjRCLFNBQWhCLEtBQThCLEVBQXJDLEVBQXlDO0FBQ3ZDLGFBQUtiLFdBQUwsQ0FBaUIsS0FBS2YsVUFBdEI7QUFDRDs7QUFKa0Isd0NBQVA4QixLQUFPO0FBQVBBLGFBQU87QUFBQTs7QUFLbkJBLFlBQU1DLE9BQU4sQ0FBYyxnQkFBUTtBQUNwQixZQUFJLENBQUNQLEtBQUsxRCxPQUFWLEVBQW1CO0FBQ2pCLGdCQUFLa0UsWUFBTCxDQUFrQlIsSUFBbEI7QUFDRDtBQUNGLE9BSkQ7QUFLRDs7OzhCQUVvQjtBQUFBLHlDQUFWUyxRQUFVO0FBQVZBLGdCQUFVO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQ25CLDZCQUFvQkEsUUFBcEIsOEhBQThCO0FBQUEsY0FBckJDLE9BQXFCOztBQUM1QkEsa0JBQVF6RCxJQUFSLENBQWEsVUFBYixFQUF5QixJQUF6QjtBQUNEO0FBSGtCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJcEI7OztpQ0FFWTtBQUNYLFdBQUtzQixNQUFMLENBQVlvQyxTQUFaO0FBQ0E7QUFDQSxXQUFLcEIsV0FBTCxDQUFpQixLQUFLZCxVQUF0QixFQUFrQyxhQUFsQztBQUNBLFdBQUtOLEtBQUw7QUFDRDs7OzZCQUVtQjtBQUFBLHlDQUFWc0MsUUFBVTtBQUFWQSxnQkFBVTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUNsQiw4QkFBb0JBLFFBQXBCLG1JQUE4QjtBQUFBLGNBQXJCQyxPQUFxQjs7QUFDNUJBLGtCQUFRekQsSUFBUixDQUFhLFVBQWIsRUFBeUIsS0FBekI7QUFDRDtBQUhpQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSW5COzs7a0NBRWE7QUFDWixXQUFLd0IsVUFBTCxDQUFnQnJDLE9BQWhCLEdBQTBCLEtBQTFCO0FBQ0EsV0FBS3dFLGlCQUFMLENBQXVCLEtBQUtuQyxVQUE1QjtBQUNBLFdBQUtELFVBQUwsQ0FBZ0I2QixVQUFoQjtBQUNBLFdBQUs3QixVQUFMLENBQWdCa0IsYUFBaEIsQ0FBOEIsS0FBS2xCLFVBQUwsQ0FBZ0I0QixTQUFoQixFQUE5Qjs7QUFFQSxXQUFLN0IsTUFBTCxDQUFZc0MsTUFBWjtBQUNBLFdBQUt0QyxNQUFMLENBQVl1QyxZQUFaO0FBQ0E3RSxRQUFFLG1CQUFGLEVBQXVCOEUsSUFBdkI7QUFDQSxXQUFLakIsTUFBTCxDQUFZLEtBQUtoQixLQUFqQjtBQUNBLFdBQUtrQyxPQUFMLENBQWEsS0FBS2pDLElBQWxCLEVBQXdCLEtBQUtDLE1BQTdCO0FBQ0Q7OztpQ0FFWWdCLEksRUFBTTtBQUNqQixVQUFJUixlQUFlLEtBQUtoQixVQUFMLENBQWdCNEIsU0FBaEIsRUFBbkI7QUFDQSxVQUFJWCxlQUFlTyxLQUFLSSxTQUFMLEVBQW5CO0FBQ0EsVUFBSVosZUFBZSxFQUFmLElBQXFCQyxlQUFlRCxZQUF4QyxFQUFzRDtBQUNwRFEsYUFBSzFELE9BQUwsR0FBZSxLQUFmO0FBQ0QsT0FGRCxNQUdLLElBQUltRCxlQUFlRCxZQUFuQixFQUFpQztBQUNwQ1EsYUFBSzFELE9BQUwsR0FBZSxNQUFmO0FBQ0QsT0FGSSxNQUdBO0FBQ0gwRCxhQUFLMUQsT0FBTCxHQUFlLE1BQWY7QUFDRDtBQUNGOzs7MEJBRUs7QUFDSixXQUFLMEUsT0FBTCxDQUFhLEtBQUsvQixXQUFsQixFQUErQixLQUFLQyxNQUFwQztBQUNBLFVBQUksQ0FBQyxLQUFLUixXQUFWLEVBQXVCO0FBQ3JCLFlBQUllLGVBQWUsS0FBS0YsV0FBTCxDQUFpQixLQUFLZCxVQUF0QixDQUFuQjtBQUNBLFlBQUlnQixlQUFlLEVBQW5CLEVBQXVCO0FBQ3JCLGVBQUtFLGFBQUwsQ0FBbUIsVUFBbkI7QUFDQSxlQUFLckQsT0FBTCxDQUFhLE1BQWI7QUFDRDtBQUNGLE9BTkQsTUFPSztBQUNILFlBQUkyRSxjQUFjLEtBQUtMLGlCQUFMLENBQXVCLEtBQUtuQyxVQUE1QixFQUF3QyxLQUFLeUMsV0FBN0MsQ0FBbEI7QUFDQSxZQUFJekIsZ0JBQWUsS0FBS0YsV0FBTCxDQUFpQjBCLFdBQWpCLEVBQThCLE9BQTlCLENBQW5CO0FBQ0EsWUFBSXhCLGdCQUFlLEVBQW5CLEVBQXVCO0FBQ3JCLGNBQUl3QixnQkFBZ0IsS0FBS3hDLFVBQXpCLEVBQXFDO0FBQ25DLGlCQUFLQSxVQUFMLENBQWdCbkMsT0FBaEIsR0FBMEIsTUFBMUI7QUFDQSxpQkFBS21DLFVBQUwsQ0FBZ0JyQyxPQUFoQixHQUEwQixLQUExQjtBQUNBLGlCQUFLOEUsV0FBTCxDQUFpQjlFLE9BQWpCLEdBQTJCLElBQTNCO0FBQ0EsaUJBQUt3RSxpQkFBTCxDQUF1QixLQUFLbkMsVUFBNUIsRUFBd0MsS0FBS3lDLFdBQTdDO0FBQ0QsV0FMRCxNQU1LLElBQUlELGdCQUFnQixLQUFLQyxXQUF6QixFQUFzQztBQUN6QyxpQkFBS0EsV0FBTCxDQUFpQjVFLE9BQWpCLEdBQTJCLE1BQTNCO0FBQ0EsaUJBQUs0RSxXQUFMLENBQWlCOUUsT0FBakIsR0FBMkIsS0FBM0I7QUFDQSxpQkFBS3dFLGlCQUFMLENBQXVCLEtBQUtuQyxVQUE1QixFQUF3QyxLQUFLeUMsV0FBN0M7QUFDQSxpQkFBS0MsYUFBTCxDQUFtQixLQUFLMUMsVUFBeEIsRUFBb0MsS0FBS3lDLFdBQXpDO0FBQ0Q7QUFDRjtBQUNGO0FBQ0Y7OztvQ0FFdUI7QUFBQSx5Q0FBUFosS0FBTztBQUFQQSxhQUFPO0FBQUE7O0FBQ3RCLFVBQUljLFFBQVFkLE1BQU0sQ0FBTixFQUFTaEUsT0FBckI7QUFDQSxVQUFJZ0UsTUFBTWUsTUFBTixLQUFpQixDQUFyQixFQUF3QjtBQUN0QixZQUFJRCxVQUFVLEtBQWQsRUFBcUI7QUFDbkIsZUFBS3pCLGFBQUwsQ0FBbUIsVUFBbkI7QUFDRCxTQUZELE1BR0ssSUFBSXlCLFVBQVUsTUFBZCxFQUFzQjtBQUN6QixlQUFLekIsYUFBTCxDQUFtQixhQUFuQjtBQUNEO0FBQ0QsYUFBS3JELE9BQUwsQ0FBYThFLEtBQWI7QUFDRCxPQVJELE1BU0ssSUFBSWQsTUFBTWUsTUFBTixLQUFpQixDQUFyQixFQUF3QjtBQUMzQixhQUFLQyxnQkFBTCxDQUFzQmhCLEtBQXRCO0FBQ0Q7QUFDRjs7OzhCQUVTO0FBQ1IsVUFBTWlCLE9BQU8sSUFBYjtBQUNBLFdBQUtoRCxNQUFMLENBQVlzQyxNQUFaO0FBQ0E1RSxRQUFFLFVBQUYsRUFBYzRCLEVBQWQsQ0FBaUIsT0FBakIsRUFBMEIsWUFBVztBQUNuQyxZQUFNMkQsY0FBY0QsS0FBS2hELE1BQUwsQ0FBWXFCLEtBQVosR0FBb0IyQixLQUFLaEQsTUFBTCxDQUFZc0IsR0FBcEQ7QUFDQSxZQUFJNUQsRUFBRSxJQUFGLEVBQVF3RixRQUFSLENBQWlCLE9BQWpCLEtBQTZCRCxlQUFlLEVBQWhELEVBQW9EO0FBQ2xERCxlQUFLaEQsTUFBTCxDQUFZc0IsR0FBWixJQUFtQixFQUFuQjtBQUNELFNBRkQsTUFHSyxJQUFJNUQsRUFBRSxJQUFGLEVBQVF3RixRQUFSLENBQWlCLE9BQWpCLEtBQTZCRCxlQUFlLEVBQWhELEVBQW9EO0FBQ3ZERCxlQUFLaEQsTUFBTCxDQUFZc0IsR0FBWixJQUFtQixFQUFuQjtBQUNELFNBRkksTUFHQSxJQUFJNUQsRUFBRSxJQUFGLEVBQVF3RixRQUFSLENBQWlCLFFBQWpCLEtBQThCRCxlQUFlLEdBQWpELEVBQXNEO0FBQ3pERCxlQUFLaEQsTUFBTCxDQUFZc0IsR0FBWixJQUFtQixHQUFuQjtBQUNELFNBRkksTUFHQSxJQUFJNUQsRUFBRSxJQUFGLEVBQVF3RixRQUFSLENBQWlCLFFBQWpCLEtBQThCRCxlQUFlLEdBQWpELEVBQXNEO0FBQ3pERCxlQUFLaEQsTUFBTCxDQUFZc0IsR0FBWixJQUFtQixHQUFuQjtBQUNELFNBRkksTUFHQSxJQUFJNUQsRUFBRSxJQUFGLEVBQVF3RixRQUFSLENBQWlCLFFBQWpCLENBQUosRUFBZ0M7QUFDbkNGLGVBQUtoRCxNQUFMLENBQVlzQixHQUFaLEdBQWtCMEIsS0FBS2hELE1BQUwsQ0FBWXFCLEtBQTlCO0FBQ0QsU0FGSSxNQUdBLElBQUkzRCxFQUFFLElBQUYsRUFBUXdGLFFBQVIsQ0FBaUIsT0FBakIsQ0FBSixFQUErQjtBQUNsQ0YsZUFBS2hELE1BQUwsQ0FBWXNCLEdBQVosR0FBa0IsRUFBbEI7QUFDRDtBQUNEMEIsYUFBSzNDLElBQUwsQ0FBVXJCLElBQVYsQ0FBZWdFLEtBQUtoRCxNQUFMLENBQVlzQixHQUEzQjtBQUNELE9BckJEO0FBc0JEOzs7cUNBRWdCUyxLLEVBQU87QUFDdEIsVUFBSWMsUUFBUWQsTUFBTSxDQUFOLEVBQVNoRSxPQUFyQjtBQUNBLFVBQUlvRixRQUFRcEIsTUFBTSxDQUFOLEVBQVNoRSxPQUFyQjtBQUNBLFVBQUk4RSxVQUFVTSxLQUFkLEVBQXFCO0FBQ25CLFlBQUlOLFVBQVUsV0FBVixJQUF5Qk0sVUFBVSxXQUF2QyxFQUFvRDtBQUNsRCxlQUFLL0IsYUFBTCxDQUFtQixtQkFBbkI7QUFDRCxTQUZELE1BR0ssSUFBSXlCLFVBQVUsS0FBVixJQUFtQk0sVUFBVSxLQUFqQyxFQUF3QztBQUMzQyxlQUFLL0IsYUFBTCxDQUFtQixlQUFuQjtBQUNELFNBRkksTUFHQSxJQUFJeUIsVUFBVSxNQUFWLElBQW9CTSxVQUFVLE1BQWxDLEVBQTBDO0FBQzdDLGVBQUsvQixhQUFMLENBQW1CLGtCQUFuQjtBQUNELFNBRkksTUFHQTtBQUNILGVBQUtBLGFBQUwsQ0FBbUIsV0FBbkI7QUFDRDtBQUNELGFBQUtwQixNQUFMLENBQVlvRCxNQUFaLENBQW1CUCxLQUFuQjtBQUNELE9BZEQsTUFlSyxJQUFJQSxVQUFVTSxLQUFkLEVBQXFCO0FBQ3hCO0FBQ0EsWUFBSUUsYUFBYSxLQUFLckQsTUFBTCxDQUFZc0IsR0FBWixHQUFrQixDQUFuQztBQUNBLFlBQUlnQyxhQUFhLENBQWpCO0FBQ0EsWUFBSUMsYUFBYSxDQUFqQjtBQUNBLFlBQUlWLFVBQVUsV0FBVixJQUF5Qk0sVUFBVSxXQUF2QyxFQUFvRDtBQUNsREcsdUJBQWFELGFBQWEsR0FBMUI7QUFDQSxjQUFJUixVQUFVLEtBQVYsSUFBbUJNLFVBQVUsS0FBakMsRUFBd0M7QUFDdENJLHlCQUFhRixVQUFiO0FBQ0EsaUJBQUtqQyxhQUFMLENBQW1CLGVBQW5CO0FBQ0QsV0FIRCxNQUlLLElBQUl5QixVQUFVLE1BQVYsSUFBb0JNLFVBQVUsTUFBbEMsRUFBMEM7QUFDN0NJLHlCQUFhLENBQUNGLFVBQWQ7QUFDQSxpQkFBS2pDLGFBQUwsQ0FBbUIsNkJBQW5CO0FBQ0QsV0FISSxNQUlBO0FBQ0gsaUJBQUtBLGFBQUwsQ0FBbUIsbUJBQW5CO0FBQ0Q7QUFDRixTQWJELE1BY0ssSUFBSXlCLFVBQVUsS0FBVixJQUFtQk0sVUFBVSxLQUFqQyxFQUF3QztBQUMzQ0csdUJBQWFELFVBQWI7QUFDQSxjQUFJUixVQUFVLE1BQVYsSUFBb0JNLFVBQVUsTUFBbEMsRUFBMEM7QUFDeENJLHlCQUFhLENBQUNGLFVBQWQ7QUFDQSxpQkFBS2pDLGFBQUwsQ0FBbUIsNkJBQW5CO0FBQ0QsV0FIRCxNQUlLO0FBQ0gsaUJBQUtBLGFBQUwsQ0FBbUIsbUJBQW5CO0FBQ0Q7QUFDRixTQVRJLE1BVUEsSUFBSXlCLFVBQVUsTUFBVixJQUFvQk0sVUFBVSxNQUFsQyxFQUEwQztBQUM3Q0csdUJBQWEsQ0FBQ0QsVUFBZDtBQUNBLGVBQUtqQyxhQUFMLENBQW1CLHVCQUFuQjtBQUNEO0FBQ0QsYUFBS3BCLE1BQUwsQ0FBWW9ELE1BQVosQ0FBbUIsUUFBbkIsRUFBNkJFLFVBQTdCLEVBQXlDQyxVQUF6QztBQUNEO0FBQ0QsV0FBS3BELFdBQUwsR0FBbUIsS0FBbkI7QUFDQSxXQUFLcUQsV0FBTDtBQUNEOzs7MEJBRUtDLFMsRUFBVztBQUNmLFVBQUlBLGNBQWMsVUFBbEIsRUFBOEI7QUFDNUIvRixVQUFFLHdCQUFGLEVBQTRCb0IsV0FBNUIsQ0FBd0MsTUFBeEM7QUFDQXBCLFVBQUUsaUJBQUYsRUFBcUJnRyxJQUFyQixDQUNFLDRCQUNFLFlBREYsR0FFRSxpQ0FISjtBQUtBaEcsVUFBRSxvQkFBRixFQUF3QnNCLElBQXhCLENBQTZCLFlBQTdCO0FBQ0F0QixVQUFFLG9CQUFGLEVBQXdCNEIsRUFBeEIsQ0FBMkIsT0FBM0IsRUFBb0MsWUFBVztBQUM3QzVCLFlBQUUsd0JBQUYsRUFBNEJtQixRQUE1QixDQUFxQyxNQUFyQztBQUNBbkIsWUFBRSxlQUFGLEVBQW1COEUsSUFBbkI7QUFDQVEsZUFBS3pELFNBQUw7QUFDQSxlQUFLUyxNQUFMLENBQVkyRCxLQUFaO0FBQ0QsU0FMRDtBQU1ELE9BZEQsTUFjTyxJQUFJRixjQUFjLE1BQWxCLEVBQTBCO0FBQy9CO0FBQ0Q7QUFDRjs7OzRCQUVPRyxNLEVBQVE7QUFDZCxXQUFLNUQsTUFBTCxDQUFZb0QsTUFBWixDQUFtQlEsTUFBbkI7QUFDQSxVQUFJQSxXQUFXLE1BQWYsRUFBdUI7QUFDckIsYUFBS3hDLGFBQUwsQ0FBbUIsTUFBbkI7QUFDRCxPQUZELE1BR0ssSUFBSXdDLFdBQVcsTUFBZixFQUF1QjtBQUMxQixZQUFJLEtBQUs1RCxNQUFMLENBQVlxQixLQUFaLEdBQW9CLEtBQUtyQixNQUFMLENBQVlzQixHQUFoQyxJQUF1QyxFQUEzQyxFQUErQztBQUM3QyxlQUFLdEIsTUFBTCxDQUFZNkQsSUFBWjtBQUNELFNBRkQsTUFHSztBQUNILGVBQUtDLEtBQUwsQ0FBVyxVQUFYO0FBQ0Q7QUFDRjtBQUNELFdBQUtOLFdBQUw7QUFDRDs7O2dDQUVXO0FBQ1YsV0FBS2hFLFFBQUwsR0FBZ0Isb0JBQWhCO0FBQ0EsV0FBS1MsVUFBTCxHQUFrQixtQkFBUyxRQUFULENBQWxCO0FBQ0EsV0FBS0MsVUFBTCxHQUFrQixtQkFBUyxRQUFULEVBQW1CLENBQW5CLENBQWxCO0FBQ0F4QyxRQUFFLFdBQUYsRUFBZXFHLEtBQWY7QUFDQXJHLFFBQUUsY0FBRixFQUFrQnFHLEtBQWxCO0FBQ0FyRyxRQUFFLGNBQUYsRUFBa0JxRyxLQUFsQjtBQUNBckcsUUFBRSxnQkFBRixFQUFvQnFHLEtBQXBCO0FBQ0FyRyxRQUFFLGdCQUFGLEVBQW9CcUcsS0FBcEI7QUFDQXJHLFFBQUUsU0FBRixFQUFhcUcsS0FBYjtBQUNEOzs7d0NBRTJCO0FBQzFCLFVBQUlyQixvQkFBSjs7QUFEMEIseUNBQVBYLEtBQU87QUFBUEEsYUFBTztBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUUxQiw4QkFBaUJBLEtBQWpCLG1JQUF3QjtBQUFBLGNBQWZOLElBQWU7O0FBQ3RCQSxlQUFLdUMsZUFBTDtBQUNBLGNBQUl2QyxLQUFLNUQsT0FBVCxFQUFrQjtBQUNoQjZFLDBCQUFjakIsSUFBZDtBQUNEO0FBQ0Y7QUFQeUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFRMUIsYUFBT2lCLFdBQVA7QUFDRDs7OzRCQUVPO0FBQ04sV0FBS3ZDLFdBQUwsR0FBbUIsSUFBbkI7QUFDQSxXQUFLc0MsT0FBTCxDQUFhLEtBQUs5QixNQUFsQjtBQUNBLFdBQUtYLE1BQUwsQ0FBWW9DLFNBQVo7O0FBRUE7QUFDQSxXQUFLNkIsV0FBTDtBQUNBLFdBQUt0QixXQUFMLEdBQW1CLG1CQUFTLFFBQVQsRUFBbUIsQ0FBbkIsQ0FBbkI7QUFDQSxVQUFJdUIsY0FBYyxLQUFLaEUsVUFBTCxDQUFnQmlFLFVBQWhCLEVBQWxCO0FBQ0EsV0FBS3hCLFdBQUwsQ0FBaUJmLE9BQWpCLENBQXlCc0MsWUFBWWxHLElBQXJDLEVBQTJDa0csWUFBWWpHLEtBQXZEO0FBQ0EsV0FBSytDLFdBQUwsQ0FBaUIsS0FBS2QsVUFBdEI7QUFDQSxXQUFLYyxXQUFMLENBQWlCLEtBQUsyQixXQUF0QjtBQUNEOzs7NEJBRU87QUFDTixVQUFJLENBQUMsS0FBS3hDLFdBQVYsRUFBdUI7QUFDckIsYUFBS3NDLE9BQUwsQ0FBYSxLQUFLakMsSUFBbEIsRUFBd0IsS0FBS0MsTUFBN0IsRUFBcUMsS0FBS0MsV0FBMUMsRUFBdUQsS0FBS0MsTUFBNUQ7QUFDQSxhQUFLeUQsVUFBTCxDQUFnQixLQUFLbEUsVUFBckI7QUFDQSxhQUFLMEMsYUFBTCxDQUFtQixLQUFLMUMsVUFBeEI7QUFDRCxPQUpELE1BS0s7QUFDSCxZQUFJd0MsY0FBYyxLQUFLTCxpQkFBTCxDQUF1QixLQUFLbkMsVUFBNUIsRUFBd0MsS0FBS3lDLFdBQTdDLENBQWxCO0FBQ0EsWUFBSUQsZ0JBQWdCLEtBQUt4QyxVQUF6QixFQUFxQztBQUNuQyxlQUFLQSxVQUFMLENBQWdCckMsT0FBaEIsR0FBMEIsS0FBMUI7QUFDQSxlQUFLOEUsV0FBTCxDQUFpQjlFLE9BQWpCLEdBQTJCLElBQTNCO0FBQ0EsZUFBS3dFLGlCQUFMLENBQXVCLEtBQUtuQyxVQUE1QixFQUF3QyxLQUFLeUMsV0FBN0M7QUFDRCxTQUpELE1BS0ssSUFBSUQsZ0JBQWdCLEtBQUtDLFdBQXpCLEVBQXNDO0FBQ3pDLGVBQUtBLFdBQUwsQ0FBaUI5RSxPQUFqQixHQUEyQixLQUEzQjtBQUNBLGVBQUt3RSxpQkFBTCxDQUF1QixLQUFLbkMsVUFBNUIsRUFBd0MsS0FBS3lDLFdBQTdDO0FBQ0EsZUFBS3lCLFVBQUwsQ0FBZ0IsS0FBS2xFLFVBQXJCLEVBQWlDLEtBQUt5QyxXQUF0QztBQUNBLGVBQUtDLGFBQUwsQ0FBbUIsS0FBSzFDLFVBQXhCLEVBQW9DLEtBQUt5QyxXQUF6QztBQUNEO0FBQ0Y7QUFDRjs7O29DQUVlO0FBQ2RqRixRQUFFLGVBQUYsRUFBbUIyRyxJQUFuQjtBQUNBLFdBQUtKLFdBQUw7QUFDQSxXQUFLMUMsTUFBTCxDQUFZLEtBQUtmLElBQWpCLEVBQXVCLEtBQUtDLE1BQTVCO0FBQ0EsV0FBS2dDLE9BQUwsQ0FBYSxLQUFLbEMsS0FBbEI7QUFDQTdDLFFBQUUsbUJBQUYsRUFBdUIyRyxJQUF2QjtBQUNBLFdBQUtuRSxVQUFMLENBQWdCckMsT0FBaEIsR0FBMEIsSUFBMUI7QUFDQSxXQUFLd0UsaUJBQUwsQ0FBdUIsS0FBS25DLFVBQTVCO0FBQ0Q7OztrQ0FFYW9FLE8sRUFBUztBQUNyQjVHLFFBQUUsV0FBRixFQUFlUyxNQUFmLFVBQTZCbUcsT0FBN0I7QUFDRDs7Ozs7O2tCQXRYa0J2RSxJOzs7Ozs7Ozs7Ozs7Ozs7QUNKckI7Ozs7QUFDQTs7Ozs7Ozs7SUFFcUJ3RSxJO0FBQ25CLGtCQUFjO0FBQUE7O0FBQ1osU0FBS3pHLEtBQUwsR0FBYSxFQUFiO0FBQ0Q7Ozs7MkJBRU07QUFDTCxhQUFPLEtBQUtBLEtBQUwsQ0FBV1MsR0FBWCxFQUFQO0FBQ0Q7Ozs2QkFFUWlHLFEsRUFBVTtBQUNqQixVQUFJLENBQUNBLFFBQUwsRUFBZTtBQUNiQSxtQkFBVyxDQUFYO0FBQ0Q7QUFDRCxhQUFPQSxXQUFXLENBQWxCLEVBQXFCO0FBQ25CLGFBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxLQUFLLEVBQXJCLEVBQXlCQSxHQUF6QixFQUE4QjtBQUM1QixlQUFLM0csS0FBTCxDQUFXSSxJQUFYLENBQWdCLG1CQUFTdUcsQ0FBVCxFQUFZLFFBQVosQ0FBaEI7QUFDQSxlQUFLM0csS0FBTCxDQUFXSSxJQUFYLENBQWdCLG1CQUFTdUcsQ0FBVCxFQUFZLFVBQVosQ0FBaEI7QUFDQSxlQUFLM0csS0FBTCxDQUFXSSxJQUFYLENBQWdCLG1CQUFTdUcsQ0FBVCxFQUFZLFFBQVosQ0FBaEI7QUFDQSxlQUFLM0csS0FBTCxDQUFXSSxJQUFYLENBQWdCLG1CQUFTdUcsQ0FBVCxFQUFZLE9BQVosQ0FBaEI7QUFDRDtBQUNERDtBQUNEO0FBQ0Y7Ozs4QkFFUztBQUNSLFdBQUssSUFBSUMsSUFBSSxLQUFLM0csS0FBTCxDQUFXZ0YsTUFBWCxHQUFvQixDQUFqQyxFQUFvQzJCLElBQUksQ0FBeEMsRUFBMkNBLEdBQTNDLEVBQWdEO0FBQzlDLFlBQU1DLElBQUlDLEtBQUtDLEtBQUwsQ0FBV0QsS0FBS0UsTUFBTCxNQUFpQkosSUFBSSxDQUFyQixDQUFYLENBQVY7QUFEOEMsbUJBRTVCLENBQUMsS0FBSzNHLEtBQUwsQ0FBVzRHLENBQVgsQ0FBRCxDQUY0QjtBQUU3QyxhQUFLNUcsS0FBTCxDQUFXMkcsQ0FBWCxDQUY2QztBQUcvQztBQUNGOzs7Ozs7a0JBN0JrQkYsSTs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNIQU8sTTtBQUNwQixtQkFBYztBQUFBOztBQUNiLE9BQUt6RCxLQUFMLEdBQWEsR0FBYjtBQUNBLE9BQUtDLEdBQUwsR0FBVyxFQUFYO0FBQ0EsT0FBS3lELE1BQUwsR0FBYyxFQUFkOztBQUVBLE9BQUszRSxNQUFMLEdBQWMxQyxFQUFFLFFBQUYsQ0FBZDtBQUNBLE9BQUsyQyxJQUFMLEdBQVkzQyxFQUFFLGFBQUYsQ0FBWjtBQUNBLE9BQUs0QyxPQUFMLEdBQWU1QyxFQUFFLFNBQUYsQ0FBZjtBQUNBOzs7O2lDQUVjO0FBQ2QsT0FBSXNILFlBQVksRUFBaEI7QUFDQSxPQUFJQyxTQUFTLEVBQWI7QUFDQSxPQUFJLEtBQUtGLE1BQUwsR0FBYyxDQUFsQixFQUFxQjtBQUNwQkMsZ0JBQVksVUFBWjtBQUNBQyxhQUFTLEdBQVQ7QUFDQSxJQUhELE1BR08sSUFBSSxLQUFLRixNQUFMLEdBQWMsQ0FBbEIsRUFBcUI7QUFDM0JDLGdCQUFZLFVBQVo7QUFDQUMsYUFBUyxHQUFUO0FBQ0E7QUFDRCxRQUFLM0UsT0FBTCxDQUFhbkMsTUFBYixvQkFBb0M2RyxTQUFwQyxXQUFrREMsTUFBbEQsVUFBNkROLEtBQUtPLEdBQUwsQ0FBUyxLQUFLSCxNQUFkLENBQTdEO0FBQ0E7Ozs4QkFFVztBQUNYLFFBQUsxRCxLQUFMLElBQWMsS0FBS0MsR0FBbkI7QUFDQSxRQUFLQSxHQUFMLElBQVksQ0FBWjtBQUNBLFFBQUtnQixNQUFMO0FBQ0E7Ozt5QkFFTXZFLE8sRUFBU3VGLFUsRUFBWUMsVSxFQUFZO0FBQ3ZDLE9BQUl4RixZQUFZLFdBQWhCLEVBQTZCO0FBQzVCLFNBQUtnSCxNQUFMLEdBQWMsS0FBS3pELEdBQUwsR0FBVyxHQUF6QjtBQUNBLElBRkQsTUFHSyxJQUFJdkQsWUFBWSxLQUFoQixFQUF1QjtBQUMzQixTQUFLZ0gsTUFBTCxHQUFjLEtBQUt6RCxHQUFuQjtBQUNBLElBRkksTUFHQSxJQUFJdkQsWUFBWSxNQUFoQixFQUF3QjtBQUM1QixTQUFLZ0gsTUFBTCxHQUFjLENBQUMsS0FBS3pELEdBQXBCO0FBQ0EsSUFGSSxNQUdBLElBQUl2RCxZQUFZLE1BQWhCLEVBQXdCO0FBQzVCLFNBQUtnSCxNQUFMLEdBQWMsQ0FBZDtBQUNBLElBRkksTUFHQSxJQUFJaEgsWUFBWSxVQUFoQixFQUE0QjtBQUNoQyxTQUFLZ0gsTUFBTCxHQUFjekIsYUFBYUMsVUFBM0I7QUFDQTtBQUNELFFBQUtsQyxLQUFMLElBQWMsS0FBSzBELE1BQW5CO0FBQ0E7OzswQkFFTztBQUNQLFFBQUsxRCxLQUFMLEdBQWEsR0FBYjtBQUNBLFFBQUtDLEdBQUwsR0FBVyxFQUFYO0FBQ0EsUUFBS3lELE1BQUwsR0FBYyxFQUFkO0FBQ0EsUUFBS3pDLE1BQUw7QUFDQTs7OzJCQUVRO0FBQ1IsUUFBS2xDLE1BQUwsQ0FBWXBCLElBQVosQ0FBaUIsS0FBS3FDLEtBQXRCO0FBQ0EsUUFBS2hCLElBQUwsQ0FBVXJCLElBQVYsQ0FBZSxLQUFLc0MsR0FBcEI7QUFDQTs7Ozs7O2tCQTNEbUJ3RCxNIiwiZmlsZSI6Ii4vanMvbWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDMwMjdhNmEyNzhhMDJkZGQ4ODA4IiwiaW1wb3J0IENhcmQgZnJvbSBcIi4vY2FyZFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGFuZCB7XHJcbiAgY29uc3RydWN0b3Iob3duZXIsIGhhbmROdW1iZXIpIHtcclxuICAgIGxldCBzZWxlY3RvcjtcclxuICAgIGlmIChvd25lciA9PT0gJ2RlYWxlcicpIHtcclxuICAgICAgc2VsZWN0b3IgPSBcIiNkZWFsZXJcIjtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKG93bmVyID09PSAncGxheWVyJykge1xyXG4gICAgICBpZiAoaGFuZE51bWJlciA9PT0gMSkge1xyXG4gICAgICAgIHNlbGVjdG9yID0gXCIjaGFuZDFcIjtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmIChoYW5kTnVtYmVyID09PSAyKSB7XHJcbiAgICAgICAgc2VsZWN0b3IgPSBcIiNoYW5kMlwiO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLiR3cmFwcGVyID0gJChgJHtzZWxlY3Rvcn1gKTtcclxuICAgIHRoaXMuJGhhbmQgPSAkKGAke3NlbGVjdG9yfSAuaGFuZGApO1xyXG4gICAgdGhpcy4kcG9pbnRzID0gJChgJHtzZWxlY3Rvcn0gLnBvaW50c2ApO1xyXG4gICAgdGhpcy5wbGF5aW5nID0gZmFsc2U7XHJcbiAgICB0aGlzLmNhcmRzID0gW107XHJcbiAgICB0aGlzLm91dGNvbWU7XHJcbiAgfVxyXG5cclxuICBhZGRDYXJkKGNhcmQsICRjYXJkKSB7XHJcbiAgICB0aGlzLmNhcmRzLnB1c2goY2FyZCk7XHJcbiAgICB0aGlzLiRoYW5kLmFwcGVuZCgkY2FyZCk7XHJcbiAgfVxyXG5cclxuICBjYW5TcGxpdCgpIHtcclxuICAgIHJldHVybiB0aGlzLmNhcmRzWzBdLnBvaW50ID09PSB0aGlzLmNhcmRzWzFdLnBvaW50O1xyXG4gIH1cclxuXHJcbiAgZ2V0UG9pbnRzKCkge1xyXG4gICAgbGV0IHRvdGFsID0gMDtcclxuICAgIGxldCBhY2VzID0gMDtcclxuICAgIGZvciAobGV0IGNhcmQgb2YgdGhpcy5jYXJkcykge1xyXG4gICAgICBsZXQgcG9pbnQgPSBjYXJkLnBvaW50O1xyXG4gICAgICBpZiAocG9pbnQgPT09IDEpIHtcclxuICAgICAgICB0b3RhbCArPSAxMDtcclxuICAgICAgICBhY2VzKys7XHJcbiAgICAgIH0gXHJcbiAgICAgIGVsc2UgaWYgKHBvaW50ID4gMTApIHtcclxuICAgICAgICBwb2ludCA9IDEwO1xyXG4gICAgICB9XHJcbiAgICAgIHRvdGFsICs9IHBvaW50O1xyXG4gICAgICB3aGlsZSAodG90YWwgPiAyMSAmJiBhY2VzID4gMCkge1xyXG4gICAgICAgIHRvdGFsIC09IDEwO1xyXG4gICAgICAgIGFjZXMtLTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRvdGFsO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlQ2FyZCgpIHtcclxuICAgIGxldCBjYXJkID0gdGhpcy5jYXJkcy5wb3AoKTtcclxuICAgIGxldCAkY2FyZCA9IHRoaXMuJGhhbmQuZmluZChcImltZzpsYXN0LWNoaWxkXCIpLnJlbW92ZSgpO1xyXG4gICAgcmV0dXJuIHtjYXJkLCAkY2FyZH07XHJcbiAgfVxyXG5cclxuICByZXZlYWxIb2xlKCkge1xyXG4gICAgdGhpcy4kaGFuZC5maW5kKCdpbWc6Zmlyc3QtY2hpbGQnKS5hdHRyKCdzcmMnLCB0aGlzLmNhcmRzWzBdLmdldEltYWdlVXJsKCkpO1xyXG4gIH1cclxuXHJcbiAgc2VlQ2FyZChpbmRleCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2FyZHNbaW5kZXggLSAxXTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZUhpZ2hsaWdodCgpIHtcclxuICAgIHRoaXMucGxheWluZyA/IHRoaXMuJHdyYXBwZXIuYWRkQ2xhc3MoXCJjdXJyZW50SGFuZFwiKSA6IHRoaXMuJHdyYXBwZXIucmVtb3ZlQ2xhc3MoXCJjdXJyZW50SGFuZFwiKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZURpc3BsYXkoY29udGVudCkge1xyXG4gICAgdGhpcy4kcG9pbnRzLnRleHQoY29udGVudCk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2hhbmQuanMiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJkIHtcclxuICBjb25zdHJ1Y3Rvcihwb2ludCwgc3VpdCkge1xyXG4gICAgdGhpcy5wb2ludCA9IHBvaW50O1xyXG4gICAgdGhpcy5zdWl0ID0gc3VpdDtcclxuICB9XHJcblxyXG4gIGdldEltYWdlVXJsKCkge1xyXG4gICAgbGV0IHZhbHVlID0gdGhpcy5wb2ludDtcclxuICAgIGlmICh0aGlzLnBvaW50ID09PSAxMSkge1xyXG4gICAgICB2YWx1ZSA9IFwiamFja1wiO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodGhpcy5wb2ludCA9PT0gMTIpIHtcclxuICAgICAgdmFsdWUgPSBcInF1ZWVuXCI7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0aGlzLnBvaW50ID09PSAxMykge1xyXG4gICAgICB2YWx1ZSA9IFwia2luZ1wiO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodGhpcy5wb2ludCA9PT0gMSkge1xyXG4gICAgICB2YWx1ZSA9IFwiYWNlXCI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYGltYWdlcy8ke3ZhbHVlfV9vZl8ke3RoaXMuc3VpdH0uc3ZnYDtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvY2FyZC5qcyIsImltcG9ydCBHYW1lIGZyb20gJy4vZ2FtZSc7XG5cbnZhciBjdXJyZW50R2FtZSA9IG5ldyBHYW1lO1xuXG5jdXJyZW50R2FtZS5tYWtlQmV0KCk7XG5cbiQoJy5kZWFsJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gIGN1cnJlbnRHYW1lLnJlc2V0R2FtZSgpO1xuICBjdXJyZW50R2FtZS5nYW1lRGVjay5nZW5lcmF0ZSgzKTtcbiAgY3VycmVudEdhbWUuZGVhbCgpO1xufSk7XG5cbiQoJy5oaXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgY3VycmVudEdhbWUuaGl0KCk7XG59KTtcblxuJCgnLnN0YW5kJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gIGN1cnJlbnRHYW1lLnN0YW5kKCk7XG59KTtcblxuJCgnLmRvdWJsZS1kb3duJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gIGN1cnJlbnRHYW1lLmRvdWJsZURvd24oKTtcbn0pO1xuXG4kKCcuc3BsaXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgY3VycmVudEdhbWUuc3BsaXQoKTtcbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvYXBwLmpzIiwiaW1wb3J0IEhhbmQgZnJvbSBcIi4vaGFuZFwiO1xyXG5pbXBvcnQgRGVjayBmcm9tIFwiLi9kZWNrXCI7XHJcbmltcG9ydCBXYWxsZXQgZnJvbSBcIi4vd2FsbGV0XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMud2FsbGV0ID0gbmV3IFdhbGxldDtcclxuICAgIHRoaXMuZ2FtZURlY2sgPSBuZXcgRGVjaztcclxuICAgIHRoaXMuZGVhbGVySGFuZCA9IG5ldyBIYW5kKCdkZWFsZXInKTtcclxuICAgIHRoaXMucGxheWVySGFuZCA9IG5ldyBIYW5kKCdwbGF5ZXInLCAxKTtcclxuICAgIHRoaXMuc3BsaXRJblBsYXkgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLiR0b3RhbCA9ICQoXCIudG90YWxcIik7XHJcbiAgICB0aGlzLiRiZXQgPSAkKFwiLmN1cnJlbnRCZXRcIik7XHJcbiAgICB0aGlzLiRjaGFuZ2UgPSAkKFwiLmNoYW5nZVwiKTtcclxuICAgIFxyXG4gICAgdGhpcy4kZGVhbCA9ICQoXCIuZGVhbFwiKTtcclxuICAgIHRoaXMuJGhpdCA9ICQoXCIuaGl0XCIpO1xyXG4gICAgdGhpcy4kc3RhbmQgPSAkKFwiLnN0YW5kXCIpO1xyXG4gICAgdGhpcy4kZG91YmxlRG93biA9ICQoXCIuZG91YmxlLWRvd25cIik7XHJcbiAgICB0aGlzLiRzcGxpdCA9ICQoXCIuc3BsaXRcIik7XHJcbiAgfVxyXG5cclxuICBhZGp1c3RTcGFjZSgpIHtcclxuICAgIGxldCBzaXplO1xyXG4gICAgdGhpcy5zcGxpdEluUGxheSA/IHNpemUgPSA1MCA6IHNpemUgPSAxMDA7XHJcbiAgICAkKFwiLnBsYXllckhhbmQtZGl2XCIpLmNzcyhcIndpZHRoXCIsIGAke3NpemV9JWApO1xyXG4gIH1cclxuXHJcbiAgZGVhbCgpIHtcclxuICAgIHRoaXMuc3RhcnRHYW1lTW9kZSgpO1xyXG4gICAgdGhpcy5nYW1lRGVjay5zaHVmZmxlKCk7XHJcbiAgICB0aGlzLmRlYWxPbmVDYXJkKHRoaXMuZGVhbGVySGFuZCwgXCJob2xlXCIpO1xyXG4gICAgdGhpcy5kZWFsT25lQ2FyZCh0aGlzLnBsYXllckhhbmQpO1xyXG4gICAgbGV0IGRlYWxlclBvaW50cyA9IHRoaXMuZGVhbE9uZUNhcmQodGhpcy5kZWFsZXJIYW5kKTtcclxuICAgIGxldCBwbGF5ZXJQb2ludHMgPSB0aGlzLmRlYWxPbmVDYXJkKHRoaXMucGxheWVySGFuZCk7XHJcbiAgICB0aGlzLmRlYWxlckhhbmQudXBkYXRlRGlzcGxheShcIj9cIik7IC8vIGNvbmNlYWwgZGVhbGVyIHRvdGFsXHJcblxyXG4gICAgaWYgKGRlYWxlclBvaW50cyA9PT0gMjEgJiYgcGxheWVyUG9pbnRzID09PSAyMSkge1xyXG4gICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJQdXNoXCIpO1xyXG4gICAgICB0aGlzLmRlYWxlckhhbmQudXBkYXRlRGlzcGxheShcIkJsYWNramFja1wiKTtcclxuICAgICAgdGhpcy5wbGF5ZXJIYW5kLnVwZGF0ZURpc3BsYXkoXCJCTEFDS0pBQ0ssIEhPVCBEQU1OIVwiKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGRlYWxlclBvaW50cyA9PT0gMjEpIHtcclxuICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiRGVhbGVyIHdpbnNcIik7XHJcbiAgICAgIHRoaXMuZGVhbGVySGFuZC51cGRhdGVEaXNwbGF5KFwiQmxhY2tqYWNrXCIpO1xyXG4gICAgICB0aGlzLm91dGNvbWUoXCJsb3NlXCIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAocGxheWVyUG9pbnRzID09PSAyMSkge1xyXG4gICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJZb3Ugd2luIVwiKTtcclxuICAgICAgdGhpcy5kZWFsZXJIYW5kLnVwZGF0ZURpc3BsYXkoZGVhbGVyUG9pbnRzKTtcclxuICAgICAgdGhpcy5wbGF5ZXJIYW5kLnVwZGF0ZURpc3BsYXkoXCJCTEFDS0pBQ0ssIEhPVCBEQU1OIVwiKTtcclxuICAgICAgdGhpcy5vdXRjb21lKFwiYmxhY2tqYWNrXCIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodGhpcy53YWxsZXQubW9uZXkgPiB0aGlzLndhbGxldC5iZXQgKiAyKSB7XHJcbiAgICAgIGlmIChwbGF5ZXJQb2ludHMgPT09IDExKSAge1xyXG4gICAgICAgIHRoaXMuZW5hYmxlKHRoaXMuJGRvdWJsZURvd24pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLnBsYXllckhhbmQuY2FuU3BsaXQoKSkge1xyXG4gICAgICAgIHRoaXMuZW5hYmxlKHRoaXMuJHNwbGl0KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZGVhbE9uZUNhcmQoaGFuZCwgc3BlY2lhbCkge1xyXG4gICAgbGV0IGNhcmQgPSB0aGlzLmdhbWVEZWNrLmRyYXcoKTtcclxuICAgIGxldCAkY2FyZCA9ICQoXCI8aW1nIC8+XCIsIHtcclxuICAgICAgXCJjbGFzc1wiOiBcImNhcmRcIiwgXHJcbiAgICAgIFwic3JjXCI6IGAke2NhcmQuZ2V0SW1hZ2VVcmwoKX1gXHJcbiAgICB9KTtcclxuICAgIGlmIChzcGVjaWFsID09PSBcImhvbGVcIikge1xyXG4gICAgICAkY2FyZC5hdHRyKCdzcmMnLCBcImltYWdlcy9iYWNrLXN1aXRzLXJlZC5zdmdcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChzcGVjaWFsID09PSBcImRvdWJsZS1kb3duXCIpIHtcclxuICAgICAgJGNhcmQuYWRkQ2xhc3MoJ2NhcmQtZGQnKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHNwZWNpYWwgPT09IFwic3BsaXRcIikge1xyXG4gICAgICAkY2FyZC5hZGRDbGFzcygnc3BsaXQnKTtcclxuICAgIH1cclxuICAgIGhhbmQuYWRkQ2FyZChjYXJkLCAkY2FyZCk7XHJcbiAgICBoYW5kLnVwZGF0ZURpc3BsYXkoaGFuZC5nZXRQb2ludHMoKSk7XHJcbiAgICByZXR1cm4gaGFuZC5nZXRQb2ludHMoKTtcclxuICB9XHJcblxyXG4gIGRlYWxlclR1cm4oLi4uaGFuZHMpIHtcclxuICAgIHRoaXMuZGVhbGVySGFuZC5yZXZlYWxIb2xlKCk7XHJcbiAgICB3aGlsZSAodGhpcy5kZWFsZXJIYW5kLmdldFBvaW50cygpIDwgMTcpIHtcclxuICAgICAgdGhpcy5kZWFsT25lQ2FyZCh0aGlzLmRlYWxlckhhbmQpO1xyXG4gICAgfVxyXG4gICAgaGFuZHMuZm9yRWFjaChoYW5kID0+IHtcclxuICAgICAgaWYgKCFoYW5kLm91dGNvbWUpIHtcclxuICAgICAgICB0aGlzLmV2YWx1YXRlSGFuZChoYW5kKVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGRpc2FibGUoLi4uZWxlbWVudHMpIHtcclxuICAgIGZvciAobGV0IGVsZW1lbnQgb2YgZWxlbWVudHMpIHtcclxuICAgICAgZWxlbWVudC5hdHRyKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkb3VibGVEb3duKCkge1xyXG4gICAgdGhpcy53YWxsZXQuZG91YmxlQmV0KCk7XHJcbiAgICAvLyBkZWFsIHRoZSBwbGF5ZXIgb25lIG1vcmUgY2FyZCBhbmQgdGhlbiBtb3ZlIG9uIHRvIHRoZSBkZWFsZXIncyB0dXJuXHJcbiAgICB0aGlzLmRlYWxPbmVDYXJkKHRoaXMucGxheWVySGFuZCwgXCJkb3VibGUtZG93blwiKTtcclxuICAgIHRoaXMuc3RhbmQoKTtcclxuICB9XHJcblxyXG4gIGVuYWJsZSguLi5lbGVtZW50cykge1xyXG4gICAgZm9yIChsZXQgZWxlbWVudCBvZiBlbGVtZW50cykge1xyXG4gICAgICBlbGVtZW50LmF0dHIoXCJkaXNhYmxlZFwiLCBmYWxzZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBlbmRHYW1lTW9kZSgpIHtcclxuICAgIHRoaXMucGxheWVySGFuZC5wbGF5aW5nID0gZmFsc2U7XHJcbiAgICB0aGlzLnNlbGVjdEN1cnJlbnRIYW5kKHRoaXMucGxheWVySGFuZCk7XHJcbiAgICB0aGlzLmRlYWxlckhhbmQucmV2ZWFsSG9sZSgpO1xyXG4gICAgdGhpcy5kZWFsZXJIYW5kLnVwZGF0ZURpc3BsYXkodGhpcy5kZWFsZXJIYW5kLmdldFBvaW50cygpKTtcclxuXHJcbiAgICB0aGlzLndhbGxldC51cGRhdGUoKTtcclxuICAgIHRoaXMud2FsbGV0LmFzc2Vzc0NoYW5nZSgpO1xyXG4gICAgJChcIi5iZXR0aW5nIC5idXR0b25zXCIpLnNob3coKTtcclxuICAgIHRoaXMuZW5hYmxlKHRoaXMuJGRlYWwpO1xyXG4gICAgdGhpcy5kaXNhYmxlKHRoaXMuJGhpdCwgdGhpcy4kc3RhbmQpO1xyXG4gIH1cclxuXHJcbiAgZXZhbHVhdGVIYW5kKGhhbmQpIHtcclxuICAgIGxldCBkZWFsZXJQb2ludHMgPSB0aGlzLmRlYWxlckhhbmQuZ2V0UG9pbnRzKCk7XHJcbiAgICBsZXQgcGxheWVyUG9pbnRzID0gaGFuZC5nZXRQb2ludHMoKTtcclxuICAgIGlmIChkZWFsZXJQb2ludHMgPiAyMSB8fCBwbGF5ZXJQb2ludHMgPiBkZWFsZXJQb2ludHMpIHtcclxuICAgICAgaGFuZC5vdXRjb21lID0gXCJ3aW5cIjtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHBsYXllclBvaW50cyA8IGRlYWxlclBvaW50cykge1xyXG4gICAgICBoYW5kLm91dGNvbWUgPSBcImxvc2VcIjtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBoYW5kLm91dGNvbWUgPSBcInB1c2hcIjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGhpdCgpIHtcclxuICAgIHRoaXMuZGlzYWJsZSh0aGlzLiRkb3VibGVEb3duLCB0aGlzLiRzcGxpdCk7XHJcbiAgICBpZiAoIXRoaXMuc3BsaXRJblBsYXkpIHtcclxuICAgICAgbGV0IHBsYXllclBvaW50cyA9IHRoaXMuZGVhbE9uZUNhcmQodGhpcy5wbGF5ZXJIYW5kKTtcclxuICAgICAgaWYgKHBsYXllclBvaW50cyA+IDIxKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiWW91IGJ1c3RcIik7XHJcbiAgICAgICAgdGhpcy5vdXRjb21lKFwibG9zZVwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIGxldCBjdXJyZW50SGFuZCA9IHRoaXMuc2VsZWN0Q3VycmVudEhhbmQodGhpcy5wbGF5ZXJIYW5kLCB0aGlzLnBsYXllckhhbmQyKTtcclxuICAgICAgbGV0IHBsYXllclBvaW50cyA9IHRoaXMuZGVhbE9uZUNhcmQoY3VycmVudEhhbmQsIFwic3BsaXRcIik7XHJcbiAgICAgIGlmIChwbGF5ZXJQb2ludHMgPiAyMSkge1xyXG4gICAgICAgIGlmIChjdXJyZW50SGFuZCA9PT0gdGhpcy5wbGF5ZXJIYW5kKSB7XHJcbiAgICAgICAgICB0aGlzLnBsYXllckhhbmQub3V0Y29tZSA9IFwibG9zZVwiO1xyXG4gICAgICAgICAgdGhpcy5wbGF5ZXJIYW5kLnBsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMucGxheWVySGFuZDIucGxheWluZyA9IHRydWU7XHJcbiAgICAgICAgICB0aGlzLnNlbGVjdEN1cnJlbnRIYW5kKHRoaXMucGxheWVySGFuZCwgdGhpcy5wbGF5ZXJIYW5kMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGN1cnJlbnRIYW5kID09PSB0aGlzLnBsYXllckhhbmQyKSB7XHJcbiAgICAgICAgICB0aGlzLnBsYXllckhhbmQyLm91dGNvbWUgPSBcImxvc2VcIjtcclxuICAgICAgICAgIHRoaXMucGxheWVySGFuZDIucGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5zZWxlY3RDdXJyZW50SGFuZCh0aGlzLnBsYXllckhhbmQsIHRoaXMucGxheWVySGFuZDIpO1xyXG4gICAgICAgICAgdGhpcy5pbnZva2VPdXRjb21lKHRoaXMucGxheWVySGFuZCwgdGhpcy5wbGF5ZXJIYW5kMik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpbnZva2VPdXRjb21lKC4uLmhhbmRzKSB7XHJcbiAgICBsZXQgaGFuZDEgPSBoYW5kc1swXS5vdXRjb21lO1xyXG4gICAgaWYgKGhhbmRzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICBpZiAoaGFuZDEgPT09IFwid2luXCIpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJZb3Ugd2luIVwiKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmIChoYW5kMSA9PT0gXCJsb3NlXCIpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJEZWFsZXIgd2luc1wiKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLm91dGNvbWUoaGFuZDEpXHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChoYW5kcy5sZW5ndGggPT09IDIpIHtcclxuICAgICAgdGhpcy5tdWx0aXBsZU91dGNvbWVzKGhhbmRzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG1ha2VCZXQoKSB7XHJcbiAgICBjb25zdCBnYW1lID0gdGhpcztcclxuICAgIHRoaXMud2FsbGV0LnVwZGF0ZSgpO1xyXG4gICAgJChcIi5iZXQtYnRuXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgIGNvbnN0IHBvc3NpYmxlQmV0ID0gZ2FtZS53YWxsZXQubW9uZXkgLSBnYW1lLndhbGxldC5iZXQ7XHJcbiAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKFwiYWRkMTBcIikgJiYgcG9zc2libGVCZXQgPj0gMTApIHtcclxuICAgICAgICBnYW1lLndhbGxldC5iZXQgKz0gMTA7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAoJCh0aGlzKS5oYXNDbGFzcyhcImFkZDUwXCIpICYmIHBvc3NpYmxlQmV0ID49IDUwKSB7XHJcbiAgICAgICAgZ2FtZS53YWxsZXQuYmV0ICs9IDUwO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKCQodGhpcykuaGFzQ2xhc3MoXCJhZGQxMDBcIikgJiYgcG9zc2libGVCZXQgPj0gMTAwKSB7XHJcbiAgICAgICAgZ2FtZS53YWxsZXQuYmV0ICs9IDEwMDtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmICgkKHRoaXMpLmhhc0NsYXNzKFwiYWRkNTAwXCIpICYmIHBvc3NpYmxlQmV0ID49IDUwMCkge1xyXG4gICAgICAgIGdhbWUud2FsbGV0LmJldCArPSA1MDA7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAoJCh0aGlzKS5oYXNDbGFzcyhcImFsbC1pblwiKSkge1xyXG4gICAgICAgIGdhbWUud2FsbGV0LmJldCA9IGdhbWUud2FsbGV0Lm1vbmV5O1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKCQodGhpcykuaGFzQ2xhc3MoXCJyZXNldFwiKSkge1xyXG4gICAgICAgIGdhbWUud2FsbGV0LmJldCA9IDEwO1xyXG4gICAgICB9XHJcbiAgICAgIGdhbWUuJGJldC50ZXh0KGdhbWUud2FsbGV0LmJldCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG11bHRpcGxlT3V0Y29tZXMoaGFuZHMpIHtcclxuICAgIGxldCBoYW5kMSA9IGhhbmRzWzBdLm91dGNvbWU7XHJcbiAgICBsZXQgaGFuZDIgPSBoYW5kc1sxXS5vdXRjb21lO1xyXG4gICAgaWYgKGhhbmQxID09PSBoYW5kMikge1xyXG4gICAgICBpZiAoaGFuZDEgPT09IFwiYmxhY2tqYWNrXCIgJiYgaGFuZDIgPT09IFwiYmxhY2tqYWNrXCIpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJUV08gQkxBQ0tKQUNLUyEhIVwiKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmIChoYW5kMSA9PT0gXCJ3aW5cIiAmJiBoYW5kMiA9PT0gXCJ3aW5cIikge1xyXG4gICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIllvdSB3aW4gYm90aCFcIik7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAoaGFuZDEgPT09IFwibG9zZVwiICYmIGhhbmQyID09PSBcImxvc2VcIikge1xyXG4gICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIkRlYWxlciB3aW5zIGJvdGhcIik7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiUHVzaCBib3RoXCIpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMud2FsbGV0LnBheW91dChoYW5kMSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChoYW5kMSAhPT0gaGFuZDIpIHtcclxuICAgICAgLy8gY2FsY3VsYXRlIHZhbHVlIG9mIGVhY2ggaGFuZCBvdXRjb21lIGJlZm9yZSBjYWxsaW5nIHBheW91dCBmdW5jdGlvblxyXG4gICAgICBsZXQgaW5pdGlhbEJldCA9IHRoaXMud2FsbGV0LmJldCAvIDI7XHJcbiAgICAgIGxldCBoYW5kMVZhbHVlID0gMDtcclxuICAgICAgbGV0IGhhbmQyVmFsdWUgPSAwO1xyXG4gICAgICBpZiAoaGFuZDEgPT09IFwiYmxhY2tqYWNrXCIgfHwgaGFuZDIgPT09IFwiYmxhY2tqYWNrXCIpIHtcclxuICAgICAgICBoYW5kMVZhbHVlID0gaW5pdGlhbEJldCAqIDEuNTtcclxuICAgICAgICBpZiAoaGFuZDEgPT09IFwid2luXCIgfHwgaGFuZDIgPT09IFwid2luXCIpIHtcclxuICAgICAgICAgIGhhbmQyVmFsdWUgPSBpbml0aWFsQmV0O1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiWW91IHdpbiBib3RoIVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoaGFuZDEgPT09IFwibG9zZVwiIHx8IGhhbmQyID09PSBcImxvc2VcIikge1xyXG4gICAgICAgICAgaGFuZDJWYWx1ZSA9IC1pbml0aWFsQmV0O1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiWW91IGFuZCBkZWFsZXIgZWFjaCB3aW4gb25lXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIllvdSB3aW4gb25lLCBwdXNoXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBcclxuICAgICAgZWxzZSBpZiAoaGFuZDEgPT09IFwid2luXCIgfHwgaGFuZDIgPT09IFwid2luXCIpIHtcclxuICAgICAgICBoYW5kMVZhbHVlID0gaW5pdGlhbEJldDtcclxuICAgICAgICBpZiAoaGFuZDEgPT09IFwibG9zZVwiIHx8IGhhbmQyID09PSBcImxvc2VcIikge1xyXG4gICAgICAgICAgaGFuZDJWYWx1ZSA9IC1pbml0aWFsQmV0O1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiWW91IGFuZCBkZWFsZXIgZWFjaCB3aW4gb25lXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIllvdSB3aW4gb25lLCBwdXNoXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmIChoYW5kMSA9PT0gXCJsb3NlXCIgfHwgaGFuZDIgPT09IFwibG9zZVwiKSB7XHJcbiAgICAgICAgaGFuZDFWYWx1ZSA9IC1pbml0aWFsQmV0O1xyXG4gICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIkRlYWxlciB3aW5zIG9uZSwgcHVzaFwiKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLndhbGxldC5wYXlvdXQoXCJjdXN0b21cIiwgaGFuZDFWYWx1ZSwgaGFuZDJWYWx1ZSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNwbGl0SW5QbGF5ID0gZmFsc2U7XHJcbiAgICB0aGlzLmVuZEdhbWVNb2RlKCk7XHJcbiAgfVxyXG5cclxuICBtb2RhbChtb2RhbFR5cGUpIHtcclxuICAgIGlmIChtb2RhbFR5cGUgPT09IFwiYmFua3J1cHRcIikge1xyXG4gICAgICAkKFwiLm1vZGFsLCAubW9kYWwtb3ZlcmxheVwiKS5yZW1vdmVDbGFzcyhcImhpZGVcIik7XHJcbiAgICAgICQoXCIubW9kYWwgLm1lc3NhZ2VcIikuaHRtbChcclxuICAgICAgICBcIllvdSd2ZSBsb3N0IGV2ZXJ5dGhpbmcuXCIgK1xyXG4gICAgICAgICAgXCI8YnIvPjxici8+XCIgK1xyXG4gICAgICAgICAgXCJHb29kIHRoaW5nIGl0J3Mgbm90IHJlYWwgbW9uZXkhXCJcclxuICAgICAgKTtcclxuICAgICAgJChcIi5tb2RhbC1ndXRzIGJ1dHRvblwiKS50ZXh0KFwiUGxheSBhZ2FpblwiKTtcclxuICAgICAgJChcIi5tb2RhbC1ndXRzIGJ1dHRvblwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoXCIubW9kYWwsIC5tb2RhbC1vdmVybGF5XCIpLmFkZENsYXNzKFwiaGlkZVwiKTtcclxuICAgICAgICAkKFwiLnRpdGxlLXNjcmVlblwiKS5zaG93KCk7XHJcbiAgICAgICAgZ2FtZS5yZXNldEdhbWUoKTtcclxuICAgICAgICB0aGlzLndhbGxldC5yZXNldCgpO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSBpZiAobW9kYWxUeXBlID09PSBcImhlbHBcIikge1xyXG4gICAgICAvLyBmdXR1cmUgZ2FtZSBmZWF0dXJlOiBpbnN0cnVjdGlvbnMgYXZhaWxhYmxlIGluIGhlbHAgbW9kYWxcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG91dGNvbWUocmVzdWx0KSB7XHJcbiAgICB0aGlzLndhbGxldC5wYXlvdXQocmVzdWx0KTtcclxuICAgIGlmIChyZXN1bHQgPT09IFwicHVzaFwiKSB7XHJcbiAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIlB1c2hcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChyZXN1bHQgPT09IFwibG9zZVwiKSB7XHJcbiAgICAgIGlmICh0aGlzLndhbGxldC5tb25leSAtIHRoaXMud2FsbGV0LmJldCA+PSAxMCkge1xyXG4gICAgICAgIHRoaXMud2FsbGV0Lmxvc2UoKTtcclxuICAgICAgfSBcclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgdGhpcy5tb2RhbChcImJhbmtydXB0XCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLmVuZEdhbWVNb2RlKCk7XHJcbiAgfVxyXG5cclxuICByZXNldEdhbWUoKSB7XHJcbiAgICB0aGlzLmdhbWVEZWNrID0gbmV3IERlY2s7XHJcbiAgICB0aGlzLmRlYWxlckhhbmQgPSBuZXcgSGFuZChcImRlYWxlclwiKTtcclxuICAgIHRoaXMucGxheWVySGFuZCA9IG5ldyBIYW5kKFwicGxheWVyXCIsIDEpO1xyXG4gICAgJChcIi5tZXNzYWdlc1wiKS5lbXB0eSgpO1xyXG4gICAgJChcIi5wbGF5ZXItaGFuZFwiKS5lbXB0eSgpO1xyXG4gICAgJChcIi5kZWFsZXItaGFuZFwiKS5lbXB0eSgpO1xyXG4gICAgJChcIi5wbGF5ZXItcG9pbnRzXCIpLmVtcHR5KCk7XHJcbiAgICAkKFwiLmRlYWxlci1wb2ludHNcIikuZW1wdHkoKTtcclxuICAgICQoXCIuY2hhbmdlXCIpLmVtcHR5KCk7XHJcbiAgfVxyXG5cclxuICBzZWxlY3RDdXJyZW50SGFuZCguLi5oYW5kcykge1xyXG4gICAgbGV0IGN1cnJlbnRIYW5kO1xyXG4gICAgZm9yIChsZXQgaGFuZCBvZiBoYW5kcykge1xyXG4gICAgICBoYW5kLnRvZ2dsZUhpZ2hsaWdodCgpO1xyXG4gICAgICBpZiAoaGFuZC5wbGF5aW5nKSB7XHJcbiAgICAgICAgY3VycmVudEhhbmQgPSBoYW5kO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY3VycmVudEhhbmQ7XHJcbiAgfVxyXG5cclxuICBzcGxpdCgpIHtcclxuICAgIHRoaXMuc3BsaXRJblBsYXkgPSB0cnVlO1xyXG4gICAgdGhpcy5kaXNhYmxlKHRoaXMuJHNwbGl0KTtcclxuICAgIHRoaXMud2FsbGV0LmRvdWJsZUJldCgpO1xyXG5cclxuICAgIC8vIHN0YXJ0IGFkZGl0aW9uYWwgaGFuZCBhbmQgbW92ZSBvbmUgY2FyZCBmcm9tIGhhbmQgMSB0byBoYW5kIDJcclxuICAgIHRoaXMuYWRqdXN0U3BhY2UoKTtcclxuICAgIHRoaXMucGxheWVySGFuZDIgPSBuZXcgSGFuZChcInBsYXllclwiLCAyKTtcclxuICAgIGxldCByZW1vdmVkQ2FyZCA9IHRoaXMucGxheWVySGFuZC5yZW1vdmVDYXJkKCk7XHJcbiAgICB0aGlzLnBsYXllckhhbmQyLmFkZENhcmQocmVtb3ZlZENhcmQuY2FyZCwgcmVtb3ZlZENhcmQuJGNhcmQpO1xyXG4gICAgdGhpcy5kZWFsT25lQ2FyZCh0aGlzLnBsYXllckhhbmQpO1xyXG4gICAgdGhpcy5kZWFsT25lQ2FyZCh0aGlzLnBsYXllckhhbmQyKTtcclxuICB9XHJcblxyXG4gIHN0YW5kKCkge1xyXG4gICAgaWYgKCF0aGlzLnNwbGl0SW5QbGF5KSB7XHJcbiAgICAgIHRoaXMuZGlzYWJsZSh0aGlzLiRoaXQsIHRoaXMuJHN0YW5kLCB0aGlzLiRkb3VibGVEb3duLCB0aGlzLiRzcGxpdCk7XHJcbiAgICAgIHRoaXMuZGVhbGVyVHVybih0aGlzLnBsYXllckhhbmQpO1xyXG4gICAgICB0aGlzLmludm9rZU91dGNvbWUodGhpcy5wbGF5ZXJIYW5kKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBsZXQgY3VycmVudEhhbmQgPSB0aGlzLnNlbGVjdEN1cnJlbnRIYW5kKHRoaXMucGxheWVySGFuZCwgdGhpcy5wbGF5ZXJIYW5kMik7XHJcbiAgICAgIGlmIChjdXJyZW50SGFuZCA9PT0gdGhpcy5wbGF5ZXJIYW5kKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJIYW5kLnBsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBsYXllckhhbmQyLnBsYXlpbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0Q3VycmVudEhhbmQodGhpcy5wbGF5ZXJIYW5kLCB0aGlzLnBsYXllckhhbmQyKTtcclxuICAgICAgfSBcclxuICAgICAgZWxzZSBpZiAoY3VycmVudEhhbmQgPT09IHRoaXMucGxheWVySGFuZDIpIHtcclxuICAgICAgICB0aGlzLnBsYXllckhhbmQyLnBsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNlbGVjdEN1cnJlbnRIYW5kKHRoaXMucGxheWVySGFuZCwgdGhpcy5wbGF5ZXJIYW5kMik7XHJcbiAgICAgICAgdGhpcy5kZWFsZXJUdXJuKHRoaXMucGxheWVySGFuZCwgdGhpcy5wbGF5ZXJIYW5kMik7XHJcbiAgICAgICAgdGhpcy5pbnZva2VPdXRjb21lKHRoaXMucGxheWVySGFuZCwgdGhpcy5wbGF5ZXJIYW5kMik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXJ0R2FtZU1vZGUoKSB7XHJcbiAgICAkKFwiLnRpdGxlLXNjcmVlblwiKS5oaWRlKCk7XHJcbiAgICB0aGlzLmFkanVzdFNwYWNlKCk7XHJcbiAgICB0aGlzLmVuYWJsZSh0aGlzLiRoaXQsIHRoaXMuJHN0YW5kKTtcclxuICAgIHRoaXMuZGlzYWJsZSh0aGlzLiRkZWFsKTtcclxuICAgICQoXCIuYmV0dGluZyAuYnV0dG9uc1wiKS5oaWRlKCk7XHJcbiAgICB0aGlzLnBsYXllckhhbmQucGxheWluZyA9IHRydWU7XHJcbiAgICB0aGlzLnNlbGVjdEN1cnJlbnRIYW5kKHRoaXMucGxheWVySGFuZCk7ICBcclxuICB9XHJcblxyXG4gIHVwZGF0ZU1lc3NhZ2UobWVzc2FnZSkge1xyXG4gICAgJChcIi5tZXNzYWdlc1wiKS5hcHBlbmQoYDxoMT4ke21lc3NhZ2V9PC9oMT5gKTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvZ2FtZS5qcyIsImltcG9ydCBDYXJkIGZyb20gXCIuL2NhcmRcIjtcclxuaW1wb3J0IEhhbmQgZnJvbSBcIi4vaGFuZFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVjayB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmNhcmRzID0gW107XHJcbiAgfVxyXG5cclxuICBkcmF3KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2FyZHMucG9wKCk7XHJcbiAgfVxyXG5cclxuICBnZW5lcmF0ZShudW1EZWNrcykge1xyXG4gICAgaWYgKCFudW1EZWNrcykge1xyXG4gICAgICBudW1EZWNrcyA9IDE7XHJcbiAgICB9XHJcbiAgICB3aGlsZSAobnVtRGVja3MgPiAwKSB7XHJcbiAgICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IDEzOyBpKyspIHtcclxuICAgICAgICB0aGlzLmNhcmRzLnB1c2gobmV3IENhcmQoaSwgXCJzcGFkZXNcIikpO1xyXG4gICAgICAgIHRoaXMuY2FyZHMucHVzaChuZXcgQ2FyZChpLCBcImRpYW1vbmRzXCIpKTtcclxuICAgICAgICB0aGlzLmNhcmRzLnB1c2gobmV3IENhcmQoaSwgXCJoZWFydHNcIikpO1xyXG4gICAgICAgIHRoaXMuY2FyZHMucHVzaChuZXcgQ2FyZChpLCBcImNsdWJzXCIpKTtcclxuICAgICAgfVxyXG4gICAgICBudW1EZWNrcy0tO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2h1ZmZsZSgpIHtcclxuICAgIGZvciAobGV0IGkgPSB0aGlzLmNhcmRzLmxlbmd0aCAtIDE7IGkgPiAwOyBpLS0pIHtcclxuICAgICAgY29uc3QgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChpICsgMSkpO1xyXG4gICAgICBbdGhpcy5jYXJkc1tpXV0gPSBbdGhpcy5jYXJkc1tqXV07XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2RlY2suanMiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBXYWxsZXQge1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0dGhpcy5tb25leSA9IDUwMDtcclxuXHRcdHRoaXMuYmV0ID0gMTA7XHJcblx0XHR0aGlzLmNoYW5nZSA9IFwiXCI7XHJcblxyXG5cdFx0dGhpcy4kdG90YWwgPSAkKFwiLnRvdGFsXCIpO1xyXG5cdFx0dGhpcy4kYmV0ID0gJChcIi5jdXJyZW50QmV0XCIpO1xyXG5cdFx0dGhpcy4kY2hhbmdlID0gJChcIi5jaGFuZ2VcIik7XHJcblx0fVxyXG5cclxuXHRhc3Nlc3NDaGFuZ2UoKSB7XHJcblx0XHRsZXQgY2xhc3NOYW1lID0gXCJcIjtcclxuXHRcdGxldCBzeW1ib2wgPSBcIlwiO1xyXG5cdFx0aWYgKHRoaXMuY2hhbmdlID4gMCkge1xyXG5cdFx0XHRjbGFzc05hbWUgPSBcInBvc2l0aXZlXCI7XHJcblx0XHRcdHN5bWJvbCA9IFwiK1wiO1xyXG5cdFx0fSBlbHNlIGlmICh0aGlzLmNoYW5nZSA8IDApIHtcclxuXHRcdFx0Y2xhc3NOYW1lID0gXCJuZWdhdGl2ZVwiO1xyXG5cdFx0XHRzeW1ib2wgPSBcIi1cIjtcclxuXHRcdH1cclxuXHRcdHRoaXMuJGNoYW5nZS5hcHBlbmQoYDxzcGFuIGNsYXNzPVwiJHtjbGFzc05hbWV9XCI+JHtzeW1ib2x9ICQke01hdGguYWJzKHRoaXMuY2hhbmdlKX08L3NwYW4+YCk7XHJcblx0fVxyXG5cdFxyXG5cdGRvdWJsZUJldCgpIHtcclxuXHRcdHRoaXMubW9uZXkgLT0gdGhpcy5iZXQ7XHJcblx0XHR0aGlzLmJldCAqPSAyO1xyXG5cdFx0dGhpcy51cGRhdGUoKTtcclxuXHR9XHJcblxyXG5cdHBheW91dChvdXRjb21lLCBoYW5kMVZhbHVlLCBoYW5kMlZhbHVlKSB7XHJcblx0XHRpZiAob3V0Y29tZSA9PT0gXCJibGFja2phY2tcIikge1xyXG5cdFx0XHR0aGlzLmNoYW5nZSA9IHRoaXMuYmV0ICogMS41O1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAob3V0Y29tZSA9PT0gXCJ3aW5cIikge1xyXG5cdFx0XHR0aGlzLmNoYW5nZSA9IHRoaXMuYmV0O1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAob3V0Y29tZSA9PT0gXCJsb3NlXCIpIHtcclxuXHRcdFx0dGhpcy5jaGFuZ2UgPSAtdGhpcy5iZXQ7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmIChvdXRjb21lID09PSBcInB1c2hcIikge1xyXG5cdFx0XHR0aGlzLmNoYW5nZSA9IDA7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmIChvdXRjb21lID09PSBcIm11bHRpcGxlXCIpIHtcclxuXHRcdFx0dGhpcy5jaGFuZ2UgPSBoYW5kMVZhbHVlICsgaGFuZDJWYWx1ZTtcclxuXHRcdH1cclxuXHRcdHRoaXMubW9uZXkgKz0gdGhpcy5jaGFuZ2U7XHJcblx0fVxyXG5cclxuXHRyZXNldCgpIHtcclxuXHRcdHRoaXMubW9uZXkgPSA1MDA7XHJcblx0XHR0aGlzLmJldCA9IDEwO1xyXG5cdFx0dGhpcy5jaGFuZ2UgPSBcIlwiO1xyXG5cdFx0dGhpcy51cGRhdGUoKTtcclxuXHR9XHJcblxyXG5cdHVwZGF0ZSgpIHtcclxuXHRcdHRoaXMuJHRvdGFsLnRleHQodGhpcy5tb25leSk7XHJcblx0XHR0aGlzLiRiZXQudGV4dCh0aGlzLmJldCk7XHJcblx0fVxyXG5cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL3dhbGxldC5qcyJdLCJzb3VyY2VSb290IjoiIn0=