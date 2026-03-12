---
group:
  title: 数据处理
  order: 2
toc: content
---

数组工具提供了一些常用的数组操作函数。

## rangeArray - 生成数字数组

根据指定的范围和步长生成数字数组。

```typescript
function rangeArray(start: number, end: number, step?: number): number[];
```

**参数**

- `start` - 开始值（包含）
- `end` - 结束值（包含）
- `step` - 步长，默认为 `1`

**返回值**

- `number[]` - 返回生成的数字数组

**说明**

- 当 `step` 为正数时，从 `start` 递增到 `end`
- 当 `step` 为负数时，从 `start` 递减到 `end`
- `step` 不能为 0

**示例**

```typescript
// 基础用法：生成 1 到 10 的数组
console.log(rangeArray(1, 10));
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// 指定步长：每两个数取一个
console.log(rangeArray(0, 10, 2));
// [0, 2, 4, 6, 8, 10]

// 负步长：从 10 递减到 1
console.log(rangeArray(10, 1, -1));
// [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

// 生成偶数
console.log(rangeArray(2, 20, 2));
// [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

// 生成 0-100 的 10 个等分
console.log(rangeArray(0, 100, 10));
// [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

// 在 React 中生成分页器
import { useMemo } from 'react';

function Pagination({ totalPages }: { totalPages: number }) {
  const pages = useMemo(() => rangeArray(1, totalPages), [totalPages]);

  return (
    <div>
      {pages.map(page => (
        <button key={page}>{page}</button>
      ))}
    </div>
  );
}

// 生成时间选项
const hours = rangeArray(0, 23);
const minutes = rangeArray(0, 59);

console.log(hours); // [0, 1, 2, ..., 23]
console.log(minutes); // [0, 1, 2, ..., 59]
```

---

## 使用场景

### 1. 分页器

```typescript
const pageNumbers = rangeArray(1, totalPages);
```

### 2. 生成选项列表

```typescript
const years = rangeArray(2000, 2024);
// ["2000", "2001", ..., "2024"]

const months = rangeArray(1, 12);
// [1, 2, 3, ..., 12]

const days = rangeArray(1, 31);
// [1, 2, 3, ..., 31]
```

### 3. 生成刻度

```typescript
const scales = rangeArray(0, 100, 10);
// [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
```

### 4. 循环索引

```typescript
const indices = rangeArray(0, array.length - 1);
indices.forEach((i) => {
  console.log(array[i]);
});
```
