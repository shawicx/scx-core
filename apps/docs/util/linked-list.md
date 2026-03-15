---
group:
  title: 数据结构
  order: 1
toc: content
---

LinkedList 是一种单向链表数据结构，每个节点包含一个值和指向下一个节点的指针。

## LinkedList 类

单向链表实现，支持基本的增删改查操作。

```typescript
class LinkedList<T> {
  constructor();

  get size(): number;
  get head(): LinkedNode<T> | null;
  get tail(): LinkedNode<T> | null;
  get values(): T[];

  insertAt(index: number, value: T): void;
  insertFirst(value: T): void;
  insertLast(value: T): void;

  getAt(index: number): LinkedNode<T> | null;
  removeAt(index: number): LinkedNode<T> | null;
  removeFirst(): LinkedNode<T> | null;
  removeLast(): LinkedNode<T> | null;

  indexOf(value: T): number;
  contains(value: T): boolean;

  clear(): void;
  reverse(): void;
  isEmpty(): boolean;
  toArray(): T[];

  [Symbol.iterator](): IterableIterator<LinkedNode<T>>;
}

interface LinkedNode<T> {
  value: T;
  next: LinkedNode<T> | null;
}
```

---

## 构造函数

```typescript
new LinkedList<T>();
```

创建一个空的单向链表。

**示例**

```typescript
const list = new LinkedList<number>();
```

---

## size - 链表长度

获取链表中节点的数量。

```typescript
get size(): number
```

**返回值**

- `number` - 返回链表长度

**示例**

```typescript
const list = new LinkedList<number>();
list.insertLast(1);
list.insertLast(2);
list.insertLast(3);

console.log(list.size); // 3
```

---

## head - 头节点

获取链表的第一个节点。

```typescript
get head(): LinkedNode<T> | null
```

**返回值**

- `LinkedNode<T> | null` - 返回头节点，链表为空时返回 `null`

**示例**

```typescript
const list = new LinkedList<number>();
list.insertLast(1);
list.insertLast(2);

console.log(list.head?.value); // 1
```

---

## tail - 尾节点

获取链表的最后一个节点。

```typescript
get tail(): LinkedNode<T> | null
```

**返回值**

- `LinkedNode<T> | null` - 返回尾节点，链表为空时返回 `null`

**示例**

```typescript
const list = new LinkedList<number>();
list.insertLast(1);
list.insertLast(2);

console.log(list.tail?.value); // 2
```

---

## values - 获取所有值

获取链表中所有节点的值组成的数组。

```typescript
get values(): T[]
```

**返回值**

- `T[]` - 返回包含所有值的数组

**示例**

```typescript
const list = new LinkedList<number>();
list.insertLast(1);
list.insertLast(2);
list.insertLast(3);

console.log(list.values); // [1, 2, 3]
```

---

## insertAt - 在指定位置插入

在链表的指定位置插入一个新节点。

```typescript
insertAt(index: number, value: T): void
```

**参数**

- `index` - 插入位置（0-based）
- `value` - 要插入的值

**异常**

- 当 `index` 超出范围时抛出错误

**示例**

```typescript
const list = new LinkedList<number>();
list.insertLast(1);
list.insertLast(3);

list.insertAt(1, 2);

console.log(list.values); // [1, 2, 3]

list.insertAt(0, 0);
console.log(list.values); // [0, 1, 2, 3]

list.insertAt(4, 4);
console.log(list.values); // [0, 1, 2, 3, 4]
```

---

## insertFirst - 在头部插入

在链表的头部插入一个新节点。

```typescript
insertFirst(value: T): void
```

**参数**

- `value` - 要插入的值

**示例**

```typescript
const list = new LinkedList<number>();
list.insertFirst(3);
list.insertFirst(2);
list.insertFirst(1);

console.log(list.values); // [1, 2, 3]
```

---

## insertLast - 在尾部插入

在链表的尾部插入一个新节点。

```typescript
insertLast(value: T): void
```

**参数**

- `value` - 要插入的值

**示例**

```typescript
const list = new LinkedList<number>();
list.insertLast(1);
list.insertLast(2);
list.insertLast(3);

console.log(list.values); // [1, 2, 3]
```

---

## getAt - 获取指定位置的节点

获取链表中指定位置的节点。

```typescript
getAt(index: number): LinkedNode<T> | null
```

**参数**

- `index` - 节点位置（0-based）

**返回值**

- `LinkedNode<T> | null` - 返回指定位置的节点，位置无效时返回 `null`

**示例**

