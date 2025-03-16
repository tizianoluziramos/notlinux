import { Directions, TetrinoTypes } from "./constants.js";
import { Point } from "./point.js";

export class Tetrino {
  constructor(type, coordinates) {
    this.type = type
      ? type
      : TetrinoTypes[Math.floor(Math.random() * TetrinoTypes.length)];
    this.currentShapeId = Math.floor(Math.random() * this.type.shapes.length);
    this.coordinates = coordinates
      ? coordinates
      : this.type.shapes[this.currentShapeId];
  }

  getTypeId() {
    return this.type.id;
  }

  getCoordinates() {
    return this.coordinates;
  }

  setCoordinates(coordinates) {
    this.coordinates = coordinates;
  }

  bumpRotation() {
    this.currentShapeId =
      this.currentShapeId === this.type.shapes.length - 1
        ? 0
        : this.currentShapeId + 1;
  }

  calculateMovement(direction) {
    switch (direction) {
      case Directions.Top:
        return this.coordinates.map(
          (coordinate) => new Point(coordinate.x, coordinate.y - 1)
        );

      case Directions.Right:
        return this.coordinates.map(
          (coordinate) => new Point(coordinate.x + 1, coordinate.y)
        );

      case Directions.Bottom:
        return this.coordinates.map(
          (coordinate) => new Point(coordinate.x, coordinate.y + 1)
        );

      case Directions.Left:
        return this.coordinates.map(
          (coordinate) => new Point(coordinate.x - 1, coordinate.y)
        );

      default:
        return this.coordinates;
    }
  }

  calculateRotation() {
    const currentShape = this.type.shapes[this.currentShapeId];
    const nextShape =
      this.type.shapes[
        this.currentShapeId === this.type.shapes.length - 1
          ? 0
          : this.currentShapeId + 1
      ];

    return this.coordinates.map(
      (coordinate, index) =>
        new Point(
          coordinate.x - currentShape[index].x + nextShape[index].x,
          coordinate.y - currentShape[index].y + nextShape[index].y
        )
    );
  }
}
