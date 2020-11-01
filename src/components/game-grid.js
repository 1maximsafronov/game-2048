import AbstractComponent from "./abstract-component.js";

export default class GameGrid extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return (
      `<div class="game-grid">
        <div class="game-grid__cell"></div>
        <div class="game-grid__cell"></div>
        <div class="game-grid__cell"></div>
        <div class="game-grid__cell"></div>
        <div class="game-grid__cell"></div>
        <div class="game-grid__cell"></div>
        <div class="game-grid__cell"></div>
        <div class="game-grid__cell"></div>
        <div class="game-grid__cell"></div>
        <div class="game-grid__cell"></div>
        <div class="game-grid__cell"></div>
        <div class="game-grid__cell"></div>
        <div class="game-grid__cell"></div>
        <div class="game-grid__cell"></div>
        <div class="game-grid__cell"></div>
        <div class="game-grid__cell"></div>
      </div>`
    );
  }
}
