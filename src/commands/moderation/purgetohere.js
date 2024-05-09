const {
  EmbedBuilder,
  PermissionFlagsBits,
  ContextMenuCommandBuilder,
} = require("discord.js");

const { ApplicationCommandType } = require('discord-api-types/v9')

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("purgetohere")
    .setType(ApplicationCommandType.Message)
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  category: "moderation",
  async execute(interaction) {
    const messageID = interaction.targetMessage.id;
    if(!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages))
        return interaction.reply({content: "You dont have the permission to purge messages.", ephemeral: true});

    try{
        const messages = await interaction.channel.messages.fetch({ limit: 100 });
        const targetMessage = messages.get(messageID);

        if(!targetMessage){
            return interaction.reply({content: 'Invalid target message ID. Please select a valid message.', ephemeral: true});
        }

        const messagesToDelete = Array.from(messages.values()).filter(msg => msg.createdTimestamp <= targetMessage.createdTimestamp);
        await interaction.channel.bulkDelete(messagesToDelete)

        const embed = new EmbedBuilder()
        .setColor('#00c7fe')
        .setDescription(`Successfully Deleted ${messagesToDelete.length} messages.`)
    
        interaction.reply({embeds: [embed], ephemeral:true});
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'An error occurred while processing the command', ephemeral: true });
    }
  },
};
