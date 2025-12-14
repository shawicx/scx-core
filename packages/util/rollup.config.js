import { createRollupConfig, commonExternals } from '../../build-configs/rollup.config.base.js';

export default createRollupConfig({
  input: 'src/index.ts',
  name: 'SCXUtil', // UMD 全局变量名
  external: {
    axios: 'axios',
  },
  tsconfig: './tsconfig.json',
  includeUmd: true, // 工具库需要 UMD 格式
});
