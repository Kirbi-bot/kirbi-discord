const chalk = require('chalk');

exports.discordLogin = function (Kirbi) {
	const Discord = require("discord.js");
	Kirbi.Discord = new Discord.Client();
	console.log(chalk.magenta(`Discord Enabled... Starting.\nDiscord.js version: ${Discord.version}`));
	if (Kirbi.Auth.discord.bot_token) {
		console.log('Logging in...');
		Kirbi.Discord.login(Kirbi.Auth.discord.bot_token);
	} else {
		console.log(chalk.red('ERROR: Kirbi must have a Discord bot token...'));
	};
	require('./antiraid')(Kirbi);
	require('./lib/onEvent')(Kirbi);

	//Load external discord-specific modules
	if (Kirbi.Config.discord.modules.length && Kirbi.Config.discord.modules instanceof Array) {
		Kirbi.discordCommands = {};
		Kirbi.Config.discord.modules.forEach(module => {
			if (Kirbi.discordCommands[module]) {return};
			try {
				module = require(`kirbi-discord-${module}`)(Kirbi);
			} catch (err) {
				console.log(chalk.red(`Improper setup of the 'discord-${module}' command file. : ${err}`));
				return;
			}
			if (module && module['commands']) {
				module.commands.forEach(command => {
					if (command in module) {
						try {
							Kirbi.discordCommands[command] = module[command];
						} catch (err) {
							console.log(err);
						}
					}
				});
			}
		});
	}
	
	var commandCount = Object.keys(Kirbi.Commands).length + Object.keys(Kirbi.discordCommands).length;
	console.log(`Loaded ${commandCount} Discord chat commands`);
};
