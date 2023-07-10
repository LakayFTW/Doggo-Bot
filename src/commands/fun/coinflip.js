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

    const row = new ActionRowBuilder().addComponents(retry);
    var Build = await buildEmbed();

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
        await confirmation.update({
          content: "Your retry",
          embeds: [Build],
          components: [],
        });
      }
    } catch (e) {
      await interaction.editReply({
        content: "Confirmation not received within 1 minute, canelling",
        components: [],
      });
    }
  },
};

async function buildEmbed() {
  var Build = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle("Result")
    .addFields({ name: "Coinside", value: `${getCoinSide(flip())}` })
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
