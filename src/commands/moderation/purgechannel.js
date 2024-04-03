const {
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits,
    ContextMenuCommandBuilder,
    ApplicationCommandType,
  } = require("discord.js");
  
  
  module.exports = {
      data: new ContextMenuCommandBuilder()
          .setName("Purge until here")
          .setType(ApplicationCommandType.Message),
      category: "moderation",
      async execute(interaction) {
          await interaction.reply({
              content: "Test"
          })
      }
  }