# Button Demos

本目录包含 Button 组件的所有示例代码 (demos)。

## 📁 Demo 文件列表

| 文件                       | 描述     | 展示内容                                                             |
| -------------------------- | -------- | -------------------------------------------------------------------- |
| `ButtonBasic.demo.vue`     | 基础用法 | 不同类型的按钮 (primary, secondary, success, warning, danger, ghost) |
| `ButtonDisabled.demo.vue`  | 禁用状态 | 禁用状态下的各种按钮                                                 |
| `ButtonLoading.demo.vue`   | 加载状态 | 带加载图标的按钮，包含交互式示例                                     |
| `ButtonSize.demo.vue`      | 按钮尺寸 | Small, Medium, Large 三种尺寸                                        |
| `ButtonModifiers.demo.vue` | 其他变体 | Block (块级) 和 Round (圆角) 样式                                    |

## 📝 Demo 文件结构

每个 demo 文件遵循以下结构：

```vue
<script setup lang="ts">
import { Button } from '../Button.vue';

/**
 * Demo 元数据
 */
const title = '标题';
const description = '描述';
</script>

<template>
  <div class="demo-container">
    <div class="demo-title">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>

    <div class="demo-content">
      <!-- Demo 内容 -->
    </div>
  </div>
</template>

<style scoped>
/* Demo 样式 */
</style>
```

## 🚀 如何使用这些 Demos

### 方式 1: 手动注册

在文档应用中手动导入并注册 demo：

```typescript
import { DocsRegistry } from '@scxfe/docs-core';
import ButtonBasic from '@scxfe/vue-ui/components/demos/ButtonBasic.demo.vue';

const registry = new DocsRegistry();

registry.registerComponent({
  name: 'Button',
  meta: {
    /* ... */
  },
  demos: [
    {
      title: '基础用法',
      description: '展示不同类型的按钮',
      component: () => ButtonBasic,
      tags: ['basic'],
    },
    // ... 其他 demos
  ],
});
```

### 方式 2: 自动扫描 (TODO)

未来可以实现自动扫描 `demos/` 目录并提取元数据的功能。

## 🎯 下一步

根据 [DOC_TASK.md](../../../DOC_TASK.md) Stage 1，接下来需要：

1. **Stage 1.2**: 集成到文档应用
   - 在 `apps/vue-docs/src/` 创建 `lib/registry.ts`
   - 使用 DocsRegistry 注册 Button 组件
   - 配置 demo 加载器

2. **Stage 1.3**: 实现组件文档页面
   - 重写 `apps/vue-docs/src/pages/ComponentDocs.vue`
   - 集成 docs-ui-vue 组件

3. **Stage 1.4**: 端到端测试
   - 启动 vue-docs 开发服务器
   - 验证 demo 渲染和 API 展示

## 📋 Demo 元数据标准

每个 demo 应包含以下元数据：

- **title**: Demo 标题 (简短描述)
- **description**: 详细说明 (1-2 句话)
- **tags**: 标签数组 (可选，如 ['basic', 'interactive'])

## 🐛 已知问题

1. Demo 文件中的 `title` 和 `description` 变量未被导出，外部无法直接访问
2. 当前需要在注册时手动提供元数据
3. 未来可以添加自动从文件名或注释中提取元数据的功能

## 💡 最佳实践

1. **保持简单**: Demo 应该专注于展示单一功能点
2. **真实代码**: Demo 必须是真实可运行的代码，不是字符串模板
3. **自包含**: 每个 demo 应该包含所有必要的导入和样式
4. **清晰命名**: 文件名应该清晰描述 demo 的内容 (如 `ButtonBasic.demo.vue`)

---

**创建时间**: 2025-12-29
**Stage**: Stage 1.1 完成 ✅
