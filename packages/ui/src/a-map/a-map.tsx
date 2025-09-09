/*
 * @Author: shawicx d35f3153@proton.me
 * @Description:
 */
import { AMapConstant, loadScript } from '@scxfe/util';
import { useMount, useUnmount } from 'ahooks';
import { Children, cloneElement, useRef } from 'react';

import { AMapContext } from './context';
import { AMapProps } from './interface';

import type { ReactElement, ReactNode } from 'react';

const defaultContainer = 'container';

export const renderChildren = (
  children: ReactElement | ReactElement[],
  map: AMap.Map,
): ReactNode => {
  if (!children || !map) return;

  return Children.map(children, (child: ReactElement) => {
    if (!child) {
      return null;
    }
    if (typeof child.type === 'string' || !child.props) {
      return child;
    }
    return cloneElement(child, { map }, renderChildren(child.props.children, map));
  });
};

export const AMap = (props: AMapProps) => {
  const { width = '100%', height = '100%', apiKey, container = defaultContainer } = props;

  // 地图实例
  const mapInstance = useRef<AMap.Map | null>(null);

  // 加载地图 API
  const loadApi = async () => {
    try {
      window._AMapSecurityConfig = {
        securityJsCode: '7c1275cfebc337ceaa0984a2c1277491',
      };
      await window.AMapLoader.load({
        key: apiKey,
        version: '2.0',
        plugins: ['AMap.Scale'],
      });
      const mapOptions: AMap.MapOptions = {
        zoom: 15,
        mapStyle: 'amap://styles/blue',
      };
      mapInstance.current = new window.AMap.Map(container, mapOptions);
    } catch (e: any) {
      throw new Error(e);
    }
  };

  useMount(async () => {
    if (window.AMapLoader) {
      await loadApi();
    } else {
      loadScript(AMapConstant.API_URL, {
        onload: async () => {
          if (!mapInstance.current) {
            await loadApi();
          }
        },
      });
    }
  });

  useUnmount(() => {
    mapInstance.current?.destroy();
    mapInstance.current = null;
  });

  return (
    <AMapContext.Provider value={{ map: mapInstance.current }}>
      <div id={container} style={{ width, height }} />
    </AMapContext.Provider>
  );
};
