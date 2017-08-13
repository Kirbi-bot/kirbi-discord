exports.init = function () {
	const Discord = require("discord.js");
	exports.Discord = new Discord.Client();
	console.log(chalk.magenta(`Discord Enabled... Starting.\nDiscord.js version: ${Discord.version}`));
	if (exports.Auth.discord.bot_token) {
		console.log('Logging in...');
		exports.Discord.login(exports.Auth.discord.bot_token);
	} else {
		console.log(chalk.red('ERROR: Kirbi must have a Discord bot token...'));
	};
	require('./lib/onEvent');
}