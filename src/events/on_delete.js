const { get, set } = require("quick.db")
const wh = require('../helpers/webhook_instance.js')
const processor = require('../helpers/process_message.js')

module.exports = {
    async run(discord, client, msg) {
        if (!get(`${msg.guild.id}_enabled`)) return
        if (!msg.guild.me.permissions.has('SEND_MESSAGES') || !msg.guild.me.permissionsIn(msg.channel).has("SEND_MESSAGES")) {
            let emb_nperms = new discord.MessageEmbed()
            .setColor("RED")
            .setDescription(`Missing permissions in guild: ${msg.guild.name} - ${msg.guild.id}`)
            wh({
                embeds: [emb_nperms]
            })
            try {
            let save = set(`${msg.guild.id}_enabled`, false)
            wh({
                embeds: [ 
                    new discord.MessageEmbed()
                    .setColor("YELLOW")
                    .setDescription(`Disabled in ${msg.guild.name} - ${msg.guild.id}`)
                ]
            })
            } catch(e) {
                wh({
                    embeds: [
                        new discord.MessageEmbed()
                        .setColor("RED")
                        .setDescription("Unable to 0xff1xFF")
                    ]
                })
            }
            return
        }
        if (get(`${msg.guild.id}_whitelistadmins`) && msg.member.permissions.has("ADMINISTRATOR")) return
        let row = new discord.MessageActionRow()
        .addComponents(
            new discord.MessageButton()
            .setLabel('Delete')
            .setCustomId('delete_msg')
            .setStyle('DANGER')
        )
        let vals = msg.attachments
        processor(msg, {
            filter_banned_words: get(`${msg.guild.id}_filterbannedwords`),
            anti_invite_links: get(`${msg.guild.id}_antiinvitelinks`),
            logging_channel_id: get(`${msg.guild.id}_log_channel_id`),
            logging_channel_feature: get(`${msg.guild.id}_loggingchannelfeature`)
        }).then(result => {
            if (get(`${msg.guild.id}_log_channel_id`)) {
                if (get(`${msg.guild.id}_loggingchannelfeature`)) {
                    return
                }
            }
            let emb_arr = []
            let emb_msg = new discord.MessageEmbed()
            .setTitle(msg.author.tag)
            .setDescription(result)
            emb_arr.push(emb_msg)
            let emb_att = new discord.MessageEmbed()
            .setTitle("Attachment(s)")
            .setDescription(vals.map(ret => `[${ret.name}](${ret.url})`).join('\n'))
            
            if (vals.size > 0) {
                emb_arr.push(emb_att)
            }
            
            if (msg.guild.me.permissionsIn(msg.channel).has("SEND_MESSAGES")) {
                msg.channel.send({
                    embeds: emb_arr,
                    components: get(`${msg.guild.id}_deletebutton`) ? [row] : []
                })
            } else {
                wh({
                    embeds: [
                        new discord.MessageEmbed()
                        .setColor("RED")
                        .setDescriptioh("Unable to `73656e64206d6573736167657320696e2074686973206368616e6e656c`")
                    ]
                })
            }
        })
    }
}
