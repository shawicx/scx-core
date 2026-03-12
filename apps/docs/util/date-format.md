---
group:
  title: 通用工具
  order: 0
toc: content
---

日期格式常量提供了一组常用的日期格式定义，用于统一项目中的日期格式规范。

## DateFormat - 日期格式常量

包含常用的日期格式常量定义。

```typescript
const DateFormat = {
  DATE_FORMAT: 'YYYY-MM-DD',
  TIME_FORMAT: 'HH:mm:ss',
  DATE_TIME_FORMAT: 'YYYY-MM-DD HH:mm:ss',
  MONTH_DAY_FORMAT: 'MM-DD',
  YEAR_FORMAT: 'YYYY',
};
```

### 常量说明

#### DATE_FORMAT - 日期格式

```typescript
DATE_FORMAT: 'YYYY-MM-DD';
```

**示例**

```
2024-03-12
```

**使用场景**

- 日期选择器的值格式
- 表单中的日期输入
- 数据库存储的日期格式

---

#### TIME_FORMAT - 时间格式

```typescript
TIME_FORMAT: 'HH:mm:ss';
```

**示例**

```
14:30:45
09:15:00
```

**使用场景**

- 时间选择器的值格式
- 时分秒显示
- 计时器显示

---

#### DATE_TIME_FORMAT - 日期时间格式

```typescript
DATE_TIME_FORMAT: 'YYYY-MM-DD HH:mm:ss';
```

**示例**

```
2024-03-12 14:30:45
2024-01-01 09:15:00
```

**使用场景**

- 完整的日期时间显示
- 日志记录的时间戳
- 数据库存储的日期时间格式

---

#### MONTH_DAY_FORMAT - 月日格式

```typescript
MONTH_DAY_FORMAT: 'MM-DD';
```

**示例**

```
03-12
12-25
```

**使用场景**

- 生日显示
- 节日提醒
- 年内日期对比

---

#### YEAR_FORMAT - 年份格式

```typescript
YEAR_FORMAT: 'YYYY';
```

**示例**

```
2024
2023
```

**使用场景**

- 年份选择
- 年度统计
- 版权年份显示

---

## 使用示例

### 在 React 中使用

```typescript
import { DateFormat } from '@scxfe/util';

function DateDisplay({ date }: { date: Date }) {
  const formatDate = (date: Date, format: string) => {
    // 这里可以配合 dayjs、date-fns 等库使用
    return dayjs(date).format(format);
  };

  return (
    <div>
      <p>日期: {formatDate(date, DateFormat.DATE_FORMAT)}</p>
      <p>时间: {formatDate(date, DateFormat.TIME_FORMAT)}</p>
      <p>完整时间: {formatDate(date, DateFormat.DATE_TIME_FORMAT)}</p>
    </div>
  );
}
```

### 在 Vue 中使用

```vue
<script setup lang="ts">
import { DateFormat } from '@scxfe/util';
import dayjs from 'dayjs';

const formatDate = (date: Date, format: string) => {
  return dayjs(date).format(format);
};

const currentDate = new Date();
</script>

<template>
  <div>
    <p>日期: {{ formatDate(currentDate, DateFormat.DATE_FORMAT) }}</p>
    <p>时间: {{ formatDate(currentDate, DateFormat.TIME_FORMAT) }}</p>
    <p>完整时间: {{ formatDate(currentDate, DateFormat.DATE_TIME_FORMAT) }}</p>
  </div>
</template>
```

### 在表单中使用

```typescript
import { DateFormat } from '@scxfe/util';

interface FormData {
  birthday: string;
  workTime: string;
  createTime: string;
}

// 表单验证规则
const formRules = {
  birthday: {
    pattern: /^\d{4}-\d{2}-\d{2}$/,
    message: `请输入正确的日期格式 (${DateFormat.DATE_FORMAT})`,
  },
  workTime: {
    pattern: /^\d{2}:\d{2}:\d{2}$/,
    message: `请输入正确的时间格式 (${DateFormat.TIME_FORMAT})`,
  },
};
```

### 在 API 请求中使用

```typescript
import { DateFormat } from '@scxfe/util';
import dayjs from 'dayjs';

interface GetListParams {
  startDate: string;
  endDate: string;
}

function getDataList() {
  const params: GetListParams = {
    startDate: dayjs().subtract(7, 'day').format(DateFormat.DATE_FORMAT),
    endDate: dayjs().format(DateFormat.DATE_FORMAT),
  };

  return fetch('/api/list', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}
```

### 在日志中使用

```typescript
import { DateFormat } from '@scxfe/util';

function logMessage(message: string) {
  const timestamp = dayjs().format(DateFormat.DATE_TIME_FORMAT);
  console.log(`[${timestamp}] ${message}`);
}

logMessage('用户登录成功');
// [2024-03-12 14:30:45] 用户登录成功
```

### 在导出文件中使用

```typescript
import { DateFormat } from '@scxfe/util';

function exportCSV(data: any[]) {
  const header = `创建时间,用户名,操作\n`;

  const rows = data
    .map((item) => {
      const createTime = dayjs(item.createTime).format(DateFormat.DATE_TIME_FORMAT);
      return `${createTime},${item.username},${item.action}`;
    })
    .join('\n');

  const csv = header + rows;
  downloadFile(csv, `data_${dayjs().format(DateFormat.DATE_FORMAT)}.csv`);
}
```

---

## 配合日期库使用

### 使用 dayjs

```typescript
import dayjs from 'dayjs';
import { DateFormat } from '@scxfe/util';

const now = dayjs();

console.log(now.format(DateFormat.DATE_FORMAT));
console.log(now.format(DateFormat.TIME_FORMAT));
console.log(now.format(DateFormat.DATE_TIME_FORMAT));
console.log(now.format(DateFormat.MONTH_DAY_FORMAT));
console.log(now.format(DateFormat.YEAR_FORMAT));
```

### 使用 date-fns

```typescript
import { format } from 'date-fns';
import { DateFormat } from '@scxfe/util';

const now = new Date();

// date-fns 使用不同的格式符号，需要转换
const formatDate = (date: Date, fmt: string) => {
  return format(
    date,
    fmt
      .replace(/YYYY/g, 'yyyy')
      .replace(/MM/g, 'MM')
      .replace(/DD/g, 'dd')
      .replace(/HH/g, 'HH')
      .replace(/mm/g, 'mm')
      .replace(/ss/g, 'ss'),
  );
};

console.log(formatDate(now, DateFormat.DATE_FORMAT));
```

---

## 注意事项

- 这些常量仅定义了格式字符串，不提供实际的格式化功能
- 需要配合 dayjs、date-fns、Moment.js 等日期库使用
- 格式字符串遵循通用的日期格式标准
