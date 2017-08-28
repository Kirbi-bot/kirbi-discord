module.exports = function (Kirbi) {
    Kirbi.Discord.on('disconnected', function() {
        console.log('Disconnected from Discord!');
    });
};
