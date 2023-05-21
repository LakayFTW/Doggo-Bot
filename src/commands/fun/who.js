const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("who")
    .setDescription("Tells you who i am"),
  category: "fun",
  async execute(interaction) {
    await interaction.reply({
      content: `Hello ${interaction.user.username}! I am Doggo and i am currently in Development\nUse /dev to get to the repository`,
      ephemeral: true,
    });
  },
};
