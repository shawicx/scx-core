# hook-docs-pages Specification

## Purpose

TBD - created by archiving change migrate-components-to-doc-pages. Update Purpose after archive.

## Requirements

### Requirement: React Hooks 文档页面结构

React 文档站点的 Hooks 页面 MUST 遵循以下结构和命名规范：

```
apps/react-docs/src/pages/hooks/
├── useCounter.page.tsx
├── useToggle.page.tsx
└── useLocalStorage.page.tsx
```

#### Scenario: 创建 Hooks 文档页面

**Given** 需要为 React Hook 创建文档页面

**When** 创建文档页面文件

**Then** 文件名必须使用 camelCase 格式：`hookName.page.tsx`

**And** 文件必须位于 `apps/react-docs/src/pages/hooks/` 目录

**And** 文件必须默认导出一个 React 组件

#### Scenario: Hooks 文档页面必须导入预览容器

**Given** React Hooks 文档页面

**When** 渲染 Hook 示例

**Then** 必须从 `@scxfe/docs-preview-react` 导入 `PreviewContainer` 组件

**And** 每个示例必须使用 `PreviewContainer` 包裹

#### Scenario: Hooks 文档页面必须导入对应 Hook

**Given** React Hooks 文档页面

**When** 渲染 Hook 示例

**Then** 必须从 `@scxfe/react-hooks` 导入对应的 Hook

**And** 导入必须使用具名导入：`import { useCounter } from '@scxfe/react-hooks'`

#### Scenario: Hooks 文档页面必须定义代码示例字符串

**Given** React Hooks 文档页面

**When** 创建示例

**Then** 必须为每个示例定义对应的代码示例字符串常量

**And** 代码示例字符串必须使用模板字面量（backticks）

**And** 代码示例字符串必须展示用户实际使用的代码

**And** 代码示例字符串命名格式：`hookNameFeatureCode`

**Example**:

```tsx
const useCounterBasicCode = `
const { count, increment, decrement, reset } = useCounter();

return (
  <div>
    <p>Count: {count}</p>
    <button onClick={increment}>Increment</button>
    <button onClick={decrement}>Decrement</button>
    <button onClick={reset}>Reset</button>
  </div>
);
`;
```

#### Scenario: Hooks 文档页面必须包含示例描述

**Given** PreviewContainer 组件

**When** 配置示例

**Then** 必须提供 `title` prop，描述示例名称

**And** 应该提供 `description` prop，描述示例用途和特性

**And** 必须提供 `code` prop，显示代码示例

**And** 可以选择性地提供 `layout` prop（'horizontal' 或 'vertical'），默认为 'vertical'

#### Scenario: Hooks 文档页面必须通过 TypeScript 检查

**Given** React Hooks 文档页面

**When** 运行 TypeScript 编译检查

**Then** 所有类型必须正确

**And** 不应该有类型错误

**And** 所有导入必须存在

#### Scenario: Hooks 文档页面必须通过代码质量检查

**Given** React Hooks 文档页面

**When** 运行 oxlint 和 prettier 检查

**Then** 代码必须通过 oxlint 检查

**And** 代码必须符合 prettier 格式规范

---

### Requirement: Vue Hooks 文档页面结构

Vue 文档站点的 Hooks 页面 MUST 遵循以下结构和命名规范：

```
apps/vue-docs/src/pages/hooks/
├── useCounter.page.vue
├── useToggle.page.vue
└── useLocalStorage.page.vue
```

#### Scenario: 创建 Hooks 文档页面

**Given** 需要为 Vue Hook 创建文档页面

**When** 创建文档页面文件

**Then** 文件名必须使用 camelCase 格式：`hookName.page.vue`

**And** 文件必须位于 `apps/vue-docs/src/pages/hooks/` 目录

**And** 文件必须使用 Vue 单文件组件格式（SFC）

#### Scenario: Vue Hooks 文档页面必须使用 Composition API

**Given** Vue Hooks 文档页面

**When** 编写脚本部分

**Then** 必须使用 `<script setup lang="ts">` 语法

**And** 必须使用 TypeScript 进行类型定义

#### Scenario: Vue Hooks 文档页面必须导入预览容器

**Given** Vue Hooks 文档页面

**When** 渲染 Hook 示例

**Then** 必须从 `@scxfe/docs-preview-vue` 导入 `PreviewContainer` 组件

**And** 每个示例必须使用 `PreviewContainer` 包裹

#### Scenario: Vue Hooks 文档页面必须导入对应 Hook

**Given** Vue Hooks 文档页面

**When** 渲染 Hook 示例

**Then** 必须从 `@scxfe/vue-hooks` 导入对应的 Hook

