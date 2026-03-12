---
group:
  title: 数据处理
  order: 2
toc: content
---

BiMap（双向映射）是一种特殊的数据结构，支持 label 和 value 之间的双向查找，常用于处理选项列表、状态映射等场景。

## BiMap 类

BiMap 类是一个双向映射容器，维护了 value → label 和 label → value 两个方向的映射关系。

```typescript
class BiMap {
  constructor(items?: Item[]);

  add(item: Item): void;
  addAll(items: Item[]): void;
  removeByValue(value: ValueType): boolean;
  removeByLabel(label: string): boolean;
  clear(): void;
  getLabel(value: ValueType): string | undefined;
  getValue(label: string): ValueType | undefined;
  hasValue(value: ValueType): boolean;
  hasLabel(label: string): boolean;
  entries(): [ValueType, string][];
  toArray(): Item[];
}

type ValueType = string | number | boolean;
type Item = { label: string; value: ValueType };
```

### 构造函数

```typescript
new BiMap(items?: Item[])
```

**参数**

- `items` - 可选，初始化的映射项数组

**示例**

```typescript
// 空构造
const biMap = new BiMap();

// 初始化构造
const biMap = new BiMap([
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 },
]);
```

---

### add - 添加映射

添加单个 label-value 映射。

```typescript
add(item: Item): void;
```

**参数**

- `item` - 映射项，包含 label 和 value

**示例**

```typescript
const biMap = new BiMap();

biMap.add({ label: '启用', value: 1 });
biMap.add({ label: '禁用', value: 0 });

console.log(biMap.getLabel(1)); // '启用'
console.log(biMap.getValue('启用')); // 1
```

---

### addAll - 批量添加映射

批量添加多个 label-value 映射。

```typescript
addAll(items: Item[]): void;
```

**参数**

- `items` - 映射项数组

**示例**

```typescript
const biMap = new BiMap();

biMap.addAll([
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' },
]);

console.log(biMap.getLabel('beijing')); // '北京'
console.log(biMap.getValue('上海')); // 'shanghai'
```

---

### removeByValue - 根据 value 删除映射

根据 value 删除对应的映射关系。

```typescript
removeByValue(value: ValueType): boolean;
```

**参数**

- `value` - 要删除的 value 值

**返回值**

- `boolean` - 返回 `true` 表示删除成功，返回 `false` 表示未找到对应的映射

**示例**

```typescript
const biMap = new BiMap([
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 },
]);

const result = biMap.removeByValue(1);
console.log(result); // true
console.log(biMap.hasValue(1)); // false

const notFound = biMap.removeByValue(2);
console.log(notFound); // false
```

---

### removeByLabel - 根据 label 删除映射

根据 label 删除对应的映射关系。

```typescript
removeByLabel(label: string): boolean;
```

**参数**

- `label` - 要删除的 label 值

**返回值**

- `boolean` - 返回 `true` 表示删除成功，返回 `false` 表示未找到对应的映射

**示例**

```typescript
const biMap = new BiMap([
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 },
]);

const result = biMap.removeByLabel('启用');
console.log(result); // true
console.log(biMap.hasLabel('启用')); // false
```

---

### clear - 清空所有映射

清空所有的映射关系。

```typescript
clear(): void;
```

**示例**

```typescript
const biMap = new BiMap([
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 },
]);

biMap.clear();
console.log(biMap.hasValue(1)); // false
console.log(biMap.hasLabel('启用')); // false
```

---

### getLabel - 根据 value 获取 label

根据 value 值获取对应的 label。

```typescript
getLabel(value: ValueType): string | undefined;
```

**参数**

- `value` - 要查询的 value 值

**返回值**

- `string | undefined` - 返回对应的 label，如果未找到则返回 `undefined`

**示例**

```typescript
const biMap = new BiMap([
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 },
]);

console.log(biMap.getLabel(1)); // '启用'
console.log(biMap.getLabel(0)); // '禁用'
console.log(biMap.getLabel(2)); // undefined
```

---

### getValue - 根据 label 获取 value

