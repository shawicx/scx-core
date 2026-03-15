---
group:
  title: 数据结构
  order: 1
toc: content
---

Stack（栈）是一种后进先出（LIFO）的数据结构，元素的添加和删除都发生在栈顶。

## Stack 类

```typescript
class Stack<T> {
  constructor();

  get isEmpty(): boolean;
  get size(): number;

  push(item: T): void;
  pop(): T | undefined;
  peek(): T | undefined;
}
```

---

## 构造函数

```typescript
new Stack<T>();
```

创建一个空栈。

**示例**

```typescript
const stack = new Stack<number>();
```

---

## isEmpty - 是否为空

检查栈是否为空。

```typescript
get isEmpty(): boolean
```

**返回值**

- `boolean` - 返回 `true` 表示栈为空，返回 `false` 表示栈不为空

**示例**

```typescript
const stack = new Stack<number>();

console.log(stack.isEmpty); // true

stack.push(1);

console.log(stack.isEmpty); // false
```

---

## size - 栈大小

获取栈中元素的数量。

```typescript
get size(): number
```

**返回值**

- `number` - 返回栈大小

**示例**

```typescript
const stack = new Stack<number>();
stack.push(1);
stack.push(2);
stack.push(3);

console.log(stack.size); // 3
```

---

## push - 入栈

将元素添加到栈顶。

```typescript
push(item: T): void
```

**参数**

- `item` - 要添加的元素

**示例**

```typescript
const stack = new Stack<string>();

stack.push('第一层');
stack.push('第二层');
stack.push('第三层');

console.log(stack.size); // 3
```

---

## pop - 出栈

从栈顶移除并返回元素。

```typescript
pop(): T | undefined
```

**返回值**

- `T | undefined` - 返回栈顶的元素，栈为空时返回 `undefined`

**示例**

```typescript
const stack = new Stack<number>();

stack.push(1);
stack.push(2);
stack.push(3);

console.log(stack.pop()); // 3
console.log(stack.pop()); // 2
console.log(stack.size); // 1
```

---

## peek - 查看栈顶元素

查看栈顶的元素，但不移除它。

```typescript
peek(): T | undefined
```

**返回值**

- `T | undefined` - 返回栈顶的元素，栈为空时返回 `undefined`

**示例**

```typescript
const stack = new Stack<number>();

stack.push(1);
stack.push(2);

console.log(stack.peek()); // 2
console.log(stack.size); // 2（元素未被移除）

stack.pop();

console.log(stack.peek()); // 1
```

---

## 综合示例

### 括号匹配检查

```typescript
import { Stack } from '@scxfe/util';

function isValidParentheses(s: string): boolean {
  const stack = new Stack<string>();
  const pairs: Record<string, string> = {
    ')': '(',
    ']': '[',
    '}': '{',
  };

  for (const char of s) {
    if (char === '(' || char === '[' || char === '{') {
      stack.push(char);
    } else if (char === ')' || char === ']' || char === '}') {
      const top = stack.pop();
      if (top !== pairs[char]) {
        return false;
      }
    }
  }

  return stack.isEmpty;
}

console.log(isValidParentheses('()')); // true
console.log(isValidParentheses('()[]{}')); // true
console.log(isValidParentheses('(]')); // false
console.log(isValidParentheses('([)]')); // false
console.log(isValidParentheses('{[]}')); // true
```

### 撤销功能

```typescript
import { Stack } from '@scxfe/util';

class TextEditor {
  private content = '';
  private history = new Stack<string>();

  insert(text: string): void {
    this.history.push(this.content);
    this.content += text;
    console.log(`插入: "${text}"`);
    console.log(`当前内容: "${this.content}"`);
  }

  undo(): void {
    const previous = this.history.pop();
    if (previous !== undefined) {
      this.content = previous;
      console.log('撤销');
      console.log(`当前内容: "${this.content}"`);
    } else {
      console.log('没有可撤销的操作');
    }
  }

  getContent(): string {
    return this.content;
  }
}

const editor = new TextEditor();

editor.insert('Hello');
editor.insert(' ');
editor.insert('World');

editor.undo();
editor.undo();
editor.undo();
editor.undo(); // 没有可撤销的操作
```

### 后缀表达式求值

```typescript
import { Stack } from '@scxfe/util';

function evaluatePostfix(expression: string): number {
  const stack = new Stack<number>();
  const tokens = expression.split(' ');

  for (const token of tokens) {
    if (/\d/.test(token)) {
      stack.push(parseInt(token));
    } else {
      const b = stack.pop()!;
      const a = stack.pop()!;

      let result: number;
      switch (token) {
        case '+':
          result = a + b;
          break;
        case '-':
          result = a - b;
          break;
        case '*':
          result = a * b;
          break;
        case '/':
          result = a / b;
          break;
        default:
          throw new Error(`未知运算符: ${token}`);
      }

      stack.push(result);
    }
  }

  return stack.pop()!;
}

console.log(evaluatePostfix('3 4 + 2 *')); // 14
console.log(evaluatePostfix('5 1 2 + 4 * + 3 -')); // 14
```

### 浏览器历史导航

