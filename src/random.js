export default () =>
	`${Math.random().toString(36)}00000000000000000`
		.replace(/[^a-z]+/g, '')
		.slice(0, 5);
