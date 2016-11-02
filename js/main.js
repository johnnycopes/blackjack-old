// $(document).ready(function() {
  var deck = [],
      dealerHand = [],
      playerHand = [],
      suitIndex = 0,
      suits = ['diamonds', 'hearts', 'spades', 'clubs'];
  for (var i = 0; i < 4; i++) {
    for (var j = 1; j <= 13; j++) {
      var royalty = "";
      if (j === 13) {
        royalty = 'king';
      }
      else if (j === 12) {
        royalty = 'queen';
      }
      else if (j === 11) {
        royalty = 'jack';
      }
      deck.push({
        point: royalty || j,
        suit: suits[i]
      });
    }
  }

  function deal() {
    // var random = Math.floor(Math.random() * deck.length);
    // deck.splice(random, 1);
    // return deck.length;
    dealerHand.push(deck.pop());
    dealerHand.push(deck.pop());
    playerHand.push(deck.pop());
    playerHand.push(deck.pop());
    console.log(deck.length);
  }

  function getCardImageUrl(card) {
    return 'images/' + card.point + '_of_' + card.suit + '.png';
  }

  function calculatePoints(arrOfCards) {
    var aceHasBeenDealt = false;
    var totalPointValue = 0;
    for (var i = 0; i < arrOfCards.length; i++) {
      var currentCardPointValue = arrOfCards[i].point;
      if (typeof currentCardPointValue === 'string') {
        currentCardPointValue = 10;
      }
      else if (currentCardPointValue === 1) {
        currentCardPointValue = 11;
        aceHasBeenDealt = true;
      }
      totalPointValue += currentCardPointValue;
      if (totalPointValue > 21 && aceHasBeenDealt === true) {
        totalPointValue -= 10;
      }
    }
    return totalPointValue;
  }

  // DOM MANIPULATION

  $(".deal-button").on('click', function() {
    deal();
    $(".player-points").text(calculatePoints(playerHand));

    $(".player-hand").append(
      '<img class="playing-card" src="' + getCardImageUrl(playerHand[0]) + '"/>',
      '<img class="playing-card" src="' + getCardImageUrl(playerHand[1]) + '"/>');
    $(".dealer-hand").append(
      '<img class="playing-card" src="' + getCardImageUrl(dealerHand[0]) + '"/>',
      '<img class="playing-card" src="' + getCardImageUrl(dealerHand[1]) + '"/>');
  });
  $(".hit-button").on('click', function() {
    $(".player-hand").append("<img class='playing-card' src='images/2_of_spades.png'/>");
  });

// });
