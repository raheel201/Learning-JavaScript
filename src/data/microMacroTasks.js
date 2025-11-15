export const microMacroTasksQuestions = [
  {
    id: 92,
    question: "Microtask before macrotask",
    answer: "Order: A, D, C, B",
    example: `console.log("A");
setTimeout(() => console.log("B"));
Promise.resolve().then(() => console.log("C"));
console.log("D");`,
    explanation: "Synchronous code runs first (A, D), then microtasks (Promise - C), then macrotasks (setTimeout - B)."
  },
  {
    id: 93,
    question: "Promise resolves instantly",
    answer: "Order: Y, X",
    example: `Promise.resolve().then(() => console.log("X"));
console.log("Y");`,
    explanation: "Synchronous code (Y) executes first, then microtask (X) runs after the current execution context."
  },
  {
    id: 94,
    question: "Multiple microtasks",
    answer: "Order: 3, 1, 2",
    example: `Promise.resolve().then(() => console.log(1));
Promise.resolve().then(() => console.log(2));
console.log(3);`,
    explanation: "Synchronous code (3) runs first, then microtasks execute in order they were queued (1, 2)."
  },
  {
    id: 95,
    question: "setTimeout inside promise",
    answer: "Order: M, P, T",
    example: `Promise.resolve().then(() => {
  console.log("P");
  setTimeout(() => console.log("T"));
});
console.log("M");`,
    explanation: "Synchronous (M), then microtask (P), then macrotask (T) scheduled from within the microtask."
  },
  {
    id: 96,
    question: "Zero delay still macrotask",
    answer: "Order: B, A",
    example: `setTimeout(() => console.log("A"), 0);
console.log("B");`,
    explanation: "Even with 0 delay, setTimeout is a macrotask and runs after synchronous code."
  },
  {
    id: 97,
    question: "Async/await is microtask",
    answer: "Order: 1, 3, 2",
    example: `async function test() {
  console.log(1);
  await null;
  console.log(2);
}
test();
console.log(3);`,
    explanation: "Function starts synchronously (1), await creates microtask, synchronous continues (3), then microtask (2)."
  },
  {
    id: 98,
    question: "Nested microtasks",
    answer: "Order: C, A, B",
    example: `Promise.resolve().then(() => {
  console.log("A");
  Promise.resolve().then(() => console.log("B"));
});
console.log("C");`,
    explanation: "Synchronous (C), first microtask (A), then nested microtask (B) added to queue."
  },
  {
    id: 99,
    question: "Mixed micro & macro",
    answer: "Order: P1, P2, T1, T2",
    example: `setTimeout(() => console.log("T1"));
Promise.resolve().then(() => console.log("P1"));
setTimeout(() => console.log("T2"));
Promise.resolve().then(() => console.log("P2"));`,
    explanation: "All microtasks (P1, P2) execute before any macrotasks (T1, T2)."
  },
  {
    id: 100,
    question: "Async/await with microtasks",
    answer: "Order: A, C, B",
    example: `async function f() {
  console.log("A");
  await Promise.resolve();
  console.log("B");
}
f();
console.log("C");`,
    explanation: "Function starts (A), await schedules microtask, synchronous continues (C), then microtask (B)."
  },
  {
    id: 101,
    question: "Microtask inside setTimeout",
    answer: "Order: X → T → P",
    example: `setTimeout(() => {
  console.log("T");
  Promise.resolve().then(() => console.log("P"));
});
console.log("X");`,
    explanation: "Synchronous (X), then macrotask (T), then microtask (P) created within the macrotask."
  },
  {
    id: 102,
    question: "Double await",
    answer: "Order: OUT → DONE",
    example: `async function f() {
  await Promise.resolve();
  await Promise.resolve();
  console.log("DONE");
}
f();
console.log("OUT");`,
    explanation: "Each await creates a microtask. Synchronous (OUT) runs first, then both awaits complete (DONE)."
  },
  {
    id: 103,
    question: "then() inside async",
    answer: "Order: B → A → P",
    example: `async function f() {
  await 1;
  Promise.resolve().then(() => console.log("P"));
  console.log("A");
}
f();
console.log("B");`,
    explanation: "Synchronous (B), await completes then synchronous in function (A), then new microtask (P)."
  },
  {
    id: 104,
    question: "Promise chain",
    answer: "Order: 3, 1, 2",
    example: `Promise.resolve()
  .then(() => console.log("1"))
  .then(() => console.log("2"));
console.log("3");`,
    explanation: "Synchronous (3), then first microtask (1), then chained microtask (2)."
  },
  {
    id: 105,
    question: "Promise inside setTimeout vs timeout inside promise",
    answer: "Order: P2, T1, P1, T2",
    example: `setTimeout(() => {
  console.log("T1");
  Promise.resolve().then(() => console.log("P1"));
});

Promise.resolve().then(() => {
  console.log("P2");
  setTimeout(() => console.log("T2"));
});`,
    explanation: "Microtask (P2) runs first, then first macrotask (T1) with its microtask (P1), then second macrotask (T2)."
  },
  {
    id: 106,
    question: "Async inside setTimeout",
    answer: "Order: 3, 1, 2",
    example: `setTimeout(async () => {
  console.log(1);
  await null;
  console.log(2);
});
console.log(3);`,
    explanation: "Synchronous (3), then macrotask starts (1), await creates microtask within macrotask context (2)."
  },
  {
    id: 107,
    question: "Multiple awaits",
    answer: "Order: 1, 6, 3, 5",
    example: `async function x() {
  console.log(1);
  await 2;
  console.log(3);
  await 4;
  console.log(5);
}
x();
console.log(6);`,
    explanation: "Function starts (1), first await schedules microtask, synchronous continues (6), then microtasks (3, 5)."
  },
  {
    id: 108,
    question: "Return inside then",
    answer: "Order: 3, 1, 2",
    example: `Promise.resolve().then(() => {
  console.log(1);
  return Promise.resolve();
}).then(() => console.log(2));

console.log(3);`,
    explanation: "Synchronous (3), first microtask (1), returning Promise creates another microtask (2)."
  },
  {
    id: 109,
    question: "Promise inside async inside promise",
    answer: "Order: 3, 1, 2",
    example: `Promise.resolve().then(async () => {
  console.log(1);
  await null;
  console.log(2);
});
console.log(3);`,
    explanation: "Synchronous (3), microtask starts async function (1), await creates another microtask (2)."
  },
  {
    id: 110,
    question: "setTimeout with 0 vs 100",
    answer: "Order: D, C, B, A",
    example: `setTimeout(() => console.log("A"), 100);
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");`,
    explanation: "Synchronous (D), microtask (C), then macrotasks in timer order: 0ms (B), then 100ms (A)."
  },
  {
    id: 111,
    question: "Multiple chained thens",
    answer: "Order: 4, 1, 3, 2",
    example: `Promise.resolve()
  .then(() => console.log(1))
  .then(() => console.log(2));
Promise.resolve().then(() => console.log(3));
console.log(4);`,
    explanation: "Synchronous (4), first level microtasks (1, 3), then second level microtask (2)."
  },
  {
    id: 112,
    question: "Then chain inside timeout",
    answer: "Order: S, M, T, P",
    example: `setTimeout(() => {
  console.log("T");
  Promise.resolve().then(() => console.log("P"));
});
Promise.resolve().then(() => console.log("M"));
console.log("S");`,
    explanation: "Synchronous (S), microtask (M), macrotask (T), then microtask within macrotask (P)."
  },
  {
    id: 113,
    question: "Microtask queue inside microtask",
    answer: "Order: D, A, B, C",
    example: `Promise.resolve().then(() => {
  console.log("A");
  Promise.resolve().then(() => {
    console.log("B");
    Promise.resolve().then(() => console.log("C"));
  });
});
console.log("D");`,
    explanation: "Synchronous (D), first microtask (A), second level microtask (B), third level microtask (C)."
  },
  {
    id: 114,
    question: "Interleaving async + setTimeout + promises",
    answer: "Order: 1, 4, 3, 2",
    example: `async function run() {
  console.log(1);
  setTimeout(() => console.log(2));
  await Promise.resolve();
  console.log(3);
}
run();
console.log(4);`,
    explanation: "Function starts (1), setTimeout queued, await creates microtask, synchronous (4), microtask (3), macrotask (2)."
  },
  {
    id: 115,
    question: "Tricky nested async",
    answer: "Order: A, C, D, B",
    example: `async function foo() {
  console.log("A");
  await bar();
  console.log("B");
}
async function bar() {
  console.log("C");
}
foo();
console.log("D");`,
    explanation: "foo starts (A), bar executes synchronously (C), await creates microtask, synchronous (D), microtask (B)."
  },
  {
    id: 116,
    question: "Chained awaits",
    answer: "Order: X, Z, Y",
    example: `async function t() {
  await Promise.resolve(console.log("X"));
  console.log("Y");
}
t();
console.log("Z");`,
    explanation: "Promise.resolve executes immediately (X), await creates microtask, synchronous (Z), microtask (Y)."
  },
  {
    id: 117,
    question: "Nested async inside setTimeout",
    answer: "Order: M2, T1, M1, T2, M3",
    example: `setTimeout(() => {
  console.log("T1");
  Promise.resolve().then(() => console.log("M1"));
});

Promise.resolve().then(() => {
  console.log("M2");
  setTimeout(() => {
    console.log("T2");
    Promise.resolve().then(() => console.log("M3"));
  });
});`,
    explanation: "Microtask (M2) runs first, then first macrotask (T1) with microtask (M1), then second macrotask (T2) with microtask (M3)."
  },
  {
    id: 118,
    question: "Monster callback hell",
    answer: "Order: 1, 6, 4, 2, 3, 5",
    example: `console.log(1);

setTimeout(() => {
  console.log(2);
  Promise.resolve().then(() => console.log(3));
}, 0);

Promise.resolve().then(() => {
  console.log(4);
  setTimeout(() => console.log(5));
});

console.log(6);`,
    explanation: "Synchronous (1, 6), microtask (4), first macrotask (2) with microtask (3), second macrotask (5)."
  },
  {
    id: 119,
    question: "Double event loop cycles",
    answer: "Order: D, B, A, C",
    example: `setTimeout(() => console.log("A"));

Promise.resolve().then(() => {
  console.log("B");
  setTimeout(() => console.log("C"));
});
console.log("D");`,
    explanation: "Synchronous (D), microtask (B), first macrotask (A), second macrotask (C) scheduled from microtask."
  },
  {
    id: 120,
    question: "Async recursion with tasks",
    answer: "Order: 1, 3, 5, 4, 2",
    example: `async function f() {
  console.log("1");
  await f2();
  console.log("2");
}
async function f2() {
  console.log("3");
  await null;
  console.log("4");
}
f();
console.log("5");`,
    explanation: "f starts (1), f2 starts (3), await in f2 creates microtask, synchronous (5), f2 completes (4), f completes (2)."
  }
];