```typescript
import { Stack } from '@scxfe/util';

class BrowserHistory {
  private backStack = new Stack<string>();
  private forwardStack = new Stack<string>();
  private currentPage: string | null = null;

  visit(url: string): void {
    if (this.currentPage) {
      this.backStack.push(this.currentPage);
    }
    this.currentPage = url;
    this.forwardStack = new Stack(); // 清空前进历史
    console.log(`访问: ${url}`);
  }

  back(): void {
    if (!this.currentPage) {
      console.log('没有历史记录');
      return;
    }

    this.forwardStack.push(this.currentPage);
    const previous = this.backStack.pop();

    if (previous !== undefined) {
      this.currentPage = previous;
      console.log(`后退到: ${this.currentPage}`);
    } else {
      console.log('已经是第一页了');
    }
  }

  forward(): void {
    if (!this.currentPage) {
      console.log('没有历史记录');
      return;
    }

    if (this.forwardStack.isEmpty) {
      console.log('没有前进记录');
      return;
    }

    this.backStack.push(this.currentPage);
    this.currentPage = this.forwardStack.pop()!;
    console.log(`前进到: ${this.currentPage}`);
  }

  getCurrent(): string | null {
    return this.currentPage;
  }
}

const history = new BrowserHistory();

history.visit('https://example.com');
history.visit('https://example.com/page1');
history.visit('https://example.com/page2');

console.log(`当前页面: ${history.getCurrent()}`);

history.back();
history.back();

history.forward();
history.forward();
history.forward(); // 没有前进记录
```

### 深度优先搜索（DFS）

```typescript
import { Stack } from '@scxfe/util';

// 树节点
interface TreeNode {
  value: number;
  children: TreeNode[];
}

function dfs(root: TreeNode, target: number): number[] | null {
  const stack = new Stack<TreeNode>();
  const visited = new Map<TreeNode, TreeNode>();

  stack.push(root);
  visited.set(root, root);

  while (!stack.isEmpty) {
    const node = stack.pop()!;

    if (node.value === target) {
      const path: number[] = [];
      let current: TreeNode | undefined = node;
      while (current) {
        path.unshift(current.value);
        current = visited.get(current);
      }
      return path;
    }

    for (const child of node.children) {
      if (!visited.has(child)) {
        visited.set(child, node);
        stack.push(child);
      }
    }
  }

  return null;
}

const tree: TreeNode = {
  value: 1,
  children: [
    {
      value: 2,
      children: [
        { value: 4, children: [] },
        { value: 5, children: [] },
      ],
    },
    {
      value: 3,
      children: [
        { value: 6, children: [] },
        { value: 7, children: [] },
      ],
    },
  ],
};

const path = dfs(tree, 6);
console.log('到节点 6 的路径:', path);
// 到节点 6 的路径: [1, 3, 6]
```

### 迷宫求解

```typescript
import { Stack } from '@scxfe/util';

type Position = { x: number; y: number };

function solveMaze(maze: number[][], start: Position, end: Position): Position[] | null {
  const rows = maze.length;
  const cols = maze[0].length;
  const visited = new Set<string>();
  const stack = new Stack<{ pos: Position; path: Position[] }>();

  stack.push({ pos: start, path: [start] });
  visited.add(`${start.x},${start.y}`);

  const directions = [
    { dx: 0, dy: 1 }, // 右
    { dx: 1, dy: 0 }, // 下
    { dx: 0, dy: -1 }, // 左
    { dx: -1, dy: 0 }, // 上
  ];

  while (!stack.isEmpty) {
    const { pos, path } = stack.pop()!;

    if (pos.x === end.x && pos.y === end.y) {
      return path;
    }

    for (const dir of directions) {
      const newX = pos.x + dir.dx;
      const newY = pos.y + dir.dy;
      const key = `${newX},${newY}`;

      if (
        newX >= 0 &&
        newX < rows &&
        newY >= 0 &&
        newY < cols &&
        maze[newX][newY] === 0 &&
        !visited.has(key)
      ) {
        visited.add(key);
        stack.push({
          pos: { x: newX, y: newY },
          path: [...path, { x: newX, y: newY }],
        });
      }
    }
  }

  return null;
}

// 0 表示通路，1 表示墙壁
const maze = [
  [0, 1, 0, 0, 0],
  [0, 1, 0, 1, 0],
  [0, 0, 0, 1, 0],
  [0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0],
];

const start = { x: 0, y: 0 };
const end = { x: 4, y: 4 };

const solution = solveMaze(maze, start, end);
console.log('迷宫路径:', solution);
```

### 函数调用追踪

```typescript
import { Stack } from '@scxfe/util';

class FunctionCallTracker {
  private callStack = new Stack<string>();

  enterFunction(name: string): void {
    const indent = '  '.repeat(this.callStack.size);
    this.callStack.push(name);
    console.log(`${indent}进入: ${name}`);
  }

  exitFunction(): void {
    const name = this.callStack.pop();
    const indent = '  '.repeat(this.callStack.size);
    console.log(`${indent}退出: ${name}`);
  }

  getCurrentDepth(): number {
    return this.callStack.size;
  }
}

function functionA(tracker: FunctionCallTracker): void {
  tracker.enterFunction('functionA');
  functionB(tracker);
  tracker.exitFunction();
}

function functionB(tracker: FunctionCallTracker): void {
  tracker.enterFunction('functionB');
  functionC(tracker);
  tracker.exitFunction();
}

function functionC(tracker: FunctionCallTracker): void {
  tracker.enterFunction('functionC');
  console.log('  执行 functionC');
  tracker.exitFunction();
}

const tracker = new FunctionCallTracker();

functionA(tracker);

// 输出:
// 进入: functionA
//   进入: functionB
//     进入: functionC
//       执行 functionC
//     退出: functionC
//   退出: functionB
// 退出: functionA
```
