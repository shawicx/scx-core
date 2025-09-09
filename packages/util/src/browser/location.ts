/*
 * @Author: shawicx d35f3153@proton.me
 * @Description: 浏览器定位工具
 */

interface LocationResult {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

interface LocationError {
  code: number;
  message: string;
}

/**
 * @description 默认地理位置获取配置
 */
const DEFAULT_OPTIONS: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

/**
 * @description 获取浏览器地理位置
 * @param options 地理位置获取配置选项
 * @returns Promise<LocationResult> 成功时返回位置信息，失败时reject错误信息
 */
export const getLocation = (
  options: PositionOptions = DEFAULT_OPTIONS,
): Promise<LocationResult> => {
  return new Promise((resolve, reject) => {
    // 检查浏览器是否支持地理位置API
    if (!navigator.geolocation) {
      const error: LocationError = {
        code: -1,
        message: '浏览器不支持地理位置API',
      };
      reject(error);
      return;
    }

    // 成功回调
    const onSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude, accuracy } = position.coords;
      resolve({
        latitude,
        longitude,
        accuracy,
        timestamp: position.timestamp,
      });
    };

    // 失败回调
    const onError = (error: GeolocationPositionError) => {
      let message = '';
      switch (error.code) {
        case error.PERMISSION_DENIED:
          message = '用户拒绝了位置信息请求';
          break;
        case error.POSITION_UNAVAILABLE:
          message = '未获取到位置信息';
          break;
        case error.TIMEOUT:
          message = '位置信息请求超时';
          break;
        default:
          message = '未知错误';
          break;
      }

      const locationError: LocationError = {
        code: error.code,
        message,
      };
      reject(locationError);
    };

    // 调用浏览器API获取位置信息
    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
  });
};
