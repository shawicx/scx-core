# 提案：迁移组件到文档页面

## 问题描述

当前项目中的组件和 Hooks 示例分散在 packages 目录下的 `demos/` 文件夹中。根据 DOC_TASK.md 的架构设计，需要将这些示例迁移到文档站点的页面系统中，实现"容器化展示，页面化文档"的核心原则。

当前状态：

- React/Vue UI 组件和 Hooks 的 demo 文件位于各自的包内 `demos/` 目录
- 文档站点已创建预览容器包（`@scxfe/docs-preview-react` 和 `@scxfe/docs-preview-vue`）
- 文档站点的页面目录结构已创建，但为空

目标状态：

- 所有组件和 Hooks 的文档页面位于 `apps/{framework}-docs/src/pages/` 目录
- 文档页面使用预览容器组件展示示例
- 原有的 demo 文件被移除，实现 packages 与 apps 的彻底解耦

## 解决方案概述

将所有组件和 Hooks 的 demo 迁移为独立的文档页面，每个组件/Hook 对应一个 `.page.tsx`（React）或 `.page.vue`（Vue）文件。

### 主要变更

1. **创建组件文档页面**
   - React UI: Card.page.tsx, Caption.page.tsx, GradientBorder.page.tsx, AMap.page.tsx
   - Vue UI: Button.page.vue, Card.page.vue, Counter.page.vue
   - 每个页面包含多个示例，使用预览容器展示

2. **创建 Hooks 文档页面**
   - React Hooks: useCounter.page.tsx, useToggle.page.tsx, useLocalStorage.page.tsx
   - Vue Hooks: useCounter.page.vue, useToggle.page.vue, useLocalStorage.page.vue

3. **更新路由配置**
   - 在文档站点的路由中添加新页面的路由
   - 更新首页组件列表

4. **清理旧 Demo 文件**
   - 移除所有 packages 下的 demos/ 目录

### 技术方案

文档页面格式：

**React 页面示例**：

```tsx
// apps/react-docs/src/pages/components/Card.page.tsx
import { Card, CardMode } from '@scxfe/react-ui';
import { PreviewContainer } from '@scxfe/docs-preview-react';

const cardBasicCode = `
<Card mode={CardMode.DEFAULT}>
  <h4>默认模式卡片</h4>
  <p>这是一个默认模式的卡片组件。</p>
</Card>
`;

export default function CardPage() {
  return (
    <div>
      <PreviewContainer
        title="基础用法"
        description="展示卡片的基本用法，包括默认模式和渐变边框模式。"
        code={cardBasicCode}
      >
        <Card mode={CardMode.DEFAULT}>
          <h4>默认模式卡片</h4>
          <p>这是一个默认模式的卡片组件。</p>
        </Card>
      </PreviewContainer>

      {/* 更多示例 */}
    </div>
  );
}
```

**Vue 页面示例**：

```vue
<!-- apps/vue-docs/src/pages/components/Button.page.vue -->
<script setup lang="ts">
import Button from '@scxfe/vue-ui';
import { PreviewContainer } from '@scxfe/docs-preview-vue';

const buttonBasicCode = `
<Button type="primary">主要按钮</Button>
<Button type="secondary">次要按钮</Button>
`;
</script>

<template>
  <div>
    <PreviewContainer title="基础用法" description="展示不同类型的按钮。" :code="buttonBasicCode">
      <Button type="primary">主要按钮</Button>
      <Button type="secondary">次要按钮</Button>
    </PreviewContainer>
  </div>
</template>
```

## 影响范围

### 受影响的系统

1. **packages/ 目录**
   - 所有组件和 Hooks 包（移除 demos/ 目录）

2. **apps/react-docs/**
   - 添加新页面文件
   - 更新路由配置
   - 更新 Home.tsx

3. **apps/vue-docs/**
   - 添加新页面文件
   - 更新路由配置
   - 更新 Home.vue

### 受影响的文件

**新增文件**：

- 4 个 React UI 组件页面
- 3 个 Vue UI 组件页面
- 3 个 React Hooks 页面
- 3 个 Vue Hooks 页面

**修改文件**：

- `apps/react-docs/src/router.tsx`
- `apps/vue-docs/src/router.ts`
- `apps/react-docs/src/pages/Home.tsx`
- `apps/vue-docs/src/pages/Home.vue`

**删除文件**：

- 14 个 React demo 文件
- 13 个 Vue demo 文件

## 评估与权衡

### 优点

1. **彻底解耦**：packages 完全不依赖 apps，符合核心原则
2. **统一展示**：使用预览容器提供一致的文档体验
3. **易于维护**：文档页面集中管理，更新方便
4. **类型安全**：文档页面通过 TypeScript 检查

### 缺点

1. **代码重复**：demo 组件的代码需要在页面中重复一次（作为字符串和实际渲染）
2. **工作量较大**：需要逐个迁移所有组件和 Hooks
3. **同步问题**：更新组件时需要同步更新文档页面

### 缓解措施

1. 对于代码重复，这是实现"真实运行时代码"的必要代价
2. 使用批量处理和模板减少工作量
3. 考虑未来添加自动化工具来同步代码

## 依赖关系

### 前置依赖

- ✅ 预览容器包已创建并可用（@scxfe/docs-preview-react 和 @scxfe/docs-preview-vue）
- ✅ 文档页面目录结构已创建

### 后续依赖

- 无

## 验收标准

1. 所有 14 个页面文件创建完成
2. 所有页面在文档站点中可访问
3. 所有示例在预览容器中正常渲染
4. 代码复制功能正常工作
5. 页面响应式布局正常（桌面、平板、手机）
6. 跨浏览器兼容（Chrome, Firefox, Safari, Edge）
7. 所有旧的 demo 文件已删除
8. TypeScript 编译无错误
9. oxlint 和 prettier 检查通过
10. 文档站点在开发模式下正常运行

## 实施计划

具体实施步骤详见 `tasks.md`。

## 参考资料

- [DOC_TASK.md](../../DOC_TASK.md) - 文档架构重构实施计划
- [AGENTS.md](../../AGENTS.md) - 项目开发指南
- [DOC.md](../../DOC.md) - 文档系统架构设计