```typescript
const list = new LinkedList<number>();
list.insertLast(1);
list.insertLast(2);
list.insertLast(3);

const node = list.getAt(1);
console.log(node?.value); // 2

console.log(list.getAt(10)); // null
```

---

## removeAt - 删除指定位置的节点

删除链表中指定位置的节点。

```typescript
removeAt(index: number): LinkedNode<T> | null
```

**参数**

- `index` - 节点位置（0-based）

**返回值**

- `LinkedNode<T> | null` - 返回被删除的节点，位置无效时返回 `null`

**示例**

```typescript
const list = new LinkedList<number>();
list.insertLast(1);
list.insertLast(2);
list.insertLast(3);

const removed = list.removeAt(1);
console.log(removed?.value); // 2
console.log(list.values); // [1, 3]
```

---

## removeFirst - 删除头节点

删除链表的头节点。

```typescript
removeFirst(): LinkedNode<T> | null
```

**返回值**

- `LinkedNode<T> | null` - 返回被删除的头节点，链表为空时返回 `null`

**示例**

```typescript
const list = new LinkedList<number>();
list.insertLast(1);
list.insertLast(2);
list.insertLast(3);

const removed = list.removeFirst();
console.log(removed?.value); // 1
console.log(list.values); // [2, 3]
```

---

## removeLast - 删除尾节点

删除链表的尾节点。

```typescript
removeLast(): LinkedNode<T> | null
```

**返回值**

- `LinkedNode<T> | null` - 返回被删除的尾节点，链表为空时返回 `null`

**示例**

```typescript
const list = new LinkedList<number>();
list.insertLast(1);
list.insertLast(2);
list.insertLast(3);

const removed = list.removeLast();
console.log(removed?.value); // 3
console.log(list.values); // [1, 2]
```

---

## indexOf - 查找值的索引

查找指定值在链表中的索引位置。

```typescript
indexOf(value: T): number
```

**参数**

- `value` - 要查找的值

**返回值**

- `number` - 返回值的索引，未找到返回 `-1`

**示例**

```typescript
const list = new LinkedList<number>();
list.insertLast(1);
list.insertLast(2);
list.insertLast(3);

console.log(list.indexOf(2)); // 1
console.log(list.indexOf(4)); // -1
```

---

## contains - 检查是否包含值

检查链表是否包含指定的值。

```typescript
contains(value: T): boolean
```

**参数**

- `value` - 要检查的值

**返回值**

- `boolean` - 返回 `true` 表示包含，返回 `false` 表示不包含

**示例**

```typescript
const list = new LinkedList<number>();
list.insertLast(1);
list.insertLast(2);
list.insertLast(3);

console.log(list.contains(2)); // true
console.log(list.contains(4)); // false
```

---

## clear - 清空链表

清空链表中的所有节点。

```typescript
clear(): void
```

**示例**

```typescript
const list = new LinkedList<number>();
list.insertLast(1);
list.insertLast(2);

console.log(list.size); // 2

list.clear();

console.log(list.size); // 0
console.log(list.isEmpty()); // true
```

---

## reverse - 反转链表

反转链表中所有节点的顺序。

```typescript
reverse(): void
```

**示例**

```typescript
const list = new LinkedList<number>();
list.insertLast(1);
list.insertLast(2);
list.insertLast(3);

console.log(list.values); // [1, 2, 3]

list.reverse();

console.log(list.values); // [3, 2, 1]
```

---

## isEmpty - 检查是否为空

检查链表是否为空。

```typescript
isEmpty(): boolean
```

**返回值**

- `boolean` - 返回 `true` 表示链表为空，返回 `false` 表示链表不为空

**示例**

```typescript
const list = new LinkedList<number>();

console.log(list.isEmpty()); // true

list.insertLast(1);

console.log(list.isEmpty()); // false
```

---

## toArray - 转换为数组

将链表转换为数组。

```typescript
toArray(): T[]
```

**返回值**

- `T[]` - 返回包含所有值的数组

**示例**

```typescript
const list = new LinkedList<number>();
list.insertLast(1);
list.insertLast(2);
list.insertLast(3);

const array = list.toArray();
console.log(array); // [1, 2, 3]
```

---

## 迭代器

链表实现了 `Symbol.iterator`，可以使用 `for...of` 循环遍历。

**示例**

```typescript
const list = new LinkedList<number>();
list.insertLast(1);
list.insertLast(2);
list.insertLast(3);

for (const node of list) {
  console.log(node.value);
}

// 输出：
// 1
// 2
// 3
```

---

## 综合示例

