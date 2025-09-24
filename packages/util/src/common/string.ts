/**
 * @description 驼峰转连接符
 * @param input 要处理的字符串
 * @param delimiter 连接符号
 */
export const humpToLinker = (input: string, delimiter = '-') =>
  input.replace(/([A-Z])/g, (match, group1) => {
    // 如果大写字母是第一个字符，不添加连接符
    return (match === input[0] ? '' : delimiter) + group1.toLowerCase();
  });

/**
 * @description 连接符转驼峰
 * @param input 要处理的字符串
 * @param delimiter 字符串的连接符号
 * @param capitalizeFirst 是否转为大驼峰
 */
export const linkerToHump = (input: string, delimiter = '-', capitalizeFirst = false) =>
  input
    .split(delimiter)
    .map((item: string, index: number) => {
      if (capitalizeFirst) {
        return upperFirst(item);
      }
      return index === 0 ? lowerFirst(item) : upperFirst(item);
    })
    .join('');

/**
 * @description 首字母转大写
 * @param text
 */
export const upperFirst = (text: string) => text.replace(/^\S/, (s) => s.toLocaleUpperCase());

/**
 * @description 首字母转小写
 * @param text
 */
export const lowerFirst = (text: string) => text.replace(/^\S/, (s) => s.toLocaleLowerCase());
