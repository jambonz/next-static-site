import css from 'rollup-plugin-css-only';
import gzipPlugin from 'rollup-plugin-gzip';
import { babel } from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from "rollup-plugin-terser";
import resolve from '@rollup/plugin-node-resolve';

const configs = [
  // Unminified
  {
    input: './src/js/index.js',
    output: {
      file: 'build/index.js',
      format: 'cjs',
      sourcemap: true,
    },
    external: ['react'],
    plugins: [
      babel({
        exclude: 'node_modules/**',
      }),
    ],
  },

  // Minified and Gzipped
  {
    input: './src/js/index.js',
    output: {
      file: 'build/index.min.js',
      format: 'cjs',
    },
    external: ['react'],
    plugins: [
      babel({
        exclude: 'node_modules/**',
      }),
      terser(),
      gzipPlugin(),
    ],
  },
];

if (process.env.NODE_ENV === 'test') {
  configs.push({
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
  });
}

export default configs;
