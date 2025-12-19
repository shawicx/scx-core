/**
 * API 提取工具 - 从源代码中提取组件API信息
 */

import type { ComponentMeta, PropMeta, EventMeta, SlotMeta, TypeRef } from '@scxfe/doc-schema';

/**
 * 组件API提取器基类
 */
export abstract class ComponentApiExtractor {
  /**
   * 从文件路径提取组件元数据
   */
  abstract extractFromFilePath(filePath: string): Promise<ComponentMeta>;

  /**
   * 从源代码字符串提取组件元数据
   */
  abstract extractFromSource(source: string, fileName?: string): Promise<ComponentMeta>;

  /**
   * 检查是否支持该文件类型
   */
  abstract isSupported(filePath: string): boolean;
}

/**
 * 类型解析器接口
 */
export interface TypeResolver {
  /**
   * 解析类型字符串为TypeRef
   */
  resolveType(typeString: string): TypeRef;

  /**
   * 获取类型的详细信息
   */
  getTypeInfo(typeName: string): Promise<TypeRef | null>;
}

/**
 * 基础类型解析器
 */
export class BaseTypeResolver implements TypeResolver {
  private cache = new Map<string, TypeRef>();

  resolveType(typeString: string): TypeRef {
    // 检查缓存
    if (this.cache.has(typeString)) {
      return this.cache.get(typeString)!;
    }

    // 解析基本类型
    const typeRef = this.parseTypeString(typeString);
    this.cache.set(typeString, typeRef);
    return typeRef;
  }

  async getTypeInfo(typeName: string): Promise<TypeRef | null> {
    // 基础实现，子类可以扩展
    return this.resolveType(typeName);
  }

  private parseTypeString(typeString: string): TypeRef {
    // 处理联合类型
    if (typeString.includes(' | ')) {
      return {
        name: 'Union',
        raw: typeString,
      };
    }

    // 处理数组类型
    if (typeString.endsWith('[]')) {
      return {
        name: 'Array',
        raw: typeString,
      };
    }

    // 处理函数类型
    if (typeString.startsWith('(') && typeString.includes(') =>')) {
      return {
        name: 'Function',
        raw: typeString,
      };
    }

    return this.parseSimpleType(typeString);
  }

  private parseSimpleType(typeString: string): TypeRef {
    const trimmed = typeString.trim();

    switch (trimmed) {
      case 'string':
      case 'number':
      case 'boolean':
      case 'object':
      case 'undefined':
      case 'null':
        return { name: trimmed };

      default:
        return { name: trimmed };
    }
  }
}

/**
 * 属性提取工具
 */
export class PropExtractor {
  constructor(private typeResolver: TypeResolver) {}

  /**
   * 从属性定义提取元数据
   */
  extractProp(propName: string, propDef: any, defaultValue?: any): PropMeta {
    const typeRef = this.typeResolver.resolveType(propDef.type);

    return {
      name: propName,
      type: typeRef,
      required: propDef.required ?? false,
      default: defaultValue,
      description: propDef.description || '',
      ...(propDef.validator && { validator: propDef.validator }),
    };
  }

  /**
   * 批量提取属性
   */
  extractProps(propsDef: Record<string, any>): PropMeta[] {
    return Object.entries(propsDef).map(([name, def]) => this.extractProp(name, def));
  }
}

/**
 * 事件提取工具
 */
export class EventExtractor {
  /**
   * 从事件定义提取元数据
   */
  extractEvent(eventName: string, eventDef: any): EventMeta {
    return {
      name: eventName,
      description: eventDef.description || '',
      payload: eventDef.payload
        ? {
            name: eventDef.payload.name || 'unknown',
            raw: eventDef.payload.raw || eventDef.payload.type,
          }
        : undefined,
    };
  }

  /**
   * 批量提取事件
   */
  extractEvents(eventsDef: Record<string, any>): EventMeta[] {
    return Object.entries(eventsDef).map(([name, def]) => this.extractEvent(name, def));
  }
}

/**
 * 插槽提取工具（主要用于Vue组件）
 */
export class SlotExtractor {
  /**
   * 从插槽定义提取元数据
   */
  extractSlot(slotName: string, slotDef: any): SlotMeta {
    return {
      name: slotName,
      description: slotDef.description || '',
      props: slotDef.props || {},
    };
  }

  /**
   * 批量提取插槽
   */
  extractSlots(slotsDef: Record<string, any>): SlotMeta[] {
    return Object.entries(slotsDef).map(([name, def]) => this.extractSlot(name, def));
  }
}
