const fs = require("fs");

function questionNewPassword(prompt) {
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

        if (respuesta.length >= 8 && /[A-Z]/.test(respuesta) && /[a-z]/.test(respuesta) && /\d/.test(respuesta) && /[!@#$%^&*(),.?":{}|<>]/.test(respuesta)) {
            return respuesta; // Devuelve la contraseña válida
        }

        console.log("Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character. Please try again.");
    }
}

module.exports = questionNewPassword