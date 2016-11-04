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

function makeDeck(num) {
  while (num > 0) {
    for (var i = 0; i < 4; i++) {
      for (var j = 1; j <= 13; j++) {
        var name = '';
        if (j === 13) {
          name = 'king';
        }
        else if (j === 12) {
          name = 'queen';
        }
        else if (j === 11) {
          name = 'jack';
        }
        else if (j === 1) {
          name = 'ace';
        }
        deck.push({
          point: name || j,
          suit: suits[i]
        });
      }
    }
    num--;
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
  // deal two from the deck
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
  // check for dealt blackjacks and show player points
  if (total(dealerHand) === 21) {
    $('.dealer-hand img:first-child').attr('src', getCardImageUrl(dealerHand[0]));
    $('.dealer-points').text('Blackjack');
    $('.hit, .stand').attr('disabled', true);
  }
  if (total(playerHand) === 21) {
    $('.player-points').text('BLACKJACK HOT DAMN!');
    $('.hit, .stand').attr('disabled', true);
  }
  else {
    $('.player-points').text(total(playerHand));
  }
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

function getCardImageUrl(card) {
  return 'images/' + card.point + '_of_' + card.suit + '.png';
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
