const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("role")
    .setDescription("Manages server roles.")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("add")
        .setDescription("adds a new server role.")
        .addStringOption((option) =>
          option
            .setName("name")
            .setDescription("The name of the role.")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("remove")
        .setDescription("removes a server role.")
        .addRoleOption((options) =>
          options
            .setName("name")
            .setDescription("The name of the role.")
            .setRequired(true)
        )
        .addStringOption((options) =>
          options
            .setName("reason")
            .setDescription("Gives a reason to why a role was deleted.")
        )
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .setDMPermission(false),
  category: "moderation",
  async execute(interaction) {
    if (interaction.options.getSubcommand() === "add") {
      const role = interaction.options.getString("name");
      interaction.guild.roles.create(role);
    }
    if (interaction.options.getSubcommand() === "remove") {
      const role = interaction.options.getRole("name");
      interaction.guild.roles.delete(role);
    }
  },
};
