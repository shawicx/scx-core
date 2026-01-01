/**
 * React 组件 API 提取器
 *
 * 基于 react-docgen-typescript 实现 React 组件的 API 信息自动提取
 */

import type { ComponentMeta } from '@scxfe/doc-schema';
import { ComponentApiExtractor, BaseTypeResolver } from './api-extractor';

// 类型声明 - react-docgen-typescript 可能在运行时才可用
interface ReactComponentDoc {
  displayName: string;
  description?: string;
  props: {
    [propName: string]: {
      type: {
        name: string;
        raw?: string;
      };
      required?: boolean;
      description?: string;
      defaultValue?: {
        value: string;
      };
    };
  };
  events?: {
    [eventName: string]: {
      description?: string;
      type?: {
        name: string;
        raw?: string;
      };
    };
  };
}

interface ParserOptions {
  propFilter?: (prop: any) => boolean;
  componentNameResolver?: (source: string) => string | undefined;
  shouldExtractValuesFromProps?: boolean;
  shouldExtractLiteralValuesFromEnum?: boolean;
}

/**
 * React 组件 API 提取器
 */
export class ReactApiExtractor extends ComponentApiExtractor {
  private typeResolver = new BaseTypeResolver();

  // 动态导入 react-docgen-typescript
  private reactDocgen: any = null;

  constructor() {
    super();
    this.initializeParser();
  }

  private async initializeParser() {
    try {
      this.reactDocgen = await import('react-docgen-typescript');
    } catch (error) {
      console.warn('react-docgen-typescript not available, React API extraction will be limited');
    }
  }

  async extractFromFilePath(filePath: string): Promise<ComponentMeta> {
    const fs = await import('fs/promises');
    const source = await fs.readFile(filePath, 'utf-8');
    return this.extractFromSource(source, filePath);
  }

  async extractFromSource(source: string, fileName?: string): Promise<ComponentMeta> {
    if (!this.reactDocgen) {
      throw new Error('react-docgen-typescript not available');
    }

    const options: ParserOptions = {
      propFilter: (prop) => {
        // 过滤掉内部属性
        if (prop.name.startsWith('_') || prop.name.startsWith('$')) {
          return false;
        }
        return true;
      },
      shouldExtractValuesFromProps: true,
      shouldExtractLiteralValuesFromEnum: true,
    };

    try {
      const components = this.reactDocgen.parse(source, fileName, options);
      if (components.length === 0) {
        throw new Error('No React components found in source');
      }

      // 取第一个组件
      const componentDoc = components[0] as ReactComponentDoc;
      return this.transformToComponentMeta(componentDoc);
    } catch (error) {
      console.error('Failed to parse React component:', error);
      throw error;
    }
  }

  isSupported(filePath: string): boolean {
    return /\.(tsx|jsx|ts|js)$/.test(filePath) &&
           !filePath.includes('.d.ts') &&
           !filePath.includes('.test.') &&
           !filePath.includes('.spec.');
  }

  /**
   * 将 react-docgen-typescript 的输出转换为我们的 ComponentMeta 格式
   */
  private transformToComponentMeta(doc: ReactComponentDoc): ComponentMeta {
    const props = this.extractProps(doc.props);
    const events = this.extractEvents(doc);
    const slots = this.extractSlots(doc);

    return {
      name: doc.displayName,
      props,
      events: events.length > 0 ? events : undefined,
      slots: slots.length > 0 ? slots : undefined,
    };
  }

  /**
   * 提取组件属性
   */
  private extractProps(propsDoc: ReactComponentDoc['props']): any[] {
    return Object.entries(propsDoc).map(([propName, propDef]) => ({
      name: propName,
      type: this.typeResolver.resolveType(propDef.type.name),
      required: propDef.required || false,
      default: propDef.defaultValue?.value,
      description: propDef.description,
    }));
  }

  /**
   * 提取组件事件
   * React 组件通常通过回调 props 定义事件，我们尝试提取 onXxx 格式的属性
   */
  private extractEvents(doc: ReactComponentDoc): any[] {
    const events: any[] = [];

    Object.entries(doc.props).forEach(([propName, propDef]) => {
      // React 事件通常以 on 开头且类型为函数
      if (propName.startsWith('on') &&
          propDef.type.name === 'function' &&
          propDef.description) {
        events.push({
          name: propName,
          description: propDef.description,
          payload: {
            name: 'Event',
            raw: 'React.SyntheticEvent',
          },
        });
      }
    });

    return events;
  }

  /**
   * 提取组件插槽
   * React 组件通过 children 属性或特殊的 props 实现插槽功能
   */
  private extractSlots(doc: ReactComponentDoc): any[] {
    const slots: any[] = [];

    // 检查 children 属性
    const childrenProp = doc.props.children;
    if (childrenProp) {
      slots.push({
        name: 'children',
        description: childrenProp.description || 'The content of the component',
        props: {},
      });
    }

    // 检查其他可能的插槽属性（如 render props）
    Object.entries(doc.props).forEach(([propName, propDef]) => {
      if (propName.includes('render') &&
          propDef.type.name === 'function' &&
          !propName.startsWith('on')) {
        slots.push({
          name: propName,
          description: propDef.description || `Render prop for ${propName}`,
          props: {},
        });
      }
    });

    return slots;
  }
}

/**
 * 创建 React API 提取器实例
 */
export function createReactApiExtractor(): ReactApiExtractor {
  return new ReactApiExtractor();
}