根据 label 值获取对应的 value。

```typescript
getValue(label: string): ValueType | undefined;
```

**参数**

- `label` - 要查询的 label 值

**返回值**

- `ValueType | undefined` - 返回对应的 value，如果未找到则返回 `undefined`

**示例**

```typescript
const biMap = new BiMap([
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 },
]);

console.log(biMap.getValue('启用')); // 1
console.log(biMap.getValue('禁用')); // 0
console.log(biMap.getValue('未知')); // undefined
```

---

### hasValue - 检查 value 是否存在

检查指定的 value 是否存在于映射中。

```typescript
hasValue(value: ValueType): boolean;
```

**参数**

- `value` - 要检查的 value 值

**返回值**

- `boolean` - 返回 `true` 表示存在，返回 `false` 表示不存在

**示例**

```typescript
const biMap = new BiMap([
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 },
]);

console.log(biMap.hasValue(1)); // true
console.log(biMap.hasValue(2)); // false
```

---

### hasLabel - 检查 label 是否存在

检查指定的 label 是否存在于映射中。

```typescript
hasLabel(label: string): boolean;
```

**参数**

- `label` - 要检查的 label 值

**返回值**

- `boolean` - 返回 `true` 表示存在，返回 `false` 表示不存在

**示例**

```typescript
const biMap = new BiMap([
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 },
]);

console.log(biMap.hasLabel('启用')); // true
console.log(biMap.hasLabel('未知')); // false
```

---

### entries - 获取所有映射条目

获取所有 value → label 的映射条目。

```typescript
entries(): [ValueType, string][];
```

**返回值**

- `[ValueType, string][]` - 返回包含所有映射条目的数组，每个元素是一个 `[value, label]` 元组

**示例**

```typescript
const biMap = new BiMap([
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 },
]);

console.log(biMap.entries());
// [[1, '启用'], [0, '禁用']]

// 遍历所有映射
for (const [value, label] of biMap.entries()) {
  console.log(`${value} -> ${label}`);
}
```

---

### toArray - 转换为数组

将 BiMap 转换为 Item 数组。

```typescript
toArray(): Item[];
```

**返回值**

- `Item[]` - 返回包含所有映射项的数组

**示例**

```typescript
const biMap = new BiMap([
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
]);

console.log(biMap.toArray());
// [{ label: '北京', value: 'beijing' }, { label: '上海', value: 'shanghai' }]

// 在 React 中使用
import { useMemo } from 'react';

function CitySelector({ biMap }: { biMap: BiMap }) {
  const options = useMemo(() => biMap.toArray(), [biMap]);

  return (
    <select>
      {options.map((item, index) => (
        <option key={index} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
}
```

---

## BiMapFactory 工厂类

BiMapFactory 提供了一些静态方法来创建和转换 BiMap 实例。

```typescript
class BiMapFactory {
  static fromArray(items: Item[]): BiMap;
  static toBiMap(items: Item[]): BiMap;
  static toValueMap(items: Item[]): Map<ValueType, string>;
  static toLabelMap(items: Item[]): Map<string, ValueType>;
}
```

---

### fromArray - 从数组创建 BiMap（带缓存）

从数组创建 BiMap 实例，并使用 WeakMap 进行缓存，相同的数组会返回同一个实例。

```typescript
static fromArray(items: Item[]): BiMap;
```

**参数**

- `items` - 映射项数组

**返回值**

- `BiMap` - 返回 BiMap 实例

**说明**

- 使用 WeakMap 缓存，相同的数组会返回同一个实例
- 适合需要频繁查询同一组映射的场景

**示例**

```typescript
const items = [
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 },
];

const biMap1 = BiMapFactory.fromArray(items);
const biMap2 = BiMapFactory.fromArray(items);

console.log(biMap1 === biMap2); // true，返回同一个实例
```

---

### toBiMap - 从数组创建 BiMap（不缓存）

从数组创建 BiMap 实例，不使用缓存。

```typescript
static toBiMap(items: Item[]): BiMap;
```

**参数**

- `items` - 映射项数组

