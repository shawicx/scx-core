import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@repo': resolve(__dirname, '../../packages'),
      '@scxfe/doc-schema': resolve(__dirname, '../../packages/doc-schema/src'),
      '@scxfe/doc-utils': resolve(__dirname, '../../packages/doc-utils/src'),
      '@scxfe/docs-core': resolve(__dirname, '../../packages/docs-core/src'),
      '@scxfe/docs-ui-vue': resolve(__dirname, '../../packages/docs-ui-vue/src'),
      '@scxfe/vue-ui': resolve(__dirname, '../../packages/vue-ui/src'),
    },
  },
  server: {
    port: 3001,
    host: true,
  },
});
