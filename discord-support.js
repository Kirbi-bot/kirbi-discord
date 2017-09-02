const chalk = require('chalk');

exports.discordLogin = function (Kirbi) {
	const Discord = require('discord.js');
	Kirbi.Discord = new Discord.Client();
	console.log(chalk.magenta(`Discord Enabled... Starting.\nDiscord.js version: ${Discord.version}`));
	if (Kirbi.Auth.discord.bot_token) {
		console.log('Logging in to Discord...');
		Kirbi.Discord.login(Kirbi.Auth.discord.bot_token);
		require('./antiraid')(Kirbi);
		require('./lib/on-event')(Kirbi);
	} else {
		console.log(chalk.red('ERROR: Kirbi must have a Discord bot token...'));
		return;
	}

	Kirbi.setupDiscordCommands = function () {
		// Load external discord-specific modules
		if (Kirbi.Config.discord.modules.length > 0 && Array.isArray(Kirbi.Config.discord.modules)) {
			Kirbi.discordCommands = {};
			Kirbi.Config.discord.modules.forEach(module => {
				if (Kirbi.discordCommands[module]) {
					return;
				}

				try {
					module = require(`kirbi-discord-${module}`)(Kirbi);
				} catch (err) {
					console.log(chalk.red(`Improper setup of the 'discord-${module}' command file. : ${err}`));
					return;
				}

				if (module && module.commands) {
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
	};
	Kirbi.setupDiscordCommands();

	console.log(`Loaded ${Kirbi.commandCount()} base commands`);
	console.log(`Loaded ${Object.keys(Kirbi.discordCommands).length} Discord commands`);
};
