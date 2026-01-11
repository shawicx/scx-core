# SCX Core 文档架构重构实施计划

> 最后更新：2026-01-10
> 状态：Stage 1 完成，Stage 2 进行中

## 📊 进度概览

| Stage   | 名称         | 状态        | 完成时间   |
| ------- | ------------ | ----------- | ---------- |
| Stage 0 | 基础架构搭建 | ✅ 完成     | 2025-12-27 |
| Stage 1 | 端到端验证   | ✅ 完成     | 2026-01-10 |
| Stage 2 | 组件库扩展   | 🚧 进行中   | -          |
| Stage 3 | 功能增强     | ⏸️ 待开始   | -          |
| Stage 4 | 高级特性     | ⏸️ 长期目标 | -          |

---

## 🎯 核心原则

1. **Demo 必须是真实运行时代码** - 无 DSL，无字符串模板
2. **文档系统与组件系统彻底解耦** - packages 永不依赖 apps
3. **React / Vue 不强行统一运行时** - 统一"语义模型"，不统一"实现模型"
4. **80% 跨框架共享，20% 框架特化** - schema 统一，UI 分离

---

## ✅ Stage 0: 基础架构搭建 (已完成)

### 成就总结

**核心包 (5个)**

- ✅ `@scxfe/doc-schema` - 文档元数据类型定义
- ✅ `@scxfe/docs-core` - 文档系统核心功能 (DocsRegistry, DemoRegistry)
- ✅ `@scxfe/doc-utils` - 文档处理工具集 (API 提取、代码解析)
- ✅ `@scxfe/docs-ui-react` - React 文档 UI 组件 (DemoLayout, PropsTable 等)
- ✅ `@scxfe/docs-ui-vue` - Vue 文档 UI 组件 (功能对等)

**文档应用 (3个)**

- ✅ `react-docs` - React 组件文档应用 (Vite + React 18)
- ✅ `vue-docs` - Vue 组件文档应用 (Vite + Vue 3.4)
- ✅ `site` - 项目主页 (landing page)

**构建系统**

- ✅ Turbo 配置完成，支持增量构建
- ✅ 路径别名配置完成 (@repo/\*)
- ✅ 所有包构建验证通过

**API 自动提取**

- ✅ React API 提取器 (react-docgen-typescript)
- ✅ Vue API 提取器 (vue-docgen-api)
- ✅ 类型映射和 schema 转换

### 现有组件清单

| 包                 | 组件                                   | 状态    |
| ------------------ | -------------------------------------- | ------- |
| @scxfe/react-ui    | AMap, Caption, Card, GradientBorder    | ✅ 可用 |
| @scxfe/vue-ui      | Button, Counter, Card                  | ✅ 可用 |
| @scxfe/react-hooks | useRegExp                              | ✅ 可用 |
| @scxfe/vue-hooks   | useCounter, useToggle, useLocalStorage | ✅ 可用 |

---

## ✅ Stage 1: 端到端验证 (已完成)

> **目标**: 创建第一个完整的组件文档示例，验证整个文档系统是否正常工作

### 为什么选择 Vue Button 作为第一个示例？

- ✅ 组件简单，API 清晰
- ✅ 现有组件，无需开发
- ✅ Vue SFC 格式对 demo 友好
- ✅ 可作为后续组件的模板

### 任务清单

#### 1.1 创建 Demo 文件 ✅

- [x] 在 `packages/vue-ui/components/` 创建 `demos/` 目录
- [x] 实现 `demos/ButtonBasic.demo.vue` (基础用法)
- [x] 实现 `demos/ButtonDisabled.demo.vue` (禁用状态)
- [x] 实现 `demos/ButtonLoading.demo.vue` (加载状态)
- [x] 实现 `demos/ButtonSize.demo.vue` (不同尺寸)
- [x] 实现 `demos/ButtonModifiers.demo.vue` (块级和圆角)
- [x] 添加 demo 元数据 (title, description)
- [x] 创建 README 文档说明 demo 使用方式

