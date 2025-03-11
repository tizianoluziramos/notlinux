const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
    console.log("Un usuario se ha conectado");

    socket.on("command", (command) => {
        console.log(`Comando recibido: ${command}`);
        let response = executeCommand(command);
        socket.emit("response", response);
    });

    socket.on("disconnect", () => {
        console.log("Un usuario se ha desconectado");
    });
});

function executeCommand(command) {
    switch (command.toLowerCase()) {
        case "hola":
            return "¡Hola! ¿En qué puedo ayudarte?";
        case "fecha":
            return `Fecha actual: ${new Date().toLocaleString()}`;
        case "clear":
            return "clear";
        default:
            return `Comando desconocido: ${command}`;
    }
}

server.listen(3000, () => {
    console.log("Servidor escuchando en http://localhost:3000");
});
