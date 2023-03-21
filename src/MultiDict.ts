/**
 * MultiDict.ts: A multi-key multi-value map implementation.
 *
 * - When a pair of KV is set, both keys and values are indexed as keys in the
 * map, allowing reverse lookups.
 *
 * - Values are always a Set.
 *
 * - Deleting a key deletes it from both directions.
 */
export class MultiDict<K, V> implements Omit<Map<K | V, Set<K | V>>, "set"> {
  // This type doesn't work: `Map<K, Set<V>> | Map<V, Set<K>>`
  #map = new Map<K | V, Set<K | V>>();

  clear() {
    this.#map.clear();
  }

  /**
   * If a value is provided, delete only that specific pair. Otherwise, delete
   * all values from the specified key.
   */
  delete(key: K, value?: V): boolean;
  delete(key: V, value?: K): boolean;
  delete(key: K | V, value?: K | V) {
    if (value !== undefined) {
      let result = this.#map.get(key)?.delete(value) ?? false;
      result &&= this.#map.get(value)?.delete(key) ?? false;
      return result;
    }

    const values = this.#map.get(key);
    let result = this.#map.delete(key);

    if (values) {
      for (const value of values) {
        const revRef = this.#map.get(value);
        if (revRef) {
          result &&= revRef.delete(key) ?? false;
          if (revRef.size === 0) {
            this.#map.delete(value);
          }
        }
      }
      return result;
    }

    return result;
  }

  entries() {
    return this.#map.entries();
  }

  forEach(
    callbackfn: (
      value: Set<K | V>,
      key: K | V,
      map: Map<K | V, Set<K | V>>,
    ) => void,
    thisArg?: any,
  ) {
    return this.#map.forEach(callbackfn, thisArg);
  }

  get(key: K): Set<V> | undefined;
  get(key: V): Set<K> | undefined;
  get(key: K | V) {
    return this.#map.get(key);
  }

  has(key: K | V) {
    return this.#map.has(key);
  }

  keys() {
    return this.#map.keys();
  }

  set(key: K, value: V): this;
  set(key: V, value: K): this;
  set(key: K | V, value: K | V) {
    return this.#set(key, value).#set(value, key);
  }

  #set(key: K | V, value: K | V) {
    const set = this.#map.get(key) ?? new Set();
    set.add(value);

    this.#map.set(key, set);

    return this;
  }

  get size() {
    return this.#map.size;
  }

  values() {
    return this.#map.values();
  }

  [Symbol.iterator]() {
    return this.#map[Symbol.iterator]();
  }

  get [Symbol.toStringTag]() {
    return "MultiDict";
  }
}
