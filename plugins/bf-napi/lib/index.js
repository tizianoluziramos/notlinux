/**
 * @class Memory
 * @type object
 * @property {array} list The array that stores the values of each pointer.
 * @property {number} pointer The pointer of the current value.
 * @property {number} base The base of values (for under/overflow). Defaults to 256.
 * @property {number} current Gets the current value at the pointer
 * @property {string} currentChar Gets the current value at the pointer, as a decoded string.
 */
class Memory {
    /**
     * @description Creates a memory class
     * @param {number} base The base of values (for under/overflow). Defaults to 256.
     */
    constructor(base) {
        this.list = [0];
        this.pointer = 0;
        this.base = base || 256;
    }

    get current() {
        return this.list[this.pointer];
    }

    set current(value) {
        this.list[this.pointer] = value % this.base;
        if (this.current < 0) this.list[this.pointer] += this.base;
        return this.list[this.pointer];
    }

    get currentChar() {
        return String.fromCharCode(this.current);
    }

    /**
     * @description Increments the pointer, creating a new entry if needed.
     * @param {number} index The value to set the new position to. 
     */
    incrementPointer(index) {
        this.pointer += 1;
        if (this.list[this.pointer] == undefined) this.list.push(0);
        if (index) this.current = index % this.base;
        if (this.current < 0) this.current += this.base;
    }

    /**
     * @description Increments the pointer, creating a new entry if needed.
     * @param {number} index The value to set the new position to. 
     */
    decrementPointer(index) {
        this.pointer -= 1;
        if (this.pointer < 0) {
            this.pointer = 0;
            this.list.splice(0, 0, 0);
        }
        if (index) this.current = index % this.base;
    }

    /**
     * @description Increments the current value.
     */
    increment() {
        this.current++;
    }

    /**
     * @description Decrements the current value.
     */
    decrement() {
        this.current--;
    }
}

/** @class Result
 * @type object
 * @property {string} output The main output of the code.
 * @property {Memory} memory The memory stored from execution.
 * @property {number} steps The number of steps it took to execute.
 * @property {number} time The amount of time it took to execute (in ms).
 */
class Result {
    constructor(output, memory, steps, time) {
        this.output = output;
        this.memory = memory;
        this.steps = steps;
        this.time = time;
    }
}

class BrainfuckError extends Error {
    constructor(message, result) {
        super(message);
        this.result = result;
        this.name = 'BrainfuckError';
    }
}

/**
 * The main class
 */
class Brainfuck {
    /**
     * @description Base constructor.
     * @param {object} [options] The optional options to provide.
     * @param {number} [options.maxSteps] The number of steps to execute (defaults to 1000000). Set to -1 to disable.
     */
    constructor(options = {}) {
        this.maxSteps = options.maxSteps || 1000000;
    }

    /**
     * @description The main executing function.
     * @param {string} code The code to execute. 
     * @param {string} [input] The static input the , operator
     *
     * @returns {Result} The result of execution
     */
    execute(code, input = '') {
        const start = Date.now();
        code = code.replace(/[^\+\-\[\].,<>]/gim, '');
        if (code.length == 0) throw new Error('No valid input given');

        let output = '';
        let memory = new Memory(),
            position = new Memory(65536),
            steps = 0;

        input = input.split('').map(c => c.charCodeAt(0) % 256);

        while (position.current < code.length) {
            let char = code.charAt(position.current);
            switch (char) {
                case '>':
                    memory.incrementPointer();
                    break;
                case '<':
                    memory.decrementPointer();
                    break;
                case '+':
                    memory.increment();
                    break;
                case '-':
                    memory.decrement();
                    break;
                case ',':
                    memory.current = input.shift() || 0;
                    break;
                case '.':
                    output += memory.currentChar;
                    break;
                case '[':
                    if (memory.current != 0) {
                        position.incrementPointer(position.current);
                    } else {
                        let cont = true, base = position.pointer, depth = 0;
                        while (cont && position.current < code.length) {
                            position.increment();
                            switch (code.charAt(position.current)) {
                                case '[':
                                    depth++;
                                    break;
                                case ']':
                                    if (depth > 0)
                                        depth--;
                                    else
                                        cont = false;
                                    break;
                            }
                        }
                        if (cont == true) {
                            throw new BrainfuckError(`Unmatched loop at index ${position.list[base]}`, new Result(output, memory, steps, Date.now() - start));
                        }
                    }
                    break;
                case ']':
                    if (position.pointer == 0) {
                        throw new BrainfuckError(`Unmatched loop at index ${position.current}`, new Result(output, memory, steps, Date.now() - start));
                    } else {
                        position.decrementPointer();
                        position.decrement();
                    }
                    break;
                default:
                    throw new BrainfuckError(`Invalid operator '${char}'`, new Result(output, memory, steps, Date.now() - start));
                    break;
            }
            position.increment();
            if (++steps == this.maxSteps) throw new BrainfuckError(`Too many steps (${steps} reached)`, new Result(output, memory, steps, Date.now() - start));
        }
        return new Result(output, memory, steps, Date.now() - start);
    }
}

module.exports = Brainfuck;