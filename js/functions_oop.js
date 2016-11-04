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
function Deck() {
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
  // append visual cards to the table
  // $('.dealer-hand').append(
  //   '<img class="card" src="images/red_joker.png"/>',
  //   '<img class="card" src="' + getCardImageUrl(dealerHand[1]) + '"/>'
  // );
  // $('.player-hand').append(
  //   '<img class="card" src="' + getCardImageUrl(playerHand[0]) + '"/>',
  //   '<img class="card" src="' + getCardImageUrl(playerHand[1]) + '"/>'
  // );
  // // check for dealt blackjacks and show player points
  // if (total(dealerHand) === 21) {
  //   $('.dealer-hand img:first-child').attr('src', getCardImageUrl(dealerHand[0]));
  //   $('.dealer-points').text('Blackjack');
  //   $('.hit, .stand').attr('disabled', true);
  // }
  // if (total(playerHand) === 21) {
  //   $('.player-points').text('BLACKJACK HOT DAMN!');
  //   $('.hit, .stand').attr('disabled', true);
  // }
  // else {
  //   $('.player-points').text(total(playerHand));
  // }
}

function hit() {
  playerHand.push(deck.pop());
  $('.player-hand').append('<img class="card" src="' + getCardImageUrl(playerHand[playerHand.length - 1]) + '"/>');
}

function stand() {
  $('.hit, .stand').attr('disabled', true);
  // show dealer's first card and his current total
  $('.dealer-hand img:first-child').attr('src', getCardImageUrl(dealerHand[0]));
  $('.dealer-points').text(total(dealerHand));
  // dealer continues taking on cards while his score is less than 17 or less than the player's score
  while (total(dealerHand) < 17 || total(dealerHand) < total(playerHand)) {
    dealerHand.push(deck.pop());
    $('.dealer-hand').append('<img class="card" src="' + getCardImageUrl(dealerHand[dealerHand.length - 1]) + '"/>');
    $('.dealer-points').text(total(dealerHand));
  }
  if (total(dealerHand) > 21) {
    $('.messages').append('<p>Dealer busts</p>');
    $('.hit, .stand').attr('disabled', true);
  }
  else {
    checkWinner();
  }
}

function checkWinner() {
  if (total(playerHand) < total(dealerHand)) {
    $('.messages').append('<p>Dealer wins</p>');
  }
  else {
    $('.messages').append('<p>Push</p>');
  }
}

function total(hand) {
  var total = 0,
      acesDealt = 0;
  for (var i = 0; i < hand.length; i++) {
    var card = hand[i].point;
    if (card === 'ace') {
      card = 11;
      acesDealt++;
    }
    else if (typeof card === 'string') {
      card = 10;
    }
    total += card;
    if (total > 21 && acesDealt > 0) {
      total -= 10;
      acesDealt--;
    }
  }
  return total;
}

function updatePlayer() {
  $('.player-points').text(total(playerHand));
  if (total(playerHand) > 21) {
    $('.messages').append('<p>Player busts</p>');
    $('.hit, .stand').attr('disabled', true);
  }
}
