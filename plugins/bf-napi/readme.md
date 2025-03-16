# brainfuck-node
A lightweight brainfuck interpreter that actually functions as expected.

## Why?
There are an abundance of brainfuck libraries out there, but none of them worked for me.

## What makes this one different?
This library promises to

1. Be fast. We can execute 1 million steps in less than 200ms.
2. Interpret correctly. Our [ and ] operators function as they're supposed to.
3. Take input statically instead of with stdin. This is useful for programatic usage, rather than in a CLI.
4. Be lightweight. Instead of using a recursive hell with an infinitely large stack depth, we do everything in a simple loop.
5. Have no external dependencies. Bloat is bloat.

## Usage
Usage is simple.
```js
const Brainfuck = require('brainfuck-node');
const brainfuck = new Brainfuck();

let result = brainfuck.execute(',[>,]<[<]>[.>]', 'Hello World');
console.log(result);
```
It's that easy.

## Configuration
The Brainfuck constructor takes an option argument with the following properties:
 - options.maxSteps - The maximum number of steps to execute (defaults to 1000000). Set to -1 to disable.

## License
ISC