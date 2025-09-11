/*
 * @Author: shawicx d35f3153@proton.me
 * @Description:
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

/**
 * 创建 Vue 库的 Vite 配置
 * @param {Object} options 配置选项
 * @param {string} options.entry 入口文件路径
 * @param {string} options.name 库名称
 * @param {Object} options.external 外部依赖
 * @param {string} options.tsconfig TypeScript 配置文件
 * @returns {Object} Vite 配置对象
 */
export function createViteConfig({
  entry = 'src/index.ts',
  name,
  external = {},
  tsconfig = 'tsconfig.json',
}) {
  return defineConfig({
    plugins: [
      vue(),
      dts({
        tsConfigFilePath: tsconfig,
        insertTypesEntry: true,
      }),
    ],
    build: {
      lib: {
        entry: resolve(process.cwd(), entry),
        name: name,
        formats: ['es', 'cjs'],
        fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
      },
      rollupOptions: {
        external: Object.keys(external),
        output: {
          globals: external,
          exports: 'named',
        },
      },
      sourcemap: true,
      cssCodeSplit: true,
    },
    resolve: {
      alias: {
        '@': resolve(process.cwd(), 'src'),
      },
    },
  });
}

// Vue 相关外部依赖
export const vueExternals = {
  vue: 'Vue',
  '@vue/runtime-core': 'Vue',
  '@vue/runtime-dom': 'Vue',
  '@vue/shared': 'Vue',
};
