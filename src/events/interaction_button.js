module.exports = {
    async run(discord, client, interaction) {
        if (interaction.customId != "delete_msg") return
        if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
            interaction.reply({
                content: "You don't have permissions to delete messages",
                ephemeral: true
            })
            return
        }
        await interaction.message.delete()
    }
}