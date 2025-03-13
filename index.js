console.clear();
const rls = require("./node_boludes/readline-sync/index.cjs");
const colorfull = require("./node_boludes/chalk/index.js");
const fs = require("fs");
const path = require("path");

let currentDir = path.join(__dirname, "container"); // Raíz de la carpeta "container"
let computerPassword = fs.readFileSync("./profiles.json", "utf-8");
computerPassword = JSON.parse(computerPassword);
let currentUser = computerPassword.default.user;
let rootPassword = computerPassword.rootpassword;
let attemps = 0;

function getRelativePath(fullPath) {
  // Busca la primera aparición de "container" en la ruta
  const index = fullPath.indexOf("container");

  // Si "container" está en la ruta, la reemplaza por "/turuta"
  if (index !== -1) {
    return fullPath.substring(index).replace("container", '\\');
  }

  // Si no encuentra "container", devuelve la ruta original
  return fullPath;
}

function getPromptFormat(user, path) {
  let commanderFormat = computerPassword.commander || "${user}:${path} > "; // Formato por defecto
  let relativePath = getRelativePath(path); // Convierte la ruta absoluta a relativa

  return commanderFormat
    .replace("${user}", colorfull.color.red(user))
    .replace("${path}", colorfull.color.hex("#00FFFF", relativePath))
    .replace("tryhackme", colorfull.color.hex(computerPassword.pcnamecolor, "tryhackme"));
}

function showOSLogo() {
  console.log(colorfull.color.blue("                  /#\\"));
  console.log(colorfull.color.blue("                 /###\\"));
  console.log(colorfull.color.blue("                /#####\\"));
  console.log(colorfull.color.blue("               /#######\\"));
  console.log(colorfull.color.blue('              _ "=######\\'));
  console.log(colorfull.color.blue("             /##=,_\\#####\\"));
  console.log(colorfull.color.blue("            /#############\\"));
  console.log(colorfull.color.blue("           /###############\\"));
  console.log(colorfull.color.blue("          /#################\\"));
  console.log(colorfull.color.blue("         /###################\\"));
  console.log(colorfull.color.blue('        /########*"""*########\\'));
  console.log(colorfull.color.blue("       /#######/       \\#######\\"));
  console.log(colorfull.color.blue("      /########         ########\\"));
  console.log(colorfull.color.blue("     /#########         ######m=,_"));
  console.log(colorfull.color.blue("    /##########         ##########\\"));
  console.log(colorfull.color.blue("   /######***             ***######\\"));
  console.log(colorfull.color.blue("  /###**                       **###\\"));
  console.log(
    colorfull.color.blue(" /**                               **\\\\")
  );
}

function askForPassword() {
  if (attemps === 5) {
    console.log("Maximum number of attemps tried.");
    process.exit(0);
  }
  let requestComputerPassword = rls.question.question(
    `Please insert computer password: `
  );

  if (requestComputerPassword !== computerPassword.bootkey) {
    console.log("Wrong password, try again.");
    attemps++;
    askForPassword(); // Llamado recursivo
  }
}

if (computerPassword.enabled === true) {
  askForPassword();
}

console.clear();
showOSLogo();

let relativePath = path.relative(path.join(__dirname, "container"), currentDir);

// Si estamos en la raíz de 'container', solo mostrar 'container\'
let displayPath =
  relativePath === ""
    ? "container\\"
    : `container\\${relativePath.replace(/\\/g, "\\\\")}`;

while (true) {
  let command = rls.question.question(getPromptFormat(currentUser, currentDir));

  let inputParts = command.trim().split(" ");
  mainCommand = inputParts[0];
  let args = inputParts.slice(1).join(" ");
  switch (mainCommand) {
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

        filesInDir.forEach(file => {
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
        matchingFiles.forEach(file => console.log(file));
      } else {
        console.log(`No files found matching the pattern "${searchPattern}".`);
      }
      break;
    case "copy":
    case "cp":
      let [sourceFile, destDir] = args.split(" ").map(arg => arg.trim());

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
      let argsArray = args.split(" ").map(arg => arg.trim());

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
      let argsArrays = args.split(" ").map(arg => arg.trim());

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
      const readlinesyncqued = require("readline-sync");
      let pauseMessage = args.trim() || "Press any key to continue..."; // Si no se especifica un mensaje, usa el mensaje predeterminado
      readlinesyncqued.keyInPause(pauseMessage);
      break;
    case "del":
    case "rm":
      let rmmeme = args.split(" ").map(arg => arg.trim());
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

      let newDirPaths = path.join(currentDir, newDir);

      if (!newDirPaths.startsWith(path.join(__dirname, "container"))) {
        console.log("You cannot navigate outside the 'container' directory.");
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

      fs.mkdir(newDirPath, { recursive: true }, err => {
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
        const listFilesRecursive = dirPath => {
          const files = fs.readdirSync(dirPath, { withFileTypes: true });

          files.forEach(file => {
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
          files.forEach(file => {
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

      switch (subCommand) {
        case "rm":
          let rmmeme = args.split(" ").map(arg => arg.trim());
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
        console.log("Closing everything....");
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
            rootAccess
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
          `Root access: ${computerPassword.users[username].rootAccess
            ? "Yes"
            : "No"}`
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
