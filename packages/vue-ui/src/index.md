---
title: @scxfe/vue-ui
nav:
  title: vue-ui
  order: 4
toc: content
---

# @scxfe/vue-ui

Vue 3 UI 组件库，提供了一系列美观实用的组件。

## 安装

```bash
npm install @scxfe/vue-ui
# 或
pnpm add @scxfe/vue-ui
# 或
yarn add @scxfe/vue-ui
```

## 使用示例

```vue
<template>
  <div>
    <Card title="计数器示例">
      <div style="display: flex; align-items: center; gap: 16px;">
        <Button type="primary" @click="decrement" :disabled="!canDecrement"> 减少数量 </Button>

        <Counter v-model="count" :min="0" :max="10" label="件" />

        <Button type="success" @click="increment" :disabled="!canIncrement"> 增加数量 </Button>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Button, Counter, Card } from '@scxfe/vue-ui';

const count = ref(5);
const canIncrement = computed(() => count.value < 10);
const canDecrement = computed(() => count.value > 0);

const increment = () => {
  if (canIncrement.value) count.value++;
};

const decrement = () => {
  if (canDecrement.value) count.value--;
};
</script>
```

## API 文档

### Button

按钮组件，支持多种类型、尺寸和状态。

#### Props

```typescript
interface ButtonProps {
  type?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  block?: boolean;
  round?: boolean;
}
```

#### Events

```typescript
interface ButtonEmits {
  click: [event: MouseEvent];
}
```

#### 示例

```vue
import { Button } from '@scx/vue-ui'
<!-- 基础按钮 -->
<Button>默认按钮</Button>

<!-- 不同类型 -->
<Button type="primary">主要按钮</Button>
<Button type="success">成功按钮</Button>
<Button type="warning">警告按钮</Button>
<Button type="danger">危险按钮</Button>

<!-- 不同尺寸 -->
<Button size="small">小按钮</Button>
<Button size="medium">中按钮</Button>
<Button size="large">大按钮</Button>

<!-- 特殊状态 -->
<Button disabled>禁用按钮</Button>
<Button loading>加载中...</Button>
<Button block>块级按钮</Button>
<Button round>圆角按钮</Button>

<!-- 事件处理 -->
<Button @click="handleClick">点击我</Button>
```

### Counter

计数器组件，支持手动输入和按钮操作。

#### Props

```typescript
interface CounterProps {
  modelValue?: number;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  editable?: boolean;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}
```

#### Events

```typescript
interface CounterEmits {
  'update:modelValue': [value: number];
  change: [value: number];
  decrement: [value: number];
  increment: [value: number];
}
```

#### 示例

```vue
<!-- 基础用法 -->
<Counter v-model="count" />

<!-- 设置范围和步长 -->
<Counter v-model="count" :min="0" :max="100" :step="5" />

<!-- 显示标签 -->
<Counter v-model="quantity" label="个" />

<!-- 可编辑状态 -->
<Counter v-model="editableCount" :editable="true" label="件" />

<!-- 不同尺寸 -->
<Counter v-model="count" size="small" />
<Counter v-model="count" size="medium" />
<Counter v-model="count" size="large" />

<!-- 禁用状态 -->
<Counter v-model="count" :disabled="true" />

<!-- 事件监听 -->
<Counter
  v-model="count"
  @change="handleChange"
  @increment="handleIncrement"
  @decrement="handleDecrement"
/>
```

### Card

卡片组件，用于内容展示和分组。

#### Props

```typescript
interface CardProps {
  title?: string;
  shadow?: 'always' | 'hover' | 'never';
  bordered?: boolean;
  size?: 'small' | 'medium' | 'large';
}
```

#### Slots

```typescript
interface CardSlots {
  default?: () => VNode[];
  header?: () => VNode[];
  cover?: () => VNode[];
  actions?: () => VNode[];
}
```

#### 示例

```vue
<!-- 基础卡片 -->
<Card title="基础卡片">
  <p>这是卡片内容</p>
</Card>

<!-- 自定义头部 -->
<Card>
  <template #header>
    <div style="display: flex; justify-content: space-between;">
      <h3>自定义头部</h3>
      <Button size="small">操作</Button>
    </div>
  </template>
  <p>卡片内容区域</p>
</Card>

<!-- 带封面图片 -->
<Card title="图片卡片">
  <template #cover>
    <img src="/image.jpg" alt="封面图片" />
  </template>
  <p>这是一个带封面图片的卡片</p>
</Card>

<!-- 带操作区域 -->
<Card title="操作卡片">
  <p>卡片内容</p>
  <template #actions>
    <Button size="small" type="primary">确认</Button>
    <Button size="small">取消</Button>
  </template>
</Card>

<!-- 不同阴影效果 -->
<Card title="总是阴影" shadow="always">
  <p>始终显示阴影</p>
</Card>

<Card title="悬停阴影" shadow="hover">
  <p>悬停时显示阴影</p>
</Card>

<Card title="无阴影" shadow="never">
  <p>不显示阴影</p>
</Card>

<!-- 边框控制 -->
<Card title="无边框" :bordered="false">
  <p>无边框的卡片</p>
</Card>

<!-- 不同尺寸 -->
<Card title="小卡片" size="small">
  <p>小尺寸卡片</p>
</Card>

<Card title="大卡片" size="large">
  <p>大尺寸卡片</p>
</Card>
```

## 主题定制

组件使用 CSS 变量，可以通过覆盖变量来定制主题：

```css
:root {
  --scx-primary-color: #1890ff;
  --scx-success-color: #52c41a;
  --scx-warning-color: #faad14;
  --scx-danger-color: #ff4d4f;
  --scx-text-color: #000;
  --scx-text-color-secondary: #666;
  --scx-border-color: #d9d9d9;
  --scx-background-color: #fff;
}
```

## TypeScript 支持

本库完整支持 TypeScript，提供了完整的类型定义：

```typescript
import type { ButtonProps } from '@scxfe/vue-ui';
import type { CounterProps } from '@scxfe/vue-ui';
import type { CardProps } from '@scxfe/vue-ui';
```

## 浏览器兼容性

- 现代浏览器（Chrome 70+, Firefox 63+, Safari 12+）
- Vue 3.0+
- TypeScript 4.0+
