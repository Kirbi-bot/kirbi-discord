module.exports = Kirbi => {
	require('./onEvent/ready')(Kirbi);
	require('./onEvent/message')(Kirbi);
	require('./onEvent/guild-create')(Kirbi);
	require('./onEvent/guild-delete')(Kirbi);
	require('./onEvent/guild-member-leave')(Kirbi);
	require('./onEvent/guild-member-add')(Kirbi);
	require('./onEvent/disconnected')(Kirbi);
};
