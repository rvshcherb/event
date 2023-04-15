export default class Game {
  constructor({ size, hitHandler, missHandler }) {
    this.fieldSize = size;
    this.misses = 0;
    this.hits = 0;
    this.targetCell = undefined;
    this.field = null;
    this.game = document.querySelector('.game');
    this.interval = null;
    this.hitHandler = hitHandler;
    this.missHandler = missHandler;
    this.gameOver = this.gameOver.bind(this);
  }

  _bindToDom() {
    this.game.appendChild(this.field);
  }

  _generateField() {
    const field = document.createElement('div');
    field.classList.add('field');
    let i = 0;
    while (i < this.fieldSize) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      field.appendChild(cell);
      i += 1;
    }
    this.field = field;
  }

  _createTargetCell() {
    const randomCell = Math.floor(Math.random() * this.fieldSize);
    if (randomCell !== this.targetCell) {
      return randomCell;
    }
    return this._createTargetCell();
  }

  startGame() {
    this._generateField();
    this._bindToDom();
    this.field.addEventListener('click', this._onHit.bind(this));
    const cells = Array.from(this.field.children);
    this.interval = setInterval(() => {
      this.targetCell = this._createTargetCell();
      cells.forEach((cell) => cell.classList.remove('target'));
      cells[this.targetCell].classList.add('target');
    }, 1000);
  }

  _onHit(evt) {
    if (evt.target.classList.contains('target')) {
      this.hits += 1;
      this.hitHandler(this.hits);
    } else {
      this.misses += 1;
      this.missHandler(this.misses);
      if (this.misses >= 5) {
        this.gameOver();
      }
    }
  }

  gameOver() {
    clearInterval(this.interval);
    this.field.classList.add('game-over');
    const cells = Array.from(this.field.children);
    cells.forEach((cell) => cell.classList.remove('target'));
    this.field.insertAdjacentHTML('beforeend', `
      <div class="gameover-notice">
        <p>Game over</p>
      </div>
    `);
  }
}
