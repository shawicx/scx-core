/**
 * SCX Core 文档系统 - 核心 Schema 定义
 *
 * 这是整个文档系统最重要的"协议层"，定义了跨框架的组件元数据模型
 */

/**
 * 类型引用，用于描述组件属性的类型
 */
export interface TypeRef {
  /** 类型名称 */
  name: string;
  /** 原始类型字符串（可选） */
  raw?: string;
}

/**
 * 组件属性元数据
 */
export interface PropMeta {
  /** 属性名称 */
  name: string;
  /** 属性类型 */
  type: TypeRef;
  /** 是否必填 */
  required: boolean;
  /** 默认值 */
  default?: string;
  /** 属性描述 */
  description?: string;
}

/**
 * 事件元数据
 */
export interface EventMeta {
  /** 事件名称 */
  name: string;
  /** 事件载荷类型 */
  payload?: TypeRef;
  /** 事件描述 */
  description?: string;
}

/**
 * 插槽元数据 (主要用于 Vue)
 */
export interface SlotMeta {
  /** 插槽名称 */
  name: string;
  /** 插槽属性 */
  props?: Record<string, TypeRef>;
  /** 插槽描述 */
  description?: string;
}

/**
 * 组件元数据 - 这是最大公约数模型
 *
 * 设计决策：
 * - React children → SlotMeta
 * - React onXxx → EventMeta
 * - Vue emits / slots → 同构映射
 */
export interface ComponentMeta {
  /** 组件名称 */
  name: string;
  /** 组件属性列表 */
  props: PropMeta[];
  /** 组件事件列表 */
  events?: EventMeta[];
  /** 组件插槽列表 */
  slots?: SlotMeta[];
}

/**
 * Demo 元数据
 */
export interface DemoMeta {
  /** Demo 标题 */
  title: string;
  /** Demo 描述 */
  description?: string;
  /** Demo 标签 */
  tags?: string[];
  /** Demo 唯一标识符 */
  id?: string;
  /** 是否为默认 demo */
  isDefault?: boolean;
}

/**
 * 组件文档注册信息
 */
export interface ComponentRegistry {
  /** 组件名称 */
  name: string;
  /** 组件元数据 */
  meta: ComponentMeta;
  /** Demo 元数据列表 */
  demos: DemoMeta[];
  /** 分类 */
  category?: string;
}

/**
 * 文档页面结构
 */
export interface PageStructure {
  /** 页面标题 */
  title: string;
  /** 组件注册列表 */
  components: ComponentRegistry[];
  /** 页面描述 */
  description?: string;
}
