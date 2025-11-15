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
  }
];