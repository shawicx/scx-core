import { UI_CLASS_NAME_PREFIX } from '@scxfe/util';
import classnames from 'classnames';

import type { CSSProperties, HtmlHTMLAttributes, ReactNode } from 'react';

import './caption.css';

export interface CaptionProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  id?: string;
  /**
   * @description 背景条形状
   */
  shape?: 'default' | 'square' | 'circle';
  /**
   * @description 操作
   */
  actions?: ReactNode;
  /**
   * @description 是否线形
   */
  line?: boolean;
  /**
   * @description 左侧背景条的颜色（背景色）
   */
  signBackground?: CSSProperties['background'];
  /**
   * @description 展示的子元素 父级元素的 props
   */
  innerProps?: HtmlHTMLAttributes<HTMLDivElement>;
}

const prefix = `${UI_CLASS_NAME_PREFIX}-caption`;

export const Caption = ({
  className,
  style,
  id,
  children,
  shape = 'default',
  actions,
  line = false,
  innerProps = {},
  signBackground = '#1996ff',
}: CaptionProps) => {
  return (
    <h3
      className={classnames(prefix, { [`${prefix}-line`]: line }, className)}
      style={style}
      id={id}
    >
      <div
        className={classnames(`${prefix}-sign`, `${prefix}-sign-${shape}`)}
        style={{ background: signBackground }}
      />
      <div className={`${prefix}-content`}>
        <div className={`${prefix}-content-inner`} {...innerProps}>
          {children}
        </div>
      </div>
      {actions ? <div className={`${prefix}-actions`}>{actions}</div> : null}
    </h3>
  );
};
