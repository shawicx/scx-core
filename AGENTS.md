# AGENTS.md

SCX Core 项目代码规范指南，供 AI 助手参考。

## 常用命令

### 全局命令

```bash
# 安装依赖
pnpm install

# 开发模式（启动所有应用和包的开发服务器）
pnpm dev

# 构建所有包
pnpm build

# 代码检查（所有包）
pnpm lint

# 修复代码格式和问题（所有包）
pnpm lint:fix

# 代码格式化（所有包）
pnpm format
```

### 单包操作

```bash
# 在特定包目录下执行
cd packages/[package-name] 或 apps/[app-name]

# 构建单包
pnpm build

# 检查单包
pnpm lint

# 修复单包
pnpm lint:fix
```

### 测试命令

当前项目暂无测试配置。添加测试时请使用 Vitest 或 Jest。

## 代码风格规范

### 文件和目录命名

- React 组件文件使用 PascalCase: `Button.tsx`, `AMap.tsx`
- Vue 组件文件使用 PascalCase: `Button.vue`, `Counter.vue`
- 工具文件和普通文件使用 kebab-case: `a-map.tsx`, `interface.ts`
- Demo 文件命名: `[Component][Feature].demo.tsx` 或 `[Component][Feature].demo.vue`
- 目录使用 kebab-case: `a-map/`, `gradient-border/`

### 导入规范

- 优先使用相对路径导入同一包内的文件
- React 组件示例:
  ```tsx
  import { AMapConstant, loadScript } from '@scxfe/util';
  import { useMount, useUnmount } from 'ahooks';
  import { AMapContext } from './context';
  import { AMapProps } from './interface';
  ```
- Vue 组件示例:
  ```vue
  <script setup lang="ts">
  import { computed } from 'vue';
  import Button from '../Button.vue';
  </script>
  ```
- 按标准顺序分组导入: 外部库 → 内部包 → 相对路径

### TypeScript 类型规范

- 所有组件必须定义 Props 接口，明确标注类型
- 尽量避免 `any`，如必须使用请标注注释
- 使用泛型时指定类型参数
- 导出类型使用 `export interface` 或 `export type`

```tsx
// React 示例
export interface CardProps {
  mode?: CardMode;
  children?: ReactNode;
}

export const Card = (props: CardProps) => { ... }
```

```vue
<!-- Vue 示例 -->
<script setup lang="ts">
interface Props {
  type?: 'primary' | 'secondary' | 'success';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'primary',
  size: 'medium',
  disabled: false,
});
</script>
```

### 命名约定

- 组件导出使用 PascalCase: `export const Button = ...`
- 函数使用 camelCase: `handleClick`, `loadApi`
- 常量使用 UPPER_SNAKE_CASE: `defaultContainer = 'container'`
- 枚举使用 PascalCase: `CardMode.DEFAULT`, `CardMode.GRADIENT_BORDER`
- CSS 类名使用 kebab-case: `scx-btn`, `scx-btn--primary`, `scx-btn--disabled`
- 事件名: `click`, `update:modelValue`, `change`

### React 组件规范

- 函数式组件优先于类组件
- 使用 Hooks 管理状态和副作用
- Props 解构作为参数: `const { width = '100%', height = '100%' } = props;`
- 使用 `useRef` 管理可变引用和 DOM 节点
- 组件名称使用 `export const ComponentName = ...` 格式
- Context 文件命名为 `context.tsx`，导出 Provider 和 Hook

### Vue 组件规范

- 使用 Composition API (`<script setup>`)
- 组件通过 `defineOptions` 显式指定名称
- Props 使用 TypeScript 接口定义，用 `withDefaults` 提供默认值
- Emits 使用 TypeScript 泛型定义事件类型:
  ```ts
  const emit = defineEmits<{
    click: [event: MouseEvent];
    'update:modelValue': [value: number];
  }>();
  ```
- 使用 `computed` 计算属性处理复杂逻辑
- Slots 命名使用语义化名称: `default`, `header`, `actions`

### Demo 文件规范

- Demo 文件位于 `packages/[framework]-ui/src/components/demos/` 或 `demos/` 目录
- React Demo 是纯 React 组件:
  ```tsx
  import { Button } from '../src';
  export default function Demo() {
    return <Button>Click</Button>;
  }
  ```
- Vue Demo 是 `.vue` 单文件组件:
  ```vue
  <script setup lang="ts">
  import Button from '../Button.vue';
  const title = '基础用法';
  const description = '展示不同类型的按钮';
  </script>
  <template>
    <div class="demo-container">
      <Button type="primary">Primary Button</Button>
    </div>
  </template>
  ```
- 禁止使用运行时字符串模板、`component: { template }` 或任意形式的字符串编译
- Demo 必须是真实运行时代码，与用户使用方式一致

### 错误处理规范

- 使用 try-catch 捕获异步错误
- 抛出有意义的 Error 对象，提供清晰的错误信息:
  ```tsx
  if (typeof window === 'undefined') {
    throw new Error('Window object is not available');
  }
  ```
- 组件销毁时清理资源: `useUnmount(() => { mapInstance.current?.destroy(); });`
- 控制台日志使用 `console.error` 记录错误，`console.log` 仅用于开发调试

### CSS/样式规范

- 优先使用 scoped 样式（Vue）或 CSS Modules
- 使用 BEM 命名约定: `scx-btn`, `scx-btn--primary`, `scx-btn__icon`
- 响应式单位优先使用相对单位: `rem`, `em`, `%`
- 过渡和动画使用 `transition` 和 `@keyframes`
- 主题颜色使用 CSS 变量

### 注释规范

- 复杂逻辑必须添加中文注释说明
- JSDoc 用于导出函数和复杂类型
- 避免无意义的注释

### Git 提交规范

遵循 conventional commits，使用 commitlint-config-ali:

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式调整（不影响功能）
- `refactor`: 重构
- `chore`: 构建/工具配置变更
- `revert`: 回退提交
- `RELEASING`: 发布相关

提交信息使用中文，例如:

```
feat: 添加用户资料编辑功能
fix: 修复用户登录时的崩溃问题
docs: 更新API文档以反映最新更改
```

### 项目依赖原则

- `packages/` 永不依赖 `apps/`
- Demo 不污染组件本体
- React/Vue 不强行统一运行时，统一语义模型
- 内部依赖使用 `workspace:^` 表示版本

### 工具配置

- Lint: oxlint (JavaScript/TypeScript), stylelint (CSS/SCSS/Less)
- Format: prettier 使用 prettier-config-ali
- Git Hooks: pre-commit 执行 lint-staged，commitlint 检查提交信息
- TypeScript: 使用 @scxfe/ts-config 统一配置
