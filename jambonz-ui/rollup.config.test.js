import { babel } from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: './test/test.js',
  output: {
    file: './test/dist/test.js',
    format: 'iife',
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    resolve(),
    commonjs(),
  ],
};
