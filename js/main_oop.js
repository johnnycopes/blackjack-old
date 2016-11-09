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



// BUGS:
// tighten up counters. counter doesnt reset on bankruptcy
// dealer will hit until >17 even if player stands at a low number
// split:
//  - need to know about specific win/lose/push for each hand
//  - account for money on each hand (put down the wager for each)
// double down:
//  - accidentally killed the option to double down at all
// would be cool for value to update with 16/6 for Ace
// visual indicators of winning/losing/progress in general
