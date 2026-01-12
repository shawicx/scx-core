# 更新路由配置 - 实施任务

## 依赖

无外部依赖，可独立完成。

## 任务列表

### 任务 1: 更新 React Docs 路由配置

**文件**: `apps/react-docs/src/router.tsx`

- [x] 添加 Card 组件路由 (`/components/card`)
- [x] 添加 Caption 组件路由 (`/components/caption`)
- [x] 添加 GradientBorder 组件路由 (`/components/gradient-border`)
- [x] 添加 AMap 组件路由 (`/components/a-map`)
- [x] 添加 useCounter Hook 路由 (`/hooks/use-counter`)
- [x] 添加 useToggle Hook 路由 (`/hooks/use-toggle`)
- [x] 添加 useLocalStorage Hook 路由 (`/hooks/use-local-storage`)
- [x] 保留首页和预览示例页面的路由

**验证**: 运行 `pnpm --filter react-docs dev`，访问各个路由确保不出现 404 错误（已验证所有路由返回 200）

### 任务 2: 更新 React Docs 首页组件列表

**文件**: `apps/react-docs/src/pages/Home.tsx`

- [x] 更新 Card 组件链接为 `/components/card`
- [x] 更新 Caption 组件链接为 `/components/caption`
- [x] 更新 GradientBorder 组件链接为 `/components/gradient-border`
- [x] 更新 AMap 组件链接为 `/components/a-map`
- [x] 添加 useCounter Hook 链接 (`/hooks/use-counter`)
- [x] 添加 useToggle Hook 链接 (`/hooks/use-toggle`)
- [x] 添加 useLocalStorage Hook 链接 (`/hooks/use-local-storage`)

**验证**: 点击首页所有链接，确保能够正确导航到对应页面（已验证路由配置正确）

### 任务 3: 更新 Vue Docs 路由配置

**文件**: `apps/vue-docs/src/router.ts`

- [x] 添加 Button 组件路由 (`/components/button`)
- [x] 添加 Card 组件路由 (`/components/card`)
- [x] 添加 Counter 组件路由 (`/components/counter`)
- [x] 添加 useCounter Hook 路由 (`/hooks/use-counter`)
- [x] 添加 useToggle Hook 路由 (`/hooks/use-toggle`)
- [x] 添加 useLocalStorage Hook 路由 (`/hooks/use-local-storage`)
- [x] 保留首页和预览示例页面的路由

**验证**: 运行 `pnpm --filter vue-docs dev`，访问各个路由确保不出现 404 错误（已验证所有路由返回 200）

### 任务 4: 更新 Vue Docs 首页组件列表

**文件**: `apps/vue-docs/src/pages/Home.vue`

- [x] 确保 Button 组件链接为 `/components/button`
- [x] 确保 Card 组件链接为 `/components/card`
- [x] 确保 Counter 组件链接为 `/components/counter`
- [x] 添加 useCounter Hook 链接 (`/hooks/use-counter`)
- [x] 添加 useToggle Hook 链接 (`/hooks/use-toggle`)
- [x] 添加 useLocalStorage Hook 链接 (`/hooks/use-local-storage`)

**验证**: 点击首页所有链接，确保能够正确导航到对应页面（已验证路由配置正确）

### 任务 5: 代码质量检查

- [x] 运行 `pnpm lint` 检查所有包
- [x] 运行 `pnpm lint:fix` 自动修复可修复的问题
- [x] 确保无 TypeScript 错误（无新增错误）
- [x] 确保无 lint 错误（无新增错误）

### 任务 6: 端到端验证

- [x] 启动 `pnpm dev`，确保所有服务正常运行
- [x] 访问 React Docs 首页，测试所有组件链接
- [x] 访问 Vue Docs 首页，测试所有组件链接
- [x] 测试直接访问各个组件文档页面 URL
- [x] 测试 404 页面是否正常工作（访问不存在的路由）

## 可并行任务

- 任务 1 和任务 2 可以并行
- 任务 3 和任务 4 可以并行
- 任务 1 和任务 3 可以并行（React 和 Vue 独立）

## 注意事项

- 组件名称必须使用 kebab-case（如 `a-map` 而不是 `AMap`）
- Hook 名称也必须使用 kebab-case（如 `use-counter` 而不是 `useCounter`）
- 暂时保留旧的动态路由配置（注释掉），以便在需要时快速回退
- 确保 TypeScript 导入路径正确
