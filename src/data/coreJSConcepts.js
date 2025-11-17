export const coreJSConcepts = [
  {
    id: 1,
    question: "What is an execution context in JavaScript?",
    answer: "An execution context is the environment where JavaScript code is executed. It contains information about variables, functions, and the scope chain.",
    example: `// Global Execution Context
var globalVar = "I'm global";

function myFunction() {
  // Function Execution Context
  var localVar = "I'm local";
  console.log(globalVar); // Can access global
  console.log(localVar);  // Can access local
}

myFunction();`,
    explanation: "Every time code runs, JS creates an execution context. Global context is created when script loads, function context when function is called."
  },
  {
    id: 2,
    question: "Explain the phases inside an execution context.",
    answer: "Two phases: 1) Creation Phase - Memory allocation for variables and functions, 2) Execution Phase - Code runs line by line.",
    example: `console.log(x); // undefined (not error!)
var x = 5;
console.log(x); // 5

// Creation Phase: x is allocated memory, set to undefined
// Execution Phase: x gets value 5`,
    explanation: "Creation phase sets up memory space. Variables get 'undefined', functions get their full definition."
  },
  {
    id: 3,
    question: "What is the call stack?",
    answer: "Call stack tracks function calls. When function is called, it's pushed to stack. When finished, it's popped off.",
    example: `function first() {
  console.log("First");
  second();
}

function second() {
  console.log("Second");
  third();
}

function third() {
  console.log("Third");
}

first();
// Stack: [first] -> [first, second] -> [first, second, third] -> [first, second] -> [first] -> []`,
    explanation: "LIFO (Last In, First Out) structure. Stack overflow happens when too many functions are called without returning."
  },
  {
    id: 4,
    question: "What is lexical scope?",
    answer: "Lexical scope means inner functions have access to variables in their outer scope, determined by where functions are written in code.",
    example: `function outer() {
  let outerVar = "I'm outer";
  
  function inner() {
    console.log(outerVar); // Can access outer variable
  }
  
  inner();
}

outer(); // "I'm outer"`,
    explanation: "Scope is determined at compile time by where you write your functions, not where you call them."
  },
  {
    id: 5,
    question: "What is scope chain?",
    answer: "Scope chain is the mechanism by which JavaScript looks for variables. It searches from current scope to outer scopes until it finds the variable or reaches global scope.",
    example: `var global = "global";

function outer() {
  var outerVar = "outer";
  
  function middle() {
    var middleVar = "middle";
    
    function inner() {
      var innerVar = "inner";
      console.log(innerVar);   // Found in inner scope
      console.log(middleVar);  // Found in middle scope
      console.log(outerVar);   // Found in outer scope
      console.log(global);     // Found in global scope
    }
    
    inner();
  }
  
  middle();
}

outer();`,
    explanation: "JavaScript engine searches for variables in this order: current scope -> outer scope -> global scope. If not found, ReferenceError is thrown."
  },
  {
    id: 6,
    question: "What is hoisting? What gets hoisted?",
    answer: "Hoisting moves variable and function declarations to the top of their scope during compilation.",
    example: `// What you write:
console.log(x); // undefined
var x = 5;
sayHi(); // "Hello!"

function sayHi() {
  console.log("Hello!");
}

// How JS sees it:
var x;
function sayHi() {
  console.log("Hello!");
}
console.log(x); // undefined
x = 5;
sayHi(); // "Hello!"`,
    explanation: "var declarations and function declarations are hoisted. let/const are hoisted but in Temporal Dead Zone."
  },
  {
    id: 7,
    question: "Difference between var, let, const.",
    answer: "var: function-scoped, hoisted, can redeclare. let: block-scoped, TDZ, can reassign. const: block-scoped, TDZ, cannot reassign.",
    example: `// var
var a = 1;
var a = 2; // OK
if (true) {
  var a = 3; // Same variable
}
console.log(a); // 3

// let
let b = 1;
// let b = 2; // Error: Cannot redeclare
if (true) {
  let b = 3; // Different variable
}
console.log(b); // 1

// const
const c = 1;
// c = 2; // Error: Cannot reassign
const obj = { name: "John" };
obj.name = "Jane"; // OK - object content can change`,
    explanation: "Use const by default, let when you need to reassign, avoid var in modern JS."
  },
  {
    id: 8,
    question: "What is Temporal Dead Zone (TDZ)?",
    answer: "TDZ is the time between when let/const variables are hoisted and when they're declared. Accessing them throws ReferenceError.",
    example: `console.log(a); // ReferenceError: Cannot access 'a' before initialization
let a = 5;

// TDZ exists here
{
  console.log(b); // ReferenceError
  let b = 10; // TDZ ends here
}`,
    explanation: "TDZ prevents using variables before declaration, making code more predictable and catching errors early."
  },
  {
    id: 9,
    question: "What is a closure? Give a real-world example.",
    answer: "A closure is when an inner function has access to outer function's variables even after outer function returns.",
    example: `// Real-world: Creating a counter
function createCounter() {
  let count = 0;
  
  return function() {
    count++;
    return count;
  };
}

const counter1 = createCounter();
const counter2 = createCounter();

console.log(counter1()); // 1
console.log(counter1()); // 2
console.log(counter2()); // 1 (separate counter)

// Real-world: Module pattern
function bankAccount(initialBalance) {
  let balance = initialBalance;
  
  return {
    deposit: (amount) => balance += amount,
    withdraw: (amount) => balance -= amount,
    getBalance: () => balance
  };
}

const account = bankAccount(100);
account.deposit(50);
console.log(account.getBalance()); // 150`,
    explanation: "Closures enable data privacy, callbacks, and functional programming patterns."
  },
  {
    id: 10,
    question: "What are the common use cases of closures?",
    answer: "Closures are used for data privacy, callbacks, event handlers, module patterns, and function factories.",
    example: `// 1. Data Privacy
function createUser(name) {
  let userName = name;
  
  return {
    getName: () => userName,
    setName: (newName) => userName = newName
  };
}

// 2. Event Handlers
function attachListeners() {
  let count = 0;
  
  document.getElementById('btn').addEventListener('click', function() {
    count++;
    console.log('Clicked ' + count + ' times');
  });
}

// 3. Function Factory
function multiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = multiplier(2);
const triple = multiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15`,
    explanation: "Closures provide encapsulation and maintain state in functional programming patterns."
  },
  {
    id: 11,
    question: "What is the difference between undefined vs not defined?",
    answer: "undefined means variable is declared but has no value. not defined means variable is not declared at all.",
    example: `var a;
console.log(a); // undefined - declared but no value

console.log(b); // ReferenceError: b is not defined

// typeof operator difference
console.log(typeof a); // "undefined"
console.log(typeof b); // "undefined" (doesn't throw error)

// Function with no return
function test() {
  // no return statement
}
console.log(test()); // undefined`,
    explanation: "undefined is a value, not defined is an error. typeof returns 'undefined' for both cases without throwing error."
  },
  {
    id: 12,
    question: "What is strict mode? Why do we use it?",
    answer: "Strict mode is a way to opt into a restricted variant of JavaScript. It eliminates silent errors and improves performance.",
    example: `"use strict";

// 1. Prevents accidental globals
function test() {
  x = 10; // ReferenceError in strict mode
}

// 2. Prevents duplicate parameters
function sum(a, a, c) { // SyntaxError in strict mode
  return a + a + c;
}

// 3. Makes eval safer
eval("var x = 2;");
console.log(x); // ReferenceError in strict mode

// 4. Prevents deleting variables
var y = 3;
delete y; // TypeError in strict mode

// 5. this is undefined in functions
function regularFunction() {
  console.log(this); // undefined in strict mode
}`,
    explanation: "Strict mode catches common coding mistakes, prevents unsafe actions, and disables confusing features."
  },
  {
    id: 13,
    question: "What is the difference between function declaration and function expression?",
    answer: "Function declarations are hoisted completely, function expressions are not. Declarations can be called before definition.",
    example: `// Function Declaration - Hoisted
console.log(add(2, 3)); // 5 - works!

function add(a, b) {
  return a + b;
}

// Function Expression - Not hoisted
console.log(subtract(5, 2)); // TypeError: subtract is not a function

var subtract = function(a, b) {
  return a - b;
};

// Named Function Expression
var multiply = function mult(a, b) {
  return a * b;
};

// Arrow Function Expression
const divide = (a, b) => a / b;`,
    explanation: "Function declarations are fully hoisted, expressions are treated as variable assignments."
  },
  {
    id: 14,
    question: "What is an IIFE? Why do we use it?",
    answer: "IIFE (Immediately Invoked Function Expression) is a function that runs as soon as it's defined. Used for creating private scope.",
    example: `// Basic IIFE
(function() {
  var privateVar = "I'm private";
  console.log("IIFE executed");
})();

// IIFE with parameters
(function(name) {
  console.log("Hello " + name);
})("John");

// IIFE with return value
const result = (function() {
  const a = 10;
  const b = 20;
  return a + b;
})();

console.log(result); // 30

// Module pattern with IIFE
const myModule = (function() {
  let privateCounter = 0;
  
  return {
    increment: function() {
      privateCounter++;
    },
    getCount: function() {
      return privateCounter;
    }
  };
})();

myModule.increment();
console.log(myModule.getCount()); // 1`,
    explanation: "IIFE creates isolated scope, prevents global pollution, and enables module pattern before ES6 modules."
  },
  {
    id: 15,
    question: "How does JavaScript handle memory allocation?",
    answer: "JavaScript automatically allocates memory when objects are created and frees it when they're no longer used (garbage collection).",
    example: `// Memory allocation examples
let number = 42; // Allocates memory for number
let string = "Hello"; // Allocates memory for string
let object = { name: "John" }; // Allocates memory for object
let array = [1, 2, 3]; // Allocates memory for array

// Memory usage
function createObjects() {
  let localObj = { data: new Array(1000000) };
  return localObj;
}

let obj1 = createObjects(); // Memory allocated
obj1 = null; // Memory eligible for garbage collection

// Memory leak example
function memoryLeak() {
  let largeArray = new Array(1000000).fill('data');
  
  return function() {
    console.log(largeArray.length); // Closure keeps reference
  };
}

const leakyFunction = memoryLeak(); // largeArray stays in memory`,
    explanation: "JavaScript uses automatic memory management. Objects are allocated on heap, primitives on stack."
  },
  {
    id: 16,
    question: "What is garbage collection in JS? How does it work?",
    answer: "Garbage collection automatically frees memory that's no longer reachable. Modern JS uses mark-and-sweep algorithm.",
    example: `// Reachable objects (won't be garbage collected)
let user = { name: "John" };
let admin = user; // user object has 2 references

user = null; // Still reachable via admin

// Unreachable objects (will be garbage collected)
function createUser() {
  let localUser = { name: "Jane" };
  return localUser;
}

let tempUser = createUser();
tempUser = null; // Now unreachable, eligible for GC

// Circular references (handled by modern GC)
function createCircular() {
  let obj1 = {};
  let obj2 = {};
  
  obj1.ref = obj2;
  obj2.ref = obj1; // Circular reference
  
  return obj1;
}

let circular = createCircular();
circular = null; // Both objects become unreachable

// WeakMap/WeakSet for weak references
let weakMap = new WeakMap();
let key = {};

weakMap.set(key, "value");
key = null; // Entry in WeakMap becomes eligible for GC`,
    explanation: "Mark-and-sweep GC marks reachable objects, then sweeps away unmarked ones. Handles circular references automatically."
  },
  {
    id: 17,
    question: "What is event delegation?",
    answer: "Event delegation is a technique where you attach a single event listener to a parent element to handle events for multiple child elements.",
    example: `// Without delegation - multiple listeners
document.querySelectorAll('.button').forEach(btn => {
  btn.addEventListener('click', handleClick);
});

// With delegation - single listener
document.getElementById('container').addEventListener('click', function(e) {
  if (e.target.classList.contains('button')) {
    handleClick(e);
  }
});

// Real example
<ul id="list">
  <li data-id="1">Item 1</li>
  <li data-id="2">Item 2</li>
</ul>

document.getElementById('list').addEventListener('click', function(e) {
  if (e.target.tagName === 'LI') {
    console.log('Clicked item:', e.target.dataset.id);
  }
});`,
    explanation: "Event delegation uses event bubbling to handle events efficiently, especially for dynamic content."
  },
  {
    id: 18,
    question: "Explain immutability in JavaScript. How do you enforce it?",
    answer: "Immutability means objects cannot be changed after creation. JavaScript objects are mutable by default, but we can enforce immutability.",
    example: `// Mutable (default)
const obj = { name: 'John' };
obj.name = 'Jane'; // Allowed

// Object.freeze() - shallow immutability
const frozenObj = Object.freeze({ name: 'John', age: 30 });
frozenObj.name = 'Jane'; // Ignored in non-strict, error in strict

// Deep freeze
function deepFreeze(obj) {
  Object.getOwnPropertyNames(obj).forEach(prop => {
    if (obj[prop] !== null && typeof obj[prop] === 'object') {
      deepFreeze(obj[prop]);
    }
  });
  return Object.freeze(obj);
}

// Immutable updates
const original = { name: 'John', skills: ['JS'] };
const updated = {
  ...original,
  name: 'Jane',
  skills: [...original.skills, 'React']
};`,
    explanation: "Immutability prevents bugs, enables optimization, and makes code predictable. Use spread operator, Object.freeze(), or libraries like Immutable.js."
  },
  {
    id: 19,
    question: "What are higher-order functions?",
    answer: "Higher-order functions are functions that take other functions as arguments or return functions as results.",
    example: `// Function that takes function as argument
function withLogging(fn) {
  return function(...args) {
    console.log('Calling function with:', args);
    const result = fn(...args);
    console.log('Result:', result);
    return result;
  };
}

const add = (a, b) => a + b;
const loggedAdd = withLogging(add);
loggedAdd(2, 3); // Logs and returns 5

// Built-in higher-order functions
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(x => x * 2); // [2, 4, 6, 8, 10]
const evens = numbers.filter(x => x % 2 === 0); // [2, 4]
const sum = numbers.reduce((acc, x) => acc + x, 0); // 15

// Function that returns function
function createMultiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = createMultiplier(2);
console.log(double(5)); // 10`,
    explanation: "Higher-order functions enable functional programming patterns, code reuse, and abstraction."
  },
  {
    id: 20,
    question: "What is function currying? Example?",
    answer: "Currying transforms a function with multiple arguments into a sequence of functions, each taking a single argument.",
    example: `// Regular function
function add(a, b, c) {
  return a + b + c;
}

// Curried version
function curriedAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}

// Usage
const result1 = curriedAdd(1)(2)(3); // 6
const addOne = curriedAdd(1);
const addOneAndTwo = addOne(2);
const result2 = addOneAndTwo(3); // 6

// Arrow function currying
const multiply = a => b => c => a * b * c;
const result3 = multiply(2)(3)(4); // 24

// Practical example - API calls
const apiCall = baseUrl => endpoint => params => {
  return fetch(\`\${baseUrl}/\${endpoint}\`, {
    method: 'POST',
    body: JSON.stringify(params)
  });
};

const myApi = apiCall('https://api.example.com');
const createUser = myApi('users');
createUser({ name: 'John', email: 'john@example.com' });`,
    explanation: "Currying enables partial application, function composition, and creates reusable specialized functions."
  },
  {
    id: 21,
    question: "Explain pure vs impure functions.",
    answer: "Pure functions always return same output for same input and have no side effects. Impure functions may have side effects or non-deterministic output.",
    example: `// Pure functions
function add(a, b) {
  return a + b; // Same input = same output, no side effects
}

function multiply(arr, factor) {
  return arr.map(x => x * factor); // Doesn't modify original array
}

// Impure functions
let counter = 0;
function increment() {
  counter++; // Side effect: modifies external variable
  return counter;
}

function addRandom(a) {
  return a + Math.random(); // Non-deterministic output
}

function logAndAdd(a, b) {
  console.log('Adding:', a, b); // Side effect: console output
  return a + b;
}

function modifyArray(arr) {
  arr.push(4); // Side effect: modifies input
  return arr;
}

// Making impure functions pure
function pureModifyArray(arr) {
  return [...arr, 4]; // Returns new array
}`,
    explanation: "Pure functions are predictable, testable, and cacheable. They enable functional programming and easier debugging."
  },
  {
    id: 22,
    question: "What is memoization?",
    answer: "Memoization is an optimization technique that caches function results to avoid expensive recalculations for the same inputs.",
    example: `// Without memoization - expensive calculation
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// With memoization
function memoizedFibonacci() {
  const cache = {};
  
  return function fib(n) {
    if (n in cache) {
      return cache[n];
    }
    
    if (n <= 1) {
      cache[n] = n;
    } else {
      cache[n] = fib(n - 1) + fib(n - 2);
    }
    
    return cache[n];
  };
}

const fastFib = memoizedFibonacci();
console.log(fastFib(40)); // Much faster!

// Generic memoization function
function memoize(fn) {
  const cache = {};
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (key in cache) {
      return cache[key];
    }
    
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}

const memoizedAdd = memoize((a, b) => {
  console.log('Computing...'); // Only logs once per unique input
  return a + b;
});`,
    explanation: "Memoization trades memory for speed, ideal for expensive pure functions with repeated calls."
  },
  {
    id: 23,
    question: "What are first-class functions?",
    answer: "First-class functions means functions are treated like any other value - they can be assigned to variables, passed as arguments, and returned from functions.",
    example: `// 1. Assign to variables
const greet = function(name) {
  return \`Hello, \${name}!\`;
};

const sayHi = greet;
console.log(sayHi('John')); // "Hello, John!"

// 2. Pass as arguments
function executeFunction(fn, arg) {
  return fn(arg);
}

const result = executeFunction(greet, 'Alice'); // "Hello, Alice!"

// 3. Return from functions
function createGreeter(greeting) {
  return function(name) {
    return \`\${greeting}, \${name}!\`;
  };
}

const spanishGreeter = createGreeter('Hola');
console.log(spanishGreeter('Maria')); // "Hola, Maria!"

// 4. Store in data structures
const operations = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b
};

const mathFunctions = [operations.add, operations.multiply];

// 5. Dynamic function calls
const operation = 'add';
const result2 = operations[operation](5, 3); // 8`,
    explanation: "First-class functions enable functional programming, callbacks, higher-order functions, and dynamic behavior."
  },
  {
    id: 24,
    question: "What is short-circuit evaluation? Examples?",
    answer: "Short-circuit evaluation stops evaluating logical expressions as soon as the result is determined, skipping remaining operands.",
    example: `// Logical AND (&&) - stops at first falsy
false && console.log('This won\'t run'); // console.log not executed
true && console.log('This will run'); // console.log executed

// Logical OR (||) - stops at first truthy
true || console.log('This won\'t run'); // console.log not executed
false || console.log('This will run'); // console.log executed

// Practical examples
function processUser(user) {
  // Check if user exists before accessing properties
  user && user.name && console.log(user.name);
  
  // Default values
  const name = user.name || 'Anonymous';
  
  // Conditional execution
  user.isAdmin && performAdminAction();
}

// Nullish coalescing (??) - only null/undefined
const value1 = null ?? 'default'; // 'default'
const value2 = 0 ?? 'default'; // 0 (not 'default')
const value3 = '' ?? 'default'; // '' (not 'default')

// Optional chaining (?.) - short-circuits on null/undefined
const user = { profile: { name: 'John' } };
const userName = user?.profile?.name; // 'John'
const missing = user?.settings?.theme; // undefined (no error)

// Function calls
user?.notify?.(); // Only calls if notify exists`,
    explanation: "Short-circuit evaluation improves performance and prevents errors by avoiding unnecessary operations."
  },
  {
    id: 25,
    question: "What is optional vs default parameter?",
    answer: "Default parameters provide fallback values when arguments are undefined. Optional parameters can be omitted entirely.",
    example: `// Default parameters
function greet(name = 'World', greeting = 'Hello') {
  return \`\${greeting}, \${name}!\`;
}

console.log(greet()); // "Hello, World!"
console.log(greet('John')); // "Hello, John!"
console.log(greet('John', 'Hi')); // "Hi, John!"
console.log(greet(undefined, 'Hey')); // "Hey, World!"

// Default parameters with expressions
function createUser(name, id = Date.now(), active = true) {
  return { name, id, active };
}

// Default parameters can reference previous parameters
function buildUrl(protocol = 'https', domain, path = '/') {
  return \`\${protocol}://\${domain}\${path}\`;
}

// Rest parameters (truly optional)
function sum(first, ...rest) {
  return rest.reduce((acc, num) => acc + num, first || 0);
}

sum(1); // 1
sum(1, 2, 3, 4); // 10

// Destructuring with defaults
function processOptions({ timeout = 5000, retries = 3, debug = false } = {}) {
  console.log({ timeout, retries, debug });
}

processOptions(); // Uses all defaults
processOptions({ timeout: 1000 }); // timeout: 1000, others default`,
    explanation: "Default parameters handle undefined values, while optional parameters (rest/destructuring) handle missing arguments entirely."
  },
  {
    id: 26,
    question: "Explain pass-by-value vs pass-by-reference in JavaScript.",
    answer: "JavaScript passes primitives by value (copies the value) and objects by reference (copies the reference to the object).",
    example: `// Pass by value (primitives)
function changeValue(x) {
  x = 10;
  console.log('Inside function:', x); // 10
}

let num = 5;
changeValue(num);
console.log('Outside function:', num); // 5 (unchanged)

// Pass by reference (objects)
function changeObject(obj) {
  obj.name = 'Changed';
  obj.newProp = 'Added';
  console.log('Inside function:', obj);
}

let person = { name: 'John', age: 30 };
changeObject(person);
console.log('Outside function:', person); // { name: 'Changed', age: 30, newProp: 'Added' }

// Reassigning the reference doesn't affect original
function reassignObject(obj) {
  obj = { name: 'New Object' }; // Creates new reference
  obj.age = 25;
}

let user = { name: 'Alice' };
reassignObject(user);
console.log(user); // { name: 'Alice' } (unchanged)

// Arrays (also objects)
function modifyArray(arr) {
  arr.push(4); // Modifies original
  arr[0] = 'changed'; // Modifies original
}

let numbers = [1, 2, 3];
modifyArray(numbers);
console.log(numbers); // ['changed', 2, 3, 4]

// Creating copies to avoid mutation
function safeCopy(obj) {
  const copy = { ...obj }; // Shallow copy
  copy.name = 'Modified Copy';
  return copy;
}`,
    explanation: "Understanding pass-by-value vs pass-by-reference is crucial for avoiding unintended mutations and side effects."
  }
];