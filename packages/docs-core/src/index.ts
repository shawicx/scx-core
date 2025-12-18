/**
 * Docs Core - 文档运行时核心（无框架）
 *
 * 提供文档系统的核心功能，包括组件注册、Demo管理、API元数据加载等
 * 这些功能都是框架无关的，可以被React和Vue应用共享
 */

export { DemoRegistry } from './demo-registry.js';
export { ApiRegistry, type ApiDataLoader } from './api-registry.js';

export type {
  DemoComponent,
  DemoDefinition,
  ComponentRegistrationConfig,
  RegisteredComponent,
  DocsRegistryState,
  RegistrationOptions,
  GetComponentOptions,
} from './types.js';

import type {
  ComponentRegistrationConfig,
  RegisteredComponent,
  RegistrationOptions,
} from './types.js';
import { DemoRegistry } from './demo-registry.js';
import { ApiRegistry } from './api-registry.js';
import type { ComponentMeta, DemoMeta, PageStructure } from '@scxfe/doc-schema';

/**
 * 文档注册表 - 统一管理组件、Demo和页面结构
 */
export class DocsRegistry {
  private demoRegistry: DemoRegistry;
  private apiRegistry: ApiRegistry;
  private components = new Map<string, RegisteredComponent>();
  private pages = new Map<string, PageStructure>();
  private lastUpdated = new Date();

  constructor() {
    this.demoRegistry = new DemoRegistry();
    this.apiRegistry = new ApiRegistry();
  }

  /**
   * 注册组件及其文档
   */
  registerComponent(config: ComponentRegistrationConfig, options: RegistrationOptions = {}): void {
    const { name } = config;

    // 检查是否已存在
    if (this.components.has(name) && !options.overwrite) {
      if (!options.silent) {
        throw new Error(
          `Component ${name} is already registered. Use overwrite option to replace.`,
        );
      }
      return;
    }

    // 注册Demo
    const loadedDemos = new Map<string, () => unknown>();
    config.demos.forEach((demo, index) => {
      const demoId = `${name}_${demo.title.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}_${index}`;
      this.demoRegistry.register(demoId, demo.component);
      loadedDemos.set(demoId, demo.component);
    });

    // 创建已注册组件信息
    const registeredComponent: RegisteredComponent = {
      config,
      loadedDemos,
      registeredAt: new Date(),
    };

    this.components.set(name, registeredComponent);
    this.lastUpdated = new Date();
  }

  /**
   * 获取组件
   */
  getComponent(name: string): RegisteredComponent | undefined {
    return this.components.get(name);
  }

  /**
   * 获取组件元数据
   */
  async getComponentMeta(name: string): Promise<ComponentMeta> {
    const component = this.getComponent(name);
    if (!component) {
      throw new Error(`Component ${name} not found`);
    }

    // 尝试从API注册表获取元数据
    try {
      const meta = await this.apiRegistry.getComponentMeta(name);
      return meta;
    } catch {
      // 如果无法加载API元数据，返回基础元数据
      const { config } = component;
      return {
        name,
        props: config.meta.props || [],
        events: config.meta.events || [],
        slots: config.meta.slots || [],
      };
    }
  }

  /**
   * 获取组件Demo
   */
  getComponentDemos(name: string): DemoMeta[] {
    const component = this.getComponent(name);
    if (!component) {
      return [];
    }

    return component.config.demos.map((demo, index) => ({
      id: `${name}_${demo.title.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}_${index}`,
      title: demo.title,
      description: demo.description,
      tags: demo.tags,
      isDefault: demo.isDefault,
    }));
  }

  /**
   * 获取Demo组件
   */
  getDemoComponent(demoId: string): (() => unknown) | undefined {
    return this.demoRegistry.get(demoId);
  }

  /**
   * 注册页面结构
   */
  registerPage(id: string, structure: PageStructure): void {
    this.pages.set(id, structure);
    this.lastUpdated = new Date();
  }

  /**
   * 获取页面结构
   */
  getPage(id: string): PageStructure | undefined {
    return this.pages.get(id);
  }

  /**
   * 获取所有组件列表
   */
  getComponents(): string[] {
    return Array.from(this.components.keys());
  }

  /**
   * 获取所有页面列表
   */
  getPages(): string[] {
    return Array.from(this.pages.keys());
  }

  /**
   * 获取注册表状态
   */
  getState() {
    return {
      components: this.components,
      pages: this.pages,
      componentCount: this.components.size,
      lastUpdated: this.lastUpdated,
    };
  }

  /**
   * 设置API数据加载器
   */
  setApiDataLoader(loader: import('./api-registry.js').ApiDataLoader): void {
    this.apiRegistry.setLoader(loader);
  }

  /**
   * 清空所有注册数据
   */
  clear(): void {
    this.components.clear();
    this.pages.clear();
    this.demoRegistry.clear();
    this.apiRegistry.clearCache();
    this.lastUpdated = new Date();
  }

  /**
   * 获取缓存统计信息
   */
  getCacheStats() {
    return {
      demoRegistry: {
        size: this.demoRegistry.size(),
      },
      apiRegistry: this.apiRegistry.getCacheStats(),
    };
  }
}
