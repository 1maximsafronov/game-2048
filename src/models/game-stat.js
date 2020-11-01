export default class gameStatModel {
  constructor() {
    this._currentScore = 0;
    this._bestScore = 0;
    this._scoreChangeHandlers = [];
  }

  addScore(score) {
    this._currentScore += score;
    this._callHadlers(this._scoreChangeHandlers);
  }

  getScore() {
    return this._currentScore;
  }

  resetScore() {
    this._currentScore = 0;
    this._callHadlers(this._scoreChangeHandlers);
  }

  setScoreChangeHandler(handler) {
    this._scoreChangeHandlers.push(handler);
  }

  _callHadlers(handlers) {
    handlers.forEach((handler) => {
      handler();
    });
  }
}
