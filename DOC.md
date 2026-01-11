# SCX Core 文档架构设计

> 最后更新：2026-01-11

## 一、核心原则

1. **Demo 必须是真实运行时代码** - 无 DSL，无字符串模板
2. **文档系统与组件系统彻底解耦** - packages 永不依赖 apps
3. **React / Vue 不强行统一运行时** - 统一"语义模型"，不统一"实现模型"
4. **80% 跨框架共享，20% 框架特化** - schema 统一，UI 分离
5. **容器化展示，页面化文档** - 统一预览容器，文档即页面

---

## 二、目录结构

```txt
repo/
├─ apps/
│  ├─ react-docs/                    # React 文档应用
│  │  └─ src/
│  │     ├─ pages/
│  │     │  ├─ components/           # 组件文档页面
│  │     │  │  ├─ Card.page.tsx
│  │     │  │  ├─ Button.page.tsx
│  │     │  │  └─ ...
│  │     │  ├─ hooks/               # Hooks 文档页面
│  │     │  │  ├─ useCounter.page.tsx
│  │     │  │  └─ ...
│  │     │  ├─ ComponentLayout.tsx  # 组件文档布局
│  │     │  └─ Home.tsx
│  │     └─ router.tsx
│  │
│  ├─ vue-docs/                      # Vue 文档应用
│  │  └─ src/
│  │     ├─ pages/
│  │     │  ├─ components/
│  │     │  │  ├─ Card.page.vue
│  │     │  │  ├─ Button.page.vue
│  │     │  │  └─ ...
│  │     │  ├─ hooks/
│  │     │  ├─ ComponentLayout.vue
│  │     │  └─ Home.vue
│  │     └─ router.ts
│  │
│  └─ site/                          # 项目主页
│
├─ packages/
│  ├─ react-ui/                      # React UI 组件库
│  ├─ react-hooks/                  # React Hooks 库
│  ├─ vue-ui/                       # Vue UI 组件库
│  ├─ vue-hooks/                    # Vue Hooks 库
│  ├─ util/
│  ├─ ts-config/
│  │
│  ├─ docs-preview-react/          # React 预览容器组件
│  │  └─ src/
│  │     ├─ Preview.tsx           # 预览容器
│  │     ├─ CodeBlock.tsx         # 代码展示
│  │     ├─ PreviewContainer.tsx   # 组合容器
│  │     └─ index.ts
│  │
│  ├─ docs-preview-vue/            # Vue 预览容器组件
│  │  └─ src/
│  │     ├─ Preview.vue           # 预览容器
│  │     ├─ CodeBlock.vue         # 代码展示
│  │     ├─ PreviewContainer.vue   # 组合容器
│  │     └─ index.ts
│  │
│  ├─ docs-ui-react/               # React API 文档 UI
│  │  └─ src/
│  │     ├─ PropsTable.tsx        # Props 表格
│  │     ├─ EventsTable.tsx       # Events 表格
│  │     ├─ SlotsTable.tsx        # Slots 表格
│  │     └─ index.ts
│  │
│  ├─ docs-ui-vue/                 # Vue API 文档 UI
│  │  └─ src/
│  │     ├─ PropsTable.vue
│  │     ├─ EventsTable.vue
│  │     ├─ SlotsTable.vue
│  │     └─ index.ts
│  │
│  ├─ doc-schema/                  # 文档元数据类型定义
│  └─ doc-utils/                   # 文档处理工具集
```

---

## 三、依赖关系

```txt
apps/react-docs
 ├─ @scxfe/react-ui
 ├─ @scxfe/react-hooks
 ├─ @scxfe/docs-preview-react    # 预览容器
 ├─ @scxfe/docs-ui-react        # API 表格
 └─ @scxfe/doc-schema

apps/vue-docs
 ├─ @scxfe/vue-ui
 ├─ @scxfe/vue-hooks
 ├─ @scxfe/docs-preview-vue
 ├─ @scxfe/docs-ui-vue
 └─ @scxfe/doc-schema

docs-preview-react  ──▶ doc-schema
docs-preview-vue   ──▶ doc-schema
docs-ui-react      ──▶ doc-schema
docs-ui-vue        ──▶ doc-schema

packages/*  不依赖 apps/*
```

---

## 四、包职责说明

### 4.1 docs-preview-\* 包

