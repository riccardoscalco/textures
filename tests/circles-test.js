const tape = require('tape');
const d3 = require('d3-selection');
const textures = require('../dist/textures');
const jsdom = require('./jsdom');

const template = () => {
	const texture = textures.circles();
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

tape(
	'svg.call(texture) append a node <pattern>',
	t => {
		const {svg, texture} = template();
		svg.call(texture);
		t.ok(!svg.select('defs').select('pattern').empty());
		t.end();
	}
);

tape(
	'svg.call(texture) append a node <pattern> with the id attribute',
	t => {
		const {svg, texture} = template();
		svg.call(texture);
		t.notEqual(svg.select('defs').select('pattern').attr('id'), '');
		t.end();
	}
);

tape(
	'svg.call(texture) append a node <pattern> with the patternUnits attribute set to userSpaceOnUse',
	t => {
		const {svg, texture} = template();
		svg.call(texture);
		t.equal(svg.select('defs').select('pattern').attr('patternUnits'), 'userSpaceOnUse');
		t.end();
	}
);

tape(
	'svg.call(texture) append a node <pattern> with the attributes width and height set to 20',
	t => {
		const {svg, texture} = template();
		svg.call(texture);
		t.equal(svg.select('defs').select('pattern').attr('width'), '20');
		t.equal(svg.select('defs').select('pattern').attr('height'), '20');
		t.end();
	}
);

tape(
	'texture.circles() append a node <circle> with some default attributes',
	t => {
		const {svg, texture} = template();
		svg.call(texture);
		const circle = svg.select('defs').select('pattern').select('circle');
		t.equal(circle.attr('fill'), '#343434');
		t.equal(circle.attr('stroke'), '#343434');
		t.equal(circle.attr('strokeWidth'), null);
		t.equal(circle.attr('r'), '2');
		t.equal(circle.attr('cx'), '10');
		t.equal(circle.attr('cy'), '10');
		t.end();
	}
);

tape(
	'texture.heavier() doubles the radius',
	t => {
		const {svg, texture} = template();
		texture.heavier();
		svg.call(texture);
		t.equal(svg.select('defs').select('pattern').select('circle').attr('r'), '4');
		t.end();
	}
);

tape(
	'texture.heavier(3) changes radius to radius * 2 * 3',
	t => {
		const {svg, texture} = template();
		texture.heavier(3);
		svg.call(texture);
		t.equal(svg.select('defs').select('pattern').select('circle').attr('r'), '12');
		t.end();
	}
);

tape(
	'texture.lighter() divides the radius by 2',
	t => {
		const {svg, texture} = template();
		texture.lighter();
		svg.call(texture);
		t.equal(svg.select('defs').select('pattern').select('circle').attr('r'), '1');
		t.end();
	}
);

tape(
	'texture.lighter(2) changes radius to radius / (2 * 2)',
	t => {
		const {svg, texture} = template();
		texture.lighter(2);
		svg.call(texture);
		t.equal(svg.select('defs').select('pattern').select('circle').attr('r'), '0.5');
		t.end();
	}
);

tape(
	'texture.thinner() doubles the size',
	t => {
		const {svg, texture} = template();
		texture.thinner();
		svg.call(texture);
		t.equal(svg.select('defs').select('pattern').attr('width'), '40');
		t.end();
	}
);

tape(
	'texture.thinner(3) changes size to size * 2 * 3',
	t => {
		const {svg, texture} = template();
		texture.thinner(3);
		svg.call(texture);
		t.equal(svg.select('defs').select('pattern').attr('width'), '120');
		t.end();
	}
);

tape(
	'texture.thicker() divides the size by 2',
	t => {
		const {svg, texture} = template();
		texture.thicker();
		svg.call(texture);
		t.equal(svg.select('defs').select('pattern').attr('width'), '10');
		t.end();
	}
);

tape(
	'texture.thicker(2) changes size to size / (2 * 2)',
	t => {
		const {svg, texture} = template();
		texture.thicker(2);
		svg.call(texture);
		t.equal(svg.select('defs').select('pattern').attr('width'), '5');
		t.end();
	}
);

tape(
	'texture.background("firebrick") append a node <rect> with attribute fill equal to "firebrick"',
	t => {
		const {svg, texture} = template();
		texture.background('firebrick');
		svg.call(texture);
		t.equal(svg.select('defs').select('pattern').select('rect').attr('fill'), 'firebrick');
		t.end();
	}
);

tape(
	'texture.size(40) set size to 40',
	t => {
		const {svg, texture} = template();
		texture.size(40);
		svg.call(texture);
		const circle = svg.select('defs').select('pattern').select('circle');
		t.equal(circle.attr('cx'), '20');
		t.equal(circle.attr('cy'), '20');
		t.end();
	}
);

tape(
	'texture.complement() append 4 more nodes <circles>',
	t => {
		const {svg, texture} = template();
		texture.complement();
		svg.call(texture);
		t.equal(svg.select('defs').select('pattern').selectAll('circle').size(), 5);
		t.end();
	}
);

tape(
	'texture.radius(5) set radius to 5',
	t => {
		const {svg, texture} = template();
		texture.radius(5);
		svg.call(texture);
		const circle = svg.select('defs').select('pattern').select('circle');
		t.equal(circle.attr('r'), '5');
		t.end();
	}
);

tape(
	'texture.fill("red") set fill to red',
	t => {
		const {svg, texture} = template();
		texture.fill('red');
		svg.call(texture);
		const circle = svg.select('defs').select('pattern').select('circle');
		t.equal(circle.attr('fill'), 'red');
		t.end();
	}
);

tape(
	'texture.stroke("red") set stroke to red',
	t => {
		const {svg, texture} = template();
		texture.stroke('red');
		svg.call(texture);
		const circle = svg.select('defs').select('pattern').select('circle');
		t.equal(circle.attr('stroke'), 'red');
		t.end();
	}
);

tape(
	'texture.strokeWidth(2) set stroke-width to 2',
	t => {
		const {svg, texture} = template();
		texture.strokeWidth(2);
		svg.call(texture);
		const circle = svg.select('defs').select('pattern').select('circle');
		t.equal(circle.attr('stroke-width'), '2');
		t.end();
	}
);

tape(
	'texture.id("xyz") set pattern id to xyz',
	t => {
		const {svg, texture} = template();
		texture.id('xyz');
		svg.call(texture);
		t.equal(svg.select('defs').select('pattern').attr('id'), 'xyz');
		t.end();
	}
);

tape(
	'texture.url() returns a string with the pattern id',
	t => {
		const {svg, texture} = template();
		texture.id('xyz');
		svg.call(texture);
		t.equal(texture.url(), 'url(#xyz)');
		t.end();
	}
);

tape(
	'texture.size(30).radius(5) set size to 30 and radius to 5',
	t => {
		const {svg, texture} = template();
		texture.size(30).radius(5);
		svg.call(texture);
		const circle = svg.select('defs').select('pattern').select('circle');
		t.equal(circle.attr('r'), '5');
		t.equal(circle.attr('cx'), '15');
		t.end();
	}
);
