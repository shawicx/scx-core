---
group:
  title: 模块使用文档
toc: content
---

## 基础用法

### 1. 使用请求工厂函数

这个功能主要是为应对不同场景下需要不同的 http 请求方法，例如本平台接入其他平台的功能或者接口，token 等配置不一样，使用工厂函数创建不同的请求客户端。

```typescript
import { createRequestClient } from '@scxfe/util';

// 创建请求客户端
const request = createRequestClient({
  baseURL: '/api',
  timeout: 5000,
  getToken: () => localStorage.getItem('token'),
  handleError: (error) => {
    console.error('请求错误:', error);
  },
  cancelDuplicate: true, // 取消重复请求
});

// 发送请求
const response = await request.get('/users');
const user = await request.post('/users', { name: 'John' });
```

### 2. 使用增强的HTTP客户端

```typescript
import { createHttpClient, HttpClient } from '@scxfe/util';

// 方式1：使用工厂函数
const client = createHttpClient({
  baseURL: '/api',
  timeout: 10000,
});

// 方式2：直接实例化
const client = new HttpClient({
  baseURL: '/api',
  getToken: () => localStorage.getItem('token'),
});

// 使用各种HTTP方法
const users = await client.get('/users');
const newUser = await client.post('/users', { name: 'John' });
const updatedUser = await client.put('/users/1', { name: 'Jane' });
const deletedUser = await client.delete('/users/1');
```

## 高级功能

### 文件上传

> 注意：使用进度回调时需要从axios导入AxiosProgressEvent类型

```typescript
import type { AxiosProgressEvent } from 'axios';
// 单文件上传
const result = await client.upload('/upload', file, {
  onProgress: (progress: AxiosProgressEvent) => {
    console.log(`上传进度: ${progress.loaded} / ${progress.total}`);
  },
  fieldName: 'avatar',
  data: { userId: '123' },
});

// 多文件上传
const result = await client.upload('/upload', [file1, file2], {
  onProgress: (progress: AxiosProgressEvent) => {
    console.log(`上传进度: ${progress.loaded} / ${progress.total}`);
  },
});
```

### 文件下载

HttpClient提供了基于HTTP请求的文件下载功能，支持进度监控：

```typescript
// 简单下载（通过HTTP请求）
await client.download('/files/document.pdf');

// 带进度监控的下载
await client.download('/files/large-file.zip', {
  filename: 'my-file.zip',
  onProgress: (progress: AxiosProgressEvent) => {
    console.log(`下载进度: ${progress.loaded} / ${progress.total}`);
  },
});
```

#### 下载方式说明

- **`client.download()`**: 专门用于通过HTTP API下载文件，支持进度监控，使用axios的拦截器和配置
- **`downloadFile()`**: 独立的文件下载工具函数，从 `@scxfe/util` 主入口导入，支持任意URL下载

```typescript
import { downloadFile } from '@scxfe/util';
// 任意URL下载，不使用HTTP客户端配置
await downloadFile('https://example.com/public-file.pdf', 'downloaded.pdf');
```

### 自定义配置

```typescript
const client = createHttpClient({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  getToken: () => localStorage.getItem('auth-token'),
  handleError: (error) => {
    if (error.response?.status === 401) {
      // 处理认证失败
      redirectToLogin();
    } else {
      // 显示错误提示
      showErrorToast(error.message);
    }
  },
  transformResponse: (response) => {
    // 统一处理响应数据
    return response.data;
  },
  cancelDuplicate: true,
});

// 单次请求自定义配置
const result = await client.get('/users', {
  loading: true, // 显示加载状态
  showError: true, // 显示错误信息
  timeout: 30000, // 覆盖全局超时时间
});
```

## 类型定义

### RequestFactoryOptions

```typescript
interface RequestFactoryOptions {
  baseURL?: string; // 基础路径，默认 '/api'
  timeout?: number; // 超时时间，默认 5000ms
  getToken?: () => string | null; // 获取 token 的函数
  handleError?: (error: unknown) => void; // 错误统一处理
  transformResponse?: (response: AxiosResponse) => any; // 统一返回数据格式
  cancelDuplicate?: boolean; // 是否启用重复请求取消，默认 true
}
```

### HttpRequestConfig

```typescript
interface HttpRequestConfig extends AxiosRequestConfig {
  loading?: boolean; // 是否显示加载状态
  showError?: boolean; // 是否显示错误信息
  customErrorHandler?: (error: any) => void; // 自定义错误处理
}
```

### UploadConfig

```typescript
interface UploadConfig {
  onProgress?: (progressEvent: AxiosProgressEvent) => void; // 上传进度回调
  fieldName?: string; // 文件字段名，默认 'file'
  data?: Record<string, any>; // 额外的表单数据
}
```

### DownloadConfig

```typescript
interface DownloadConfig {
  filename?: string; // 下载文件名
  onProgress?: (progressEvent: AxiosProgressEvent) => void; // 下载进度回调
}
```

## 常见场景

### 1. RESTful API 调用

```typescript
class UserService {
  private client = createHttpClient({
    baseURL: '/api/users',
    getToken: () => localStorage.getItem('token'),
  });

  async getUsers() {
    return this.client.get('/');
  }

  async getUser(id: string) {
    return this.client.get(`/${id}`);
  }

  async createUser(userData: any) {
    return this.client.post('/', userData);
  }

  async updateUser(id: string, userData: any) {
    return this.client.put(`/${id}`, userData);
  }

  async deleteUser(id: string) {
    return this.client.delete(`/${id}`);
  }
}
```

### 2. 文件服务

```typescript
class FileService {
  private client = createHttpClient({
    baseURL: '/api/files',
  });

  async uploadFile(file: File, onProgress?: (progress: number) => void) {
    return this.client.upload('/upload', file, {
      onProgress: (progressEvent: AxiosProgressEvent) => {
        if (onProgress && progressEvent.total) {
          onProgress(progressEvent.loaded / progressEvent.total);
        }
      },
    });
  }

  async downloadFile(fileId: string, filename?: string) {
    return this.client.download(`/download/${fileId}`, { filename });
  }
}
```

### 3. 错误处理

```typescript
const client = createHttpClient({
  baseURL: '/api',
  handleError: (error) => {
    if (error.response) {
      // 服务器响应错误
      const { status, data } = error.response;

      switch (status) {
        case 400:
          console.error('请求参数错误:', data.message);
          break;
        case 401:
          console.error('未授权，请重新登录');
          // 跳转到登录页
          break;
        case 403:
          console.error('拒绝访问');
          break;
        case 404:
          console.error('请求的资源不存在');
          break;
        case 500:
          console.error('服务器内部错误');
          break;
        default:
          console.error(`请求失败: ${status}`);
      }
    } else if (error.request) {
      // 网络错误
      console.error('网络连接失败');
    } else {
      // 其他错误
      console.error('请求配置错误:', error.message);
    }
  },
});
```

## 最佳实践

1. **统一配置**: 在应用初始化时创建一个全局的 HTTP 客户端实例
2. **错误处理**: 配置全局错误处理器，统一处理各种错误情况
3. **Token管理**: 实现 getToken 函数，自动处理认证 token
4. **重复请求**: 启用 cancelDuplicate 选项，避免重复请求
