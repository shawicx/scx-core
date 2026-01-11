# Change: 添加组件库 Demo 文档

## Why

Stage 1 已成功验证文档系统架构并完成 Vue Button 组件的端到端文档。目前项目有多个 UI 组件和 Hooks 缺少 Demo 文档，需要为所有现有组件创建完整的 Demo 示例，建立完整的文档体系，让开发者能快速了解和使用所有组件。

## What Changes

- 为 Vue UI 组件（Card, Counter）添加 Demo 文件
- 为 React UI 组件（Card, Caption, GradientBorder, AMap）添加 Demo 文件
- 为 Vue Hooks（useCounter, useToggle, useLocalStorage）添加 Demo 文件
- 实现 React Hooks（useCounter, useToggle, useLocalStorage）并添加 Demo 文件
- 将所有 Demo 集成到 react-docs 和 vue-docs 应用中
- 为所有组件和 Hooks 配置 API 元数据提取

## Impact

- 受影响的规范：
  - vue-ui-demos - Vue UI 组件 Demo 能力
  - react-ui-demos - React UI 组件 Demo 能力
  - vue-hooks-demos - Vue Hooks Demo 能力
  - react-hooks-demos - React Hooks 实现和 Demo 能力
- 受影响的代码：
  - packages/vue-ui/components/demos/ - Vue UI Demo 文件
  - packages/react-ui/src/\*/demos/ - React UI Demo 文件
  - packages/vue-hooks/src/\*/demos/ - Vue Hooks Demo 文件
  - packages/react-hooks/src/\*/ - React Hooks 实现和 Demo 文件
  - apps/vue-docs/src/lib/registry.ts - Vue 文档注册表
  - apps/react-docs/src/lib/registry.ts - React 文档注册表
