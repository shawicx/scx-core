import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@repo': path.resolve(__dirname, '../../packages'),
      '@scxfe/doc-schema': path.resolve(__dirname, '../../packages/doc-schema/src'),
      '@scxfe/doc-utils': path.resolve(__dirname, '../../packages/doc-utils/src'),
      '@scxfe/docs-core': path.resolve(__dirname, '../../packages/docs-core/src'),
      '@scxfe/docs-ui-react': path.resolve(__dirname, '../../packages/docs-ui-react/src'),
      '@scxfe/react-ui': path.resolve(__dirname, '../../packages/react-ui/src'),
    },
  },
  server: {
    port: 4200,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
