/**
 * @description 数字数组
 * @param start 开始
 * @param end 结束值
 * @param step 步长
 * @returns {number[]}
 */
export const rangeArray = (start: number, end: number, step = 1): number[] => {
  const array = [];

  if (step > 0) {
    for (let i = start; i <= end; i += step) {
      array.push(i);
    }
  } else {
    // 处理如果步长为负值的情况
    for (let i = start; i >= end; i += step) {
      array.push(i);
    }
  }
  return array;
};
