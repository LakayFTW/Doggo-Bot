const {
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");

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

    const retry = new ButtonBuilder()
      .setCustomId("retry")
      .setLabel("Retry")
      .setStyle(ButtonStyle.Success);

    const row = new ActionRowBuilder().addComponents(retry);
    var result = await generateDie(dieOption, dieAmount);
    var Build = await buildEmbed(result);

    const response = await interaction.reply({
      embeds: [Build],
      components: [row],
    });

    const collectorFilter = (i) => i.user.id === interaction.user.id;

    try {
      const confirmation = await response.awaitMessageComponent({
        filter: collectorFilter,
        time: 60000,
      });

      if (confirmation.customId === "retry") {
        result = await generateDie(dieOption, dieAmount);
        Build = await buildEmbed(result);
        await confirmation.update({
          content: "Your retry",
          embeds: [Build],
          components: [],
        });
      }
    } catch (e) {
      await interaction.editReply({
        content: "Confirmation not received within 1 minute, cancelling",
        components: [],
      });
    }
  },
};

async function generateDie(dieOption, dieAmount) {
  var result = [];
  var dieArr = [];
  var dieResult = 0;
  for (var i = 1; i <= dieAmount; i++) {
    var seed = new Date().getTime();
    dieResult = Math.floor(Math.random(seed) * dieOption) + 1;
    dieArr.push(dieResult);
  }

  var dieSequence = "";
  var allDice = 0;
  for (var i = 0; i < dieArr.length; i++) {
    dieSequence += dieArr[i] + ", ";
    allDice += dieArr[i];
  }
  result.push(allDice);
  result.push(dieArr);
  return result;
}

async function buildEmbed(result) {
  var Build = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle("Your throw result:")
    .addFields(
      { name: "Result", value: `${result[0]}` },
      { name: "Your dice", value: `${result[1]}` }
    )
    .setTimestamp()
    .setFooter({ text: "Provided by Doggo" });

  return Build;
}
