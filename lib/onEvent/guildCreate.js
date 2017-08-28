module.exports = function (Kirbi) {
    Kirbi.Discord.on('guildCreate', guild => {
        Kirbi.Discord.user.setGame(`${Kirbi.Config.commandPrefix}help | ${Kirbi.Discord.guilds.array().length} Servers`);
    });
};
