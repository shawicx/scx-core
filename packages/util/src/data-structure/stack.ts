export class Stack<T> {
  private readonly items: T[];

  constructor() {
    this.items = [];
  }

  /**
   * @readonly
   * @description 是否空栈
   */
  get isEmpty() {
    return this.items.length === 0;
  }

  /**
   * @readonly
   * @description 栈大小
   */
  get size() {
    return this.items.length;
  }

  /**
   * @description 入栈
   * @param item
   */
  push(item: T) {
    this.items.unshift(item);
  }

  /**
   * @description 出栈
   */
  pop() {
    return this.items.shift();
  }

  /**
   * @description 最后出栈的项
   */
  peek() {
    return this.items[0];
  }
}
