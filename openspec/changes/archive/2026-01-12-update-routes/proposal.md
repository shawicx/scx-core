# 更新路由配置

## 目标

更新 React 和 Vue 文档站点的路由配置，从动态路由改为具体路由，并更新首页组件列表。

## 背景

当前文档站点使用动态路由模式：

- React: `/components/:componentName`
- Vue: `/components/:name`

这种模式需要维护一个动态加载逻辑，增加了复杂性。根据 DOC_TASK.md 的任务4，需要：

1. 更新路由配置，添加所有组件文档页面的具体路由
2. 更新 Home 组件的组件列表

## 影响范围

### React Docs

- 文件: `apps/react-docs/src/router.tsx`
- 文件: `apps/react-docs/src/pages/Home.tsx`

### Vue Docs

- 文件: `apps/vue-docs/src/router.ts`
- 文件: `apps/vue-docs/src/pages/Home.vue`

## 依赖

此变更依赖于：

1. 组件文档页面目录结构已创建（已完成）
2. 规范 `component-docs-pages` 中已定义路由配置要求（已定义）

## 风险

- 路由配置错误可能导致 404 页面
- 首页链接错误可能导致组件无法访问
- 需要确保所有组件名称的 kebab-case 转换正确

## 成功标准

1. 所有组件文档页面都有对应的路由配置
2. 首页正确显示所有组件的链接
3. 点击首页链接能够正确导航到对应的组件文档页面
4. 所有页面能够正常加载和显示
