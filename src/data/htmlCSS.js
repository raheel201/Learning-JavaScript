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
  }
];