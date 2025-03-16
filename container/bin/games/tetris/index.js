import { Tetris } from "./tetris.js";
import { GameConfig } from "./constants.js";

const tetris = new Tetris();

export const TetrisModule = {
  start: () => tetris.start(GameConfig),
  stop: () => tetris.stop(),
  restart: () => {
    tetris.stop();
    tetris.start(GameConfig);
  },
  pause: () => tetris.pause(),
  continue: () => tetris.continue(),
};