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
  return 'images/' + value + '_of_' + this.suit + '.png';
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

Hand.prototype.revealHole = function() {
  $('.dealer-hand img:first-child').attr('src', this.cards[0].getImageUrl());
};

Hand.prototype.seeCard = function(index) {
  return this.cards[index - 1];
}

Hand.prototype.removeCard = function() {
  return this.cards.pop();
}


// Deck

function Deck(num) {
  this.cards = [];
}

Deck.prototype.numCardsLeft = function() {
  return this.cards.length;
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

Deck.prototype.deal = function(hand, handSelector, hole) {
  var card = game.gameDeck.draw();
  hand.addCard(card);
  if (hole) {
    $(handSelector).append('<img class="card" src="images/red_joker.png"/>');
  }
  else {
    $(handSelector).append('<img class="card" src="' + card.getImageUrl() + '"/>');
  }
};

Deck.prototype.draw = function() {
  return this.cards.pop();
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
  this.bet = 10;
}

Game.prototype.deal = function() {
  // change button availability
  $('.hit, .stand').attr('disabled', false);
  $('.deal').attr('disabled', true);
  $('.bet .buttons').hide();
  // shuffle deck(s) and deal cards
  // this.gameDeck.shuffle();
  this.gameDeck.deal(this.dealerHand, '.dealer-hand', true);
  this.gameDeck.deal(this.playerHand, '.player-hand');
  this.gameDeck.deal(this.dealerHand, '.dealer-hand');
  this.gameDeck.deal(this.playerHand, '.player-hand');
  if (this.dealerHand.getPoints() === 21 && this.playerHand.getPoints() === 21) {
    this.dealerHand.revealHole();
    this.outcome('push')
    $('.dealer-points').text('Blackjack');
    $('.player-points').text('BLACKJACK HOT DAMN!');
  }
  else if (this.dealerHand.getPoints() === 21) {
    this.dealerHand.revealHole();
    this.outcome('lose');
    $('.dealer-points').text('Blackjack');
  }
  else if (this.playerHand.getPoints() === 21) {
    this.dealerHand.revealHole();
    this.outcome('blackjack')
    $('.player-points').text('BLACKJACK HOT DAMN!');
  }
  else if (this.playerHand.getPoints() === 11) {
    this.showDoubleDownBtn();
  }
  else if (this.playerHand.seeCard(1).point === this.playerHand.seeCard(2).point) {
    this.showSplitBtn();
  }
  else {
    $('.player-points').text(this.playerHand.getPoints());
  }
};

Game.prototype.doubleDown = function() {
  // double bet and display it
  this.bet = this.bet * 2;
  $('.bet .amount').text(this.bet);
  // deal the player one more card and then move on to the dealer's turn
  this.gameDeck.deal(this.playerHand, '.player-hand')
  $('.player-points').text(this.playerHand.getPoints());
  this.stand('double-down');
};

Game.prototype.hit = function() {
  if (this.currentHand === 'hand1') {
    this.gameDeck.deal(this.playerHand, '#hand1 .player-hand')
    $('#hand1 .player-points').text(this.playerHand.getPoints());
    if (this.playerHand.getPoints() > 21 && this.splitInPlay) {
      this.splitInPlay = false;
      this.currentHand = 'hand2';
    }
    else if (this.playerHand.getPoints() > 21) {
      this.outcome('lose');
      $('.messages').append('<p>Player busts</p>');
    }
  }
  else if (this.currentHand === 'hand2') {
    this.gameDeck.deal(this.playerHand2, '#hand2 .player-hand')
    $('#hand2 .player-points').text(this.playerHand2.getPoints());
    if (this.playerHand2.getPoints() > 21) {
      this.outcome('lose');
      $('.messages').append('<p>Player busts</p>');
      this.currentHand = 'hand1';
    }
  }
};

Game.prototype.makeBet = function() {
  var $total = $('.total .amount'),
      $bet = $('.bet .amount');
  $total.text(this.money);
  $bet.text(this.bet);
  $('.bet-btn').on('click', function() {
    if ($(this).hasClass('add10') && game.money - game.bet >= 10) {
      game.bet += 10;
    }
    else if ($(this).hasClass('add50') && game.money - game.bet >= 50) {
      game.bet += 50;
    }
    else if ($(this).hasClass('add100') && game.money - game.bet >= 100) {
      game.bet += 100;
    }
    else if ($(this).hasClass('add500') && game.money - game.bet >= 500) {
      game.bet += 500;
    }
    else if ($(this).hasClass('all-in')) {
      game.bet = game.money;
    }
    else if ($(this).hasClass('reset')) {
      game.bet = 10;
    }
    $bet.text(game.bet);
  });
};

Game.prototype.outcome = function(result) {
  if (result === 'blackjack') {
    this.money += this.bet * 1.5;
  }
  else if (result === 'win') {
    this.money += this.bet;
  }
  else if (result === 'push') {
    this.money = this.money;
  }
  else if (result === 'lose') {
    this.money -= this.bet;
    if (this.bet > this.money) {
      this.bet = this.money;
      $('.bet .amount').text(this.bet);
    }
  }
  $('.total .amount').text(this.money);
  // change button availability
  $('.deal').attr('disabled', false);
  $('.hit, .stand').attr('disabled', true);
  $('.bet .buttons').show();
};

Game.prototype.reset = function() {
  this.gameDeck = new Deck();
  this.playerHand = new Hand();
  this.dealerHand = new Hand();
  $('.messages').empty();
  $('.player-hand').empty();
  $('.dealer-hand').empty();
  $('.player-points').empty();
  $('.dealer-points').empty();
  $('#hand2').remove();
};

Game.prototype.showDoubleDownBtn = function() {
  // only show the button if the player has enough money
  if (this.money > this.bet * 2) {
    $('.double-down').attr('disabled', false);
  }
};

Game.prototype.showSplitBtn = function() {
  // only show the button if the player is dealt two cards of the same point value (suit not required)
  if (this.playerHand.seeCard(1).point === this.playerHand.seeCard(2).point) {
    $('.split').attr('disabled', false);
  }
}

Game.prototype.stand = function(caller) {
  if (this.splitInPlay) {
    this.splitInPlay = false;
    this.currentHand = 'hand2';
  }
  else {
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
      $('.messages').append('<p>Dealer busts</p>');
    }
    else if (this.dealerHand.getPoints() > this.playerHand.getPoints()) {
      this.outcome('lose');
      $('.messages').append('<p>Dealer wins</p>');
    }
    else {
      this.outcome('push');
      $('.messages').append('<p>Push</p>');
    }
    // if stand was called by another function and not by clicking the 'Stand' button, do additional work
    if (caller === 'double-down') {
      this.bet = this.bet / 2;
      $('.bet .amount').text(this.bet);
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
    '<div id="hand2">' +
      '<h4>Points: </h4>' +
      '<h4 class="player-points" class="points"></h4>' +
      '<div class="player-hand" class="hand">' +
      '<img class="card" src="' + this.playerHand2.seeCard(1).getImageUrl() + '"/>' +
      '</div>' +
    '</div>');
    $('#hand1 .player-hand img:last-child').remove();
    $('.split').attr('disabled', true);
  }
}
