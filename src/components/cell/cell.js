import "./cell.css";
import AbstractComponent from "../abstract-component.js";

export default class Cell extends AbstractComponent {
  constructor(value, row, column) {
    super();
    this._value = value;
    this._row = row;
    this._column = column;
    this._element = null;
  }

  getTemplate() {
    const value = this._value;
    const row = this._row;
    const column = this._column;
    return (
      `<div class="cell cell--${value}"
          style="transform: translateX(${(column - 1) * 115}px) translateY(${(row - 1) * 115}px);">
      ${value}
    </div>`
    );
  }

  move(x, y) {
    this._column = x + 1;
    this._row = y + 1;
    this.getElement().style.transform = `translateX(${(this._column - 1) * 115}px) translateY(${(this._row - 1) * 115}px)`;
  }
}
