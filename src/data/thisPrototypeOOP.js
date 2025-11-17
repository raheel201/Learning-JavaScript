export const thisPrototypeOOP = [
  {
    id: 17,
    question: "How does this work in JS?",
    answer: "'this' refers to the object that is executing the current function. Its value depends on how the function is called.",
    example: `// Global context
console.log(this); // Window (browser) or global (Node.js)

// Object method
const obj = {
  name: "John",
  greet() {
    console.log(this.name); // "John"
  }
};
obj.greet();

// Function call
function regularFunction() {
  console.log(this); // Window (non-strict) or undefined (strict)
}
regularFunction();

// Arrow function
const arrowFunction = () => {
  console.log(this); // Inherits from enclosing scope
};`,
    explanation: "'this' is determined by call-site, not where function is defined (except arrow functions)."
  },
  {
    id: 18,
    question: "Explain this in global, object, function, arrow function.",
    answer: "Global: window/global object. Object method: the object. Function: window/undefined. Arrow: inherited from enclosing scope.",
    example: `// 1. Global context
console.log(this); // Window object (browser)

// 2. Object method
const person = {
  name: "Alice",
  greet: function() {
    console.log(this.name); // "Alice" - this is person object
  },
  arrowGreet: () => {
    console.log(this.name); // undefined - this is global/window
  }
};

// 3. Regular function
function showThis() {
  console.log(this); // Window (non-strict) or undefined (strict)
}

// 4. Constructor function
function Person(name) {
  this.name = name; // this is the new instance
  console.log(this); // Person { name: "Bob" }
}

// 5. Event handler
button.addEventListener('click', function() {
  console.log(this); // the button element
});

button.addEventListener('click', () => {
  console.log(this); // Window object (inherited)
});`,
    explanation: "Arrow functions don't have their own 'this', they inherit from lexical scope."
  },
  {
    id: 19,
    question: "Difference between call, apply, bind.",
    answer: "All three set 'this' value. call: immediate invoke with args. apply: immediate invoke with array. bind: returns new function.",
    example: `const person = {
  name: "John",
  greet(greeting, punctuation) {
    console.log(\`\${greeting}, I'm \${this.name}\${punctuation}\`);
  }
};

const anotherPerson = { name: "Jane" };

// call - invoke immediately with arguments
person.greet.call(anotherPerson, "Hello", "!"); // "Hello, I'm Jane!"

// apply - invoke immediately with array
person.greet.apply(anotherPerson, ["Hi", "."]); // "Hi, I'm Jane."

// bind - returns new function
const boundGreet = person.greet.bind(anotherPerson, "Hey");
boundGreet("?"); // "Hey, I'm Jane?"

// Practical example
const numbers = [1, 2, 3, 4, 5];
const max = Math.max.apply(null, numbers); // 5
const min = Math.min.call(null, ...numbers); // 1`,
    explanation: "Use call for few args, apply for array of args, bind to create reusable function with fixed 'this'."
  },
  {
    id: 20,
    question: "What is prototypal inheritance?",
    answer: "Objects can inherit properties and methods from other objects through the prototype chain.",
    example: `// Constructor function
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  return \`Hello, I'm \${this.name}\`;
};

const john = new Person("John");
console.log(john.greet()); // "Hello, I'm John"

// Inheritance
function Student(name, grade) {
  Person.call(this, name);
  this.grade = grade;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.study = function() {
  return \`\${this.name} is studying\`;
};

const jane = new Student("Jane", "A");
console.log(jane.greet()); // "Hello, I'm Jane"
console.log(jane.study()); // "Jane is studying"`,
    explanation: "JavaScript uses prototype chain for inheritance. Objects inherit from their constructor's prototype."
  },
  {
    id: 21,
    question: "What is prototype chain?",
    answer: "Prototype chain is the mechanism by which objects inherit properties and methods from other objects.",
    example: `function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  return \`\${this.name} makes a sound\`;
};

function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
  return \`\${this.name} barks\`;
};

const buddy = new Dog("Buddy", "Golden Retriever");

// Prototype chain lookup:
console.log(buddy.name);     // Own property
console.log(buddy.bark());   // Dog.prototype
console.log(buddy.speak());  // Animal.prototype
console.log(buddy.toString()); // Object.prototype

// Check prototype chain
console.log(buddy.__proto__ === Dog.prototype); // true
console.log(Dog.prototype.__proto__ === Animal.prototype); // true
console.log(Animal.prototype.__proto__ === Object.prototype); // true`,
    explanation: "When accessing a property, JS looks in object -> prototype -> prototype's prototype -> until Object.prototype."
  },
  {
    id: 22,
    question: "How does new keyword work internally?",
    answer: "new creates empty object, sets prototype, calls constructor with 'this' bound to new object, returns the object.",
    example: `function Person(name) {
  this.name = name;
  this.greet = function() {
    return \`Hello \${this.name}\`;
  };
}

// What 'new Person("John")' does internally:
function createPerson(name) {
  // 1. Create empty object
  const obj = {};
  
  // 2. Set prototype
  Object.setPrototypeOf(obj, Person.prototype);
  
  // 3. Call constructor with 'this' bound to obj
  const result = Person.call(obj, name);
  
  // 4. Return object (or constructor return value if object)
  return result instanceof Object ? result : obj;
}

const john = new Person("John");
const jane = createPerson("Jane");

console.log(john.greet()); // "Hello John"
console.log(jane.greet()); // "Hello Jane"

// Edge case: constructor returns object
function SpecialPerson(name) {
  this.name = name;
  return { customName: "Custom" }; // This is returned instead
}

const special = new SpecialPerson("Test");
console.log(special.customName); // "Custom"`,
    explanation: "new keyword creates instance, sets up prototype chain, and ensures proper 'this' binding."
  },
  {
    id: 23,
    question: "What are constructor functions?",
    answer: "Constructor functions are regular functions used with 'new' keyword to create objects. They set up initial state and prototype.",
    example: `// Constructor function
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.isRunning = false;
}

// Add methods to prototype
Car.prototype.start = function() {
  this.isRunning = true;
  return \`\${this.make} \${this.model} started\`;
};

Car.prototype.stop = function() {
  this.isRunning = false;
  return \`\${this.make} \${this.model} stopped\`;
};

// Create instances
const car1 = new Car("Toyota", "Camry", 2020);
const car2 = new Car("Honda", "Civic", 2021);

console.log(car1.start()); // "Toyota Camry started"
console.log(car2.start()); // "Honda Civic started"

// Check instance
console.log(car1 instanceof Car); // true
console.log(car1.constructor === Car); // true

// Without 'new' keyword
const car3 = Car("Ford", "Focus", 2019); // undefined
console.log(window.make); // "Ford" (in browser, pollutes global)`,
    explanation: "Constructor functions are templates for creating objects. Always use 'new' keyword to avoid global pollution."
  },
  {
    id: 24,
    question: "What are classes in JS? Are they syntactic sugar?",
    answer: "ES6 classes are syntactic sugar over constructor functions and prototypes. They provide cleaner syntax but work the same way internally.",
    example: `// ES6 Class
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    return \`Hello, I'm \${this.name}\`;
  }
  
  static species() {
    return "Homo sapiens";
  }
}

// Equivalent constructor function
function PersonFunc(name, age) {
  this.name = name;
  this.age = age;
}

PersonFunc.prototype.greet = function() {
  return \`Hello, I'm \${this.name}\`;
};

PersonFunc.species = function() {
  return "Homo sapiens";
};

// Both work the same way
const person1 = new Person("Alice", 25);
const person2 = new PersonFunc("Bob", 30);

console.log(person1.greet()); // "Hello, I'm Alice"
console.log(person2.greet()); // "Hello, I'm Bob"

// Class inheritance
class Student extends Person {
  constructor(name, age, grade) {
    super(name, age);
    this.grade = grade;
  }
  
  study() {
    return \`\${this.name} is studying\`;
  }
}`,
    explanation: "Classes are syntactic sugar that make OOP syntax cleaner, but underneath they use the same prototype mechanism."
  },
  {
    id: 25,
    question: "How does super() work?",
    answer: "super() calls the parent class constructor or methods. It must be called before using 'this' in child constructor.",
    example: `class Animal {
  constructor(name, species) {
    this.name = name;
    this.species = species;
  }
  
  speak() {
    return \`\${this.name} makes a sound\`;
  }
  
  info() {
    return \`\${this.name} is a \${this.species}\`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name, "Canine"); // Call parent constructor
    this.breed = breed;
  }
  
  speak() {
    return super.speak() + " - Woof!"; // Call parent method
  }
  
  getBreed() {
    return \`\${super.info()} of \${this.breed} breed\`;
  }
}

const buddy = new Dog("Buddy", "Golden Retriever");

console.log(buddy.speak()); // "Buddy makes a sound - Woof!"
console.log(buddy.getBreed()); // "Buddy is a Canine of Golden Retriever breed"

// Error example
class Cat extends Animal {
  constructor(name, breed) {
    this.breed = breed; // ReferenceError: Must call super() first
    super(name, "Feline");
  }
}`,
    explanation: "super() establishes the prototype chain and initializes parent properties before child properties."
  },
  {
    id: 26,
    question: "What is the difference between classical vs prototypal inheritance?",
    answer: "Classical inheritance uses classes as blueprints. Prototypal inheritance uses objects inheriting directly from other objects.",
    example: `// Classical Inheritance (Java-like, ES6 classes)
class Vehicle {
  constructor(type) {
    this.type = type;
  }
  
  move() {
    return \`\${this.type} is moving\`;
  }
}

class Car extends Vehicle {
  constructor(brand) {
    super("Car");
    this.brand = brand;
  }
}

// Prototypal Inheritance (Pure JavaScript)
const vehicle = {
  type: "Vehicle",
  move() {
    return \`\${this.type} is moving\`;
  }
};

const car = Object.create(vehicle);
car.type = "Car";
car.brand = "Toyota";

// Factory function approach
function createVehicle(type) {
  return {
    type: type,
    move() {
      return \`\${this.type} is moving\`;
    }
  };
}

function createCar(brand) {
  const car = createVehicle("Car");
  car.brand = brand;
  return car;
}

// Mixin pattern
const flyable = {
  fly() {
    return \`\${this.type} is flying\`;
  }
};

const airplane = Object.assign(createVehicle("Airplane"), flyable);`,
    explanation: "Classical uses class hierarchies, prototypal uses object delegation. JavaScript naturally supports prototypal inheritance."
  },
  {
    id: 27,
    question: "What is implicit binding vs explicit binding?",
    answer: "Implicit binding: 'this' is determined by call-site context. Explicit binding: 'this' is manually set using call, apply, or bind.",
    example: `// Implicit binding - determined by call-site
const obj = {
  name: "John",
  greet() {
    console.log(this.name); // 'this' implicitly bound to obj
  }
};

obj.greet(); // "John" - implicit binding

const greetFunc = obj.greet;
greetFunc(); // undefined - lost binding, 'this' is global/undefined

// Explicit binding - manually set 'this'
const person1 = { name: "Alice" };
const person2 = { name: "Bob" };

function introduce() {
  console.log(\`Hi, I'm \${this.name}\`);
}

// Using call (explicit)
introduce.call(person1); // "Hi, I'm Alice"
introduce.call(person2); // "Hi, I'm Bob"

// Using bind (explicit)
const boundIntroduce = introduce.bind(person1);
boundIntroduce(); // "Hi, I'm Alice"

// Arrow functions ignore explicit binding
const arrowIntroduce = () => console.log(\`Hi, I'm \${this.name}\`);
arrowIntroduce.call(person1); // Uses lexical 'this', not person1`,
    explanation: "Implicit binding can be lost when functions are passed around. Explicit binding gives you control over 'this'."
  },
  {
    id: 28,
    question: "Why does arrow function not have its own this?",
    answer: "Arrow functions inherit 'this' from the enclosing lexical scope at definition time, not call time. They cannot be bound.",
    example: `// Regular function - 'this' determined at call time
const obj1 = {
  name: "Regular",
  greet: function() {
    console.log(this.name);
  }
};

// Arrow function - 'this' from lexical scope
const obj2 = {
  name: "Arrow",
  greet: () => {
    console.log(this.name); // 'this' from outer scope (global)
  }
};

obj1.greet(); // "Regular"
obj2.greet(); // undefined (or global name)

// Practical example - event handlers
class Button {
  constructor(element) {
    this.element = element;
    this.clickCount = 0;
    
    // Regular function loses 'this'
    this.element.addEventListener('click', function() {
      this.clickCount++; // 'this' is the button element, not Button instance
    });
    
    // Arrow function preserves 'this'
    this.element.addEventListener('click', () => {
      this.clickCount++; // 'this' is the Button instance
    });
  }
}

// Cannot bind arrow functions
const arrow = () => console.log(this.name);
const person = { name: "John" };
arrow.call(person); // Still uses lexical 'this', not person`,
    explanation: "Arrow functions solve the common problem of losing 'this' context in callbacks and event handlers."
  },
  {
    id: 29,
    question: "What is the difference between prototype vs __proto__?",
    answer: "prototype is a property of constructor functions. __proto__ is a property of all objects that points to their prototype.",
    example: `function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  return \`Hello, I'm \${this.name}\`;
};

const john = new Person("John");

// prototype - property of constructor function
console.log(Person.prototype); // { greet: function, constructor: Person }
console.log(typeof Person.prototype); // "object"

// __proto__ - property of instances
console.log(john.__proto__); // Same as Person.prototype
console.log(john.__proto__ === Person.prototype); // true

// Objects don't have prototype property
console.log(john.prototype); // undefined

// Functions have both
function myFunc() {}
console.log(myFunc.prototype); // { constructor: myFunc }
console.log(myFunc.__proto__); // Function.prototype

// Modern way to access prototype
console.log(Object.getPrototypeOf(john)); // Same as john.__proto__

// Setting prototype
const animal = { species: "Unknown" };
const dog = {};
Object.setPrototypeOf(dog, animal);
console.log(dog.species); // "Unknown"`,
    explanation: "prototype is for constructor functions to define shared methods. __proto__ is the actual prototype link in objects."
  },
  {
    id: 30,
    question: "Why do we use Object.create?",
    answer: "Object.create creates a new object with a specified prototype, allowing clean prototypal inheritance without constructor functions.",
    example: `// Creating object with specific prototype
const animal = {
  species: "Unknown",
  speak() {
    return \`\${this.name} makes a sound\`;
  }
};

// Object.create sets prototype directly
const dog = Object.create(animal);
dog.name = "Buddy";
dog.species = "Canine";

console.log(dog.speak()); // "Buddy makes a sound"
console.log(Object.getPrototypeOf(dog) === animal); // true

// vs regular object literal
const cat = {
  name: "Whiskers",
  species: "Feline"
};
console.log(Object.getPrototypeOf(cat) === Object.prototype); // true

// Object.create with property descriptors
const person = Object.create(animal, {
  name: {
    value: "John",
    writable: true,
    enumerable: true
  },
  age: {
    value: 30,
    writable: false
  }
});

// Creating object with null prototype
const pureObject = Object.create(null);
pureObject.name = "Pure";
console.log(pureObject.toString); // undefined - no Object.prototype methods

// Inheritance with Object.create
function createStudent(name, grade) {
  const student = Object.create(person);
  student.name = name;
  student.grade = grade;
  return student;
}`,
    explanation: "Object.create provides clean prototypal inheritance, avoids constructor function complexity, and allows null prototype objects."
  },
  {
    id: 31,
    question: "What is the difference between getters/setters vs normal methods?",
    answer: "Getters/setters are accessed like properties but execute functions. Normal methods require parentheses to call.",
    example: `class Person {
  constructor(firstName, lastName) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._age = 0;
  }
  
  // Getter - accessed like property
  get fullName() {
    return \`\${this._firstName} \${this._lastName}\`;
  }
  
  // Setter - assigned like property
  set fullName(value) {
    [this._firstName, this._lastName] = value.split(' ');
  }
  
  get age() {
    return this._age;
  }
  
  set age(value) {
    if (value < 0) throw new Error('Age cannot be negative');
    this._age = value;
  }
  
  // Normal method - requires parentheses
  getFullName() {
    return \`\${this._firstName} \${this._lastName}\`;
  }
  
  setFullName(firstName, lastName) {
    this._firstName = firstName;
    this._lastName = lastName;
  }
}

const person = new Person("John", "Doe");

// Getters/setters - no parentheses
console.log(person.fullName); // "John Doe"
person.fullName = "Jane Smith";
console.log(person.fullName); // "Jane Smith"

// Normal methods - require parentheses
console.log(person.getFullName()); // "Jane Smith"
person.setFullName("Bob", "Johnson");

// Validation in setter
person.age = 25; // OK
// person.age = -5; // Error: Age cannot be negative`,
    explanation: "Getters/setters provide property-like access with validation and computed values. Normal methods are explicit function calls."
  },
  {
    id: 32,
    question: "What are private class fields (#)? Why are they used?",
    answer: "Private fields use # prefix and are only accessible within the class. They provide true encapsulation and data hiding.",
    example: `class BankAccount {
  // Private fields
  #balance = 0;
  #accountNumber;
  #pin;
  
  constructor(accountNumber, initialBalance, pin) {
    this.#accountNumber = accountNumber;
    this.#balance = initialBalance;
    this.#pin = pin;
  }
  
  // Private method
  #validatePin(pin) {
    return this.#pin === pin;
  }
  
  // Public methods to access private data
  deposit(amount, pin) {
    if (!this.#validatePin(pin)) {
      throw new Error('Invalid PIN');
    }
    this.#balance += amount;
    return this.#balance;
  }
  
  withdraw(amount, pin) {
    if (!this.#validatePin(pin)) {
      throw new Error('Invalid PIN');
    }
    if (amount > this.#balance) {
      throw new Error('Insufficient funds');
    }
    this.#balance -= amount;
    return this.#balance;
  }
  
  getBalance(pin) {
    if (!this.#validatePin(pin)) {
      throw new Error('Invalid PIN');
    }
    return this.#balance;
  }
}

const account = new BankAccount('123456', 1000, '1234');

// Public interface works
console.log(account.getBalance('1234')); // 1000
account.deposit(500, '1234');

// Private fields are inaccessible
console.log(account.#balance); // SyntaxError
console.log(account.balance); // undefined

// vs old convention with underscore (not truly private)
class OldAccount {
  constructor() {
    this._balance = 0; // Convention, but still accessible
  }
}

const oldAccount = new OldAccount();
console.log(oldAccount._balance); // 0 - accessible!`,
    explanation: "Private fields provide true encapsulation, preventing external access and modification of internal state."
  },
  {
    id: 33,
    question: "Explain static methods in classes.",
    answer: "Static methods belong to the class itself, not instances. They're called on the class and can't access instance properties.",
    example: `class MathUtils {
  static PI = 3.14159;
  
  constructor(value) {
    this.value = value;
  }
  
  // Static method - belongs to class
  static add(a, b) {
    return a + b;
  }
  
  static multiply(a, b) {
    return a * b;
  }
  
  static circleArea(radius) {
    return this.PI * radius * radius; // 'this' refers to class
  }
  
  // Instance method
  getValue() {
    return this.value; // 'this' refers to instance
  }
  
  // Static method can't access instance properties
  static getInstanceValue() {
    return this.value; // undefined - no instance context
  }
}

// Call static methods on class
console.log(MathUtils.add(5, 3)); // 8
console.log(MathUtils.circleArea(5)); // 78.54

// Create instance
const math = new MathUtils(42);
console.log(math.getValue()); // 42

// Can't call static method on instance
// math.add(1, 2); // TypeError: math.add is not a function

// Real-world example
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  
  static validateEmail(email) {
    return email.includes('@');
  }
  
  static createAdmin(name) {
    return new User(name, \`\${name.toLowerCase()}@admin.com\`);
  }
}

// Use static methods for utilities and factories
if (User.validateEmail('test@example.com')) {
  const admin = User.createAdmin('John');
}`,
    explanation: "Static methods are utility functions related to the class but don't need instance data. Common for factories and validators."
  },
  {
    id: 34,
    question: "How does instanceof work internally?",
    answer: "instanceof checks if an object's prototype chain contains the constructor's prototype property.",
    example: `function Person(name) {
  this.name = name;
}

function Student(name, grade) {
  Person.call(this, name);
  this.grade = grade;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

const john = new Student("John", "A");

// instanceof checks prototype chain
console.log(john instanceof Student); // true
console.log(john instanceof Person);  // true
console.log(john instanceof Object);  // true

// How instanceof works internally
function customInstanceof(obj, constructor) {
  // Get object's prototype
  let objProto = Object.getPrototypeOf(obj);
  
  // Get constructor's prototype
  const constructorProto = constructor.prototype;
  
  // Walk up the prototype chain
  while (objProto !== null) {
    if (objProto === constructorProto) {
      return true;
    }
    objProto = Object.getPrototypeOf(objProto);
  }
  
  return false;
}

console.log(customInstanceof(john, Student)); // true
console.log(customInstanceof(john, Person));  // true

// Edge cases
console.log(null instanceof Object); // false
console.log(undefined instanceof Object); // false

// With built-in types
const arr = [1, 2, 3];
console.log(arr instanceof Array);  // true
console.log(arr instanceof Object); // true

// Symbol.hasInstance for custom behavior
class MyClass {
  static [Symbol.hasInstance](obj) {
    return obj && obj.customProperty === 'special';
  }
}

const obj = { customProperty: 'special' };
console.log(obj instanceof MyClass); // true`,
    explanation: "instanceof traverses the prototype chain looking for the constructor's prototype. It can be customized with Symbol.hasInstance."
  },
  {
    id: 35,
    question: "What happens if you forget to use 'new' with a constructor function?",
    answer: "Without 'new', 'this' refers to global object (or undefined in strict mode), causing properties to be set globally or throwing errors.",
    example: `function Person(name, age) {
  this.name = name;
  this.age = age;
  
  this.greet = function() {
    return \`Hello, I'm \${this.name}\`;
  };
}

// Correct usage with 'new'
const john = new Person("John", 30);
console.log(john.name); // "John"
console.log(john.greet()); // "Hello, I'm John"

// Forgot 'new' - properties go to global object
const jane = Person("Jane", 25); // No 'new'
console.log(jane); // undefined
console.log(window.name); // "Jane" (in browser)
console.log(window.age);  // 25

// In strict mode
"use strict";
function StrictPerson(name) {
  this.name = name; // TypeError: Cannot set property 'name' of undefined
}

// StrictPerson("Bob"); // Error!

// Defensive constructor pattern
function SafePerson(name, age) {
  // Check if called with 'new'
  if (!(this instanceof SafePerson)) {
    return new SafePerson(name, age);
  }
  
  this.name = name;
  this.age = age;
}

// Works with or without 'new'
const safe1 = new SafePerson("Alice", 28);
const safe2 = SafePerson("Bob", 32); // Automatically uses 'new'

console.log(safe1.name); // "Alice"
console.log(safe2.name); // "Bob"

// ES6 classes prevent this issue
class ModernPerson {
  constructor(name) {
    this.name = name;
  }
}

// ModernPerson("Test"); // TypeError: Class constructor cannot be invoked without 'new'`,
    explanation: "Forgetting 'new' causes global pollution or errors. Use strict mode, defensive patterns, or ES6 classes to prevent this."
  }
];