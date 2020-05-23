import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import { argv } from 'yargs';

const isProduction = argv.prod === true;

import pkg from './package.json';

const files = [
	{
		input: 'src/index.js',
		output: {
			name: 'identifo-js',
			file: pkg.main,
			format: 'umd',
			sourcemap: true,
			exports: 'named',
		},
		plugins: [
			resolve({ browser: true }),
			commonjs(),
			json(),
			babel({ exclude: 'node_modules/**' }),
			isProduction && terser({
        compress: { warnings: false },
        output: { comments: false },
        mangle: false
      }),
		]
	},
	{
		input: 'src/index.js',
		external: ['idtoken-verifier'],
    plugins: [
			resolve({ browser: true }),
			commonjs(),
			json(),
			babel({ exclude: 'node_modules/**' }),
			isProduction && terser({
        compress: { warnings: false },
        output: { comments: false },
        mangle: false
      }),
    ],
		output: {
			file: pkg.module,
			format: 'es',
			sourcemap: true,
		},
	}
];

export default files;
