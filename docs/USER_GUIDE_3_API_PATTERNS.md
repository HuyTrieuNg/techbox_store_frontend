# 📖 Hướng Dẫn Sử Dụng: 3 Cách Gọi API

**Version:** 3.2.0  
**Date:** November 7, 2025  
**Audience:** Developers

---

## 🎯 Tổng Quan

Project sử dụng **3 patterns** để gọi backend API, mỗi pattern phù hợp với một use case cụ thể:

```
1️⃣ Client Component → Axios → Proxy → Backend
2️⃣ Server Component → fetch → Backend (Public APIs)
3️⃣ Server Component → serverApi → Backend (Authenticated APIs)
```

---

## 🔍 Khi Nào Dùng Pattern Nào?

### Decision Tree:

```
Bạn đang code trong component nào?
    │
    ├─ Client Component ('use client')
    │   └─→ Dùng Pattern 1 (axios)
    │
    └─ Server Component (default)
        │
        └─ API cần authentication?
            │
            ├─ Không → Pattern 2 (fetch + cache)
            └─ Có   → Pattern 3 (serverApi)
```

### Quick Reference Table:

| Use Case | Pattern | Tool | Example |
|----------|---------|------|---------|
| Button onClick | 1 | `api.post()` | Add to cart |
| Form submit | 1 | `api.post()` | User registration |
| Public products list | 2 | `fetch()` | Homepage products |
| SEO landing page | 2 | `fetch()` | Blog posts |
| User dashboard | 3 | `serverApi.get()` | My profile |
| Order history | 3 | `serverApi.get()` | My orders |

---

## 1️⃣ Pattern 1: Client Component + Axios

### 📝 Khi nào dùng?
- User interactions (click, submit, input)
- Client-side rendering
- Realtime updates
- Forms
- Authenticated requests

### 💻 Cách dùng:

#### Import:
```typescript
'use client';
import { api } from '@/lib/axios';
```

#### GET Request:
```typescript
async function fetchProducts() {
  const products = await api.get<Product[]>('/products');
  console.log(products);
}
```

#### POST Request:
```typescript
async function createOrder(data: OrderData) {
  const order = await api.post<Order>('/orders', data);
  return order;
}
```

#### PUT/PATCH Request:
```typescript
async function updateProfile(data: ProfileData) {
  await api.put('/users/me', data);
}
```

#### DELETE Request:
```typescript
async function deleteItem(id: number) {
  await api.delete(`/cart/items/${id}`);
}
```

### 🎯 Full Example:

```tsx
'use client';

import { useState } from 'react';
import { api } from '@/lib/axios';

interface Product {
  id: number;
  name: string;
  price: number;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await api.get<Product[]>('/products');
      setProducts(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: number) => {
    try {
      await api.post('/cart/items', { productId, quantity: 1 });
      alert('Added to cart!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add to cart');
    }
  };

  return (
    <div>
      <button onClick={loadProducts} disabled={loading}>
        {loading ? 'Loading...' : 'Load Products'}
      </button>
      
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => addToCart(product.id)}>
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### ✅ Lợi ích:
- ✅ Auto send cookies (authentication)
- ✅ Auto prefix `/api/proxy`
- ✅ Auto extract `response.data`
- ✅ Type-safe với generics
- ✅ Error handling tự động

---

## 💾 Cache cho Client Component với SWR

### 📝 Tại sao cần cache?
- Giảm số lượng requests đến server
- UI phản hồi nhanh hơn (instant từ cache)
- Automatic revalidation (refresh data in background)
- Optimistic UI updates

### 🚀 Cài đặt SWR:

```bash
npm install swr
```

### 💻 Cách dùng:

#### Basic Example:
```tsx
'use client';

import useSWR from 'swr';
import { api } from '@/lib/axios';

interface Product {
  id: number;
  name: string;
  price: number;
}

export default function ProductList() {
  const { data, error, isLoading } = useSWR<Product[]>(
    '/products',
    (url) => api.get(url)
  );

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <ul>
      {data?.map(product => (
        <li key={product.id}>
          {product.name} - ${product.price}
        </li>
      ))}
    </ul>
  );
}
```

#### With Mutation (Add to Cart):
```tsx
'use client';

import useSWR, { mutate } from 'swr';
import { api } from '@/lib/axios';

