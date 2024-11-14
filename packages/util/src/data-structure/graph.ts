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
}
