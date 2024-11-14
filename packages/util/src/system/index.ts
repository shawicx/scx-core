/**
 * @description 当前环境是否浏览器环境
 */
export const isBrowserEnvironment = () => typeof window !== 'undefined';

/**
 * @description 是否 CSS 属性
 * @param property
 */
export const isCSSPropertySupported = (property: string) =>
  (isBrowserEnvironment() && property in document?.body?.style) || false;

/**
 * @description 获取当前页面 二级域名
 */
export const parseDomain = () => {
  try {
    let subdomain = '';
    const { location } = document;
    const { hostname } = location;
    const domainList = hostname.split('.');
    const ipAddressReg =
      /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    // 若当前域名为 IP 地址、localhost，采用一种特殊的处理。只用于我们的测试环境（或者客户使用的是IP），此部分代码不具有通用性
    if (ipAddressReg.test(hostname) || hostname === 'localhost') {
      const level3domain = location.hostname;
      return level3domain.replace(' ', '');
    }
    const urlItems = [];
    urlItems.unshift(domainList.pop());
    while (urlItems.length < 2) {
      urlItems.unshift(domainList.pop());
      subdomain = urlItems.join('.');
    }
    return subdomain ? `.${subdomain}` : hostname;
  } catch (e) {
    return document.location.hostname;
  }
};

const defaultCallback = () => {};

interface LoadCallback {
  onerror?: (error: string | Event) => void;
  onload?: () => void;
}

/**
 * @description 动态加载js文件
 * @param url css 地址
 * @param param1 成功、失败回调函数
 */
export const loadScript = (
  url: string,
  { onerror, onload }: LoadCallback = {
    onerror: defaultCallback,
    onload: defaultCallback,
  },
): void => {
  // 检查相同的脚本是否已经存在
  const scripts = document.getElementsByTagName('script');
  const scriptExist =
    Array.from(scripts).findIndex((script: HTMLScriptElement) => script.src === url) > -1;
  if (scriptExist) {
    return;
  }
  // 创建一个新的script标签
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  script.onload = () => {
    onload?.();
    console.log(`JS 加载完成: ${url}`);
  };
  script.onerror = (error) => {
    onerror?.(error);
    console.error(`JS 加载失败: ${url}`);
  };
  // script.defer = true;
  // 将创建的标签添加到 document 中
  const head = document.getElementsByTagName('head')[0] as HTMLHeadElement;
  head.appendChild(script);
};

/**
 * @description 动态加载css文件
 * @param url css 地址
 * @param param1 成功、失败回调函数
 * @returns
 */
export const loadCSS = (
  url: string,
  { onerror, onload }: LoadCallback = {
    onerror: defaultCallback,
    onload: defaultCallback,
  },
): void => {
  const links = document.getElementsByTagName('link');
  const linkExist = Array.from(links).findIndex((link: HTMLLinkElement) => link.href === url) > -1;
  if (linkExist) {
    return;
  }

  // 创建新的link元素
  const link = document.createElement('link');

  // 设置link元素的属性
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = url;

  // 事件：样式表加载完成后执行的操作，例如可以在这里进行通知或者变更状态
  link.onload = () => {
    onload?.();
    console.log(`CSS 加载完成: ${url}`);
  };

  // 事件：样式表加载失败后执行的操作
  link.onerror = (error) => {
    onerror?.(error);
    console.error(`CSS 加载失败: ${url}`);
  };
  // 把link元素添加到<head>中
  const head = document.getElementsByTagName('head')[0] as HTMLHeadElement;
  head.appendChild(link);
};

/**
 * @description 获取 url 路径上的查询参数
 * @param url
 */
export const getURLParameters = (url: string): Record<string, string> =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (params: Record<string, string>, pair: string) => {
      const equalsIndex = pair.indexOf('=');
      const key = pair.substring(0, equalsIndex);
      const value = pair.substring(equalsIndex + 1);
      if (key) {
        // eslint-disable-next-line no-param-reassign
        params[decodeURIComponent(key)] = decodeURIComponent(value);
      }
      return params;
    },
    {},
  );

/**
 * @description 将对象转换为 URL 参数
 * @param obj 需要转换的参数
 * @returns {string}
 */
export const toUrlParameters = <T extends Record<string, any>>(obj: T): string => {
  const params = Object.keys(obj)
    .filter((key) => obj[key] !== undefined && obj[key] !== null) // 过滤掉值为 `undefined` 或 `null` 的属性
    .map((key) => {
      const value = obj[key];
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join('&');
  return params;
};
