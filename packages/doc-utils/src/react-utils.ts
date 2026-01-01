/**
 * React 工具 - React 组件专用工具函数
 */

import type { ComponentMeta, PropMeta, EventMeta } from '@scxfe/doc-schema';

/**
 * React 组件解析结果
 */
export interface ReactComponentParseResult {
  /**
   * 组件名称
   */
  name: string;
  /**
   * 组件类型
   */
  type: 'function' | 'class' | 'forwardRef' | 'memo';
  /**
   * 属性接口
   */
  propsInterface?: ReactPropsInterface;
  /**
   * 导入信息
   */
  imports: ReactImportInfo[];
  /**
   * 导出信息
   */
  exports: ReactExportInfo[];
  /**
   * JSDoc 注释
   */
  jsdoc?: JSDocInfo;
}

/**
 * React 属性接口
 */
export interface ReactPropsInterface {
  name: string;
  properties: ReactProperty[];
  extends?: string;
}

/**
 * React 属性定义
 */
export interface ReactProperty {
  name: string;
  type: string;
  optional: boolean;
  defaultValue?: string;
  description?: string;
  deprecated?: boolean;
}

/**
 * React 导入信息
 */
export interface ReactImportInfo {
  module: string;
  imports: string[];
  isDefault?: boolean;
  isType?: boolean;
}

/**
 * React 导出信息
 */
export interface ReactExportInfo {
  name: string;
  isDefault?: boolean;
  isType?: boolean;
}

/**
 * JSDoc 信息
 */
export interface JSDocInfo {
  description?: string;
  examples?: string[];
  deprecated?: string;
  see?: string[];
}

/**
 * React 组件解析器
 */
export class ReactComponentParser {
  /**
   * 解析 React 组件源代码
   */
  parse(source: string, fileName?: string): ReactComponentParseResult {
    const lines = source.split('\n');
    const imports = this.extractImports(source);
    const exports = this.extractExports(source);
    const componentDefinition = this.findComponentDefinition(source, lines);
    const propsInterface = this.extractPropsInterface(source);
    const jsdoc = this.extractJSDoc(source, componentDefinition?.line);

    return {
      name: componentDefinition?.name || this.extractNameFromFileName(fileName),
      type: componentDefinition?.type || 'function',
      propsInterface,
      imports,
      exports,
      jsdoc,
    };
  }

  /**
   * 提取导入信息
   */
  private extractImports(source: string): ReactImportInfo[] {
    const imports: ReactImportInfo[] = [];
    const importRegex =
      /import\s+(?:(?:\*\s+as\s+([^{}\s]+))|(?:(\{[^}]+\})\s+from\s+)?(?:([^{}\s]+)\s+from\s+)?)?['"]([^'"]+)['"]/g;

    let match;
    while ((match = importRegex.exec(source)) !== null) {
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
  private extractExports(source: string): ReactExportInfo[] {
    const exports: ReactExportInfo[] = [];
    const exportRegex =
      /export\s+(?:(?:default\s+)?(?:class|function|const|let|var|interface|type)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)|(?:\{([^}]+)\})\s+from\s+['"]([^'"]+)['"]|(?:default\s+)?([a-zA-Z_$][a-zA-Z0-9_$]*))/g;

    let match;
    while ((match = exportRegex.exec(source)) !== null) {
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
   * 查找组件定义
   */
  private findComponentDefinition(
    _source: string,
    lines: string[],
  ): { name: string; type: ReactComponentParseResult['type']; line: number } | undefined {
    const patterns = [
      // 函数组件
      /(?:export\s+)?(?:const|function)\s+([A-Z][a-zA-Z0-9_]*)\s*(?:=\s*\([^)]*\)\s*=>|\([^)]*\)\s*\{)/,
      // forwardRef 组件
      /(?:export\s+)?const\s+([A-Z][a-zA-Z0-9_]*)\s*=\s*React\.forwardRef/,
      // memo 组件
      /(?:export\s+)?const\s+([A-Z][a-zA-Z0-9_]*)\s*=\s*React\.memo/,
      // 类组件
      /(?:export\s+)?class\s+([A-Z][a-zA-Z0-9_]*)\s*extends\s+(?:React\.)?Component/,
    ];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      for (let j = 0; j < patterns.length; j++) {
        const match = line.match(patterns[j]);
        if (match) {
          const type = j === 0 ? 'function' : j === 1 ? 'forwardRef' : j === 2 ? 'memo' : 'class';
          return {
            name: match[1],
            type,
            line: i + 1,
          };
        }
      }
    }

