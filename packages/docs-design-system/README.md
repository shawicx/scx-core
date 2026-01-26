# @scxfe/docs-design-system

SCX Core 文档站点设计系统，提供统一的视觉语言和组件类型定义。

## 功能特性

- 🎨 **完整的 CSS 变量系统** - 颜色、间距、字体、圆角、阴影等
- 🌓 **主题切换支持** - 内置亮色和暗色主题
- 📱 **响应式设计** - 移动端、平板端、桌面端断点
- 🎯 **TypeScript 类型定义** - 完整的组件 Props 类型
- 🛠️ **样式重置** - 统一的 CSS reset

## 安装

```bash
pnpm add @scxfe/docs-design-system
```

## 使用方式

### 导入样式

在 React 或 Vue 文档站点的入口文件中导入样式：

```ts
// React (index.css 或 App.tsx)
import '@scxfe/docs-design-system/styles';

// Vue (main.ts)
import '@scxfe/docs-design-system/styles';
```

### 使用类型定义

导入组件 Props 类型以提供类型安全：

```ts
import type {
  NavbarProps,
  SidebarProps,
  ThemeToggleProps,
  SearchBoxProps,
  NavSection,
  SidebarItem,
} from '@scxfe/docs-design-system';
```

## 设计变量

设计系统通过 CSS 变量提供统一的设计规范。所有变量都定义在 `:root` 选择器中。

### 颜色

#### 主色调

- `--color-primary`: 主色（Vue 绿 #42b883）
- `--color-primary-hover`: 主色悬停状态
- `--color-primary-light`: 主色浅色变体

#### 中性色（亮色主题）

- `--color-text-primary`: 主文本色
- `--color-text-secondary`: 次要文本色
- `--color-text-tertiary`: 第三文本色
- `--color-border`: 边框色
- `--color-border-hover`: 边框悬停色

#### 背景色（亮色主题）

- `--color-bg-primary`: 主背景色
- `--color-bg-secondary`: 次要背景色
- `--color-bg-tertiary`: 第三背景色

#### 暗色主题

暗色主题通过 `[data-theme='dark']` 选择器定义，覆盖上述颜色变量。

### 字体

- `--font-family-base`: 基础字体族
- `--font-family-mono`: 等宽字体族

### 字体大小

- `--font-size-xs` 到 `--font-size-5xl`: 7 个预定义的字体大小

### 字重

- `--font-weight-normal` (400)
- `--font-weight-medium` (500)
- `--font-weight-semibold` (600)
- `--font-weight-bold` (700)

### 行高

- `--line-height-tight` (1.25)
- `--line-height-normal` (1.5)
- `--line-height-relaxed` (1.75)
- `--line-height-loose` (2.0)

### 间距

基于 8px 的间距系统（`--spacing-0` 到 `--spacing-16`）

### 圆角

- `--radius-sm`: 0.25rem
- `--radius-base`: 0.5rem
- `--radius-md`: 0.75rem
- `--radius-lg`: 1rem
- `--radius-xl`: 1.25rem
- `--radius-2xl`: 1.5rem
- `--radius-full`: 9999px

### 阴影

- `--shadow-sm`: 小阴影
- `--shadow-base`: 基础阴影
- `--shadow-md`: 中等阴影
- `--shadow-lg`: 大阴影
- `--shadow-xl`: 超大阴影

### 响应式断点

- `--breakpoint-sm`: 640px
- `--breakpoint-md`: 768px
- `--breakpoint-lg`: 1024px
- `--breakpoint-xl`: 1280px
- `--breakpoint-2xl`: 1536px

### 布局尺寸

- `--navbar-height`: 60px
- `--sidebar-width`: 260px
- `--content-max-width`: 1024px
- `--container-padding`: 1.5rem

### 过渡动画

- `--transition-fast`: 0.15s ease
- `--transition-base`: 0.3s ease
- `--transition-slow`: 0.5s ease

### Z-index 层级

- `--z-index-dropdown`: 1000
- `--z-index-sticky`: 1020
- `--z-index-fixed`: 1030
- `--z-index-modal-backdrop`: 1040
- `--z-index-modal`: 1050
- `--z-index-popover`: 1060
- `--z-index-tooltip`: 1070

## 响应式设计

设计系统提供以下断点：

```css
@media (max-width: 639px) {
  /* 移动端 */
}
@media (min-width: 640px) and (max-width: 767px) {
  /* 大屏手机 */
}
@media (min-width: 768px) and (max-width: 1023px) {
  /* 平板端 */
}
@media (min-width: 1024px) and (max-width: 1279px) {
  /* 小屏桌面 */
}
@media (min-width: 1280px) {
  /* 大屏桌面 */
}
```

## 主题切换

在文档站点中实现主题切换：

```ts
import { useState, useEffect } from 'react';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
      切换主题
    </button>
  );
}
```

## 类型定义

### NavbarProps

```ts
interface NavbarProps {
  logo?: string;
  title?: string;
  links?: NavLink[];
  showSearch?: boolean;
  showThemeToggle?: boolean;
  githubUrl?: string;
}
```

### SidebarProps

```ts
interface SidebarProps {
  sections: NavSection[];
}

interface NavSection {
  title: string;
  items: SidebarItem[];
}

interface SidebarItem {
  label: string;
  href: string;
  active?: boolean;
}
```

### ThemeToggleProps

```ts
interface ThemeToggleProps {
  defaultTheme?: 'light' | 'dark';
  onThemeChange?: (theme: 'light' | 'dark') => void;
}
```

### SearchBoxProps

```ts
interface SearchBoxProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}
```

## 样式文件

设计系统包含以下样式文件：

- `variables.css`: CSS 变量定义
- `reset.css`: CSS reset
- `typography.css`: 排版样式
- `layout.css`: 布局组件和工具类
- `themes.css`: 主题样式

## 开发

```bash
# 安装依赖
pnpm install

# 构建
pnpm build

# 类型检查
pnpm type-check

# 清理
pnpm clean
```

## License

MIT
