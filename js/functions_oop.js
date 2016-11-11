// Card

function Card(point, suit) {
  this.point = point;
  this.suit = suit;
}

Card.prototype.getImageUrl = function() {
  var value = this.point;
  if (this.point === 11) {
    value = 'jack';
  }
  else if (this.point === 12) {
    value = 'queen';
  }
  else if (this.point === 13) {
    value = 'king';
  }
  else if (this.point === 1) {
    value = 'ace';
  }
  return 'images/' + value + '_of_' + this.suit + '.svg';
};


// Hand

function Hand(card) {
  this.cards = [];
}

Hand.prototype.addCard = function(card) {
  this.cards.push(card);
};

Hand.prototype.getPoints = function() {
  var total = 0,
      aces = 0;
  for (var i = 0; i < this.cards.length; i++) {
    var point = this.cards[i].point;
    if (point === 1) {
      total += 10;
      aces++;
    }
    else if (point > 10) {
      point = 10;
    }
    total += point;
    while (total > 21 && aces > 0) {
      total -= 10;
      aces--;
    }
  }
  return total;
};

Hand.prototype.removeCard = function() {
  return this.cards.pop();
};

Hand.prototype.revealHole = function() {
  $('.dealer-hand img:first-child').attr('src', this.cards[0].getImageUrl());
};

Hand.prototype.seeCard = function(index) {
  return this.cards[index - 1];
};


// Deck

function Deck(num) {
  this.cards = [];
}

Deck.prototype.deal = function(hand, handSelector, hole, doubleDown) {
  var card = game.gameDeck.draw();
  hand.addCard(card);
  if (hole) {
    $(handSelector).append('<img class="card" src="images/back-suits-red.svg"/>');
  }
  else if (doubleDown) {
    $(handSelector).append('<img class="card card-dd" src="' + card.getImageUrl() + '"/>');
  }
  else {
    $(handSelector).append('<img class="card" src="' + card.getImageUrl() + '"/>');
  }
};

Deck.prototype.draw = function() {
  return this.cards.pop();
};

Deck.prototype.generate = function(num) {
  if (num === undefined) {
    num = 1;
  }
  while (num > 0) {
    for (var i = 1; i <= 13; i++) {
      this.cards.push(new Card(i, 'spades'));
      this.cards.push(new Card(i, 'diamonds'));
      this.cards.push(new Card(i, 'hearts'));
      this.cards.push(new Card(i, 'clubs'));
    }
    num--;
  }
};

Deck.prototype.shuffle = function() {
  var i = 0,
      j = 0,
      temp = null;
  for (i = this.cards.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    temp = this.cards[i];
    this.cards[i] = this.cards[j];
    this.cards[j] = temp;
  }
};


// Game

function Game() {
  this.gameDeck = new Deck();
  this.playerHand = new Hand();
  this.dealerHand = new Hand();
  this.currentHand = 'hand1';
  this.money = 500;
  this.currentBet = 10;
}

Game.prototype.assessChange = function() {
  var $change = $('.change');
  if (this.change > 0) {
    $change.append('<span class="positive">+ $' + this.change + '</span>');
  }
  else if (this.change < 0) {
    $change.append('<span class="negative">- $' + Math.abs(this.change) + '</span>');
  }
  else if (this.change === 0) {
    $change.append('<span>' + this.change + '</span>');
  }
};

