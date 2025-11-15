export const typeScript = [
  {
    id: 88,
    question: "What is TypeScript? Why use it?",
    answer: "TypeScript is a superset of JavaScript that adds static type checking. It helps catch errors at compile time and improves code quality.",
    example: `// JavaScript - Runtime errors
function greet(name) {
  return "Hello, " + name.toUpperCase();
}

greet(123); // Runtime error: name.toUpperCase is not a function

// TypeScript - Compile-time error detection
function greet(name: string): string {
  return "Hello, " + name.toUpperCase();
}

greet(123); // Error: Argument of type 'number' is not assignable to parameter of type 'string'

// Benefits of TypeScript:
// ✅ Catch errors early (compile time vs runtime)
// ✅ Better IDE support (autocomplete, refactoring)
// ✅ Self-documenting code
// ✅ Easier refactoring
// ✅ Better team collaboration

// Type annotations
let age: number = 25;
let name: string = "John";
let isActive: boolean = true;
let hobbies: string[] = ["reading", "coding"];

// Function types
function add(a: number, b: number): number {
  return a + b;
}

const multiply = (a: number, b: number): number => a * b;`,
    explanation: "TypeScript prevents runtime errors, improves developer experience, and makes code more maintainable and self-documenting."
  },
  {
    id: 89,
    question: "What are interfaces vs types?",
    answer: "Interfaces define object shapes and can be extended. Types are more flexible and can represent unions, primitives, and computed types.",
    example: `// Interface - for object shapes
interface User {
  id: number;
  name: string;
  email: string;
}

interface Admin extends User {
  permissions: string[];
}

// Interface merging (declaration merging)
interface User {
  createdAt: Date; // Merged with above User interface
}

// Type alias - more flexible
type Status = 'pending' | 'approved' | 'rejected';
type ID = string | number;

type UserType = {
  id: ID;
  name: string;
  email: string;
};

// Types can represent computed types
type UserKeys = keyof UserType; // 'id' | 'name' | 'email'
type UserValues = UserType[keyof UserType]; // string | ID

// Intersection types
type AdminType = UserType & {
  permissions: string[];
};

// When to use Interface:
// ✅ Defining object shapes
// ✅ When you need extension/inheritance
// ✅ When you want declaration merging
// ✅ Public APIs

// When to use Type:
// ✅ Union types
// ✅ Primitive types
// ✅ Computed types
// ✅ Complex type manipulations

// Both can be used interchangeably for objects
const user1: User = { id: 1, name: "John", email: "john@example.com", createdAt: new Date() };
const user2: UserType = { id: 1, name: "John", email: "john@example.com" };`,
    explanation: "Use interfaces for object shapes and extensibility. Use types for unions, primitives, and complex type operations."
  },
  {
    id: 90,
    question: "What are union types?",
    answer: "Union types allow a value to be one of several types, using the | operator.",
    example: `// Basic union types
type Status = 'loading' | 'success' | 'error';
type ID = string | number;

function processId(id: ID) {
  if (typeof id === 'string') {
    return id.toUpperCase(); // TypeScript knows id is string here
  } else {
    return id.toString(); // TypeScript knows id is number here
  }
}

// Union with objects
type Circle = {
  kind: 'circle';
  radius: number;
};

type Rectangle = {
  kind: 'rectangle';
  width: number;
  height: number;
};

type Shape = Circle | Rectangle;

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2; // shape is Circle
    case 'rectangle':
      return shape.width * shape.height; // shape is Rectangle
    default:
      const exhaustiveCheck: never = shape; // Ensures all cases handled
      return exhaustiveCheck;
  }
}

// Union with arrays
type StringOrNumber = string | number;
type MixedArray = (string | number)[];

const mixed: MixedArray = [1, 'hello', 2, 'world'];

// Discriminated unions (tagged unions)
type ApiResponse = 
  | { status: 'success'; data: any }
  | { status: 'error'; message: string }
  | { status: 'loading' };

function handleResponse(response: ApiResponse) {
  switch (response.status) {
    case 'success':
      console.log(response.data); // TypeScript knows data exists
      break;
    case 'error':
      console.log(response.message); // TypeScript knows message exists
      break;
    case 'loading':
      console.log('Loading...'); // No additional properties
      break;
  }
}`,
    explanation: "Union types provide type safety for values that can be multiple types, with TypeScript narrowing types based on checks."
  },
  {
    id: 91,
    question: "What are generics? Example?",
    answer: "Generics allow creating reusable components that work with multiple types while maintaining type safety.",
    example: `// Without generics - not reusable
function getFirstString(arr: string[]): string {
  return arr[0];
}

function getFirstNumber(arr: number[]): number {
  return arr[0];
}

// With generics - reusable
function getFirst<T>(arr: T[]): T {
  return arr[0];
}

const firstString = getFirst(['a', 'b', 'c']); // string
const firstNumber = getFirst([1, 2, 3]); // number

// Generic interfaces
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

const userResponse: ApiResponse<User> = {
  data: { id: 1, name: 'John' },
  status: 200,
  message: 'Success'
};

// Generic classes
class Storage<T> {
  private items: T[] = [];
  
  add(item: T): void {
    this.items.push(item);
  }
  
  get(index: number): T {
    return this.items[index];
  }
  
  getAll(): T[] {
    return this.items;
  }
}

const stringStorage = new Storage<string>();
stringStorage.add('hello');

const numberStorage = new Storage<number>();
numberStorage.add(42);

// Generic constraints
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length); // Now we know arg has length property
  return arg;
}

logLength('hello'); // string has length
logLength([1, 2, 3]); // array has length
// logLength(123); // Error: number doesn't have length

// Multiple generic parameters
function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

const merged = merge({ name: 'John' }, { age: 30 });
// merged has type { name: string } & { age: number }`,
    explanation: "Generics enable type-safe, reusable code that works with multiple types while preserving type information."
  },
  {
    id: 92,
    question: "What are utility types (Partial, Required, Omit, Pick)?",
    answer: "Utility types are built-in TypeScript types that help transform and manipulate existing types.",
    example: `interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  isActive: boolean;
}

// Partial<T> - makes all properties optional
type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string; age?: number; isActive?: boolean; }

function updateUser(id: number, updates: Partial<User>) {
  // Can update any subset of user properties
}

updateUser(1, { name: 'John' }); // Only update name
updateUser(1, { name: 'John', age: 30 }); // Update name and age

// Required<T> - makes all properties required
interface OptionalUser {
  id?: number;
  name?: string;
  email?: string;
}

type RequiredUser = Required<OptionalUser>;
// { id: number; name: string; email: string; }

// Pick<T, K> - select specific properties
type UserSummary = Pick<User, 'id' | 'name' | 'email'>;
// { id: number; name: string; email: string; }

// Omit<T, K> - exclude specific properties
type UserWithoutId = Omit<User, 'id'>;
// { name: string; email: string; age: number; isActive: boolean; }

type PublicUser = Omit<User, 'id' | 'isActive'>;
// { name: string; email: string; age: number; }

// Record<K, T> - create object type with specific keys and values
type UserRoles = Record<'admin' | 'user' | 'guest', string[]>;
// { admin: string[]; user: string[]; guest: string[]; }

const roles: UserRoles = {
  admin: ['read', 'write', 'delete'],
  user: ['read', 'write'],
  guest: ['read']
};

// Exclude<T, U> - exclude types from union
type Status = 'pending' | 'approved' | 'rejected';
type ActiveStatus = Exclude<Status, 'rejected'>;
// 'pending' | 'approved'

// Extract<T, U> - extract types from union
type StringKeys = Extract<keyof User, string>;
// All keys that are strings

// ReturnType<T> - get return type of function
function getUser(): User {
  return { id: 1, name: 'John', email: 'john@example.com', age: 30, isActive: true };
}

type UserReturnType = ReturnType<typeof getUser>; // User

// Parameters<T> - get parameters of function
function createUser(name: string, email: string, age: number): User {
  return { id: Date.now(), name, email, age, isActive: true };
}

type CreateUserParams = Parameters<typeof createUser>; // [string, string, number]`,
    explanation: "Utility types provide powerful ways to transform existing types, reducing code duplication and improving type safety."
  },
  {
    id: 93,
    question: "What is type narrowing?",
    answer: "Type narrowing is the process of refining types within conditional blocks, making TypeScript understand more specific types.",
    example: `// Type guards with typeof
function processValue(value: string | number) {
  if (typeof value === 'string') {
    // TypeScript knows value is string here
    return value.toUpperCase();
  } else {
    // TypeScript knows value is number here
    return value.toFixed(2);
  }
}

// Type guards with instanceof
class Dog {
  bark() { return 'Woof!'; }
}

class Cat {
  meow() { return 'Meow!'; }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    return animal.bark(); // TypeScript knows it's Dog
  } else {
    return animal.meow(); // TypeScript knows it's Cat
  }
}

// Type guards with 'in' operator
interface Bird {
  fly(): void;
  layEggs(): void;
}

interface Fish {
  swim(): void;
  layEggs(): void;
}

function move(animal: Bird | Fish) {
  if ('fly' in animal) {
    animal.fly(); // TypeScript knows it's Bird
  } else {
    animal.swim(); // TypeScript knows it's Fish
  }
}

// Custom type guards
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function processUnknown(value: unknown) {
  if (isString(value)) {
    // TypeScript knows value is string
    console.log(value.length);
  }
}

// Discriminated unions
type Shape = 
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; size: number }
  | { kind: 'rectangle'; width: number; height: number };

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2; // shape is circle
    case 'square':
      return shape.size ** 2; // shape is square
    case 'rectangle':
      return shape.width * shape.height; // shape is rectangle
    default:
      const exhaustiveCheck: never = shape;
      return exhaustiveCheck;
  }
}

// Truthiness narrowing
function processArray(arr: string[] | null) {
  if (arr) {
    // TypeScript knows arr is string[] (not null)
    return arr.map(item => item.toUpperCase());
  }
  return [];
}

// Equality narrowing
function compare(x: string | number, y: string | boolean) {
  if (x === y) {
    // TypeScript knows both x and y are string
    console.log(x.toUpperCase());
    console.log(y.toUpperCase());
  }
}`,
    explanation: "Type narrowing helps TypeScript understand more specific types in different code paths, improving type safety and IntelliSense."
  },
  {
    id: 94,
    question: "What is unknown vs any?",
    answer: "unknown is type-safe top type that requires type checking before use. any disables type checking completely.",
    example: `// any - disables type checking (avoid!)
let anyValue: any = 42;
anyValue = 'hello';
anyValue = true;
anyValue.foo.bar.baz; // No error, but runtime error
anyValue(); // No error, but runtime error
anyValue[0][1][2]; // No error, but runtime error

// unknown - type-safe top type
let unknownValue: unknown = 42;
unknownValue = 'hello';
unknownValue = true;

// unknownValue.foo; // Error: Object is of type 'unknown'
// unknownValue(); // Error: Object is of type 'unknown'

// Must narrow type before use
if (typeof unknownValue === 'string') {
  console.log(unknownValue.toUpperCase()); // OK - narrowed to string
}

if (typeof unknownValue === 'number') {
  console.log(unknownValue.toFixed(2)); // OK - narrowed to number
}

// Type guards with unknown
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function processUnknown(value: unknown) {
  if (isString(value)) {
    return value.length; // OK - type guard narrows to string
  }
  return 0;
}

// JSON parsing example
function parseJSON(json: string): unknown {
  return JSON.parse(json); // Returns unknown instead of any
}

const result = parseJSON('{"name": "John", "age": 30}');

// Must validate before use
if (typeof result === 'object' && result !== null && 'name' in result) {
  const obj = result as { name: string; age: number };
  console.log(obj.name);
}

// Better approach with type guard
interface User {
  name: string;
  age: number;
}

function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'name' in obj &&
    'age' in obj &&
    typeof (obj as User).name === 'string' &&
    typeof (obj as User).age === 'number'
  );
}

const parsed = parseJSON('{"name": "John", "age": 30}');
if (isUser(parsed)) {
  console.log(parsed.name); // Safe to use
}

// When to use:
// unknown: When you don't know the type but want type safety
// any: Only when migrating JS to TS or dealing with dynamic content`,
    explanation: "Use unknown for type-safe handling of values with unknown types. Avoid any as it disables TypeScript's benefits."
  }
];