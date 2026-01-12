## ADDED Requirements

### Requirement: Card 组件文档页面实现

React 文档站点 MUST 提供 Card 组件的完整文档页面，包含多个使用示例。

#### Scenario: Card 基础用法

**Given** Card 组件文档页面

**When** 用户查看默认模式示例

**Then** 必须展示使用 `CardMode.DEFAULT` 的基础卡片示例

**And** 示例代码必须是真实可运行的 TypeScript 代码

#### Scenario: Card 不同模式

**Given** Card 组件文档页面

**When** 用户查看不同模式示例

**Then** 必须展示至少 2 个不同的 Card 模式（DEFAULT、GRADIENT_BORDER）

**And** 每个示例必须使用 PreviewContainer 包裹

#### Scenario: Card 代码示例

**Given** Card 组件文档页面

**When** 用户查看任何示例

**Then** 每个示例必须有对应的代码字符串常量

**And** 代码字符串必须展示用户实际使用时的代码

---

### Requirement: Caption 组件文档页面实现

React 文档站点 MUST 提供 Caption 组件的完整文档页面，包含多个使用示例。

#### Scenario: Caption 基础用法

**Given** Caption 组件文档页面

**When** 用户查看基础用法示例

**Then** 必须展示基础的标题组件示例

**And** 示例必须包含标题内容

#### Scenario: Caption 不同形状

**Given** Caption 组件文档页面

**When** 用户查看不同形状示例

**Then** 必须展示至少 2 个不同的 shape 配置（default、square、circle）

**And** 每个示例必须使用 PreviewContainer 包裹

---

### Requirement: GradientBorder 组件文档页面实现

React 文档站点 MUST 提供 GradientBorder 组件的完整文档页面，包含多个使用示例。

#### Scenario: GradientBorder 基础用法

**Given** GradientBorder 组件文档页面

**When** 用户查看基础用法示例

**Then** 必须展示带有渐变边框的容器示例

**And** 示例必须包含必需的 props（width、height、gradientColor）

#### Scenario: GradientBorder 不同方向

**Given** GradientBorder 组件文档页面

**When** 用户查看不同方向示例

**Then** 必须展示至少 2 个不同的 placement 配置

**And** 每个示例必须使用 PreviewContainer 包裹

---

### Requirement: AMap 组件文档页面实现

React 文档站点 MUST 提供 AMap 组件的完整文档页面，包含多个使用示例。

#### Scenario: AMap 基础地图

**Given** AMap 组件文档页面

**When** 用户查看基础地图示例

**Then** 必须展示基础的高德地图示例

**And** 示例必须包含必需的 props（container、apiKey）

#### Scenario: AMap 自定义样式

**Given** AMap 组件文档页面

**When** 用户查看自定义样式示例

**Then** 必须展示自定义宽高和样式的地图示例

#### Scenario: AMap 事件监听

**Given** AMap 组件文档页面

**When** 用户查看事件监听示例

**Then** 必须展示地图事件处理的示例

**And** 每个示例必须使用 PreviewContainer 包裹

---

### Requirement: Button 组件文档页面实现

Vue 文档站点 MUST 提供 Button 组件的完整文档页面，包含多个使用示例。

#### Scenario: Button 基础用法

**Given** Button 组件文档页面

**When** 用户查看基础按钮示例

**Then** 必须展示不同类型的基础按钮（primary、secondary、success）

#### Scenario: Button 不同类型

**Given** Button 组件文档页面

**When** 用户查看不同类型示例

**Then** 必须展示所有支持的按钮类型（primary、secondary、success、warning、danger、ghost）

#### Scenario: Button 不同尺寸

**Given** Button 组件文档页面

**When** 用户查看不同尺寸示例

**Then** 必须展示所有支持的按钮尺寸（small、medium、large）

#### Scenario: Button 状态

**Given** Button 组件文档页面

**When** 用户查看状态示例

**Then** 必须展示禁用状态和加载状态的按钮

#### Scenario: Button 代码示例

**Given** Button 组件文档页面

**When** 用户查看任何示例

**Then** 每个示例必须有对应的代码字符串常量

**And** 每个示例必须使用 PreviewContainer 包裹

---

### Requirement: Vue Card 组件文档页面实现

Vue 文档站点 MUST 提供 Card 组件的完整文档页面，包含多个使用示例。

#### Scenario: Vue Card 基础用法

**Given** Card 组件文档页面

**When** 用户查看基础卡片示例

**Then** 必须展示带有标题和内容的基础卡片

#### Scenario: Vue Card 不同尺寸

**Given** Card 组件文档页面

**When** 用户查看不同尺寸示例

**Then** 必须展示所有支持的卡片尺寸（small、medium、large）

#### Scenario: Vue Card 阴影配置

**Given** Card 组件文档页面

**When** 用户查看阴影配置示例

**Then** 必须展示不同的阴影配置（always、hover、never）

---

### Requirement: Counter 组件文档页面实现

Vue 文档站点 MUST 提供 Counter 组件的完整文档页面，包含多个使用示例。

