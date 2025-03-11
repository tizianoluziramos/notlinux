
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

- Node.js v16 or higher.
- Dependencies:
  - `readline-sync`
  - `chalk`
  - `fs`
  - `path`

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/repository-name.git
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

- **`mkdir <name>`**: Creates a directory with the specified name.
- **`rmdir <name>`**: Deletes a directory.
- **`cd <path>`**: Changes the current directory to the specified path.
- **`ls`**: Lists files and directories in the current directory.
- **`cat <file>`**: Displays the contents of a file.
- **`sudo <command>`**: Executes a command with root privileges, if the user has access.
- **`nuser <name>`**: Creates a new user.
- **`ruser <name>`**: Deletes a user.
- **`net`**: Displays the connected users.
- **`cuser <name>`**: Changes a user's password.
- **`poc`**: Displays the permissions of users.

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
