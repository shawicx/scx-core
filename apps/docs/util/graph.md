---
group:
  title: 数据结构
  order: 1
toc: content
---

Graph（图）是一种由节点（顶点）和边组成的数据结构，用于表示网络、关系等复杂结构。本库支持有向图和无向图，提供了丰富的图算法实现。

## Graph 类

```typescript
class Graph<T = any> {
  constructor(directed?: boolean);

  directed: boolean;
  nodes: Array<{ key: T; value: T }>;
  edges: Map<string, { a: T; b: T; weight: number }>;

  addNode(key: T, value?: T): void;
  removeNode(key: T): void;
  findNode(key: T): { key: T; value: T } | undefined;

  addEdge(a: T, b: T, weight: number): void;
  removeEdge(a: T, b: T): void;
  hasEdge(a: T, b: T): boolean;
  setEdgeWeight(a: T, b: T, weight: number): void;
  getEdgeWeight(a: T, b: T): number | undefined;

  adjacent(key: T): T[];
  inDegree(key: T): number;
  outDegree(key: T): number;

  getNodes(): T[];
  getEdges(): GraphEdge<T>[];
  get nodeCount(): number;
  get edgeCount(): number;
  isEmpty(): boolean;

  dfs(startKey: T): TraversalResult<T>;
  bfs(startKey: T): TraversalResult<T>;
  findPath(startKey: T, endKey: T): T[] | null;
  shortestPath(startKey: T, endKey: T): ShortestPathResult<T>;

  hasCycle(): boolean;
  topologicalSort(): T[] | null;
  getConnectedComponents(): T[][];
  isConnected(): boolean;

  clear(): void;
  clone(): Graph<T>;
}

interface GraphEdge<T> {
  a: T;
  b: T;
  weight: number;
}

interface TraversalResult<T> {
  path: T[];
  visited: Set<T>;
}

interface ShortestPathResult<T> {
  distance: number;
  path: T[];
  found: boolean;
}
```

---

## 构造函数

```typescript
new Graph<T>(directed?: boolean)
```

创建一个图。

**参数**

- `directed` - 是否为有向图，默认为 `true`

**示例**

```typescript
// 有向图
const directedGraph = new Graph<string>(true);

// 无向图
const undirectedGraph = new Graph<string>(false);
```

---

## addNode - 添加节点

```typescript
addNode(key: T, value?: T): void
```

向图中添加一个节点。

**参数**

- `key` - 节点的唯一标识
- `value` - 节点存储的值，默认与 key 相同

**示例**

```typescript
const graph = new Graph<string>();
graph.addNode('A');
graph.addNode('B', '节点 B');
graph.addNode('C');
```

---

## removeNode - 删除节点

```typescript
removeNode(key: T): void
```

删除图中的节点及其相关联的所有边。

**参数**

- `key` - 要删除的节点键

**示例**

```typescript
graph.addNode('A');
graph.addNode('B');
graph.addEdge('A', 'B', 1);

graph.removeNode('A');
console.log(graph.findNode('A')); // undefined
```

---

## findNode - 查找节点

```typescript
findNode(key: T): { key: T; value: T } | undefined
```

查找图中的节点。

**参数**

- `key` - 要查找的节点键

**返回值**

- 节点对象或 `undefined`

---

## addEdge - 添加边

```typescript
addEdge(a: T, b: T, weight: number): void
```

向图中添加一条边。

**参数**

- `a` - 起始节点
- `b` - 目标节点
- `weight` - 边的权重

**说明**

- 如果图是无向的，会自动添加一条对称边

**示例**

```typescript
const graph = new Graph<string>();
graph.addNode('A');
graph.addNode('B');
graph.addEdge('A', 'B', 5);
```

---

## removeEdge - 删除边

```typescript
removeEdge(a: T, b: T): void
```

删除从节点 a 到节点 b 的边。

**参数**

- `a` - 起始节点
- `b` - 目标节点

---

## hasEdge - 检查边是否存在

```typescript
hasEdge(a: T, b: T): boolean
```

检查图中是否存在从节点 a 到节点 b 的边。

**返回值**

