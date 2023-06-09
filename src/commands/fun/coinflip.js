const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("coinflip")
    .setDescription("Flips a coin"),
  category: "fun",
  async execute(interaction) {
    var seed = new Date().getTime();
    var flip = Math.floor(Math.random(seed) * 2);

    const Build = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("Result")
      .addFields({ name: "Coinside", value: `${getCoinSide(flip)}` })
      .setTimestamp()
      .setFooter({ text: "Provided by Doggo" });

    interaction.reply({
      embeds: [Build],
    });
  },
};

function getCoinSide(flipResult) {
  if (flipResult === 0) return "Heads";
  if (flipResult === 1) return "Tails";
}
