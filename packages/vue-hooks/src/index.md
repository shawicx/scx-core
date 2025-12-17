---
title: @scxfe/vue-hooks
nav:
  title: vue-hooks
  order: 3
---

# @scxfe/vue-hooks

Vue 3 组合式 API Hook 库，提供了一系列实用的可重用逻辑函数。

## 安装

```bash
npm install @scxfe/vue-hooks
# 或
pnpm add @scxfe/vue-hooks
# 或
yarn add @scxfe/vue-hooks
```

## 使用示例

```vue
<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="reset">Reset</button>
  </div>
</template>

<script setup lang="ts">
import { useCounter } from '@scxfe/vue-hooks';

const { count, increment, decrement, reset } = useCounter({
  initial: 10,
  min: 0,
  max: 20,
});
</script>
```

## API 文档

### useCounter

计数器 Hook，提供计数相关的操作和状态。

```typescript
function useCounter(options?: UseCounterOptions): UseCounterReturn;
```

#### 参数

```typescript
interface UseCounterOptions {
  min?: number; // 最小值，默认 0
  max?: number; // 最大值，默认 100
  step?: number; // 步长，默认 1
  initial?: number; // 初始值，默认 min
}
```

#### 返回值

```typescript
interface UseCounterReturn {
  count: Ref<number>; // 当前计数值
  increment: () => void; // 递增
  decrement: () => void; // 递减
  reset: () => void; // 重置
  set: (value: number) => void; // 设置值
  canIncrement: ComputedRef<boolean>; // 是否可以递增
  canDecrement: ComputedRef<boolean>; // 是否可以递减
}
```

#### 示例

```typescript
import { useCounter } from '@scxfe/vue-hooks';

// 基础用法
const counter = useCounter();

// 自定义配置
const counter = useCounter({
  initial: 5,
  min: 0,
  max: 10,
  step: 2,
});

console.log(counter.count.value); // 5
counter.increment();
console.log(counter.count.value); // 7
```

### useToggle

切换状态 Hook，用于处理布尔值或其他可切换状态。

```typescript
function useToggle<T = boolean>(options?: UseToggleOptions<T>): UseToggleReturn<T>;
```

#### 参数

```typescript
interface UseToggleOptions<T = boolean> {
  initialValue?: T; // 初始值
  trueValue?: T; // 真值
  falseValue?: T; // 假值
}
```

#### 返回值

```typescript
interface UseToggleReturn<T> {
  state: Ref<T>; // 当前状态
  toggle: (value?: T) => void; // 切换状态
  setTrue: () => void; // 设置为真值
  setFalse: () => void; // 设置为假值
  setValue: (value: T) => void; // 设置特定值
}
```

#### 示例

```typescript
import { useToggle } from '@scxfe/vue-hooks';

// 布尔值切换
const { state, toggle } = useToggle();
// state.value: false -> true -> false

// 字符串切换
const { state: mode, toggle: toggleMode } = useToggle({
  initialValue: 'light',
  trueValue: 'light',
  falseValue: 'dark',
});

// 手动切换
toggleMode('light'); // 设置为 'light'
toggleMode(); // 切换到 'dark'
```

### useLocalStorage

本地存储 Hook，自动与 localStorage 同步。

```typescript
function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options?: UseLocalStorageOptions<T>,
): Ref<T>;
```

#### 参数

```typescript
interface UseLocalStorageOptions<T> {
  serializer?: {
    read: (value: string) => T;
    write: (value: T) => string;
  };
  onError?: (error: Error) => void;
}
```

#### 示例

```typescript
import { useLocalStorage } from '@scxfe/vue-hooks';

// 字符串存储
const username = useLocalStorage('username', 'guest');

// 对象存储
const userSettings = useLocalStorage('settings', {
  theme: 'light',
  language: 'zh-CN',
});

// 数组存储
const todos = useLocalStorage('todos', [{ id: 1, text: 'Learn Vue', completed: false }]);
```

## TypeScript 支持

本库完整支持 TypeScript，提供了完整的类型定义：

```typescript
import type { UseCounterOptions, UseCounterReturn } from '@scxfe/vue-hooks';
import type { UseToggleOptions, UseToggleReturn } from '@scxfe/vue-hooks';
import type { UseLocalStorageOptions } from '@scxfe/vue-hooks';
```

## 浏览器兼容性

- 现代浏览器（Chrome 70+, Firefox 63+, Safari 12+）
- Vue 3.0+
- TypeScript 4.0+
