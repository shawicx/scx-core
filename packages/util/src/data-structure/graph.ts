/*
 * @Author: shawicx d35f3153@proton.me
 * @Description: 图数据结构实现
 */

/**
 * 图的边接口
 */
export interface GraphEdge<T> {
  a: T;
  b: T;
  weight: number;
}

/**
 * 图遍历结果接口
 */
export interface TraversalResult<T> {
  path: T[];
  visited: Set<T>;
}

/**
 * 最短路径结果接口
 */
export interface ShortestPathResult<T> {
  distance: number;
  path: T[];
  found: boolean;
}

export class Graph<T = any> {
  directed: boolean;
  nodes: Array<{ key: T; value: T }>;
  edges: Map<string, { a: T; b: T; weight: number }>;

  constructor(directed = true) {
    this.directed = directed;
    this.nodes = [];
    this.edges = new Map();
  }

  /**
   * @description 向图中添加节点，key 是节点的唯一标识，value 是节点存储的值，默认情况下 value 等于 key。
   * @param key
   * @param value
   */
  addNode(key: T, value: T = key): void {
    this.nodes.push({ key, value });
  }

  /**
   * @description 向图中添加一条边，从节点 a 到节点 b，并指定边的权重 weight。如果图是无向的，还会添加一条从 b 到 a 的对称边。
   * @param a
   * @param b
   * @param weight
   */
  addEdge(a: T, b: T, weight: number): void {
    this.edges.set(JSON.stringify([a, b]), { a, b, weight });
    if (!this.directed) this.edges.set(JSON.stringify([b, a]), { a: b, b: a, weight });
  }

  /**
   * @description 删除图中的节点 key，同时删除与该节点相关的所有边。
   * @param key
   */
  removeNode(key: T): void {
    this.nodes = this.nodes.filter((n) => n.key !== key);
    [...this.edges.values()].forEach(({ a, b }) => {
      if (a === key || b === key) this.edges.delete(JSON.stringify([a, b]));
    });
  }

  /**
   * @description 删除从节点 a 到节点 b 的边。如果图是无向的，还会删除从 b 到 a 的对称边。
   * @param a
   * @param b
   */
  removeEdge(a: T, b: T): void {
    this.edges.delete(JSON.stringify([a, b]));
    if (!this.directed) this.edges.delete(JSON.stringify([b, a]));
  }

  /**
   * @description 查找图中的节点 key，返回该节点对象（包含 key 和 value），如果节点不存在则返回 undefined。
   * @param key
   */
  findNode(key: T): { key: T; value: T } | undefined {
    return this.nodes.find((x) => x.key === key);
  }

  /**
   * @description 检查图中是否存在从节点 a 到节点 b 的边。
   * @param a
   * @param b
   */
  hasEdge(a: T, b: T): boolean {
    return this.edges.has(JSON.stringify([a, b]));
  }

  /**
   * @description 更新从节点 a 到节点 b 的边的权重为 weight。如果图是无向的，也会更新从 b 到 a 的对称边的权重。
   * @param a
   * @param b
   * @param weight
   */
  setEdgeWeight(a: T, b: T, weight: number): void {
    this.edges.set(JSON.stringify([a, b]), { a, b, weight });
    if (!this.directed) this.edges.set(JSON.stringify([b, a]), { a: b, b: a, weight });
  }

  /**
   * @description 获取从节点 a 到节点 b 的边的权重，如果边不存在，返回 undefined。
   * @param a
   * @param b
   */
  getEdgeWeight(a: T, b: T): number | undefined {
    const edge = this.edges.get(JSON.stringify([a, b]));
    return edge ? edge.weight : undefined;
  }

  /**
   * @description 返回与节点 key 直接相邻的所有节点，即有从 key 出发的边指向的节点列表。
   * @param key
   */
  adjacent(key: T): T[] {
    return [...this.edges.values()].reduce((acc: T[], { a, b }) => {
      if (a === key) acc.push(b);
      return acc;
    }, []);
  }

  /**
   * @description 计算节点 key 的入度，即有多少条边指向该节点。。
   * @param key
   */
  inDegree(key: T): number {
    return [...this.edges.values()].reduce((acc, { b }) => {
      if (b === key) acc++;
      return acc;
    }, 0);
  }

