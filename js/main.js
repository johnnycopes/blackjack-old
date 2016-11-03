var deck = [],
    dealerHand = [],
    playerHand = [],
    suitIndex = 0,
    suits = ['diamonds', 'hearts', 'spades', 'clubs'];

$('.deal').on('click', function() {
  reset();
  generateDeck();
  deal();
});

$('.hit').on('click', function() {
  hit();
  updatePlayer();
});

$('.stand').on('click', function() {
  stand();
});
