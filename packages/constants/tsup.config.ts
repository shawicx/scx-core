import { createTsupConfig } from '../../build-configs/tsup.config.base.js';

export default createTsupConfig({
  entry: 'src/index.ts',
  external: [],
  tsconfig: './tsconfig.json',
  dts: true,
});
