const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dev")
    .setDescription("Shows you the Github Repository of this Bot"),
  category: "utility",
  async execute(interaction) {
    await interaction.reply({
      content: "https://github.com/LakayFTW/Doggo-Bot",
      ephemeral: true,
    });
  },
};
