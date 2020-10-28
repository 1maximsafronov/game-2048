const gameField = document.querySelector(`.game-field`);

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (container, element) => {
  container.append(element);
};

const replace = (newElement, oldElement) => {
  const parentElement = oldElement.parentElement;

  const isExistElements = !!(newElement && oldElement && parentElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

const createCellTemplate = (data) => {
  const { value, row, column } = data;
  return (
    `<div class="cell cell--${value}"
          style="transform: translateX(${(column - 1) * 115}px) translateY(${(row - 1) * 115}px);">
      ${value}
    </div>`
  );
};

class Cell {
  constructor(value, row, column) {
    this._value = value;
    this._row = row;
    this._column = column;
    this._element = null;
  }

  getTemplate() {
    return createCellTemplate({ value: this._value, row: this._row, column: this._column })
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  replaceElement() {
    const newElement = createElement(this.getTemplate());
    replace(newElement, this._element)
    this._element = newElement;
  }

  move(x, y) {
    this._column = x + 1;
    this._row = y + 1;
    this.getElement().style.transform = `translateX(${(this._column - 1) * 115}px) translateY(${(this._row - 1) * 115}px)`;
    // this.replaceElement();
  }
}


const call1 = new Cell(2, 1, 2);

const getRandomCell = (value = 2) => {
  let x = Math.floor(Math.random() * 4) + 1;
  let y = Math.floor(Math.random() * 4) + 1;

  while (data[y - 1][x - 1]) {
    x = Math.floor(Math.random() * 4) + 1;
    y = Math.floor(Math.random() * 4) + 1;
  }

  const newCell = new Cell(value, y, x);
  return newCell;
}

let data = [
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null]
];

let blocked = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
];

const startGame = () => {
  let firstCell = getRandomCell();
  data[firstCell._row - 1][firstCell._column - 1] = firstCell;
  let secondCell = getRandomCell();
  data[secondCell._row - 1][secondCell._column - 1] = secondCell;

  render(gameField, firstCell.getElement());
  render(gameField, secondCell.getElement());
};

const addCell = () => {
  let value = 2;
  if (Math.floor(Math.random() * 10) == 9) {
    value = 4;
  }
  const newCell = getRandomCell(value);
  data[newCell._row - 1][newCell._column - 1] = newCell;
  render(gameField, newCell.getElement());
}

const collapseCells = (first, second) => {

  const x = first._column - 1;
  const y = first._row - 1;

  if (!blocked[y][x]) {
    const newCell = new Cell(first._value + second._value, first._row, first._column);
    second.getElement().remove();
    replace(newCell.getElement(), first.getElement());
    data[y][x] = newCell;
    blocked[y][x] = 1;

    return true;
  }

  return false;
};

const moveLeft = () => {
  for (let i = 0; i < data.length; i++) {

    for (let j = 0; j < data[i].length; j++) {

      if (data[i][j] != null) {
        const targetCell = data[i][j];
        data[i][j] = null;
        let targetX = j;
        let isMerged = false;

        for (let k = j - 1; (k >= 0); k--) {
          if (data[i][k] == null) {
            targetX = k;
          } else {
            if (data[i][k]._value === targetCell._value) {
              targetCell.move(targetX, i);
              isMerged = collapseCells(data[i][k], targetCell);
            }
            break;
          }
        }
        if (!isMerged) {
          targetCell.move(targetX, i);
          data[i][targetX] = targetCell;
        }
      }
    }
  }
};

const moveRight = () => {
  for (let i = 0; i < data.length; i++) {

    for (let j = data[i].length - 1; j >= 0; j--) {

      if (data[i][j] != null) {
        const targetCell = data[i][j];
        data[i][j] = null;
        let targetX = j;
        let isMerged = false;

        for (let k = j + 1; (k < data[i].length); k++) {
          if (data[i][k] == null) {
            targetX = k;
          } else {
            if (data[i][k]._value === targetCell._value) {
              targetCell.move(targetX, i);
              isMerged = collapseCells(data[i][k], targetCell);
            }
            break;
          }
        }
        if (!isMerged) {
          targetCell.move(targetX, i);
          data[i][targetX] = targetCell;
        }
      }
    }
  }
};

const moveUp = () => {
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (data[i][j] != null) {
        const targetCell = data[i][j];
        data[i][j] = null;
        let targetY = i;
        let isMerged = false;

        for (let k = i - 1; k >= 0; k--) {
          if (data[k][j] == null) {
            targetY = k;

          } else {
            if (data[k][j]._value === targetCell._value) {
              targetCell.move(j, targetY);
              isMerged = collapseCells(data[k][j], targetCell);
            }
            break;
          }
        }
        if (!isMerged) {
          data[targetY][j] = targetCell;
          targetCell.move(j, targetY);
        }
      }
    }
  }

};

const moveDown = () => {
  for (let i = data.length - 1; i >= 0; i--) {

    for (let j = 0; j < data[i].length; j++) {

      if (data[i][j] != null) {
        const targetCell = data[i][j];
        data[i][j] = null;
        let targetY = i;
        let isMerged = false;

        for (let k = i + 1; (k < data.length); k++) {
          if (data[k][j] == null) {
            targetY = k;

          } else {
            if (data[k][j]._value === targetCell._value) {
              targetCell.move(j, targetY);
              isMerged = collapseCells(data[k][j], targetCell);
            }
            break;
          }
        }
        if (!isMerged) {
          data[targetY][j] = targetCell;
          targetCell.move(j, targetY);
        }
      }
    }
  }
};

const resetBlock = () => {
  for (let i = 0; i < blocked.length; i++) {
    for (let j = 0; j < blocked[i].length; j++) {
      blocked[i][j] = 0;
    }
  }
}

document.addEventListener(`keydown`, (evt) => {
  switch (evt.keyCode) {
    case 37:
      evt.preventDefault();
      moveLeft();
      addCell();
      resetBlock();
      break;
    case 38:
      evt.preventDefault();
      moveUp();
      addCell();
      resetBlock();
      break;
    case 39:
      evt.preventDefault();
      moveRight();
      addCell();
      resetBlock();
      break;
    case 40:
      evt.preventDefault();
      moveDown();
      addCell();
      resetBlock();
      break;
  }
});


startGame();
