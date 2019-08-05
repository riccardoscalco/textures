// Import uglify from 'rollup-plugin-uglify';
// import babel from 'rollup-plugin-babel';
// import pkg from './package.json';

// export default [
// {
// 	input: 'src/main.js',
// 	plugins: [
// 		babel({
// 			exclude: ['node_modules/**']
// 		}),
// 		uglify()
// 	],
// 	output: {file: pkg.main, format: 'umd'},
// 	name: 'textures'
// },
// {
// 	input: 'src/main.js',
// 	output: {file: pkg.module, format: 'es'},
// 	plugins: [
// 		babel({
// 			exclude: ['node_modules/**']
// 		})
// 	],
// }
// ];

import {uglify} from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';

export default [
	{
		input: 'src/main.js',
		output: {
			name: 'textures',
			file: pkg.main,
			format: 'umd'
		},
		plugins: [
			babel({
				exclude: ['node_modules/**']
			}),
			uglify(),
			resolve(),
			commonjs()
		]
	},
	{
		input: 'src/main.js',
		external: ['ms'],
		output: [
			{file: pkg.module, format: 'es'}
		],
		plugins: [
			babel({
				exclude: ['node_modules/**']
			})
		]
	}
];
