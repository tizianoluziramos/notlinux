/*
 **	Copyright 2025 Just You And Me.
 **
 **  Under GNU General Public License :)
 **	This program is free software: you can redistribute it and/or modify
 **	it under the terms of the GNU General Public License as published by
 **	the Free Software Foundation, either version 3 of the License, or
 **	(at your option) any later version.
 **
 **	This program is distributed in the hope that it will be useful,
 **	but WITHOUT ANY WARRANTY; without even the implied warranty of
 **	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 **	GNU General Public License for more details.
 **
 **	You should have received a copy of the GNU General Public License
 **	along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/***********************************************************************************************
 ***                  F A KE T E R M I N A L - F a k e L i nux S t u d i o s                 ***
 ***********************************************************************************************
 *                                                                                             *
 *                 Project Name : The Linux Project                                            *
 *                                                                                             *
 *                     $Archive:: /Sun/_WSProto.h                                              *
 *                                                                                             *
 *                      $Author:: Me                                                           *
 *                                                                                             *
 *                     $Modtime:: 8/06/24 5:31p                                                *
 *                                                                                             *
 *                    $Revision:: 3                                                            *
 *                                                                                             *
 *---------------------------------------------------------------------------------------------*
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

let startTime = Date.now();

// Si quieres ver el codigo, puedes hacerlo, pero no es para que lo uses, es para que lo veas :)
console.clear();
const { brainFuckCode } = require("./container/dev/translator/brainfuck.js");
const {
  getRelativePath,
} = require("./container/dev/commands/getRelativePath.js");
const { showOSLogo } = require("./container/dev/commands/showOSLogo.js");
const xlsx = require("xlsx");
const qrcode = require("qrcode-terminal");
const rls = require("./node_boludes/readline-sync/index.cjs");
const colorfull = require("./node_boludes/chalk/index.js");
const fs = require("fs");
const path = require("path");
const rl = require("readline-sync");
let computerPassword = fs.readFileSync("./profiles.json", "utf-8");
let repositories = fs.readFileSync("./plugins/repositories.json", "utf-8");
require("./container/boot/bootKernel.js");
repositories = JSON.parse(repositories);
computerPassword = JSON.parse(computerPassword);
let currentUser = computerPassword.default.user;
let rootPassword = computerPassword.rootpassword;
const { execSync } = require("child_process");
let userHomeDir = path.join(__dirname, "container", "home", currentUser);
const clothconfigapi = require("./container/var/software/distribution/package/clothconfigapi.cjs");
require("./container/dev/commands/bootmessage.js");
if (!fs.existsSync(userHomeDir)) {
  fs.mkdirSync(userHomeDir, { recursive: true });
}

let currentDir = fs.existsSync(userHomeDir)
  ? userHomeDir
  : path.join(__dirname, "container");

let relativePath = path.relative(path.join(__dirname, "container"), currentDir);

// Si estamos en la raíz de 'container', solo mostrar 'container\'
let displayPath =
  relativePath === ""
    ? "container\\"
    : `container\\${relativePath.replace(/\\/g, "\\\\")}`;

function getPromptFormat(user, path) {
  let commanderFormat = computerPassword.commander || "${user}:${path} > "; // Formato por defecto
  // Seguro que luego lo toqueteo para hacer que el JSON pueda configurarlo, igual no creo pero estaria bien poder customizarlo.
  let relativePath = getRelativePath(path);
  // Convierte la ruta absoluta a relativa

  return commanderFormat
    .replace("${user}", colorfull.color.red(user))
    .replace("${path}", colorfull.color.hex("#00FFFF", relativePath))
    .replace(
      "tryhackme",
      colorfull.color.hex(computerPassword.pcnamecolor, "tryhackme")
    );
}

(function askForPassword(attemps = 0) {
  if (computerPassword.enabled === true) {
    if (attemps === 5) {
      console.log(colorfull.color.blue(`Maximum number of attemps tried.`));
      process.exit(0);
    }
    let requestComputerPassword = rls.question.question(
      colorfull.color.blue(`Please insert computer password: `)
    );

    if (requestComputerPassword !== computerPassword.bootkey) {
      console.log("Wrong password, try again.");
      attemps++;
      askForPassword(attemps);
    }
  }
})();

// Me pregunto porque habran despedido a toda la compania de CloudFlare...
/*
 ** Viva Command And Conquer
 */

function runadbcommands(comando, parametros) {
  try {
    const result = execSync(
      `container\\dev\\adb.exe ${comando} ${parametros.join(" ")}`,
      {
        encoding: "utf-8",
      }
    );
    console.log(result);
  } finally {
    return;
  }
}

function reboot(a = false) {
  console.log(
    "Currently in beta state, for any quality content contact to kaminski data storage FML."
  );
  if (a) {
    console.log("Restarting...");
    process.exit();
  }
  console.log("Access denied");
  localStorage.clear();
  return;
}

console.clear();
showOSLogo();

if (computerPassword.bootloader.devMode === true) {
  void String(
    process.stdout.write(
      `${colorfull.color.green(
        "You are now in developer mode, any command here will be permanently run in root access, dont do some shit \n"
      )}`,
      "utf-8"
    )
  );
  while (true) {
    let command = rls.question.question(
      getPromptFormat(currentUser, currentDir)
    );
    let inputParts = command.trim().split(" ");
    mainCommand = inputParts[0];
    switch (mainCommand) {
      case "clear":
      case "cls":
        console.clear();
        break;
      case "kernel":
        if (
          Boolean(
            computerPassword.bootloader.kernel.allowCallbackRequest_write
          ) === true
        ) {
          process.stdout.write(`Kernel Info: \n`, "utf-8");
          process.stdout.write(
            `${computerPassword.bootloader.kernel.lenguage}\n`,
            "utf-8"
          );
        } else {
          process.stdout.write(
            "Kernel Info is disabled on Developer Mode Config \n",
            "utf-8"
          );
          break;
        }
        break;
      case "":
        break;
      default:
        process.stdout.write(
          `Command ${command} is not recognized as an internal or external command,program, or executable batch file.`,
          "utf-8"
        );
        break;
    }
  }
}

