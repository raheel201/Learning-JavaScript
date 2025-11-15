export const asynchronousJS = [
  {
    id: 27,
    question: "What is the event loop?",
    answer: "Event loop manages execution of code, handles events, and executes queued sub-tasks. It moves tasks from callback queue to call stack when stack is empty.",
    example: `console.log("1"); // Synchronous

setTimeout(() => {
  console.log("2"); // Macrotask
}, 0);

Promise.resolve().then(() => {
  console.log("3"); // Microtask
});

console.log("4"); // Synchronous

// Output: 1, 4, 3, 2
// Microtasks have higher priority than macrotasks`,
    explanation: "Event loop: Call Stack -> Microtask Queue -> Macrotask Queue. Microtasks always execute before macrotasks."
  },
  {
    id: 28,
    question: "Difference between microtasks and macrotasks.",
    answer: "Microtasks (Promises, queueMicrotask) have higher priority than macrotasks (setTimeout, setInterval). All microtasks execute before any macrotask.",
    example: `console.log("Start");

// Macrotasks
setTimeout(() => console.log("Timeout 1"), 0);
setTimeout(() => console.log("Timeout 2"), 0);

// Microtasks
Promise.resolve().then(() => console.log("Promise 1"));
Promise.resolve().then(() => console.log("Promise 2"));

queueMicrotask(() => console.log("Microtask"));

console.log("End");

// Output:
// Start
// End
// Promise 1
// Promise 2
// Microtask
// Timeout 1
// Timeout 2

// Nested example
setTimeout(() => {
  console.log("Timeout");
  Promise.resolve().then(() => console.log("Promise in timeout"));
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
  setTimeout(() => console.log("Timeout in promise"), 0);
});`,
    explanation: "Microtasks: Promise.then/catch/finally, queueMicrotask, MutationObserver. Macrotasks: setTimeout, setInterval, setImmediate."
  },
  {
    id: 29,
    question: "Order of execution: promise vs setTimeout.",
    answer: "Promises (microtasks) always execute before setTimeout (macrotasks), regardless of timing.",
    example: `// Test 1: Both with 0 delay
setTimeout(() => console.log("setTimeout"), 0);
Promise.resolve().then(() => console.log("Promise"));
// Output: Promise, setTimeout

// Test 2: Multiple levels
setTimeout(() => {
  console.log("setTimeout 1");
  Promise.resolve().then(() => console.log("Promise in setTimeout"));
}, 0);

Promise.resolve().then(() => {
  console.log("Promise 1");
  setTimeout(() => console.log("setTimeout in Promise"), 0);
});

// Output:
// Promise 1
// setTimeout 1
// Promise in setTimeout
// setTimeout in Promise

// Test 3: Chained promises
Promise.resolve()
  .then(() => {
    console.log("Promise 1");
    return Promise.resolve();
  })
  .then(() => console.log("Promise 2"));

setTimeout(() => console.log("setTimeout"), 0);

// Output: Promise 1, Promise 2, setTimeout`,
    explanation: "Event loop processes all microtasks before moving to the next macrotask, ensuring predictable execution order."
  },
  {
    id: 30,
    question: "What is async/await? How does it work internally?",
    answer: "async/await is syntactic sugar over Promises. async functions return Promise, await pauses execution until Promise resolves.",
    example: `// Promise way
function fetchUserPromise() {
  return fetch('/api/user')
    .then(response => response.json())
    .then(user => {
      console.log(user);
      return user;
    })
    .catch(error => {
      console.error(error);
    });
}

// async/await way
async function fetchUserAsync() {
  try {
    const response = await fetch('/api/user');
    const user = await response.json();
    console.log(user);
    return user;
  } catch (error) {
    console.error(error);
  }
}

// How async/await works internally
async function example() {
  console.log("1");
  const result = await Promise.resolve("2");
  console.log(result);
  console.log("3");
}

// Equivalent to:
function examplePromise() {
  console.log("1");
  return Promise.resolve("2")
    .then(result => {
      console.log(result);
      console.log("3");
    });
}`,
    explanation: "async/await makes asynchronous code look synchronous, easier to read and debug than Promise chains."
  },
  {
    id: 31,
    question: "What happens if you don't use try/catch in async function?",
    answer: "Unhandled errors in async functions return rejected Promise. Without try/catch, errors propagate to caller or become unhandled rejections.",
    example: `// Without try/catch
async function riskyFunction() {
  const data = await fetch('/api/nonexistent'); // This might fail
  return data.json();
}

// Calling without handling
riskyFunction(); // Unhandled Promise rejection

// Proper error handling
async function safeFunction() {
  try {
    const data = await fetch('/api/nonexistent');
    return await data.json();
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
}

// Alternative: handle at call site
riskyFunction()
  .then(result => console.log(result))
  .catch(error => console.error('Caught:', error));

// Multiple awaits - where to catch?
async function multipleAwaits() {
  try {
    const user = await fetchUser(); // Might fail
    const posts = await fetchPosts(user.id); // Might fail
    const comments = await fetchComments(posts[0].id); // Might fail
    return { user, posts, comments };
  } catch (error) {
    // Catches any error from any await
    console.error('Something failed:', error);
    return null;
  }
}`,
    explanation: "Always use try/catch in async functions or handle Promise rejection at call site to prevent unhandled rejections."
  },
  {
    id: 32,
    question: "How to run promises in parallel?",
    answer: "Use Promise.all() for parallel execution, or start promises before awaiting them.",
    example: `// Sequential (slow)
async function sequential() {
  const user = await fetchUser(); // Wait 1s
  const posts = await fetchPosts(); // Wait 1s
  const comments = await fetchComments(); // Wait 1s
  return { user, posts, comments }; // Total: 3s
}

// Parallel with Promise.all (fast)
async function parallel() {
  const [user, posts, comments] = await Promise.all([
    fetchUser(),    // Start immediately
    fetchPosts(),   // Start immediately
    fetchComments() // Start immediately
  ]);
  return { user, posts, comments }; // Total: 1s (max of all)
}

// Parallel with individual awaits
async function parallelAwaits() {
  const userPromise = fetchUser();    // Start immediately
  const postsPromise = fetchPosts();  // Start immediately
  const commentsPromise = fetchComments(); // Start immediately
  
  const user = await userPromise;     // Wait for completion
  const posts = await postsPromise;   // Wait for completion
  const comments = await commentsPromise; // Wait for completion
  
  return { user, posts, comments };
}

// Mixed: some sequential, some parallel
async function mixed() {
  const user = await fetchUser(); // Must get user first
  
  // Then fetch posts and profile in parallel
  const [posts, profile] = await Promise.all([
    fetchPosts(user.id),
    fetchProfile(user.id)
  ]);
  
  return { user, posts, profile };
}`,
    explanation: "Promise.all() runs promises concurrently and waits for all to complete. Start promises early to maximize parallelism."
  },
  {
    id: 33,
    question: "Difference between Promise.all, Promise.race, Promise.allSettled.",
    answer: "Promise.all waits for all to resolve/any to reject. Promise.race returns first settled. Promise.allSettled waits for all to settle.",
    example: `const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = Promise.reject("Error");
const slowPromise = new Promise(resolve => setTimeout(() => resolve("slow"), 2000));

// Promise.all - fails fast
Promise.all([promise1, promise2])
  .then(results => console.log(results)); // [1, 2]

Promise.all([promise1, promise3])
  .catch(error => console.log(error)); // "Error"

// Promise.race - first to settle wins
Promise.race([promise1, promise2])
  .then(result => console.log(result)); // 1

Promise.race([slowPromise, Promise.resolve("fast")])
  .then(result => console.log(result)); // "fast"

// Promise.allSettled - waits for all
Promise.allSettled([promise1, promise2, promise3])
  .then(results => console.log(results));
// [
//   { status: 'fulfilled', value: 1 },
//   { status: 'fulfilled', value: 2 },
//   { status: 'rejected', reason: 'Error' }
// ]

// Promise.any - first fulfilled (ignores rejections)
Promise.any([promise3, promise1, promise2])
  .then(result => console.log(result)); // 1

// Real-world example: timeout pattern
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout')), ms)
  );
  
  return Promise.race([promise, timeout]);
}`,
    explanation: "Use Promise.all for dependent operations, Promise.race for timeout/fastest response, Promise.allSettled when you need all results regardless of success/failure."
  },
  {
    id: 34,
    question: "Explain callback hell and how promises solve it.",
    answer: "Callback hell is nested callbacks that make code hard to read and maintain. Promises provide flat chaining and better error handling.",
    example: `// Callback Hell
function getUserData(userId, callback) {
  getUser(userId, (userError, user) => {
    if (userError) {
      callback(userError, null);
      return;
    }
    
    getPosts(user.id, (postsError, posts) => {
      if (postsError) {
        callback(postsError, null);
        return;
      }
      
      getComments(posts[0].id, (commentsError, comments) => {
        if (commentsError) {
          callback(commentsError, null);
          return;
        }
        
        callback(null, { user, posts, comments });
      });
    });
  });
}

// Promise Solution
function getUserDataPromise(userId) {
  return getUser(userId)
    .then(user => getPosts(user.id))
    .then(posts => getComments(posts[0].id))
    .then(comments => ({ user, posts, comments }))
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
}

// Async/Await Solution (even cleaner)
async function getUserDataAsync(userId) {
  try {
    const user = await getUser(userId);
    const posts = await getPosts(user.id);
    const comments = await getComments(posts[0].id);
    return { user, posts, comments };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Promise utilities to convert callbacks
function promisify(fn) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
    });
  };
}

const getUserPromise = promisify(getUser);`,
    explanation: "Promises eliminate callback hell through chaining, provide better error handling, and make async code more readable."
  },
  {
    id: 35,
    question: "What is the difference between synchronous vs asynchronous?",
    answer: "Synchronous code blocks execution until complete. Asynchronous code doesn't block, allowing other code to run while waiting.",
    example: `// Synchronous - blocks execution
console.log("Start");

function syncOperation() {
  const start = Date.now();
  while (Date.now() - start < 2000) {
    // Block for 2 seconds
  }
  return "Sync done";
}

console.log(syncOperation()); // Blocks here for 2s
console.log("End");

// Output: Start -> (2s delay) -> Sync done -> End

// Asynchronous - non-blocking
console.log("Start");

function asyncOperation() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("Async done");
    }, 2000);
  });
}

asyncOperation().then(result => console.log(result));
console.log("End");

// Output: Start -> End -> (2s delay) -> Async done

// Real-world examples
// Synchronous file reading (Node.js)
const fs = require('fs');
const data = fs.readFileSync('file.txt', 'utf8'); // Blocks
console.log(data);

// Asynchronous file reading
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data); // Executes when ready
});

// Web APIs are asynchronous
fetch('/api/data')        // Non-blocking
  .then(response => response.json())
  .then(data => console.log(data));

setTimeout(() => {        // Non-blocking
  console.log('Timer done');
}, 1000);`,
    explanation: "Asynchronous programming prevents UI freezing and allows handling multiple operations concurrently without blocking the main thread."
  },
  {
    id: 36,
    question: "What is debouncing and throttling? Real examples.",
    answer: "Debouncing delays execution until after calls stop. Throttling limits execution frequency.",
    example: `// Debouncing - Search input
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

const searchInput = document.getElementById('search');
const debouncedSearch = debounce((query) => {
  console.log('Searching for:', query);
  // API call here
}, 300);

searchInput.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});

// Throttling - Scroll events
function throttle(func, delay) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func.apply(this, args);
    }
  };
}

const throttledScroll = throttle(() => {
  console.log('Scroll event handled');
}, 100);

window.addEventListener('scroll', throttledScroll);

// Advanced debounce with immediate execution
function advancedDebounce(func, delay, immediate = false) {
  let timeoutId;
  return function(...args) {
    const callNow = immediate && !timeoutId;
    
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      timeoutId = null;
      if (!immediate) func.apply(this, args);
    }, delay);
    
    if (callNow) func.apply(this, args);
  };
}

// Real-world: API rate limiting
const apiCall = throttle(async (endpoint) => {
  const response = await fetch(endpoint);
  return response.json();
}, 1000); // Max 1 call per second`,
    explanation: "Debouncing: search suggestions, form validation. Throttling: scroll events, resize events, API rate limiting."
  }
];