export const es6Features = [
  {
    id: 46,
    question: "What are arrow functions? When not to use them?",
    answer: "Arrow functions are shorter syntax for functions. Don't use for methods, constructors, or when you need 'this' binding.",
    example: `// Regular function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;

// When NOT to use arrow functions:

// 1. Object methods (no 'this' binding)
const obj = {
  name: "John",
  greet: () => {
    console.log(this.name); // undefined - 'this' is not obj
  },
  greetRegular() {
    console.log(this.name); // "John" - 'this' is obj
  }
};

// 2. Event handlers (when you need 'this' as element)
button.addEventListener('click', function() {
  this.style.color = 'red'; // 'this' is button
});

button.addEventListener('click', () => {
  this.style.color = 'red'; // 'this' is not button
});

// 3. Constructors (no prototype)
const Person = (name) => {
  this.name = name; // Error: arrow functions can't be constructors
};

// 4. When you need arguments object
function regularFunc() {
  console.log(arguments); // Works
}

const arrowFunc = () => {
  console.log(arguments); // ReferenceError
};

// Use rest parameters instead
const arrowWithRest = (...args) => {
  console.log(args); // Works
};

// 5. Hoisting behavior
console.log(regularFunction()); // Works due to hoisting

function regularFunction() {
  return "I'm hoisted";
}

console.log(arrowFunction()); // ReferenceError

const arrowFunction = () => "I'm not hoisted";`,
    explanation: "Arrow functions inherit 'this' from enclosing scope, have no prototype, and can't be used as constructors."
  },
  {
    id: 47,
    question: "What is destructuring?",
    answer: "Destructuring extracts values from arrays or properties from objects into distinct variables.",
    example: `// Array destructuring
const arr = [1, 2, 3, 4, 5];
const [first, second, ...rest] = arr;
console.log(first); // 1
console.log(second); // 2
console.log(rest); // [3, 4, 5]

// Skipping elements
const [a, , c] = [1, 2, 3];
console.log(a, c); // 1, 3

// Default values
const [x = 10, y = 20] = [1];
console.log(x, y); // 1, 20

// Object destructuring
const person = { name: "John", age: 30, city: "NYC" };
const { name, age, country = "USA" } = person;
console.log(name); // "John"
console.log(age); // 30
console.log(country); // "USA" (default value)

// Renaming variables
const { name: personName, age: personAge } = person;
console.log(personName); // "John"

// Nested destructuring
const user = {
  id: 1,
  profile: {
    name: "Jane",
    address: { city: "LA", zip: "90210" }
  }
};

const { profile: { name: userName, address: { city } } } = user;
console.log(userName); // "Jane"
console.log(city); // "LA"

// Function parameters
function greet({ name, age = 25 }) {
  console.log(\`Hello \${name}, you are \${age}\`);
}

greet({ name: "Bob" }); // "Hello Bob, you are 25"

// Swapping variables
let a = 1, b = 2;
[a, b] = [b, a];
console.log(a, b); // 2, 1

// Rest in objects
const { name, ...otherProps } = person;
console.log(otherProps); // { age: 30, city: "NYC" }

// Dynamic property names
const key = "name";
const { [key]: dynamicValue } = person;
console.log(dynamicValue); // "John"`,
    explanation: "Destructuring provides clean syntax for extracting data. Supports default values and nested structures."
  },
  {
    id: 48,
    question: "What is the spread operator? Rest operator?",
    answer: "Spread (...) expands iterables. Rest (...) collects multiple elements into array/object.",
    example: `// Spread operator - expands
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// Array spreading
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]
const withExtra = [0, ...arr1, 3.5, ...arr2, 7]; // [0, 1, 2, 3, 3.5, 4, 5, 6, 7]

// Object spreading
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj2 }; // { a: 1, b: 2, c: 3, d: 4 }

// Overriding properties
const updated = { ...obj1, b: 20, e: 5 }; // { a: 1, b: 20, e: 5 }

// Function calls
const numbers = [1, 2, 3, 4, 5];
console.log(Math.max(...numbers)); // 5
console.log(Math.min(...numbers)); // 1

// String spreading
const str = "hello";
const chars = [...str]; // ['h', 'e', 'l', 'l', 'o']

// Rest operator - collects
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4)); // 10

// Rest in destructuring
const [first, ...remaining] = [1, 2, 3, 4, 5];
console.log(first); // 1
console.log(remaining); // [2, 3, 4, 5]

const { name, ...otherProps } = { name: "John", age: 30, city: "NYC" };
console.log(otherProps); // { age: 30, city: "NYC" }

// Rest parameters vs arguments
function oldWay() {
  const args = Array.prototype.slice.call(arguments);
  return args.reduce((sum, num) => sum + num, 0);
}

function newWay(...args) {
  return args.reduce((sum, num) => sum + num, 0);
}

// Copying arrays/objects (shallow)
const originalArray = [1, 2, 3];
const copiedArray = [...originalArray];

const originalObj = { a: 1, b: 2 };
const copiedObj = { ...originalObj };

// Converting NodeList to Array
const divs = document.querySelectorAll('div');
const divArray = [...divs];`,
    explanation: "Spread expands collections, rest collects items. Same syntax (...) but opposite purposes."
  },
  {
    id: 49,
    question: "What is optional chaining?",
    answer: "Optional chaining (?.) safely accesses nested properties without throwing errors if intermediate values are null/undefined.",
    example: `const user = {
  name: "John",
  address: {
    street: "123 Main St",
    city: "NYC"
  },
  getPhone: function() {
    return "555-1234";
  }
};

// Without optional chaining (risky)
// console.log(user.address.country.code); // TypeError if country is undefined

// With optional chaining (safe)
console.log(user.address?.country?.code); // undefined (no error)
console.log(user.address?.city); // "NYC"
console.log(user.profile?.name); // undefined

// Method chaining
console.log(user.getPhone?.()); // "555-1234"
console.log(user.getEmail?.()); // undefined (method doesn't exist)

// Array access
const users = [
  { name: "Alice", posts: [{ title: "Post 1" }] },
  { name: "Bob" }
];

console.log(users[0]?.posts?.[0]?.title); // "Post 1"
console.log(users[1]?.posts?.[0]?.title); // undefined

// Dynamic property access
const key = "address";
console.log(user[key]?.city); // "NYC"
console.log(user[key]?.country); // undefined

// Combining with nullish coalescing
const city = user.address?.city ?? "Unknown";
console.log(city); // "NYC"

const country = user.address?.country ?? "USA";
console.log(country); // "USA"

// Real-world API response handling
const apiResponse = {
  data: {
    user: {
      profile: {
        avatar: "avatar.jpg"
      }
    }
  }
};

// Safe access to deeply nested API data
const avatar = apiResponse?.data?.user?.profile?.avatar ?? "default.jpg";
console.log(avatar); // "avatar.jpg"

// Function calls with optional chaining
const api = {
  users: {
    get: (id) => ({ name: "User " + id })
  }
};

const userData = api?.users?.get?.(1);
console.log(userData); // { name: "User 1" }

const nonExistent = api?.posts?.get?.(1);
console.log(nonExistent); // undefined`,
    explanation: "Optional chaining prevents TypeError when accessing nested properties, making code more robust and readable."
  },
  {
    id: 50,
    question: "What are generators? Why are they used?",
    answer: "Generators are functions that can pause and resume execution. They yield values on demand and maintain state between calls.",
    example: `// Basic generator
function* simpleGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = simpleGenerator();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }

// Generator with infinite sequence
function* fibonacci() {
  let a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();
console.log(fib.next().value); // 0
console.log(fib.next().value); // 1
console.log(fib.next().value); // 1
console.log(fib.next().value); // 2
console.log(fib.next().value); // 3

// Generator with parameters
function* parameterGenerator() {
  const x = yield "First yield";
  console.log("Received:", x);
  const y = yield "Second yield";
  console.log("Received:", y);
  return x + y;
}

const paramGen = parameterGenerator();
console.log(paramGen.next());        // { value: "First yield", done: false }
console.log(paramGen.next(10));      // Logs "Received: 10", returns { value: "Second yield", done: false }
console.log(paramGen.next(20));      // Logs "Received: 20", returns { value: 30, done: true }

// Practical use case: ID generator
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const getId = idGenerator();
console.log(getId.next().value); // 1
console.log(getId.next().value); // 2
console.log(getId.next().value); // 3

// Async generator for data streaming
async function* fetchPages() {
  let page = 1;
  while (page <= 3) {
    const response = await fetch(\`/api/data?page=\${page}\`);
    const data = await response.json();
    yield data;
    page++;
  }
}

// Usage with for-await-of
async function processData() {
  for await (const pageData of fetchPages()) {
    console.log("Processing page:", pageData);
  }
}

// Generator for tree traversal
function* traverseTree(node) {
  yield node.value;
  if (node.children) {
    for (const child of node.children) {
      yield* traverseTree(child);
    }
  }
}

const tree = {
  value: 1,
  children: [
    { value: 2, children: [{ value: 4 }, { value: 5 }] },
    { value: 3, children: [{ value: 6 }] }
  ]
};

for (const value of traverseTree(tree)) {
  console.log(value); // 1, 2, 4, 5, 3, 6
}`,
    explanation: "Generators enable lazy evaluation, memory-efficient iteration, and stateful iteration patterns."
  },
  {
    id: 51,
    question: "What is a module? Difference between CommonJS & ES modules.",
    answer: "Modules encapsulate code. CommonJS uses require/module.exports (Node.js). ES modules use import/export (standard).",
    example: `// ES Modules (ES6+)
// math.js
export const PI = 3.14159;
export function add(a, b) {
  return a + b;
}
export function multiply(a, b) {
  return a * b;
}

// Default export
export default function subtract(a, b) {
  return a - b;
}

// main.js
import subtract, { PI, add, multiply } from './math.js';
import * as math from './math.js';

console.log(PI); // 3.14159
console.log(add(2, 3)); // 5
console.log(subtract(5, 2)); // 3
console.log(math.multiply(3, 4)); // 12

// CommonJS (Node.js)
// math.js
const PI = 3.14159;
function add(a, b) {
  return a + b;
}
function multiply(a, b) {
  return a * b;
}
function subtract(a, b) {
  return a - b;
}

module.exports = {
  PI,
  add,
  multiply,
  subtract
};

// Or individual exports
exports.PI = PI;
exports.add = add;

// main.js
const { PI, add, multiply } = require('./math');
const math = require('./math');

console.log(PI); // 3.14159
console.log(add(2, 3)); // 5

// Key differences:

// 1. Syntax
// ES Modules: import/export
// CommonJS: require/module.exports

// 2. Loading
// ES Modules: Static (compile-time)
// CommonJS: Dynamic (runtime)

// 3. Tree shaking
// ES Modules: Supports tree shaking
// CommonJS: No tree shaking

// 4. Top-level await
// ES Modules: Supported
// CommonJS: Not supported

// 5. File extension
// ES Modules: .mjs or .js with "type": "module" in package.json
// CommonJS: .js (default in Node.js)

// Dynamic imports (ES Modules)
async function loadModule() {
  const { add } = await import('./math.js');
  console.log(add(2, 3));
}

// Conditional imports
if (condition) {
  import('./feature.js').then(module => {
    module.initialize();
  });
}

// Re-exports
// utils.js
export { add, multiply } from './math.js';
export { default as subtract } from './math.js';`,
    explanation: "ES modules are the standard with static analysis benefits. CommonJS is Node.js legacy with dynamic loading."
  },
  {
    id: 52,
    question: "What is the difference between import and require?",
    answer: "import is ES6 module syntax (static). require is CommonJS (dynamic). import is hoisted, require is not.",
    example: `// import (ES Modules)
// Static - analyzed at compile time
import { add, multiply } from './math.js';
import subtract from './math.js';

// Hoisted - can use before declaration
console.log(add(2, 3)); // Works

// All imports are at top level
import { PI } from './constants.js';

// Dynamic import (ES2020)
async function loadMath() {
  const math = await import('./math.js');
  return math.add(2, 3);
}

// Conditional dynamic import
if (needsAdvancedMath) {
  const advanced = await import('./advanced-math.js');
  advanced.complexCalculation();
}

// require (CommonJS)
// Dynamic - executed at runtime
const { add, multiply } = require('./math');
const subtract = require('./math').subtract;

// Not hoisted - must come before usage
const result = add(2, 3); // Must require first

// Can be conditional
if (process.env.NODE_ENV === 'development') {
  const debug = require('./debug');
  debug.log('Development mode');
}

// Can be inside functions
function loadMath() {
  const math = require('./math');
  return math.add(2, 3);
}

// Key differences:

// 1. Hoisting
console.log(add(1, 2)); // Works with import (hoisted)
import { add } from './math.js';

console.log(add2(1, 2)); // ReferenceError with require
const { add2 } = require('./math');

// 2. Static vs Dynamic
// import - bundlers can analyze and tree-shake
// require - runtime resolution, no tree-shaking

// 3. Syntax
// import: declarative, clean syntax
// require: function call, more verbose

// 4. Default exports
// ES Modules
export default function() {}
import myFunction from './module.js';

// CommonJS
module.exports = function() {}
const myFunction = require('./module');

// 5. Named exports
// ES Modules
export const name = 'value';
import { name } from './module.js';

// CommonJS
exports.name = 'value';
const { name } = require('./module');

// 6. Circular dependencies
// ES Modules handle circular dependencies better
// CommonJS can have issues with circular requires

// 7. Browser support
// import: Native browser support (with type="module")
// require: Needs bundler/transpiler for browsers

// Mixed usage (Node.js with ES modules)
// package.json: "type": "module"
import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const packageJson = require('./package.json');`,
    explanation: "import enables static analysis and tree-shaking. require is dynamic and flexible but less optimizable."
  }
];