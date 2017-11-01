const tape = require('tape');
const d3 = require('d3-selection');
const textures = require('../dist/textures');
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
	'texture.lines() append a node <path> with some default attributes',
	t => {
		const {svg, texture} = template();
		svg.call(texture);
		const path = svg.select('defs').select('pattern').select('path');
		t.equal(path.attr('stroke-width'), '2');
		t.equal(path.attr('stroke'), '#343434');
		t.equal(path.attr('shape-rendering'), 'auto');
		t.equal(path.attr('stroke-linecap'), 'square');
		t.equal(path.attr('d'), 'M 0,20 l 20,-20 M -5,5 l 10,-10 M 15,25 l 10,-10');
		t.end();
	}
);

tape(
	'texture.heavier() doubles the strokeWidth',
	t => {
		const {svg, texture} = template();
		texture.heavier();
		svg.call(texture);
		t.equal(svg.select('defs').select('pattern').select('path').attr('stroke-width'), '4');
		t.end();
	}
);

tape(
	'texture.heavier(3) changes strokeWidth to strokeWidth * 2 * 3',
	t => {
		const {svg, texture} = template();
		texture.heavier(3);
		svg.call(texture);
		t.equal(svg.select('defs').select('pattern').select('path').attr('stroke-width'), '12');
		t.end();
	}
);

tape(
	'texture.lighter() divides the strokeWidth by 2',
	t => {
		const {svg, texture} = template();
		texture.lighter();
		svg.call(texture);
		t.equal(svg.select('defs').select('pattern').select('path').attr('stroke-width'), '1');
		t.end();
	}
);

tape(
	'texture.lighter(2) changes radius to strokeWidth / (2 * 2)',
	t => {
		const {svg, texture} = template();
		texture.lighter(2);
		svg.call(texture);
		t.equal(svg.select('defs').select('pattern').select('path').attr('stroke-width'), '0.5');
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
		const path = svg.select('defs').select('pattern').select('path');
		t.equal(path.attr('d'), 'M 0,40 l 40,-40 M -10,10 l 20,-20 M 30,50 l 20,-20');
		t.end();
	}
);

tape(
	'texture.shapeRendering("crispEdges") set shape-rendering to crispEdges',
	t => {
		const {svg, texture} = template();
		texture.shapeRendering('crispEdges');
		svg.call(texture);
		const path = svg.select('defs').select('pattern').select('path');
		t.equal(path.attr('shape-rendering'), 'crispEdges');
		t.end();
	}
);

tape(
	'texture.stroke("red") set stroke to red',
	t => {
		const {svg, texture} = template();
		texture.stroke('red');
		svg.call(texture);
		const path = svg.select('defs').select('pattern').select('path');
		t.equal(path.attr('stroke'), 'red');
		t.end();
	}
);

