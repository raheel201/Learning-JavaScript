export const nextJS = [
  {
    id: 79,
    question: "What is Next.js? Why use it over React?",
    answer: "Next.js is a React framework that provides SSR, SSG, routing, and optimization features out of the box.",
    example: `// Pure React - Client-side only
function App() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData);
  }, []);
  
  if (!data) return <div>Loading...</div>;
  return <div>{data.title}</div>;
}

// Next.js - Server-side rendering
export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  
  return {
    props: { data }
  };
}

function Page({ data }) {
  return <div>{data.title}</div>; // Already has data on first render
}

// Next.js benefits:
// ✅ SEO-friendly (server-rendered HTML)
// ✅ Better performance (pre-rendered pages)
// ✅ File-based routing
// ✅ API routes
// ✅ Image optimization
// ✅ Built-in CSS support`,
    explanation: "Next.js adds server-side capabilities, better SEO, performance optimizations, and developer experience improvements to React."
  },
  {
    id: 80,
    question: "Explain SSR, SSG, ISR, CSR.",
    answer: "SSR: Server-Side Rendering. SSG: Static Site Generation. ISR: Incremental Static Regeneration. CSR: Client-Side Rendering.",
    example: `// SSR - getServerSideProps (runs on every request)
export async function getServerSideProps(context) {
  const { params, query, req, res } = context;
  const data = await fetchUserData(params.id);
  
  return {
    props: { data }
  };
}

// SSG - getStaticProps (runs at build time)
export async function getStaticProps() {
  const posts = await fetchAllPosts();
  
  return {
    props: { posts },
    revalidate: false // Never revalidate
  };
}

// ISR - getStaticProps with revalidate
export async function getStaticProps() {
  const posts = await fetchAllPosts();
  
  return {
    props: { posts },
    revalidate: 60 // Revalidate every 60 seconds
  };
}

// CSR - useEffect (client-side only)
function ClientOnlyComponent() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetchData().then(setData);
  }, []);
  
  return data ? <div>{data}</div> : <div>Loading...</div>;
}

// When to use:
// SSR: Dynamic content, user-specific data
// SSG: Static content, blogs, marketing pages
// ISR: Semi-static content that updates occasionally
// CSR: Interactive dashboards, user-specific UI`,
    explanation: "Choose rendering method based on content type: static (SSG), dynamic (SSR), semi-static (ISR), or interactive (CSR)."
  },
  {
    id: 81,
    question: "Difference between pages router vs app router?",
    answer: "Pages router uses pages/ directory with file-based routing. App router uses app/ directory with layouts and server components.",
    example: `// Pages Router (Legacy)
// pages/blog/[slug].js
import { useRouter } from 'next/router';

export default function BlogPost({ post }) {
  const router = useRouter();
  
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  
  return <div>{post.title}</div>;
}

export async function getStaticProps({ params }) {
  const post = await fetchPost(params.slug);
  return { props: { post } };
}

// App Router (Modern)
// app/blog/[slug]/page.tsx
async function BlogPost({ params }) {
  const post = await fetchPost(params.slug);
  
  return <div>{post.title}</div>;
}

// app/blog/layout.tsx
export default function BlogLayout({ children }) {
  return (
    <div>
      <nav>Blog Navigation</nav>
      {children}
    </div>
  );
}

// App Router benefits:
// ✅ Server Components by default
// ✅ Nested layouts
// ✅ Loading UI
// ✅ Error boundaries
// ✅ Parallel routes
// ✅ Intercepting routes`,
    explanation: "App router provides better developer experience with server components, nested layouts, and improved routing features."
  },
  {
    id: 82,
    question: "What is server component vs client component?",
    answer: "Server components run on server, have no interactivity. Client components run in browser, can use hooks and event handlers.",
    example: `// Server Component (default in app router)
// No 'use client' directive
async function ServerComponent() {
  // Can directly access database/APIs
  const data = await fetch('https://api.example.com/data');
  const posts = await data.json();
  
  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </div>
      ))}
    </div>
  );
}

// Client Component
'use client'; // Required directive

import { useState, useEffect } from 'react';

function ClientComponent() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    console.log('Component mounted');
  }, []);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

// Mixed usage
async function MixedPage() {
  const data = await fetchData(); // Server-side
  
  return (
    <div>
      <h1>{data.title}</h1> {/* Server component */}
      <InteractiveButton /> {/* Client component */}
    </div>
  );
}`,
    explanation: "Server components improve performance by running on server. Use client components only when you need interactivity."
  },
  {
    id: 83,
    question: "What is getStaticProps? When to use it?",
    answer: "getStaticProps fetches data at build time for static generation. Use for content that doesn't change often.",
    example: `// Basic getStaticProps
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();
  
  return {
    props: {
      posts
    }
  };
}

// With revalidation (ISR)
export async function getStaticProps() {
  const posts = await fetchPosts();
  
  return {
    props: { posts },
    revalidate: 3600 // Revalidate every hour
  };
}

// With context (dynamic routes)
export async function getStaticProps({ params, preview, previewData }) {
  const post = await fetchPost(params.slug);
  
  if (!post) {
    return {
      notFound: true
    };
  }
  
  return {
    props: { post },
    revalidate: 60
  };
}

// Error handling
export async function getStaticProps() {
  try {
    const data = await fetchData();
    return { props: { data } };
  } catch (error) {
    return {
      props: { data: null },
      revalidate: 10 // Retry sooner on error
    };
  }
}

// When to use getStaticProps:
// ✅ Blog posts, documentation
// ✅ Product catalogs
// ✅ Marketing pages
// ✅ Content that updates infrequently
// ❌ User-specific data
// ❌ Frequently changing data`,
    explanation: "getStaticProps is perfect for content that can be pre-rendered and cached, improving performance and SEO."
  },
  {
    id: 84,
    question: "What is getServerSideProps? When to use it?",
    answer: "getServerSideProps fetches data on each request server-side. Use for dynamic, user-specific, or frequently changing data.",
    example: `// Basic getServerSideProps
export async function getServerSideProps(context) {
  const { req, res, params, query } = context;
  
  const data = await fetchUserData(query.userId);
  
  return {
    props: { data }
  };
}

// With authentication
export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession(req);
  
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }
  
  const userData = await fetchUserData(session.userId);
  
  return {
    props: { userData }
  };
}

// With error handling
export async function getServerSideProps() {
  try {
    const data = await fetchData();
    return { props: { data } };
  } catch (error) {
    return {
      notFound: true
    };
  }
}

// Setting headers
export async function getServerSideProps({ res }) {
  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
  
  const data = await fetchData();
  return { props: { data } };
}

// When to use getServerSideProps:
// ✅ User dashboards
// ✅ Real-time data
// ✅ Personalized content
// ✅ Authentication-required pages
// ❌ Static content
// ❌ Content that can be cached`,
    explanation: "getServerSideProps runs on every request, perfect for dynamic content but slower than static generation."
  },
  {
    id: 85,
    question: "What is middleware in Next.js?",
    answer: "Middleware runs before requests are completed, allowing you to modify response, redirect, or rewrite requests.",
    example: `// middleware.js (in root directory)
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Authentication check
  const token = request.cookies.get('token');
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Add custom headers
  const response = NextResponse.next();
  response.headers.set('X-Custom-Header', 'middleware-value');
  
  return response;
}

// Advanced middleware
export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // A/B testing
  if (pathname === '/') {
    const bucket = Math.random() < 0.5 ? 'a' : 'b';
    const url = request.nextUrl.clone();
    url.pathname = \`/home-\${bucket}\`;
    return NextResponse.rewrite(url);
  }
  
  // Geolocation redirect
  const country = request.geo?.country || 'US';
  if (pathname.startsWith('/shop') && country !== 'US') {
    const url = request.nextUrl.clone();
    url.pathname = \`/\${country.toLowerCase()}\${pathname}\`;
    return NextResponse.redirect(url);
  }
  
  // Rate limiting
  const ip = request.ip || 'unknown';
  if (isRateLimited(ip)) {
    return new NextResponse('Too Many Requests', { status: 429 });
  }
}

// Matcher configuration
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)'
  ]
};`,
    explanation: "Middleware enables authentication, redirects, A/B testing, and request modification at the edge before page rendering."
  },
  {
    id: 86,
    question: "What is Image component? Why is it better than <img>?",
    answer: "Next.js Image component provides automatic optimization, lazy loading, and responsive images with better performance.",
    example: `// Regular img tag
<img 
  src="/large-image.jpg" 
  alt="Description"
  width="800"
  height="600"
/>

// Next.js Image component
import Image from 'next/image';

<Image
  src="/large-image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority // Load immediately for above-fold images
/>

// Responsive images
<Image
  src="/hero.jpg"
  alt="Hero image"
  fill
  style={{ objectFit: 'cover' }}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>

// With placeholder
<Image
  src="/profile.jpg"
  alt="Profile"
  width={200}
  height={200}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
/>

// External images (requires domains config)
// next.config.js
module.exports = {
  images: {
    domains: ['example.com', 'cdn.example.com']
  }
};

<Image
  src="https://example.com/image.jpg"
  alt="External image"
  width={400}
  height={300}
/>

// Benefits of Next.js Image:
// ✅ Automatic WebP/AVIF conversion
// ✅ Lazy loading by default
// ✅ Responsive images
// ✅ Blur placeholder
// ✅ Prevents layout shift
// ✅ Optimized loading`,
    explanation: "Next.js Image component automatically optimizes images for better performance, SEO, and user experience."
  },
  {
    id: 87,
    question: "How does caching work in Next.js?",
    answer: "Next.js has multiple caching layers: build-time caching, CDN caching, browser caching, and API route caching.",
    example: `// Static Generation caching
export async function getStaticProps() {
  return {
    props: { data },
    revalidate: 3600 // Cache for 1 hour
  };
}

// API Route caching
// pages/api/posts.js
export default function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
  res.json({ posts });
}

// App Router caching
// app/posts/page.tsx
export const revalidate = 3600; // Revalidate every hour

async function PostsPage() {
  const posts = await fetch('https://api.example.com/posts', {
    next: { revalidate: 60 } // Cache for 60 seconds
  });
  
  return <div>{/* render posts */}</div>;
}

// Dynamic caching with tags
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    next: { 
      revalidate: 3600,
      tags: ['posts'] 
    }
  });
  return res.json();
}

// Revalidate by tag
import { revalidateTag } from 'next/cache';

export async function POST() {
  revalidateTag('posts');
  return Response.json({ revalidated: true });
}

// Cache types in Next.js:
// 1. Build Cache - Static pages cached at build time
// 2. Data Cache - fetch() requests cached
// 3. Full Route Cache - Entire route cached
// 4. Router Cache - Client-side route cache`,
    explanation: "Next.js provides multiple caching strategies to optimize performance at build time, server, and client levels."
  },
  {
    id: 88,
    question: "What is getStaticPaths? When is it required?",
    answer: "getStaticPaths generates dynamic routes at build time. Required for dynamic routes using getStaticProps.",
    example: `// pages/posts/[slug].js
export async function getStaticPaths() {
  // Get all possible post slugs
  const posts = await fetchAllPosts();
  
  const paths = posts.map(post => ({
    params: { slug: post.slug }
  }));
  
  return {
    paths,
    fallback: false // or true, 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const post = await fetchPost(params.slug);
  
  return {
    props: { post },
    revalidate: 3600
  };
}

// Fallback options:
// false: 404 for non-generated paths
// true: Show fallback UI, then load data
// 'blocking': Wait for data before showing page

// With fallback: true
export default function Post({ post }) {
  const router = useRouter();
  
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  
  return <div>{post.title}</div>;
}

// When required:
// ✅ Dynamic routes with getStaticProps
// ✅ [slug].js, [id].js, [...params].js
// ❌ Not needed with getServerSideProps`,
    explanation: "getStaticPaths pre-generates dynamic routes at build time. Use with getStaticProps for static generation of dynamic pages."
  },
  {
    id: 89,
    question: "Why are server components faster?",
    answer: "Server components run on server, reducing bundle size, enabling direct data access, and eliminating client-side rendering overhead.",
    example: `// Server Component - runs on server
async function ServerComponent() {
  // Direct database access (no API needed)
  const posts = await db.posts.findMany();
  
  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}

// Benefits:
// ✅ Zero JavaScript bundle impact
// ✅ Direct data access (database, file system)
// ✅ Server-side rendering by default
// ✅ Better SEO and initial load
// ✅ Automatic code splitting

// Client Component - runs in browser
'use client';

function ClientComponent() {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    // Needs API call
    fetch('/api/posts')
      .then(res => res.json())
      .then(setPosts);
  }, []);
  
  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}

// Performance comparison:
// Server: HTML sent to browser, no JS execution needed
// Client: JS bundle downloaded, executed, then API call made`,
    explanation: "Server components eliminate client-side JavaScript, enable direct data access, and provide better performance and SEO."
  },
  {
    id: 90,
    question: "How routing works in Next.js app router?",
    answer: "App router uses file-system based routing with app/ directory. Folders define routes, special files define UI.",
    example: `// File structure defines routes
app/
├── page.tsx          // / route
├── about/
│   └── page.tsx      // /about route
├── blog/
│   ├── page.tsx      // /blog route
│   └── [slug]/
│       └── page.tsx  // /blog/[slug] route
└── dashboard/
    ├── layout.tsx    // Layout for /dashboard/*
    ├── page.tsx      // /dashboard route
    └── settings/
        └── page.tsx  // /dashboard/settings route

// Special files:
// page.tsx - UI for route
// layout.tsx - Shared UI for segment and children
// loading.tsx - Loading UI
// error.tsx - Error UI
// not-found.tsx - 404 UI
// template.tsx - Re-rendered layout

// Dynamic routes
app/blog/[slug]/page.tsx
function BlogPost({ params }) {
  return <h1>Post: {params.slug}</h1>;
}

// Catch-all routes
app/shop/[...slug]/page.tsx
function ShopPage({ params }) {
  // /shop/clothes/shirts/red
  // params.slug = ['clothes', 'shirts', 'red']
  return <div>Category: {params.slug.join('/')}</div>;
}

// Optional catch-all
app/docs/[[...slug]]/page.tsx
// Matches /docs, /docs/a, /docs/a/b

// Route groups (don't affect URL)
app/(marketing)/about/page.tsx  // /about
app/(shop)/products/page.tsx    // /products`,
    explanation: "App router uses folders for routes and special files for UI. Supports dynamic routes, layouts, and advanced routing patterns."
  },
  {
    id: 91,
    question: "Difference between layout.tsx and page.tsx?",
    answer: "layout.tsx wraps multiple pages with shared UI. page.tsx defines the unique UI for a specific route.",
    example: `// app/layout.tsx - Root layout (required)
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>Global Navigation</nav>
        </header>
        {children} {/* Page content goes here */}
        <footer>Global Footer</footer>
      </body>
    </html>
  );
}

// app/dashboard/layout.tsx - Nested layout
export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard">
      <aside>
        <nav>Dashboard Navigation</nav>
      </aside>
      <main>{children}</main>
    </div>
  );
}

// app/dashboard/page.tsx - Dashboard page
export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard</p>
    </div>
  );
}

// app/dashboard/settings/page.tsx - Settings page
export default function SettingsPage() {
  return (
    <div>
      <h1>Settings</h1>
      <form>Settings form</form>
    </div>
  );
}

// Rendered structure for /dashboard/settings:
// RootLayout
//   └── DashboardLayout
//       └── SettingsPage

// Layout features:
// ✅ Shared across multiple pages
// ✅ State preserved during navigation
// ✅ Can be nested
// ✅ Can fetch data

// Page features:
// ✅ Unique UI for route
// ✅ Can receive params and searchParams
// ✅ Can be server or client component`,
    explanation: "Layouts provide shared UI structure across routes. Pages define route-specific content. Layouts wrap pages and preserve state."
  },
  {
    id: 92,
    question: "How to apply metadata & SEO in Next.js?",
    answer: "Use metadata API in app router or Head component in pages router for SEO optimization.",
    example: `// App Router - Static metadata
// app/page.tsx
export const metadata = {
  title: 'Home Page',
  description: 'Welcome to our website',
  keywords: ['nextjs', 'react', 'seo'],
  openGraph: {
    title: 'Home Page',
    description: 'Welcome to our website',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home Page',
    description: 'Welcome to our website',
    images: ['/twitter-image.jpg'],
  },
};

// Dynamic metadata
// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const post = await fetchPost(params.slug);
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

// Pages Router - Head component
import Head from 'next/head';

function HomePage() {
  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Welcome to our website" />
        <meta name="keywords" content="nextjs,react,seo" />
        <meta property="og:title" content="Home Page" />
        <meta property="og:description" content="Welcome to our website" />
        <meta property="og:image" content="/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://example.com" />
      </Head>
      <h1>Welcome</h1>
    </>
  );
}

// JSON-LD structured data
export default function ProductPage({ product }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
    },
  };
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div>{/* Product content */}</div>
    </>
  );
}`,
    explanation: "Use metadata API for type-safe SEO in app router. Include Open Graph, Twitter cards, and structured data for better search visibility."
  },
  {
    id: 93,
    question: "What is dynamic routing in Next.js?",
    answer: "Dynamic routing creates pages with variable URL segments using brackets in file names like [id].js or [slug].js.",
    example: `// File: pages/posts/[slug].js
function Post({ post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const post = await fetchPost(params.slug);
  return { props: { post } };
}

export async function getStaticPaths() {
  const posts = await fetchAllPosts();
  const paths = posts.map(post => ({ params: { slug: post.slug } }));
  return { paths, fallback: false };
}

// Catch-all routes: [...slug].js
// pages/docs/[...slug].js
function DocsPage({ params }) {
  // /docs/getting-started/installation
  // params.slug = ['getting-started', 'installation']
  return <div>Docs: {params.slug.join('/')}</div>;
}

// Optional catch-all: [[...slug]].js
// Matches /docs and /docs/anything

// App Router dynamic routes
// app/products/[id]/page.tsx
function ProductPage({ params }) {
  return <div>Product ID: {params.id}</div>;
}

// Multiple dynamic segments
// app/shop/[category]/[product]/page.tsx
function ProductPage({ params }) {
  return (
    <div>
      <p>Category: {params.category}</p>
      <p>Product: {params.product}</p>
    </div>
  );
}

// Accessing query parameters
// /products/123?color=red&size=large
function ProductPage({ params, searchParams }) {
  return (
    <div>
      <p>ID: {params.id}</p>
      <p>Color: {searchParams.color}</p>
      <p>Size: {searchParams.size}</p>
    </div>
  );
}`,
    explanation: "Dynamic routes use bracket notation for variable segments. Support single, multiple, and catch-all dynamic segments."
  },
  {
    id: 94,
    question: "What are API routes? How do you use them?",
    answer: "API routes create serverless functions for backend logic. Place in pages/api/ or app/api/ directory.",
    example: `// Pages Router: pages/api/users.js
export default function handler(req, res) {
  if (req.method === 'GET') {
    const users = [{ id: 1, name: 'John' }];
    res.status(200).json(users);
  } else if (req.method === 'POST') {
    const { name, email } = req.body;
    // Save user to database
    res.status(201).json({ id: 2, name, email });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(\`Method \${req.method} Not Allowed\`);
  }
}

// App Router: app/api/users/route.ts
export async function GET() {
  const users = await fetchUsers();
  return Response.json(users);
}

export async function POST(request) {
  const { name, email } = await request.json();
  const user = await createUser({ name, email });
  return Response.json(user, { status: 201 });
}

// Dynamic API routes: app/api/users/[id]/route.ts
export async function GET(request, { params }) {
  const user = await fetchUser(params.id);
  if (!user) {
    return new Response('User not found', { status: 404 });
  }
  return Response.json(user);
}

export async function DELETE(request, { params }) {
  await deleteUser(params.id);
  return new Response(null, { status: 204 });
}

// Middleware for API routes
// app/api/protected/route.ts
export async function GET(request) {
  const token = request.headers.get('authorization');
  
  if (!token) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  const user = await verifyToken(token);
  return Response.json({ user });
}

// Using API routes in components
function UserList() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(setUsers);
  }, []);
  
  const createUser = async (userData) => {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const newUser = await response.json();
    setUsers(prev => [...prev, newUser]);
  };
  
  return <div>{/* Render users */}</div>;
}`,
    explanation: "API routes provide serverless backend functionality. Support all HTTP methods and can access databases, external APIs, and authentication."
  },
  {
    id: 95,
    question: "What is edge runtime?",
    answer: "Edge runtime is a lightweight JavaScript runtime optimized for edge computing with faster cold starts and global distribution.",
    example: `// API route with edge runtime
// app/api/hello/route.ts
export const runtime = 'edge';

export async function GET(request) {
  return new Response('Hello from the edge!', {
    headers: { 'content-type': 'text/plain' },
  });
}

// Edge API with geolocation
export const runtime = 'edge';

export async function GET(request) {
  const country = request.geo?.country || 'Unknown';
  const city = request.geo?.city || 'Unknown';
  
  return Response.json({
    message: \`Hello from \${city}, \${country}!\`,
    timestamp: new Date().toISOString(),
  });
}

// Middleware (always runs on edge)
// middleware.ts
export function middleware(request) {
  const country = request.geo?.country;
  
  if (country === 'CN') {
    return NextResponse.redirect(new URL('/cn', request.url));
  }
  
  return NextResponse.next();
}

// Edge runtime limitations:
// ❌ No Node.js APIs (fs, path, etc.)
// ❌ Limited npm packages
// ❌ No native modules
// ✅ Web APIs (fetch, Response, etc.)
// ✅ Faster cold starts
// ✅ Global distribution

// When to use edge runtime:
// ✅ Simple API logic
// ✅ Authentication checks
// ✅ Redirects and rewrites
// ✅ A/B testing
// ✅ Geolocation-based logic

// Node.js runtime (default)
export const runtime = 'nodejs';

export async function GET() {
  const fs = require('fs');
  const data = fs.readFileSync('data.json', 'utf8');
  return Response.json(JSON.parse(data));
}`,
    explanation: "Edge runtime provides faster cold starts and global distribution but with limited APIs. Use for simple logic and geolocation features."
  },
  {
    id: 96,
    question: "What are static assets in Next.js?",
    answer: "Static assets are files served directly by the web server. Place in public/ directory and reference with absolute paths.",
    example: `// File structure
public/
├── favicon.ico
├── logo.png
├── images/
│   ├── hero.jpg
│   └── profile.png
├── icons/
│   └── arrow.svg
└── documents/
    └── resume.pdf

// Referencing static assets
function HomePage() {
  return (
    <div>
      {/* Images */}
      <img src="/logo.png" alt="Logo" />
      <img src="/images/hero.jpg" alt="Hero" />
      
      {/* Icons */}
      <img src="/icons/arrow.svg" alt="Arrow" />
      
      {/* Documents */}
      <a href="/documents/resume.pdf" download>
        Download Resume
      </a>
      
      {/* Favicon (automatically used) */}
      <link rel="icon" href="/favicon.ico" />
    </div>
  );
}

// Using with Next.js Image component
import Image from 'next/image';

function OptimizedImages() {
  return (
    <div>
      <Image
        src="/images/hero.jpg"
        alt="Hero"
        width={800}
        height={400}
        priority // Load immediately
      />
      
      <Image
        src="/images/profile.png"
        alt="Profile"
        width={200}
        height={200}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,..."
      />
    </div>
  );
}

// CSS background images
.hero {
  background-image: url('/images/hero.jpg');
  background-size: cover;
}

// Manifest and PWA assets
// public/manifest.json
{
  "name": "My App",
  "short_name": "MyApp",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}

// Best practices:
// ✅ Use descriptive file names
// ✅ Optimize images before uploading
// ✅ Use appropriate formats (WebP, AVIF)
// ✅ Organize in subdirectories
// ❌ Don't put sensitive files in public/`,
    explanation: "Static assets in public/ are served directly with absolute paths. Use Next.js Image component for optimization and better performance."
  },
  {
    id: 97,
    question: "How env files work in Next.js?",
    answer: "Environment variables are loaded from .env files. Use NEXT_PUBLIC_ prefix for client-side access.",
    example: `// .env.local (highest priority, ignored by git)
DATABASE_URL=postgresql://localhost:5432/mydb
SECRET_KEY=your-secret-key
NEXT_PUBLIC_API_URL=https://api.example.com

// .env.development (development only)
NEXT_PUBLIC_DEBUG=true
DEBUG_MODE=enabled

// .env.production (production only)
NEXT_PUBLIC_DEBUG=false
DEBUG_MODE=disabled

// .env (default for all environments)
APP_NAME=My Next.js App

// Loading order (highest to lowest priority):
// 1. .env.local
// 2. .env.development / .env.production
// 3. .env

// Server-side usage (API routes, getServerSideProps)
export async function getServerSideProps() {
  const dbUrl = process.env.DATABASE_URL; // Available server-side
  const secretKey = process.env.SECRET_KEY; // Available server-side
  
  return { props: {} };
}

// API route
export default function handler(req, res) {
  const dbUrl = process.env.DATABASE_URL; // Available
  const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Available
  
  res.json({ message: 'Success' });
}

// Client-side usage (components)
function MyComponent() {
  // Only NEXT_PUBLIC_ variables available
  const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Available
  const debugMode = process.env.NEXT_PUBLIC_DEBUG; // Available
  
  // const secretKey = process.env.SECRET_KEY; // undefined on client
  
  return <div>API URL: {apiUrl}</div>;
}

// Runtime configuration (alternative approach)
// next.config.js
module.exports = {
  publicRuntimeConfig: {
    apiUrl: process.env.API_URL,
  },
  serverRuntimeConfig: {
    secretKey: process.env.SECRET_KEY,
  },
};

// Using runtime config
import getConfig from 'next/config';

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

// .gitignore
.env*.local
.env.local

// Environment-specific files to commit:
// .env.example (template)
// .env.development
// .env.production`,
    explanation: "Environment variables with NEXT_PUBLIC_ prefix are available client-side. Server-only variables are accessible in API routes and SSR functions."
  },
  {
    id: 98,
    question: "How to deploy a Next.js app?",
    answer: "Deploy Next.js apps to Vercel (easiest), Netlify, AWS, Docker, or any Node.js hosting platform.",
    example: `// 1. Vercel (Recommended)
// Install Vercel CLI
npm i -g vercel

// Deploy
vercel

// Or connect GitHub repo to Vercel dashboard
// Auto-deploys on push to main branch

// 2. Build for production
npm run build
npm start

// 3. Docker deployment
// Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]

// Build and run
docker build -t my-nextjs-app .
docker run -p 3000:3000 my-nextjs-app

// 4. Static export (for CDN hosting)
// next.config.js
module.exports = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

// Build static files
npm run build
// Outputs to 'out' directory

// 5. AWS deployment with Serverless
// serverless.yml
service: my-nextjs-app

provider:
  name: aws
  runtime: nodejs18.x

plugins:
  - serverless-nextjs-plugin

// Deploy
serverless deploy

// 6. Environment variables for deployment
// .env.production
NEXT_PUBLIC_API_URL=https://api.production.com
DATABASE_URL=postgresql://prod-db-url

// Vercel environment variables
// Set in Vercel dashboard or vercel.json
{
  "env": {
    "DATABASE_URL": "@database-url",
    "SECRET_KEY": "@secret-key"
  }
}

// 7. Custom server deployment
// server.js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});`,
    explanation: "Vercel provides the easiest deployment for Next.js. Other options include Docker, static export, AWS, and custom servers depending on requirements."
  }
];