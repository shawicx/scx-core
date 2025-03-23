import { logger } from '../logger';

/**
 * @description 获取浏览器地理位置失败
 */
export const onBrowserLocationError = (error: GeolocationPositionError) => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      logger.error('用户拒绝了位置信息请求');
      break;
    case error.POSITION_UNAVAILABLE:
      logger.error('未获取到位置信息');
      break;
    case error.TIMEOUT:
      logger.error('位置信息请求超时');
      break;
    default:
      logger.error('未知错误');
      break;
  }
};

/**
 * @description 获取地理位置配置
 */
const OPTIONS: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

/**
 * @description 获取浏览器地理位置
 */
export const getLocation = () => {
  if (navigator.geolocation) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          // onBrowserLocationError(error);
          reject(error);
        },
        OPTIONS,
      );
    });
  } else {
    logger.error('浏览器不支持地理位置获取');
  }
};
