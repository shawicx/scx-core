/*
 * @Author: shawicx d35f3153@proton.me
 * @Description: DOM操作相关工具
 */

const defaultCallback = () => {
  // 默认回调函数，可以在这里添加默认行为
};

interface LoadCallback {
  onerror?: (error: string | Event) => void;
  onload?: () => void;
}

/**
 * @description 动态加载js文件
 * @param url js 地址
 * @param param1 成功、失败回调函数
 * @returns
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
  const scriptExist = Array.from(scripts).findIndex((script) => script.src === url) > -1;
  if (scriptExist) {
    return;
  }
  // 创建一个新的script标签
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  script.onload = () => {
    onload?.();
    // 注释掉 console.log 以避免 lint 错误
    // console.log(`JS 加载完成: ${url}`);
  };
  script.onerror = (error) => {
    onerror?.(error);
    // 注释掉 console.error 以避免 lint 错误
    // console.error(`JS 加载失败: ${url}`);
  };
  // script.defer = true;
  // 将创建的标签添加到 document 中
  document.getElementsByTagName('head')[0].appendChild(script);
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
  const scripts = document.getElementsByTagName('link');
  const scriptExist = Array.from(scripts).findIndex((script) => script.href === url) > -1;
  if (scriptExist) {
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
    // 注释掉 console.log 以避免 lint 错误
    // console.log(`CSS 加载完成: ${url}`);
  };

  // 事件：样式表加载失败后执行的操作
  link.onerror = (error) => {
    onerror?.(error);
    // 注释掉 console.error 以避免 lint 错误
    // console.error(`CSS 加载失败: ${url}`);
  };

  // 把link元素添加到<head>中
  const head = document.getElementsByTagName('head')[0];
  head.appendChild(link);
};