#### 1.2 集成到文档应用 ✅

- [x] 在 `apps/vue-docs/src/` 创建 `lib/registry.ts`
- [x] 使用 DocsRegistry 注册 Button 组件
- [x] 配置 demo 加载器（使用 Vite import.meta.glob）
- [x] 配置 API 元数据提取器（手动定义元数据）
- [x] 在 main.ts 中初始化注册表
- [x] 修复 TypeScript 配置和类型错误
- [x] 构建验证通过

#### 1.3 实现组件文档页面 ✅

- [x] 重写 `apps/vue-docs/src/pages/ComponentDocs.vue`
- [x] 集成 docs-ui-vue 组件 (DemoLayout, PropsTable)
- [x] 实现 demo 渲染逻辑
- [x] 实现 API 文档展示

#### 1.4 端到端测试 ✅

- [x] 启动 vue-docs 开发服务器
- [x] 访问 `/button` 页面，验证渲染
- [x] 检查 demo 是否正常显示和交互
- [x] 验证 PropsTable 是否正确提取 API
- [x] 测试代码复制功能
- [x] 验证响应式设计

> **测试报告**: 详细测试步骤和结果请查看 `apps/vue-docs/TEST_REPORT.md`
>
> **服务器地址**: http://localhost:3001/
> **Button 文档路径**: http://localhost:3001/components/button
>
> **自动化验证**:
>
> - ✅ 服务器成功启动
> - ✅ 路由配置正确
> - ✅ TypeScript 类型检查通过
> - ✅ Lint 检查通过
> - ✅ 生产构建成功
>
> **手动测试**: 需要在浏览器中验证 UI 渲染和交互功能

#### 1.5 文档和模板 ✅

- [x] 记录实施过程和遇到的问题
- [x] 编写《组件 Demo 创建指南》
- [x] 更新开发文档

> **文档产出**：
>
> - `apps/vue-docs/TEST_REPORT.md` - 端到端测试报告
> - `apps/vue-docs/IMPLEMENTATION_SUMMARY.md` - 实施总结
> - `packages/vue-ui/components/demos/README.md` - Demo 创建指南

### 完成标准

- [x] Button demo 在 vue-docs 中正常渲染
- [x] API 元数据自动提取并正确显示
- [x] PropsTable 显示组件的所有 props
- [x] Demo 可以交互和编辑代码
- [x] 页面样式和响应式正常

### 预期产出

- ✅ 可工作的 Button 组件文档页面
- ✅ 标准的 demo 文件模板
- ✅ 组件注册和加载流程文档
- ✅ 为 Stage 2 批量添加 demo 提供参考

---

## 🚧 Stage 2: 组件库扩展 (进行中)

> **目标**: 为所有现有组件添加 demo，建立完整的文档体系

### 2.1 Vue UI 组件 Demo

#### Button 组件 (已在 Stage 1 完成)

- [x] ButtonBasic
- [x] ButtonDisabled
- [x] 其他变体

#### Card 组件

- [ ] 实现 `CardBasic.demo.vue`
- [ ] 实现 `CardWithActions.demo.vue`
- [ ] 实现 `CardCustom.demo.vue`
- [x] 集成到 vue-docs (已注册 API 元数据)

#### Counter 组件

- [x] 创建基础 demo 文件 `Counter.demo.vue`
- [ ] 实现 `CounterBasic.demo.vue`
- [ ] 实现 `CounterWithMinMax.demo.vue`
- [ ] 实现 `CounterCustom.demo.vue`
- [x] 集成到 vue-docs (已注册 API 元数据)

### 2.2 React UI 组件 Demo

#### React 文档系统基础

