import AbstractComponent from "./abstract-component.js";

export default class GameHeader extends AbstractComponent {
  constructor() {
    super();
  }

  setNewGameBtnClickHandler(handler) {
    const newGamebtn = this.getElement().querySelector(`.main-header__new-game-btn`);

    newGamebtn.addEventListener(`click`, (evt) =>{
      evt.preventDefault();
      handler();
    });
  }

  setScore(score) {
    const scoreBoard = this.getElement().querySelector(`.score__current`);
    scoreBoard.textContent = score;
  }

  getTemplate() {
    return (
      `<header class="main-header container">
        <h1 class="main-header__title">2048</h1>
        <div class="main-header__controll">
          <div class="main-header__score score">
            <p class="score__current">12345</p>
            <p class="score__best">54321</p>
          </div>
          <button class="main-header__new-game-btn btn">Новая игра</button>
        </div>
      </header>`
    );
  }
}
