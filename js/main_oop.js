var gameDeck = new Deck,
    dealerHand = new Hand,
    playerHand = new Hand;

$('.deal').on('click', function() {
  reset();
  gameDeck.generate();
  deal();
});

$('.hit').on('click', function() {
  hit();
  updatePlayer();
});

$('.stand').on('click', function() {
  stand();
});
