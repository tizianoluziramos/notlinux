import { Controller } from "./controller.js";

export class Tetris {
  constructor() {}

  start(config) {
    this.gameController = new Controller(config);
    this.gameController.start();
  }

  stop() {
    this.gameController.stop();
    this.gameController = undefined;
  }

  pause() {
    this.gameController.stop();
  }

  continue() {
    this.gameController.start();
  }
}
