/**
 * Vue 组件 API 提取器
 *
 * 基于 vue-docgen-api 实现 Vue 组件的 API 信息自动提取
 */

import type { ComponentMeta } from '@scxfe/doc-schema';
import { ComponentApiExtractor } from './api-extractor';

// 类型声明 - vue-docgen-api 可能在运行时才可用
interface VueComponentDoc {
  displayName: string;
  description?: string;
  props: {
    [propName: string]: {
      type: {
        name: string;
        names?: string[];
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
      payload?: {
        type: {
          name: string;
          names?: string[];
        };
      };
    };
  };
  slots?: {
    [slotName: string]: {
      description?: string;
      props?: {
        [propName: string]: {
          type: {
            name: string;
            names?: string[];
          };
          description?: string;
        };
      };
    };
  };
  methods?: {
    [methodName: string]: {
      description?: string;
      params?: {
        [paramName: string]: {
          type: {
            name: string;
            names?: string[];
          };
          description?: string;
        };
      };
    };
  };
}

/**
 * Vue 组件 API 提取器
 */
export class VueApiExtractor extends ComponentApiExtractor {
  // 动态导入 vue-docgen-api
  private vueDocgen: any = null;

  constructor() {
    super();
    this.initializeParser();
  }

  private async initializeParser() {
    try {
      this.vueDocgen = await import('vue-docgen-api');
    } catch {
      console.warn('vue-docgen-api not available, Vue API extraction will be limited');
    }
  }

  async extractFromFilePath(filePath: string): Promise<ComponentMeta> {
    if (!this.vueDocgen) {
      throw new Error('vue-docgen-api not available');
    }

    try {
      const doc: VueComponentDoc = await this.vueDocgen.parse(filePath);
      return this.transformToComponentMeta(doc);
    } catch (error) {
      console.error('Failed to parse Vue component:', error);
      throw error;
    }
  }

  async extractFromSource(source: string, fileName?: string): Promise<ComponentMeta> {
    if (!this.vueDocgen) {
      throw new Error('vue-docgen-api not available');
    }

    // 创建临时文件来解析源代码
    const path = await import('path');
    const fs = await import('fs/promises');
    const os = await import('os');

    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'vue-docgen-'));
    const tempFile = path.join(tempDir, fileName || 'temp.vue');

    try {
      await fs.writeFile(tempFile, source);
      const doc: VueComponentDoc = await this.vueDocgen.parse(tempFile);
      return this.transformToComponentMeta(doc);
    } finally {
      // 清理临时文件
      await fs.rm(tempDir, { recursive: true, force: true });
    }
  }

  isSupported(filePath: string): boolean {
    return /\.(vue)$/.test(filePath);
  }

  /**
   * 将 vue-docgen-api 的输出转换为我们的 ComponentMeta 格式
   */
  private transformToComponentMeta(doc: VueComponentDoc): ComponentMeta {
    const props = this.extractProps(doc.props);
    const events = this.extractEvents(doc.events || {});
    const slots = this.extractSlots(doc.slots || {});

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
  private extractProps(propsDoc: VueComponentDoc['props']): any[] {
    return Object.entries(propsDoc).map(([propName, propDef]) => ({
      name: propName,
      type: this.resolveVueType(propDef.type),
      required: propDef.required || false,
      default: propDef.defaultValue?.value,
      description: propDef.description,
    }));
  }

  /**
   * 提取组件事件
   */
  private extractEvents(eventsDoc: VueComponentDoc['events']): any[] {
    if (!eventsDoc) return [];
    return Object.entries(eventsDoc).map(([eventName, eventDef]) => ({
      name: eventName,
      description: eventDef.description,
      payload: eventDef.payload?.type
        ? {
            name: eventDef.payload.type.name,
            raw: eventDef.payload.type.names?.join(' | ') || eventDef.payload.type.name,
          }
        : undefined,
    }));
  }

  /**
   * 提取组件插槽
   */
  private extractSlots(slotsDoc: VueComponentDoc['slots']): any[] {
    if (!slotsDoc) return [];
    return Object.entries(slotsDoc).map(([slotName, slotDef]) => ({
      name: slotName,
      description: slotDef.description,
      props: slotDef.props
        ? Object.entries(slotDef.props).reduce((acc, [propName, prop]) => {
            acc[propName] = this.resolveVueType(prop.type);
            return acc;
          }, {} as any)
        : undefined,
    }));
  }

  /**
   * 解析 Vue 类型
   */
  private resolveVueType(type: { name: string; names?: string[] }): any {
    if (type.names && type.names.length > 1) {
      // 联合类型
      return {
        name: 'Union',
        raw: type.names.join(' | '),
      };
    }

    switch (type.name) {
      case 'string':
      case 'number':
      case 'boolean':
      case 'object':
      case 'array':
      case 'function':
        return { name: type.name };

      default:
        return {
          name: type.name,
          raw: type.names?.join(' | ') || type.name,
        };
    }
  }
}

/**
 * 创建 Vue API 提取器实例
 */
export function createVueApiExtractor(): VueApiExtractor {
  return new VueApiExtractor();
}
