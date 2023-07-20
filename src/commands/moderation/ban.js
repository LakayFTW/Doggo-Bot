const {
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits,
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("ban")
      .setDescription("Ban a member")
      .addUserOption((option) =>
        option
          .setName("target")
          .setDescription("Choose your target")
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName("reason")
          .setDescription("The reason why this user should be banned")
          .setRequired(true)
      )
      .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
      .setDMPermission(false),
    category: "moderation",
    async execute(interaction) {
      const target = interaction.options.getUser("target");
      const reason =
        interaction.options.getString("reason");
  
      interaction.guild.members.ban(target);
  
      const Build = new EmbedBuilder()
        .setColor(0xff0000)
        .setTitle("This user was banned")
        .addFields(
          { name: "Reason", value: `${reason}` },
          { name: "User", value: `${target}` }
        )
        .setTimestamp()
        .setFooter({ text: "Provided by Doggo" });
  
      await interaction.reply({
        embeds: [Build],
      });
    },
  };
  