  /**
   * @description 计算节点 key 的出度，即从该节点出发的边的数量。
   * @param key
   */
  outDegree(key: T): number {
    return [...this.edges.values()].reduce((acc, { a }) => {
      if (a === key) acc++;
      return acc;
    }, 0);
  }

  /**
   * @description 获取所有节点的键
   */
  getNodes(): T[] {
    return this.nodes.map((node) => node.key);
  }

  /**
   * @description 获取所有边
   */
  getEdges(): GraphEdge<T>[] {
    return Array.from(this.edges.values());
  }

  /**
   * @description 获取图中节点的数量
   */
  get nodeCount(): number {
    return this.nodes.length;
  }

  /**
   * @description 获取图中边的数量
   */
  get edgeCount(): number {
    return this.edges.size;
  }

  /**
   * @description 检查图是否为空
   */
  isEmpty(): boolean {
    return this.nodes.length === 0;
  }

  /**
   * @description 深度优先搜索遍历
   * @param startKey 起始节点
   */
  dfs(startKey: T): TraversalResult<T> {
    const visited = new Set<T>();
    const path: T[] = [];

    if (!this.findNode(startKey)) {
      return { path, visited };
    }

    this._dfsHelper(startKey, visited, path);
    return { path, visited };
  }

  /**
   * @description 广度优先搜索遍历
   * @param startKey 起始节点
   */
  bfs(startKey: T): TraversalResult<T> {
    const visited = new Set<T>();
    const path: T[] = [];
    const queue: T[] = [];

    if (!this.findNode(startKey)) {
      return { path, visited };
    }

    visited.add(startKey);
    queue.push(startKey);

    while (queue.length > 0) {
      const currentKey = queue.shift()!;
      path.push(currentKey);

      for (const neighborKey of this.adjacent(currentKey)) {
        if (!visited.has(neighborKey)) {
          visited.add(neighborKey);
          queue.push(neighborKey);
        }
      }
    }

    return { path, visited };
  }

  /**
   * @description 查找两个节点之间的路径
   * @param startKey 起始节点
   * @param endKey 目标节点
   */
  findPath(startKey: T, endKey: T): T[] | null {
    if (!this.findNode(startKey) || !this.findNode(endKey)) {
      return null;
    }

    const visited = new Set<T>();
    const path: T[] = [];

    if (this._findPathHelper(startKey, endKey, visited, path)) {
      return path;
    }

    return null;
  }

  /**
   * @description 使用 Dijkstra 算法找最短路径
   * @param startKey 起始节点
   * @param endKey 目标节点
   */
  shortestPath(startKey: T, endKey: T): ShortestPathResult<T> {
    if (!this.findNode(startKey) || !this.findNode(endKey)) {
      return { distance: Infinity, path: [], found: false };
    }

    const distances = new Map<T, number>();
    const previous = new Map<T, T | null>();
    const unvisited = new Set<T>();

    // 初始化距离
    for (const node of this.nodes) {
      const key = node.key;
      distances.set(key, key === startKey ? 0 : Infinity);
      previous.set(key, null);
      unvisited.add(key);
    }

    while (unvisited.size > 0) {
      // 找到未访问中距离最小的节点
      let current: T | null = null;
      let minDistance = Infinity;

      for (const key of unvisited) {
        const distance = distances.get(key)!;
        if (distance < minDistance) {
          minDistance = distance;
          current = key;
        }
      }

      if (current === null || minDistance === Infinity) {
        break;
      }

      unvisited.delete(current);

      // 如果到达目标节点
      if (current === endKey) {
        break;
      }

      // 更新邻接节点的距离
      for (const neighbor of this.adjacent(current)) {
        if (unvisited.has(neighbor)) {
          const weight = this.getEdgeWeight(current, neighbor) || 0;
          const newDistance = distances.get(current)! + weight;

          if (newDistance < distances.get(neighbor)!) {
            distances.set(neighbor, newDistance);
            previous.set(neighbor, current);
          }
        }
      }
    }

    // 构建路径
    const path: T[] = [];
    let current: T | null = endKey;

    while (current !== null) {
      path.unshift(current);
      current = previous.get(current)!;
    }

    const distance = distances.get(endKey)!;
    const found = distance !== Infinity;

    return { distance, path: found ? path : [], found };
  }

  /**
   * @description 检查图是否有环
   */
  hasCycle(): boolean {
    if (!this.directed) {
      return this._hasUndirectedCycle();
    } else {
      return this._hasDirectedCycle();
    }
  }

