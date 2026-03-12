---
group:
  title: 通用工具
  order: 0
toc: content
---

字符串工具提供了一些常用的字符串转换和处理函数。

## humpToLinker - 驼峰转连接符

将驼峰命名转换为连接符命名。

```typescript
function humpToLinker(input: string, delimiter?: string): string;
```

**参数**

- `input` - 要转换的字符串
- `delimiter` - 连接符号，默认为 `-`

**返回值**

- `string` - 转换后的字符串

**说明**

- 将大写字母转换为小写，并在前面添加连接符
- 如果第一个字符是大写，不会在前面添加连接符
- 默认使用 `-` 作为连接符，可以自定义

**示例**

```typescript
// 默认使用 - 作为连接符
console.log(humpToLinker('userName'));
// 'user-name'

console.log(humpToLinker('getUserNameById'));
// 'get-user-name-by-id'

console.log(humpToLinker('HTTPResponse'));
// 'h-t-t-p-response'

// 首字母大写的情况
console.log(humpToLinker('UserName'));
// 'user-name'

// 自定义连接符
console.log(humpToLinker('userName', '_'));
// 'user_name'

console.log(humpToLinker('getUserNameById', '_'));
// 'get_user_name_by_id'

// 在 CSS 类名转换中使用
const className = humpToLinker('MyComponent', '--');
console.log(className);
// 'my-component--'

// 在文件名转换中使用
const fileName = humpToLinker('UserProfilePage', '_');
console.log(fileName);
// 'user_profile_page'
```

---

## linkerToHump - 连接符转驼峰

将连接符命名转换为驼峰命名。

```typescript
function linkerToHump(input: string, delimiter?: string, capitalizeFirst?: boolean): string;
```

**参数**

- `input` - 要转换的字符串
- `delimiter` - 连接符号，默认为 `-`
- `capitalizeFirst` - 是否转为大驼峰，默认为 `false`

**返回值**

- `string` - 转换后的字符串

**说明**

- 根据连接符分割字符串
- 每个单词首字母大写（第一个单词除外）
- `capitalizeFirst` 为 `true` 时，第一个单词也大写（大驼峰）

**示例**

```typescript
// 转换为小驼峰
console.log(linkerToHump('user-name'));
// 'userName'

console.log(linkerToHump('get-user-name-by-id'));
// 'getUserNameById'

console.log(linkerToHump('h-t-t-p-response'));
// 'H-T-T-PResponse'

// 自定义连接符
console.log(linkerToHump('user_name', '_'));
// 'userName'

console.log(linkerToHump('get_user_name_by_id', '_'));
// 'getUserNameById'

// 转换为大驼峰（首字母大写）
console.log(linkerToHump('user-name', '-', true));
// 'UserName'

console.log(linkerToHump('get-user-name-by-id', '-', true));
// 'GetUserNameById'

// 在 React 组件名称转换中使用
const componentName = linkerToHump('user-profile-page', '-', true);
console.log(componentName);
// 'UserProfilePage'

// 在变量名转换中使用
const variableName = linkerToHump('user-name');
console.log(variableName);
// 'userName'
```

---

## upperFirst - 首字母转大写

将字符串的首字母转换为大写。

```typescript
function upperFirst(text: string): string;
```

**参数**

- `text` - 要转换的字符串

**返回值**

- `string` - 首字母大写的字符串

**示例**

```typescript
console.log(upperFirst('hello'));
// 'Hello'

console.log(upperFirst('world'));
// 'World'

console.log(upperFirst('userName'));
// 'UserName'

// 在显示名称中使用
function displayName(name: string) {
  return upperFirst(name);
}

console.log(displayName('john'));
// 'John'

console.log(displayName('alice'));
// 'Alice'

// 在标题中使用
const title = upperFirst('welcome to my app');
// 'Welcome to my app'
```

---

## lowerFirst - 首字母转小写

将字符串的首字母转换为小写。

```typescript
function lowerFirst(text: string): string;
```

**参数**

- `text` - 要转换的字符串

**返回值**

- `string` - 首字母小写的字符串

**示例**

```typescript
console.log(lowerFirst('Hello'));
// 'hello'

console.log(lowerFirst('World'));
// 'world'

console.log(lowerFirst('UserName'));
// 'userName'

// 在变量名中使用
const variableName = lowerFirst('UserName');
console.log(variableName);
// 'userName'

// 在 CSS 类名中使用
const className = lowerFirst('MyComponent');
console.log(className);
// 'myComponent'
```

---

## 综合示例

### CSS 类名转换

```typescript
import { humpToLinker, linkerToHump } from '@scxfe/util';

// 将驼峰转换为 CSS 类名
const getClassName = (name: string) => humpToLinker(name, '-');

const componentClass = getClassName('MyComponent');
console.log(componentClass);
// 'my-component'

const buttonClass = getClassName('PrimaryButton');
console.log(buttonClass);
// 'primary-button'

// 在 React 中使用
function Button({ variant = 'default' }: { variant?: string }) {
  const className = humpToLinker(`button-${variant}`);
  return <button className={className}>Click me</button>;
}

// 生成: <button className="button-default">Click me</button>
```

### 组件名称转换

