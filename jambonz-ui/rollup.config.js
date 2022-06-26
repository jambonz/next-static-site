import css from 'rollup-plugin-css-only';
import { babel } from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

export default [
  {
    input: './src/js/index.js',
    output: {
      file: 'build/index.js',
      format: 'cjs',
    },
    external: ['react'],
    plugins: [
      babel({
        exclude: 'node_modules/**',
      }),
    ],
  },

  {
    input: './test-app/app.js',
    output: {
      file: './test-app/dist/app.js',
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
      css({ output: 'styles.css' })
    ],
  },
];