**返回值**

- `BiMap` - 返回新的 BiMap 实例

**说明**

- 每次调用都会创建新的实例
- 不使用缓存，适合一次性转换

**示例**

```typescript
const items = [
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 },
];

const biMap = BiMapFactory.toBiMap(items);

console.log(biMap.getLabel(1)); // '启用'
console.log(biMap.getValue('禁用')); // 0
```

---

### toValueMap - 转换为 value→label 的 Map

将数组转换为 value → label 的 Map。

```typescript
static toValueMap(items: Item[]): Map<ValueType, string>;
```

**参数**

- `items` - 映射项数组

**返回值**

- `Map<ValueType, string>` - 返回 value → label 的 Map

**示例**

```typescript
const items = [
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 },
];

const valueMap = BiMapFactory.toValueMap(items);

console.log(valueMap.get(1)); // '启用'
console.log(valueMap.get(0)); // '禁用'
```

---

### toLabelMap - 转换为 label→value 的 Map

将数组转换为 label → value 的 Map。

```typescript
static toLabelMap(items: Item[]): Map<string, ValueType>;
```

**参数**

- `items` - 映射项数组

**返回值**

- `Map<string, ValueType>` - 返回 label → value 的 Map

**示例**

```typescript
const items = [
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 },
];

const labelMap = BiMapFactory.toLabelMap(items);

console.log(labelMap.get('启用')); // 1
console.log(labelMap.get('禁用')); // 0
```

---

## 综合示例

### 状态映射

```typescript
import { BiMap } from '@scxfe/util';

// 定义状态选项
const statusMap = new BiMap([
  { label: '待审核', value: 0 },
  { label: '已通过', value: 1 },
  { label: '已拒绝', value: 2 },
]);

// 获取状态的显示文本
const statusLabel = statusMap.getLabel(user.status);

// 获取状态的值
const statusValue = statusMap.getValue('已通过');

// 转换为选项列表
const statusOptions = statusMap.toArray();

// 在 React 中使用
function StatusSelect() {
  return (
    <select>
      {statusOptions.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
}
```

### 城市选择

```typescript
import { BiMapFactory } from '@scxfe/util';

const cities = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' },
  { label: '深圳', value: 'shenzhen' },
];

// 创建带缓存的 BiMap
const cityMap = BiMapFactory.fromArray(cities);

// 根据城市代码获取名称
const cityName = cityMap.getLabel('shanghai'); // '上海'

// 根据城市名称获取代码
const cityCode = cityMap.getValue('北京'); // 'beijing'

// 转换为 Map 用于快速查找
const valueMap = BiMapFactory.toValueMap(cities);
const labelMap = BiMapFactory.toLabelMap(cities);
```

### 权限管理

```typescript
import { BiMap } from '@scxfe/util';

const permissions = new BiMap([
  { label: '查看', value: 'view' },
  { label: '编辑', value: 'edit' },
  { label: '删除', value: 'delete' },
  { label: '管理', value: 'admin' },
]);

// 检查权限
function hasPermission(userPermissions: string[], permissionLabel: string): boolean {
  const permissionValue = permissions.getValue(permissionLabel);
  return userPermissions.includes(permissionValue!);
}

// 使用示例
const userPerms = ['view', 'edit'];
console.log(hasPermission(userPerms, '查看')); // true
console.log(hasPermission(userPerms, '删除')); // false
```

### 配置选项

```typescript
import { BiMapFactory } from '@scxfe/util';

const themes = [
  { label: '浅色', value: 'light' },
  { label: '深色', value: 'dark' },
  { label: '自动', value: 'auto' },
];

// 创建双向映射
const themeMap = BiMapFactory.toBiMap(themes);

// 获取主题的显示名称
function getThemeLabel(themeValue: string): string {
  return themeMap.getLabel(themeValue) || '未知';
}

// 获取主题的值
function getThemeValue(themeLabel: string): string {
  return themeMap.getValue(themeLabel) || 'auto';
}

// 在 Vue 中使用
const themeOptions = themeMap.toArray();
```
