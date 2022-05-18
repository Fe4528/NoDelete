const db = require('quick.db')

function getVal(key) {
    if (db.get(key) == null) {
        return false
    } else {
        return db.get(key)
    }
}

module.exports = {
    async run(discord, client, msg) {

        let row = new discord.MessageActionRow()
        .addComponents(
            new discord.MessageButton()
            .setLabel('Delete')
            .setCustomId('delete_msg')
            .setStyle('DANGER')
        )

        let [att] = await msg.attachments.values()
        let msgatt = att ? att : null
        let button;
        let author1;
        let initauth = getVal(`${msg.guild.id}_pingauthor`)

        if (initauth) {
            author1 = msg.author
        } else {
            author1 = msg.member.nickname || msg.author.username 
        }
        
        if (getVal(`${msg.guild.id}_deletebutton`)) {
            button = [row]
        } else {
            button = []
        }

        if (getVal(`${msg.guild.id}_whitelistadmins`)) {
            if (msg.member.permissions.has('ADMINISTRATOR')) return
        }

        if (msgatt == null) {
            msg.channel.send({
                content: `${author1}: ${msg.content}`,
                components: button
            })
        } else if (msgatt) {
            msg.channel.send({
                content: `${author1}: ${msg.content}`,
                files: [{
                    attachment: msgatt.url,
                    name: `ATTACHMENT_${msgatt.name}`
                }],
                components: button
            })
        }
    }
}
