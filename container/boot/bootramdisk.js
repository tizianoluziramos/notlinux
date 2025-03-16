const ora = require("ora").default;
class RAMDisk {
  constructor() {
      this.data = ""; // Solo almacena 1s y 0s
  }

  addBit(bit) {
      if (bit !== "0" && bit !== "1") {
          return;
      }
      this.data += bit;
      process.stdout._write(bit);
  }

  showMemory() {
    process.stdout._write(this.data);
  }

  clearMemory() {
      this.data = "";
  }
}

const ramdisk = new RAMDisk();
function loadRamDisk() {
  const total = 20;
  let progreso = 0;

  const spinner = ora("Loading pre-loaded RamDisk.").start();

  const intervalo = setInterval(() => {
    const incremento = Math.random() * (4 - 0.5) + 0.5;
    progreso += incremento;

    if (progreso >= total) {
      progreso = total;
    }

    const porcentaje = Math.floor(progreso / total * 100); 
    const barra = `[${"=".repeat(Math.floor(progreso))}${" ".repeat(
      total - Math.floor(progreso)
    )}] ${porcentaje}%`;

    spinner.text = barra; 

    if (progreso === total) {
      clearInterval(intervalo);
      spinner.succeed(
        "RamDisk enabled, now you can use Persistence File System Storage and Random Access Memory for this PC."
      );
    }
  }, 400);
}

loadRamDisk();