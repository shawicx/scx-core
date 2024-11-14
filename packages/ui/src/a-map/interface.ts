import type { AMapConstantType } from '@shawbox/util';
import type { CSSProperties } from 'react';

export interface AMapContextValues {
  map: AMap.Map | null;
}

/**
 * @description 地图 props
 */
export interface AMapProps {
  container: string;
  apiKey: AMapConstantType['API_KEY'];
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
}

/**
 * @description 地图标记点 props
 */
export interface AMapMarkerProps {
  coordinate: [number, number];
  map?: AMap.Map;
}