**职责**：提供组件预览和代码展示功能

| 组件             | 功能                     |
| ---------------- | ------------------------ |
| Preview          | 组件预览容器，统一样式   |
| CodeBlock        | 代码展示，支持复制和高亮 |
| PreviewContainer | 组合预览和代码           |

**用途**：在文档页面中展示 demo 示例

### 4.2 docs-ui-\* 包

**职责**：提供 API 文档表格展示功能

| 组件        | 功能     |
| ----------- | -------- |
| PropsTable  | 属性表格 |
| EventsTable | 事件表格 |
| SlotsTable  | 插槽表格 |

**用途**：在文档页面中展示组件 API 文档

### 4.3 包职责对比

| 包              | 职责                | 关注点    |
| --------------- | ------------------- | --------- |
| docs-preview-\* | 组件预览 + 代码展示 | Demo 展示 |
| docs-ui-\*      | API 表格            | 文档展示  |

**无重叠**：两个包的职责完全分离，互不干扰

---

## 五、预览容器组件设计

### 5.1 Preview 组件

用于实时渲染组件，提供统一的预览容器样式。

```tsx
interface PreviewProps {
  title?: string; // 组件标题
  description?: string; // 组件描述
  children: ReactNode; // 要渲染的组件
  width?: 'full' | 'container' | 'narrow'; // 容器宽度
  background?: 'white' | 'gray' | 'transparent'; // 背景颜色
  bordered?: boolean; // 是否显示边框
}
```

### 5.2 CodeBlock 组件

用于展示代码示例，支持语法高亮和复制功能。

```tsx
interface CodeBlockProps {
  code: string; // 代码内容
  language?: 'tsx' | 'ts' | 'vue' | 'javascript'; // 语言类型
  showCopy?: boolean; // 是否显示复制按钮
  showLineNumbers?: boolean; // 是否显示行号
  title?: string; // 代码块标题
}
```

### 5.3 PreviewContainer 组件

组合 Preview 和 CodeBlock，一键展示预览和代码。

```tsx
interface PreviewContainerProps extends PreviewProps {
  code: string; // 代码内容
  codeLanguage?: string; // 代码语言
  showCode?: boolean; // 是否显示代码
  layout?: 'vertical' | 'horizontal'; // 布局方式
}
```

---

## 六、文档页面示例

### 6.1 React 文档页面

```tsx
// apps/react-docs/src/pages/components/Card.page.tsx
import React from 'react';
import { Card, CardMode } from '@scxfe/react-ui';
import { PreviewContainer } from '@scxfe/docs-preview-react';
import { PropsTable } from '@scxfe/docs-ui-react';
import { ComponentLayout } from '../ComponentLayout';

const cardMeta = {
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

export default function CardPage() {
  return (
    <ComponentLayout title="Card 卡片" description="基础卡片容器">
      <section className="doc-section">
        <h2>基础用法</h2>
        <PreviewContainer title="默认模式" code="<Card mode={CardMode.DEFAULT}>...</Card>">
          <Card mode={CardMode.DEFAULT}>内容</Card>
        </PreviewContainer>
      </section>
      <section className="doc-section">
        <h2>API</h2>
        <PropsTable meta={cardMeta} />
      </section>
    </ComponentLayout>
  );
}
```

### 6.2 Vue 文档页面

```vue
<!-- apps/vue-docs/src/pages/components/Card.page.vue -->
<script setup lang="ts">
import Card from '@scxfe/vue-ui/components/Card.vue';
import { PreviewContainer } from '@scxfe/docs-preview-vue';
import { PropsTable } from '@scxfe/docs-ui-vue';
import ComponentLayout from '../ComponentLayout.vue';

const cardMeta = {
  name: 'Card',
  props: [
    {
      name: 'title',
      type: { name: 'string' },
      required: false,
      default: "''",
      description: '卡片标题',
    },
  ],
  events: [],
  slots: [
    { name: 'header', description: '卡片头部插槽' },
    { name: 'default', description: '卡片内容插槽' },
  ],
};

const basicCardCode = `<Card title="默认卡片">
  <p>内容</p>
