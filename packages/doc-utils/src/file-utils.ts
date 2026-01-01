/**
 * 文件工具 - 文件系统操作相关工具
 */

import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, extname, basename, relative } from 'path';

/**
 * 文件信息
 */
export interface FileInfo {
  /**
   * 文件路径
   */
  path: string;
  /**
   * 文件名
   */
  name: string;
  /**
   * 文件扩展名
   */
  extension: string;
  /**
   * 文件大小（字节）
   */
  size: number;
  /**
   * 是否为目录
   */
  isDirectory: boolean;
  /**
   * 最后修改时间
   */
  lastModified: Date;
}

/**
 * 目录遍历选项
 */
export interface DirectoryTraversalOptions {
  /**
   * 最大递归深度
   */
  maxDepth?: number;
  /**
   * 是否包含隐藏文件
   */
  includeHidden?: boolean;
  /**
   * 文件过滤器
   */
  filter?: (file: FileInfo) => boolean;
  /**
   * 扩展名过滤器
   */
  extensions?: string[];
}

/**
 * 文件扫描器
 */
export class FileScanner {
  /**
   * 扫描目录
   */
  scanDirectory(dirPath: string, options: DirectoryTraversalOptions = {}): FileInfo[] {
    const { maxDepth = Infinity, includeHidden = false, filter, extensions = [] } = options;

    const result: FileInfo[] = [];
    this.scanDirectoryRecursive(
      dirPath,
      dirPath,
      result,
      0,
      maxDepth,
      includeHidden,
      filter,
      extensions,
    );

    return result;
  }

  /**
   * 递归扫描目录
   */
  private scanDirectoryRecursive(
    rootPath: string,
    currentPath: string,
    result: FileInfo[],
    currentDepth: number,
    maxDepth: number,
    includeHidden: boolean,
    filter?: (file: FileInfo) => boolean,
    extensions: string[] = [],
  ): void {
    if (currentDepth > maxDepth) return;

    try {
      const items = readdirSync(currentPath);

      for (const item of items) {
        // 跳过隐藏文件
        if (!includeHidden && item.startsWith('.')) {
          continue;
        }

        const itemPath = join(currentPath, item);
        const stats = statSync(itemPath);

        const fileInfo: FileInfo = {
          path: itemPath,
          name: item,
          extension: extname(item),
          size: stats.size,
          isDirectory: stats.isDirectory(),
          lastModified: stats.mtime,
        };

        // 应用扩展名过滤器
        if (extensions.length > 0 && !extensions.includes(fileInfo.extension)) {
          continue;
        }

        // 应用自定义过滤器
        if (filter && !filter(fileInfo)) {
          continue;
        }

        result.push(fileInfo);

        // 递归处理子目录
        if (fileInfo.isDirectory) {
          this.scanDirectoryRecursive(
            rootPath,
            itemPath,
            result,
            currentDepth + 1,
            maxDepth,
            includeHidden,
            filter,
            extensions,
          );
        }
      }
    } catch {
      // Failed to scan directory, skip
    }
  }

  /**
   * 查找匹配的文件
   */
  findFiles(dirPath: string, pattern: RegExp, options: DirectoryTraversalOptions = {}): FileInfo[] {
    const files = this.scanDirectory(dirPath, options);
    return files.filter((file) => pattern.test(file.name) || pattern.test(file.path));
  }

  /**
   * 查找组件文件
   */
  findComponentFiles(dirPath: string): FileInfo[] {
    const componentExtensions = ['.tsx', '.jsx', '.vue'];
    const componentPattern = /^[A-Z][a-zA-Z0-9]*\.(tsx|jsx|vue)$/;

    return this.scanDirectory(dirPath, {
      extensions: componentExtensions,
      filter: (file) => !file.isDirectory && componentPattern.test(file.name),
    });
  }
}

/**
 * 文件读取器
 */
export class FileReader {
  /**
   * 读取文件内容
   */
  readFileSync(filePath: string): string {
    try {
      return readFileSync(filePath, 'utf-8');
    } catch (error) {
      throw new Error(`Failed to read file: ${filePath}. ${String(error)}`);
    }
  }

