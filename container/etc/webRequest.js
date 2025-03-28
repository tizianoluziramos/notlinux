const fs = require("fs");

// Leer y parsear el archivo JSON
let keepass;
try {
  keepass = JSON.parse(fs.readFileSync("keepassword.json", "utf8"));
  if (!Array.isArray(keepass)) keepass = []; // Asegura que keepass sea un array
} catch (error) {
  keepass = []; // Si hay un error (archivo no existe o JSON inválido), inicializa un array vacío
}

class KeePass {
  constructor(usuario, contrasena) {
    this.usuario = typeof usuario === "string" ? usuario : "Desconocido";
    this.contrasena = typeof contrasena === "string" ? contrasena : "";
  }

  add() {
    let a = true;
    keepass.forEach(i => {
      if (i.usuario === this.usuario) a = false;
    });
    if (a) {
      keepass.push({ usuario: this.usuario, contrasena: this.contrasena });
      fs.writeFileSync("keepassword.json", JSON.stringify(keepass, null, 2));
    }
  }
}
