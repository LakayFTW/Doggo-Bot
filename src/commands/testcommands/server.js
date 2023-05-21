const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Display info about this server."),
  category: "testcommands",
  async execute(interaction) {
    return interaction.reply({
      content: `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`,
      ephemeral: true,
    });
  },
};
