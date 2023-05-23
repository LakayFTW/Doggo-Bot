const axios = require("axios");
const { steamAPI } = require("../../../config.json");

async function getUserLevel(url) {
  let level = await axios
    .get(
      `http://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=${steamAPI}&steamid=${url}`
    )
    .catch((error) => {
      console.log(error);
    });
  return level.data.response.player_level;
}

module.exports = { getUserLevel };
