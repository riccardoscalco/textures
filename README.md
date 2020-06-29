# textures.js

Textures.js is a JavaScript library for creating SVG patterns.
Made on top of [**d3.js**](https://d3js.org/), it is designed for data visualization.

Read more on http://riccardoscalco.github.io/textures/.

## Install

```
npm install textures
```

## Usage

Import `textures.js` from NPM with:

```js
import textures from 'textures';
```

You can also use `textures.js` in your HTML page with a `<script>` tag by downloading `textures.js` to a local folder:

```html
<script src="path/to/textures.js"></script>
```

or by using the Unpkg CDN network:

```html
<script src="https://unpkg.com/textures@1.2.0/dist/textures.js"></script>
```

Then `textures.js` can be used alongside `d3` with:

```js
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
