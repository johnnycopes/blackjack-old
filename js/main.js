// $(document).ready(function() {
  var deck = [],
      dealerHand = [],
      playerHand = [],
      suitIndex = 0,
      suits = ['diamonds', 'hearts', 'spades', 'clubs'];

  function reset() {
    deck = [];
    dealerHand = [];
    playerHand = [];
    suitIndex = 0;
    $(".messages").empty();
    $(".player-hand").empty();
    $(".dealer-hand").empty();
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
    dealerHand.push(deck.pop());
    dealerHand.push(deck.pop());
    playerHand.push(deck.pop());
    playerHand.push(deck.pop());
    $(".player-hand").append(
      '<img class="card" src="' + getCardImageUrl(playerHand[0]) + '"/>',
      '<img class="card" src="' + getCardImageUrl(playerHand[1]) + '"/>'
    );
    $(".dealer-hand").append(
      '<img class="card" src="' + getCardImageUrl(dealerHand[0]) + '"/>',
      '<img class="card" src="' + getCardImageUrl(dealerHand[1]) + '"/>'
    );
  }

  function hit() {
    playerHand.push(deck.pop());
    $(".player-hand").append('<img class="card" src="' + getCardImageUrl(playerHand[playerHand.length - 1]) + '"/>');
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

  function displayPoints() {
    $(".player-points").text(calculatePoints(playerHand));
    $(".dealer-points").text(calculatePoints(dealerHand));
    bustCheck();
  }

  function bustCheck() {
    if ($('.player-points').text() > 21) {
      $('.messages').text('Player busts');
      $('.hit, .stand').attr('disabled', true);
    }
    if ($('.dealer-points').text() > 21) {
      $('.messages').text('Dealer busts');
      $('.hit, .stand').attr('disabled', true);
    }
  }

  $(".deal").on('click', function() {
    reset();
    generateDeck();
    deal();
    displayPoints();
  });
  $(".hit").on('click', function() {
    hit();
    displayPoints();
  });
  $(".stand").on('click', function() {
    stand();
    displayPoints();
  });

// });
