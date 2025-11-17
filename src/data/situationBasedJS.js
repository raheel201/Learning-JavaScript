export const situationBasedJS = [
  {
    id: 1,
    question: "A developer moves a let variable declaration to the top of the file to 'fix hoisting bugs'. The app now crashes with ReferenceError. What is happening and why?",
    answer: "let variables are hoisted but in Temporal Dead Zone (TDZ). Moving declaration doesn't fix the issue - you need to move the initialization too.",
    example: `// Problem: Moving only declaration
let userName; // Moved to top
console.log(userName); // undefined (works)
// ... 200 lines later
userName = "John"; // Assignment still here

// Real issue: Accessing before initialization
console.log(userAge); // ReferenceError: Cannot access before initialization
let userAge = 25;

// Solution: Move both declaration AND initialization
let userAge = 25; // Move complete initialization to top
console.log(userAge); // 25 (works)`,
    explanation: "let/const are hoisted but can't be accessed before initialization. Moving only declaration doesn't help - move the entire initialization."
  },
  {
    id: 2,
    question: "You see code that uses a function before it is defined, but it still works. How? When will this not work?",
    answer: "Function declarations are fully hoisted. Function expressions and arrow functions are not hoisted.",
    example: `// Works: Function declaration is hoisted
console.log(add(2, 3)); // 5
function add(a, b) {
  return a + b;
}

// Doesn't work: Function expression not hoisted
console.log(multiply(2, 3)); // TypeError: multiply is not a function
var multiply = function(a, b) {
  return a * b;
};

// Doesn't work: Arrow function not hoisted
console.log(divide(6, 2)); // ReferenceError
const divide = (a, b) => a / b;`,
    explanation: "Only function declarations are fully hoisted. Function expressions and arrow functions behave like variables."
  },
  {
    id: 3,
    question: "A for-loop prints 5 5 5 5 5 instead of 0 1 2 3 4. Why? How would you fix it with closure?",
    answer: "var has function scope, so all setTimeout callbacks share the same variable. Use let (block scope) or closure to capture each value.",
    example: `// Problem: var shares same variable
for (var i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 100); // Prints: 5 5 5 5 5
}

// Solution 1: Use let (block scope)
for (let i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 100); // Prints: 0 1 2 3 4
}

// Solution 2: Closure captures each value
for (var i = 0; i < 5; i++) {
  (function(index) {
    setTimeout(() => console.log(index), 100); // Prints: 0 1 2 3 4
  })(i);
}

// Solution 3: Closure with setTimeout parameter
for (var i = 0; i < 5; i++) {
  setTimeout((index) => console.log(index), 100, i); // Prints: 0 1 2 3 4
}`,
    explanation: "var is function-scoped, so all callbacks reference the same variable. let creates new binding per iteration."
  },
  {
    id: 4,
    question: "You need to maintain a private count that cannot be accessed globally. How do you design it using closures?",
    answer: "Create a closure that returns methods to interact with private variables. The variables are trapped inside the closure scope.",
    example: `// Private counter using closure
function createCounter() {
  let count = 0; // Private variable
  
  return {
    increment: () => ++count,
    decrement: () => --count,
    getValue: () => count
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getValue()); // 2
console.log(counter.count); // undefined - can't access directly

// Multiple independent counters
const counter1 = createCounter();
const counter2 = createCounter();
counter1.increment(); // 1
counter2.increment(); // 1 (separate count)`,
    explanation: "Closures create private scope. Variables inside closure can't be accessed directly from outside."
  },
  {
    id: 5,
    question: "Your teammate creates a closure inside a loop, causing memory leaks. Why does this happen and how do you prevent it?",
    answer: "Closures keep references to all variables in their scope, even unused ones. This prevents garbage collection.",
    example: `// Memory leak: Closure holds large unused data
function createHandlers() {
  const largeData = new Array(1000000).fill('data'); // Large array
  const handlers = [];
  
  for (let i = 0; i < 10; i++) {
    handlers.push(() => {
      console.log(i); // Only uses 'i', but closure keeps 'largeData' too
    });
  }
  
  return handlers; // largeData can't be garbage collected
}

// Solution: Limit closure scope
function createHandlersSafe() {
  const handlers = [];
  
  for (let i = 0; i < 10; i++) {
    handlers.push(((index) => {
      return () => console.log(index); // Only captures 'index'
    })(i));
  }
  
  return handlers; // largeData not in closure scope
}`,
    explanation: "Closures capture entire scope, not just used variables. Create minimal closures or use parameters to limit scope."
  },
  {
    id: 6,
    question: "In a large file, a function is using a variable that is declared 200 lines above. How is JS finding that variable?",
    answer: "JavaScript uses scope chain to find variables. It searches current scope, then outer scopes until global scope.",
    example: `const globalVar = "I'm global"; // Global scope

function outerFunction() {
  const outerVar = "I'm outer"; // Outer function scope
  
  function innerFunction() {
    const innerVar = "I'm inner"; // Inner function scope
    
    // JS searches: innerFunction -> outerFunction -> global
    console.log(innerVar);  // Found in current scope
    console.log(outerVar);  // Found in outer scope
    console.log(globalVar); // Found in global scope
  }
  
  innerFunction();
}

outerFunction();`,
    explanation: "Scope chain: current scope → outer scope → global scope. JS stops at first match."
  },
  {
    id: 7,
    question: "A nested function logs a variable that does not exist in its local scope. How does JavaScript resolve it?",
    answer: "JavaScript looks up the scope chain. If variable isn't found in any scope, it throws ReferenceError.",
    example: `function parent() {
  const parentVar = "parent";
  
  function child() {
    // No local 'parentVar', JS looks up scope chain
    console.log(parentVar); // Found in parent scope
    console.log(nonExistent); // ReferenceError: not found anywhere
  }
  
  child();
}

// Scope chain lookup order:
// 1. child() scope
// 2. parent() scope  
// 3. global scope
// 4. ReferenceError if not found`,
    explanation: "JS searches scope chain from inner to outer. ReferenceError if variable not found in any scope."
  },
  {
    id: 8,
    question: "You rename a variable in parent scope, and suddenly nested functions break. Why?",
    answer: "Nested functions depend on parent scope variables. Renaming breaks the reference chain.",
    example: `function parent() {
  let userName = "John"; // Original name
  
  function child() {
    console.log(userName); // Depends on parent's userName
  }
  
  child(); // Works: "John"
}

// After renaming userName to user:
function parent() {
  let user = "John"; // Renamed variable
  
  function child() {
    console.log(userName); // ReferenceError: userName not found
  }
  
  child(); // Breaks!
}

// Solution: Update all references
function parent() {
  let user = "John";
  
  function child() {
    console.log(user); // Updated reference
  }
  
  child(); // Works: "John"
}`,
    explanation: "Nested functions create dependencies on parent scope. Renaming variables breaks these dependencies."
  },
  {
    id: 9,
    question: "A button click handler logs undefined for this.value. Why does this happen? How do you fix it?",
    answer: "Event handlers lose 'this' context when passed as callbacks. 'this' becomes the DOM element, not your object.",
    example: `const obj = {
  value: "Hello",
  handleClick: function() {
    console.log(this.value); // 'this' is button, not obj
  }
};

// Problem: 'this' is button element
button.addEventListener('click', obj.handleClick); // undefined

// Solution 1: Arrow function
const obj1 = {
  value: "Hello",
  handleClick: () => {
    console.log(this.value); // 'this' from outer scope
  }
};

// Solution 2: bind()
button.addEventListener('click', obj.handleClick.bind(obj));

// Solution 3: Wrapper function
button.addEventListener('click', () => obj.handleClick());`,
    explanation: "Event handlers change 'this' context. Use arrow functions, bind(), or wrapper functions to preserve context."
  },
  {
    id: 10,
    question: "Inside a method, a developer uses this but loses context when passing it to another function. How do you fix it? (three ways)",
    answer: "Use bind(), arrow functions, or store 'this' in a variable to preserve context.",
    example: `const user = {
  name: "John",
  greet() {
    console.log("Hello " + this.name);
  }
};

// Problem: Lost context
setTimeout(user.greet, 1000); // "Hello undefined"

// Solution 1: bind()
setTimeout(user.greet.bind(user), 1000); // "Hello John"

// Solution 2: Arrow function wrapper
setTimeout(() => user.greet(), 1000); // "Hello John"

// Solution 3: Store 'this' reference
const user2 = {
  name: "Jane",
  greet() {
    const self = this;
    setTimeout(function() {
      console.log("Hello " + self.name);
    }, 1000);
  }
};`,
    explanation: "Passing methods as callbacks loses 'this'. Use bind(), arrow functions, or store reference to preserve context."
  },
  {
    id: 11,
    question: "Arrow function inside an object method is returning wrong this. Why?",
    answer: "Arrow functions inherit 'this' from enclosing scope, not the object. They don't have their own 'this'.",
    example: `const obj = {
  name: "John",
  regularMethod() {
    console.log(this.name); // "John" - 'this' is obj
  },
  arrowMethod: () => {
    console.log(this.name); // undefined - 'this' is global/window
  },
  mixedMethod() {
    const arrow = () => {
      console.log(this.name); // "John" - inherits from regularMethod
    };
    arrow();
  }
};

obj.regularMethod(); // "John"
obj.arrowMethod(); // undefined
obj.mixedMethod(); // "John"`,
    explanation: "Arrow functions inherit 'this' from where they're defined, not where they're called. Use regular functions for object methods."
  },
  {
    id: 12,
    question: "You try to override a method on an instance, but it affects all instances. What went wrong?",
    answer: "You modified the prototype instead of the instance. Prototype changes affect all instances.",
    example: `function User(name) {
  this.name = name;
}

User.prototype.greet = function() {
  return "Hello " + this.name;
};

const user1 = new User("John");
const user2 = new User("Jane");

// Wrong: Modifying prototype affects all instances
User.prototype.greet = function() {
  return "Hi " + this.name;
};

console.log(user1.greet()); // "Hi John" - affected!
console.log(user2.greet()); // "Hi Jane" - affected!

// Correct: Override on specific instance
const user3 = new User("Bob");
user3.greet = function() {
  return "Hey " + this.name;
};

console.log(user3.greet()); // "Hey Bob" - only this instance`,
    explanation: "Prototype modifications affect all instances. Override on specific instance to avoid affecting others."
  },
  {
    id: 13,
    question: "A developer modifies Array.prototype. Should you allow this? Why is this dangerous?",
    answer: "Never modify built-in prototypes. It affects all arrays globally and can break other code or libraries.",
    example: `// Dangerous: Modifying Array.prototype
Array.prototype.last = function() {
  return this[this.length - 1];
};

const arr = [1, 2, 3];
console.log(arr.last()); // 3 - seems to work

// Problems this causes:
// 1. Affects ALL arrays
const otherArray = ['a', 'b', 'c'];
console.log(otherArray.last()); // 'c' - unintended side effect

// 2. Breaks for...in loops
for (let key in arr) {
  console.log(key); // "0", "1", "2", "last" - 'last' appears!
}

// 3. Can conflict with libraries
// If a library also adds Array.prototype.last, one overwrites the other

// Safe alternative: Create utility function
function getLast(array) {
  return array[array.length - 1];
}

console.log(getLast(arr)); // 3 - safe approach`,
    explanation: "Modifying built-in prototypes pollutes global scope, breaks enumeration, and causes conflicts. Use utility functions instead."
  },
  {
    id: 14,
    question: "Two objects need to share methods without using classes. How do you design this using prototypes?",
    answer: "Create a shared prototype object and use Object.create() to inherit from it.",
    example: `// Shared methods prototype
const animalMethods = {
  eat() {
    console.log(this.name + " is eating");
  },
  sleep() {
    console.log(this.name + " is sleeping");
  }
};

// Create objects that inherit from shared prototype
function createDog(name) {
  const dog = Object.create(animalMethods);
  dog.name = name;
  dog.bark = function() {
    console.log(this.name + " barks");
  };
  return dog;
}

function createCat(name) {
  const cat = Object.create(animalMethods);
  cat.name = name;
  cat.meow = function() {
    console.log(this.name + " meows");
  };
  return cat;
}

const dog = createDog("Buddy");
const cat = createCat("Whiskers");

dog.eat(); // "Buddy is eating" - shared method
cat.sleep(); // "Whiskers is sleeping" - shared method
dog.bark(); // "Buddy barks" - specific method`,
    explanation: "Object.create() creates objects with shared prototype. Methods are shared but each object has its own properties."
  },
  {
    id: 15,
    question: "console.log('A'); setTimeout(()=>console.log('B')); Promise.resolve().then(()=>console.log('C')); console.log('D'); — the output is not what your teammate expected. Explain step-by-step why.",
    answer: "Output: A, D, C, B. Synchronous code runs first, then microtasks (Promises), then macrotasks (setTimeout).",
    example: `console.log('A');                           // 1. Synchronous - runs immediately
setTimeout(() => console.log('B'));         // 2. Macrotask - goes to callback queue
Promise.resolve().then(() => console.log('C')); // 3. Microtask - goes to job queue
console.log('D');                           // 4. Synchronous - runs immediately

// Execution order:
// 1. Call stack: console.log('A') → prints "A"
// 2. Call stack: setTimeout → registers callback in macrotask queue
// 3. Call stack: Promise.then → registers callback in microtask queue  
// 4. Call stack: console.log('D') → prints "D"
// 5. Call stack empty → Event loop checks microtask queue first
// 6. Microtask queue: Promise callback → prints "C"
// 7. Microtask queue empty → Event loop checks macrotask queue
// 8. Macrotask queue: setTimeout callback → prints "B"

// Output: A D C B`,
    explanation: "Event loop priority: Synchronous → Microtasks (Promises) → Macrotasks (setTimeout). Microtasks always run before macrotasks."
  },
  {
    id: 16,
    question: "You see a promise chain without a return statement between .then() blocks. What bug can this cause?",
    answer: "Missing return statements break the chain. Next .then() receives undefined instead of expected value.",
    example: `// Problem: Missing return statements
fetch('/api/user')
  .then(response => {
    response.json(); // Missing return!
  })
  .then(data => {
    console.log(data); // undefined - previous .then() returned nothing
  });

// Correct: Return values to continue chain
fetch('/api/user')
  .then(response => {
    return response.json(); // Return the promise
  })
  .then(data => {
    console.log(data); // Actual data from API
    return data.id; // Return for next .then()
  })
  .then(userId => {
    console.log('User ID:', userId); // Gets the ID
  });

// Also correct: Implicit return with arrow functions
fetch('/api/user')
  .then(response => response.json()) // Implicit return
  .then(data => data.id)             // Implicit return
  .then(userId => console.log(userId));`,
    explanation: "Each .then() must return a value for the next .then(). Missing returns break the chain with undefined."
  },
  {
    id: 17,
    question: "A long-running synchronous loop freezes the UI. How do you fix this without web workers?",
    answer: "Break the loop into chunks and use setTimeout to yield control back to the browser between chunks.",
    example: `// Problem: Blocks UI thread
function processLargeArray(array) {
  for (let i = 0; i < array.length; i++) {
    // Heavy processing
    array[i] = array[i] * 2;
  }
  console.log('Done'); // UI frozen until this completes
}

// Solution: Chunked processing with setTimeout
function processLargeArrayAsync(array, chunkSize = 1000) {
  let index = 0;
  
  function processChunk() {
    const endIndex = Math.min(index + chunkSize, array.length);
    
    // Process chunk
    for (let i = index; i < endIndex; i++) {
      array[i] = array[i] * 2;
    }
    
    index = endIndex;
    
    if (index < array.length) {
      // Yield control to browser, then continue
      setTimeout(processChunk, 0);
    } else {
      console.log('Done');
    }
  }
  
  processChunk();
}

// Alternative: Using requestAnimationFrame
function processWithRAF(array) {
  let index = 0;
  const chunkSize = 1000;
  
  function processChunk() {
    const endIndex = Math.min(index + chunkSize, array.length);
    
    for (let i = index; i < endIndex; i++) {
      array[i] = array[i] * 2;
    }
    
    index = endIndex;
    
    if (index < array.length) {
      requestAnimationFrame(processChunk);
    }
  }
  
  requestAnimationFrame(processChunk);
}`,
    explanation: "Break long tasks into chunks and use setTimeout(0) or requestAnimationFrame to yield control between chunks."
  },
  {
    id: 18,
    question: "You find a growing memory usage in a React app with event listeners. How can vanilla JS cause this?",
    answer: "Event listeners aren't removed when components unmount, creating memory leaks. Always clean up listeners.",
    example: `// Problem: Event listeners not cleaned up
function MyComponent() {
  useEffect(() => {
    function handleScroll() {
      console.log('Scrolling...');
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Missing cleanup! Listener stays after component unmounts
  }, []);
}

// Solution: Clean up event listeners
function MyComponent() {
  useEffect(() => {
    function handleScroll() {
      console.log('Scrolling...');
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
}

// Vanilla JS equivalent
class ComponentManager {
  constructor() {
    this.listeners = [];
  }
  
  addListener(element, event, handler) {
    element.addEventListener(event, handler);
    this.listeners.push({ element, event, handler });
  }
  
  cleanup() {
    this.listeners.forEach(({ element, event, handler }) => {
      element.removeEventListener(event, handler);
    });
    this.listeners = [];
  }
}`,
    explanation: "Event listeners hold references to DOM elements and functions. Always remove listeners to prevent memory leaks."
  },
  {
    id: 19,
    question: "A developer stores large objects in global variables. Why is this bad for memory?",
    answer: "Global variables never get garbage collected. They stay in memory for the entire application lifetime.",
    example: `// Problem: Global variables never cleaned up
var globalCache = {}; // Never garbage collected
var largeDataSet = new Array(1000000).fill('data'); // Always in memory

function processData(id) {
  globalCache[id] = largeDataSet.map(item => item + id);
  // globalCache keeps growing, never cleaned up
}

// Solution: Use limited scope and cleanup
function createDataProcessor() {
  const cache = new Map();
  const maxCacheSize = 100;
  
  return {
    processData(id) {
      // Clean up old entries
      if (cache.size >= maxCacheSize) {
        const firstKey = cache.keys().next().value;
        cache.delete(firstKey);
      }
      
      const result = processLargeData(id);
      cache.set(id, result);
      return result;
    },
    
    cleanup() {
      cache.clear(); // Explicit cleanup
    }
  };
}

// Use WeakMap for automatic cleanup
const dataCache = new WeakMap();

function processWithWeakMap(objectKey, data) {
  dataCache.set(objectKey, data);
  // When objectKey is garbage collected, data is too
}`,
    explanation: "Global variables prevent garbage collection. Use limited scope, cleanup methods, or WeakMap for automatic cleanup."
  },
  {
    id: 20,
    question: "A closure holds references to unused variables and increases memory usage. How do you optimize it?",
    answer: "Limit closure scope by only capturing needed variables. Use parameters or separate functions to avoid capturing large objects.",
    example: `// Problem: Closure captures everything in scope
function createHandler() {
  const largeObject = new Array(1000000).fill('data'); // Large unused data
  const smallValue = 42;
  
  return function() {
    console.log(smallValue); // Only uses smallValue, but closure keeps largeObject too
  };
}

// Solution 1: Limit scope with parameters
function createHandlerOptimized() {
  const largeObject = new Array(1000000).fill('data');
  const smallValue = 42;
  
  // Create closure with only needed data
  return (function(value) {
    return function() {
      console.log(value); // Only captures 'value', not largeObject
    };
  })(smallValue);
}

// Solution 2: Separate function scope
function processLargeData() {
  const largeObject = new Array(1000000).fill('data');
  // Process data here
  return 42; // Return only needed result
}

function createHandlerClean() {
  const result = processLargeData(); // largeObject not in closure scope
  
  return function() {
    console.log(result); // Only captures small result
  };
}

// Solution 3: Explicit cleanup
function createHandlerWithCleanup() {
  let largeObject = new Array(1000000).fill('data');
  const smallValue = 42;
  
  const handler = function() {
    console.log(smallValue);
  };
  
  // Clean up large object reference
  largeObject = null;
  
  return handler;
}`,
    explanation: "Closures capture entire scope. Use parameters, separate functions, or explicit cleanup to limit memory usage."
  },
  {
    id: 21,
    question: "A login system fails because '0' is treated as truthy somewhere. What concept is causing this?",
    answer: "Type coercion converts '0' (string) to true in boolean context. Use strict equality (===) to avoid coercion.",
    example: `// Problem: String '0' is truthy
const userInput = '0'; // String from form input

if (userInput) {
  console.log('User entered something'); // This runs! '0' is truthy
}

// Common mistake in login validation
function validateUser(userId) {
  if (userId) { // '0' passes this check
    return 'Valid user';
  }
  return 'Invalid user';
}

console.log(validateUser('0')); // 'Valid user' - wrong!
console.log(validateUser(0));   // 'Invalid user' - number 0 is falsy

// Solution: Explicit checks
function validateUserCorrect(userId) {
  if (userId !== '' && userId != null && userId !== undefined) {
    return 'Valid user';
  }
  return 'Invalid user';
}

// Or check for specific values
function validateUserStrict(userId) {
  if (typeof userId === 'string' && userId.length > 0) {
    return 'Valid user';
  }
  return 'Invalid user';
}

// Falsy values in JS:
console.log(Boolean(false));     // false
console.log(Boolean(0));         // false
console.log(Boolean(''));        // false
console.log(Boolean(null));      // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN));       // false

// Everything else is truthy:
console.log(Boolean('0'));       // true - string!
console.log(Boolean('false'));   // true - string!
console.log(Boolean([]));        // true - empty array!
console.log(Boolean({}));        // true - empty object!`,
    explanation: "String '0' is truthy, number 0 is falsy. Use explicit checks instead of relying on truthiness."
  },
  {
    id: 22,
    question: "== comparison fixes a bug temporarily, but later fails again. What is happening and why should you avoid it?",
    answer: "== performs type coercion which can give unexpected results. Use === for predictable comparisons.",
    example: `// Problem: == coercion seems to work initially
const userAge = '25'; // String from form
const minimumAge = 18; // Number

if (userAge == minimumAge) { // Seems to work due to coercion
  console.log('Age check passed');
}

// Later fails with different data:
const userAge2 = '0'; // String '0'
const minimumAge2 = false; // Boolean false

console.log('0' == false); // true - unexpected!
console.log('0' == 0);      // true
console.log(0 == false);    // true

// More coercion surprises:
console.log([] == false);   // true
console.log([] == 0);       // true
console.log('' == false);   // true
console.log(null == undefined); // true

// Solution: Use strict equality
const userAge3 = '25';
const minimumAge3 = 18;

if (Number(userAge3) >= minimumAge3) { // Explicit conversion
  console.log('Age check passed');
}

// Or ensure same types
if (typeof userAge3 === 'string' && parseInt(userAge3) >= minimumAge3) {
  console.log('Age check passed');
}

// Strict equality examples:
console.log('0' === false);     // false
console.log('0' === 0);         // false
console.log(0 === false);       // false
console.log(null === undefined); // false`,
    explanation: "== performs unpredictable type coercion. Use === and explicit type conversion for reliable comparisons."
  },
  {
    id: 23,
    question: "Enabling strict mode breaks some old code. Why? What rules does strict mode enforce here?",
    answer: "Strict mode prevents silent errors and unsafe practices. It throws errors for things that were previously ignored.",
    example: `// Without strict mode - silent failures
function oldCode() {
  undeclaredVar = 'global pollution'; // Creates global variable silently
  
  function inner(a, a, b) { // Duplicate parameters allowed
    return a + b;
  }
  
  delete inner; // Deleting function allowed
  
  with (Math) { // 'with' statement allowed
    return sqrt(16);
  }
}

// With strict mode - throws errors
'use strict';

function newCode() {
  undeclaredVar = 'error'; // ReferenceError: undeclaredVar is not defined
  
  function inner(a, a, b) { // SyntaxError: Duplicate parameter name
    return a + b;
  }
  
  delete inner; // TypeError: Cannot delete function
  
  with (Math) { // SyntaxError: 'with' not allowed in strict mode
    return sqrt(16);
  }
}

// Strict mode rules:
// 1. Variables must be declared
'use strict';
// x = 10; // ReferenceError

// 2. 'this' is undefined in functions
function strictFunction() {
  console.log(this); // undefined, not global object
}

// 3. Can't delete variables/functions
var y = 10;
// delete y; // TypeError

// 4. Octal literals not allowed
// var octal = 010; // SyntaxError

// 5. Assignment to read-only properties throws error
var obj = {};
Object.defineProperty(obj, 'prop', { value: 1, writable: false });
// obj.prop = 2; // TypeError`,
    explanation: "Strict mode catches common mistakes and prevents unsafe practices. It makes JavaScript more predictable and secure."
  },
  {
    id: 24,
    question: "Your API always returns strings, but another dev tries to do math on them. How would JS behave?",
    answer: "JavaScript will attempt type coercion. Addition concatenates strings, other operations convert to numbers.",
    example: `// API returns strings
const apiData = {
  price: '25.99',
  quantity: '3',
  discount: '5.00'
};

// Math operations on strings:
console.log(apiData.price + apiData.discount); // '25.995.00' - concatenation!
console.log(apiData.price - apiData.discount); // 20.99 - subtraction converts to numbers
console.log(apiData.price * apiData.quantity); // 77.97 - multiplication converts
console.log(apiData.quantity / 2); // 1.5 - division converts

// Unexpected results:
console.log('10' + '20'); // '1020' - string concatenation
console.log('10' - '20'); // -10 - numeric subtraction
console.log('10' * '20'); // 200 - numeric multiplication

// Solution: Explicit conversion
function calculateTotal(price, quantity, discount) {
  const numPrice = Number(price);
  const numQuantity = Number(quantity);
  const numDiscount = Number(discount);
  
  if (isNaN(numPrice) || isNaN(numQuantity) || isNaN(numDiscount)) {
    throw new Error('Invalid numeric values');
  }
  
  return (numPrice * numQuantity) - numDiscount;
}

// Or use parseFloat for decimals
const total = parseFloat(apiData.price) * parseFloat(apiData.quantity);

// Validation helper
function toNumber(value, fieldName) {
  const num = Number(value);
  if (isNaN(num)) {
    throw new Error(\`Invalid number for \${fieldName}: \${value}\`);
  }
  return num;
}`,
    explanation: "Addition concatenates strings, other operators convert to numbers. Always validate and convert explicitly."
  },
  {
    id: 25,
    question: "Try/catch is not catching an async error inside a callback. Why? How do you fix it?",
    answer: "Try/catch only catches synchronous errors. Async errors happen outside the try block's execution context.",
    example: `// Problem: try/catch doesn't catch async errors
try {
  setTimeout(() => {
    throw new Error('Async error'); // Not caught!
  }, 1000);
} catch (error) {
  console.log('Caught:', error); // Never runs
}

// Problem: Callback errors not caught
function fetchData(callback) {
  setTimeout(() => {
    callback(new Error('API failed')); // Error in callback
  }, 1000);
}

try {
  fetchData((error) => {
    if (error) throw error; // Not caught by outer try/catch
  });
} catch (error) {
  console.log('Caught:', error); // Never runs
}

// Solution 1: Handle errors in callback
function fetchDataSafe(callback) {
  setTimeout(() => {
    try {
      // Simulate API call that might fail
      if (Math.random() > 0.5) {
        throw new Error('API failed');
      }
      callback(null, 'Success');
    } catch (error) {
      callback(error, null);
    }
  }, 1000);
}

// Solution 2: Use Promises with try/catch
function fetchDataPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        reject(new Error('API failed'));
      } else {
        resolve('Success');
      }
    }, 1000);
  });
}

async function handleAsync() {
  try {
    const result = await fetchDataPromise();
    console.log(result);
  } catch (error) {
    console.log('Caught async error:', error);
  }
}

// Solution 3: Global error handlers
window.addEventListener('error', (event) => {
  console.log('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.log('Unhandled promise rejection:', event.reason);
});`,
    explanation: "Try/catch only works with synchronous code. Use Promises with async/await or handle errors within callbacks."
  },
  {
    id: 26,
    question: "You see undefined errors deep in nested optional objects. How do you safely access properties?",
    answer: "Use optional chaining (?.) or check each level manually to avoid TypeError when accessing nested properties.",
    example: `// Problem: Deep nested access throws errors
const user = {
  profile: {
    address: {
      street: '123 Main St'
    }
  }
};

const emptyUser = {};

// This throws TypeError
// console.log(emptyUser.profile.address.street); // TypeError: Cannot read property 'address' of undefined

// Solution 1: Optional chaining (modern)
console.log(user.profile?.address?.street); // '123 Main St'
console.log(emptyUser.profile?.address?.street); // undefined (no error)

// Solution 2: Manual checking (older browsers)
function getStreet(user) {
  if (user && user.profile && user.profile.address) {
    return user.profile.address.street;
  }
  return undefined;
}

// Solution 3: Try/catch wrapper
function safeGet(obj, path) {
  try {
    return path.split('.').reduce((current, key) => current[key], obj);
  } catch (error) {
    return undefined;
  }
}

console.log(safeGet(user, 'profile.address.street')); // '123 Main St'
console.log(safeGet(emptyUser, 'profile.address.street')); // undefined

// Solution 4: Default values with optional chaining
const street = user.profile?.address?.street ?? 'No address';
const city = user.profile?.address?.city ?? 'Unknown city';

// Array access with optional chaining
const users = [
  { posts: [{ title: 'Post 1' }] },
  { posts: [] },
  {}
];

console.log(users[0]?.posts?.[0]?.title); // 'Post 1'
console.log(users[1]?.posts?.[0]?.title); // undefined
console.log(users[2]?.posts?.[0]?.title); // undefined`,
    explanation: "Use optional chaining (?.) for safe property access. It returns undefined instead of throwing errors."
  },
  {
    id: 27,
    question: "A circular dependency between two modules is causing undefined exports. Why?",
    answer: "Modules are evaluated once. In circular dependencies, one module tries to use another before it's fully initialized.",
    example: `// moduleA.js
import { functionB } from './moduleB.js';

export function functionA() {
  console.log('Function A');
  functionB(); // This might be undefined
}

// moduleB.js  
import { functionA } from './moduleA.js';

export function functionB() {
  console.log('Function B');
  functionA(); // This might be undefined
}

// Problem: When moduleA loads, it imports moduleB
// But moduleB imports moduleA, which isn't fully loaded yet

// Solution 1: Lazy loading
// moduleA.js
export function functionA() {
  console.log('Function A');
  // Import when needed, not at module level
  import('./moduleB.js').then(({ functionB }) => {
    functionB();
  });
}

// Solution 2: Restructure to remove circular dependency
// shared.js
export function sharedFunction() {
  console.log('Shared logic');
}

// moduleA.js
import { sharedFunction } from './shared.js';

export function functionA() {
  console.log('Function A');
  sharedFunction();
}

// moduleB.js
import { sharedFunction } from './shared.js';

export function functionB() {
  console.log('Function B');
  sharedFunction();
}

// Solution 3: Use default exports carefully
// moduleA.js
const moduleA = {
  functionA() {
    console.log('Function A');
    // Access after module is fully loaded
    const { functionB } = require('./moduleB.js');
    functionB();
  }
};

export default moduleA;`,
    explanation: "Circular dependencies cause modules to access each other before initialization. Restructure code or use lazy loading."
  },
  {
    id: 28,
    question: "An import from a module executes code even if you don't call anything. Why do ES modules behave like this?",
    answer: "ES modules execute immediately when imported. Top-level code runs during module evaluation, not when functions are called.",
    example: `// utils.js
console.log('Utils module loaded!'); // Runs immediately on import

let counter = 0;

export function increment() {
  return ++counter;
}

export function getCount() {
  return counter;
}

// Side effect during module load
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM ready from utils'); // Runs on import!
});

// main.js
import { increment } from './utils.js'; // 'Utils module loaded!' prints immediately

// Even if you don't call increment(), the module code already ran

// Problem: Unwanted side effects
// analytics.js
console.log('Starting analytics...'); // Runs on import
sendAnalyticsEvent('module_loaded'); // API call on import!

export function trackEvent(event) {
  sendAnalyticsEvent(event);
}

// Solution: Lazy initialization
// analytics.js
let initialized = false;

function init() {
  if (!initialized) {
    console.log('Starting analytics...');
    sendAnalyticsEvent('module_loaded');
    initialized = true;
  }
}

export function trackEvent(event) {
  init(); // Initialize only when needed
  sendAnalyticsEvent(event);
}

// Or explicit initialization
export function initAnalytics() {
  console.log('Starting analytics...');
  sendAnalyticsEvent('module_loaded');
}

export function trackEvent(event) {
  sendAnalyticsEvent(event);
}

// main.js
import { initAnalytics, trackEvent } from './analytics.js';

// Control when initialization happens
initAnalytics();`,
    explanation: "ES modules execute top-level code immediately on import. Use lazy initialization or explicit init functions for side effects."
  },
  {
    id: 29,
    question: "Someone replaced require with import and now the script fails. Why?",
    answer: "require is synchronous and dynamic. import is static and must be at top level. They have different syntax and behavior.",
    example: `// Original CommonJS code
const fs = require('fs');

function loadConfig() {
  if (process.env.NODE_ENV === 'development') {
    const devConfig = require('./dev-config.js'); // Conditional require
    return devConfig;
  }
  return require('./prod-config.js');
}

// Inside a function
function processFile(filename) {
  const path = require('path'); // Require inside function
  return path.join(__dirname, filename);
}

// Dynamic require
const moduleName = 'lodash';
const _ = require(moduleName); // Dynamic module name

// Problems when converting to import:

// 1. Import must be at top level
import fs from 'fs'; // Must be at top of file

function loadConfig() {
  if (process.env.NODE_ENV === 'development') {
    // import devConfig from './dev-config.js'; // SyntaxError: import not allowed here
  }
}

// 2. Import paths must be static strings
const moduleName = 'lodash';
// import _ from moduleName; // SyntaxError: import path must be string literal

// Solutions:

// 1. Use dynamic import() for conditional loading
async function loadConfig() {
  if (process.env.NODE_ENV === 'development') {
    const { default: devConfig } = await import('./dev-config.js');
    return devConfig;
  }
  const { default: prodConfig } = await import('./prod-config.js');
  return prodConfig;
}

// 2. Move imports to top level
import fs from 'fs';
import path from 'path';

function processFile(filename) {
  return path.join(process.cwd(), filename); // Use imported path
}

// 3. For dynamic module names, use dynamic import
async function loadModule(moduleName) {
  const module = await import(moduleName);
  return module;
}

// 4. Package.json configuration needed
// {
//   "type": "module"  // Enable ES modules in Node.js
// }`,
    explanation: "require is dynamic and flexible. import is static and must be at top level. Use dynamic import() for conditional loading."
  },
  {
    id: 30,
    question: "A developer uses var in a loop and wonders why all callbacks log the same value. How do you explain the scope issue?",
    answer: "var is function-scoped, so all loop iterations share the same variable. By the time callbacks run, the loop has finished and the variable holds the final value.",
    example: `// Problem: var is function-scoped
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log('var:', i); // Prints: 3, 3, 3
  }, 100);
}

// Why this happens:
// 1. var i is function-scoped (or global if not in function)
// 2. All setTimeout callbacks share the same 'i' variable
// 3. Loop completes immediately, i becomes 3
// 4. When callbacks run 100ms later, they all see i = 3

// Solution 1: Use let (block-scoped)
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log('let:', i); // Prints: 0, 1, 2
  }, 100);
}

// Why let works:
// Each loop iteration creates a new block scope with its own 'i'

// Solution 2: Closure with IIFE
for (var i = 0; i < 3; i++) {
  (function(index) {
    setTimeout(() => {
      console.log('closure:', index); // Prints: 0, 1, 2
    }, 100);
  })(i);
}

// Solution 3: bind() to capture value
for (var i = 0; i < 3; i++) {
  setTimeout(function(index) {
    console.log('bind:', index); // Prints: 0, 1, 2
  }.bind(null, i), 100);
}

// Visual explanation of scope:
function demonstrateScope() {
  console.log('=== var (function-scoped) ===');
  for (var x = 0; x < 3; x++) {
    // All iterations share the same 'x'
  }
  console.log('Final x:', x); // 3 - accessible outside loop
  
  console.log('=== let (block-scoped) ===');
  for (let y = 0; y < 3; y++) {
    // Each iteration has its own 'y'
  }
  // console.log('Final y:', y); // ReferenceError - not accessible outside
}`,
    explanation: "var creates one variable shared by all loop iterations. let creates a new variable for each iteration. Use let for loop counters."
  }
];