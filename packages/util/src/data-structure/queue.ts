export class Queue<T> {
  private readonly items: T[];

  constructor() {
    this.items = [];
  }

  /**
   * @readonly
   * @description 是否是空队列
   */
  get isEmpty(): boolean {
    return this.items.length === 0;
  }

  /**
   * @readonly
   * @description 队列长度
   */
  get size(): number {
    return this.items.length;
  }

  /**
   * @description 入列
   * @param item T
   */
  enqueue(item: T): void {
    this.items.push(item);
  }

  /**
   * @description 出列
   */
  dequeue(): T | undefined {
    return this.items.shift();
  }

  /**
   * @description 最后出列的项
   */
  peek(): T | undefined {
    return this.items[0];
  }
}
