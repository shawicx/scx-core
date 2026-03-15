---
group:
  title: 数据结构
  order: 1
toc: content
---

Tree（树）是一种层次化的数据结构，由节点和边组成。本库提供了通用树和二叉树两种实现。

## TreeNode - 通用树节点

```typescript
class TreeNode<T = any> {
  key: T;
  value: T;
  parent: TreeNode<T> | null;
  children: Array<TreeNode<T>>;

  get isLeaf(): boolean;
  get hasChildren(): boolean;

  constructor(key: T, value: T = key, parent: TreeNode<T> | null = null);
}
```

### 构造函数

```typescript
new TreeNode(key: T, value?: T, parent?: TreeNode<T> | null)
```

**参数**

- `key` - 节点键
- `value` - 节点值，默认与 key 相同
- `parent` - 父节点，默认为 `null`

### isLeaf - 是否为叶子节点

```typescript
get isLeaf(): boolean
```

检查节点是否为叶子节点（没有子节点）。

### hasChildren - 是否有子节点

```typescript
get hasChildren(): boolean
```

检查节点是否有子节点。

---

## Tree - 通用树

```typescript
class Tree<T = any> {
  root: TreeNode<T>;

  constructor(key: T, value?: T);

  preOrderTraversal(node?: TreeNode<T>): Generator<TreeNode<T>>;
  postOrderTraversal(node?: TreeNode<T>): Generator<TreeNode<T>>;
  breadthFirstTraversal(): Generator<TreeNode<T>>;

  insert(parentKey: T, key: T, value?: T): boolean;
  remove(key: T): boolean;
  find(key: T): TreeNode<T> | undefined;

  getHeight(): number;
  get size(): number;
  getLeaves(): TreeNode<T>[];

  clear(): void;
}
```

### 构造函数

```typescript
new Tree(key: T, value?: T)
```

创建一个以指定节点为根的树。

**示例**

```typescript
const tree = new Tree('root', '根节点');
```

### preOrderTraversal - 前序遍历

```typescript
*preOrderTraversal(node?: TreeNode<T>): Generator<TreeNode<T>>
```

前序遍历树结构（根节点 -> 子节点）。

**示例**

```typescript
const tree = new Tree<number>(1);
tree.insert(1, 2);
tree.insert(1, 3);
tree.insert(2, 4);

for (const node of tree.preOrderTraversal()) {
  console.log(node.value);
}

// 输出: 1, 2, 4, 3
```

### postOrderTraversal - 后序遍历

```typescript
*postOrderTraversal(node?: TreeNode<T>): Generator<TreeNode<T>>
```

后序遍历树结构（子节点 -> 根节点）。

**示例**

```typescript
for (const node of tree.postOrderTraversal()) {
  console.log(node.value);
}

// 输出: 4, 2, 3, 1
```

### breadthFirstTraversal - 广度优先遍历

```typescript
*breadthFirstTraversal(): Generator<TreeNode<T>>
```

广度优先遍历树结构（层级遍历）。

**示例**

```typescript
for (const node of tree.breadthFirstTraversal()) {
  console.log(node.value);
}

// 输出: 1, 2, 3, 4
```

### insert - 插入节点

```typescript
insert(parentKey: T, key: T, value?: T): boolean
```

在指定父节点下插入一个新节点。

**参数**

- `parentKey` - 父节点的键
- `key` - 新节点的键
- `value` - 新节点的值，默认与 key 相同

**返回值**

- `boolean` - 返回 `true` 表示插入成功，返回 `false` 表示父节点不存在

**示例**

```typescript
const tree = new Tree<number>(1);
tree.insert(1, 2);
tree.insert(1, 3);
tree.insert(2, 4);
tree.insert(2, 5);
```

### remove - 删除节点

```typescript
remove(key: T): boolean
```

删除指定的节点及其所有子节点。

**参数**

- `key` - 要删除的节点键

**返回值**

- `boolean` - 返回 `true` 表示删除成功，返回 `false` 表示节点不存在

### find - 查找节点

```typescript
find(key: T): TreeNode<T> | undefined
```

查找指定键的节点。

**参数**

- `key` - 要查找的节点键

**返回值**

- `TreeNode<T> | undefined` - 返回找到的节点，未找到返回 `undefined`

### getHeight - 获取树高度

```typescript
getHeight(): number
```

获取树的高度（从根到最远叶子节点的边数）。

### size - 节点数量

```typescript
get size(): number
```

获取树中节点的总数。

### getLeaves - 获取叶子节点

