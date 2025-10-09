/*
 * @Author: shawicx d35f3153@proton.me
 * @Description: 树数据结构实现
 */

/**
 * 二叉树节点接口
 */
export interface BinaryTreeNode<T> {
  value: T;
  left: BinaryTreeNode<T> | null;
  right: BinaryTreeNode<T> | null;
}

/**
 * 通用树节点类
 */
export class TreeNode<T = any> {
  key: T;
  value: T;
  parent: TreeNode<T> | null;
  children: Array<TreeNode<T>>;

  constructor(key: T, value: T = key, parent: TreeNode<T> | null = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.children = [];
  }

  get isLeaf(): boolean {
    return this.children.length === 0;
  }

  get hasChildren(): boolean {
    return !this.isLeaf;
  }
}

export class Tree<T = any> {
  root: TreeNode<T>;

  constructor(key: T, value: T = key) {
    this.root = new TreeNode(key, value);
  }

  /**
   * @description 前序遍历树结构。
   * @param node
   */
  *preOrderTraversal(node: TreeNode<T> = this.root): Generator<TreeNode<T>> {
    yield node;
    if (node.children.length) {
      for (const child of node.children) {
        yield* this.preOrderTraversal(child);
      }
    }
  }

  /**
   * @description 后序遍历树结构。
   * @param node
   */
  *postOrderTraversal(node: TreeNode<T> = this.root): Generator<TreeNode<T>> {
    if (node.children.length) {
      for (const child of node.children) {
        yield* this.postOrderTraversal(child);
      }
    }
    yield node;
  }

  /**
   * @description 插入节点
   * @param parentNodeKey
   * @param key
   * @param value
   */
  insert(parentNodeKey: T, key: T, value: T = key): boolean {
    for (const node of this.preOrderTraversal()) {
      if (node.key === parentNodeKey) {
        node.children.push(new TreeNode(key, value, node));
        return true;
      }
    }
    return false;
  }

  remove(key: T): boolean {
    for (const node of this.preOrderTraversal()) {
      const filtered = node.children.filter((c) => c.key !== key);
      if (filtered.length !== node.children.length) {
        node.children = filtered;
        return true;
      }
    }
    return false;
  }

  find(key: T): TreeNode<T> | undefined {
    for (const node of this.preOrderTraversal()) {
      if (node.key === key) return node;
    }
    return undefined;
  }

  /**
   * @description 获取树的高度
   */
  getHeight(): number {
    return this._getNodeHeight(this.root);
  }

  /**
   * @description 获取树的大小（节点数量）
   */
  get size(): number {
    let count = 0;
    for (const _ of this.preOrderTraversal()) {
      count++;
    }
    return count;
  }

  /**
   * @description 广度优先遍历
   */
  *breadthFirstTraversal(): Generator<TreeNode<T>> {
    const queue: TreeNode<T>[] = [this.root];

    while (queue.length > 0) {
      const node = queue.shift()!;
      yield node;
      queue.push(...node.children);
    }
  }

  /**
   * @description 获取所有叶子节点
   */
  getLeaves(): TreeNode<T>[] {
    const leaves: TreeNode<T>[] = [];
    for (const node of this.preOrderTraversal()) {
      if (node.isLeaf) {
        leaves.push(node);
      }
    }
    return leaves;
  }

  /**
   * @description 清空树（保留根节点）
   */
  clear(): void {
    this.root.children = [];
  }

  private _getNodeHeight(node: TreeNode<T>): number {
    if (node.children.length === 0) return 1;

    let maxChildHeight = 0;
    for (const child of node.children) {
      maxChildHeight = Math.max(maxChildHeight, this._getNodeHeight(child));
    }

    return 1 + maxChildHeight;
  }
}

/**
 * 二叉树遍历顺序类型
 */
export type TraversalOrder = 'preorder' | 'inorder' | 'postorder' | 'levelorder';

/**
 * 二叉搜索树类
 */
export class BinaryTree<T> {
  private _root: BinaryTreeNode<T> | null = null;
  private _size: number = 0;

  constructor(rootValue?: T) {
    if (rootValue !== undefined) {
      this._root = { value: rootValue, left: null, right: null };
      this._size = 1;
    }
  }

  /**
   * @description 获取根节点
   */
  get root(): BinaryTreeNode<T> | null {
    return this._root;
  }

  /**
   * @description 获取树的大小
   */
  get size(): number {
    return this._size;
  }

  /**
   * @description 检查树是否为空
   */
  isEmpty(): boolean {
    return this._root === null;
  }

  /**
   * @description 插入节点（按二叉搜索树规则）
   * @param value 要插入的值
   */
  insert(value: T): void {
    if (this._root === null) {
      this._root = { value, left: null, right: null };
      this._size = 1;
      return;
    }

    this._insertNode(this._root, value);
    this._size++;
  }

  /**
   * @description 搜索值
   * @param value 要搜索的值
   */
  search(value: T): BinaryTreeNode<T> | null {
    return this._searchNode(this._root, value);
  }

