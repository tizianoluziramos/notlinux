const { question } = require("readline-sync");
const napi = require("./bf-napi/index.js");

const brainfuck = new napi();

globalThis["tbf"] = () => {
  try {
    let result = brainfuck.execute(question("A: "), question("B: "));
    console.log(result);
  } catch (error) {
	console.log(error.message);
  }
};

module.exports = globalThis["tbf"];