tape(
	'texture.strokeWidth(4) set stroke-width to 4',
	t => {
		const {svg, texture} = template();
		texture.strokeWidth(4);
		svg.call(texture);
		const path = svg.select('defs').select('pattern').select('path');
		t.equal(path.attr('stroke-width'), '4');
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
	'texture.size(40).strokeWidth(5) set size to 30 and strokeWidth to 5',
	t => {
		const {svg, texture} = template();
		texture.size(40).strokeWidth(5);
		svg.call(texture);
		const path = svg.select('defs').select('pattern').select('path');
		t.equal(path.attr('d'), 'M 0,40 l 40,-40 M -10,10 l 20,-20 M 30,50 l 20,-20');
		t.equal(path.attr('stroke-width'), '5');
		t.end();
	}
);

tape(
	'texture.orientation("vertical") set orientation to vertical',
	t => {
		const {svg, texture} = template();
		texture.orientation('vertical');
		svg.call(texture);
		const path = svg.select('defs').select('pattern').select('path');
		t.equal(path.attr('d'), 'M 10, 0 l 0, 20');
		t.end();
	}
);

tape(
	'texture.orientation("0/8") set orientation to 0/8',
	t => {
		const {svg, texture} = template();
		texture.orientation('0/8');
		svg.call(texture);
		const path = svg.select('defs').select('pattern').select('path');
		t.equal(path.attr('d'), 'M 10, 0 l 0, 20');
		t.end();
	}
);

tape(
	'texture.orientation("1/8") set orientation to 1/8',
	t => {
		const {svg, texture} = template();
		texture.size(40).orientation('1/8');
		svg.call(texture);
		const path = svg.select('defs').select('pattern').select('path');
		t.equal(path.attr('d'), 'M 10,0 l 20,40 M -10,0 l 20,40 M 30,0 l 20,40');
		t.end();
	}
);

tape(
	'texture.orientation("2/8") set orientation to 2/8',
	t => {
		const {svg, texture} = template();
		texture.size(80).orientation('2/8');
		svg.call(texture);
		const path = svg.select('defs').select('pattern').select('path');
		t.equal(path.attr('d'), 'M 0,80 l 80,-80 M -20,20 l 40,-40 M 60,100 l 40,-40');
		t.end();
	}
);

tape(
	'texture.orientation("diagonal") set orientation to diagonal',
	t => {
		const {svg, texture} = template();
		texture.size(80).orientation('diagonal');
		svg.call(texture);
		const path = svg.select('defs').select('pattern').select('path');
		t.equal(path.attr('d'), 'M 0,80 l 80,-80 M -20,20 l 40,-40 M 60,100 l 40,-40');
		t.end();
	}
);

tape(
	'texture.orientation("3/8") set orientation to 3/8',
	t => {
		const {svg, texture} = template();
		texture.size(40).orientation('3/8');
		svg.call(texture);
		const path = svg.select('defs').select('pattern').select('path');
		t.equal(path.attr('d'), 'M 0,30 l 40,-20 M 0,10 l 40,-20 M 0,50 l 40,-20');
		t.end();
	}
);

tape(
	'texture.orientation("4/8") set orientation to 4/8',
	t => {
		const {svg, texture} = template();
		texture.size(40).orientation('4/8');
		svg.call(texture);
		const path = svg.select('defs').select('pattern').select('path');
		t.equal(path.attr('d'), 'M 0,20 l 40,0');
		t.end();
	}
);

tape(
	'texture.orientation("horizontal") set orientation to horizontal',
	t => {
		const {svg, texture} = template();
		texture.size(20).orientation('horizontal');
		svg.call(texture);
		const path = svg.select('defs').select('pattern').select('path');
		t.equal(path.attr('d'), 'M 0,10 l 20,0');
		t.end();
	}
);

tape(
	'texture.orientation("5/8") set orientation to 5/8',
	t => {
		const {svg, texture} = template();
		texture.size(40).orientation('5/8');
		svg.call(texture);
		const path = svg.select('defs').select('pattern').select('path');
		t.equal(path.attr('d'), 'M 0,-10 l 40,20M 0,10 l 40,20 M 0,30 l 40,20');
		t.end();
	}
);

tape(
	'texture.orientation("6/8") set orientation to 6/8',
	t => {
		const {svg, texture} = template();
		texture.size(40).orientation('6/8');
		svg.call(texture);
		const path = svg.select('defs').select('pattern').select('path');
		t.equal(path.attr('d'), 'M 0,0 l 40,40 M -10,30 l 20,20 M 30,-10 l 20,20');
		t.end();
	}
);

tape(
	'texture.orientation("7/8") set orientation to 7/8',
	t => {
		const {svg, texture} = template();
		texture.size(40).orientation('7/8');
		svg.call(texture);
		const path = svg.select('defs').select('pattern').select('path');
		t.equal(path.attr('d'), 'M -10,0 l 20,40 M 10,0 l 20,40 M 30,0 l 20,40');
		t.end();
	}
);

tape(
	'texture.orientation("xxx") defaults to vertical',
	t => {
		const {svg, texture} = template();
		texture.size(40).orientation('xxx');
		svg.call(texture);
		const path = svg.select('defs').select('pattern').select('path');
		t.equal(path.attr('d'), 'M 20, 0 l 0, 40');
		t.end();
	}
);

tape(
	'texture.orientation("3/8", "7/8") add a couple of nodes <path>',
	t => {
		const {svg, texture} = template();
		texture.size(40).orientation('3/8', '7/8');
		svg.call(texture);
		t.equal(svg.select('defs').select('pattern').selectAll('path').size(), 2);
		t.end();
	}
);

tape(
	'texture.orientation() defaults to diagonal',
	t => {
		const {svg, texture} = template();
		texture.size(80).orientation();
		svg.call(texture);
		const path = svg.select('defs').select('pattern').select('path');
		t.equal(path.attr('d'), 'M 0,80 l 80,-80 M -20,20 l 40,-40 M 60,100 l 40,-40');
		t.end();
	}
);
