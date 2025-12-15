/**
 * @description ui库样式class前缀
 */
export const UI_CLASS_NAME_PREFIX = 'scx-ui';

/**
 * AMap 相关常量和类型定义
 */
export interface AMapConstantType {
  API_KEY: string;
  API_URL: string;
}

export const AMapConstant: AMapConstantType = Object.freeze({
  API_KEY: 'e4e53056bc2059b8ab7d1f21517666c6',
  API_URL: 'https://webapi.amap.com/loader.js',
});
