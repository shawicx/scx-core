/*
 * @Author: shawicx d35f3153@proton.me
 * @Description: TypeScript类型兼容性测试
 */

import axios, { type AxiosProgressEvent } from 'axios';
import { createHttpClient, createRequestClient } from './index';

// 测试基础类型兼容性
const client = createHttpClient({
  baseURL: '/api',
  timeout: 5000,
});

// 测试上传接口类型
async function testUploadTypes() {
  const file = new File(['test'], 'test.txt', { type: 'text/plain' });

  // 测试类型兼容性：应该不报错
  await client.upload('/upload', file, {
    onProgress: (progress: AxiosProgressEvent) => {
      console.log(`进度: ${progress.loaded} / ${progress.total}`);
      // 测试AxiosProgressEvent的属性
      if (progress.total) {
        const percent = (progress.loaded / progress.total) * 100;
        console.log(`${percent}%`);
      }
    },
    fieldName: 'file',
    data: { userId: '123' },
  });
}

// 测试下载接口类型
async function testDownloadTypes() {
  await client.download('/download/file.pdf', {
    filename: 'downloaded.pdf',
    onProgress: (progress: AxiosProgressEvent) => {
      console.log(`下载进度: ${progress.loaded} / ${progress.total}`);
    },
  });
}

// 测试基础请求工厂
const request = createRequestClient({
  baseURL: '/api',
  handleError: (error) => {
    console.error('请求错误:', error);
  },
});

// 测试各种HTTP方法的类型
async function testHTTPMethods() {
  const result1 = await client.get<User>('/users/1');
  const result2 = await client.post<User>('/users', { name: 'John' });
  const result3 = await client.put<User>('/users/1', { name: 'Jane' });
  const result4 = await client.delete('/users/1');
  const result5 = await client.patch<User>('/users/1', { name: 'Bob' });
}

// 测试类型定义
interface User {
  id: number;
  name: string;
  email: string;
}

export {
  testUploadTypes,
  testDownloadTypes,
  testHTTPMethods,
};

// 这个文件仅用于类型检查，不应该在运行时被调用