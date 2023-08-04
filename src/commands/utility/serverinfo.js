const { EmbedBuilder } = require("@discordjs/builders");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Display info about this server."),
  category: "utility",
  async execute(interaction) {
    const name = interaction.guild.name;
    const usercount = interaction.guild.memberCount;
    const guild = interaction.guild;

    const options = { year: "numeric", month: "long", day: "numeric" };
    const createDate = interaction.guild.createdAt;
    const date = new Date(createDate).toLocaleDateString("en-US", options);

    const owner = await interaction.guild.fetchOwner();

    await guild.channels.fetch();

    const textChannels = guild.channels.cache.filter(
      (channel) => channel.type === 0
    );
    const textChannelCount = textChannels.size;
    const voiceChannels = guild.channels.cache.filter(
      (channel) => channel.type === 2
    );
    const voiceChannelCount = voiceChannels.size;
    const roleCount = interaction.guild.roles.cache.size;
    const roleList = [];
    await interaction.guild.roles.cache
      .filter((role) => {
        return role.members.some((member) => !member.user.bot);
      })
      .forEach((role) => {
        roleList.push(role.name);
      });

    const Build = new EmbedBuilder()
      .setTitle(`${name}`)
      .setColor(0x0099ff)
      .setFields(
        { name: "Owner", value: `${owner}`, inline: true },
        { name: "Created At", value: `${date}`, inline: true },
        { name: "Members", value: `${usercount}`, inline: true },
        { name: "Text Channels", value: `${textChannelCount}`, inline: true },
        { name: "Voice Channels", value: `${voiceChannelCount}`, inline: true },
        { name: "Roles", value: `${roleCount}`, inline: true },
        { name: "List of roles used", value: `${roleList}` }
      )
      .setTimestamp()
      .setFooter({ text: "Provided by Doggo" });

    await interaction.reply({
      embeds: [Build],
    });
  },
};
