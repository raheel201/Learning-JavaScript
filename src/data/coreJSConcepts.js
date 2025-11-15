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
  }
];