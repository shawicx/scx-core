/*
 * @Author: shawicx d35f3153@proton.me
 * @Description: HTTP模块使用示例
 */

import { createRequestClient, createHttpClient, downloadFile } from './index';

// 示例1：使用基础的请求工厂
const request = createRequestClient({
  baseURL: 'https://api.github.com',
  timeout: 5000,
  handleError: (error) => {
    console.log('请求错误:', error);
  },
});

// 示例2：使用增强的HTTP客户端
const client = createHttpClient({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
});

// 测试函数示例
export async function testHttpModule() {
  try {
    // 使用基础请求工厂
    console.log('测试基础请求工厂...');
    const response1 = await request.get('/users/1');
    console.log('GitHub用户数据:', response1);

    // 使用增强HTTP客户端
    console.log('测试增强HTTP客户端...');
    const response2 = await client.get('/posts/1');
    console.log('文章数据:', response2);

    // 创建用户
    const newUser = await client.post('/posts', {
      title: '测试文章',
      body: '这是一篇测试文章',
      userId: 1,
    });
    console.log('新创建的文章:', newUser);

  } catch (error) {
    console.error('测试失败:', error);
  }
}

// 文件下载示例
export async function testFileDownload() {
  try {
    // 下载一个测试文件
    await downloadFile('https://via.placeholder.com/150', 'test-image.png');
    console.log('文件下载成功');
  } catch (error) {
    console.error('文件下载失败:', error);
  }
}

// 这些是示例函数，实际使用时请根据具体需求调用