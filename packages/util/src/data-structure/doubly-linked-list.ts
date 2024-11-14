export interface DoublyLinkedNode<T> {
  value: T;
  next: DoublyLinkedNode<T> | null;
  previous: DoublyLinkedNode<T> | null;
}

export class DoublyLinkedList<T> {
  private nodes: Array<DoublyLinkedNode<T>>;

  constructor() {
    this.nodes = [];
  }

  /**
   * @readonly
   * @description 获取链表长度
   */
  get size(): number {
    return this.nodes.length;
  }

  /**
   * @readonly
   * @description 获取链表头部节点
   */
  get head(): DoublyLinkedNode<T> | null {
    return this.size ? this.nodes[0] : null;
  }

  /**
   * @readonly
   * @description 获取链表尾部节点
   */
  get tail(): DoublyLinkedNode<T> | null {
    return this.size ? this.nodes[this.size - 1] : null;
  }

  /**
   * @description 在链表尾部添加节点
   * @param index 需要插入的节点位置
   * @param value 需要插入的节点
   */
  insertAt(index: number, value: T): void {
    const previousNode = this.nodes[index - 1] || null;
    const nextNode = this.nodes[index] || null;
    const node: DoublyLinkedNode<T> = { value, next: nextNode, previous: previousNode };

    if (previousNode) previousNode.next = node;
    if (nextNode) nextNode.previous = node;
    this.nodes.splice(index, 0, node);
  }

  /**
   * @description 在链表头部添加节点
   * @param value 需要插入的节点
   */
  insertFirst(value: T): void {
    this.insertAt(0, value);
  }

  /**
   * @description 在链表尾部添加节点
   * @param value 需要插入的节点
   */
  insertLast(value: T): void {
    this.insertAt(this.size, value);
  }

  /**
   * @description 获取节点
   * @param index 需要获取的节点位置
   */
  getAt(index: number): DoublyLinkedNode<T> | undefined {
    return this.nodes[index];
  }

  /**
   * @description 移除节点
   * @param index 需要移除的节点的位置
   */
  removeAt(index: number): Array<DoublyLinkedNode<T>> {
    const previousNode = this.nodes[index - 1] || null;
    const nextNode = this.nodes[index + 1] || null;

    if (previousNode) previousNode.next = nextNode;
    if (nextNode) nextNode.previous = previousNode;

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
    this.nodes = this.nodes.reduce((acc: Array<DoublyLinkedNode<T>>, { value }) => {
      const nextNode = acc[0] || null;
      const node: DoublyLinkedNode<T> = { value, next: nextNode, previous: null };
      if (nextNode) nextNode.previous = node;
      return [node, ...acc];
    }, []);
  }

  /**
   * @description 遍历链表
   */
  *[Symbol.iterator](): IterableIterator<DoublyLinkedNode<T>> {
    yield* this.nodes;
  }
}