    return undefined;
  }

  /**
   * 提取属性接口
   */
  private extractPropsInterface(source: string): ReactPropsInterface | undefined {
    // 查找 Props 接口定义
    const interfacePatterns = [
      /interface\s+(\w*Props)\s*<[^>]*>\s*\{([^}]+)\}/,
      /interface\s+(\w*Props)\s*\{([^}]+)\}/,
      /type\s+(\w*Props)\s*=\s*\{([^}]+)\}/,
    ];

    for (const pattern of interfacePatterns) {
      const match = source.match(pattern);
      if (match) {
        const properties = this.parseInterfaceProperties(match[2]);
        return {
          name: match[1],
          properties,
          extends: this.extractExtends(match[0]),
        };
      }
    }

    return undefined;
  }

  /**
   * 解析接口属性
   */
  private parseInterfaceProperties(interfaceBody: string): ReactProperty[] {
    const properties: ReactProperty[] = [];
    const propertyRegex = /(\w+)(\??):\s*([^;]+);?(?:\s*\/\*\*\s*([^*]+)\s*\*\/)?/g;

    let match;
    while ((match = propertyRegex.exec(interfaceBody)) !== null) {
      const [_, name, optional, type, description] = match;

      properties.push({
        name,
        type: type.trim(),
        optional: optional === '?',
        description: description?.trim(),
      });
    }

    return properties;
  }

  /**
   * 提取继承信息
   */
  private extractExtends(interfaceDeclaration: string): string | undefined {
    const extendsMatch = interfaceDeclaration.match(/extends\s+([^\s{]+)/);
    return extendsMatch?.[1];
  }

  /**
   * 提取 JSDoc 注释
   */
  private extractJSDoc(source: string, line?: number): JSDocInfo | undefined {
    if (!line) return undefined;

    const lines = source.split('\n');
    let jsdocLines: string[] = [];

    // 从组件定义行向上查找 JSDoc 注释
    for (let i = line - 2; i >= 0; i--) {
      const currentLine = lines[i].trim();

      if (currentLine.startsWith('/**')) {
        jsdocLines.unshift(currentLine);
        break;
      } else if (currentLine.startsWith('*') || currentLine.startsWith('*/')) {
        jsdocLines.unshift(currentLine);
      } else {
        break;
      }
    }

    if (jsdocLines.length === 0) return undefined;

    const jsdocText = jsdocLines.join('\n');
    const description = this.extractJSDocDescription(jsdocText);
    const examples = this.extractJSDocExamples(jsdocText);
    const deprecated = this.extractJSDocDeprecated(jsdocText);
    const see = this.extractJSDocSee(jsdocText);

    return {
      description,
      examples,
      deprecated,
      see,
    };
  }

  /**
   * 提取 JSDoc 描述
   */
  private extractJSDocDescription(jsdoc: string): string | undefined {
    const descriptionMatch = jsdoc.match(/\/\*\*\s*\*\s*([^@*]+)/);
    return descriptionMatch?.[1]?.trim();
  }

  /**
   * 提取 JSDoc 示例
   */
  private extractJSDocExamples(jsdoc: string): string[] {
    const examples: string[] = [];
    const exampleMatches = jsdoc.matchAll(/@example\s+([^@*]+)/g);

    for (const match of exampleMatches) {
      examples.push(match[1].trim());
    }

    return examples;
  }

  /**
   * 提取 JSDoc 废弃信息
   */
  private extractJSDocDeprecated(jsdoc: string): string | undefined {
    const deprecatedMatch = jsdoc.match(/@deprecated\s+([^@*]+)/);
    return deprecatedMatch?.[1]?.trim();
  }

  /**
   * 提取 JSDoc 参考信息
   */
  private extractJSDocSee(jsdoc: string): string[] {
    const see: string[] = [];
    const seeMatches = jsdoc.matchAll(/@see\s+([^@*]+)/g);

    for (const match of seeMatches) {
      see.push(match[1].trim());
    }

    return see;
  }

  /**
   * 从文件名提取组件名称
   */
  private extractNameFromFileName(fileName?: string): string {
    if (!fileName) return 'UnknownComponent';

    const basename = fileName.split('/').pop()?.split('.')[0];
    if (!basename) return 'UnknownComponent';

    return basename;
  }
}

/**
 * React 组件元数据提取器
 */
export class ReactComponentMetaExtractor {
  private parser = new ReactComponentParser();

  /**
   * 从 React 组件源代码提取元数据
   */
  extractFromSource(source: string, fileName?: string): ComponentMeta {
    const component = this.parser.parse(source, fileName);

    // 转换属性
    const props = this.convertProps(component.propsInterface?.properties || []);

    // React 组件通常通过回调函数处理事件，而不是显式的事件定义
    const events = this.extractEventsFromProps(props);

    return {
      name: component.name,
      props,
      events,
      slots: [], // React 不使用插槽概念
    };
  }

