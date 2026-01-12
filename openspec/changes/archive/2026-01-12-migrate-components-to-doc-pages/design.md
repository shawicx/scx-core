# 设计文档：迁移组件到文档页面

## 架构背景

根据 SCX Core 的核心原则，文档系统与组件系统需要彻底解耦。当前的 demo 文件位于 packages 目录下，这违反了 "packages 永不依赖 apps" 的原则。迁移到文档页面后，packages 纯粹作为功能包，不包含任何文档相关代码。

## 设计决策

### 决策 1：文档页面位置选择

**选项**：

1. 将文档页面放在 packages 内部的 `docs/` 目录
2. 将文档页面放在 apps 目录下的 `pages/` 目录

**选择**：选项 2

**理由**：

- 符合 "packages 永不依赖 apps" 的原则
- 文档站点（apps）应该拥有自己的页面
- packages 应该专注于功能实现
- 方便文档站点的独立部署和更新

**权衡**：

- 需要在文档站点中导入组件包（这是合理的，apps 依赖 packages）

### 决策 2：代码示例字符串 vs 组件引用

**选项**：

1. 使用组件引用，动态提取代码
2. 使用字符串硬编码代码示例

**选择**：选项 2

**理由**：

- 简单直接，不需要复杂的代码提取逻辑
- 代码示例完全可控，可以展示用户实际使用的代码
- 符合 "Demo 必须是真实运行时代码" 的原则
- 类型安全，代码示例也会通过 TypeScript 检查

**权衡**：

- 需要维护两份代码（渲染组件 + 字符串）
- 可能存在代码不同步的风险
- **缓解措施**：创建辅助工具帮助同步代码，未来考虑自动化

### 决策 3：单个页面 vs 多个页面

**选项**：

1. 每个示例一个页面
2. 每个组件/Hook 一个页面，包含所有示例

**选择**：选项 2

**理由**：

- 减少页面数量，降低维护成本
- 用户可以在同一页面看到组件的所有用法
- 符合常见的文档站点模式（如 Ant Design、Element Plus）
- 方便页面内导航和示例对比

**权衡**：

- 单个页面可能较长
- **缓解措施**：使用 PreviewContainer 的标题和描述进行分段，未来可以添加目录导航

### 决策 4：PreviewContainer 布局

**选项**：

1. 所有示例使用相同的布局
2. 根据示例复杂度使用不同布局

**选择**：选项 2

**理由**：

- 简单示例可以使用横向布局，节省空间
- 复杂示例可以使用纵向布局，提供更多展示空间
- 符合 PreviewContainer 的设计意图（支持 layout 配置）
- 提供更好的用户体验

**权衡**：

- 需要为每个示例选择合适的布局
- **缓解措施**：建立指导原则，简单示例用横向，复杂示例用纵向

### 决策 5：删除旧 demo 文件的时机

**选项**：

1. 创建新页面后立即删除
2. 验证新页面正常后再删除

**选择**：选项 2

**理由**：

- 降低风险，如果新页面有问题可以回退
- 方便对比新旧实现
- 更安全的迁移策略

**权衡**：

- 临时增加代码体积
- **缓解措施**：使用 git 分支管理，删除后可以方便恢复

## 技术实现

### 文档页面结构

#### React 文档页面结构

```tsx
import { PreviewContainer } from '@scxfe/docs-preview-react';
import { Component } from '@scxfe/react-ui';

const example1Code = `
<Component prop1="value1">
  Content
</Component>
`;

const example2Code = `
<Component prop2="value2">
  Content
</Component>
`;

export default function ComponentPage() {
  return (
    <div className="component-page">
      <PreviewContainer
        title="基础用法"
        description="描述文字"
        code={example1Code}
        layout="horizontal"
      >
        <Component prop1="value1">Content</Component>
      </PreviewContainer>

      <PreviewContainer
        title="高级用法"
        description="描述文字"
        code={example2Code}
        layout="vertical"
      >
        <Component prop2="value2">Content</Component>
      </PreviewContainer>
    </div>
  );
}
```

#### Vue 文档页面结构

```vue
<script setup lang="ts">
import { PreviewContainer } from '@scxfe/docs-preview-vue';
import Component from '@scxfe/vue-ui';

const example1Code = `
<Component prop1="value1">
  Content
</Component>
`;

const example2Code = `
<Component prop2="value2">
  Content
