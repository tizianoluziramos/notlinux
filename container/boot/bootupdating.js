const { exec } = require('child_process');

// Comando para abrir Chrome en pantalla completa
const openChromeFullscreen = () => {
  const chromePath = "C:/Program Files/Google/Chrome/Application/chrome.exe"; // Cambia la ruta según tu sistema
  const url = "https://fakeupdate.net/ubuntu/"; // URL que deseas abrir

  // Ejecuta el comando
  exec(`"${chromePath}" --start-fullscreen ${url}`, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error ejecutando el comando: ${err}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
};

// Llama a la función para abrir Chrome
openChromeFullscreen();
