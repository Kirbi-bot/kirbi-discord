module.exports = function (Kirbi) {
	Kirbi.Discord.once('ready', () => {
		console.log(`Logged into Discord! Serving in ${Kirbi.Discord.guilds.array().length} Discord servers`);
	});

	Kirbi.Discord.on('ready', () => {
		Kirbi.Discord.user.setPresence({ game: { name: `${Kirbi.Config.commandPrefix}help | ${Kirbi.Discord.guilds.array().length} Servers`, type: 0 } });
	});
};
