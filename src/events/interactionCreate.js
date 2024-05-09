const { Events } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (interaction.isCommand() || interaction.isContextMenu()) {
      const command = interaction.client.commands.get(interaction.commandName);
  
      if (!command) {
        console.log(`No command matching ${interaction.commandName} found.`);
        return;
      }
  
      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(`Error executing ${interaction.commandName}`);
        console.error(error);
      }
    }
  },
};
