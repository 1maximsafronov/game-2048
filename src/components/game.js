import AbstractComponent from "./abstract-component.js";

export default class GameBoard extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return (`<section class="container game"></section>`);
  }
}
