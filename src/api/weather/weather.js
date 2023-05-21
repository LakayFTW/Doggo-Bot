const axios = require("axios");
const { weatherAPI } = require("../../../config.json");

const getWeather = async (city, callback) => {
    axios
    .get(
      `https://api.weatherapi.com/v1/current.json?key=${weatherAPI}&q=${city}&aqi=no`
    )
    .then((result) => {
    //   console.log(result.data);
      callback(result.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = {getWeather}