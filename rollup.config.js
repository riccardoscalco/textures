import pkg from './package.json';

export default [
	{
		entry: 'src/main.js',
		dest: pkg.browser,
		format: 'umd',
		moduleName: 'textures'
	},
	{
		entry: 'src/main.js',
		targets: [
			{ dest: pkg.main, format: 'cjs' },
			{ dest: pkg.module, format: 'es' }
		]
	}
];