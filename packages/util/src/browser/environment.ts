/*
 * @Author: shawicx d35f3153@proton.me
 * @Description: 浏览器环境检测工具
 */

/**
 * @description 当前环境是否浏览器环境
 */
export const isBrowserEnvironment = () => typeof window !== 'undefined';

/**
 * @description 是否支持指定的 CSS 属性
 * @param property CSS属性名
 */
export const isCSSPropertySupported = (property: string) => {
  if (!isBrowserEnvironment()) {
    return false;
  }
  return property in document.body.style;
};
