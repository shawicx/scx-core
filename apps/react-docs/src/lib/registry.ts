/**
 * React Docs 组件注册表
 *
 * 负责注册所有需要文档展示的组件及其 demos
 */

import { DocsRegistry } from '@scxfe/docs-core';
import type { ComponentMeta } from '@scxfe/doc-schema';

// 导入 Card 组件的 demos
const loadCardDemos = () => {
  const modules = import.meta.glob('@scxfe/react-ui/src/card/demos/*.demo', {
    eager: true,
  });

  return Object.entries(modules).map(([path, module]: [string, any]) => {
    const fileName = path.split('/').pop()?.replace('.demo', '') || '';
    const demoName = fileName.replace('Card', '').replace('.demo', '');

    const component = module.default;
    const title = component?.title || demoName || 'Demo';
    const description = component?.description || `Card ${demoName} demo`;

    return {
      title,
      description,
      component: () => component,
      tags: ['card', demoName.toLowerCase()].filter(Boolean),
    };
  });
};

// 导入 Caption 组件的 demos
const loadCaptionDemos = () => {
  const modules = import.meta.glob('@scxfe/react-ui/src/caption/demos/*.demo', {
    eager: true,
  });

  return Object.entries(modules).map(([path, module]: [string, any]) => {
    const fileName = path.split('/').pop()?.replace('.demo', '') || '';
    const demoName = fileName.replace('Caption', '').replace('.demo', '');

    const component = module.default;
    const title = component?.title || demoName || 'Demo';
    const description = component?.description || `Caption ${demoName} demo`;

    return {
      title,
      description,
      component: () => component,
      tags: ['caption', demoName.toLowerCase()].filter(Boolean),
    };
  });
};

// 导入 GradientBorder 组件的 demos
const loadGradientBorderDemos = () => {
  const modules = import.meta.glob('@scxfe/react-ui/src/gradient-border/demos/*.demo', {
    eager: true,
  });

  return Object.entries(modules).map(([path, module]: [string, any]) => {
    const fileName = path.split('/').pop()?.replace('.demo', '') || '';
    const demoName = fileName.replace('GradientBorder', '').replace('.demo', '');

    const component = module.default;
    const title = component?.title || demoName || 'Demo';
    const description = component?.description || `GradientBorder ${demoName} demo`;

    return {
      title,
      description,
      component: () => component,
      tags: ['gradientborder', demoName.toLowerCase()].filter(Boolean),
    };
  });
};

// 导入 AMap 组件的 demos
const loadAMapDemos = () => {
  const modules = import.meta.glob('@scxfe/react-ui/src/a-map/demos/*.demo', {
    eager: true,
  });

  return Object.entries(modules).map(([path, module]: [string, any]) => {
    const fileName = path.split('/').pop()?.replace('.demo', '') || '';
    const demoName = fileName.replace('AMap', '').replace('.demo', '');

    const component = module.default;
    const title = component?.title || demoName || 'Demo';
    const description = component?.description || `AMap ${demoName} demo`;

    return {
      title,
      description,
      component: () => component,
      tags: ['amap', demoName.toLowerCase()].filter(Boolean),
    };
  });
};

// 导入 useCounter hook 的 demos
const loadUseCounterDemos = () => {
  const modules = import.meta.glob('@scxfe/react-hooks/src/useCounter/demos/*.demo', {
    eager: true,
  });

  return Object.entries(modules).map(([path, module]: [string, any]) => {
    const fileName = path.split('/').pop()?.replace('.demo', '') || '';
    const demoName = fileName.replace('UseCounter', '').replace('.demo', '');

    const component = module.default;
    const title = component?.title || demoName || 'Demo';
    const description = component?.description || `useCounter ${demoName} demo`;

    return {
      title,
      description,
      component: () => component,
      tags: ['hook', 'usecounter', demoName.toLowerCase()].filter(Boolean),
    };
  });
};

// 导入 useToggle hook 的 demos
const loadUseToggleDemos = () => {
  const modules = import.meta.glob('@scxfe/react-hooks/src/useToggle/demos/*.demo', {
    eager: true,
  });

  return Object.entries(modules).map(([path, module]: [string, any]) => {
    const fileName = path.split('/').pop()?.replace('.demo', '') || '';
    const demoName = fileName.replace('UseToggle', '').replace('.demo', '');

    const component = module.default;
    const title = component?.title || demoName || 'Demo';
    const description = component?.description || `useToggle ${demoName} demo`;

    return {
      title,
      description,
      component: () => component,
      tags: ['hook', 'usetoggle', demoName.toLowerCase()].filter(Boolean),
    };
  });
};

