---
group:
  title: 数据结构
  order: 1
toc: content
---

Queue（队列）是一种先进先出（FIFO）的数据结构，元素从一端（队尾）进入，从另一端（队头）离开。

## Queue 类

```typescript
class Queue<T> {
  constructor();

  get isEmpty(): boolean;
  get size(): number;

  enqueue(item: T): void;
  dequeue(): T | undefined;
  peek(): T | undefined;
}
```

---

## 构造函数

```typescript
new Queue<T>();
```

创建一个空队列。

**示例**

```typescript
const queue = new Queue<number>();
```

---

## isEmpty - 是否为空

检查队列是否为空。

```typescript
get isEmpty(): boolean
```

**返回值**

- `boolean` - 返回 `true` 表示队列为空，返回 `false` 表示队列不为空

**示例**

```typescript
const queue = new Queue<number>();

console.log(queue.isEmpty); // true

queue.enqueue(1);

console.log(queue.isEmpty); // false
```

---

## size - 队列长度

获取队列中元素的数量。

```typescript
get size(): number
```

**返回值**

- `number` - 返回队列长度

**示例**

```typescript
const queue = new Queue<number>();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);

console.log(queue.size); // 3
```

---

## enqueue - 入列

将元素添加到队列尾部。

```typescript
enqueue(item: T): void
```

**参数**

- `item` - 要添加的元素

**示例**

```typescript
const queue = new Queue<string>();

queue.enqueue('任务1');
queue.enqueue('任务2');
queue.enqueue('任务3');

console.log(queue.size); // 3
```

---

## dequeue - 出列

从队列头部移除并返回元素。

```typescript
dequeue(): T | undefined
```

**返回值**

- `T | undefined` - 返回队头的元素，队列为空时返回 `undefined`

**示例**

```typescript
const queue = new Queue<number>();

queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);

console.log(queue.dequeue()); // 1
console.log(queue.dequeue()); // 2
console.log(queue.size); // 1
```

---

## peek - 查看队头元素

查看队头的元素，但不移除它。

```typescript
peek(): T | undefined
```

**返回值**

- `T | undefined` - 返回队头的元素，队列为空时返回 `undefined`

**示例**

```typescript
const queue = new Queue<number>();

queue.enqueue(1);
queue.enqueue(2);

console.log(queue.peek()); // 1
console.log(queue.size); // 2（元素未被移除）

queue.dequeue();

console.log(queue.peek()); // 2
```

---

## 综合示例

### 任务调度器

```typescript
import { Queue } from '@scxfe/util';

interface Task {
  id: number;
  name: string;
  execute: () => void;
}

class TaskScheduler {
  private queue = new Queue<Task>();
  private nextId = 1;

  addTask(name: string, execute: () => void): number {
    const task: Task = {
      id: this.nextId++,
      name,
      execute,
    };
    this.queue.enqueue(task);
    return task.id;
  }

  runNext(): boolean {
    const task = this.queue.dequeue();
    if (!task) return false;

    console.log(`执行任务: ${task.name}`);
    task.execute();
    return true;
  }

  runAll(): void {
    while (this.runNext()) {
      // 继续执行直到队列为空
    }
  }

  peekNext(): Task | undefined {
    return this.queue.peek();
  }

  getPendingCount(): number {
    return this.queue.size;
  }
}

const scheduler = new TaskScheduler();

scheduler.addTask('下载文件', () => {
  console.log('文件下载完成');
});

scheduler.addTask('处理数据', () => {
  console.log('数据处理完成');
});

scheduler.addTask('保存结果', () => {
  console.log('结果保存完成');
});

console.log(`待执行任务数: ${scheduler.getPendingCount()}`);
// 待执行任务数: 3

scheduler.runNext();
// 执行任务: 下载文件
// 文件下载完成

scheduler.runAll();
// 执行任务: 处理数据
// 数据处理完成
// 执行任务: 保存结果
// 结果保存完成
```

### 打印队列系统

