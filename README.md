# Doggo-Bot
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=Node.js&logoColor=white)
![Discord](https://img.shields.io/badge/Discord-5865F2?style=flat&logo=discord&logoColor=white)

This is my attempt at creating my own Discord Bot
# Dependencies
- Node.js
- npm


# Setup

1. run `npm i` to build project dependencies
2. Create a `config.json` in the document root.
3. Add the following
    ```json
    {
        "token": "your_token_goes_here",
        "clientId": "your_client_id_goes_here",
        "guildId": "your_server_id_goes_here"
    }
    ```
    `token`: You get this from the Discord developer Portal  
    `clientId`: You get this from the Discord developer Portal  
    `guildId`: Your Development Server's id > Right-click the server title > "Copy ID"  
4. move to `src` -> ` $ cd src`
5. execute main.js -> `$ node main.js`

# Usage
To register the commands only on your development server use the go to [src](./src/) and execute [deploy-commands-testguild.js](./src/deploy-commands-testguild.js) with:  
```shell
$ node deploy-commands-testguild.js
```

To register commands on all servers execute the [deploy-commands-all.js](/src/deploy-commands-all.js) with:  
```shell
$ node deploy-commands-all.js
```

To reload commands after chaning them use `/reload "command"` in discord.

# Current Build in Features
## Server commands
- `/server` > Get Server Infos
- `/user` > Get Infos about yourself

## Miscellaneous commands
- `/weather` > Get the weather of a given city
- `/howlong` > Shows how long it takes to beat a certain game
- `/steam user` > Gives info about a given steam user (WIP)

## Bot related commands
- `/who` > The Bot tells you about itself
- `/dev` > Get infos to the repository