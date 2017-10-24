var rand = () =>
	`${Math.random().toString(36)}00000000000000000`
		.replace(/[^a-z]+/g, '')
		.slice(0, 5);

var circles = () => {
	let size = 20;
	let background = '';
	let radius = 2;
	let complement = false;
	let fill = '#343434';
	let stroke = '#343434';
	let strokeWidth = 0;
	let id = rand();

	const $ = selection => {
		const group = selection
			.append('defs')
			.append('pattern')
				.attr('id', id)
				.attr('patternUnits', 'userSpaceOnUse')
				.attr('width', size)
				.attr('height', size);

		if (background) {
			group
				.append('rect')
					.attr('width', size)
					.attr('height', size)
					.attr('fill', background);
		}

		group
			.append('circle')
				.attr('cx', size / 2)
				.attr('cy', size / 2)
				.attr('r', radius)
				.attr('fill', fill)
				.attr('stroke', stroke)
				.attr('stroke-width', strokeWidth);

		if (complement) {
			[[0, 0], [0, size], [size, 0], [size, size]]
				.forEach(corner => {
					group
						.append('circle')
							.attr('cx', corner[0])
							.attr('cy', corner[1])
							.attr('r', radius)
							.attr('fill', fill)
							.attr('stroke', stroke)
							.attr('stroke-width', strokeWidth);
				});
		}
	};

	$.heavier = function (_) {
		if (arguments.length === 0) {
			radius *= 2;
		} else {
			radius *= 2 * _;
		}
		return $;
	};

	$.lighter = function (_) {
		if (arguments.length === 0) {
			radius /= 2;
		} else {
			radius /= 2 * _;
		}
		return $;
	};

	$.thinner = function (_) {
		if (arguments.length === 0) {
			size *= 2;
		} else {
			size *= 2 * _;
		}
		return $;
	};

	$.thicker = function (_) {
		if (arguments.length === 0) {
			size /= 2;
		} else {
			size /= 2 * _;
		}
		return $;
	};

	$.background = function (_) {
		background = _;
		return $;
	};

	$.size = function (_) {
		size = _;
		return $;
	};

	$.complement = function (_) {
		if (arguments.length === 0) {
			complement = true;
		} else {
			complement = _;
		}
		return $;
	};

	$.radius = function (_) {
		radius = _;
		return $;
	};

	$.fill = function (_) {
		fill = _;
		return $;
	};

	$.stroke = function (_) {
		stroke = _;
		return $;
	};

	$.strokeWidth = function (_) {
		strokeWidth = _;
		return $;
	};

	$.id = function (_) {
		if (arguments.length === 0) {
			return id;
		}
		id = _;
		return $;
	};

	$.url = function () {
		return `url(#${id})`;
	};

	return $;
};

