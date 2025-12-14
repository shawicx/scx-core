/*
 * @Author: shawicx d35f3153@proton.me
 * @Description: HTTP模块类型定义
 */

import type { AxiosResponse, AxiosError } from 'axios';

/**
 * HTTP响应数据结构
 */
export interface HttpResponse<T = any> {
  /**
   * 响应数据
   */
  data: T;
  /**
   * 响应状态码
   */
  code: number;
  /**
   * 响应消息
   */
  message: string;
  /**
   * 时间戳
   */
  timestamp?: number;
}

/**
 * HTTP错误对象
 */
export interface HttpError extends Error {
  /**
   * 错误码
   */
  code?: string | number;
  /**
   * HTTP状态码
   */
  status?: number;
  /**
   * 请求配置
   */
  config?: any;
  /**
   * 响应对象
   */
  response?: AxiosResponse;
  /**
   * 是否为请求取消
   */
  isCancel?: boolean;
}

/**
 * 请求拦截器配置
 */
export interface RequestInterceptorConfig {
  /**
   * 请求发送前的处理函数
   */
  onFulfilled?: (config: any) => any;
  /**
   * 请求发送失败的处理函数
   */
  onRejected?: (error: any) => any;
}

/**
 * 响应拦截器配置
 */
export interface ResponseInterceptorConfig {
  /**
   * 响应成功时的处理函数
   */
  onFulfilled?: (response: AxiosResponse) => any;
  /**
   * 响应失败时的处理函数
   */
  onRejected?: (error: any) => any;
}

/**
 * 请求缓存配置
 */
export interface CacheConfig {
  /**
   * 缓存时间（毫秒）
   */
  ttl?: number;
  /**
   * 缓存键生成函数
   */
  keyGenerator?: (config: any) => string;
  /**
   * 是否启用缓存
   */
  enabled?: boolean;
}

/**
 * 重试配置
 */
export interface RetryConfig {
  /**
   * 重试次数
   */
  retries?: number;
  /**
   * 重试延迟（毫秒）
   */
  retryDelay?: number;
  /**
   * 重试条件函数
   */
  shouldRetry?: (error: AxiosError) => boolean;
}
