const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
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
      const Build = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle("Weather for today")
      .setDescription(`City: **${result['location']['name']}**`)
      .addFields(
        { name: "Region :round_pushpin:", value: `${result['location']['region']}`, inline: true},
        { name: "Country :map:", value: `${result['location']['country']}`, inline: true},
        { name: "Last Update :arrows_counterclockwise:", value: `${result['current']['last_updated']}`},
        { name: "Temperature :thermometer:", value: `${result['current']['temp_c']} °C`, inline: true},
        { name: "Wind speed :dash:", value: `${result['current']['wind_kph']} KM/H`, inline: true},
        { name: "Condition", value: `${result['current']['condition']['text']}`},
        { name: "Wind direction", value: `${result['current']['wind_dir']}`}
      )
      .setTimestamp()
      .setFooter({ text: "Provided by Doggo" });

      await interaction.reply({
        // content: `Wetter in: ${result['location']['name']}\n${result['location']['region']} - ${result['location']['country']}\n${result['current']['last_updated']}\n\nDas Wetter jetzt gerade:\nTemperatur: ${result['current']['temp_c']} °C\nBedingung: ${result['current']['condition']['text']}\nWindstärke: ${result['current']['wind_kph']} km/h\nWindrichtung: ${result['current']['wind_dir']}`,
        embeds: [Build],
      });
    });
  },
};
