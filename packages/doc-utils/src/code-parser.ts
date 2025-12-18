/**
 * 代码解析工具 - 解析和分析源代码
 */

/**
 * 代码解析结果
 */
export interface CodeParseResult {
  /**
   * 代码语言
   */
  language: string;
  /**
   * 导入的模块
   */
  imports: ImportInfo[];
  /**
   * 导出的内容
   */
  exports: ExportInfo[];
  /**
   * 定义的内容
   */
  definitions: DefinitionInfo[];
  /**
   * 代码摘要
   */
  summary: string;
}

/**
 * 导入信息
 */
export interface ImportInfo {
  module: string;
  imports: string[];
  isDefault?: boolean;
  isType?: boolean;
  alias?: string;
}

/**
 * 导出信息
 */
export interface ExportInfo {
  name: string;
  isDefault?: boolean;
  isType?: boolean;
  source?: string;
}

/**
 * 定义信息
 */
export interface DefinitionInfo {
  name: string;
  type: 'function' | 'class' | 'interface' | 'type' | 'variable' | 'component';
  location: {
    line: number;
    column: number;
  };
  signature?: string;
  description?: string;
}

/**
 * 通用代码解析器
 */
export class CodeParser {
  /**
   * 解析代码字符串
   */
  parse(code: string, language?: string): CodeParseResult {
    const detectedLanguage = language || this.detectLanguage(code);

    switch (detectedLanguage) {
      case 'typescript':
      case 'javascript':
        return this.parseTypeScript(code, detectedLanguage);
      case 'vue':
        return this.parseVue(code);
      case 'jsx':
      case 'tsx':
        return this.parseJSX(code, detectedLanguage);
      default:
        return this.parseGeneric(code, detectedLanguage);
    }
  }

  /**
   * 检测代码语言
   */
  private detectLanguage(code: string): string {
    const trimmed = code.trim();

    // Vue 检测
    if (
      trimmed.startsWith('<template>') ||
      trimmed.includes('<script>') ||
      trimmed.includes('<style>')
    ) {
      return 'vue';
    }

    // JSX/TSX 检测
    if (/<\/?[a-zA-Z][^>]*>/.test(trimmed)) {
      return trimmed.includes('import') && trimmed.includes('from') ? 'tsx' : 'jsx';
    }

    // TypeScript 检测
    if ((trimmed.includes(': ') && trimmed.includes('interface ')) || trimmed.includes('type ')) {
      return 'typescript';
    }

    return 'javascript';
  }

  /**
   * 解析 TypeScript/JavaScript
   */
  private parseTypeScript(code: string, language: string): CodeParseResult {
    const imports = this.extractImports(code);
    const exports = this.extractExports(code);
    const definitions = this.extractDefinitions(code);
    const summary = this.generateSummary(code);

    return {
      language,
      imports,
      exports,
      definitions,
      summary,
    };
  }

  /**
   * 解析 Vue SFC
   */
  private parseVue(code: string): CodeParseResult {
    const imports: ImportInfo[] = [];
    const exports: ExportInfo[] = [];
    const definitions: DefinitionInfo[] = [];

    // 提取 script 块
    const scriptMatch = code.match(/<script[^>]*>([\s\S]*?)<\/script>/);
    if (scriptMatch) {
      const scriptContent = scriptMatch[1];
      imports.push(...this.extractImports(scriptContent));
      exports.push(...this.extractExports(scriptContent));
      definitions.push(...this.extractDefinitions(scriptContent));
    }

    // 提取 template 信息
    const templateMatch = code.match(/<template[^>]*>([\s\S]*?)<\/template>/);
    if (templateMatch) {
      // 可以添加模板解析逻辑
    }

    return {
      language: 'vue',
      imports,
      exports,
      definitions,
      summary: 'Vue Single File Component',
    };
  }

  /**
   * 解析 JSX/TSX
   */
  private parseJSX(code: string, language: string): CodeParseResult {
    const imports = this.extractImports(code);
    const exports = this.extractExports(code);
    const definitions = this.extractDefinitions(code);

    // JSX 特殊处理
    const jsxDefinitions = this.extractJSXComponents(code);
    definitions.push(...jsxDefinitions);

    return {
      language,
      imports,
      exports,
      definitions,
      summary: this.generateSummary(code),
    };
  }

  /**
   * 解析通用代码
   */
  private parseGeneric(code: string, language: string): CodeParseResult {
    return {
      language,
      imports: [],
      exports: [],
      definitions: [],
      summary: `Generic ${language} code`,
    };
  }

  /**
   * 提取导入信息
   */
  private extractImports(code: string): ImportInfo[] {
    const imports: ImportInfo[] = [];
    const importRegex =
      /import\s+(?:(?:\*\s+as\s+([^{}\s]+))|(?:(\{[^}]+\})\s+from\s+)?(?:([^{}\s]+)\s+from\s+)?)?['"]([^'"]+)['"]/g;

