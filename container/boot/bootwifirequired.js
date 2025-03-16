const { execSync } = require("child_process");
const ora = require("ora").default;

function wifiRequestAccess() {
  try {
    const output = execSync("netsh wlan show interfaces", { encoding: "utf8" });
    return (
      output.includes("Estado                 : conectado") || // Para español
      output.includes("State             : connected") // Para inglés
    );
  } catch (error) {
    console.error(error);
    return false;
  }
}

function barraDeCarga() {
  const total = 20; // Total de "bloques" en la barra de carga
  let progreso = 0;

  // Iniciamos el spinner
  const spinner = ora("Loading WiFi Driver...").start();

  const intervalo = setInterval(() => {
    // Incrementamos el progreso con un valor aleatorio entre 0.5 y 4
    const incremento = Math.random() * (4 - 0.5) + 0.5;
    progreso += incremento;

    if (progreso >= total) {
      progreso = total;
    }

    const porcentaje = Math.floor((progreso / total) * 100);
    const barra = `[${"=".repeat(Math.floor(progreso))}${" ".repeat(
      total - Math.floor(progreso)
    )}] ${porcentaje}%`;

    spinner.text = barra;

    if (progreso >= total) {
      clearInterval(intervalo);
      if (wifiRequestAccess()) {
        spinner.succeed("WiFi access enabled successfully. Now you can use WiFi.");
      } else {
        spinner.fail("WiFi driver error. There is a problem, please restart your PC or try again later.");
      }
    }
  }, 400);
}

barraDeCarga();
