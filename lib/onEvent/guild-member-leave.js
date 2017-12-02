module.exports = Kirbi => {
	Kirbi.Discord.on('guildMemberLeave', member => {
		const guild = member.guild;
		if (guild.defaultChannel) {
			guild.defaultChannel.send(`${member.user.username} has left the server.`);
		}
	});
};
