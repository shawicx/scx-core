# Change: 创建文档页面目录结构

## Why

当前文档系统将所有页面直接放在 `apps/*/src/pages/` 目录下，缺乏组织结构。随着组件和 Hooks 数量的增加，页面文件将变得难以管理，不利于后续扩展。

为了支持容器化展示系统的迁移，需要建立清晰的目录结构：

- 将组件文档页面组织到 `components/` 目录
- 将 Hooks 文档页面组织到 `hooks/` 目录
- 便于后续添加其他类型的文档（如 utilities、guides 等）

## What Changes

- 在 `apps/react-docs/src/pages/` 下创建 `components/` 和 `hooks/` 子目录
- 在 `apps/vue-docs/src/pages/` 下创建 `components/` 和 `hooks/` 子目录
- 保持现有页面（Home, ComponentDocs, PreviewExample）在 `pages/` 根目录

## Impact

- 受影响的目录：
  - `apps/react-docs/src/pages/` - 新增 `components/` 和 `hooks/` 目录
  - `apps/vue-docs/src/pages/` - 新增 `components/` 和 `hooks/` 目录
- 不影响现有功能，仅新增目录结构
- 为后续迁移组件和 Hooks 文档页面做准备

## Breaking Changes

无。这是目录结构变更，不破坏现有 API 或功能。
