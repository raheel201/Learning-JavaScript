export const htmlCSS = [
  {
    id: 95,
    question: "What is semantic HTML? Why is it important?",
    answer: "Semantic HTML uses meaningful tags that describe content structure and purpose, improving accessibility and SEO.",
    example: `<!-- Non-semantic HTML -->
<div class="header">
  <div class="nav">
    <div class="nav-item">Home</div>
    <div class="nav-item">About</div>
  </div>
</div>
<div class="main">
  <div class="article">
    <div class="title">Article Title</div>
    <div class="content">Article content...</div>
  </div>
</div>
<div class="footer">
  <div>Copyright 2024</div>
</div>

<!-- Semantic HTML -->
<header>
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
  </nav>
</header>
<main>
  <article>
    <h1>Article Title</h1>
    <p>Article content...</p>
  </article>
</main>
<footer>
  <p>Copyright 2024</p>
</footer>

<!-- More semantic elements -->
<section>
  <h2>Products</h2>
  <article>
    <header>
      <h3>Product Name</h3>
      <time datetime="2024-01-15">January 15, 2024</time>
    </header>
    <p>Product description...</p>
    <aside>
      <p>Related products...</p>
    </aside>
  </article>
</section>

<!-- Benefits of semantic HTML: -->
<!-- ✅ Better SEO (search engines understand content) -->
<!-- ✅ Improved accessibility (screen readers) -->
<!-- ✅ Easier maintenance -->
<!-- ✅ Better browser support -->
<!-- ✅ Cleaner, more readable code -->`,
    explanation: "Semantic HTML improves accessibility, SEO, and code maintainability by using elements that convey meaning rather than just presentation."
  },
  {
    id: 96,
    question: "Difference between block, inline, inline-block elements?",
    answer: "Block elements take full width and start new line. Inline elements flow with text. Inline-block combines both behaviors.",
    example: `<!-- Block elements -->
<div>Block element 1</div>
<div>Block element 2</div>
<p>This is a paragraph</p>
<h1>This is a heading</h1>

<!-- Inline elements -->
<span>Inline 1</span>
<span>Inline 2</span>
<a href="#">Link</a>
<strong>Bold text</strong>

<!-- CSS Display Properties -->
.block {
  display: block;
  width: 100%;           /* Takes full width */
  height: 50px;          /* Can set height */
  margin: 10px 0;        /* Vertical margins work */
  padding: 10px;         /* All padding works */
  background: lightblue;
}

.inline {
  display: inline;
  width: 200px;          /* Width ignored */
  height: 50px;          /* Height ignored */
  margin: 10px;          /* Only horizontal margins */
  padding: 10px;         /* Padding works but may overlap */
  background: lightgreen;
}

.inline-block {
  display: inline-block;
  width: 200px;          /* Width respected */
  height: 50px;          /* Height respected */
  margin: 10px;          /* All margins work */
  padding: 10px;         /* All padding works */
  background: lightcoral;
  vertical-align: top;   /* Can align vertically */
}

/* Common block elements: */
/* div, p, h1-h6, section, article, header, footer, nav, main, aside */

/* Common inline elements: */
/* span, a, strong, em, img, input, button, label */

/* Use cases: */
/* Block: Layout containers, paragraphs, headings */
/* Inline: Text formatting, links within text */
/* Inline-block: Navigation items, image galleries, form controls */`,
    explanation: "Understanding display types is crucial for layout control. Block for structure, inline for text flow, inline-block for flexible layouts."
  },
  {
    id: 97,
    question: "What is the box model?",
    answer: "The box model describes how elements are rendered: content, padding, border, and margin from inside out.",
    example: `/* Box Model Components */
.box {
  width: 200px;           /* Content width */
  height: 100px;          /* Content height */
  padding: 20px;          /* Space inside border */
  border: 5px solid blue; /* Border around padding */
  margin: 15px;           /* Space outside border */
}

/* Total element size calculation: */
/* Width = content + padding-left + padding-right + border-left + border-right */
/* Height = content + padding-top + padding-bottom + border-top + border-bottom */
/* Total width = 200 + 20 + 20 + 5 + 5 = 250px */
/* Total height = 100 + 20 + 20 + 5 + 5 = 150px */

/* Box-sizing property */
.content-box {
  box-sizing: content-box; /* Default - width/height = content only */
  width: 200px;
  padding: 20px;
  border: 5px solid red;
  /* Total width = 200 + 40 + 10 = 250px */
}

.border-box {
  box-sizing: border-box; /* width/height includes padding and border */
  width: 200px;
  padding: 20px;
  border: 5px solid green;
  /* Total width = 200px (padding and border included) */
  /* Content width = 200 - 40 - 10 = 150px */
}

/* Global box-sizing reset (recommended) */
*, *::before, *::after {
  box-sizing: border-box;
}

/* Margin collapse */
.margin-example {
  margin-bottom: 20px;
}

.margin-example + .margin-example {
  margin-top: 30px;
  /* Actual margin between elements = 30px (larger margin wins) */
  /* Not 50px (20 + 30) due to margin collapse */
}

/* Debugging box model */
.debug {
  outline: 1px solid red;    /* Doesn't affect layout */
  background: rgba(255, 0, 0, 0.1);
}

/* Modern CSS for debugging */
* {
  outline: 1px solid red;
}`,
    explanation: "Box model understanding is essential for layout control. Use border-box for predictable sizing and understand margin collapse."
  },
  {
    id: 98,
    question: "What is display: flex?",
    answer: "Flexbox is a layout method for arranging items in rows or columns with flexible sizing and alignment options.",
    example: `/* Basic Flexbox */
.flex-container {
  display: flex;
  /* Creates flex formatting context */
}

/* Flex Direction */
.row { flex-direction: row; }        /* Default: left to right */
.row-reverse { flex-direction: row-reverse; } /* Right to left */
.column { flex-direction: column; }   /* Top to bottom */
.column-reverse { flex-direction: column-reverse; } /* Bottom to top */

/* Justify Content (main axis alignment) */
.justify-start { justify-content: flex-start; }   /* Default */
.justify-end { justify-content: flex-end; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.justify-around { justify-content: space-around; }
.justify-evenly { justify-content: space-evenly; }

/* Align Items (cross axis alignment) */
.align-start { align-items: flex-start; }
.align-end { align-items: flex-end; }
.align-center { align-items: center; }    /* Most common */
.align-stretch { align-items: stretch; }   /* Default */
.align-baseline { align-items: baseline; }

/* Flex Items Properties */
.flex-item {
  flex-grow: 1;     /* Grow to fill space */
  flex-shrink: 1;   /* Shrink when needed */
  flex-basis: auto; /* Initial size */
  /* Shorthand: flex: 1 1 auto; */
}

/* Common Flex Patterns */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.card {
  flex: 1 1 300px; /* Grow, shrink, min-width 300px */
}

.center-content {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

/* Flex vs Grid */
/* Use Flex for: */
/* ✅ One-dimensional layouts (row OR column) */
/* ✅ Navigation bars */
/* ✅ Centering content */
/* ✅ Flexible item sizing */

/* Use Grid for: */
/* ✅ Two-dimensional layouts (rows AND columns) */
/* ✅ Complex layouts */
/* ✅ Precise positioning */`,
    explanation: "Flexbox excels at one-dimensional layouts with flexible item sizing and powerful alignment options."
  },
  {
    id: 99,
    question: "Difference between flex vs grid?",
    answer: "Flexbox is for one-dimensional layouts (row or column). Grid is for two-dimensional layouts (rows and columns).",
    example: `/* Flexbox - One Dimensional */
.flex-container {
  display: flex;
  flex-direction: row; /* OR column, but not both */
  justify-content: space-between;
  align-items: center;
}

/* Grid - Two Dimensional */
.grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr; /* 3 columns */
  grid-template-rows: auto 1fr auto;   /* 3 rows */
  gap: 1rem;
  min-height: 100vh;
}

/* Grid Layout Example */
.layout {
  display: grid;
  grid-template-areas: 
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }

/* Responsive Grid */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

/* Flex for Navigation */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links {
  display: flex;
  gap: 1rem;
  list-style: none;
}

/* When to use Flex: */
/* ✅ Navigation bars */
/* ✅ Centering content */
/* ✅ Flexible item distribution */
/* ✅ One-dimensional alignment */

/* When to use Grid: */
/* ✅ Page layouts */
/* ✅ Card layouts */
/* ✅ Complex positioning */
/* ✅ Two-dimensional control */

/* Can be used together */
.page {
  display: grid;
  grid-template-areas: "header" "main" "footer";
}

.header {
  display: flex; /* Flex inside grid */
  justify-content: space-between;
  align-items: center;
}`,
    explanation: "Flexbox for component-level layouts and alignment. Grid for page-level layouts and two-dimensional control."
  },
  {
    id: 100,
    question: "What is position: absolute vs relative vs sticky vs fixed?",
    answer: "Position values control how elements are positioned: relative to normal flow, parent, viewport, or scroll position.",
    example: `/* Static (default) */
.static {
  position: static; /* Default - normal document flow */
  /* top, right, bottom, left have no effect */
}

/* Relative */
.relative {
  position: relative;
  top: 10px;    /* Moves 10px down from original position */
  left: 20px;   /* Moves 20px right from original position */
  /* Original space is preserved */
  /* Creates positioning context for absolute children */
}

/* Absolute */
.absolute {
  position: absolute;
  top: 0;       /* Positioned relative to nearest positioned ancestor */
  right: 0;     /* Or viewport if no positioned ancestor */
  /* Removed from normal document flow */
  /* Doesn't affect other elements' positions */
}

/* Fixed */
.fixed {
  position: fixed;
  bottom: 20px; /* Always 20px from bottom of viewport */
  right: 20px;  /* Always 20px from right of viewport */
  /* Stays in same position when scrolling */
  /* Common for: modals, floating buttons, headers */
}

/* Sticky */
.sticky {
  position: sticky;
  top: 0;       /* Sticks to top when scrolling reaches it */
  /* Behaves like relative until scroll threshold */
  /* Then behaves like fixed */
  /* Common for: navigation headers, table headers */
}

/* Practical Examples */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.tooltip {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: black;
  color: white;
  padding: 0.5rem;
}

.sticky-header {
  position: sticky;
  top: 0;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  z-index: 100;
}

.floating-button {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  z-index: 999;
}

/* Z-index stacking */
.layer-1 { z-index: 1; }
.layer-2 { z-index: 2; }
.layer-3 { z-index: 3; }
/* Higher z-index appears on top */`,
    explanation: "Position values control element placement: relative for small adjustments, absolute for precise positioning, fixed for viewport positioning, sticky for scroll-based positioning."
  },
  {
    id: 101,
    question: "What are media queries?",
    answer: "Media queries apply CSS styles based on device characteristics like screen size, orientation, or resolution.",
    example: `/* Basic Media Query */
@media (max-width: 768px) {
  .container {
    padding: 1rem;
    font-size: 14px;
  }
}

/* Common Breakpoints */
/* Mobile First Approach */
.container {
  padding: 1rem; /* Mobile default */
}

@media (min-width: 576px) {
  /* Small devices (landscape phones) */
  .container { padding: 1.5rem; }
}

@media (min-width: 768px) {
  /* Medium devices (tablets) */
  .container { padding: 2rem; }
}

@media (min-width: 992px) {
  /* Large devices (desktops) */
  .container { padding: 2.5rem; }
}

@media (min-width: 1200px) {
  /* Extra large devices */
  .container { padding: 3rem; }
}

/* Desktop First Approach */
.sidebar {
  width: 300px; /* Desktop default */
}

@media (max-width: 992px) {
  .sidebar { width: 250px; }
}

@media (max-width: 768px) {
  .sidebar { 
    width: 100%;
    height: auto;
  }
}

/* Multiple Conditions */
@media (min-width: 768px) and (max-width: 1024px) {
  /* Tablets only */
  .grid { grid-template-columns: repeat(2, 1fr); }
}

@media (orientation: landscape) {
  /* Landscape orientation */
  .hero { height: 60vh; }
}

@media (orientation: portrait) {
  /* Portrait orientation */
  .hero { height: 80vh; }
}

/* High DPI Displays */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .logo {
    background-image: url('logo@2x.png');
    background-size: 100px 50px;
  }
}

/* Print Styles */
@media print {
  .no-print { display: none; }
  body { font-size: 12pt; }
  a::after { content: " (" attr(href) ")"; }
}

/* Prefers Color Scheme */
@media (prefers-color-scheme: dark) {
  body {
    background: #1a1a1a;
    color: #ffffff;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Container Queries (Modern) */
@container (min-width: 400px) {
  .card {
    display: flex;
    flex-direction: row;
  }
}`,
    explanation: "Media queries enable responsive design by applying different styles based on device characteristics, ensuring optimal user experience across all devices."
  },
  {
    id: 102,
    question: "What is the difference between div and span?",
    answer: "div is a block-level container for grouping elements. span is an inline container for styling text or small content portions.",
    example: `<!-- div - Block level -->
<div class="container">
  <h1>Title</h1>
  <p>This div takes full width and starts on new line</p>
</div>
<div class="another-section">
  <p>This div also starts on new line</p>
</div>

<!-- span - Inline level -->
<p>This is a paragraph with <span class="highlight">highlighted text</span> in the middle.</p>
<p>Multiple <span class="bold">spans</span> can be <span class="italic">inline</span> together.</p>

<!-- CSS styling -->
.container {
  width: 100%;
  padding: 20px;
  margin: 10px 0;
  background: lightblue;
}

.highlight {
  background: yellow;
  font-weight: bold;
}

.bold { font-weight: bold; }
.italic { font-style: italic; }

<!-- When to use div: -->
<!-- ✅ Layout containers -->
<!-- ✅ Grouping related elements -->
<!-- ✅ Creating sections -->
<!-- ✅ Styling blocks of content -->

<!-- When to use span: -->
<!-- ✅ Styling parts of text -->
<!-- ✅ Inline formatting -->
<!-- ✅ Small content portions -->
<!-- ✅ JavaScript hooks for text -->

<!-- Semantic alternatives: -->
<section>Use instead of div for content sections</section>
<article>Use instead of div for standalone content</article>
<strong>Use instead of span for important text</strong>
<em>Use instead of span for emphasized text</em>`,
    explanation: "div creates block-level containers for layout, span creates inline containers for text styling. Choose semantic alternatives when possible."
  },
  {
    id: 103,
    question: "What is DOCTYPE?",
    answer: "DOCTYPE declares the document type and HTML version, ensuring browsers render the page in standards mode.",
    example: `<!-- HTML5 DOCTYPE (recommended) -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Page</title>
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>

<!-- Older HTML 4.01 Strict -->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">

<!-- XHTML 1.0 Strict -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<!-- Without DOCTYPE - Quirks Mode -->
<!-- Browser uses legacy rendering mode -->
<!-- Inconsistent behavior across browsers -->

<!-- Why DOCTYPE is important: -->
<!-- ✅ Triggers standards mode -->
<!-- ✅ Consistent rendering -->
<!-- ✅ Modern CSS features work -->
<!-- ✅ Proper box model -->
<!-- ✅ Validation support -->

<!-- HTML5 DOCTYPE benefits: -->
<!-- ✅ Simple and short -->
<!-- ✅ Case insensitive -->
<!-- ✅ Works in all browsers -->
<!-- ✅ Future-proof -->

<!-- Browser modes: -->
<!-- Standards Mode: Modern CSS and HTML -->
<!-- Quirks Mode: Legacy IE behavior -->
<!-- Almost Standards Mode: Minor differences -->`,
    explanation: "DOCTYPE ensures browsers use standards mode for consistent rendering. Always use HTML5 DOCTYPE for modern web development."
  },
  {
    id: 104,
    question: "What are meta tags?",
    answer: "Meta tags provide metadata about the HTML document. Used for SEO, social media, browser behavior, and page information.",
    example: `<!-- Essential meta tags -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Learn web development with our comprehensive tutorials">
<meta name="keywords" content="HTML, CSS, JavaScript, web development">
<meta name="author" content="John Doe">

<!-- SEO meta tags -->
<meta name="robots" content="index, follow">
<meta name="googlebot" content="index, follow">
<meta name="language" content="English">
<meta name="revisit-after" content="7 days">

<!-- Open Graph (Facebook, LinkedIn) -->
<meta property="og:title" content="My Awesome Website">
<meta property="og:description" content="Learn web development here">
<meta property="og:image" content="https://example.com/image.jpg">
<meta property="og:url" content="https://example.com">
<meta property="og:type" content="website">
<meta property="og:site_name" content="My Site">

<!-- Twitter Cards -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@mysite">
<meta name="twitter:title" content="My Awesome Website">
<meta name="twitter:description" content="Learn web development here">
<meta name="twitter:image" content="https://example.com/twitter-image.jpg">

<!-- Browser behavior -->
<meta http-equiv="refresh" content="30">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="theme-color" content="#000000">
<meta name="msapplication-TileColor" content="#000000">

<!-- Mobile specific -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="format-detection" content="telephone=no">

<!-- Security -->
<meta http-equiv="Content-Security-Policy" content="default-src 'self'">
<meta name="referrer" content="no-referrer-when-downgrade">`,
    explanation: "Meta tags provide crucial information for search engines, social media, and browsers. Essential for SEO and user experience."
  },
  {
    id: 105,
    question: "What is the purpose of the alt attribute?",
    answer: "Alt attribute provides alternative text for images when they can't be displayed. Essential for accessibility and SEO.",
    example: `<!-- Good alt text examples -->
<img src="dog-playing.jpg" alt="Golden retriever playing fetch in the park">
<img src="chart.png" alt="Sales increased 25% from January to March 2024">
<img src="logo.png" alt="Company Name">

<!-- Decorative images -->
<img src="decoration.png" alt="" role="presentation">
<img src="border.gif" alt="">

<!-- Complex images -->
<img src="complex-chart.png" alt="Quarterly sales data" longdesc="sales-description.html">

<!-- Image in link -->
<a href="/home">
  <img src="home-icon.png" alt="Go to homepage">
</a>

<!-- Image with caption -->
<figure>
  <img src="sunset.jpg" alt="Orange sunset over calm ocean waters">
  <figcaption>Sunset at Malibu Beach, California</figcaption>
</figure>

<!-- Bad alt text examples -->
<!-- <img src="image1.jpg" alt="image"> -->
<!-- <img src="photo.jpg" alt="photo of"> -->
<!-- <img src="pic.jpg" alt="click here"> -->

<!-- Alt text guidelines: -->
<!-- ✅ Describe the image content -->
<!-- ✅ Keep it concise (125 characters max) -->
<!-- ✅ Don't start with "Image of" or "Picture of" -->
<!-- ✅ Include important text in images -->
<!-- ✅ Use empty alt="" for decorative images -->
<!-- ✅ Consider context and purpose -->

<!-- Screen reader behavior: -->
<!-- With alt: Reads the alt text -->
<!-- Without alt: Reads filename or skips -->
<!-- Empty alt: Skips the image -->`,
    explanation: "Alt text makes images accessible to screen readers and improves SEO. Describe content meaningfully, use empty alt for decorative images."
  },
  {
    id: 106,
    question: "Difference between <script> async vs defer?",
    answer: "async downloads and executes immediately, potentially blocking parsing. defer downloads in parallel but executes after parsing completes.",
    example: `<!-- Normal script - blocks parsing -->
<script src="script.js"></script>
<!-- HTML parsing stops, script downloads and executes, then parsing resumes -->

<!-- Async script - non-blocking download, immediate execution -->
<script src="script.js" async></script>
<!-- Downloads in parallel, executes immediately when ready (may interrupt parsing) -->

<!-- Defer script - non-blocking download, delayed execution -->
<script src="script.js" defer></script>
<!-- Downloads in parallel, executes after HTML parsing is complete -->

<!-- Multiple scripts behavior -->
<script src="jquery.js" defer></script>
<script src="app.js" defer></script>
<!-- Defer scripts execute in order: jquery.js then app.js -->

<script src="analytics.js" async></script>
<script src="ads.js" async></script>
<!-- Async scripts execute in any order (whichever finishes first) -->

<!-- Best practices -->
<!-- Use defer for scripts that need DOM -->
<script src="dom-manipulation.js" defer></script>

<!-- Use async for independent scripts -->
<script src="google-analytics.js" async></script>
<script src="social-widgets.js" async></script>

<!-- Critical scripts - no async/defer -->
<script src="critical-polyfill.js"></script>

<!-- Modern approach - type="module" -->
<script type="module" src="modern-script.js"></script>
<!-- Modules are deferred by default -->

<!-- Timeline comparison: -->
<!-- Normal: Parse HTML → Stop → Download & Execute Script → Resume Parse -->
<!-- Async: Parse HTML + Download Script → Pause Parse → Execute → Resume Parse -->
<!-- Defer: Parse HTML + Download Script → Finish Parse → Execute Script -->`,
    explanation: "Use defer for scripts that need DOM access, async for independent scripts like analytics. Both improve page load performance."
  },
  {
    id: 107,
    question: "What are forms & input types in HTML5?",
    answer: "HTML5 forms provide various input types with built-in validation, better user experience, and semantic meaning.",
    example: `<!-- Basic form structure -->
<form action="/submit" method="POST" novalidate>
  <!-- Text inputs -->
  <input type="text" name="username" required placeholder="Enter username">
  <input type="email" name="email" required placeholder="user@example.com">
  <input type="password" name="password" required minlength="8">
  <input type="tel" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}">
  <input type="url" name="website" placeholder="https://example.com">
  
  <!-- Number inputs -->
  <input type="number" name="age" min="18" max="100" step="1">
  <input type="range" name="volume" min="0" max="100" value="50">
  
  <!-- Date/Time inputs -->
  <input type="date" name="birthday" min="1900-01-01" max="2024-12-31">
  <input type="time" name="appointment">
  <input type="datetime-local" name="event">
  <input type="month" name="start-month">
  <input type="week" name="vacation-week">
  
  <!-- File input -->
  <input type="file" name="avatar" accept="image/*" multiple>
  <input type="file" name="documents" accept=".pdf,.doc,.docx">
  
  <!-- Other inputs -->
  <input type="color" name="theme-color" value="#ff0000">
  <input type="search" name="query" placeholder="Search...">
  <input type="hidden" name="csrf-token" value="abc123">
  
  <!-- Checkboxes and Radio -->
  <input type="checkbox" name="newsletter" id="newsletter">
  <label for="newsletter">Subscribe to newsletter</label>
  
  <input type="radio" name="gender" value="male" id="male">
  <label for="male">Male</label>
  <input type="radio" name="gender" value="female" id="female">
  <label for="female">Female</label>
  
  <!-- Select dropdown -->
  <select name="country" required>
    <option value="">Choose country</option>
    <option value="us">United States</option>
    <option value="uk">United Kingdom</option>
  </select>
  
  <!-- Textarea -->
  <textarea name="message" rows="4" cols="50" placeholder="Your message..."></textarea>
  
  <!-- Form validation -->
  <input type="email" name="email" required>
  <input type="text" name="username" pattern="[a-zA-Z0-9]+" title="Only letters and numbers">
  
  <!-- Submit buttons -->
  <button type="submit">Submit</button>
  <button type="reset">Reset</button>
  <button type="button" onclick="customAction()">Custom Action</button>
</form>

<!-- Form attributes -->
<form autocomplete="off" enctype="multipart/form-data">
  <!-- Form content -->
</form>`,
    explanation: "HTML5 input types provide built-in validation, better mobile keyboards, and improved user experience with semantic meaning."
  },
  {
    id: 108,
    question: "What is localStorage/cookie/sessionStorage?",
    answer: "Browser storage mechanisms: localStorage persists until cleared, sessionStorage lasts for session, cookies sent with requests.",
    example: `// localStorage - persistent storage
localStorage.setItem('username', 'john');
localStorage.setItem('preferences', JSON.stringify({ theme: 'dark' }));

const username = localStorage.getItem('username');
const prefs = JSON.parse(localStorage.getItem('preferences'));

localStorage.removeItem('username');
localStorage.clear(); // Remove all

// sessionStorage - session only
sessionStorage.setItem('tempData', 'value');
const tempData = sessionStorage.getItem('tempData');

// Cookies - sent with HTTP requests
document.cookie = "username=john; expires=Thu, 18 Dec 2024 12:00:00 UTC; path=/";
document.cookie = "theme=dark; max-age=3600; secure; samesite=strict";

// Reading cookies
function getCookie(name) {
  const value = \`; \${document.cookie}\`;
  const parts = value.split(\`; \${name}=\`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

const username = getCookie('username');

// Storage comparison:
// localStorage:
// ✅ 5-10MB storage
// ✅ Persists until manually cleared
// ✅ Same origin only
// ❌ Not sent with requests

// sessionStorage:
// ✅ 5-10MB storage
// ✅ Cleared when tab closes
// ✅ Same origin only
// ❌ Not sent with requests

// Cookies:
// ❌ 4KB limit per cookie
// ✅ Configurable expiration
// ✅ Sent with every request
// ✅ Can be httpOnly (server-only)
// ✅ Cross-domain with proper settings

// Storage events
window.addEventListener('storage', (e) => {
  console.log('Storage changed:', e.key, e.newValue);
});

// Best practices:
// Use localStorage for: user preferences, app state
// Use sessionStorage for: temporary data, form data
// Use cookies for: authentication tokens, server communication`,
    explanation: "Choose storage based on persistence needs and server communication requirements. localStorage for app data, cookies for server communication."
  },
  {
    id: 109,
    question: "What is difference between id vs class?",
    answer: "ID is unique identifier for single element, class is reusable identifier for multiple elements. Different CSS specificity.",
    example: `<!-- HTML usage -->
<div id="header" class="container dark-theme">
  <h1 id="main-title" class="title large">Welcome</h1>
  <p class="description">This is a description</p>
  <p class="description highlight">Another description</p>
</div>

<!-- CSS targeting -->
/* ID selector - high specificity */
#header {
  background: blue;
  padding: 20px;
}

#main-title {
  color: white;
  font-size: 2rem;
}

/* Class selector - lower specificity */
.container {
  max-width: 1200px;
  margin: 0 auto;
}

.title {
  font-family: Arial, sans-serif;
}

.description {
  color: gray;
  line-height: 1.5;
}

.highlight {
  background: yellow;
}

/* Multiple classes */
.dark-theme .title {
  color: white;
}

/* Specificity examples */
.description { color: gray; }        /* Specificity: 0,0,1,0 */
#header .description { color: blue; } /* Specificity: 0,1,1,0 - wins */

/* JavaScript usage */
// ID - single element
const header = document.getElementById('header');
const title = document.querySelector('#main-title');

// Class - multiple elements
const descriptions = document.getElementsByClassName('description');
const highlighted = document.querySelectorAll('.highlight');

// Adding/removing classes
title.classList.add('animated');
title.classList.remove('large');
title.classList.toggle('visible');

/* When to use ID: */
/* ✅ Unique page elements (header, footer, main) */
/* ✅ JavaScript targeting */
/* ✅ Form labels (for attribute) */
/* ✅ Anchor links */

/* When to use Class: */
/* ✅ Styling multiple elements */
/* ✅ Reusable components */
/* ✅ State classes (active, hidden) */
/* ✅ Utility classes (text-center, mb-4) */

<!-- Form labels with ID -->
<label for="email">Email:</label>
<input type="email" id="email" name="email">

<!-- Anchor links -->
<a href="#section1">Go to Section 1</a>
<section id="section1">Content here</section>`,
    explanation: "Use ID for unique elements and JavaScript targeting. Use classes for styling multiple elements and reusable components."
  },
  {
    id: 110,
    question: "What is specificity in CSS?",
    answer: "Specificity determines which CSS rules apply when multiple rules target the same element. Calculated by counting selectors.",
    example: `/* Specificity calculation: */
/* Inline styles: 1,0,0,0 */
/* IDs: 0,1,0,0 */
/* Classes, attributes, pseudo-classes: 0,0,1,0 */
/* Elements, pseudo-elements: 0,0,0,1 */

/* Examples with specificity values: */
h1 { color: red; }                    /* 0,0,0,1 */
.title { color: blue; }               /* 0,0,1,0 - wins over h1 */
#main-title { color: green; }         /* 0,1,0,0 - wins over .title */

/* Complex selectors */
div p { color: black; }               /* 0,0,0,2 */
.container p { color: gray; }         /* 0,0,1,1 - wins */
#header .container p { color: blue; } /* 0,1,1,1 - wins */

/* Pseudo-classes and attributes */
a:hover { color: red; }               /* 0,0,1,1 */
input[type="text"] { border: 1px; }   /* 0,0,1,1 */
.btn:focus:hover { outline: none; }   /* 0,0,3,0 */

/* Inline styles - highest specificity */
<p style="color: purple;">Text</p>   /* 1,0,0,0 - wins over everything */

/* !important - overrides specificity */
p { color: red !important; }          /* Overrides higher specificity */

/* Specificity conflicts example */
.nav ul li a { color: blue; }         /* 0,0,2,2 */
.nav .menu-item { color: red; }       /* 0,0,2,0 - blue wins! */

/* Solutions for specificity issues */
/* 1. Increase specificity */
.nav .menu .menu-item { color: red; } /* 0,0,3,0 - now red wins */

/* 2. Use more specific selectors */
.nav > ul > li > a { color: green; }  /* 0,0,1,3 */

/* 3. Reorganize CSS order */
.nav ul li a { color: blue; }
.nav .menu-item { color: red; }       /* Same specificity, red wins (later) */

/* 4. Use CSS custom properties */
.nav {
  --link-color: red;
}
.nav ul li a {
  color: var(--link-color, blue);
}

/* Best practices: */
/* ✅ Keep specificity low */
/* ✅ Use classes over IDs for styling */
/* ✅ Avoid !important */
/* ✅ Use CSS methodology (BEM) */
/* ❌ Don't use inline styles */
/* ❌ Don't over-qualify selectors */

/* BEM methodology - consistent specificity */
.card { }                    /* 0,0,1,0 */
.card__title { }             /* 0,0,1,0 */
.card__button { }            /* 0,0,1,0 */
.card__button--primary { }   /* 0,0,1,0 */`,
    explanation: "Specificity determines CSS rule priority. Keep specificity low, use classes over IDs, avoid !important, and follow consistent methodologies."
  },
  {
    id: 111,
    question: "What is z-index? How does stacking context work?",
    answer: "z-index controls element layering. Stacking contexts create independent layering groups where z-index values only compete within the same context.",
    example: `/* Basic z-index */
.modal {
  position: fixed;
  z-index: 1000; /* High value to appear on top */
}

.dropdown {
  position: absolute;
  z-index: 100;
}

.tooltip {
  position: absolute;
  z-index: 200;
}

/* Stacking context creation */
.parent {
  position: relative;
  z-index: 1; /* Creates stacking context */
}

.child {
  position: absolute;
  z-index: 9999; /* Only competes within parent context */
}

/* Other properties that create stacking context */
.context-creator {
  opacity: 0.99;           /* opacity < 1 */
  transform: translateZ(0); /* 3D transform */
  filter: blur(0px);       /* filter effects */
  will-change: transform;  /* will-change */
  isolation: isolate;      /* explicit isolation */
}

/* Stacking order (bottom to top) */
/* 1. Root element background */
/* 2. Positioned elements with negative z-index */
/* 3. Non-positioned elements (normal flow) */
/* 4. Positioned elements with z-index: auto or 0 */
/* 5. Positioned elements with positive z-index */

/* Example of stacking context trap */
.sidebar {
  position: relative;
  z-index: 1;
}

.sidebar .dropdown {
  position: absolute;
  z-index: 9999; /* Won't appear above .main content */
}

.main {
  position: relative;
  z-index: 2; /* Higher than sidebar */
}

/* Solution: Remove z-index from parent or increase it */
.sidebar {
  position: relative;
  /* z-index: 1; Remove this */
}

/* CSS Grid and Flexbox create stacking contexts */
.grid-container {
  display: grid;
  /* Creates stacking context */
}

.flex-container {
  display: flex;
  /* Creates stacking context */
}

/* Debugging stacking issues */
.debug-stack {
  outline: 2px solid red;
  background: rgba(255, 0, 0, 0.1);
}

/* Modern approach with CSS custom properties */
:root {
  --z-dropdown: 100;
  --z-modal: 1000;
  --z-tooltip: 1100;
}

.dropdown { z-index: var(--z-dropdown); }
.modal { z-index: var(--z-modal); }
.tooltip { z-index: var(--z-tooltip); }`,
    explanation: "z-index only works within the same stacking context. Many CSS properties create new stacking contexts, isolating z-index competition."
  },
  {
    id: 112,
    question: "Explain pseudo-classes vs pseudo-elements.",
    answer: "Pseudo-classes select elements in specific states (:hover, :focus). Pseudo-elements create virtual elements (::before, ::after).",
    example: `/* Pseudo-classes - element states */
a:hover { color: red; }           /* Mouse over */
input:focus { border: 2px solid blue; } /* Keyboard focus */
li:first-child { font-weight: bold; }   /* First child */
tr:nth-child(even) { background: #f0f0f0; } /* Even rows */

/* Form pseudo-classes */
input:valid { border-color: green; }
input:invalid { border-color: red; }
input:required { border-width: 2px; }
input:disabled { opacity: 0.5; }

/* Structural pseudo-classes */
p:first-of-type { margin-top: 0; }
p:last-of-type { margin-bottom: 0; }
div:empty { display: none; }

/* Pseudo-elements - virtual elements */
p::before {
  content: "→ ";
  color: blue;
  font-weight: bold;
}

p::after {
  content: " ←";
  color: red;
}

/* First line and letter */
p::first-line {
  font-weight: bold;
  color: navy;
}

p::first-letter {
  font-size: 2em;
  float: left;
  margin-right: 5px;
}

/* Selection styling */
::selection {
  background: yellow;
  color: black;
}

/* Placeholder styling */
input::placeholder {
  color: #999;
  font-style: italic;
}

/* Creating decorative elements */
.quote::before {
  content: open-quote;
  font-size: 2em;
  color: #ccc;
}

.quote::after {
  content: close-quote;
  font-size: 2em;
  color: #ccc;
}

/* CSS counters with pseudo-elements */
ol {
  counter-reset: item;
}

li::before {
  counter-increment: item;
  content: counter(item) ". ";
  font-weight: bold;
}

/* Tooltip with pseudo-element */
.tooltip {
  position: relative;
}

.tooltip::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: black;
  color: white;
  padding: 5px;
  border-radius: 3px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}

.tooltip:hover::after {
  opacity: 1;
}

/* Double colon vs single colon */
/* Modern syntax (preferred) */
p::before { content: "New"; }
p::after { content: "New"; }

/* Legacy syntax (still works) */
p:before { content: "Old"; }
p:after { content: "Old"; }`,
    explanation: "Pseudo-classes target element states, pseudo-elements create virtual content. Use :: for pseudo-elements, : for pseudo-classes."
  },
  {
    id: 113,
    question: "What is BEM naming convention?",
    answer: "BEM (Block Element Modifier) is a CSS methodology for creating reusable, maintainable component-based styles.",
    example: `/* BEM Structure: block__element--modifier */

/* Block - standalone component */
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
}

/* Elements - parts of the block */
.card__header {
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
  margin-bottom: 16px;
}

.card__title {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
}

.card__subtitle {
  color: #666;
  font-size: 0.9rem;
}

.card__body {
  line-height: 1.6;
}

.card__footer {
  border-top: 1px solid #eee;
  padding-top: 16px;
  margin-top: 16px;
}

.card__button {
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

/* Modifiers - variations of blocks or elements */
.card--featured {
  border-color: #007bff;
  box-shadow: 0 4px 8px rgba(0, 123, 255, 0.1);
}

.card--compact {
  padding: 8px;
}

.card__button--secondary {
  background: #6c757d;
}

.card__button--large {
  padding: 12px 24px;
  font-size: 1.1rem;
}

/* HTML usage */
<div class="card card--featured">
  <header class="card__header">
    <h2 class="card__title">Card Title</h2>
    <p class="card__subtitle">Subtitle</p>
  </header>
  <div class="card__body">
    <p>Card content goes here...</p>
  </div>
  <footer class="card__footer">
    <button class="card__button card__button--large">Action</button>
    <button class="card__button card__button--secondary">Cancel</button>
  </footer>
</div>

/* Navigation example */
.nav {
  display: flex;
  background: #333;
}

.nav__item {
  color: white;
  text-decoration: none;
  padding: 16px;
  transition: background 0.3s;
}

.nav__item:hover {
  background: #555;
}

.nav__item--active {
  background: #007bff;
}

.nav__item--disabled {
  opacity: 0.5;
  pointer-events: none;
}

/* Benefits of BEM: */
/* ✅ Clear component structure */
/* ✅ Avoids specificity issues */
/* ✅ Reusable components */
/* ✅ Self-documenting code */
/* ✅ Easy to maintain */

/* BEM with CSS preprocessors */
.button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  
  &__icon {
    margin-right: 8px;
  }
  
  &--primary {
    background: #007bff;
    color: white;
  }
  
  &--secondary {
    background: #6c757d;
    color: white;
  }
}`,
    explanation: "BEM creates predictable, maintainable CSS with clear component structure. Prevents specificity wars and promotes reusability."
  }
];