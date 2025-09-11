import { defineConfig } from 'dumi';
import { resolve } from 'path';

export default defineConfig({
  title: 'scxfe',
  themeConfig: {
    name: 'scxfe',
    lastUpdated: true,
    showLineNum: true,
  },
  outputPath: 'docs-dist',
  publicPath: '/',
  alias: {
    '@scxfe/react-ui': resolve(__dirname, 'packages/react-ui/src/index.ts'),
    '@scxfe/vue-ui': resolve(__dirname, 'packages/vue-ui/src/index.ts'),
    '@scxfe/util': resolve(__dirname, 'packages/util/src/index.ts'),
    '@scxfe/react-hooks': resolve(__dirname, 'packages/react-hooks/src/index.ts'),
    '@scxfe/vue-hooks': resolve(__dirname, 'packages/vue-hooks/src/index.ts'),
  },
  resolve: {
    docDirs: ['docs'],
    atomDirs: [
      {
        type: 'react-ui',
        dir: 'packages/react-ui/src',
      },
      {
        type: 'vue-ui',
        dir: 'packages/vue-ui/src',
      },
      {
        type: 'react-hooks',
        dir: 'packages/react-hooks/src',
      },
      {
        type: 'vue-hooks',
        dir: 'packages/vue-hooks/src',
      },
      {
        type: 'util',
        dir: 'packages/util/src',
      },
    ],
  },
});
