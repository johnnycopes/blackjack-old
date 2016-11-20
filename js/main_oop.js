var game = new Game();

game.makeBet();

$('.deal').on('click', function() {
  game.resetGame();
  game.gameDeck.generate(3);
  game.deal();
});

$('.hit').on('click', function() {
  game.hit();
});

$('.stand').on('click', function() {
  game.stand();
});

$('.double-down').on('click', function() {
  game.doubleDown();
});

$('.split').on('click', function() {
  game.split();
});
