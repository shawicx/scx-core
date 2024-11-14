import { convertColor } from '@shawbox/util';

import type { CSSProperties } from 'react';

/**
 * @description 渐变边框卡片 需要渐变的角
 */
export enum GradientBorderPlacement {
  /**
   * @description 左下角
   */
  BOTTOM_LEFT = 'bottomLeft',
  /**
   * @description 右下角
   */
  BOTTOM_RIGHT = 'bottomRight',
  /**
   * @description 左上角
   */
  TOP_LEFT = 'topLeft',
  /**
   * @description 右上角
   */
  TOP_RIGHT = 'topRight',
  /**
   * @description 左对角： 左上角 -> 右下角
   */
  DIAGONALLY_LEFT = 'rightTop',
  /**
   * @description 右对角：右上角 -> 左下角
   */
  DIAGONALLY_RIGHT = 'rightBottom',
  /**
   * @description 右上角 -> 左下角
   */
  LEFT_BOTTOM = 'leftBottom',
  /**
   * @description 上下 -> 两边到中间
   */
  TOP_BOTTOM = 'topBottom',
  /**
   * @description 左右 -> 两边到中间
   */
  LEFT_RIGHT = 'leftRight',
}

interface GradientBorderOptions {
  gradientColor: string;
  gradientPlacement: GradientBorderPlacement;
  gradientWidth: number;
}

/**
 * @description 获取相反位置
 * @param position
 */
const getOppositePositions = (position: GradientBorderPlacement): [string, string] => {
  switch (position) {
    case GradientBorderPlacement.BOTTOM_LEFT:
    case GradientBorderPlacement.DIAGONALLY_RIGHT:
    default:
      return ['top', 'right'];
    case GradientBorderPlacement.BOTTOM_RIGHT:
      return ['top', 'left'];
    case GradientBorderPlacement.TOP_LEFT:
    case GradientBorderPlacement.DIAGONALLY_LEFT:
      return ['bottom', 'right'];
    case GradientBorderPlacement.TOP_RIGHT:
      return ['bottom', 'left'];
  }
};

/**
 * @description 获取容器样式
 * @param options {GradientBorderOptions}
 * @return {CSSProperties}
 */
export const getContainerStyle = (options: GradientBorderOptions): CSSProperties => {
  const { gradientColor, gradientPlacement, gradientWidth } = options;
  // 颜色值分量
  const { r, g, b } = convertColor(gradientColor);
  const baseStyle: CSSProperties = {
    position: 'relative',
    border: `${gradientWidth}px solid transparent`,
  };
  const [start, end] = getOppositePositions(gradientPlacement);
  switch (gradientPlacement) {
    case GradientBorderPlacement.BOTTOM_LEFT:
    default:
      return {
        ...baseStyle,
        borderImage: `linear-gradient(to ${start} ${end},
       rgba(${r}, ${g}, ${b}, 1) 0%,
      rgba(${r}, ${g}, ${b}, 0.3) 25%,
      rgba(${r}, ${g}, ${b}, 0) 50%,
      rgba(${r}, ${g}, ${b}, 0) 75%,
      rgba(${r}, ${g}, ${b}, 0) 100%
    )
    1 / ${gradientWidth}px ${gradientWidth}px stretch`,
      };
    case GradientBorderPlacement.DIAGONALLY_LEFT:
    case GradientBorderPlacement.DIAGONALLY_RIGHT:
      return {
        ...baseStyle,
        borderImage: `linear-gradient(to ${start} ${end},
       rgba(${r}, ${g}, ${b}, 1) 0%,
      rgba(${r}, ${g}, ${b}, 0.5) 25%,
      rgba(${r}, ${g}, ${b}, 0) 50%,
      rgba(${r}, ${g}, ${b}, 0.5) 75%,
      rgba(${r}, ${g}, ${b}, 1) 100%
    )
    1 / ${gradientWidth}px ${gradientWidth}px stretch`,
      };
    case GradientBorderPlacement.TOP_BOTTOM:
      return {
        ...baseStyle,
        borderImage: `linear-gradient(to left, rgba(${r}, ${g}, ${b}, 1), rgba(${r}, ${g}, ${b}, 0.3) 20%, rgba(${r}, ${g}, ${b}, 0) 50%, rgba(${r}, ${g}, ${b}, 0.3) 80%, rgba(${r}, ${g}, ${b}, 1)) 1 / ${gradientWidth}px 0 stretch`,
      };
    case GradientBorderPlacement.LEFT_RIGHT:
      return {
        ...baseStyle,
        borderImage: `linear-gradient(to top, rgba(${r}, ${g}, ${b}, 1), rgba(${r}, ${g}, ${b}, 0.3) 20%, rgba(${r}, ${g}, ${b}, 0) 50%, rgba(${r}, ${g}, ${b}, 0.3) 80%, rgba(${r}, ${g}, ${b}, 1)) 1 / 0 ${gradientWidth}px stretch`,
      };
  }
};

/**
 * @description 获取渐变边框伪元素样式
 * @param options {GradientBorderOptions}
 * @return {CSSProperties}
 */
export const getPseudoElementStyle = (options: GradientBorderOptions): CSSProperties => {
  const { gradientColor, gradientPlacement, gradientWidth } = options;
  switch (gradientPlacement) {
    case GradientBorderPlacement.TOP_BOTTOM:
      return {
        content: '""',
        position: 'absolute',
        top: 0,
        bottom: `-${gradientWidth}px`,
        width: gradientWidth,
        height: '100%',
        background: gradientColor,
        zIndex: 2,
      };
    case GradientBorderPlacement.LEFT_RIGHT:
      return {
        content: '""',
        position: 'absolute',
        left: 0,
        right: `-${gradientWidth}px`,
        background: gradientColor,
        width: '100%',
        height: gradientWidth,
        zIndex: 2,
      };
    default:
      return {};
  }
};
