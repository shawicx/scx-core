import '@amap/amap-jsapi-types';

declare global {
  interface Window {
    _AMapSecurityConfig: {
      securityJsCode: string;
    };
    AMapLoader: {
      load: (p: AMapLoadFuncParams) => Promise<AMap.Map>;
      reset: () => void;
    };
  }
}
