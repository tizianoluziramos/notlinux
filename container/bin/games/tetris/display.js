export class Display {
  constructor() {}

  refresh(matrix, level, score, nextTetrino, messages = []) {
    const matrixSizeX = matrix.getSizeX();
    const matrixSizeY = matrix.getSizeY();

    const printMessages = Array.isArray(messages) && messages.length > 0;
    const messagesStartRowIndex =
      Math.floor(matrixSizeY / 2) - Math.floor(messages.length / 2) - 2;
    const messagesEndRowIndex = messagesStartRowIndex + messages.length + 3;

    let print = "";

    matrix.getCells().forEach((row, index) => {
      let rowPrint = `${index + 1 < 10 ? "0" : ""}${index + 1}> `;

      if (
        printMessages &&
        index >= messagesStartRowIndex &&
        index <= messagesEndRowIndex
      ) {
        if (index === messagesStartRowIndex || index === messagesEndRowIndex) {
          rowPrint += new Array(matrixSizeX * 2 + 1).fill("*").join("");
        } else if (
          index === messagesStartRowIndex + 1 ||
          index === messagesEndRowIndex - 1
        ) {
          rowPrint += `*${new Array(matrixSizeX * 2 - 1).fill(" ").join("")}*`;
        } else {
          const message = messages[index - messagesStartRowIndex - 2];
          rowPrint += `*${[]
            .concat(
              new Array(
                Math.floor((matrixSizeX * 2 - message.length - 1) / 2)
              ).fill(" ")
            )
            .concat(message.split(""))
            .concat(
              new Array(
                Math.ceil((matrixSizeX * 2 - message.length - 1) / 2)
              ).fill(" ")
            )
            .join("")}*`;
        }
      } else {
        rowPrint += this.getBoardRow(row);
      }

      rowPrint += "   ";

      switch (index) {
        case 0:
          rowPrint += "Next tetrino:";
          break;

        case 1:
        case 6:
          rowPrint += "=========";
          break;

        case 2:
          rowPrint += this.getNextTetrinoRow(nextTetrino, 0);
          break;

        case 3:
          rowPrint += this.getNextTetrinoRow(nextTetrino, 1);
          break;

        case 4:
          rowPrint += this.getNextTetrinoRow(nextTetrino, 2);
          break;

        case 5:
          rowPrint += this.getNextTetrinoRow(nextTetrino, 3);
          break;

        case 8:
          rowPrint += `Level: ${level}`;
          break;

        case 9:
          rowPrint += `Score: ${parseInt(score, 10)}`;
          break;

        default:
          break;
      }

      print += `${rowPrint}\r\n`;
    });

    console.clear();
    console.log(print);
  }

  getBoardRow(row) {
    return `|${row.reduce(
      (rowPrint, cell) => `${rowPrint}${cell === 0 ? "_" : cell}|`,
      ""
    )}`;
  }

  getNextTetrinoRow(nextTetrino, rowId) {
    const nextTetrinoTypeId = nextTetrino.getTypeId();
    const nextTetrinoRowCoordinates = nextTetrino
      .getCoordinates()
      .filter((coordinate) => coordinate.y === rowId);

    const nextTetrinoRow = new Array(4).fill(0);
    nextTetrinoRowCoordinates.forEach(
      (coordinate) => (nextTetrinoRow[coordinate.x] = nextTetrinoTypeId)
    );

    return this.getBoardRow(nextTetrinoRow);
  }
}