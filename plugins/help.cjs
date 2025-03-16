// Definir las funciones globalmente en el objeto globalThis
const colorfull = require("../node_boludes/chalk/index.js");

globalThis["help"] = function() {
  console.log(colorfull.color.green("Available commands:"));
  console.log("");
  console.log(colorfull.color.green("Basic commands:"));
  console.log("");
  console.log(colorfull.color.cyan("clear / cls") + ": Clears the console");
  console.log(colorfull.color.cyan("time / date") + ": Shows the current time");
  console.log(colorfull.color.cyan("nano") + ": Create files and edit with simple text usage. Put exit to close the editor");
  console.log(colorfull.color.cyan("echo") + ": Shows whatever you write in the terminal, you can add -p to setup a variable and use echo $myvariable to print it");
  console.log(colorfull.color.cyan("pause") + ": Force the user to press a key to continue");
  console.log(colorfull.color.cyan("uptime") + ": See the current uptime");
  console.log(colorfull.color.cyan("fibonacci") + ": Show fibonacci sequence");

  // Comandos del file system :)
  console.log("");
  console.log(colorfull.color.green("Commands for file system: "));
  console.log("");
  console.log(colorfull.color.cyan("find") + ": Use it for find a file");
  console.log(colorfull.color.cyan("copy / cb") + ": Copy a file to another path");
  console.log(colorfull.color.cyan("rename") + ": Rename a file or a folder");
  console.log(colorfull.color.cyan("move / mv") + ": Move a file to another directory");
  console.log(colorfull.color.cyan("dir / ls") + ": Lists directories in the current path");
  console.log(colorfull.color.cyan("rm / del") + ": Remove a file");
  console.log(colorfull.color.cyan("rmdir") + ": Remove an empty directory");
  console.log(colorfull.color.cyan("cd") + ": Change the current directory");
  console.log(colorfull.color.cyan("mkdir") + ": Create a new directory");
  console.log(colorfull.color.cyan("type / cat") + ": Show content of a file");
  console.log(colorfull.color.cyan("touch") + ": Create an empty file");

  // Comandos de usuario y sesión
  console.log("");
  console.log(colorfull.color.green("Session Commands: "));
  console.log("");
  console.log(colorfull.color.cyan("exit / logout") + ": Log out from the session");
  console.log(colorfull.color.cyan("oslogo") + ": Show OS logo");

  // Comandos de administración (sudo y root)
  console.log("");
  console.log(colorfull.color.green("Commands for administration(root required): "));
  console.log("");
  console.log(colorfull.color.cyan("sudo") + ": Provides sudo commands information");
  console.log(colorfull.color.cyan("sudo -v") + ": Shows version of sudo");
  console.log(colorfull.color.cyan("sudo su") +": Switch to root user (with password if set)");
  console.log(colorfull.color.cyan("su") + ": Switch to root user (requires root password)");
  console.log(colorfull.color.cyan("eval") + ": Run JavaScript debugging commands.");

  // Comandos de gestión de usuarios
  console.log("");
  console.log(colorfull.color.green('Commands for users config:'));
  console.log("");
  console.log(colorfull.color.cyan("passwd") + ": Change users password");
  console.log(colorfull.color.cyan("net") + ": " + colorfull.color.red("Usage:")+" net subcommand")
  console.log(colorfull.color.cyan("net user") + ": List all users");
  console.log(colorfull.color.cyan("net user add") + ": Create a new user (root access required)");
  console.log(colorfull.color.cyan("net user remove / delete") + ": Remove a user (root access required)");
  console.log(colorfull.color.cyan("net user change") + ": Change the current user");
  console.log(colorfull.color.cyan("whois") + ": See properties of the users. Required root password account.");

  // Comandos de gestión de paquetes
  console.log("");
  console.log(colorfull.color.green('Commands for packages config: '));
  console.log("");
  console.log(colorfull.color.cyan("poc install program") + ": Install the specified program");
  console.log(colorfull.color.cyan("poc remove program / poc uninstall program") + ": Uninstall the specified program");
  console.log(colorfull.color.cyan("poc run program") + ": Run the specified program if installed");

  // Comandos de versión e información
  console.log("");
  console.log(colorfull.color.green("Version and information: "));
  console.log("");
  console.log(colorfull.color.cyan("poc -v / poc --v / poc version / poc v") +": Show the current version of poc");
  console.log(colorfull.color.cyan("history") +": Shows command history");
  console.log(colorfull.color.cyan("clearhistory") + ": Clean commands history");
  console.log(colorfull.color.cyan("weather") + ": Determinate your location and show current weather");
  console.log(colorfull.color.cyan("ip / ipconfig") + ": Show ip details");
  console.log(colorfull.color.cyan("ping") + ": Ping to a spesific ip address");

  // BOOT LOADER DONT USE THAT SHIT
  console.log("");
  console.log(colorfull.color.cyan("clothconfigapi") + ": Show clothconfigapi functions");

  // Comandos divertidos.
  console.log("");
  console.log(colorfull.color.green("Funny commands: "));
  console.log("");
  console.log(colorfull.color.cyan("random") + ": Pack for generating random things.");
  console.log(colorfull.color.cyan("random phrase") + ": Generate a random phrase in a specific lenguage.");
  console.log(colorfull.color.cyan("donut") + ": Show a wonderfull 3d donut");
};

// Exporta la función de ayuda
module.exports = globalThis["help"];