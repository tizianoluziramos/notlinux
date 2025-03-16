const blessed = require("blessed");
const readline = require("readline");

// Crear la interfaz readline para capturar entradas
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});

// Deshabilitar la escritura de texto en la terminal
process.stdin.setRawMode(true);
rl.input.resume();
rl.input.removeAllListeners("keypress");

// Configurar la pantalla de Blessed
const screen = blessed.screen({
  smartCSR: true,
  title: "BIOS Simulator"
});

// Crear una caja para mostrar el texto en la terminal
const box = blessed.box({
  top: "center",
  left: "center",
  width: "60%",
  height: "60%",
  content:
    "Linux Custom BIOS Utility\nPress R to enter to recovery mode\nPress enter to continue\nPress O to view COS information",
  tags: true,
  border: {
    type: "line"
  },
  style: {
    fg: "white",
    bg: "black",
    border: {
      fg: "cyan"
    }
  },
  input: false // Desactiva la capacidad de escribir texto en la caja
});

// Agregar la caja a la pantalla
screen.append(box);

// Escuchar eventos de teclas
process.stdin.on("data", chunk => {
  if (chunk.toString() === "\r") {
    // Si presionas Enter
    process.exit(); // Terminar el proceso
  }

  if (chunk.toString() === "o") {
    const os = require("os");
    const { exec } = require("child_process");
    console.clear();
    // Información del sistema
    function showSystemInfo() {
      console.log("--- Información del Sistema ---\n");

      // Información general
      console.log(`Sistema operativo: ${os.type()} ${os.release()}`);
      console.log(`Plataforma: ${os.platform()}`);
      console.log(`Arquitectura: ${os.arch()}`);
      console.log(`Uptime del sistema: ${os.uptime()} segundos`);

      // Información de la memoria
      console.log(
        `Memoria total: ${(os.totalmem() / (1024 * 1024 * 1024)).toFixed(2)} GB`
      );
      console.log(
        `Memoria libre: ${(os.freemem() / (1024 * 1024 * 1024)).toFixed(2)} GB`
      );

      // Información sobre el CPU
      console.log("\n--- Información del CPU ---");
      console.log(`Número de núcleos: ${os.cpus().length}`);
      os.cpus().forEach((cpu, index) => {
        console.log(`\nCPU #${index + 1}:`);
        console.log(`Modelo: ${cpu.model}`);
        console.log(`Velocidad: ${cpu.speed} MHz`);
        console.log(`Times: ${JSON.stringify(cpu.times)}`);
      });

      // Información del usuario
      console.log("\n--- Información del Usuario ---");
      const userInfo = os.userInfo();
      console.log(`Usuario actual: ${userInfo.username}`);
      console.log(`Nombre completo del usuario: ${userInfo.homedir}`);

      // Información de las interfaces de red
      console.log("\n--- Información de Redes ---");
      const networkInterfaces = os.networkInterfaces();
      for (let interfaceName in networkInterfaces) {
        console.log(`\nInterfaz de red: ${interfaceName}`);
        networkInterfaces[interfaceName].forEach(network => {
          console.log(`Dirección IP: ${network.address}`);
          console.log(`Máscara de red: ${network.netmask}`);
          console.log(`Dirección MAC: ${network.mac}`);
          console.log(`Familia de dirección: ${network.family}`);
          console.log(`Estado: ${network.internal ? "Interno" : "Externo"}`);
        });
      }
    }

    // Ejecutar la función
    showSystemInfo();
  }

  if (chunk.toString() === "r") {
    // Si presionas la tecla 'r'
    require("./recovery.js"); // Ejecuta el archivo recovery.js
  }
});

// Mantener la pantalla abierta
screen.render();
