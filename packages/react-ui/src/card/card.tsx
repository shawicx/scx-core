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
}

export const Card = () => {
  return <section>card</section>;
};
