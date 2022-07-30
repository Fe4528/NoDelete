const filter = require("bad-words")
const filter_api = new filter({
    placeHolder: "#"
})

module.exports = async function(msg, options) {
    let cont = msg.content
    if (options.logging_channel_feature) {
        if (options.logging_channel_id) {
            let cbl = require("./channel_based_logging.js")
            cbl(msg, cont)
        }
    }
    if (msg.content.length < 1) {
        cont = "[No message provided]"
    }
    if (options.anti_invite_links) {
        let lc = cont.toLowerCase()
        cont = lc.includes("discord.gg/") || lc.includes("discordapp.com/invite/") || lc.includes("dsc.gg/") ?
            cont = "[Possible invite link detected]" : cont
    }
    if (options.filter_banned_words) {
        if (cont.length > 0) {
            cont = filter_api.clean(cont)
        }
    }
    return cont
}