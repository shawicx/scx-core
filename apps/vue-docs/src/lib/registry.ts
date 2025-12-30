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

  // 未来可以在这里注册更多组件
  // await registerCard();
  // await registerCounter();
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
