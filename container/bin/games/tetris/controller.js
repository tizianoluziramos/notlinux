import { Directions } from "./constants.js";
import { Game } from "./game.js";
import keypress from 'keypress';

export class Controller {
  constructor(config) {
    this.game = new Game(config.GAME, config.CONTROLS);
    this.controls = config.CONTROLS;

    // Configurar keypress para capturar teclas especiales como las flechas
    keypress(process.stdin);

    // Habilitar el modo interactivo para capturar teclas
    process.stdin.setRawMode(true);
    process.stdin.resume();

    // Escuchar eventos de teclas
    process.stdin.on('keypress', (ch, key) => {
      if (key) {
        this.handleInput(key.name, key);  // Pasar el nombre de la tecla y el objeto key
      }
      if (key && key.ctrl && key.name === 'c') {
        process.exit();
      }
    });
  }

  start() {
    console.log("Juego iniciado. Usa las teclas para jugar.");
    this.game.start();
  }

  stop() {
    console.log("Juego detenido.");
    this.game.stop();
    process.stdin.setRawMode(false); // Desactivar el modo "raw" cuando el juego se detiene
  }

  handleInput(keyName, key) {
    switch (keyName) {
      case this.controls.MOVE_TETRINO_LEFT:
      case 'left':
        this.game.moveTetrino(Directions.Left);
        break;

      case this.controls.MOVE_TETRINO_RIGHT:
      case 'right':
        this.game.moveTetrino(Directions.Right);
        break;

      case this.controls.ROTATE_TETRINO:
      case 'up':
        this.game.rotateTetrino();
        break;

      case this.controls.DROP_TETRINO:
      case 'down':
        this.game.dropTetrino();
        break;

      case this.controls.PAUSE:
        if (this.game.isRunning()) {
          this.game.stop();
        } else if (this.game.isOver()) {
          this.game.restart();
        } else {
          this.game.start();
        }
        break;

      default:
        console.log("Comando no reconocido.");
        break;
    }
  }
}
