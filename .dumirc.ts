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
    '@scxfe/ui': resolve(__dirname, 'packages/ui/src/index.ts'),
    '@scxfe/util': resolve(__dirname, 'packages/util/src/index.ts'),
    '@scxfe/hook': resolve(__dirname, 'packages/hook/src/index.ts'),
  },
  resolve: {
    docDirs: ['docs'],
    atomDirs: [
      {
        type: 'ui',
        dir: 'packages/ui/src',
      },
      {
        type: 'hook',
        dir: 'packages/hook/src',
      },
      {
        type: 'util',
        dir: 'packages/util/src',
      },
    ],
  },
});
