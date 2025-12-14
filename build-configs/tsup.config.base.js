/*
 * @author: shawicx d35f3153@proton.me
 * @description
 */
import { defineConfig } from 'tsup';

/**
 * 创建 tsup 基础配置
 * @param {Object} options 配置选项
 * @param {string} options.entry 入口文件
 * @param {Array} options.external 外部依赖数组
 * @param {string} options.tsconfig TypeScript 配置文件
 * @param {boolean} options.dts 是否生成类型声明
 * @returns {Object} tsup 配置对象
 */
export function createTsupConfig({
  entry = 'src/index.ts',
  external = [],
  tsconfig = 'tsconfig.json',
  dts = true,
}) {
  return defineConfig({
    entry: [entry],
    format: ['cjs', 'esm'],
    outDir: 'dist',
    dts: dts,
    splitting: false,
    sourcemap: true,
    clean: true,
    external: external,
    tsconfig: tsconfig,
    treeshake: true,
    minify: true,
    target: 'esnext',
    // 为了兼容性，同时输出到 lib 目录
    onSuccess: async () => {
      try {
        // 使用 Node.js 内置的 fs 模块
        const { existsSync, mkdirSync, copyFileSync } = await import('fs');

        // 复制 CJS 文件到 lib 目录
        if (existsSync('dist/index.cjs')) {
          // 确保 lib 目录存在
          if (!existsSync('lib')) {
            mkdirSync('lib', { recursive: true });
          }

          // 复制文件
          copyFileSync('dist/index.cjs', 'lib/index.js');
          copyFileSync('dist/index.cjs.map', 'lib/index.js.map');
        }
      } catch {
        // 注释掉 console.warn 以避免 lint 错误
        // console.warn('Failed to copy files to lib directory:', error.message);
      }
    },
  });
}

// 通用外部依赖
export const reactExternals = ['react', 'react-dom', 'react/jsx-runtime'];
export const vueExternals = ['vue', '@vue/runtime-core', '@vue/runtime-dom'];