// 导入 useLocalStorage hook 的 demos
const loadUseLocalStorageDemos = () => {
  const modules = import.meta.glob('@scxfe/react-hooks/src/useLocalStorage/demos/*.demo', {
    eager: true,
  });

  return Object.entries(modules).map(([path, module]: [string, any]) => {
    const fileName = path.split('/').pop()?.replace('.demo', '') || '';
    const demoName = fileName.replace('UseLocalStorage', '').replace('.demo', '');

    const component = module.default;
    const title = component?.title || demoName || 'Demo';
    const description = component?.description || `useLocalStorage ${demoName} demo`;

    return {
      title,
      description,
      component: () => component,
      tags: ['hook', 'uselocalstorage', demoName.toLowerCase()].filter(Boolean),
    };
  });
};

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
        const aMapDemos = loadAMapDemos();
        registry.registerComponent({
          name: 'AMap',
          meta: aMapMeta,
          demos: aMapDemos,
          category: '地图组件',
          path: '/a-map',
        });
        console.log('✅ AMap component registered successfully');
        console.log(`   - ${aMapDemos.length} demos loaded`);
        console.log('   - Demos:', aMapDemos.map((d) => d.title).join(', '));
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
        const captionDemos = loadCaptionDemos();
        registry.registerComponent({
          name: 'Caption',
          meta: captionMeta,
          demos: captionDemos,
          category: 'UI 组件',
          path: '/caption',
        });
        console.log('✅ Caption component registered successfully');
        console.log(`   - ${captionDemos.length} demos loaded`);
        console.log('   - Demos:', captionDemos.map((d) => d.title).join(', '));
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
        const cardDemos = loadCardDemos();
        registry.registerComponent({
          name: 'Card',
          meta: cardMeta,
          demos: cardDemos,
          category: 'UI 组件',
          path: '/card',
        });
        console.log('✅ Card component registered successfully');
        console.log(`   - ${cardDemos.length} demos loaded`);
        console.log('   - Demos:', cardDemos.map((d) => d.title).join(', '));
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
        const gradientBorderDemos = loadGradientBorderDemos();
        registry.registerComponent({
          name: 'GradientBorder',
          meta: gradientBorderMeta,
          demos: gradientBorderDemos,
          category: 'UI 组件',
          path: '/gradient-border',
        });
        console.log('✅ GradientBorder component registered successfully');
        console.log(`   - ${gradientBorderDemos.length} demos loaded`);
        console.log('   - Demos:', gradientBorderDemos.map((d) => d.title).join(', '));
      } catch (error) {
        console.error('❌ Failed to register GradientBorder component:', error);
      }
    })()
  );

  // 注册 useCounter hook
  promises.push(
    (async () => {
      try {
        const useCounterMeta = {
          name: 'useCounter',
          props: [
            {
              name: 'options',
              type: { name: 'UseCounterOptions' },
              required: false,
              default: '{}',
              description: '计数器配置选项',
            },
          ],
          events: [],
          slots: [],
        };
        const useCounterDemos = loadUseCounterDemos();
        registry.registerComponent({
          name: 'useCounter',
          meta: useCounterMeta,
          demos: useCounterDemos,
          category: 'Hooks',
          path: '/use-counter',
        });
        console.log('✅ useCounter hook registered successfully');
        console.log(`   - ${useCounterDemos.length} demos loaded`);
        console.log('   - Demos:', useCounterDemos.map((d) => d.title).join(', '));
      } catch (error) {
        console.error('❌ Failed to register useCounter hook:', error);
      }
    })()
  );

  // 注册 useToggle hook
  promises.push(
    (async () => {
      try {
        const useToggleMeta = {
          name: 'useToggle',
          props: [
            {
              name: 'options',
              type: { name: 'UseToggleOptions' },
              required: false,
              default: '{}',
              description: '切换配置选项',
            },
          ],
          events: [],
          slots: [],
        };
        const useToggleDemos = loadUseToggleDemos();
        registry.registerComponent({
          name: 'useToggle',
          meta: useToggleMeta,
          demos: useToggleDemos,
          category: 'Hooks',
          path: '/use-toggle',
        });
        console.log('✅ useToggle hook registered successfully');
        console.log(`   - ${useToggleDemos.length} demos loaded`);
        console.log('   - Demos:', useToggleDemos.map((d) => d.title).join(', '));
      } catch (error) {
        console.error('❌ Failed to register useToggle hook:', error);
      }
    })()
  );

  // 注册 useLocalStorage hook
  promises.push(
    (async () => {
      try {
        const useLocalStorageMeta = {
          name: 'useLocalStorage',
          props: [
            {
              name: 'key',
              type: { name: 'string' },
              required: true,
              description: 'localStorage 键名',
            },
            {
              name: 'initialValue',
              type: { name: 'T' },
              required: true,
              description: '初始值',
            },
            {
              name: 'options',
              type: { name: 'UseLocalStorageOptions' },
              required: false,
              default: '{}',
              description: 'localStorage 配置选项',
            },
          ],
          events: [],
          slots: [],
        };
        const useLocalStorageDemos = loadUseLocalStorageDemos();
        registry.registerComponent({
          name: 'useLocalStorage',
          meta: useLocalStorageMeta,
          demos: useLocalStorageDemos,
          category: 'Hooks',
          path: '/use-local-storage',
        });
        console.log('✅ useLocalStorage hook registered successfully');
        console.log(`   - ${useLocalStorageDemos.length} demos loaded`);
        console.log('   - Demos:', useLocalStorageDemos.map((d) => d.title).join(', '));
      } catch (error) {
        console.error('❌ Failed to register useLocalStorage hook:', error);
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