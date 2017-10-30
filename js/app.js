import Game from './game';

var currentGame = new Game;

currentGame.makeBet();

$('.deal').on('click', function() {
  currentGame.resetGame();
  currentGame.gameDeck.generate(3);
  currentGame.deal();
});

$('.hit').on('click', function() {
  currentGame.hit();
});

$('.stand').on('click', function() {
  currentGame.stand();
});

$('.double-down').on('click', function() {
  currentGame.doubleDown();
});

$('.split').on('click', function() {
  currentGame.split();
});