  /**
   * @description 删除节点
   * @param value 要删除的值
   */
  remove(value: T): boolean {
    const result = this._removeNode(this._root, value);
    if (result.removed) {
      this._root = result.node;
      this._size--;
      return true;
    }
    return false;
  }

  /**
   * @description 获取树的高度
   */
  getHeight(): number {
    return this._getNodeHeight(this._root);
  }

  /**
   * @description 遍历树
   * @param order 遍历顺序
   */
  traverse(order: TraversalOrder = 'inorder'): T[] {
    const result: T[] = [];

    switch (order) {
      case 'preorder':
        this._preorderTraversal(this._root, result);
        break;
      case 'inorder':
        this._inorderTraversal(this._root, result);
        break;
      case 'postorder':
        this._postorderTraversal(this._root, result);
        break;
      case 'levelorder':
        this._levelorderTraversal(result);
        break;
    }

    return result;
  }

  /**
   * @description 清空树
   */
  clear(): void {
    this._root = null;
    this._size = 0;
  }

  /**
   * @description 检查是否为平衡二叉树
   */
  isBalanced(): boolean {
    return this._checkBalance(this._root).balanced;
  }

  /**
   * @description 获取最小值
   */
  getMin(): T | null {
    const minNode = this._getMinNode(this._root);
    return minNode ? minNode.value : null;
  }

  /**
   * @description 获取最大值
   */
  getMax(): T | null {
    const maxNode = this._getMaxNode(this._root);
    return maxNode ? maxNode.value : null;
  }

  // 私有方法
  private _insertNode(node: BinaryTreeNode<T>, value: T): void {
    if (value < node.value) {
      if (node.left === null) {
        node.left = { value, left: null, right: null };
      } else {
        this._insertNode(node.left, value);
      }
    } else {
      if (node.right === null) {
        node.right = { value, left: null, right: null };
      } else {
        this._insertNode(node.right, value);
      }
    }
  }

  private _searchNode(node: BinaryTreeNode<T> | null, value: T): BinaryTreeNode<T> | null {
    if (node === null || node.value === value) {
      return node;
    }

    if (value < node.value) {
      return this._searchNode(node.left, value);
    } else {
      return this._searchNode(node.right, value);
    }
  }

  private _removeNode(
    node: BinaryTreeNode<T> | null,
    value: T,
  ): { node: BinaryTreeNode<T> | null; removed: boolean } {
    if (node === null) {
      return { node: null, removed: false };
    }

    if (value < node.value) {
      const result = this._removeNode(node.left, value);
      node.left = result.node;
      return { node, removed: result.removed };
    } else if (value > node.value) {
      const result = this._removeNode(node.right, value);
      node.right = result.node;
      return { node, removed: result.removed };
    } else {
      if (node.left === null) {
        return { node: node.right, removed: true };
      } else if (node.right === null) {
        return { node: node.left, removed: true };
      } else {
        const minRight = this._getMinNode(node.right);
        if (minRight) {
          node.value = minRight.value;
          const result = this._removeNode(node.right, minRight.value);
          node.right = result.node;
        }
        return { node, removed: true };
      }
    }
  }

  private _getNodeHeight(node: BinaryTreeNode<T> | null): number {
    if (node === null) return 0;
    return 1 + Math.max(this._getNodeHeight(node.left), this._getNodeHeight(node.right));
  }

  private _preorderTraversal(node: BinaryTreeNode<T> | null, result: T[]): void {
    if (node !== null) {
      result.push(node.value);
      this._preorderTraversal(node.left, result);
      this._preorderTraversal(node.right, result);
    }
  }

  private _inorderTraversal(node: BinaryTreeNode<T> | null, result: T[]): void {
    if (node !== null) {
      this._inorderTraversal(node.left, result);
      result.push(node.value);
      this._inorderTraversal(node.right, result);
    }
  }

  private _postorderTraversal(node: BinaryTreeNode<T> | null, result: T[]): void {
    if (node !== null) {
      this._postorderTraversal(node.left, result);
      this._postorderTraversal(node.right, result);
      result.push(node.value);
    }
  }

  private _levelorderTraversal(result: T[]): void {
    if (this._root === null) return;

    const queue: BinaryTreeNode<T>[] = [this._root];

    while (queue.length > 0) {
      const node = queue.shift()!;
      result.push(node.value);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  private _checkBalance(node: BinaryTreeNode<T> | null): { height: number; balanced: boolean } {
    if (node === null) {
      return { height: 0, balanced: true };
    }

    const left = this._checkBalance(node.left);
    const right = this._checkBalance(node.right);

    const height = 1 + Math.max(left.height, right.height);
    const balanced = left.balanced && right.balanced && Math.abs(left.height - right.height) <= 1;

    return { height, balanced };
  }

  private _getMinNode(node: BinaryTreeNode<T> | null): BinaryTreeNode<T> | null {
    if (node === null) return null;
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  private _getMaxNode(node: BinaryTreeNode<T> | null): BinaryTreeNode<T> | null {
    if (node === null) return null;
    while (node.right !== null) {
      node = node.right;
    }
    return node;
  }
}
