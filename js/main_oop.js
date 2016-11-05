var game = new Game();

game.makeBet();

$('.deal').on('click', function() {
  game.reset();
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



// BUGS:
// dealer will hit until >17 even if player stands at a low number
