const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("diceroll")
    .setDescription("Rolls a dice of your Choice")
    .addStringOption((option) =>
      option
        .setName("die")
        .setDescription("Your die of choice")
        .setRequired(true)
        .addChoices(
          { name: "D4", value: "4" },
          { name: "D6", value: "6" },
          { name: "D8", value: "8" },
          { name: "D12", value: "12" },
          { name: "D20", value: "20" }
        )
    ),
  category: "fun",
  async execute(interaction) {
    const dieOption = interaction.options.getString("die", true);

    var seed = new Date().getTime();
    var dieResult = 0;
    while (dieResult < 1) {
      dieResult = Math.floor(Math.random(seed) * dieOption);
    }

    const Build = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("Your throw result:")
      .addFields({ name: "Result", value: `${dieResult}` })
      .setTimestamp()
      .setFooter({ text: "Provided by Doggo"});
    interaction.reply({
      embeds: [Build],
    });
  },
};
