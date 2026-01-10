/**
 * Vue Docs 组件注册表
 *
 * 负责注册所有需要文档展示的组件及其 demos
 */

import { DocsRegistry } from '@scxfe/docs-core';
import type { ComponentMeta } from '@scxfe/doc-schema';

// 导入 Button 组件的 demos
const loadButtonDemos = async () => {
  const modules = import.meta.glob('@scxfe/vue-ui/components/demos/*.vue', {
    eager: true,
  });

  return Object.entries(modules).map(([path, module]: [string, any]) => {
    // 从文件路径提取 demo 名称
    const fileName = path.split('/').pop()?.replace('.vue', '') || '';
    const demoName = fileName.replace('Button', '').replace('.demo', '');

    // 从 demo 组件中提取元数据（如果组件导出了）
    const component = (module as any).default;
    const title = component?.title || demoName || 'Demo';
    const description = component?.description || `Button ${demoName} demo`;

    return {
      title,
      description,
      component: () => component,
      tags: ['button', demoName.toLowerCase()].filter(Boolean),
    };
  });
};

// 导入 Card 组件的 API 元数据
function getCardMeta(): ComponentMeta {
  return {
    name: 'Card',
    props: [
      {
        name: 'title',
        type: { name: 'string' },
        required: false,
        default: "''",
        description: '卡片标题',
      },
      {
        name: 'shadow',
        type: { name: 'always | hover | never', raw: "'always' | 'hover' | 'never'" },
        required: false,
        default: 'always',
        description: '卡片阴影显示方式',
      },
      {
        name: 'bordered',
        type: { name: 'boolean' },
        required: false,
        default: 'true',
        description: '是否有边框',
      },
      {
        name: 'size',
        type: { name: 'small | medium | large', raw: "'small' | 'medium' | 'large'" },
        required: false,
        default: 'medium',
        description: '卡片尺寸',
      },
    ],
    events: [],
    slots: [
      { name: 'header', description: '卡片头部插槽' },
      { name: 'cover', description: '卡片封面插槽' },
      { name: 'default', description: '卡片内容插槽' },
      { name: 'actions', description: '卡片操作区插槽' },
    ],
  };
}

// 导入 Counter 组件的 API 元数据
function getCounterMeta(): ComponentMeta {
  return {
    name: 'Counter',
    props: [
      {
        name: 'modelValue',
        type: { name: 'number' },
        required: false,
        default: '0',
        description: '当前数值',
      },
      {
        name: 'min',
        type: { name: 'number' },
        required: false,
        default: '0',
        description: '最小值',
      },
      {
        name: 'max',
        type: { name: 'number' },
        required: false,
        default: '100',
        description: '最大值',
      },
      {
        name: 'step',
        type: { name: 'number' },
        required: false,
        default: '1',
        description: '步长',
      },
      {
        name: 'label',
        type: { name: 'string' },
        required: false,
        default: "''",
        description: '标签文本',
      },
      {
        name: 'editable',
        type: { name: 'boolean' },
        required: false,
        default: 'false',
        description: '是否可编辑',
      },
      {
        name: 'size',
        type: { name: 'small | medium | large', raw: "'small' | 'medium' | 'large'" },
        required: false,
        default: 'medium',
        description: '计数器尺寸',
      },
      {
        name: 'disabled',
        type: { name: 'boolean' },
        required: false,
        default: 'false',
        description: '是否禁用',
      },
    ],
    events: [
      { name: 'update:modelValue', description: '数值更新时触发' },
      { name: 'change', description: '数值改变时触发' },
      { name: 'decrement', description: '减少按钮点击时触发' },
      { name: 'increment', description: '增加按钮点击时触发' },
    ],
    slots: [],
  };
}

/**
 * Button 组件的 API 元数据
 */
function getButtonMeta(): ComponentMeta {
  return {
    name: 'Button',
    props: [
      {
        name: 'type',
        type: { name: 'primary | secondary | success | warning | danger | ghost', raw: "'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost'" },
        required: false,
        default: 'primary',
        description: '按钮类型',
      },
      {
        name: 'size',
        type: { name: 'small | medium | large', raw: "'small' | 'medium' | 'large'" },
        required: false,
        default: 'medium',
        description: '按钮尺寸',
      },
      {
        name: 'disabled',
        type: { name: 'boolean' },
        required: false,
        default: 'false',
        description: '是否禁用',
      },
      {
        name: 'loading',
        type: { name: 'boolean' },
        required: false,
        default: 'false',
        description: '是否加载中',
      },
      {
        name: 'block',
        type: { name: 'boolean' },
        required: false,
        default: 'false',
        description: '是否块级按钮',
      },
      {
        name: 'round',
        type: { name: 'boolean' },
        required: false,
        default: 'false',
        description: '是否圆角按钮',
      },
    ],
    events: [
      { name: 'click', description: '点击按钮时触发' },
    ],
    slots: [
      { name: 'default', description: '默认插槽，按钮内容' },
    ],
  };
}

/**
 * 创建并配置全局注册表实例
 */
export const registry = new DocsRegistry();

/**
 * 初始化注册表，注册所有组件
 */
export async function initializeRegistry() {
  // 注册 Button 组件
  try {
    const buttonMeta = getButtonMeta();
    const buttonDemos = await loadButtonDemos();

    registry.registerComponent({
      name: 'Button',
      meta: buttonMeta,
      demos: buttonDemos,
      category: 'UI 组件',
      path: '/button',
    });

    // eslint-disable-next-line no-console
    console.log('✅ Button component registered successfully');
    // eslint-disable-next-line no-console
    console.log(`   - ${buttonDemos.length} demos loaded`);
    // eslint-disable-next-line no-console
    console.log('   - Demos:', buttonDemos.map((d) => d.title).join(', '));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('❌ Failed to register Button component:', error);
  }

  // 注册 Card 组件
  try {
    const cardMeta = getCardMeta();

    registry.registerComponent({
      name: 'Card',
      meta: cardMeta,
      demos: [],
      category: 'UI 组件',
      path: '/card',
    });

    // eslint-disable-next-line no-console
    console.log('✅ Card component registered successfully');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('❌ Failed to register Card component:', error);
  }

  // 注册 Counter 组件
  try {
    const counterMeta = getCounterMeta();

    registry.registerComponent({
      name: 'Counter',
      meta: counterMeta,
      demos: [],
      category: 'UI 组件',
      path: '/counter',
    });

    // eslint-disable-next-line no-console
    console.log('✅ Counter component registered successfully');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('❌ Failed to register Counter component:', error);
  }
}

/**
 * 获取组件列表
 */
export function getComponents() {
  return registry.getComponents();
}

/**
 * 获取组件元数据
 */
export async function getComponentMeta(name: string) {
  return await registry.getComponentMeta(name);
}

/**
 * 获取组件 demos
 */
export function getComponentDemos(name: string) {
  return registry.getComponentDemos(name);
}

/**
 * 获取 demo 组件
 */
export function getDemoComponent(demoId: string) {
  return registry.getDemoComponent(demoId);
}
