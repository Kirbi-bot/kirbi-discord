const Kirbi = require('../../../../kirbi');

Kirbi.Discord.on('disconnected', function() {
    console.log('Disconnected from Discord!');
});