```typescript
getLeaves(): TreeNode<T>[]
```

获取所有叶子节点（没有子节点的节点）。

### clear - 清空树

```typescript
clear(): void
```

清空树（保留根节点，删除所有子节点）。

---

## BinaryTree - 二叉搜索树

```typescript
class BinaryTree<T> {
  constructor(rootValue?: T);

  get root(): BinaryTreeNode<T> | null;
  get size(): number;

  insert(value: T): void;
  search(value: T): BinaryTreeNode<T> | null;
  remove(value: T): boolean;

  getHeight(): number;
  traverse(order?: TraversalOrder): T[];

  getMin(): T | null;
  getMax(): T | null;

  isEmpty(): boolean;
  isBalanced(): boolean;

  clear(): void;
}

interface BinaryTreeNode<T> {
  value: T;
  left: BinaryTreeNode<T> | null;
  right: BinaryTreeNode<T> | null;
}

type TraversalOrder = 'preorder' | 'inorder' | 'postorder' | 'levelorder';
```

### 构造函数

```typescript
new BinaryTree<T>(rootValue?: T)
```

创建一个二叉搜索树。

**示例**

```typescript
const tree = new BinaryTree<number>(50);
```

### insert - 插入节点

```typescript
insert(value: T): void
```

按照二叉搜索树规则插入一个新节点。

**示例**

```typescript
const tree = new BinaryTree<number>(50);
tree.insert(30);
tree.insert(70);
tree.insert(20);
tree.insert(40);
```

### search - 查找节点

```typescript
search(value: T): BinaryTreeNode<T> | null
```

查找指定值的节点。

### remove - 删除节点

```typescript
remove(value: T): boolean
```

删除指定值的节点。

### traverse - 遍历树

```typescript
traverse(order?: TraversalOrder): T[]
```

按指定顺序遍历树。

**参数**

- `order` - 遍历顺序，默认为 `'inorder'`
  - `'preorder'` - 前序遍历（根 -> 左 -> 右）
  - `'inorder'` - 中序遍历（左 -> 根 -> 右）
  - `'postorder'` - 后序遍历（左 -> 右 -> 根）
  - `'levelorder'` - 层序遍历

**示例**

```typescript
const tree = new BinaryTree<number>(50);
tree.insert(30);
tree.insert(70);
tree.insert(20);
tree.insert(40);

console.log(tree.traverse('inorder')); // [20, 30, 40, 50, 70]
console.log(tree.traverse('preorder')); // [50, 30, 20, 40, 70]
console.log(tree.traverse('postorder')); // [20, 40, 30, 70, 50]
```

### getMin - 获取最小值

```typescript
getMin(): T | null
```

获取树中的最小值。

### getMax - 获取最大值

```typescript
getMax(): T | null
```

获取树中的最大值。

### isBalanced - 检查是否平衡

```typescript
isBalanced(): boolean
```

检查树是否为平衡二叉树（任意节点的左右子树高度差不超过 1）。

---

## 综合示例

### 组织架构树

```typescript
import { Tree } from '@scxfe/util';

interface Employee {
  id: number;
  name: string;
  position: string;
}

class OrganizationChart {
  private tree = new Tree<number, Employee>(0, {
    id: 0,
    name: 'CEO',
    position: '首席执行官',
  });

  addEmployee(managerId: number, employee: Employee): boolean {
    return this.tree.insert(managerId, employee.id, employee);
  }

  removeEmployee(id: number): boolean {
    return this.tree.remove(id);
  }

  findEmployee(id: number): Employee | undefined {
    return this.tree.find(id)?.value;
  }

  getSubordinates(managerId: number): Employee[] {
    const manager = this.tree.find(managerId);
    if (!manager) return [];

    const subordinates: Employee[] = [];
    for (const child of manager.children) {
      subordinates.push(child.value);
    }
    return subordinates;
  }

  getAllEmployees(): Employee[] {
    const employees: Employee[] = [];
    for (const node of this.tree.preOrderTraversal()) {
      if (node.value !== this.tree.root.value) {
        employees.push(node.value);
      }
    }
    return employees;
  }
}

const org = new OrganizationChart();

org.addEmployee(0, { id: 1, name: '张三', position: '技术总监' });
org.addEmployee(0, { id: 2, name: '李四', position: '市场总监' });
org.addEmployee(1, { id: 3, name: '王五', position: '前端经理' });
org.addEmployee(1, { id: 4, name: '赵六', position: '后端经理' });
org.addEmployee(2, { id: 5, name: '钱七', position: '销售经理' });

console.log('技术总监的下属:', org.getSubordinates(1));
console.log('所有员工:', org.getAllEmployees());
```

