import { defineConfig } from 'dumi';
import { resolve } from 'path';

export default defineConfig({
  title: 'scxfe',
  themeConfig: {
    name: 'scxfe',
    lastUpdated: true,
    showLineNum: true,
  },
  // mako: {},
  // ssr: { builder: 'mako' },
  outputPath: 'docs-dist',
  publicPath: '/',
  alias: {
    '@scxfe/constants': resolve(__dirname, 'packages/constants/src/index.ts'),
    '@scxfe/vue-ui': resolve(__dirname, 'packages/vue-ui/src/index.ts'),
    '@scxfe/util': resolve(__dirname, 'packages/util/src/index.ts'),
    '@scxfe/react-hooks': resolve(__dirname, 'packages/react-hooks/src/index.ts'),
    '@scxfe/vue-hooks': resolve(__dirname, 'packages/vue-hooks/src/index.ts'),
  },
  resolve: {
    docDirs: ['docs'],
    atomDirs: [
      {
        type: 'constants',
        dir: 'packages/constants/src',
      },
      {
        type: 'util',
        dir: 'packages/util/src',
      },
    ],
  },
});
