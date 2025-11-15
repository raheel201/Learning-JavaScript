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
  },
  {
    id: 95,
    question: "What are intersection types?",
    answer: "Intersection types combine multiple types using & operator. The result has all properties from all types.",
    example: `// Basic intersection types
type Person = {
  name: string;
  age: number;
};

type Employee = {
  employeeId: string;
  department: string;
};

type PersonEmployee = Person & Employee;

const worker: PersonEmployee = {
  name: "John",
  age: 30,
  employeeId: "EMP001",
  department: "Engineering"
};

// Intersection with interfaces
interface Flyable {
  fly(): void;
}

interface Swimmable {
  swim(): void;
}

type Duck = Flyable & Swimmable;

const duck: Duck = {
  fly() { console.log("Flying"); },
  swim() { console.log("Swimming"); }
};

// Intersection with conflicting types
type A = { x: number };
type B = { x: string };
type C = A & B; // x: never (impossible type)

// Practical example - extending base types
type BaseUser = {
  id: string;
  name: string;
};

type AdminPermissions = {
  canDelete: boolean;
  canModify: boolean;
};

type UserPermissions = {
  canRead: boolean;
  canComment: boolean;
};

type Admin = BaseUser & AdminPermissions;
type RegularUser = BaseUser & UserPermissions;

// Function intersection
type Logger = {
  log: (message: string) => void;
};

type Counter = {
  count: () => number;
};

type LoggerCounter = Logger & Counter;

const loggerCounter: LoggerCounter = {
  log: (message) => console.log(message),
  count: () => 42
};`,
    explanation: "Intersection types create a type that has all properties from multiple types. Useful for combining interfaces and creating composite types."
  },
  {
    id: 96,
    question: "What is type inference?",
    answer: "Type inference is TypeScript's ability to automatically determine types without explicit annotations based on context and usage.",
    example: `// Variable inference
let message = "Hello"; // Inferred as string
let count = 42; // Inferred as number
let isActive = true; // Inferred as boolean

// Array inference
let numbers = [1, 2, 3]; // Inferred as number[]
let mixed = [1, "hello", true]; // Inferred as (string | number | boolean)[]

// Object inference
let user = {
  name: "John",
  age: 30
}; // Inferred as { name: string; age: number; }

// Function return type inference
function add(a: number, b: number) {
  return a + b; // Return type inferred as number
}

function getUser() {
  return { name: "John", age: 30 }; // Inferred as { name: string; age: number; }
}

// Contextual typing
const users = ["Alice", "Bob", "Charlie"];
users.map(user => user.toUpperCase()); // 'user' inferred as string

// Generic inference
function identity<T>(arg: T): T {
  return arg;
}

const result = identity("hello"); // T inferred as string
const num = identity(42); // T inferred as number

// Best common type
let items = [1, 2, "hello"]; // Inferred as (string | number)[]

// When inference fails
let value; // Inferred as any
value = "hello";
value = 42; // No error, still any

// Better approach
let value: string | number;
value = "hello";
value = 42; // OK
// value = true; // Error

// Function parameter inference in callbacks
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2); // n inferred as number`,
    explanation: "Type inference reduces boilerplate while maintaining type safety. TypeScript infers types from context, usage patterns, and return values."
  },
  {
    id: 97,
    question: "What is literal type?",
    answer: "Literal types represent exact values rather than general types. Useful for creating precise type constraints.",
    example: `// String literal types
type Direction = "up" | "down" | "left" | "right";

function move(direction: Direction) {
  console.log(\`Moving \${direction}\`);
}

move("up"); // OK
// move("diagonal"); // Error

// Number literal types
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;

function rollDice(): DiceRoll {
  return Math.floor(Math.random() * 6) + 1 as DiceRoll;
}

// Boolean literal types
type Success = true;
type Failure = false;

// Template literal types (TypeScript 4.1+)
type EventName<T extends string> = \`on\${Capitalize<T>}\`;
type ClickEvent = EventName<"click">; // "onClick"
type HoverEvent = EventName<"hover">; // "onHover"

// Combining with unions
type Theme = "light" | "dark";
type Size = "small" | "medium" | "large";
type ButtonVariant = \`\${Theme}-\${Size}\`;
// "light-small" | "light-medium" | "light-large" | "dark-small" | "dark-medium" | "dark-large"

// Object with literal types
type Config = {
  env: "development" | "production" | "test";
  logLevel: "error" | "warn" | "info" | "debug";
  port: 3000 | 8080;
};

const config: Config = {
  env: "development",
  logLevel: "info",
  port: 3000
};

// Function overloads with literals
function createElement(tag: "div"): HTMLDivElement;
function createElement(tag: "span"): HTMLSpanElement;
function createElement(tag: "button"): HTMLButtonElement;
function createElement(tag: string): HTMLElement {
  return document.createElement(tag);
}

const div = createElement("div"); // Type is HTMLDivElement
const span = createElement("span"); // Type is HTMLSpanElement`,
    explanation: "Literal types provide exact value constraints, enabling precise APIs and better type safety for specific values."
  },
  {
    id: 98,
    question: "What is readonly modifier?",
    answer: "readonly modifier prevents modification of properties after initialization. Creates immutable data structures.",
    example: `// Readonly properties
interface User {
  readonly id: string;
  name: string;
  readonly createdAt: Date;
}

const user: User = {
  id: "123",
  name: "John",
  createdAt: new Date()
};

user.name = "Jane"; // OK
// user.id = "456"; // Error: Cannot assign to 'id' because it is a read-only property
// user.createdAt = new Date(); // Error

// Readonly arrays
const numbers: readonly number[] = [1, 2, 3];
const moreNumbers: ReadonlyArray<number> = [4, 5, 6];

// numbers.push(4); // Error: Property 'push' does not exist
// numbers[0] = 10; // Error: Index signature in type 'readonly number[]' only permits reading

// Readonly utility type
type ReadonlyUser = Readonly<User>;
// All properties become readonly

// Deep readonly (custom utility)
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

type NestedData = {
  user: {
    name: string;
    settings: {
      theme: string;
    };
  };
};

type ReadonlyNestedData = DeepReadonly<NestedData>;
// All nested properties are readonly

// Readonly in function parameters
function processUsers(users: readonly User[]) {
  // users.push(newUser); // Error: Cannot modify readonly array
  return users.filter(user => user.name.startsWith("J"));
}

// Readonly class properties
class BankAccount {
  readonly accountNumber: string;
  private balance: number;
  
  constructor(accountNumber: string, initialBalance: number) {
    this.accountNumber = accountNumber;
    this.balance = initialBalance;
  }
  
  // this.accountNumber = "new"; // Error in any method
}

// Readonly tuples
const coordinates: readonly [number, number] = [10, 20];
// coordinates[0] = 30; // Error

// as const for readonly
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000
} as const;
// Type: { readonly apiUrl: "https://api.example.com"; readonly timeout: 5000; }`,
    explanation: "readonly prevents property modification, creating immutable data structures. Use for configuration, IDs, and data that shouldn't change."
  },
  {
    id: 99,
    question: "What is optional chaining?",
    answer: "Optional chaining (?.) safely accesses nested properties without throwing errors if intermediate values are null/undefined.",
    example: `// Basic optional chaining
interface User {
  name: string;
  address?: {
    street: string;
    city: string;
    country?: string;
  };
  getPhone?: () => string;
}

const user: User = {
  name: "John"
};

// Without optional chaining - risky
// console.log(user.address.city); // Error: Cannot read property 'city' of undefined

// With optional chaining - safe
console.log(user.address?.city); // undefined (no error)
console.log(user.address?.country); // undefined

// Method chaining
console.log(user.getPhone?.()); // undefined (method doesn't exist)

// Array access
interface Post {
  comments?: Comment[];
}

interface Comment {
  author: string;
  replies?: Comment[];
}

const post: Post = {
  comments: [
    { author: "Alice", replies: [{ author: "Bob" }] }
  ]
};

console.log(post.comments?.[0]?.author); // "Alice"
console.log(post.comments?.[0]?.replies?.[0]?.author); // "Bob"
console.log(post.comments?.[1]?.author); // undefined

// With nullish coalescing
const city = user.address?.city ?? "Unknown City";
const country = user.address?.country ?? "Unknown Country";

// Function calls
interface API {
  users?: {
    getById?: (id: string) => User;
  };
}

const api: API = {};
const userData = api.users?.getById?.("123");

// Dynamic property access
const propertyName = "address";
console.log(user[propertyName]?.city);

// In type guards
function hasAddress(user: User): user is User & { address: NonNullable<User['address']> } {
  return user.address?.city != null;
}

if (hasAddress(user)) {
  console.log(user.address.city); // No optional chaining needed
}`,
    explanation: "Optional chaining prevents runtime errors when accessing nested properties, making code more robust and readable."
  },
  {
    id: 100,
    question: "What is keyof operator?",
    answer: "keyof operator creates a union type of all property names of a given type. Useful for type-safe property access.",
    example: `// Basic keyof usage
interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}

type UserKeys = keyof User; // "id" | "name" | "email" | "age"

// Type-safe property access
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user: User = {
  id: "123",
  name: "John",
  email: "john@example.com",
  age: 30
};

const name = getProperty(user, "name"); // Type: string
const age = getProperty(user, "age"); // Type: number
// const invalid = getProperty(user, "invalid"); // Error

// keyof with mapped types
type Optional<T> = {
  [K in keyof T]?: T[K];
};

type PartialUser = Optional<User>;
// { id?: string; name?: string; email?: string; age?: number; }

// keyof with template literals
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};

type UserGetters = Getters<User>;
// {
//   getId: () => string;
//   getName: () => string;
//   getEmail: () => string;
//   getAge: () => number;
// }

// keyof with arrays
const fruits = ["apple", "banana", "orange"] as const;
type FruitIndex = keyof typeof fruits; // "0" | "1" | "2" | "length" | "push" | ...

// keyof with string/number index signatures
interface StringDictionary {
  [key: string]: string;
}

type StringDictKeys = keyof StringDictionary; // string | number

// Practical example: Type-safe event emitter
interface Events {
  click: { x: number; y: number };
  hover: { element: HTMLElement };
  keypress: { key: string };
}

class EventEmitter<T> {
  private listeners: { [K in keyof T]?: Array<(data: T[K]) => void> } = {};
  
  on<K extends keyof T>(event: K, callback: (data: T[K]) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(callback);
  }
  
  emit<K extends keyof T>(event: K, data: T[K]) {
    this.listeners[event]?.forEach(callback => callback(data));
  }
}

const emitter = new EventEmitter<Events>();
emitter.on("click", (data) => {
  console.log(data.x, data.y); // Type-safe access
});

// keyof with conditional types
type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type UserDataKeys = NonFunctionPropertyNames<User>; // "id" | "name" | "email" | "age"`,
    explanation: "keyof creates type-safe property access and enables powerful mapped types and generic constraints."
  },
  {
    id: 101,
    question: "What is as const?",
    answer: "as const creates readonly literal types, preventing widening to general types. Useful for immutable data and precise typing.",
    example: `// Without as const - type widening
const colors = ["red", "green", "blue"]; // Type: string[]
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000
}; // Type: { apiUrl: string; timeout: number; }

// With as const - literal types
const colorsConst = ["red", "green", "blue"] as const;
// Type: readonly ["red", "green", "blue"]

const configConst = {
  apiUrl: "https://api.example.com",
  timeout: 5000
} as const;
// Type: { readonly apiUrl: "https://api.example.com"; readonly timeout: 5000; }

// Benefits of as const
type Color = typeof colorsConst[number]; // "red" | "green" | "blue"
type ApiUrl = typeof configConst.apiUrl; // "https://api.example.com"

// Function with as const
function getThemes() {
  return ["light", "dark", "auto"] as const;
}

type Theme = ReturnType<typeof getThemes>[number]; // "light" | "dark" | "auto"

// Object with nested as const
const routes = {
  home: "/",
  about: "/about",
  contact: "/contact",
  api: {
    users: "/api/users",
    posts: "/api/posts"
  }
} as const;

type Route = typeof routes.home; // "/"
type ApiRoute = typeof routes.api.users; // "/api/users"

// Enum-like behavior
const Status = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected"
} as const;

type StatusType = typeof Status[keyof typeof Status]; // "pending" | "approved" | "rejected"

function updateStatus(status: StatusType) {
  console.log(\`Status updated to \${status}\`);
}

updateStatus(Status.APPROVED); // OK
// updateStatus("invalid"); // Error

// Template literal types with as const
const eventNames = ["click", "hover", "focus"] as const;
type EventHandler<T extends readonly string[]> = {
  [K in T[number] as \`on\${Capitalize<K>}\`]: (event: Event) => void;
};

type Handlers = EventHandler<typeof eventNames>;
// {
//   onClick: (event: Event) => void;
//   onHover: (event: Event) => void;
//   onFocus: (event: Event) => void;
// }

// Assertion vs as const
const assertion = ["a", "b"] as string[]; // Type: string[]
const constAssertion = ["a", "b"] as const; // Type: readonly ["a", "b"]

// Satisfies operator (TypeScript 4.9+)
const configSatisfies = {
  apiUrl: "https://api.example.com",
  timeout: 5000
} satisfies Record<string, string | number>;
// Keeps literal types while ensuring structure`,
    explanation: "as const prevents type widening, creating precise literal types for better type safety and enabling advanced type patterns."
  },
  {
    id: 102,
    question: "What are enums? When to use them?",
    answer: "Enums define named constants. Use for fixed sets of values, but consider const assertions or union types for better tree-shaking.",
    example: `// Numeric enum (default)
enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right  // 3
}

console.log(Direction.Up); // 0
console.log(Direction[0]); // "Up" (reverse mapping)

// String enum
enum Color {
  Red = "red",
  Green = "green",
  Blue = "blue"
}

console.log(Color.Red); // "red"
// console.log(Color["red"]); // undefined (no reverse mapping)

// Mixed enum
enum Status {
  Pending = "pending",
  InProgress = 1,
  Completed = 2
}

// Computed enum values
enum FileAccess {
  None,
  Read = 1 << 1,    // 2
  Write = 1 << 2,   // 4
  ReadWrite = Read | Write // 6
}

// Const enum (compile-time only)
const enum Theme {
  Light = "light",
  Dark = "dark"
}

const currentTheme = Theme.Light; // Inlined as "light" in JS

// Problems with enums
enum Size {
  Small = "small",
  Medium = "medium",
  Large = "large"
}

// Runtime object created (affects bundle size)
console.log(Size); // { Small: "small", Medium: "medium", Large: "large" }

// Better alternatives:

// 1. Union types with const assertion
const SizeConst = {
  Small: "small",
  Medium: "medium",
  Large: "large"
} as const;

type SizeType = typeof SizeConst[keyof typeof SizeConst]; // "small" | "medium" | "large"

// 2. Plain union type
type ColorType = "red" | "green" | "blue";

// 3. Const assertion array
const THEMES = ["light", "dark", "auto"] as const;
type ThemeType = typeof THEMES[number]; // "light" | "dark" | "auto"

// When to use enums:
// ✅ Need reverse mapping (numeric enums)
// ✅ Working with external APIs that use enums
// ✅ Need runtime enum object
// ✅ Bitwise operations

// When to avoid enums:
// ❌ Simple string constants (use union types)
// ❌ Tree-shaking is important
// ❌ Want compile-time only types

// Enum with methods (using namespace)
enum Planet {
  Mercury = "mercury",
  Venus = "venus",
  Earth = "earth"
}

namespace Planet {
  export function getDistance(planet: Planet): number {
    switch (planet) {
      case Planet.Mercury: return 57.9;
      case Planet.Venus: return 108.2;
      case Planet.Earth: return 149.6;
    }
  }
}

console.log(Planet.getDistance(Planet.Earth)); // 149.6`,
    explanation: "Enums provide named constants but add runtime overhead. Consider const assertions or union types for better performance and tree-shaking."
  },
  {
    id: 103,
    question: "How does TypeScript compile to JS?",
    answer: "TypeScript compiler (tsc) removes type annotations and transforms modern JS features to target ES version, producing plain JavaScript.",
    example: `// TypeScript source
interface User {
  name: string;
  age: number;
}

class UserService {
  private users: User[] = [];
  
  addUser(user: User): void {
    this.users.push(user);
  }
  
  getUser(name: string): User | undefined {
    return this.users.find(u => u.name === name);
  }
}

const service = new UserService();
service.addUser({ name: "John", age: 30 });

// Compiled JavaScript (ES2015 target)
class UserService {
    constructor() {
        this.users = [];
    }
    addUser(user) {
        this.users.push(user);
    }
    getUser(name) {
        return this.users.find(u => u.name === name);
    }
}
const service = new UserService();
service.addUser({ name: "John", age: 30 });

// Compilation process:
// 1. Parse TypeScript code into AST
// 2. Type checking
// 3. Remove type annotations
// 4. Transform modern features to target ES version
// 5. Generate JavaScript and .d.ts files

// tsconfig.json configuration
{
  "compilerOptions": {
    "target": "ES2020",           // Output JS version
    "module": "commonjs",        // Module system
    "strict": true,              // Enable strict type checking
    "esModuleInterop": true,     // Enable ES module interop
    "declaration": true,         // Generate .d.ts files
    "outDir": "./dist",          // Output directory
    "rootDir": "./src"           // Source directory
  }
}

// Type-only imports (removed in compilation)
import type { User } from './types';
import { UserService } from './service'; // Runtime import

// Enum compilation
enum Color {
  Red = "red",
  Blue = "blue"
}

// Compiles to:
var Color;
(function (Color) {
    Color["Red"] = "red";
    Color["Blue"] = "blue";
})(Color || (Color = {}));

// Const enum (inlined)
const enum Theme {
  Light = "light",
  Dark = "dark"
}

const current = Theme.Light;
// Compiles to:
const current = "light"; // Inlined

// Generic functions
function identity<T>(arg: T): T {
  return arg;
}

// Compiles to (generics erased):
function identity(arg) {
  return arg;
}

// Decorators (experimental)
@Component
class MyComponent {
  @Input() name: string;
}

// Compiles to decorator calls:
MyComponent = __decorate([
    Component,
    __metadata("design:type", Object)
], MyComponent);`,
    explanation: "TypeScript compilation removes types and transforms modern features. The result is plain JavaScript that runs in any JS environment."
  },
  {
    id: 104,
    question: "What is never type?",
    answer: "never represents values that never occur. Used for functions that never return, unreachable code, and exhaustive type checking.",
    example: `// Functions that never return
function throwError(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {
    console.log("Running forever");
  }
}

// Unreachable code
function processValue(value: string | number): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  if (typeof value === "number") {
    return value.toString();
  }
  
  // This should never be reached
  const exhaustiveCheck: never = value;
  return exhaustiveCheck;
}

// Exhaustive type checking with switch
type Shape = "circle" | "square" | "triangle";

function getArea(shape: Shape): number {
  switch (shape) {
    case "circle":
      return Math.PI * 5 * 5;
    case "square":
      return 10 * 10;
    case "triangle":
      return 0.5 * 10 * 8;
    default:
      const exhaustiveCheck: never = shape;
      throw new Error(\`Unhandled shape: \${exhaustiveCheck}\`);
  }
}

// If you add a new shape type, TypeScript will error
// type Shape = "circle" | "square" | "triangle" | "rectangle";
// Error: Type 'string' is not assignable to type 'never'

// never in conditional types
type NonNullable<T> = T extends null | undefined ? never : T;

type Result = NonNullable<string | null>; // string

// never in mapped types
type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

interface User {
  id: string;
  name?: string;
  email?: string;
}

type Required = RequiredKeys<User>; // "id"

// never vs void
function returnsVoid(): void {
  console.log("This function returns");
  // Implicit return undefined
}

function returnsNever(): never {
  throw new Error("This function never returns");
}

// Union with never
type Example = string | never; // Simplified to: string

// Filtering with never
type NonFunctionKeys<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

interface Example {
  name: string;
  age: number;
  getName: () => string;
}

type DataKeys = NonFunctionKeys<Example>; // "name" | "age"

// never in function overloads
function createElement(tag: "div"): HTMLDivElement;
function createElement(tag: "span"): HTMLSpanElement;
function createElement(tag: never): never; // Catch-all for invalid tags
function createElement(tag: string): HTMLElement {
  return document.createElement(tag);
}`,
    explanation: "never represents impossible values, enabling exhaustive checking and type-level programming. Essential for type safety and catching unreachable code."
  },
  {
    id: 105,
    question: "How to define types for React props?",
    answer: "Define React prop types using interfaces or type aliases with proper typing for children, events, and generic components.",
    example: `// Basic component props
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
}

function Button({ children, onClick, disabled = false, variant = "primary" }: ButtonProps) {
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={\`btn btn-\${variant}\`}
    >
      {children}
    </button>
  );
}

// Event handlers
interface FormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

// Generic component props
interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string | number;
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={keyExtractor(item)}>
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  );
}

// Usage
<List
  items={users}
  renderItem={(user) => <span>{user.name}</span>}
  keyExtractor={(user) => user.id}
/>

// Extending HTML attributes
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

function Input({ label, error, ...inputProps }: InputProps) {
  return (
    <div>
      <label>{label}</label>
      <input {...inputProps} />
      {error && <span className="error">{error}</span>}
    </div>
  );
}

// Component with ref forwarding
interface CustomInputProps {
  placeholder: string;
}

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ placeholder }, ref) => {
    return <input ref={ref} placeholder={placeholder} />;
  }
);

// Higher-order component props
interface WithLoadingProps {
  isLoading: boolean;
}

function withLoading<P extends object>(
  Component: React.ComponentType<P>
): React.ComponentType<P & WithLoadingProps> {
  return ({ isLoading, ...props }) => {
    if (isLoading) return <div>Loading...</div>;
    return <Component {...(props as P)} />;
  };
}

// Render props pattern
interface RenderProps<T> {
  data: T;
  loading: boolean;
  error: string | null;
  children: (props: { data: T; loading: boolean; error: string | null }) => React.ReactNode;
}

// Component props with discriminated unions
type IconButtonProps = 
  | {
      variant: "icon";
      icon: React.ReactNode;
      children?: never;
    }
  | {
      variant: "text";
      children: React.ReactNode;
      icon?: never;
    };

function IconButton(props: IconButtonProps) {
  if (props.variant === "icon") {
    return <button>{props.icon}</button>;
  }
  return <button>{props.children}</button>;
}`,
    explanation: "Use interfaces for React props with proper event types, generic constraints, and HTML attribute extensions for type-safe components."
  },
  {
    id: 106,
    question: "How to create reusable component types?",
    answer: "Create reusable component types using generics, utility types, and type composition patterns for flexible and type-safe components.",
    example: `// Generic data table component
interface Column<T> {
  key: keyof T;
  title: string;
  render?: (value: T[keyof T], record: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (record: T) => void;
  loading?: boolean;
}

function DataTable<T extends Record<string, any>>(
  { data, columns, onRowClick, loading }: DataTableProps<T>
) {
  if (loading) return <div>Loading...</div>;
  
  return (
    <table>
      <thead>
        <tr>
          {columns.map(col => (
            <th key={String(col.key)}>{col.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((record, index) => (
          <tr key={index} onClick={() => onRowClick?.(record)}>
            {columns.map(col => (
              <td key={String(col.key)}>
                {col.render ? col.render(record[col.key], record) : String(record[col.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Usage
interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}

const userColumns: Column<User>[] = [
  { key: "name", title: "Name" },
  { key: "email", title: "Email" },
  { 
    key: "age", 
    title: "Age", 
    render: (age) => \`\${age} years old\`
  }
];

<DataTable
  data={users}
  columns={userColumns}
  onRowClick={(user) => console.log(user.name)}
/>

// Form field component with validation
interface FieldProps<T, K extends keyof T> {
  name: K;
  value: T[K];
  onChange: (name: K, value: T[K]) => void;
  label: string;
  required?: boolean;
  validator?: (value: T[K]) => string | null;
}

function Field<T, K extends keyof T>(
  { name, value, onChange, label, required, validator }: FieldProps<T, K>
) {
  const error = validator?.(value);
  
  return (
    <div>
      <label>
        {label} {required && "*"}
      </label>
      <input
        value={String(value)}
        onChange={(e) => onChange(name, e.target.value as T[K])}
      />
      {error && <span className="error">{error}</span>}
    </div>
  );
}

// Modal component with render props
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

interface ModalContextType {
  close: () => void;
}

const ModalContext = React.createContext<ModalContextType | null>(null);

function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;
  
  return (
    <ModalContext.Provider value={{ close: onClose }}>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          {title && <h2>{title}</h2>}
          {children}
        </div>
      </div>
    </ModalContext.Provider>
  );
}

// Compound component pattern
Modal.Header = function ModalHeader({ children }: { children: React.ReactNode }) {
  return <div className="modal-header">{children}</div>;
};

Modal.Body = function ModalBody({ children }: { children: React.ReactNode }) {
  return <div className="modal-body">{children}</div>;
};

Modal.Footer = function ModalFooter({ children }: { children: React.ReactNode }) {
  const context = React.useContext(ModalContext);
  return (
    <div className="modal-footer">
      {children}
      <button onClick={context?.close}>Close</button>
    </div>
  );
};

// Usage
<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
  <Modal.Header>
    <h2>Confirm Action</h2>
  </Modal.Header>
  <Modal.Body>
    <p>Are you sure you want to proceed?</p>
  </Modal.Body>
  <Modal.Footer>
    <button onClick={handleConfirm}>Confirm</button>
  </Modal.Footer>
</Modal>`,
    explanation: "Create reusable components with generics, proper constraints, and composition patterns for maximum flexibility and type safety."
  },
  {
    id: 107,
    question: "What is declaration merging?",
    answer: "Declaration merging combines multiple declarations with the same name into a single definition. Works with interfaces, namespaces, and modules.",
    example: `// Interface merging
interface User {
  name: string;
}

interface User {
  age: number;
}

interface User {
  email: string;
}

// Merged interface
const user: User = {
  name: "John",
  age: 30,
  email: "john@example.com"
};

// Namespace merging
namespace Utils {
  export function formatDate(date: Date): string {
    return date.toISOString();
  }
}

namespace Utils {
  export function formatNumber(num: number): string {
    return num.toLocaleString();
  }
}

// Both functions available
Utils.formatDate(new Date());
Utils.formatNumber(1000);

// Module augmentation
// Extending existing library types
declare module "express" {
  interface Request {
    user?: {
      id: string;
      name: string;
    };
  }
}

// Now req.user is available in Express
app.get("/profile", (req, res) => {
  console.log(req.user?.name); // TypeScript knows about user property
});

// Global augmentation
declare global {
  interface Window {
    myCustomProperty: string;
  }
}

// Now available globally
window.myCustomProperty = "Hello World";

// Class and namespace merging
class Album {
  label: Album.AlbumLabel;
}

namespace Album {
  export class AlbumLabel {
    constructor(public name: string) {}
  }
}

// Usage
const album = new Album();
album.label = new Album.AlbumLabel("Blue Note");

// Function and namespace merging
function buildLabel(name: string): string {
  return buildLabel.prefix + name + buildLabel.suffix;
}

namespace buildLabel {
  export let suffix = "";
  export let prefix = "Hello, ";
}

console.log(buildLabel("Sam Smith")); // "Hello, Sam Smith"

// Enum and namespace merging
enum Color {
  red = 1,
  green = 2,
  blue = 4
}

namespace Color {
  export function mixColors(colorName: string) {
    if (colorName === "yellow") {
      return Color.red + Color.green;
    } else if (colorName === "white") {
      return Color.red + Color.green + Color.blue;
    } else if (colorName === "magenta") {
      return Color.red + Color.blue;
    } else if (colorName === "cyan") {
      return Color.green + Color.blue;
    }
  }
}

// Merging rules:
// ✅ Interfaces always merge
// ✅ Namespaces merge with namespaces, classes, functions, enums
// ❌ Classes cannot merge with other classes
// ❌ Variables cannot merge

// Practical example: Extending third-party library
// types/express.d.ts
declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: string;
      email: string;
      roles: string[];
    };
  }
}

// Now available in all Express route handlers
app.post("/api/users", (req, res) => {
  if (req.user?.roles.includes("admin")) {
    // Handle admin logic
  }
});`,
    explanation: "Declaration merging allows extending existing types and libraries. Most commonly used with interfaces and module augmentation for third-party libraries."
  }
];