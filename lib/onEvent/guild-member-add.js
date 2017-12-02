module.exports = Kirbi => {
	Kirbi.Discord.on('guildMemberAdd', member => {
		const guild = member.guild;
		if (guild.defaultChannel) {
			guild.defaultChannel.send(`@here, please Welcome ${member.user.username} to ${member.guild.name}!`);
		}
	});
};
