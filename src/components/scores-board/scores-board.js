export default class ScoresBoard {
  constructor(hits, misses) {
    this.hitsScore = document.querySelector(hits);
    this.missesScore = document.querySelector(misses);

    this.onEncreaseHits = this.onEncreaseHits.bind(this);
    this.onEncreaseMisses = this.onEncreaseMisses.bind(this);
  }

  onEncreaseHits(hits) {
    this.hitsScore.innerText = hits;
  }

  onEncreaseMisses(misses) {
    this.missesScore.innerText = misses;
  }
}
