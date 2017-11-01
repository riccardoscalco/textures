import uglify from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default [
	{
		input: 'src/main.js',
		plugins: [
			babel({
				exclude: ['node_modules/**']
			}),
			uglify()
		],
		output: {file: pkg.main, format: 'umd'},
		name: 'textures'
	},
	{
		input: 'src/main.js',
		output: {file: pkg.module, format: 'es'},
		plugins: [
			babel({
				exclude: ['node_modules/**']
			})
		],
	}
];
