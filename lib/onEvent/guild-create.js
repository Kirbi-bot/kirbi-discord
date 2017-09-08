module.exports = (Kirbi) => {
	Kirbi.Discord.on('guildCreate', () => {
		Kirbi.Discord.user.setGame(`${Kirbi.Config.commandPrefix}help | ${Kirbi.Discord.guilds.array().length} Servers`);
	});
};
