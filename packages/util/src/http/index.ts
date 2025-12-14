/*
 * @Author: shawicx d35f3153@proton.me
 * @Description: HTTP模块入口
 */

// 基础请求工厂
export { default as createRequestClient } from './request-factory';
export type { RequestFactoryOptions } from './request-factory';

// 增强的HTTP客户端
export { HttpClient, createHttpClient } from './client';
export type {
  HttpRequestConfig,
  UploadConfig,
  DownloadConfig
} from './client';

// 类型定义
export type {
  HttpResponse,
  HttpError,
  RequestInterceptorConfig,
  ResponseInterceptorConfig,
  CacheConfig,
  RetryConfig,
} from './types';
