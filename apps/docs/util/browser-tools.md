---
group:
  title: 浏览器工具
  order: 3
toc: content
---

浏览器工具提供了一系列常用的浏览器 API 封装，包括环境检测、DOM 操作、地理位置和 URL 处理等功能。

## isBrowserEnvironment - 检测浏览器环境

检测当前运行环境是否为浏览器环境。

```typescript
function isBrowserEnvironment(): boolean;
```

**返回值**

- `boolean` - 返回 `true` 表示当前在浏览器环境，返回 `false` 表示在 Node.js 等非浏览器环境

**示例**

```typescript
if (isBrowserEnvironment()) {
  console.log('当前在浏览器环境');
} else {
  console.log('当前在服务器端环境');
}
```

---

## isCSSPropertySupported - 检查 CSS 属性支持

检查浏览器是否支持指定的 CSS 属性。

```typescript
function isCSSPropertySupported(property: string): boolean;
```

**参数**

- `property` - CSS 属性名，如 `'grid'`、`'flex'`、`'transform'` 等

**返回值**

- `boolean` - 返回 `true` 表示浏览器支持该属性，返回 `false` 表示不支持

**示例**

```typescript
if (isCSSPropertySupported('grid')) {
  console.log('浏览器支持 Grid 布局');
}

if (isCSSPropertySupported('backdrop-filter')) {
  console.log('浏览器支持 backdrop-filter');
}
```

---

## loadScript - 动态加载 JS 文件

动态加载外部 JavaScript 文件到页面中。

```typescript
function loadScript(url: string, options?: LoadCallback): void;

interface LoadCallback {
  onerror?: (error: string | Event) => void;
  onload?: () => void;
}
```

**参数**

- `url` - 要加载的 JavaScript 文件 URL
- `options` - 可选，加载回调配置
  - `onerror` - 加载失败时的回调函数
  - `onload` - 加载成功时的回调函数

**说明**

- 如果相同的脚本已经存在，则不会重复加载
- 脚本会被添加到 `<head>` 标签中

**示例**

```typescript
// 基础用法
loadScript('https://cdn.example.com/library.js', {
  onload: () => {
    console.log('JS 文件加载完成');
    // 使用加载的库
    window.SomeLibrary.init();
  },
  onerror: (error) => {
    console.error('JS 文件加载失败', error);
  },
});

// 仅加载
loadScript('/static/app.js');
```

---

## loadCSS - 动态加载 CSS 文件

动态加载外部 CSS 文件到页面中。

```typescript
function loadCSS(url: string, options?: LoadCallback): void;

interface LoadCallback {
  onerror?: (error: string | Event) => void;
  onload?: () => void;
}
```

**参数**

- `url` - 要加载的 CSS 文件 URL
- `options` - 可选，加载回调配置
  - `onerror` - 加载失败时的回调函数
  - `onload` - 加载成功时的回调函数

**说明**

- 如果相同的样式表已经存在，则不会重复加载
- 样式表会被添加到 `<head>` 标签中

**示例**

```typescript
// 基础用法
loadCSS('https://cdn.example.com/styles.css', {
  onload: () => {
    console.log('CSS 文件加载完成');
  },
  onerror: (error) => {
    console.error('CSS 文件加载失败', error);
  },
});

// 加载主题样式
loadCSS('/themes/dark.css');
```

---

## getLocation - 获取地理位置

获取用户当前地理位置信息。

```typescript
function getLocation(options?: PositionOptions): Promise<LocationResult>;

interface LocationResult {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

interface PositionOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}
```

**参数**

- `options` - 可选，地理位置获取配置
  - `enableHighAccuracy` - 是否启用高精度定位，默认 `true`
  - `timeout` - 超时时间（毫秒），默认 `5000`
  - `maximumAge` - 缓存的最大时间（毫秒），默认 `0`

**返回值**

- `Promise<LocationResult>` - 返回位置信息的 Promise
  - `latitude` - 纬度
  - `longitude` - 经度
  - `accuracy` - 精度（米）
  - `timestamp` - 时间戳

**错误**

- 浏览器不支持地理位置 API 时，抛出 `{ code: -1, message: '浏览器不支持地理位置API' }`
- 用户拒绝位置权限时，抛出 `{ code: 1, message: '用户拒绝了位置信息请求' }`
- 位置信息不可用时，抛出 `{ code: 2, message: '未获取到位置信息' }`
- 请求超时时，抛出 `{ code: 3, message: '位置信息请求超时' }`

**示例**

