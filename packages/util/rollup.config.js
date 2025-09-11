import { createRollupConfig } from '../../build-configs/rollup.config.base.js';

export default createRollupConfig({
  input: 'src/index.ts',
  name: 'SCXUtil', // UMD 全局变量名
  external: {
    // 工具库通常不需要外部依赖，打包进去
    // 如果有需要外部化的依赖，在这里配置
  },
  tsconfig: './tsconfig.json',
  includeUmd: true, // 工具库需要 UMD 格式
});
