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



// to-do list:

// would be cool for value to update with 16/6 for Ace
// help modal
// if dollar amounts aren't integers, decimals show up without zero (583.5)
// visual indicators of winning/losing/progress in general
// animations/transitions
// title on entry
