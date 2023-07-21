const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("botinfo")
    .setDescription("Gives you info about Doggo"),
  category: "utility",
  async execute(interaction) {
    const creator = "Lakay";
    const officialDiscord = "https://discord.gg/NHxsXCYYTt";
    const github = "https://github.com/LakayFTW/Doggo-Bot";

    const Build = new EmbedBuilder()
      .setTitle("Doggo")
      .setColor(0x0099ff)
      .addFields(
        { name: "Creator", value: `${creator}` },
        { name: "Official Discord", value: `${officialDiscord}`, inline: true },
        { name: "Look at the Code", value: `${github}`, inline: true }
      )
      .setTimestamp()
      .setFooter({ text: "Provided by Doggo" });

    await interaction.reply({
      embeds: [Build],
      ephemeral: true,
    });
  },
};
