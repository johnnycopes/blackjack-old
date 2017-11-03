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
      // this.gameDeck.shuffle();
      this.dealOneCard(this.dealerHand, "hole");
      this.dealOneCard(this.playerHand);
      var dealerPoints = this.dealOneCard(this.dealerHand);
      var playerPoints = this.dealOneCard(this.playerHand);

      // conceal dealer total and display user total
      // let dealerPoints = this.dealerHand.getPoints();
      // let playerPoints = this.playerHand.getPoints();
      this.dealerHand.updateDisplay("?");
      // this.playerHand.updateDisplay(playerPoints);

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
      this.playerHand.updateDisplay(this.playerHand.getPoints());
      this.playerHand2.updateDisplay(this.playerHand2.getPoints());
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgN2E1ZTI0YTMyODA3MWNmMjRmMjgiLCJ3ZWJwYWNrOi8vLy4vanMvaGFuZC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jYXJkLmpzIiwid2VicGFjazovLy8uL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9nYW1lLmpzIiwid2VicGFjazovLy8uL2pzL2RlY2suanMiXSwibmFtZXMiOlsiSGFuZCIsIm93bmVyIiwiaGFuZE51bWJlciIsInNlbGVjdG9yIiwiJHdyYXBwZXIiLCIkIiwiJGhhbmQiLCIkcG9pbnRzIiwicGxheWluZyIsImNhcmRzIiwib3V0Y29tZSIsImNhcmQiLCIkY2FyZCIsInB1c2giLCJhcHBlbmQiLCJwb2ludCIsInRvdGFsIiwiYWNlcyIsInBvcCIsImZpbmQiLCJyZW1vdmUiLCJhdHRyIiwiZ2V0SW1hZ2VVcmwiLCJpbmRleCIsImNvbnRlbnQiLCJ0ZXh0IiwiQ2FyZCIsInN1aXQiLCJ2YWx1ZSIsImN1cnJlbnRHYW1lIiwibWFrZUJldCIsIm9uIiwicmVzZXRHYW1lIiwiZ2FtZURlY2siLCJnZW5lcmF0ZSIsImRlYWwiLCJoaXQiLCJzdGFuZCIsImRvdWJsZURvd24iLCJzcGxpdCIsIkdhbWUiLCJkZWFsZXJIYW5kIiwicGxheWVySGFuZCIsImN1cnJlbnRIYW5kIiwic3BsaXRJblBsYXkiLCJtb25leSIsImN1cnJlbnRCZXQiLCJjaGFuZ2UiLCIkZGVhbCIsIiRoaXQiLCIkc3RhbmQiLCIkZG91YmxlRG93biIsIiRzcGxpdCIsIiRjaGFuZ2UiLCJjbGFzc05hbWUiLCJzeW1ib2wiLCJNYXRoIiwiYWJzIiwiaGFuZCIsInNwZWNpYWwiLCJkcmF3IiwiYWRkQ2xhc3MiLCJhZGRDYXJkIiwidXBkYXRlRGlzcGxheSIsImdldFBvaW50cyIsImdhbWVNb2RlIiwiZGVhbE9uZUNhcmQiLCJkZWFsZXJQb2ludHMiLCJwbGF5ZXJQb2ludHMiLCJ1cGRhdGVNZXNzYWdlIiwiZW5hYmxlIiwiY2FuU3BsaXQiLCJlbGVtZW50cyIsImVsZW1lbnQiLCJwcmV2QmV0IiwiYXNzZXNzQ2hhbmdlIiwiZGlzYWJsZSIsInNob3ciLCJoaWRlIiwiY3NzIiwicmVtb3ZlQ2xhc3MiLCJwbGF5ZXJIYW5kMiIsImhhbmQxIiwibGVuZ3RoIiwiaGFuZDIiLCJiZXQiLCIkdG90YWwiLCIkY3VycmVudEJldCIsImdhbWUiLCJoYXNDbGFzcyIsIm1vZGFsVHlwZSIsImh0bWwiLCJyZXNldE1vbmV5IiwicmVzdWx0IiwicmV2ZWFsSG9sZSIsIm1vZGFsIiwiZW5kR2FtZU1vZGUiLCJlbXB0eSIsImNhbGxlciIsImV2YWx1YXRlSGFuZCIsImludm9rZU91dGNvbWUiLCJyZW1vdmVkQ2FyZCIsInJlbW92ZUNhcmQiLCJtZXNzYWdlIiwiRGVjayIsIm51bURlY2tzIiwiaSIsImoiLCJmbG9vciIsInJhbmRvbSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDN0RBOzs7Ozs7OztJQUVxQkEsSTtBQUNuQixnQkFBWUMsS0FBWixFQUFtQkMsVUFBbkIsRUFBK0I7QUFBQTs7QUFDN0IsUUFBSUMsaUJBQUo7QUFDQSxRQUFJRixVQUFVLFFBQWQsRUFBd0I7QUFDdEJFLGlCQUFXLFNBQVg7QUFDRCxLQUZELE1BR0ssSUFBSUYsVUFBVSxRQUFkLEVBQXdCO0FBQzNC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S0FBTCxDQUFXSSxJQUFYLENBQWdCLG1CQUFTNkYsQ0FBVCxFQUFZLFFBQVosQ0FBaEI7QUFDQSxlQUFLakcsS0FBTCxDQUFXSSxJQUFYLENBQWdCLG1CQUFTNkYsQ0FBVCxFQUFZLFVBQVosQ0FBaEI7QUFDQSxlQUFLakcsS0FBTCxDQUFXSSxJQUFYLENBQWdCLG1CQUFTNkYsQ0FBVCxFQUFZLFFBQVosQ0FBaEI7QUFDQSxlQUFLakcsS0FBTCxDQUFXSSxJQUFYLENBQWdCLG1CQUFTNkYsQ0FBVCxFQUFZLE9BQVosQ0FBaEI7QUFDRDtBQUNERDtBQUNEO0FBQ0Y7Ozs4QkFFUztBQUNSLFdBQUssSUFBSUMsSUFBSSxLQUFLakcsS0FBTCxDQUFXMEUsTUFBWCxHQUFvQixDQUFqQyxFQUFvQ3VCLElBQUksQ0FBeEMsRUFBMkNBLEdBQTNDLEVBQWdEO0FBQzlDLFlBQU1DLElBQUluRCxLQUFLb0QsS0FBTCxDQUFXcEQsS0FBS3FELE1BQUwsTUFBaUJILElBQUksQ0FBckIsQ0FBWCxDQUFWO0FBRDhDLG1CQUU1QixDQUFDLEtBQUtqRyxLQUFMLENBQVdrRyxDQUFYLENBQUQsQ0FGNEI7QUFFN0MsYUFBS2xHLEtBQUwsQ0FBV2lHLENBQVgsQ0FGNkM7QUFHL0M7QUFDRjs7Ozs7O2tCQTdCa0JGLEkiLCJmaWxlIjoiLi9qcy9tYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgN2E1ZTI0YTMyODA3MWNmMjRmMjgiLCJpbXBvcnQgQ2FyZCBmcm9tIFwiLi9jYXJkXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIYW5kIHtcclxuICBjb25zdHJ1Y3Rvcihvd25lciwgaGFuZE51bWJlcikge1xyXG4gICAgbGV0IHNlbGVjdG9yO1xyXG4gICAgaWYgKG93bmVyID09PSAnZGVhbGVyJykge1xyXG4gICAgICBzZWxlY3RvciA9IFwiI2RlYWxlclwiO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAob3duZXIgPT09ICdwbGF5ZXInKSB7XHJcbiAgICAgIGlmIChoYW5kTnVtYmVyID09PSAxKSB7XHJcbiAgICAgICAgc2VsZWN0b3IgPSBcIiNoYW5kMVwiO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKGhhbmROdW1iZXIgPT09IDIpIHtcclxuICAgICAgICBzZWxlY3RvciA9IFwiI2hhbmQyXCI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuJHdyYXBwZXIgPSAkKGAke3NlbGVjdG9yfWApO1xyXG4gICAgdGhpcy4kaGFuZCA9ICQoYCR7c2VsZWN0b3J9IC5oYW5kYCk7XHJcbiAgICB0aGlzLiRwb2ludHMgPSAkKGAke3NlbGVjdG9yfSAucG9pbnRzYCk7XHJcbiAgICB0aGlzLnBsYXlpbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuY2FyZHMgPSBbXTtcclxuICAgIHRoaXMub3V0Y29tZTtcclxuICB9XHJcblxyXG4gIGFkZENhcmQoY2FyZCwgJGNhcmQpIHtcclxuICAgIHRoaXMuY2FyZHMucHVzaChjYXJkKTtcclxuICAgIHRoaXMuJGhhbmQuYXBwZW5kKCRjYXJkKTtcclxuICB9XHJcblxyXG4gIGNhblNwbGl0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2FyZHNbMF0ucG9pbnQgPT09IHRoaXMuY2FyZHNbMV0ucG9pbnQ7XHJcbiAgfVxyXG5cclxuICBnZXRQb2ludHMoKSB7XHJcbiAgICBsZXQgdG90YWwgPSAwO1xyXG4gICAgbGV0IGFjZXMgPSAwO1xyXG4gICAgZm9yIChsZXQgY2FyZCBvZiB0aGlzLmNhcmRzKSB7XHJcbiAgICAgIGxldCBwb2ludCA9IGNhcmQucG9pbnQ7XHJcbiAgICAgIGlmIChwb2ludCA9PT0gMSkge1xyXG4gICAgICAgIHRvdGFsICs9IDEwO1xyXG4gICAgICAgIGFjZXMrKztcclxuICAgICAgfSBcclxuICAgICAgZWxzZSBpZiAocG9pbnQgPiAxMCkge1xyXG4gICAgICAgIHBvaW50ID0gMTA7XHJcbiAgICAgIH1cclxuICAgICAgdG90YWwgKz0gcG9pbnQ7XHJcbiAgICAgIHdoaWxlICh0b3RhbCA+IDIxICYmIGFjZXMgPiAwKSB7XHJcbiAgICAgICAgdG90YWwgLT0gMTA7XHJcbiAgICAgICAgYWNlcy0tO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG90YWw7XHJcbiAgfVxyXG5cclxuICByZW1vdmVDYXJkKCkge1xyXG4gICAgbGV0IGNhcmQgPSB0aGlzLmNhcmRzLnBvcCgpO1xyXG4gICAgbGV0ICRjYXJkID0gdGhpcy4kaGFuZC5maW5kKFwiaW1nOmxhc3QtY2hpbGRcIikucmVtb3ZlKCk7XHJcbiAgICByZXR1cm4ge2NhcmQsICRjYXJkfTtcclxuICB9XHJcblxyXG4gIHJldmVhbEhvbGUoKSB7XHJcbiAgICB0aGlzLiRoYW5kLmZpbmQoJ2ltZzpmaXJzdC1jaGlsZCcpLmF0dHIoJ3NyYycsIHRoaXMuY2FyZHNbMF0uZ2V0SW1hZ2VVcmwoKSk7XHJcbiAgfVxyXG5cclxuICBzZWVDYXJkKGluZGV4KSB7XHJcbiAgICByZXR1cm4gdGhpcy5jYXJkc1tpbmRleCAtIDFdO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlRGlzcGxheShjb250ZW50KSB7XHJcbiAgICB0aGlzLiRwb2ludHMudGV4dChjb250ZW50KTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvaGFuZC5qcyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcmQge1xyXG4gIGNvbnN0cnVjdG9yKHBvaW50LCBzdWl0KSB7XHJcbiAgICB0aGlzLnBvaW50ID0gcG9pbnQ7XHJcbiAgICB0aGlzLnN1aXQgPSBzdWl0O1xyXG4gIH1cclxuXHJcbiAgZ2V0SW1hZ2VVcmwoKSB7XHJcbiAgICBsZXQgdmFsdWUgPSB0aGlzLnBvaW50O1xyXG4gICAgaWYgKHRoaXMucG9pbnQgPT09IDExKSB7XHJcbiAgICAgIHZhbHVlID0gXCJqYWNrXCI7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0aGlzLnBvaW50ID09PSAxMikge1xyXG4gICAgICB2YWx1ZSA9IFwicXVlZW5cIjtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXMucG9pbnQgPT09IDEzKSB7XHJcbiAgICAgIHZhbHVlID0gXCJraW5nXCI7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0aGlzLnBvaW50ID09PSAxKSB7XHJcbiAgICAgIHZhbHVlID0gXCJhY2VcIjtcclxuICAgIH1cclxuICAgIHJldHVybiBgaW1hZ2VzLyR7dmFsdWV9X29mXyR7dGhpcy5zdWl0fS5zdmdgO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9jYXJkLmpzIiwiaW1wb3J0IEdhbWUgZnJvbSAnLi9nYW1lJztcblxudmFyIGN1cnJlbnRHYW1lID0gbmV3IEdhbWU7XG5cbmN1cnJlbnRHYW1lLm1ha2VCZXQoKTtcblxuJCgnLmRlYWwnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgY3VycmVudEdhbWUucmVzZXRHYW1lKCk7XG4gIGN1cnJlbnRHYW1lLmdhbWVEZWNrLmdlbmVyYXRlKDMpO1xuICBjdXJyZW50R2FtZS5kZWFsKCk7XG59KTtcblxuJCgnLmhpdCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICBjdXJyZW50R2FtZS5oaXQoKTtcbn0pO1xuXG4kKCcuc3RhbmQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgY3VycmVudEdhbWUuc3RhbmQoKTtcbn0pO1xuXG4kKCcuZG91YmxlLWRvd24nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgY3VycmVudEdhbWUuZG91YmxlRG93bigpO1xufSk7XG5cbiQoJy5zcGxpdCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICBjdXJyZW50R2FtZS5zcGxpdCgpO1xufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9hcHAuanMiLCJpbXBvcnQgSGFuZCBmcm9tIFwiLi9oYW5kXCI7XHJcbmltcG9ydCBEZWNrIGZyb20gXCIuL2RlY2tcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWUge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5nYW1lRGVjayA9IG5ldyBEZWNrO1xyXG4gICAgdGhpcy5kZWFsZXJIYW5kID0gbmV3IEhhbmQoJ2RlYWxlcicpO1xyXG4gICAgdGhpcy5wbGF5ZXJIYW5kID0gbmV3IEhhbmQoJ3BsYXllcicsIDEpO1xyXG4gICAgdGhpcy5jdXJyZW50SGFuZCA9IFwiaGFuZDFcIjtcclxuICAgIHRoaXMuc3BsaXRJblBsYXkgPSBmYWxzZTtcclxuICAgIHRoaXMubW9uZXkgPSA1MDA7XHJcbiAgICB0aGlzLmN1cnJlbnRCZXQgPSAxMDtcclxuICAgIHRoaXMuY2hhbmdlO1xyXG4gICAgXHJcbiAgICB0aGlzLiRkZWFsID0gJChcIi5kZWFsXCIpO1xyXG4gICAgdGhpcy4kaGl0ID0gJChcIi5oaXRcIik7XHJcbiAgICB0aGlzLiRzdGFuZCA9ICQoXCIuc3RhbmRcIik7XHJcbiAgICB0aGlzLiRkb3VibGVEb3duID0gJChcIi5kb3VibGUtZG93blwiKTtcclxuICAgIHRoaXMuJHNwbGl0ID0gJChcIi5zcGxpdFwiKTtcclxuICAgIHRoaXMuJGNoYW5nZSA9ICQoXCIuY2hhbmdlXCIpO1xyXG4gIH1cclxuXHJcbiAgYXNzZXNzQ2hhbmdlKCkge1xyXG4gICAgbGV0IGNsYXNzTmFtZSA9IFwiXCI7XHJcbiAgICBsZXQgc3ltYm9sID0gXCJcIjtcclxuICAgIGlmICh0aGlzLmNoYW5nZSA+IDApIHtcclxuICAgICAgY2xhc3NOYW1lID0gXCJwb3NpdGl2ZVwiO1xyXG4gICAgICBzeW1ib2wgPSBcIitcIjtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXMuY2hhbmdlIDwgMCkge1xyXG4gICAgICBjbGFzc05hbWUgPSBcIm5lZ2F0aXZlXCI7XHJcbiAgICAgIHN5bWJvbCA9IFwiLVwiO1xyXG4gICAgfVxyXG4gICAgdGhpcy4kY2hhbmdlLmFwcGVuZChgPHNwYW4gY2xhc3M9XCIke2NsYXNzTmFtZX1cIj4ke3N5bWJvbH0gJCR7TWF0aC5hYnModGhpcy5jaGFuZ2UpfTwvc3Bhbj5gKTtcclxuICB9XHJcblxyXG4gIGRlYWxPbmVDYXJkKGhhbmQsIHNwZWNpYWwpIHtcclxuICAgIGxldCBjYXJkID0gdGhpcy5nYW1lRGVjay5kcmF3KCk7XHJcbiAgICBsZXQgJGNhcmQgPSAkKFwiPGltZyAvPlwiLCB7XHJcbiAgICAgIFwiY2xhc3NcIjogXCJjYXJkXCIsIFxyXG4gICAgICBcInNyY1wiOiBgJHtjYXJkLmdldEltYWdlVXJsKCl9YFxyXG4gICAgfSk7XHJcbiAgICBpZiAoc3BlY2lhbCA9PT0gXCJob2xlXCIpIHtcclxuICAgICAgJGNhcmQuYXR0cignc3JjJywgXCJpbWFnZXMvYmFjay1zdWl0cy1yZWQuc3ZnXCIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoc3BlY2lhbCA9PT0gXCJkb3VibGUtZG93blwiKSB7XHJcbiAgICAgICRjYXJkLmFkZENsYXNzKCdjYXJkLWRkJyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChzcGVjaWFsID09PSBcInNwbGl0XCIpIHtcclxuICAgICAgJGNhcmQuYWRkQ2xhc3MoJ3NwbGl0Jyk7XHJcbiAgICB9XHJcbiAgICBoYW5kLmFkZENhcmQoY2FyZCwgJGNhcmQpO1xyXG4gICAgaGFuZC51cGRhdGVEaXNwbGF5KGhhbmQuZ2V0UG9pbnRzKCkpO1xyXG4gICAgcmV0dXJuIGhhbmQuZ2V0UG9pbnRzKCk7XHJcbiAgfVxyXG5cclxuICBkZWFsKCkge1xyXG4gICAgdGhpcy5nYW1lTW9kZSgpO1xyXG4gICAgdGhpcy5wbGF5ZXJIYW5kLnBsYXlpbmcgPSB0cnVlO1xyXG5cclxuICAgIC8vIHNodWZmbGUgZGVjayhzKSBhbmQgZGVhbCBjYXJkc1xyXG4gICAgLy8gdGhpcy5nYW1lRGVjay5zaHVmZmxlKCk7XHJcbiAgICB0aGlzLmRlYWxPbmVDYXJkKHRoaXMuZGVhbGVySGFuZCwgXCJob2xlXCIpO1xyXG4gICAgdGhpcy5kZWFsT25lQ2FyZCh0aGlzLnBsYXllckhhbmQpO1xyXG4gICAgbGV0IGRlYWxlclBvaW50cyA9IHRoaXMuZGVhbE9uZUNhcmQodGhpcy5kZWFsZXJIYW5kKTtcclxuICAgIGxldCBwbGF5ZXJQb2ludHMgPSB0aGlzLmRlYWxPbmVDYXJkKHRoaXMucGxheWVySGFuZCk7XHJcblxyXG4gICAgLy8gY29uY2VhbCBkZWFsZXIgdG90YWwgYW5kIGRpc3BsYXkgdXNlciB0b3RhbFxyXG4gICAgLy8gbGV0IGRlYWxlclBvaW50cyA9IHRoaXMuZGVhbGVySGFuZC5nZXRQb2ludHMoKTtcclxuICAgIC8vIGxldCBwbGF5ZXJQb2ludHMgPSB0aGlzLnBsYXllckhhbmQuZ2V0UG9pbnRzKCk7XHJcbiAgICB0aGlzLmRlYWxlckhhbmQudXBkYXRlRGlzcGxheShcIj9cIik7XHJcbiAgICAvLyB0aGlzLnBsYXllckhhbmQudXBkYXRlRGlzcGxheShwbGF5ZXJQb2ludHMpO1xyXG5cclxuICAgIGlmIChkZWFsZXJQb2ludHMgPT09IDIxICYmIHBsYXllclBvaW50cyA9PT0gMjEpIHtcclxuICAgICAgdGhpcy5vdXRjb21lKFwicHVzaFwiKTtcclxuICAgICAgdGhpcy5kZWFsZXJIYW5kLnVwZGF0ZURpc3BsYXkoXCJCbGFja2phY2tcIik7XHJcbiAgICAgIHRoaXMucGxheWVySGFuZC51cGRhdGVEaXNwbGF5KFwiQkxBQ0tKQUNLLCBIT1QgREFNTiFcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChkZWFsZXJQb2ludHMgPT09IDIxKSB7XHJcbiAgICAgIHRoaXMub3V0Y29tZShcImxvc2VcIik7XHJcbiAgICAgIHRoaXMuZGVhbGVySGFuZC51cGRhdGVEaXNwbGF5KFwiQmxhY2tqYWNrXCIpO1xyXG4gICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJEZWFsZXIgd2luc1wiKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHBsYXllclBvaW50cyA9PT0gMjEpIHtcclxuICAgICAgdGhpcy5vdXRjb21lKFwiYmxhY2tqYWNrXCIpO1xyXG4gICAgICB0aGlzLmRlYWxlckhhbmQudXBkYXRlRGlzcGxheShkZWFsZXJQb2ludHMpO1xyXG4gICAgICB0aGlzLnBsYXllckhhbmQudXBkYXRlRGlzcGxheShcIkJMQUNLSkFDSywgSE9UIERBTU4hXCIpO1xyXG4gICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJZb3Ugd2luIVwiKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXMubW9uZXkgPiB0aGlzLmN1cnJlbnRCZXQgKiAyKSB7XHJcbiAgICAgIGlmIChwbGF5ZXJQb2ludHMgPT09IDExKSAge1xyXG4gICAgICAgIHRoaXMuZW5hYmxlKHRoaXMuJGRvdWJsZURvd24pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLnBsYXllckhhbmQuY2FuU3BsaXQoKSkge1xyXG4gICAgICAgIHRoaXMuZW5hYmxlKHRoaXMuJHNwbGl0KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZGlzYWJsZSguLi5lbGVtZW50cykge1xyXG4gICAgZm9yIChsZXQgZWxlbWVudCBvZiBlbGVtZW50cykge1xyXG4gICAgICBlbGVtZW50LmF0dHIoXCJkaXNhYmxlZFwiLCB0cnVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRvdWJsZURvd24oKSB7XHJcbiAgICAvLyBkb3VibGUgYmV0IGFuZCBkaXNwbGF5IGl0XHJcbiAgICB0aGlzLmN1cnJlbnRCZXQgKj0gMjtcclxuICAgICQoXCIuY3VycmVudEJldFwiKS50ZXh0KHRoaXMuY3VycmVudEJldCk7XHJcbiAgICAvLyBkZWFsIHRoZSBwbGF5ZXIgb25lIG1vcmUgY2FyZCBhbmQgdGhlbiBtb3ZlIG9uIHRvIHRoZSBkZWFsZXIncyB0dXJuXHJcbiAgICB0aGlzLmRlYWxPbmVDYXJkKHRoaXMucGxheWVySGFuZCwgXCJkb3VibGUtZG93blwiKTtcclxuICAgIHRoaXMucGxheWVySGFuZC51cGRhdGVEaXNwbGF5KHRoaXMucGxheWVySGFuZC5nZXRQb2ludHMoKSk7XHJcbiAgICB0aGlzLnN0YW5kKFwiZG91YmxlLWRvd25cIik7XHJcbiAgfVxyXG5cclxuICBlbmFibGUoLi4uZWxlbWVudHMpIHtcclxuICAgIGZvciAobGV0IGVsZW1lbnQgb2YgZWxlbWVudHMpIHtcclxuICAgICAgZWxlbWVudC5hdHRyKFwiZGlzYWJsZWRcIiwgZmFsc2UpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZW5kR2FtZU1vZGUoKSB7XHJcbiAgICAkKFwiLnRvdGFsXCIpLnRleHQodGhpcy5tb25leSk7XHJcbiAgICAkKFwiLnByZXZCZXRcIikuYXBwZW5kKGA8c3Bhbj4kJHt0aGlzLnByZXZCZXR9PC9zcGFuPmApO1xyXG4gICAgdGhpcy5hc3Nlc3NDaGFuZ2UoKTtcclxuICAgIHRoaXMuZW5hYmxlKHRoaXMuJGRlYWwpO1xyXG4gICAgdGhpcy5kaXNhYmxlKHRoaXMuJGhpdCwgdGhpcy4kc3RhbmQpO1xyXG4gICAgJChcIi5iZXR0aW5nIC5idXR0b25zXCIpLnNob3coKTtcclxuICB9XHJcblxyXG4gIGV2YWx1YXRlSGFuZChoYW5kKSB7XHJcbiAgICBsZXQgZGVhbGVyUG9pbnRzID0gdGhpcy5kZWFsZXJIYW5kLmdldFBvaW50cygpO1xyXG4gICAgbGV0IHBsYXllclBvaW50cyA9IGhhbmQuZ2V0UG9pbnRzKCk7XHJcbiAgICBpZiAoZGVhbGVyUG9pbnRzID4gMjEgfHwgcGxheWVyUG9pbnRzID4gZGVhbGVyUG9pbnRzKSB7XHJcbiAgICAgIGhhbmQub3V0Y29tZSA9IFwid2luXCI7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChwbGF5ZXJQb2ludHMgPCBkZWFsZXJQb2ludHMpIHtcclxuICAgICAgaGFuZC5vdXRjb21lID0gXCJsb3NlXCI7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgaGFuZC5vdXRjb21lID0gXCJwdXNoXCI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnYW1lTW9kZSgpIHtcclxuICAgICQoXCIudGl0bGUtc2NyZWVuXCIpLmhpZGUoKTtcclxuICAgICQoXCIucGxheWVySGFuZC1kaXZcIikuY3NzKFwid2lkdGhcIiwgXCIxMDAlXCIpOyAvLyByZXNldCBoYW5kIGFkanVzdG1lbnQgZm9yIG1vYmlsZSBpbiBjYXNlIG9mICdzcGxpdCdcclxuICAgIHRoaXMuZW5hYmxlKHRoaXMuJGhpdCwgdGhpcy4kc3RhbmQpO1xyXG4gICAgdGhpcy5kaXNhYmxlKHRoaXMuJGRlYWwpO1xyXG4gICAgJChcIi5iZXR0aW5nIC5idXR0b25zXCIpLmhpZGUoKTtcclxuICB9XHJcblxyXG4gIGhpdCgpIHtcclxuICAgIHRoaXMuZGlzYWJsZSh0aGlzLiRkb3VibGVEb3duLCB0aGlzLiRzcGxpdCk7XHJcbiAgICBpZiAodGhpcy5jdXJyZW50SGFuZCA9PT0gXCJoYW5kMVwiKSB7XHJcbiAgICAgIGlmICghdGhpcy5zcGxpdEluUGxheSkge1xyXG4gICAgICAgIHRoaXMuZGVhbE9uZUNhcmQodGhpcy5wbGF5ZXJIYW5kKTtcclxuICAgICAgICBsZXQgcGxheWVyUG9pbnRzID0gdGhpcy5wbGF5ZXJIYW5kLmdldFBvaW50cygpO1xyXG4gICAgICAgIHRoaXMucGxheWVySGFuZC51cGRhdGVEaXNwbGF5KHBsYXllclBvaW50cyk7XHJcbiAgICAgICAgaWYgKHBsYXllclBvaW50cyA+IDIxKSB7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJZb3UgYnVzdFwiKTtcclxuICAgICAgICAgIHRoaXMub3V0Y29tZShcImxvc2VcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgeyAvLyBzcGxpdCBpcyBpbiBwbGF5XHJcbiAgICAgICAgdGhpcy5kZWFsT25lQ2FyZCh0aGlzLnBsYXllckhhbmQsIFwic3BsaXRcIik7XHJcbiAgICAgICAgbGV0IHBsYXllclBvaW50cyA9IHRoaXMucGxheWVySGFuZC5nZXRQb2ludHMoKTtcclxuICAgICAgICB0aGlzLnBsYXllckhhbmQudXBkYXRlRGlzcGxheShwbGF5ZXJQb2ludHMpO1xyXG4gICAgICAgIGlmIChwbGF5ZXJQb2ludHMgPiAyMSkge1xyXG4gICAgICAgICAgdGhpcy5zcGxpdEluUGxheSA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5jdXJyZW50SGFuZCA9IFwiaGFuZDJcIjtcclxuICAgICAgICAgICQoXCIjaGFuZDFcIikucmVtb3ZlQ2xhc3MoXCJjdXJyZW50SGFuZFwiKTtcclxuICAgICAgICAgICQoXCIjaGFuZDJcIikuYWRkQ2xhc3MoXCJjdXJyZW50SGFuZFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXMuY3VycmVudEhhbmQgPT09IFwiaGFuZDJcIikge1xyXG4gICAgICB0aGlzLmRlYWxPbmVDYXJkKHRoaXMucGxheWVySGFuZDIsIFwic3BsaXRcIik7XHJcbiAgICAgIGxldCBwbGF5ZXJQb2ludHMgPSB0aGlzLnBsYXllckhhbmQyLmdldFBvaW50cygpO1xyXG4gICAgICB0aGlzLnBsYXllckhhbmQyLnVwZGF0ZURpc3BsYXkocGxheWVyUG9pbnRzKTtcclxuICAgICAgaWYgKHBsYXllclBvaW50cyA+IDIxKSB7XHJcbiAgICAgICAgJChcIiNoYW5kMlwiKS5yZW1vdmVDbGFzcyhcImN1cnJlbnRIYW5kXCIpO1xyXG4gICAgICAgIHRoaXMuc3RhbmQoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaW52b2tlT3V0Y29tZSguLi5oYW5kcykge1xyXG4gICAgbGV0IGhhbmQxID0gaGFuZHNbMF07XHJcbiAgICBpZiAoaGFuZHMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgIGlmIChoYW5kMS5vdXRjb21lID09PSBcIndpblwiKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiWW91IHdpbiFcIik7XHJcbiAgICAgICAgdGhpcy5vdXRjb21lKFwid2luXCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKGhhbmQxLm91dGNvbWUgPT09IFwibG9zZVwiKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiRGVhbGVyIHdpbnNcIik7XHJcbiAgICAgICAgdGhpcy5vdXRjb21lKFwibG9zZVwiKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICB0aGlzLm91dGNvbWUoXCJwdXNoXCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChoYW5kcy5sZW5ndGggPT09IDIpIHtcclxuICAgICAgbGV0IGhhbmQyID0gaGFuZHNbMV07XHJcbiAgICAgIGlmIChoYW5kMSA9PT0gaGFuZDIpIHtcclxuICAgICAgICBpZiAoaGFuZDEgPT09IFwiYmxhY2tqYWNrXCIgJiYgaGFuZDIgPT09IFwiYmxhY2tqYWNrXCIpIHtcclxuICAgICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIlRXTyBCTEFDS0pBQ0tTISEhXCIpO1xyXG4gICAgICAgICAgdGhpcy5vdXRjb21lKFwiYmxhY2tqYWNrXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChoYW5kMSA9PT0gXCJ3aW5cIiAmJiBoYW5kMiA9PT0gXCJ3aW5cIikge1xyXG4gICAgICAgICAgdGhpcy5vdXRjb21lKFwid2luXCIpO1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiWW91IHdpbiBib3RoIVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoaGFuZDEgPT09IFwibG9zZVwiICYmIGhhbmQyID09PSBcImxvc2VcIikge1xyXG4gICAgICAgICAgdGhpcy5vdXRjb21lKFwibG9zZVwiKTtcclxuICAgICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIkRlYWxlciB3aW5zIGJvdGhcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMub3V0Y29tZShcInB1c2hcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHRoaXMuY3VycmVudEJldCAvPSAyO1xyXG4gICAgICAgIGlmIChoYW5kMSA9PT0gXCJibGFja2phY2tcIiB8fCBoYW5kMiA9PT0gXCJibGFja2phY2tcIikge1xyXG4gICAgICAgICAgLy8gY2FsY3VsYXRlIGNvbWJpbmVkIG91dGNvbWVzIGJlZm9yZSBjYWxsaW5nIHRoZSBvdXRjb21lIG1ldGhvZFxyXG4gICAgICAgICAgbGV0IGJldCA9IGN1cnJlbnRCZXQ7XHJcbiAgICAgICAgICB0aGlzLmN1cnJlbnRCZXQgKj0gMS41O1xyXG4gICAgICAgICAgaWYgKGhhbmQxID09PSBcIndpblwiIHx8IGhhbmQyID09PSBcIndpblwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3V0Y29tZShcIndpblwiKTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50QmV0ICs9IGJldDtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiWW91IHdpbiBib3RoIVwiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsc2UgaWYgKGhhbmQxID09PSBcImxvc2VcIiB8fCBoYW5kMiA9PT0gXCJsb3NlXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5vdXRjb21lKFwid2luXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRCZXQgLT0gYmV0O1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJZb3UgYW5kIGRlYWxlciBlYWNoIHdpbiBvbmVcIik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5vdXRjb21lKFwid2luXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2UoXCJZb3Ugd2luIG9uZSwgcHVzaFwiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoaGFuZDEgPT09IFwid2luXCIgfHwgaGFuZDIgPT09IFwid2luXCIpIHtcclxuICAgICAgICAgIGlmIChoYW5kMSA9PT0gXCJwdXNoXCIgfHwgaGFuZDIgPT09IFwicHVzaFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3V0Y29tZShcIndpblwiKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiWW91IHdpbiBvbmUsIHB1c2hcIik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5vdXRjb21lKFwicHVzaFwiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoaGFuZDEgPT09IFwibG9zZVwiIHx8IGhhbmQyID09PSBcImxvc2VcIikge1xyXG4gICAgICAgICAgdGhpcy5vdXRjb21lKFwibG9zZVwiKTtcclxuICAgICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIkRlYWxlciB3aW5zIG9uZSwgcHVzaFwiKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbWFrZUJldCgpIHtcclxuICAgIHZhciAkdG90YWwgPSAkKFwiLnRvdGFsXCIpLFxyXG4gICAgICAgICRjdXJyZW50QmV0ID0gJChcIi5jdXJyZW50QmV0XCIpLFxyXG4gICAgICAgIGdhbWUgPSB0aGlzO1xyXG4gICAgJHRvdGFsLnRleHQodGhpcy5tb25leSk7XHJcbiAgICAkY3VycmVudEJldC50ZXh0KHRoaXMuY3VycmVudEJldCk7XHJcbiAgICAkKFwiLmJldC1idG5cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcclxuICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoXCJhZGQxMFwiKSAmJiBnYW1lLm1vbmV5IC0gZ2FtZS5jdXJyZW50QmV0ID49IDEwKSB7XHJcbiAgICAgICAgZ2FtZS5jdXJyZW50QmV0ICs9IDEwO1xyXG4gICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICQodGhpcykuaGFzQ2xhc3MoXCJhZGQ1MFwiKSAmJlxyXG4gICAgICAgIGdhbWUubW9uZXkgLSBnYW1lLmN1cnJlbnRCZXQgPj0gNTBcclxuICAgICAgKSB7XHJcbiAgICAgICAgZ2FtZS5jdXJyZW50QmV0ICs9IDUwO1xyXG4gICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICQodGhpcykuaGFzQ2xhc3MoXCJhZGQxMDBcIikgJiZcclxuICAgICAgICBnYW1lLm1vbmV5IC0gZ2FtZS5jdXJyZW50QmV0ID49IDEwMFxyXG4gICAgICApIHtcclxuICAgICAgICBnYW1lLmN1cnJlbnRCZXQgKz0gMTAwO1xyXG4gICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICQodGhpcykuaGFzQ2xhc3MoXCJhZGQ1MDBcIikgJiZcclxuICAgICAgICBnYW1lLm1vbmV5IC0gZ2FtZS5jdXJyZW50QmV0ID49IDUwMFxyXG4gICAgICApIHtcclxuICAgICAgICBnYW1lLmN1cnJlbnRCZXQgKz0gNTAwO1xyXG4gICAgICB9IGVsc2UgaWYgKCQodGhpcykuaGFzQ2xhc3MoXCJhbGwtaW5cIikpIHtcclxuICAgICAgICBnYW1lLmN1cnJlbnRCZXQgPSBnYW1lLm1vbmV5O1xyXG4gICAgICB9IGVsc2UgaWYgKCQodGhpcykuaGFzQ2xhc3MoXCJyZXNldFwiKSkge1xyXG4gICAgICAgIGdhbWUuY3VycmVudEJldCA9IDEwO1xyXG4gICAgICB9XHJcbiAgICAgICRjdXJyZW50QmV0LnRleHQoZ2FtZS5jdXJyZW50QmV0KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbW9kYWwobW9kYWxUeXBlKSB7XHJcbiAgICBpZiAobW9kYWxUeXBlID09PSBcImJhbmtydXB0XCIpIHtcclxuICAgICAgJChcIi5tb2RhbCwgLm1vZGFsLW92ZXJsYXlcIikucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpO1xyXG4gICAgICAkKFwiLm1vZGFsIC5tZXNzYWdlXCIpLmh0bWwoXHJcbiAgICAgICAgXCJZb3UndmUgbG9zdCBldmVyeXRoaW5nLlwiICtcclxuICAgICAgICAgIFwiPGJyLz48YnIvPlwiICtcclxuICAgICAgICAgIFwiR29vZCB0aGluZyBpdCdzIG5vdCByZWFsIG1vbmV5IVwiXHJcbiAgICAgICk7XHJcbiAgICAgICQoXCIubW9kYWwtZ3V0cyBidXR0b25cIikudGV4dChcIlBsYXkgYWdhaW5cIik7XHJcbiAgICAgICQoXCIubW9kYWwtZ3V0cyBidXR0b25cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKFwiLm1vZGFsLCAubW9kYWwtb3ZlcmxheVwiKS5hZGRDbGFzcyhcImhpZGVcIik7XHJcbiAgICAgICAgJChcIi50aXRsZS1zY3JlZW5cIikuc2hvdygpO1xyXG4gICAgICAgIGdhbWUucmVzZXRHYW1lKCk7XHJcbiAgICAgICAgZ2FtZS5yZXNldE1vbmV5KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIGlmIChtb2RhbFR5cGUgPT09IFwiaGVscFwiKSB7XHJcbiAgICAgIC8vIGZ1dHVyZSBnYW1lIGZlYXR1cmU6IGluc3RydWN0aW9ucyBhdmFpbGFibGUgaW4gaGVscCBtb2RhbFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb3V0Y29tZShyZXN1bHQpIHtcclxuICAgIHRoaXMucGxheWVySGFuZC5wbGF5aW5nID0gZmFsc2U7XHJcbiAgICB0aGlzLmRlYWxlckhhbmQucmV2ZWFsSG9sZSgpO1xyXG4gICAgdGhpcy5kZWFsZXJIYW5kLnVwZGF0ZURpc3BsYXkodGhpcy5kZWFsZXJIYW5kLmdldFBvaW50cygpKTtcclxuICAgIHRoaXMucHJldkJldCA9IHRoaXMuY3VycmVudEJldDtcclxuICAgIGlmIChyZXN1bHQgPT09IFwiYmxhY2tqYWNrXCIpIHtcclxuICAgICAgdGhpcy5tb25leSArPSB0aGlzLmN1cnJlbnRCZXQgKiAxLjU7XHJcbiAgICAgIHRoaXMuY2hhbmdlID0gdGhpcy5jdXJyZW50QmV0ICogMS41O1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAocmVzdWx0ID09PSBcIndpblwiKSB7XHJcbiAgICAgIHRoaXMubW9uZXkgKz0gdGhpcy5jdXJyZW50QmV0O1xyXG4gICAgICB0aGlzLmNoYW5nZSA9IHRoaXMuY3VycmVudEJldDtcclxuICAgIH0gXHJcbiAgICBlbHNlIGlmIChyZXN1bHQgPT09IFwicHVzaFwiKSB7XHJcbiAgICAgIHRoaXMudXBkYXRlTWVzc2FnZShcIlB1c2hcIik7XHJcbiAgICAgIHRoaXMubW9uZXkgPSB0aGlzLm1vbmV5O1xyXG4gICAgICB0aGlzLmNoYW5nZSA9IDA7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChyZXN1bHQgPT09IFwibG9zZVwiKSB7XHJcbiAgICAgIGlmICh0aGlzLm1vbmV5IC0gdGhpcy5jdXJyZW50QmV0ID49IDEwKSB7XHJcbiAgICAgICAgdGhpcy5tb25leSAtPSB0aGlzLmN1cnJlbnRCZXQ7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2UgPSAtdGhpcy5jdXJyZW50QmV0O1xyXG4gICAgICAgIC8vIGRyb3AgdGhlIGJldCBhbW91bnQgZG93biB0byBlcXVhbCBtb25leSBhbW91bnQgb2YgbGFzdCBiZXQgdmFsdWUgaXMgZ3JlYXRlciB0aGFuIHRvdGFsIG1vbmV5IHZhbHVlXHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudEJldCA+IHRoaXMubW9uZXkpIHtcclxuICAgICAgICAgIHRoaXMuY3VycmVudEJldCA9IHRoaXMubW9uZXk7XHJcbiAgICAgICAgICAkKFwiLmN1cnJlbnRCZXRcIikudGV4dCh0aGlzLmN1cnJlbnRCZXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBcclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgdGhpcy5tb2RhbChcImJhbmtydXB0XCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLmVuZEdhbWVNb2RlKCk7XHJcbiAgfVxyXG5cclxuICByZXNldEdhbWUoKSB7XHJcbiAgICB0aGlzLmdhbWVEZWNrID0gbmV3IERlY2s7XHJcbiAgICB0aGlzLmRlYWxlckhhbmQgPSBuZXcgSGFuZChcImRlYWxlclwiKTtcclxuICAgIHRoaXMucGxheWVySGFuZCA9IG5ldyBIYW5kKFwicGxheWVyXCIsIDEpO1xyXG4gICAgJChcIi5tZXNzYWdlc1wiKS5lbXB0eSgpO1xyXG4gICAgJChcIi5wbGF5ZXItaGFuZFwiKS5lbXB0eSgpO1xyXG4gICAgJChcIi5kZWFsZXItaGFuZFwiKS5lbXB0eSgpO1xyXG4gICAgJChcIi5wbGF5ZXItcG9pbnRzXCIpLmVtcHR5KCk7XHJcbiAgICAkKFwiLmRlYWxlci1wb2ludHNcIikuZW1wdHkoKTtcclxuICAgICQoXCIuY2hhbmdlXCIpLmVtcHR5KCk7XHJcbiAgICAkKFwiLnByZXZCZXRcIikuZW1wdHkoKTtcclxuICB9XHJcblxyXG4gIHJlc2V0TW9uZXkoKSB7XHJcbiAgICB0aGlzLm1vbmV5ID0gNTAwO1xyXG4gICAgdGhpcy5jdXJyZW50QmV0ID0gMTA7XHJcbiAgICAkKFwiLnRvdGFsXCIpLnRleHQodGhpcy5tb25leSk7XHJcbiAgICAkKFwiLmN1cnJlbnRCZXRcIikudGV4dCh0aGlzLmN1cnJlbnRCZXQpO1xyXG4gIH1cclxuXHJcbiAgc3RhbmQoY2FsbGVyKSB7XHJcbiAgICAvLyBpZiBzcGxpdHRpbmcsIGdpdmUgaGFuZDIgb3Bwb3J0dW5pdHkgdG8gaGl0XHJcbiAgICBpZiAodGhpcy5zcGxpdEluUGxheSkge1xyXG4gICAgICB0aGlzLnNwbGl0SW5QbGF5ID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuY3VycmVudEhhbmQgPSBcImhhbmQyXCI7XHJcbiAgICAgICQoXCIjaGFuZDFcIikucmVtb3ZlQ2xhc3MoXCJjdXJyZW50SGFuZFwiKTtcclxuICAgICAgJChcIiNoYW5kMlwiKS5hZGRDbGFzcyhcImN1cnJlbnRIYW5kXCIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodGhpcy5jdXJyZW50SGFuZCA9PT0gXCJoYW5kMlwiKSB7XHJcbiAgICAgIC8vIGlmIHNwbGl0dGluZywgY2FsY3VsYXRlIHRoZSBvdXRjb21lIG9mIGJvdGggb2YgdGhlIHBsYXllcidzIGhhbmRzXHJcbiAgICAgIHRoaXMuY3VycmVudEhhbmQgPSBcImhhbmQxXCI7XHJcbiAgICAgIHRoaXMuZGVhbGVySGFuZC5yZXZlYWxIb2xlKCk7XHJcbiAgICAgIHdoaWxlICh0aGlzLmRlYWxlckhhbmQuZ2V0UG9pbnRzKCkgPCAxNykge1xyXG4gICAgICAgIHRoaXMuZGVhbE9uZUNhcmQodGhpcy5kZWFsZXJIYW5kKTtcclxuICAgICAgfVxyXG4gICAgICBsZXQgZGVhbGVyUG9pbnRzID0gdGhpcy5kZWFsZXJIYW5kLmdldFBvaW50cygpO1xyXG4gICAgICB0aGlzLmRlYWxlckhhbmQudXBkYXRlRGlzcGxheShkZWFsZXJQb2ludHMpO1xyXG4gICAgICBpZiAoZGVhbGVyUG9pbnRzID4gMjEpIHtcclxuICAgICAgICB0aGlzLnBsYXllckhhbmQub3V0Y29tZSA9IFwid2luXCI7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJIYW5kMi5vdXRjb21lID0gXCJ3aW5cIjtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICB0aGlzLmV2YWx1YXRlSGFuZCh0aGlzLnBsYXllckhhbmQpO1xyXG4gICAgICAgIHRoaXMuZXZhbHVhdGVIYW5kKHRoaXMucGxheWVySGFuZDIpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuaW52b2tlT3V0Y29tZSh0aGlzLnBsYXllckhhbmQsIHRoaXMucGxheWVySGFuZDIpO1xyXG4gICAgfSBcclxuICAgIGVsc2Uge1xyXG4gICAgICB0aGlzLmRpc2FibGUodGhpcy4kaGl0LCB0aGlzLiRzdGFuZCwgdGhpcy4kZG91YmxlRG93biwgdGhpcy4kc3BsaXQpO1xyXG4gICAgICAkKFwiI2hhbmQxLCAjaGFuZDJcIikucmVtb3ZlQ2xhc3MoXCJjdXJyZW50SGFuZFwiKTtcclxuICAgICAgLy8gaWYgc3RhbmQgd2FzIGNhbGxlZCBieSBjbGlja2luZyAnZG91YmxlIGRvd24nLCBkbyBhZGRpdGlvbmFsIHdvcmtcclxuICAgICAgaWYgKGNhbGxlciA9PT0gXCJkb3VibGUtZG93blwiKSB7XHJcbiAgICAgICAgdGhpcy5iZXQgPSB0aGlzLmJldCAvIDI7XHJcbiAgICAgICAgJChcIi5iZXRcIikudGV4dCh0aGlzLmJldCk7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlKHRoaXMuJGRvdWJsZURvd24pO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIGRlYWxlcidzIHR1cm5cclxuICAgICAgdGhpcy5kZWFsZXJIYW5kLnJldmVhbEhvbGUoKTtcclxuICAgICAgd2hpbGUgKHRoaXMuZGVhbGVySGFuZC5nZXRQb2ludHMoKSA8IDE3KSB7XHJcbiAgICAgICAgdGhpcy5kZWFsT25lQ2FyZCh0aGlzLmRlYWxlckhhbmQpO1xyXG4gICAgICAgIHRoaXMuZGVhbGVySGFuZC51cGRhdGVEaXNwbGF5KHRoaXMuZGVhbGVySGFuZC5nZXRQb2ludHMoKSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMuZGVhbGVySGFuZC5nZXRQb2ludHMoKSA+IDIxKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlKFwiRGVhbGVyIGJ1c3RzXCIpO1xyXG4gICAgICAgIHRoaXMub3V0Y29tZShcIndpblwiKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICB0aGlzLmV2YWx1YXRlSGFuZCh0aGlzLnBsYXllckhhbmQpO1xyXG4gICAgICAgIHRoaXMuaW52b2tlT3V0Y29tZSh0aGlzLnBsYXllckhhbmQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzcGxpdCgpIHtcclxuICAgIHRoaXMuc3BsaXRJblBsYXkgPSB0cnVlO1xyXG4gICAgdGhpcy5kaXNhYmxlKHRoaXMuJHNwbGl0KTtcclxuICAgIHRoaXMucGxheWVySGFuZC4kd3JhcHBlci5hZGRDbGFzcyhcImN1cnJlbnRIYW5kXCIpO1xyXG4gICAgLy8gZG91YmxlIGJldCBhbmQgZGlzcGxheSBpdFxyXG4gICAgdGhpcy5jdXJyZW50QmV0ID0gdGhpcy5jdXJyZW50QmV0ICogMjtcclxuICAgICQoXCIuY3VycmVudEJldFwiKS50ZXh0KHRoaXMuY3VycmVudEJldCk7XHJcbiAgICAvLyBzdGFydCBhZGRpdGlvbmFsIGhhbmQgYW5kIG1vdmUgb25lIGNhcmQgZnJvbSBoYW5kIDEgdG8gaGFuZCAyXHJcbiAgICAkKFwiLnBsYXllckhhbmQtZGl2XCIpLmNzcyhcIndpZHRoXCIsIFwiNTAlXCIpO1xyXG4gICAgbGV0IHJlbW92ZWRDYXJkID0gdGhpcy5wbGF5ZXJIYW5kLnJlbW92ZUNhcmQoKTtcclxuICAgIHRoaXMucGxheWVySGFuZDIgPSBuZXcgSGFuZChcInBsYXllclwiLCAyKTtcclxuICAgIHRoaXMucGxheWVySGFuZDIuYWRkQ2FyZChyZW1vdmVkQ2FyZC5jYXJkLCByZW1vdmVkQ2FyZC4kY2FyZCk7XHJcbiAgICB0aGlzLmRlYWxPbmVDYXJkKHRoaXMucGxheWVySGFuZCk7XHJcbiAgICB0aGlzLmRlYWxPbmVDYXJkKHRoaXMucGxheWVySGFuZDIpO1xyXG4gICAgdGhpcy5wbGF5ZXJIYW5kLnVwZGF0ZURpc3BsYXkodGhpcy5wbGF5ZXJIYW5kLmdldFBvaW50cygpKTtcclxuICAgIHRoaXMucGxheWVySGFuZDIudXBkYXRlRGlzcGxheSh0aGlzLnBsYXllckhhbmQyLmdldFBvaW50cygpKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZU1lc3NhZ2UobWVzc2FnZSkge1xyXG4gICAgJChcIi5tZXNzYWdlc1wiKS5hcHBlbmQoYDxoMT4ke21lc3NhZ2V9PC9oMT5gKTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvZ2FtZS5qcyIsImltcG9ydCBDYXJkIGZyb20gXCIuL2NhcmRcIjtcclxuaW1wb3J0IEhhbmQgZnJvbSBcIi4vaGFuZFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVjayB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmNhcmRzID0gW107XHJcbiAgfVxyXG5cclxuICBkcmF3KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2FyZHMucG9wKCk7XHJcbiAgfVxyXG5cclxuICBnZW5lcmF0ZShudW1EZWNrcykge1xyXG4gICAgaWYgKCFudW1EZWNrcykge1xyXG4gICAgICBudW1EZWNrcyA9IDE7XHJcbiAgICB9XHJcbiAgICB3aGlsZSAobnVtRGVja3MgPiAwKSB7XHJcbiAgICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IDEzOyBpKyspIHtcclxuICAgICAgICB0aGlzLmNhcmRzLnB1c2gobmV3IENhcmQoaSwgXCJzcGFkZXNcIikpO1xyXG4gICAgICAgIHRoaXMuY2FyZHMucHVzaChuZXcgQ2FyZChpLCBcImRpYW1vbmRzXCIpKTtcclxuICAgICAgICB0aGlzLmNhcmRzLnB1c2gobmV3IENhcmQoaSwgXCJoZWFydHNcIikpO1xyXG4gICAgICAgIHRoaXMuY2FyZHMucHVzaChuZXcgQ2FyZChpLCBcImNsdWJzXCIpKTtcclxuICAgICAgfVxyXG4gICAgICBudW1EZWNrcy0tO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2h1ZmZsZSgpIHtcclxuICAgIGZvciAobGV0IGkgPSB0aGlzLmNhcmRzLmxlbmd0aCAtIDE7IGkgPiAwOyBpLS0pIHtcclxuICAgICAgY29uc3QgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChpICsgMSkpO1xyXG4gICAgICBbdGhpcy5jYXJkc1tpXV0gPSBbdGhpcy5jYXJkc1tqXV07XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2RlY2suanMiXSwic291cmNlUm9vdCI6IiJ9