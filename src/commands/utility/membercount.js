const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("membercount")
    .setDescription("Shows you the number of members"),
  category: "utility",
  async execute(interaction) {
    let members = interaction.guild.memberCount;

    const Build = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("Membercount")
      .setFields({ name: "Members", value: `${members}` })
      .setTimestamp()
      .setFooter({ text: "Provided by Doggo" });

    await interaction.reply({
      embeds: [Build],
    });
  },
};