    let match;
    while ((match = importRegex.exec(code)) !== null) {
      const [full, namespaceImport, namedImports, defaultImport, module] = match;

      if (namedImports) {
        const names = namedImports
          .replace(/[{}]/g, '')
          .split(',')
          .map((s) => s.trim().split(' as ')[0]);
        imports.push({
          module,
          imports: names,
          isType: full.includes('import type'),
        });
      } else if (namespaceImport) {
        imports.push({
          module,
          imports: [namespaceImport],
          isDefault: true,
        });
      } else if (defaultImport) {
        imports.push({
          module,
          imports: [defaultImport],
          isDefault: true,
        });
      }
    }

    return imports;
  }

  /**
   * 提取导出信息
   */
  private extractExports(code: string): ExportInfo[] {
    const exports: ExportInfo[] = [];
    const exportRegex =
      /export\s+(?:(?:default\s+)?(?:class|function|interface|type|const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)|(?:\{([^}]+)\})\s+from\s+['"]([^'"]+)['"]|(?:default\s+)?([a-zA-Z_$][a-zA-Z0-9_$]*))/g;

    let match;
    while ((match = exportRegex.exec(code)) !== null) {
      const [full, namedExport, namedExportsFrom, fromModule, defaultExport] = match;

      if (namedExportsFrom && fromModule) {
        const names = namedExportsFrom.split(',').map((s) => s.trim().split(' as ')[0]);
        exports.push(
          ...names.map((name) => ({
            name,
            source: fromModule,
          })),
        );
      } else if (namedExport) {
        exports.push({
          name: namedExport,
          isDefault: full.includes('export default'),
        });
      } else if (defaultExport) {
        exports.push({
          name: defaultExport,
          isDefault: true,
        });
      }
    }

    return exports;
  }

  /**
   * 提取定义信息
   */
  private extractDefinitions(code: string): DefinitionInfo[] {
    const definitions: DefinitionInfo[] = [];
    const lines = code.split('\n');

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      // 函数定义
      const functionMatch = trimmed.match(
        /(?:export\s+)?(?:async\s+)?function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/,
      );
      if (functionMatch) {
        definitions.push({
          name: functionMatch[1],
          type: 'function',
          location: { line: index + 1, column: 0 },
          signature: trimmed,
        });
      }

      // 类定义
      const classMatch = trimmed.match(/(?:export\s+)?class\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/);
      if (classMatch) {
        definitions.push({
          name: classMatch[1],
          type: 'class',
          location: { line: index + 1, column: 0 },
          signature: trimmed,
        });
      }

      // 接口定义
      const interfaceMatch = trimmed.match(/(?:export\s+)?interface\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/);
      if (interfaceMatch) {
        definitions.push({
          name: interfaceMatch[1],
          type: 'interface',
          location: { line: index + 1, column: 0 },
          signature: trimmed,
        });
      }

      // 类型别名
      const typeMatch = trimmed.match(/(?:export\s+)?type\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/);
      if (typeMatch) {
        definitions.push({
          name: typeMatch[1],
          type: 'type',
          location: { line: index + 1, column: 0 },
          signature: trimmed,
        });
      }
    });

    return definitions;
  }

  /**
   * 提取 JSX 组件定义
   */
  private extractJSXComponents(code: string): DefinitionInfo[] {
    const components: DefinitionInfo[] = [];
    const lines = code.split('\n');

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      // React 组件定义
      const componentMatch = trimmed.match(
        /(?:export\s+)?(?:const|function)\s+([A-Z][a-zA-Z0-9_]*)\s*(?:=\s*\([^)]*\)\s*=>|\([^)]*\)\s*\{)/,
      );
      if (componentMatch) {
        components.push({
          name: componentMatch[1],
          type: 'component',
          location: { line: index + 1, column: 0 },
          signature: trimmed,
        });
      }
    });

    return components;
  }

  /**
   * 生成代码摘要
   */
  private generateSummary(code: string): string {
    const lines = code.split('\n').filter((line) => line.trim().length > 0);
    const functionCount = (code.match(/\bfunction\b/g) || []).length;
    const classCount = (code.match(/\bclass\b/g) || []).length;
    const interfaceCount = (code.match(/\binterface\b/g) || []).length;

    const parts = [];
    if (functionCount > 0) parts.push(`${functionCount} functions`);
    if (classCount > 0) parts.push(`${classCount} classes`);
    if (interfaceCount > 0) parts.push(`${interfaceCount} interfaces`);
    if (parts.length === 0) parts.push(`${lines.length} lines`);

    return `Code with ${parts.join(', ')}`;
  }
}