### 文件系统

```typescript
import { Tree } from '@scxfe/util';

interface FileSystemNode {
  name: string;
  type: 'file' | 'folder';
  size?: number;
}

class FileSystem {
  private tree = new Tree<string, FileSystemNode>('/', {
    name: '/',
    type: 'folder',
  });

  createFolder(parentPath: string, folderName: string): boolean {
    const fullPath = `${parentPath}/${folderName}`;
    return this.tree.insert(parentPath, fullPath, {
      name: folderName,
      type: 'folder',
    });
  }

  createFile(parentPath: string, fileName: string, size: number): boolean {
    const fullPath = `${parentPath}/${fileName}`;
    return this.tree.insert(parentPath, fullPath, {
      name: fileName,
      type: 'file',
      size,
    });
  }

  listDirectory(path: string): FileSystemNode[] {
    const node = this.tree.find(path);
    if (!node) return [];

    return node.children.map((child) => child.value);
  }

  getTotalSize(path: string): number {
    let totalSize = 0;
    for (const node of this.tree.preOrderTraversal(this.tree.find(path))) {
      if (node.value.type === 'file') {
        totalSize += node.value.size || 0;
      }
    }
    return totalSize;
  }
}

const fs = new FileSystem();

fs.createFolder('/', 'home');
fs.createFolder('/home', 'user');
fs.createFolder('/home/user', 'documents');
fs.createFile('/home/user/documents', 'readme.txt', 1024);
fs.createFile('/home/user/documents', 'data.json', 2048);

console.log('目录内容:', fs.listDirectory('/home/user/documents'));
console.log('总大小:', fs.getTotalSize('/home/user/documents'));
```

### 二叉搜索树 - 查找和排序

```typescript
import { BinaryTree } from '@scxfe/util';

const tree = new BinaryTree<number>();

// 插入数据
const data = [50, 30, 70, 20, 40, 60, 80];
data.forEach((num) => tree.insert(num));

// 中序遍历（已排序）
console.log('排序后的数据:', tree.traverse('inorder'));
// [20, 30, 40, 50, 60, 70, 80]

// 查找
console.log('查找 40:', tree.search(40)); // 找到
console.log('查找 55:', tree.search(55)); // 未找到

// 获取最值
console.log('最小值:', tree.getMin()); // 20
console.log('最大值:', tree.getMax()); // 80

// 删除
tree.remove(30);
console.log('删除 30 后:', tree.traverse('inorder'));
```

### 表达式树

```typescript
import { BinaryTree } from '@scxfe/util';

interface ExpressionNode {
  value: string;
  type: 'operator' | 'operand';
}

class ExpressionTree {
  private tree: BinaryTree<ExpressionNode>;

  constructor(expression: string) {
    this.tree = this.buildTree(expression);
  }

  private buildTree(expression: string): BinaryTree<ExpressionNode> {
    const tokens = expression.split(' ');
    const stack: BinaryTree<ExpressionNode>[] = [];

    tokens.forEach((token) => {
      if (this.isOperator(token)) {
        const right = stack.pop()!;
        const left = stack.pop()!;
        const node = new BinaryTree<ExpressionNode>({
          value: token,
          type: 'operator',
        });
        node.root.left = left.root;
        node.root.right = right.root;
        stack.push(node);
      } else {
        stack.push(
          new BinaryTree<ExpressionNode>({
            value: token,
            type: 'operand',
          }),
        );
      }
    });

    return stack.pop()!;
  }

  private isOperator(token: string): boolean {
    return ['+', '-', '*', '/'].includes(token);
  }

  evaluate(): number {
    return this.evaluateNode(this.tree.root);
  }

  private evaluateNode(node: BinaryTreeNode<ExpressionNode> | null): number {
    if (!node) return 0;

    if (node.value.type === 'operand') {
      return parseFloat(node.value.value);
    }

    const leftValue = this.evaluateNode(node.left);
    const rightValue = this.evaluateNode(node.right);

    switch (node.value.value) {
      case '+':
        return leftValue + rightValue;
      case '-':
        return leftValue - rightValue;
      case '*':
        return leftValue * rightValue;
      case '/':
        return leftValue / rightValue;
      default:
        throw new Error('未知运算符');
    }
  }
}

// 后缀表达式: 3 4 + 2 *
const expr = new ExpressionTree('3 4 + 2 *');
console.log('表达式结果:', expr.evaluate()); // 14
```
