export interface DoublyLinkedNode<T> {
  value: T;
  next: DoublyLinkedNode<T> | null;
  previous: DoublyLinkedNode<T> | null;
}

export class DoublyLinkedList<T> {
  private _head: DoublyLinkedNode<T> | null = null;
  private _tail: DoublyLinkedNode<T> | null = null;
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
   * @description 获取链表长度
   */
  get size(): number {
    return this._size;
  }

  /**
   * @readonly
   * @description 获取链表头部节点
   */
  get head(): DoublyLinkedNode<T> | null {
    return this._head;
  }

  /**
   * @readonly
   * @description 获取链表尾部节点
   */
  get tail(): DoublyLinkedNode<T> | null {
    return this._tail;
  }

  /**
   * @description 在指定位置插入节点
   * @param index 需要插入的节点位置 (0-based)
   * @param value 需要插入的节点值
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

    const newNode: DoublyLinkedNode<T> = { value, next: null, previous: null };
    const nextNode = this._getNodeAt(index);
    const prevNode = nextNode?.previous || null;

    newNode.next = nextNode;
    newNode.previous = prevNode;

    if (prevNode) {
      prevNode.next = newNode;
    }
    if (nextNode) {
      nextNode.previous = newNode;
    }

    this._size++;
  }

  /**
   * @description 在链表头部添加节点
   * @param value 需要插入的节点值
   */
  insertFirst(value: T): void {
    const newNode: DoublyLinkedNode<T> = { value, next: this._head, previous: null };

    if (this._head) {
      this._head.previous = newNode;
    } else {
      // 链表为空时，新节点同时是头和尾
      this._tail = newNode;
    }

    this._head = newNode;
    this._size++;
  }

  /**
   * @description 在链表尾部添加节点
   * @param value 需要插入的节点值
   */
  insertLast(value: T): void {
    if (this._size === 0) {
      this.insertFirst(value);
      return;
    }

    const newNode: DoublyLinkedNode<T> = { value, next: null, previous: this._tail };

    if (this._tail) {
      this._tail.next = newNode;
    }

    this._tail = newNode;
    this._size++;
  }

  /**
   * @description 获取节点
   * @param index 需要获取的节点位置 (0-based)
   */
  getAt(index: number): DoublyLinkedNode<T> | null {
    return this._getNodeAt(index);
  }

  /**
   * @description 移除节点
   * @param index 需要移除的节点的位置 (0-based)
   */
  removeAt(index: number): DoublyLinkedNode<T> | null {
    if (index < 0 || index >= this._size) {
      return null;
    }

    if (index === 0) {
      return this.removeFirst();
    }

    if (index === this._size - 1) {
      return this.removeLast();
    }

    const nodeToRemove = this._getNodeAt(index);
    if (!nodeToRemove) {
      return null;
    }

    const prevNode = nodeToRemove.previous;
    const nextNode = nodeToRemove.next;

    if (prevNode) {
      prevNode.next = nextNode;
    }
    if (nextNode) {
      nextNode.previous = prevNode;
    }

    this._size--;
    return nodeToRemove;
  }

  /**
   * @description 删除头节点
   */
  removeFirst(): DoublyLinkedNode<T> | null {
    if (!this._head) {
      return null;
    }

    const nodeToRemove = this._head;
    this._head = this._head.next;

    if (this._head) {
      this._head.previous = null;
    } else {
      // 链表变空时，tail 也要置空
      this._tail = null;
    }

    this._size--;
    return nodeToRemove;
  }

  /**
   * @description 删除尾节点
   */
  removeLast(): DoublyLinkedNode<T> | null {
    if (!this._tail) {
      return null;
    }

    const nodeToRemove = this._tail;
    this._tail = this._tail.previous;

    if (this._tail) {
      this._tail.next = null;
    } else {
      // 链表变空时，head 也要置空
      this._head = null;
    }

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

    let current = this._head;
    let temp: DoublyLinkedNode<T> | null = null;

    // 交换每个节点的 next 和 previous 指针
    while (current) {
      temp = current.previous;
      current.previous = current.next;
      current.next = temp;
      current = current.previous; // 移动到下一个节点（原来的next）
    }

    // 交换头尾指针：temp 现在指向原来的头节点的 previous（即null）
    // current 现在是 null，temp.previous 是新的头节点
    if (temp) {
      this._tail = this._head;
      this._head = temp.previous;
    }
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
   * @description 从尾部开始遍历链表
   */
  *reverseIterator(): IterableIterator<DoublyLinkedNode<T>> {
    let current = this._tail;
    while (current) {
      yield current;
      current = current.previous;
    }
  }

  /**
   * @description 私有方法：获取指定位置的节点（优化版本，从较近的一端开始）
   * @param index 节点位置
   */
  private _getNodeAt(index: number): DoublyLinkedNode<T> | null {
    if (index < 0 || index >= this._size) {
      return null;
    }

    let current: DoublyLinkedNode<T> | null;

    // 从较近的一端开始遍历，提高效率
    if (index < this._size / 2) {
      // 从头开始
      current = this._head;
      for (let i = 0; i < index && current; i++) {
        current = current.next;
      }
    } else {
      // 从尾开始
      current = this._tail;
      for (let i = this._size - 1; i > index && current; i--) {
        current = current.previous;
      }
    }

    return current;
  }

  /**
   * @description 遍历链表
   */
  *[Symbol.iterator](): IterableIterator<DoublyLinkedNode<T>> {
    let current = this._head;
    while (current) {
      yield current;
      current = current.next;
    }
  }
}
