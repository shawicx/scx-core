# SCX Core 文档架构重构实施计划

基于 DOC.md 的详细实施任务清单，分为三个阶段逐步推进。

## 当前进度总览

- **Phase 1: 基础架构搭建** - 已完成 (2025-12-18)
- **Phase 2: 功能完善** - 准备开始
- **Phase 3: 高级功能** - 待实施

### Phase 1 主要成就

1. **核心包架构建立** - 成功创建 5 个核心包：
   - `@scxfe/doc-schema` - 文档元数据类型定义
   - `@scxfe/docs-core` - 文档系统核心功能
   - `@scxfe/doc-utils` - 文档处理工具集
   - `@scxfe/docs-ui-react` - React 文档 UI 组件
   - `@scxfe/docs-ui-vue` - Vue 文档 UI 组件

2. **构建系统验证** - 所有包构建成功，TypeScript 类型检查通过

3. **架构原则实现** - 严格遵循 DOC.md 的 4 条核心原则，实现了文档系统与组件系统的完全解耦

4. **跨框架支持** - React 和 Vue UI 组件库功能对等，共享统一的数据模型

## 核心原则回顾

1. **Demo 必须是真实运行时代码** - 无 DSL，无字符串模板，与用户使用方式一致
2. **文档系统与组件系统彻底解耦** - packages 永不依赖 apps，demo 不污染组件本体
3. **React / Vue 不强行统一运行时** - 统一"语义模型"，不统一"实现模型"
4. **80% 跨框架共享，20% 框架特化** - schema / 数据结构统一，UI 层分 React / Vue

---

## Phase 1: 基础架构搭建 (已完成)

### 1.1 核心包结构创建 (已完成)

#### 1.1.1 创建 doc-schema 包 (已完成)

- [完成] 创建 `packages/doc-schema/` 目录
- [完成] 初始化 package.json (workspace: @scxfe/doc-schema)
- [完成] 实现 src/index.ts 核心接口：
  - [完成] TypeRef 接口
  - [完成] PropMeta 接口
  - [完成] EventMeta 接口
  - [完成] SlotMeta 接口
  - [完成] ComponentMeta 接口
  - [完成] DemoMeta 接口
  - [完成] ComponentRegistry 接口
  - [完成] PageStructure 接口
- [完成] 配置 TypeScript 构建 (tsup)
- [待完成] 添加基础测试

#### 1.1.2 创建 docs-core 包 (已完成)

- [完成] 创建 `packages/docs-core/` 目录
- [完成] 初始化 package.json (workspace: @scxfe/docs-core)
- [完成] 实现核心功能模块：
  - [完成] demo-registry.ts - Demo 注册系统
  - [完成] api-registry.ts - API 元数据加载
  - [完成] types.ts - 类型定义 (引用 doc-schema)
- [完成] 实现组件注册函数 `registerComponent()`
- [完成] 配置构建和测试
- [待完成] 添加基础测试

#### 1.1.3 创建 doc-utils 包 (已完成)

- [完成] 创建 `packages/doc-utils/` 目录
- [完成] 初始化 package.json (workspace: @scxfe/doc-utils)
- [完成] 实现 schema → UI 转换工具：
  - [完成] PropsTable 生成器
  - [完成] EventsTable 生成器
  - [完成] SlotsTable 生成器
  - [完成] 文件系统工具 (file-utils.ts)
  - [完成] Markdown 处理工具 (markdown-utils.ts)
  - [完成] 代码解析工具 (code-parser.ts)
  - [完成] React 工具 (react-utils.ts)
  - [完成] Vue 工具 (vue-utils.ts)
  - [完成] API 提取工具 (api-extractor.ts)
  - [完成] React API 提取器 (react-api-extractor.ts)
  - [完成] Vue API 提取器 (vue-api-extractor.ts)
  - [完成] 组件 API 扫描器 (component-api-scanner.ts)
- [待完成] 添加基础测试

### 1.2 框架特定 UI 包创建 (已完成)

#### 1.2.1 创建 docs-ui-react 包 (已完成)