Game.prototype.deal = function() {
  // change button availability
  $('.hit, .stand').attr('disabled', false);
  $('.deal').attr('disabled', true);
  $('.betting .buttons').hide();
  // shuffle deck(s) and deal cards
  // this.gameDeck.shuffle();
  this.gameDeck.deal(this.dealerHand, '.dealer-hand', true);
  this.gameDeck.deal(this.playerHand, '.player-hand');
  this.gameDeck.deal(this.dealerHand, '.dealer-hand');
  this.gameDeck.deal(this.playerHand, '.player-hand');
  // conceal dealer total and display user total
  $('.dealer-points').text('?');
  $('.player-points').text(this.playerHand.getPoints());
  if (this.dealerHand.getPoints() === 21 && this.playerHand.getPoints() === 21) {
    this.outcome('push')
    this.dealerHand.revealHole();
    $('.dealer-points').text('Blackjack');
    $('.player-points').text('BLACKJACK HOT DAMN!');
    $('.messages').append('<h1>Push</h1>');
  }
  else if (this.dealerHand.getPoints() === 21) {
    this.outcome('lose');
    this.dealerHand.revealHole();
    $('.dealer-points').text('Blackjack');
    $('.messages').append('<h1>Dealer wins</h1>');
  }
  else if (this.playerHand.getPoints() === 21) {
    this.outcome('blackjack')
    this.dealerHand.revealHole();
    $('.dealer-points').text(this.dealerHand.getPoints());
    $('.player-points').text('BLACKJACK HOT DAMN!');
    $('.messages').append('<h1>You win!</h1>');
  }
  else if (this.playerHand.getPoints() === 11) {
    this.showDoubleDownBtn();
  }
  else if (this.playerHand.seeCard(1).point === this.playerHand.seeCard(2).point) {
    this.showSplitBtn();
  }
};

Game.prototype.doubleDown = function() {
  // double bet and display it
  this.currentBet = this.currentBet * 2;
  $('.currentBet').text(this.currentBet);
  // deal the player one more card and then move on to the dealer's turn
  this.gameDeck.deal(this.playerHand, '.player-hand', false, 'double-down');
  $('.player-points').text(this.playerHand.getPoints());
  this.stand('double-down');
};

Game.prototype.hit = function() {
  // disable 'double-down' and 'split' btns if the user doesn't click them right away
  $('.double-down, .split').attr('disabled', true);
  if (this.currentHand === 'hand1') {
    this.gameDeck.deal(this.playerHand, '#hand1 .player-hand')
    $('#hand1 .player-points').text(this.playerHand.getPoints());
    if (this.playerHand.getPoints() > 21 && this.splitInPlay) {
      this.splitInPlay = false;
      this.currentHand = 'hand2';
    }
    else if (this.playerHand.getPoints() > 21) {
      this.outcome('lose');
      $('.messages').append('<h1>Player busts</h1>');
    }
  }
  else if (this.currentHand === 'hand2') {
    this.gameDeck.deal(this.playerHand2, '#hand2 .player-hand')
    $('#hand2 .player-points').text(this.playerHand2.getPoints());
    if (this.playerHand2.getPoints() > 21) {
      this.outcome('lose');
      $('.messages').append('<h1>Player busts</h1>');
      this.currentHand = 'hand1';
    }
  }
};

Game.prototype.makeBet = function() {
  var $total = $('.total'),
      $currentBet = $('.currentBet'),
      game = this;
  $total.text(this.money);
  $currentBet.text(this.currentBet);
  $('.bet-btn').on('click', function() {
    if ($(this).hasClass('add10') && game.money - game.currentBet >= 10) {
      game.currentBet += 10;
    }
    else if ($(this).hasClass('add50') && game.money - game.currentBet >= 50) {
      game.currentBet += 50;
    }
    else if ($(this).hasClass('add100') && game.money - game.currentBet >= 100) {
      game.currentBet += 100;
    }
    else if ($(this).hasClass('add500') && game.money - game.currentBet >= 500) {
      game.currentBet += 500;
    }
    else if ($(this).hasClass('all-in')) {
      game.currentBet = game.money;
    }
    else if ($(this).hasClass('reset')) {
      game.currentBet = 10;
    }
    $currentBet.text(game.currentBet);
  });
};

Game.prototype.modal = function(modalType) {
  if (modalType === 'bankrupt') {
    $('.modal, .modal-overlay').removeClass('hide');
    $('.modal .message').html('You\'ve lost everything.' + '<br/><br/>' + 'Good thing it\'s not real money!');
    $('.modal-guts button').text('Play again');
    $('.modal-guts button').on('click', function() {
      $('.modal, .modal-overlay').addClass('hide');
      game.resetGame();
      game.resetMoney();
    });
  }
  else if (modalType === 'help') {

  }

};

