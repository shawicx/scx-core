# Change: 创建预览容器包

## Why

当前文档系统使用分散的 demo 文件（30+ 个文件），每个 demo 都包含自己的样式代码，导致：

- 文件数量过多，维护成本高
- 样式代码重复分散
- 缺少统一的文档页面概念

需要通过创建预览容器包来实现容器化展示系统，将 demo 从分散文件改为统一的文档页面。

## What Changes

- 创建 `@scxfe/docs-preview-react` 包，提供 React 预览容器组件
- 创建 `@scxfe/docs-preview-vue` 包，提供 Vue 预览容器组件
- 实现统一的预览容器组件：Preview、CodeBlock、PreviewContainer
- 集中管理预览和代码展示的样式

## Impact

- 受影响的包：
  - 新增 `packages/docs-preview-react/`
  - 新增 `packages/docs-preview-vue/`
  - 依赖 `@scxfe/doc-schema` 用于类型定义
- 受影响的应用：
  - `apps/react-docs/` - 将使用新的预览容器组件
  - `apps/vue-docs/` - 将使用新的预览容器组件
- 架构影响：引入新的包职责划分，与 `docs-ui-*` 包配合使用

## Breaking Changes

无。这是新增功能，不破坏现有 API。
