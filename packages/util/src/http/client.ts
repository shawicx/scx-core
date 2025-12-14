/*
 * @Author: shawicx d35f3153@proton.me
 * @Description: 增强的HTTP客户端
 */

import { type AxiosInstance, type AxiosRequestConfig, type AxiosProgressEvent } from 'axios';
import createRequestClient, { type RequestFactoryOptions } from './request-factory';

/**
 * HTTP请求配置
 */
export interface HttpRequestConfig extends AxiosRequestConfig {
  /**
   * 是否显示加载状态
   */
  loading?: boolean;
  /**
   * 是否显示错误信息
   */
  showError?: boolean;
  /**
   * 自定义错误处理
   */
  customErrorHandler?: (error: any) => void;
}

/**
 * 文件上传配置
 */
export interface UploadConfig {
  /**
   * 上传进度回调
   */
  onProgress?: (progressEvent: AxiosProgressEvent) => void;
  /**
   * 文件字段名
   */
  fieldName?: string;
  /**
   * 额外的表单数据
   */
  data?: Record<string, any>;
}

/**
 * 文件下载配置
 */
export interface DownloadConfig {
  /**
   * 下载文件名
   */
  filename?: string;
  /**
   * 下载进度回调
   */
  onProgress?: (progressEvent: AxiosProgressEvent) => void;
}

/**
 * 增强的HTTP客户端
 */
export class HttpClient {
  private instance: AxiosInstance;

  constructor(options: RequestFactoryOptions = {}) {
    this.instance = createRequestClient(options);
  }

  /**
   * GET请求
   */
  async get<T = any>(url: string, config?: HttpRequestConfig): Promise<T> {
    return this.instance.get(url, config);
  }

  /**
   * POST请求
   */
  async post<T = any>(url: string, data?: any, config?: HttpRequestConfig): Promise<T> {
    return this.instance.post(url, data, config);
  }

  /**
   * PUT请求
   */
  async put<T = any>(url: string, data?: any, config?: HttpRequestConfig): Promise<T> {
    return this.instance.put(url, data, config);
  }

  /**
   * DELETE请求
   */
  async delete<T = any>(url: string, config?: HttpRequestConfig): Promise<T> {
    return this.instance.delete(url, config);
  }

  /**
   * PATCH请求
   */
  async patch<T = any>(url: string, data?: any, config?: HttpRequestConfig): Promise<T> {
    return this.instance.patch(url, data, config);
  }

  /**
   * 文件上传
   */
  async upload<T = any>(url: string, file: File | File[], config?: UploadConfig): Promise<T> {
    const formData = new FormData();
    const fieldName = config?.fieldName || 'file';

    if (Array.isArray(file)) {
      file.forEach((f, index) => {
        formData.append(`${fieldName}[${index}]`, f);
      });
    } else {
      formData.append(fieldName, file);
    }

    // 添加额外数据
    if (config?.data) {
      Object.entries(config.data).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }

    return this.instance.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: config?.onProgress,
    });
  }

  /**
   * 文件下载
   * @description 通过HTTP请求下载文件，支持进度监控
   * @param url 文件下载URL
   * @param config 下载配置
   */
  async download(url: string, config?: DownloadConfig): Promise<void> {
    try {
      // 使用axios进行文件下载
      const response = await this.instance.get(url, {
        responseType: 'blob',
        onDownloadProgress: config?.onProgress,
      });

      // 创建下载链接
      const blob = new Blob([response.data]);
      const downloadUrl = window.URL.createObjectURL(blob);

      // 创建临时链接并触发下载
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = downloadUrl;
      a.download = config?.filename || this.getFilenameFromUrl(url);

      document.body.appendChild(a);
      a.click();

      // 清理资源
      document.body.removeChild(a);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error: any) {
      throw new Error(`下载失败: ${error.message}`);
    }
  }

  /**
   * 从URL中提取文件名
   * @param url 文件URL
   * @returns 文件名
   */
  private getFilenameFromUrl(url: string): string {
    const pathname = new URL(url).pathname;
    const filename = pathname.split('/').pop();
    return filename || 'download';
  }

  /**
   * 通用请求方法
   */
  async request<T = any>(config: HttpRequestConfig): Promise<T> {
    return this.instance.request(config);
  }

  /**
   * 获取原始axios实例
   */
  getAxiosInstance(): AxiosInstance {
    return this.instance;
  }
}

/**
 * 创建HTTP客户端实例
 */
export function createHttpClient(options?: RequestFactoryOptions): HttpClient {
  return new HttpClient(options);
}

// 默认导出HttpClient类
export default HttpClient;