```typescript
// 基础用法
getLocation()
  .then((location) => {
    console.log('纬度:', location.latitude);
    console.log('经度:', location.longitude);
    console.log('精度:', location.accuracy);
  })
  .catch((error) => {
    console.error('获取位置失败:', error.message);
  });

// 自定义配置
getLocation({
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 60000,
}).then((location) => {
  console.log('当前位置:', location);
});

// 在 React 中使用
import { useEffect, useState } from 'react';

function LocationComponent() {
  const [location, setLocation] = useState<LocationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getLocation()
      .then(setLocation)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div>错误: {error}</div>;
  if (!location) return <div>获取位置中...</div>;

  return (
    <div>
      <p>纬度: {location.latitude}</p>
      <p>经度: {location.longitude}</p>
      <p>精度: {location.accuracy} 米</p>
    </div>
  );
}
```

---

## parseDomain - 获取二级域名

获取当前页面的二级域名。

```typescript
function parseDomain(): string;
```

**返回值**

- `string` - 返回二级域名，如 `.example.com`，对于 IP 地址或 localhost 返回原始主机名

**示例**

```typescript
// 当前页面为 https://www.example.com/path
console.log(parseDomain()); // '.example.com'

// 当前页面为 https://api.sub.example.com/path
console.log(parseDomain()); // '.example.com'

// 当前页面为 https://localhost:3000
console.log(parseDomain()); // 'localhost'

// 当前页面为 https://192.168.1.1:8080
console.log(parseDomain()); // '192.168.1.1'
```

---

## getURLParameters - 解析 URL 参数

解析 URL 字符串中的查询参数。

```typescript
function getURLParameters(url: string): Record<string, string>;
```

**参数**

- `url` - 要解析的 URL 字符串

**返回值**

- `Record<string, string>` - 返回包含所有查询参数的对象，键和值都已解码

**示例**

```typescript
const url = 'https://example.com?name=zhangsan&age=25&city=beijing';
const params = getURLParameters(url);

console.log(params);
// { name: 'zhangsan', age: '25', city: 'beijing' }

console.log(params.name); // 'zhangsan'
console.log(params.age); // '25'

// 处理特殊字符
const url2 = 'https://example.com?query=hello%20world&id=123';
const params2 = getURLParameters(url2);
console.log(params2.query); // 'hello world'
```

---

## toUrlParameters - 对象转 URL 参数

将对象转换为 URL 参数字符串。

```typescript
function toUrlParameters<T extends Record<string, any>>(obj: T): string;
```

**参数**

- `obj` - 要转换的参数对象

**返回值**

- `string` - 返回 URL 参数字符串，键和值都已编码

**说明**

- 自动过滤值为 `undefined` 或 `null` 的属性
- 所有键和值都会使用 `encodeURIComponent` 进行编码

**示例**

```typescript
const params = {
  name: 'zhangsan',
  age: 25,
  city: 'beijing',
  active: true,
};

const queryString = toUrlParameters(params);
console.log(queryString);
// 'name=zhangsan&age=25&city=beijing&active=true'

// 完整 URL 构建
const baseUrl = 'https://api.example.com/users';
const fullUrl = `${baseUrl}?${toUrlParameters(params)}`;
console.log(fullUrl);
// 'https://api.example.com/users?name=zhangsan&age=25&city=beijing&active=true'

// 过滤 undefined 和 null
const params2 = {
  id: 123,
  name: 'test',
  description: undefined,
  email: null,
};
console.log(toUrlParameters(params2));
// 'id=123&name=test'

// 处理特殊字符
const params3 = {
  query: 'hello world',
  filter: 'A&B',
};
console.log(toUrlParameters(params3));
// 'query=hello%20world&filter=A%26B'
```

---

## 综合示例

```typescript
import {
  isBrowserEnvironment,
  isCSSPropertySupported,
  loadScript,
  loadCSS,
  getLocation,
  parseDomain,
  getURLParameters,
  toUrlParameters,
} from '@scxfe/util';

// 页面初始化
async function initPage() {
  // 1. 检测环境
  if (!isBrowserEnvironment()) {
    return;
  }

  // 2. 检查 CSS 支持
  if (isCSSPropertySupported('grid')) {
    console.log('可以使用 Grid 布局');
  }

  // 3. 加载资源
  await Promise.all([
    loadScript('https://cdn.example.com/lib.js'),
    loadCSS('https://cdn.example.com/styles.css'),
  ]);

  // 4. 获取位置信息
  try {
    const location = await getLocation();
    console.log('当前位置:', location);
  } catch (error) {
    console.error('获取位置失败:', error);
  }

  // 5. 处理 URL
  const domain = parseDomain();
  console.log('当前域名:', domain);

  const urlParams = getURLParameters(window.location.search);
  console.log('URL 参数:', urlParams);

  // 6. 构建请求 URL
  const queryParams = {
    userId: '123',
    action: 'view',
    timestamp: Date.now(),
  };
  const apiUrl = `https://api.example.com/data?${toUrlParameters(queryParams)}`;
  console.log('API URL:', apiUrl);
}

initPage();
```
