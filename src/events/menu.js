const { set, get } = require("quick.db")

async function check(key, type, int, cfgtype) {
    if (!int.member.permissions.has("ADMINISTRATOR")) return `You don't have Administrator permissions.`
    if (get(`${key}_${type}`) == null) {
        set(`${key}_${type}`, true)
        return `${cfgtype} has been set to true`
    } else {
        if (get(`${key}_${type}`) == true) {
            set(`${key}_${type}`, false)
            return `${cfgtype} has been set to false`
        } else {
            set(`${key}_${type}`, true)
            return `${cfgtype} has been set to true`
        }
    }
}

module.exports = {
    async run(discord, client, int) {
        let gid = int.guild.id
        console.log(int)
        if (int.values[0] == "deletebutton") {
            check(gid, "deletebutton", int, "Delete Button").then(txt => {
                int.reply({
                    content: txt,
                    ephemeral: true
                })
            })
        } else if (int.values[0] == "pingauthor") {
            check(gid, "pingauthor", int, "Ping Author").then(txt => {
                int.reply({
                    content: txt,
                    ephemeral: true
                })
            })
        } else if (int.values[0] == "whitelistadmins") {
            check(gid, "whitelistadmins", int, "Whitelist Admins").then(txt => {
                int.reply({
                    content: txt,
                    ephemeral: true
                })
            })
        } else if (int.values[0] == "enabled") {
            check(gid, "enabled", int, "Enabled").then(txt => {
                int.reply({
                    content: txt,
                    ephemeral: true
                })
            })
        } else if (int.values[0] == 'filterbannedwords') {
            check(gid, "filterbannedwords", int, "Filter Banned Words").then(txt => {
                int.reply({
                    content: txt,
                    ephemeral: true
                })
            })
        } else if (int.values[0] == 'antiinvitelinks') {
            check(gid, 'antiinvitelinks', int, 'Anti Invite Links').then(txt => {
                int.reply({
                    content: txt,
                    ephemeral: true
                })
            })
        } else if (int.values[0] == 'loggingchannelfeature') {
            check(gid, 'loggingchannelfeature', int, "Logging Channel Feature").then(txt => {
                int.reply({
                    content: txt,
                    ephemeral: true
                })
            })
        }
    }
}