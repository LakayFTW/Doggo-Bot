const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const steam = require("../../api/steam/steamuser.js");
const level = require("../../api/steam/steamuserlevel.js");

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
          let userlevel = await level.getUserLevel(`${response.steamid}`);
            if(response.communityvisibilitystate !== 3){
              const Build = new EmbedBuilder()
              .setColor(0xC50000)
              .setTitle(`${response.personaname}`)
              .setURL(`${response.profileurl}`)
              .setDescription("The requested profile")
              .setThumbnail(`https://cdn.cloudflare.steamstatic.com/valvesoftware/images/about/steam_logo.png`)
              .addFields(
                { name: '\u200B', value: '\u200B'},
                { name: 'Profile Visibility', value: 'This profile is not public'},
                { name: 'Status', value: `${checkStatus(response.personastate)}`, inline: true},
                { name: 'Level', value: `${userlevel}`, inline: true}
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
              .setThumbnail(`https://cdn.cloudflare.steamstatic.com/valvesoftware/images/about/steam_logo.png`)
              .addFields(
                { name: '\u200B', value: '\u200B'},
                { name: 'Profile Visibility', value: 'This profile is public', inline: true},
                { name: 'Status', value: `${checkStatus(response.personastate)}`, inline: true},
                { name: 'Level', value: `${userlevel}`, inline: true}
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
  if(code === 0) return "Offline :red_circle:";
  if(code === 1) return "Online :green_circle:";
  if(code === 2) return "Busy :no_entry:";
  if(code === 3) return "Away :yellow_circle:";
  if(code === 4) return "Snooze :sleeping:";
  if(code === 5) return "looking to trade :repeat:";
  if(code === 6) return "looking to play :arrow_forward:";
}