  /**
   * @description 拓扑排序（仅适用于有向无环图）
   */
  topologicalSort(): T[] | null {
    if (!this.directed) {
      return null; // 无向图不支持拓扑排序
    }

    if (this.hasCycle()) {
      return null; // 有环图不能拓扑排序
    }

    const visited = new Set<T>();
    const stack: T[] = [];

    for (const node of this.nodes) {
      if (!visited.has(node.key)) {
        this._topologicalSortHelper(node.key, visited, stack);
      }
    }

    return stack.reverse();
  }

  /**
   * @description 获取所有连通分量
   */
  getConnectedComponents(): T[][] {
    const visited = new Set<T>();
    const components: T[][] = [];

    for (const node of this.nodes) {
      if (!visited.has(node.key)) {
        const component: T[] = [];
        this._dfsHelper(node.key, visited, component);
        components.push(component);
      }
    }

    return components;
  }

  /**
   * @description 检查图是否连通
   */
  isConnected(): boolean {
    if (this.nodes.length === 0) return true;

    const components = this.getConnectedComponents();
    return components.length === 1;
  }

  /**
   * @description 清空图
   */
  clear(): void {
    this.nodes = [];
    this.edges.clear();
  }

  /**
   * @description 克隆图
   */
  clone(): Graph<T> {
    const newGraph = new Graph<T>(this.directed);

    // 复制节点
    for (const node of this.nodes) {
      newGraph.addNode(node.key, node.value);
    }

    // 复制边
    for (const edge of this.edges.values()) {
      newGraph.addEdge(edge.a, edge.b, edge.weight);
    }

    return newGraph;
  }

  // 私有辅助方法
  private _dfsHelper(key: T, visited: Set<T>, path: T[]): void {
    visited.add(key);
    path.push(key);

    for (const neighborKey of this.adjacent(key)) {
      if (!visited.has(neighborKey)) {
        this._dfsHelper(neighborKey, visited, path);
      }
    }
  }

  private _findPathHelper(current: T, target: T, visited: Set<T>, path: T[]): boolean {
    visited.add(current);
    path.push(current);

    if (current === target) {
      return true;
    }

    for (const neighbor of this.adjacent(current)) {
      if (!visited.has(neighbor)) {
        if (this._findPathHelper(neighbor, target, visited, path)) {
          return true;
        }
      }
    }

    path.pop();
    return false;
  }

  private _hasUndirectedCycle(): boolean {
    const visited = new Set<T>();

    for (const node of this.nodes) {
      if (!visited.has(node.key)) {
        if (this._hasUndirectedCycleHelper(node.key, null, visited)) {
          return true;
        }
      }
    }

    return false;
  }

  private _hasUndirectedCycleHelper(key: T, parent: T | null, visited: Set<T>): boolean {
    visited.add(key);

    for (const neighbor of this.adjacent(key)) {
      if (!visited.has(neighbor)) {
        if (this._hasUndirectedCycleHelper(neighbor, key, visited)) {
          return true;
        }
      } else if (neighbor !== parent) {
        return true;
      }
    }

    return false;
  }

  private _hasDirectedCycle(): boolean {
    const visited = new Set<T>();
    const recursionStack = new Set<T>();

    for (const node of this.nodes) {
      if (!visited.has(node.key)) {
        if (this._hasDirectedCycleHelper(node.key, visited, recursionStack)) {
          return true;
        }
      }
    }

    return false;
  }

  private _hasDirectedCycleHelper(key: T, visited: Set<T>, recursionStack: Set<T>): boolean {
    visited.add(key);
    recursionStack.add(key);

    for (const neighbor of this.adjacent(key)) {
      if (!visited.has(neighbor)) {
        if (this._hasDirectedCycleHelper(neighbor, visited, recursionStack)) {
          return true;
        }
      } else if (recursionStack.has(neighbor)) {
        return true;
      }
    }

    recursionStack.delete(key);
    return false;
  }

  private _topologicalSortHelper(key: T, visited: Set<T>, stack: T[]): void {
    visited.add(key);

    for (const neighbor of this.adjacent(key)) {
      if (!visited.has(neighbor)) {
        this._topologicalSortHelper(neighbor, visited, stack);
      }
    }

    stack.push(key);
  }
}
