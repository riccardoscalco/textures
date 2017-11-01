import {select} from 'd3-selection';
import 'd3-transition';
import textures from 'textures';

const drawExampleTexture = () => {
	const w = 150;
	const svg = select('#example')
		.append('svg')
			.attr('width', w)
			.attr('height', w);
	const t = textures
		.lines()
		.stroke('darkorange')
		.thicker();
	svg.call(t);
	svg
		.append('circle')
			.attr('cx', w / 2)
			.attr('cy', w / 2)
			.attr('r', 60)
			.style('fill', t.url())
			.style('stroke', 'darkorange')
			.style('stroke-width', 2);
};

const drawSquare = () => {
	const svg = select('#categories')
		.append('svg')
			.attr('id', 'square')
			.attr('width', 60 * 10)
			.attr('height', 60 * 10)
			.attr('viewBox', '0 0 600 600')
			.attr('preserveAspectRatio', 'xMidYMid');
	const t11 = textures
		.lines()
		.stroke('oldlace');
	const t21 = textures
		.lines()
		.stroke('oldlace')
		.background('#343434');
	const t32 = textures
		.circles()
		.fill('oldlace');
	const t42 = textures
		.circles()
		.fill('oldlace')
		.background('#343434');

	svg.call(t11);
	svg.call(t21);
	svg.call(t32);
	svg.call(t42);

	const group = svg.append('g');
	const tt = [t11, t21, t32, t42];
	const getRandomTextures = () =>
		tt[Math.floor(Math.random() * tt.length)].url();

	for (let i = 0; i <= 9; i++) {
		for (let j = 0; j <= 9; j++) {
			group
				.append('path')
					.attr('d', `M ${i * 60} ${j * 60} l 60 0 l 0 60 l -60 0 Z`)
					.style('fill', getRandomTextures());
		}
	}
};

const drawExampleCustomTexture = () => {
	const w = 150;
	const h = 170;

	const svg = select('#legend')
		.append('svg')
			.attr('width', w)
			.attr('height', h);

	svg
		.append('path')
			.attr('d', 'M 15 15 l 120 0 l 0 120 l -120 0 Z')
			.style('fill', 'transparent')
			.style('stroke', 'darkorange')
			.style('shape-rendering', 'crispEdges')
			.style('stroke-width', 2);

	svg
		.append('path')
			.attr('d', 'M 45 0 l 0 150 M 75 0 l 0 150 M 105 0 l 0 150 M 0 45 l 150 0 M 0 75 l 150 0 M 0 105 l 150 0')
			.style('stroke', 'darkorange')
			.style('stroke-dasharray', '5, 5')
			.style('shape-rendering', 'crispEdges')
			.style('stroke-width', 1);

	svg
		.append('path')
			.attr('d', 'M 15 105 L 75 45 L 135 105')
			.style('fill', 'transparent')
			.style('stroke', 'darkorange')
			.style('shape-rendering', 'crispEdges')
			.style('stroke-width', 4);

	svg
		.append('text')
			.text('s = size')
			.attr('x', 75)
			.attr('y', 160)
			.attr('dy', 0)
			.attr('text-anchor', 'middle')
			.style('fill', 'darkorange')
			.style('font-family', 'Inconsolata')
			.style('font-size', 14);
};

const box = (id, t) => {
	const figure = select(`[data=${id}]`);
	const box = figure.select('.box');
	const svg = box
		.append('svg')
		.attr('width', 140)
		.attr('height', 140);
	svg.call(t);
	svg
		.append('path')
			.attr('d', 'M 0 0 L 0 140 L 140 140 L 140 0 Z')
			.style('fill', t.url());
	figure
		.transition()
			.duration(1000)
			.style('opacity', 1);
};

drawExampleTexture();

box(
	'box1',
	textures
		.lines()
);

box(
	'box2',
	textures
		.lines()
		.heavier()
);

box(
	'box3',
	textures
		.lines()
		.lighter()
);

box(
	'box3_1',
	textures
		.lines()
		.thicker()
);

box(
	'box3_2',
	textures
		.lines()
		.thinner()
);

box(
	'box4',
	textures
		.lines()
		.heavier(10)
		.thinner(1.5)
);

box(
	'box5',
	textures
		.lines()
		.size(4)
		.strokeWidth(1)
);

box(
	'box6',
	textures
		.lines()
		.size(8)
		.strokeWidth(2)
);

box(
	'box7',
	textures
		.lines()
		.orientation('vertical')
		.strokeWidth(1)
		.shapeRendering('crispEdges')
);

box(
	'box8',
	textures
		.lines()
		.orientation('3/8')
		.stroke('darkorange')
);

box(
	'box9',
	textures
		.lines()
		.orientation('3/8', '7/8')
		.stroke('darkorange')
);

box(
	'box10',
	textures
		.lines()
		.size(4)
		.orientation('vertical', 'horizontal')
		.strokeWidth(1)
		.shapeRendering('crispEdges')
		.stroke('darkorange')
);

box(
	'box11',
	textures
		.lines()
		.orientation('diagonal')
		.size(40)
		.strokeWidth(26)
		.stroke('firebrick')
		.background('darkorange')
);

drawSquare();

box(
	'box12',
	textures
		.circles()
);

box(
	'box12_1',
	textures
		.circles()
		.heavier()
);

box(
	'box12_2',
	textures
		.circles()
		.lighter()
);

box(
	'box12_3',
	textures
		.circles()
		.thicker()
);

box(
	'box12_4',
	textures
		.circles()
		.thinner()
);

box(
	'box13',
	textures
		.circles()
		.size(5)
);

box(
	'box14',
	textures
		.circles()
		.complement()
);

box(
	'box15',
	textures
		.circles()
		.radius(4)
);

box(
	'box16',
	textures
		.circles()
		.radius(4)
		.fill('transparent')
		.strokeWidth(2)
);

box(
	'box17',
	textures
		.circles()
		.radius(4)
		.fill('darkorange')
		.strokeWidth(2)
		.stroke('firebrick')
		.complement()
);
box(
	'box18',
	textures.circles()
		.size(10)
		.radius(2)
		.fill('firebrick')
		.background('darkorange')
);

box(
	'box22',
	textures
		.paths()
		.d('hexagons')
		.size(8)
		.strokeWidth(2)
		.stroke('darkorange')
);

box(
	'box23',
	textures
		.paths()
		.d('crosses')
		.lighter()
		.thicker()
);

box(
	'box24',
	textures
		.paths()
		.d('caps')
		.lighter()
		.thicker()
		.stroke('darkorange')
);

box(
	'box25',
	textures
		.paths()
		.d('woven')
		.lighter()
		.thicker()
);

box(
	'box26',
	textures
		.paths()
		.d('waves')
		.thicker()
		.stroke('firebrick')
);

box(
	'box27',
	textures
		.paths()
		.d('nylon')
		.lighter()
		.shapeRendering('crispEdges')
);

box(
	'box28',
	textures
		.paths()
		.d('squares')
		.stroke('darkorange')
);

drawExampleCustomTexture();
