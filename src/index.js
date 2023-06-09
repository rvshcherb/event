import './css/style.css';
import Game from './js/Game';
import ScoresBoard from './components/scores-board/scores-board';

const scoresBoard = new ScoresBoard('.hits', '.misses');

const game = new Game({
  size: 16,
  hitHandler: scoresBoard.onEncreaseHits,
  missHandler: scoresBoard.onEncreaseMisses,
});

game.startGame();
