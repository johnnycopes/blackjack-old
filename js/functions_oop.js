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
  this.money = 500;
}

Game.prototype.reset = function() {
  game = new Game();
  $('.messages').empty();
  $('.player-hand').empty();
  $('.dealer-hand').empty();
  $('.player-points').empty();
  $('.dealer-points').empty();
  $('.hit, .stand').attr('disabled', false);
};

Game.prototype.deal = function() {
  this.gameDeck.shuffle();
  this.gameDeck.deal(this.dealerHand, '.dealer-hand', true);
  this.gameDeck.deal(this.playerHand, '.player-hand');
  this.gameDeck.deal(this.dealerHand, '.dealer-hand');
  this.gameDeck.deal(this.playerHand, '.player-hand');
  if (this.dealerHand.getPoints() === 21) {
    this.dealerHand.revealHole();
    $('.dealer-points').text('Blackjack');
    $('.hit, .stand').attr('disabled', true);
  }
  if (this.playerHand.getPoints() === 21) {
    $('.player-points').text('BLACKJACK HOT DAMN!');
    $('.hit, .stand').attr('disabled', true);
  }
  else {
    $('.player-points').text(this.playerHand.getPoints());
  }
};

Game.prototype.hit = function() {
  this.gameDeck.deal(this.playerHand, '.player-hand')
  $('.player-points').text(this.playerHand.getPoints());
  if (this.playerHand.getPoints() > 21) {
    $('.messages').append('<p>Player busts</p>');
    $('.hit, .stand').attr('disabled', true);
  }
};

Game.prototype.stand = function() {
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
    $('.messages').append('<p>Dealer busts</p>');
  }
  else if (this.dealerHand.getPoints() > this.playerHand.getPoints()) {
    $('.messages').append('<p>Dealer wins</p>');
  }
  else {
    $('.messages').append('<p>Push</p>');
  }
  $('.hit, .stand').attr('disabled', true);
};

Game.prototype.makeBet = function(amount) {
  this.bet = amount;
};

Game.prototype.outcome = function(result) {
  if (result === 'blackjack') {
    this.money += this.bet * 1.5;
  }
  else if (result === 'win') {
    this.money += this.bet;
  }
  else if (result === 'lose') {
    this.money -= this.bet;
  }
};
