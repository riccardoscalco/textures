const tape = require('tape');
const d3 = require('d3-selection');
const jsdom = require('./jsdom');
const textures = require('../dist/textures.cjs');

tape('svg.call(texture) append a defs node', t => {
	const texture = textures.circles();
	const document = jsdom('<svg></svg>');
	const svg = d3.select(document).select('svg');
	svg.call(texture);
	t.ok(!svg.select('defs').empty());
	t.end();
})
