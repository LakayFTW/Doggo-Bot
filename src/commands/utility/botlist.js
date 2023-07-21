const {
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonStyle,
  ButtonBuilder,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("botlist")
    .setDescription("Shows you the number and names of all bots."),
  category: "utility",
  async execute(interaction) {
    let bots = await interaction.guild.members.fetch().then((members) => {
      var bots = [];
      for (let m of members.entries()) {
        let mContent = m[1];
        if (mContent.user.bot) {
          bots.push(mContent.user);
        }
      }
      return bots;
    });

    const previousPage = new ButtonBuilder()
      .setCustomId("previous")
      .setEmoji('⏪')
      .setStyle(ButtonStyle.Secondary);

    const nextPage = new ButtonBuilder()
      .setCustomId("next")
      .setEmoji('⏩')
      .setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder().addComponents(previousPage, nextPage);

    const ITEMS_PER_PAGE = 6;
    const toalPages = Math.ceil(bots.length / ITEMS_PER_PAGE);
    let currentPage = 1;
    const pageIndex = currentPage - 1;
    const startIndex = pageIndex * ITEMS_PER_PAGE;
    const pageBots = bots.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const Build = new EmbedBuilder()
      .setTitle(`Bot List: [${bots.length}]`)
      .setColor(0x0099ff)
      .setTimestamp()
      .setFooter({ text: "Provided by Doggo" });

    pageBots.forEach((element, index) => {
      Build.addFields({
        name: `${index + 1}`,
        value: `${element}`,
        inline: true,
      });
    });

    const response = await interaction.reply({
      embeds: [Build],
      components: [row],
      fetchReply: true,
    });

    const filter = (i) => i.customId === "previous" || i.customId === "next";
    while (true) {
      try {
        var collector = await response.awaitMessageComponent({
          filter,
          time: 15000,
        });

        if (collector.customId === "previous") {
          currentPage--;
        } else if (collector.customId === "next") {
          currentPage++;
        }

        const newPageIndex = currentPage - 1;
        const newStartIndex = newPageIndex * ITEMS_PER_PAGE;
        const newPageBots = bots.slice(
          newStartIndex,
          newStartIndex + ITEMS_PER_PAGE
        );

        const newEmbed = new EmbedBuilder()
          .setTitle(`Bot List: [${bots.length}]`)
          .setColor(0x0099ff)
          .setTimestamp()
          .setFooter({ text: "Provided by Doggo" });

        newPageBots.forEach((element, index) => {
          newEmbed.addFields({
            name: `${newStartIndex + index + 1}`,
            value: `${element}`,
            inline: true,
          });
        });

        await collector.update({
          embeds: [newEmbed],
        });
        continue;
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
