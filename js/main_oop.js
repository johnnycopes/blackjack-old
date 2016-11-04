var deck = [],
    dealerHand = [],
    playerHand = [],
    suitIndex = 0,
    suits = ['diamonds', 'hearts', 'spades', 'clubs'],
    money = 500;

$('.deal').on('click', function() {
  reset();
  makeDeck(3);
  deal();
});

$('.hit').on('click', function() {
  hit();
  updatePlayer();
});

$('.stand').on('click', function() {
  stand();
});
