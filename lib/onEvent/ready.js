module.exports = function (Kirbi) {
    Kirbi.Discord.on('ready', function() {
        console.log(`Logged into Discord! Serving in ${Kirbi.Discord.guilds.array().length} Discord servers`);
        Kirbi.Discord.user.setGame(`${Kirbi.Config.commandPrefix}help | ${Kirbi.Discord.guilds.array().length} Servers`);
    });
};
