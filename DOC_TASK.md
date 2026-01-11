# SCX Core 文档架构重构实施计划

> 最后更新：2026-01-11
> 当前阶段：容器化重构

## 📊 进度概览

| 阶段       | 名称         | 状态        |
| ---------- | ------------ | ----------- |
| 基础架构   | 基础架构搭建 | ✅ 完成     |
| 端到端验证 | 端到端验证   | ✅ 完成     |
| 组件库扩展 | 组件库扩展   | ✅ 完成     |
| 容器化重构 | 容器化重构   | 🔄 进行中   |
| 高级特性   | 高级特性     | ⏸️ 长期目标 |

---

## 🎯 核心原则

1. **Demo 必须是真实运行时代码** - 无 DSL，无字符串模板
2. **文档系统与组件系统彻底解耦** - packages 永不依赖 apps
3. **React / Vue 不强行统一运行时** - 统一"语义模型"，不统一"实现模型"
4. **80% 跨框架共享，20% 框架特化** - schema 统一，UI 分离
5. **容器化展示，页面化文档** - 统一预览容器，文档即页面

---

## 🔄 容器化重构

### 目标

从分散的 demo 文件重构为容器化展示系统

### 现有组件清单

| 包                 | 组件                                   |
| ------------------ | -------------------------------------- |
| @scxfe/react-ui    | AMap, Caption, Card, GradientBorder    |
| @scxfe/vue-ui      | Button, Counter, Card                  |
| @scxfe/react-hooks | useCounter, useToggle, useLocalStorage |
| @scxfe/vue-hooks   | useCounter, useToggle, useLocalStorage |

### 实施任务

#### 1. 创建预览容器包

##### React 预览容器包

- [ ] 创建 `packages/docs-preview-react/` 目录
- [ ] 初始化 package.json
- [ ] 配置 TypeScript
- [ ] 配置构建工具（tsup）
- [ ] 实现 `Preview.tsx` 组件
- [ ] 实现 `CodeBlock.tsx` 组件
- [ ] 实现 `PreviewContainer.tsx` 组件
- [ ] 添加样式文件
- [ ] 编写导出文件 `index.ts`
- [ ] 构建验证

##### Vue 预览容器包

- [ ] 创建 `packages/docs-preview-vue/` 目录
- [ ] 初始化 package.json
- [ ] 配置 TypeScript + Vue
- [ ] 配置构建工具（vite）
- [ ] 实现 `Preview.vue` 组件
- [ ] 实现 `CodeBlock.vue` 组件
- [ ] 实现 `PreviewContainer.vue` 组件
- [ ] 添加样式文件
- [ ] 编写导出文件 `index.ts`
- [ ] 构建验证

#### 2. 创建文档页面目录结构

##### React Docs

- [ ] 创建 `apps/react-docs/src/pages/components/` 目录
- [ ] 创建 `apps/react-docs/src/pages/hooks/` 目录

##### Vue Docs

- [ ] 创建 `apps/vue-docs/src/pages/components/` 目录
- [ ] 创建 `apps/vue-docs/src/pages/hooks/` 目录

#### 3. 迁移组件到文档页面

##### React UI 组件

- [ ] Card - 创建 `Card.page.tsx`，迁移 3 个 demo
- [ ] Caption - 创建 `Caption.page.tsx`，迁移 2 个 demo
- [ ] GradientBorder - 创建 `GradientBorder.page.tsx`，迁移 2 个 demo
- [ ] AMap - 创建 `AMap.page.tsx`，迁移 3 个 demo

##### Vue UI 组件

- [ ] Button - 创建 `Button.page.vue`，迁移 5 个 demo
- [ ] Card - 创建 `Card.page.vue`，迁移 3 个 demo
- [ ] Counter - 创建 `Counter.page.vue`，迁移 3 个 demo

##### React Hooks

- [ ] useCounter - 创建 `useCounter.page.tsx`，迁移 2 个 demo
- [ ] useToggle - 创建 `useToggle.page.tsx`，迁移 2 个 demo
- [ ] useLocalStorage - 创建 `useLocalStorage.page.tsx`，迁移 2 个 demo

