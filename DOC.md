## 一、最终设计目标

在进入结构之前，先把**不可违背的原则**写清楚，这能防止半年后自己打脸。

### 核心目标

1. **Demo 必须是真实运行时代码**
   - 无 DSL
   - 无字符串模板
   - 与用户使用方式一致

2. **文档系统与组件系统彻底解耦**
   - packages 永不依赖 apps
   - demo 不污染组件本体

3. **React / Vue 不强行统一运行时**
   - 统一“语义模型”
   - 不统一“实现模型”

4. **80% 跨框架共享，20% 框架特化**
   - schema / 数据结构统一
   - UI 层分 React / Vue

这四条是整套规划的“物理定律”。

---

## 二、最终 Turborepo 目录结构

这是**修复所有问题后的最终结构**。

```txt
repo/
├─ apps/
│  ├─ react-docs/                    # React 文档应用
│  │  ├─ src/
│  │  │  ├─ pages/
│  │  │  ├─ router.tsx
│  │  │  ├─ App.tsx
│  │  │  └─ main.tsx
│  │  ├─ vite.config.ts
│  │  └─ package.json
│  │
│  ├─ vue-docs/                      # Vue 文档应用
│  │  ├─ src/
│  │  │  ├─ pages/
│  │  │  ├─ router.ts
│  │  │  ├─ App.vue
│  │  │  └─ main.ts
│  │  ├─ vite.config.ts
│  │  └─ package.json
│  │
│  └─ site/                          # 总入口 / 选框架 / 理念
│     ├─ src/
│     ├─ vite.config.ts
│     └─ package.json
│
├─ packages/
│  ├─ react-ui/
│  ├─ react-hooks/
│  ├─ util/
│  ├─ vue-ui/
│  ├─ vue-hooks/
│  │
│  ├─ docs-core/                     # ⭐ 文档运行时核心（无框架）
│  │  ├─ demo-registry.ts
│  │  ├─ api-registry.ts
│  │  └─ types.ts
│  │
│  ├─ docs-ui-react/                 # React 文档 UI
│  │  ├─ DemoLayout.tsx
│  │  ├─ PropsTable.tsx
│  │  └─ HooksPanel.tsx
│  │
│  ├─ docs-ui-vue/                   # Vue 文档 UI
│  │  ├─ DemoLayout.vue
│  │  ├─ PropsTable.vue
│  │  └─ HooksPanel.vue
│  │
│  ├─ doc-schema/                    # ⭐ API / Demo 语义模型
│  └─ doc-utils/                     # schema → UI 转换工具
│
├─ configs/
├─ turbo.json
├─ pnpm-workspace.yaml
└─ package.json
```

---

## 三、依赖关系（最终版，禁止破坏）

```txt
apps/*
 ├─ docs-core
 ├─ doc-schema
 ├─ doc-utils
 └─ docs-ui-*

docs-ui-*  ──▶ doc-schema
docs-core   ──▶ doc-schema

react-docs  ──▶ react-ui / react-hooks
vue-docs    ──▶ vue-ui / vue-hooks

packages/*  ❌ 不依赖 apps/*
```

---

## 四、Vue Demo 的最终规范

### 唯一推荐方式：SFC Demo

```txt
packages/vue-ui/
└─ demos/
   ├─ ButtonBasic.demo.vue
   ├─ ButtonDisabled.demo.vue
```

```vue
<script setup lang="ts">
import { Button } from '../src';
</script>

<template>
  <Button>Click</Button>
</template>
```

在 `vue-docs` 中：

```ts
import ButtonBasic from '@repo/vue-ui/demos/ButtonBasic.demo.vue';
```

### 明确禁止

- runtime template string
- `component: { template }`
- 任意形式的字符串编译

这是**不可妥协条款**。

---

## 五、React Demo 的最终规范（对称设计）

```tsx
// packages/react-ui/demos/ButtonBasic.demo.tsx
import { Button } from '../src';

export default function Demo() {
  return <Button>Click</Button>;
}
```

- demo 就是 React 组件
- hooks demo 也是组件

---

## 六、doc-schema：中枢神经（v1 定案）

这是整个系统最重要的“协议层”。

```ts
// packages/doc-schema/src/index.ts

export interface TypeRef {
  name: string;
  raw?: string;
}

export interface PropMeta {
  name: string;
  type: TypeRef;
  required: boolean;
  default?: string;
  description?: string;
}

export interface EventMeta {
  name: string;
  payload?: TypeRef;
  description?: string;
}

export interface SlotMeta {
  name: string;
  props?: Record<string, TypeRef>;
}

export interface ComponentMeta {
  name: string;
  props: PropMeta[];
  events?: EventMeta[];
  slots?: SlotMeta[];
}
```

### 重要设计决策

- React `children` → SlotMeta
- React `onXxx` → EventMeta
- Vue emits / slots → 同构映射

这是**最大公约数模型**。

---

## 七、docs-core：文档运行时（不碰 UI）

`docs-core` 只做三件事：

1. **注册 demo**
2. **加载 API meta**
3. **组织页面结构数据**

```ts
registerComponent({
  name: 'Button',
  demos: [ButtonBasic, ButtonDisabled],
  meta: loadComponentMeta('Button'),
});
```

它不渲染、不关心 React / Vue。

---

## 八、docs-ui-react / docs-ui-vue：共享设计语言

### 职责边界

- 接收 `ComponentMeta`
- 渲染 Props / Events / Slots
- 渲染 Demo 容器

UI 行为一致，技术栈不同。

这一步解决了你指出的：

> 三个独立应用维护成本过大

**现在是：**

- 3 个 app
- 1 套逻辑
- 2 套 UI 实现
- 1 套 schema

---

## 九、site 的最终定位（克制）

site **不展示 demo**。

它只负责：

- 框架选择
- 设计理念
- 链接跳转

这是一个“门厅”，不是“展厅”。

---

## 十、最终演进路径（非常重要）

### Phase 1（现在就该做）

- 定 doc-schema v1
- 跑通一个 Button（React + Vue）

### Phase 2

- 引入 API 自动生成
- hooks demo 规范化

### Phase 3

- props playground
- API diff / 版本对比

---