```typescript
import { Queue } from '@scxfe/util';

interface PrintJob {
  id: number;
  document: string;
  priority: number;
}

class PrintQueue {
  private queue = new Queue<PrintJob>();
  private jobId = 1;

  addPrintJob(document: string, priority: number = 1): number {
    const job: PrintJob = {
      id: this.jobId++,
      document,
      priority,
    };
    this.queue.enqueue(job);
    return job.id;
  }

  processNextJob(): void {
    const job = this.queue.dequeue();
    if (!job) {
      console.log('打印队列为空');
      return;
    }

    console.log(`正在打印: ${job.document} (优先级: ${job.priority})`);
  }

  getJobCount(): number {
    return this.queue.size;
  }

  viewNextJob(): PrintJob | undefined {
    return this.queue.peek();
  }
}

const printer = new PrintQueue();

printer.addPrintJob('文档1.pdf', 1);
printer.addPrintJob('文档2.docx', 2);
printer.addPrintJob('文档3.txt', 1);

console.log(`待打印文档数: ${printer.getJobCount()}`);

const nextJob = printer.viewNextJob();
console.log(`下一个打印任务: ${nextJob?.document}`);

printer.processNextJob();
printer.processNextJob();
printer.processNextJob();
printer.processNextJob(); // 打印队列为空
```

### 消息队列模拟

```typescript
import { Queue } from '@scxfe/util';

interface Message {
  id: string;
  content: string;
  timestamp: number;
}

class MessageQueue {
  private queue = new Queue<Message>();

  publish(content: string): void {
    const message: Message = {
      id: `msg_${Date.now()}_${Math.random()}`,
      content,
      timestamp: Date.now(),
    };
    this.queue.enqueue(message);
    console.log(`发布消息: ${content}`);
  }

  consume(): Message | undefined {
    const message = this.queue.dequeue();
    if (message) {
      console.log(`消费消息: ${message.content}`);
    }
    return message;
  }

  peek(): Message | undefined {
    return this.queue.peek();
  }

  getMessageCount(): number {
    return this.queue.size;
  }

  isEmpty(): boolean {
    return this.queue.isEmpty;
  }
}

const mq = new MessageQueue();

mq.publish('第一条消息');
mq.publish('第二条消息');
mq.publish('第三条消息');

console.log(`队列中的消息数: ${mq.getMessageCount()}`);

while (!mq.isEmpty()) {
  mq.consume();
}
```

### 广度优先搜索（BFS）

```typescript
import { Queue } from '@scxfe/util';

// 图的邻接表表示
const graph = {
  A: ['B', 'C'],
  B: ['A', 'D', 'E'],
  C: ['A', 'F'],
  D: ['B'],
  E: ['B', 'F'],
  F: ['C', 'E'],
};

function bfs(start: string, target: string): string[] | null {
  const visited = new Set<string>();
  const queue = new Queue<string>();
  const path = new Map<string, string>();

  queue.enqueue(start);
  visited.add(start);

  while (!queue.isEmpty) {
    const current = queue.dequeue();

    if (current === target) {
      const result: string[] = [];
      let node = target;
      while (node) {
        result.unshift(node);
        node = path.get(node)!;
      }
      return result;
    }

    const neighbors = graph[current as keyof typeof graph];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        path.set(neighbor, current);
        queue.enqueue(neighbor);
      }
    }
  }

  return null;
}

const path = bfs('A', 'F');
console.log('从 A 到 F 的最短路径:', path);
// 从 A 到 F 的最短路径: ['A', 'C', 'F']
```

### 客户服务热线

```typescript
import { Queue } from '@scxfe/util';

interface Customer {
  id: number;
  name: string;
  issue: string;
  waitTime: number;
}

class CustomerService {
  private queue = new Queue<Customer>();
  private nextId = 1;

  joinQueue(name: string, issue: string): number {
    const customer: Customer = {
      id: this.nextId++,
      name,
      issue,
      waitTime: 0,
    };
    this.queue.enqueue(customer);
    console.log(`${name} 已加入等待队列，问题: ${issue}`);
    return customer.id;
  }

  serveNext(): void {
    const customer = this.queue.dequeue();
    if (!customer) {
      console.log('没有等待的客户');
      return;
    }

    console.log(`正在为 ${customer.name} 提供服务，问题: ${customer.issue}`);
    console.log(`等待时间: ${customer.waitTime} 分钟`);
  }

  getQueueSize(): number {
    return this.queue.size;
  }

  viewNextCustomer(): Customer | undefined {
    return this.queue.peek();
  }
}

const service = new CustomerService();

service.joinQueue('张三', '账号登录问题');
service.joinQueue('李四', '订单退款');
service.joinQueue('王五', '产品咨询');

console.log(`等待人数: ${service.getQueueSize()}`);

const next = service.viewNextCustomer();
console.log(`下一个服务客户: ${next?.name}`);

service.serveNext();
service.serveNext();
service.serveNext();
service.serveNext(); // 没有等待的客户
```
