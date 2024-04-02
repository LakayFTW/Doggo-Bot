const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  ChannelType
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("announce")
    .setDescription("Send and announcement using the bot")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("choose the channel to announce to")
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildText)
    )
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("Your message to announce")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false),
  category: "utility",
  async execute(interaction) {
    const channel = interaction.options.getChannel("channel", true);
    const message = interaction.options.getString("message", true);

    const Announcement = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle("Announcement")
    .setDescription(message)
    .setTimestamp()
    .setFooter({text: "Provided by Doggo"});

    const Reply = new EmbedBuilder()
     .setColor(0x00FF00)
     .setTitle(":white_check_mark: Announcement send")

    await interaction.reply({
        embeds: [Reply],
        ephemeral: true
    })

    await channel.send({
        embeds: [Announcement]
    });
  },
};
