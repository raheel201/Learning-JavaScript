export const trickQuestions = [
  {
    id: 53,
    question: "console.log(a); var a = 5;",
    answer: "undefined",
    example: `console.log(a); // undefined (not ReferenceError)
var a = 5;

// Due to hoisting, JS sees it as:
var a; // undefined
console.log(a); // undefined
a = 5;`,
    explanation: "var declarations are hoisted but not their assignments. Variable exists but has undefined value."
  },
  {
    id: 54,
    question: "let a = 10; { console.log(a); let a = 20; }",
    answer: "ReferenceError: Cannot access 'a' before initialization",
    example: `let a = 10;
{
  console.log(a); // ReferenceError
  let a = 20;
}

// The inner 'a' is hoisted but in TDZ
// It shadows outer 'a' but can't be accessed before declaration`,
    explanation: "Block-scoped 'a' shadows outer 'a' but is in Temporal Dead Zone until declaration."
  },
  {
    id: 55,
    question: "console.log([] == []);",
    answer: "false",
    example: `console.log([] == []); // false
console.log([] === []); // false

// Arrays are objects, compared by reference
const arr1 = [];
const arr2 = [];
console.log(arr1 == arr2); // false - different objects

const arr3 = arr1;
console.log(arr1 == arr3); // true - same reference`,
    explanation: "Arrays are objects compared by reference, not content. Each [] creates new object."
  },
  {
    id: 56,
    question: "console.log([1,2] + [3,4]);",
    answer: "1,23,4",
    example: `console.log([1,2] + [3,4]); // "1,23,4"

// Step by step:
// 1. [1,2].toString() -> "1,2"
// 2. [3,4].toString() -> "3,4"  
// 3. "1,2" + "3,4" -> "1,23,4"

console.log([1,2].toString()); // "1,2"
console.log([3,4].toString()); // "3,4"`,
    explanation: "Arrays are converted to strings using toString(), then concatenated as strings."
  },
  {
    id: 57,
    question: "console.log(typeof NaN);",
    answer: "number",
    example: `console.log(typeof NaN); // "number"
console.log(NaN === NaN); // false
console.log(isNaN(NaN)); // true
console.log(Number.isNaN(NaN)); // true

// NaN is the only value that's not equal to itself
console.log(NaN == NaN); // false
console.log(Object.is(NaN, NaN)); // true

// Common NaN scenarios
console.log(0 / 0); // NaN
console.log(Math.sqrt(-1)); // NaN
console.log(parseInt("hello")); // NaN`,
    explanation: "NaN (Not a Number) is actually of type 'number'. It's the result of invalid mathematical operations."
  },
  {
    id: 58,
    question: "console.log(1 < 2 < 3); console.log(3 > 2 > 1);",
    answer: "true, false",
    example: `console.log(1 < 2 < 3); // true
console.log(3 > 2 > 1); // false

// Step by step:
// 1 < 2 < 3
// (1 < 2) < 3  // true < 3
// true < 3     // 1 < 3 (true converts to 1)
// true

// 3 > 2 > 1
// (3 > 2) > 1  // true > 1
// true > 1     // 1 > 1 (true converts to 1)
// false

// Correct way to chain comparisons:
console.log(1 < 2 && 2 < 3); // true
console.log(3 > 2 && 2 > 1); // true`,
    explanation: "Comparison operators are left-associative. Boolean true converts to 1 in numeric context."
  },
  {
    id: 59,
    question: "setTimeout(() => console.log(1)); Promise.resolve().then(() => console.log(2)); console.log(3);",
    answer: "3, 2, 1",
    example: `setTimeout(() => console.log(1)); // Macrotask
Promise.resolve().then(() => console.log(2)); // Microtask
console.log(3); // Synchronous

// Output: 3, 2, 1

// Execution order:
// 1. Synchronous code first: console.log(3)
// 2. Microtasks (Promises): console.log(2)
// 3. Macrotasks (setTimeout): console.log(1)`,
    explanation: "Synchronous code runs first, then microtasks (Promises), then macrotasks (setTimeout)."
  },
  {
    id: 60,
    question: "function a() { return { message: \"Hi\" }; } function b() { return { message: \"Hi\" }; } console.log(a(), b());",
    answer: "{ message: \"Hi\" }, undefined",
    example: `function a() {
  return { message: "Hi" };
}

function b() {
  return 
  { message: "Hi" };
}

console.log(a(), b()); // { message: "Hi" }, undefined

// Function b() is interpreted as:
function b() {
  return; // Automatic semicolon insertion
  { message: "Hi" }; // Unreachable code
}`,
    explanation: "Automatic semicolon insertion adds semicolon after 'return', making the object unreachable."
  },
  {
    id: 61,
    question: "const obj = { a: 1 }; const copy = obj; copy.a = 5; console.log(obj.a);",
    answer: "5",
    example: `const obj = { a: 1 };
const copy = obj;
copy.a = 5;
console.log(obj.a); // 5

// Both variables reference the same object
console.log(obj === copy); // true

// To create actual copy:
const realCopy = { ...obj };
realCopy.a = 10;
console.log(obj.a); // Still 5`,
    explanation: "Objects are assigned by reference. Both variables point to the same object in memory."
  },
  {
    id: 62,
    question: "console.log([...\"hello\"]);",
    answer: "['h', 'e', 'l', 'l', 'o']",
    example: `console.log([..."hello"]); // ['h', 'e', 'l', 'l', 'o']

// Spread operator works on iterables
console.log([..."abc"]); // ['a', 'b', 'c']
console.log([...[1, 2, 3]]); // [1, 2, 3]

// Other string to array methods
console.log("hello".split("")); // ['h', 'e', 'l', 'l', 'o']
console.log(Array.from("hello")); // ['h', 'e', 'l', 'l', 'o']

// Spread with objects
const obj = { a: 1, b: 2 };
console.log({ ...obj, c: 3 }); // { a: 1, b: 2, c: 3 }`,
    explanation: "Spread operator converts iterable (string) into individual elements. Strings are iterable in JavaScript."
  },
  {
    id: 63,
    question: "console.log(0.1 + 0.2 === 0.3);",
    answer: "false",
    example: `console.log(0.1 + 0.2 === 0.3); // false
console.log(0.1 + 0.2); // 0.30000000000000004

// Floating point precision issue
console.log(0.1 + 0.2 - 0.3); // 5.551115123125783e-17

// Solutions:
// 1. Use Number.EPSILON
console.log(Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON); // true

// 2. Use toFixed()
console.log((0.1 + 0.2).toFixed(1) === "0.3"); // true

// 3. Multiply, calculate, then divide
console.log((0.1 * 10 + 0.2 * 10) / 10 === 0.3); // true

// 4. Use a precision function
function isEqual(a, b, precision = 15) {
  return Math.abs(a - b) < Math.pow(10, -precision);
}

console.log(isEqual(0.1 + 0.2, 0.3)); // true`,
    explanation: "Floating-point arithmetic has precision issues due to binary representation of decimal numbers."
  },
  {
    id: 64,
    question: "console.log(typeof null);",
    answer: "object",
    example: `console.log(typeof null); // "object"

// This is a known bug in JavaScript that can't be fixed
// for backward compatibility reasons

// Proper null checking:
console.log(null === null); // true
console.log(null == undefined); // true
console.log(null === undefined); // false

// Check for null specifically:
function isNull(value) {
  return value === null;
}

// Check for null or undefined:
function isNullish(value) {
  return value == null; // Covers both null and undefined
}

// Nullish coalescing operator (ES2020)
const value = null ?? "default"; // "default"
const value2 = undefined ?? "default"; // "default"
const value3 = 0 ?? "default"; // 0 (falsy but not nullish)`,
    explanation: "typeof null returns 'object' due to a historical bug in JavaScript that remains for compatibility."
  },
  {
    id: 65,
    question: "var x = 1; function test() { console.log(x); var x = 2; } test();",
    answer: "undefined",
    example: `var x = 1;
function test() {
  console.log(x); // undefined
  var x = 2;
}
test();

// Due to hoisting, function sees:
function test() {
  var x; // undefined (shadows global x)
  console.log(x); // undefined
  x = 2;
}

// Without var inside function:
var y = 1;
function test2() {
  console.log(y); // 1 (accesses global)
  y = 2; // Modifies global
}
test2();
console.log(y); // 2`,
    explanation: "Local var declaration is hoisted, creating a local variable that shadows the global one."
  },
  {
    id: 66,
    question: "console.log(+''); console.log(+[]); console.log(+{}); console.log(+null);",
    answer: "0, 0, NaN, 0",
    example: `console.log(+''); // 0
console.log(+[]); // 0
console.log(+{}); // NaN
console.log(+null); // 0
console.log(+undefined); // NaN
console.log(+true); // 1
console.log(+false); // 0

// Unary + operator converts to number:
// '' -> 0 (empty string)
// [] -> '' -> 0 (empty array to string to number)
// {} -> '[object Object]' -> NaN
// null -> 0
// undefined -> NaN

// More examples:
console.log(+'123'); // 123
console.log(+'123abc'); // NaN
console.log(+[1]); // 1 (single element array)
console.log(+[1,2]); // NaN (multiple elements)`,
    explanation: "Unary + converts values to numbers using specific coercion rules for different types."
  },
  {
    id: 67,
    question: "console.log(!![]);",
    answer: "true",
    example: `console.log(!![]); // true
console.log(!!{}); // true
console.log(!!''); // false
console.log(!!0); // false
console.log(!!null); // false
console.log(!!undefined); // false

// Double negation converts to boolean
// First ! converts to boolean and negates
// Second ! negates again, giving boolean equivalent

// Truthy values:
console.log(!!'hello'); // true
console.log(!!1); // true
console.log(!!-1); // true
console.log(!![1,2,3]); // true
console.log(!!{a:1}); // true

// Falsy values (only 6 in JavaScript):
console.log(!!false); // false
console.log(!!0); // false
console.log(!!''); // false
console.log(!!null); // false
console.log(!!undefined); // false
console.log(!!NaN); // false

// Alternative: Boolean() constructor
console.log(Boolean([])); // true
console.log(Boolean('')); // false`,
    explanation: "Empty arrays and objects are truthy in JavaScript. Only 6 values are falsy."
  },
  {
    id: 68,
    question: "console.log([] + {} + []);",
    answer: "[object Object]",
    example: `console.log([] + {} + []); // "[object Object]"

// Step by step:
// [] + {} -> "" + "[object Object]" -> "[object Object]"
// "[object Object]" + [] -> "[object Object]" + "" -> "[object Object]"

// More examples:
console.log({} + []); // 0 (in some contexts, {} is treated as block)
console.log([] + {}); // "[object Object]"
console.log({} + {}); // "[object Object][object Object]"

// To avoid confusion, use explicit conversion:
console.log(String([]) + String({}) + String([])); // "[object Object]"

// Object to string conversion:
console.log({}.toString()); // "[object Object]"
console.log([].toString()); // ""
console.log([1,2].toString()); // "1,2"`,
    explanation: "Arrays convert to empty string, objects to '[object Object]', then string concatenation occurs."
  }
];