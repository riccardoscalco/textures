function random() {
  return "".concat(Math.random().toString(36), "00000000000000000").replace(/[^a-z]+/g, '').slice(0, 5);
}

function circles() {
  var size = 20;
  var background = '';
  var radius = 2;
  var complement = false;
  var fill = '#343434';
  var stroke = '#343434';
  var strokeWidth = 0;
  var id = random();

  var $ = function $(selection) {
    var group = selection.append('defs').append('pattern').attr('id', id).attr('patternUnits', 'userSpaceOnUse').attr('width', size).attr('height', size);

    if (background) {
      group.append('rect').attr('width', size).attr('height', size).attr('fill', background);
    }

    group.append('circle').attr('cx', size / 2).attr('cy', size / 2).attr('r', radius).attr('fill', fill).attr('stroke', stroke).attr('stroke-width', strokeWidth);

    if (complement) {
      for (var _i = 0, _arr = [[0, 0], [0, size], [size, 0], [size, size]]; _i < _arr.length; _i++) {
        var corner = _arr[_i];
        group.append('circle').attr('cx', corner[0]).attr('cy', corner[1]).attr('r', radius).attr('fill', fill).attr('stroke', stroke).attr('stroke-width', strokeWidth);
      }
    }
  };

  $.heavier = function (_) {
    radius *= arguments.length === 0 ? 2 : 2 * _;
    return $;
  };

  $.lighter = function (_) {
    radius /= arguments.length === 0 ? 2 : 2 * _;
    return $;
  };

  $.thinner = function (_) {
    size *= arguments.length === 0 ? 2 : 2 * _;
    return $;
  };

  $.thicker = function (_) {
    size /= arguments.length === 0 ? 2 : 2 * _;
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
    complement = arguments.length === 0 ? true : _;
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
    return "url(#".concat(id, ")");
  };

  return $;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = o[Symbol.iterator]();
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

function lines() {
  var size = 20;
  var stroke = '#343434';
  var strokeWidth = 2;
  var background = '';
  var id = random();
  var orientation = ['diagonal'];
  var shapeRendering = 'auto';

  var path = function path(orientation) {
    var s = size;

    switch (orientation) {
      case '0/8':
      case 'vertical':
        return "M ".concat(s / 2, ", 0 l 0, ").concat(s);

      case '1/8':
        return "M ".concat(-s / 4, ",").concat(s, " l ").concat(s / 2, ",").concat(-s, " M ").concat(s / 4, ",").concat(s, " l ").concat(s / 2, ",").concat(-s, " M ").concat(s * 3 / 4, ",").concat(s, " l ").concat(s / 2, ",").concat(-s);

      case '2/8':
      case 'diagonal':
        return "M 0,".concat(s, " l ").concat(s, ",").concat(-s, " M ").concat(-s / 4, ",").concat(s / 4, " l ").concat(s / 2, ",").concat(-s / 2, " M ").concat(3 / 4 * s, ",").concat(5 / 4 * s, " l ").concat(s / 2, ",").concat(-s / 2);

      case '3/8':
        return "M 0,".concat(3 / 4 * s, " l ").concat(s, ",").concat(-s / 2, " M 0,").concat(s / 4, " l ").concat(s, ",").concat(-s / 2, " M 0,").concat(s * 5 / 4, " l ").concat(s, ",").concat(-s / 2);

      case '4/8':
      case 'horizontal':
        return "M 0,".concat(s / 2, " l ").concat(s, ",0");

      case '5/8':
        return "M 0,".concat(-s / 4, " l ").concat(s, ",").concat(s / 2, "M 0,").concat(s / 4, " l ").concat(s, ",").concat(s / 2, " M 0,").concat(s * 3 / 4, " l ").concat(s, ",").concat(s / 2);

      case '6/8':
        return "M 0,0 l ".concat(s, ",").concat(s, " M ").concat(-s / 4, ",").concat(3 / 4 * s, " l ").concat(s / 2, ",").concat(s / 2, " M ").concat(s * 3 / 4, ",").concat(-s / 4, " l ").concat(s / 2, ",").concat(s / 2);

      case '7/8':
        return "M ".concat(-s / 4, ",0 l ").concat(s / 2, ",").concat(s, " M ").concat(s / 4, ",0 l ").concat(s / 2, ",").concat(s, " M ").concat(s * 3 / 4, ",0 l ").concat(s / 2, ",").concat(s);

      default:
        return "M ".concat(s / 2, ", 0 l 0, ").concat(s);
    }
  };

  var $ = function $(selection) {
    var group = selection.append('defs').append('pattern').attr('id', id).attr('patternUnits', 'userSpaceOnUse').attr('width', size).attr('height', size);

    if (background) {
      group.append('rect').attr('width', size).attr('height', size).attr('fill', background);
    }

    var _iterator = _createForOfIteratorHelper(orientation),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var o = _step.value;
        group.append('path').attr('d', path(o)).attr('stroke-width', strokeWidth).attr('shape-rendering', shapeRendering).attr('stroke', stroke).attr('stroke-linecap', 'square');
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  };

  $.heavier = function (_) {
    strokeWidth *= arguments.length === 0 ? 2 : 2 * _;
    return $;
  };

  $.lighter = function (_) {
    strokeWidth /= arguments.length === 0 ? 2 : 2 * _;
    return $;
  };

  $.thinner = function (_) {
    size *= arguments.length === 0 ? 2 : 2 * _;
    return $;
  };

  $.thicker = function (_) {
    size /= arguments.length === 0 ? 2 : 2 * _;
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
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
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
    return "url(#".concat(id, ")");
  };

  return $;
}

function paths() {
  var width = 1;
  var height = 1;
  var size = 20;
  var stroke = '#343434';
  var strokeWidth = 2;
  var background = '';

  var d = function d(s) {
    return "M ".concat(s / 4, ",").concat(s * 3 / 4, "l").concat(s / 4, ",").concat(-s / 2, "l").concat(s / 4, ",").concat(s / 2);
  };

  var id = random();
  var fill = 'transparent';
  var shapeRendering = 'auto';

  var path = function path(_) {
    var s = size;

    switch (_) {
      case 'squares':
        return "M ".concat(s / 4, " ").concat(s / 4, " l ").concat(s / 2, " 0 l 0 ").concat(s / 2, " l ").concat(-s / 2, " 0 Z");

      case 'nylon':
        return "M 0 ".concat(s / 4, " l ").concat(s / 4, " 0 l 0 ").concat(-s / 4, " M ").concat(s * 3 / 4, " ").concat(s, " l 0 ").concat(-s / 4, " l ").concat(s / 4, " 0 M ").concat(s / 4, " ").concat(s / 2, " l 0 ").concat(s / 4, " l ").concat(s / 4, " 0 M ").concat(s / 2, " ").concat(s / 4, " l ").concat(s / 4, " 0 l 0 ").concat(s / 4);

      case 'waves':
        return "M 0 ".concat(s / 2, " c ").concat(s / 8, " ").concat(-s / 4, " , ").concat(s * 3 / 8, " ").concat(-s / 4, " , ").concat(s / 2, " 0 c ").concat(s / 8, " ").concat(s / 4, " , ").concat(s * 3 / 8, " ").concat(s / 4, " , ").concat(s / 2, " 0 M ").concat(-s / 2, " ").concat(s / 2, " c ").concat(s / 8, " ").concat(s / 4, " , ").concat(s * 3 / 8, " ").concat(s / 4, " , ").concat(s / 2, " 0 M ").concat(s, " ").concat(s / 2, " c ").concat(s / 8, " ").concat(-s / 4, " , ").concat(s * 3 / 8, " ").concat(-s / 4, " , ").concat(s / 2, " 0");

      case 'woven':
        return "M ".concat(s / 4, ",").concat(s / 4, "l").concat(s / 2, ",").concat(s / 2, "M").concat(s * 3 / 4, ",").concat(s / 4, "l").concat(s / 2, ",").concat(-s / 2, " M").concat(s / 4, ",").concat(s * 3 / 4, "l").concat(-s / 2, ",").concat(s / 2, "M").concat(s * 3 / 4, ",").concat(s * 5 / 4, "l").concat(s / 2, ",").concat(-s / 2, " M").concat(-s / 4, ",").concat(s / 4, "l").concat(s / 2, ",").concat(-s / 2);

      case 'crosses':
        return "M ".concat(s / 4, ",").concat(s / 4, "l").concat(s / 2, ",").concat(s / 2, "M").concat(s / 4, ",").concat(s * 3 / 4, "l").concat(s / 2, ",").concat(-s / 2);

      case 'caps':
        return "M ".concat(s / 4, ",").concat(s * 3 / 4, "l").concat(s / 4, ",").concat(-s / 2, "l").concat(s / 4, ",").concat(s / 2);

      case 'hexagons':
        width = 3;
        height = Math.sqrt(3);
        return "M ".concat(s, ",0 l ").concat(s, ",0 l ").concat(s / 2, ",").concat(s * Math.sqrt(3) / 2, " l ").concat(-s / 2, ",").concat(s * Math.sqrt(3) / 2, " l ").concat(-s, ",0 l ").concat(-s / 2, ",").concat(-s * Math.sqrt(3) / 2, " Z M 0,").concat(s * Math.sqrt(3) / 2, " l ").concat(s / 2, ",0 M ").concat(3 * s, ",").concat(s * Math.sqrt(3) / 2, " l ").concat(-s / 2, ",0");

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
    strokeWidth *= arguments.length === 0 ? 2 : 2 * _;
    return $;
  };

  $.lighter = function (_) {
    strokeWidth /= arguments.length === 0 ? 2 : 2 * _;
    return $;
  };

  $.thinner = function (_) {
    size *= arguments.length === 0 ? 2 : 2 * _;
    return $;
  };

  $.thicker = function (_) {
    size /= arguments.length === 0 ? 2 : 2 * _;
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
    return "url(#".concat(id, ")");
  };

  return $;
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */

var main = {
  circles: circles,
  lines: lines,
  paths: paths
};

export default main;
