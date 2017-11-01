var rand = (function () {
	return (Math.random().toString(36) + '00000000000000000').replace(/[^a-z]+/g, '').slice(0, 5);
});

var circles = (function () {
	var size = 20;
	var background = '';
	var radius = 2;
	var complement = false;
	var fill = '#343434';
	var stroke = '#343434';
	var strokeWidth = 0;
	var id = rand();

	var $ = function $(selection) {
		var group = selection.append('defs').append('pattern').attr('id', id).attr('patternUnits', 'userSpaceOnUse').attr('width', size).attr('height', size);

		if (background) {
			group.append('rect').attr('width', size).attr('height', size).attr('fill', background);
		}

		group.append('circle').attr('cx', size / 2).attr('cy', size / 2).attr('r', radius).attr('fill', fill).attr('stroke', stroke).attr('stroke-width', strokeWidth);

		if (complement) {
			[[0, 0], [0, size], [size, 0], [size, size]].forEach(function (corner) {
				group.append('circle').attr('cx', corner[0]).attr('cy', corner[1]).attr('r', radius).attr('fill', fill).attr('stroke', stroke).attr('stroke-width', strokeWidth);
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
		return 'url(#' + id + ')';
	};

	return $;
});

var lines = (function () {
	var size = 20;
	var stroke = '#343434';
	var strokeWidth = 2;
	var background = '';
	var id = rand();
	var orientation = ['diagonal'];
	var shapeRendering = 'auto';

	var path = function path(orientation) {
		var s = size;
		switch (orientation) {
			case '0/8':
			case 'vertical':
				return 'M ' + s / 2 + ', 0 l 0, ' + s;
			case '1/8':
				return 'M ' + s / 4 + ',0 l ' + s / 2 + ',' + s + ' M ' + -s / 4 + ',0 l ' + s / 2 + ',' + s + ' M ' + s * 3 / 4 + ',0 l ' + s / 2 + ',' + s;
			case '2/8':
			case 'diagonal':
				return 'M 0,' + s + ' l ' + s + ',' + -s + ' M ' + -s / 4 + ',' + s / 4 + ' l ' + s / 2 + ',' + -s / 2 + ' M ' + 3 / 4 * s + ',' + 5 / 4 * s + ' l ' + s / 2 + ',' + -s / 2;
			case '3/8':
				return 'M 0,' + 3 / 4 * s + ' l ' + s + ',' + -s / 2 + ' M 0,' + s / 4 + ' l ' + s + ',' + -s / 2 + ' M 0,' + s * 5 / 4 + ' l ' + s + ',' + -s / 2;
			case '4/8':
			case 'horizontal':
				return 'M 0,' + s / 2 + ' l ' + s + ',0';
			case '5/8':
				return 'M 0,' + -s / 4 + ' l ' + s + ',' + s / 2 + 'M 0,' + s / 4 + ' l ' + s + ',' + s / 2 + ' M 0,' + s * 3 / 4 + ' l ' + s + ',' + s / 2;
			case '6/8':
				return 'M 0,0 l ' + s + ',' + s + ' M ' + -s / 4 + ',' + 3 / 4 * s + ' l ' + s / 2 + ',' + s / 2 + ' M ' + s * 3 / 4 + ',' + -s / 4 + ' l ' + s / 2 + ',' + s / 2;
			case '7/8':
				return 'M ' + -s / 4 + ',0 l ' + s / 2 + ',' + s + ' M ' + s / 4 + ',0 l ' + s / 2 + ',' + s + ' M ' + s * 3 / 4 + ',0 l ' + s / 2 + ',' + s;
			default:
				return 'M ' + s / 2 + ', 0 l 0, ' + s;
		}
	};

	var $ = function $(selection) {
		var group = selection.append('defs').append('pattern').attr('id', id).attr('patternUnits', 'userSpaceOnUse').attr('width', size).attr('height', size);

		if (background) {
			group.append('rect').attr('width', size).attr('height', size).attr('fill', background);
		}

		orientation.forEach(function (o) {
			group.append('path').attr('d', path(o)).attr('stroke-width', strokeWidth).attr('shape-rendering', shapeRendering).attr('stroke', stroke).attr('stroke-linecap', 'square');
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

	$.orientation = function () {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

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
		return 'url(#' + id + ')';
	};

	return $;
});

var paths = (function () {
	var width = 1;
	var height = 1;
	var size = 20;
	var stroke = '#343434';
	var strokeWidth = 2;
	var background = '';
	var d = function d(s) {
		return 'M ' + s / 4 + ',' + s * 3 / 4 + 'l' + s / 4 + ',' + -s / 2 + 'l' + s / 4 + ',' + s / 2;
	};
	var id = rand();
	var fill = 'transparent';
	var shapeRendering = 'auto';

	var path = function path(_) {
		var s = size;
		switch (_) {
			case 'squares':
				return 'M ' + s / 4 + ' ' + s / 4 + ' l ' + s / 2 + ' 0 l 0 ' + s / 2 + ' l ' + -s / 2 + ' 0 Z';
			case 'nylon':
				return 'M 0 ' + s / 4 + ' l ' + s / 4 + ' 0 l 0 ' + -s / 4 + ' M ' + s * 3 / 4 + ' ' + s + ' l 0 ' + -s / 4 + ' l ' + s / 4 + ' 0 M ' + s / 4 + ' ' + s / 2 + ' l 0 ' + s / 4 + ' l ' + s / 4 + ' 0 M ' + s / 2 + ' ' + s / 4 + ' l ' + s / 4 + ' 0 l 0 ' + s / 4;
			case 'waves':
				return 'M 0 ' + s / 2 + ' c ' + s / 8 + ' ' + -s / 4 + ' , ' + s * 3 / 8 + ' ' + -s / 4 + ' , ' + s / 2 + ' 0 c ' + s / 8 + ' ' + s / 4 + ' , ' + s * 3 / 8 + ' ' + s / 4 + ' , ' + s / 2 + ' 0 M ' + -s / 2 + ' ' + s / 2 + ' c ' + s / 8 + ' ' + s / 4 + ' , ' + s * 3 / 8 + ' ' + s / 4 + ' , ' + s / 2 + ' 0 M ' + s + ' ' + s / 2 + ' c ' + s / 8 + ' ' + -s / 4 + ' , ' + s * 3 / 8 + ' ' + -s / 4 + ' , ' + s / 2 + ' 0';
			case 'woven':
				return 'M ' + s / 4 + ',' + s / 4 + 'l' + s / 2 + ',' + s / 2 + 'M' + s * 3 / 4 + ',' + s / 4 + 'l' + s / 2 + ',' + -s / 2 + ' M' + s / 4 + ',' + s * 3 / 4 + 'l' + -s / 2 + ',' + s / 2 + 'M' + s * 3 / 4 + ',' + s * 5 / 4 + 'l' + s / 2 + ',' + -s / 2 + ' M' + -s / 4 + ',' + s / 4 + 'l' + s / 2 + ',' + -s / 2;
			case 'crosses':
				return 'M ' + s / 4 + ',' + s / 4 + 'l' + s / 2 + ',' + s / 2 + 'M' + s / 4 + ',' + s * 3 / 4 + 'l' + s / 2 + ',' + -s / 2;
			case 'caps':
				return 'M ' + s / 4 + ',' + s * 3 / 4 + 'l' + s / 4 + ',' + -s / 2 + 'l' + s / 4 + ',' + s / 2;
			case 'hexagons':
				width = 3;
				height = Math.sqrt(3);
				return 'M ' + s + ',0 l ' + s + ',0 l ' + s / 2 + ',' + s * Math.sqrt(3) / 2 + ' l ' + -s / 2 + ',' + s * Math.sqrt(3) / 2 + ' l ' + -s + ',0 l ' + -s / 2 + ',' + -s * Math.sqrt(3) / 2 + ' Z M 0,' + s * Math.sqrt(3) / 2 + ' l ' + s / 2 + ',0 M ' + 3 * s + ',' + s * Math.sqrt(3) / 2 + ' l ' + -s / 2 + ',0';
			default:
				return _(s);
		}
	};

	var $ = function $(selection) {
		var p = path(d);
		var group = selection.append('defs').append('pattern').attr('id', id).attr('patternUnits', 'userSpaceOnUse').attr('width', size * width).attr('height', size * height);

		if (background) {
			group.append('rect').attr('width', size * width).attr('height', size * height).attr('fill', background);
		}

		group.append('path').attr('d', p).attr('fill', fill).attr('stroke', stroke).attr('stroke-width', strokeWidth).attr('stroke-linecap', 'square').attr('shape-rendering', shapeRendering);
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
		return 'url(#' + id + ')';
	};

	return $;
});

var main = {
	circles: circles,
	lines: lines,
	paths: paths
};

export default main;
