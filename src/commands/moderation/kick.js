const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kicks a member")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Choose your target")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason why this user should be kicked")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .setDMPermission(false),
  category: "moderation",
  async execute(interaction) {
    const target = interaction.options.getMember("target");
    const reason =
      interaction.options.getString("reason") ?? "No reason provided";

    target.kick(reason);

    const Build = new EmbedBuilder()
      .setColor(0xffcc00)
      .setTitle("This user was kicked")
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
