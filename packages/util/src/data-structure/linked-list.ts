export interface LinkedNode<T> {
  value: T;
  next: LinkedNode<T> | null;
}

export class LinkedList<T> {
  private _head: LinkedNode<T> | null = null;
  private _tail: LinkedNode<T> | null = null;
  private _size: number = 0;

  constructor() {
    this._head = null;
    this._tail = null;
    this._size = 0;
  }

  /**
   * @description 获取链表所有值的数组
   */
  get values(): T[] {
    const values: T[] = [];
    let current = this._head;
    while (current) {
      values.push(current.value);
      current = current.next;
    }
    return values;
  }

  /**
   * @readonly
   * @description 链表长度
   */
  get size(): number {
    return this._size;
  }

  /**
   * @readonly
   * @description 链表中第一个节点
   */
  get head(): LinkedNode<T> | null {
    return this._head;
  }

  /**
   * @readonly
   * @description 链表中最后一个节点
   */
  get tail(): LinkedNode<T> | null {
    return this._tail;
  }

  /**
   * @description 在指定位置插入节点
   * @param index 插入节点的位置 (0-based)
   * @param value 插入节点的值
   */
  insertAt(index: number, value: T): void {
    if (index < 0 || index > this._size) {
      throw new Error(`Index ${index} is out of bounds. Size is ${this._size}`);
    }

    if (index === 0) {
      this.insertFirst(value);
      return;
    }

    if (index === this._size) {
      this.insertLast(value);
      return;
    }

    const newNode: LinkedNode<T> = { value, next: null };
    const prevNode = this._getNodeAt(index - 1);

    if (prevNode) {
      newNode.next = prevNode.next;
      prevNode.next = newNode;
      this._size++;
    }
  }

  /**
   * @description 在链表头部插入节点
   * @param value 插入节点的值
   */
  insertFirst(value: T): void {
    const newNode: LinkedNode<T> = { value, next: this._head };
    this._head = newNode;

    if (this._size === 0) {
      this._tail = newNode;
    }

    this._size++;
  }

  /**
   * @description 在链表尾部插入节点
   * @param value 插入节点的值
   */
  insertLast(value: T): void {
    if (this._size === 0) {
      this.insertFirst(value);
      return;
    }

    const newNode: LinkedNode<T> = { value, next: null };

    if (this._tail) {
      this._tail.next = newNode;
    }

    this._tail = newNode;
    this._size++;
  }

  /**
   * @description 获取指定位置的节点
   * @param index 节点位置 (0-based)
   */
  getAt(index: number): LinkedNode<T> | null {
    return this._getNodeAt(index);
  }

  /**
   * @description 删除指定位置的节点
   * @param index 节点位置 (0-based)
   */
  removeAt(index: number): LinkedNode<T> | null {
    if (index < 0 || index >= this._size) {
      return null;
    }

    if (index === 0) {
      return this.removeFirst();
    }

    const prevNode = this._getNodeAt(index - 1);
    if (!prevNode || !prevNode.next) {
      return null;
    }

    const nodeToRemove = prevNode.next;
    prevNode.next = nodeToRemove.next;

    // 如果删除的是尾节点，更新 tail 指针
    if (nodeToRemove === this._tail) {
      this._tail = prevNode;
    }

    this._size--;
    return nodeToRemove;
  }

  /**
   * @description 删除头节点
   */
  removeFirst(): LinkedNode<T> | null {
    if (!this._head) {
      return null;
    }

    const nodeToRemove = this._head;
    this._head = this._head.next;

    if (this._size === 1) {
      this._tail = null;
    }

    this._size--;
    return nodeToRemove;
  }

  /**
   * @description 删除尾节点
   */
  removeLast(): LinkedNode<T> | null {
    if (this._size === 0) {
      return null;
    }

    if (this._size === 1) {
      return this.removeFirst();
    }

    const prevNode = this._getNodeAt(this._size - 2);
    if (!prevNode) {
      return null;
    }

    const nodeToRemove = this._tail;
    prevNode.next = null;
    this._tail = prevNode;
    this._size--;

    return nodeToRemove;
  }

  /**
   * @description 查找值在链表中的索引
   * @param value 要查找的值
   */
  indexOf(value: T): number {
    let current = this._head;
    let index = 0;

    while (current) {
      if (current.value === value) {
        return index;
      }
      current = current.next;
      index++;
    }

    return -1;
  }

  /**
   * @description 检查链表是否包含指定值
   * @param value 要检查的值
   */
  contains(value: T): boolean {
    return this.indexOf(value) !== -1;
  }

  /**
   * @description 清空链表
   */
  clear(): void {
    this._head = null;
    this._tail = null;
    this._size = 0;
  }

  /**
   * @description 反转链表
   */
  reverse(): void {
    if (this._size <= 1) {
      return;
    }

    let prev: LinkedNode<T> | null = null;
    let current = this._head;
    this._tail = this._head; // 原来的头变成新的尾

    while (current) {
      const next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }

    this._head = prev; // 最后的prev就是新的头
  }

  /**
   * @description 检查链表是否为空
   */
  isEmpty(): boolean {
    return this._size === 0;
  }

  /**
   * @description 将链表转换为数组
   */
  toArray(): T[] {
    return this.values;
  }

  /**
   * @description 私有方法：获取指定位置的节点
   * @param index 节点位置
   */
  private _getNodeAt(index: number): LinkedNode<T> | null {
    if (index < 0 || index >= this._size) {
      return null;
    }

    let current = this._head;
    for (let i = 0; i < index && current; i++) {
      current = current.next;
    }

    return current;
  }

  /**
   * @description 遍历链表
   */
  *[Symbol.iterator](): IterableIterator<LinkedNode<T>> {
    let current = this._head;
    while (current) {
      yield current;
      current = current.next;
    }
  }
}
