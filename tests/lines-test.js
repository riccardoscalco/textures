const tape = require('tape');
const d3 = require('d3-selection');
const textures = require('../dist/textures.cjs');
const jsdom = require('./jsdom');

const template = () => {
	const texture = textures.lines();
	const document = jsdom('<svg></svg>');
	const svg = d3.select(document).select('svg');
	return {svg, texture};
};

tape(
	'svg.call(texture) append a node <defs>',
	t => {
		const {svg, texture} = template();
		svg.call(texture);
		t.ok(!svg.select('defs').empty());
		t.end();
	}
);
