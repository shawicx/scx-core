export interface LinkedNode<T> {
  value: T;
  next: LinkedNode<T> | null;
}

export class LinkedList<T> {
  private nodes: Array<LinkedNode<T>>;

  constructor() {
    this.nodes = [];
  }

  get values(): T[] {
    return this.nodes.map((node) => node.value);
  }

  /**
   * @readonly
   * @description 链表长度
   */
  get size(): number {
    return this.nodes.length;
  }

  /**
   * @readonly
   * @description 链表中第一个节点
   */
  get head(): LinkedNode<T> | null {
    return this.size ? this.nodes[0] : null;
  }

  /**
   * @readonly
   * @description 链表中最后一个节点
   */
  get tail(): LinkedNode<T> | null {
    return this.size ? this.nodes[this.size - 1] : null;
  }

  /**
   * @description 在指定位置插入节点
   * @param index 插入节点的位置
   * @param value 插入节点的值
   */
  insertAt(index: number, value: T): void {
    const previousNode = this.nodes[index - 1] || null;
    const nextNode = this.nodes[index] || null;
    const node: LinkedNode<T> = { value, next: nextNode };

    if (previousNode) previousNode.next = node;
    this.nodes.splice(index, 0, node);
  }

  /**
   * @description 在链表头部插入节点
   * @param value 插入节点的值
   */
  insertFirst(value: T): void {
    this.insertAt(0, value);
  }

  /**
   * @description 在链表尾部插入节点
   * @param value 插入节点的值
   */
  insertLast(value: T): void {
    this.insertAt(this.size, value);
  }

  /**
   * @description 获取指定位置的节点
   * @param index 节点位置
   */
  getAt(index: number): LinkedNode<T> | undefined {
    return this.nodes[index];
  }

  /**
   * @description 删除指定位置的节点
   * @param index 节点位置
   */
  removeAt(index: number): Array<LinkedNode<T>> {
    const previousNode = this.nodes[index - 1];
    const nextNode = this.nodes[index + 1] || null;

    if (previousNode) previousNode.next = nextNode;

    return this.nodes.splice(index, 1);
  }

  /**
   * @description 清空链表
   */
  clear(): void {
    this.nodes = [];
  }

  /**
   * @description 反转链表
   */
  reverse(): void {
    this.nodes = this.nodes.reduce(
      (acc: Array<LinkedNode<T>>, { value }) => [{ value, next: acc[0] || null }, ...acc],
      [],
    );
  }

  /**
   * @description 遍历链表
   */
  *[Symbol.iterator](): IterableIterator<LinkedNode<T>> {
    yield* this.nodes;
  }
}
