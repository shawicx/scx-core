## Context

### 问题现状

当前文档系统存在以下问题：

1. **文件数量过多**：每个组件有 2-5 个 demo 文件，总计 30+ 个 demo 文件
2. **样式分散重复**：每个 demo 都包含自己的样式代码，难以统一管理
3. **文档编写不便**：没有统一的文档页面概念，开发者需要理解 demo 结构
4. **维护成本高**：修改样式需要改动多个文件

### 目标

通过容器化展示系统：

1. 精简文件数量：从 30+ demo 文件减少到 10+ 文档页面
2. 统一样式管理：预览容器组件提供统一样式
3. 文档页面化：像写普通页面一样编写文档
4. 降低维护成本：样式和展示逻辑集中管理

## Goals / Non-Goals

### Goals

- 创建 React 和 Vue 版本的预览容器组件
- 提供统一的预览、代码展示和组合容器组件
- 支持响应式设计和跨浏览器兼容
- 集中管理预览容器的样式
- 与 `docs-ui-*` 包配合使用，不产生功能重叠

### Non-Goals

- 不实现代码编辑器（Props Playground 在后续阶段）
- 不实现代码自动提取（作为可选增强功能）
- 不修改现有的 `docs-ui-*` 包（PropsTable、EventsTable、SlotsTable）
- 不改变文档站点的路由配置方式（使用直接路由配置）

## Decisions

### Decision 1: 独立的 docs-preview-\* 包

**理由**：

- 与 `docs-ui-*` 包职责分离，`docs-preview-*` 负责预览和代码展示，`docs-ui-*` 负责 API 文档表格
- 两个包职责完全不同，无功能重叠
- 便于独立维护和版本管理

**替代方案**：

- 将预览容器组件放入 `docs-ui-*` 包：会导致包职责不清，违反单一职责原则
- 创建统一的 `docs-ui` 包：React 和 Vue 无法共享代码，反而增加复杂度

### Decision 2: 直接路由配置，不使用注册表

**理由**：

- 文档站点是静态内容，不会动态添加组件
- 直接配置路由更符合 React Router 和 Vue Router 的常规用法
- 减少不必要的抽象层，降低理解成本

**替代方案**：

- 使用注册表动态生成路由：增加了复杂度，但对于静态文档站点没有实际价值

### Decision 3: Preview 组件支持可配置的样式选项

**理由**：

- 不同组件可能需要不同的预览容器样式（背景色、边框、宽度）
- 通过 props 提供配置，保持组件灵活性

**配置项**：

- `width`: 'full' | 'container' | 'narrow'
- `background`: 'white' | 'gray' | 'transparent'
- `bordered`: boolean

### Decision 4: CodeBlock 组件支持可选的行号和复制功能

**理由**：

- 提供良好的代码阅读体验（行号）
- 方便用户复制代码示例（复制按钮）
- 通过 props 控制功能，避免强制行为

**配置项**：

- `showLineNumbers`: boolean
- `showCopy`: boolean
- `title`: string（可选的代码块标题）

## Architecture

### 包结构

```
docs-preview-react/
├── src/
│   ├── Preview.tsx           # 预览容器组件
│   ├── CodeBlock.tsx         # 代码展示组件
│   ├── PreviewContainer.tsx   # 组合容器组件
│   └── index.ts
├── package.json
├── tsconfig.json
└── tsup.config.ts           # 使用 tsup 构建工具

docs-preview-vue/
├── src/
│   ├── Preview.vue           # 预览容器组件
│   ├── CodeBlock.vue         # 代码展示组件
│   ├── PreviewContainer.vue   # 组合容器组件
│   └── index.ts
├── package.json
├── tsconfig.json
└── vite.config.ts          # 使用 vite 构建工具
```

### 组件职责

| 组件             | 职责                      | 状态管理               |
| ---------------- | ------------------------- | ---------------------- |
| Preview          | 提供统一的预览容器样式    | 无                     |
| CodeBlock        | 展示代码，支持复制和高亮  | 内部 state（复制状态） |
| PreviewContainer | 组合 Preview 和 CodeBlock | 无                     |

### 依赖关系

```txt
docs-preview-react  ──▶ doc-schema
docs-preview-vue   ──▶ doc-schema

apps/react-docs     ──▶ docs-preview-react
apps/vue-docs       ──▶ docs-preview-vue
```

## Risks / Trade-offs

### Risk 1: 包数量增加

**描述**：新增两个包（docs-preview-react 和 docs-preview-vue），增加了 monorepo 的复杂度。

**缓解措施**：

- 两个包职责清晰，易于理解
- 与现有 `docs-ui-*` 包职责对称
- 提供完善的文档和示例

### Risk 2: 样式覆盖冲突

**描述**：预览容器的样式可能与文档站点的全局样式产生冲突。

**缓解措施**：

- 使用 CSS Modules 或 scoped 样式
- 遵循 BEM 命名约定（`preview-*`、`code-block-*`）
- 提供样式重置和隔离

### Trade-off: 简单 vs 灵活

**描述**：组件设计需要在简单性和灵活性之间取得平衡。

**决策**：

- 优先保证简单性（直接可用，无需配置）
- 通过 props 提供必要的灵活性（width、background、bordered）
- 避免过度配置（如自定义主题系统）

## Migration Plan

### 阶段 1：创建预览容器包

1. 创建 `packages/docs-preview-react/` 和 `packages/docs-preview-vue/` 目录
2. 配置 package.json、tsconfig.json 和构建工具
3. 实现 Preview、CodeBlock、PreviewContainer 组件
4. 添加样式文件
5. 构建验证

### 阶段 2：迁移文档页面

1. 在 `apps/react-docs/src/pages/` 和 `apps/vue-docs/src/pages/` 创建文档页面
2. 使用新的预览容器组件展示 demo
3. 迁移现有 demo 内容到文档页面
4. 更新路由配置（直接配置，不使用注册表）

### 阶段 3：清理旧文件

1. 删除分散的 demo 文件
2. 删除旧的 registry.ts（如果有）
3. 验证所有文档页面正常工作

### 回滚策略

如果新方案出现问题：

1. 保留旧的 demo 文件直到新方案完全验证通过
2. 可以通过 Git 回退到旧方案
3. 新旧方案可以并存，逐步迁移

## Open Questions

1. CodeBlock 是否需要集成语法高亮库（如 Prism.js、Shiki）？
   - **权衡**：增加包大小 vs 提供更好的代码阅读体验
   - **建议**：先使用基础样式，后续根据反馈决定是否集成

2. 是否需要支持深色模式的代码块？
   - **权衡**：增加复杂度 vs 提供更好的用户体验
   - **建议**：先实现基础功能，深色模式作为后续增强

3. PreviewContainer 是否需要支持左右分屏布局（horizontal）？
   - **权衡**：增加复杂度 vs 适应不同屏幕尺寸
   - **建议**：先实现垂直布局，左右布局作为可选增强
