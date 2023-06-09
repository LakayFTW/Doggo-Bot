const { EmbedBuilder } = require("@discordjs/builders");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rps")
    .setDescription("Rock-Paper-Scissors")
    .addStringOption((option) =>
      option
        .setName("choice")
        .setDescription("Choose Rock, Paper or Scissors")
        .setRequired(true)
        .addChoices(
          { name: "Rock", value: "0" },
          { name: "Paper", value: "1" },
          { name: "Scissors", value: "2" }
        )
    ),
  category: "fun",
  async execute(interaction) {
    const userChoice = interaction.options.getString("choice", true);

    var seed = new Date().getTime();
    var botChoice = Math.floor(Math.random(seed) * 3);
    var message = "";
    if (userChoice != botChoice){
        if (
            (userChoice == "2" && botChoice == "1") ||
            (userChoice == "0" && botChoice == "2") ||
            (userChoice == "1" && botChoice == "0")
          ) {
            message = "You Win!";
          } else {
            message = "You Lose!";
          }
    } else {
        message = "Tie";
    }
    
    const Build = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle("Rock Paper Scissors")
    .addFields(
        { name: "Result", value: `${message}` },
        { name: "Your Choice", value: `${getChoiceNames(userChoice)}`, inline: true},
        { name: "Bot's Choice", value: `${getChoiceNames(botChoice)}`, inline: true}
    )
    .setTimestamp()
    .setFooter({ text: "Played by Doggo"});

    await interaction.reply({
        embeds: [Build],
    });
  },
};

function getChoiceNames(choice){
    if(choice == 0) return "Rock :rock:";
    if(choice == 1) return "Paper :roll_of_paper:";
    if(choice == 2) return "Scissors :scissors:";
}