import { ImmutableSet } from "./ImmutableSet.ts";

/**
 * A multi-key multi-value map implementation.
 *
 * - When a pair of KV is set, both keys and values are indexed as keys in the
 * map, allowing reverse lookups.
 *
 * - Values are always a Set.
 *
 * - Deleting a key deletes it from both directions.
 */
export class MultiDict<K, V>
  implements Omit<Map<K | V, ReadonlySet<K | V>>, "set"> {
  // This type doesn't work: `Map<K, ReadonlySet<V>> | Map<V, ReadonlySet<K>>`
  #map = new Map<K | V, Set<K | V>>();

  /** Delete all entries */
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

  /**
   * Returns an iterable of key, value pairs for every entry in the map.
   *
   * Keys and values are interchangeable, expect all existing keys and values
   * being invoked as the "key" once.
   */
  entries(): MapIterator<[K | V, ReadonlySet<K | V>]> {
    return this.#map.entries();
  }

  /**
   * Calls a function for each key-value pair in the map.
   *
   * Keys and values are interchangeable, expect all existing keys and values
   * being invoked as the "key" once.
   */
  forEach(
    callbackfn: (
      value: ReadonlySet<K | V>,
      key: K | V,
      map: Map<K | V, ReadonlySet<K | V>>,
    ) => void,
    thisArg?: unknown,
  ): void {
    return this.#map.forEach(callbackfn, thisArg);
  }

  /**
   * Returns a Set of values for the specified key.
   */
  get(key: K): ReadonlySet<V> | undefined;
  get(key: V): ReadonlySet<K> | undefined;
  get(key: K | V): ReadonlySet<K | V> | undefined {
    const set = this.#map.get(key);

    if (set) {
      return new ImmutableSet(set);
    }
  }

  /**
   * Returns a boolean indicating whether an element with the specified key
   */
  has(key: K | V): boolean {
    return this.#map.has(key);
  }

  /**
   * Keys and values are interchangable, this is an iterator for all keys and
   * values.
   */
  keys(): MapIterator<K | V> {
    return this.#map.keys();
  }

  /**
   * Adds or updates a key-value pair in the map.
   */
  set(key: K, value: V): this;
  set(key: V, value: K): this;
  set(key: K | V, value: K | V) {
    return this.#set(key, value).#set(value, key);
  }

  #set(key: K | V, value: K | V) {
    this.#map.get(key)?.add(value) ??
      this.#map.set(key, new Set([value]));

    return this;
  }

  /**
   * Return the size of the map. Since keys and values are interchangeable, it
   * is the total number of unique keys and values.
   */
  get size(): number {
    return this.#map.size;
  }

  /**
   * Returns an iterable of values in the map.
   *
   * Keys and values are interchangeable, therefore values set as keys will be
   * returned as a single-value Set.
   */
  values(): MapIterator<ReadonlySet<K | V>> {
    return this.#map.values();
  }

  [Symbol.iterator](): MapIterator<[K | V, ReadonlySet<K | V>]> {
    return this.#map[Symbol.iterator]();
  }

  get [Symbol.toStringTag](): string {
    return "MultiDict";
  }
}
