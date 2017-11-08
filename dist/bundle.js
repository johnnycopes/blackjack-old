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
      return "img/" + value + "_of_" + this.suit + ".svg";
    }
  }]);

  return Card;
}();

exports.default = Card;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(3);

__webpack_require__(7);

__webpack_require__(12);

__webpack_require__(13);

__webpack_require__(14);

__webpack_require__(15);

__webpack_require__(16);

__webpack_require__(17);

__webpack_require__(18);

__webpack_require__(19);

__webpack_require__(20);

__webpack_require__(21);

__webpack_require__(22);

__webpack_require__(23);

__webpack_require__(24);

__webpack_require__(25);

__webpack_require__(26);

__webpack_require__(27);

__webpack_require__(28);

__webpack_require__(29);

__webpack_require__(30);

__webpack_require__(31);

__webpack_require__(32);

__webpack_require__(33);

__webpack_require__(34);

__webpack_require__(35);

__webpack_require__(36);

__webpack_require__(37);

__webpack_require__(38);

__webpack_require__(39);

__webpack_require__(40);

__webpack_require__(41);

__webpack_require__(42);

__webpack_require__(43);

__webpack_require__(44);

__webpack_require__(45);

__webpack_require__(46);

__webpack_require__(47);

__webpack_require__(48);

__webpack_require__(49);

__webpack_require__(50);

__webpack_require__(51);

__webpack_require__(52);

__webpack_require__(53);

__webpack_require__(54);

__webpack_require__(55);

__webpack_require__(56);

__webpack_require__(57);

__webpack_require__(58);

__webpack_require__(59);

__webpack_require__(60);

__webpack_require__(61);

__webpack_require__(62);

__webpack_require__(63);

__webpack_require__(64);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(4);

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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _hand = __webpack_require__(0);

var _hand2 = _interopRequireDefault(_hand);

var _deck = __webpack_require__(5);

var _deck2 = _interopRequireDefault(_deck);

