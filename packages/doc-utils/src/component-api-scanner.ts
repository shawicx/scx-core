/**
 * 组件 API 扫描器
 *
 * 统一的 API 提取工具，支持 React 和 Vue 组件
 */

import type { ComponentMeta } from '@scxfe/doc-schema';
import { ReactApiExtractor, createReactApiExtractor } from './react-api-extractor';
import { VueApiExtractor, createVueApiExtractor } from './vue-api-extractor';

export interface ScannerOptions {
  /** 是否扫描子目录 */
  recursive?: boolean;
  /** 文件路径过滤器 */
  fileFilter?: (filePath: string) => boolean;
  /** 是否缓存提取结果 */
  cache?: boolean;
}

/**
 * 组件 API 扫描器
 */
export class ComponentApiScanner {
  private reactExtractor: ReactApiExtractor;
  private vueExtractor: VueApiExtractor;
  private cache = new Map<string, ComponentMeta>();

  constructor() {
    this.reactExtractor = createReactApiExtractor();
    this.vueExtractor = createVueApiExtractor();
  }

  /**
   * 从单个文件提取 API 信息
   */
  async extractFromFile(filePath: string): Promise<ComponentMeta | null> {
    try {
      // 检查缓存
      if (this.cache.has(filePath)) {
        return this.cache.get(filePath)!;
      }

      let componentMeta: ComponentMeta | null = null;

      // 尝试 React 提取器
      if (this.reactExtractor.isSupported(filePath)) {
        try {
          componentMeta = await this.reactExtractor.extractFromFilePath(filePath);
        } catch (error) {
          console.warn(`React extractor failed for ${filePath}:`, error);
        }
      }

      // 尝试 Vue 提取器
      if (!componentMeta && this.vueExtractor.isSupported(filePath)) {
        try {
          componentMeta = await this.vueExtractor.extractFromFilePath(filePath);
        } catch (error) {
          console.warn(`Vue extractor failed for ${filePath}:`, error);
        }
      }

      if (componentMeta) {
        this.cache.set(filePath, componentMeta);
        return componentMeta;
      }

      console.warn(`No suitable extractor found for ${filePath}`);
      return null;
    } catch (error) {
      console.error(`Failed to extract API from ${filePath}:`, error);
      return null;
    }
  }

  /**
   * 从源代码字符串提取 API 信息
   */
  async extractFromSource(source: string, fileName?: string): Promise<ComponentMeta | null> {
    try {
      // 猜测框架类型
      const isVue = fileName?.endsWith('.vue');
      const isReact = fileName
        ? /\.(tsx|jsx|ts|js)$/.test(fileName)
        : source.includes('export') || source.includes('React') || source.includes('jsx');

      if (isVue) {
        return await this.vueExtractor.extractFromSource(source, fileName);
      } else if (isReact) {
        return await this.reactExtractor.extractFromSource(source, fileName);
      } else {
        // 如果无法确定，两种都尝试
        try {
          return await this.reactExtractor.extractFromSource(source, fileName);
        } catch {
          try {
            return await this.vueExtractor.extractFromSource(source, fileName);
          } catch {
            throw new Error('Unable to determine component type and extract API');
          }
        }
      }
    } catch (error) {
      console.error('Failed to extract API from source:', error);
      return null;
    }
  }

  /**
   * 批量扫描目录中的组件
   */
  async scanDirectory(dirPath: string, options: ScannerOptions = {}): Promise<ComponentMeta[]> {
    const { recursive = true, fileFilter } = options;

    try {
      const fs = await import('fs/promises');
      const path = await import('path');

      const components: ComponentMeta[] = [];
      const entries = await fs.readdir(dirPath, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);

        if (entry.isDirectory() && recursive) {
          // 递归扫描子目录
          const subComponents = await this.scanDirectory(fullPath, options);
          components.push(...subComponents);
        } else if (entry.isFile()) {
          // 检查文件过滤器
          if (fileFilter && !fileFilter(fullPath)) {
            continue;
          }

          // 检查是否是支持的组件文件
          if (this.isComponentFile(fullPath)) {
            const componentMeta = await this.extractFromFile(fullPath);
            if (componentMeta) {
              components.push(componentMeta);
            }
          }
        }
      }

      return components;
    } catch (error) {
      console.error(`Failed to scan directory ${dirPath}:`, error);
      return [];
    }
  }

  /**
   * 批量扫描多个文件
   */
  async scanFiles(filePaths: string[]): Promise<ComponentMeta[]> {
    const components: ComponentMeta[] = [];

    for (const filePath of filePaths) {
      const componentMeta = await this.extractFromFile(filePath);
      if (componentMeta) {
        components.push(componentMeta);
      }
    }

    return components;
  }

  /**
   * 检查是否是组件文件
   */
  private isComponentFile(filePath: string): boolean {
    const fileName = filePath.toLowerCase();

    // 排除测试文件和文档文件
    if (
      fileName.includes('.test.') ||
      fileName.includes('.spec.') ||
      fileName.includes('.stories.') ||
      fileName.endsWith('.d.ts') ||
      fileName.includes('node_modules')
    ) {
      return false;
    }

    // React 组件
    if (/\.(tsx|jsx|ts|js)$/.test(fileName)) {
      return true;
    }

    // Vue 组件
    if (fileName.endsWith('.vue')) {
      return true;
    }

    return false;
  }

  /**
   * 清空缓存
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * 获取缓存统计
   */
  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }
}

/**
 * 默认文件过滤器
 */
export function createDefaultFileFilter(): (filePath: string) => boolean {
  const excludedPatterns = [
    /node_modules/,
    /\.test\./,
    /\.spec\./,
    /\.stories\./,
    /\.d\.ts$/,
    /__tests__/,
    /coverage/,
  ];

  return (filePath: string) => {
    return !excludedPatterns.some((pattern) => pattern.test(filePath));
  };
}

/**
 * 创建组件 API 扫描器实例
 */
export function createComponentApiScanner(): ComponentApiScanner {
  return new ComponentApiScanner();
}

/**
 * 便捷函数：从单个文件提取 API
 */
export async function extractComponentApi(filePath: string): Promise<ComponentMeta | null> {
  const scanner = createComponentApiScanner();
  return scanner.extractFromFile(filePath);
}

/**
 * 便捷函数：扫描目录中的所有组件 API
 */
export async function scanComponentApis(
  dirPath: string,
  options?: ScannerOptions,
): Promise<ComponentMeta[]> {
  const scanner = createComponentApiScanner();
  const fileFilter = options?.fileFilter || createDefaultFileFilter();
  return scanner.scanDirectory(dirPath, { ...options, fileFilter });
}