  /**
   * 安全读取文件内容（文件不存在时返回空字符串）
   */
  safeReadFileSync(filePath: string): string {
    if (!existsSync(filePath)) {
      return '';
    }

    try {
      return readFileSync(filePath, 'utf-8');
    } catch {
      // Failed to read file, return empty string
      return '';
    }
  }

  /**
   * 读取 JSON 文件
   */
  readJSONSync<T = any>(filePath: string): T {
    const content = this.readFileSync(filePath);
    return JSON.parse(content) as T;
  }

  /**
   * 安全读取 JSON 文件
   */
  safeReadJSONSync<T = any>(filePath: string, defaultValue: T): T {
    try {
      const content = this.safeReadFileSync(filePath);
      if (!content) return defaultValue;

      return JSON.parse(content) as T;
    } catch {
      // Failed to parse JSON file, return default value
      return defaultValue;
    }
  }
}

/**
 * 路径工具
 */
export class PathUtils {
  /**
   * 规范化路径分隔符
   */
  normalizePath(path: string): string {
    return path.replace(/\\/g, '/');
  }

  /**
   * 获取相对路径
   */
  getRelativePath(from: string, to: string): string {
    return this.normalizePath(relative(from, to));
  }

  /**
   * 解析文件扩展名
   */
  parseExtension(fileName: string): { base: string; ext: string; fullExt: string } {
    const ext = extname(fileName);
    const base = basename(fileName, ext);
    const fullExt = ext.toLowerCase();

    return { base, ext: fullExt, fullExt };
  }

  /**
   * 获取文件语言类型
   */
  getLanguageFromExtension(extension: string): string {
    const languageMap: Record<string, string> = {
      '.ts': 'typescript',
      '.tsx': 'typescript',
      '.js': 'javascript',
      '.jsx': 'javascript',
      '.vue': 'vue',
      '.md': 'markdown',
      '.mdx': 'mdx',
      '.json': 'json',
      '.css': 'css',
      '.scss': 'scss',
      '.sass': 'sass',
      '.less': 'less',
      '.styl': 'stylus',
    };

    return languageMap[extension.toLowerCase()] || 'text';
  }

  /**
   * 检查是否为组件文件
   */
  isComponentFile(fileName: string): boolean {
    const componentExtensions = ['.tsx', '.jsx', '.vue'];
    const extension = extname(fileName).toLowerCase();

    if (!componentExtensions.includes(extension)) {
      return false;
    }

    // 检查文件名是否符合组件命名规范（PascalCase）
    const baseName = basename(fileName, extension);
    return /^[A-Z][a-zA-Z0-9]*$/.test(baseName);
  }

  /**
   * 检查是否为文档文件
   */
  isDocumentationFile(fileName: string): boolean {
    const docExtensions = ['.md', '.mdx'];
    const extension = extname(fileName).toLowerCase();

    return docExtensions.includes(extension);
  }

  /**
   * 检查是否为测试文件
   */
  isTestFile(fileName: string): boolean {
    const baseName = basename(fileName);
    const extension = extname(fileName).toLowerCase();

    return (
      (baseName.includes('.test.') ||
        baseName.includes('.spec.') ||
        baseName.startsWith('test-') ||
        baseName.startsWith('spec-')) &&
      ['.ts', '.tsx', '.js', '.jsx'].includes(extension)
    );
  }
}

/**
 * 文件监视器接口
 */
export interface FileWatcher {
  watch(
    paths: string[],
    callback: (event: 'add' | 'change' | 'unlink', path: string) => void,
  ): void;
  unwatch(paths: string[]): void;
  close(): void;
}

/**
 * 文件缓存
 */
export class FileCache {
  private cache = new Map<string, { content: string; lastModified: Date }>();
  private fileReader = new FileReader();

  /**
   * 获取文件内容（带缓存）
   */
  getFile(filePath: string): string {
    const cached = this.cache.get(filePath);
    const currentLastModified = new Date();

    if (cached && cached.lastModified >= currentLastModified) {
      return cached.content;
    }

    const content = this.fileReader.safeReadFileSync(filePath);
    this.cache.set(filePath, { content, lastModified: currentLastModified });

    return content;
  }

  /**
   * 清除文件缓存
   */
  clearFile(filePath: string): void {
    this.cache.delete(filePath);
  }

  /**
   * 清除所有缓存
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * 获取缓存统计信息
   */
  getStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }
}
