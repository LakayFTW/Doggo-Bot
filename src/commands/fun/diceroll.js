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
    )
    .addStringOption((option) =>
      option
        .setName("amount")
        .setDescription("How many dices to you want to throw?")
        .setRequired(true)
    ),
  category: "fun",
  async execute(interaction) {
    const dieOption = interaction.options.getString("die", true);
    const dieAmount = interaction.options.getString("amount", true);

    var dieArr = [];
    var dieResult = 0;
    for (var i = 1; i <= dieAmount; i++) {
      var seed = new Date().getTime();
      dieResult = Math.floor(Math.random(seed) * dieOption)+1;
      dieArr.push(dieResult);
    }

    var dieSequence = "";
    var allDice = 0;
    for (var i = 0; i < dieArr.length; i++) {
      dieSequence += dieArr[i] + ", ";
      allDice += dieArr[i];
    }

    const Build = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("Your throw result:")
      .addFields(
        { name: "Result", value: `${allDice}` },
        { name: "Your dice", value: `${dieSequence}` }
      )
      .setTimestamp()
      .setFooter({ text: "Provided by Doggo" });
    interaction.reply({
      embeds: [Build],
    });
  },
};
