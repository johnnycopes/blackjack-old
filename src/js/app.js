import jQuery from 'jquery';
window.$ = window.jQuery = jQuery;

import Game from './modules/game';

new Game;

// TODO:
// 1. continue breaking things down into smaller functions, specifically on start/end game mode fns
// 2. see if dealerTurn fn can be refactored
// 3. create slider instead of buttons for betting and show/hide it when appropriate
// 4. after all refactoring, implement animations
// 5. test split outcomes more thoroughly