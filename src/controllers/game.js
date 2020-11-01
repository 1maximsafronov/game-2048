import GameGridComponent from "../components/game-grid.js";
import GameBoardComponent from "../components/game-board.js";
import GameComponent from "../components/game.js";
import CellComponent from "../components/cell/cell.js";
import {render, replace} from "../utils/render.js";

export default class GameController {
  constructor(container, gameStatModel) {
    this._container = container;
    this._gameStatModel = gameStatModel;
    this._gameComponent = null;
    this._gameGridComponent = null;
    this._gameBoardComponent = null;

    this._data = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null]
    ];

    this._blocked = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
  }

  render() {
    this._gameComponent = new GameComponent();
    this._gameGridComponent = new GameGridComponent();
    this._gameBoardComponent = new GameBoardComponent();
    render(this._gameComponent.getElement(), this._gameGridComponent.getElement());
    render(this._gameComponent.getElement(), this._gameBoardComponent.getElement());
    render(this._container, this._gameComponent.getElement());

    document.addEventListener(`keydown`, (evt) => {
      switch (evt.keyCode) {
        case 37:
          evt.preventDefault();
          this._moveLeft();
          this._addCell();
          this._resetBlock();
          break;
        case 38:
          evt.preventDefault();
          this._moveUp();
          this._addCell();
          this._resetBlock();
          break;
        case 39:
          evt.preventDefault();
          this._moveRight();
          this._addCell();
          this._resetBlock();
          break;
        case 40:
          evt.preventDefault();
          this._moveDown();
          this._addCell();
          this._resetBlock();
          break;
      }
    });
  }

  _getRandomCell(value = 2) {
    let x = Math.floor(Math.random() * 4) + 1;
    let y = Math.floor(Math.random() * 4) + 1;

    while (this._data[y - 1][x - 1]) {
      x = Math.floor(Math.random() * 4) + 1;
      y = Math.floor(Math.random() * 4) + 1;
    }

    const newCell = new CellComponent(value, y, x);
    return newCell;
  }

  _addCell() {
    const gameBoardElement = this._gameBoardComponent.getElement();
    let value = 2;
    if (Math.floor(Math.random() * 10) === 9) {
      value = 4;
    }
    const newCell = this._getRandomCell(value);
    this._data[newCell._row - 1][newCell._column - 1] = newCell;
    render(gameBoardElement, newCell.getElement());
  }

  _collapseCells(first, second) {
    const x = first._column - 1;
    const y = first._row - 1;

    if (!this._blocked[y][x]) {
      const newCell = new CellComponent(first._value + second._value, first._row, first._column);
      second.getElement().remove();
      replace(newCell.getElement(), first.getElement());
      this._data[y][x] = newCell;
      this._blocked[y][x] = 1;
      this._gameStatModel.addScore(newCell._value);
      return true;
    }

    return false;
  }

  _resetBlock() {
    for (let i = 0; i < this._blocked.length; i++) {
      for (let j = 0; j < this._blocked[i].length; j++) {
        this._blocked[i][j] = 0;
      }
    }
  }

  _resetData() {
    for (let i = 0; i < this._data.length; i++) {
      for (let j = 0; j < this._data[i].length; j++) {
        this._data[i][j] = null;
      }
    }
  }

  _moveLeft() {
    for (let i = 0; i < this._data.length; i++) {
      for (let j = 0; j < this._data[i].length; j++) {
        if (this._data[i][j] !== null) {
          const targetCell = this._data[i][j];
          this._data[i][j] = null;
          let targetX = j;
          let isMerged = false;

          for (let k = j - 1; (k >= 0); k--) {
            if (this._data[i][k] === null) {
              targetX = k;
            } else {
              if (this._data[i][k]._value === targetCell._value) {
                targetCell.move(targetX, i);
                isMerged = this._collapseCells(this._data[i][k], targetCell);
              }
              break;
            }
          }
          if (!isMerged) {
            targetCell.move(targetX, i);
            this._data[i][targetX] = targetCell;
          }
        }
      }
    }
  }

  _moveRight() {
    for (let i = 0; i < this._data.length; i++) {

      for (let j = this._data[i].length - 1; j >= 0; j--) {

        if (this._data[i][j] !== null) {
          const targetCell = this._data[i][j];
          this._data[i][j] = null;
          let targetX = j;
          let isMerged = false;

          for (let k = j + 1; (k < this._data[i].length); k++) {
            if (this._data[i][k] === null) {
              targetX = k;
            } else {
              if (this._data[i][k]._value === targetCell._value) {
                targetCell.move(targetX, i);
                isMerged = this._collapseCells(this._data[i][k], targetCell);
              }
              break;
            }
          }
          if (!isMerged) {
            targetCell.move(targetX, i);
            this._data[i][targetX] = targetCell;
          }
        }
      }
    }
  }

  _moveUp() {
    for (let i = 0; i < this._data.length; i++) {
      for (let j = 0; j < this._data[i].length; j++) {
        if (this._data[i][j] !== null) {
          const targetCell = this._data[i][j];
          this._data[i][j] = null;
          let targetY = i;
          let isMerged = false;

          for (let k = i - 1; k >= 0; k--) {
            if (this._data[k][j] === null) {
              targetY = k;

            } else {
              if (this._data[k][j]._value === targetCell._value) {
                targetCell.move(j, targetY);
                isMerged = this._collapseCells(this._data[k][j], targetCell);
              }
              break;
            }
          }
          if (!isMerged) {
            this._data[targetY][j] = targetCell;
            targetCell.move(j, targetY);
          }
        }
      }
    }
  }

  _moveDown() {
    for (let i = this._data.length - 1; i >= 0; i--) {

      for (let j = 0; j < this._data[i].length; j++) {

        if (this._data[i][j] !== null) {
          const targetCell = this._data[i][j];
          this._data[i][j] = null;
          let targetY = i;
          let isMerged = false;

          for (let k = i + 1; (k < this._data.length); k++) {
            if (this._data[k][j] === null) {
              targetY = k;

            } else {
              if (this._data[k][j]._value === targetCell._value) {
                targetCell.move(j, targetY);
                isMerged = this._collapseCells(this._data[k][j], targetCell);
              }
              break;
            }
          }
          if (!isMerged) {
            this._data[targetY][j] = targetCell;
            targetCell.move(j, targetY);
          }
        }
      }
    }
  }

  start() {
    this.reset();
    const gameBoardElement = this._gameBoardComponent.getElement();
    let firstCell = this._getRandomCell();
    this._data[firstCell._row - 1][firstCell._column - 1] = firstCell;
    let secondCell = this._getRandomCell();
    this._data[secondCell._row - 1][secondCell._column - 1] = secondCell;
    render(gameBoardElement, firstCell.getElement());
    render(gameBoardElement, secondCell.getElement());
  }

  reset() {
    this._resetBlock();
    this._resetData();
    this._gameStatModel.resetScore();
    this._gameBoardComponent.getElement().textContent = ``;
  }
}
