import { Point } from "./point.js";

export const GameConfig = {
  GAME: {
    BOARD_WIDTH: 12,
    BOARD_HEIGHT: 20,
  },
  CONTROLS: {
    MOVE_TETRINO_LEFT: "ArrowLeft",
    MOVE_TETRINO_RIGHT: "ArrowRight",
    ROTATE_TETRINO: "ArrowUp",
    DROP_TETRINO: "ArrowDown",
    PAUSE: "Space",
  },
};

export const Directions = {
  Top: 0,
  Right: 1,
  Bottom: 2,
  Left: 3,
};

export const TetrinoTypes = [
  {
    id: 1,
    color: "red",
    shapes: [
      [new Point(0, 0), new Point(0, 1), new Point(1, 0), new Point(1, 1)],
    ],
    spawnRowId: 2,
  },
  {
    id: 2,
    color: "yellow",
    shapes: [
      [new Point(1, 0), new Point(1, 1), new Point(1, 2), new Point(2, 2)],
      [new Point(2, 1), new Point(1, 1), new Point(0, 1), new Point(0, 2)],
      [new Point(1, 2), new Point(1, 1), new Point(1, 0), new Point(0, 0)],
      [new Point(0, 1), new Point(1, 1), new Point(2, 1), new Point(2, 0)],
    ],
    spawnRowId: 1,
  },
  {
    id: 3,
    color: "green",
    shapes: [
      [new Point(1, 0), new Point(1, 1), new Point(1, 2), new Point(0, 2)],
      [new Point(2, 1), new Point(1, 1), new Point(0, 1), new Point(0, 0)],
      [new Point(1, 2), new Point(1, 1), new Point(1, 0), new Point(2, 0)],
      [new Point(0, 1), new Point(1, 1), new Point(2, 1), new Point(2, 2)],
    ],
    spawnRowId: 1,
  },
  {
    id: 4,
    color: "blue",
    shapes: [
      [new Point(0, 1), new Point(1, 1), new Point(1, 2), new Point(2, 2)],
      [new Point(1, 0), new Point(1, 1), new Point(0, 1), new Point(0, 2)],
      [new Point(0, 0), new Point(1, 0), new Point(1, 1), new Point(2, 1)],
      [new Point(2, 0), new Point(2, 1), new Point(1, 1), new Point(1, 2)],
    ],
    spawnRowId: 1,
  },
  {
    id: 5,
    color: "cyan",
    shapes: [
      [new Point(2, 1), new Point(1, 1), new Point(1, 2), new Point(0, 2)],
      [new Point(0, 0), new Point(0, 1), new Point(1, 1), new Point(1, 2)],
      [new Point(2, 0), new Point(1, 0), new Point(1, 1), new Point(0, 1)],
      [new Point(1, 0), new Point(1, 1), new Point(2, 1), new Point(2, 2)],
    ],
    spawnRowId: 1,
  },
  {
    id: 6,
    color: "magenta",
    shapes: [
      [new Point(1, 0), new Point(0, 1), new Point(1, 1), new Point(2, 1)],
      [new Point(2, 1), new Point(1, 0), new Point(1, 1), new Point(1, 2)],
      [new Point(1, 2), new Point(2, 1), new Point(1, 1), new Point(0, 1)],
      [new Point(0, 1), new Point(1, 2), new Point(1, 1), new Point(1, 0)],
    ],
    spawnRowId: 1,
  },
  {
    id: 7,
    color: "magenta",
    shapes: [
      [new Point(0, 1), new Point(1, 1), new Point(2, 1), new Point(3, 1)],
      [new Point(1, 0), new Point(1, 1), new Point(1, 2), new Point(1, 3)],
      [new Point(0, 2), new Point(1, 2), new Point(2, 2), new Point(3, 2)],
      [new Point(2, 0), new Point(2, 1), new Point(2, 2), new Point(2, 3)],
    ],
    spawnRowId: 0,
  },
];