  /**
   * 转换属性定义
   */
  private convertProps(properties: ReactProperty[]): PropMeta[] {
    return properties.map((prop) => ({
      name: prop.name,
      type: { name: this.simplifyType(prop.type) },
      required: !prop.optional,
      default: prop.defaultValue,
      description: prop.description,
    }));
  }

  /**
   * 从属性中提取事件
   */
  private extractEventsFromProps(props: PropMeta[]): EventMeta[] {
    return props
      .filter((prop) => prop.name.startsWith('on') && prop.type.name === 'Function')
      .map((prop) => ({
        name: prop.name,
        description: `Called when ${prop.name.slice(2).toLowerCase()} event occurs`,
      }));
  }

  /**
   * 简化类型字符串
   */
  private simplifyType(type: string): string {
    // 移除复杂的泛型语法，只保留主要类型
    return type
      .replace(/<[^>]+>/g, '')
      .replace(/\s*\|\s*/g, ' | ')
      .replace(/\s*&\s*/g, ' & ')
      .trim();
  }
}

/**
 * React Demo 组件生成器
 */
export class ReactDemoGenerator {
  /**
   * 生成基础 Demo 模板
   */
  generateBasicDemo(componentName: string, props: Record<string, any> = {}): string {
    const propsStr = Object.entries(props)
      .map(([key, value]) => {
        if (typeof value === 'string') {
          return `      ${key}="${value}"`;
        } else if (typeof value === 'boolean') {
          return `      ${key}={${value}}`;
        } else {
          return `      ${key}={${JSON.stringify(value)}}`;
        }
      })
      .join('\n');

    return `import React from 'react'
import { ${componentName} } from './${componentName}'

export default function BasicDemo() {
  return (
    <div className="demo-container">
      <${componentName}${propsStr ? '\n' + propsStr + '\n' : ''}    />
    </div>
  )
}

const styles = \`
.demo-container {
  padding: 16px;
}
\`;`;
  }

  /**
   * 生成交互式 Demo 模板
   */
  generateInteractiveDemo(componentName: string, interactiveProps: string[]): string {
    const stateDeclarations = interactiveProps
      .map(
        (prop) =>
          `  const [${prop}, set${prop.charAt(0).toUpperCase() + prop.slice(1)}] = useState(${this.getDefaultValue(prop)})`,
      )
      .join('\n');

    const propsBinding = interactiveProps.map((prop) => `      ${prop}={${prop}}`).join('\n');

    const controls = interactiveProps
      .map((prop) => {
        const setterName = `set${prop.charAt(0).toUpperCase() + prop.slice(1)}`;
        const inputType = this.getInputType(prop);

        if (inputType === 'checkbox') {
          return `        <label>
          ${prop}:
          <input
            type="checkbox"
            checked={${prop}}
            onChange={(e) => ${setterName}(e.target.checked)}
          />
        </label>`;
        } else if (inputType === 'number') {
          return `        <label>
          ${prop}:
          <input
            type="number"
            value={${prop}}
            onChange={(e) => ${setterName}(Number(e.target.value))}
          />
        </label>`;
        } else {
          return `        <label>
          ${prop}:
          <input
            type="text"
            value={${prop}}
            onChange={(e) => ${setterName}(e.target.value)}
          />
        </label>`;
        }
      })
      .join('\n');

    return `import React, { useState } from 'react'
import { ${componentName} } from './${componentName}'

export default function InteractiveDemo() {
${stateDeclarations}

  return (
    <div className="demo-container">
      <${componentName}
${propsBinding}
      />

      <div className="demo-controls">
${controls}
      </div>
    </div>
  )
}

const styles = \`
.demo-container {
  padding: 16px;
}

.demo-controls {
  margin-top: 16px;
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 4px;
}

.demo-controls label {
  display: block;
  margin-bottom: 8px;
}

.demo-controls input {
  margin-left: 8px;
}
\`;`;
  }

  private getDefaultValue(propName: string): any {
    // 根据属性名推断默认值
    if (propName.includes('disabled') || propName.includes('checked')) {
      return false;
    }
    if (propName.includes('count') || propName.includes('size')) {
      return 1;
    }
    if (propName.includes('text') || propName.includes('title') || propName.includes('label')) {
      return '""';
    }
    return 'null';
  }

  private getInputType(propName: string): string {
    if (propName.includes('disabled') || propName.includes('checked')) {
      return 'checkbox';
    }
    if (propName.includes('count') || propName.includes('size')) {
      return 'number';
    }
    return 'text';
  }
}
