import AbstractComponent from "./abstract-component.js";

export default class GameBoard extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return (`<div class="game-board"></div>`);
  }
}
