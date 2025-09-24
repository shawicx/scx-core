/*
 * @Author: shawicx d35f3153@proton.me
 * @Description: URL处理相关工具
 */

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
  } catch {
    return document.location.hostname;
  }
};

/**
 * @description 获取 url 路径上的查询参数
 * @param url 要解析的URL
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
 * @param obj 需要转换的参数对象
 * @returns {string} URL参数字符串
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