### 实现一个简单的任务队列

```typescript
import { LinkedList } from '@scxfe/util';

interface Task {
  id: number;
  name: string;
  completed: boolean;
}

class TaskQueue {
  private tasks = new LinkedList<Task>();
  private nextId = 1;

  addTask(name: string): void {
    const task: Task = {
      id: this.nextId++,
      name,
      completed: false,
    };
    this.tasks.insertLast(task);
  }

  removeTask(id: number): boolean {
    const index = this.tasks.indexOf(this.tasks.toArray().find((t) => t.id === id)!);
    if (index === -1) return false;
    this.tasks.removeAt(index);
    return true;
  }

  completeTask(id: number): boolean {
    for (const node of this.tasks) {
      if (node.value.id === id) {
        node.value.completed = true;
        return true;
      }
    }
    return false;
  }

  listTasks(): Task[] {
    return this.tasks.toArray();
  }
}

const queue = new TaskQueue();
queue.addTask('完成文档');
queue.addTask('代码审查');
queue.addTask('提交代码');

console.log(queue.listTasks());

queue.completeTask(1);

console.log(queue.listTasks());
```

### 实现一个撤销/重做功能

```typescript
import { LinkedList } from '@scxfe/util';

class UndoRedoManager<T> {
  private history = new LinkedList<T[]>();
  private currentIndex = 0;

  addState(state: T[]): void {
    // 删除当前位置之后的所有状态
    while (this.history.size > currentIndex + 1) {
      this.history.removeLast();
    }

    this.history.insertLast([...state]);
    this.currentIndex++;
  }

  undo(): T[] | null {
    if (this.currentIndex <= 0) return null;
    this.currentIndex--;
    return this.history.toArray()[this.currentIndex];
  }

  redo(): T[] | null {
    if (this.currentIndex >= this.history.size - 1) return null;
    this.currentIndex++;
    return this.history.toArray()[this.currentIndex];
  }

  getCurrent(): T[] | null {
    const states = this.history.toArray();
    return states[this.currentIndex] || null;
  }
}

const manager = new UndoRedoManager<number[]>();

manager.addState([1, 2, 3]);
manager.addState([1, 2, 3, 4]);
manager.addState([1, 2, 3, 4, 5]);

console.log(manager.getCurrent()); // [1, 2, 3, 4, 5]

console.log(manager.undo()); // [1, 2, 3, 4]
console.log(manager.undo()); // [1, 2, 3]

console.log(manager.redo()); // [1, 2, 3, 4]
```

---

# DoublyLinkedList - 双向链表

DoublyLinkedList 是一种双向链表数据结构，每个节点包含一个值、指向前一个节点的指针和指向后一个节点的指针。相比单向链表，双向链表支持双向遍历，某些操作效率更高。

## DoublyLinkedList 类

双向链表实现，支持基本的增删改查操作，以及反向遍历。

```typescript
class DoublyLinkedList<T> {
  constructor();

  get size(): number;
  get head(): DoublyLinkedNode<T> | null;
  get tail(): DoublyLinkedNode<T> | null;
  get values(): T[];

  insertAt(index: number, value: T): void;
  insertFirst(value: T): void;
  insertLast(value: T): void;

  getAt(index: number): DoublyLinkedNode<T> | null;
  removeAt(index: number): DoublyLinkedNode<T> | null;
  removeFirst(): DoublyLinkedNode<T> | null;
  removeLast(): DoublyLinkedNode<T> | null;

  indexOf(value: T): number;
  contains(value: T): boolean;

  clear(): void;
  reverse(): void;
  isEmpty(): boolean;
  toArray(): T[];

  reverseIterator(): IterableIterator<DoublyLinkedNode<T>>;
  [Symbol.iterator](): IterableIterator<DoublyLinkedNode<T>>;
}

interface DoublyLinkedNode<T> {
  value: T;
  next: DoublyLinkedNode<T> | null;
  previous: DoublyLinkedNode<T> | null;
}
```

## 构造函数

```typescript
new DoublyLinkedList<T>();
```

创建一个空的双向链表。

**示例**

```typescript
const list = new DoublyLinkedList<number>();
```

## size - 链表长度

获取链表中节点的数量。

```typescript
get size(): number
```

**返回值**

- `number` - 返回链表长度

## head - 头节点

获取链表的第一个节点。

```typescript
get head(): DoublyLinkedNode<T> | null
```

**返回值**

- `DoublyLinkedNode<T> | null` - 返回头节点，链表为空时返回 `null`

## tail - 尾节点

获取链表的最后一个节点。

