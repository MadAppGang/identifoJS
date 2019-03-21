import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import pkg from './package.json';

export default [
	// browser-friendly UMD build
	{
		input: 'src/index.js',
		output: {
			name: 'IdentifoJS',
			file: pkg.browser,
			format: 'umd'
		},
		plugins: [
			resolve({ browser: true }),
			commonjs(),
			json(),
			babel({ exclude: 'node_modules/**' }),
		]
	},

	// CommonJS (for Node) and ES module (for bundlers) build.
	{
		input: 'src/index.js',
		external: ['idtoken-verifier'],
    plugins: [
			resolve(),
			commonjs(),
			json(),
      babel({ exclude: 'node_modules/**' }),
    ],
		output: {
			file: pkg.module,
			format: 'es',
			sourcemap: true,
		},
	}
];