export default function ProductList() {
  const { data: products } = useSWR<Product[]>(
    '/products',
    (url) => api.get(url)
  );

  const addToCart = async (productId: number) => {
    try {
      await api.post('/cart/items', { productId, quantity: 1 });
      
      // Revalidate cart data
      mutate('/cart');
      
      alert('Added to cart!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add to cart');
    }
  };

  return (
    <ul>
      {products?.map(product => (
        <li key={product.id}>
          {product.name} - ${product.price}
          <button onClick={() => addToCart(product.id)}>
            Add to Cart
          </button>
        </li>
      ))}
    </ul>
  );
}
```

#### Full Example với Optimistic Update:
```tsx
'use client';

import useSWR, { mutate } from 'swr';
import { api } from '@/lib/axios';

interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  product: {
    name: string;
    price: number;
  };
}

export default function Cart() {
  const { data: items, error, isLoading } = useSWR<CartItem[]>(
    '/cart/items',
    (url) => api.get(url),
    {
      refreshInterval: 0, // Don't auto-refresh
      revalidateOnFocus: false, // Don't refresh on window focus
    }
  );

  const updateQuantity = async (itemId: number, newQuantity: number) => {
    // Optimistic update
    mutate(
      '/cart/items',
      items?.map(item => 
        item.id === itemId 
          ? { ...item, quantity: newQuantity } 
          : item
      ),
      false // Don't revalidate immediately
    );

    try {
      await api.patch(`/cart/items/${itemId}`, { quantity: newQuantity });
      // Revalidate to get actual server state
      mutate('/cart/items');
    } catch (error) {
      console.error('Error:', error);
      // Rollback on error
      mutate('/cart/items');
    }
  };

  const deleteItem = async (itemId: number) => {
    // Optimistic update
    mutate(
      '/cart/items',
      items?.filter(item => item.id !== itemId),
      false
    );

    try {
      await api.delete(`/cart/items/${itemId}`);
      mutate('/cart/items');
    } catch (error) {
      console.error('Error:', error);
      mutate('/cart/items');
    }
  };

  if (error) return <div>Error loading cart</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Shopping Cart</h1>
      {items?.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <ul>
          {items?.map(item => (
            <li key={item.id}>
              <h3>{item.product.name}</h3>
              <p>Price: ${item.product.price}</p>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                min="1"
              />
              <button onClick={() => deleteItem(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

### ⚙️ SWR Configuration Options:

```typescript
useSWR(key, fetcher, {
  // Thời gian dedupe requests (ms) - default: 2000
  dedupingInterval: 2000,
  
  // Tự động refresh khi focus window - default: true
  revalidateOnFocus: true,
  
  // Tự động refresh khi reconnect - default: true
  revalidateOnReconnect: true,
  
  // Auto refresh mỗi X ms - default: 0 (disabled)
  refreshInterval: 5000,
  
  // Refresh khi mount component - default: true
  revalidateOnMount: true,
  
  // Số lần retry khi error - default: 3
  errorRetryCount: 3,
  
  // Thời gian đợi giữa các retry (ms) - default: 5000
  errorRetryInterval: 5000,
  
  // Keep previous data while loading new data - default: false
  keepPreviousData: true,
})
```

### 🎯 Common Patterns:

#### 1. Global Config (Recommended):
```tsx
// app/providers.tsx
'use client';

import { SWRConfig } from 'swr';
import { api } from '@/lib/axios';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => api.get(url),
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        errorRetryCount: 2,
        dedupingInterval: 2000,
      }}
    >
      {children}
    </SWRConfig>
  );
}
```

```tsx
// app/layout.tsx
import { Providers } from './providers';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

#### 2. Dependent Fetching:
```tsx
function UserProfile({ userId }: { userId: number }) {
  // Fetch user first
  const { data: user } = useSWR(`/users/${userId}`, api.get);
  
  // Then fetch user's orders (only if user exists)
  const { data: orders } = useSWR(
    user ? `/users/${userId}/orders` : null,
    api.get
  );

  return (
    <div>
      <h1>{user?.name}</h1>
      <ul>
        {orders?.map(order => (
          <li key={order.id}>Order #{order.id}</li>
        ))}
      </ul>
    </div>
  );
}
```

#### 3. Infinite Loading (Pagination):
```tsx
import useSWRInfinite from 'swr/infinite';

function ProductList() {
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null; // reached end
    return `/products?page=${pageIndex + 1}`; // API key
  };

  const { data, size, setSize, isLoading } = useSWRInfinite(
    getKey,
    api.get
  );

  const products = data ? data.flat() : [];
  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined');

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
      <button
        onClick={() => setSize(size + 1)}
        disabled={isLoadingMore}
      >
        {isLoadingMore ? 'Loading...' : 'Load More'}
      </button>
    </div>
  );
}
```

### ✅ Best Practices:

#### 1. Use SWR for GET requests only:
```tsx
// ✅ GOOD: Read-only data
useSWR('/products', api.get);

// ❌ BAD: Don't use SWR for POST/PUT/DELETE
useSWR('/orders', () => api.post('/orders', data)); // Wrong!
```

#### 2. Combine SWR with mutations:
```tsx
// ✅ GOOD: SWR for reading, api for writing
const { data: products } = useSWR('/products', api.get);

const createProduct = async (data: ProductData) => {
  await api.post('/products', data);
  mutate('/products'); // Refresh SWR cache
};
```

#### 3. Use keys consistently:
```tsx
// ✅ GOOD: Same key for same data
useSWR('/products', api.get);
mutate('/products'); // This will work

// ❌ BAD: Different keys
useSWR('/products', api.get);
mutate('/api/products'); // This won't work (different key)
```

### 📊 Cache Strategy Summary:

| Scenario | SWR Config | Example |
|----------|------------|---------|
| Realtime data | `refreshInterval: 5000` | Stock prices, chat |
| Static data | `revalidateOnFocus: false` | Product catalog |
| User-specific | `revalidateOnMount: true` | Cart, profile |
| Background updates | `refreshInterval: 30000` | Notifications |

---

## 2️⃣ Pattern 2: Server Component + fetch (Public)

### 📝 Khi nào dùng?
- Public data (không cần auth)
- SEO-critical pages
- Data có thể cache lâu
- Homepage, landing pages
- Blog posts, product listings

### 💻 Cách dùng:

#### Basic GET:
```typescript
export default async function ProductsPage() {
  const res = await fetch('http://localhost:8000/api/products/public');
  const products = await res.json();
  
  return <ProductList products={products} />;
}
```

#### With Cache (Recommended):
```typescript
export default async function ProductsPage() {
  // Cache 1 hour
  const res = await fetch('http://localhost:8000/api/products/public', {
    next: { revalidate: 3600 }
  });
  
  const products = await res.json();
  return <ProductList products={products} />;
}
```

#### With Error Handling:
```typescript
export default async function ProductsPage() {
  const res = await fetch('http://localhost:8000/api/products/public', {
    next: { revalidate: 3600 }
  });
  
  if (!res.ok) {
    return <div>Error loading products</div>;
  }
  
  const products = await res.json();
  return <ProductList products={products} />;
}
```

### 🎯 Full Example:

```tsx
// app/products/page.tsx

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

interface Category {
  id: number;
  name: string;
}

async function getCategories(): Promise<Category[]> {
  const res = await fetch('http://localhost:8000/api/categories', {
    next: { revalidate: 600 } // Cache 10 mins
  });
  return res.json();
}

async function getProducts(): Promise<Product[]> {
  const res = await fetch('http://localhost:8000/api/products/public', {
    next: { revalidate: 300 } // Cache 5 mins
  });
  return res.json();
}

export default async function ProductsPage() {
  // Parallel fetch
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  return (
    <div>
      <aside>
        <h2>Categories</h2>
        <ul>
          {categories.map(cat => (
            <li key={cat.id}>{cat.name}</li>
          ))}
        </ul>
      </aside>

      <main>
        <h1>Products</h1>
        <div className="grid">
          {products.map(product => (
            <div key={product.id}>
              <img src={product.imageUrl} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
```

### ⚙️ Cache Options:

```typescript
// No cache (always fresh)
fetch(url, { cache: 'no-store' })

// Cache 1 hour
fetch(url, { next: { revalidate: 3600 } })

// Cache forever
fetch(url, { cache: 'force-cache' })

// Revalidate on each request (ISR)
fetch(url, { next: { revalidate: 0 } })
```

### ✅ Lợi ích:
- ✅ Server-side rendering (SEO friendly)
- ✅ Next.js Data Cache (fast page load)
- ✅ No authentication overhead
- ✅ Direct to backend (no proxy hop)

---

## 3️⃣ Pattern 3: Server Component + serverApi (Authenticated)

### 📝 Khi nào dùng?
- Private user data
- Authenticated SSR pages
- Dashboard, profile pages
- Order history
- Admin panels

### 💻 Cách dùng:

#### Import:
```typescript
import { serverApi } from '@/utils/serverFetcher';
import { redirect } from 'next/navigation';
```

#### GET Request:
```typescript
export default async function DashboardPage() {
  const user = await serverApi.get('/api/users/me');
  
  if (!user) {
    redirect('/login');
  }
  
  return <div>Welcome, {user.name}</div>;
}
```

#### POST Request:
```typescript
async function createOrder(data: OrderData) {
  const order = await serverApi.post('/api/orders', data);
  return order;
}
```

### 🎯 Full Example:

```tsx
// app/dashboard/page.tsx

import { serverApi } from '@/utils/serverFetcher';
import { redirect } from 'next/navigation';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Order {
  id: number;
  total: number;
  status: string;
  createdAt: string;
}

export default async function DashboardPage() {
  // Parallel authenticated requests
  const [user, orders] = await Promise.all([
    serverApi.get<User>('/api/users/me'),
    serverApi.get<Order[]>('/api/orders'),
  ]);

  // Redirect if not authenticated
  if (!user || !orders) {
    redirect('/login');
  }

  return (
    <div>
      <header>
        <h1>Dashboard</h1>
        <p>Welcome, {user.name}</p>
      </header>

      <section>
        <h2>Your Orders</h2>
        {orders.length === 0 ? (
          <p>No orders yet</p>
        ) : (
          <ul>
            {orders.map(order => (
              <li key={order.id}>
                Order #{order.id} - ${order.total} - {order.status}
                <br />
                <small>{new Date(order.createdAt).toLocaleDateString()}</small>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
```

### ✅ Lợi ích:
- ✅ Direct backend call (50% faster than proxy)
- ✅ Middleware auto-refresh token
- ✅ Type-safe với generics
- ✅ Simple error handling (return null)
- ✅ Clean code

---

## ⚠️ Common Mistakes

### ❌ DON'T: Use axios in Server Components
```tsx
// BAD!
import { api } from '@/lib/axios';

export default async function Page() {
  const data = await api.get('/products'); // ❌ Won't work
}
```

### ✅ DO: Use fetch or serverApi
```tsx
// GOOD!
export default async function Page() {
  // Option 1: Public data
  const res = await fetch('http://backend/api/products/public');
  const data = await res.json();
  
  // Option 2: Authenticated data
  const user = await serverApi.get('/api/users/me');
}
```

### ❌ DON'T: Cache authenticated data
```tsx
// BAD!
const user = await serverApi.get('/api/users/me', {
  next: { revalidate: 3600 } // ❌ Don't cache user data
});
```

### ✅ DO: Use no-store for private data
```tsx
// GOOD!
const user = await serverApi.get('/api/users/me', {
  cache: 'no-store' // ✅ Always fresh
});
```

---

## 🎓 Best Practices

### 1️⃣ Pattern 1 (Client):
- ✅ Use for all user interactions
- ✅ Perfect for forms, buttons, realtime
- ✅ Let SWR handle caching
- ❌ Don't use for initial page load (bad for SEO)

### 2️⃣ Pattern 2 (Server + fetch):
- ✅ Use for public pages (SEO important)
- ✅ Always set cache strategy
- ✅ Use absolute URLs
- ❌ Don't use for authenticated data

### 3️⃣ Pattern 3 (Server + serverApi):
- ✅ Use for private SSR pages
- ✅ Perfect for dashboards, admin
- ✅ Combine with Pattern 1 for interactivity
- ❌ Don't cache authenticated data

---

## 🔍 Troubleshooting

### Problem: "api is not defined"
**Solution:** Check if you're in Client Component
```tsx
'use client'; // ← Add this!
import { api } from '@/lib/axios';
```

### Problem: "serverApi.get is not a function"
**Solution:** Check if you're in Server Component (không có 'use client')

### Problem: 401 Unauthorized
**Solution:**
- Pattern 1: Check if logged in
- Pattern 3: Token auto-refreshed by middleware, should work

### Problem: Data not updating
**Solution:**
- Pattern 1: Check SWR revalidation
- Pattern 2: Reduce cache time or use `cache: 'no-store'`
- Pattern 3: Check if using correct endpoint

---

## 📚 More Resources

- [API_CALLING_PATTERNS.md](./API_CALLING_PATTERNS.md) - Complete guide with examples
- [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) - Quick cheatsheet
- [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) - Technical details

---

**Happy Coding!** 🚀