```typescript
get tail(): DoublyLinkedNode<T> | null
```

**返回值**

- `DoublyLinkedNode<T> | null` - 返回尾节点，链表为空时返回 `null`

## values - 获取所有值

获取链表中所有节点的值组成的数组。

```typescript
get values(): T[]
```

**返回值**

- `T[]` - 返回包含所有值的数组

## insertAt - 在指定位置插入

在链表的指定位置插入一个新节点。

```typescript
insertAt(index: number, value: T): void
```

**参数**

- `index` - 插入位置（0-based）
- `value` - 要插入的值

**异常**

- 当 `index` 超出范围时抛出错误

**示例**

```typescript
const list = new DoublyLinkedList<number>();
list.insertLast(1);
list.insertLast(3);

list.insertAt(1, 2);
console.log(list.values); // [1, 2, 3]
```

## insertFirst - 在头部插入

在链表的头部插入一个新节点。

```typescript
insertFirst(value: T): void
```

**参数**

- `value` - 要插入的值

## insertLast - 在尾部插入

在链表的尾部插入一个新节点。

```typescript
insertLast(value: T): void
```

**参数**

- `value` - 要插入的值

## getAt - 获取指定位置的节点

获取链表中指定位置的节点。

```typescript
getAt(index: number): DoublyLinkedNode<T> | null
```

**参数**

- `index` - 节点位置（0-based）

**返回值**

- `DoublyLinkedNode<T> | null` - 返回指定位置的节点，位置无效时返回 `null`

**说明**

- 使用优化的算法，从较近的一端开始查找

## removeAt - 删除指定位置的节点

删除链表中指定位置的节点。

```typescript
removeAt(index: number): DoublyLinkedNode<T> | null
```

**参数**

- `index` - 节点位置（0-based）

**返回值**

- `DoublyLinkedNode<T> | null` - 返回被删除的节点，位置无效时返回 `null`

## removeFirst - 删除头节点

删除链表的头节点。

```typescript
removeFirst(): DoublyLinkedNode<T> | null
```

**返回值**

- `DoublyLinkedNode<T> | null` - 返回被删除的头节点，链表为空时返回 `null`

## removeLast - 删除尾节点

删除链表的尾节点。

```typescript
removeLast(): DoublyLinkedNode<T> | null
```

**返回值**

- `DoublyLinkedNode<T> | null` - 返回被删除的尾节点，链表为空时返回 `null`

## indexOf - 查找值的索引

查找指定值在链表中的索引位置。

```typescript
indexOf(value: T): number
```

**参数**

- `value` - 要查找的值

**返回值**

- `number` - 返回值的索引，未找到返回 `-1`

## contains - 检查是否包含值

检查链表是否包含指定的值。

```typescript
contains(value: T): boolean
```

**参数**

- `value` - 要检查的值

**返回值**

- `boolean` - 返回 `true` 表示包含，返回 `false` 表示不包含

## clear - 清空链表

清空链表中的所有节点。

```typescript
clear(): void
```

## reverse - 反转链表

反转链表中所有节点的顺序。

```typescript
reverse(): void
```

**示例**

```typescript
const list = new DoublyLinkedList<number>();
list.insertLast(1);
list.insertLast(2);
list.insertLast(3);

console.log(list.values); // [1, 2, 3]

list.reverse();

console.log(list.values); // [3, 2, 1]
```

## isEmpty - 检查是否为空

检查链表是否为空。

```typescript
isEmpty(): boolean
```

**返回值**

- `boolean` - 返回 `true` 表示链表为空，返回 `false` 表示链表不为空

## toArray - 转换为数组

将链表转换为数组。

```typescript
toArray(): T[]
```

**返回值**

- `T[]` - 返回包含所有值的数组

## 迭代器

### 正向迭代器

链表实现了 `Symbol.iterator`，可以使用 `for...of` 循环遍历。

```typescript
const list = new DoublyLinkedList<number>();
list.insertLast(1);
list.insertLast(2);
list.insertLast(3);

for (const node of list) {
  console.log(node.value);
}

// 输出：
// 1
// 2
// 3
```

### 反向迭代器

使用 `reverseIterator()` 从尾部开始遍历。

```typescript
for (const node of list.reverseIterator()) {
  console.log(node.value);
}

// 输出：
// 3
// 2
// 1
```

## 与单向链表的对比

### 双向链表的优势

1. **双向遍历** - 可以从前向后或从后向前遍历
2. **更高的删除效率** - 删除尾节点时不需要遍历整个链表
3. **更好的缓存性能** - 从较近的一端开始查找

