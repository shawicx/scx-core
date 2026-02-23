/**
 * @description tsup 配置基础配置的类型声明
 */
import { defineConfig } from 'tsup';

export interface TsupConfigOptions {
  entry: string | string[];
  external: string[];
  tsconfig: string;
  dts: boolean;
}

export function createTsupConfig({
  entry,
  external = [],
  tsconfig = 'tsconfig.json',
  dts = true,
}: TsupConfigOptions): ReturnType<typeof defineConfig> {
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
  });
}

export const reactExternals = ['react', 'react-dom', 'react/jsx-runtime'];
export const vueExternals = ['vue', '@vue/runtime-core', '@vue/runtime-dom'];
