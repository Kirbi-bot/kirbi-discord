module.exports = function (Kirbi) {
	require('./onEvent/ready')(Kirbi);
	require('./onEvent/message')(Kirbi);
	require('./onEvent/guildCreate')(Kirbi);
	require('./onEvent/guildDelete')(Kirbi);
	require('./onEvent/guildMemberAdd')(Kirbi);
	require('./onEvent/disconnected')(Kirbi);
};
