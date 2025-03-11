function readlineModule(question) {
    return new Promise((resolve) => {
        function ask() {
            process.stdout.write(question);

            process.stdin.once("data", (data) => {
                const respuesta = data.toString().trim();
                const numero = Number(respuesta);
                
                if (!Number.isInteger(numero)) {
                    console.log("Please insert a valid entire number.");
                    ask(); // Vuelve a preguntar si la entrada no es válida
                } else {
                    process.stdin.pause();
                    resolve(Number(numero));
                }
            });
        }
        ask();
    });
}

export async function questionInt(question) {
    return await readlineModule(question);
}

export default questionInt;