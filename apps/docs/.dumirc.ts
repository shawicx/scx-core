import { defineConfig } from 'dumi';
import { resolve } from 'path';

export default defineConfig({
  title: 'SCX Core',
  themeConfig: {
    name: 'SCX Core',
    lastUpdated: true,
    showLineNum: true,
  },
  outputPath: 'docs-dist',
  publicPath: '/',
  alias: {
    '@scxfe/constants': resolve(__dirname, '../../packages/constants/src/index.ts'),
    '@scxfe/react-ui': resolve(__dirname, '../../packages/react-ui/src/index.ts'),
    '@scxfe/vue-ui': resolve(__dirname, '../../packages/vue-ui/src/index.ts'),
    '@scxfe/util': resolve(__dirname, '../../packages/util/src/index.ts'),
    '@scxfe/react-hooks': resolve(__dirname, '../../packages/react-hooks/src/index.ts'),
    '@scxfe/vue-hooks': resolve(__dirname, '../../packages/vue-hooks/src/index.ts'),
  },
  resolve: {
    docDirs: ['.'],
    atomDirs: [],
  },
});
