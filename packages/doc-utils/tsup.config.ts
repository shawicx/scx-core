import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  external: [
    '@scxfe/doc-schema',
    // Vue related
    'vue',
    '@vue/compiler-sfc',
    'vue/compiler-sfc',
    // Template engines (optional dependencies of Vue compiler)
    /^velocityjs$/,
    /^dustjs-linkedin$/,
    /^atpl$/,
    /^liquor$/,
    /^twig$/,
    /^ejs$/,
    /^eco$/,
    /^jazz$/,
    /^jqtpl$/,
    /^hamljs$/,
    /^handlebars$/,
    /^hogan.js$/,
    /^pug$/,
    /^rus$/,
    /^slm$/,
    /^marko$/,
    /^teacup/,
    /^coffee-script$/,
    /^squirrelly$/,
    /^twing$/,
  ],
  splitting: false,
  sourcemap: true,
  minify: true,
});