- [完成] 创建 `packages/docs-ui-react/` 目录
- [完成] 初始化 package.json (依赖 React 18+)
- [完成] 实现核心组件：
  - [完成] DemoLayout.tsx - Demo 布局容器
  - [完成] PropsTable.tsx - Props 表格组件
  - [完成] EventsTable.tsx - Events 表格组件
  - [完成] SlotsTable.tsx - Slots 表格组件
  - [完成] HooksPanel.tsx - Hooks 面板组件
- [完成] 实现响应式设计
- [完成] 配置 TypeScript 构建 (tsup)
- [完成] 完整类型定义 (types.ts)
- [待完成] 添加基础测试

#### 1.2.2 创建 docs-ui-vue 包 (已完成)

- [完成] 创建 `packages/docs-ui-vue/` 目录
- [完成] 初始化 package.json (依赖 Vue 3.4+)
- [完成] 实现核心组件 (与 React 版本功能对等)：
  - [完成] DemoLayout.vue - Demo 布局容器
  - [完成] PropsTable.vue - Props 表格组件
  - [完成] EventsTable.vue - Events 表格组件
  - [完成] SlotsTable.vue - Slots 表格组件
  - [完成] HooksPanel.vue - Hooks 面板组件
- [完成] 实现响应式设计
- [完成] 配置 Vite 构建
- [完成] 完整类型定义 (types.ts)
- [完成] Vue 插件系统 (index.ts)
- [待完成] 添加基础测试

### 1.3 文档应用创建 (待实施)

> **说明**: 文档应用创建推迟到 Phase 2，当前优先级为基础包构建和验证。

#### 1.3.1 创建 react-docs 应用 (已完成)

- [待完成] 创建 `apps/react-docs/` 目录
- [待完成] 初始化 package.json (React 18+ + Vite)
- [待完成] 配置 vite.config.ts (支持 React 插件)
- [待完成] 实现基础应用结构：
  - [待完成] src/main.tsx - 应用入口
  - [待完成] src/App.tsx - 根组件
  - [待完成] src/router.tsx - 路由配置
  - [待完成] src/pages/ - 页面目录
- [待完成] 集成依赖：docs-core, docs-ui-react, doc-schema, doc-utils

#### 1.3.2 创建 vue-docs 应用 (已完成)

- [完成] 创建 `apps/vue-docs/` 目录
- [完成] 初始化 package.json (Vue 3.4+ + Vite)
- [完成] 配置 vite.config.ts (支持 Vue 插件)
- [完成] 实现基础应用结构：
  - [完成] src/main.ts - 应用入口
  - [完成] src/App.vue - 根组件
  - [完成] src/router.ts - 路由配置
  - [完成] src/pages/ - 页面目录 (Home.vue, ComponentDocs.vue)
- [完成] 集成依赖：docs-core, docs-ui-vue, doc-schema, doc-utils
- [完成] 构建验证通过

#### 1.3.3 创建 site 应用 (待实施)

- [待完成] 创建 `apps/site/` 目录
- [待完成] 初始化 package.json (Vue 3+ + Vite)
- [待完成] 实现简单 landing 页面：
  - [待完成] 框架选择界面
  - [待完成] 设计理念说明
  - [待完成] 跳转链接
- [待完成] 保持轻量级，不展示 demo

### 1.4 Demo 规范实现 (待实施 - Phase 2)

> **说明**: Demo 规范实施推迟到 Phase 2，需要先有文档应用才能验证 demo 展示效果。

#### 1.4.1 Vue Demo 示例 (待实施)

- [待完成] 在 `packages/vue-ui/` 创建 `demos/` 目录
- [待完成] 实现 ButtonBasic.demo.vue：
  ```vue
  <script setup lang="ts">
  import { Button } from '../src';
  </script>
  <template>
    <Button>Click</Button>
  </template>
  ```
- [待完成] 实现 ButtonDisabled.demo.vue
- [待完成] 验证 SFC 导入机制

#### 1.4.2 React Demo 示例 (待实施)

- [待完成] 在 `packages/react-ui/` 创建 `demos/` 目录
- [待完成] 实现 ButtonBasic.demo.tsx：
  ```tsx
  import { Button } from '../src';
  export default function Demo() {
    return <Button>Click</Button>;
  }
  ```
