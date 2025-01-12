export class ImmutableSet<T> implements ReadonlySet<T> {
  #set: Set<T>;

  constructor(values?: Iterable<T> | null) {
    this.#set = values instanceof Set ? values : new Set(values);
  }

  [Symbol.iterator](): SetIterator<T> {
    return this.#set[Symbol.iterator]();
  }

  get size(): number {
    return this.#set.size;
  }

  has(value: T): boolean {
    return this.#set.has(value);
  }

  keys(): SetIterator<T> {
    return this.#set.keys();
  }

  values(): SetIterator<T> {
    return this.#set.values();
  }

  entries(): SetIterator<[T, T]> {
    return this.#set.entries();
  }

  forEach<TSelf>(
    callbackfn: (value: T, value2: T, set: Set<T>) => void,
    thisArg?: TSelf,
  ): void {
    this.#set.forEach(callbackfn, thisArg);
  }

  union<U>(other: ReadonlySetLike<U>): Set<T | U> {
    return this.#set.union(other);
  }

  intersection<U>(other: ReadonlySet<U>): Set<T & U> {
    return this.#set.intersection(other);
  }

  difference<U>(other: ReadonlySet<U>): Set<T> {
    return this.#set.difference(other);
  }

  symmetricDifference<U>(other: ReadonlySet<U>): Set<T | U> {
    return this.#set.symmetricDifference(other);
  }

  isSubsetOf<U>(other: ReadonlySet<U>): boolean {
    return this.#set.isSubsetOf(other);
  }

  isSupersetOf<U>(other: ReadonlySet<U>): boolean {
    return this.#set.isSupersetOf(other);
  }

  isDisjointFrom<U>(other: ReadonlySet<U>): boolean {
    return this.#set.isDisjointFrom(other);
  }

  get [Symbol.toStringTag](): string {
    return "ImmutableSet";
  }

  [Symbol.for("nodejs.util.inspect.custom")](): string {
    return `ImmutableSet(${this.size}) { ${
      [...this.#set]
        .map((value) => Deno.inspect(value, { colors: !Deno.noColor }))
        .join(", ")
    } }`;
  }
}