```typescript
import { humpToLinker, linkerToHump, upperFirst } from '@scxfe/util';

// 将文件名转换为组件名称
const getComponentName = (fileName: string) => {
  const baseName = fileName.replace(/\.tsx?$/, '');
  return linkerToHump(baseName, '-', true);
};

console.log(getComponentName('user-profile-page'));
// 'UserProfilePage'

console.log(getComponentName('data-table'));
// 'DataTable'

// 将组件名称转换为文件名
const getFileName = (componentName: string) => {
  return humpToLinker(componentName);
};

console.log(getFileName('UserProfilePage'));
// 'user-profile-page'
```

### 命名风格转换

```typescript
import { humpToLinker, linkerToHump, upperFirst, lowerFirst } from '@scxfe/util';

// 驼峰转蛇形
const camelToSnake = (str: string) => humpToLinker(str, '_');

console.log(camelToSnake('userName'));
// 'user_name'

console.log(camelToSnake('getUserNameById'));
// 'get_user_name_by_id'

// 蛇形转驼峰
const snakeToCamel = (str: string) => linkerToHump(str, '_');

console.log(snakeToCamel('user_name'));
// 'userName'

console.log(snakeToCamel('get_user_name_by_id'));
// 'getUserNameById'

// 蛇形转大驼峰
const snakeToPascal = (str: string) => linkerToHump(str, '_', true);

console.log(snakeToPascal('user_name'));
// 'UserName'

console.log(snakeToPascal('get_user_name_by_id'));
// 'GetUserNameById'
```

### API 参数转换

```typescript
import { humpToLinker, linkerToHump } from '@scxfe/util';

interface CamelCaseParams {
  userName: string;
  userId: number;
  isActive: boolean;
}

interface SnakeCaseParams {
  user_name: string;
  user_id: number;
  is_active: boolean;
}

// 将驼峰参数转换为蛇形参数
const transformToSnake = (params: CamelCaseParams): SnakeCaseParams => {
  const result: any = {};
  for (const key in params) {
    const snakeKey = humpToLinker(key, '_');
    result[snakeKey] = params[key as keyof CamelCaseParams];
  }
  return result;
};

const camelParams: CamelCaseParams = {
  userName: 'john',
  userId: 123,
  isActive: true,
};

const snakeParams = transformToSnake(camelParams);
console.log(snakeParams);
// { user_name: 'john', user_id: 123, is_active: true }

// 将蛇形参数转换为驼峰参数
const transformToCamel = (params: SnakeCaseParams): CamelCaseParams => {
  const result: any = {};
  for (const key in params) {
    const camelKey = linkerToHump(key, '_');
    result[camelKey] = params[key as keyof SnakeCaseParams];
  }
  return result;
};
```

### 在 React Hooks 中使用

```typescript
import { humpToLinker, linkerToHump, upperFirst } from '@scxfe/util';

function useClassName(prefix: string) {
  const createClassName = (name: string) => {
    const baseName = humpToLinker(name);
    return `${prefix}-${baseName}`;
  };

  return { createClassName };
}

function Component() {
  const { createClassName } = useClassName('my-app');

  const buttonClass = createClassName('PrimaryButton');
  const inputClass = createClassName('UserNameInput');

  return (
    <div>
      <button className={buttonClass}>Submit</button>
      <input className={inputClass} />
    </div>
  );
}

// 生成的类名:
// <button class="my-app-primary-button">Submit</button>
// <input class="my-app-user-name-input" />
```

### 在 Vue 中使用

```vue
<script setup lang="ts">
import { computed } from 'vue';
import { humpToLinker, linkerToHump, upperFirst } from '@scxfe/util';

interface Component {
  name: string;
  title: string;
}

const props = defineProps<{
  component: Component;
}>();

const className = computed(() => {
  return humpToLinker(props.component.name);
});

const displayName = computed(() => {
  return upperFirst(props.component.title);
});
</script>

<template>
  <div :class="className">
    {{ displayName }}
  </div>
</template>
```

### 表单字段映射

```typescript
import { humpToLinker, linkerToHump } from '@scxfe/util';

// 前端使用驼峰命名
interface FormField {
  userName: string;
  userEmail: string;
  userAge: number;
}

// 后端使用蛇形命名
interface ApiData {
  user_name: string;
  user_email: string;
  user_age: number;
}

// 转换表单数据为 API 数据
const formToApi = (formData: FormField): ApiData => {
  return Object.entries(formData).reduce((acc, [key, value]) => {
    const snakeKey = humpToLinker(key, '_');
    acc[snakeKey as keyof ApiData] = value as any;
    return acc;
  }, {} as ApiData);
};

// 转换 API 数据为表单数据
const apiToForm = (apiData: ApiData): FormField => {
  return Object.entries(apiData).reduce((acc, [key, value]) => {
    const camelKey = linkerToHump(key, '_');
    acc[camelKey as keyof FormField] = value as any;
    return acc;
  }, {} as FormField);
};

const formData: FormField = {
  userName: 'john',
  userEmail: 'john@example.com',
  userAge: 30,
};

const apiData = formToApi(formData);
console.log(apiData);
// { user_name: 'john', user_email: 'john@example.com', user_age: 30 }

const restoredData = apiToForm(apiData);
console.log(restoredData);
// { userName: 'john', userEmail: 'john@example.com', userAge: 30 }
```
