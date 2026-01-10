/**
 * React Docs 组件注册表
 *
 * 负责注册所有需要文档展示的组件及其 demos
 */

import { DocsRegistry } from '@scxfe/docs-core';
import type { ComponentMeta } from '@scxfe/doc-schema';

// 导入 AMap 组件的 API 元数据
function getAMapMeta(): ComponentMeta {
  return {
    name: 'AMap',
    props: [
      {
        name: 'container',
        type: { name: 'string' },
        required: true,
        default: 'container',
        description: '地图容器的 ID',
      },
      {
        name: 'apiKey',
        type: { name: 'string' },
        required: true,
        description: '高德地图 API 密钥',
      },
      {
        name: 'width',
        type: { name: 'string | number' },
        required: false,
        default: '"100%"',
        description: '地图容器宽度',
      },
      {
        name: 'height',
        type: { name: 'string | number' },
        required: false,
        default: '"100%"',
        description: '地图容器高度',
      },
    ],
    events: [],
    slots: [],
  };
}

// 导入 Caption 组件的 API 元数据
function getCaptionMeta(): ComponentMeta {
  return {
    name: 'Caption',
    props: [
      {
        name: 'children',
        type: { name: 'ReactNode' },
        required: false,
        description: '标题内容',
      },
      {
        name: 'className',
        type: { name: 'string' },
        required: false,
        description: '自定义类名',
      },
      {
        name: 'style',
        type: { name: 'CSSProperties' },
        required: false,
        description: '自定义样式',
      },
      {
        name: 'id',
        type: { name: 'string' },
        required: false,
        description: '元素 ID',
      },
      {
        name: 'shape',
        type: { name: 'default | square | circle', raw: "'default' | 'square' | 'circle'" },
        required: false,
        default: 'default',
        description: '背景条形状',
      },
      {
        name: 'actions',
        type: { name: 'ReactNode' },
        required: false,
        description: '操作按钮',
      },
      {
        name: 'line',
        type: { name: 'boolean' },
        required: false,
        default: 'false',
        description: '是否线形',
      },
      {
        name: 'signBackground',
        type: { name: 'string' },
        required: false,
        default: '"#1996ff"',
        description: '左侧背景条的颜色',
      },
      {
        name: 'innerProps',
        type: { name: 'HtmlHTMLAttributes<HTMLDivElement>' },
        required: false,
        description: '展示的子元素父级元素的 props',
      },
    ],
    events: [],
    slots: [],
  };
}

// 导入 Card 组件的 API 元数据
function getCardMeta(): ComponentMeta {
  return {
    name: 'Card',
    props: [
      {
        name: 'mode',
        type: { name: 'CardMode', raw: 'CardMode' },
        required: false,
        default: 'CardMode.DEFAULT',
        description: '卡片模式',
      },
    ],
    events: [],
    slots: [],
  };
}

// 导入 GradientBorder 组件的 API 元数据
function getGradientBorderMeta(): ComponentMeta {
  return {
    name: 'GradientBorder',
    props: [
      {
        name: 'placement',
        type: { name: 'GradientBorderPlacement', raw: 'GradientBorderPlacement' },
        required: false,
        default: 'GradientBorderPlacement.TOP_BOTTOM',
        description: '渐变方向',
      },
      {
        name: 'gradientColor',
        type: { name: 'string' },
        required: true,
        description: '渐变颜色',
      },
      {
        name: 'gradientWidth',
        type: { name: 'number' },
        required: false,
        default: '1',
        description: '渐变宽度',
      },
      {
        name: 'width',
        type: { name: 'string | number' },
        required: true,
        description: '容器宽度',
      },
      {
        name: 'height',
        type: { name: 'string | number' },
        required: true,
        description: '容器高度',
      },
      {
        name: 'className',
        type: { name: 'string' },
        required: false,
        description: '自定义类名',
      },
      {
        name: 'style',
        type: { name: 'CSSProperties' },
        required: false,
        description: '自定义样式',
      },
    ],
    events: [],
    slots: [],
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
  const promises = [];

  // 注册 AMap 组件
  promises.push(
    (async () => {
      try {
        const aMapMeta = getAMapMeta();
        registry.registerComponent({
          name: 'AMap',
          meta: aMapMeta,
          demos: [],
          category: '地图组件',
          path: '/a-map',
        });
        console.log('✅ AMap component registered successfully');
      } catch (error) {
        console.error('❌ Failed to register AMap component:', error);
      }
    })()
  );

  // 注册 Caption 组件
  promises.push(
    (async () => {
      try {
        const captionMeta = getCaptionMeta();
        registry.registerComponent({
          name: 'Caption',
          meta: captionMeta,
          demos: [],
          category: 'UI 组件',
          path: '/caption',
        });
        console.log('✅ Caption component registered successfully');
      } catch (error) {
        console.error('❌ Failed to register Caption component:', error);
      }
    })()
  );

  // 注册 Card 组件
  promises.push(
    (async () => {
      try {
        const cardMeta = getCardMeta();
        registry.registerComponent({
          name: 'Card',
          meta: cardMeta,
          demos: [],
          category: 'UI 组件',
          path: '/card',
        });
        console.log('✅ Card component registered successfully');
      } catch (error) {
        console.error('❌ Failed to register Card component:', error);
      }
    })()
  );

  // 注册 GradientBorder 组件
  promises.push(
    (async () => {
      try {
        const gradientBorderMeta = getGradientBorderMeta();
        registry.registerComponent({
          name: 'GradientBorder',
          meta: gradientBorderMeta,
          demos: [],
          category: 'UI 组件',
          path: '/gradient-border',
        });
        console.log('✅ GradientBorder component registered successfully');
      } catch (error) {
        console.error('❌ Failed to register GradientBorder component:', error);
      }
    })()
  );

  // Wait for all registrations to complete
  await Promise.all(promises);
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