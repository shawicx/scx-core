# Change: 实现组件文档页面

## Why

由于旧 demo 文件已被删除（DOC_TASK.md 第6步），但文档页面尚未创建（DOC_TASK.md 第3步未完成），当前文档系统无法正常展示组件示例。需要实现所有组件和 Hooks 的文档页面，以恢复文档系统的功能。

## What Changes

- 为所有 React UI 组件创建文档页面（Card, Caption, GradientBorder, AMap）
- 为所有 Vue UI 组件创建文档页面（Button, Card, Counter）
- 为所有 React Hooks 创建文档页面（useCounter, useToggle, useLocalStorage）
- 为所有 Vue Hooks 创建文档页面（useCounter, useToggle, useLocalStorage）
- 更新 React Docs 路由配置
- 更新 Vue Docs 路由配置
- 更新 React Docs 首页组件列表
- 更新 Vue Docs 首页组件列表

## Impact

- 受影响的规范：`component-docs-pages`
- 受影响的代码：
  - `apps/react-docs/src/pages/components/` - 新增 React UI 组件文档页面
  - `apps/react-docs/src/pages/hooks/` - 新增 React Hooks 文档页面
  - `apps/react-docs/src/router.tsx` - 添加路由配置
  - `apps/react-docs/src/pages/Home.tsx` - 更新组件列表
  - `apps/vue-docs/src/pages/components/` - 新增 Vue UI 组件文档页面
  - `apps/vue-docs/src/pages/hooks/` - 新增 Vue Hooks 文档页面
  - `apps/vue-docs/src/router.ts` - 添加路由配置
  - `apps/vue-docs/src/pages/Home.vue` - 更新组件列表