while (true) {
  let command = rls.question.question(getPromptFormat(currentUser, currentDir));
  let inputParts = command.trim().split(" ");
  mainCommand = inputParts[0];
  let args = inputParts.slice(1).join(" ");
  function obtenerPorcentajeBateria() {
    si.battery()
      .then((data) => {
        console.log(`El porcentaje de batería actual es: ${data.percent}%`);
      })
      .catch((error) => {
        console.error("Error al obtener el estado de la batería:", error);
      });
  }
  switch (mainCommand) {
    case "power":
      if (!inputParts[1]) {
        console.log("Usage: power <on/off> <reload>");
      }
      switch (inputParts[1]) {
        case "on":
          if (computerPassword.battery === true) {
            console.log("Battery is already power on.");
          } else {
            computerPassword.battery = true;
          }
          break;
        case "off":
          if (computerPassword.battery === false) {
            console.log("Battery is already power off.");
          } else {
            computerPassword.battery = false;
          }
          break;
        case "reload":
          console.log("Reloading battery status...");
          function reloadBatteryStatus() {
            console.log("Battery status reloaded.");
          }
          reloadBatteryStatus();
          break;
        case "info":
          obtenerPorcentajeBateria();
          break;
        default:
          console.log("Invalid option. Use 'on', 'off', or 'reload'.");
          break;
      }
      break;
    case "translate":
      switch (inputParts[1]) {
        case "brainfuck":
          console.log(brainFuckCode(inputParts[2]));
          break;
        default:
          break;
      }
      break;
    case "boot":
      switch (inputParts[1]) {
        case "info":
          break;
        default:
          console.log(`Boot Loader V${computerPassword.bootloader.version}`);
          break;
      }
      break;
    case "reboot":
      if (currentUser === "default") {
        break;
      }
      if (
        currentUser === "root" ||
        (computerPassword.users[currentUser] &&
          computerPassword.users[currentUser].rootAccess)
      ) {
        reboot();
      }
      break;
    case "exel":
      if (inputParts[1] === "read") {
        function leerExcel(archivo) {
          const workbook = xlsx.readFile(archivo);
          const hoja = workbook.Sheets[workbook.SheetNames[0]];
          const datos = xlsx.utils.sheet_to_json(hoja, { header: 1 });

          if (datos.length === 0) {
            console.log("The file is empty or doesn't have data.");
            return;
          }

          // Importante: calcular el ancho maximo de cada columna :D
          let anchos = new Array(datos[0].length).fill(0);
          datos.forEach((fila) => {
            fila.forEach((celda, i) => {
              let largo = String(celda || "").length;
              anchos[i] = Math.max(anchos[i], largo);
            });
          });

          // Función para formatear una fila
          // Le da formato a las filas
          function formatearFila(fila) {
            return fila
              .map((celda, i) => String(celda || "").padEnd(anchos[i]))
              .join(" | ");
          }

          // Mostrar tabla
          console.log(
            "-".repeat(anchos.reduce((a, b) => a + b, 0) + anchos.length * 3)
          );
          datos.forEach((fila) => console.log(formatearFila(fila)));
          console.log(
            "-".repeat(anchos.reduce((a, b) => a + b, 0) + anchos.length * 3)
          );
        }
        leerExcel(inputParts[2]);
        break;
      }
      break;
    case "qr":
      function generateQR(text) {
        qrcode.generate(text, { small: true }, function (qr) {
          console.log(qr);
        });
      }

      const input = args;
      generateQR(input);
      break;
    case "pwd":
      console.log(getRelativePath(currentDir));
      break;
    case "uptime":
      function uptime() {
        let elapsedTime = Date.now() - startTime; // Tiempo transcurrido en milisegundos

        let hours = Math.floor(elapsedTime / 3600000); // Convierte milisegundos a horas
        let minutes = Math.floor((elapsedTime % 3600000) / 60000); // Convierte milisegundos a minutos
        let seconds = Math.floor((elapsedTime % 60000) / 1000); // Convierte milisegundos a segundos

        switch (true) {
          case hours > 0:
            console.log(
              `Uptime: ${hours} hours, ${minutes} minutes and ${seconds} seconds.`
            );
            break;
          case minutes > 0:
            console.log(`Uptime: ${minutes} minutes and ${seconds} seconds.`);
            break;
          case seconds > 0:
            console.log(`Uptime: ${seconds} seconds.`);
            break;
          default:
            console.log("There is no uptime.");
        }
      }

      // Llamada periódica a la función para verificar el tiempo transcurrido (puedes invocar esto en cualquier parte)
      function checkUptime() {
        uptime(); // Verifica el tiempo de actividad
      }
      checkUptime();
      break;
    case "ping":
      if (!args[0]) {
        console.log("Usage: ping <ip address>");
        break;
      } else {
        try {
          const ipconfig = execSync(`ping ${args}`, {
            encoding: "utf8",
          }).trim();
          console.log(ipconfig);
        } catch (error) {
          console.log(error.message);
        }
      }
      break;
    case "ip":
    case "ipconfig":
      try {
        const ipconfig = execSync("ipconfig", { encoding: "utf8" }).trim();
        console.log(ipconfig);
      } catch (error) {
        console.log(error.message);
      }
      break;
    case "weather":
      function getWeather(latitude, longitude) {
        // Open-Meteo API URL to get the weather
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;

        try {
          const response = execSync(`curl -s "${url}"`);

          const data = JSON.parse(response.toString());

          if (data && data.current) {
            // Extract current weather information
            const temperature = data.current.temperature_2m;
            const windSpeed = data.current.wind_speed_10m;
            const time = data.current.time;

            console.log(`Current weather (${time}):`);
            console.log(`Temperature: ${temperature}°C`);
            console.log(`Wind speed: ${windSpeed} m/s`);
          } else {
            console.log("Could not retrieve current weather.");
          }

          if (data && data.hourly) {
            // Display a small preview of temperature and humidity for the next few hours
            console.log(`Forecast for the next hours:`);
            for (let i = 0; i < 5; i++) {
              // Show the first 5 hours
              const time = data.hourly.time[i];
              const temp = data.hourly.temperature_2m[i];
              const humidity = data.hourly.relative_humidity_2m[i];
              console.log(`${time}: ${temp}°C, Humidity: ${humidity}%`);
            }
          }
        } catch (error) {
          console.log("Error fetching weather data:", error);
        }
      }

      function getLocationAndWeather() {
        try {
          // Query the ipinfo.io API to get location based on IP
          const response = execSync("curl -s https://ipinfo.io/json");

          // Convert JSON response to a JavaScript object
          const data = JSON.parse(response.toString());

          // Get coordinates (latitude, longitude)
          const [latitude, longitude] = data.loc.split(",");

          console.log(`Automatically detected location:`);
          console.log(`Latitude: ${latitude}`);
          console.log(`Longitude: ${longitude}`);

          // Call the weather function with the obtained coordinates
          getWeather(latitude, longitude);
        } catch (error) {
          console.log("Error retrieving location:", error);
        }
      }

      // Run the function to get location and weather
      getLocationAndWeather();
      break;
    case "donut":
      let A = 0,
        B = 0,
        M = Math;
      const a = () => {
        let s = [],
          t = [];
        (A += 0.05), (B += 0.07);
        const o = M.cos(A),
          e = M.sin(A),
          n = M.cos(B),
          c = M.sin(B);
        for (let o = 0; o < 1760; o++)
          (s[o] = o % 80 == 79 ? "\n" : " "), (t[o] = 0);
        for (let i = 0; i < 6.28; i += 0.07) {
          const r = M.cos(i),
            a = M.sin(i);
          for (let i = 0; i < 6.28; i += 0.02) {
            const l = M.sin(i),
              f = M.cos(i),
              A = r + 2,
              B = 1 / (l * A * e + a * o + 5),
              d = l * A * o - a * e,
              m = (40 + 30 * B * (f * A * n - d * c)) | 0,
              v = (12 + 15 * B * (f * A * c + d * n)) | 0,
              I = m + 80 * v,
              h =
                (8 *
                  ((a * e - l * r * o) * n - l * r * e - a * o - f * r * c)) |
                0;
            v < 22 &&
              v >= 0 &&
              m >= 0 &&
              m < 79 &&
              B > t[I] &&
              ((t[I] = B), (s[I] = ".,-~:;=!*#$@"[h > 0 ? h : 0]));
          }
        }
        process.stdout.write(`\x1b[J\x1b[H` + s.join(""));
      };
      let lastTime = Date.now();
      const delay = 50; // Delay en milisegundos (por ejemplo, 1 segundo)
      let counter = 0;
      while (counter <= 300) {
        let currentTime = Date.now();
        if (currentTime - lastTime >= delay) {
          a(); // Ejecuta la función
          lastTime = currentTime; // Actualiza el tiempo
          counter++;
        }
      }
      break;
    case "clothconfigapi":
      console.log(clothconfigapi);
      break;
    case "fibonacci":
      let fibo = args.trim();
      if (!fibo) {
        break;
      }
      function fibonacci(n) {
        if (n <= 0) return ""; // Si n es 0 o menor, devuelve una cadena vacía
        if (n === 1) return "0"; // Si n es 1, devuelve solo "0"

        let result = [0, 1]; // Inicializamos el arreglo con los dos primeros números

        for (let i = 2; i < n; i++) {
          let next = result[i - 1] + result[i - 2];
          result.push(next);
        }

        return result.join(", "); // Unimos los números con comas y los devolvemos como una cadena
      }

      // Ejemplo de uso
      let fibonacciString = fibonacci(fibo); // Devuelve los primeros 100 números de Fibonacci como una cadena
      console.log(fibonacciString);
      break;
    case "eval":
      if (!args) {
        console.log("Usage: eval command1 command2 etc.");
      } else if (args) {
        try {
          eval(args);
        } catch (error) {
          console.log("Invalid error has been occured.");
        }
      }
      break;
    case "oslogo":
      showOSLogo();
      break;
    case "find":
      let searchPattern = args.trim();
      if (!searchPattern) {
        searchPattern = rls.question.question("Enter search pattern: ");
      }

      // Función recursiva para buscar archivos en directorios y subdirectorios
      function searchFilesInDir(directory) {
        let filesInDir = fs.readdirSync(directory);
        let matchingFiles = [];

        filesInDir.forEach((file) => {
          let filePath = path.join(directory, file);
          if (fs.statSync(filePath).isDirectory()) {
            // Si es un directorio, buscamos recursivamente
            matchingFiles = matchingFiles.concat(searchFilesInDir(filePath));
          } else if (file.includes(searchPattern)) {
            // Si es un archivo y coincide con el patrón, lo añadimos a la lista
            // Mostrar la ruta relativa en lugar de la absoluta
            let relativePath = path.relative(currentDir, filePath);
            matchingFiles.push(relativePath);
          }
        });

        return matchingFiles;
      }

      // Llamamos a la función recursiva desde el directorio actual
      let matchingFiles = searchFilesInDir(currentDir);

      if (matchingFiles.length > 0) {
        console.log("Found the following files:");
        matchingFiles.forEach((file) => console.log(file));
      } else {
        console.log(`No files found matching the pattern "${searchPattern}".`);
      }
      break;
    case "copy":
    case "cp":
      let [sourceFile, destDir] = args.split(" ").map((arg) => arg.trim());

      if (!sourceFile || !destDir) {
        console.log("Usage: cp <sourceFile> <destinationDirectory>");
        break;
      }

      let sourceFilePath = path.join(currentDir, sourceFile);
      let destDirPath = path.join(currentDir, destDir);

      if (fs.existsSync(sourceFilePath) && fs.existsSync(destDirPath)) {
        let destFilePath = path.join(destDirPath, sourceFile);
        fs.copyFileSync(sourceFilePath, destFilePath);
        console.log(`File "${sourceFile}" copied to "${destDir}".`);
      } else {
        console.log(
          "Either the source file or destination directory does not exist."
        );
      }
      break;
    case "rename":
      let argsArray = args.split(" ").map((arg) => arg.trim());

      // Verificar que se han proporcionado ambos argumentos
      if (argsArray.length < 2) {
        console.log("Usage: rename <oldFileName> <newFileName>");
        break;
      }

      let oldFileName = argsArray[0];
      let newFileName = argsArray[1];

      let oldFilePath = path.join(currentDir, oldFileName);
      let newFilePath = path.join(currentDir, newFileName);

      if (fs.existsSync(oldFilePath)) {
        fs.renameSync(oldFilePath, newFilePath);
        console.log(
          `File "${oldFileName}" has been renamed to "${newFileName}".`
        );
      } else {
        console.log(`File "${oldFileName}" does not exist.`);
      }
      break;
    case "move":
    case "mv":
      let argsArrays = args.split(" ").map((arg) => arg.trim());

      // Verificar que se han proporcionado ambos argumentos
      if (argsArrays.length < 2) {
        console.log("Usage: mv <source> <destination>");
        break;
      }

      let sourceFiles = argsArrays[0];
      let destinationPath = argsArrays[1];

      let sourceFilePaths = path.join(currentDir, sourceFiles);
      let destinationFilePath = path.join(currentDir, destinationPath);

      // Verificar si el archivo fuente existe
      if (fs.existsSync(sourceFilePaths)) {
        // Verificar si el destino es un directorio
        if (
          fs.existsSync(destinationFilePath) &&
          fs.statSync(destinationFilePath).isDirectory()
        ) {
          // Si el destino es un directorio, mover el archivo dentro de él
          let destinationFile = path.join(destinationFilePath, sourceFiles);
          fs.renameSync(sourceFilePaths, destinationFile);

          // Mostrar la ruta relativa desde el directorio actual (container)
          let relativeDestination = path.relative(currentDir, destinationFile);
          console.log(`Moved "${sourceFiles}" to "${relativeDestination}"`);
        } else {
          // Si el destino no es un directorio, mover el archivo al nuevo nombre o ubicación
          fs.renameSync(sourceFilePaths, destinationFilePath);

          // Mostrar la ruta relativa desde el directorio actual (container)
          let relativeDestination = path.relative(
            currentDir,
            destinationFilePath
          );
          console.log(`Moved "${sourceFiles}" to "${relativeDestination}"`);
        }
      } else {
        console.log(`File "${sourceFile}" does not exist.`);
      }
      break;
    case "nano":
      let fileToEdit = args.trim();

      // Si no se proporciona un archivo, preguntar interactivamente
      if (!fileToEdit) {
        fileToEdit = rls.question("Enter the file name to edit: ");
      }

      let filePathToEdit = path.join(currentDir, fileToEdit);

      // Verificar si el archivo existe, si no, crear uno vacío
      if (!fs.existsSync(filePathToEdit)) {
        console.log(
          `File "${fileToEdit}" does not exist. Creating new file...`
        );
        fs.writeFileSync(filePathToEdit, "", "utf-8");
      }

      // Leer el archivo y mostrar su contenido actual
      let fileContent = fs.readFileSync(filePathToEdit, "utf-8");
      console.log("\n--- Editing file ---\n");
      console.log(fileContent);
      console.log("\n--- End of file ---\n");

      // Preguntar al usuario si quiere editar el archivo
      let editConfirm = rls.question
        .question("Do you want to edit this file? (y/n): ")
        .toLowerCase();

      if (editConfirm === "y") {
        let newContent = fileContent.split("\n");
        console.log("\nEnter the new content. Type 'exit' to save and exit.");

        // Permitir al usuario escribir líneas de texto
        while (true) {
          let line = rls.question.question("> ");
          if (line === "exit") {
            break;
          }
          newContent.push(line);
        }

        // Escribir el nuevo contenido en el archivo
        fs.writeFileSync(filePathToEdit, newContent.join("\n"), "utf-8");
        console.log(`File "${fileToEdit}" has been updated successfully.`);
      }
      break;
    case "cat":
    case "type":
      let fileToType = args.trim();

      // Si no se proporciona un archivo, preguntar interactivamente
      if (!fileToType) {
        fileToType = rls.question.question("Enter the file name to view: ");
      }

      let filePathToType = path.join(currentDir, fileToType);

      // Verificar si el archivo existe
      if (fs.existsSync(filePathToType)) {
        // Leer y mostrar el contenido del archivo
        let fileContent = fs.readFileSync(filePathToType, "utf-8");
        console.log(fileContent);
      } else {
        console.log(`File "${fileToType}" does not exist.`);
      }
      break;
    case "touch":
      let fileName = args.trim();

      // Si no se especifica el nombre del archivo, pedirlo al usuario
      if (!fileName) {
        fileName = rls.question.question("Enter the file name to create: ");
      }

      let filePath = path.join(currentDir, fileName);

      // Verificar si el archivo ya existe
      if (fs.existsSync(filePath)) {
        console.log(`The file "${fileName}" already exists.`);
      } else {
        // Crear el archivo vacío
        fs.writeFileSync(filePath, "", "utf8");
        console.log(`File "${fileName}" created successfully.`);
      }
      break;
    case "echo":
      if (args.startsWith("-p")) {
        let variableDefinition = args.slice(3).trim();
        let [variableName, ...variableValue] = variableDefinition.split(" ");
        let value = variableValue.join(" ");
        globalThis[variableName] = value;
        console.log(`Variable '${variableName}' set to: ${value}`);
      } else {
        if (args.startsWith("$")) {
          let variableName = args.slice(1).trim();
          if (variableName in globalThis) {
            console.log(globalThis[variableName]);
          } else {
            console.log(`Variable '${variableName}' is not defined.`);
          }
        } else {
          console.log(args);
        }
      }
      break;
    case "time":
    case "date":
      console.log(new Date().toLocaleString());
      break;
    case "pause":
      let pauseMessage = inputParts[1] || "Press any key to continue...";
      let pauseTimes = inputParts[2] || 1;
      for (var i = 0; i < pauseTimes; i++) {
        option = rl.keyInYN(pauseMessage, {
          limit: "sn",
        });
      }
      break;
    case "del":
    case "rm":
      let rmmeme = args.split(" ").map((arg) => arg.trim());
      let fileToRemove = args.trim();
      if (
        rmmeme[0] === "--no-preserve-root" &&
        rmmeme[1] === "-rf" &&
        rmmeme[2] === "/"
      ) {
        console.log(
          colorfull.color.red(
            "You think im dumb, OF COURSE NO, you cant do that men. Only with sudo :)"
          )
        );
        break;
      } else if (rmmeme[0] === "-rf" && rmmeme[1] === "/" && !rmmeme[2]) {
        console.log("rm: it is dangerous to operate recursively on '/'");
        console.log("rm: use --no-preserve-root to override this failsafe");
        break;
      }
      if (!fileToRemove)
        fileToRemove = rls.question.question("Enter the file to remove: ");

      let filePathToRemove = path.join(currentDir, fileToRemove);

      try {
        fs.unlinkSync(filePathToRemove); // Eliminar el archivo
        console.log(`File "${fileToRemove}" removed successfully.`);
      } catch (err) {
        console.log("No such file or directory.");
      }
      break;
    case "rmdir":
      let dirToRemove = args.trim(); // Intentar obtener el directorio desde args

      // Si no se proporcionó un directorio, preguntar interactivamente
      if (!dirToRemove)
        dirToRemove = rls.question.question("Enter the directory to remove: ");

      let dirPathToRemove = path.join(currentDir, dirToRemove);

      try {
        const stats = fs.statSync(dirPathToRemove);
        if (stats.isDirectory()) {
          fs.rmdirSync(dirPathToRemove); // Eliminar el directorio vacío
          console.log(`Directory "${dirToRemove}" removed successfully.`);
        } else {
          console.log("This is not a directory.");
        }
      } catch (err) {
        console.log("No such file or directory.");
      }
      break;
    case "process":
      let pswdTimedOut = args.trim(); // Intentar obtener el directorio desde args
      if (pswdTimedOut === "req") {
        askForPassword();
      }
      break;
    case "passwd":
      let [targetUser, option, newPassword] = args.split(" ");

      if (!targetUser || !newPassword) {
        console.log("Usage: passwd <username> -p <newpassword>");
        break;
      }

      if (targetUser === "default") {
        console.log("You cant change the user password");
      }

      // Verificar si el usuario actual tiene acceso root
      if (
        currentUser === "root" ||
        (computerPassword.users[currentUser] &&
          computerPassword.users[currentUser].rootAccess)
      ) {
        // Cambiar la contraseña de cualquier usuario
        if (targetUser === "root" || computerPassword.users[targetUser]) {
          let confirmPassword = rls.question.question("Confirm new password: ");

          if (newPassword === confirmPassword) {
            if (targetUser === "root") {
              computerPassword.rootpassword = newPassword;
            } else {
              computerPassword.users[targetUser].password = newPassword;
            }

            fs.writeFileSync(
              "./profiles.json",
              JSON.stringify(computerPassword, null, 2)
            );
            computerPassword = JSON.parse(
              fs.readFileSync("./profiles.json", "utf-8")
            );
            console.log(`${targetUser} password changed successfully.`);
          } else {
            console.log("Passwords do not match. Try again.");
          }
        } else {
          console.log("User not found.");
        }
      } else {
        // Solo puede cambiar su propia contraseña si no tiene acceso root
        if (targetUser === currentUser) {
          let confirmPassword = rls.question.question("Confirm new password: ");

          if (newPassword === confirmPassword) {
            computerPassword.users[currentUser].password = newPassword;
            fs.writeFileSync(
              "./profiles.json",
              JSON.stringify(computerPassword, null, 2)
            );
            computerPassword = JSON.parse(
              fs.readFileSync("./profiles.json", "utf-8")
            );
            console.log(`${currentUser} password changed successfully.`);
          } else {
            console.log("Passwords do not match. Try again.");
          }
        } else {
          console.log(
            "You do not have permission to change another user's password."
          );
        }
      }
      break;
    case "cd":
      let newDir = args;

      // Si no hay argumento, preguntamos
      if (!newDir) {
        newDir = rls.question.question("Enter directory to navigate to: ");
      }
      if (
        newDir === "boot" &&
        currentDir === path.join(__dirname, "container")
      ) {
        console.log("Access denied.");
        break;
      }
      let newDirPaths = path.join(currentDir, newDir);

      // Verificar si se está intentando salir del directorio 'container'
      if (currentDir === path.join(__dirname, "container") && newDir === "..") {
      } else {
        try {
          const stats = fs.statSync(newDirPaths);
          if (stats.isDirectory()) {
            currentDir = newDirPaths; // Actualiza la ruta actual
            // Recalcular displayPath con la nueva ruta
            relativePath = path.relative(
              path.join(__dirname, "container"),
              currentDir
            );
            displayPath =
              relativePath === ""
                ? "container\\"
                : `container\\${relativePath.replace(/\\/g, "\\\\")}`;
          } else {
            console.log("This is not a valid directory.");
          }
        } catch (err) {
          console.log("Directory not found.");
        }
      }
      break;
    case "mkdir":
      let newDirName = args; // Tomamos el argumento después de "mkdir"

      // Si no hay argumento, preguntamos
      if (!newDirName) {
        newDirName = rls.question.question(
          "Enter the name of the new directory: "
        );
      }

      let newDirPath = path.join(currentDir, newDirName);

      fs.mkdir(newDirPath, { recursive: true }, (err) => {
        if (err) {
          console.log("Error creating directory:", err.message);
        } else {
          console.log(`Directory "${newDirName}" created successfully!`);
        }
      });
      break;
    case "dir":
    case "ls":
      if (args.trim() === "/s") {
        // Función recursiva para listar archivos en directorios y subdirectorios
        const listFilesRecursive = (dirPath) => {
          const files = fs.readdirSync(dirPath, { withFileTypes: true });

          files.forEach((file) => {
            const fullPath = path.join(dirPath, file.name);
            const relativePath = path.relative(containerDir, fullPath); // Cambiar a ruta relativa desde containerDir

            if (file.isDirectory()) {
              console.log(`Directory: ${relativePath}`);
              listFilesRecursive(fullPath); // Recursión en subdirectorios
            } else {
              console.log(`File: ${relativePath}`);
            }
          });
        };

        const currentdir = process.cwd(); // Esto obtiene el directorio actual de trabajo
        const containerDir = path.join(currentdir, "container"); // Combina el directorio actual con 'container'
        listFilesRecursive(containerDir);
        break;
      }
      try {
        const files = fs.readdirSync(currentDir);
        if (files.length === 0) {
          console.log("No hay archivos o carpetas.");
        } else {
          // Mostrar archivos y carpetas
          files.forEach((file) => {
            let filePath = path.join(currentDir, file);
            let stats = fs.statSync(filePath); // Usamos fs.statSync para obtener información sobre el archivo
            if (stats.isDirectory()) {
              console.log(`[DIR] ${file}`);
            } else {
              console.log(file);
            }
          });
        }
      } catch (err) {
        console.log("Error reading the file:", err.message);
      }
      break;
    case "clear":
    case "cls":
      console.clear();
      break;
    // Agregar dentro del switch para nano
    case "sudo":
      const subCommand = args.split(" ")[0]; // Obtener el primer subcomando (después de sudo)
      const subcommander = args.split(" ")[1];

      switch (subCommand) {
        case "reboot":
          if (subcommander === "--no-force") {
            reboot();
          }
          if (
            currentUser === "root" ||
            (computerPassword.users[currentUser] &&
              computerPassword.users[currentUser].rootAccess)
          ) {
            reboot();
          }
          break;
        case "adb":
          if (currentUser === "default") {
            console.log("Use another account or root, access denied.");
          } else if (currentUser === "root") {
            // We need to know why each
            // Fuck Nintendo, they declined the NTCAR
            // (Nintendo Tetris Copyright Access Request)
            if (subcommander) {
              let command = args.split(" ")[1]; // Cloudflare reference.
              let parameter = args.split(" ").slice(2);

              // Yeah, adb shell, why not?
              runadbcommands(command, parameter);
            } else {
              console.log("Usage: adb <command> <parameters>");
            }
            break;
          } else {
            // Sorry, shitty UAC is still enabled :)
            // I need an answer for each people who got fired.
            // Edit: Everyone got fucked up becouse Electronic Arts disable copyright system.
            console.log("Use another account or root, access denied.");
          }
        case "rm":
          let rmmeme = args.split(" ").map((arg) => arg.trim());
          if (
            rmmeme[1] === "--no-preserve-root" &&
            rmmeme[2] === "-rf" &&
            rmmeme[3] === "/"
          ) {
            console.log("We're no strangers to love");
            console.log("You know the rules and so do I");
            console.log("A full commitment's what I'm thinkin' of");
            console.log("You wouldn't get this from any other guy");
            console.log("I just wanna tell you how I'm feeling");
            console.log("Gotta make you understand");
            console.log("Never gonna give you up");
            console.log("Never gonna let you down");
            console.log("Never gonna run around and desert you");
            console.log("Never gonna make you cry");
            console.log("Never gonna say goodbye");
            console.log("Never gonna tell a lie and hurt you");
            console.log("We've known each other for so long");
            console.log(
              "Your heart's been aching, but you're too shy to say it"
            );
            console.log("Inside, we both know what's been going on");
            console.log("We know the game and we're gonna play it");
            console.log("And if you ask me how I'm feeling");
            console.log("Don't tell me you're too blind to see");
            console.log("Never gonna give you up");
            console.log("Never gonna let you down");
            console.log("Never gonna run around and desert you");
            console.log("Never gonna make you cry");
            console.log("Never gonna say goodbye");
            console.log("Never gonna tell a lie and hurt you");
            console.log("Never gonna give you up");
            console.log("Never gonna let you down");
            console.log("Never gonna run around and desert you");
            console.log("Never gonna make you cry");
            console.log("Never gonna say goodbye");
            console.log("Never gonna tell a lie and hurt you");
            console.log("We've known each other for so long");
            console.log(
              "Your heart's been aching, but you're too shy to say it"
            );
            console.log("Inside, we both know what's been going on");
            console.log("We know the game and we're gonna play it");
            console.log("I just wanna tell you how I'm feeling");
            console.log("Gotta make you understand");
            console.log("Never gonna give you up");
            console.log("Never gonna let you down");
            console.log("Never gonna run around and desert you");
            console.log("Never gonna make you cry");
            console.log("Never gonna say goodbye");
            console.log("Never gonna tell a lie and hurt you");
            console.log("Never gonna give you up");
            console.log("Never gonna let you down");
            console.log("Never gonna run around and desert you");
            console.log("Never gonna make you cry");
            console.log("Never gonna say goodbye");
            console.log("Never gonna tell a lie and hurt you");
            console.log("Never gonna give you up");
            console.log("Never gonna let you down");
            console.log("Never gonna run around and desert you");
            console.log("Never gonna make you cry");
            console.log("Never gonna say goodbye");
            console.log("Never gonna tell a lie and hurt you");
          }
          break;
        case "-v":
          console.log("v1.0.0");
          break;

        case "su":
          if (computerPassword.default.rootAccess === true || !rootPassword) {
            currentUser = "root";
            if (!rootPassword) {
              console.log(
                "Root user has no password, please change it later or NOW!"
              );
            }
            console.log(colorfull.color.red("You are now on root!"));
          } else if (currentUser === "root") {
            console.log("You are already in root!");
          } else {
            let suPassword = rls.question.question("Insert root password: ");
            if (suPassword === rootPassword) {
              currentUser = "root";
              console.log(colorfull.color.red("You are now on root!"));
            } else {
              console.log("Wrong root password.");
            }
          }
          break;
        default:
          console.log("Running on sudo v1.0.0");
          break;
      }
      break;
    case "whoami":
      if (currentUser === "root") {
        console.log(
          `${colorfull.color.green("Current user: ")}${colorfull.color.red(
            currentUser
          )}`
        );
      } else if (currentUser === "default") {
        console.log(
          `${colorfull.color.green("Current user: ")}${colorfull.color.cyan(
            currentUser
          )}`
        );
      } else {
        console.log(
          `${colorfull.color.green("Current user: ")}${colorfull.color.yellow(
            currentUser
          )}`
        );
      }
      break;
    case "su":
      let sucommand = rls.question.question("Insert root password: ");
      if (currentUser === "root") {
        console.log("You are already in root!");
      } else if (sucommand === rootPassword) {
        console.log(
          colorfull.color.red("You must run with sudo command, access denied.")
        );
      } else {
        console.log("Wrong root password. ");
      }
      break;
    case "exit":
    case "logout":
      if (currentUser === "root") {
        currentUser = computerPassword.default.user;
        console.log(colorfull.color.green("You have exited root mode."));
      } else {
        console.log(
          colorfull.color.red(`
          ░██████╗░░█████╗░░█████╗░██████╗░██████╗░██╗░░░██╗███████╗
          ██╔════╝░██╔══██╗██╔══██╗██╔══██╗██╔══██╗╚██╗░██╔╝██╔════╝
          ██║░░██╗░██║░░██║██║░░██║██║░░██║██████╦╝░╚████╔╝░█████╗░░
          ██║░░╚██╗██║░░██║██║░░██║██║░░██║██╔══██╗░░╚██╔╝░░██╔══╝░░
          ╚██████╔╝╚█████╔╝╚█████╔╝██████╔╝██████╦╝░░░██║░░░███████╗
          ░╚═════╝░░╚════╝░░╚════╝░╚═════╝░╚═════╝░░░░╚═╝░░░╚══════╝
          `)
        );
        process.exit(0);
      }
      break;
    case "net":
      let subparameter = args.split(" ");
      if (subparameter.length <= 0) {
        console.log(colorfull.color.red("Usage:") + " net subcommand");
        break;
      }
      if (subparameter.length > 2 && subparameter[0] === "user") {
        // Guardar los cambios en profiles.json
        fs.writeFileSync(
          "./profiles.json",
          JSON.stringify(computerPassword, null, 2)
        );
      }
      if (
        (subparameter[0] === "user" && subparameter[1] === "/remove") ||
        (subparameter[0] === "user" && subparameter[1] === "/delete")
      ) {
        let removeUser = subparameter[2]; // Intentar obtener el usuario desde args

        // Si no se proporcionó un usuario, preguntar interactivamente
        if (!removeUser)
          removeUser = rls.question.question("Enter username to remove: ");

        // Verificar si el usuario existe en "users"
        if (!computerPassword.users[removeUser]) {
          console.log("User not found.");
          break;
        }

        // Verificar si el usuario es "default" o "root"
        if (removeUser === "default") {
          console.log(
            `The user "${removeUser}" is a system user and cannot be removed.`
          );
          break;
        }

        // Si el usuario actual tiene permisos de root, o es root
        if (
          currentUser === "root" ||
          (computerPassword.users[currentUser] &&
            computerPassword.users[currentUser].rootAccess)
        ) {
          delete computerPassword.users[removeUser];
          fs.writeFileSync(
            "./profiles.json",
            JSON.stringify(computerPassword, null, 2)
          );
          computerPassword = JSON.parse(
            fs.readFileSync("./profiles.json", "utf-8")
          );
          console.log(`User "${removeUser}" removed successfully.`);
        } else {
          let userPassword = rls.question.question("Enter user password: ");
          if (userPassword === computerPassword.users[removeUser].password) {
            delete computerPassword.users[removeUser];
            fs.writeFileSync(
              "./profiles.json",
              JSON.stringify(computerPassword, null, 2)
            );
            computerPassword = JSON.parse(
              fs.readFileSync("./profiles.json", "utf-8")
            );
            console.log(`User "${removeUser}" removed successfully.`);
          } else {
            console.log("Incorrect password. Cannot remove user.");
          }
        }
        break;
      }
      if (subparameter[0] === "user" && subparameter[1] === "/change") {
        let newUser = subparameter[2]; // Intentar obtener el usuario desde args

        // Si no se proporcionó un usuario, preguntar interactivamente
        if (!newUser) {
          newUser = rls.question.question(
            "Enter the username to switch to (root/default or a custom user): "
          );
        }

        if (newUser === currentUser) {
          console.log(colorfull.color.red(`You are already ${currentUser}`));
          break;
        }

        if (newUser === "root" || newUser === "default") {
          if (newUser === "default") {
            currentUser = newUser;
            console.log(`Switched to ${currentUser}`);
            break;
          } else if (newUser === "root") {
            if (!computerPassword.default.rootAccess) {
              let rootPasswordRequest = rls.question.question(
                "Enter root password: "
              );
              if (rootPasswordRequest === rootPassword) {
                currentUser = newUser;
                console.log(`Switched to ${currentUser}`);
              } else {
                console.log("Incorrect root password.");
              }
            }
          }
          break;
        }

        if (computerPassword.users[newUser]) {
          if (!rootPassword) {
            currentUser = newUser;
            console.log(`Switched to ${currentUser}`);
            break;
          }

          if (
            currentUser === "default" &&
            !computerPassword.default.rootAccess
          ) {
            let rootPasswordInput = rls.question.question(
              "Enter root password: "
            );
            if (rootPasswordInput !== rootPassword) {
              console.log(
                "Incorrect root password. You cannot switch to this user."
              );
              break;
            }
          } else if (
            currentUser &&
            computerPassword.users[currentUser] &&
            !computerPassword.users[currentUser].rootAccess
          ) {
            let rootPasswordInput = rls.question.question(
              "Enter root password: "
            );
            if (rootPasswordInput !== rootPassword) {
              console.log(
                "Incorrect root password. You cannot switch to this user."
              );
              break;
            }
          }

          currentUser = newUser;
          console.log(`Switched to ${currentUser}`);
        } else {
          console.log(
            "Invalid user. Only 'root', 'default', or registered users are available."
          );
        }
      }
      if (subparameter[0] === "user" && subparameter[1] === "/add") {
        if (currentUser === "root") {
          // Obtener los parámetros directamente de subparameter
          let newUser = subparameter[2]; // Nombre del usuario
          let newPassword = subparameter[3]; // Contraseña
          let rootAccess = subparameter[4]; // Acceso root (sí/no)

          // Si no se proporcionan todos los argumentos, preguntar interactivamente
          if (!newUser) newUser = rls.question.question("Enter new username: ");
          if (!newPassword)
            newPassword = rls.question.question("Enter new password: ");
          if (rootAccess === undefined) {
            rootAccess =
              rls.question
                .question("Grant root access? (yes/no): ")
                .toLowerCase() === "yes";
          }

          // Validar que el nombre de usuario no sea "default" o "root"
          if (newUser === "default" || newUser === "root") {
            console.log("The new user can't be a System Level User");
            break;
          }

          // Crear el nuevo usuario y agregarlo al objeto `computerPassword.users`
          computerPassword.users[newUser] = {
            password: newPassword,
            rootAccess,
          };
          fs.writeFileSync(
            "./profiles.json",
            JSON.stringify(computerPassword, null, 2)
          );
          computerPassword = JSON.parse(
            fs.readFileSync("./profiles.json", "utf-8")
          );
          console.log(`User "${newUser}" added successfully.`);
        } else {
          console.log("Only root can create new users.");
        }
      } else if (subparameter[0] === "user") {
        // Verificar si hay usuarios definidos
        if (Object.keys(computerPassword.users).length === 0) {
          console.log(
            `default - Root access: ${computerPassword.default.rootAccess}`
          );
          console.log(`root - Root access: Yes`);
          console.log("No extra users found.");
        } else {
          // Mostrar todos los usuarios y su estado de root
          console.log("Users on the system:");
          console.log(
            `default - Root access: ${computerPassword.default.rootAccess}`
          );
          console.log(`root - Root access: Yes`);
          for (let user in computerPassword.users) {
            let rootAccess = computerPassword.users[user].rootAccess
              ? "Yes"
              : "No";
            console.log(`${user} - Root access: ${rootAccess}`);
          }
        }
      }
      break;
    case "whois":
      const [param1, param2] = args.split(" "); // Dividir en dos parámetros

      if (param1 === undefined || param2 === undefined) {
        console.log("Usage: whois <rootPassword> <username>");
        break;
      }

      // Verificar si el primer parámetro es la contraseña de root o el nombre de usuario
      let rootPasswordInput, username;

      // Comprobar si el primer parámetro es una contraseña de root válida
      if (param1 === computerPassword.rootpassword) {
        rootPasswordInput = param1;
        username = param2;
      } else if (param2 === computerPassword.rootpassword) {
        rootPasswordInput = param2;
        username = param1;
      } else {
        console.log("Incorrect root password.");
        break;
      }

      // Verificar si la clave root es correcta
      if (rootPasswordInput !== computerPassword.rootpassword) {
        console.log("Incorrect root password.");
        break;
      }

      // Verificar si el usuario existe en el sistema
      if (username === "default") {
        console.log(`User: ${username}`);
        console.log(
          `Root access: ${computerPassword.default.rootAccess ? "Yes" : "No"}`
        );
        console.log(`Password: undefined`);
      } else if (username === "root") {
        console.log(`User: ${username}`);
        console.log(`Root access: Yes`);
        console.log(`Password: ${computerPassword.rootpassword}`);
      } else if (computerPassword.users[username]) {
        console.log(`User: ${username}`);
        console.log(
          `Root access: ${
            computerPassword.users[username].rootAccess ? "Yes" : "No"
          }`
        );
        console.log(`Password: ${computerPassword.users[username].password}`);
      } else {
        console.log(`User "${username}" not found.`);
      }
      break;
    case "poc":
      const [subcommand, subparam] = args.split(" ");

      switch (subcommand) {
        case "-v":
        case "-version":
        case "--v":
        case "--version":
        case "version":
        case "v":
          console.log(
            colorfull.color.blue("Current running at version v1.0.0")
          );
          break;
        case "download":
          const [invalid, filetodownload] = args.split(" ");

          try {
            const plugin = repositories.plugins.find(
              (p) => p.name === filetodownload
            );

            if (!plugin) {
              console.log(`El plugin "${filetodownload}" no fue encontrado.`);
            } else {
              execSync(
                `wget -P ./plugins/ -O ./plugins/${plugin.name}.cjs "${plugin.url}"`
              );
              console.log(`Descargado: ${plugin.name}.cjs`);
            }
          } catch (error) {
            console.log(error);
          }
          break;
        case "run":
          if (subparam === undefined) {
            console.log(`Usage: poc run program`);
            break;
          }
          if (typeof globalThis[subparam] === "function") {
            globalThis[subparam]();
            break;
          } else {
            console.log(
              `Command not found, but you can install it with 'poc install ${subparam}'`
            );
            break;
          }
        case "remove":
        case "uninstall":
          if (subparam === undefined) {
            console.log("Usage: poc uninstall/remove program");
            break;
          }
          if (typeof globalThis[subparam] === "function") {
            delete globalThis[subparam];
            delete require.cache[require.resolve(`./plugins/${subparam}.cjs`)];
            console.log(`The package ${subparam} has been uninstalled.`);
            break;
          } else {
            console.log(`The package ${subparam} is not installed.`);
          }
          break;
        case "install":
          if (subparam === undefined) {
            console.log("Usage: poc install program");
            break;
          }
          if (typeof globalThis[subparam] === "function") {
            console.log(
              `The package ${subparam} already exists. You can run it with 'poc run ${subparam}'`
            );
          } else {
            try {
              require(`./plugins/${subparam}.cjs`);
            } catch (error) {
              console.log(`The package ${subparam} cant be installed.`);
              break;
            }
            console.log(
              `The package ${subparam} has been installed successfully`
            );
            break;
          }
          break;
        case "": // Solo se ejecuta si "poc" se usa sin parámetros
          console.log(
            colorfull.color.bold(
              colorfull.color.red(
                `Welcome to poc, this is an open-source package manager for ${colorfull.color.green(
                  "COS"
                )}`
              )
            )
          );
          break;
        default:
          console.log(
            colorfull.color.red(`Unknown command: poc ${subcommand}`)
          );
          break;
      }
      break;
    case "":
      break;
    default:
      console.log(
        `Command ${command} is not recognized as an internal or external command,program, or executable batch file.`
      );
      break;
  }
}

// RAMA DE TESTING