#### Scenario: Counter 基础用法

**Given** Counter 组件文档页面

**When** 用户查看基础计数器示例

**Then** 必须展示基础的增减计数器

#### Scenario: Counter 受限范围

**Given** Counter 组件文档页面

**When** 用户查看受限范围示例

**Then** 必须展示带有 min、max 限制的计数器

#### Scenario: Counter 可编辑模式

**Given** Counter 组件文档页面

**When** 用户查看可编辑模式示例

**Then** 必须展示可编辑的计数器

**And** 每个示例必须使用 PreviewContainer 包裹

---

### Requirement: useCounter Hook 文档页面实现（React）

React 文档站点 MUST 提供 useCounter Hook 的完整文档页面，包含多个使用示例。

#### Scenario: useCounter 基础用法

**Given** useCounter Hook 文档页面

**When** 用户查看基础用法示例

**Then** 必须展示基础的计数器 Hook 示例

**And** 示例必须展示 count、increment、decrement 的使用

#### Scenario: useCounter 自定义初始值

**Given** useCounter Hook 文档页面

**When** 用户查看自定义初始值示例

**Then** 必须展示设置初始值的示例

**And** 每个示例必须使用 PreviewContainer 包裹

---

### Requirement: useToggle Hook 文档页面实现（React）

React 文档站点 MUST 提供 useToggle Hook 的完整文档页面，包含多个使用示例。

#### Scenario: useToggle 基础用法

**Given** useToggle Hook 文档页面

**When** 用户查看基础用法示例

**Then** 必须展示基础的布尔值切换示例

**And** 示例必须展示 value、toggle 的使用

#### Scenario: useToggle 自定义初始值

**Given** useToggle Hook 文档页面

**When** 用户查看自定义初始值示例

**Then** 必须展示设置初始值为 true 的示例

---

### Requirement: useLocalStorage Hook 文档页面实现（React）

React 文档站点 MUST 提供 useLocalStorage Hook 的完整文档页面，包含多个使用示例。

#### Scenario: useLocalStorage 基础用法

**Given** useLocalStorage Hook 文档页面

**When** 用户查看基础用法示例

**Then** 必须展示存储简单值（字符串、数字）的示例

#### Scenario: useLocalStorage 复杂对象

**Given** useLocalStorage Hook 文档页面

**When** 用户查看复杂对象示例

**Then** 必须展示存储和读取复杂对象（数组、嵌套对象）的示例

**And** 每个示例必须使用 PreviewContainer 包裹

---

### Requirement: Vue useCounter Hook 文档页面实现

Vue 文档站点 MUST 提供 useCounter Hook 的完整文档页面，包含多个使用示例。

#### Scenario: Vue useCounter 基础用法

**Given** useCounter Hook 文档页面

**When** 用户查看基础用法示例

**Then** 必须展示基础的计数器 Hook 示例

**And** 示例必须展示响应式 count、increment、decrement 的使用

#### Scenario: Vue useCounter 自定义初始值

**Given** useCounter Hook 文档页面

**When** 用户查看自定义初始值示例

**Then** 必须展示设置初始值的示例

---

### Requirement: Vue useToggle Hook 文档页面实现

Vue 文档站点 MUST 提供 useToggle Hook 的完整文档页面，包含多个使用示例。

#### Scenario: Vue useToggle 基础用法

**Given** useToggle Hook 文档页面

**When** 用户查看基础用法示例

**Then** 必须展示基础的布尔值切换示例

**And** 示例必须展示响应式 value、toggle 的使用

#### Scenario: Vue useToggle 自定义初始值

**Given** useToggle Hook 文档页面

**When** 用户查看自定义初始值示例

**Then** 必须展示设置初始值为 true 的示例

---

### Requirement: Vue useLocalStorage Hook 文档页面实现

Vue 文档站点 MUST 提供 useLocalStorage Hook 的完整文档页面，包含多个使用示例。

#### Scenario: Vue useLocalStorage 基础用法

**Given** useLocalStorage Hook 文档页面

**When** 用户查看基础用法示例

**Then** 必须展示存储简单值（字符串、数字）的示例

#### Scenario: Vue useLocalStorage 复杂对象

**Given** useLocalStorage Hook 文档页面

**When** 用户查看复杂对象示例

**Then** 必须展示存储和读取复杂对象（数组、嵌套对象）的示例

---

### Requirement: 文档页面构建验证

所有组件文档页面 MUST 通过构建验证和代码质量检查。

#### Scenario: React 文档页面构建验证

**Given** React 文档站点的任何组件文档页面

**When** 运行 `pnpm build` 命令

**Then** 构建必须成功，无 TypeScript 错误

**And** 必须通过 oxlint 检查

**And** 必须符合 prettier 格式规范

#### Scenario: Vue 文档页面构建验证

**Given** Vue 文档站点的任何组件文档页面

**When** 运行 `pnpm build` 命令

**Then** 构建必须成功，无 TypeScript 错误

**And** 必须通过 oxlint 检查

**And** 必须符合 prettier 格式规范
