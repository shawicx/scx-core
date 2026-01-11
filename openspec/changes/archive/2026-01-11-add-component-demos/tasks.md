# Tasks: 添加组件库 Demo 文档

## 1. Vue UI 组件 Demo

- [x] 1.1 实现 Card 组件 Demo
  - [x] 1.1.1 创建 CardBasic.demo.vue（基础用法）
  - [x] 1.1.2 创建 CardWithActions.demo.vue（带操作按钮）
  - [x] 1.1.3 创建 CardCustom.demo.vue（自定义样式）
- [x] 1.2 实现 Counter 组件 Demo
  - [x] 1.2.1 创建 CounterBasic.demo.vue（基础用法）
  - [x] 1.2.2 创建 CounterWithMinMax.demo.vue（限制范围）
  - [x] 1.2.3 创建 CounterCustom.demo.vue（自定义样式）
- [x] 1.3 集成到 vue-docs
  - [x] 1.3.1 更新 apps/vue-docs/src/lib/registry.ts 注册 Card Demo
  - [x] 1.3.2 更新 apps/vue-docs/src/lib/registry.ts 注册 Counter Demo
  - [ ] 1.3.3 验证 API 元数据提取正确性
  - [ ] 1.3.4 在浏览器中测试 Demo 渲染和交互

## 2. React UI 组件 Demo

- [x] 2.1 创建 demos 目录结构
  - [x] 2.1.1 为 Card 组件创建 src/card/demos/ 目录
  - [x] 2.1.2 为 Caption 组件创建 src/caption/demos/ 目录
  - [x] 2.1.3 为 GradientBorder 组件创建 src/gradient-border/demos/ 目录
  - [x] 2.1.4 为 AMap 组件创建 src/a-map/demos/ 目录
- [x] 2.2 实现 Card 组件 Demo
  - [x] 2.2.1 创建 CardBasic.demo.tsx（基础用法）
  - [x] 2.2.2 创建 CardWithMode.demo.tsx（不同模式）
  - [x] 2.2.3 创建 CardCustom.demo.tsx（自定义样式）
  - [x] 2.2.4 更新 apps/react-docs/src/lib/registry.ts 注册 Card Demo
  - [x] 2.2.5 配置 API 元数据（Props, Events）
- [x] 2.3 实现 Caption 组件 Demo
  - [x] 2.3.1 创建 CaptionBasic.demo.tsx（基础用法）
  - [x] 2.3.2 创建 CaptionWithText.demo.tsx（带文本）
  - [x] 2.3.3 更新 apps/react-docs/src/lib/registry.ts 注册 Caption Demo
  - [x] 2.3.4 配置 API 元数据
- [x] 2.4 实现 GradientBorder 组件 Demo
  - [x] 2.4.1 创建 GradientBorderBasic.demo.tsx（基础用法）
  - [x] 2.4.2 创建 GradientBorderWithPlacement.demo.tsx（不同位置）
  - [x] 2.4.3 更新 apps/react-docs/src/lib/registry.ts 注册 GradientBorder Demo
  - [x] 2.4.4 配置 API 元数据
- [x] 2.5 实现 AMap 组件 Demo
  - [x] 2.5.1 创建 AMapBasic.demo.tsx（基础地图）
  - [x] 2.5.2 创建 AMapWithMarker.demo.tsx（带标记点）
  - [x] 2.5.3 创建 AMapCustom.demo.tsx（自定义配置）
  - [x] 2.5.4 更新 apps/react-docs/src/lib/registry.ts 注册 AMap Demo
  - [x] 2.5.5 配置 API 元数据
- [ ] 2.6 验证所有 React Demo
  - [ ] 2.6.1 启动 react-docs 开发服务器
  - [ ] 2.6.2 在浏览器中测试所有组件 Demo 渲染
  - [ ] 2.6.3 验证 API 表格正确显示
  - [ ] 2.6.4 测试代码复制功能

## 3. Vue Hooks Demo

- [x] 3.1 创建 Vue Hooks demos 目录结构
  - [x] 3.1.1 为 useCounter 创建 src/useCounter/demos/ 目录
  - [x] 3.1.2 为 useToggle 创建 src/useToggle/demos/ 目录
  - [x] 3.1.3 为 useLocalStorage 创建 src/useLocalStorage/demos/ 目录
- [x] 3.2 实现 useCounter Demo
  - [x] 3.2.1 创建 useCounterBasic.demo.vue（基础用法）
  - [x] 3.2.2 创建 useCounterAdvanced.demo.vue（高级用法）
  - [x] 3.2.3 更新 apps/vue-docs/src/lib/registry.ts 注册 useCounter Demo
  - [x] 3.2.4 配置 API 元数据（参数和返回值）
