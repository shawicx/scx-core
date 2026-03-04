import { createTsupConfig, vueExternals } from '../../build-configs/tsup.config.base.js';

export default createTsupConfig({
  entry: 'src/index.ts',
  external: [...vueExternals, '@scxfe/util'],
  tsconfig: './tsconfig.json',
  dts: false, // 暂时禁用类型声明生成以解决构建问题
});
