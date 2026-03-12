---
nav:
  title: Vue Hooks
  order: 6
  group:
    title: 介绍
    order: -1
toc: content
---

# @scxfe/vue-hooks

Vue 3 组合式 API Hook 库，提供了一系列实用的可重用逻辑函数。

## 安装

```bash
npm install @scxfe/vue-hooks
```

## 快速开始

```vue
<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">+</button>
  </div>
</template>

<script setup lang="ts">
import { useCounter } from '@scxfe/vue-hooks';

const { count, increment } = useCounter();
</script>
```

## Hooks 列表

- useCounter
- useToggle
- useLocalStorage

> 更多详细文档正在完善中...
