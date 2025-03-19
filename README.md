
# The most advanced fake terminal in JavaScript using NodeJS

This project is a file system and terminal-like command simulator built with JavaScript. It allows interaction with files, directory management, user and password handling, all within a simulated container. The system can execute common terminal commands such as `mkdir`, `rmdir`, `cd`, `sudo`, `nuser`, `ruser`, `net`, `cuser`, `poc`, and others.

## Features

- **File Management**: Allows creating, deleting, and exploring files and directories.
- **User Management**: Create, delete, and change user passwords.
- **Root Access Simulation**: Users can gain root privileges using the `sudo` command.
- **Terminal Commands**: Implements commands like `mkdir`, `rmdir`, `cd`, `ls`, `cat`, and more.
- **Access and Permissions**: Users have specific permissions to interact with files and directories. User permissions can be viewed.
- **Interactivity**: Uses a simulated terminal with `readline-sync` for command input.

## Requirements

- Now we are only supporting Windows 10 and higher
- Python installed
- Node.js v16 or higher.
- Dependencies:
  - `readline-sync`
  - `chalk`
  - `fs`
  - `path`
- AutoHotKey **`V1 PLUGIN REQUIRED`**: 

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/tizianoluziramos/notlinux.git
   ```

2. Navigate to the project directory:

   ```bash
   cd repository-name
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

## Usage

The main script is an interactive terminal command simulator. To run the simulator, simply execute the following command:

```bash
node index.js
```

### Available Commands

- **`clear / cls`**: Clears the terminal 
- **`time / date`**: Show current date
- **`nano <name>`**: Modify file source
- **`echo <args>`**: Show in the console the following args.
- **`pause`**: Force the user to press a key to continue
- **`uptime`**: See the current uptime
- **`fibonacci`**: Show fibonacci sequence
- **`qr <args>`**: Generate a qr code from text
- **`find <file>`**: Use it for find a file
- **`copy / cb <args>`**: Copy a file to another path
- **`rename <file1> <file2>`**: Rename a file
- **`move / mv <d/f> <d/f>`**: Move something to another folder
- **`dir / ls`**: Show all files from current dir
- **`rm / del <file>`**: Remove a file
- **`rmdir <folder>`**: Remove a folder
- **`cd <path>`**: Change your current dir
- **`mkdir <folder>`**: Make a folder
- **`type / cat <file>`**: Show text of a file in the console
- **`touch <file>`**: Create an empty file
- **`exit / logout`**: Log out from the session
- **`oslogo`**: Show os logo
- **`sudo`**: Provides help for sudo
- **`sudo -v`**: Show the sudo version
- **`sudo su`**: Switch to root user (with password if set)
- **`su`**: Run root request command, but it shows access denied, run it with sudo :)
- **`eval <args>`**: Run JavaScript debugging commands
- **`passwd`**: Change users password
- **`net`**: Show net subcommand
- **`net user`**: Show current users
- **`net user add`**: Add a new user  
- **`net user remove / delete`**: Remove a user (root access required)          
- **`net user change`**: Change the current user
- **`whois <user>`**: See properties of users, root access required
- **`poc`**: Show the POC info
- **`poc install <program>`**: Install a program you want :)
- **`poc remove / uninstall <program>`**: Uninstall the specific program     
- **`poc run <program>`**: Run the specified program if installed
- **`poc -v`**: Show the POC version
- **`weather`**: Determinate your location and show current weather
- **`ip / ipconfig`**: Show ip details
- **`ping <ip> <args>`**: Ping to specific ip address
- **`random`**: Pack for generating random things
- **`random phrase <lenguage>`**: Generate a random phrase in a specific lenguage
- **`donut`**: Show a wonderfull donut in 3D   

### KERNEL LEVEL COMMANDS, WARNING!!!
- **`clothconfigapi`**: Show clothconfigapi functions   

### Example Usage

```bash
> mkdir projects
> cd projects
> nuser john
> sudo mkdir john_projects
> ls
```

## Project Structure

- `index.js`: The main script that runs the file system simulation.
- `profiles.json`: Contains user information and their passwords.
- `commands.js`: Contains the logic for the implemented commands.
- `utils.js`: Helper functions for handling directories, files, and users.

## Contributing

1. Fork this repository.
2. Create a new branch (`git checkout -b feature/my-new-feature`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push your changes (`git push origin feature/my-new-feature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
