const { SlashCommandBuilder } = require("discord.js");
const steam = require("../../api/steam/steamuser.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("steam")
    .setDescription("Gets info from Steam.")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("user")
        .setDescription("Gets info from a Steam user.")
        .addStringOption((option) =>
          option
            .setName("vanityurl")
            .setDescription(
              "Your Steam vanity url. Example: 'LakayFTW' or '76561198126343648'",
            )
            .setRequired(true)
        )
    ),
    category: "fun",
    async execute (interaction) {
        const steamUser = interaction.options.getString("vanityurl", true);

        await steam.getUser(steamUser, async function(result){
            let response = result.response.players[0]
            await interaction.reply({
                content: `Steam User:\n Username: ${response.personaname}\n Profilbild: ${response.avatar}\n URL: ${response.profileurl}`,
            });
        });
    },
};
