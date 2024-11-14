import { defineConfig } from 'dumi';
import { resolve } from 'path';

export default defineConfig({
  title: 'shawbox',
  themeConfig: {
    name: 'shawbox',
    lastUpdated: true,
    showLineNum: true,
  },
  outputPath: 'docs-dist',
  publicPath: '/',
  alias: {
    '@shawbox/ui': resolve(__dirname, 'packages/ui/src/index.ts'),
    '@shawbox/util': resolve(__dirname, 'packages/util/src/index.ts'),
    '@shawbox/hook': resolve(__dirname, 'packages/hook/src/index.ts'),
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
