const { WebhookClient } = require('discord.js')
const { webhook_token } = require('../../config.js')

let web = new WebhookClient({url: webhook_token})

module.exports = async function(body) {
    body.avatarURL = "https://i.imgur.com/KD9Ya58.jpg"
    web.send(body)
}