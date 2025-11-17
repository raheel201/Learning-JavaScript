export const arraysObjectsDS = [
  {
    id: 37,
    question: "Difference between map vs forEach.",
    answer: "map returns new array with transformed elements. forEach executes function for each element, returns undefined.",
    example: `const numbers = [1, 2, 3, 4];

// forEach - no return value, used for side effects
numbers.forEach(num => {
  console.log(num * 2); // 2, 4, 6, 8
});

// map - returns new array
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8]
console.log(numbers); // [1, 2, 3, 4] - original unchanged

// Chaining
const result = numbers
  .map(num => num * 2)
  .filter(num => num > 4);
console.log(result); // [6, 8]

// Performance comparison
const largeArray = new Array(1000000).fill(0).map((_, i) => i);

console.time('forEach');
let sum1 = 0;
largeArray.forEach(num => sum1 += num);
console.timeEnd('forEach');

console.time('map');
const doubled2 = largeArray.map(num => num * 2);
console.timeEnd('map');`,
    explanation: "Use map when you need new array, forEach for side effects like logging or DOM manipulation."
  },
  {
    id: 38,
    question: "Difference between filter, map, reduce.",
    answer: "filter selects elements, map transforms elements, reduce accumulates to single value.",
    example: `const numbers = [1, 2, 3, 4, 5, 6];

// filter - selects elements that pass test
const evens = numbers.filter(num => num % 2 === 0);
console.log(evens); // [2, 4, 6]

// map - transforms each element
const squared = numbers.map(num => num ** 2);
console.log(squared); // [1, 4, 9, 16, 25, 36]

// reduce - accumulates to single value
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum); // 21

// Combining all three
const result = numbers
  .filter(num => num > 2)     // [3, 4, 5, 6]
  .map(num => num * 2)        // [6, 8, 10, 12]
  .reduce((acc, num) => acc + num, 0); // 36

// Real-world example: processing user data
const users = [
  { name: 'Alice', age: 25, active: true },
  { name: 'Bob', age: 30, active: false },
  { name: 'Charlie', age: 35, active: true }
];

const activeUserNames = users
  .filter(user => user.active)
  .map(user => user.name);
console.log(activeUserNames); // ['Alice', 'Charlie']

const totalAge = users
  .filter(user => user.active)
  .reduce((sum, user) => sum + user.age, 0);
console.log(totalAge); // 60`,
    explanation: "filter creates subset, map creates transformation, reduce creates aggregation. They're often chained together."
  },
  {
    id: 39,
    question: "How does reduce work internally?",
    answer: "reduce applies a function against accumulator and each element to reduce array to single value.",
    example: `const numbers = [1, 2, 3, 4, 5];

// Sum all numbers
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(sum); // 15

// Group by even/odd
const grouped = numbers.reduce((acc, num) => {
  const key = num % 2 === 0 ? 'even' : 'odd';
  acc[key] = acc[key] || [];
  acc[key].push(num);
  return acc;
}, {});
console.log(grouped); // { odd: [1, 3, 5], even: [2, 4] }

// Flatten array
const nested = [[1, 2], [3, 4], [5]];
const flattened = nested.reduce((acc, arr) => acc.concat(arr), []);
console.log(flattened); // [1, 2, 3, 4, 5]

// Count occurrences
const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
const count = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});
console.log(count); // { apple: 3, banana: 2, orange: 1 }

// Manual reduce implementation
Array.prototype.myReduce = function(callback, initialValue) {
  let acc = initialValue;
  let startIndex = 0;
  
  if (acc === undefined) {
    acc = this[0];
    startIndex = 1;
  }
  
  for (let i = startIndex; i < this.length; i++) {
    acc = callback(acc, this[i], i, this);
  }
  
  return acc;
};

// Advanced: pipe function using reduce
const pipe = (...functions) => (value) =>
  functions.reduce((acc, fn) => fn(acc), value);

const addOne = x => x + 1;
const double = x => x * 2;
const square = x => x ** 2;

const transform = pipe(addOne, double, square);
console.log(transform(3)); // ((3 + 1) * 2) ** 2 = 64`,
    explanation: "reduce is powerful for transforming arrays into any data structure. Always provide initial value to avoid errors."
  },
  {
    id: 40,
    question: "How would you flatten a nested array?",
    answer: "Use flat(), reduce(), recursion, or spread operator depending on nesting depth.",
    example: `// Shallow flatten (one level)
const shallow = [1, [2, 3], [4, 5]];
console.log(shallow.flat()); // [1, 2, 3, 4, 5]

// Deep flatten (all levels)
const deep = [1, [2, [3, [4, 5]]]];
console.log(deep.flat(Infinity)); // [1, 2, 3, 4, 5]

// Using reduce (one level)
const flattenOne = arr => arr.reduce((acc, val) => acc.concat(val), []);
console.log(flattenOne(shallow)); // [1, 2, 3, 4, 5]

// Recursive flatten (all levels)
function flattenDeep(arr) {
  return arr.reduce((acc, val) => 
    Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []
  );
}
console.log(flattenDeep(deep)); // [1, 2, 3, 4, 5]

// Using spread operator (one level)
const spreadFlatten = arr => [].concat(...arr);
console.log(spreadFlatten(shallow)); // [1, 2, 3, 4, 5]

// Stack-based iterative approach
function flattenIterative(arr) {
  const result = [];
  const stack = [...arr];
  
  while (stack.length) {
    const next = stack.pop();
    if (Array.isArray(next)) {
      stack.push(...next);
    } else {
      result.push(next);
    }
  }
  
  return result.reverse();
}

// Generator function approach
function* flattenGenerator(arr) {
  for (const item of arr) {
    if (Array.isArray(item)) {
      yield* flattenGenerator(item);
    } else {
      yield item;
    }
  }
}

const flattened = [...flattenGenerator(deep)];
console.log(flattened); // [1, 2, 3, 4, 5]`,
    explanation: "flat() is simplest for known depth. Use recursion or iteration for unknown depth. Consider performance for large arrays."
  },
  {
    id: 41,
    question: "What is the difference between == and ===?",
    answer: "== performs type coercion before comparison. === compares without type conversion (strict equality).",
    example: `// == (loose equality) - type coercion
console.log(5 == "5");     // true
console.log(true == 1);    // true
console.log(null == undefined); // true
console.log(0 == false);   // true
console.log("" == false);  // true
console.log([] == false);  // true
console.log([] == "");     // true

// === (strict equality) - no coercion
console.log(5 === "5");    // false
console.log(true === 1);   // false
console.log(null === undefined); // false
console.log(0 === false);  // false
console.log("" === false); // false

// Special cases
console.log(NaN == NaN);   // false
console.log(NaN === NaN);  // false
console.log(Object.is(NaN, NaN)); // true
console.log(Object.is(+0, -0)); // false
console.log(+0 === -0); // true

// Objects compared by reference
const obj1 = { a: 1 };
const obj2 = { a: 1 };
const obj3 = obj1;

console.log(obj1 == obj2);  // false
console.log(obj1 === obj2); // false
console.log(obj1 === obj3); // true

// Type coercion rules for ==
console.log("5" == 5);     // "5" -> 5, then 5 == 5 -> true
console.log(true == "1");  // true -> 1, "1" -> 1, then 1 == 1 -> true
console.log([1] == 1);     // [1] -> "1" -> 1, then 1 == 1 -> true

// Tricky cases
console.log([] == ![]);    // true ([] -> "", ![] -> false -> 0, "" == 0 -> true)
console.log("" == 0);      // true
console.log("0" == 0);     // true
console.log("0" == "");    // false`,
    explanation: "Always use === unless you specifically need type coercion. == can lead to unexpected results."
  },
  {
    id: 42,
    question: "Explain shallow copy vs deep copy.",
    answer: "Shallow copy copies only first level properties. Deep copy copies all nested levels recursively.",
    example: `const original = {
  name: "John",
  age: 30,
  address: {
    city: "NYC",
    country: "USA"
  },
  hobbies: ["reading", "coding"]
};

// Shallow copy methods
const shallow1 = { ...original };
const shallow2 = Object.assign({}, original);
const shallow3 = Object.create(original);

// Problem with shallow copy
shallow1.name = "Jane"; // OK - doesn't affect original
shallow1.address.city = "LA"; // Problem - affects original!
shallow1.hobbies.push("gaming"); // Problem - affects original!

console.log(original.address.city); // "LA" - changed!
console.log(original.hobbies); // ["reading", "coding", "gaming"] - changed!

// Deep copy methods
// 1. JSON method (limited - no functions, dates, etc.)
const deep1 = JSON.parse(JSON.stringify(original));

// 2. structuredClone (modern browsers)
const deep2 = structuredClone(original);

// 3. Custom recursive function
function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  if (typeof obj === "object") {
    const cloned = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = deepClone(obj[key]);
      }
    }
    return cloned;
  }
}

const deep3 = deepClone(original);

// 4. Lodash library
// const deep4 = _.cloneDeep(original);

// Test deep copy
deep1.address.city = "Chicago";
console.log(original.address.city); // Still "NYC"

// Arrays shallow vs deep
const originalArray = [[1, 2], [3, 4]];
const shallowArray = [...originalArray];
const deepArray = originalArray.map(arr => [...arr]);

shallowArray[0].push(3); // Affects original
deepArray[1].push(5); // Doesn't affect original`,
    explanation: "Shallow copy shares nested object references. Deep copy creates completely independent copy."
  },
  {
    id: 43,
    question: "Methods to deep clone an object.",
    answer: "JSON.parse(JSON.stringify()), structuredClone(), custom recursion, or libraries like Lodash.",
    example: `const original = {
  name: "John",
  age: 30,
  birthDate: new Date('1990-01-01'),
  address: { city: "NYC" },
  greet: function() { return "Hello"; },
  symbol: Symbol('test'),
  undefined: undefined,
  regex: /test/g
};

// Method 1: JSON (loses functions, dates become strings, etc.)
const jsonClone = JSON.parse(JSON.stringify(original));
console.log(jsonClone.greet); // undefined
console.log(jsonClone.birthDate); // "1990-01-01T00:00:00.000Z" (string)

// Method 2: structuredClone (modern, handles more types)
const structuredClone = structuredClone(original);
console.log(structuredClone.birthDate instanceof Date); // true
// Note: still loses functions

// Method 3: Custom recursive clone
function deepClone(obj, visited = new WeakMap()) {
  // Handle primitives and null
  if (obj === null || typeof obj !== "object") return obj;
  
  // Handle circular references
  if (visited.has(obj)) return visited.get(obj);
  
  // Handle Date
  if (obj instanceof Date) return new Date(obj);
  
  // Handle RegExp
  if (obj instanceof RegExp) return new RegExp(obj);
  
  // Handle Array
  if (Array.isArray(obj)) {
    const cloned = [];
    visited.set(obj, cloned);
    for (let i = 0; i < obj.length; i++) {
      cloned[i] = deepClone(obj[i], visited);
    }
    return cloned;
  }
  
  // Handle Object
  const cloned = {};
  visited.set(obj, cloned);
  
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key], visited);
    }
  }
  
  return cloned;
}

// Method 4: Using MessageChannel (for structured cloneable objects)
function cloneWithMessageChannel(obj) {
  return new Promise(resolve => {
    const { port1, port2 } = new MessageChannel();
    port2.onmessage = ({ data }) => resolve(data);
    port1.postMessage(obj);
  });
}

// Method 5: Lodash cloneDeep
// const lodashClone = _.cloneDeep(original);

// Handling circular references
const circular = { name: "test" };
circular.self = circular;

const clonedCircular = deepClone(circular);
console.log(clonedCircular.self === clonedCircular); // true`,
    explanation: "Choose method based on data types: JSON for simple objects, structuredClone for modern browsers, custom function for complex cases."
  },
  {
    id: 44,
    question: "Why does NaN === NaN return false?",
    answer: "NaN represents 'Not a Number' and by IEEE 754 standard, NaN is not equal to anything, including itself.",
    example: `console.log(NaN === NaN); // false
console.log(NaN == NaN);  // false
console.log(NaN !== NaN); // true

// How NaN is created
console.log(0 / 0);        // NaN
console.log(Math.sqrt(-1)); // NaN
console.log(parseInt("hello")); // NaN
console.log(Number("abc")); // NaN
console.log(undefined + 1); // NaN

// Checking for NaN
console.log(isNaN(NaN));        // true
console.log(isNaN("hello"));    // true (coerces to NaN)
console.log(Number.isNaN(NaN)); // true
console.log(Number.isNaN("hello")); // false (no coercion)

// Object.is() handles NaN correctly
console.log(Object.is(NaN, NaN)); // true
console.log(Object.is(+0, -0));   // false (unlike ===)

// Practical NaN checking
function isReallyNaN(value) {
  return value !== value; // Only NaN fails this test
}

console.log(isReallyNaN(NaN));    // true
console.log(isReallyNaN(5));      // false
console.log(isReallyNaN("test")); // false

// Array methods with NaN
const arr = [1, NaN, 3, NaN, 5];
console.log(arr.indexOf(NaN));     // -1 (can't find NaN)
console.log(arr.includes(NaN));    // true (uses Object.is internally)
console.log(arr.findIndex(x => Number.isNaN(x))); // 1

// Filtering out NaN values
const numbers = [1, NaN, 2, NaN, 3];
const validNumbers = numbers.filter(x => !Number.isNaN(x));
console.log(validNumbers); // [1, 2, 3]`,
    explanation: "NaN's unique behavior prevents bugs in mathematical operations. Use Number.isNaN() or Object.is() for reliable NaN checking."
  },
  {
    id: 45,
    question: "Difference between Object.freeze and Object.seal.",
    answer: "Object.freeze prevents all changes. Object.seal allows modification of existing properties but prevents addition/deletion.",
    example: `const obj = { name: "John", age: 30 };

// Object.freeze - completely immutable
const frozen = Object.freeze({ ...obj });

frozen.name = "Jane";        // Ignored (strict mode: TypeError)
frozen.city = "NYC";         // Ignored (strict mode: TypeError)
delete frozen.age;           // Ignored (strict mode: TypeError)

console.log(frozen); // { name: "John", age: 30 }

// Object.seal - can modify existing properties
const sealed = Object.seal({ ...obj });

sealed.name = "Jane";        // Works
sealed.city = "NYC";         // Ignored (strict mode: TypeError)
delete sealed.age;           // Ignored (strict mode: TypeError)

console.log(sealed); // { name: "Jane", age: 30 }

// Checking object state
console.log(Object.isFrozen(frozen)); // true
console.log(Object.isSealed(sealed));  // true
console.log(Object.isSealed(frozen));  // true (frozen objects are also sealed)

// Object.preventExtensions - only prevents new properties
const extensible = Object.preventExtensions({ ...obj });

extensible.name = "Jane";    // Works
extensible.city = "NYC";     // Ignored (strict mode: TypeError)
delete extensible.age;       // Works

console.log(extensible); // { name: "Jane" }

// Nested objects are not affected
const nested = Object.freeze({
  user: { name: "John" },
  settings: { theme: "dark" }
});

nested.user.name = "Jane";   // Works! Nested object is not frozen
console.log(nested.user.name); // "Jane"

// Deep freeze implementation
function deepFreeze(obj) {
  Object.getOwnPropertyNames(obj).forEach(prop => {
    if (obj[prop] !== null && typeof obj[prop] === "object") {
      deepFreeze(obj[prop]);
    }
  });
  return Object.freeze(obj);
}

const deepFrozen = deepFreeze({
  user: { name: "John" },
  settings: { theme: "dark" }
});

deepFrozen.user.name = "Jane"; // Ignored
console.log(deepFrozen.user.name); // "John"`,
    explanation: "freeze creates immutable objects, seal allows property modification, preventExtensions only blocks new properties."
  },
  {
    id: 46,
    question: "What is Array.from and when do you use it?",
    answer: "Array.from creates array from array-like objects or iterables. Useful for converting NodeLists, strings, or creating arrays with mapping.",
    example: `// Convert string to array
const str = "hello";
const chars = Array.from(str);
console.log(chars); // ['h', 'e', 'l', 'l', 'o']

// Convert NodeList to array
const divs = document.querySelectorAll('div');
const divArray = Array.from(divs);
divArray.forEach(div => console.log(div));

// Create array with length and mapping
const numbers = Array.from({ length: 5 }, (_, i) => i + 1);
console.log(numbers); // [1, 2, 3, 4, 5]

// Create array of squares
const squares = Array.from({ length: 5 }, (_, i) => i * i);
console.log(squares); // [0, 1, 4, 9, 16]

// Convert Set to array
const set = new Set([1, 2, 3, 2, 1]);
const uniqueArray = Array.from(set);
console.log(uniqueArray); // [1, 2, 3]

// Convert Map to array
const map = new Map([['a', 1], ['b', 2]]);
const mapArray = Array.from(map);
console.log(mapArray); // [['a', 1], ['b', 2]]

// With mapping function
const doubled = Array.from([1, 2, 3], x => x * 2);
console.log(doubled); // [2, 4, 6]

// Arguments object to array
function example() {
  const args = Array.from(arguments);
  return args.map(x => x * 2);
}
console.log(example(1, 2, 3)); // [2, 4, 6]`,
    explanation: "Array.from is perfect for converting array-like objects to real arrays and creating arrays with custom logic."
  },
  {
    id: 47,
    question: "What is the difference between find vs filter?",
    answer: "find returns first matching element or undefined. filter returns array of all matching elements.",
    example: `const users = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 25 }
];

// find - returns first match or undefined
const firstUser25 = users.find(user => user.age === 25);
console.log(firstUser25); // { id: 1, name: 'Alice', age: 25 }

const userNotFound = users.find(user => user.age === 40);
console.log(userNotFound); // undefined

// filter - returns array of all matches
const allUsers25 = users.filter(user => user.age === 25);
console.log(allUsers25); // [{ id: 1, name: 'Alice', age: 25 }, { id: 3, name: 'Charlie', age: 25 }]

const noMatches = users.filter(user => user.age === 40);
console.log(noMatches); // []

// Performance difference
const largeArray = Array.from({ length: 1000000 }, (_, i) => i);

// find stops at first match
console.time('find');
const found = largeArray.find(x => x === 500000);
console.timeEnd('find'); // Faster - stops early

// filter checks all elements
console.time('filter');
const filtered = largeArray.filter(x => x === 500000);
console.timeEnd('filter'); // Slower - checks all

// findIndex vs indexOf
const index1 = users.findIndex(user => user.age === 25);
console.log(index1); // 0

const names = ['Alice', 'Bob', 'Charlie'];
const index2 = names.indexOf('Bob');
console.log(index2); // 1

// some vs includes
const hasUser25 = users.some(user => user.age === 25);
console.log(hasUser25); // true

const hasName = names.includes('Bob');
console.log(hasName); // true`,
    explanation: "Use find when you need first match, filter when you need all matches. find is more efficient for single results."
  },
  {
    id: 48,
    question: "What is reduceRight?",
    answer: "reduceRight works like reduce but processes array from right to left instead of left to right.",
    example: `const numbers = [1, 2, 3, 4];

// reduce (left to right)
const leftResult = numbers.reduce((acc, curr) => {
  console.log(\`Left: \${acc} + \${curr}\`);
  return acc + curr;
}, 0);
// Output: Left: 0 + 1, Left: 1 + 2, Left: 3 + 3, Left: 6 + 4
// Result: 10

// reduceRight (right to left)
const rightResult = numbers.reduceRight((acc, curr) => {
  console.log(\`Right: \${acc} + \${curr}\`);
  return acc + curr;
}, 0);
// Output: Right: 0 + 4, Right: 4 + 3, Right: 7 + 2, Right: 9 + 1
// Result: 10

// String concatenation shows difference
const words = ['Hello', ' ', 'World', '!'];

const leftString = words.reduce((acc, word) => acc + word, '');
console.log(leftString); // "Hello World!"

const rightString = words.reduceRight((acc, word) => acc + word, '');
console.log(rightString); // "!World Hello"

// Practical example: Function composition
const functions = [
  x => x + 1,
  x => x * 2,
  x => x - 3
];

// Left to right: ((5 + 1) * 2) - 3 = 9
const leftCompose = functions.reduce((acc, fn) => (x) => fn(acc(x)), x => x);
console.log(leftCompose(5)); // 9

// Right to left: (5 - 3) * 2 + 1 = 5
const rightCompose = functions.reduceRight((acc, fn) => (x) => fn(acc(x)), x => x);
console.log(rightCompose(5)); // 5

// Flattening nested arrays (right to left)
const nested = [[1, 2], [3, 4], [5, 6]];
const flattened = nested.reduceRight((acc, arr) => acc.concat(arr), []);
console.log(flattened); // [5, 6, 3, 4, 1, 2]

// Building object from right
const pairs = [['a', 1], ['b', 2], ['c', 3]];
const obj = pairs.reduceRight((acc, [key, value]) => {
  acc[key] = value;
  return acc;
}, {});
console.log(obj); // { c: 3, b: 2, a: 1 }`,
    explanation: "reduceRight is useful for right-to-left operations like function composition or when order matters in accumulation."
  },
  {
    id: 49,
    question: "What is Set, Map, WeakSet, WeakMap? Differences?",
    answer: "Set stores unique values, Map stores key-value pairs. Weak versions allow garbage collection and only accept objects as keys.",
    example: `// Set - unique values
const set = new Set([1, 2, 2, 3, 3]);
console.log(set); // Set(3) {1, 2, 3}
set.add(4);
set.delete(1);
console.log(set.has(2)); // true
console.log(set.size); // 3

// Map - key-value pairs
const map = new Map();
map.set('name', 'John');
map.set(1, 'number key');
map.set(true, 'boolean key');
console.log(map.get('name')); // 'John'
console.log(map.size); // 3

// WeakSet - only objects, weak references
const weakSet = new WeakSet();
let obj1 = { id: 1 };
let obj2 = { id: 2 };

weakSet.add(obj1);
weakSet.add(obj2);
console.log(weakSet.has(obj1)); // true

// When obj1 is garbage collected, it's removed from WeakSet
obj1 = null; // obj1 can be garbage collected

// WeakMap - only object keys, weak references
const weakMap = new WeakMap();
let keyObj = { name: 'key' };

weakMap.set(keyObj, 'some value');
console.log(weakMap.get(keyObj)); // 'some value'

// When keyObj is garbage collected, entry is removed
keyObj = null; // entry can be garbage collected

// Practical examples
// Set for unique values
const uniqueNumbers = [...new Set([1, 1, 2, 2, 3, 3])];
console.log(uniqueNumbers); // [1, 2, 3]

// Map for complex keys
const userRoles = new Map();
const user1 = { name: 'Alice' };
const user2 = { name: 'Bob' };

userRoles.set(user1, 'admin');
userRoles.set(user2, 'user');
console.log(userRoles.get(user1)); // 'admin'

// WeakMap for private data
const privateData = new WeakMap();

class User {
  constructor(name) {
    this.name = name;
    privateData.set(this, { secret: 'hidden data' });
  }
  
  getSecret() {
    return privateData.get(this).secret;
  }
}

const user = new User('John');
console.log(user.getSecret()); // 'hidden data'`,
    explanation: "Use Set for unique values, Map for key-value with any key type. Weak versions prevent memory leaks with object references."
  },
  {
    id: 50,
    question: "Why keys of objects must be strings or symbols?",
    answer: "Object keys are automatically converted to strings (except symbols). This ensures consistent property access and prevents conflicts.",
    example: `const obj = {};

// All these become string keys
obj[1] = 'number';
obj[true] = 'boolean';
obj[null] = 'null';
obj[undefined] = 'undefined';

console.log(obj);
// { '1': 'number', 'true': 'boolean', 'null': 'null', 'undefined': 'undefined' }

// Accessing with different types
console.log(obj[1]);     // 'number'
console.log(obj['1']);   // 'number' - same as above
console.log(obj[true]);  // 'boolean'
console.log(obj['true']); // 'boolean' - same as above

// Objects as keys get stringified
const keyObj1 = { id: 1 };
const keyObj2 = { id: 2 };

obj[keyObj1] = 'object1';
obj[keyObj2] = 'object2'; // Overwrites previous!

console.log(obj[keyObj1]); // 'object2'
console.log(obj['[object Object]']); // 'object2'

// Symbols are the exception
const sym1 = Symbol('key1');
const sym2 = Symbol('key2');

obj[sym1] = 'symbol1';
obj[sym2] = 'symbol2';

console.log(obj[sym1]); // 'symbol1'
console.log(obj[sym2]); // 'symbol2'

// Symbols don't appear in Object.keys()
console.log(Object.keys(obj)); // ['1', 'true', 'null', 'undefined', '[object Object]']
console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(key1), Symbol(key2)]

// Map allows any key type
const map = new Map();
map.set(1, 'number key');
map.set('1', 'string key');
map.set(keyObj1, 'object key 1');
map.set(keyObj2, 'object key 2');

console.log(map.get(1));     // 'number key'
console.log(map.get('1'));   // 'string key'
console.log(map.get(keyObj1)); // 'object key 1'
console.log(map.get(keyObj2)); // 'object key 2'

// Computed property names
const dynamicKey = 'computed';
const dynamicObj = {
  [dynamicKey]: 'value',
  [sym1]: 'symbol value',
  [1 + 2]: 'computed number'
};

console.log(dynamicObj); // { '3': 'computed number', computed: 'value', [Symbol(key1)]: 'symbol value' }`,
    explanation: "String conversion ensures consistent property access. Use Map when you need non-string keys or Symbols for unique properties."
  },
  {
    id: 51,
    question: "What is Object.assign and how does it work?",
    answer: "Object.assign copies enumerable properties from source objects to target object. It performs shallow copy and returns target.",
    example: `// Basic usage
const target = { a: 1, b: 2 };
const source1 = { b: 3, c: 4 };
const source2 = { c: 5, d: 6 };

const result = Object.assign(target, source1, source2);
console.log(result); // { a: 1, b: 3, c: 5, d: 6 }
console.log(target === result); // true - target is modified

// Cloning objects (shallow)
const original = { name: 'John', age: 30 };
const clone = Object.assign({}, original);
clone.name = 'Jane';
console.log(original.name); // 'John' - unchanged

// Merging multiple objects
const defaults = { theme: 'light', lang: 'en' };
const userPrefs = { theme: 'dark' };
const config = Object.assign({}, defaults, userPrefs);
console.log(config); // { theme: 'dark', lang: 'en' }

// Shallow copy limitation
const nested = {
  user: { name: 'John' },
  settings: { theme: 'dark' }
};

const shallowCopy = Object.assign({}, nested);
shallowCopy.user.name = 'Jane';
console.log(nested.user.name); // 'Jane' - original affected!

// Only enumerable properties are copied
const source = {};
Object.defineProperty(source, 'hidden', {
  value: 'secret',
  enumerable: false
});
source.visible = 'public';

const copy = Object.assign({}, source);
console.log(copy); // { visible: 'public' } - 'hidden' not copied

// Symbols are copied
const sym = Symbol('key');
const withSymbol = { [sym]: 'symbol value', normal: 'normal value' };
const symbolCopy = Object.assign({}, withSymbol);
console.log(symbolCopy[sym]); // 'symbol value'

// Modern alternative: spread operator
const spreadClone = { ...original };
const spreadMerge = { ...defaults, ...userPrefs };

// Getters become data properties
const withGetter = {
  get computed() {
    return 'computed value';
  }
};

const getterCopy = Object.assign({}, withGetter);
console.log(Object.getOwnPropertyDescriptor(getterCopy, 'computed'));
// { value: 'computed value', writable: true, enumerable: true, configurable: true }`,
    explanation: "Object.assign is useful for shallow cloning and merging. Use spread operator for cleaner syntax in modern JavaScript."
  },
  {
    id: 52,
    question: "What is structuredClone?",
    answer: "structuredClone creates deep copies of objects using structured clone algorithm. It handles more data types than JSON methods.",
    example: `// Basic deep cloning
const original = {
  name: 'John',
  age: 30,
  address: {
    city: 'NYC',
    country: 'USA'
  },
  hobbies: ['reading', 'coding']
};

const deepCopy = structuredClone(original);
deepCopy.address.city = 'LA';
deepCopy.hobbies.push('gaming');

console.log(original.address.city); // 'NYC' - unchanged
console.log(original.hobbies); // ['reading', 'coding'] - unchanged

// Handles complex data types
const complex = {
  date: new Date(),
  regex: /test/gi,
  map: new Map([['key', 'value']]),
  set: new Set([1, 2, 3]),
  arrayBuffer: new ArrayBuffer(8),
  error: new Error('test error')
};

const complexCopy = structuredClone(complex);
console.log(complexCopy.date instanceof Date); // true
console.log(complexCopy.regex instanceof RegExp); // true
console.log(complexCopy.map instanceof Map); // true

// Handles circular references
const circular = { name: 'test' };
circular.self = circular;

const circularCopy = structuredClone(circular);
console.log(circularCopy.self === circularCopy); // true

// Cannot clone functions, DOM nodes, etc.
const withFunction = {
  data: 'value',
  method: function() { return 'hello'; }
};

try {
  const functionCopy = structuredClone(withFunction);
} catch (error) {
  console.log('Cannot clone functions'); // DataCloneError
}

// Comparison with other methods
const testObj = {
  date: new Date(),
  nested: { value: 42 }
};

// JSON method (limited)
const jsonCopy = JSON.parse(JSON.stringify(testObj));
console.log(jsonCopy.date instanceof Date); // false - becomes string

// structuredClone (better)
const structuredCopy = structuredClone(testObj);
console.log(structuredCopy.date instanceof Date); // true

// Browser support check
if (typeof structuredClone === 'function') {
  const copy = structuredClone(original);
} else {
  // Fallback to JSON or custom implementation
  const copy = JSON.parse(JSON.stringify(original));
}

// With transfer (for ArrayBuffers)
const buffer = new ArrayBuffer(16);
const transferred = structuredClone(buffer, { transfer: [buffer] });
// Original buffer is now detached`,
    explanation: "structuredClone is the modern way to deep clone objects. It handles more types than JSON but can't clone functions or DOM nodes."
  },
  {
    id: 53,
    question: "How to remove duplicates from an array? (multiple ways)",
    answer: "Use Set, filter with indexOf, reduce, or Map depending on data type and performance needs.",
    example: `const numbers = [1, 2, 2, 3, 3, 4, 5, 5];

// Method 1: Set (simplest for primitives)
const unique1 = [...new Set(numbers)];
console.log(unique1); // [1, 2, 3, 4, 5]

// Method 2: filter + indexOf
const unique2 = numbers.filter((item, index) => numbers.indexOf(item) === index);
console.log(unique2); // [1, 2, 3, 4, 5]

// Method 3: reduce
const unique3 = numbers.reduce((acc, current) => {
  if (!acc.includes(current)) {
    acc.push(current);
  }
  return acc;
}, []);
console.log(unique3); // [1, 2, 3, 4, 5]

// Method 4: Map for better performance
const unique4 = numbers.reduce((acc, current) => {
  const map = acc.map || new Map();
  if (!map.has(current)) {
    map.set(current, true);
    acc.result = acc.result || [];
    acc.result.push(current);
  }
  acc.map = map;
  return acc;
}, {}).result;

// For objects (by property)
const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 1, name: 'John' },
  { id: 3, name: 'Bob' }
];

// Remove duplicates by id
const uniqueUsers = users.filter((user, index, self) => 
  index === self.findIndex(u => u.id === user.id)
);
console.log(uniqueUsers); // [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }, { id: 3, name: 'Bob' }]

// Using Map for objects (more efficient)
const uniqueUsersMap = Array.from(
  users.reduce((map, user) => map.set(user.id, user), new Map()).values()
);

// For complex objects (by multiple properties)
const products = [
  { name: 'Apple', category: 'Fruit' },
  { name: 'Banana', category: 'Fruit' },
  { name: 'Apple', category: 'Fruit' },
  { name: 'Apple', category: 'Electronics' }
];

const uniqueProducts = products.filter((product, index, self) =>
  index === self.findIndex(p => p.name === product.name && p.category === product.category)
);

// Performance comparison for large arrays
const largeArray = Array.from({ length: 100000 }, () => Math.floor(Math.random() * 1000));

console.time('Set method');
const setResult = [...new Set(largeArray)];
console.timeEnd('Set method'); // Fastest

console.time('filter + indexOf');
const filterResult = largeArray.filter((item, index) => largeArray.indexOf(item) === index);
console.timeEnd('filter + indexOf'); // Slowest

// Custom function for any key
function uniqueBy(array, key) {
  const seen = new Set();
  return array.filter(item => {
    const value = typeof key === 'function' ? key(item) : item[key];
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
}

const uniqueByName = uniqueBy(users, 'name');
const uniqueByLength = uniqueBy(['a', 'bb', 'c', 'dd'], str => str.length);`,
    explanation: "Use Set for primitives (fastest), filter+indexOf for simple cases, Map/custom functions for objects. Consider performance for large arrays."
  },
  {
    id: 54,
    question: "Explain sorting in JS. Why does sort() behave weird sometimes?",
    answer: "Array.sort() converts elements to strings by default, causing unexpected results with numbers. Use compare function for proper sorting.",
    example: `// Default sort (converts to strings)
const numbers = [10, 5, 40, 25, 1000, 1];
console.log(numbers.sort()); // [1, 10, 1000, 25, 40, 5] - Wrong!

// Why: '10' < '1000' < '25' < '40' < '5' (string comparison)

// Correct numeric sort
const numericSort = numbers.sort((a, b) => a - b);
console.log(numericSort); // [1, 5, 10, 25, 40, 1000] - Correct!

// Descending order
const descending = numbers.sort((a, b) => b - a);
console.log(descending); // [1000, 40, 25, 10, 5, 1]

// String sorting (works as expected)
const fruits = ['banana', 'apple', 'cherry', 'date'];
console.log(fruits.sort()); // ['apple', 'banana', 'cherry', 'date']

// Case-insensitive string sort
const names = ['John', 'alice', 'Bob', 'charlie'];
const caseInsensitive = names.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
console.log(caseInsensitive); // ['alice', 'Bob', 'charlie', 'John']

// Sorting objects
const users = [
  { name: 'John', age: 30 },
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 35 }
];

// Sort by age
const byAge = users.sort((a, b) => a.age - b.age);
console.log(byAge); // Alice(25), John(30), Bob(35)

// Sort by name
const byName = users.sort((a, b) => a.name.localeCompare(b.name));
console.log(byName); // Alice, Bob, John

// Multi-level sorting
const employees = [
  { department: 'IT', name: 'John', salary: 50000 },
  { department: 'HR', name: 'Alice', salary: 45000 },
  { department: 'IT', name: 'Bob', salary: 55000 },
  { department: 'HR', name: 'Charlie', salary: 48000 }
];

const multiSort = employees.sort((a, b) => {
  // First by department
  if (a.department !== b.department) {
    return a.department.localeCompare(b.department);
  }
  // Then by salary (descending)
  return b.salary - a.salary;
});

// Stable sort (maintains relative order for equal elements)
const items = [
  { name: 'A', priority: 1 },
  { name: 'B', priority: 2 },
  { name: 'C', priority: 1 },
  { name: 'D', priority: 2 }
];

// Modern browsers have stable sort
const stableSort = items.sort((a, b) => a.priority - b.priority);
// A and C maintain their relative order, B and D maintain theirs

// Custom sort functions
function sortByLength(a, b) {
  return a.length - b.length;
}

const words = ['hello', 'hi', 'javascript', 'code'];
console.log(words.sort(sortByLength)); // ['hi', 'code', 'hello', 'javascript']

// Sort modifies original array
const original = [3, 1, 2];
const sorted = original.sort((a, b) => a - b);
console.log(original); // [1, 2, 3] - modified!
console.log(sorted === original); // true

// To avoid modifying original
const copy = [...original].sort((a, b) => a - b);`,
    explanation: "sort() converts to strings by default. Always use compare function for numbers. Remember sort() modifies the original array."
  },
  {
    id: 55,
    question: "What is the time complexity of common array methods?",
    answer: "Most array methods are O(n). push/pop are O(1), shift/unshift are O(n), sort is O(n log n).",
    example: `const arr = [1, 2, 3, 4, 5];

// O(1) - Constant time
arr.push(6);        // Add to end
arr.pop();          // Remove from end
arr[0];             // Access by index
arr.length;         // Get length

// O(n) - Linear time
arr.shift();        // Remove from start (shifts all elements)
arr.unshift(0);     // Add to start (shifts all elements)
arr.indexOf(3);     // Find element (worst case: check all)
arr.includes(4);    // Check if exists (worst case: check all)
arr.reverse();      // Reverse array

// O(n) - Linear time (iterate through all)
arr.forEach(x => console.log(x));
arr.map(x => x * 2);
arr.filter(x => x > 2);
arr.reduce((acc, x) => acc + x, 0);
arr.find(x => x > 3);
arr.some(x => x > 3);
arr.every(x => x > 0);

// O(n log n) - Linearithmic time
arr.sort((a, b) => a - b);  // Most efficient comparison-based sorting

// O(n²) - Quadratic time (nested operations)
// Removing duplicates with nested loops
function removeDuplicatesNaive(array) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    let isDuplicate = false;
    for (let j = 0; j < result.length; j++) {
      if (array[i] === result[j]) {
        isDuplicate = true;
        break;
      }
    }
    if (!isDuplicate) {
      result.push(array[i]);
    }
  }
  return result;
}

// Performance comparison
const largeArray = Array.from({ length: 100000 }, (_, i) => i);

console.time('O(1) - push');
largeArray.push(100001);
console.timeEnd('O(1) - push'); // Very fast

console.time('O(n) - indexOf');
largeArray.indexOf(50000);
console.timeEnd('O(n) - indexOf'); // Slower

console.time('O(n) - map');
largeArray.map(x => x * 2);
console.timeEnd('O(n) - map'); // Slower

console.time('O(n log n) - sort');
[...largeArray].sort((a, b) => a - b);
console.timeEnd('O(n log n) - sort'); // Slowest

// Optimizing common operations
// Instead of multiple indexOf calls (O(n²))
const duplicates1 = arr.filter((item, index) => arr.indexOf(item) !== index);

// Use Set for O(n) performance
const seen = new Set();
const duplicates2 = arr.filter(item => {
  if (seen.has(item)) {
    return true;
  }
  seen.add(item);
  return false;
});

// Memory vs Time tradeoffs
// Time: O(n), Space: O(n)
const uniqueWithSet = [...new Set(arr)];

// Time: O(n²), Space: O(1)
const uniqueWithFilter = arr.filter((item, index) => arr.indexOf(item) === index);`,
    explanation: "Understanding time complexity helps choose the right method. Use Set/Map for O(1) lookups, avoid nested array methods for large data."
  }
];