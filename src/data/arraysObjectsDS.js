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
  }
];