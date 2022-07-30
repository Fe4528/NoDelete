const { MessageEmbed } = require("discord.js")

module.exports = function() {
    let e = new MessageEmbed()
    .setTitle("NoDelete")
    .setDescription("Hey there, thanks for inviting the bot in this server!\n\nNoDelete is a sniping bot that displays deleted messages automatically.")
    .addField("Other stuffs", "You may also want to check out the `/help` command for complete documentation of this bot.")
    .setFooter({text: "⚠️ Automatic message sniping is enabled automatically"})
    return e
}