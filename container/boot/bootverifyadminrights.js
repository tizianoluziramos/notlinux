const os = require("os");
const { exec } = require("child_process");
const ora = require("ora").default;

function checkAdminPrivileges() {
  return new Promise((resolve, reject) => {
    if (os.platform() === "win32") {
      // Para Windows, ejecutamos un comando de PowerShell para verificar privilegios de administrador
      exec("net session", (error, stdout, stderr) => {
        if (error) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    } else if (os.platform() === "linux" || os.platform() === "darwin") {
      // Para Linux y macOS, comprobamos si el usuario es root (UID 0)
      if (process.geteuid && process.geteuid() === 0) {
        resolve(true);
      } else {
        resolve(false);
      }
    } else {
      resolve(false);
    }
  });
}

function barraDeCarga() {
  const total = 20; // Total de "bloques" en la barra de carga
  let progreso = 0;

  // Iniciamos el spinner
  const spinner = ora("Loading Admin Rights Request...").start();

  const intervalo = setInterval(() => {
    // Incrementamos el progreso con un valor aleatorio entre 0.5 y 4
    const incremento = Math.random() * (4 - 0.5) + 0.5; // Valor aleatorio entre 0.5 y 4
    progreso += incremento;

    if (progreso >= total) {
      progreso = total; // Aseguramos que el progreso no exceda el total
    }

    const porcentaje = Math.floor(progreso / total * 100); // Calculamos el porcentaje de progreso
    const barra = `[${"=".repeat(Math.floor(progreso))}${" ".repeat(
      total - Math.floor(progreso)
    )}] ${porcentaje}%`; // Creamos la barra de carga

    spinner.text = barra; // Actualizamos el texto del spinner con la barra de carga

    if (progreso === total) {
      clearInterval(intervalo);
      checkAdminPrivileges().then((hasAdminRights) => {
        if (hasAdminRights) {
          spinner.succeed('You have admin rights, good. Now you can use Kernel Apps.');
        } else {
          spinner.fail('You dont have admin rights, very sad. You cant use Kernel Apps :(');
        }
      });
    }
  }, 400); // Actualizamos cada 400 ms
}

barraDeCarga();
