class TreeNode<T = any> {
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
}
