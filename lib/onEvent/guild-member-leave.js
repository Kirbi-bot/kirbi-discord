module.exports = Kirbi => {
	Kirbi.Discord.on('guildMemberLeave', member => {
		const guild = member.guild.id;
		if (guild.defaultChannel) {
			guild.defaultChannel.send(`${member.user.username} has left the server. They are now part of the unwashed masses.`);
		}
	});
};