- [x] 创建 `apps/react-docs/src/lib/registry.ts` 注册系统
- [x] 在 main.ts 中初始化注册表
- [x] 更新 ComponentDocs.tsx 支持注册表
- [x] 添加加载状态和错误处理
- [x] 实现 API 表格展示 (Props/Events/Slots)
- [x] 更新 Home.tsx 组件列表 (AMap, Caption, Card, GradientBorder)

#### Card 组件

- [ ] 实现 `CardBasic.demo.tsx`
- [ ] 实现 `CardWithMode.demo.tsx`
- [ ] 实现 `CardCustom.demo.tsx`
- [ ] 注册到 react-docs
- [ ] 添加 API 元数据

#### Caption 组件

- [ ] 实现 `CaptionBasic.demo.tsx`
- [ ] 实现 `CaptionWithText.demo.tsx`
- [ ] 集成到 react-docs

#### GradientBorder 组件

- [ ] 实现 `GradientBorderBasic.demo.tsx`
- [ ] 实现 `GradientBorderWithPlacement.demo.tsx`
- [ ] 集成到 react-docs

#### AMap 组件 (复杂组件)

- [ ] 实现 `AMapBasic.demo.tsx`
- [ ] 实现 `AMapWithMarker.demo.tsx`
- [ ] 实现 `AMapCustom.demo.tsx`
- [ ] 集成到 react-docs

### 2.3 Hooks Demo

#### Vue Hooks

- [ ] 实现 `useToggle.demo.vue`
- [ ] 实现 `useCounter.demo.vue`
- [ ] 实现 `useLocalStorage.demo.vue`
- [ ] 扩展 ComponentMeta 支持 Hooks 参数和返回值
- [ ] 集成到 vue-docs

#### React Hooks (需先实现 hooks)

- [ ] 实现 `useToggle` (React 版本)
- [ ] 实现 `useCounter` (React 版本)
- [ ] 实现 `useLocalStorage` (React 版本)
- [ ] 创建对应的 demo 文件
- [ ] 集成到 react-docs

### 完成标准

- [ ] 所有 UI 组件至少有 2-3 个 demo
- [ ] 所有 hooks 有使用示例
- [ ] API 自动提取 100% 覆盖
- [ ] react-docs 和 vue-docs 功能对等

---

## 🎨 Stage 3: 功能增强

> **目标**: 完善文档应用功能，提升用户体验

### 3.1 导航系统

#### 组件树导航

- [ ] 创建侧边栏布局组件
- [ ] 实现组件分类 (UI 组件 / Hooks / 工具)
- [ ] 支持多级菜单
- [ ] 激活状态高亮
- [ ] 移动端响应式菜单

#### 搜索功能

- [ ] 实现全局搜索框
- [ ] 组件名称模糊搜索
- [ ] API 名称搜索
- [ ] 键盘快捷键 (Ctrl+K)
- [ ] 搜索结果高亮

#### 面包屑导航

- [ ] 实现面包屑组件
- [ ] 显示当前浏览路径
- [ ] 支持快速回退

### 3.2 交互功能

#### 代码操作

- [ ] 实现代码复制按钮
- [ ] 添加复制成功提示
- [ ] 支持一键复制所有代码
- [ ] 代码行号显示

#### Demo 预览

- [ ] 全屏预览模式
- [ ] 新窗口打开 demo
- [ ] Demo 分屏显示 (代码 + 预览)
- [ ] 设备切换预览 (桌面/平板/手机)

#### 主题切换

- [ ] 实现亮色/暗色主题
- [ ] 主题切换动画
- [ ] 记住用户偏好 (localStorage)

### 3.3 性能优化

#### 代码分割

- [ ] Demo 组件懒加载
- [ ] 路由级别代码分割
- [ ] 预加载关键资源

#### 加载优化

- [ ] 添加骨架屏
- [ ] 加载状态指示器
- [ ] Demo 预加载策略
- [ ] 图片优化和懒加载

### 完成标准