- `boolean` - 边存在返回 `true`

---

## setEdgeWeight - 设置边权重

```typescript
setEdgeWeight(a: T, b: T, weight: number): void
```

更新从节点 a 到节点 b 的边的权重。

---

## getEdgeWeight - 获取边权重

```typescript
getEdgeWeight(a: T, b: T): number | undefined
```

获取从节点 a 到节点 b 的边的权重。

---

## adjacent - 获取相邻节点

```typescript
adjacent(key: T): T[]
```

返回与指定节点直接相邻的所有节点。

**示例**

```typescript
const graph = new Graph<string>();
graph.addNode('A');
graph.addNode('B');
graph.addNode('C');
graph.addEdge('A', 'B', 1);
graph.addEdge('A', 'C', 2);

console.log(graph.adjacent('A')); // ['B', 'C']
```

---

## inDegree - 获取入度

```typescript
inDegree(key: T): number
```

计算节点的入度（有多少条边指向该节点）。

---

## outDegree - 获取出度

```typescript
outDegree(key: T): number
```

计算节点的出度（从该节点出发的边数）。

---

## dfs - 深度优先搜索

```typescript
dfs(startKey: T): TraversalResult<T>
```

使用深度优先搜索遍历图。

**参数**

- `startKey` - 起始节点

**返回值**

- `TraversalResult<T>` - 包含遍历路径和访问的节点集合

**示例**

```typescript
const result = graph.dfs('A');
console.log(result.path); // 遍历路径
console.log(result.visited); // 访问的节点
```

---

## bfs - 广度优先搜索

```typescript
bfs(startKey: T): TraversalResult<T>
```

使用广度优先搜索遍历图。

---

## findPath - 查找路径

```typescript
findPath(startKey: T, endKey: T): T[] | null
```

查找两个节点之间的路径。

**参数**

- `startKey` - 起始节点
- `endKey` - 目标节点

**返回值**

- `T[] | null` - 返回路径数组，找不到返回 `null`

---

## shortestPath - 最短路径

```typescript
shortestPath(startKey: T, endKey: T): ShortestPathResult<T>
```

使用 Dijkstra 算法查找两个节点之间的最短路径。

**参数**

- `startKey` - 起始节点
- `endKey` - 目标节点

**返回值**

- `ShortestPathResult<T>` - 包含距离、路径和是否找到的结果

**示例**

```typescript
const result = graph.shortestPath('A', 'D');
console.log(result.distance); // 最短距离
console.log(result.path); // 最短路径
console.log(result.found); // 是否找到
```

---

## hasCycle - 检查是否有环

```typescript
hasCycle(): boolean
```

检查图中是否存在环。

**返回值**

- `boolean` - 有环返回 `true`

---

## topologicalSort - 拓扑排序

```typescript
topologicalSort(): T[] | null
```

对图进行拓扑排序（仅适用于有向无环图）。

**返回值**

- `T[] | null` - 返回排序后的节点数组，失败返回 `null`

---

## getConnectedComponents - 获取连通分量

```typescript
getConnectedComponents(): T[][]
```

获取图的所有连通分量。

---

## isConnected - 检查是否连通

```typescript
isConnected(): boolean
```

检查图是否连通。

---

## clear - 清空图

```typescript
clear(): void
```

清空图中的所有节点和边。

---

## clone - 克隆图

```typescript
clone(): Graph<T>
```

创建图的一个副本。

---

## 综合示例

### 社交网络