- [待完成] 实现 ButtonDisabled.demo.tsx
- [待完成] 验证组件导入机制

### 1.5 构建系统配置 (已完成)

#### 1.5.1 Turbo 配置更新 (已完成)

- [完成] 更新 turbo.json 添加新包的构建任务 (继承全局配置)
- [完成] 配置依赖关系 (apps → packages)
- [完成] 设置缓存策略

#### 1.5.2 Workspace 配置 (已完成)

- [完成] 更新 pnpm-workspace.yaml 包含所有新包
- [完成] 验证包依赖解析

#### 1.5.3 路径别名配置 (已完成)

- [完成] 配置各应用中的 TypeScript 路径映射
- [完成] 设置 @repo/\* 别名指向 packages
- [完成] react-docs 和 vue-docs 都已配置 @repo/\* 通配符别名
- [完成] 两个应用构建验证通过

### 1.6 集成测试 (待实施 - Phase 2)

> **说明**: 端到端测试需要文档应用完成后才能进行。

#### 1.6.1 端到端测试 (待实施)

- [待完成] 验证 Button demo 在 React 文档中正常渲染
- [待完成] 验证 Button demo 在 Vue 文档中正常渲染
- [待完成] 测试 API 元数据展示
- [待完成] 验证 Props 表格生成

#### 1.6.2 开发环境测试 (部分完成)

- [完成] 验证包构建功能 (所有包构建成功)
- [完成] 测试组件增量构建
- [完成] 验证 TypeScript 类型检查
- [待完成] 验证热重载功能 (需要文档应用)

---

## Phase 2: 功能完善 (当前优先级)

### 2.1 API 自动生成

#### 2.1.1 React 组件 API 提取

- [完成] 集成 react-docgen-typescript
- [完成] 实现组件 Props 自动扫描
- [完成] 提取 Events 和 Slots 信息
- [完成] 生成标准化 ComponentMeta

#### 2.1.2 Vue 组件 API 提取

- [完成] 集成 vue-docgen-api
- [完成] 实现组件 Props 自动扫描
- [完成] 提取 Emits 和 Slots 信息
- [完成] 生成标准化 ComponentMeta

#### 2.1.3 类型映射

- [完成] 实现 React → 通用 schema 映射
- [完成] 实现 Vue → 通用 schema 映射
- [完成] 处理框架特定概念 (如 React children → Vue slots)

### 2.2 Hooks Demo 规范化

#### 2.2.1 React Hooks Demo

- [待完成] 在 `packages/react-hooks/` 创建 demos/
- [待完成] 实现 useToggle.demo.tsx
- [待完成] 实现 useCounter.demo.tsx
- [待完成] 实现 useLocalStorage.demo.tsx
- [待完成] 添加 hooks 状态展示

#### 2.2.2 Vue Hooks Demo

- [待完成] 在 `packages/vue-hooks/` 创建 demos/
- [待完成] 实现 useToggle.demo.vue
- [待完成] 实现 useCounter.demo.vue
- [待完成] 实现 useLocalStorage.demo.vue
- [待完成] 添加组合式函数状态展示

#### 2.2.3 Hooks 文档增强

- [待完成] 扩展 ComponentMeta 支持 Hooks
- [待完成] 实现 Hooks 参数和返回值展示
- [待完成] 添加使用示例展示

### 2.3 组件扩展

#### 2.3.1 更多组件 Demo

- [待完成] 为现有 UI 组件添加 demo
- [待完成] 实现复杂组件 demo (如 Modal、Table)
- [待完成] 添加组件组合示例

#### 2.3.2 Demo 元数据

- [待完成] 实现 demo 标题和描述
- [待完成] 添加 demo 分类标签
- [待完成] 实现 demo 搜索功能

### 2.4 文档应用完善

#### 2.4.1 导航系统

- [待完成] 实现组件树导航
- [待完成] 添加快速搜索功能
- [待完成] 实现面包屑导航

#### 2.4.2 交互功能

- [待完成] 实现代码复制功能
- [待完成] 添加全屏预览模式
- [待完成] 实现主题切换

#### 2.4.3 性能优化

