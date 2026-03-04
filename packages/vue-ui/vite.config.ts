import { createViteConfig, vueExternals } from '../../build-configs/vite.config.base.js';

export default createViteConfig({
  entry: 'src/index.ts',
  name: 'SCXVueUI',
  external: {
    ...vueExternals,
    '@scxfe/util': '@scxfe/util',
  },
  tsconfig: './tsconfig.json',
});
