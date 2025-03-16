import { Directions } from "./constants.js";
import { Matrix } from "./matrix.js";
import { Point } from "./point.js";
import { Tetrino } from "./tetrino.js";

export class Board {
  constructor(sizeX, sizeY) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.reset();
  }

  reset() {
    this.matrix = new Matrix(this.sizeX, this.sizeY);
    this.tetrino = undefined;
    this.nextTetrino = new Tetrino();
  }

  moveTetrinoIntoPosition(tetrinoToMove) {
    var newTertino = tetrinoToMove;
    newTertino.calculateMovement();
    var coords = newTertino
      .getCoordinates()
      .map(
        (coordinate) =>
          new Point(coordinate.x + Math.floor(this.sizeX / 2) - 2, coordinate.y)
      );
    newTertino.setCoordinates(coords);
    return newTertino;
  }

  getTetrino() {
    return this.tetrino;
  }

  getNextTetrino() {
    return this.nextTetrino;
  }

  getMatrix() {
    return this.matrix;
  }

  canTetrinoSpawn() {
    return !this.matrix.detectCollision(this.nextTetrino.getCoordinates());
  }

  spawnTetrino() {
    this.tetrino = this.moveTetrinoIntoPosition(this.nextTetrino);
    this.nextTetrino = new Tetrino();
    this.drawTetrinoOnMatrix();
  }

  moveTetrino(direction) {
    if (this.tetrino) {
      const tetrinoCoordinatesAfterMove =
        this.tetrino.calculateMovement(direction);

      if (this.canTetrinoMove(tetrinoCoordinatesAfterMove)) {
        this.repaintTetrino(tetrinoCoordinatesAfterMove);
        return true;
      }
      return false;
    }
    return false;
  }

  rotateTetrino() {
    if (this.tetrino) {
      const tetrinoCoordinatesAfterRotation = this.tetrino.calculateRotation();

      if (this.canTetrinoMove(tetrinoCoordinatesAfterRotation)) {
        this.repaintTetrino(tetrinoCoordinatesAfterRotation);
        this.tetrino.bumpRotation();
        return true;
      }
      return false;
    }
    return false;
  }

  dropTetrino() {
    let tetrinoDropRows = 0;

    if (this.tetrino) {
      let tetrinoDropLoop = true;
      let tetrinoCoordinatesAfterDrop;
      let tetrinoCoordinatesBeforeDrop = this.tetrino.getCoordinates();

      while (tetrinoDropLoop) {
        tetrinoDropRows++;
        tetrinoCoordinatesAfterDrop = this.tetrino.calculateMovement(
          Directions.Bottom
        );
        if (this.canTetrinoMove(tetrinoCoordinatesAfterDrop)) {
          this.tetrino.setCoordinates(tetrinoCoordinatesAfterDrop);
        } else {
          tetrinoDropLoop = false;
        }
      }

      this.clearTetrinoFromMatrix(tetrinoCoordinatesBeforeDrop);
      this.drawTetrinoOnMatrix();
    }

    return tetrinoDropRows;
  }

  tickTetrino() {
    if (!this.moveTetrino(Directions.Bottom)) {
      this.tetrino = undefined;
    }
  }

  canTetrinoMove(coordinates) {
    return !this.matrix.detectCollision(
      coordinates,
      this.tetrino.getCoordinates()
    );
  }

  repaintTetrino(coordinates) {
    this.clearTetrinoFromMatrix();
    this.tetrino.setCoordinates(coordinates);
    this.drawTetrinoOnMatrix();
  }

  drawTetrinoOnMatrix(coordinates) {
    this.matrix.setCells(
      coordinates ? coordinates : this.tetrino.getCoordinates(),
      this.tetrino.getTypeId()
    );
  }

  clearTetrinoFromMatrix(coordinates) {
    this.matrix.clearCells(
      coordinates ? coordinates : this.tetrino.getCoordinates()
    );
  }

  eraseFullRows() {
    return this.matrix.eraseFullRows();
  }
}
