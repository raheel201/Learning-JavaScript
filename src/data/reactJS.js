export const reactJS = [
  {
    id: 69,
    question: "What are React components? Difference between function & class components?",
    answer: "Components are reusable pieces of UI. Function components use hooks, class components use lifecycle methods and this.state.",
    example: `// Function Component (Modern)
function Welcome({ name }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);
  
  return <h1>Hello, {name}! Count: {count}</h1>;
}

// Class Component (Legacy)
class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  
  componentDidMount() {
    document.title = \`Count: \${this.state.count}\`;
  }
  
  componentDidUpdate() {
    document.title = \`Count: \${this.state.count}\`;
  }
  
  render() {
    return <h1>Hello, {this.props.name}! Count: {this.state.count}</h1>;
  }
}`,
    explanation: "Function components are simpler, use hooks for state/effects. Class components use lifecycle methods and this.state."
  },
  {
    id: 70,
    question: "What is JSX and why do we use it?",
    answer: "JSX is JavaScript XML syntax that allows writing HTML-like code in JavaScript. It's transpiled to React.createElement calls.",
    example: `// JSX
const element = <h1 className="greeting">Hello, world!</h1>;

// Transpiled to:
const element = React.createElement(
  'h1',
  { className: 'greeting' },
  'Hello, world!'
);

// JSX with expressions
const name = 'John';
const element2 = <h1>Hello, {name}!</h1>;

// JSX with components
const App = () => (
  <div>
    <Header title="My App" />
    <Main content="Welcome!" />
  </div>
);`,
    explanation: "JSX makes React code more readable and allows using JavaScript expressions within HTML-like syntax."
  },
  {
    id: 71,
    question: "What is virtual DOM? How does it improve performance?",
    answer: "Virtual DOM is a JavaScript representation of the real DOM. React compares virtual DOM trees and updates only changed elements.",
    example: `// Virtual DOM concept
const virtualDOM = {
  type: 'div',
  props: {
    className: 'container',
    children: [
      {
        type: 'h1',
        props: { children: 'Hello World' }
      },
      {
        type: 'p',
        props: { children: 'This is a paragraph' }
      }
    ]
  }
};

// React's diffing process:
// 1. State changes trigger re-render
// 2. New virtual DOM tree is created
// 3. React compares (diffs) old vs new virtual DOM
// 4. Only changed elements are updated in real DOM

// Example of efficient update
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h1>Counter App</h1>
      <p>Count: {count}</p> {/* Only this updates */}
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}`,
    explanation: "Virtual DOM enables batching updates and minimizes expensive DOM manipulations by updating only what changed."
  },
  {
    id: 72,
    question: "What are props vs state?",
    answer: "Props are read-only data passed from parent to child. State is mutable data managed within a component.",
    example: `// Props - passed from parent
function Child({ name, age, onUpdate }) {
  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <button onClick={onUpdate}>Update</button>
    </div>
  );
}

// State - managed within component
function Parent() {
  const [user, setUser] = useState({ name: 'John', age: 25 });
  
  const handleUpdate = () => {
    setUser(prev => ({ ...prev, age: prev.age + 1 }));
  };
  
  return (
    <Child 
      name={user.name}
      age={user.age}
      onUpdate={handleUpdate}
    />
  );
}

// Props are immutable in child
function Child({ count }) {
  // count = 10; // Error! Props are read-only
  return <p>Count: {count}</p>;
}`,
    explanation: "Props flow down from parent to child (unidirectional). State is local to component and can be updated."
  },
  {
    id: 73,
    question: "Why is state immutable in React?",
    answer: "Immutable state helps React detect changes efficiently and prevents bugs from direct mutations.",
    example: `// Wrong - Direct mutation
function TodoList() {
  const [todos, setTodos] = useState([]);
  
  const addTodo = (text) => {
    todos.push({ id: Date.now(), text }); // Wrong!
    setTodos(todos); // React won't re-render
  };
  
  // Wrong - Mutating nested object
  const toggleTodo = (id) => {
    const todo = todos.find(t => t.id === id);
    todo.completed = !todo.completed; // Wrong!
    setTodos(todos); // React won't detect change
  };
}

// Correct - Immutable updates
function TodoList() {
  const [todos, setTodos] = useState([]);
  
  const addTodo = (text) => {
    setTodos(prev => [...prev, { id: Date.now(), text }]);
  };
  
  const toggleTodo = (id) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id 
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };
}`,
    explanation: "React uses Object.is() to compare state. Mutations don't create new references, so React won't re-render."
  },
  {
    id: 74,
    question: "What is lifting state up?",
    answer: "Moving state to the closest common ancestor when multiple components need to share the same state.",
    example: `// Before - State in individual components
function TemperatureInput({ scale }) {
  const [temperature, setTemperature] = useState('');
  
  return (
    <input 
      value={temperature}
      onChange={e => setTemperature(e.target.value)}
      placeholder={\`Temperature in \${scale}\`}
    />
  );
}

// After - Lifted state up
function Calculator() {
  const [temperature, setTemperature] = useState('');
  const [scale, setScale] = useState('c');
  
  return (
    <div>
      <TemperatureInput
        scale="c"
        temperature={scale === 'c' ? temperature : convert(temperature, 'c')}
        onTemperatureChange={temp => {
          setTemperature(temp);
          setScale('c');
        }}
      />
      <TemperatureInput
        scale="f"
        temperature={scale === 'f' ? temperature : convert(temperature, 'f')}
        onTemperatureChange={temp => {
          setTemperature(temp);
          setScale('f');
        }}
      />
      <BoilingVerdict celsius={parseFloat(temperature)} />
    </div>
  );
}`,
    explanation: "Lifting state up enables data sharing between sibling components through their common parent."
  },
  {
    id: 75,
    question: "What is useCallback? When to use it?",
    answer: "useCallback memoizes functions to prevent unnecessary re-renders when passing callbacks to child components.",
    example: `// Without useCallback - new function on every render
function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  
  // New function created on every render
  const handleClick = () => {
    console.log('Button clicked');
  };
  
  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      <ExpensiveChild onClick={handleClick} />
      <p>Count: {count}</p>
    </div>
  );
}

// With useCallback - function memoized
function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  
  // Function only recreated when dependencies change
  const handleClick = useCallback(() => {
    console.log('Button clicked');
  }, []); // Empty deps - never recreated
  
  const handleIncrement = useCallback(() => {
    setCount(prev => prev + 1);
  }, []); // No external dependencies
  
  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      <ExpensiveChild onClick={handleClick} />
      <button onClick={handleIncrement}>Count: {count}</button>
    </div>
  );
}

const ExpensiveChild = React.memo(({ onClick }) => {
  console.log('ExpensiveChild rendered');
  return <button onClick={onClick}>Click me</button>;
});`,
    explanation: "Use useCallback when passing callbacks to memoized child components to prevent unnecessary re-renders."
  },
  {
    id: 76,
    question: "What is useMemo? When to use it?",
    answer: "useMemo memoizes expensive calculations to avoid recalculating on every render.",
    example: `// Without useMemo - expensive calculation on every render
function ExpensiveComponent({ items, filter }) {
  const [count, setCount] = useState(0);
  
  // Expensive calculation runs on every render
  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(filter.toLowerCase())
  ).sort((a, b) => a.name.localeCompare(b.name));
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <ul>
        {filteredItems.map(item => <li key={item.id}>{item.name}</li>)}
      </ul>
    </div>
  );
}

// With useMemo - calculation only when dependencies change
function ExpensiveComponent({ items, filter }) {
  const [count, setCount] = useState(0);
  
  // Only recalculates when items or filter changes
  const filteredItems = useMemo(() => {
    console.log('Filtering items...');
    return items
      .filter(item => 
        item.name.toLowerCase().includes(filter.toLowerCase())
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [items, filter]);
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <ul>
        {filteredItems.map(item => <li key={item.id}>{item.name}</li>)}
      </ul>
    </div>
  );
}`,
    explanation: "Use useMemo for expensive calculations that depend on specific values to avoid unnecessary recalculations."
  },
  {
    id: 77,
    question: "What is useRef? What are its use cases?",
    answer: "useRef creates a mutable reference that persists across renders. Used for DOM access and storing mutable values.",
    example: `// Use case 1: DOM access
function FocusInput() {
  const inputRef = useRef(null);
  
  const focusInput = () => {
    inputRef.current.focus();
  };
  
  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}

// Use case 2: Storing mutable values
function Timer() {
  const [count, setCount] = useState(0);
  const intervalRef = useRef(null);
  
  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);
  };
  
  const stopTimer = () => {
    clearInterval(intervalRef.current);
  };
  
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
}

// Use case 3: Previous value
function usePrevious(value) {
  const ref = useRef();
  
  useEffect(() => {
    ref.current = value;
  });
  
  return ref.current;
}`,
    explanation: "useRef doesn't trigger re-renders when changed. Perfect for DOM manipulation and storing mutable values."
  },
  {
    id: 78,
    question: "What is the difference between useEffect vs useLayoutEffect?",
    answer: "useEffect runs after DOM updates (asynchronous). useLayoutEffect runs before browser paint (synchronous).",
    example: `// useEffect - runs after paint
function AsyncEffect() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    // Runs after DOM is painted
    console.log('useEffect runs after paint');
    document.title = \`Count: \${count}\`;
  }, [count]);
  
  return <div>Count: {count}</div>;
}

// useLayoutEffect - runs before paint
function SyncEffect() {
  const [width, setWidth] = useState(0);
  const divRef = useRef();
  
  useLayoutEffect(() => {
    // Runs before browser paint - prevents flicker
    const rect = divRef.current.getBoundingClientRect();
    setWidth(rect.width);
  }, []);
  
  return (
    <div>
      <div ref={divRef}>Measure me</div>
      <p>Width: {width}px</p>
    </div>
  );
}

// When to use useLayoutEffect:
function FlickerFix() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const elementRef = useRef();
  
  useLayoutEffect(() => {
    // Prevent visual flicker by updating before paint
    const element = elementRef.current;
    const rect = element.getBoundingClientRect();
    
    if (rect.x < 0) {
      setPosition({ x: 0, y: position.y });
    }
  });
  
  return (
    <div 
      ref={elementRef}
      style={{ transform: \`translate(\${position.x}px, \${position.y}px)\` }}
    >
      Positioned element
    </div>
  );
}`,
    explanation: "Use useLayoutEffect when you need to read/write DOM synchronously to prevent visual flicker."
  },
  {
    id: 79,
    question: "Explain reconciliation and diffing algorithm.",
    answer: "Reconciliation is React's process of updating the DOM efficiently by comparing virtual DOM trees and applying minimal changes.",
    example: `// React's diffing algorithm optimizations:

// 1. Different element types - replace entire subtree
// Before: <div><span>Hello</span></div>
// After:  <p><span>Hello</span></p>
// Result: Entire subtree replaced

// 2. Same element type - update props
// Before: <div className="old">Hello</div>
// After:  <div className="new">Hello</div>
// Result: Only className updated

// 3. Keys help identify moved elements
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}> {/* Key helps React track items */}
          {todo.text}
        </li>
      ))}
    </ul>
  );
}

// Without keys - inefficient
// [A, B, C] -> [A, X, B, C]
// React thinks: B changed to X, C changed to B, add C

// With keys - efficient
// React knows: X is new, B and C just moved`,
    explanation: "Reconciliation uses heuristics: different types replace subtree, same types update props, keys identify moved elements."
  },
  {
    id: 80,
    question: "Why should keys be unique in a list?",
    answer: "Unique keys help React identify which items changed, moved, or were added/removed, enabling efficient updates.",
    example: `// Bad - using index as key
function BadList({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}> {/* Don't use index! */}
          <input type="text" defaultValue={item.name} />
          {item.name}
        </li>
      ))}
    </ul>
  );
}

// Problem: When items reorder, input values stay with wrong items

// Good - using unique ID as key
function GoodList({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}> {/* Use unique ID */}
          <input type="text" defaultValue={item.name} />
          {item.name}
        </li>
      ))}
    </ul>
  );
}

// Keys should be:
// ✅ Unique among siblings
// ✅ Stable (don't change between renders)
// ✅ Predictable (same item = same key)
// ❌ Don't use Math.random() or index`,
    explanation: "Unique keys preserve component state and improve performance by helping React track list changes accurately."
  },
  {
    id: 81,
    question: "What happens if we use index as key?",
    answer: "Using index as key can cause bugs with component state, form inputs, and performance issues when list order changes.",
    example: `// Problem demonstration
function TodoList({ todos }) {
  return (
    <div>
      {todos.map((todo, index) => (
        <TodoItem key={index} todo={todo} /> // Using index as key
      ))}
    </div>
  );
}

function TodoItem({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text);
  
  return (
    <div>
      {isEditing ? (
        <input value={text} onChange={e => setText(e.target.value)} />
      ) : (
        <span onClick={() => setIsEditing(true)}>{todo.text}</span>
      )}
    </div>
  );
}

// Scenario:
// 1. User clicks on second item to edit
// 2. First item gets deleted
// 3. Second item moves to index 0
// 4. But React thinks index 0 is still the first item
// 5. Editing state stays with wrong item!

// Solution - use stable unique keys
function TodoList({ todos }) {
  return (
    <div>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} /> // Use unique ID
      ))}
    </div>
  );
}`,
    explanation: "Index keys break when list order changes, causing state to stick to wrong items and performance issues."
  },
  {
    id: 82,
    question: "What are controlled vs uncontrolled components?",
    answer: "Controlled components have form data handled by React state. Uncontrolled components store data in DOM and use refs.",
    example: `// Controlled Component - React controls the value
function ControlledInput() {
  const [value, setValue] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', value); // Value from React state
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        value={value}           // React controls value
        onChange={e => setValue(e.target.value)} // Update state
      />
      <button type="submit">Submit</button>
    </form>
  );
}

// Uncontrolled Component - DOM controls the value
function UncontrolledInput() {
  const inputRef = useRef();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', inputRef.current.value); // Value from DOM
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        ref={inputRef}          // Access via ref
        defaultValue=""         // Initial value only
      />
      <button type="submit">Submit</button>
    </form>
  );
}

// When to use:
// Controlled: Form validation, dynamic behavior, multiple inputs
// Uncontrolled: Simple forms, file inputs, integrating with non-React code`,
    explanation: "Controlled components give React full control over form data. Uncontrolled components let DOM manage data with ref access."
  },
  {
    id: 83,
    question: "What is prop drilling? How to avoid it?",
    answer: "Prop drilling is passing props through multiple component levels. Avoid with Context API, state management, or component composition.",
    example: `// Prop Drilling Problem
function App() {
  const [user, setUser] = useState({ name: 'John', theme: 'dark' });
  
  return <Layout user={user} setUser={setUser} />;
}

function Layout({ user, setUser }) {
  return (
    <div>
      <Header user={user} setUser={setUser} /> {/* Passing through */}
      <Main user={user} />
    </div>
  );
}

function Header({ user, setUser }) {
  return <UserProfile user={user} setUser={setUser} />; {/* Still passing */}
}

function UserProfile({ user, setUser }) {
  return <button onClick={() => setUser({...user, theme: 'light'})}>
    {user.name} - {user.theme}
  </button>;
}

// Solution 1: Context API
const UserContext = createContext();

function App() {
  const [user, setUser] = useState({ name: 'John', theme: 'dark' });
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Layout />
    </UserContext.Provider>
  );
}

function UserProfile() {
  const { user, setUser } = useContext(UserContext); // Direct access
  
  return <button onClick={() => setUser({...user, theme: 'light'})}>
    {user.name} - {user.theme}
  </button>;
}

// Solution 2: Component Composition
function App() {
  const [user, setUser] = useState({ name: 'John', theme: 'dark' });
  
  return (
    <Layout>
      <Header>
        <UserProfile user={user} setUser={setUser} />
      </Header>
    </Layout>
  );
}`,
    explanation: "Prop drilling makes components tightly coupled. Use Context for global state, composition for component structure."
  },
  {
    id: 84,
    question: "What are fragments?",
    answer: "Fragments let you group multiple elements without adding extra DOM nodes. Use <React.Fragment> or <> shorthand.",
    example: `// Without Fragment - adds unnecessary div
function BadComponent() {
  return (
    <div> {/* Extra wrapper div */}
      <h1>Title</h1>
      <p>Description</p>
    </div>
  );
}

// With Fragment - no extra DOM node
function GoodComponent() {
  return (
    <React.Fragment>
      <h1>Title</h1>
      <p>Description</p>
    </React.Fragment>
  );
}

// Short syntax
function ShortFragment() {
  return (
    <>
      <h1>Title</h1>
      <p>Description</p>
    </>
  );
}

// Fragment with key (for lists)
function ItemList({ items }) {
  return (
    <dl>
      {items.map(item => (
        <React.Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}

// When to use Fragments:
// ✅ Avoid wrapper divs
// ✅ Table rows/cells
// ✅ List items
// ✅ Conditional rendering`,
    explanation: "Fragments solve the single parent requirement without polluting DOM with unnecessary wrapper elements."
  },
  {
    id: 85,
    question: "What are cleanup functions in useEffect?",
    answer: "Cleanup functions prevent memory leaks by cleaning up subscriptions, timers, and event listeners when component unmounts or dependencies change.",
    example: `// Cleanup for event listeners
function WindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    function updateSize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }
    
    window.addEventListener('resize', updateSize);
    updateSize(); // Set initial size
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []); // Empty deps - runs once
  
  return <div>{size.width} x {size.height}</div>;
}

// Cleanup for timers
function Timer() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);
    
    // Cleanup function
    return () => {
      clearInterval(interval);
    };
  }, []);
  
  return <div>Count: {count}</div>;
}

// Cleanup for subscriptions
function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    const subscription = chatAPI.subscribe(roomId, (message) => {
      setMessages(prev => [...prev, message]);
    });
    
    // Cleanup function
    return () => {
      subscription.unsubscribe();
    };
  }, [roomId]); // Runs when roomId changes
  
  return <div>{/* render messages */}</div>;
}

// Cleanup runs:
// 1. Before component unmounts
// 2. Before effect runs again (when dependencies change)`,
    explanation: "Cleanup functions prevent memory leaks and ensure proper resource management in React components."
  },
  {
    id: 86,
    question: "Why does React run useEffect twice in strict mode?",
    answer: "React runs effects twice in development strict mode to help detect side effects and ensure cleanup functions work properly.",
    example: `// This effect will run twice in strict mode
function Component() {
  useEffect(() => {
    console.log('Effect ran'); // Logs twice in development
    
    return () => {
      console.log('Cleanup ran'); // Also runs twice
    };
  }, []);
  
  return <div>Component</div>;
}

// Why React does this:
// 1. Helps catch bugs in cleanup logic
// 2. Simulates component remounting
// 3. Ensures effects are idempotent

// Bad effect - not idempotent
function BadComponent() {
  useEffect(() => {
    // This creates multiple listeners!
    document.addEventListener('click', handleClick);
    // Missing cleanup
  }, []);
}

// Good effect - idempotent with cleanup
function GoodComponent() {
  useEffect(() => {
    document.addEventListener('click', handleClick);
    
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
}

// How to handle:
// 1. Always provide cleanup for subscriptions
// 2. Make effects idempotent
// 3. Use refs for values that shouldn't reset
// 4. Remember: only happens in development`,
    explanation: "Double execution in strict mode helps catch bugs and ensures effects work correctly with React's future features."
  },
  {
    id: 87,
    question: "What is React Fiber?",
    answer: "React Fiber is the new reconciliation algorithm that enables incremental rendering, allowing React to pause and resume work.",
    example: `// Before Fiber - blocking rendering
// Large component tree would block main thread
function HeavyComponent() {
  const items = Array.from({ length: 10000 }, (_, i) => i);
  
  return (
    <div>
      {items.map(item => (
        <ExpensiveItem key={item} data={item} />
      ))}
    </div>
  );
}

// With Fiber - interruptible rendering
// React can pause rendering to handle user input

// Fiber enables:
// 1. Time slicing - break work into chunks
// 2. Prioritization - urgent updates first
// 3. Suspense - pause for async data
// 4. Concurrent features

// Priority levels in Fiber:
function App() {
  const [urgent, setUrgent] = useState('');
  const [normal, setNormal] = useState('');
  
  return (
    <div>
      {/* High priority - user input */}
      <input 
        value={urgent}
        onChange={e => setUrgent(e.target.value)}
      />
      
      {/* Lower priority - can be interrupted */}
      <HeavyList data={normal} />
      
      <button onClick={() => setNormal('new data')}>
        Update List
      </button>
    </div>
  );
}

// Fiber phases:
// 1. Render phase - can be paused/resumed
// 2. Commit phase - synchronous, cannot be interrupted`,
    explanation: "Fiber enables React to prioritize updates, pause work for urgent tasks, and provide better user experience."
  },
  {
    id: 88,
    question: "How does React batching work?",
    answer: "React batches multiple state updates into a single re-render for performance. Automatic batching works in React 18+.",
    example: `// React 17 and earlier - only batches in event handlers
function Component() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);
  
  function handleClick() {
    setCount(c => c + 1); // Batched
    setFlag(f => !f);     // Batched
    // Only one re-render
  }
  
  function handleAsync() {
    setTimeout(() => {
      setCount(c => c + 1); // Not batched in React 17
      setFlag(f => !f);     // Not batched in React 17
      // Two re-renders in React 17
    }, 1000);
  }
  
  return (
    <div>
      <p>Count: {count}, Flag: {flag.toString()}</p>
      <button onClick={handleClick}>Sync Update</button>
      <button onClick={handleAsync}>Async Update</button>
    </div>
  );
}

// React 18 - automatic batching everywhere
function React18Component() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);
  
  function handleAsync() {
    setTimeout(() => {
      setCount(c => c + 1); // Batched in React 18
      setFlag(f => !f);     // Batched in React 18
      // Only one re-render
    }, 1000);
  }
  
  function handlePromise() {
    fetch('/api/data').then(() => {
      setCount(c => c + 1); // Batched
      setFlag(f => !f);     // Batched
    });
  }
}

// Opt out of batching (rare)
import { flushSync } from 'react-dom';

function handleClick() {
  flushSync(() => {
    setCount(c => c + 1); // Immediate re-render
  });
  setFlag(f => !f); // Separate re-render
}`,
    explanation: "Batching improves performance by reducing re-renders. React 18 extends batching to all updates, not just event handlers."
  },
  {
    id: 89,
    question: "What is Suspense? What problems does it solve?",
    answer: "Suspense lets components wait for async operations and show fallback UI while loading. Solves loading states and code splitting.",
    example: `// Code Splitting with Suspense
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading component...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}

// Data Fetching with Suspense (React 18+)
function UserProfile({ userId }) {
  const user = useSuspenseQuery(['user', userId], () => 
    fetchUser(userId)
  );
  
  return <div>{user.name}</div>; // No loading state needed
}

function App() {
  return (
    <Suspense fallback={<UserSkeleton />}>
      <UserProfile userId={1} />
    </Suspense>
  );
}

// Multiple Suspense boundaries
function App() {
  return (
    <div>
      <Suspense fallback={<HeaderSkeleton />}>
        <Header />
      </Suspense>
      
      <Suspense fallback={<ContentSkeleton />}>
        <MainContent />
        <Sidebar />
      </Suspense>
    </div>
  );
}

// Error boundaries with Suspense
function App() {
  return (
    <ErrorBoundary fallback={<ErrorMessage />}>
      <Suspense fallback={<Loading />}>
        <AsyncComponent />
      </Suspense>
    </ErrorBoundary>
  );
}

// Problems Suspense solves:
// ✅ Eliminates loading state boilerplate
// ✅ Coordinates multiple async operations
// ✅ Enables code splitting
// ✅ Better user experience with fallbacks`,
    explanation: "Suspense simplifies async operations by handling loading states declaratively and enabling better code organization."
  },
  {
    id: 90,
    question: "What is Error Boundary? Example use case?",
    answer: "Error Boundaries catch JavaScript errors in component tree and display fallback UI instead of crashing the app.",
    example: `// Error Boundary Class Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
    // Log to error reporting service
    logErrorToService(error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Something went wrong</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

// Usage
function App() {
  return (
    <ErrorBoundary>
      <Header />
      <ErrorBoundary> {/* Nested boundaries */}
        <MainContent />
      </ErrorBoundary>
      <Footer />
    </ErrorBoundary>
  );
}

// Component that might throw
function BuggyComponent({ user }) {
  if (!user) {
    throw new Error('User is required'); // Caught by Error Boundary
  }
  
  return <div>{user.name}</div>;
}

// Hook-based Error Boundary (using library)
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => logError(error, errorInfo)}
    >
      <MyApp />
    </ErrorBoundary>
  );
}

// Error Boundaries catch:
// ✅ Errors in render methods
// ✅ Errors in lifecycle methods
// ✅ Errors in constructor
// ❌ Event handlers (use try/catch)
// ❌ Async code (use try/catch)
// ❌ Errors in Error Boundary itself`,
    explanation: "Error Boundaries prevent entire app crashes by catching errors and showing fallback UI, improving user experience."
  },
  {
    id: 91,
    question: "How do you handle API calls in React?",
    answer: "Handle API calls with useEffect for component lifecycle, custom hooks for reusability, and proper error/loading states.",
    example: `// Basic API call with useEffect
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const response = await fetch(\`/api/users/\${userId}\`);
        if (!response.ok) throw new Error('Failed to fetch');
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUser();
  }, [userId]);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user found</div>;
  
  return <div>{user.name}</div>;
}

// Custom hook for API calls
function useApi(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    let cancelled = false;
    
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(url);
        if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
        const result = await response.json();
        
        if (!cancelled) {
          setData(result);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }
    
    fetchData();
    
    return () => {
      cancelled = true; // Prevent state update if component unmounts
    };
  }, [url]);
  
  return { data, loading, error };
}

// Usage of custom hook
function UserList() {
  const { data: users, loading, error } = useApi('/api/users');
  
  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <ul>
      {users?.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}`,
    explanation: "Handle API calls with proper loading/error states, cleanup for cancelled requests, and custom hooks for reusability."
  },
  {
    id: 92,
    question: "How to cancel an API request?",
    answer: "Cancel API requests using AbortController to prevent memory leaks and race conditions when components unmount or dependencies change.",
    example: `// Using AbortController
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const abortController = new AbortController();
    
    async function fetchUser() {
      try {
        setLoading(true);
        const response = await fetch(\`/api/users/\${userId}\`, {
          signal: abortController.signal // Pass abort signal
        });
        
        if (!response.ok) throw new Error('Failed to fetch');
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Fetch error:', error);
        }
      } finally {
        setLoading(false);
      }
    }
    
    fetchUser();
    
    // Cleanup: abort request if component unmounts or userId changes
    return () => {
      abortController.abort();
    };
  }, [userId]);
  
  return loading ? <div>Loading...</div> : <div>{user?.name}</div>;
}

// Custom hook with cancellation
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const abortController = new AbortController();
    
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(url, {
          signal: abortController.signal
        });
        
        if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
    
    return () => abortController.abort();
  }, [url]);
  
  return { data, loading, error };
}

// Manual cancellation
function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const abortControllerRef = useRef();
  
  const search = async (searchQuery) => {
    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Create new controller
    abortControllerRef.current = new AbortController();
    
    try {
      const response = await fetch(\`/api/search?q=\${searchQuery}\`, {
        signal: abortControllerRef.current.signal
      });
      const data = await response.json();
      setResults(data);
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Search error:', error);
      }
    }
  };
  
  return (
    <div>
      <input 
        value={query}
        onChange={e => {
          setQuery(e.target.value);
          search(e.target.value);
        }}
      />
      {/* render results */}
    </div>
  );
}`,
    explanation: "AbortController prevents memory leaks and race conditions by cancelling outdated requests when components unmount or dependencies change."
  }
];