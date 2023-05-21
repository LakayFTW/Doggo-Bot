# Doggo-Bot

This is my attempt at creating my own Discord Bot

# Setup

1. Create a `config.json` in the document root.
2. Add the following
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
3. move to `src` -> ` $ cd src`
4. execute main.js -> `$ node main.js`