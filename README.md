<div align="center">

# Doggo-Bot
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white)
![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)

![Open Issues](https://img.shields.io/github/issues-raw/LakayFTW/Doggo-Bot?style=for-the-badge&color=green)
![Open Pull Requests](https://img.shields.io/github/issues-pr-raw/LakayFTW/Doggo-Bot?style=for-the-badge&color=blue)
![License](https://img.shields.io/github/license/LakayFTW/Doggo-Bot?style=for-the-badge&color=green)
![Version](https://img.shields.io/github/package-json/v/LakayFTW/Doggo-Bot?style=for-the-badge&color=yellow)
![Last Commit](https://img.shields.io/github/last-commit/LakayFTW/Doggo-Bot?style=for-the-badge&color=blue)
<!-- ![GitHub stars](https://img.shields.io/github/stars/LakayFTW/Doggo-Bot?style=social) -->



### Doggo is a Discord Bot you can host yourself with Docker.   
### In the future a version of Doggo which will hold some exclusive features will exist.

---

</div>

# Table of Contents
- [Doggo-Bot](#doggo-bot)
    - [Doggo is a Discord Bot you can host yourself with Docker.](#doggo-is-a-discord-bot-you-can-host-yourself-with-docker)
    - [In the future a version of Doggo which will hold some exclusive features will exist.](#in-the-future-a-version-of-doggo-which-will-hold-some-exclusive-features-will-exist)
- [Table of Contents](#table-of-contents)
- [Setup](#setup)
  - [Development](#development)
    - [Requirements](#requirements)
    - [Optional](#optional)
  - [Production](#production)
- [Usage](#usage)
  - [Reloading commands](#reloading-commands)
- [Current Build in Features](#current-build-in-features)

# Setup

## Development

### Requirements
- [`Node.js`]: Node.js is required

### Optional
- [`WeatherApi`]: A Weather API
- [`Steam Web API`]: The Steam Web API for getting User data

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
    Optional   
    ```json
    {
        "weatherAPI": "your_weatherapi_key_goes_here",
        "steamAPI": "your_steam_api_key_goes_here"
    }
    ```
    `token`: You get this from the Discord developer Portal  
    `clientId`: You get this from the Discord developer Portal  
    `guildId`: Your Development Server's id > Right-click the server title > "Copy ID"   
    `steamAPI`: Get your Steam Web API Key here [`SteamAPIKey`]   
    `WeatherAPI`: Create an account and use your API Key

5. Run `npm run bot` in the root directory


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


<!------------------------ LINKS ------------------------>
[`Node.js`]:                  https://nodejs.org
[`WeatherApi`]:               https://www.weatherapi.com/
[`Steam Web API`]:            https://developer.valvesoftware.com/wiki/Steam_Web_API
[`SteamAPIKey`]:              https://steamcommunity.com/dev/apikey