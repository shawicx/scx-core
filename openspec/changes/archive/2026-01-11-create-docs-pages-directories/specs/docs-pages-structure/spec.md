# Spec: 文档页面目录结构

定义文档站点的页面目录结构规范，支持组件、Hooks 和其他类型文档的组织。

## ADDED Requirements

### Requirement: 文档页面目录结构

文档站点 MUST 使用分层目录结构组织不同类型的文档页面：

```
apps/react-docs/src/pages/
├── components/          # 组件文档页面
├── hooks/               # Hooks 文档页面
├── Home.tsx             # 首页
├── ComponentDocs.tsx    # 通用组件文档页面
└── PreviewExample.tsx   # 预览容器示例页面

apps/vue-docs/src/pages/
├── components/          # 组件文档页面
├── hooks/               # Hooks 文档页面
├── Home.vue             # 首页
├── ComponentDocs.vue    # 通用组件文档页面
└── PreviewExample.vue   # 预览容器示例页面
```

#### Scenario: 创建组件文档目录

**Given** React 或 Vue 文档站点项目

**When** 项目初始化或更新目录结构

**Then** 必须在 `apps/{framework}-docs/src/pages/` 下创建 `components/` 目录

**And** 目录必须包含 `.gitkeep` 文件以保持空目录被 git 追踪

#### Scenario: 创建 Hooks 文档目录

**Given** React 或 Vue 文档站点项目

**When** 项目初始化或更新目录结构

**Then** 必须在 `apps/{framework}-docs/src/pages/` 下创建 `hooks/` 目录

**And** 目录必须包含 `.gitkeep` 文件以保持空目录被 git 追踪

#### Scenario: 保持现有页面不变

**Given** 现有文档站点页面（Home, ComponentDocs, PreviewExample）

**When** 创建新的目录结构

**Then** 现有页面必须保持在 `pages/` 根目录

**And** 不影响现有功能