### 双向链表的劣势

1. **更大的内存开销** - 每个节点需要存储前驱和后继两个指针
2. **更多的指针操作** - 插入和删除时需要更新两个指针

### 使用场景

- 需要频繁从两端访问数据
- 需要反向遍历
- 实现撤销/重做功能
- 实现文本编辑器的光标移动

## 综合示例

### 实现一个浏览器历史记录

```typescript
import { DoublyLinkedList } from '@scxfe/util';

interface HistoryItem {
  url: string;
  timestamp: number;
}

class BrowserHistory {
  private history = new DoublyLinkedList<HistoryItem>();
  private current: DoublyLinkedNode<HistoryItem> | null = null;

  visit(url: string): void {
    const item: HistoryItem = {
      url,
      timestamp: Date.now(),
    };

    // 删除当前位置之后的所有历史记录
    if (this.current) {
      let node = this.current.next;
      while (node) {
        const next = node.next;
        this.history.removeAt(this.history.indexOf(node.value));
        node = next;
      }
    }

    this.history.insertLast(item);
    this.current = this.history.tail;
  }

  back(): HistoryItem | null {
    if (this.current && this.current.previous) {
      this.current = this.current.previous;
      return this.current.value;
    }
    return null;
  }

  forward(): HistoryItem | null {
    if (this.current && this.current.next) {
      this.current = this.current.next;
      return this.current.value;
    }
    return null;
  }

  getCurrent(): HistoryItem | null {
    return this.current?.value || null;
  }

  getBackwardHistory(): HistoryItem[] {
    const history: HistoryItem[] = [];
    let node = this.current?.previous || null;
    while (node) {
      history.push(node.value);
      node = node.previous;
    }
    return history;
  }

  getForwardHistory(): HistoryItem[] {
    const history: HistoryItem[] = [];
    let node = this.current?.next || null;
    while (node) {
      history.push(node.value);
      node = node.next;
    }
    return history;
  }
}

const history = new BrowserHistory();

history.visit('https://example.com');
history.visit('https://example.com/page1');
history.visit('https://example.com/page2');

console.log(history.getCurrent()); // page2

console.log(history.back()); // page1
console.log(history.getCurrent()); // page1

console.log(history.forward()); // page2
console.log(history.getCurrent()); // page2

console.log(history.getBackwardHistory()); // [page1, home]
console.log(history.getForwardHistory()); // []
```

### 实现一个音乐播放列表

```typescript
import { DoublyLinkedList } from '@scxfe/util';

interface Song {
  id: string;
  title: string;
  artist: string;
}

class MusicPlayer {
  private playlist = new DoublyLinkedList<Song>();
  private current: DoublyLinkedNode<Song> | null = null;
  private isPlaying = false;

  addSong(song: Song): void {
    this.playlist.insertLast(song);
  }

  playNext(): Song | null {
    if (!this.current) {
      this.current = this.playlist.head;
    } else {
      this.current = this.current.next;
    }

    if (this.current) {
      this.isPlaying = true;
      return this.current.value;
    }
    return null;
  }

  playPrevious(): Song | null {
    if (this.current && this.current.previous) {
      this.current = this.current.previous;
      this.isPlaying = true;
      return this.current.value;
    }
    return null;
  }

  getCurrentSong(): Song | null {
    return this.current?.value || null;
  }

  removeSong(id: string): boolean {
    const index = this.playlist.toArray().findIndex((s) => s.id === id);
    if (index === -1) return false;

    const removed = this.playlist.removeAt(index);

    // 如果删除的是当前歌曲，切换到下一首
    if (removed && this.current?.value.id === id) {
      this.current = this.current.next || this.playlist.tail;
    }

    return true;
  }

  shuffle(): void {
    const songs = this.playlist.toArray();
    for (let i = songs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [songs[i], songs[j]] = [songs[j], songs[i]];
    }

    this.playlist.clear();
    songs.forEach((song) => this.playlist.insertLast(song));
    this.current = this.playlist.head;
  }
}

const player = new MusicPlayer();

player.addSong({ id: '1', title: 'Song 1', artist: 'Artist A' });
player.addSong({ id: '2', title: 'Song 2', artist: 'Artist B' });
player.addSong({ id: '3', title: 'Song 3', artist: 'Artist C' });

console.log(player.playNext()); // Song 1
console.log(player.playNext()); // Song 2

console.log(player.playPrevious()); // Song 1

player.shuffle();
console.log(player.getCurrentSong()); // 随机歌曲
```