var lines = () => {
	let size = 20;
	let stroke = '#343434';
	let strokeWidth = 2;
	let background = '';
	let id = rand();
	let orientation = ['diagonal'];
	let shapeRendering = 'auto';

	const path = orientation => {
		const s = size;
		switch (orientation) {
			case '0/8':
			case 'vertical':
				return `M ${s / 2}, 0 l 0, ${s}`;
			case '1/8':
				return `M ${s / 4},0 l ${s / 2},${s} M ${-s / 4},0 l ${s / 2},${s} M ${s * 3 / 4},0 l ${s / 2},${s}`;
			case '2/8':
			case 'diagonal':
				return `M 0,${s} l ${s},${-s} M ${-s / 4},${s / 4} l ${s / 2},${-s / 2} M ${3 / 4 * s},${5 / 4 * s} l ${s / 2},${-s / 2}`;
			case '3/8':
				return `M 0,${3 / 4 * s} l ${s},${-s / 2} M 0,${s / 4} l ${s},${-s / 2} M 0,${s * 5 / 4} l ${s},${-s / 2}`;
			case '4/8':
			case 'horizontal':
				return `M 0,${s / 2} l ${s},0`;
			case '5/8':
				return `M 0,${-s / 4} l ${s},${s / 2}M 0,${s / 4} l ${s},${s / 2} M 0,${s * 3 / 4} l ${s},${s / 2}`;
			case '6/8':
				return `M 0,0 l ${s},${s} M ${-s / 4},${3 / 4 * s} l ${s / 2},${s / 2} M ${s * 3 / 4},${-s / 4} l ${s / 2},${s / 2}`;
			case '7/8':
				return `M ${-s / 4},0 l ${s / 2},${s} M ${s / 4},0 l ${s / 2},${s} M ${s * 3 / 4},0 l ${s / 2},${s}`;
			default:
				return `M ${s / 2}, 0 l 0, ${s}`;
		}
	};

	const $ = selection => {
		const group = selection
			.append('defs')
			.append('pattern')
				.attr('id', id)
				.attr('patternUnits', 'userSpaceOnUse')
				.attr('width', size)
				.attr('height', size);

		if (background) {
			group
				.append('rect')
					.attr('width', size)
					.attr('height', size)
					.attr('fill', background);
		}

		orientation
			.forEach(o => {
				group
					.append('path')
						.attr('d', path(o))
						.attr('stroke-width', strokeWidth)
						.attr('shape-rendering', shapeRendering)
						.attr('stroke', stroke)
						.attr('stroke-linecap', 'square');
			});
	};

	$.heavier = function (_) {
		if (arguments.length === 0) {
			strokeWidth *= 2;
		} else {
			strokeWidth *= 2 * _;
		}
		return $;
	};

	$.lighter = function (_) {
		if (arguments.length === 0) {
			strokeWidth /= 2;
		} else {
			strokeWidth /= 2 * _;
		}
		return $;
	};

	$.thinner = function (_) {
		if (arguments.length === 0) {
			size *= 2;
		} else {
			size *= 2 * _;
		}
		return $;
	};

	$.thicker = function (_) {
		if (arguments.length === 0) {
			size /= 2;
		} else {
			size /= 2 * _;
		}
		return $;
	};

	$.background = function (_) {
		background = _;
		return $;
	};

	$.size = function (_) {
		size = _;
		return $;
	};

	$.orientation = function (...args) {
		if (arguments.length === 0) {
			return $;
		}
		orientation = args;
		return $;
	};

	$.shapeRendering = function (_) {
		shapeRendering = _;
		return $;
	};

	$.stroke = function (_) {
		stroke = _;
		return $;
	};

	$.strokeWidth = function (_) {
		strokeWidth = _;
		return $;
	};

	$.id = function (_) {
		if (arguments.length === 0) {
			return id;
		}
		id = _;
		return $;
	};

	$.url = function () {
		return `url(#${id})`;
	};

	return $;
};

