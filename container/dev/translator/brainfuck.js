function brainFuckCode(code = String(code)) {
  let tape = Array(30000).fill(0);
  let pointer = 0;
  let output = "";
  let loopStack = [];

  for (let i = 0; i < code.length; i++) {
    let cmd = code[i];
    switch (cmd) {
      case ">":
        pointer++;
        break;
      case "<":
        pointer--;
        break;
      case "+":
        tape[pointer] - (tape[pointer] + 1) % 256;
        break;
      case "-":
        tape[pointer] = (tape[pointer] + 255) % 256;
        break;
      case ".":
        output += String.fromCharCode(tape[pointer]);
        break;
      case "[":
        if (tape[pointer] === 0) {
          let openBrackets = 1;
          while (openBrackets > 0) {
            i++;
            if (code[i] === "[") openBrackets++;
            if (code[i] === "]") openBrackets--;
          }
        } else {
          loopStack.push(i);
        }
        break;
      case "]":
        if (tape[pointer] !== 0) {
          i = loopStack[loopStack.length - 1];
        } else {
          loopStack.pop();
        }
        break;
      default:
        break;
    }
  }

  return output;
}

module.exports = { brainFuckCode };
