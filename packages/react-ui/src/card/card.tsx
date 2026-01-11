import { UI_CLASS_NAME_PREFIX } from '@scxfe/util';
import classNames from 'classnames';
import type { ReactNode } from 'react';

import './card.css';

export enum CardMode {
  /**
   * @description 默认模式
   */
  DEFAULT = 'default',
  /**
   * @description 渐变色模式
   */
  GRADIENT_BORDER = 'gradient-border',
}

export interface CardProps {
  mode?: CardMode;
  children?: ReactNode;
}

const prefix = `${UI_CLASS_NAME_PREFIX}-card`;

export const Card = ({ mode = CardMode.DEFAULT, children }: CardProps) => {
  const cardClassName = classNames(prefix, `${prefix}--${mode}`);

  return <section className={cardClassName}>{children}</section>;
};