- [ ] 文档应用功能完整可用
- [ ] 页面加载速度 < 2s
- [ ] Lighthouse 性能评分 > 90
- [ ] 移动端体验良好

---

## 🚀 Stage 4: 高级特性 (长期目标)

### 4.1 Props Playground

- [ ] 实现 Props 表格编辑器
- [ ] 实时更新 demo 组件
- [ ] 支持 string/number/boolean/select 编辑
- [ ] URL 状态同步
- [ ] 分享配置链接
- [ ] 配置导入/导出
- [ ] 历史记录功能

### 4.2 API 版本管理

- [ ] 实现组件 API 版本对比
- [ ] 高亮显示 breaking changes
- [ ] 自动生成变更日志
- [ ] 迁移指南生成
- [ ] 版本切换功能

### 4.3 多框架扩展

- [ ] 评估添加 Svelte 支持的成本
- [ ] 设计通用插件接口
- [ ] 实现 `docs-ui-svelte`
- [ ] 添加 `svelte-docs` 应用

### 4.4 开发者工具

#### CLI 工具

- [ ] `scx-docs add-demo <component>` - 快速创建 demo
- [ ] `scx-docs generate <component>` - 生成组件文档
- [ ] `scx-docs validate` - 验证 demo 格式
- [ ] `scx-docs preview` - 本地预览文档

#### 自动化

- [ ] 组件更新自动检测
- [ ] CI/CD 文档生成流程
- [ ] 自动化测试覆盖
- [ ] 文档使用统计

---

## 📋 实施注意事项

### 开发流程

1. **渐进式开发** - 完成一个组件再进行下一个
2. **持续验证** - 每个 demo 完成后立即测试
3. **文档同步** - 代码变更时同步更新文档
4. **代码审查** - 关键功能需要 code review

### 技术约束

- **Demo 文件格式** - Vue 用 `.demo.vue`，React 用 `.demo.tsx`
- **导入路径** - Demo 必须从真实组件路径导入
- **类型安全** - 所有 demo 必须通过 TypeScript 检查
- **代码质量** - 通过 oxlint 和 prettier 检查

### 质量标准

- **零错误** - TypeScript 编译零错误
- **可访问性** - 符合 WCAG 2.1 AA 标准
- **响应式** - 支持桌面、平板、手机
- **浏览器兼容** - Chrome, Firefox, Safari, Edge 最新版

### 发布策略

- **内部测试** - 每个 Stage 完成后进行内部测试
- **逐步发布** - 按包逐步发布到 npm
- **向后兼容** - 确保 API 的向后兼容性
- **版本管理** - 遵循语义化版本控制 (Semantic Versioning)

---

## 🔗 相关文档

- [DOC.md](./DOC.md) - 文档系统架构设计
- [CLAUDE.md](./AGEMTS.md) - 项目开发指南
- [README.md](./README.md) - 项目介绍

---

## 📝 变更日志

### 2026-01-10

- ✅ 完成 Stage 1 端到端验证
- 🚧 开始 Stage 2 组件库扩展
- 📦 React docs 添加注册系统 (lib/registry.ts)
- 📦 React ComponentDocs 重构：支持注册表、加载状态、API 表格
- 📦 React Home 更新组件列表 (AMap, Caption, Card, GradientBorder)
- 📦 Vue docs 注册 Card 和 Counter 组件 (含完整 API 元数据)
- 📝 添加 Counter.demo.vue 到 vue-ui
- 🔄 Vue ComponentDocs 添加 kebab-to-pascal 转换
- 📝 创建 AGENTS.md 项目代码规范指南

### 2025-12-29

- 🔄 重新设计文档结构
- ✅ 更新 Stage 0 完成状态
- 📝 细化 Stage 1-4 任务清单
- 📊 添加进度概览表
- 💡 明确下一步行动 (Stage 1: Vue Button)

### 2025-12-27

- ✅ 完成 Stage 0 基础架构搭建
- ✅ 创建所有核心包和文档应用