</Component>
`;
</script>

<template>
  <div class="component-page">
    <PreviewContainer
      title="基础用法"
      description="描述文字"
      :code="example1Code"
      layout="horizontal"
    >
      <Component prop1="value1"> Content </Component>
    </PreviewContainer>

    <PreviewContainer
      title="高级用法"
      description="描述文字"
      :code="example2Code"
      layout="vertical"
    >
      <Component prop2="value2"> Content </Component>
    </PreviewContainer>
  </div>
</template>
```

### 路由配置

#### React 路由配置示例

```tsx
import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import CardPage from './pages/components/Card.page';
import CaptionPage from './pages/components/Caption.page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/components/card',
    element: <CardPage />,
  },
  {
    path: '/components/caption',
    element: <CaptionPage />,
  },
  // 更多路由...
]);
```

#### Vue 路由配置示例

```ts
import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import ButtonPage from './pages/components/Button.page.vue';
import CardPage from './pages/components/Card.page.vue';

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/components/button',
    component: ButtonPage,
  },
  {
    path: '/components/card',
    component: CardPage,
  },
  // 更多路由...
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
```

### 布局选择指导原则

**使用横向布局（layout="horizontal"）的情况**：

- 示例代码简单（< 10 行）
- 组件渲染区域较小
- 需要节省垂直空间

**使用纵向布局（layout="vertical"）的情况**：

- 示例代码复杂（>= 10 行）
- 组件渲染区域较大
- 需要更好的代码可读性

### 响应式设计

PreviewContainer 组件已经实现了响应式设计：

- 桌面端：按配置显示横向或纵向
- 平板端：横向布局自动切换为纵向
- 手机端：强制使用纵向布局

文档页面不需要额外的响应式逻辑，只需确保容器使用正确的宽度设置。

### 类型安全

所有文档页面都使用 TypeScript，确保：

- 组件 props 类型正确
- 导入路径正确
- 代码示例字符串格式正确

## 测试策略

### 单元测试

当前项目暂无测试配置。未来可以考虑：

- 为 PreviewContainer 组件添加单元测试
- 为文档页面添加快照测试

### 集成测试

手动测试覆盖：

1. 启动文档站点
2. 访问每个文档页面
3. 验证每个示例的渲染
4. 测试代码复制功能
5. 测试响应式布局

### 端到端测试

使用 Chrome DevTools 进行测试：

1. 桌面端（1920x1080）
2. 平板端（768x1024）
3. 手机端（375x667）
4. 跨浏览器（Chrome, Firefox, Safari, Edge）

## 未来扩展

### 自动化代码同步

未来可以开发工具，自动从渲染的组件生成代码示例字符串：

```typescript
// 概念代码
function extractComponentCode(component: ReactNode): string {
  // 使用 react-element-to-jsx-string 或类似工具
  // 提取组件的 JSX 代码
}
```

### Props Playground

在文档页面中添加 Props 编辑器，允许用户实时修改组件 props：

```tsx
<PreviewContainer title="Props Playground">
  <PropsEditor component={Card} onChange={(props) => setCardProps(props)} />
  <Card {...cardProps} />
</PreviewContainer>
```

### 代码搜索和过滤

在文档站点中添加搜索和过滤功能，方便用户快速找到需要的示例。

## 风险和缓解

### 风险 1：代码不同步

**影响**：用户看到的代码示例与实际渲染不一致

**概率**：中等

**缓解措施**：

- 严格的代码审查流程
- 自动化测试验证代码示例
- 未来开发自动化同步工具

### 风险 2：迁移过程中的错误

**影响**：文档站点无法正常工作

**概率**：低

**缓解措施**：

- 使用 git 分支进行迁移
- 完整的测试验证流程
- 保留旧 demo 文件直到验证完成

### 风险 3：性能问题

**影响**：文档页面加载缓慢

**概率**：低

**缓解措施**：

- PreviewContainer 已经优化
- 按需加载页面
- 未来可以添加代码分割

## 成功指标

迁移成功的标准：

1. 所有页面创建完成（14 个页面）
2. 所有页面可访问并正常渲染
3. 代码复制功能正常
4. 响应式布局正常
5. 跨浏览器兼容
6. 旧的 demo 文件已删除
7. 代码质量检查通过
8. 文档站点性能良好（< 2s 加载时间）
