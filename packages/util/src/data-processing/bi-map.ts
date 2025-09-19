type ValueType = string | number | boolean;

type Item = { label: string; value: ValueType };

class BiMap {
  #valueToLabel: Map<ValueType, string>;
  #labelToValue: Map<string, ValueType>;

  constructor(items: Item[] = []) {
    this.#valueToLabel = new Map();
    this.#labelToValue = new Map();
    this.addAll(items);
  }

  /** 批量添加 */
  addAll(items: Item[]) {
    for (const { label, value } of items) {
      this.add({ label, value });
    }
  }

  /** 添加单个映射 */
  add(item: Item) {
    this.#valueToLabel.set(item.value, item.label);
    this.#labelToValue.set(item.label, item.value);
  }

  /** 根据 value 删除 */
  removeByValue(value: string): boolean {
    const label = this.#valueToLabel.get(value);
    if (!label) return false;
    this.#valueToLabel.delete(value);
    this.#labelToValue.delete(label);
    return true;
  }

  /** 根据 label 删除 */
  removeByLabel(label: string): boolean {
    const value = this.#labelToValue.get(label);
    if (!value) return false;
    this.#labelToValue.delete(label);
    this.#valueToLabel.delete(value);
    return true;
  }

  /** 清空所有映射 */
  clear() {
    this.#valueToLabel.clear();
    this.#labelToValue.clear();
  }

  /** 根据 value 获取 label */
  getLabel(value: string): string | undefined {
    return this.#valueToLabel.get(value);
  }

  /** 根据 label 获取 value */
  getValue(label: string): ValueType | undefined {
    return this.#labelToValue.get(label);
  }

  hasValue(value: string): boolean {
    return this.#valueToLabel.has(value);
  }

  hasLabel(label: string): boolean {
    return this.#labelToValue.has(label);
  }

  /** 获取所有 value→label 映射 */
  entries(): [ValueType, string][] {
    return [...this.#valueToLabel.entries()];
  }

  /** 转换为数组 */
  toArray(): Item[] {
    return [...this.#valueToLabel.entries()].map(([value, label]) => ({ label, value }));
  }
}

/**
 * @description 工厂 + 工具类
 */
export class BiMapFactory {
  static #cache = new WeakMap<object, BiMap>();

  /** 基于 array 缓存复用 */
  static fromArray(items: Item[]): BiMap {
    if (this.#cache.has(items)) {
      return this.#cache.get(items)!;
    }
    const biMap = new BiMap(items);
    this.#cache.set(items, biMap);
    return biMap;
  }

  /** 一次性转换成 BiMap（不缓存） */
  static toBiMap(items: Item[]): BiMap {
    return new BiMap(items);
  }

  /** 转换成 value→label 的 Map */
  static toValueMap(items: Item[]): Map<ValueType, string> {
    return new Map(items.map(({ value, label }) => [value, label]));
  }

  /** 转换成 label→value 的 Map */
  static toLabelMap(items: Item[]): Map<string, ValueType> {
    return new Map(items.map(({ value, label }) => [label, value]));
  }
}
