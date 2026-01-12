# component-docs-pages - 规范增量

## Purpose

更新组件文档页面路由配置，从动态路由改为具体路由，并确保首页包含所有组件和 Hooks 的链接。

## ADDED Requirements

### Requirement: React 文档站点具体路由配置

React 文档站点的路由配置 MUST 使用具体路由而非动态路由。

#### Scenario: React UI 组件路由配置

**Given** React 文档站点路由配置

**When** 配置 UI 组件路由

**Then** 必须包含以下具体路由：

- `/components/card` - Card 组件文档页面
- `/components/caption` - Caption 组件文档页面
- `/components/gradient-border` - GradientBorder 组件文档页面
- `/components/a-map` - AMap 组件文档页面

**And** 每个路由必须使用具体的 `element` 属性导入对应的页面组件

#### Scenario: React Hooks 路由配置

**Given** React 文档站点路由配置

**When** 配置 Hooks 路由

**Then** 必须包含以下具体路由：

- `/hooks/use-counter` - useCounter Hook 文档页面
- `/hooks/use-toggle` - useToggle Hook 文档页面
- `/hooks/use-local-storage` - useLocalStorage Hook 文档页面

**And** 每个路由必须使用具体的 `element` 属性导入对应的页面组件

#### Scenario: React 文档站点首页包含所有组件链接

**Given** React 文档站点首页

**When** 渲染组件列表

**Then** 必须包含所有 UI 组件和 Hooks 的链接

**And** 链接必须指向对应的路由路径

**And** 组件和 Hooks 应该分组显示

---

### Requirement: Vue 文档站点具体路由配置

Vue 文档站点的路由配置 MUST 使用具体路由而非动态路由。

#### Scenario: Vue UI 组件路由配置

**Given** Vue 文档站点路由配置

**When** 配置 UI 组件路由

**Then** 必须包含以下具体路由：

- `/components/button` - Button 组件文档页面
- `/components/card` - Card 组件文档页面
- `/components/counter` - Counter 组件文档页面

**And** 每个路由必须使用具体的 `component` 属性导入对应的页面组件

#### Scenario: Vue Hooks 路由配置

**Given** Vue 文档站点路由配置

**When** 配置 Hooks 路由

**Then** 必须包含以下具体路由：

- `/hooks/use-counter` - useCounter Hook 文档页面
- `/hooks/use-toggle` - useToggle Hook 文档页面
- `/hooks/use-local-storage` - useLocalStorage Hook 文档页面

**And** 每个路由必须使用具体的 `component` 属性导入对应的页面组件

#### Scenario: Vue 文档站点首页包含所有组件链接

**Given** Vue 文档站点首页

**When** 渲染组件列表

**Then** 必须包含所有 UI 组件和 Hooks 的链接

**And** 链接必须指向对应的路由路径

**And** 组件和 Hooks 应该分组显示
