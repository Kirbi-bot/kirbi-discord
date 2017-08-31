module.exports = function (Kirbi) {
	Kirbi.Discord.on('disconnected', () => {
		console.log('Disconnected from Discord!');
	});
};
