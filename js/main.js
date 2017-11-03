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
    this.currentHand = "hand1";
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

      // shuffle deck(s) and deal cards
      this.gameDeck.shuffle();
      this.dealOneCard(this.dealerHand, "hole");
      this.dealOneCard(this.playerHand);
      var dealerPoints = this.dealOneCard(this.dealerHand);
      var playerPoints = this.dealOneCard(this.playerHand);

      // conceal dealer total and display user total
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
      if (this.currentHand === "hand1") {
        if (!this.splitInPlay) {
          var playerPoints = this.dealOneCard(this.playerHand);
          if (playerPoints > 21) {
            this.updateMessage("You bust");
            this.outcome("lose");
          }
        } else {
          // split is in play
          var _playerPoints = this.dealOneCard(this.playerHand, "split");
          if (_playerPoints > 21) {
            this.splitInPlay = false;
            this.currentHand = "hand2";
            $("#hand1").removeClass("currentHand");
            $("#hand2").addClass("currentHand");
          }
        }
      } else if (this.currentHand === "hand2") {
        var _playerPoints2 = this.dealOneCard(this.playerHand2, "split");
        if (_playerPoints2 > 21) {
          $("#hand2").removeClass("currentHand");
          this.stand();
        }
      }
    }
  }, {
    key: "invokeOutcome",
    value: function invokeOutcome() {
      var hand1 = arguments.length <= 0 ? undefined : arguments[0];
      if (arguments.length === 1) {
        if (hand1.outcome === "win") {
          this.updateMessage("You win!");
          this.outcome("win");
        } else if (hand1.outcome === "lose") {
          this.updateMessage("Dealer wins");
          this.outcome("lose");
        } else {
          this.outcome("push");
        }
      } else if (arguments.length === 2) {
        var hand2 = arguments.length <= 1 ? undefined : arguments[1];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTExZTkzNGI0ODM3MzJhOTA5ZDAiLCJ3ZWJwYWNrOi8vLy4vanMvaGFuZC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jYXJkLmpzIiwid2VicGFjazovLy8uL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9nYW1lLmpzIiwid2VicGFjazovLy8uL2pzL2RlY2suanMiXSwibmFtZXMiOlsiSGFuZCIsIm93bmVyIiwiaGFuZE51bWJlciIsInNlbGVjdG9yIiwiJHdyYXBwZXIiLCIkIiwiJGhhbmQiLCIkcG9pbnRzIiwicGxheWluZyIsImNhcmRzIiwib3V0Y29tZSIsImNhcmQiLCIkY2FyZCIsInB1c2giLCJhcHBlbmQiLCJwb2ludCIsInRvdGFsIiwiYWNlcyIsInBvcCIsImZpbmQiLCJyZW1vdmUiLCJhdHRyIiwiZ2V0SW1hZ2VVcmwiLCJpbmRleCIsImNvbnRlbnQiLCJ0ZXh0IiwiQ2FyZCIsInN1aXQiLCJ2YWx1ZSIsImN1cnJlbnRHYW1lIiwibWFrZUJldCIsIm9uIiwicmVzZXRHYW1lIiwiZ2FtZURlY2siLCJnZW5lcmF0ZSIsImRlYWwiLCJoaXQiLCJzdGFuZCIsImRvdWJsZURvd24iLCJzcGxpdCIsIkdhbWUiLCJkZWFsZXJIYW5kIiwicGxheWVySGFuZCIsImN1cnJlbnRIYW5kIiwic3BsaXRJblBsYXkiLCJtb25leSIsImN1cnJlbnRCZXQiLCJjaGFuZ2UiLCIkZGVhbCIsIiRoaXQiLCIkc3RhbmQiLCIkZG91YmxlRG93biIsIiRzcGxpdCIsIiRjaGFuZ2UiLCJzaXplIiwiY3NzIiwiY2xhc3NOYW1lIiwic3ltYm9sIiwiTWF0aCIsImFicyIsImhhbmQiLCJzcGVjaWFsIiwiZHJhdyIsImFkZENsYXNzIiwiYWRkQ2FyZCIsInVwZGF0ZURpc3BsYXkiLCJnZXRQb2ludHMiLCJnYW1lTW9kZSIsInNodWZmbGUiLCJkZWFsT25lQ2FyZCIsImRlYWxlclBvaW50cyIsInBsYXllclBvaW50cyIsInVwZGF0ZU1lc3NhZ2UiLCJlbmFibGUiLCJjYW5TcGxpdCIsImVsZW1lbnRzIiwiZWxlbWVudCIsInByZXZCZXQiLCJhc3Nlc3NDaGFuZ2UiLCJkaXNhYmxlIiwic2hvdyIsImhpZGUiLCJhZGp1c3RTcGFjZSIsInJlbW92ZUNsYXNzIiwicGxheWVySGFuZDIiLCJoYW5kMSIsImxlbmd0aCIsImhhbmQyIiwiYmV0IiwiJHRvdGFsIiwiJGN1cnJlbnRCZXQiLCJnYW1lIiwiaGFzQ2xhc3MiLCJtb2RhbFR5cGUiLCJodG1sIiwicmVzZXRNb25leSIsInJlc3VsdCIsInJldmVhbEhvbGUiLCJtb2RhbCIsImVuZEdhbWVNb2RlIiwiZW1wdHkiLCJjYWxsZXIiLCJldmFsdWF0ZUhhbmQiLCJpbnZva2VPdXRjb21lIiwicmVtb3ZlZENhcmQiLCJyZW1vdmVDYXJkIiwibWVzc2FnZSIsIkRlY2siLCJudW1EZWNrcyIsImkiLCJqIiwiZmxvb3IiLCJyYW5kb20iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzdEQTs7Ozs7Ozs7SUFFcUJBLEk7QUFDbkIsZ0JBQVlDLEtBQVosRUFBbUJDLFVBQW5CLEVBQStCO0FBQUE7O0FBQzdCLFFBQUlDLGlCQUFKO0FBQ0EsUUFBSUYsVUFBVSxRQUFkLEVBQXdCO0FBQ3RCRSxpQkFBVyxTQUFYO0FBQ0QsS0FGRCxN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QUwsTUFBaUJILElBQUksQ0FBckIsQ0FBWCxDQUFWO0FBRDhDLG1CQUU1QixDQUFDLEtBQUtwRyxLQUFMLENBQVdxRyxDQUFYLENBQUQsQ0FGNEI7QUFFN0MsYUFBS3JHLEtBQUwsQ0FBV29HLENBQVgsQ0FGNkM7QUFHL0M7QUFDRjs7Ozs7O2tCQTdCa0JGLEkiLCJmaWxlIjoiLi9qcy9tYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNTExZTkzNGI0ODM3MzJhOTA5ZDAiLCJpbXBvcnQgQ2FyZCBmcm9tIFwiLi9jYXJkXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIYW5kIHtcclxuICBjb25zdHJ1Y3Rvcihvd25lciwgaGFuZE51bWJlcikge1xyXG4gICAgbGV0IHNlbGVjdG9yO1xyXG4gICAgaWYgKG93bmVyID09PSAnZGVhbGVyJykge1xyXG4gICAgICBzZWxlY3RvciA9IFwiI2RlYWxlclwiO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAob3duZXIgPT09ICdwbGF5ZXInKSB7XHJcbiAgICAgIGlmIChoYW5kTnVtYmVyID09PSAxKSB7XHJcbiAgICAgICAgc2VsZWN0b3IgPSBcIiNoYW5kMVwiO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKGhhbmROdW1iZXIgPT09IDIpIHtcclxuICAgICAgICBzZWxlY3RvciA9IFwiI2hhbmQyXCI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuJHdyYXBwZXIgPSAkKGAke3NlbGVjdG9yfWApO1xyXG4gICAgdGhpcy4kaGFuZCA9ICQoYCR7c2VsZWN0b3J9IC5oYW5kYCk7XHJcbiAgICB0aGlzLiRwb2ludHMgPSAkKGAke3NlbGVjdG9yfSAucG9pbnRzYCk7XHJcbiAgICB0aGlzLnBsYXlpbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuY2FyZHMgPSBbXTtcclxuICAgIHRoaXMub3V0Y29tZTtcclxuICB9XHJcblxyXG4gIGFkZENhcmQoY2FyZCwgJGNhcmQpIHtcclxuICAgIHRoaXMuY2FyZHMucHVzaChjYXJkKTtcclxuICAgIHRoaXMuJGhhbmQuYXBwZW5kKCRjYXJkKTtcclxuICB9XHJcblxyXG4gIGNhblNwbGl0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2FyZHNbMF0ucG9pbnQgPT09IHRoaXMuY2FyZHNbMV0ucG9pbnQ7XHJcbiAgfVxyXG5cclxuICBnZXRQb2ludHMoKSB7XHJcbiAgICBsZXQgdG90YWwgPSAwO1xyXG4gICAgbGV0IGFjZXMgPSAwO1xyXG4gICAgZm9yIChsZXQgY2FyZCBvZiB0aGlzLmNhcmRzKSB7XHJcbiAgICAgIGxldCBwb2ludCA9IGNhcmQucG9pbnQ7XHJcbiAgICAgIGlmIChwb2ludCA9PT0gMSkge1xyXG4gICAgICAgIHRvdGFsICs9IDEwO1xyXG4gICAgICAgIGFjZXMrKztcclxuICAgICAgfSBcclxuICAgICAgZWxzZSBpZiAocG9pbnQgPiAxMCkge1xyXG4gICAgICAgIHBvaW50ID0gMTA7XHJcbiAgICAgIH1cclxuICAgICAgdG90YWwgKz0gcG9pbnQ7XHJcbiAgICAgIHdoaWxlICh0b3RhbCA+IDIxICYmIGFjZXMgPiAwKSB7XHJcbiAgICAgICAgdG90YWwgLT0gMTA7XHJcbiAgICAgICAgYWNlcy0tO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG90YWw7XHJcbiAgfVxyXG5cclxuICByZW1vdmVDYXJkKCkge1xyXG4gICAgbGV0IGNhcmQgPSB0aGlzLmNhcmRzLnBvcCgpO1xyXG4gICAgbGV0ICRjYXJkID0gdGhpcy4kaGFuZC5maW5kKFwiaW1nOmxhc3QtY2hpbGRcIikucmVtb3ZlKCk7XHJcbiAgICByZXR1cm4ge2NhcmQsICRjYXJkfTtcclxuICB9XHJcblxyXG4gIHJldmVhbEhvbGUoKSB7XHJcbiAgICB0aGlzLiRoYW5kLmZpbmQoJ2ltZzpmaXJzdC1jaGlsZCcpLmF0dHIoJ3NyYycsIHRoaXMuY2FyZHNbMF0uZ2V0SW1hZ2VVcmwoKSk7XHJcbiAgfVxyXG5cclxuICBzZWVDYXJkKGluZGV4KSB7XHJcbiAgICByZXR1cm4gdGhpcy5jYXJkc1tpbmRleCAtIDFdO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlRGlzcGxheShjb250ZW50KSB7XHJcbiAgICB0aGlzLiRwb2ludHMudGV4dChjb250ZW50KTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvaGFuZC5qcyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcmQge1xyXG4gIGNvbnN0cnVjdG9yKHBvaW50LCBzdWl0KSB7XHJcbiAgICB0aGlzLnBvaW50ID0gcG9pbnQ7XHJcbiAgICB0aGlzLnN1aXQgPSBzdWl0O1xyXG4gIH1cclxuXHJcbiAgZ2V0SW1hZ2VVcmwoKSB7XHJcbiAgICBsZXQgdmFsdWUgPSB0aGlzLnBvaW50O1xyXG4gICAgaWYgKHRoaXMucG9pbnQgPT09IDExKSB7XHJcbiAgICAgIHZhbHVlID0gXCJqYWNrXCI7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0aGlzLnBvaW50ID09PSAxMikge1xyXG4gICAgICB2YWx1ZSA9IFwicXVlZW5cIjtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXMucG9pbnQgPT09IDEzKSB7XHJcbiAgICAgIHZhbHVlID0gXCJraW5nXCI7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0aGlzLnBvaW50ID09PSAxKSB7XHJcbiAgICAgIHZhbHVlID0gXCJhY2VcIjtcclxuICAgIH1cclxuICAgIHJldHVybiBgaW1hZ2VzLyR7dmFsdWV9X29mXyR7dGhpcy5zdWl0fS5zdmdgO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9jYXJkLmpzIiwiaW1wb3J0IEdhbWUgZnJvbSAnLi9nYW1lJztcblxudmFyIGN1cnJlbnRHYW1lID0gbmV3IEdhbWU7XG5cbmN1cnJlbnRHYW1lLm1ha2VCZXQoKTtcblxuJCgnLmRlYWwnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgY3VycmVudEdhbWUucmVzZXRHYW1lKCk7XG4gIGN1cnJlbnRHYW1lLmdhbWVEZWNrLmdlbmVyYXRlKDMpO1xuICBjdXJyZW50R2FtZS5kZWFsKCk7XG59KTtcblxuJCgnLmhpdCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICBjdXJyZW50R2FtZS5oaXQoKTtcbn0pO1xuXG4kKCcuc3RhbmQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgY3VycmVudEdhbWUuc3RhbmQoKTtcbn0pO1xuXG4kKCcuZG91YmxlLWRvd24nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgY3VycmVudEdhbWUuZG91YmxlRG93bigpO1xufSk7XG5cbiQoJy5zcGxpdCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICBjdXJyZW50R2FtZS5zcGxpdCgpO1xufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9hcHAuanMiLCJpbXBvcnQgSGFuZCBmcm9tIFwiLi9oYW5kXCI7XHJcbmltcG9ydCBEZWNrIGZyb20gXCIuL2RlY2tcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWUge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5nYW1lRGVjayA9IG5ldyBEZWNrO1xyXG4gICAgdGhpcy5kZWFsZXJIYW5kID0gbmV3IEhhbmQoJ2RlYWxlcicpO1xyXG4gICAgdGhpcy5wbGF5ZXJIYW5kID0gbmV3IEhhbmQoJ3BsYXllcicsIDEpO1xyXG4gICAgdGhpcy5jdXJyZW50SGFuZCA9IFwiaGFuZDFcIjtcclxuICAgIHRoaXMuc3BsaXRJblBsYXkgPSBmYWxzZTtcclxuICAgIHRoaXMubW9uZXkgPSA1MDA7XHJcbiAgICB0aGlzLmN1cnJlbnRCZXQgPSAxMDtcclxuICAgIHRoaXMuY2hhbmdlO1xyXG4gICAgXHJcbiAgICB0aGlzLiRkZWFsID0gJChcIi5kZWFsXCIpO1xyXG4gICAgdGhpcy4kaGl0ID0gJChcIi5oaXRcIik7XHJcbiAgICB0aGlzLiRzdGFuZCA9ICQoXCIuc3RhbmRcIik7XHJcbiAgICB0aGlzLiRkb3VibGVEb3duID0gJChcIi5kb3VibGUtZG93blwiKTtcclxuICAgIHRoaXMuJHNwbGl0ID0gJChcIi5zcGxpdFwiKTtcclxuICAgIHRoaXMuJGNoYW5nZSA9ICQoXCIuY2hhbmdlXCIpO1xyXG4gIH1cclxuXHJcbiAgYWRqdXN0U3BhY2UoKSB7XHJcbiAgICBsZXQgc2l6ZTtcclxuICAgIHRoaXMuc3BsaXRJblBsYXkgPyBzaXplID0gNTAgOiBzaXplID0gMTAwO1xyXG4gICAgJChcIi5wbGF5ZXJIYW5kLWRpdlwiKS5jc3MoXCJ3aWR0aFwiLCBgJHtzaXplfSVgKTtcclxuICB9XHJcblxyXG4gIGFzc2Vzc0NoYW5nZSgpIHtcclxuICAgIGxldCBjbGFzc05hbWUgPSBcIlwiO1xyXG4gICAgbGV0IHN5bWJvbCA9IFwiXCI7XHJcbiAgICBpZiAodGhpcy5jaGFuZ2UgPiAwKSB7XHJcbiAgICAgIGNsYXNzTmFtZSA9IFwicG9zaXRpdmVcIjtcclxuICAgICAgc3ltYm9sID0gXCIrXCI7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0aGlzLmNoYW5nZSA8IDApIHtcclxuICAgICAgY2xhc3NOYW1lID0gXCJuZWdhdGl2ZVwiO1xyXG4gICAgICBzeW1ib2wgPSBcIi1cIjtcclxuICAgIH1cclxuICAgIHRoaXMuJGNoYW5nZS5hcHBlbmQoYDxzcGFuIGNsYXNzPVwiJHtjbGFzc05hbWV9XCI+JHtzeW1ib2x9ICQke01hdGguYWJzKHRoaXMuY2hhbmdlKX08L3NwYW4+YCk7XHJcbiAgfVxyXG5cclxuICBkZWFsT25lQ2FyZChoYW5kLCBzcGVjaWFsKSB7XHJcbiAgICBsZXQgY2FyZCA9IHRoaXMuZ2FtZURlY2suZHJhdygpO1xyXG4gICAgbGV0ICRjYXJkID0gJChcIjxpbWcgLz5cIiwge1xyXG4gICAgICBcImNsYXNzXCI6IFwiY2FyZFwiLCBcclxuICAgICAgXCJzcmNcIjogYCR7Y2FyZC5nZXRJbWFnZVVybCgpfWBcclxuICAgIH0pO1xyXG4gICAgaWYgKHNwZWNpYWwgPT09IFwiaG9sZVwiKSB7XHJcbiAgICAgICRjYXJkLmF0dHIoJ3NyYycsIFwiaW1hZ2VzL2JhY2stc3VpdHMtcmVkLnN2Z1wiKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHNwZWNpYWwgPT09IFwiZG91YmxlLWRvd25cIikge1xyXG4gICAgICAkY2FyZC5hZGRDbGFzcygnY2FyZC1kZCcpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoc3BlY2lhbCA9PT0gXCJzcGxpdFwiKSB7XHJcbiAgICAgICRjYXJkLmFkZENsYXNzKCdzcGxpdCcpO1xyXG4gICAgfVxyXG4gICAgaGFuZC5hZGRDYXJkKGNhcmQsICRjYXJkKTtcclxuICAgIGhhbmQudXBkYXRlRGlzcGxheShoYW5kLmdldFBvaW50cygpKTtcclxuICAgIHJldHVybiBoYW5kLmdldFBvaW50cygpO1xyXG4gIH1cclxuXHJcbiAgZGVhbCgpIHtcclxuICAgIHRoaXMuZ2FtZU1vZGUoKTtcclxuICAgIHRoaXMucGxheWVySGFuZC5wbGF5aW5nID0gdHJ1ZTtcclxuXHJcbiAgICAvLyBzaHVmZmxlIGRlY2socykgYW5kIGRlYWwgY2FyZHNcclxuICAgIHRoaXMuZ2FtZURlY2suc2h1ZmZsZSgpO1xyXG4gICAgdGhpcy5kZWFsT25lQ2FyZCh0aGlzLmRlYWxlckhhbmQsIFwiaG9sZVwiKTtcclxuICAgIHRoaXMuZGVhbE9uZUNhcmQodGhpcy5wbGF5ZXJIYW5kKTtcclxuICAgIGxldCBkZWFsZXJQb2ludHMgPSB0aGlzLmRlYWxPbmVDYXJkKHRoaXMuZGVhbGVySGFuZCk7XHJcbiAgICBsZXQgcGxheWVyUG9pbnRzID0gdGhpcy5kZWFsT25lQ2FyZCh0aGlzLnBsYXllckhhbmQpO1xyXG5cclxuICAgIC8vIGNvbmNlYWwgZGVhbGVyIHRvdGFsIGFuZCBkaXNwbGF5IHVzZXIgdG90YWxcclxuICAgIHRoaXMuZGVhbGVySGFuZC51cGRhdGVEaXNwbGF5KFwiP1wiKTtcclxuXHJcbiAgICBpZiAoZGVhbGVyUG9pbnRzID09PSAyMSAmJiBwbGF5ZXJQb2ludHMgPT09IDIxKSB7XHJcbiAgICAgIHRoaXMub3V0Y29tZShcInB1c2hcIik7XHJcbiAgICAgIHRoaXMuZGVhbGVySGFuZC51cGRhdGVEaXNwbGF5KFwiQmxhY2tqYWNrXCIpO1xyXG4gICAgICB0aGlzLnBsYXllckhhbmQudXBkYXRlRGlzcGxheShcIkJMQUNLSkFDSywgSE9UIERBTU4hXCIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoZGVhbGVyUG9pbnRzID09PSAyMSkge1xyXG4gICAgICB0aGlzLm91dGNvbWUoXCJsb3NlXCIpO1xyXG4gICAgICB0aGlzLmRlYWxlckhhbmQudXBkYXRlRGlzcGxheShcIkJsYWNramFja1wiKTtcclxuICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiRGVhbGVyIHdpbnNcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChwbGF5ZXJQb2ludHMgPT09IDIxKSB7XHJcbiAgICAgIHRoaXMub3V0Y29tZShcImJsYWNramFja1wiKTtcclxuICAgICAgdGhpcy5kZWFsZXJIYW5kLnVwZGF0ZURpc3BsYXkoZGVhbGVyUG9pbnRzKTtcclxuICAgICAgdGhpcy5wbGF5ZXJIYW5kLnVwZGF0ZURpc3BsYXkoXCJCTEFDS0pBQ0ssIEhPVCBEQU1OIVwiKTtcclxuICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiWW91IHdpbiFcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0aGlzLm1vbmV5ID4gdGhpcy5jdXJyZW50QmV0ICogMikge1xyXG4gICAgICBpZiAocGxheWVyUG9pbnRzID09PSAxMSkgIHtcclxuICAgICAgICB0aGlzLmVuYWJsZSh0aGlzLiRkb3VibGVEb3duKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5wbGF5ZXJIYW5kLmNhblNwbGl0KCkpIHtcclxuICAgICAgICB0aGlzLmVuYWJsZSh0aGlzLiRzcGxpdCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRpc2FibGUoLi4uZWxlbWVudHMpIHtcclxuICAgIGZvciAobGV0IGVsZW1lbnQgb2YgZWxlbWVudHMpIHtcclxuICAgICAgZWxlbWVudC5hdHRyKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkb3VibGVEb3duKCkge1xyXG4gICAgLy8gZG91YmxlIGJldCBhbmQgZGlzcGxheSBpdFxyXG4gICAgdGhpcy5jdXJyZW50QmV0ICo9IDI7XHJcbiAgICAkKFwiLmN1cnJlbnRCZXRcIikudGV4dCh0aGlzLmN1cnJlbnRCZXQpO1xyXG4gICAgLy8gZGVhbCB0aGUgcGxheWVyIG9uZSBtb3JlIGNhcmQgYW5kIHRoZW4gbW92ZSBvbiB0byB0aGUgZGVhbGVyJ3MgdHVyblxyXG4gICAgdGhpcy5kZWFsT25lQ2FyZCh0aGlzLnBsYXllckhhbmQsIFwiZG91YmxlLWRvd25cIik7XHJcbiAgICB0aGlzLnN0YW5kKFwiZG91YmxlLWRvd25cIik7XHJcbiAgfVxyXG5cclxuICBlbmFibGUoLi4uZWxlbWVudHMpIHtcclxuICAgIGZvciAobGV0IGVsZW1lbnQgb2YgZWxlbWVudHMpIHtcclxuICAgICAgZWxlbWVudC5hdHRyKFwiZGlzYWJsZWRcIiwgZmFsc2UpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZW5kR2FtZU1vZGUoKSB7XHJcbiAgICAkKFwiLnRvdGFsXCIpLnRleHQodGhpcy5tb25leSk7XHJcbiAgICAkKFwiLnByZXZCZXRcIikuYXBwZW5kKGA8c3Bhbj4kJHt0aGlzLnByZXZCZXR9PC9zcGFuPmApO1xyXG4gICAgdGhpcy5hc3Nlc3NDaGFuZ2UoKTtcclxuICAgIHRoaXMuZW5hYmxlKHRoaXMuJGRlYWwpO1xyXG4gICAgdGhpcy5kaXNhYmxlKHRoaXMuJGhpdCwgdGhpcy4kc3RhbmQpO1xyXG4gICAgJChcIi5iZXR0aW5nIC5idXR0b25zXCIpLnNob3coKTtcclxuICB9XHJcblxyXG4gIGV2YWx1YXRlSGFuZChoYW5kKSB7XHJcbiAgICBsZXQgZGVhbGVyUG9pbnRzID0gdGhpcy5kZWFsZXJIYW5kLmdldFBvaW50cygpO1xyXG4gICAgbGV0IHBsYXllclBvaW50cyA9IGhhbmQuZ2V0UG9pbnRzKCk7XHJcbiAgICBpZiAoZGVhbGVyUG9pbnRzID4gMjEgfHwgcGxheWVyUG9pbnRzID4gZGVhbGVyUG9pbnRzKSB7XHJcbiAgICAgIGhhbmQub3V0Y29tZSA9IFwid2luXCI7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChwbGF5ZXJQb2ludHMgPCBkZWFsZXJQb2ludHMpIHtcclxuICAgICAgaGFuZC5vdXRjb21lID0gXCJsb3NlXCI7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgaGFuZC5vdXRjb21lID0gXCJwdXNoXCI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnYW1lTW9kZSgpIHtcclxuICAgICQoXCIudGl0bGUtc2NyZWVuXCIpLmhpZGUoKTtcclxuICAgIHRoaXMuYWRqdXN0U3BhY2UoKTtcclxuICAgIHRoaXMuZW5hYmxlKHRoaXMuJGhpdCwgdGhpcy4kc3RhbmQpO1xyXG4gICAgdGhpcy5kaXNhYmxlKHRoaXMuJGRlYWwpO1xyXG4gICAgJChcIi5iZXR0aW5nIC5idXR0b25zXCIpLmhpZGUoKTtcclxuICB9XHJcblxyXG4gIGhpdCgpIHtcclxuICAgIHRoaXMuZGlzYWJsZSh0aGlzLiRkb3VibGVEb3duLCB0aGlzLiRzcGxpdCk7XHJcbiAgICBpZiAodGhpcy5jdXJyZW50SGFuZCA9PT0gXCJoYW5kMVwiKSB7XHJcbiAgICAgIGlmICghdGhpcy5zcGxpdEluUGxheSkge1xyXG4gICAgICAgIGxldCBwbGF5ZXJQb2ludHMgPSB0aGlzLmRlYWxPbmVDYXJkKHRoaXMucGxheWVySGFuZCk7XHJcbiAgICAgICAgaWYgKHBsYXllclBvaW50cyA+IDIxKSB7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJZb3UgYnVzdFwiKTtcclxuICAgICAgICAgIHRoaXMub3V0Y29tZShcImxvc2VcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgeyAvLyBzcGxpdCBpcyBpbiBwbGF5XHJcbiAgICAgICAgbGV0IHBsYXllclBvaW50cyA9IHRoaXMuZGVhbE9uZUNhcmQodGhpcy5wbGF5ZXJIYW5kLCBcInNwbGl0XCIpO1xyXG4gICAgICAgIGlmIChwbGF5ZXJQb2ludHMgPiAyMSkge1xyXG4gICAgICAgICAgdGhpcy5zcGxpdEluUGxheSA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5jdXJyZW50SGFuZCA9IFwiaGFuZDJcIjtcclxuICAgICAgICAgICQoXCIjaGFuZDFcIikucmVtb3ZlQ2xhc3MoXCJjdXJyZW50SGFuZFwiKTtcclxuICAgICAgICAgICQoXCIjaGFuZDJcIikuYWRkQ2xhc3MoXCJjdXJyZW50SGFuZFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXMuY3VycmVudEhhbmQgPT09IFwiaGFuZDJcIikge1xyXG4gICAgICBsZXQgcGxheWVyUG9pbnRzID0gdGhpcy5kZWFsT25lQ2FyZCh0aGlzLnBsYXllckhhbmQyLCBcInNwbGl0XCIpO1xyXG4gICAgICBpZiAocGxheWVyUG9pbnRzID4gMjEpIHtcclxuICAgICAgICAkKFwiI2hhbmQyXCIpLnJlbW92ZUNsYXNzKFwiY3VycmVudEhhbmRcIik7XHJcbiAgICAgICAgdGhpcy5zdGFuZCgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpbnZva2VPdXRjb21lKC4uLmhhbmRzKSB7XHJcbiAgICBsZXQgaGFuZDEgPSBoYW5kc1swXTtcclxuICAgIGlmIChoYW5kcy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgaWYgKGhhbmQxLm91dGNvbWUgPT09IFwid2luXCIpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJZb3Ugd2luIVwiKTtcclxuICAgICAgICB0aGlzLm91dGNvbWUoXCJ3aW5cIik7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAoaGFuZDEub3V0Y29tZSA9PT0gXCJsb3NlXCIpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJEZWFsZXIgd2luc1wiKTtcclxuICAgICAgICB0aGlzLm91dGNvbWUoXCJsb3NlXCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHRoaXMub3V0Y29tZShcInB1c2hcIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGhhbmRzLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICBsZXQgaGFuZDIgPSBoYW5kc1sxXTtcclxuICAgICAgaWYgKGhhbmQxID09PSBoYW5kMikge1xyXG4gICAgICAgIGlmIChoYW5kMSA9PT0gXCJibGFja2phY2tcIiAmJiBoYW5kMiA9PT0gXCJibGFja2phY2tcIikge1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiVFdPIEJMQUNLSkFDS1MhISFcIik7XHJcbiAgICAgICAgICB0aGlzLm91dGNvbWUoXCJibGFja2phY2tcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGhhbmQxID09PSBcIndpblwiICYmIGhhbmQyID09PSBcIndpblwiKSB7XHJcbiAgICAgICAgICB0aGlzLm91dGNvbWUoXCJ3aW5cIik7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJZb3Ugd2luIGJvdGghXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChoYW5kMSA9PT0gXCJsb3NlXCIgJiYgaGFuZDIgPT09IFwibG9zZVwiKSB7XHJcbiAgICAgICAgICB0aGlzLm91dGNvbWUoXCJsb3NlXCIpO1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiRGVhbGVyIHdpbnMgYm90aFwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5vdXRjb21lKFwicHVzaFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50QmV0IC89IDI7XHJcbiAgICAgICAgaWYgKGhhbmQxID09PSBcImJsYWNramFja1wiIHx8IGhhbmQyID09PSBcImJsYWNramFja1wiKSB7XHJcbiAgICAgICAgICAvLyBjYWxjdWxhdGUgY29tYmluZWQgb3V0Y29tZXMgYmVmb3JlIGNhbGxpbmcgdGhlIG91dGNvbWUgbWV0aG9kXHJcbiAgICAgICAgICBsZXQgYmV0ID0gY3VycmVudEJldDtcclxuICAgICAgICAgIHRoaXMuY3VycmVudEJldCAqPSAxLjU7XHJcbiAgICAgICAgICBpZiAoaGFuZDEgPT09IFwid2luXCIgfHwgaGFuZDIgPT09IFwid2luXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5vdXRjb21lKFwid2luXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRCZXQgKz0gYmV0O1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJZb3Ugd2luIGJvdGghXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZSBpZiAoaGFuZDEgPT09IFwibG9zZVwiIHx8IGhhbmQyID09PSBcImxvc2VcIikge1xyXG4gICAgICAgICAgICB0aGlzLm91dGNvbWUoXCJ3aW5cIik7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEJldCAtPSBiZXQ7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIllvdSBhbmQgZGVhbGVyIGVhY2ggd2luIG9uZVwiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm91dGNvbWUoXCJ3aW5cIik7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIllvdSB3aW4gb25lLCBwdXNoXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChoYW5kMSA9PT0gXCJ3aW5cIiB8fCBoYW5kMiA9PT0gXCJ3aW5cIikge1xyXG4gICAgICAgICAgaWYgKGhhbmQxID09PSBcInB1c2hcIiB8fCBoYW5kMiA9PT0gXCJwdXNoXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5vdXRjb21lKFwid2luXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJZb3Ugd2luIG9uZSwgcHVzaFwiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm91dGNvbWUoXCJwdXNoXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChoYW5kMSA9PT0gXCJsb3NlXCIgfHwgaGFuZDIgPT09IFwibG9zZVwiKSB7XHJcbiAgICAgICAgICB0aGlzLm91dGNvbWUoXCJsb3NlXCIpO1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiRGVhbGVyIHdpbnMgb25lLCBwdXNoXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBtYWtlQmV0KCkge1xyXG4gICAgdmFyICR0b3RhbCA9ICQoXCIudG90YWxcIiksXHJcbiAgICAgICAgJGN1cnJlbnRCZXQgPSAkKFwiLmN1cnJlbnRCZXRcIiksXHJcbiAgICAgICAgZ2FtZSA9IHRoaXM7XHJcbiAgICAkdG90YWwudGV4dCh0aGlzLm1vbmV5KTtcclxuICAgICRjdXJyZW50QmV0LnRleHQodGhpcy5jdXJyZW50QmV0KTtcclxuICAgICQoXCIuYmV0LWJ0blwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcyhcImFkZDEwXCIpICYmIGdhbWUubW9uZXkgLSBnYW1lLmN1cnJlbnRCZXQgPj0gMTApIHtcclxuICAgICAgICBnYW1lLmN1cnJlbnRCZXQgKz0gMTA7XHJcbiAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgJCh0aGlzKS5oYXNDbGFzcyhcImFkZDUwXCIpICYmXHJcbiAgICAgICAgZ2FtZS5tb25leSAtIGdhbWUuY3VycmVudEJldCA+PSA1MFxyXG4gICAgICApIHtcclxuICAgICAgICBnYW1lLmN1cnJlbnRCZXQgKz0gNTA7XHJcbiAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgJCh0aGlzKS5oYXNDbGFzcyhcImFkZDEwMFwiKSAmJlxyXG4gICAgICAgIGdhbWUubW9uZXkgLSBnYW1lLmN1cnJlbnRCZXQgPj0gMTAwXHJcbiAgICAgICkge1xyXG4gICAgICAgIGdhbWUuY3VycmVudEJldCArPSAxMDA7XHJcbiAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgJCh0aGlzKS5oYXNDbGFzcyhcImFkZDUwMFwiKSAmJlxyXG4gICAgICAgIGdhbWUubW9uZXkgLSBnYW1lLmN1cnJlbnRCZXQgPj0gNTAwXHJcbiAgICAgICkge1xyXG4gICAgICAgIGdhbWUuY3VycmVudEJldCArPSA1MDA7XHJcbiAgICAgIH0gZWxzZSBpZiAoJCh0aGlzKS5oYXNDbGFzcyhcImFsbC1pblwiKSkge1xyXG4gICAgICAgIGdhbWUuY3VycmVudEJldCA9IGdhbWUubW9uZXk7XHJcbiAgICAgIH0gZWxzZSBpZiAoJCh0aGlzKS5oYXNDbGFzcyhcInJlc2V0XCIpKSB7XHJcbiAgICAgICAgZ2FtZS5jdXJyZW50QmV0ID0gMTA7XHJcbiAgICAgIH1cclxuICAgICAgJGN1cnJlbnRCZXQudGV4dChnYW1lLmN1cnJlbnRCZXQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBtb2RhbChtb2RhbFR5cGUpIHtcclxuICAgIGlmIChtb2RhbFR5cGUgPT09IFwiYmFua3J1cHRcIikge1xyXG4gICAgICAkKFwiLm1vZGFsLCAubW9kYWwtb3ZlcmxheVwiKS5yZW1vdmVDbGFzcyhcImhpZGVcIik7XHJcbiAgICAgICQoXCIubW9kYWwgLm1lc3NhZ2VcIikuaHRtbChcclxuICAgICAgICBcIllvdSd2ZSBsb3N0IGV2ZXJ5dGhpbmcuXCIgK1xyXG4gICAgICAgICAgXCI8YnIvPjxici8+XCIgK1xyXG4gICAgICAgICAgXCJHb29kIHRoaW5nIGl0J3Mgbm90IHJlYWwgbW9uZXkhXCJcclxuICAgICAgKTtcclxuICAgICAgJChcIi5tb2RhbC1ndXRzIGJ1dHRvblwiKS50ZXh0KFwiUGxheSBhZ2FpblwiKTtcclxuICAgICAgJChcIi5tb2RhbC1ndXRzIGJ1dHRvblwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoXCIubW9kYWwsIC5tb2RhbC1vdmVybGF5XCIpLmFkZENsYXNzKFwiaGlkZVwiKTtcclxuICAgICAgICAkKFwiLnRpdGxlLXNjcmVlblwiKS5zaG93KCk7XHJcbiAgICAgICAgZ2FtZS5yZXNldEdhbWUoKTtcclxuICAgICAgICBnYW1lLnJlc2V0TW9uZXkoKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2UgaWYgKG1vZGFsVHlwZSA9PT0gXCJoZWxwXCIpIHtcclxuICAgICAgLy8gZnV0dXJlIGdhbWUgZmVhdHVyZTogaW5zdHJ1Y3Rpb25zIGF2YWlsYWJsZSBpbiBoZWxwIG1vZGFsXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvdXRjb21lKHJlc3VsdCkge1xyXG4gICAgdGhpcy5wbGF5ZXJIYW5kLnBsYXlpbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuZGVhbGVySGFuZC5yZXZlYWxIb2xlKCk7XHJcbiAgICB0aGlzLmRlYWxlckhhbmQudXBkYXRlRGlzcGxheSh0aGlzLmRlYWxlckhhbmQuZ2V0UG9pbnRzKCkpO1xyXG4gICAgdGhpcy5wcmV2QmV0ID0gdGhpcy5jdXJyZW50QmV0O1xyXG4gICAgaWYgKHJlc3VsdCA9PT0gXCJibGFja2phY2tcIikge1xyXG4gICAgICB0aGlzLm1vbmV5ICs9IHRoaXMuY3VycmVudEJldCAqIDEuNTtcclxuICAgICAgdGhpcy5jaGFuZ2UgPSB0aGlzLmN1cnJlbnRCZXQgKiAxLjU7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChyZXN1bHQgPT09IFwid2luXCIpIHtcclxuICAgICAgdGhpcy5tb25leSArPSB0aGlzLmN1cnJlbnRCZXQ7XHJcbiAgICAgIHRoaXMuY2hhbmdlID0gdGhpcy5jdXJyZW50QmV0O1xyXG4gICAgfSBcclxuICAgIGVsc2UgaWYgKHJlc3VsdCA9PT0gXCJwdXNoXCIpIHtcclxuICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiUHVzaFwiKTtcclxuICAgICAgdGhpcy5tb25leSA9IHRoaXMubW9uZXk7XHJcbiAgICAgIHRoaXMuY2hhbmdlID0gMDtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHJlc3VsdCA9PT0gXCJsb3NlXCIpIHtcclxuICAgICAgaWYgKHRoaXMubW9uZXkgLSB0aGlzLmN1cnJlbnRCZXQgPj0gMTApIHtcclxuICAgICAgICB0aGlzLm1vbmV5IC09IHRoaXMuY3VycmVudEJldDtcclxuICAgICAgICB0aGlzLmNoYW5nZSA9IC10aGlzLmN1cnJlbnRCZXQ7XHJcbiAgICAgICAgLy8gZHJvcCB0aGUgYmV0IGFtb3VudCBkb3duIHRvIGVxdWFsIG1vbmV5IGFtb3VudCBvZiBsYXN0IGJldCB2YWx1ZSBpcyBncmVhdGVyIHRoYW4gdG90YWwgbW9uZXkgdmFsdWVcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50QmV0ID4gdGhpcy5tb25leSkge1xyXG4gICAgICAgICAgdGhpcy5jdXJyZW50QmV0ID0gdGhpcy5tb25leTtcclxuICAgICAgICAgICQoXCIuY3VycmVudEJldFwiKS50ZXh0KHRoaXMuY3VycmVudEJldCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IFxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICB0aGlzLm1vZGFsKFwiYmFua3J1cHRcIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuZW5kR2FtZU1vZGUoKTtcclxuICB9XHJcblxyXG4gIHJlc2V0R2FtZSgpIHtcclxuICAgIHRoaXMuZ2FtZURlY2sgPSBuZXcgRGVjaztcclxuICAgIHRoaXMuZGVhbGVySGFuZCA9IG5ldyBIYW5kKFwiZGVhbGVyXCIpO1xyXG4gICAgdGhpcy5wbGF5ZXJIYW5kID0gbmV3IEhhbmQoXCJwbGF5ZXJcIiwgMSk7XHJcbiAgICAkKFwiLm1lc3NhZ2VzXCIpLmVtcHR5KCk7XHJcbiAgICAkKFwiLnBsYXllci1oYW5kXCIpLmVtcHR5KCk7XHJcbiAgICAkKFwiLmRlYWxlci1oYW5kXCIpLmVtcHR5KCk7XHJcbiAgICAkKFwiLnBsYXllci1wb2ludHNcIikuZW1wdHkoKTtcclxuICAgICQoXCIuZGVhbGVyLXBvaW50c1wiKS5lbXB0eSgpO1xyXG4gICAgJChcIi5jaGFuZ2VcIikuZW1wdHkoKTtcclxuICAgICQoXCIucHJldkJldFwiKS5lbXB0eSgpO1xyXG4gIH1cclxuXHJcbiAgcmVzZXRNb25leSgpIHtcclxuICAgIHRoaXMubW9uZXkgPSA1MDA7XHJcbiAgICB0aGlzLmN1cnJlbnRCZXQgPSAxMDtcclxuICAgICQoXCIudG90YWxcIikudGV4dCh0aGlzLm1vbmV5KTtcclxuICAgICQoXCIuY3VycmVudEJldFwiKS50ZXh0KHRoaXMuY3VycmVudEJldCk7XHJcbiAgfVxyXG5cclxuICBzdGFuZChjYWxsZXIpIHtcclxuICAgIC8vIGlmIHNwbGl0dGluZywgZ2l2ZSBoYW5kMiBvcHBvcnR1bml0eSB0byBoaXRcclxuICAgIGlmICh0aGlzLnNwbGl0SW5QbGF5KSB7XHJcbiAgICAgIHRoaXMuc3BsaXRJblBsYXkgPSBmYWxzZTtcclxuICAgICAgdGhpcy5jdXJyZW50SGFuZCA9IFwiaGFuZDJcIjtcclxuICAgICAgJChcIiNoYW5kMVwiKS5yZW1vdmVDbGFzcyhcImN1cnJlbnRIYW5kXCIpO1xyXG4gICAgICAkKFwiI2hhbmQyXCIpLmFkZENsYXNzKFwiY3VycmVudEhhbmRcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0aGlzLmN1cnJlbnRIYW5kID09PSBcImhhbmQyXCIpIHtcclxuICAgICAgLy8gaWYgc3BsaXR0aW5nLCBjYWxjdWxhdGUgdGhlIG91dGNvbWUgb2YgYm90aCBvZiB0aGUgcGxheWVyJ3MgaGFuZHNcclxuICAgICAgdGhpcy5jdXJyZW50SGFuZCA9IFwiaGFuZDFcIjtcclxuICAgICAgdGhpcy5kZWFsZXJIYW5kLnJldmVhbEhvbGUoKTtcclxuICAgICAgd2hpbGUgKHRoaXMuZGVhbGVySGFuZC5nZXRQb2ludHMoKSA8IDE3KSB7XHJcbiAgICAgICAgdGhpcy5kZWFsT25lQ2FyZCh0aGlzLmRlYWxlckhhbmQpO1xyXG4gICAgICB9XHJcbiAgICAgIGxldCBkZWFsZXJQb2ludHMgPSB0aGlzLmRlYWxlckhhbmQuZ2V0UG9pbnRzKCk7XHJcbiAgICAgIHRoaXMuZGVhbGVySGFuZC51cGRhdGVEaXNwbGF5KGRlYWxlclBvaW50cyk7XHJcbiAgICAgIGlmIChkZWFsZXJQb2ludHMgPiAyMSkge1xyXG4gICAgICAgIHRoaXMucGxheWVySGFuZC5vdXRjb21lID0gXCJ3aW5cIjtcclxuICAgICAgICB0aGlzLnBsYXllckhhbmQyLm91dGNvbWUgPSBcIndpblwiO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZXZhbHVhdGVIYW5kKHRoaXMucGxheWVySGFuZCk7XHJcbiAgICAgICAgdGhpcy5ldmFsdWF0ZUhhbmQodGhpcy5wbGF5ZXJIYW5kMik7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5pbnZva2VPdXRjb21lKHRoaXMucGxheWVySGFuZCwgdGhpcy5wbGF5ZXJIYW5kMik7XHJcbiAgICB9IFxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHRoaXMuZGlzYWJsZSh0aGlzLiRoaXQsIHRoaXMuJHN0YW5kLCB0aGlzLiRkb3VibGVEb3duLCB0aGlzLiRzcGxpdCk7XHJcbiAgICAgICQoXCIjaGFuZDEsICNoYW5kMlwiKS5yZW1vdmVDbGFzcyhcImN1cnJlbnRIYW5kXCIpO1xyXG4gICAgICAvLyBpZiBzdGFuZCB3YXMgY2FsbGVkIGJ5IGNsaWNraW5nICdkb3VibGUgZG93bicsIGRvIGFkZGl0aW9uYWwgd29ya1xyXG4gICAgICBpZiAoY2FsbGVyID09PSBcImRvdWJsZS1kb3duXCIpIHtcclxuICAgICAgICB0aGlzLmJldCA9IHRoaXMuYmV0IC8gMjtcclxuICAgICAgICAkKFwiLmJldFwiKS50ZXh0KHRoaXMuYmV0KTtcclxuICAgICAgICB0aGlzLmRpc2FibGUodGhpcy4kZG91YmxlRG93bik7XHJcbiAgICAgIH1cclxuICAgICAgLy8gZGVhbGVyJ3MgdHVyblxyXG4gICAgICB0aGlzLmRlYWxlckhhbmQucmV2ZWFsSG9sZSgpO1xyXG4gICAgICB3aGlsZSAodGhpcy5kZWFsZXJIYW5kLmdldFBvaW50cygpIDwgMTcpIHtcclxuICAgICAgICB0aGlzLmRlYWxPbmVDYXJkKHRoaXMuZGVhbGVySGFuZCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMuZGVhbGVySGFuZC5nZXRQb2ludHMoKSA+IDIxKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiRGVhbGVyIGJ1c3RzXCIpO1xyXG4gICAgICAgIHRoaXMub3V0Y29tZShcIndpblwiKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICB0aGlzLmV2YWx1YXRlSGFuZCh0aGlzLnBsYXllckhhbmQpO1xyXG4gICAgICAgIHRoaXMuaW52b2tlT3V0Y29tZSh0aGlzLnBsYXllckhhbmQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzcGxpdCgpIHtcclxuICAgIHRoaXMuc3BsaXRJblBsYXkgPSB0cnVlO1xyXG4gICAgdGhpcy5kaXNhYmxlKHRoaXMuJHNwbGl0KTtcclxuICAgIHRoaXMucGxheWVySGFuZC4kd3JhcHBlci5hZGRDbGFzcyhcImN1cnJlbnRIYW5kXCIpO1xyXG5cclxuICAgIC8vIGRvdWJsZSBiZXQgYW5kIGRpc3BsYXkgaXRcclxuICAgIHRoaXMuY3VycmVudEJldCA9IHRoaXMuY3VycmVudEJldCAqIDI7XHJcbiAgICAkKFwiLmN1cnJlbnRCZXRcIikudGV4dCh0aGlzLmN1cnJlbnRCZXQpO1xyXG5cclxuICAgIC8vIHN0YXJ0IGFkZGl0aW9uYWwgaGFuZCBhbmQgbW92ZSBvbmUgY2FyZCBmcm9tIGhhbmQgMSB0byBoYW5kIDJcclxuICAgIHRoaXMuYWRqdXN0U3BhY2UoKTtcclxuICAgIHRoaXMucGxheWVySGFuZDIgPSBuZXcgSGFuZChcInBsYXllclwiLCAyKTtcclxuICAgIGxldCByZW1vdmVkQ2FyZCA9IHRoaXMucGxheWVySGFuZC5yZW1vdmVDYXJkKCk7XHJcbiAgICB0aGlzLnBsYXllckhhbmQyLmFkZENhcmQocmVtb3ZlZENhcmQuY2FyZCwgcmVtb3ZlZENhcmQuJGNhcmQpO1xyXG4gICAgdGhpcy5kZWFsT25lQ2FyZCh0aGlzLnBsYXllckhhbmQpO1xyXG4gICAgdGhpcy5kZWFsT25lQ2FyZCh0aGlzLnBsYXllckhhbmQyKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZU1lc3NhZ2UobWVzc2FnZSkge1xyXG4gICAgJChcIi5tZXNzYWdlc1wiKS5hcHBlbmQoYDxoMT4ke21lc3NhZ2V9PC9oMT5gKTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvZ2FtZS5qcyIsImltcG9ydCBDYXJkIGZyb20gXCIuL2NhcmRcIjtcclxuaW1wb3J0IEhhbmQgZnJvbSBcIi4vaGFuZFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVjayB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmNhcmRzID0gW107XHJcbiAgfVxyXG5cclxuICBkcmF3KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2FyZHMucG9wKCk7XHJcbiAgfVxyXG5cclxuICBnZW5lcmF0ZShudW1EZWNrcykge1xyXG4gICAgaWYgKCFudW1EZWNrcykge1xyXG4gICAgICBudW1EZWNrcyA9IDE7XHJcbiAgICB9XHJcbiAgICB3aGlsZSAobnVtRGVja3MgPiAwKSB7XHJcbiAgICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IDEzOyBpKyspIHtcclxuICAgICAgICB0aGlzLmNhcmRzLnB1c2gobmV3IENhcmQoaSwgXCJzcGFkZXNcIikpO1xyXG4gICAgICAgIHRoaXMuY2FyZHMucHVzaChuZXcgQ2FyZChpLCBcImRpYW1vbmRzXCIpKTtcclxuICAgICAgICB0aGlzLmNhcmRzLnB1c2gobmV3IENhcmQoaSwgXCJoZWFydHNcIikpO1xyXG4gICAgICAgIHRoaXMuY2FyZHMucHVzaChuZXcgQ2FyZChpLCBcImNsdWJzXCIpKTtcclxuICAgICAgfVxyXG4gICAgICBudW1EZWNrcy0tO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2h1ZmZsZSgpIHtcclxuICAgIGZvciAobGV0IGkgPSB0aGlzLmNhcmRzLmxlbmd0aCAtIDE7IGkgPiAwOyBpLS0pIHtcclxuICAgICAgY29uc3QgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChpICsgMSkpO1xyXG4gICAgICBbdGhpcy5jYXJkc1tpXV0gPSBbdGhpcy5jYXJkc1tqXV07XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2RlY2suanMiXSwic291cmNlUm9vdCI6IiJ9