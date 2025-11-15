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
  }
];