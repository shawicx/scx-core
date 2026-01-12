# 组件文档页面规范

## Purpose

定义组件文档页面的结构、格式和内容要求，确保所有组件文档页面统一、一致、易于维护。

## ADDED Requirements

### Requirement: React 组件文档页面结构

React 文档站点的组件页面 MUST 遵循以下结构和命名规范：

```
apps/react-docs/src/pages/components/
├── Card.page.tsx
├── Caption.page.tsx
├── GradientBorder.page.tsx
└── AMap.page.tsx
```

#### Scenario: 创建组件文档页面

**Given** 需要为 React 组件创建文档页面

**When** 创建文档页面文件

**Then** 文件名必须使用 PascalCase 格式：`ComponentName.page.tsx`

**And** 文件必须位于 `apps/react-docs/src/pages/components/` 目录

**And** 文件必须默认导出一个 React 组件

#### Scenario: 组件文档页面必须导入预览容器

**Given** React 组件文档页面

**When** 渲染组件示例

**Then** 必须从 `@scxfe/docs-preview-react` 导入 `PreviewContainer` 组件

**And** 每个示例必须使用 `PreviewContainer` 包裹

#### Scenario: 组件文档页面必须导入对应组件

**Given** React 组件文档页面

**When** 渲染组件示例

**Then** 必须从 `@scxfe/react-ui` 导入对应的组件

**And** 导入必须使用具名导入：`import { Card } from '@scxfe/react-ui'`

#### Scenario: 组件文档页面必须定义代码示例字符串

**Given** React 组件文档页面

**When** 创建示例

**Then** 必须为每个示例定义对应的代码示例字符串常量

**And** 代码示例字符串必须使用模板字面量（backticks）

**And** 代码示例字符串必须展示用户实际使用的代码

**And** 代码示例字符串命名格式：`exampleNameCode` 或 `componentNameFeatureCode`

**Example**:

```tsx
const cardBasicCode = `
<Card mode={CardMode.DEFAULT}>
  <h4>默认模式卡片</h4>
  <p>这是一个默认模式的卡片组件。</p>
</Card>
`;
```

#### Scenario: 组件文档页面必须包含示例描述

**Given** PreviewContainer 组件

**When** 配置示例

**Then** 必须提供 `title` prop，描述示例名称

**And** 应该提供 `description` prop，描述示例用途和特性

**And** 必须提供 `code` prop，显示代码示例

**And** 可以选择性地提供 `layout` prop（'horizontal' 或 'vertical'），默认为 'vertical'

#### Scenario: 组件文档页面必须通过 TypeScript 检查

**Given** React 组件文档页面

**When** 运行 TypeScript 编译检查

**Then** 所有类型必须正确

**And** 不应该有类型错误

**And** 所有导入必须存在

#### Scenario: 组件文档页面必须通过代码质量检查

**Given** React 组件文档页面

**When** 运行 oxlint 和 prettier 检查

**Then** 代码必须通过 oxlint 检查

**And** 代码必须符合 prettier 格式规范

---

### Requirement: Vue 组件文档页面结构

Vue 文档站点的组件页面 MUST 遵循以下结构和命名规范：

```
apps/vue-docs/src/pages/components/
├── Button.page.vue
├── Card.page.vue
└── Counter.page.vue
```

#### Scenario: 创建组件文档页面

**Given** 需要为 Vue 组件创建文档页面

**When** 创建文档页面文件

**Then** 文件名必须使用 PascalCase 格式：`ComponentName.page.vue`

**And** 文件必须位于 `apps/vue-docs/src/pages/components/` 目录

**And** 文件必须使用 Vue 单文件组件格式（SFC）

#### Scenario: Vue 组件文档页面必须使用 Composition API

**Given** Vue 组件文档页面

**When** 编写脚本部分

**Then** 必须使用 `<script setup lang="ts">` 语法

**And** 必须使用 TypeScript 进行类型定义

#### Scenario: Vue 组件文档页面必须导入预览容器

**Given** Vue 组件文档页面

**When** 渲染组件示例

**Then** 必须从 `@scxfe/docs-preview-vue` 导入 `PreviewContainer` 组件

**And** 每个示例必须使用 `PreviewContainer` 包裹

#### Scenario: Vue 组件文档页面必须导入对应组件

