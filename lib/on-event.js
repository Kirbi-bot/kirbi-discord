module.exports = function (Kirbi) {
	require('./onEvent/ready')(Kirbi);
	require('./onEvent/message')(Kirbi);
	require('./onEvent/guild-create')(Kirbi);
	require('./onEvent/guild-delete')(Kirbi);
	require('./onEvent/disconnected')(Kirbi);
};
