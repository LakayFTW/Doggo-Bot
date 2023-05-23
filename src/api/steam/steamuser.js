const axios = require("axios");
const { steamAPI } = require("../../../config.json");

const getUser = async (vanityUrl, callback) => {
  axios
    .get(
      `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${steamAPI}&vanityurl=${vanityUrl}`
    )
    .then((result) => {
      if(!result.data.message == "No match"){
        axios
        .get(
          `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steamAPI}&steamids=${result.data.response.steamid}`
        )
        .then((result) => {
          //   console.log(result.data);
          callback(result.data);
        })
        .catch((error) => {
          console.log(error);
        });
      }else{
        axios
        .get(
          `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steamAPI}&steamids=${vanityUrl}`
        )
        .then((result) => {
          //   console.log(result.data);
          callback(result.data);
        })
        .catch((error) => {
          console.log(error);
        });
      }
      
    })
    .catch((error) => {
        console.log(error);
    });
};

module.exports = { getUser };
