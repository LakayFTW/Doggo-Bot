# Doggo-Bot
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=Node.js&logoColor=white)
![Discord](https://img.shields.io/badge/Discord-5865F2?style=flat&logo=discord&logoColor=white)

Doggo is a Discord Bot you can host yourself with Docker.   
In the future a version of Doggo which will hold some exclusive features will exist.

# Table of Contents
- [Doggo-Bot](#doggo-bot)
- [Table of Contents](#table-of-contents)
- [Setup](#setup)
  - [Development](#development)
    - [Dependencies](#dependencies)
  - [Production](#production)
- [Usage](#usage)
  - [Reloading commands](#reloading-commands)
- [Current Build in Features](#current-build-in-features)

# Setup

## Development
1. Clone the repositoy to your desired filepath
2. run `npm i` or `npm install` to build project dependencies
3. Create a `config.json` in the document root.
4. Add the following
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
5. Run `npm run bot` in the root directory

### Dependencies
You will need [NodeJS](https://nodejs.org/en) and [NPM](https://www.npmjs.com/).

## Production
In Production you need to run the project in a Docker.   
You can execute the [docker-compose.yml](/docker-compose.yml) with `docker-compose up -d --build`.   

# Usage
To register the commands only on your development server execute [deploy-commands-testguild.js](./src/deploy-commands-testguild.js) with:  
```shell
$ node deploy-commands-testguild.js
```

To register commands on all servers execute the [deploy-commands-all.js](/src/deploy-commands-all.js) with:  
```shell
$ node deploy-commands-all.js
```

## Reloading commands
To reload commands after editing them use the command `/reload "commandname"` in discord.

# Current Build in Features
WIP