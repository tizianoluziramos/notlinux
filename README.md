
# Simulador de Sistema de Archivos en JavaScript

Este proyecto es un simulador de sistema de archivos y comandos tipo terminal en JavaScript. Permite interactuar con archivos, gestionar directorios, usuarios y contraseñas, todo dentro de un contenedor simulado. El sistema es capaz de ejecutar comandos comunes de terminal como `mkdir`, `rmdir`, `cd`, `sudo`, `nuser`, `ruser`, `net`, `cuser`, `poc`, entre otros.

## Características

- **Gestión de Archivos**: Permite crear, eliminar y explorar archivos y directorios.
- **Gestión de Usuarios**: Crear, eliminar, y cambiar contraseñas de usuarios.
- **Simulación de Acceso Root**: Los usuarios pueden obtener privilegios de root mediante comandos `sudo`.
- **Comandos de Terminal**: Implementación de comandos como `mkdir`, `rmdir`, `cd`, `ls`, `cat`, y más.
- **Acceso y Permisos**: Los usuarios tienen permisos específicos para interactuar con archivos y directorios. Se pueden ver usuarios y permisos asignados a cada uno.
- **Interactividad**: Utiliza un terminal simulado con `readline-sync` para la entrada de comandos.

## Requisitos

- Node.js v16 o superior.
- Dependencias:
  - `readline-sync`
  - `chalk`
  - `fs`
  - `path`

## Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/tu-usuario/nombre-del-repositorio.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd nombre-del-repositorio
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

## Uso

El script principal es un simulador interactivo de comandos de terminal. Para ejecutar el simulador, simplemente corre el siguiente comando:

```bash
node index.js
```

### Comandos Disponibles

- **`mkdir <nombre>`**: Crea un directorio con el nombre especificado.
- **`rmdir <nombre>`**: Elimina un directorio.
- **`cd <ruta>`**: Cambia el directorio actual a la ruta especificada.
- **`ls`**: Muestra los archivos y directorios en el directorio actual.
- **`cat <archivo>`**: Muestra el contenido de un archivo.
- **`sudo <comando>`**: Ejecuta un comando con privilegios de root, si el usuario tiene acceso.
- **`nuser <nombre>`**: Crea un nuevo usuario.
- **`ruser <nombre>`**: Elimina un usuario.
- **`net`**: Muestra los usuarios conectados.
- **`cuser <nombre>`**: Cambia la contraseña de un usuario.
- **`poc`**: Muestra los permisos de los usuarios.
  
### Ejemplo de Uso

```bash
> mkdir proyectos
> cd proyectos
> nuser juan
> sudo mkdir proyectos_juan
> ls
```

## Estructura del Proyecto

- `index.js`: El script principal que ejecuta la simulación del sistema de archivos.
- `profiles.json`: Contiene la información de los usuarios y sus contraseñas.
- `commands.js`: Contiene la lógica de los comandos implementados.
- `utils.js`: Funciones auxiliares para manejar directorios, archivos y usuarios.

## Contribución

1. Haz un fork de este repositorio.
2. Crea una nueva rama (`git checkout -b feature/mi-nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Añadir nueva funcionalidad'`).
4. Sube tus cambios (`git push origin feature/mi-nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.