**Given** Vue 组件文档页面

**When** 渲染组件示例

**Then** 必须从 `@scxfe/vue-ui` 导入对应的组件

**And** 导入必须使用默认导入：`import Button from '@scxfe/vue-ui'`

#### Scenario: Vue 组件文档页面必须定义代码示例字符串

**Given** Vue 组件文档页面

**When** 创建示例

**Then** 必须在 `<script setup>` 部分定义代码示例字符串常量

**And** 代码示例字符串必须使用模板字面量（backticks）

**And** 代码示例字符串必须展示用户实际使用的代码

**And** 代码示例字符串命名格式：`exampleNameCode` 或 `componentNameFeatureCode`

**Example**:

```vue
<script setup lang="ts">
import Button from '@scxfe/vue-ui';
import { PreviewContainer } from '@scxfe/docs-preview-vue';

const buttonBasicCode = `
<Button type="primary">主要按钮</Button>
<Button type="secondary">次要按钮</Button>
`;
</script>
```

#### Scenario: Vue 组件文档页面必须包含示例描述

**Given** PreviewContainer 组件

**When** 配置示例

**Then** 必须提供 `title` prop，描述示例名称

**And** 应该提供 `description` prop，描述示例用途和特性

**And** 必须提供 `code` prop，显示代码示例（使用 `:code="exampleCode"` 绑定）

**And** 可以选择性地提供 `layout` prop（'horizontal' 或 'vertical'），默认为 'vertical'

#### Scenario: Vue 组件文档页面必须通过 TypeScript 检查

**Given** Vue 组件文档页面

**When** 运行 TypeScript 编译检查

**Then** 所有类型必须正确

**And** 不应该有类型错误

**And** 所有导入必须存在

#### Scenario: Vue 组件文档页面必须通过代码质量检查

**Given** Vue 组件文档页面

**When** 运行 oxlint 和 prettier 检查

**Then** 代码必须通过 oxlint 检查

**And** 代码必须符合 prettier 格式规范

---

### Requirement: 组件文档页面路由配置

文档站点的路由配置 MUST 包含所有组件文档页面的路由。

#### Scenario: React 文档站点路由配置

**Given** React 文档站点

**When** 配置路由

**Then** 路由路径必须使用 `/components/{component-name}` 格式（kebab-case）

**And** 路由组件必须正确导入对应的页面组件

**And** 路由配置必须使用 createBrowserRouter 创建

**Example**:

```tsx
{
  path: '/components/card',
  element: <CardPage />,
},
```

#### Scenario: Vue 文档站点路由配置

**Given** Vue 文档站点

**When** 配置路由

**Then** 路由路径必须使用 `/components/{component-name}` 格式（kebab-case）

**And** 路由组件必须正确导入对应的页面组件

**And** 路由配置必须使用 createRouter 和 createWebHistory 创建

**Example**:

```ts
{
  path: '/components/button',
  component: ButtonPage,
},
```

---

### Requirement: 组件文档页面首页链接

文档站点的首页 MUST 提供所有组件文档页面的链接。

#### Scenario: React 文档站点首页组件列表

**Given** React 文档站点首页

**When** 渲染组件列表

**Then** 必须包含所有组件的链接

**And** 链接文本应该使用组件名称

**And** 链接必须指向对应的路由路径

#### Scenario: Vue 文档站点首页组件列表

**Given** Vue 文档站点首页

**When** 渲染组件列表

**Then** 必须包含所有组件的链接

**And** 链接文本应该使用组件名称

**And** 链接必须指向对应的路由路径

---

### Requirement: 旧组件 Demo 文件清理

完成组件文档页面迁移后，旧的 demo 文件 MUST 被删除。

#### Scenario: 删除 React UI Demo 文件

**Given** React UI 包中的 demo 文件

**When** 验证新的文档页面正常工作

**Then** 必须删除 `packages/react-ui/src/*/demos/` 目录

**And** 所有 demo 文件必须从版本控制中移除

#### Scenario: 删除 Vue UI Demo 文件

**Given** Vue UI 包中的 demo 文件

**When** 验证新的文档页面正常工作

**Then** 必须删除 `packages/vue-ui/src/components/demos/` 目录

**And** 所有 demo 文件必须从版本控制中移除
