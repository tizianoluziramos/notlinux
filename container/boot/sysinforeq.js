const os = require('os');
const readline = require('readline');

// Función para simular el bootloader
function showBootLoaderInfo() {
  const systemInfo = `
  ========================================
           Dell Bootloader
  ========================================

  [System Information]
  Operating System: Custom Operative System
  CPU: ${os.cpus()[0].model}
  Total RAM: ${(os.totalmem() / (1024 * 1024 * 1024)).toFixed(2)} GB
  Free RAM: ${(os.freemem() / (1024 * 1024 * 1024)).toFixed(2)} GB
  Hostname: ${os.hostname()}
  Architecture: ${os.arch()}
  `;

  // Mostrar la información del sistema
  console.clear();
  console.log(systemInfo);
  console.log(`Press any key to continue.`);
  // Crear la interfaz de readline
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // Configurar el modo raw para no mostrar nada en pantalla
  process.stdin.setRawMode(true);  // Habilitar el modo raw
  process.stdin.resume(); // Empezar a leer

  // Desactivar el prompt ">" y ocultar lo que el usuario escribe
  rl.output.write = () => {};  // Desactivar la salida del prompt

  // Escuchar cualquier tecla presionada
  process.stdin.on('data', () => {
    rl.close();
    // Aquí puedes añadir cualquier acción posterior
  });
}

// Ejecutar la función
showBootLoaderInfo();
