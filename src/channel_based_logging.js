const discord = require("discord.js")
const { get } = require("quick.db")

module.exports = async function(msg, content) {
    let emb_arr = []
    let log_ch = get(`${msg.guild.id}_log_channel_id`)
    let vals = msg.attachments
    let emb_msg = new discord.MessageEmbed()
    .setTitle(msg.author.tag)
    .setDescription(content)
    emb_arr.push(emb_msg)
    let emb_att = new discord.MessageEmbed()
    .setTitle("Attachment(s)")
    .setDescription(vals.map(ret => `[${ret.name}](${ret.url})`).join('\n'))
          
    if (vals.size > 0) {
        emb_arr.push(emb_att)
    }
    
    let get_ch = await msg.guild.channels.fetch(log_ch)
    get_ch.send({
        content: `Message deleted in ${msg.channel}`,
        embeds: emb_arr    
    })
}