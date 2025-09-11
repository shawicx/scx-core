/*
 * @Author: shawicx d35f3153@proton.me
 * @Description:
 */
export interface ColorComponents {
  r: number;
  g: number;
  b: number;
  a: number;
}

/**
 * @description 将颜色转换为RGB分量
 * @param color
 */
export const convertColor = (color: string): ColorComponents => {
  let r = 0;
  let g = 0;
  let b = 0;
  let a = 1;

  try {
    // 检查是否为十六进制格式
    if (color.startsWith('#')) {
      // 移除#并转换成小写
      const colorStr = color.slice(1).toLowerCase();
      // 最后处理的颜色值
      const finalColor =
        colorStr.length === 3
          ? color[0] + color[0] + color[1] + color[1] + color[2] + color[2]
          : colorStr;
      // 解析十六进制值
      r = parseInt(finalColor.substring(0, 2), 16);
      g = parseInt(finalColor.substring(2, 4), 16);
      b = parseInt(finalColor.substring(4, 6), 16);

      return { r, g, b, a };
    } else if (color.startsWith('rgba')) {
      // 检查是否为RGBA格式
      const rgba = color.match(/\d+(\.\d+)?/g);
      if (rgba && rgba.length >= 3) {
        [r, g, b] = rgba.map(Number);
        a = rgba[3] ? Number(rgba[3]) : 1;
      }
    }
    return { r, g, b, a };
  } catch {
    // 将 e 改为 _e 表示这是一个未使用的变量
    return { r, g, b, a };
  }
};
