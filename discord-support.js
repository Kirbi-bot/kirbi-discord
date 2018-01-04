const chalk = require('chalk');

exports.discordLogin = Kirbi => {
	const Discord = require('discord.js');
	Kirbi.Discord = new Discord.Client();
	console.log(chalk.magenta(`Discord Enabled... Starting.\nDiscord.js version: ${Discord.version}`));
	if (Kirbi.Auth.discord.bot_token) {
		console.log('Logging in to Discord...');
		Kirbi.Discord.login(Kirbi.Auth.discord.bot_token);
		require('./lib/on-event')(Kirbi);
	} else {
		console.log(chalk.red('ERROR: Kirbi must have a Discord bot token...'));
		return;
	}

	Kirbi.addDiscordCommand = (commandName, commandObject) => {
		try {
			Kirbi.DiscordCommands[commandName] = commandObject;
		} catch (err) {
			console.log(err);
		}
	};

	Kirbi.discordCommandCount = () => {
		return Object.keys(Kirbi.DiscordCommands).length;
	};

	Kirbi.setupDiscordCommands = () => {
		Kirbi.DiscordCommands = {};

		// Load more complex response commands from markdown files
		let markdownCommands = [];
		try {
			markdownCommands = Kirbi.getJsonObject('/config/markdown-commands.json');
		} catch (err) {
			console.log(chalk.red(err));
		}

		markdownCommands.forEach(markdownCommand => {
			const command = markdownCommand.command;
			const description = markdownCommand.description;
			const deleteRequest = markdownCommand.deleteRequest;
			const channelRestriction = markdownCommand.channelRestriction;
			const file = markdownCommand.file;

			const messagesToSend = Kirbi.getFileContents(file);
			if (messagesToSend) {
				Kirbi.addDiscordCommand(command, {
					description,
					process: (msg, suffix, isEdit, cb) => {
						if (channelRestriction === undefined || (channelRestriction && msg.channel.id === channelRestriction)) {
							if (deleteRequest) {
								msg.delete();
							}

							const messages = messagesToSend.split('=====');
							messages.forEach(message => {
								message = message.split('-----');
								cb({
									embed: {
										color: Kirbi.Config.discord.defaultEmbedColor,
										title: message[0].trim(),
										description: message[1].trim()
									}
								}, msg);
							});
						}
					}
				});
			}
		});

		// Load external discord-specific modules
		if (Kirbi.Config.discord.modules.length > 0 && Array.isArray(Kirbi.Config.discord.modules)) {
			Kirbi.Config.discord.modules.forEach(module => {
				if (Kirbi.DiscordCommands[module]) {
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
								Kirbi.DiscordCommands[command] = module[command];
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

	console.log(`Loaded ${Kirbi.discordCommandCount()} Discord commands`);
};
