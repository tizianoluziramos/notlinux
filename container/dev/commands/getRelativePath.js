function getRelativePath(fullPath) {
  // Busca la primera aparición de "container" en la ruta
  const index = fullPath.indexOf("container");

  // Si "container" está en la ruta, la reemplaza por "/turuta"
  if (index !== -1) {
    if (fullPath.substring(index).replace("container", "") === "") {
      return fullPath.substring(index).replace("container", "\\");
    }
    return fullPath.substring(index).replace("container", "");
  }

  // Si no encuentra "container", devuelve la ruta original
  return fullPath;
}

module.exports = { getRelativePath }