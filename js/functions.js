function reset() {
  deck = [];
  dealerHand = [];
  playerHand = [];
  suitIndex = 0;
  $('.messages').empty();
  $('.player-hand').empty();
  $('.dealer-hand').empty();
  $('.player-points').empty();
  $('.dealer-points').empty();
  $('.hit, .stand').attr('disabled', false);
}

function generateDeck() {
  for (var i = 0; i < 4; i++) {
    for (var j = 1; j <= 13; j++) {
      var faceCard = '';
      if (j === 13) {
        faceCard = 'king';
      }
      else if (j === 12) {
        faceCard = 'queen';
      }
      else if (j === 11) {
        faceCard = 'jack';
      }
      else if (j === 1) {
        faceCard = 'ace';
      }
      deck.push({
        point: faceCard || j,
        suit: suits[i]
      });
    }
  }
  shuffleDeck(deck);
}

function shuffleDeck(arr) {
  var i = 0,
      j = 0,
      temp = null;
  for (i = arr.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}

function deal() {
  // pull cards from the deck
  dealerHand.push(deck.pop());
  dealerHand.push(deck.pop());
  playerHand.push(deck.pop());
  playerHand.push(deck.pop());
  // append visual cards to the table
  $('.dealer-hand').append(
    '<img class="card" src="images/red_joker.png"/>',
    '<img class="card" src="' + getCardImageUrl(dealerHand[1]) + '"/>'
  );
  $('.player-hand').append(
    '<img class="card" src="' + getCardImageUrl(playerHand[0]) + '"/>',
    '<img class="card" src="' + getCardImageUrl(playerHand[1]) + '"/>'
  );
  // show player points
  $('.player-points').text(calculatePoints(playerHand));
}

function hit() {
  playerHand.push(deck.pop());
  $('.player-hand').append('<img class="card" src="' + getCardImageUrl(playerHand[playerHand.length - 1]) + '"/>');
}

function stand() {
  $('.hit, .stand').attr('disabled', true);
  // show dealer's first card and his current total
  $('.dealer-hand img:first-child').attr('src', getCardImageUrl(dealerHand[0]));
  $('.dealer-points').text(calculatePoints(dealerHand));
  // dealer continues taking on cards while his score is less than 17 or less than the player's score
  while (calculatePoints(dealerHand) < 17 || calculatePoints(dealerHand) < calculatePoints(playerHand)) {
    dealerHand.push(deck.pop());
    $('.dealer-hand').append('<img class="card" src="' + getCardImageUrl(dealerHand[dealerHand.length - 1]) + '"/>');
    $('.dealer-points').text(calculatePoints(dealerHand));
  }
  if (calculatePoints(dealerHand) > 21) {
    $('.messages').append('<p>Dealer busts</p>');
    $('.hit, .stand').attr('disabled', true);
  }
  else {
    checkWinner();
  }
}

function checkWinner() {
  if (calculatePoints(playerHand) < calculatePoints(dealerHand)) {
    $('.messages').append('<p>Dealer wins</p>');
  }
  else {
    $('.messages').append('<p>Push</p>');
  }
}

function getCardImageUrl(card) {
  return 'images/' + card.point + '_of_' + card.suit + '.png';
}

function calculatePoints(arrOfCards) {
  var acesDealt = 0;
  var total = 0;
  for (var i = 0; i < arrOfCards.length; i++) {
    var cardValue = arrOfCards[i].point;
    if (cardValue === 'ace') {
      cardValue = 11;
      acesDealt++;
    }
    else if (typeof cardValue === 'string') {
      cardValue = 10;
    }
    total += cardValue;
    if (total > 21 && acesDealt > 0) {
      total -= 10;
      acesDealt--;
    }
  }
  return total;
}

function updatePlayer() {
  $('.player-points').text(calculatePoints(playerHand));
  if (calculatePoints(playerHand) > 21) {
    $('.messages').append('<p>Player busts</p>');
    $('.hit, .stand').attr('disabled', true);
  }
}
