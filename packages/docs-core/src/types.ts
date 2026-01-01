/**
 * Docs Core 类型定义
 *
 * 这些类型定义扩展了 doc-schema，用于内部运行时逻辑
 */

import type { ComponentMeta, PageStructure } from '@scxfe/doc-schema';

/**
 * Demo 组件类型 - 支持异步加载
 */
export type DemoComponent = (() => Promise<unknown>) | (() => unknown);

/**
 * Demo 定义 - 运行时可用的 demo 描述
 */
export interface DemoDefinition {
  /** Demo 标题 */
  title: string;
  /** Demo 描述 */
  description?: string;
  /** Demo 组件 */
  component: DemoComponent;
  /** Demo 标签 */
  tags?: string[];
  /** 是否为默认 demo */
  isDefault?: boolean;
}

/**
 * 组件注册配置
 */
export interface ComponentRegistrationConfig {
  /** 组件名称 */
  name: string;
  /** 组件元数据 */
  meta: ComponentMeta;
  /** Demo 定义列表 */
  demos: DemoDefinition[];
  /** 分类 */
  category?: string;
  /** 页面路径 */
  path?: string;
}

/**
 * 注册的组件信息
 */
export interface RegisteredComponent {
  /** 组件注册配置 */
  config: ComponentRegistrationConfig;
  /** 已加载的 demo 组件 */
  loadedDemos: Map<string, DemoComponent>;
  /** 注册时间 */
  registeredAt: Date;
}

/**
 * 文档注册表状态
 */
export interface DocsRegistryState {
  /** 已注册的组件映射 */
  components: Map<string, RegisteredComponent>;
  /** 页面结构 */
  pages: Map<string, PageStructure>;
  /** 注册的组件数量 */
  componentCount: number;
  /** 最后更新时间 */
  lastUpdated: Date;
}

/**
 * 注册选项
 */
export interface RegistrationOptions {
  /** 是否覆盖已存在的组件 */
  overwrite?: boolean;
  /** 是否静默注册（不抛出错误） */
  silent?: boolean;
}

/**
 * 获取组件选项
 */
export interface GetComponentOptions {
  /** 包含 demos */
  includeDemos?: boolean;
  /** 加载 demos */
  loadDemos?: boolean;
}
