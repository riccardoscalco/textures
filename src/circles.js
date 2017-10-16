import rand from './random';

export default () => {
	let size = 20;
	let background = '';
	let radius = 2;
	let complement = false;
	let fill = '#343434';
	let stroke = '#343434';
	let strokeWidth = 0;
	let id = rand();

	const $ = selection => {
		const group = sel
			.append('defs')
			.append('pattern')
				.attr('id', id)
				.attr('patternUnits', 'userSpaceOnUse')
				.attr('width', size)
				.attr('height', size);
		
		if (Boolean(background)) {
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
		arguments.length ?
			radius *= 2 * _ :
			radius *= 2;
		return $;
	};

	$.lighter = function (_) {
		arguments.length ?
			radius /= 2 * _ :
			radius /= 2;
		return $;
	};

	$.thinner = function (_) {
		arguments.length ?
			size *= 2 * _ :
			size *= 2;
		return $;
	};

	$.thicker = function (_) {
		arguments.length ?
			size /= 2 * _ :
			size /= 2;
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
		arguments.length ?
			complement = _ :
			complement = true;
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
		if (arguments.length) {
			id = _;
		}
		return $;
	};

	$.url = function () {
		return `url(#${id})`;
	};

	return $;
}
