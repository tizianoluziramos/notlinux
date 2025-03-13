const { spawn } = require("child_process");
const path = require("path");
const rls = require("readline-sync");

let portsRunning = [];
let serverProcess;

globalThis["srv"] = function() {
  const port = rls.questionInt("Please insert the server port: ");
  const filename = rls.question("Please insert the index filename: ");
  if (portsRunning.find(p => p === port)) {
    console.log("The server on that port is already running.");
    return;
  }
  if (!filename) {
    console.log("Please set the js or html path.");
    return;
  }

  const basePath = path.resolve("container/var/www/html");
  const resolvedPath = path.join(basePath, filename);

  serverProcess = spawn("node", [resolvedPath], {
    detached: true,
    stdio: "ignore"
  });

  serverProcess.unref();
  portsRunning.push(port);
  console.log(`Server running with code: ${resolvedPath} in port: ${port}`);
};

module.exports = globalThis["srv"];
