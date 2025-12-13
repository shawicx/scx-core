import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import { dts } from 'rollup-plugin-dts';

/**
 * 创建基础 Rollup 配置
 * @param {Object} options 配置选项
 * @param {string} options.input 入口文件
 * @param {string} options.name UMD 全局变量名
 * @param {Object} options.external 外部依赖
 * @param {string} options.tsconfig TypeScript 配置文件路径
 * @param {boolean} options.includeUmd 是否包含 UMD 格式
 * @returns {Array} Rollup 配置数组
 */
export function createRollupConfig({
  input = 'src/index.ts',
  name,
  external = {},
  tsconfig = 'tsconfig.json',
  includeUmd = true,
}) {
  const configs = [];

  // ESM & CJS 配置
  configs.push({
    input,
    output: [
      {
        file: 'dist/index.js',
        format: 'esm',
        sourcemap: true,
      },
      {
        file: 'lib/index.js',
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
    ],
    external: Object.keys(external),
    plugins: [
      resolve({
        preferBuiltins: true,
      }),
      commonjs(),
      typescript({
        tsconfig,
        declaration: false, // 类型声明单独生成
        declarationMap: false,
        outDir: undefined, // 避免与 Rollup 的输出目录冲突
        sourceMap: true, // 启用源映射
      }),
      terser(),
    ],
  });

  // UMD 配置（如果需要）
  if (includeUmd && name) {
    configs.push({
      input,
      output: {
        file: 'umd/index.js',
        format: 'umd',
        name,
        sourcemap: true,
        globals: external,
      },
      external: Object.keys(external),
      plugins: [
        resolve({
          preferBuiltins: true,
        }),
        commonjs(),
        typescript({
          tsconfig,
          declaration: false,
          declarationMap: false,
          outDir: undefined, // 避免与 Rollup 的输出目录冲突
          sourceMap: true, // 启用源映射
        }),
        terser(),
      ],
    });
  }

  // 类型声明配置
  configs.push({
    input,
    output: {
      file: 'dist/index.d.ts',
      format: 'esm',
    },
    plugins: [dts({ tsconfig })],
    external: Object.keys(external),
  });

  return configs;
}

// 通用外部依赖配置
export const commonExternals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'react/jsx-runtime': 'react/jsx-runtime',
  vue: 'Vue',
  '@vue/runtime-core': 'Vue',
  '@vue/runtime-dom': 'Vue',
};
