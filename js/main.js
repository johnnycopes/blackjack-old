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
      } else if (hand === 2) {
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
      return this.cards.pop();
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
    }
  }, {
    key: "deal",
    value: function deal() {
      this.gameMode();
      this.playerHand.playing = true;

      // shuffle deck(s) and deal cards
      // this.gameDeck.shuffle();
      this.dealOneCard(this.dealerHand, "hole");
      this.dealOneCard(this.playerHand);
      this.dealOneCard(this.dealerHand);
      this.dealOneCard(this.playerHand);

      // conceal dealer total and display user total
      var dealerPoints = this.dealerHand.getPoints();
      var playerPoints = this.playerHand.getPoints();
      this.dealerHand.updateDisplay("?");
      this.playerHand.updateDisplay(playerPoints);

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
      this.playerHand.updateDisplay(this.playerHand.getPoints());
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
          this.dealOneCard(this.playerHand);
          var playerPoints = this.playerHand.getPoints();
          this.playerHand.updateDisplay(playerPoints);
          if (playerPoints > 21) {
            this.updateMessage("You bust");
            this.outcome("lose");
          }
        } else {
          // split is in play
          this.dealOneCard(this.playerHand, "split");
          var _playerPoints = this.playerHand.getPoints();
          this.playerHand.updateDisplay(_playerPoints);
          if (_playerPoints > 21) {
            this.splitInPlay = false;
            this.currentHand = "hand2";
            $("#hand1").removeClass("currentHand");
            $("#hand2").addClass("currentHand");
          }
        }
      } else if (this.currentHand === "hand2") {
        this.dealOneCard(this.playerHand2, "split");
        var _playerPoints2 = this.playerHand2.getPoints();
        this.playerHand2.updateDisplay(_playerPoints2);
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
          this.dealerHand.updateDisplay(this.dealerHand.getPoints());
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
      this.playerHand.$wrapper.addClass("currentHand");
      // double bet and display it
      this.currentBet = this.currentBet * 2;
      $(".currentBet").text(this.currentBet);
      // start additional hand and move one card from hand 1 to hand 2
      var card = this.playerHand.removeCard();
      this.playerHand2 = new _hand2.default("player", 2);
      this.dealOneCard(this.playerHand2);
      $(".playerHand-div").css("width", "50%");
      $("#hand1 .player-hand img:last-child").remove();
      this.disable(this.$split);
      this.playerHand.updateDisplay(this.playerHand.getPoints());
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTI4MjBhYzAyY2ViOTdiYjRkNTkiLCJ3ZWJwYWNrOi8vLy4vanMvaGFuZC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jYXJkLmpzIiwid2VicGFjazovLy8uL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9nYW1lLmpzIiwid2VicGFjazovLy8uL2pzL2RlY2suanMiXSwibmFtZXMiOlsiSGFuZCIsIm93bmVyIiwiaGFuZE51bWJlciIsInNlbGVjdG9yIiwiaGFuZCIsIiR3cmFwcGVyIiwiJCIsIiRoYW5kIiwiJHBvaW50cyIsInBsYXlpbmciLCJjYXJkcyIsIm91dGNvbWUiLCJjYXJkIiwiJGNhcmQiLCJwdXNoIiwiYXBwZW5kIiwicG9pbnQiLCJ0b3RhbCIsImFjZXMiLCJwb3AiLCJmaW5kIiwiYXR0ciIsImdldEltYWdlVXJsIiwiaW5kZXgiLCJjb250ZW50IiwidGV4dCIsIkNhcmQiLCJzdWl0IiwidmFsdWUiLCJjdXJyZW50R2FtZSIsIm1ha2VCZXQiLCJvbiIsInJlc2V0R2FtZSIsImdhbWVEZWNrIiwiZ2VuZXJhdGUiLCJkZWFsIiwiaGl0Iiwic3RhbmQiLCJkb3VibGVEb3duIiwic3BsaXQiLCJHYW1lIiwiZGVhbGVySGFuZCIsInBsYXllckhhbmQiLCJjdXJyZW50SGFuZCIsInNwbGl0SW5QbGF5IiwibW9uZXkiLCJjdXJyZW50QmV0IiwiY2hhbmdlIiwiJGRlYWwiLCIkaGl0IiwiJHN0YW5kIiwiJGRvdWJsZURvd24iLCIkc3BsaXQiLCIkY2hhbmdlIiwiY2xhc3NOYW1lIiwic3ltYm9sIiwiTWF0aCIsImFicyIsInNwZWNpYWwiLCJkcmF3IiwiYWRkQ2xhc3MiLCJhZGRDYXJkIiwiZ2FtZU1vZGUiLCJkZWFsT25lQ2FyZCIsImRlYWxlclBvaW50cyIsImdldFBvaW50cyIsInBsYXllclBvaW50cyIsInVwZGF0ZURpc3BsYXkiLCJ1cGRhdGVNZXNzYWdlIiwiZW5hYmxlIiwiY2FuU3BsaXQiLCJlbGVtZW50cyIsImVsZW1lbnQiLCJwcmV2QmV0IiwiYXNzZXNzQ2hhbmdlIiwiZGlzYWJsZSIsInNob3ciLCJoaWRlIiwiY3NzIiwicmVtb3ZlQ2xhc3MiLCJwbGF5ZXJIYW5kMiIsImhhbmQxIiwibGVuZ3RoIiwiaGFuZDIiLCJiZXQiLCIkdG90YWwiLCIkY3VycmVudEJldCIsImdhbWUiLCJoYXNDbGFzcyIsIm1vZGFsVHlwZSIsImh0bWwiLCJyZXNldE1vbmV5IiwicmVzdWx0IiwicmV2ZWFsSG9sZSIsIm1vZGFsIiwiZW5kR2FtZU1vZGUiLCJlbXB0eSIsImNhbGxlciIsImV2YWx1YXRlSGFuZCIsImludm9rZU91dGNvbWUiLCJyZW1vdmVDYXJkIiwicmVtb3ZlIiwibWVzc2FnZSIsIkRlY2siLCJudW1EZWNrcyIsImkiLCJqIiwiZmxvb3IiLCJyYW5kb20iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzdEQTs7Ozs7Ozs7SUFFcUJBLEk7QUFDbkIsZ0JBQVlDLEtBQVosRUFBbUJDLFVBQW5CLEVBQStCO0FBQUE7O0FBQzdCLFFBQUlDLGlCQUFKO0FBQ0EsUUFBSUYsVUFBVSxRQUFkLEVBQXdCO0FBQ3RCRSxpQkFBVyxTQUFYO0FBQ0QsS0FGRCxNQUdLLElBQUlGLFVBQVUsUUFBZCxFQUF3QjtBQUMzQixVQUFJQyxlQUFlLENB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QUNERDtBQUNEO0FBQ0Y7Ozs4QkFFUztBQUNSLFdBQUssSUFBSUMsSUFBSSxLQUFLL0YsS0FBTCxDQUFXd0UsTUFBWCxHQUFvQixDQUFqQyxFQUFvQ3VCLElBQUksQ0FBeEMsRUFBMkNBLEdBQTNDLEVBQWdEO0FBQzlDLFlBQU1DLElBQUlsRCxLQUFLbUQsS0FBTCxDQUFXbkQsS0FBS29ELE1BQUwsTUFBaUJILElBQUksQ0FBckIsQ0FBWCxDQUFWO0FBRDhDLG1CQUU1QixDQUFDLEtBQUsvRixLQUFMLENBQVdnRyxDQUFYLENBQUQsQ0FGNEI7QUFFN0MsYUFBS2hHLEtBQUwsQ0FBVytGLENBQVgsQ0FGNkM7QUFHL0M7QUFDRjs7Ozs7O2tCQTdCa0JGLEkiLCJmaWxlIjoiLi9qcy9tYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOTI4MjBhYzAyY2ViOTdiYjRkNTkiLCJpbXBvcnQgQ2FyZCBmcm9tIFwiLi9jYXJkXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIYW5kIHtcclxuICBjb25zdHJ1Y3Rvcihvd25lciwgaGFuZE51bWJlcikge1xyXG4gICAgbGV0IHNlbGVjdG9yO1xyXG4gICAgaWYgKG93bmVyID09PSAnZGVhbGVyJykge1xyXG4gICAgICBzZWxlY3RvciA9IFwiI2RlYWxlclwiO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAob3duZXIgPT09ICdwbGF5ZXInKSB7XHJcbiAgICAgIGlmIChoYW5kTnVtYmVyID09PSAxKSB7XHJcbiAgICAgICAgc2VsZWN0b3IgPSBcIiNoYW5kMVwiO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKGhhbmQgPT09IDIpIHtcclxuICAgICAgICBzZWxlY3RvciA9IFwiI2hhbmQyXCI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuJHdyYXBwZXIgPSAkKGAke3NlbGVjdG9yfWApO1xyXG4gICAgdGhpcy4kaGFuZCA9ICQoYCR7c2VsZWN0b3J9IC5oYW5kYCk7XHJcbiAgICB0aGlzLiRwb2ludHMgPSAkKGAke3NlbGVjdG9yfSAucG9pbnRzYCk7XHJcbiAgICB0aGlzLnBsYXlpbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuY2FyZHMgPSBbXTtcclxuICAgIHRoaXMub3V0Y29tZTtcclxuICB9XHJcblxyXG4gIGFkZENhcmQoY2FyZCwgJGNhcmQpIHtcclxuICAgIHRoaXMuY2FyZHMucHVzaChjYXJkKTtcclxuICAgIHRoaXMuJGhhbmQuYXBwZW5kKCRjYXJkKTtcclxuICB9XHJcblxyXG4gIGNhblNwbGl0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2FyZHNbMF0ucG9pbnQgPT09IHRoaXMuY2FyZHNbMV0ucG9pbnQ7XHJcbiAgfVxyXG5cclxuICBnZXRQb2ludHMoKSB7XHJcbiAgICBsZXQgdG90YWwgPSAwO1xyXG4gICAgbGV0IGFjZXMgPSAwO1xyXG4gICAgZm9yIChsZXQgY2FyZCBvZiB0aGlzLmNhcmRzKSB7XHJcbiAgICAgIGxldCBwb2ludCA9IGNhcmQucG9pbnQ7XHJcbiAgICAgIGlmIChwb2ludCA9PT0gMSkge1xyXG4gICAgICAgIHRvdGFsICs9IDEwO1xyXG4gICAgICAgIGFjZXMrKztcclxuICAgICAgfSBcclxuICAgICAgZWxzZSBpZiAocG9pbnQgPiAxMCkge1xyXG4gICAgICAgIHBvaW50ID0gMTA7XHJcbiAgICAgIH1cclxuICAgICAgdG90YWwgKz0gcG9pbnQ7XHJcbiAgICAgIHdoaWxlICh0b3RhbCA+IDIxICYmIGFjZXMgPiAwKSB7XHJcbiAgICAgICAgdG90YWwgLT0gMTA7XHJcbiAgICAgICAgYWNlcy0tO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG90YWw7XHJcbiAgfVxyXG5cclxuICByZW1vdmVDYXJkKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2FyZHMucG9wKCk7XHJcbiAgfVxyXG5cclxuICByZXZlYWxIb2xlKCkge1xyXG4gICAgdGhpcy4kaGFuZC5maW5kKCdpbWc6Zmlyc3QtY2hpbGQnKS5hdHRyKCdzcmMnLCB0aGlzLmNhcmRzWzBdLmdldEltYWdlVXJsKCkpO1xyXG4gIH1cclxuXHJcbiAgc2VlQ2FyZChpbmRleCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2FyZHNbaW5kZXggLSAxXTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZURpc3BsYXkoY29udGVudCkge1xyXG4gICAgdGhpcy4kcG9pbnRzLnRleHQoY29udGVudCk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2hhbmQuanMiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJkIHtcclxuICBjb25zdHJ1Y3Rvcihwb2ludCwgc3VpdCkge1xyXG4gICAgdGhpcy5wb2ludCA9IHBvaW50O1xyXG4gICAgdGhpcy5zdWl0ID0gc3VpdDtcclxuICB9XHJcblxyXG4gIGdldEltYWdlVXJsKCkge1xyXG4gICAgbGV0IHZhbHVlID0gdGhpcy5wb2ludDtcclxuICAgIGlmICh0aGlzLnBvaW50ID09PSAxMSkge1xyXG4gICAgICB2YWx1ZSA9IFwiamFja1wiO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodGhpcy5wb2ludCA9PT0gMTIpIHtcclxuICAgICAgdmFsdWUgPSBcInF1ZWVuXCI7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0aGlzLnBvaW50ID09PSAxMykge1xyXG4gICAgICB2YWx1ZSA9IFwia2luZ1wiO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodGhpcy5wb2ludCA9PT0gMSkge1xyXG4gICAgICB2YWx1ZSA9IFwiYWNlXCI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYGltYWdlcy8ke3ZhbHVlfV9vZl8ke3RoaXMuc3VpdH0uc3ZnYDtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvY2FyZC5qcyIsImltcG9ydCBHYW1lIGZyb20gJy4vZ2FtZSc7XG5cbnZhciBjdXJyZW50R2FtZSA9IG5ldyBHYW1lO1xuXG5jdXJyZW50R2FtZS5tYWtlQmV0KCk7XG5cbiQoJy5kZWFsJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gIGN1cnJlbnRHYW1lLnJlc2V0R2FtZSgpO1xuICBjdXJyZW50R2FtZS5nYW1lRGVjay5nZW5lcmF0ZSgzKTtcbiAgY3VycmVudEdhbWUuZGVhbCgpO1xufSk7XG5cbiQoJy5oaXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgY3VycmVudEdhbWUuaGl0KCk7XG59KTtcblxuJCgnLnN0YW5kJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gIGN1cnJlbnRHYW1lLnN0YW5kKCk7XG59KTtcblxuJCgnLmRvdWJsZS1kb3duJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gIGN1cnJlbnRHYW1lLmRvdWJsZURvd24oKTtcbn0pO1xuXG4kKCcuc3BsaXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgY3VycmVudEdhbWUuc3BsaXQoKTtcbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvYXBwLmpzIiwiaW1wb3J0IEhhbmQgZnJvbSBcIi4vaGFuZFwiO1xyXG5pbXBvcnQgRGVjayBmcm9tIFwiLi9kZWNrXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuZ2FtZURlY2sgPSBuZXcgRGVjaztcclxuICAgIHRoaXMuZGVhbGVySGFuZCA9IG5ldyBIYW5kKCdkZWFsZXInKTtcclxuICAgIHRoaXMucGxheWVySGFuZCA9IG5ldyBIYW5kKCdwbGF5ZXInLCAxKTtcclxuICAgIHRoaXMuY3VycmVudEhhbmQgPSBcImhhbmQxXCI7XHJcbiAgICB0aGlzLnNwbGl0SW5QbGF5ID0gZmFsc2U7XHJcbiAgICB0aGlzLm1vbmV5ID0gNTAwO1xyXG4gICAgdGhpcy5jdXJyZW50QmV0ID0gMTA7XHJcbiAgICB0aGlzLmNoYW5nZTtcclxuICAgIFxyXG4gICAgdGhpcy4kZGVhbCA9ICQoXCIuZGVhbFwiKTtcclxuICAgIHRoaXMuJGhpdCA9ICQoXCIuaGl0XCIpO1xyXG4gICAgdGhpcy4kc3RhbmQgPSAkKFwiLnN0YW5kXCIpO1xyXG4gICAgdGhpcy4kZG91YmxlRG93biA9ICQoXCIuZG91YmxlLWRvd25cIik7XHJcbiAgICB0aGlzLiRzcGxpdCA9ICQoXCIuc3BsaXRcIik7XHJcbiAgICB0aGlzLiRjaGFuZ2UgPSAkKFwiLmNoYW5nZVwiKTtcclxuICB9XHJcblxyXG4gIGFzc2Vzc0NoYW5nZSgpIHtcclxuICAgIGxldCBjbGFzc05hbWUgPSBcIlwiO1xyXG4gICAgbGV0IHN5bWJvbCA9IFwiXCI7XHJcbiAgICBpZiAodGhpcy5jaGFuZ2UgPiAwKSB7XHJcbiAgICAgIGNsYXNzTmFtZSA9IFwicG9zaXRpdmVcIjtcclxuICAgICAgc3ltYm9sID0gXCIrXCI7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0aGlzLmNoYW5nZSA8IDApIHtcclxuICAgICAgY2xhc3NOYW1lID0gXCJuZWdhdGl2ZVwiO1xyXG4gICAgICBzeW1ib2wgPSBcIi1cIjtcclxuICAgIH1cclxuICAgIHRoaXMuJGNoYW5nZS5hcHBlbmQoYDxzcGFuIGNsYXNzPVwiJHtjbGFzc05hbWV9XCI+JHtzeW1ib2x9ICQke01hdGguYWJzKHRoaXMuY2hhbmdlKX08L3NwYW4+YCk7XHJcbiAgfVxyXG5cclxuICBkZWFsT25lQ2FyZChoYW5kLCBzcGVjaWFsKSB7XHJcbiAgICBsZXQgY2FyZCA9IHRoaXMuZ2FtZURlY2suZHJhdygpO1xyXG4gICAgbGV0ICRjYXJkID0gJChcIjxpbWcgLz5cIiwge1xyXG4gICAgICBcImNsYXNzXCI6IFwiY2FyZFwiLCBcclxuICAgICAgXCJzcmNcIjogYCR7Y2FyZC5nZXRJbWFnZVVybCgpfWBcclxuICAgIH0pO1xyXG4gICAgaWYgKHNwZWNpYWwgPT09IFwiaG9sZVwiKSB7XHJcbiAgICAgICRjYXJkLmF0dHIoJ3NyYycsIFwiaW1hZ2VzL2JhY2stc3VpdHMtcmVkLnN2Z1wiKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHNwZWNpYWwgPT09IFwiZG91YmxlLWRvd25cIikge1xyXG4gICAgICAkY2FyZC5hZGRDbGFzcygnY2FyZC1kZCcpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoc3BlY2lhbCA9PT0gXCJzcGxpdFwiKSB7XHJcbiAgICAgICRjYXJkLmFkZENsYXNzKCdzcGxpdCcpO1xyXG4gICAgfVxyXG4gICAgaGFuZC5hZGRDYXJkKGNhcmQsICRjYXJkKTtcclxuICB9XHJcblxyXG4gIGRlYWwoKSB7XHJcbiAgICB0aGlzLmdhbWVNb2RlKCk7XHJcbiAgICB0aGlzLnBsYXllckhhbmQucGxheWluZyA9IHRydWU7XHJcblxyXG4gICAgLy8gc2h1ZmZsZSBkZWNrKHMpIGFuZCBkZWFsIGNhcmRzXHJcbiAgICAvLyB0aGlzLmdhbWVEZWNrLnNodWZmbGUoKTtcclxuICAgIHRoaXMuZGVhbE9uZUNhcmQodGhpcy5kZWFsZXJIYW5kLCBcImhvbGVcIik7XHJcbiAgICB0aGlzLmRlYWxPbmVDYXJkKHRoaXMucGxheWVySGFuZCk7XHJcbiAgICB0aGlzLmRlYWxPbmVDYXJkKHRoaXMuZGVhbGVySGFuZCk7XHJcbiAgICB0aGlzLmRlYWxPbmVDYXJkKHRoaXMucGxheWVySGFuZCk7XHJcblxyXG4gICAgLy8gY29uY2VhbCBkZWFsZXIgdG90YWwgYW5kIGRpc3BsYXkgdXNlciB0b3RhbFxyXG4gICAgbGV0IGRlYWxlclBvaW50cyA9IHRoaXMuZGVhbGVySGFuZC5nZXRQb2ludHMoKTtcclxuICAgIGxldCBwbGF5ZXJQb2ludHMgPSB0aGlzLnBsYXllckhhbmQuZ2V0UG9pbnRzKCk7XHJcbiAgICB0aGlzLmRlYWxlckhhbmQudXBkYXRlRGlzcGxheShcIj9cIik7XHJcbiAgICB0aGlzLnBsYXllckhhbmQudXBkYXRlRGlzcGxheShwbGF5ZXJQb2ludHMpO1xyXG5cclxuICAgIGlmIChkZWFsZXJQb2ludHMgPT09IDIxICYmIHBsYXllclBvaW50cyA9PT0gMjEpIHtcclxuICAgICAgdGhpcy5vdXRjb21lKFwicHVzaFwiKTtcclxuICAgICAgdGhpcy5kZWFsZXJIYW5kLnVwZGF0ZURpc3BsYXkoXCJCbGFja2phY2tcIik7XHJcbiAgICAgIHRoaXMucGxheWVySGFuZC51cGRhdGVEaXNwbGF5KFwiQkxBQ0tKQUNLLCBIT1QgREFNTiFcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChkZWFsZXJQb2ludHMgPT09IDIxKSB7XHJcbiAgICAgIHRoaXMub3V0Y29tZShcImxvc2VcIik7XHJcbiAgICAgIHRoaXMuZGVhbGVySGFuZC51cGRhdGVEaXNwbGF5KFwiQmxhY2tqYWNrXCIpO1xyXG4gICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJEZWFsZXIgd2luc1wiKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHBsYXllclBvaW50cyA9PT0gMjEpIHtcclxuICAgICAgdGhpcy5vdXRjb21lKFwiYmxhY2tqYWNrXCIpO1xyXG4gICAgICB0aGlzLmRlYWxlckhhbmQudXBkYXRlRGlzcGxheShkZWFsZXJQb2ludHMpO1xyXG4gICAgICB0aGlzLnBsYXllckhhbmQudXBkYXRlRGlzcGxheShcIkJMQUNLSkFDSywgSE9UIERBTU4hXCIpO1xyXG4gICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJZb3Ugd2luIVwiKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXMubW9uZXkgPiB0aGlzLmN1cnJlbnRCZXQgKiAyKSB7XHJcbiAgICAgIGlmIChwbGF5ZXJQb2ludHMgPT09IDExKSAge1xyXG4gICAgICAgIHRoaXMuZW5hYmxlKHRoaXMuJGRvdWJsZURvd24pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLnBsYXllckhhbmQuY2FuU3BsaXQoKSkge1xyXG4gICAgICAgIHRoaXMuZW5hYmxlKHRoaXMuJHNwbGl0KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZGlzYWJsZSguLi5lbGVtZW50cykge1xyXG4gICAgZm9yIChsZXQgZWxlbWVudCBvZiBlbGVtZW50cykge1xyXG4gICAgICBlbGVtZW50LmF0dHIoXCJkaXNhYmxlZFwiLCB0cnVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRvdWJsZURvd24oKSB7XHJcbiAgICAvLyBkb3VibGUgYmV0IGFuZCBkaXNwbGF5IGl0XHJcbiAgICB0aGlzLmN1cnJlbnRCZXQgKj0gMjtcclxuICAgICQoXCIuY3VycmVudEJldFwiKS50ZXh0KHRoaXMuY3VycmVudEJldCk7XHJcbiAgICAvLyBkZWFsIHRoZSBwbGF5ZXIgb25lIG1vcmUgY2FyZCBhbmQgdGhlbiBtb3ZlIG9uIHRvIHRoZSBkZWFsZXIncyB0dXJuXHJcbiAgICB0aGlzLmRlYWxPbmVDYXJkKHRoaXMucGxheWVySGFuZCwgXCJkb3VibGUtZG93blwiKTtcclxuICAgIHRoaXMucGxheWVySGFuZC51cGRhdGVEaXNwbGF5KHRoaXMucGxheWVySGFuZC5nZXRQb2ludHMoKSk7XHJcbiAgICB0aGlzLnN0YW5kKFwiZG91YmxlLWRvd25cIik7XHJcbiAgfVxyXG5cclxuICBlbmFibGUoLi4uZWxlbWVudHMpIHtcclxuICAgIGZvciAobGV0IGVsZW1lbnQgb2YgZWxlbWVudHMpIHtcclxuICAgICAgZWxlbWVudC5hdHRyKFwiZGlzYWJsZWRcIiwgZmFsc2UpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZW5kR2FtZU1vZGUoKSB7XHJcbiAgICAkKFwiLnRvdGFsXCIpLnRleHQodGhpcy5tb25leSk7XHJcbiAgICAkKFwiLnByZXZCZXRcIikuYXBwZW5kKGA8c3Bhbj4kJHt0aGlzLnByZXZCZXR9PC9zcGFuPmApO1xyXG4gICAgdGhpcy5hc3Nlc3NDaGFuZ2UoKTtcclxuICAgIHRoaXMuZW5hYmxlKHRoaXMuJGRlYWwpO1xyXG4gICAgdGhpcy5kaXNhYmxlKHRoaXMuJGhpdCwgdGhpcy4kc3RhbmQpO1xyXG4gICAgJChcIi5iZXR0aW5nIC5idXR0b25zXCIpLnNob3coKTtcclxuICB9XHJcblxyXG4gIGV2YWx1YXRlSGFuZChoYW5kKSB7XHJcbiAgICBsZXQgZGVhbGVyUG9pbnRzID0gdGhpcy5kZWFsZXJIYW5kLmdldFBvaW50cygpO1xyXG4gICAgbGV0IHBsYXllclBvaW50cyA9IGhhbmQuZ2V0UG9pbnRzKCk7XHJcbiAgICBpZiAoZGVhbGVyUG9pbnRzID4gMjEgfHwgcGxheWVyUG9pbnRzID4gZGVhbGVyUG9pbnRzKSB7XHJcbiAgICAgIGhhbmQub3V0Y29tZSA9IFwid2luXCI7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChwbGF5ZXJQb2ludHMgPCBkZWFsZXJQb2ludHMpIHtcclxuICAgICAgaGFuZC5vdXRjb21lID0gXCJsb3NlXCI7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgaGFuZC5vdXRjb21lID0gXCJwdXNoXCI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnYW1lTW9kZSgpIHtcclxuICAgICQoXCIudGl0bGUtc2NyZWVuXCIpLmhpZGUoKTtcclxuICAgICQoXCIucGxheWVySGFuZC1kaXZcIikuY3NzKFwid2lkdGhcIiwgXCIxMDAlXCIpOyAvLyByZXNldCBoYW5kIGFkanVzdG1lbnQgZm9yIG1vYmlsZSBpbiBjYXNlIG9mICdzcGxpdCdcclxuICAgIHRoaXMuZW5hYmxlKHRoaXMuJGhpdCwgdGhpcy4kc3RhbmQpO1xyXG4gICAgdGhpcy5kaXNhYmxlKHRoaXMuJGRlYWwpO1xyXG4gICAgJChcIi5iZXR0aW5nIC5idXR0b25zXCIpLmhpZGUoKTtcclxuICB9XHJcblxyXG4gIGhpdCgpIHtcclxuICAgIHRoaXMuZGlzYWJsZSh0aGlzLiRkb3VibGVEb3duLCB0aGlzLiRzcGxpdCk7XHJcbiAgICBpZiAodGhpcy5jdXJyZW50SGFuZCA9PT0gXCJoYW5kMVwiKSB7XHJcbiAgICAgIGlmICghdGhpcy5zcGxpdEluUGxheSkge1xyXG4gICAgICAgIHRoaXMuZGVhbE9uZUNhcmQodGhpcy5wbGF5ZXJIYW5kKTtcclxuICAgICAgICBsZXQgcGxheWVyUG9pbnRzID0gdGhpcy5wbGF5ZXJIYW5kLmdldFBvaW50cygpO1xyXG4gICAgICAgIHRoaXMucGxheWVySGFuZC51cGRhdGVEaXNwbGF5KHBsYXllclBvaW50cyk7XHJcbiAgICAgICAgaWYgKHBsYXllclBvaW50cyA+IDIxKSB7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJZb3UgYnVzdFwiKTtcclxuICAgICAgICAgIHRoaXMub3V0Y29tZShcImxvc2VcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgeyAvLyBzcGxpdCBpcyBpbiBwbGF5XHJcbiAgICAgICAgdGhpcy5kZWFsT25lQ2FyZCh0aGlzLnBsYXllckhhbmQsIFwic3BsaXRcIik7XHJcbiAgICAgICAgbGV0IHBsYXllclBvaW50cyA9IHRoaXMucGxheWVySGFuZC5nZXRQb2ludHMoKTtcclxuICAgICAgICB0aGlzLnBsYXllckhhbmQudXBkYXRlRGlzcGxheShwbGF5ZXJQb2ludHMpO1xyXG4gICAgICAgIGlmIChwbGF5ZXJQb2ludHMgPiAyMSkge1xyXG4gICAgICAgICAgdGhpcy5zcGxpdEluUGxheSA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5jdXJyZW50SGFuZCA9IFwiaGFuZDJcIjtcclxuICAgICAgICAgICQoXCIjaGFuZDFcIikucmVtb3ZlQ2xhc3MoXCJjdXJyZW50SGFuZFwiKTtcclxuICAgICAgICAgICQoXCIjaGFuZDJcIikuYWRkQ2xhc3MoXCJjdXJyZW50SGFuZFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXMuY3VycmVudEhhbmQgPT09IFwiaGFuZDJcIikge1xyXG4gICAgICB0aGlzLmRlYWxPbmVDYXJkKHRoaXMucGxheWVySGFuZDIsIFwic3BsaXRcIik7XHJcbiAgICAgIGxldCBwbGF5ZXJQb2ludHMgPSB0aGlzLnBsYXllckhhbmQyLmdldFBvaW50cygpO1xyXG4gICAgICB0aGlzLnBsYXllckhhbmQyLnVwZGF0ZURpc3BsYXkocGxheWVyUG9pbnRzKTtcclxuICAgICAgaWYgKHBsYXllclBvaW50cyA+IDIxKSB7XHJcbiAgICAgICAgJChcIiNoYW5kMlwiKS5yZW1vdmVDbGFzcyhcImN1cnJlbnRIYW5kXCIpO1xyXG4gICAgICAgIHRoaXMuc3RhbmQoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaW52b2tlT3V0Y29tZSguLi5oYW5kcykge1xyXG4gICAgbGV0IGhhbmQxID0gaGFuZHNbMF07XHJcbiAgICBpZiAoaGFuZHMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgIGlmIChoYW5kMS5vdXRjb21lID09PSBcIndpblwiKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiWW91IHdpbiFcIik7XHJcbiAgICAgICAgdGhpcy5vdXRjb21lKFwid2luXCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKGhhbmQxLm91dGNvbWUgPT09IFwibG9zZVwiKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiRGVhbGVyIHdpbnNcIik7XHJcbiAgICAgICAgdGhpcy5vdXRjb21lKFwibG9zZVwiKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICB0aGlzLm91dGNvbWUoXCJwdXNoXCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChoYW5kcy5sZW5ndGggPT09IDIpIHtcclxuICAgICAgbGV0IGhhbmQyID0gaGFuZHNbMV07XHJcbiAgICAgIGlmIChoYW5kMSA9PT0gaGFuZDIpIHtcclxuICAgICAgICBpZiAoaGFuZDEgPT09IFwiYmxhY2tqYWNrXCIgJiYgaGFuZDIgPT09IFwiYmxhY2tqYWNrXCIpIHtcclxuICAgICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIlRXTyBCTEFDS0pBQ0tTISEhXCIpO1xyXG4gICAgICAgICAgdGhpcy5vdXRjb21lKFwiYmxhY2tqYWNrXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChoYW5kMSA9PT0gXCJ3aW5cIiAmJiBoYW5kMiA9PT0gXCJ3aW5cIikge1xyXG4gICAgICAgICAgdGhpcy5vdXRjb21lKFwid2luXCIpO1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiWW91IHdpbiBib3RoIVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoaGFuZDEgPT09IFwibG9zZVwiICYmIGhhbmQyID09PSBcImxvc2VcIikge1xyXG4gICAgICAgICAgdGhpcy5vdXRjb21lKFwibG9zZVwiKTtcclxuICAgICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIkRlYWxlciB3aW5zIGJvdGhcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMub3V0Y29tZShcInB1c2hcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHRoaXMuY3VycmVudEJldCAvPSAyO1xyXG4gICAgICAgIGlmIChoYW5kMSA9PT0gXCJibGFja2phY2tcIiB8fCBoYW5kMiA9PT0gXCJibGFja2phY2tcIikge1xyXG4gICAgICAgICAgLy8gY2FsY3VsYXRlIGNvbWJpbmVkIG91dGNvbWVzIGJlZm9yZSBjYWxsaW5nIHRoZSBvdXRjb21lIG1ldGhvZFxyXG4gICAgICAgICAgbGV0IGJldCA9IGN1cnJlbnRCZXQ7XHJcbiAgICAgICAgICB0aGlzLmN1cnJlbnRCZXQgKj0gMS41O1xyXG4gICAgICAgICAgaWYgKGhhbmQxID09PSBcIndpblwiIHx8IGhhbmQyID09PSBcIndpblwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3V0Y29tZShcIndpblwiKTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50QmV0ICs9IGJldDtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiWW91IHdpbiBib3RoIVwiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsc2UgaWYgKGhhbmQxID09PSBcImxvc2VcIiB8fCBoYW5kMiA9PT0gXCJsb3NlXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5vdXRjb21lKFwid2luXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRCZXQgLT0gYmV0O1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJZb3UgYW5kIGRlYWxlciBlYWNoIHdpbiBvbmVcIik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5vdXRjb21lKFwid2luXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJZb3Ugd2luIG9uZSwgcHVzaFwiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoaGFuZDEgPT09IFwid2luXCIgfHwgaGFuZDIgPT09IFwid2luXCIpIHtcclxuICAgICAgICAgIGlmIChoYW5kMSA9PT0gXCJwdXNoXCIgfHwgaGFuZDIgPT09IFwicHVzaFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3V0Y29tZShcIndpblwiKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiWW91IHdpbiBvbmUsIHB1c2hcIik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5vdXRjb21lKFwicHVzaFwiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoaGFuZDEgPT09IFwibG9zZVwiIHx8IGhhbmQyID09PSBcImxvc2VcIikge1xyXG4gICAgICAgICAgdGhpcy5vdXRjb21lKFwibG9zZVwiKTtcclxuICAgICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIkRlYWxlciB3aW5zIG9uZSwgcHVzaFwiKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbWFrZUJldCgpIHtcclxuICAgIHZhciAkdG90YWwgPSAkKFwiLnRvdGFsXCIpLFxyXG4gICAgICAgICRjdXJyZW50QmV0ID0gJChcIi5jdXJyZW50QmV0XCIpLFxyXG4gICAgICAgIGdhbWUgPSB0aGlzO1xyXG4gICAgJHRvdGFsLnRleHQodGhpcy5tb25leSk7XHJcbiAgICAkY3VycmVudEJldC50ZXh0KHRoaXMuY3VycmVudEJldCk7XHJcbiAgICAkKFwiLmJldC1idG5cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcclxuICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoXCJhZGQxMFwiKSAmJiBnYW1lLm1vbmV5IC0gZ2FtZS5jdXJyZW50QmV0ID49IDEwKSB7XHJcbiAgICAgICAgZ2FtZS5jdXJyZW50QmV0ICs9IDEwO1xyXG4gICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICQodGhpcykuaGFzQ2xhc3MoXCJhZGQ1MFwiKSAmJlxyXG4gICAgICAgIGdhbWUubW9uZXkgLSBnYW1lLmN1cnJlbnRCZXQgPj0gNTBcclxuICAgICAgKSB7XHJcbiAgICAgICAgZ2FtZS5jdXJyZW50QmV0ICs9IDUwO1xyXG4gICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICQodGhpcykuaGFzQ2xhc3MoXCJhZGQxMDBcIikgJiZcclxuICAgICAgICBnYW1lLm1vbmV5IC0gZ2FtZS5jdXJyZW50QmV0ID49IDEwMFxyXG4gICAgICApIHtcclxuICAgICAgICBnYW1lLmN1cnJlbnRCZXQgKz0gMTAwO1xyXG4gICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICQodGhpcykuaGFzQ2xhc3MoXCJhZGQ1MDBcIikgJiZcclxuICAgICAgICBnYW1lLm1vbmV5IC0gZ2FtZS5jdXJyZW50QmV0ID49IDUwMFxyXG4gICAgICApIHtcclxuICAgICAgICBnYW1lLmN1cnJlbnRCZXQgKz0gNTAwO1xyXG4gICAgICB9IGVsc2UgaWYgKCQodGhpcykuaGFzQ2xhc3MoXCJhbGwtaW5cIikpIHtcclxuICAgICAgICBnYW1lLmN1cnJlbnRCZXQgPSBnYW1lLm1vbmV5O1xyXG4gICAgICB9IGVsc2UgaWYgKCQodGhpcykuaGFzQ2xhc3MoXCJyZXNldFwiKSkge1xyXG4gICAgICAgIGdhbWUuY3VycmVudEJldCA9IDEwO1xyXG4gICAgICB9XHJcbiAgICAgICRjdXJyZW50QmV0LnRleHQoZ2FtZS5jdXJyZW50QmV0KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbW9kYWwobW9kYWxUeXBlKSB7XHJcbiAgICBpZiAobW9kYWxUeXBlID09PSBcImJhbmtydXB0XCIpIHtcclxuICAgICAgJChcIi5tb2RhbCwgLm1vZGFsLW92ZXJsYXlcIikucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpO1xyXG4gICAgICAkKFwiLm1vZGFsIC5tZXNzYWdlXCIpLmh0bWwoXHJcbiAgICAgICAgXCJZb3UndmUgbG9zdCBldmVyeXRoaW5nLlwiICtcclxuICAgICAgICAgIFwiPGJyLz48YnIvPlwiICtcclxuICAgICAgICAgIFwiR29vZCB0aGluZyBpdCdzIG5vdCByZWFsIG1vbmV5IVwiXHJcbiAgICAgICk7XHJcbiAgICAgICQoXCIubW9kYWwtZ3V0cyBidXR0b25cIikudGV4dChcIlBsYXkgYWdhaW5cIik7XHJcbiAgICAgICQoXCIubW9kYWwtZ3V0cyBidXR0b25cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKFwiLm1vZGFsLCAubW9kYWwtb3ZlcmxheVwiKS5hZGRDbGFzcyhcImhpZGVcIik7XHJcbiAgICAgICAgJChcIi50aXRsZS1zY3JlZW5cIikuc2hvdygpO1xyXG4gICAgICAgIGdhbWUucmVzZXRHYW1lKCk7XHJcbiAgICAgICAgZ2FtZS5yZXNldE1vbmV5KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIGlmIChtb2RhbFR5cGUgPT09IFwiaGVscFwiKSB7XHJcbiAgICAgIC8vIGZ1dHVyZSBnYW1lIGZlYXR1cmU6IGluc3RydWN0aW9ucyBhdmFpbGFibGUgaW4gaGVscCBtb2RhbFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb3V0Y29tZShyZXN1bHQpIHtcclxuICAgIHRoaXMucGxheWVySGFuZC5wbGF5aW5nID0gZmFsc2U7XHJcbiAgICB0aGlzLmRlYWxlckhhbmQucmV2ZWFsSG9sZSgpO1xyXG4gICAgdGhpcy5kZWFsZXJIYW5kLnVwZGF0ZURpc3BsYXkodGhpcy5kZWFsZXJIYW5kLmdldFBvaW50cygpKTtcclxuICAgIHRoaXMucHJldkJldCA9IHRoaXMuY3VycmVudEJldDtcclxuICAgIGlmIChyZXN1bHQgPT09IFwiYmxhY2tqYWNrXCIpIHtcclxuICAgICAgdGhpcy5tb25leSArPSB0aGlzLmN1cnJlbnRCZXQgKiAxLjU7XHJcbiAgICAgIHRoaXMuY2hhbmdlID0gdGhpcy5jdXJyZW50QmV0ICogMS41O1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAocmVzdWx0ID09PSBcIndpblwiKSB7XHJcbiAgICAgIHRoaXMubW9uZXkgKz0gdGhpcy5jdXJyZW50QmV0O1xyXG4gICAgICB0aGlzLmNoYW5nZSA9IHRoaXMuY3VycmVudEJldDtcclxuICAgIH0gXHJcbiAgICBlbHNlIGlmIChyZXN1bHQgPT09IFwicHVzaFwiKSB7XHJcbiAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIlB1c2hcIik7XHJcbiAgICAgIHRoaXMubW9uZXkgPSB0aGlzLm1vbmV5O1xyXG4gICAgICB0aGlzLmNoYW5nZSA9IDA7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChyZXN1bHQgPT09IFwibG9zZVwiKSB7XHJcbiAgICAgIGlmICh0aGlzLm1vbmV5IC0gdGhpcy5jdXJyZW50QmV0ID49IDEwKSB7XHJcbiAgICAgICAgdGhpcy5tb25leSAtPSB0aGlzLmN1cnJlbnRCZXQ7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2UgPSAtdGhpcy5jdXJyZW50QmV0O1xyXG4gICAgICAgIC8vIGRyb3AgdGhlIGJldCBhbW91bnQgZG93biB0byBlcXVhbCBtb25leSBhbW91bnQgb2YgbGFzdCBiZXQgdmFsdWUgaXMgZ3JlYXRlciB0aGFuIHRvdGFsIG1vbmV5IHZhbHVlXHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudEJldCA+IHRoaXMubW9uZXkpIHtcclxuICAgICAgICAgIHRoaXMuY3VycmVudEJldCA9IHRoaXMubW9uZXk7XHJcbiAgICAgICAgICAkKFwiLmN1cnJlbnRCZXRcIikudGV4dCh0aGlzLmN1cnJlbnRCZXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBcclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgdGhpcy5tb2RhbChcImJhbmtydXB0XCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLmVuZEdhbWVNb2RlKCk7XHJcbiAgfVxyXG5cclxuICByZXNldEdhbWUoKSB7XHJcbiAgICB0aGlzLmdhbWVEZWNrID0gbmV3IERlY2s7XHJcbiAgICB0aGlzLmRlYWxlckhhbmQgPSBuZXcgSGFuZChcImRlYWxlclwiKTtcclxuICAgIHRoaXMucGxheWVySGFuZCA9IG5ldyBIYW5kKFwicGxheWVyXCIsIDEpO1xyXG4gICAgJChcIi5tZXNzYWdlc1wiKS5lbXB0eSgpO1xyXG4gICAgJChcIi5wbGF5ZXItaGFuZFwiKS5lbXB0eSgpO1xyXG4gICAgJChcIi5kZWFsZXItaGFuZFwiKS5lbXB0eSgpO1xyXG4gICAgJChcIi5wbGF5ZXItcG9pbnRzXCIpLmVtcHR5KCk7XHJcbiAgICAkKFwiLmRlYWxlci1wb2ludHNcIikuZW1wdHkoKTtcclxuICAgICQoXCIuY2hhbmdlXCIpLmVtcHR5KCk7XHJcbiAgICAkKFwiLnByZXZCZXRcIikuZW1wdHkoKTtcclxuICB9XHJcblxyXG4gIHJlc2V0TW9uZXkoKSB7XHJcbiAgICB0aGlzLm1vbmV5ID0gNTAwO1xyXG4gICAgdGhpcy5jdXJyZW50QmV0ID0gMTA7XHJcbiAgICAkKFwiLnRvdGFsXCIpLnRleHQodGhpcy5tb25leSk7XHJcbiAgICAkKFwiLmN1cnJlbnRCZXRcIikudGV4dCh0aGlzLmN1cnJlbnRCZXQpO1xyXG4gIH1cclxuXHJcbiAgc3RhbmQoY2FsbGVyKSB7XHJcbiAgICAvLyBpZiBzcGxpdHRpbmcsIGdpdmUgaGFuZDIgb3Bwb3J0dW5pdHkgdG8gaGl0XHJcbiAgICBpZiAodGhpcy5zcGxpdEluUGxheSkge1xyXG4gICAgICB0aGlzLnNwbGl0SW5QbGF5ID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuY3VycmVudEhhbmQgPSBcImhhbmQyXCI7XHJcbiAgICAgICQoXCIjaGFuZDFcIikucmVtb3ZlQ2xhc3MoXCJjdXJyZW50SGFuZFwiKTtcclxuICAgICAgJChcIiNoYW5kMlwiKS5hZGRDbGFzcyhcImN1cnJlbnRIYW5kXCIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodGhpcy5jdXJyZW50SGFuZCA9PT0gXCJoYW5kMlwiKSB7XHJcbiAgICAgIC8vIGlmIHNwbGl0dGluZywgY2FsY3VsYXRlIHRoZSBvdXRjb21lIG9mIGJvdGggb2YgdGhlIHBsYXllcidzIGhhbmRzXHJcbiAgICAgIHRoaXMuY3VycmVudEhhbmQgPSBcImhhbmQxXCI7XHJcbiAgICAgIHRoaXMuZGVhbGVySGFuZC5yZXZlYWxIb2xlKCk7XHJcbiAgICAgIHdoaWxlICh0aGlzLmRlYWxlckhhbmQuZ2V0UG9pbnRzKCkgPCAxNykge1xyXG4gICAgICAgIHRoaXMuZGVhbE9uZUNhcmQodGhpcy5kZWFsZXJIYW5kKTtcclxuICAgICAgfVxyXG4gICAgICBsZXQgZGVhbGVyUG9pbnRzID0gdGhpcy5kZWFsZXJIYW5kLmdldFBvaW50cygpO1xyXG4gICAgICB0aGlzLmRlYWxlckhhbmQudXBkYXRlRGlzcGxheShkZWFsZXJQb2ludHMpO1xyXG4gICAgICBpZiAoZGVhbGVyUG9pbnRzID4gMjEpIHtcclxuICAgICAgICB0aGlzLnBsYXllckhhbmQub3V0Y29tZSA9IFwid2luXCI7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJIYW5kMi5vdXRjb21lID0gXCJ3aW5cIjtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICB0aGlzLmV2YWx1YXRlSGFuZCh0aGlzLnBsYXllckhhbmQpO1xyXG4gICAgICAgIHRoaXMuZXZhbHVhdGVIYW5kKHRoaXMucGxheWVySGFuZDIpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuaW52b2tlT3V0Y29tZSh0aGlzLnBsYXllckhhbmQsIHRoaXMucGxheWVySGFuZDIpO1xyXG4gICAgfSBcclxuICAgIGVsc2Uge1xyXG4gICAgICB0aGlzLmRpc2FibGUodGhpcy4kaGl0LCB0aGlzLiRzdGFuZCwgdGhpcy4kZG91YmxlRG93biwgdGhpcy4kc3BsaXQpO1xyXG4gICAgICAkKFwiI2hhbmQxLCAjaGFuZDJcIikucmVtb3ZlQ2xhc3MoXCJjdXJyZW50SGFuZFwiKTtcclxuICAgICAgLy8gaWYgc3RhbmQgd2FzIGNhbGxlZCBieSBjbGlja2luZyAnZG91YmxlIGRvd24nLCBkbyBhZGRpdGlvbmFsIHdvcmtcclxuICAgICAgaWYgKGNhbGxlciA9PT0gXCJkb3VibGUtZG93blwiKSB7XHJcbiAgICAgICAgdGhpcy5iZXQgPSB0aGlzLmJldCAvIDI7XHJcbiAgICAgICAgJChcIi5iZXRcIikudGV4dCh0aGlzLmJldCk7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlKHRoaXMuJGRvdWJsZURvd24pO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIGRlYWxlcidzIHR1cm5cclxuICAgICAgdGhpcy5kZWFsZXJIYW5kLnJldmVhbEhvbGUoKTtcclxuICAgICAgd2hpbGUgKHRoaXMuZGVhbGVySGFuZC5nZXRQb2ludHMoKSA8IDE3KSB7XHJcbiAgICAgICAgdGhpcy5kZWFsT25lQ2FyZCh0aGlzLmRlYWxlckhhbmQpO1xyXG4gICAgICAgIHRoaXMuZGVhbGVySGFuZC51cGRhdGVEaXNwbGF5KHRoaXMuZGVhbGVySGFuZC5nZXRQb2ludHMoKSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMuZGVhbGVySGFuZC5nZXRQb2ludHMoKSA+IDIxKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiRGVhbGVyIGJ1c3RzXCIpO1xyXG4gICAgICAgIHRoaXMub3V0Y29tZShcIndpblwiKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICB0aGlzLmV2YWx1YXRlSGFuZCh0aGlzLnBsYXllckhhbmQpO1xyXG4gICAgICAgIHRoaXMuaW52b2tlT3V0Y29tZSh0aGlzLnBsYXllckhhbmQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzcGxpdCgpIHtcclxuICAgIHRoaXMuc3BsaXRJblBsYXkgPSB0cnVlO1xyXG4gICAgdGhpcy5wbGF5ZXJIYW5kLiR3cmFwcGVyLmFkZENsYXNzKFwiY3VycmVudEhhbmRcIik7XHJcbiAgICAvLyBkb3VibGUgYmV0IGFuZCBkaXNwbGF5IGl0XHJcbiAgICB0aGlzLmN1cnJlbnRCZXQgPSB0aGlzLmN1cnJlbnRCZXQgKiAyO1xyXG4gICAgJChcIi5jdXJyZW50QmV0XCIpLnRleHQodGhpcy5jdXJyZW50QmV0KTtcclxuICAgIC8vIHN0YXJ0IGFkZGl0aW9uYWwgaGFuZCBhbmQgbW92ZSBvbmUgY2FyZCBmcm9tIGhhbmQgMSB0byBoYW5kIDJcclxuICAgIGxldCBjYXJkID0gdGhpcy5wbGF5ZXJIYW5kLnJlbW92ZUNhcmQoKTtcclxuICAgIHRoaXMucGxheWVySGFuZDIgPSBuZXcgSGFuZChcInBsYXllclwiLCAyKTtcclxuICAgIHRoaXMuZGVhbE9uZUNhcmQodGhpcy5wbGF5ZXJIYW5kMik7XHJcbiAgICAkKFwiLnBsYXllckhhbmQtZGl2XCIpLmNzcyhcIndpZHRoXCIsIFwiNTAlXCIpO1xyXG4gICAgJChcIiNoYW5kMSAucGxheWVyLWhhbmQgaW1nOmxhc3QtY2hpbGRcIikucmVtb3ZlKCk7XHJcbiAgICB0aGlzLmRpc2FibGUodGhpcy4kc3BsaXQpO1xyXG4gICAgdGhpcy5wbGF5ZXJIYW5kLnVwZGF0ZURpc3BsYXkodGhpcy5wbGF5ZXJIYW5kLmdldFBvaW50cygpKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZU1lc3NhZ2UobWVzc2FnZSkge1xyXG4gICAgJChcIi5tZXNzYWdlc1wiKS5hcHBlbmQoYDxoMT4ke21lc3NhZ2V9PC9oMT5gKTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvZ2FtZS5qcyIsImltcG9ydCBDYXJkIGZyb20gXCIuL2NhcmRcIjtcclxuaW1wb3J0IEhhbmQgZnJvbSBcIi4vaGFuZFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVjayB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmNhcmRzID0gW107XHJcbiAgfVxyXG5cclxuICBkcmF3KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2FyZHMucG9wKCk7XHJcbiAgfVxyXG5cclxuICBnZW5lcmF0ZShudW1EZWNrcykge1xyXG4gICAgaWYgKCFudW1EZWNrcykge1xyXG4gICAgICBudW1EZWNrcyA9IDE7XHJcbiAgICB9XHJcbiAgICB3aGlsZSAobnVtRGVja3MgPiAwKSB7XHJcbiAgICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IDEzOyBpKyspIHtcclxuICAgICAgICB0aGlzLmNhcmRzLnB1c2gobmV3IENhcmQoaSwgXCJzcGFkZXNcIikpO1xyXG4gICAgICAgIHRoaXMuY2FyZHMucHVzaChuZXcgQ2FyZChpLCBcImRpYW1vbmRzXCIpKTtcclxuICAgICAgICB0aGlzLmNhcmRzLnB1c2gobmV3IENhcmQoaSwgXCJoZWFydHNcIikpO1xyXG4gICAgICAgIHRoaXMuY2FyZHMucHVzaChuZXcgQ2FyZChpLCBcImNsdWJzXCIpKTtcclxuICAgICAgfVxyXG4gICAgICBudW1EZWNrcy0tO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2h1ZmZsZSgpIHtcclxuICAgIGZvciAobGV0IGkgPSB0aGlzLmNhcmRzLmxlbmd0aCAtIDE7IGkgPiAwOyBpLS0pIHtcclxuICAgICAgY29uc3QgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChpICsgMSkpO1xyXG4gICAgICBbdGhpcy5jYXJkc1tpXV0gPSBbdGhpcy5jYXJkc1tqXV07XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2RlY2suanMiXSwic291cmNlUm9vdCI6IiJ9