```typescript
import { Graph } from '@scxfe/util';

interface Person {
  id: string;
  name: string;
}

class SocialNetwork {
  private graph = new Graph<Person>(false); // 无向图

  addPerson(person: Person): void {
    this.graph.addNode(person.id, person);
  }

  addFriendship(personId1: string, personId2: string): void {
    this.graph.addEdge(personId1, personId2, 1);
  }

  areFriends(personId1: string, personId2: string): boolean {
    return this.graph.hasEdge(personId1, personId2);
  }

  getFriends(personId: string): Person[] {
    const friendIds = this.graph.adjacent(personId);
    return friendIds
      .map((id) => this.graph.findNode(id))
      .filter((node) => node !== undefined)
      .map((node) => node!.value);
  }

  findShortestConnection(personId1: string, personId2: string): Person[] | null {
    const result = this.graph.shortestPath(personId1, personId2);
    if (!result.found) return null;

    return result.path
      .map((id) => this.graph.findNode(id))
      .filter((node) => node !== undefined)
      .map((node) => node!.value);
  }
}

const network = new SocialNetwork();

network.addPerson({ id: '1', name: '张三' });
network.addPerson({ id: '2', name: '李四' });
network.addPerson({ id: '3', name: '王五' });
network.addPerson({ id: '4', name: '赵六' });

network.addFriendship('1', '2');
network.addFriendship('2', '3');
network.addFriendship('3', '4');

console.log('张三的朋友:', network.getFriends('1'));
const path = network.findShortestConnection('1', '4');
console.log('张三到赵六的路径:', path);
```

### 地图导航

```typescript
import { Graph } from '@scxfe/util';

interface Location {
  name: string;
  lat: number;
  lng: number;
}

class NavigationSystem {
  private graph = new Graph<Location>(true);

  addLocation(location: Location): void {
    this.graph.addNode(location.name, location);
  }

  addRoad(from: string, to: string, distance: number): void {
    this.graph.addEdge(from, to, distance);
  }

  findRoute(from: string, to: string): { distance: number; path: Location[] } | null {
    const result = this.graph.shortestPath(from, to);
    if (!result.found) return null;

    const locations = result.path
      .map((name) => this.graph.findNode(name))
      .filter((node) => node !== undefined)
      .map((node) => node!.value);

    return {
      distance: result.distance,
      path: locations,
    };
  }
}

const nav = new NavigationSystem();

nav.addLocation({ name: 'A', lat: 0, lng: 0 });
nav.addLocation({ name: 'B', lat: 1, lng: 0 });
nav.addLocation({ name: 'C', lat: 0, lng: 1 });
nav.addLocation({ name: 'D', lat: 1, lng: 1 });

nav.addRoad('A', 'B', 5);
nav.addRoad('A', 'C', 3);
nav.addRoad('B', 'D', 2);
nav.addRoad('C', 'D', 4);

const route = nav.findRoute('A', 'D');
console.log('路线:', route?.path);
console.log('距离:', route?.distance);
```

### 任务依赖管理

```typescript
import { Graph } from '@scxfe/util';

interface Task {
  id: string;
  name: string;
}

class TaskDependencyManager {
  private graph = new Graph<Task>(true); // 有向图

  addTask(task: Task): void {
    this.graph.addNode(task.id, task);
  }

  addDependency(taskId: string, dependsOnId: string): void {
    this.graph.addEdge(dependsOnId, taskId, 1);
  }

  getExecutionOrder(): Task[] | null {
    const order = this.graph.topologicalSort();
    if (!order) return null; // 存在循环依赖

    return order
      .map((id) => this.graph.findNode(id))
      .filter((node) => node !== undefined)
      .map((node) => node!.value);
  }

  hasCircularDependency(): boolean {
    return this.graph.hasCycle();
  }
}

const manager = new TaskDependencyManager();

manager.addTask({ id: 'A', name: '初始化' });
manager.addTask({ id: 'B', name: '配置' });
manager.addTask({ id: 'C', name: '构建' });
manager.addTask({ id: 'D', name: '部署' });

manager.addDependency('B', 'A'); // B 依赖 A
manager.addDependency('C', 'B'); // C 依赖 B
manager.addDependency('D', 'C'); // D 依赖 C

const order = manager.getExecutionOrder();
console.log('执行顺序:', order);

console.log('是否有循环依赖:', manager.hasCircularDependency());
```

### 网络连通性检查

