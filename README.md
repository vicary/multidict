# PolyMap

PolyMap is a TypeScript implementation of a key-value store that allows for multiple keys and values to be associated with each other. It is similar to a standard Map object, but with additional functionality to support multiple key-value pairs.

## Installation

You can install PolyMap using npm:

```bash
> npm install polymap
```

## Usage

To use PolyMap in your TypeScript project, simply import the PolyMap class and create a new instance:

```ts
import { PolyMap } from "polymap";

const myMap = new PolyMap<string, number>();
myMap.set("foo", 1);
myMap.set("foo", 2);
myMap.set(3, "bar"); // In a two-way reference model, key and value means the same thing.

console.log(myMap.get("foo")); // -> Set { 1, 2 }
console.log(myMap.get(1)); // -> Set { "foo" }

console.log(myMap.get("bar")); // -> Set { 3 }
console.log(myMap.get(3)); // -> Set { "bar" }
```

You may also use it like an iterator:

```ts
for (const [key, values] of myMap) {
  for (const value of values) {
    console.log(key, value);
  }
}
```

PolyMap supports all of the standard Map methods, having the return type as a Set.

You may easily deletes all relationships associated with a key or value with the `delete()` method, or only deletes one specific key-value pair by specifying the value as well:

```ts
myMap.set("foo", 1);
myMap.set(2, "foo");
myMap.set("foo", 3);

myMap.delete("foo", 1);
console.log(myMap.get("foo")); // -> Set { 2, 3 }

myMap.delete("foo");
console.log(myMap.get("foo")); // -> undefined
console.log(myMap.get(2)); // -> undefined
```

## API

PolyMap supports the following methods:

1. `clear()`: Clears all key-value pairs from the store.
   delete(key: K, value?: V): boolean: Deletes a key-value pair from the store. If a value parameter is provided, only the specified key-value pair is deleted. If no value parameter is provided, all key-value pairs associated with the specified key are deleted. Returns true if the key-value pair(s) were deleted, false otherwise.
1. `entries()`: Returns an iterator of all key-value pairs in the store.
1. `forEach(callbackfn: (value: Set<K | V>, key: K | V, map: Map<K | V, Set<K | V>>) => void, thisArg?: any)`: Calls a provided function once for each key-value pair in the store, in insertion order.
1. `get(key: K): Set<V> | undefined`: Returns a Set of all values associated with the specified key, or undefined if the key is not present in the store.
1. `has(key: K | V): boolean`: Returns true if the specified key or value is present in the store, false otherwise.
1. `keys()`: Returns an iterator of all keys in the store.
1. `set(key: K, value: V): this`: Associates a key with a value in the store. Returns the PolyMap instance to allow for method chaining. If the key or value already exists in the store, the existing values associated with the key or value are preserved, and the new value is added to the existing set of values.
1. `size`: Returns the number of key-value pairs in the store.
1. `values()`: Returns an iterator of all values in the store.

## Contributing

Contributions to PolyMap are welcome! If you find a bug or would like to suggest a new feature, please open an issue or submit a pull request on GitHub.

## License

PolyMap is licensed under the MIT License. See the LICENSE file for more information.

## Funding

If you find this project useful, please consider supporting it by donating to the author.

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/andrewjmeier)
