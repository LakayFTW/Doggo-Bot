const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
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
    async execute (interaction, client) {
        const steamUser = interaction.options.getString("vanityurl", true);

        await steam.getUser(steamUser, async function(result){
          let response = result.response.players[0]
            if(response.communityvisibilitystate !== 3){
              const Build = new EmbedBuilder()
              .setColor(0xC50000)
              .setTitle(`${response.personaname}`)
              .setURL(`${response.profileurl}`)
              .setDescription("The requested profile")
              .setThumbnail(`${response.avatarmedium}`)
              .addFields(
                { name: '\u200B', value: '\u200B'},
                { name: 'Profile Visibility', value: 'This profile is not public'},
                { name: 'Status', value: `${checkStatus(response.personastate)}`, inline: true}
              )
              .setImage(`${response.avatarfull}`)
              .setTimestamp()
              .setFooter({ text: "Provided by Doggo" });

              await interaction.reply({
                embeds: [Build],
              })
            } else {
              const Build = new EmbedBuilder()
              .setColor(0x32cd32)
              .setTitle(`${response.personaname}`)
              .setURL(`${response.profileurl}`)
              .setDescription("The requested profile")
              .setThumbnail(`${response.avatarmedium}`)
              .addFields(
                { name: '\u200B', value: '\u200B'},
                { name: 'Profile Visibility', value: 'This profile is public', inline: true},
                { name: 'Status', value: `${checkStatus(response.personastate)}`, inline: true}
              )
              .setImage(`${response.avatarfull}`)
              .setTimestamp()
              .setFooter({ text: "Provided by Doggo" });
  
              await interaction.reply({
                embeds: [Build],
              })
            }
        });
    },
};

function checkStatus(code) {
  if(code === 0) return "Offline";
  if(code === 1) return "Online";
  if(code === 2) return "Busy";
  if(code === 3) return "Away";
  if(code === 4) return "Snooze";
  if(code === 5) return "looking to trade";
  if(code === 6) return "looking to play";
}