</Card>`;
</script>

<template>
  <ComponentLayout title="Card 卡片" description="基础卡片容器">
    <section class="doc-section">
      <h2>基础用法</h2>
      <PreviewContainer title="默认卡片" :code="basicCardCode">
        <Card title="默认卡片">
          <p>内容</p>
        </Card>
      </PreviewContainer>
    </section>
    <section class="doc-section">
      <h2>API</h2>
      <PropsTable :meta="cardMeta" />
    </section>
  </ComponentLayout>
</template>
```

---

## 七、路由配置

### 7.1 React 路由

```tsx
// apps/react-docs/src/router.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';

const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/components/card',
    lazy: () =>
      import('./pages/components/Card.page').then((m) => ({
        Component: m.default,
      })),
  },
  {
    path: '/components/button',
    lazy: () =>
      import('./pages/components/Button.page').then((m) => ({
        Component: m.default,
      })),
  },
  {
    path: '/hooks/use-counter',
    lazy: () =>
      import('./pages/hooks/useCounter.page').then((m) => ({
        Component: m.default,
      })),
  },
  // 继续添加其他路由...
];

export const router = createBrowserRouter(routes);
```

### 7.2 Vue 路由

```ts
// apps/vue-docs/src/router.ts
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('./pages/Home.vue'),
  },
  {
    path: '/components/card',
    component: () => import('./pages/components/Card.page.vue'),
  },
  {
    path: '/components/button',
    component: () => import('./pages/components/Button.page.vue'),
  },
  {
    path: '/hooks/use-counter',
    component: () => import('./pages/hooks/useCounter.page.vue'),
  },
  // 继续添加其他路由...
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
```

---

## 八、样式规范

```css
.preview {
  border-radius: 8px;
  overflow: hidden;
}

.preview-header {
  padding: 16px;
  background: #fafafa;
  border-bottom: 1px solid #e8e8e8;
}

.preview-title {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
}

.preview-description {
  margin: 0;
  font-size: 14px;
  color: #666;
}

.preview-content {
  padding: 24px;
  background: white;
}

.code-block {
  margin-top: 16px;
  border-radius: 8px;
  overflow: hidden;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #2d3748;
  color: #a0aec0;
  font-size: 12px;
}

.code-content {
  padding: 16px;
  background: #1a202c;
  color: #48bb78;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 14px;
  line-height: 1.6;
  overflow-x: auto;
}
```

---

## 九、开发指南

### 9.1 创建新组件文档页面

#### React

1. 在 `apps/react-docs/src/pages/components/` 创建 `ComponentName.page.tsx`
2. 导入组件和必要的包
3. 编写文档页面，使用 `PreviewContainer` 展示示例
4. 在 `router.tsx` 中添加路由

#### Vue

1. 在 `apps/vue-docs/src/pages/components/` 创建 `ComponentName.page.vue`
2. 导入组件和必要的包
3. 编写文档页面，使用 `PreviewContainer` 展示示例
4. 在 `router.ts` 中添加路由

### 9.2 添加新示例

直接在文档页面中添加新的 `<PreviewContainer>`：

```tsx
<PreviewContainer title="新示例" description="描述" code="代码">
  <ComponentName>内容</ComponentName>
</PreviewContainer>
```

---

## 十、总结

### 核心设计

- **docs-preview-\* / docs-ui-\***：两个独立包，职责完全分离
  - docs-preview-\*：组件预览 + 代码展示
  - docs-ui-\*：API 文档表格
- **文档页面化**：在 apps 层创建文档页面
- **直接路由配置**：无需注册表，直接在 router 中配置
- **样式集中管理**：Preview 和 CodeBlock 提供统一样式
- **代码展示灵活**：支持手动编写代码或自动提取

### 优势

| 维度     | 优势              |
| -------- | ----------------- |
| 文件数量 | 从 30+ 减少到 10+ |
| 样式管理 | 统一管理          |
| 文档编写 | 像写普通页面      |
| 路由配置 | 简单直接          |
| 维护成本 | 低                |
| 可扩展性 | 高                |

### 下一步

1. 创建 `docs-preview-react` 和 `docs-preview-vue` 包
2. 实现预览容器组件
3. 迁移现有 demo 到文档页面
4. 删除旧 demo 文件
5. 验证和测试

---

## 相关文档

- [DOC_TASK.md](./DOC_TASK.md) - 实施计划和任务清单
- [AGENTS.md](./AGENTS.md) - 项目开发指南
- [README.md](./README.md) - 项目介绍
