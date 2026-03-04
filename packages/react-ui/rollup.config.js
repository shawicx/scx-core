import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';

export default defineConfig([
  // ESM build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'esm',
      sourcemap: true,
    },
    external: ['react', 'react-dom', 'react/jsx-runtime', '@scxfe/util', 'ahooks'],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
        sourceMap: true,
      }),
      postcss({
        extract: false,
        inject: true,
        minimize: true,
      }),
      terser(),
    ],
  },
  // CJS build
  {
    input: 'src/index.ts',
    output: {
      file: 'lib/index.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
    external: ['react', 'react-dom', 'react/jsx-runtime', '@scxfe/util', 'ahooks'],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
        sourceMap: true,
      }),
      postcss({
        extract: false,
        inject: true,
        minimize: true,
      }),
      terser(),
    ],
  },
]);
