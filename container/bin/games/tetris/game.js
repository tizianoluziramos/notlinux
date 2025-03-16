import { Board } from "./board.js";
import { Display } from "./display.js";

export class Game {
  constructor(gameConfig, controlsConfig) {
    this.config = { game: gameConfig, controls: controlsConfig };
    this.display = new Display();
    this.init();
  }

  isRunning() {
    return this.running;
  }

  isOver() {
    return this.over;
  }

  init() {
    this.board = new Board(
      this.config.game.BOARD_WIDTH,
      this.config.game.BOARD_HEIGHT
    );

    this.score = 0;
    this.level = 1;
    this.running = false;
    this.over = false;

    this.calculateLevelConfig();
  }

  restart() {
    if (this.running) {
      this.stop();
    }
    this.init();
    this.start();
  }

  start() {
    const gameLoop = () => {
      if (!this.isNextLevel()) {
        if (!this.board.getTetrino()) {
          this.updateScoreForTetrinoPlaced();
          this.updateScoreForFullRows();
          if (this.board.canTetrinoSpawn()) {
            this.board.spawnTetrino();
            this.refreshDisplay();
          } else {
            this.gameOver();
          }
        } else {
          this.board.tickTetrino();
          this.refreshDisplay();
        }
      } else {
        this.levelUp();
      }
    };

    this.running = true;
    gameLoop();
    this.loop = setInterval(gameLoop, this.levelConfig.DELAY);
  }

  stop(messages = ["PAUSED"]) {
    this.running = false;
    clearInterval(this.loop);
    this.refreshDisplay(messages);
  }

  refreshDisplay(messages = []) {
    this.display.refresh(
      this.board.getMatrix(),
      this.level,
      this.score,
      this.board.nextTetrino,
      messages
    );
  }

  isNextLevel() {
    return this.score >= this.levelConfig.SCORE.CAP;
  }

  levelUp() {
    this.level++;

    this.updateScoreForLevels();
    this.calculateLevelConfig();

    this.stop(["LEVEL UP", `LEVEL ${this.level} NOW`]);

    setTimeout(() => {
      this.board.reset();
      this.start();
    }, 2000);
  }

  calculateLevelConfig() {
    const scoreModifier = Math.pow(this.level, 1.1);
    this.levelConfig = {
      SCORE: {
        PER_DROP: 1 * scoreModifier,
        PER_TETRINO: 3 * scoreModifier,
        PER_FULL_ROW: 10 * scoreModifier,
        PER_LEVEL: 100 * scoreModifier,
        CAP: 500 * this.level * scoreModifier,
      },
      DELAY: this.calculateDelay(this.level),
    };
  }

  calculateDelay() {
    const minDelay = 100;
    const maxDelay = 1000;

    const calculateDelayRec = (
      targetLevel,
      currentLevel = 1,
      delay = maxDelay
    ) =>
      currentLevel === targetLevel
        ? delay
        : calculateDelayRec(
            targetLevel,
            ++currentLevel,
            parseInt(delay - (delay - minDelay) / 10, 10)
          );

    return calculateDelayRec(this.level);
  }

  moveTetrino(direction) {
    this.board.moveTetrino(direction);
    this.refreshDisplay();
  }

  rotateTetrino() {
    this.board.rotateTetrino();
    this.refreshDisplay();
  }

  dropTetrino() {
    this.updateScoreForTetrinoDropped(this.board.dropTetrino());
    this.refreshDisplay();
  }

  updateScoreForFullRows() {
    this.score +=
      this.board.eraseFullRows() * this.levelConfig.SCORE.PER_FULL_ROW;
  }

  updateScoreForLevels() {
    this.score += this.levelConfig.SCORE.PER_LEVEL;
  }

  updateScoreForTetrinoPlaced() {
    this.score += this.levelConfig.SCORE.PER_TETRINO;
  }

  updateScoreForTetrinoDropped(rows) {
    this.score += rows * this.levelConfig.SCORE.PER_DROP;
  }

  gameOver() {
    this.over = true;
    this.stop([
      "GAME OVER",
      "",
      "PRESS",
      `[${this.config.controls.PAUSE}]`,
      "TO RESTART",
    ]);
  }
}
