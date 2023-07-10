const {
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("coinflip")
    .setDescription("Flips a coin"),
  category: "fun",
  async execute(interaction) {
    const retry = new ButtonBuilder()
      .setCustomId("retry")
      .setLabel("Retry")
      .setStyle(ButtonStyle.Success);
    var retries = 0;

    const row = new ActionRowBuilder().addComponents(retry);
    var Build = await buildEmbed(retries);

    const response = await interaction.reply({
      embeds: [Build],
      components: [row],
    });

    const collectorFilter = (i) => i.user.id === interaction.user.id;
    while (true) {
      try {
        var confirmation = await response.awaitMessageComponent({
          filter: collectorFilter,
          time: 60000,
        });
        if (confirmation.customId === "retry") {
          retries++;
          Build = await buildEmbed(retries);
          await confirmation.update({
            content: "Your retry",
            embeds: [Build],
            components: [row],
          });
          continue;
        }
      } catch (e) {
        await interaction.editReply({
          content: "Confirmation not received within 1 minute, cancelling",
          components: [],
        });
        break;
      }
    }
  },
};

async function buildEmbed(retries) {
  var Build = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle("Result")
    .addFields(
      { name: "Coinside", value: `${getCoinSide(flip())}`, inline: true },
      { name: "Retries", value: `${retries}`, inline: true },
    )
    .setTimestamp()
    .setFooter({ text: "Provided by Doggo" });
  return Build;
}

function flip() {
  var seed = new Date().getTime();
  return Math.floor(Math.random(seed) * 2);
}

function getCoinSide(flipResult) {
  if (flipResult === 0) return "Heads";
  if (flipResult === 1) return "Tails";
}
