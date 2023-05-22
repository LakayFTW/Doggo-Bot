const { SlashCommandBuilder } = require("discord.js");
const { HowLongToBeatService, HowLongToBeatEntry } = require("howlongtobeat");

let hltbService = new HowLongToBeatService();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("howlong")
    .setDescription("Shows you how long it takes to complete a game")
    .addStringOption((option) =>
      option
        .setName("game")
        .setDescription("The game you want to search for")
        .setRequired(true)
    ),
  category: "fun",
  async execute(interaction) {
    const game = interaction.options.getString("game", true);

    await hltbService.search(game).then((result) =>
      interaction.reply({
        content: `Game: ${result[0]["name"]}\nMain Story: ${result[0]['gameplayMain']} Std\nMain + Extra: ${result[0]['gameplayMainExtra']} Std\nCompletionist: ${result[0]['gameplayCompletionist']} Std\n<${result[0]['imageUrl']}>`,
      }),
    );
  },
};
