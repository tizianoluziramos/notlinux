const repl = require('repl');
const vm = require('vm');
const util = require('util');

// Iniciar una terminal REPL personalizada
const startRepl = () => {
    const nodeRepl = repl.start({
        prompt: '> ',
        eval: (cmd, context, callback) => {
            try {
                const result = vm.runInContext(cmd, context);
                if (result instanceof Promise) {
                    result.then(res => callback(null, res)).catch(err => callback(err));
                } else {
                    callback(null, result);
                }
            } catch (err) {
                callback(err);
            }
        },
        writer: output => {
            if (output === undefined) return ''; // Evitar mostrar 'undefined'
            return util.inspect(output, { colors: true, depth: null });
        }
    });
    
    console.log('Bienvenido a la terminal de Node.js (simulación)');
    console.log('Escribe código JavaScript para ejecutarlo. Presiona Ctrl+C dos veces para salir.');
};

startRepl();