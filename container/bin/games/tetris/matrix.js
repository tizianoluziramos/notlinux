export class Matrix {
  constructor(sizeX, sizeY) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.reset();
  }

  getSizeX() {
    return this.sizeX;
  }

  getSizeY() {
    return this.sizeY;
  }

  getCell(coordinate) {
    return this.cells[coordinate.y][coordinate.x];
  }

  getCells() {
    return this.cells;
  }

  setCells(coordinates, value) {
    coordinates.forEach((coordinate) => {
      this.cells[coordinate.y][coordinate.x] = value;
    });
  }

  clearCells(coordinates) {
    coordinates.forEach((coordinate) => {
      this.cells[coordinate.y][coordinate.x] = 0;
    });
  }

  reset() {
    this.cells = [];

    for (let y = 0; y < this.sizeY; y++) {
      this.cells.push(this.getEmptyRow());
    }
  }

  getEmptyRow() {
    return new Array(this.sizeX).fill(0);
  }

  detectCollision(coordinates, coordinatesToIgnore = []) {
    let collisionDetected = false;

    for (let coordinate of coordinates) {
      if (
        coordinate.x < 0 ||
        coordinate.y < 0 ||
        coordinate.x > this.sizeX - 1 ||
        coordinate.y > this.sizeY - 1 ||
        this.cells[coordinate.y][coordinate.x] !== 0
      ) {
        collisionDetected = true;

        for (let coordinateToIgnore of coordinatesToIgnore) {
          if (
            coordinate.x === coordinateToIgnore.x &&
            coordinate.y === coordinateToIgnore.y
          ) {
            collisionDetected = false;
            break;
          }
        }

        if (collisionDetected) {
          break;
        }
      }
    }

    return collisionDetected;
  }

  eraseFullRows() {
    let count = 0;

    this.cells.forEach((row, index) => {
      let fullRow = true;
      for (let cell of row) {
        if (cell === 0) {
          fullRow = false;
          break;
        }
      }
      if (fullRow) {
        count++;
        this.cells.splice(index, 1);
        this.cells.unshift(this.getEmptyRow());
      }
    });

    return count;
  }
}
