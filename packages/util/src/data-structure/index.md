---
group:
  title: 数据结构
title: 基本结构
toc: content
---

### 双链表 DoublyLinkedList

```typescript
import { DoublyLinkedList } from '@scxfe/util';

const list = new DoublyLinkedList();

list.insertFirst(1);
list.insertFirst(2);
list.insertFirst(3);
list.insertLast(4);
list.insertAt(3, 5);

list.size; // 5
list.head.value; // 3
list.head.next.value; // 2
list.tail.value; // 4
list.tail.previous.value; // 5
[...list.map((e) => e.value)]; // [3, 2, 1, 5, 4]

list.removeAt(1); // 2
list.getAt(1).value; // 1
list.head.next.value; // 1
[...list.map((e) => e.value)]; // [3, 1, 5, 4]

list.reverse();
[...list.map((e) => e.value)]; // [4, 5, 1, 3]

list.clear();
list.size; // 0
```

### 链表 LinkedList

```typescript
import { LinkedList } from '@scxfe/util';

const list = new LinkedList();

list.insertFirst(1);
list.insertFirst(2);
list.insertFirst(3);
list.insertLast(4);
list.insertAt(3, 5);

list.size; // 5
list.head.value; // 3
list.head.next.value; // 2
list.tail.value; // 4
[...list.map((e) => e.value)]; // [3, 2, 1, 5, 4]

list.removeAt(1); // 2
list.getAt(1).value; // 1
list.head.next.value; // 1
[...list.map((e) => e.value)]; // [3, 1, 5, 4]

list.reverse();
[...list.map((e) => e.value)]; // [4, 5, 1, 3]

list.clear();
list.size; // 0
```

### 队列 Queue

```typescript
import { Queue } from '@scxfe/util';

const queue = new Queue();

queue.isEmpty(); // true

queue.enqueue('A');
queue.enqueue('B');
queue.enqueue('C');
queue.enqueue('D');
queue.enqueue('E');

queue.isEmpty(); // false

queue.peek(); // 'A'

queue.dequeue(); // 'A'
queue.dequeue(); // 'B'
queue.dequeue(); // 'C'
```

### 栈 Stack

```typescript
import { Stack } from '@scxfe/util';

const stack = new Stack();

stack.push('apples');
stack.push('oranges');
stack.push('pears');

stack.isEmpty(); // false

stack.peek(); // 'pears'

stack.pop(); // 'pears'
stack.pop(); // 'oranges'
stack.pop(); // 'apples'

stack.isEmpty(); // true
```
