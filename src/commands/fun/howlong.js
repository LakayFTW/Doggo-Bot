const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { HowLongToBeatService, HowLongToBeatEntry } = require("howlongtobeat");

let hltbService = new HowLongToBeatService();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("howlong")
    .setDescription("Shows you how long it takes to complete a game")
    .addStringOption((option) =>
      option
        .setName("game")
        .setDescription("The game you want to search for")
        .setRequired(true)
    ),
  category: "fun",
  async execute(interaction) {
    const game = interaction.options.getString("game", true);

    try {
      await hltbService.search(game).then((result) => {
        const Build = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(`${result[0]['name']}`)
        .setThumbnail('https://db3pap005files.storage.live.com/y4m2gGcEp8Gv44GNgNZIXStkKJFl27dMfQEJSqyosWwM0mjUAX-zB4vmOXZe8d5fM5jysbit6fu1JgM8CKuEtEOvkmjN1eoBmNYUtE9CsLyNUrTVCeg5jCcuXTFp8NO6jiHtwc6yyfg1NBYppDZXJ_Xxzf1a9GQu21j4TBe7CQLhNVwo2AwAO4JRiZXmAsurOM-PQFkmxb5wtSqfxpKbAYuB_6NcjYkME5veypBs-0brJw?encodeFailures=1&width=64&height=65')
        .addFields(
          { name: "Main Story", value: `${result[0]['gameplayMain']} Hours`, inline: true },
          { name: "Main + Extra", value: `${result[0]['gameplayMainExtra']} Hours`, inline: true },
          { name: "Completionist", value: `${result[0]['gameplayCompletionist']} Hours`, inline: true}
        )
        .setImage(`${result[0]['imageUrl']}`);
        interaction.reply({
          // content: `Game: ${result[0]["name"]}\nMain Story: ${result[0]['gameplayMain']} Std\nMain + Extra: ${result[0]['gameplayMainExtra']} Std\nCompletionist: ${result[0]['gameplayCompletionist']} Std\n${result[0]['imageUrl']}`,
          embeds: [Build],
        });
      });
    } catch {
      const Build = new EmbedBuilder()
      .setColor(0xC50000)
      .setTitle("Not Responding")
      .setThumbnail("https://db3pap005files.storage.live.com/y4m2gGcEp8Gv44GNgNZIXStkKJFl27dMfQEJSqyosWwM0mjUAX-zB4vmOXZe8d5fM5jysbit6fu1JgM8CKuEtEOvkmjN1eoBmNYUtE9CsLyNUrTVCeg5jCcuXTFp8NO6jiHtwc6yyfg1NBYppDZXJ_Xxzf1a9GQu21j4TBe7CQLhNVwo2AwAO4JRiZXmAsurOM-PQFkmxb5wtSqfxpKbAYuB_6NcjYkME5veypBs-0brJw?encodeFailures=1&width=64&height=65")
      .addFields(
        { name: "ERROR", value: "The request could not be resolved\n We are working on a solution!"}
      );
      interaction.reply({
        embeds: [Build],
      });
    };
  },
};
