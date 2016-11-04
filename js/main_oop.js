var gameDeck = new Deck,
    dealerHand = new Hand,
    playerHand = new Hand;

$('.deal').on('click', function() {
  reset();
  gameDeck.generate(3);
  deal();
});

$('.hit').on('click', function() {
  hit();
});

$('.stand').on('click', function() {
  stand();
});
