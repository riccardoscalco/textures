textures.js
========

Textures.js is a javascript library for creating SVG patterns.
Made on top of **d3.js**, it is designed for data visualization.

Read more on http://riccardoscalco.github.io/textures/.

## Install

```
npm install textures
```

## Usage

```
import textures from 'textures';
```

Or you can use `textures.js` in your html page with a `<script>` tag:

```
<script src="path/to/textures.js"></script>
```

Then:

```
const svg = d3
  .select('#example')
  .append("svg");

const texture = textures
  .lines()
  .thicker();

svg.call(texture);

svg
  .append('circle')
  .style('fill', texture.url());
```

## License

MIT