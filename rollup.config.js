import uglify from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';
import {minify} from 'uglify-es';
import pkg from './package.json';

export default [
	{
		input: 'src/main.js',
		plugins: [
			resolve({browser: true}),
			uglify({}, minify)
		],
		output: {file: pkg.browser, format: 'umd'}
	}
];
