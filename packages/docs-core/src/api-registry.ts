/**
 * API 注册表 - 管理组件 API 元数据的加载和缓存
 */

import type { ComponentMeta, TypeRef } from '@scxfe/doc-schema';

/**
 * API 数据加载器接口
 */
export interface ApiDataLoader {
  /** 加载组件元数据 */
  loadComponentMeta(componentName: string): Promise<ComponentMeta>;
  /** 加载类型信息 */
  loadTypeRef(typeString: string): Promise<TypeRef>;
  /** 检查是否支持加载 */
  isSupported(componentName: string): boolean;
}

/**
 * 缓存的 API 数据
 */
interface CachedApiData {
  componentMeta: Map<string, ComponentMeta>;
  typeRef: Map<string, TypeRef>;
  lastUpdate: Date;
}

/**
 * API 注册表类
 */
export class ApiRegistry {
  private loader: ApiDataLoader | null = null;
  private cache: CachedApiData = {
    componentMeta: new Map(),
    typeRef: new Map(),
    lastUpdate: new Date(),
  };

  /**
   * 设置 API 数据加载器
   */
  setLoader(loader: ApiDataLoader): void {
    this.loader = loader;
  }

  /**
   * 获取组件元数据
   */
  async getComponentMeta(componentName: string): Promise<ComponentMeta> {
    // 检查缓存
    if (this.cache.componentMeta.has(componentName)) {
      return this.cache.componentMeta.get(componentName)!;
    }

    // 如果没有加载器，返回空的元数据
    if (!this.loader) {
      return this.createEmptyComponentMeta(componentName);
    }

    try {
      // 使用加载器加载元数据
      const meta = await this.loader.loadComponentMeta(componentName);
      this.cache.componentMeta.set(componentName, meta);
      this.cache.lastUpdate = new Date();
      return meta;
    } catch {
      return this.createEmptyComponentMeta(componentName);
    }
  }

  /**
   * 获取类型引用
   */
  async getTypeRef(typeString: string): Promise<TypeRef> {
    // 检查缓存
    if (this.cache.typeRef.has(typeString)) {
      return this.cache.typeRef.get(typeString)!;
    }

    // 如果没有加载器，创建简单类型引用
    if (!this.loader) {
      return this.createSimpleTypeRef(typeString);
    }

    try {
      const typeRef = await this.loader.loadTypeRef(typeString);
      this.cache.typeRef.set(typeString, typeRef);
      return typeRef;
    } catch {
      return this.createSimpleTypeRef(typeString);
    }
  }

  /**
   * 预加载组件元数据
   */
  async preloadComponentMeta(componentNames: string[]): Promise<void> {
    if (!this.loader) return;

    const promises = componentNames.map((name) => this.getComponentMeta(name));
    await Promise.all(promises);
  }

  /**
   * 检查组件是否支持 API 提取
   */
  isSupported(componentName: string): boolean {
    return this.loader?.isSupported(componentName) ?? false;
  }

  /**
   * 清空缓存
   */
  clearCache(): void {
    this.cache.componentMeta.clear();
    this.cache.typeRef.clear();
    this.cache.lastUpdate = new Date();
  }

  /**
   * 获取缓存统计信息
   */
  getCacheStats() {
    return {
      componentMetaCount: this.cache.componentMeta.size,
      typeRefCount: this.cache.typeRef.size,
      lastUpdate: this.cache.lastUpdate,
    };
  }

  /**
   * 创建空的组件元数据
   */
  private createEmptyComponentMeta(componentName: string): ComponentMeta {
    return {
      name: componentName,
      props: [],
      events: [],
      slots: [],
    };
  }

  /**
   * 创建简单类型引用
   */
  private createSimpleTypeRef(typeString: string): TypeRef {
    return {
      name: typeString,
    };
  }
}