var _wallet = __webpack_require__(6);

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
        $card.attr('src', "img/back-suits-red.svg");
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
        var game = this;
        $(".modal, .modal-overlay").removeClass("hide");
        $(".modal-guts button").on("click", function () {
          $(".modal, .modal-overlay").addClass("hide");
          $(".title-screen").show();
          game.resetGame();
          game.wallet.reset();
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
/* 5 */
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
/* 6 */
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

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(8);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(10)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js??ref--1-1!../../node_modules/sass-loader/lib/loader.js??ref--1-2!./main.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js??ref--1-1!../../node_modules/sass-loader/lib/loader.js??ref--1-2!./main.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(true);
// imports


// module
exports.push([module.i, "* {\n  box-sizing: border-box; }\n\nhtml, body {\n  height: 100%;\n  font-size: 80%; }\n\nbody {\n  margin: 0;\n  min-height: 550px;\n  background-color: #8C0002;\n  font-family: 'Ek Mukta', sans-serif;\n  font-weight: 300;\n  font-size: 1rem;\n  color: #FCFEE5; }\n\nmain {\n  height: 100%;\n  text-align: center; }\n\nh1, h2, h3, h4, h5, h6 {\n  margin: 0;\n  font-weight: 300; }\n\nh1 {\n  margin: 10px 0; }\n\ntable {\n  margin-bottom: 10px;\n  width: 100%;\n  border-collapse: collapse;\n  text-align: center; }\n\ntd {\n  width: 50%;\n  height: 1.5rem; }\n\nbutton {\n  display: inline-block;\n  padding: 5px;\n  width: 49%;\n  font-family: 'Ek Mukta', sans-serif;\n  font-size: 1rem;\n  font-weight: 300;\n  background: #FCFEE5;\n  color: #060605;\n  border: 4px solid #BA7619;\n  outline: none; }\n\nbutton:hover {\n  cursor: pointer;\n  text-decoration: underline; }\n\nbutton:active {\n  outline: none; }\n\nbutton[disabled],\nbutton[disabled]:hover {\n  border: 4px solid #8C0002;\n  color: transparent;\n  text-shadow: 0 0 5px rgba(6, 6, 5, 0.5);\n  cursor: default;\n  text-decoration: none;\n  position: relative; }\n\nbutton[disabled]::after {\n  content: \"\";\n  position: absolute;\n  top: 0%;\n  left: 0%;\n  width: 100%;\n  height: 100%;\n  background: #060605;\n  opacity: 0.3; }\n\n.fl {\n  float: left; }\n\n.fr {\n  float: right; }\n\n.cf::after {\n  content: \"\";\n  display: block;\n  clear: both; }\n\n.positive {\n  color: #2ff31c; }\n\n.negative {\n  color: #FB0007; }\n\n.container {\n  margin: 0 auto;\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  justify-content: space-around; }\n\n.messages {\n  height: 66px;\n  display: flex;\n  align-items: center;\n  justify-content: center; }\n\n.table {\n  position: relative; }\n\n.title-screen {\n  position: absolute;\n  width: 100%;\n  z-index: 1;\n  text-align: center; }\n\n.title-screen h1 {\n  font-size: 5rem; }\n\n.title-screen .instructions {\n  width: 50%;\n  float: left; }\n\n.dealer,\n.player {\n  width: 100%;\n  height: 160px; }\n\n.dealerHand-div,\n.playerHand-div {\n  width: 100%;\n  text-align: center;\n  position: relative;\n  float: left; }\n\n.dealer-hand,\n.player-hand {\n  margin: 0 auto;\n  position: relative;\n  height: 110px;\n  width: 70%; }\n\n.currentHand::after {\n  content: \"\";\n  top: 0;\n  left: 0;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  opacity: 0.15;\n  border-radius: 10px;\n  background: #fff; }\n\n.card {\n  height: 100%;\n  position: absolute;\n  right: -50%; }\n\n.card-dd {\n  transform: rotate(45deg);\n  left: 40px !important; }\n\n.card:first-child {\n  left: 0; }\n\n.card:nth-child(2) {\n  left: 40px; }\n\n.card:nth-child(3) {\n  left: 80px; }\n\n.card:nth-child(4) {\n  left: 120px; }\n\n.card:nth-child(5) {\n  left: 160px; }\n\n.card:nth-child(6) {\n  left: 200px; }\n\n.card:nth-child(7) {\n  left: 240px; }\n\n.card:nth-child(8) {\n  left: 280px; }\n\n.card:nth-child(9) {\n  left: 320px; }\n\n.card.split {\n  left: 0; }\n\n.card.split:nth-child(2) {\n  left: 10px; }\n\n.card.split:nth-child(3) {\n  left: 20px; }\n\n.card.split:nth-child(4) {\n  left: 30px; }\n\n.card.split:nth-child(5) {\n  left: 40px; }\n\n.card.split:nth-child(6) {\n  left: 50px; }\n\n.card.split:nth-child(7) {\n  left: 60px; }\n\n.card.split:nth-child(8) {\n  left: 70px; }\n\n.card.split:nth-child(9) {\n  left: 80px; }\n\n.action-wrap {\n  margin: 0 auto;\n  width: 95%; }\n\n.betting,\n.game-actions {\n  width: 50%;\n  float: left; }\n\n.actions .container,\n.money .container {\n  margin: 0 auto;\n  max-width: 400px;\n  width: 80%; }\n\n.deal {\n  margin: 0 auto;\n  display: block;\n  width: 100%; }\n\n.row {\n  margin-bottom: 5px;\n  position: relative; }\n\n.money h3 {\n  display: inline-block; }\n\n.modal {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  max-width: 500px;\n  max-height: 500px;\n  height: 90%;\n  width: 90%;\n  z-index: 2; }\n\n.modal-guts {\n  position: absolute;\n  background: #FCFEE5;\n  color: #060605;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  overflow: auto;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center; }\n\n.modal-overlay {\n  position: absolute;\n  background: #060605;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  z-index: 1;\n  opacity: 0.5; }\n\n.hide {\n  display: none; }\n\n/*-------------------------------\nMEDIA QUERIES\n-------------------------------*/\n@media screen and (min-width: 480px) {\n  html {\n    font-size: 100%; }\n  body {\n    min-height: 600px !important; }\n  .container {\n    width: 90%; }\n  .action-wrap {\n    width: 90%; }\n  .dealer-hand,\n  .player-hand {\n    height: 150px;\n    width: 50%; } }\n\n@media screen and (min-width: 768px) {\n  html {\n    font-size: 125%; }\n  body {\n    min-height: 700px; }\n  .dealer,\n  .player {\n    height: 200px;\n    width: 50%;\n    float: left;\n    display: flex;\n    align-items: center; }\n  .dealer-hand,\n  .player-hand {\n    height: 200px;\n    width: 90%; }\n  .action-wrap {\n    margin: 0 auto;\n    width: 80%; } }\n\n@media screen and (min-width: 960px) {\n  .container {\n    width: 80%; }\n  .dealer-hand,\n  .player-hand {\n    height: 200px;\n    width: 80%; } }\n\n@media screen and (min-width: 1200px) {\n  body {\n    min-height: 950px; }\n  .container {\n    width: 70%; }\n  .dealer,\n  .player {\n    height: 260px; }\n  .dealer-hand,\n  .player-hand {\n    height: 250px;\n    width: 80%; }\n  .card-dd {\n    left: 50px !important; }\n  .card:first-child {\n    left: 0; }\n  .card:nth-child(2) {\n    left: 50px; }\n  .card:nth-child(3) {\n    left: 100px; }\n  .card:nth-child(4) {\n    left: 150px; }\n  .card:nth-child(5) {\n    left: 200px; }\n  .card:nth-child(6) {\n    left: 250px; }\n  .card:nth-child(7) {\n    left: 300px; }\n  .card:nth-child(8) {\n    left: 350px; }\n  .card:nth-child(9) {\n    left: 400px; } }\n\n@media screen and (min-width: 1600px) {\n  html {\n    font-size: 150%; }\n  button {\n    padding: 15px; }\n  .container {\n    max-width: 1400px; }\n  .messages {\n    height: 75px; }\n  .dealer-hand,\n  .player-hand {\n    height: 300px;\n    width: 60%; }\n  .card-dd {\n    left: 70px !important; }\n  .card:first-child {\n    left: 0; }\n  .card:nth-child(2) {\n    left: 70px; }\n  .card:nth-child(3) {\n    left: 140px; }\n  .card:nth-child(4) {\n    left: 210px; }\n  .card:nth-child(5) {\n    left: 280px; }\n  .card:nth-child(6) {\n    left: 350px; }\n  .card:nth-child(7) {\n    left: 420px; }\n  .card:nth-child(8) {\n    left: 490px; }\n  .card:nth-child(9) {\n    left: 560px; }\n  .action-wrap {\n    width: 70%; } }\n", "", {"version":3,"sources":["C:/Source/Dev/Projects/blackjack/src/scss/src/scss/main.scss"],"names":[],"mappings":"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","file":"main.scss","sourcesContent":["$red: #FB0007;\n$darkRed: #8C0002;\n$white: #FCFEE5;\n$black: #060605;\n$brown: #BA7619;\n$gray: #787878;\n\n$positive: #2ff31c;\n$negative: #FB0007;\n// $neutral:\n\n* {\n  box-sizing: border-box;\n}\n\nhtml, body {\n  height: 100%;\n  font-size: 80%;\n}\n\nbody {\n  margin: 0;\n  min-height: 550px;\n  background-color: $darkRed;\n  // background-image: url(../images/img-noise-361x370.png);\n  font-family: 'Ek Mukta', sans-serif;\n  font-weight: 300;\n  font-size: 1rem;\n  color: $white;\n}\n\nmain {\n  height: 100%;\n  text-align: center;\n}\n\nh1, h2, h3, h4, h5, h6 {\n  margin: 0;\n  font-weight: 300;\n}\n\nh1 {\n  margin: 10px 0;\n}\n\ntable {\n  margin-bottom: 10px;\n  width: 100%;\n  border-collapse: collapse;\n  text-align: center;\n}\n\ntd {\n  width: 50%;\n  height: 1.5rem;\n}\n\nbutton {\n  display: inline-block;\n  padding: 5px;\n  width: 49%;\n  font-family: 'Ek Mukta', sans-serif;\n  font-size: 1rem;\n  font-weight: 300;\n  background: $white;\n  color: $black;\n  border: 4px solid $brown;\n  outline: none;\n}\n\nbutton:hover {\n  cursor: pointer;\n  text-decoration: underline;\n}\n\nbutton:active {\n  outline: none;\n}\n\nbutton[disabled],\nbutton[disabled]:hover {\n  border: 4px solid $darkRed;\n  color: transparent;\n  text-shadow: 0 0 5px rgba(6,6,5,0.5);\n  // opacity: 0.7;\n  cursor: default;\n  text-decoration: none;\n  position: relative;\n}\n\nbutton[disabled]::after {\n  content: \"\";\n  position: absolute;\n  top: 0%;\n  left: 0%;\n  width: 100%;\n  height: 100%;\n  background: $black;\n  opacity: 0.3;\n}\n\n.fl { float: left; }\n.fr { float: right; }\n\n.cf::after {\n  content: \"\";\n  display: block;\n  clear: both;\n}\n\n.positive { color: $positive; }\n.negative { color: $negative; }\n// .neutral { color: $neutral; }\n\n.container {\n  margin: 0 auto;\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  justify-content: space-around;\n}\n\n.messages {\n  height: 66px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.table {\n  position: relative;\n}\n\n.title-screen {\n  position: absolute;\n  width: 100%;\n  z-index: 1;\n  text-align: center;\n}\n\n  .title-screen h1 {\n    font-size: 5rem;\n  }\n\n  .title-screen .instructions {\n    width: 50%;\n    float: left;\n  }\n\n.dealer,\n.player {\n  width: 100%;\n  height: 160px;\n}\n\n.dealerHand-div,\n.playerHand-div {\n  width: 100%;\n  text-align: center;\n  position: relative;\n  float: left;\n}\n\n.dealer-hand,\n.player-hand {\n  margin: 0 auto;\n  position: relative;\n  height: 110px;\n  width: 70%;\n}\n\n.currentHand::after {\n  content: \"\";\n  top: 0;\n  left: 0;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  opacity: 0.15;\n  border-radius: 10px;\n  background: #fff;\n}\n\n.card {\n  height: 100%;\n  position: absolute;\n  right: -50%;\n}\n\n.card-dd {\n  transform: rotate(45deg);\n  left: 40px !important\n}\n\n.card:first-child { left: 0; }\n.card:nth-child(2) { left: 40px; }\n.card:nth-child(3) { left: 80px; }\n.card:nth-child(4) { left: 120px; }\n.card:nth-child(5) { left: 160px; }\n.card:nth-child(6) { left: 200px; }\n.card:nth-child(7) { left: 240px; }\n.card:nth-child(8) { left: 280px; }\n.card:nth-child(9) { left: 320px; }\n\n.card.split {\n  left: 0;\n}\n\n.card.split:nth-child(2) { left: 10px; }\n.card.split:nth-child(3) { left: 20px; }\n.card.split:nth-child(4) { left: 30px; }\n.card.split:nth-child(5) { left: 40px; }\n.card.split:nth-child(6) { left: 50px; }\n.card.split:nth-child(7) { left: 60px; }\n.card.split:nth-child(8) { left: 70px; }\n.card.split:nth-child(9) { left: 80px; }\n\n.action-wrap {\n  margin: 0 auto;\n  width: 95%;\n}\n\n.betting,\n.game-actions {\n  width: 50%;\n  float: left;\n}\n\n.actions .container,\n.money .container {\n  margin: 0 auto;\n  max-width: 400px;\n  width: 80%;\n}\n\n.deal {\n  margin: 0 auto;\n  display: block;\n  width: 100%;\n}\n\n.row {\n  margin-bottom: 5px;\n  position: relative;\n}\n\n.money h3 {\n  display: inline-block;\n}\n\n.modal {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  max-width: 500px;\n  max-height: 500px;\n  height: 90%;\n  width: 90%;\n  z-index: 2;\n}\n\n.modal-guts {\n  position: absolute;\n  background: $white;\n  color: $black;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  overflow: auto;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n\n.modal-overlay {\n  position: absolute;\n  background: $black;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  z-index: 1;\n  opacity: 0.5;\n}\n\n.hide {\n  display: none;\n}\n\n\n\n/*-------------------------------\nMEDIA QUERIES\n-------------------------------*/\n\n@media screen and (min-width: 480px) {\n\n  html {\n    font-size: 100%;\n  }\n\n  body {\n    min-height: 600px !important;\n  }\n\n  .container {\n    width: 90%;\n  }\n\n  .action-wrap {\n    width: 90%;\n  }\n\n  .dealer-hand,\n  .player-hand {\n    height: 150px;\n    width: 50%;\n  }\n\n}\n\n\n@media screen and (min-width: 768px) {\n\n  html {\n    font-size: 125%;\n  }\n\n  body {\n    min-height: 700px;\n  }\n\n  .dealer,\n  .player {\n    height: 200px;\n    width: 50%;\n    float: left;\n    display: flex;\n    align-items: center;\n  }\n\n  .dealer-hand,\n  .player-hand {\n    height: 200px;\n    width: 90%;\n  }\n\n  .action-wrap {\n    margin: 0 auto;\n    width: 80%;\n  }\n\n}\n\n@media screen and (min-width: 960px) {\n\n  .container {\n    width: 80%;\n  }\n\n  .dealer-hand,\n  .player-hand {\n    height: 200px;\n    width: 80%;\n  }\n\n}\n\n@media screen and (min-width: 1200px) {\n\n  body {\n    min-height: 950px;\n  }\n\n  .container {\n    width: 70%;\n  }\n\n  .dealer,\n  .player {\n    height: 260px;\n  }\n\n  .dealer-hand,\n  .player-hand {\n    height: 250px;\n    width: 80%;\n  }\n\n  .card-dd {\n    left: 50px !important\n  }\n\n  .card:first-child { left: 0; }\n  .card:nth-child(2) { left: 50px; }\n  .card:nth-child(3) { left: 100px; }\n  .card:nth-child(4) { left: 150px; }\n  .card:nth-child(5) { left: 200px; }\n  .card:nth-child(6) { left: 250px; }\n  .card:nth-child(7) { left: 300px; }\n  .card:nth-child(8) { left: 350px; }\n  .card:nth-child(9) { left: 400px; }\n\n}\n\n@media screen and (min-width: 1600px) {\n\n  html {\n    font-size: 150%;\n  }\n\n  button {\n    padding: 15px;\n  }\n\n  .container {\n    max-width: 1400px;\n  }\n\n  .messages {\n    height: 75px;\n  }\n\n  .dealer-hand,\n  .player-hand {\n    height: 300px;\n    width: 60%;\n  }\n\n  .card-dd {\n    left: 70px !important\n  }\n\n  .card:first-child { left: 0; }\n  .card:nth-child(2) { left: 70px; }\n  .card:nth-child(3) { left: 140px; }\n  .card:nth-child(4) { left: 210px; }\n  .card:nth-child(5) { left: 280px; }\n  .card:nth-child(6) { left: 350px; }\n  .card:nth-child(7) { left: 420px; }\n  .card:nth-child(8) { left: 490px; }\n  .card:nth-child(9) { left: 560px; }\n\n  .action-wrap {\n    width: 70%;\n  }\n\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 9 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(11);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 11 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/2_of_clubs.svg";

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/2_of_hearts.svg";

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/2_of_spades.svg";

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/2_of_diamonds.svg";

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/3_of_clubs.svg";

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/3_of_hearts.svg";

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/3_of_spades.svg";

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/3_of_diamonds.svg";

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/4_of_clubs.svg";

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/4_of_hearts.svg";

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/4_of_spades.svg";

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/4_of_diamonds.svg";

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/5_of_clubs.svg";

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/5_of_hearts.svg";

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/5_of_spades.svg";

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/5_of_diamonds.svg";

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/6_of_clubs.svg";

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/6_of_hearts.svg";

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/6_of_spades.svg";

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/6_of_diamonds.svg";

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/7_of_clubs.svg";

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/7_of_hearts.svg";

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/7_of_spades.svg";

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/7_of_diamonds.svg";

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/8_of_clubs.svg";

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/8_of_hearts.svg";

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/8_of_spades.svg";

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/8_of_diamonds.svg";

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/9_of_clubs.svg";

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/9_of_hearts.svg";

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/9_of_spades.svg";

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/9_of_diamonds.svg";

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/10_of_clubs.svg";

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/10_of_hearts.svg";

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/10_of_spades.svg";

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/10_of_diamonds.svg";

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/jack_of_clubs.svg";

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/jack_of_hearts.svg";

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/jack_of_spades.svg";

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/jack_of_diamonds.svg";

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/queen_of_clubs.svg";

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/queen_of_hearts.svg";

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/queen_of_spades.svg";

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/queen_of_diamonds.svg";

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/king_of_clubs.svg";

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/king_of_hearts.svg";

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/king_of_spades.svg";

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/king_of_diamonds.svg";

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/ace_of_clubs.svg";

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/ace_of_hearts.svg";

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/ace_of_spades.svg";

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/ace_of_diamonds.svg";

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/back-suits-red.svg";

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map