**And** 导入必须使用具名导入：`import { useCounter } from '@scxfe/vue-hooks'`

#### Scenario: Vue Hooks 文档页面必须定义代码示例字符串

**Given** Vue Hooks 文档页面

**When** 创建示例

**Then** 必须在 `<script setup>` 部分定义代码示例字符串常量

**And** 代码示例字符串必须使用模板字面量（backticks）

**And** 代码示例字符串必须展示用户实际使用的代码

**And** 代码示例字符串命名格式：`hookNameFeatureCode`

**Example**:

```vue
<script setup lang="ts">
import { useCounter } from '@scxfe/vue-hooks';
import { PreviewContainer } from '@scxfe/docs-preview-vue';

const useCounterBasicCode = `
const { count, increment, decrement, reset } = useCounter();
`;

const { count, increment, decrement, reset } = useCounter();
</script>

<template>
  <PreviewContainer
    title="基础用法"
    description="展示 useCounter Hook 的基本用法。"
    :code="useCounterBasicCode"
  >
    <div>
      <p>Count: {{ count }}</p>
      <button @click="increment">Increment</button>
      <button @click="decrement">Decrement</button>
      <button @click="reset">Reset</button>
    </div>
  </PreviewContainer>
</template>
```

#### Scenario: Vue Hooks 文档页面必须包含示例描述

**Given** PreviewContainer 组件

**When** 配置示例

**Then** 必须提供 `title` prop，描述示例名称

**And** 应该提供 `description` prop，描述示例用途和特性

**And** 必须提供 `code` prop，显示代码示例（使用 `:code="exampleCode"` 绑定）

**And** 可以选择性地提供 `layout` prop（'horizontal' 或 'vertical'），默认为 'vertical'

#### Scenario: Vue Hooks 文档页面必须通过 TypeScript 检查

**Given** Vue Hooks 文档页面

**When** 运行 TypeScript 编译检查

**Then** 所有类型必须正确

**And** 不应该有类型错误

**And** 所有导入必须存在

#### Scenario: Vue Hooks 文档页面必须通过代码质量检查

**Given** Vue Hooks 文档页面

**When** 运行 oxlint 和 prettier 检查

**Then** 代码必须通过 oxlint 检查

**And** 代码必须符合 prettier 格式规范

---

### Requirement: Hooks 文档页面路由配置

文档站点的路由配置 MUST 包含所有 Hooks 文档页面的路由。

#### Scenario: React 文档站点路由配置

**Given** React 文档站点

**When** 配置路由

**Then** 路由路径必须使用 `/hooks/{hook-name}` 格式（kebab-case）

**And** 路由组件必须正确导入对应的页面组件

**And** 路由配置必须使用 createBrowserRouter 创建

**Example**:

```tsx
{
  path: '/hooks/use-counter',
  element: <UseCounterPage />,
},
```

#### Scenario: Vue 文档站点路由配置

**Given** Vue 文档站点

**When** 配置路由

**Then** 路由路径必须使用 `/hooks/{hook-name}` 格式（kebab-case）

**And** 路由组件必须正确导入对应的页面组件

**And** 路由配置必须使用 createRouter 和 createWebHistory 创建

**Example**:

```ts
{
  path: '/hooks/use-counter',
  component: UseCounterPage,
},
```

---

### Requirement: Hooks 文档页面首页链接

文档站点的首页 MUST 提供所有 Hooks 文档页面的链接。

#### Scenario: React 文档站点首页 Hooks 列表

**Given** React 文档站点首页

**When** 渲染 Hooks 列表

**Then** 必须包含所有 Hooks 的链接

**And** 链接文本应该使用 Hook 名称

**And** 链接必须指向对应的路由路径

#### Scenario: Vue 文档站点首页 Hooks 列表

**Given** Vue 文档站点首页

**When** 渲染 Hooks 列表

**Then** 必须包含所有 Hooks 的链接

**And** 链接文本应该使用 Hook 名称

**And** 链接必须指向对应的路由路径

---

### Requirement: 旧 Hooks Demo 文件清理

完成 Hooks 文档页面迁移后，旧的 demo 文件 MUST 被删除。

#### Scenario: 删除 React Hooks Demo 文件

**Given** React Hooks 包中的 demo 文件

**When** 验证新的文档页面正常工作

**Then** 必须删除 `packages/react-hooks/src/*/demos/` 目录

**And** 所有 demo 文件必须从版本控制中移除

#### Scenario: 删除 Vue Hooks Demo 文件

**Given** Vue Hooks 包中的 demo 文件

**When** 验证新的文档页面正常工作

**Then** 必须删除 `packages/vue-hooks/src/*/demos/` 目录

**And** 所有 demo 文件必须从版本控制中移除
