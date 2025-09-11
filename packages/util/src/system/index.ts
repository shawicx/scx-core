/*
 * @Author: shawicx d35f3153@proton.me
 * @Description:
 */
import { getURLParameters, loadCSS, loadScript, parseDomain, toUrlParameters } from './system';

/**
 * @description 当前环境是否浏览器环境
 */
const isBrowserEnvironment = () => typeof window !== 'undefined';

/**
 * @description 是否 CSS 属性
 * @param property
 */
const isCSSPropertySupported = (property: string) => {
  if (!isBrowserEnvironment()) {
    return false;
  }
  return property in document.body.style;
};

export {
  getURLParameters,
  isBrowserEnvironment,
  isCSSPropertySupported,
  loadCSS,
  loadScript,
  parseDomain,
  toUrlParameters,
};