```typescript
import { Graph } from '@scxfe/util';

class NetworkAnalyzer {
  private graph = new Graph<string>(false);

  addServer(server: string): void {
    this.graph.addNode(server);
  }

  addConnection(server1: string, server2: string): void {
    this.graph.addEdge(server1, server2, 1);
  }

  isNetworkConnected(): boolean {
    return this.graph.isConnected();
  }

  getConnectedSubnets(): string[][] {
    return this.graph.getConnectedComponents();
  }

  canCommunicate(server1: string, server2: string): boolean {
    const path = this.graph.findPath(server1, server2);
    return path !== null;
  }
}

const analyzer = new NetworkAnalyzer();

// 添加服务器
['A', 'B', 'C', 'D', 'E', 'F'].forEach((server) => {
  analyzer.addServer(server);
});

// 添加连接
analyzer.addConnection('A', 'B');
analyzer.addConnection('B', 'C');
analyzer.addConnection('D', 'E');
analyzer.addConnection('E', 'F');

console.log('网络是否连通:', analyzer.isNetworkConnected());
console.log('子网划分:', analyzer.getConnectedSubnets());

console.log('A 能与 C 通信:', analyzer.canCommunicate('A', 'C')); // true
console.log('A 能与 D 通信:', analyzer.canCommunicate('A', 'D')); // false
```

### 课程先修关系

```typescript
import { Graph } from '@scxfe/util';

interface Course {
  code: string;
  name: string;
}

class CoursePlanner {
  private graph = new Graph<Course>(true);

  addCourse(course: Course): void {
    this.graph.addNode(course.code, course);
  }

  addPrerequisite(courseCode: string, prerequisiteCode: string): void {
    this.graph.addEdge(prerequisiteCode, courseCode, 1);
  }

  getRecommendedOrder(): Course[] | null {
    const order = this.graph.topologicalSort();
    if (!order) {
      throw new Error('课程先修关系存在循环依赖');
    }

    return order
      .map((code) => this.graph.findNode(code))
      .filter((node) => node !== undefined)
      .map((node) => node!.value);
  }

  hasInvalidPrerequisites(): boolean {
    return this.graph.hasCycle();
  }
}

const planner = new CoursePlanner();

planner.addCourse({ code: 'CS101', name: '计算机导论' });
planner.addCourse({ code: 'CS201', name: '数据结构' });
planner.addCourse({ code: 'CS202', name: '算法' });
planner.addCourse({ code: 'CS301', name: '操作系统' });
planner.addCourse({ code: 'CS302', name: '编译原理' });

planner.addPrerequisite('CS201', 'CS101');
planner.addPrerequisite('CS202', 'CS201');
planner.addPrerequisite('CS301', 'CS201');
planner.addPrerequisite('CS302', 'CS202');

const order = planner.getRecommendedOrder();
console.log('推荐选课顺序:');
order.forEach((course, index) => {
  console.log(`${index + 1}. ${course.code} - ${course.name}`);
});
```

### 最小生成树（简化版）

```typescript
import { Graph } from '@scxfe/util';

function findMinimumSpanningTree(graph: Graph<string>): Graph<string> {
  const mst = new Graph<string>(false);
  const nodes = graph.getNodes();
  const edges = graph.getEdges().sort((a, b) => a.weight - b.weight);

  // 添加所有节点
  nodes.forEach((node) => mst.addNode(node));

  const connected = new Set<string>();
  connected.add(nodes[0]);

  while (connected.size < nodes.length && edges.length > 0) {
    // 找到连接已连接节点和未连接节点的最小边
    const edge = edges.find(
      (e) =>
        (connected.has(e.a) && !connected.has(e.b)) || (!connected.has(e.a) && connected.has(e.b)),
    );

    if (edge) {
      mst.addEdge(edge.a, edge.b, edge.weight);
      connected.add(edge.a);
      connected.add(edge.b);
    }
  }

  return mst;
}

const graph = new Graph<string>(false);
['A', 'B', 'C', 'D'].forEach((node) => graph.addNode(node));
graph.addEdge('A', 'B', 4);
graph.addEdge('A', 'C', 3);
graph.addEdge('B', 'C', 1);
graph.addEdge('B', 'D', 2);
graph.addEdge('C', 'D', 4);

const mst = findMinimumSpanningTree(graph);
console.log('MST 边:', mst.getEdges());
console.log(
  'MST 总权重:',
  mst.getEdges().reduce((sum, e) => sum + e.weight, 0),
);
```
