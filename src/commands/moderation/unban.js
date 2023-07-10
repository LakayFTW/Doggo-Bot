const {
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits,
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("unban")
      .setDescription("Unbans a member")
      .addUserOption((option) =>
        option
          .setName("target")
          .setDescription("Choose your target")
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName("reason")
          .setDescription("The reason why this user should be unbanned")
      )
      .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
      .setDMPermission(false),
    category: "moderation",
    async execute(interaction) {
      const target = interaction.options.getUser("target");
      const reason =
        interaction.options.getString("reason") ?? "No reason provided";
  
      interaction.guild.members.unban(target, reason);
  
      const Build = new EmbedBuilder()
        .setColor(0x33cc33)
        .setTitle("This user was unbanned")
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
  