import { getURLParameters, loadCSS, loadScript, parseDomain, toUrlParameters } from './system';

/**
 * @description 当前环境是否浏览器环境
 */
const isBrowserEnvironment = () => typeof window !== 'undefined';

/**
 * @description 是否 CSS 属性
 * @param property
 */
const isCSSPropertySupported = (property: string) =>
  (isBrowserEnvironment() && property in document?.body?.style) || false;

export {
  getURLParameters,
  isBrowserEnvironment,
  isCSSPropertySupported,
  loadCSS,
  loadScript,
  parseDomain,
  toUrlParameters,
};
