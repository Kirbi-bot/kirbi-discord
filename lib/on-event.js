module.exports = Kirbi => {
	require('./on-event/ready')(Kirbi);
	require('./on-event/message')(Kirbi);
	require('./on-event/guild-create')(Kirbi);
	require('./on-event/guild-delete')(Kirbi);
	require('./on-event/guild-member-leave')(Kirbi);
	require('./on-event/disconnected')(Kirbi);
};
