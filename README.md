# textures.js

Textures.js is a javascript library for creating SVG patterns.
Made on top of **d3.js**, it is designed for data visualization.

Read more on [riccardoscalco.github.io/textures](https://riccardoscalco.github.io/textures/).

## Install

``` sh
npm install textures
```

## Usage

Import `textures.js` from NPM with:

``` js
import textures from 'textures';
```

You can also use`textures.js` in your html page with a `<script>` tag, dowloading `textures.js` in a local folder

``` html
<script src="path/to/textures.js"></script>
```

or using the Unpkg CDN network

``` html
<script src="https://unpkg.com/textures@1.2.0/dist/textures.js"></script>
```

Then `textures.js` can be used alongside with `d3` with:

``` js
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

[MIT](license)