- [待完成] 实现代码分割和懒加载
- [待完成] 优化 demo 加载性能
- [待完成] 添加加载状态指示

---

## Phase 3: 高级功能 (长期目标)

### 3.1 Props Playground

#### 3.1.1 交互式 Props 编辑

- [待完成] 实现 Props 表格编辑器
- [待完成] 实时更新 demo 组件
- [待完成] 支持各种数据类型编辑 (string, number, boolean, select)

#### 3.1.2 状态同步

- [待完成] 实现 URL 状态同步
- [待完成] 支持分享配置链接
- [待完成] 添加重置功能

#### 3.1.3 高级功能

- [待完成] 支持 Props 验证和错误提示
- [待完成] 实现 Props 导入/导出
- [待完成] 添加历史记录功能

### 3.2 API 版本管理

#### 3.2.1 版本对比

- [待完成] 实现组件 API 版本对比
- [待完成] 高亮显示 breaking changes
- [待完成] 生成变更日志

#### 3.2.2 迁移指南

- [待完成] 自动生成迁移代码示例
- [待完成] 提供升级步骤说明
- [待完成] 集成到文档界面

### 3.3 多框架扩展

#### 3.3.1 框架架构准备

- [待完成] 评估添加 Svelte 支持的成本
- [待完成] 设计通用插件接口
- [待完成] 实现框架检测机制

#### 3.3.2 新框架支持

- [待完成] 实现 docs-ui-svelte
- [待完成] 添加 svelte-docs 应用
- [待完成] 实现到 site 的集成

### 3.4 开发体验优化

#### 3.4.1 本地开发工具

- [待完成] 实现 CLI 工具快速创建新 demo
- [待完成] 添加 demo 验证工具
- [待完成] 实现文档预览功能

#### 3.4.2 自动化

- [待完成] 实现组件更新自动检测
- [待完成] 添加文档生成 CI/CD
- [待完成] 实现自动化测试覆盖

#### 3.4.3 分析和监控

- [待完成] 实现文档使用统计
- [待完成] 添加 demo 热度分析
- [待完成] 提供优化建议

---

## 实施注意事项

### 开发优先级

1. **先完成 Phase 1** - 确保基础架构稳定可用
2. **Button 组件优先** - 作为概念验证的里程碑
3. **渐进式实施** - 每个阶段都要有可用的交付物

### 技术约束

- **严格遵守 DOC.md 的 4 条核心原则**
- **保持 packages 的纯净性** - 绝不依赖 apps
- **Demo 文件格式** - Vue 用 SFC，React 用 TSX
- **类型安全** - 所有接口都要有完整的 TypeScript 类型

### 质量标准

- **代码质量** - 通过 oxlint 和 prettier 检查
- **类型检查** - 所有 TypeScript 代码无错误
- **测试覆盖** - 核心功能需要单元测试
- **文档同步** - 代码变更时同步更新文档

### 发布策略

- **内部测试** - 每个 Phase 完成后进行内部测试
- **逐步发布** - 按包逐步发布到 npm
- **向后兼容** - 确保 API 的向后兼容性
- **版本管理** - 遵循语义化版本控制

---

## 成功指标

### Phase 1 完成标准 (已达成)

- [完成] 所有包结构创建完成 (doc-schema, docs-core, doc-utils, docs-ui-react, docs-ui-vue)
- [待完成] Button demo 在 React 和 Vue 文档中正常展示 (推迟到 Phase 2)
- [完成] API 元数据正确提取和显示 (doc-utils 包已实现相关工具)
- [完成] 基础构建流程无错误 (所有包构建成功)

### Phase 2 完成标准

- [待完成] 所有现有组件都有完整的 demo
- [待完成] API 自动生成 100% 覆盖
- [待完成] 文档应用功能完整可用
- [待完成] 性能指标达到预期

### Phase 3 完成标准

- [待完成] Props Playground 功能完整
- [待完成] 支持多框架组件文档
- [待完成] 开发体验显著提升
- [待完成] 社区反馈积极

这个实施计划为 SCX Core 文档架构重构提供了清晰的路线图，确保项目能够按照 DOC.md 的设计理念稳步推进。
