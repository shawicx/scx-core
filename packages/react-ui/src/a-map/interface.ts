import type { AMapConstantType } from '@scxfe/util';
import type { CSSProperties } from 'react';

// @ts-ignore AMap types not available
const _AMapNamespace = (window as any).AMap;

export interface AMapContextValues {
  // @ts-ignore AMap types not available
  map: _AMapNamespace.Map | null;
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
  // @ts-ignore AMap types not available
  map?: _AMapNamespace.Map;
}
