const { SlashCommandBuilder } = require("discord.js");
const WeatherApi = require("../../api/weather/weather.js");

//maybe add an subcommand for current and future weather
//also buttons for current an future could be a possibility and edit the response
module.exports = {
  data: new SlashCommandBuilder()
    .setName("weather")
    .setDescription("Provides the weather for an given city.")
    .addStringOption((option) =>
      option
        .setName("city")
        .setDescription("Your desired city.")
        .setRequired(true)
    ),
  category: "fun",
  async execute(interaction) {
    const city = interaction.options.getString("city", true).toLowerCase();

    await WeatherApi.getWeather(city, async function (result) {
      await interaction.reply({
        content: `Wetter in: ${result['location']['name']}\n${result['location']['region']} - ${result['location']['country']}\n${result['current']['last_updated']}\n\nDas Wetter jetzt gerade:\nTemperatur: ${result['current']['temp_c']} °C\nBedingung: ${result['current']['condition']['text']}\nWindstärke: ${result['current']['wind_kph']} km/h\nWindrichtung: ${result['current']['wind_dir']}`,
      });
    });
  },
};
