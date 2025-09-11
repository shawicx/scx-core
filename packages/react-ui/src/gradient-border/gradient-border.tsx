/**
 * @description 边框渐变卡片
 */
/* eslint-disable no-duplicate-imports */
import { UI_CLASS_NAME_PREFIX } from '@scxfe/util';
import classNames from 'classnames';
import { Fragment, useMemo } from 'react';

import { getContainerStyle, getPseudoElementStyle, GradientBorderPlacement } from './util';

import type { CSSProperties, DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react';

export interface GradientBorderProps
  extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'translate'> {
  /**
   * @description 渐变方向
   */
  placement?: GradientBorderPlacement;
  /**
   * @description 渐变颜色
   */
  gradientColor: string;
  /**
   * @description 渐变宽度
   */
  gradientWidth?: number;
  /**
   * @description 容器宽度
   */
  width: CSSProperties['width'];
  /**
   * @description 容器高度
   */
  height: CSSProperties['height'];
}

export { GradientBorderPlacement };

export const GradientBorder = (props: PropsWithChildren<GradientBorderProps>) => {
  const {
    placement = GradientBorderPlacement.TOP_BOTTOM,
    className,
    children,
    gradientColor,
    gradientWidth = 1,
    style = {},
    width,
    height,
    ...rest
  } = props;

  // 创建动态样式
  const containerStyle: CSSProperties = useMemo(
    () =>
      getContainerStyle({
        gradientWidth,
        gradientColor,
        gradientPlacement: placement,
      }),
    [gradientColor, gradientWidth, placement],
  );

  // 伪元素样式
  const pseudoElementStyle = useMemo(
    () =>
      getPseudoElementStyle({
        gradientWidth,
        gradientColor,
        gradientPlacement: placement,
      }),
    [gradientColor, gradientWidth, placement],
  );

  const pseudoBeforeElementStyle = useMemo(
    () =>
      placement === GradientBorderPlacement.TOP_BOTTOM
        ? {
            left: `-${gradientWidth}px`,
          }
        : {
            top: `-${gradientWidth}px`,
          },
    [gradientWidth, placement],
  );

  const pseudoAfterElementStyle = useMemo(
    () =>
      placement === GradientBorderPlacement.TOP_BOTTOM
        ? {
            right: `-${gradientWidth}px`,
          }
        : {
            bottom: `-${gradientWidth}px`,
          },
    [gradientWidth, placement],
  );

  return (
    <section
      className={classNames(className, `${UI_CLASS_NAME_PREFIX}-gradient-border`)}
      style={{
        ...style,
        ...containerStyle,
        width,
        height,
      }}
      {...rest}
    >
      {[GradientBorderPlacement.TOP_BOTTOM, GradientBorderPlacement.LEFT_RIGHT].includes(
        placement,
      ) ? (
        <Fragment>
          <div style={{ ...pseudoElementStyle, ...pseudoBeforeElementStyle }} />
          <div style={{ ...pseudoElementStyle, ...pseudoAfterElementStyle }} />
        </Fragment>
      ) : null}
      {children}
    </section>
  );
};
