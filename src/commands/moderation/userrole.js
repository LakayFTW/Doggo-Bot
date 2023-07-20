const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userrole") //BNP
    .setDescription("Manages the roles of a user")
    .addStringOption((option) =>
      option
        .setName("option")
        .setDescription("choose your option")
        .setRequired(true)
        .setChoices({ name: "add", value: "0" }, { name: "remove", value: "1" })
    )
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Choose your target")
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option.setName("role").setDescription("choose a role").setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .setDMPermission(false),
  category: "moderation",
  async execute(interaction) {
    const member = interaction.options.getMember("target");
    const role = interaction.options.getRole("role");
    const option = interaction.options.getString("option", true);

    if (option == "0") {
      var Build = await addRole(member, role);
    }
    if (option == "1") {
      var Build = await removeRole(member, role);
    }

    await interaction.reply({
      embeds: [Build],
      ephemeral: true,
    });
  },
};

async function addRole(member, newRole) {
  if (!member.roles.cache.some((role) => role === newRole)) {
    member.roles.add(newRole);
    var Build = new EmbedBuilder()
      .setColor(0x33cc33)
      .setTitle("The role was added to the user")
      .addFields(
        { name: "Role", value: `${newRole.guild.name}` },
        { name: "User", value: `${member.user.username}` }
      )
      .setTimestamp()
      .setFooter({ text: "Provided by Doggo" });
  } else {
    var Build = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle("This user is already part of that role")
      .addFields(
        { name: "Role", value: `${newRole.guild.name}` },
        { name: "User", value: `${member.user.username}` }
      )
      .setTimestamp()
      .setFooter({ text: "Provided by Doggo" });
  }
  return Build;
}

async function removeRole(member, newRole) {
  if (member.roles.cache.some((role) => role === newRole)) {
    member.roles.remove(newRole);
    var Build = new EmbedBuilder()
      .setColor(0x33cc33)
      .setTitle("The role was removed from the user")
      .addFields(
        { name: "Role", value: `${newRole.guild.name}` },
        { name: "User", value: `${member.user.username}` }
      )
      .setTimestamp()
      .setFooter({ text: "Provided by Doggo" });
  } else {
    var Build = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle("This user is not part of that role")
      .addFields(
        { name: "Role", value: `${newRole.guild.name}` },
        { name: "User", value: `${member.user.username}` }
      )
      .setTimestamp()
      .setFooter({ text: "Provided by Doggo" });
  }
  return Build;
}
