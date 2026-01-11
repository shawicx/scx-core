## 1. Implementation

- [x] 1.1 创建 `packages/docs-preview-react/` 目录
- [x] 1.2 创建 `packages/docs-preview-vue/` 目录
- [x] 1.3 配置 React 包的 package.json
- [x] 1.4 配置 Vue 包的 package.json
- [x] 1.5 配置 TypeScript（两个包）
- [x] 1.6 配置构建工具（tsup for React, vite for Vue）
- [x] 1.7 创建样式目录和文件（CSS Modules 或 scoped CSS）

## 2. React 组件实现

- [x] 2.1 实现 `Preview.tsx` 组件
- [x] 2.2 实现 `CodeBlock.tsx` 组件
- [x] 2.3 实现 `PreviewContainer.tsx` 组件
- [x] 2.4 创建组件导出文件 `index.ts`
- [x] 2.5 添加组件单元测试（可选）

## 3. Vue 组件实现

- [x] 3.1 实现 `Preview.vue` 组件
- [x] 3.2 实现 `CodeBlock.vue` 组件
- [x] 3.3 实现 `PreviewContainer.vue` 组件
- [x] 3.4 创建组件导出文件 `index.ts`
- [x] 3.5 添加组件单元测试（可选）

## 4. 样式实现

- [x] 4.1 实现 Preview 组件样式
- [x] 4.2 实现 CodeBlock 组件样式
- [x] 4.3 实现 PreviewContainer 布局样式
- [x] 4.4 添加响应式断点（桌面、平板、手机）
- [x] 4.5 添加浏览器兼容性样式

## 5. 构建验证

- [x] 5.1 验证 React 包构建成功
- [x] 5.2 验证 Vue 包构建成功
- [x] 5.3 验证类型定义正确导出
- [x] 5.4 验证样式文件正确打包

## 6. 集成测试

- [x] 6.1 在 react-docs 中创建示例文档页面
- [x] 6.2 在 vue-docs 中创建示例文档页面
- [x] 6.3 验证 Preview 组件正常渲染
- [x] 6.4 验证 CodeBlock 组件正常渲染
- [x] 6.5 验证 PreviewContainer 组件正常渲染
- [x] 6.6 测试代码复制功能
- [x] 6.7 测试行号显示功能
- [x] 6.8 测试响应式布局

## 7. 文档更新

- [x] 7.1 更新 DOC.md，添加预览容器包设计
- [x] 7.2 更新 DOC_TASK.md，记录实施进度
- [x] 7.3 更新 AGENTS.md，添加容器化相关规范
- [x] 7.4 编写组件使用示例

## 8. 代码质量检查

- [x] 8.1 通过 TypeScript 类型检查
- [x] 8.2 通过 oxlint 代码检查
- [x] 8.3 通过 prettier 代码格式化
- [x] 8.4 通过 stylelint 样式检查

## 9. 跨浏览器测试

- [x] 9.1 测试 Chrome 最新版
- [x] 9.2 测试 Firefox 最新版
- [x] 9.3 测试 Safari 最新版
- [x] 9.4 测试 Edge 最新版
- [x] 9.5 修复发现的浏览器兼容性问题

## 10. 性能验证

- [x] 10.1 检查包体积（确保不过大）
- [x] 10.2 检查组件渲染性能
- [x] 10.3 检查构建产物优化
- [x] 10.4 优化代码分割和懒加载（如有需要）
