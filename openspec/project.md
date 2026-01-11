# Project Context

## Purpose

SCX Core 是一个为 React 和 Vue 提供高质量 UI 组件、Hooks 和工具函数的 monorepo 项目。项目遵循语义统一原则，在 React 和 Vue 之间保持一致的 API 设计和用户体验，同时允许各自使用最佳实践。

## Tech Stack

- **TypeScript** - 主要开发语言，提供强类型支持
- **React 18.2.0** - React UI 组件和 Hooks
- **Vue 3.4.21** - Vue UI 组件和 Hooks
- **Turbo** - Monorepo 构建系统
- **pnpm 10.27.0** - 包管理器
- **Rollup** - React 包构建工具
- **Vite** - Vue 包构建工具
- **oxlint** - JavaScript/TypeScript 代码检查
- **stylelint** - CSS/SCSS/Less 样式检查
- **prettier** (prettier-config-ali) - 代码格式化
- **husky + lint-staged** - Git 钩子和暂存文件检查
- **commitlint-config-ali** - Git 提交信息检查
- **@scxfe/ts-config** - 统一的 TypeScript 配置

## Project Conventions

### Code Style

**文件和目录命名**

- React/Vue 组件文件使用 PascalCase: `Button.tsx`, `Counter.vue`
- 工具文件和普通文件使用 kebab-case: `a-map.tsx`, `interface.ts`
- Demo 文件命名: `[Component][Feature].demo.tsx` 或 `[Component][Feature].demo.vue`
- 目录使用 kebab-case: `a-map/`, `gradient-border/`

**导入规范**

- 优先使用相对路径导入同一包内的文件
- 按标准顺序分组导入: 外部库 → 内部包 → 相对路径
- 内部依赖使用 `workspace:^` 表示版本

**TypeScript 类型规范**

- 所有组件必须定义 Props 接口，明确标注类型
- 尽量避免 `any`，如必须使用请标注注释
- 使用泛型时指定类型参数
- 导出类型使用 `export interface` 或 `export type`

**命名约定**

- 组件导出使用 PascalCase: `export const Button = ...`
- 函数使用 camelCase: `handleClick`, `loadApi`
- 常量使用 UPPER_SNAKE_CASE: `defaultContainer = 'container'`
- 枚举使用 PascalCase: `CardMode.DEFAULT`, `CardMode.GRADIENT_BORDER`
- CSS 类名使用 BEM 命名约定: `scx-btn`, `scx-btn--primary`, `scx-btn__icon`
- 事件名: `click`, `update:modelValue`, `change`

**React 组件规范**

- 函数式组件优先于类组件
- 使用 Hooks 管理状态和副作用
- Props 解构作为参数: `const { width = '100%', height = '100%' } = props;`
- 使用 `useRef` 管理可变引用和 DOM 节点
- Context 文件命名为 `context.tsx`，导出 Provider 和 Hook

**Vue 组件规范**

- 使用 Composition API (`<script setup>`)
- 组件通过 `defineOptions` 显式指定名称
- Props 使用 TypeScript 接口定义，用 `withDefaults` 提供默认值
- Emits 使用 TypeScript 泛型定义事件类型
- 使用 `computed` 计算属性处理复杂逻辑
- Slots 命名使用语义化名称: `default`, `header`, `actions`

**Demo 文件规范**

- Demo 文件位于 `packages/[framework]-ui/src/components/demos/` 或 `demos/` 目录
- React Demo 是纯 React 组件，禁止使用运行时字符串模板、`component: { template }`
- Vue Demo 是 `.vue` 单文件组件
- Demo 必须是真实运行时代码，与用户使用方式一致

**CSS/样式规范**

- 优先使用 scoped 样式（Vue）或 CSS Modules
- 使用 BEM 命名约定
- 响应式单位优先使用相对单位: `rem`, `em`, `%`
- 过渡和动画使用 `transition` 和 `@keyframes`
- 主题颜色使用 CSS 变量

**注释规范**

- 复杂逻辑必须添加中文注释说明
- JSDoc 用于导出函数和复杂类型
- 避免无意义的注释

### Architecture Patterns

**Monorepo 结构**

```
packages/          # 共享包（永不依赖 apps/）
├── react-ui       # React UI 组件库
├── vue-ui         # Vue UI 组件库
├── react-hooks    # React Hooks 库
├── vue-hooks      # Vue Hooks 库
├── util           # 工具函数库
├── ts-config      # TypeScript 配置
└── doc-*/         # 文档相关包

apps/              # 应用示例
├── react-docs     # React 文档站点
├── vue-docs       # Vue 文档站点
└── site           # 主站
```

**依赖原则**

- `packages/` 永不依赖 `apps/`
- Demo 不污染组件本体
- React/Vue 不强行统一运行时，统一语义模型

### Testing Strategy

当前项目暂无测试配置。添加测试时请使用 Vitest 或 Jest。

### Git Workflow

**分支策略**

- 使用 conventional commits 规范
- 使用 commitlint-config-ali 检查提交信息

**提交规范**

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式调整（不影响功能）
- `refactor`: 重构
- `chore`: 构建/工具配置变更
- `revert`: 回退提交
- `RELEASING`: 发布相关

提交信息使用中文，例如:

```
feat: 添加用户资料编辑功能
fix: 修复用户登录时的崩溃问题
docs: 更新API文档以反映最新更改
```

**Git Hooks**

- pre-commit: 执行 lint-staged，检查暂存文件
- commit-msg: 使用 commitlint 检查提交信息格式

## Domain Context

SCX Core 专注于为现代 Web 开发提供高质量的 React 和 Vue 组件和工具。项目强调：

1. **语义统一**: React 和 Vue 组件保持一致的 API 设计和命名规范
2. **类型安全**: 全面使用 TypeScript，提供完整的类型定义
3. **最佳实践**: 遵循各框架的官方推荐和社区最佳实践
4. **开箱即用**: 提供完整的功能和详细的文档
5. **可维护性**: 清晰的代码结构和规范的注释

## Important Constraints

- **Node 版本**: >= 22
- **Package Manager**: 必须使用 pnpm 10.27.0
- **TypeScript**: 统一使用 @scxfe/ts-config
- **Monorepo 工具**: Turbo
- **代码格式化**: 统一使用 prettier-config-ali
- **提交规范**: 必须通过 commitlint-config-ali 检查
- **预发布**: 必须执行 `pnpm build` 构建所有包
- **发布流程**: 使用 changesets 管理版本和发布

## External Dependencies

### 核心框架

- React 18.2.0
- Vue 3.4.21
- ahooks (React Hooks)

### 构建工具

- Rollup
- Vite
- Turbo
- tsup

### 开发工具

- oxlint
- stylelint
- prettier
- husky
- lint-staged
- @commitlint/cli
- prettier-config-ali
- stylelint-config-ali
- commitlint-config-ali

### 其他依赖

- @amap/amap-jsapi-types (高德地图类型定义)
- @scxfe/util (内部工具包)
- @scxfe/ts-config (内部 TypeScript 配置)
