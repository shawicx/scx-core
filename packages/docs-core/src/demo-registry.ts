/**
 * Demo 注册表 - 管理 demo 组件的注册和加载
 */

import type { DemoComponent, DemoDefinition } from './types';

/**
 * Demo 注册表类
 */
export class DemoRegistry {
  private demos = new Map<string, DemoComponent>();

  /**
   * 注册 demo
   */
  register(id: string, component: DemoComponent): void {
    this.demos.set(id, component);
  }

  /**
   * 获取 demo
   */
  get(id: string): DemoComponent | undefined {
    return this.demos.get(id);
  }

  /**
   * 移除 demo
   */
  remove(id: string): boolean {
    return this.demos.delete(id);
  }

  /**
   * 检查 demo 是否存在
   */
  has(id: string): boolean {
    return this.demos.has(id);
  }

  /**
   * 获取所有 demo ID
   */
  getIds(): string[] {
    return Array.from(this.demos.keys());
  }

  /**
   * 获取 demo 数量
   */
  size(): number {
    return this.demos.size;
  }

  /**
   * 清空所有 demo
   */
  clear(): void {
    this.demos.clear();
  }

  /**
   * 批量注册 demo
   */
  registerBatch(demos: Record<string, DemoComponent>): void {
    Object.entries(demos).forEach(([id, component]) => {
      this.register(id, component);
    });
  }

  /**
   * 从 demo 定义列表批量注册
   */
  registerFromDefinitions(definitions: DemoDefinition[]): Record<string, DemoComponent> {
    const components: Record<string, DemoComponent> = {};

    definitions.forEach((definition, index) => {
      const id = `${definition.title.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}_${index}`;
      this.register(id, definition.component);
      components[id] = definition.component;
    });

    return components;
  }
}
