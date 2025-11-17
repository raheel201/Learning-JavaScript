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
  },
  {
    id: 53,
    question: "What are template literals and tagged templates?",
    answer: "Template literals use backticks for string interpolation. Tagged templates allow custom processing of template literals.",
    example: `// Basic template literals
const name = 'John';
const age = 30;
const message = \`Hello, my name is \${name} and I'm \${age} years old.\`;
console.log(message); // "Hello, my name is John and I'm 30 years old."

// Multiline strings
const multiline = \`
  This is a
  multiline
  string
\`;

// Expressions in templates
const a = 5, b = 10;
const result = \`The sum of \${a} and \${b} is \${a + b}.\`;
console.log(result); // "The sum of 5 and 10 is 15."

// Tagged templates
function highlight(strings, ...values) {
  return strings.reduce((result, string, i) => {
    const value = values[i] ? \`<mark>\${values[i]}</mark>\` : '';
    return result + string + value;
  }, '');
}

const user = 'Alice';
const score = 95;
const highlighted = highlight\`User \${user} scored \${score} points!\`;
console.log(highlighted); // "User <mark>Alice</mark> scored <mark>95</mark> points!"

// SQL template tag
function sql(strings, ...values) {
  return {
    query: strings.join('?'),
    values: values
  };
}

const userId = 123;
const status = 'active';
const query = sql\`SELECT * FROM users WHERE id = \${userId} AND status = \${status}\`;
console.log(query); // { query: "SELECT * FROM users WHERE id = ? AND status = ?", values: [123, "active"] }

// Styled components pattern
function styled(strings, ...values) {
  return (props) => {
    return strings.reduce((result, string, i) => {
      const value = values[i] ? values[i](props) : '';
      return result + string + value;
    }, '');
  };
}

const Button = styled\`
  background: \${props => props.primary ? 'blue' : 'gray'};
  color: white;
  padding: 10px;
\`;

const primaryButton = Button({ primary: true });
console.log(primaryButton); // CSS with blue background

// Raw strings
function raw(strings, ...values) {
  console.log(strings.raw); // Access raw strings
  return String.raw(strings, ...values);
}

const path = raw\`C:\\Users\\\${name}\\Documents\`;
console.log(path); // "C:\\Users\\John\\Documents"

// Internationalization
function i18n(strings, ...values) {
  const translations = {
    'Hello, my name is': 'Hola, mi nombre es',
    'and I am': 'y tengo',
    'years old': 'años'
  };
  
  return strings.reduce((result, string, i) => {
    const translated = translations[string.trim()] || string;
    const value = values[i] || '';
    return result + translated + value;
  }, '');
}

const spanish = i18n\`Hello, my name is \${name} and I am \${age} years old\`;
console.log(spanish);`,
    explanation: "Template literals provide clean string interpolation. Tagged templates enable custom string processing for libraries and frameworks."
  },
  {
    id: 54,
    question: "Explain let vs const hoisting behavior.",
    answer: "let and const are hoisted but in Temporal Dead Zone. They can't be accessed before declaration, unlike var.",
    example: `// var hoisting (old behavior)
console.log(varVariable); // undefined (not error)
var varVariable = 'I am var';

// let hoisting (TDZ)
console.log(letVariable); // ReferenceError: Cannot access before initialization
let letVariable = 'I am let';

// const hoisting (TDZ)
console.log(constVariable); // ReferenceError: Cannot access before initialization
const constVariable = 'I am const';

// Temporal Dead Zone example
function example() {
  console.log(typeof x); // ReferenceError (x is in TDZ)
  let x = 1;
}

// vs
function example2() {
  console.log(typeof y); // "undefined" (y doesn't exist)
}

// Block scoping
if (true) {
  console.log(blockVar); // undefined
  console.log(blockLet); // ReferenceError
  
  var blockVar = 'var in block';
  let blockLet = 'let in block';
}

console.log(blockVar); // 'var in block' (accessible outside)
console.log(blockLet); // ReferenceError (not accessible outside)

// Loop behavior
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log('var:', i), 100); // Prints: 3, 3, 3
}

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log('let:', j), 100); // Prints: 0, 1, 2
}

// const with objects
const obj = { name: 'John' };
obj.name = 'Jane'; // OK - object content can change
obj.age = 30; // OK - adding properties
// obj = {}; // Error - can't reassign

const arr = [1, 2, 3];
arr.push(4); // OK - array content can change
// arr = []; // Error - can't reassign

// Function declarations vs expressions
// Function declaration - fully hoisted
console.log(hoistedFunction()); // "I'm hoisted!"

function hoistedFunction() {
  return "I'm hoisted!";
}

// Function expression with var
console.log(varFunc); // undefined
console.log(varFunc()); // TypeError: varFunc is not a function
var varFunc = function() {
  return "I'm a var function";
};

// Function expression with let/const
console.log(letFunc); // ReferenceError
let letFunc = function() {
  return "I'm a let function";
};

console.log(constFunc); // ReferenceError
const constFunc = function() {
  return "I'm a const function";
};

// Class hoisting (similar to let/const)
console.log(MyClass); // ReferenceError
class MyClass {
  constructor(name) {
    this.name = name;
  }
}`,
    explanation: "let and const prevent accidental usage before declaration. TDZ catches errors early and makes code more predictable."
  },
  {
    id: 55,
    question: "What are symbols? Why are they unique?",
    answer: "Symbols are primitive data type that creates unique identifiers. Each Symbol() call creates a unique value, even with same description.",
    example: `// Creating symbols
const sym1 = Symbol();
const sym2 = Symbol();
const sym3 = Symbol('description');
const sym4 = Symbol('description');

console.log(sym1 === sym2); // false - each Symbol is unique
console.log(sym3 === sym4); // false - even with same description

// Symbol as object property
const obj = {};
const nameSymbol = Symbol('name');
const ageSymbol = Symbol('age');

obj[nameSymbol] = 'John';
obj[ageSymbol] = 30;
obj.regularProp = 'visible';

console.log(obj[nameSymbol]); // 'John'
console.log(obj[ageSymbol]); // 30

// Symbols don't appear in regular enumeration
console.log(Object.keys(obj)); // ['regularProp']
console.log(Object.getOwnPropertyNames(obj)); // ['regularProp']
console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(name), Symbol(age)]

// Global symbol registry
const globalSym1 = Symbol.for('shared');
const globalSym2 = Symbol.for('shared');
console.log(globalSym1 === globalSym2); // true - same global symbol

// Get key from global symbol
console.log(Symbol.keyFor(globalSym1)); // 'shared'
console.log(Symbol.keyFor(sym1)); // undefined - not global

// Well-known symbols
const arr = [1, 2, 3];
console.log(arr[Symbol.iterator]); // Native iterator function

// Custom iterator using Symbol.iterator
const range = {
  start: 1,
  end: 5,
  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;
    return {
      next() {
        if (current <= end) {
          return { value: current++, done: false };
        }
        return { done: true };
      }
    };
  }
};

for (const num of range) {
  console.log(num); // 1, 2, 3, 4, 5
}

// Symbol.toStringTag
class MyClass {
  get [Symbol.toStringTag]() {
    return 'MyClass';
  }
}

const instance = new MyClass();
console.log(instance.toString()); // '[object MyClass]'

// Private-like properties with symbols
const _private = Symbol('private');

class User {
  constructor(name) {
    this.name = name;
    this[_private] = 'secret data';
  }
  
  getPrivate() {
    return this[_private];
  }
}

const user = new User('John');
console.log(user.name); // 'John'
console.log(user[_private]); // 'secret data' (if you have the symbol)
console.log(Object.keys(user)); // ['name'] - symbol not enumerated

// Symbol.hasInstance
class MyArray {
  static [Symbol.hasInstance](obj) {
    return Array.isArray(obj);
  }
}

console.log([1, 2, 3] instanceof MyArray); // true`,
    explanation: "Symbols create unique property keys that don't conflict with strings. Useful for private properties and protocol implementation."
  },
  {
    id: 56,
    question: "What is the difference between rest in function parameters vs spread in arrays?",
    answer: "Rest collects multiple arguments into array. Spread expands array into individual elements. Same syntax, opposite purposes.",
    example: `// Rest parameters - collects arguments
function sum(...numbers) {
  console.log(numbers); // Array of all arguments
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4)); // 10
console.log(sum(5, 10)); // 15

// Rest must be last parameter
function greet(greeting, ...names) {
  return \`\${greeting} \${names.join(', ')}!\`;
}

console.log(greet('Hello', 'John', 'Jane', 'Bob')); // "Hello John, Jane, Bob!"

// Spread in arrays - expands elements
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]
const withExtra = [0, ...arr1, 3.5, ...arr2, 7]; // [0, 1, 2, 3, 3.5, 4, 5, 6, 7]

// Spread in function calls
const numbers = [1, 2, 3, 4, 5];
console.log(Math.max(...numbers)); // 5 - spreads array as arguments
console.log(Math.min(...numbers)); // 1

// Rest in destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first); // 1
console.log(second); // 2
console.log(rest); // [3, 4, 5]

// Spread in object literals
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj2 }; // { a: 1, b: 2, c: 3, d: 4 }

// Rest in object destructuring
const person = { name: 'John', age: 30, city: 'NYC', country: 'USA' };
const { name, age, ...address } = person;
console.log(name); // 'John'
console.log(age); // 30
console.log(address); // { city: 'NYC', country: 'USA' }

// Practical examples
// Rest: Variable arguments function
function createUser(name, email, ...permissions) {
  return {
    name,
    email,
    permissions: permissions
  };
}

const user = createUser('John', 'john@email.com', 'read', 'write', 'admin');
console.log(user.permissions); // ['read', 'write', 'admin']

// Spread: Cloning and merging
const originalArray = [1, 2, 3];
const clonedArray = [...originalArray]; // Shallow clone

const defaultConfig = { theme: 'light', lang: 'en' };
const userConfig = { theme: 'dark' };
const finalConfig = { ...defaultConfig, ...userConfig }; // { theme: 'dark', lang: 'en' }

// Converting iterables
const str = 'hello';
const chars = [...str]; // ['h', 'e', 'l', 'l', 'o']

const nodeList = document.querySelectorAll('div');
const divArray = [...nodeList]; // Convert NodeList to Array

// Rest vs arguments object
function oldWay() {
  const args = Array.prototype.slice.call(arguments);
  return args.reduce((sum, num) => sum + num, 0);
}

function newWay(...args) {
  return args.reduce((sum, num) => sum + num, 0); // args is already array
}`,
    explanation: "Rest gathers multiple items into array. Spread expands array into multiple items. Essential for modern JavaScript patterns."
  },
  {
    id: 57,
    question: "What is tree shaking in ES modules?",
    answer: "Tree shaking removes unused code from bundles. ES modules enable static analysis to eliminate dead code automatically.",
    example: `// utils.js - Library with multiple functions
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export function multiply(a, b) {
  console.log('This function is never used');
  return a * b;
}

export function divide(a, b) {
  return a / b;
}

export const PI = 3.14159;

export const UNUSED_CONSTANT = 'This will be tree-shaken';

// main.js - Only imports what's needed
import { add, subtract } from './utils.js';

console.log(add(5, 3)); // 8
console.log(subtract(10, 4)); // 6

// multiply, divide, and UNUSED_CONSTANT are not imported
// Tree shaking will remove them from the final bundle

// What enables tree shaking:
// 1. Static imports (not dynamic)
import { specificFunction } from './module.js'; // ✅ Can be tree-shaken

// Dynamic imports can't be fully tree-shaken
if (condition) {
  import('./module.js').then(module => {
    // ❌ Harder to tree-shake
  });
}

// 2. Named exports (not default exports)
// Good for tree shaking
export const func1 = () => {};
export const func2 = () => {};

// Less optimal for tree shaking
export default {
  func1: () => {},
  func2: () => {}
};

// 3. Side-effect free modules
// Good - pure functions
export function pureFunction(x) {
  return x * 2;
}

// Bad - has side effects
console.log('This runs when module is imported'); // Side effect
export function impureFunction(x) {
  window.globalVar = x; // Side effect
  return x * 2;
}

// Package.json configuration
// {
//   "sideEffects": false  // Tells bundlers this package is side-effect free
// }

// Or specify files with side effects
// {
//   "sideEffects": ["./src/polyfills.js", "*.css"]
// }

// Webpack example configuration
// webpack.config.js
// module.exports = {
//   mode: 'production', // Enables tree shaking
//   optimization: {
//     usedExports: true,
//     sideEffects: false
//   }
// };

// Real-world example: Lodash
// Bad - imports entire library
import _ from 'lodash';
const result = _.debounce(func, 300);

// Good - imports only needed function
import debounce from 'lodash/debounce';
const result = debounce(func, 300);

// Even better - with tree-shakable lodash-es
import { debounce } from 'lodash-es';
const result = debounce(func, 300);

// Barrel exports can hurt tree shaking
// index.js (barrel file)
export * from './module1.js';
export * from './module2.js';
export * from './module3.js';

// Better approach
// index.js
export { specificFunction1 } from './module1.js';
export { specificFunction2 } from './module2.js';

// Checking bundle size
// Use webpack-bundle-analyzer or similar tools
// npm install --save-dev webpack-bundle-analyzer

// Build script to analyze bundle
// "analyze": "webpack-bundle-analyzer dist/main.js"`,
    explanation: "Tree shaking eliminates unused code, reducing bundle size. Use named exports, avoid side effects, and configure bundlers properly."
  },
  {
    id: 58,
    question: "Why are ES modules async by default?",
    answer: "ES modules are async to enable non-blocking loading, better performance, and support for top-level await.",
    example: `// ES modules load asynchronously
// main.js
import { getData } from './api.js';
import { processData } from './processor.js';

// These imports don't block each other
// They can load in parallel

console.log('Main module executing');

// api.js
export async function getData() {
  const response = await fetch('/api/data');
  return response.json();
}

// processor.js
export function processData(data) {
  return data.map(item => item.value * 2);
}

// Top-level await (ES2022)
// data-loader.js
const response = await fetch('/api/config');
const config = await response.json();

export { config };

// This works because ES modules are async
// CommonJS can't do this:
// const config = await fetch('/api/config'); // SyntaxError in CommonJS

// Dynamic imports are also async
async function loadFeature() {
  const { feature } = await import('./feature.js');
  feature.initialize();
}

// Conditional loading
if (user.isAdmin) {
  const { adminPanel } = await import('./admin-panel.js');
  adminPanel.render();
}

// Lazy loading with React
const LazyComponent = React.lazy(() => import('./LazyComponent.js'));

// Module loading phases
// 1. Construction - Find and download modules
// 2. Instantiation - Create module instances
// 3. Evaluation - Execute module code

// These phases can happen asynchronously

// Browser loading
// <script type="module" src="main.js"></script>
// Loads asynchronously, doesn't block HTML parsing

// vs
// <script src="script.js"></script>
// Blocks HTML parsing

// Module preloading
// <link rel="modulepreload" href="important-module.js">
// Preloads module without executing

// Service Worker with modules
// sw.js
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';

// Async module loading in Service Worker
self.addEventListener('install', async (event) => {
  const { cacheAssets } = await import('./cache-strategy.js');
  await cacheAssets();
});

// Node.js ES modules
// package.json: "type": "module"
// All .js files are treated as ES modules

// Async initialization pattern
// app.js
import { initDatabase } from './database.js';
import { startServer } from './server.js';

async function bootstrap() {
  await initDatabase();
  await startServer();
  console.log('App started');
}

bootstrap().catch(console.error);

// Error handling with async modules
try {
  const { riskyFunction } = await import('./risky-module.js');
  riskyFunction();
} catch (error) {
  console.error('Failed to load or execute module:', error);
}

// Performance benefits
// 1. Non-blocking - doesn't stop other operations
// 2. Parallel loading - multiple modules load simultaneously
// 3. Lazy loading - load only when needed
// 4. Better caching - modules can be cached individually`,
    explanation: "Async loading prevents blocking, enables parallel downloads, supports top-level await, and improves web performance."
  },
  {
    id: 59,
    question: "What are dynamic imports and why are they useful?",
    answer: "Dynamic imports load modules at runtime using import() function. Useful for code splitting, lazy loading, and conditional imports.",
    example: `// Basic dynamic import
async function loadMath() {
  const mathModule = await import('./math.js');
  return mathModule.add(2, 3);
}

// With destructuring
async function loadUtils() {
  const { debounce, throttle } = await import('./utils.js');
  return { debounce, throttle };
}

// Conditional loading
async function loadFeature(featureName) {
  if (featureName === 'advanced') {
    const { advancedFeature } = await import('./advanced-feature.js');
    return advancedFeature;
  } else {
    const { basicFeature } = await import('./basic-feature.js');
    return basicFeature;
  }
}

// User interaction triggered loading
button.addEventListener('click', async () => {
  const { modal } = await import('./modal.js');
  modal.show('Hello World');
});

// Route-based code splitting
const routes = {
  '/home': () => import('./pages/home.js'),
  '/about': () => import('./pages/about.js'),
  '/contact': () => import('./pages/contact.js')
};

async function navigateTo(path) {
  const loadPage = routes[path];
  if (loadPage) {
    const page = await loadPage();
    page.render();
  }
}

// Error handling
async function safeImport(modulePath) {
  try {
    const module = await import(modulePath);
    return module;
  } catch (error) {
    console.error(\`Failed to load module \${modulePath}:\`, error);
    // Load fallback module
    return import('./fallback.js');
  }
}

// Loading with timeout
function importWithTimeout(modulePath, timeout = 5000) {
  return Promise.race([
    import(modulePath),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Import timeout')), timeout)
    )
  ]);
}

// Preloading for better UX
const moduleCache = new Map();

async function preloadModule(modulePath) {
  if (!moduleCache.has(modulePath)) {
    const modulePromise = import(modulePath);
    moduleCache.set(modulePath, modulePromise);
    return modulePromise;
  }
  return moduleCache.get(modulePath);
}

// Usage with preloading
function onMouseEnter() {
  preloadModule('./heavy-component.js'); // Preload on hover
}

function onClick() {
  const module = moduleCache.get('./heavy-component.js'); // Use cached
  module.then(({ component }) => component.render());
}

// React lazy loading
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}

// Webpack code splitting
// Webpack automatically creates separate chunks for dynamic imports

// Named chunks
const adminModule = await import(
  /* webpackChunkName: "admin" */ './admin.js'
);

// Prefetch and preload hints
const utilsModule = await import(
  /* webpackPrefetch: true */ './utils.js'
);

const criticalModule = await import(
  /* webpackPreload: true */ './critical.js'
);

// Environment-based loading
let analyticsModule;
if (process.env.NODE_ENV === 'production') {
  analyticsModule = await import('./analytics-prod.js');
} else {
  analyticsModule = await import('./analytics-dev.js');
}

// Feature detection
if ('IntersectionObserver' in window) {
  const { lazyLoader } = await import('./modern-lazy-loader.js');
  lazyLoader.init();
} else {
  const { fallbackLoader } = await import('./fallback-loader.js');
  fallbackLoader.init();
}

// A/B testing
const variant = Math.random() > 0.5 ? 'a' : 'b';
const { experiment } = await import(\`./experiments/variant-\${variant}.js\`);
experiment.run();`,
    explanation: "Dynamic imports enable code splitting, reduce initial bundle size, support conditional loading, and improve performance through lazy loading."
  },
  {
    id: 60,
    question: "What are WeakMaps and WeakSets used for?",
    answer: "WeakMap and WeakSet hold weak references to objects, allowing garbage collection. Used for private data and preventing memory leaks.",
    example: `// WeakMap - weak references to object keys
const privateData = new WeakMap();

class User {
  constructor(name) {
    this.name = name;
    // Store private data using WeakMap
    privateData.set(this, {
      password: 'secret123',
      lastLogin: new Date()
    });
  }
  
  getPassword() {
    return privateData.get(this).password;
  }
  
  updateLastLogin() {
    privateData.get(this).lastLogin = new Date();
  }
}

const user = new User('John');
console.log(user.getPassword()); // 'secret123'

// When user is garbage collected, private data is also cleaned up
// user = null; // Private data will be garbage collected

// WeakSet - weak references to objects
const processedObjects = new WeakSet();

function processObject(obj) {
  if (processedObjects.has(obj)) {
    console.log('Already processed');
    return;
  }
  
  // Process the object
  console.log('Processing object:', obj);
  processedObjects.add(obj);
}

const obj1 = { id: 1 };
const obj2 = { id: 2 };

processObject(obj1); // "Processing object: { id: 1 }"
processObject(obj1); // "Already processed"
processObject(obj2); // "Processing object: { id: 2 }"

// DOM element tracking
const elementData = new WeakMap();

function attachData(element, data) {
  elementData.set(element, data);
}

function getData(element) {
  return elementData.get(element);
}

const button = document.querySelector('button');
attachData(button, { clickCount: 0, created: Date.now() });

// When button is removed from DOM and no other references exist,
// the data will be garbage collected automatically

// Event listener cleanup
const listeners = new WeakMap();

function addListener(element, event, handler) {
  element.addEventListener(event, handler);
  
  if (!listeners.has(element)) {
    listeners.set(element, new Map());
  }
  
  listeners.get(element).set(event, handler);
}

function removeListener(element, event) {
  const elementListeners = listeners.get(element);
  if (elementListeners) {
    const handler = elementListeners.get(event);
    if (handler) {
      element.removeEventListener(event, handler);
      elementListeners.delete(event);
    }
  }
}

// Caching with automatic cleanup
const cache = new WeakMap();

function expensiveOperation(obj) {
  if (cache.has(obj)) {
    console.log('Cache hit');
    return cache.get(obj);
  }
  
  console.log('Computing...');
  const result = obj.value * 2; // Expensive computation
  cache.set(obj, result);
  return result;
}

const data = { value: 42 };
console.log(expensiveOperation(data)); // "Computing..." then 84
console.log(expensiveOperation(data)); // "Cache hit" then 84

// Comparison with regular Map/Set
const regularMap = new Map();
const weakMap = new WeakMap();

let obj = { name: 'test' };

regularMap.set(obj, 'data');
weakMap.set(obj, 'data');

console.log(regularMap.size); // 1
// console.log(weakMap.size); // undefined - WeakMap has no size property

obj = null; // Remove reference

// regularMap still holds reference to the object (memory leak)
// weakMap allows the object to be garbage collected

// WeakMap/WeakSet limitations
// 1. Only objects as keys (WeakMap) or values (WeakSet)
// 2. Not enumerable (no forEach, keys, values, entries)
// 3. No size property
// 4. No clear method

// Use cases summary:
// WeakMap: Private object data, caching, metadata
// WeakSet: Object tracking, preventing duplicates, flagging processed items

// React component private state (conceptual)
const componentState = new WeakMap();

class Component {
  constructor(props) {
    this.props = props;
    componentState.set(this, {
      internalState: {},
      refs: new Set()
    });
  }
  
  setState(newState) {
    const state = componentState.get(this);
    Object.assign(state.internalState, newState);
  }
  
  getState() {
    return componentState.get(this).internalState;
  }
}`,
    explanation: "WeakMap/WeakSet prevent memory leaks by allowing garbage collection of referenced objects. Perfect for private data and temporary associations."
  },
  {
    id: 61,
    question: "What are default exports vs named exports? Differences?",
    answer: "Default exports export one main value per module. Named exports can export multiple values. Different import syntax for each.",
    example: `// Named exports - multiple exports per module
// math.js
export const PI = 3.14159;
export const E = 2.71828;

export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}

// Can also export at the end
function subtract(a, b) {
  return a - b;
}

function divide(a, b) {
  return a / b;
}

export { subtract, divide };

// Default export - one main export per module
// calculator.js
class Calculator {
  add(a, b) { return a + b; }
  subtract(a, b) { return a - b; }
}

export default Calculator;

// Or inline default export
// export default class Calculator { ... }

// Importing named exports
import { PI, add, multiply } from './math.js';
import { subtract, divide } from './math.js';

// Import all named exports
import * as math from './math.js';
console.log(math.PI); // 3.14159
console.log(math.add(2, 3)); // 5

// Importing default export
import Calculator from './calculator.js';
// Can use any name for default import
import MyCalculator from './calculator.js';
import Calc from './calculator.js';

const calc = new Calculator();

// Mixed exports - both default and named
// utils.js
export const VERSION = '1.0.0';
export function helper() { return 'help'; }

class Utils {
  static format(str) { return str.toUpperCase(); }
}

export default Utils;

// Importing mixed exports
import Utils, { VERSION, helper } from './utils.js';
// Or
import { default as Utils, VERSION, helper } from './utils.js';

// Re-exporting
// index.js (barrel file)
export { add, multiply } from './math.js';
export { default as Calculator } from './calculator.js';
export * from './utils.js'; // Re-export all named exports

// Renaming exports
export { add as sum, multiply as product } from './math.js';

// Renaming imports
import { add as sum, multiply as product } from './math.js';
import { default as Calc } from './calculator.js';

// Dynamic imports with default/named
async function loadModules() {
  // Default export
  const Calculator = await import('./calculator.js');
  const calc = new Calculator.default(); // Note: .default for dynamic imports
  
  // Named exports
  const { add, multiply } = await import('./math.js');
  console.log(add(2, 3));
  
  // Mixed
  const utils = await import('./utils.js');
  console.log(utils.VERSION); // Named export
  const UtilsClass = utils.default; // Default export
}

// CommonJS interop
// When importing CommonJS modules in ES modules
// commonjs-module.js (CommonJS)
// module.exports = { add: (a, b) => a + b };
// module.exports.subtract = (a, b) => a - b;

// In ES module
// import commonjsModule from './commonjs-module.js';
// console.log(commonjsModule.add(2, 3));

// Best practices
// 1. Use default exports for main functionality
// 2. Use named exports for utilities and multiple functions
// 3. Prefer named exports for better tree-shaking
// 4. Be consistent within your project

// Tree-shaking considerations
// Good for tree-shaking (named exports)
export const func1 = () => {};
export const func2 = () => {};

// Less optimal for tree-shaking (default export of object)
export default {
  func1: () => {},
  func2: () => {}
};

// TypeScript considerations
// Named exports preserve names for better IDE support
export interface User {
  name: string;
  age: number;
}

export type UserRole = 'admin' | 'user';

// Default export loses name information
export default interface {
  name: string;
  age: number;
}`,
    explanation: "Named exports are better for tree-shaking and multiple utilities. Default exports are good for main functionality. Choose based on use case."
  }
];