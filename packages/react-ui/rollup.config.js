import { createRollupConfig, commonExternals } from '../../build-configs/rollup.config.base.js';
import postcss from 'rollup-plugin-postcss';

const configs = createRollupConfig({
  input: 'src/index.ts',
  name: 'SCXReactUI',
  external: {
    ...commonExternals,
    '@scxfe/util': '@scxfe/util',
    ahooks: 'ahooks',
  },
  tsconfig: './tsconfig.json',
  includeUmd: false, // React UI 组件库通常不需要 UMD
});

// 为每个配置添加 PostCSS 插件处理样式
configs.forEach((config) => {
  if (config.plugins) {
    config.plugins.unshift(
      postcss({
        extract: true, // 提取 CSS 到单独文件
        minimize: true,
        modules: false,
        plugins: [],
      }),
    );
  }
});

export default configs;
