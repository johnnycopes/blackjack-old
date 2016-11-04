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
}

// Hand
function Hand(card) {
  this.cards = [];
}

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
}

// Deck
function Deck(num) {
  this.cards = [];
}

Deck.prototype.numCardsLeft = function() {
  return this.cards.length;
}

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
}

Deck.prototype.draw = function() {
  return this.cards.pop();
}

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
}

function reset() {
  gameDeck.cards = [];
  dealerHand.cards = [];
  playerHand.cards = [];
  $('.messages').empty();
  $('.player-hand').empty();
  $('.dealer-hand').empty();
  $('.player-points').empty();
  $('.dealer-points').empty();
  $('.hit, .stand').attr('disabled', false);
}

function deal() {
  gameDeck.shuffle();
  // deal two from the deck
  dealerHand.cards.push(gameDeck.cards.pop());
  dealerHand.cards.push(gameDeck.cards.pop());
  playerHand.cards.push(gameDeck.cards.pop());
  playerHand.cards.push(gameDeck.cards.pop());
  // append cards images to the table
  $('.dealer-hand').append(
    '<img class="card" src="images/red_joker.png"/>',
    '<img class="card" src="' + dealerHand.cards[1].getImageUrl() + '"/>'
  );
  $('.player-hand').append(
    '<img class="card" src="' + playerHand.cards[0].getImageUrl() + '"/>',
    '<img class="card" src="' + playerHand.cards[1].getImageUrl() + '"/>'
  );
  // check for dealt blackjacks and show player points
  if (dealerHand.getPoints() === 21) {
    $('.dealer-hand img:first-child').attr('src', dealerHand.cards[0].getImageUrl());
    $('.dealer-points').text('Blackjack');
    $('.hit, .stand').attr('disabled', true);
  }
  if (playerHand.getPoints() === 21) {
    $('.player-points').text('BLACKJACK HOT DAMN!');
    $('.hit, .stand').attr('disabled', true);
  }
  else {
    $('.player-points').text(playerHand.getPoints());
  }
}

function hit() {
  var card = gameDeck.cards.pop();
  playerHand.cards.push(card);
  $('.player-hand').append('<img class="card" src="' + card.getImageUrl() + '"/>');
  $('.player-points').text(playerHand.getPoints());
  if (playerHand.getPoints() > 21) {
    $('.messages').append('<p>Player busts</p>');
    $('.hit, .stand').attr('disabled', true);
  }
}

function stand() {
  $('.hit, .stand').attr('disabled', true);
  // show dealer's first card and his current total
  $('.dealer-hand img:first-child').attr('src', dealerHand.cards[0].getImageUrl());
  $('.dealer-points').text(dealerHand.getPoints());
  // dealer continues taking on cards while his score is less than 17 or less than the player's score
  while (dealerHand.getPoints() < 17 || dealerHand.getPoints() < playerHand.getPoints()) {
    var card = gameDeck.cards.pop();
    dealerHand.cards.push(card);
    $('.dealer-hand').append('<img class="card" src="' + card.getImageUrl() + '"/>');
    $('.dealer-points').text(dealerHand.getPoints());
  }
  // display message that corresponds with the dealer's outcome
  if (dealerHand.getPoints() > 21) {
    $('.messages').append('<p>Dealer busts</p>');
  }
  else if (dealerHand.getPoints() > playerHand.getPoints()) {
    $('.messages').append('<p>Dealer wins</p>');
  }
  else {
    $('.messages').append('<p>Push</p>');
  }
  $('.hit, .stand').attr('disabled', true);
}
