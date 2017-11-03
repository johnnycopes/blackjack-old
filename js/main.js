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
      $(".playerHand-div").css("width", "100%"); // reset hand adjustment for mobile in case of 'split'
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
      $(".playerHand-div").css("width", "50%");
      var removedCard = this.playerHand.removeCard();
      this.playerHand2 = new _hand2.default("player", 2);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYmIyY2VjOWU0NDRiMmQ5NmFhYTUiLCJ3ZWJwYWNrOi8vLy4vanMvaGFuZC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jYXJkLmpzIiwid2VicGFjazovLy8uL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9nYW1lLmpzIiwid2VicGFjazovLy8uL2pzL2RlY2suanMiXSwibmFtZXMiOlsiSGFuZCIsIm93bmVyIiwiaGFuZE51bWJlciIsInNlbGVjdG9yIiwiJHdyYXBwZXIiLCIkIiwiJGhhbmQiLCIkcG9pbnRzIiwicGxheWluZyIsImNhcmRzIiwib3V0Y29tZSIsImNhcmQiLCIkY2FyZCIsInB1c2giLCJhcHBlbmQiLCJwb2ludCIsInRvdGFsIiwiYWNlcyIsInBvcCIsImZpbmQiLCJyZW1vdmUiLCJhdHRyIiwiZ2V0SW1hZ2VVcmwiLCJpbmRleCIsImNvbnRlbnQiLCJ0ZXh0IiwiQ2FyZCIsInN1aXQiLCJ2YWx1ZSIsImN1cnJlbnRHYW1lIiwibWFrZUJldCIsIm9uIiwicmVzZXRHYW1lIiwiZ2FtZURlY2siLCJnZW5lcmF0ZSIsImRlYWwiLCJoaXQiLCJzdGFuZCIsImRvdWJsZURvd24iLCJzcGxpdCIsIkdhbWUiLCJkZWFsZXJIYW5kIiwicGxheWVySGFuZCIsImN1cnJlbnRIYW5kIiwic3BsaXRJblBsYXkiLCJtb25leSIsImN1cnJlbnRCZXQiLCJjaGFuZ2UiLCIkZGVhbCIsIiRoaXQiLCIkc3RhbmQiLCIkZG91YmxlRG93biIsIiRzcGxpdCIsIiRjaGFuZ2UiLCJjbGFzc05hbWUiLCJzeW1ib2wiLCJNYXRoIiwiYWJzIiwiaGFuZCIsInNwZWNpYWwiLCJkcmF3IiwiYWRkQ2xhc3MiLCJhZGRDYXJkIiwidXBkYXRlRGlzcGxheSIsImdldFBvaW50cyIsImdhbWVNb2RlIiwic2h1ZmZsZSIsImRlYWxPbmVDYXJkIiwiZGVhbGVyUG9pbnRzIiwicGxheWVyUG9pbnRzIiwidXBkYXRlTWVzc2FnZSIsImVuYWJsZSIsImNhblNwbGl0IiwiZWxlbWVudHMiLCJlbGVtZW50IiwicHJldkJldCIsImFzc2Vzc0NoYW5nZSIsImRpc2FibGUiLCJzaG93IiwiaGlkZSIsImNzcyIsInJlbW92ZUNsYXNzIiwicGxheWVySGFuZDIiLCJoYW5kMSIsImxlbmd0aCIsImhhbmQyIiwiYmV0IiwiJHRvdGFsIiwiJGN1cnJlbnRCZXQiLCJnYW1lIiwiaGFzQ2xhc3MiLCJtb2RhbFR5cGUiLCJodG1sIiwicmVzZXRNb25leSIsInJlc3VsdCIsInJldmVhbEhvbGUiLCJtb2RhbCIsImVuZEdhbWVNb2RlIiwiZW1wdHkiLCJjYWxsZXIiLCJldmFsdWF0ZUhhbmQiLCJpbnZva2VPdXRjb21lIiwicmVtb3ZlZENhcmQiLCJyZW1vdmVDYXJkIiwibWVzc2FnZSIsIkRlY2siLCJudW1EZWNrcyIsImkiLCJqIiwiZmxvb3IiLCJyYW5kb20iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzdEQTs7Ozs7Ozs7SUFFcUJBLEk7QUFDbkIsZ0JBQVlDLEtBQVosRUFBbUJDLFVBQW5CLEVBQStCO0FBQUE7O0FBQzdCLFFBQUlDLGlCQUFKO0FBQ0EsUUFBSUYsVUFBVSxRQUFkLEVBQXdCO0FBQ3RCRSxpQkFBVyxTQUFYO0FBQ0QsS0FGRCxNQUdLLElBQUlGLFVBQVUsUUFBZCxF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WCxDQUFELENBRjRCO0FBRTdDLGFBQUtuRyxLQUFMLENBQVdrRyxDQUFYLENBRjZDO0FBRy9DO0FBQ0Y7Ozs7OztrQkE3QmtCRixJIiwiZmlsZSI6Ii4vanMvbWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGJiMmNlYzllNDQ0YjJkOTZhYWE1IiwiaW1wb3J0IENhcmQgZnJvbSBcIi4vY2FyZFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGFuZCB7XHJcbiAgY29uc3RydWN0b3Iob3duZXIsIGhhbmROdW1iZXIpIHtcclxuICAgIGxldCBzZWxlY3RvcjtcclxuICAgIGlmIChvd25lciA9PT0gJ2RlYWxlcicpIHtcclxuICAgICAgc2VsZWN0b3IgPSBcIiNkZWFsZXJcIjtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKG93bmVyID09PSAncGxheWVyJykge1xyXG4gICAgICBpZiAoaGFuZE51bWJlciA9PT0gMSkge1xyXG4gICAgICAgIHNlbGVjdG9yID0gXCIjaGFuZDFcIjtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmIChoYW5kTnVtYmVyID09PSAyKSB7XHJcbiAgICAgICAgc2VsZWN0b3IgPSBcIiNoYW5kMlwiO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLiR3cmFwcGVyID0gJChgJHtzZWxlY3Rvcn1gKTtcclxuICAgIHRoaXMuJGhhbmQgPSAkKGAke3NlbGVjdG9yfSAuaGFuZGApO1xyXG4gICAgdGhpcy4kcG9pbnRzID0gJChgJHtzZWxlY3Rvcn0gLnBvaW50c2ApO1xyXG4gICAgdGhpcy5wbGF5aW5nID0gZmFsc2U7XHJcbiAgICB0aGlzLmNhcmRzID0gW107XHJcbiAgICB0aGlzLm91dGNvbWU7XHJcbiAgfVxyXG5cclxuICBhZGRDYXJkKGNhcmQsICRjYXJkKSB7XHJcbiAgICB0aGlzLmNhcmRzLnB1c2goY2FyZCk7XHJcbiAgICB0aGlzLiRoYW5kLmFwcGVuZCgkY2FyZCk7XHJcbiAgfVxyXG5cclxuICBjYW5TcGxpdCgpIHtcclxuICAgIHJldHVybiB0aGlzLmNhcmRzWzBdLnBvaW50ID09PSB0aGlzLmNhcmRzWzFdLnBvaW50O1xyXG4gIH1cclxuXHJcbiAgZ2V0UG9pbnRzKCkge1xyXG4gICAgbGV0IHRvdGFsID0gMDtcclxuICAgIGxldCBhY2VzID0gMDtcclxuICAgIGZvciAobGV0IGNhcmQgb2YgdGhpcy5jYXJkcykge1xyXG4gICAgICBsZXQgcG9pbnQgPSBjYXJkLnBvaW50O1xyXG4gICAgICBpZiAocG9pbnQgPT09IDEpIHtcclxuICAgICAgICB0b3RhbCArPSAxMDtcclxuICAgICAgICBhY2VzKys7XHJcbiAgICAgIH0gXHJcbiAgICAgIGVsc2UgaWYgKHBvaW50ID4gMTApIHtcclxuICAgICAgICBwb2ludCA9IDEwO1xyXG4gICAgICB9XHJcbiAgICAgIHRvdGFsICs9IHBvaW50O1xyXG4gICAgICB3aGlsZSAodG90YWwgPiAyMSAmJiBhY2VzID4gMCkge1xyXG4gICAgICAgIHRvdGFsIC09IDEwO1xyXG4gICAgICAgIGFjZXMtLTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRvdGFsO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlQ2FyZCgpIHtcclxuICAgIGxldCBjYXJkID0gdGhpcy5jYXJkcy5wb3AoKTtcclxuICAgIGxldCAkY2FyZCA9IHRoaXMuJGhhbmQuZmluZChcImltZzpsYXN0LWNoaWxkXCIpLnJlbW92ZSgpO1xyXG4gICAgcmV0dXJuIHtjYXJkLCAkY2FyZH07XHJcbiAgfVxyXG5cclxuICByZXZlYWxIb2xlKCkge1xyXG4gICAgdGhpcy4kaGFuZC5maW5kKCdpbWc6Zmlyc3QtY2hpbGQnKS5hdHRyKCdzcmMnLCB0aGlzLmNhcmRzWzBdLmdldEltYWdlVXJsKCkpO1xyXG4gIH1cclxuXHJcbiAgc2VlQ2FyZChpbmRleCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2FyZHNbaW5kZXggLSAxXTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZURpc3BsYXkoY29udGVudCkge1xyXG4gICAgdGhpcy4kcG9pbnRzLnRleHQoY29udGVudCk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2hhbmQuanMiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJkIHtcclxuICBjb25zdHJ1Y3Rvcihwb2ludCwgc3VpdCkge1xyXG4gICAgdGhpcy5wb2ludCA9IHBvaW50O1xyXG4gICAgdGhpcy5zdWl0ID0gc3VpdDtcclxuICB9XHJcblxyXG4gIGdldEltYWdlVXJsKCkge1xyXG4gICAgbGV0IHZhbHVlID0gdGhpcy5wb2ludDtcclxuICAgIGlmICh0aGlzLnBvaW50ID09PSAxMSkge1xyXG4gICAgICB2YWx1ZSA9IFwiamFja1wiO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodGhpcy5wb2ludCA9PT0gMTIpIHtcclxuICAgICAgdmFsdWUgPSBcInF1ZWVuXCI7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0aGlzLnBvaW50ID09PSAxMykge1xyXG4gICAgICB2YWx1ZSA9IFwia2luZ1wiO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodGhpcy5wb2ludCA9PT0gMSkge1xyXG4gICAgICB2YWx1ZSA9IFwiYWNlXCI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYGltYWdlcy8ke3ZhbHVlfV9vZl8ke3RoaXMuc3VpdH0uc3ZnYDtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvY2FyZC5qcyIsImltcG9ydCBHYW1lIGZyb20gJy4vZ2FtZSc7XG5cbnZhciBjdXJyZW50R2FtZSA9IG5ldyBHYW1lO1xuXG5jdXJyZW50R2FtZS5tYWtlQmV0KCk7XG5cbiQoJy5kZWFsJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gIGN1cnJlbnRHYW1lLnJlc2V0R2FtZSgpO1xuICBjdXJyZW50R2FtZS5nYW1lRGVjay5nZW5lcmF0ZSgzKTtcbiAgY3VycmVudEdhbWUuZGVhbCgpO1xufSk7XG5cbiQoJy5oaXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgY3VycmVudEdhbWUuaGl0KCk7XG59KTtcblxuJCgnLnN0YW5kJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gIGN1cnJlbnRHYW1lLnN0YW5kKCk7XG59KTtcblxuJCgnLmRvdWJsZS1kb3duJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gIGN1cnJlbnRHYW1lLmRvdWJsZURvd24oKTtcbn0pO1xuXG4kKCcuc3BsaXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgY3VycmVudEdhbWUuc3BsaXQoKTtcbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvYXBwLmpzIiwiaW1wb3J0IEhhbmQgZnJvbSBcIi4vaGFuZFwiO1xyXG5pbXBvcnQgRGVjayBmcm9tIFwiLi9kZWNrXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuZ2FtZURlY2sgPSBuZXcgRGVjaztcclxuICAgIHRoaXMuZGVhbGVySGFuZCA9IG5ldyBIYW5kKCdkZWFsZXInKTtcclxuICAgIHRoaXMucGxheWVySGFuZCA9IG5ldyBIYW5kKCdwbGF5ZXInLCAxKTtcclxuICAgIHRoaXMuY3VycmVudEhhbmQgPSBcImhhbmQxXCI7XHJcbiAgICB0aGlzLnNwbGl0SW5QbGF5ID0gZmFsc2U7XHJcbiAgICB0aGlzLm1vbmV5ID0gNTAwO1xyXG4gICAgdGhpcy5jdXJyZW50QmV0ID0gMTA7XHJcbiAgICB0aGlzLmNoYW5nZTtcclxuICAgIFxyXG4gICAgdGhpcy4kZGVhbCA9ICQoXCIuZGVhbFwiKTtcclxuICAgIHRoaXMuJGhpdCA9ICQoXCIuaGl0XCIpO1xyXG4gICAgdGhpcy4kc3RhbmQgPSAkKFwiLnN0YW5kXCIpO1xyXG4gICAgdGhpcy4kZG91YmxlRG93biA9ICQoXCIuZG91YmxlLWRvd25cIik7XHJcbiAgICB0aGlzLiRzcGxpdCA9ICQoXCIuc3BsaXRcIik7XHJcbiAgICB0aGlzLiRjaGFuZ2UgPSAkKFwiLmNoYW5nZVwiKTtcclxuICB9XHJcblxyXG4gIGFzc2Vzc0NoYW5nZSgpIHtcclxuICAgIGxldCBjbGFzc05hbWUgPSBcIlwiO1xyXG4gICAgbGV0IHN5bWJvbCA9IFwiXCI7XHJcbiAgICBpZiAodGhpcy5jaGFuZ2UgPiAwKSB7XHJcbiAgICAgIGNsYXNzTmFtZSA9IFwicG9zaXRpdmVcIjtcclxuICAgICAgc3ltYm9sID0gXCIrXCI7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0aGlzLmNoYW5nZSA8IDApIHtcclxuICAgICAgY2xhc3NOYW1lID0gXCJuZWdhdGl2ZVwiO1xyXG4gICAgICBzeW1ib2wgPSBcIi1cIjtcclxuICAgIH1cclxuICAgIHRoaXMuJGNoYW5nZS5hcHBlbmQoYDxzcGFuIGNsYXNzPVwiJHtjbGFzc05hbWV9XCI+JHtzeW1ib2x9ICQke01hdGguYWJzKHRoaXMuY2hhbmdlKX08L3NwYW4+YCk7XHJcbiAgfVxyXG5cclxuICBkZWFsT25lQ2FyZChoYW5kLCBzcGVjaWFsKSB7XHJcbiAgICBsZXQgY2FyZCA9IHRoaXMuZ2FtZURlY2suZHJhdygpO1xyXG4gICAgbGV0ICRjYXJkID0gJChcIjxpbWcgLz5cIiwge1xyXG4gICAgICBcImNsYXNzXCI6IFwiY2FyZFwiLCBcclxuICAgICAgXCJzcmNcIjogYCR7Y2FyZC5nZXRJbWFnZVVybCgpfWBcclxuICAgIH0pO1xyXG4gICAgaWYgKHNwZWNpYWwgPT09IFwiaG9sZVwiKSB7XHJcbiAgICAgICRjYXJkLmF0dHIoJ3NyYycsIFwiaW1hZ2VzL2JhY2stc3VpdHMtcmVkLnN2Z1wiKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHNwZWNpYWwgPT09IFwiZG91YmxlLWRvd25cIikge1xyXG4gICAgICAkY2FyZC5hZGRDbGFzcygnY2FyZC1kZCcpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoc3BlY2lhbCA9PT0gXCJzcGxpdFwiKSB7XHJcbiAgICAgICRjYXJkLmFkZENsYXNzKCdzcGxpdCcpO1xyXG4gICAgfVxyXG4gICAgaGFuZC5hZGRDYXJkKGNhcmQsICRjYXJkKTtcclxuICAgIGhhbmQudXBkYXRlRGlzcGxheShoYW5kLmdldFBvaW50cygpKTtcclxuICAgIHJldHVybiBoYW5kLmdldFBvaW50cygpO1xyXG4gIH1cclxuXHJcbiAgZGVhbCgpIHtcclxuICAgIHRoaXMuZ2FtZU1vZGUoKTtcclxuICAgIHRoaXMucGxheWVySGFuZC5wbGF5aW5nID0gdHJ1ZTtcclxuXHJcbiAgICAvLyBzaHVmZmxlIGRlY2socykgYW5kIGRlYWwgY2FyZHNcclxuICAgIHRoaXMuZ2FtZURlY2suc2h1ZmZsZSgpO1xyXG4gICAgdGhpcy5kZWFsT25lQ2FyZCh0aGlzLmRlYWxlckhhbmQsIFwiaG9sZVwiKTtcclxuICAgIHRoaXMuZGVhbE9uZUNhcmQodGhpcy5wbGF5ZXJIYW5kKTtcclxuICAgIGxldCBkZWFsZXJQb2ludHMgPSB0aGlzLmRlYWxPbmVDYXJkKHRoaXMuZGVhbGVySGFuZCk7XHJcbiAgICBsZXQgcGxheWVyUG9pbnRzID0gdGhpcy5kZWFsT25lQ2FyZCh0aGlzLnBsYXllckhhbmQpO1xyXG5cclxuICAgIC8vIGNvbmNlYWwgZGVhbGVyIHRvdGFsIGFuZCBkaXNwbGF5IHVzZXIgdG90YWxcclxuICAgIHRoaXMuZGVhbGVySGFuZC51cGRhdGVEaXNwbGF5KFwiP1wiKTtcclxuXHJcbiAgICBpZiAoZGVhbGVyUG9pbnRzID09PSAyMSAmJiBwbGF5ZXJQb2ludHMgPT09IDIxKSB7XHJcbiAgICAgIHRoaXMub3V0Y29tZShcInB1c2hcIik7XHJcbiAgICAgIHRoaXMuZGVhbGVySGFuZC51cGRhdGVEaXNwbGF5KFwiQmxhY2tqYWNrXCIpO1xyXG4gICAgICB0aGlzLnBsYXllckhhbmQudXBkYXRlRGlzcGxheShcIkJMQUNLSkFDSywgSE9UIERBTU4hXCIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoZGVhbGVyUG9pbnRzID09PSAyMSkge1xyXG4gICAgICB0aGlzLm91dGNvbWUoXCJsb3NlXCIpO1xyXG4gICAgICB0aGlzLmRlYWxlckhhbmQudXBkYXRlRGlzcGxheShcIkJsYWNramFja1wiKTtcclxuICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiRGVhbGVyIHdpbnNcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChwbGF5ZXJQb2ludHMgPT09IDIxKSB7XHJcbiAgICAgIHRoaXMub3V0Y29tZShcImJsYWNramFja1wiKTtcclxuICAgICAgdGhpcy5kZWFsZXJIYW5kLnVwZGF0ZURpc3BsYXkoZGVhbGVyUG9pbnRzKTtcclxuICAgICAgdGhpcy5wbGF5ZXJIYW5kLnVwZGF0ZURpc3BsYXkoXCJCTEFDS0pBQ0ssIEhPVCBEQU1OIVwiKTtcclxuICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiWW91IHdpbiFcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0aGlzLm1vbmV5ID4gdGhpcy5jdXJyZW50QmV0ICogMikge1xyXG4gICAgICBpZiAocGxheWVyUG9pbnRzID09PSAxMSkgIHtcclxuICAgICAgICB0aGlzLmVuYWJsZSh0aGlzLiRkb3VibGVEb3duKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5wbGF5ZXJIYW5kLmNhblNwbGl0KCkpIHtcclxuICAgICAgICB0aGlzLmVuYWJsZSh0aGlzLiRzcGxpdCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRpc2FibGUoLi4uZWxlbWVudHMpIHtcclxuICAgIGZvciAobGV0IGVsZW1lbnQgb2YgZWxlbWVudHMpIHtcclxuICAgICAgZWxlbWVudC5hdHRyKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkb3VibGVEb3duKCkge1xyXG4gICAgLy8gZG91YmxlIGJldCBhbmQgZGlzcGxheSBpdFxyXG4gICAgdGhpcy5jdXJyZW50QmV0ICo9IDI7XHJcbiAgICAkKFwiLmN1cnJlbnRCZXRcIikudGV4dCh0aGlzLmN1cnJlbnRCZXQpO1xyXG4gICAgLy8gZGVhbCB0aGUgcGxheWVyIG9uZSBtb3JlIGNhcmQgYW5kIHRoZW4gbW92ZSBvbiB0byB0aGUgZGVhbGVyJ3MgdHVyblxyXG4gICAgdGhpcy5kZWFsT25lQ2FyZCh0aGlzLnBsYXllckhhbmQsIFwiZG91YmxlLWRvd25cIik7XHJcbiAgICB0aGlzLnN0YW5kKFwiZG91YmxlLWRvd25cIik7XHJcbiAgfVxyXG5cclxuICBlbmFibGUoLi4uZWxlbWVudHMpIHtcclxuICAgIGZvciAobGV0IGVsZW1lbnQgb2YgZWxlbWVudHMpIHtcclxuICAgICAgZWxlbWVudC5hdHRyKFwiZGlzYWJsZWRcIiwgZmFsc2UpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZW5kR2FtZU1vZGUoKSB7XHJcbiAgICAkKFwiLnRvdGFsXCIpLnRleHQodGhpcy5tb25leSk7XHJcbiAgICAkKFwiLnByZXZCZXRcIikuYXBwZW5kKGA8c3Bhbj4kJHt0aGlzLnByZXZCZXR9PC9zcGFuPmApO1xyXG4gICAgdGhpcy5hc3Nlc3NDaGFuZ2UoKTtcclxuICAgIHRoaXMuZW5hYmxlKHRoaXMuJGRlYWwpO1xyXG4gICAgdGhpcy5kaXNhYmxlKHRoaXMuJGhpdCwgdGhpcy4kc3RhbmQpO1xyXG4gICAgJChcIi5iZXR0aW5nIC5idXR0b25zXCIpLnNob3coKTtcclxuICB9XHJcblxyXG4gIGV2YWx1YXRlSGFuZChoYW5kKSB7XHJcbiAgICBsZXQgZGVhbGVyUG9pbnRzID0gdGhpcy5kZWFsZXJIYW5kLmdldFBvaW50cygpO1xyXG4gICAgbGV0IHBsYXllclBvaW50cyA9IGhhbmQuZ2V0UG9pbnRzKCk7XHJcbiAgICBpZiAoZGVhbGVyUG9pbnRzID4gMjEgfHwgcGxheWVyUG9pbnRzID4gZGVhbGVyUG9pbnRzKSB7XHJcbiAgICAgIGhhbmQub3V0Y29tZSA9IFwid2luXCI7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChwbGF5ZXJQb2ludHMgPCBkZWFsZXJQb2ludHMpIHtcclxuICAgICAgaGFuZC5vdXRjb21lID0gXCJsb3NlXCI7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgaGFuZC5vdXRjb21lID0gXCJwdXNoXCI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnYW1lTW9kZSgpIHtcclxuICAgICQoXCIudGl0bGUtc2NyZWVuXCIpLmhpZGUoKTtcclxuICAgICQoXCIucGxheWVySGFuZC1kaXZcIikuY3NzKFwid2lkdGhcIiwgXCIxMDAlXCIpOyAvLyByZXNldCBoYW5kIGFkanVzdG1lbnQgZm9yIG1vYmlsZSBpbiBjYXNlIG9mICdzcGxpdCdcclxuICAgIHRoaXMuZW5hYmxlKHRoaXMuJGhpdCwgdGhpcy4kc3RhbmQpO1xyXG4gICAgdGhpcy5kaXNhYmxlKHRoaXMuJGRlYWwpO1xyXG4gICAgJChcIi5iZXR0aW5nIC5idXR0b25zXCIpLmhpZGUoKTtcclxuICB9XHJcblxyXG4gIGhpdCgpIHtcclxuICAgIHRoaXMuZGlzYWJsZSh0aGlzLiRkb3VibGVEb3duLCB0aGlzLiRzcGxpdCk7XHJcbiAgICBpZiAodGhpcy5jdXJyZW50SGFuZCA9PT0gXCJoYW5kMVwiKSB7XHJcbiAgICAgIGlmICghdGhpcy5zcGxpdEluUGxheSkge1xyXG4gICAgICAgIGxldCBwbGF5ZXJQb2ludHMgPSB0aGlzLmRlYWxPbmVDYXJkKHRoaXMucGxheWVySGFuZCk7XHJcbiAgICAgICAgaWYgKHBsYXllclBvaW50cyA+IDIxKSB7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJZb3UgYnVzdFwiKTtcclxuICAgICAgICAgIHRoaXMub3V0Y29tZShcImxvc2VcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgeyAvLyBzcGxpdCBpcyBpbiBwbGF5XHJcbiAgICAgICAgbGV0IHBsYXllclBvaW50cyA9IHRoaXMuZGVhbE9uZUNhcmQodGhpcy5wbGF5ZXJIYW5kLCBcInNwbGl0XCIpO1xyXG4gICAgICAgIGlmIChwbGF5ZXJQb2ludHMgPiAyMSkge1xyXG4gICAgICAgICAgdGhpcy5zcGxpdEluUGxheSA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5jdXJyZW50SGFuZCA9IFwiaGFuZDJcIjtcclxuICAgICAgICAgICQoXCIjaGFuZDFcIikucmVtb3ZlQ2xhc3MoXCJjdXJyZW50SGFuZFwiKTtcclxuICAgICAgICAgICQoXCIjaGFuZDJcIikuYWRkQ2xhc3MoXCJjdXJyZW50SGFuZFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXMuY3VycmVudEhhbmQgPT09IFwiaGFuZDJcIikge1xyXG4gICAgICBsZXQgcGxheWVyUG9pbnRzID0gdGhpcy5kZWFsT25lQ2FyZCh0aGlzLnBsYXllckhhbmQyLCBcInNwbGl0XCIpO1xyXG4gICAgICBpZiAocGxheWVyUG9pbnRzID4gMjEpIHtcclxuICAgICAgICAkKFwiI2hhbmQyXCIpLnJlbW92ZUNsYXNzKFwiY3VycmVudEhhbmRcIik7XHJcbiAgICAgICAgdGhpcy5zdGFuZCgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpbnZva2VPdXRjb21lKC4uLmhhbmRzKSB7XHJcbiAgICBsZXQgaGFuZDEgPSBoYW5kc1swXTtcclxuICAgIGlmIChoYW5kcy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgaWYgKGhhbmQxLm91dGNvbWUgPT09IFwid2luXCIpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJZb3Ugd2luIVwiKTtcclxuICAgICAgICB0aGlzLm91dGNvbWUoXCJ3aW5cIik7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAoaGFuZDEub3V0Y29tZSA9PT0gXCJsb3NlXCIpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJEZWFsZXIgd2luc1wiKTtcclxuICAgICAgICB0aGlzLm91dGNvbWUoXCJsb3NlXCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHRoaXMub3V0Y29tZShcInB1c2hcIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGhhbmRzLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICBsZXQgaGFuZDIgPSBoYW5kc1sxXTtcclxuICAgICAgaWYgKGhhbmQxID09PSBoYW5kMikge1xyXG4gICAgICAgIGlmIChoYW5kMSA9PT0gXCJibGFja2phY2tcIiAmJiBoYW5kMiA9PT0gXCJibGFja2phY2tcIikge1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiVFdPIEJMQUNLSkFDS1MhISFcIik7XHJcbiAgICAgICAgICB0aGlzLm91dGNvbWUoXCJibGFja2phY2tcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGhhbmQxID09PSBcIndpblwiICYmIGhhbmQyID09PSBcIndpblwiKSB7XHJcbiAgICAgICAgICB0aGlzLm91dGNvbWUoXCJ3aW5cIik7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJZb3Ugd2luIGJvdGghXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChoYW5kMSA9PT0gXCJsb3NlXCIgJiYgaGFuZDIgPT09IFwibG9zZVwiKSB7XHJcbiAgICAgICAgICB0aGlzLm91dGNvbWUoXCJsb3NlXCIpO1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiRGVhbGVyIHdpbnMgYm90aFwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5vdXRjb21lKFwicHVzaFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50QmV0IC89IDI7XHJcbiAgICAgICAgaWYgKGhhbmQxID09PSBcImJsYWNramFja1wiIHx8IGhhbmQyID09PSBcImJsYWNramFja1wiKSB7XHJcbiAgICAgICAgICAvLyBjYWxjdWxhdGUgY29tYmluZWQgb3V0Y29tZXMgYmVmb3JlIGNhbGxpbmcgdGhlIG91dGNvbWUgbWV0aG9kXHJcbiAgICAgICAgICBsZXQgYmV0ID0gY3VycmVudEJldDtcclxuICAgICAgICAgIHRoaXMuY3VycmVudEJldCAqPSAxLjU7XHJcbiAgICAgICAgICBpZiAoaGFuZDEgPT09IFwid2luXCIgfHwgaGFuZDIgPT09IFwid2luXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5vdXRjb21lKFwid2luXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRCZXQgKz0gYmV0O1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJZb3Ugd2luIGJvdGghXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZSBpZiAoaGFuZDEgPT09IFwibG9zZVwiIHx8IGhhbmQyID09PSBcImxvc2VcIikge1xyXG4gICAgICAgICAgICB0aGlzLm91dGNvbWUoXCJ3aW5cIik7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEJldCAtPSBiZXQ7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIllvdSBhbmQgZGVhbGVyIGVhY2ggd2luIG9uZVwiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm91dGNvbWUoXCJ3aW5cIik7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIllvdSB3aW4gb25lLCBwdXNoXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChoYW5kMSA9PT0gXCJ3aW5cIiB8fCBoYW5kMiA9PT0gXCJ3aW5cIikge1xyXG4gICAgICAgICAgaWYgKGhhbmQxID09PSBcInB1c2hcIiB8fCBoYW5kMiA9PT0gXCJwdXNoXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5vdXRjb21lKFwid2luXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJZb3Ugd2luIG9uZSwgcHVzaFwiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm91dGNvbWUoXCJwdXNoXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChoYW5kMSA9PT0gXCJsb3NlXCIgfHwgaGFuZDIgPT09IFwibG9zZVwiKSB7XHJcbiAgICAgICAgICB0aGlzLm91dGNvbWUoXCJsb3NlXCIpO1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiRGVhbGVyIHdpbnMgb25lLCBwdXNoXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBtYWtlQmV0KCkge1xyXG4gICAgdmFyICR0b3RhbCA9ICQoXCIudG90YWxcIiksXHJcbiAgICAgICAgJGN1cnJlbnRCZXQgPSAkKFwiLmN1cnJlbnRCZXRcIiksXHJcbiAgICAgICAgZ2FtZSA9IHRoaXM7XHJcbiAgICAkdG90YWwudGV4dCh0aGlzLm1vbmV5KTtcclxuICAgICRjdXJyZW50QmV0LnRleHQodGhpcy5jdXJyZW50QmV0KTtcclxuICAgICQoXCIuYmV0LWJ0blwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcyhcImFkZDEwXCIpICYmIGdhbWUubW9uZXkgLSBnYW1lLmN1cnJlbnRCZXQgPj0gMTApIHtcclxuICAgICAgICBnYW1lLmN1cnJlbnRCZXQgKz0gMTA7XHJcbiAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgJCh0aGlzKS5oYXNDbGFzcyhcImFkZDUwXCIpICYmXHJcbiAgICAgICAgZ2FtZS5tb25leSAtIGdhbWUuY3VycmVudEJldCA+PSA1MFxyXG4gICAgICApIHtcclxuICAgICAgICBnYW1lLmN1cnJlbnRCZXQgKz0gNTA7XHJcbiAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgJCh0aGlzKS5oYXNDbGFzcyhcImFkZDEwMFwiKSAmJlxyXG4gICAgICAgIGdhbWUubW9uZXkgLSBnYW1lLmN1cnJlbnRCZXQgPj0gMTAwXHJcbiAgICAgICkge1xyXG4gICAgICAgIGdhbWUuY3VycmVudEJldCArPSAxMDA7XHJcbiAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgJCh0aGlzKS5oYXNDbGFzcyhcImFkZDUwMFwiKSAmJlxyXG4gICAgICAgIGdhbWUubW9uZXkgLSBnYW1lLmN1cnJlbnRCZXQgPj0gNTAwXHJcbiAgICAgICkge1xyXG4gICAgICAgIGdhbWUuY3VycmVudEJldCArPSA1MDA7XHJcbiAgICAgIH0gZWxzZSBpZiAoJCh0aGlzKS5oYXNDbGFzcyhcImFsbC1pblwiKSkge1xyXG4gICAgICAgIGdhbWUuY3VycmVudEJldCA9IGdhbWUubW9uZXk7XHJcbiAgICAgIH0gZWxzZSBpZiAoJCh0aGlzKS5oYXNDbGFzcyhcInJlc2V0XCIpKSB7XHJcbiAgICAgICAgZ2FtZS5jdXJyZW50QmV0ID0gMTA7XHJcbiAgICAgIH1cclxuICAgICAgJGN1cnJlbnRCZXQudGV4dChnYW1lLmN1cnJlbnRCZXQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBtb2RhbChtb2RhbFR5cGUpIHtcclxuICAgIGlmIChtb2RhbFR5cGUgPT09IFwiYmFua3J1cHRcIikge1xyXG4gICAgICAkKFwiLm1vZGFsLCAubW9kYWwtb3ZlcmxheVwiKS5yZW1vdmVDbGFzcyhcImhpZGVcIik7XHJcbiAgICAgICQoXCIubW9kYWwgLm1lc3NhZ2VcIikuaHRtbChcclxuICAgICAgICBcIllvdSd2ZSBsb3N0IGV2ZXJ5dGhpbmcuXCIgK1xyXG4gICAgICAgICAgXCI8YnIvPjxici8+XCIgK1xyXG4gICAgICAgICAgXCJHb29kIHRoaW5nIGl0J3Mgbm90IHJlYWwgbW9uZXkhXCJcclxuICAgICAgKTtcclxuICAgICAgJChcIi5tb2RhbC1ndXRzIGJ1dHRvblwiKS50ZXh0KFwiUGxheSBhZ2FpblwiKTtcclxuICAgICAgJChcIi5tb2RhbC1ndXRzIGJ1dHRvblwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoXCIubW9kYWwsIC5tb2RhbC1vdmVybGF5XCIpLmFkZENsYXNzKFwiaGlkZVwiKTtcclxuICAgICAgICAkKFwiLnRpdGxlLXNjcmVlblwiKS5zaG93KCk7XHJcbiAgICAgICAgZ2FtZS5yZXNldEdhbWUoKTtcclxuICAgICAgICBnYW1lLnJlc2V0TW9uZXkoKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2UgaWYgKG1vZGFsVHlwZSA9PT0gXCJoZWxwXCIpIHtcclxuICAgICAgLy8gZnV0dXJlIGdhbWUgZmVhdHVyZTogaW5zdHJ1Y3Rpb25zIGF2YWlsYWJsZSBpbiBoZWxwIG1vZGFsXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvdXRjb21lKHJlc3VsdCkge1xyXG4gICAgdGhpcy5wbGF5ZXJIYW5kLnBsYXlpbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuZGVhbGVySGFuZC5yZXZlYWxIb2xlKCk7XHJcbiAgICB0aGlzLmRlYWxlckhhbmQudXBkYXRlRGlzcGxheSh0aGlzLmRlYWxlckhhbmQuZ2V0UG9pbnRzKCkpO1xyXG4gICAgdGhpcy5wcmV2QmV0ID0gdGhpcy5jdXJyZW50QmV0O1xyXG4gICAgaWYgKHJlc3VsdCA9PT0gXCJibGFja2phY2tcIikge1xyXG4gICAgICB0aGlzLm1vbmV5ICs9IHRoaXMuY3VycmVudEJldCAqIDEuNTtcclxuICAgICAgdGhpcy5jaGFuZ2UgPSB0aGlzLmN1cnJlbnRCZXQgKiAxLjU7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChyZXN1bHQgPT09IFwid2luXCIpIHtcclxuICAgICAgdGhpcy5tb25leSArPSB0aGlzLmN1cnJlbnRCZXQ7XHJcbiAgICAgIHRoaXMuY2hhbmdlID0gdGhpcy5jdXJyZW50QmV0O1xyXG4gICAgfSBcclxuICAgIGVsc2UgaWYgKHJlc3VsdCA9PT0gXCJwdXNoXCIpIHtcclxuICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiUHVzaFwiKTtcclxuICAgICAgdGhpcy5tb25leSA9IHRoaXMubW9uZXk7XHJcbiAgICAgIHRoaXMuY2hhbmdlID0gMDtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHJlc3VsdCA9PT0gXCJsb3NlXCIpIHtcclxuICAgICAgaWYgKHRoaXMubW9uZXkgLSB0aGlzLmN1cnJlbnRCZXQgPj0gMTApIHtcclxuICAgICAgICB0aGlzLm1vbmV5IC09IHRoaXMuY3VycmVudEJldDtcclxuICAgICAgICB0aGlzLmNoYW5nZSA9IC10aGlzLmN1cnJlbnRCZXQ7XHJcbiAgICAgICAgLy8gZHJvcCB0aGUgYmV0IGFtb3VudCBkb3duIHRvIGVxdWFsIG1vbmV5IGFtb3VudCBvZiBsYXN0IGJldCB2YWx1ZSBpcyBncmVhdGVyIHRoYW4gdG90YWwgbW9uZXkgdmFsdWVcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50QmV0ID4gdGhpcy5tb25leSkge1xyXG4gICAgICAgICAgdGhpcy5jdXJyZW50QmV0ID0gdGhpcy5tb25leTtcclxuICAgICAgICAgICQoXCIuY3VycmVudEJldFwiKS50ZXh0KHRoaXMuY3VycmVudEJldCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IFxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICB0aGlzLm1vZGFsKFwiYmFua3J1cHRcIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuZW5kR2FtZU1vZGUoKTtcclxuICB9XHJcblxyXG4gIHJlc2V0R2FtZSgpIHtcclxuICAgIHRoaXMuZ2FtZURlY2sgPSBuZXcgRGVjaztcclxuICAgIHRoaXMuZGVhbGVySGFuZCA9IG5ldyBIYW5kKFwiZGVhbGVyXCIpO1xyXG4gICAgdGhpcy5wbGF5ZXJIYW5kID0gbmV3IEhhbmQoXCJwbGF5ZXJcIiwgMSk7XHJcbiAgICAkKFwiLm1lc3NhZ2VzXCIpLmVtcHR5KCk7XHJcbiAgICAkKFwiLnBsYXllci1oYW5kXCIpLmVtcHR5KCk7XHJcbiAgICAkKFwiLmRlYWxlci1oYW5kXCIpLmVtcHR5KCk7XHJcbiAgICAkKFwiLnBsYXllci1wb2ludHNcIikuZW1wdHkoKTtcclxuICAgICQoXCIuZGVhbGVyLXBvaW50c1wiKS5lbXB0eSgpO1xyXG4gICAgJChcIi5jaGFuZ2VcIikuZW1wdHkoKTtcclxuICAgICQoXCIucHJldkJldFwiKS5lbXB0eSgpO1xyXG4gIH1cclxuXHJcbiAgcmVzZXRNb25leSgpIHtcclxuICAgIHRoaXMubW9uZXkgPSA1MDA7XHJcbiAgICB0aGlzLmN1cnJlbnRCZXQgPSAxMDtcclxuICAgICQoXCIudG90YWxcIikudGV4dCh0aGlzLm1vbmV5KTtcclxuICAgICQoXCIuY3VycmVudEJldFwiKS50ZXh0KHRoaXMuY3VycmVudEJldCk7XHJcbiAgfVxyXG5cclxuICBzdGFuZChjYWxsZXIpIHtcclxuICAgIC8vIGlmIHNwbGl0dGluZywgZ2l2ZSBoYW5kMiBvcHBvcnR1bml0eSB0byBoaXRcclxuICAgIGlmICh0aGlzLnNwbGl0SW5QbGF5KSB7XHJcbiAgICAgIHRoaXMuc3BsaXRJblBsYXkgPSBmYWxzZTtcclxuICAgICAgdGhpcy5jdXJyZW50SGFuZCA9IFwiaGFuZDJcIjtcclxuICAgICAgJChcIiNoYW5kMVwiKS5yZW1vdmVDbGFzcyhcImN1cnJlbnRIYW5kXCIpO1xyXG4gICAgICAkKFwiI2hhbmQyXCIpLmFkZENsYXNzKFwiY3VycmVudEhhbmRcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0aGlzLmN1cnJlbnRIYW5kID09PSBcImhhbmQyXCIpIHtcclxuICAgICAgLy8gaWYgc3BsaXR0aW5nLCBjYWxjdWxhdGUgdGhlIG91dGNvbWUgb2YgYm90aCBvZiB0aGUgcGxheWVyJ3MgaGFuZHNcclxuICAgICAgdGhpcy5jdXJyZW50SGFuZCA9IFwiaGFuZDFcIjtcclxuICAgICAgdGhpcy5kZWFsZXJIYW5kLnJldmVhbEhvbGUoKTtcclxuICAgICAgd2hpbGUgKHRoaXMuZGVhbGVySGFuZC5nZXRQb2ludHMoKSA8IDE3KSB7XHJcbiAgICAgICAgdGhpcy5kZWFsT25lQ2FyZCh0aGlzLmRlYWxlckhhbmQpO1xyXG4gICAgICB9XHJcbiAgICAgIGxldCBkZWFsZXJQb2ludHMgPSB0aGlzLmRlYWxlckhhbmQuZ2V0UG9pbnRzKCk7XHJcbiAgICAgIHRoaXMuZGVhbGVySGFuZC51cGRhdGVEaXNwbGF5KGRlYWxlclBvaW50cyk7XHJcbiAgICAgIGlmIChkZWFsZXJQb2ludHMgPiAyMSkge1xyXG4gICAgICAgIHRoaXMucGxheWVySGFuZC5vdXRjb21lID0gXCJ3aW5cIjtcclxuICAgICAgICB0aGlzLnBsYXllckhhbmQyLm91dGNvbWUgPSBcIndpblwiO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZXZhbHVhdGVIYW5kKHRoaXMucGxheWVySGFuZCk7XHJcbiAgICAgICAgdGhpcy5ldmFsdWF0ZUhhbmQodGhpcy5wbGF5ZXJIYW5kMik7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5pbnZva2VPdXRjb21lKHRoaXMucGxheWVySGFuZCwgdGhpcy5wbGF5ZXJIYW5kMik7XHJcbiAgICB9IFxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHRoaXMuZGlzYWJsZSh0aGlzLiRoaXQsIHRoaXMuJHN0YW5kLCB0aGlzLiRkb3VibGVEb3duLCB0aGlzLiRzcGxpdCk7XHJcbiAgICAgICQoXCIjaGFuZDEsICNoYW5kMlwiKS5yZW1vdmVDbGFzcyhcImN1cnJlbnRIYW5kXCIpO1xyXG4gICAgICAvLyBpZiBzdGFuZCB3YXMgY2FsbGVkIGJ5IGNsaWNraW5nICdkb3VibGUgZG93bicsIGRvIGFkZGl0aW9uYWwgd29ya1xyXG4gICAgICBpZiAoY2FsbGVyID09PSBcImRvdWJsZS1kb3duXCIpIHtcclxuICAgICAgICB0aGlzLmJldCA9IHRoaXMuYmV0IC8gMjtcclxuICAgICAgICAkKFwiLmJldFwiKS50ZXh0KHRoaXMuYmV0KTtcclxuICAgICAgICB0aGlzLmRpc2FibGUodGhpcy4kZG91YmxlRG93bik7XHJcbiAgICAgIH1cclxuICAgICAgLy8gZGVhbGVyJ3MgdHVyblxyXG4gICAgICB0aGlzLmRlYWxlckhhbmQucmV2ZWFsSG9sZSgpO1xyXG4gICAgICB3aGlsZSAodGhpcy5kZWFsZXJIYW5kLmdldFBvaW50cygpIDwgMTcpIHtcclxuICAgICAgICB0aGlzLmRlYWxPbmVDYXJkKHRoaXMuZGVhbGVySGFuZCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMuZGVhbGVySGFuZC5nZXRQb2ludHMoKSA+IDIxKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiRGVhbGVyIGJ1c3RzXCIpO1xyXG4gICAgICAgIHRoaXMub3V0Y29tZShcIndpblwiKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICB0aGlzLmV2YWx1YXRlSGFuZCh0aGlzLnBsYXllckhhbmQpO1xyXG4gICAgICAgIHRoaXMuaW52b2tlT3V0Y29tZSh0aGlzLnBsYXllckhhbmQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzcGxpdCgpIHtcclxuICAgIHRoaXMuc3BsaXRJblBsYXkgPSB0cnVlO1xyXG4gICAgdGhpcy5kaXNhYmxlKHRoaXMuJHNwbGl0KTtcclxuICAgIHRoaXMucGxheWVySGFuZC4kd3JhcHBlci5hZGRDbGFzcyhcImN1cnJlbnRIYW5kXCIpO1xyXG4gICAgLy8gZG91YmxlIGJldCBhbmQgZGlzcGxheSBpdFxyXG4gICAgdGhpcy5jdXJyZW50QmV0ID0gdGhpcy5jdXJyZW50QmV0ICogMjtcclxuICAgICQoXCIuY3VycmVudEJldFwiKS50ZXh0KHRoaXMuY3VycmVudEJldCk7XHJcbiAgICAvLyBzdGFydCBhZGRpdGlvbmFsIGhhbmQgYW5kIG1vdmUgb25lIGNhcmQgZnJvbSBoYW5kIDEgdG8gaGFuZCAyXHJcbiAgICAkKFwiLnBsYXllckhhbmQtZGl2XCIpLmNzcyhcIndpZHRoXCIsIFwiNTAlXCIpO1xyXG4gICAgbGV0IHJlbW92ZWRDYXJkID0gdGhpcy5wbGF5ZXJIYW5kLnJlbW92ZUNhcmQoKTtcclxuICAgIHRoaXMucGxheWVySGFuZDIgPSBuZXcgSGFuZChcInBsYXllclwiLCAyKTtcclxuICAgIHRoaXMucGxheWVySGFuZDIuYWRkQ2FyZChyZW1vdmVkQ2FyZC5jYXJkLCByZW1vdmVkQ2FyZC4kY2FyZCk7XHJcbiAgICB0aGlzLmRlYWxPbmVDYXJkKHRoaXMucGxheWVySGFuZCk7XHJcbiAgICB0aGlzLmRlYWxPbmVDYXJkKHRoaXMucGxheWVySGFuZDIpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlTWVzc2FnZShtZXNzYWdlKSB7XHJcbiAgICAkKFwiLm1lc3NhZ2VzXCIpLmFwcGVuZChgPGgxPiR7bWVzc2FnZX08L2gxPmApO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9nYW1lLmpzIiwiaW1wb3J0IENhcmQgZnJvbSBcIi4vY2FyZFwiO1xyXG5pbXBvcnQgSGFuZCBmcm9tIFwiLi9oYW5kXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZWNrIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuY2FyZHMgPSBbXTtcclxuICB9XHJcblxyXG4gIGRyYXcoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jYXJkcy5wb3AoKTtcclxuICB9XHJcblxyXG4gIGdlbmVyYXRlKG51bURlY2tzKSB7XHJcbiAgICBpZiAoIW51bURlY2tzKSB7XHJcbiAgICAgIG51bURlY2tzID0gMTtcclxuICAgIH1cclxuICAgIHdoaWxlIChudW1EZWNrcyA+IDApIHtcclxuICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gMTM7IGkrKykge1xyXG4gICAgICAgIHRoaXMuY2FyZHMucHVzaChuZXcgQ2FyZChpLCBcInNwYWRlc1wiKSk7XHJcbiAgICAgICAgdGhpcy5jYXJkcy5wdXNoKG5ldyBDYXJkKGksIFwiZGlhbW9uZHNcIikpO1xyXG4gICAgICAgIHRoaXMuY2FyZHMucHVzaChuZXcgQ2FyZChpLCBcImhlYXJ0c1wiKSk7XHJcbiAgICAgICAgdGhpcy5jYXJkcy5wdXNoKG5ldyBDYXJkKGksIFwiY2x1YnNcIikpO1xyXG4gICAgICB9XHJcbiAgICAgIG51bURlY2tzLS07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzaHVmZmxlKCkge1xyXG4gICAgZm9yIChsZXQgaSA9IHRoaXMuY2FyZHMubGVuZ3RoIC0gMTsgaSA+IDA7IGktLSkge1xyXG4gICAgICBjb25zdCBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGkgKyAxKSk7XHJcbiAgICAgIFt0aGlzLmNhcmRzW2ldXSA9IFt0aGlzLmNhcmRzW2pdXTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvZGVjay5qcyJdLCJzb3VyY2VSb290IjoiIn0=