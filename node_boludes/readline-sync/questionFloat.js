const fs = require("fs");

function questionFloat(prompt) {
    while (true) {
        process.stdout.write(prompt); // Muestra el mensaje sin salto de línea

        let respuesta = "";
        const buffer = Buffer.alloc(1024); // Espacio de memoria para la respuesta

        let bytesRead = 0;
        while (true) {
            bytesRead = fs.readSync(0, buffer, 0, buffer.length, null); // Lee de stdin (0 es la entrada estándar)
            respuesta += buffer.toString("utf-8", 0, bytesRead);
            
            if (respuesta.includes("\n")) {
                break;
            }
        }

        respuesta = respuesta.trim(); // Elimina espacios extra

        if (/^[-+]?\d*(\.\d+)?$/.test(respuesta)) { // Verifica si es un número flotante
            return parseFloat(respuesta); // Devuelve la respuesta como número flotante
        }

        console.log("This is not a valid number. Try again.");
    }
}

module.exports = { questionFloat }