var paths = () => {
	let width = 1;
	let height = 1;
	let size = 20;
	let stroke = '#343434';
	let strokeWidth = 2;
	let background = '';
	let d = s => `M ${s / 4},${s * 3 / 4}l${s / 4},${-s / 2}l${s / 4},${s / 2}`;
	let id = rand();
	let fill = 'transparent';
	let shapeRendering = 'auto';

	const path = _ => {
		const s = size;
		switch (_) {
			case 'squares':
				return `M ${s / 4} ${s / 4} l ${s / 2} 0 l 0 ${s / 2} l ${-s / 2} 0 Z`;
			case 'nylon':
				return `M 0 ${s / 4} l ${s / 4} 0 l 0 ${-s / 4} M ${s * 3 / 4} ${s} l 0 ${-s / 4} l ${s / 4} 0 M ${s / 4} ${s / 2} l 0 ${s / 4} l ${s / 4} 0 M ${s / 2} ${s / 4} l ${s / 4} 0 l 0 ${s / 4}`;
			case 'waves':
				return `M 0 ${s / 2} c ${s / 8} ${-s / 4} , ${s * 3 / 8} ${-s / 4} , ${s / 2} 0 c ${s / 8} ${s / 4} , ${s * 3 / 8} ${s / 4} , ${s / 2} 0 M ${-s / 2} ${s / 2} c ${s / 8} ${s / 4} , ${s * 3 / 8} ${s / 4} , ${s / 2} 0 M ${s} ${s / 2} c ${s / 8} ${-s / 4} , ${s * 3 / 8} ${-s / 4} , ${s / 2} 0`;
			case 'woven':
				return `M ${s / 4},${s / 4}l${s / 2},${s / 2}M${s * 3 / 4},${s / 4}l${s / 2},${-s / 2} M${s / 4},${s * 3 / 4}l${-s / 2},${s / 2}M${s * 3 / 4},${s * 5 / 4}l${s / 2},${-s / 2} M${-s / 4},${s / 4}l${s / 2},${-s / 2}`;
			case 'crosses':
				return `M ${s / 4},${s / 4}l${s / 2},${s / 2}M${s / 4},${s * 3 / 4}l${s / 2},${-s / 2}`;
			case 'caps':
				return `M ${s / 4},${s * 3 / 4}l${s / 4},${-s / 2}l${s / 4},${s / 2}`;
			case 'hexagons':
				width = 3;
				height = Math.sqrt(3);
				return `M ${s},0 l ${s},0 l ${s / 2},${(s * Math.sqrt(3) / 2)} l ${(-s / 2)},${(s * Math.sqrt(3) / 2)} l ${(-s)},0 l ${(-s / 2)},${(-s * Math.sqrt(3) / 2)} Z M 0,${s * Math.sqrt(3) / 2} l ${s / 2},0 M ${(3 * s)},${s * Math.sqrt(3) / 2} l ${(-s / 2)},0`;
			default:
				return _(s);
		}
	};

	const $ = selection => {
		const p = path(d);
		const group = selection
			.append('defs')
			.append('pattern')
				.attr('id', id)
				.attr('patternUnits', 'userSpaceOnUse')
				.attr('width', size * width)
				.attr('height', size * height);

		if (background) {
			group
				.append('rect')
					.attr('width', size * width)
					.attr('height', size * height)
					.attr('fill', background);
		}

		group
			.append('path')
				.attr('d', p)
				.attr('fill', fill)
				.attr('stroke', stroke)
				.attr('stroke-width', strokeWidth)
				.attr('stroke-linecap', 'square')
				.attr('shape-rendering', shapeRendering);
	};

	$.heavier = function (_) {
		if (arguments.length === 0) {
			strokeWidth *= 2;
		} else {
			strokeWidth *= 2 * _;
		}
		return $;
	};

	$.lighter = function (_) {
		if (arguments.length === 0) {
			strokeWidth /= 2;
		} else {
			strokeWidth /= 2 * _;
		}
		return $;
	};

	$.thinner = function (_) {
		if (arguments.length === 0) {
			size *= 2;
		} else {
			size *= 2 * _;
		}
		return $;
	};

	$.thicker = function (_) {
		if (arguments.length === 0) {
			size /= 2;
		} else {
			size /= 2 * _;
		}
		return $;
	};

	$.background = function (_) {
		background = _;
		return $;
	};

	$.shapeRendering = function (_) {
		shapeRendering = _;
		return $;
	};

	$.size = function (_) {
		size = _;
		return $;
	};

	$.d = function (_) {
		d = _;
		return $;
	};

	$.fill = function (_) {
		fill = _;
		return $;
	};

	$.stroke = function (_) {
		stroke = _;
		return $;
	};

	$.strokeWidth = function (_) {
		strokeWidth = _;
		return $;
	};

	$.id = function (_) {
		if (arguments.length === 0) {
			return id;
		}
		id = _;
		return $;
	};

	$.url = function () {
		return `url(#${id})`;
	};

	return $;
};

var main = {
	circles,
	lines,
	paths
};

export default main;