- [x] 3.3 实现 useToggle Demo
  - [x] 3.3.1 创建 useToggleBasic.demo.vue（基础用法）
  - [x] 3.3.2 创建 useToggleAdvanced.demo.vue（高级用法）
  - [x] 3.3.3 更新 apps/vue-docs/src/lib/registry.ts 注册 useToggle Demo
  - [x] 3.3.4 配置 API 元数据
- [x] 3.4 实现 useLocalStorage Demo
  - [x] 3.4.1 创建 useLocalStorageBasic.demo.vue（基础用法）
  - [x] 3.4.2 创建 useLocalStorageAdvanced.demo.vue（高级用法）
  - [x] 3.4.3 更新 apps/vue-docs/src/lib/registry.ts 注册 useLocalStorage Demo
  - [x] 3.4.4 配置 API 元数据
- [ ] 3.5 验证所有 Vue Hooks Demo
  - [ ] 3.5.1 在浏览器中测试所有 Hooks Demo 渲染
  - [ ] 3.5.2 验证 API 表格正确显示参数和返回值
  - [ ] 3.5.3 测试 Demo 交互功能

## 4. React Hooks 实现和 Demo

- [x] 4.1 实现 React Hooks
  - [x] 4.1.1 实现 useCounter hook（参考 Vue 版本）
  - [x] 4.1.2 实现 useToggle hook（参考 Vue 版本）
  - [x] 4.1.3 实现 useLocalStorage hook（参考 Vue 版本）
  - [x] 4.1.4 更新 packages/react-hooks/src/index.ts 导出所有 hooks
- [x] 4.2 创建 React Hooks demos 目录结构
  - [x] 4.2.1 为 useCounter 创建 src/useCounter/demos/ 目录
  - [x] 4.2.2 为 useToggle 创建 src/useToggle/demos/ 目录
  - [x] 4.2.3 为 useLocalStorage 创建 src/useLocalStorage/demos/ 目录
- [x] 4.3 实现 React Hooks Demo
  - [x] 4.3.1 为 useCounter 创建 Demo 文件（对应 Vue 版本）
  - [x] 4.3.2 为 useToggle 创建 Demo 文件（对应 Vue 版本）
  - [x] 4.3.3 为 useLocalStorage 创建 Demo 文件（对应 Vue 版本）
  - [x] 4.3.4 更新 apps/react-docs/src/lib/registry.ts 注册所有 Hooks Demo
  - [x] 4.3.5 配置 API 元数据（参数和返回值）
- [ ] 4.4 验证所有 React Hooks Demo
  - [ ] 4.4.1 在浏览器中测试所有 Hooks Demo 渲染
  - [ ] 4.4.2 验证 API 表格正确显示参数和返回值
  - [ ] 4.4.3 测试 Demo 交互功能

## 5. 质量保证和文档

- [x] 5.1 代码质量检查
  - [x] 5.1.1 运行 pnpm lint 检查所有包
  - [x] 5.1.2 运行 pnpm lint:fix 修复问题
  - [ ] 5.1.3 运行 pnpm format 格式化代码
  - [ ] 5.1.4 运行 TypeScript 类型检查
- [ ] 5.2 构建验证
  - [ ] 5.2.1 运行 pnpm build 构建所有包
  - [ ] 5.2.2 验证构建成功，无错误和警告
- [ ] 5.3 端到端测试
  - [ ] 5.3.1 启动 vue-docs 开发服务器，验证所有 Vue 组件和 Hooks Demo
  - [ ] 5.3.2 启动 react-docs 开发服务器，验证所有 React 组件和 Hooks Demo
  - [ ] 5.3.3 验证 API 表格正确提取和显示
  - [ ] 5.3.4 验证代码复制功能正常
  - [ ] 5.3.5 验证响应式设计正常
- [ ] 5.4 文档更新
  - [ ] 5.4.1 更新 DOC_TASK.md Stage 2 完成状态
  - [ ] 5.4.2 添加各组件 Demo 创建指南
  - [ ] 5.4.3 记录实施过程中遇到的问题和解决方案

## 6. 验收标准

- [x] 所有 UI 组件（Vue 和 React）至少有 2-3 个 Demo
- [x] 所有 Hooks（Vue 和 React）有使用示例
- [ ] API 自动提取 100% 覆盖
- [ ] react-docs 和 vue-docs 功能对等
- [x] 所有 Demo 通过代码质量检查
- [ ] 构建成功，无错误和警告
- [ ] 端到端测试通过
