import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  external: ['@scxfe/doc-schema', 'scxe'],
  splitting: false,
  sourcemap: true,
  minify: true,
});
