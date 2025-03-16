const tetris = require('./tetris/index.js');

globalThis["tetris"] = () => {
    tetris.TetrisModule.start();
}

module.exports = globalThis["tetris"];