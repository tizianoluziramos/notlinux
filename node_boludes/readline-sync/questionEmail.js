const fs = require("fs");

function questionEmail(prompt) {
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

        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(respuesta)) { // Verifica si es un email válido
            return respuesta; // Devuelve el email válido
        }

        console.log("Invalid email format. Please try again.");
    }
}

module.exports = { questionEmail }