##### Vue Hooks

- [ ] useCounter - 创建 `useCounter.page.vue`，迁移 2 个 demo
- [ ] useToggle - 创建 `useToggle.page.vue`，迁移 2 个 demo
- [ ] useLocalStorage - 创建 `useLocalStorage.page.vue`，迁移 2 个 demo

#### 4. 更新路由配置

##### React Docs

- [ ] 更新 `apps/react-docs/src/router.tsx`
- [ ] 添加所有组件文档页面路由
- [ ] 更新 Home.tsx 组件列表

##### Vue Docs

- [ ] 更新 `apps/vue-docs/src/router.ts`
- [ ] 添加所有组件文档页面路由
- [ ] 更新 Home.vue 组件列表

#### 5. 创建 ComponentLayout 组件

- [ ] 创建 `apps/react-docs/src/pages/ComponentLayout.tsx`
- [ ] 创建 `apps/vue-docs/src/pages/ComponentLayout.vue`

#### 6. 删除旧 Demo 文件

##### React

- [ ] 删除 `packages/react-ui/src/card/demos/`
- [ ] 删除 `packages/react-ui/src/caption/demos/`
- [ ] 删除 `packages/react-ui/src/gradient-border/demos/`
- [ ] 删除 `packages/react-ui/src/a-map/demos/`
- [ ] 删除 `packages/react-hooks/src/useCounter/demos/`
- [ ] 删除 `packages/react-hooks/src/useToggle/demos/`
- [ ] 删除 `packages/react-hooks/src/useLocalStorage/demos/`

##### Vue

- [ ] 删除 `packages/vue-ui/src/components/demos/`
- [ ] 删除 `packages/vue-hooks/src/useCounter/demos/`
- [ ] 删除 `packages/vue-hooks/src/useToggle/demos/`
- [ ] 删除 `packages/vue-hooks/src/useLocalStorage/demos/`

#### 7. 验证和测试

- [ ] 启动 react-docs，验证所有页面
- [ ] 启动 vue-docs，验证所有页面
- [ ] 测试桌面端（1920x1080）
- [ ] 测试平板端（768x1024）
- [ ] 测试手机端（375x667）
- [ ] 测试 Chrome、Firefox、Safari、Edge

#### 8. 文档更新

- [ ] 更新 `DOC.md`
- [ ] 更新 `AGENTS.md`，添加容器化相关规范

---

## 🚀 高级特性（长期目标）

### 1. Props Playground

- [ ] 实现 Props 表格编辑器
- [ ] 实时更新 demo 组件
- [ ] URL 状态同步
- [ ] 分享配置链接

### 2. API 版本管理

- [ ] 实现 API 版本对比
- [ ] 高亮显示 breaking changes
- [ ] 自动生成变更日志

### 3. 多框架扩展

- [ ] 评估添加 Svelte 支持
- [ ] 设计通用插件接口

### 4. 开发者工具

- [ ] `scx-docs add-page <component>` - 快速创建文档页面
- [ ] `scx-docs generate <component>` - 生成组件文档
- [ ] `scx-docs validate` - 验证文档格式

---

## 📋 实施注意事项

### 开发流程

1. 先创建容器包，确保功能正确
2. 再迁移一个组件（如 Card）作为试点
3. 验证通过后批量迁移
4. 最后删除旧 demo 文件

### 技术约束

- 文档页面格式：React 用 `.page.tsx`，Vue 用 `.page.vue`
- 代码示例格式：必须是真实的运行时代码字符串
- 类型安全：所有文档页面必须通过 TypeScript 检查
- 代码质量：通过 oxlint 和 prettier 检查

### 质量标准

- 零错误：TypeScript 编译零错误
- 可访问性：符合 WCAG 2.1 AA 标准
- 响应式：支持桌面、平板、手机
- 浏览器兼容：Chrome, Firefox, Safari, Edge 最新版
- 性能：页面加载速度 < 2s

---

## 🔗 相关文档

- [DOC.md](./DOC.md) - 文档系统架构设计
- [AGENTS.md](./AGENTS.md) - 项目开发指南
- [README.md](./README.md) - 项目介绍
