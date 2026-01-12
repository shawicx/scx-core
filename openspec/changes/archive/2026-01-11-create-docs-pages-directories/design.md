## Context

### 问题现状

当前文档系统的页面目录结构如下：

```
apps/react-docs/src/pages/
├── ComponentDocs.tsx
├── Home.tsx
└── PreviewExample.tsx

apps/vue-docs/src/pages/
├── ComponentDocs.vue
├── Home.vue
└── PreviewExample.vue
```

所有页面都在 `pages/` 根目录下，缺乏组织。随着后续需要迁移的组件和 Hooks 数量增加（4 个 React UI 组件 + 3 个 React Hooks + 3 个 Vue UI 组件 + 3 个 Vue Hooks = 13 个文档页面），文件管理将变得困难。

### 目标

建立清晰的目录结构，便于：

1. 组织不同类型的文档（组件、Hooks）
2. 便于后续扩展（如 utilities、guides 等）
3. 提高代码可维护性

## Goals / Non-Goals

### Goals

- 创建 `components/` 和 `hooks/` 子目录
- 为后续迁移文档页面做好准备
- 保持现有页面不受影响

### Non-Goals

- 不迁移现有文档页面（留待后续任务）
- 不修改路由配置
- 不创建任何实际的文档页面文件

## Decisions

### Decision 1: 分离 components 和 hooks 目录

**理由**：

- 组件和 Hooks 是两类不同的文档内容
- 遵循项目架构（react-ui/vue-ui 和 react-hooks/vue-hooks 分离）
- 便于用户查找和理解

**目录结构**：

```
apps/react-docs/src/pages/
├── components/          # 组件文档页面
├── hooks/               # Hooks 文档页面
├── ComponentDocs.tsx    # 现有页面
├── Home.tsx             # 现有页面
└── PreviewExample.tsx   # 现有页面

apps/vue-docs/src/pages/
├── components/          # 组件文档页面
├── hooks/               # Hooks 文档页面
├── ComponentDocs.vue    # 现有页面
├── Home.vue             # 现有页面
└── PreviewExample.vue   # 现有页面
```

### Decision 2: 使用 .gitkeep 保持空目录被 git 追踪

**理由**：

- 确保空目录被 git 追踪
- 明确目录的用途（通过目录名）
- 便于后续添加文件

**替代方案**：

- 不使用 .gitkeep：目录可能在 git 中被忽略
- 在目录中添加 README.md：增加了不必要的文件，目录名已足够说明

## Architecture

### 变更范围

- 仅新增目录，不涉及代码逻辑
- 不影响现有功能
- 为后续迁移工作做准备

### 依赖关系

此变更不依赖其他变更，可独立完成。

## Risks / Trade-offs

### Risk 1: 无实际风险

**描述**：仅创建目录，不影响现有功能。

**缓解措施**：无风险。

### Trade-off: 目录结构 vs 扁平结构

**描述**：选择嵌套目录结构而非扁平结构。

**决策**：

- 优点：更清晰的组织，便于扩展
- 缺点：增加了一层目录嵌套
- 结论：组织清晰度优于减少嵌套层级

## Migration Plan

### 阶段 1：创建目录

1. 在 React Docs 中创建 `components/` 和 `hooks/` 目录
2. 在 Vue Docs 中创建 `components/` 和 `hooks/` 目录
3. 添加 `.gitkeep` 文件

### 阶段 2：验证

1. 验证目录创建成功
2. 验证现有页面不受影响
3. 运行 TypeScript 和 lint 检查

### 回滚策略

如果出现问题，可以删除新增的目录即可回滚。

## Open Questions

无。此变更范围明确，无待解决的问题。
