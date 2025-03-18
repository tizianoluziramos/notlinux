const readline = require("readline");

// Comandos
const HELP_COMMAND = "help";
const DIR_COMMAND = "dir";
const CHANGE_DIRECTORY_COMMAND = "cd";
const QUIT_COMMAND = "exit";
const CLEAR_COMMAND = "clear";

// Definir el contexto de usuario y archivo
class Context {
  constructor() {
    this.user_name = "USER";
    this.device_name = "WKSTN-05";
    this.date = "1996-04-14";
    this.root_directory = new Folder("", null);
    this.working_directory = this.root_directory;
  }
}

class Folder {
  constructor(path, parent) {
    this.folder_path = path;
    this.parent_directory = parent;
    this.child_directories = [];
    this.child_files = [];
  }

  toString() {
    return this.folder_path;
  }
}

class Document {
  constructor(name, parent) {
    this.document_name = name;
    this.parent_directory = parent;
    this.content = "";
    this.size_kb = 10;
  }

  setContent(new_content) {
    this.content = new_content;
    this.size_kb = Math.ceil((Buffer.byteLength(this.content) / 1024) * 100) / 100; // Convert bytes to KB
  }

  toString() {
    return this.document_name;
  }
}

// Inicializar contexto
let currentContext = new Context();
currentContext.root_directory.child_directories = [
  new Folder("Desktop", currentContext.root_directory),
  new Folder("Documents", currentContext.root_directory),
  new Folder("Downloads", currentContext.root_directory),
  new Folder("Music", currentContext.root_directory),
];
currentContext.root_directory.child_files = [
  new Document("readme.txt", currentContext.root_directory),
  new Document("dontread.txt", currentContext.root_directory),
  new Document("passwords.txt", currentContext.root_directory),
];

currentContext.root_directory.child_files[0].setContent("Welcome to FakeDOS. Type '%s' for a list of useful commands. Enjoy your stay!".replace("%s", HELP_COMMAND));
currentContext.root_directory.child_files[1].setContent("Lorem ipsum dolor sit amet...");
currentContext.root_directory.child_files[2].setContent("Hah! Thought I'd keep my passwords in a plaintext file?");

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let pastCommands = [];
let currentUserInput = "";

const ALPHANUMERIC_KEYS = {
  ' ': ' ', "'": "'", ',': ',', '-': '-', '.': '.', '/': '/',
  '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
  ';': ';', '=': '=', '`': '`', "'": "'",
  'a': 'a', 'b': 'b', 'c': 'c', 'd': 'd', 'e': 'e', 'f': 'f', 'g': 'g', 'h': 'h', 'i': 'i',
  'j': 'j', 'k': 'k', 'l': 'l', 'm': 'm', 'n': 'n', 'o': 'o', 'p': 'p', 'q': 'q', 'r': 'r',
  's': 's', 't': 't', 'u': 'u', 'v': 'v', 'w': 'w', 'x': 'x', 'y': 'y', 'z': 'z'
};

function drawNewLine(input, drawPrefix = true) {
  let text = "";

  if (drawPrefix) {
    text += `${currentContext.user_name.toLowerCase()}@${currentContext.device_name.toLowerCase()}`;
    if (currentContext.working_directory.folder_path !== "") {
      text += `<${currentContext.working_directory.folder_path}>`;
    }
    text += ": ";
  }

  text += input;
  console.log(text);
}

function clear() {
  console.clear();
}

function displayHelpCommands() {
  drawNewLine(`For assistance, type '${HELP_COMMAND}'`, false);
  drawNewLine(`  ${CHANGE_DIRECTORY_COMMAND} Change working directory.`);
  drawNewLine(`  ${CLEAR_COMMAND} Clear the terminal window.`);
  drawNewLine(`  ${DIR_COMMAND} Display files and folders in the current working directory.`);
  drawNewLine(`  ${QUIT_COMMAND} Terminate the current terminal session.`);
}

function parseInput(input) {
  let splitInput = input.split(" ");

  switch (splitInput[0].toLowerCase()) {
    case CHANGE_DIRECTORY_COMMAND:
      if (splitInput.length === 1) {
        drawNewLine("  No path specified.", false);
        break;
      }

      if (splitInput[1] === "..") {
        if (currentContext.working_directory.parent_directory) {
          currentContext.working_directory = currentContext.working_directory.parent_directory;
        }
        break;
      }

      let folderFound = false;
      for (let folder of currentContext.working_directory.child_directories) {
        if (folder.toString().toLowerCase() === splitInput[1].toLowerCase()) {
          currentContext.working_directory = folder;
          folderFound = true;
          break;
        }
      }

      if (!folderFound) {
        drawNewLine("  Path not found.", false);
      }
      break;

    case HELP_COMMAND:
      displayHelpCommands();
      break;

    case DIR_COMMAND:
      if (currentContext.working_directory.child_directories.length === 0 && currentContext.working_directory.child_files.length === 0) {
        drawNewLine("  No sub-folders or files.", false);
        break;
      }

      drawNewLine(" - - - - - - - - - - - - - - - - - ");
      for (let folder of currentContext.working_directory.child_directories) {
        drawNewLine(`  <DIR> ${folder.toString()}`);
      }
      for (let file of currentContext.working_directory.child_files) {
        drawNewLine(`  ${file.toString()}`);
      }
      break;

    case CLEAR_COMMAND:
      clear();
      break;

    case QUIT_COMMAND:
      rl.close();
      process.exit(0);
      break;

    default:
      drawNewLine("Command not recognized.", false);
      break;
  }
}

function init() {
  rl.on('line', (input) => {
    if (input === '') {
      return;
    }
  
    pastCommands.push(input);
    currentUserInput = input;
  
    parseInput(input);
  
    rl.prompt();
  });
  clear();
  drawNewLine("FAKE-DOS version 1.2");
  drawNewLine("Copyright (C) 1994 VirtuTech Industrial Systems");
  drawNewLine(`Current date is ${currentContext.date}`);
  drawNewLine("", false);
  displayHelpCommands();
  rl.prompt();
}
// Función para simular las opciones de arranque
function showBootDeviceOptions() {
  const bootDevices = [
    "1. HDD (Hard Disk Drive)",
    "2. USB (Universal Serial Bus)",
    "3. CD/DVD (Optical Drive)",
    "4. Network Boot",
    "5. Exit"
  ];

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.clear();
  console.log(`
  ========================================
           Boot Device Options
  ========================================
  Please select a boot device:
  `);

  // Mostrar las opciones de arranque
  bootDevices.forEach(device => console.log(device));

  rl.question("\nSelect option (1-5): ", answer => {
    // Validar la opción ingresada
    switch (answer) {
      case "1":
        console.log("Booting from HDD...");
        process.exit(0);
      case "2":
        init();
        break;
      case "3":
        console.log("Booting from CD/DVD...");
        break;
      case "4":
        console.log("Booting from Network...");
        break;
      case "5":
        console.log("Exiting Boot Options...");
        rl.close();
        return;
      default:
        console.log("Invalid selection, please choose a valid option.");
        break;
    }

    // Volver a mostrar el menú después de seleccionar una opción válida
    rl.close();
    setTimeout(showBootDeviceOptions, 2000); // Esperar 2 segundos antes de mostrar nuevamente
  });
}

// Ejecutar la función para mostrar las opciones de arranque
showBootDeviceOptions();