Game.prototype.outcome = function(result) {
  this.prevBet = this.currentBet;
  if (result === 'blackjack') {
    this.money += this.currentBet * 1.5;
    this.change = this.currentBet * 1.5;
  }
  else if (result === 'win') {
    this.money += this.currentBet;
    this.change = +this.currentBet;
  }
  else if (result === 'push') {
    this.money = this.money;
    this.change = 0;
  }
  else if (result === 'lose') {
    if (this.money - this.currentBet >= 10) {
      this.money += -this.currentBet;
      this.change = -this.currentBet;
      // drop the bet amount down to equal money amount of last bet value is greater than total money value
      if (this.currentBet > this.money) {
        this.currentBet = this.money;
        $('.currentBet').text(this.currentBet);
      }
    }
    else {
      this.modal('bankrupt');
    }
  }
  $('.total').text(this.money);
  $('.prevBet').append('<span>$' + this.prevBet + '</span>');
  this.assessChange();
  // change button availability
  $('.deal').attr('disabled', false);
  $('.hit, .stand').attr('disabled', true);
  $('.betting .buttons').show();
};

Game.prototype.resetGame = function() {
  this.gameDeck = new Deck();
  this.playerHand = new Hand();
  this.dealerHand = new Hand();
  $('.messages').empty();
  $('.player-hand').empty();
  $('.dealer-hand').empty();
  $('.player-points').empty();
  $('.dealer-points').empty();
  $('#hand2').remove();
  $('.change').empty();
  $('.prevBet').empty();
};

Game.prototype.resetMoney = function() {
  this.money = 500;
  this.currentBet = 10;
  $('.total').text(this.money);
  $('.currentBet').text(this.currentBet);
};

Game.prototype.showDoubleDownBtn = function() {
  // only show the button if the player has enough money
  if (this.money > this.currentBet * 2) {
    $('.double-down').attr('disabled', false);
  }
};

Game.prototype.showSplitBtn = function() {
  // only show the button if the player is dealt two cards of the same point value (suit not required)
  if (this.playerHand.seeCard(1).point === this.playerHand.seeCard(2).point) {
    $('.split').attr('disabled', false);
  }
};

Game.prototype.stand = function(caller) {
  if (this.splitInPlay) {
    this.splitInPlay = false;
    this.currentHand = 'hand2';
  }
  else {
    // disabled 'double-down' and 'split' btns if the user doesn't click them right away
    $('.double-down, .split').attr('disabled', true);
    // set currentHand to 1 in case of 'split'
    this.currentHand = 'hand1';
    $('.hit, .stand').attr('disabled', true);
    this.dealerHand.revealHole();
    $('.dealer-points').text(this.dealerHand.getPoints());
    // dealer continues taking on cards while his score is less than 17 or less than the player's score
    while (this.dealerHand.getPoints() < 17 || this.dealerHand.getPoints() < this.playerHand.getPoints()) {
      this.gameDeck.deal(this.dealerHand, '.dealer-hand');
      $('.dealer-points').text(this.dealerHand.getPoints());
    }
    // display message that corresponds with the dealer's outcome
    if (this.dealerHand.getPoints() > 21) {
      this.outcome('win');
      $('.messages').append('<h1>Dealer busts</h1>');
    }
    else if (this.dealerHand.getPoints() > this.playerHand.getPoints()) {
      this.outcome('lose');
      $('.messages').append('<h1>Dealer wins</h1>');
    }
    else {
      this.outcome('push');
      $('.messages').append('<h1>Push</h1>');
    }
    // if stand was called by clicking 'double down', do additional work
    if (caller === 'double-down') {
      this.bet = this.bet / 2;
      $('.bet').text(this.bet);
      $('.double-down').attr('disabled', true);
    }
  }
};

Game.prototype.split = function() {
  if (!this.splitInPlay) {
    this.splitInPlay = true;
    var card = this.playerHand.removeCard();
    this.playerHand2 = new Hand();
    this.playerHand2.addCard(card);
    $('.player').append(
    '<div id="hand2" class="hand-div">' +
      '<div class="player-hand" class="hand">' +
        '<img class="card" src="' + this.playerHand2.seeCard(1).getImageUrl() + '"/>' +
      '</div>' +
      '<h1 class="player-points" class="points"></h1>' +
    '</div>');
    $('#hand1 .player-hand img:last-child').remove();
    $('.split').attr('disabled', true);
    $('.player-points').text(this.playerHand.getPoints());
  }
};
