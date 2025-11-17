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
  },
  {
    id: 37,
    question: "What is the job queue vs callback queue?",
    answer: "Job queue (microtask queue) handles Promises. Callback queue (macrotask queue) handles setTimeout, events. Job queue has higher priority.",
    example: `console.log('1');

setTimeout(() => console.log('2'), 0); // Callback queue

Promise.resolve().then(() => console.log('3')); // Job queue

console.log('4');

// Output: 1, 4, 3, 2
// Job queue (Promise) runs before callback queue (setTimeout)

// Multiple jobs and callbacks
setTimeout(() => console.log('timeout1'), 0);
setTimeout(() => console.log('timeout2'), 0);

Promise.resolve().then(() => console.log('promise1'));
Promise.resolve().then(() => console.log('promise2'));

// Output: promise1, promise2, timeout1, timeout2`,
    explanation: "Job queue processes all microtasks before any macrotask runs. This ensures Promise callbacks execute before timer callbacks."
  },
  {
    id: 38,
    question: "How does the browser Web APIs work?",
    answer: "Web APIs (setTimeout, fetch, DOM events) run outside JavaScript engine. They use callback queues to communicate back to JS.",
    example: `// Web API flow
console.log('Start');

// 1. setTimeout goes to Web API
setTimeout(() => {
  console.log('Timer done'); // 4. Callback added to queue
}, 1000);

// 2. fetch goes to Web API  
fetch('/api/data')
  .then(data => console.log('Fetch done')); // 3. Promise added to job queue

console.log('End'); // Runs immediately

// Event listener example
button.addEventListener('click', () => {
  console.log('Button clicked'); // Added to callback queue when clicked
});

// Web APIs don't block JavaScript
for (let i = 0; i < 1000000; i++) {
  // This loop runs while Web APIs work in background
}

// Multiple Web APIs
setTimeout(() => console.log('Timer 1'), 100);
setTimeout(() => console.log('Timer 2'), 50);
setInterval(() => console.log('Interval'), 200);

// Output order depends on Web API completion time`,
    explanation: "Web APIs handle async operations outside JS engine, preventing blocking. They queue callbacks when operations complete."
  },
  {
    id: 39,
    question: "What is the difference between setTimeout(0) and process.nextTick (Node)?",
    answer: "process.nextTick has highest priority, runs before any other async operation. setTimeout(0) goes to macrotask queue.",
    example: `// Node.js execution order
console.log('1');

setTimeout(() => console.log('2'), 0); // Macrotask

process.nextTick(() => console.log('3')); // Highest priority

Promise.resolve().then(() => console.log('4')); // Microtask

setImmediate(() => console.log('5')); // Macrotask (after setTimeout)

console.log('6');

// Output: 1, 6, 3, 4, 2, 5
// Order: Sync -> nextTick -> Microtasks -> Macrotasks

// Multiple nextTicks
process.nextTick(() => {
  console.log('nextTick 1');
  process.nextTick(() => console.log('nested nextTick'));
});

process.nextTick(() => console.log('nextTick 2'));

Promise.resolve().then(() => console.log('Promise'));

// Output: nextTick 1, nextTick 2, nested nextTick, Promise`,
    explanation: "process.nextTick runs before microtasks and macrotasks. Use sparingly as it can starve the event loop."
  },
  {
    id: 40,
    question: "Why is async/await just syntax over promises?",
    answer: "async/await is syntactic sugar that makes Promise code look synchronous. It compiles to Promise chains internally.",
    example: `// async/await version
async function fetchUser() {
  try {
    const response = await fetch('/api/user');
    const user = await response.json();
    return user;
  } catch (error) {
    console.error(error);
  }
}

// Equivalent Promise version
function fetchUserPromise() {
  return fetch('/api/user')
    .then(response => response.json())
    .catch(error => {
      console.error(error);
    });
}

// async function always returns Promise
async function getValue() {
  return 42;
}

getValue().then(value => console.log(value)); // 42

// await can only be used in async functions
function regularFunction() {
  // await fetch('/api'); // SyntaxError
}

// Top-level await (modern environments)
// const data = await fetch('/api'); // Works in modules

// Error handling comparison
async function asyncError() {
  throw new Error('Async error');
}

asyncError().catch(err => console.log(err.message)); // 'Async error'`,
    explanation: "async/await makes asynchronous code easier to read and write, but it's still Promises underneath."
  },
  {
    id: 41,
    question: "How do you cancel a promise? Is it possible?",
    answer: "Promises can't be cancelled directly. Use AbortController, race with rejection, or ignore results with flags.",
    example: `// Method 1: AbortController (modern approach)
function fetchWithCancel(url) {
  const controller = new AbortController();
  
  const promise = fetch(url, { 
    signal: controller.signal 
  }).catch(err => {
    if (err.name === 'AbortError') {
      console.log('Request cancelled');
    }
    throw err;
  });
  
  return { promise, cancel: () => controller.abort() };
}

const { promise, cancel } = fetchWithCancel('/api/data');
setTimeout(cancel, 1000); // Cancel after 1 second

// Method 2: Race with timeout
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) => 
    setTimeout(() => reject(new Error('Timeout')), ms)
  );
  
  return Promise.race([promise, timeout]);
}

// Method 3: Cancellation token pattern
function createCancellablePromise(executor) {
  let cancelled = false;
  
  const promise = new Promise((resolve, reject) => {
    executor(
      value => !cancelled && resolve(value),
      error => !cancelled && reject(error)
    );
  });
  
  return {
    promise,
    cancel: () => { cancelled = true; }
  };
}

const { promise: myPromise, cancel: cancelPromise } = createCancellablePromise(
  (resolve) => setTimeout(() => resolve('Done'), 2000)
);

setTimeout(cancelPromise, 1000); // Cancel before completion`,
    explanation: "Use AbortController for fetch requests, timeout patterns for time limits, or cancellation tokens for custom promises."
  },
  {
    id: 42,
    question: "What is an AbortController and how is it used?",
    answer: "AbortController provides a way to cancel async operations like fetch requests. It uses AbortSignal to communicate cancellation.",
    example: `// Basic AbortController usage
const controller = new AbortController();
const signal = controller.signal;

fetch('/api/data', { signal })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => {
    if (err.name === 'AbortError') {
      console.log('Request was cancelled');
    }
  });

// Cancel the request
controller.abort();

// Timeout with AbortController
function fetchWithTimeout(url, timeout) {
  const controller = new AbortController();
  
  setTimeout(() => controller.abort(), timeout);
  
  return fetch(url, { signal: controller.signal });
}

fetchWithTimeout('/api/slow', 5000) // 5 second timeout
  .catch(err => console.log('Request timed out'));

// Multiple operations with same controller
const batchController = new AbortController();

Promise.all([
  fetch('/api/users', { signal: batchController.signal }),
  fetch('/api/posts', { signal: batchController.signal }),
  fetch('/api/comments', { signal: batchController.signal })
]).catch(err => {
  if (err.name === 'AbortError') {
    console.log('All requests cancelled');
  }
});

// Cancel all requests at once
batchController.abort();

// Custom abortable operations
function delay(ms, signal) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(resolve, ms);
    
    signal?.addEventListener('abort', () => {
      clearTimeout(timeout);
      reject(new Error('Aborted'));
    });
  });
}`,
    explanation: "AbortController is the standard way to cancel fetch requests and other async operations. Essential for preventing memory leaks."
  },
  {
    id: 43,
    question: "What is a promise chain? Example?",
    answer: "Promise chain is a sequence of .then() calls where each returns a value or promise for the next .then() to handle.",
    example: `// Basic promise chain
fetch('/api/user/1')
  .then(response => response.json()) // Returns promise
  .then(user => {
    console.log('User:', user.name);
    return fetch(\`/api/posts/\${user.id}\`); // Return another promise
  })
  .then(response => response.json())
  .then(posts => {
    console.log('Posts:', posts.length);
    return posts.filter(post => post.published); // Return value
  })
  .then(publishedPosts => {
    console.log('Published:', publishedPosts.length);
  })
  .catch(error => {
    console.error('Chain failed:', error);
  });

// Chain with transformations
Promise.resolve(5)
  .then(x => x * 2)     // 10
  .then(x => x + 3)     // 13
  .then(x => x.toString()) // "13"
  .then(str => str.split('')) // ["1", "3"]
  .then(arr => console.log(arr));

// Error handling in chains
Promise.resolve('start')
  .then(value => {
    if (value === 'start') {
      throw new Error('Something went wrong');
    }
    return value;
  })
  .then(value => {
    console.log('This won\'t run');
  })
  .catch(error => {
    console.log('Caught:', error.message);
    return 'recovered'; // Continue chain
  })
  .then(value => {
    console.log('Recovered with:', value);
  });

// Conditional chaining
fetch('/api/user')
  .then(response => response.json())
  .then(user => {
    if (user.isAdmin) {
      return fetch('/api/admin-data').then(r => r.json());
    }
    return { message: 'Regular user' };
  })
  .then(data => console.log(data));`,
    explanation: "Promise chains allow sequential async operations. Each .then() receives the previous result and can return values or new promises."
  },
  {
    id: 44,
    question: "How do you create a custom promise?",
    answer: "Use Promise constructor with executor function that receives resolve and reject callbacks.",
    example: `// Basic custom promise
const myPromise = new Promise((resolve, reject) => {
  const success = Math.random() > 0.5;
  
  setTimeout(() => {
    if (success) {
      resolve('Operation successful!');
    } else {
      reject(new Error('Operation failed!'));
    }
  }, 1000);
});

myPromise
  .then(result => console.log(result))
  .catch(error => console.error(error));

// Promisify callback-based function
function readFileCallback(filename, callback) {
  setTimeout(() => {
    if (filename.endsWith('.txt')) {
      callback(null, 'File content');
    } else {
      callback(new Error('Invalid file type'));
    }
  }, 500);
}

function readFilePromise(filename) {
  return new Promise((resolve, reject) => {
    readFileCallback(filename, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

// Usage
readFilePromise('data.txt')
  .then(content => console.log(content))
  .catch(error => console.error(error));

// Promise with progress tracking
function downloadFile(url) {
  return new Promise((resolve, reject) => {
    let progress = 0;
    
    const interval = setInterval(() => {
      progress += 10;
      console.log(\`Download progress: \${progress}%\`);
      
      if (progress >= 100) {
        clearInterval(interval);
        resolve('Download complete');
      }
    }, 100);
  });
}

// Immediately resolved/rejected promises
const resolvedPromise = Promise.resolve('Already done');
const rejectedPromise = Promise.reject(new Error('Already failed'));`,
    explanation: "Custom promises wrap async operations. Always call resolve() for success or reject() for failure inside the executor."
  },
  {
    id: 45,
    question: "What is an unhandled promise rejection?",
    answer: "Unhandled promise rejection occurs when a promise is rejected but no .catch() or try/catch handles the error.",
    example: `// Unhandled rejection - BAD
Promise.reject(new Error('This will be unhandled'));
// Browser console shows: Uncaught (in promise) Error

// Handled rejection - GOOD
Promise.reject(new Error('This is handled'))
  .catch(error => console.error('Caught:', error.message));

// Async function without try/catch - BAD
async function riskyFunction() {
  throw new Error('Async error');
}

riskyFunction(); // Unhandled promise rejection

// Proper handling - GOOD
async function safeFunction() {
  try {
    await riskyFunction();
  } catch (error) {
    console.error('Handled:', error.message);
  }
}

// Or handle at call site
riskyFunction().catch(error => console.error('Caught:', error));

// Global handlers
window.addEventListener('unhandledrejection', event => {
  console.error('Unhandled promise rejection:', event.reason);
  event.preventDefault(); // Prevent default browser behavior
});

// Node.js global handler
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Common mistake: forgetting to return promise
function fetchData() {
  fetch('/api/data') // Missing return!
    .then(response => response.json())
    .catch(error => console.error(error));
}

// Correct version
function fetchDataCorrect() {
  return fetch('/api/data')
    .then(response => response.json())
    .catch(error => {
      console.error(error);
      throw error; // Re-throw if needed
    });
}`,
    explanation: "Always handle promise rejections with .catch() or try/catch. Unhandled rejections can crash Node.js applications."
  },
  {
    id: 46,
    question: "What is event loop starvation?",
    answer: "Event loop starvation occurs when microtasks keep adding more microtasks, preventing macrotasks from executing.",
    example: `// Event loop starvation example - BAD
function starveEventLoop() {
  Promise.resolve().then(() => {
    console.log('Microtask');
    starveEventLoop(); // Creates infinite microtasks
  });
}

// This will prevent setTimeout from running
setTimeout(() => console.log('This may never run'), 0);
starveEventLoop();

// Better approach - yield control
function yieldingMicrotasks(count = 0) {
  if (count < 1000) {
    Promise.resolve().then(() => {
      console.log('Microtask', count);
      
      // Yield control every 10 microtasks
      if (count % 10 === 0) {
        setTimeout(() => yieldingMicrotasks(count + 1), 0);
      } else {
        yieldingMicrotasks(count + 1);
      }
    });
  }
}

// process.nextTick starvation in Node.js
function nextTickStarvation() {
  process.nextTick(() => {
    console.log('nextTick');
    nextTickStarvation(); // Infinite nextTick calls
  });
}

// This setTimeout will never run
setTimeout(() => console.log('Timer'), 0);
// nextTickStarvation(); // Uncomment to see starvation

// Solution: Limit recursive calls
function limitedRecursion(count = 0) {
  if (count < 100) {
    process.nextTick(() => limitedRecursion(count + 1));
  } else {
    console.log('Done with nextTick calls');
  }
}

// Real-world example: Processing large datasets
function processLargeArray(array, batchSize = 100) {
  return new Promise((resolve) => {
    let index = 0;
    
    function processBatch() {
      const endIndex = Math.min(index + batchSize, array.length);
      
      // Process batch
      for (let i = index; i < endIndex; i++) {
        // Process array[i]
      }
      
      index = endIndex;
      
      if (index < array.length) {
        // Yield control to event loop
        setTimeout(processBatch, 0);
      } else {
        resolve();
      }
    }
    
    processBatch();
  });
}`,
    explanation: "Avoid infinite microtask recursion. Use setTimeout(0) or batch processing to yield control back to the event loop."
  }
];