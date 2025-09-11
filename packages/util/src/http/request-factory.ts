/*
 * @Author: shawicx d35f3153@proton.me
 * @Description: 请求工厂
 */
import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';

interface RequestFactoryOptions {
  baseURL?: string; // 基础路径
  timeout?: number; // 超时时间
  getToken?: () => string | null; // 获取 token 的函数
  handleError?: (error: unknown) => void; // 错误统一处理
  transformResponse?: (response: AxiosResponse) => any; // 统一返回数据格式
  cancelDuplicate?: boolean; // 是否启用重复请求取消
}

function createRequestClient(options: RequestFactoryOptions = {}) {
  const {
    baseURL = '/api',
    timeout = 5000,
    getToken,
    handleError,
    transformResponse,
    cancelDuplicate = true,
  } = options;

  const pendingRequests = new Map<string, AbortController>();

  function hashObject(obj: unknown): string {
    const str = JSON.stringify(obj);
    return str
      .split('')
      .reduce((hash, char) => {
        return ((hash << 5) - hash + char.charCodeAt(0)) | 0;
      }, 0)
      .toString(36);
  }

  function getRequestKey(url: string, { method, params, data }: AxiosRequestConfig): string {
    const urlObj = new URL(url, 'http://localhost'); // 使用默认域名而不是 window.location.origin
    const paramsHash = params ? hashObject(params) : '';
    const dataHash = data ? hashObject(data) : '';
    return `${method}:${urlObj.pathname}:${paramsHash}:${dataHash}`;
  }

  const instance: AxiosInstance = axios.create({
    baseURL,
    timeout,
  });

  // 请求拦截器
  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    // token 注入
    if (getToken) {
      const token = getToken();
      if (token) {
        config.headers.set('token', token);
      }
    }

    // 取消重复请求
    if (cancelDuplicate) {
      const controller = new AbortController();
      const requestKey = getRequestKey(config.url!, config);
      if (pendingRequests.has(requestKey)) {
        pendingRequests.get(requestKey)?.abort();
      }
      config.signal = controller.signal;
      pendingRequests.set(requestKey, controller);
    }

    // 防止 GET 请求缓存
    if (config.method?.toUpperCase() === 'GET') {
      config.params = { ...config.params, t: Date.now() };
    }

    return config;
  });

  // 响应拦截器
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      const requestKey = getRequestKey(response.config.url!, response.config);
      pendingRequests.delete(requestKey);

      if (transformResponse) {
        return transformResponse(response);
      }
      return response.data; // 默认直接返回 data
    },
    (error: Error) => {
      if (axios.isCancel(error)) {
        return Promise.reject(error);
      } else {
        handleError?.(error);
      }
      return Promise.reject(error);
    },
  );

  return instance;
}

export default createRequestClient;
