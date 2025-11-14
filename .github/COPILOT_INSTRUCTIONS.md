# Next.js Development Guidelines

## Overview
Guidelines for writing maintainable, scalable Next.js code with clear structure and best practices.

## 1. Project Structure

### 1.1. Directory Structure
```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Route groups
│   ├── (shop)/            # Public routes
│   ├── admin/             # Admin routes
│   └── api/               # API routes
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── common/           # Shared components
│   ├── admin/            # Admin-specific components
│   └── [feature]/        # Feature-specific components
├── contexts/             # React contexts
├── features/             # Feature-based modules
├── hooks/                # Custom hooks
├── lib/                  # Utilities & configurations
├── services/             # API services
├── types/                # TypeScript types
└── utils/                # Helper functions
```

### 1.2. Organization Principles
- **Feature-based**: Group code by feature (auth, cart, product)
- **Component composition**: Break down components into smaller parts
- **Separation of concerns**: Separate logic, UI, and data

## 2. Components & UI

### 2.1. Use shadcn/ui
```tsx
// ✅ Use shadcn Button
import { Button } from "@/components/ui/button";
<Button variant="default" size="sm">Click me</Button>

// ❌ Avoid creating basic components
<button className="px-4 py-2 bg-blue-500 text-white rounded">Click me</button>
```

### 2.2. Component Patterns
- **Atomic Design**: Atoms → Molecules → Organisms → Pages
- **Container/Presentational**: Logic in containers, UI in presentational components

### 2.3. Component Rules
- PascalCase for component names
- camelCase for instances
- Define clear props interfaces
- Use default parameters instead of defaultProps

## 3. State Management

### 3.1. Local State
```tsx
// ✅ Sử dụng useState cho local state
const [count, setCount] = useState(0);

// ✅ Sử dụng useReducer cho complex state
const [state, dispatch] = useReducer(reducer, initialState);
```

### 3.2. Global State
```tsx
// ✅ Context + useReducer cho app-wide state
const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### 3.3. Server State
```tsx
// ✅ SWR hoặc React Query cho server state
const { data, error, mutate } = useSWR('/api/products', fetcher);
```

## 4. Data Fetching

### 4.1. API Structure
```tsx
// services/api.ts
export const api = {
  products: {
    getAll: () => apiClient.get('/products'),
    getById: (id: number) => apiClient.get(`/products/${id}`),
    create: (data: ProductCreate) => apiClient.post('/products', data),
  },
  users: {
    getProfile: () => apiClient.get('/users/profile'),
  }
};
```

### 4.2. Custom Hooks
```tsx
// ✅ Tạo custom hooks cho logic phức tạp
const useProducts = () => {
  const { data, error, mutate } = useSWR('/api/products', fetcher);

  return {
    products: data,
    isLoading: !error && !data,
    error,
    mutate
  };
};
```

## 5. Styling

### 5.1. Tailwind CSS
```tsx
// ✅ Sử dụng utility classes
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">

// ✅ Responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// ✅ Dark mode support
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
```

### 5.2. CSS Modules (nếu cần)
```tsx
// styles/Button.module.css
.button {
  @apply px-4 py-2 rounded bg-blue-500 text-white;
}

// components/Button.tsx
import styles from './Button.module.css';

const Button = () => <button className={styles.button}>Click</button>;
```

## 6. TypeScript

### 6.1. Type Definitions
```tsx
// ✅ Định nghĩa types rõ ràng
interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
}

// ✅ Generic types
interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}
```

### 6.2. Type Safety
```tsx
// ✅ Strict typing
const handleSubmit = (user: User) => {
  // TypeScript biết user có những property gì
};

// ✅ Union types cho variants
type ButtonVariant = 'primary' | 'secondary' | 'danger';
```

## 7. Performance

### 7.1. Code Splitting
```tsx
// ✅ Dynamic imports
const AdminPanel = dynamic(() => import('@/components/AdminPanel'), {
  loading: () => <div>Loading...</div>
});

// ✅ Route-based splitting (Next.js tự động)
```

### 7.2. Image Optimization
```tsx
// ✅ Sử dụng Next.js Image component
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero"
  width={800}
  height={600}
  priority
/>
```

### 7.3. Memoization
```tsx
// ✅ Memo cho expensive computations
const expensiveValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

// ✅ Memo cho components
const ProductCard = memo(({ product }) => <div>{product.name}</div>);
```

## 8. Testing

### 8.1. Component Testing
```tsx
// ✅ Test user interactions
import { render, screen, fireEvent } from '@testing-library/react';

test('button click', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);

  fireEvent.click(screen.getByText('Click me'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### 8.2. Custom Hook Testing
```tsx
// ✅ Test hooks với @testing-library/react-hooks
import { renderHook } from '@testing-library/react-hooks';

test('useCounter', () => {
  const { result } = renderHook(() => useCounter());

  expect(result.current.count).toBe(0);
  act(() => result.current.increment());
  expect(result.current.count).toBe(1);
});
```

## 9. Error Handling

### 9.1. Error Boundaries
```tsx
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}
```

### 9.2. API Error Handling
```tsx
// ✅ Centralized error handling
const apiClient = axios.create();

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Redirect to login
    }
    return Promise.reject(error);
  }
);
```

## 10. Security

### 10.1. Input Validation
```tsx
// ✅ Validate inputs
import { z } from 'zod';

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const validateUser = (data: unknown) => {
  return userSchema.parse(data);
};
```

### 10.2. Authentication
```tsx
// ✅ Protect routes
import { withAuth } from '@/lib/auth';

export default withAuth(function ProtectedPage() {
  return <div>Protected content</div>;
});
```

## 11. Code Quality

### 11.1. ESLint Rules
```json
{
  "extends": ["next/core-web-vitals", "@typescript-eslint/recommended"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

### 11.2. Prettier Configuration
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

## 12. Git Workflow

### 12.1. Commit Messages
```
feat: add user authentication
fix: resolve login bug
docs: update API documentation
style: format code with prettier
refactor: simplify component logic
test: add unit tests for utils
```

### 12.2. Branch Naming
```
feature/user-authentication
bugfix/login-validation
hotfix/critical-security-patch
```

## 13. Deployment

### 13.1. Environment Variables
```env
# .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
```

### 13.2. Build Optimization
```js
// next.config.js
module.exports = {
  images: {
    domains: ['cdn.example.com'],
  },
  experimental: {
    optimizeCss: true,
  },
};
```

## 14. Error Handling & Toast Notifications

### 14.1. Toast Notifications Setup

The project uses `react-hot-toast` for user-friendly notifications. Always show appropriate feedback for user actions.

```tsx
// ✅ Import toast
import toast from 'react-hot-toast';

// ✅ Success notifications
toast.success('Product added to cart!');

// ✅ Error notifications  
toast.error('Failed to add product to cart');

// ✅ Loading states
const promise = api.post('/cart/items', data);
toast.promise(promise, {
  loading: 'Adding to cart...',
  success: 'Added to cart!',
  error: 'Failed to add to cart'
});
```

### 14.2. API Error Handling Patterns

#### Client Component API Calls:
```tsx
'use client';

import { api } from '@/lib/axios';
import toast from 'react-hot-toast';

const handleAddToCart = async (productId: number) => {
  try {
    await api.post('/cart/items', { productId, quantity: 1 });
    toast.success('Added to cart successfully!');
  } catch (error: any) {
    console.error('Add to cart error:', error);
    
    // Show user-friendly error message
    const message = error?.response?.data?.message || 'Failed to add to cart';
    toast.error(message);
  }
};
```

#### Server Component API Calls:
```tsx
// Server components handle errors differently
export default async function DashboardPage() {
  try {
    const user = await serverApi.get('/api/users/me');
    
    if (!user) {
      redirect('/login');
    }
    
    return <Dashboard user={user} />;
  } catch (error) {
    console.error('Dashboard error:', error);
    // Server errors are logged, client handles redirects
    redirect('/error');
  }
}
```

#### Form Submissions with Toast:
```tsx
'use client';

import { useState } from 'react';
import { api } from '@/lib/axios';
import toast from 'react-hot-toast';

const LoginForm = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: LoginData) => {
    setLoading(true);
    
    try {
      const response = await api.post('/auth/login', data);
      
      // Store token, redirect, etc.
      toast.success('Login successful!');
      
      // Redirect after success
      router.push('/dashboard');
      
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Handle different error types
      if (error?.response?.status === 401) {
        toast.error('Invalid email or password');
      } else if (error?.response?.status === 429) {
        toast.error('Too many attempts. Please try again later.');
      } else {
        toast.error('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit" disabled={loading}>
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
};
```

### 14.3. Using Available API Instances

#### Axios Instance (`@/lib/axios`):
```tsx
'use client';

import { api } from '@/lib/axios';

// Features:
// - Auto sends cookies (withCredentials: true)
// - Auto prefixes URLs with /api/proxy
// - Auto extracts response.data
// - Type-safe with generics
// - Centralized error handling

const getProducts = async () => {
  return await api.get<Product[]>('/products');
};

const createProduct = async (data: ProductCreate) => {
  return await api.post<Product>('/products', data);
};

const updateProduct = async (id: number, data: ProductUpdate) => {
  return await api.put<Product>(`/products/${id}`, data);
};

const deleteProduct = async (id: number) => {
  return await api.delete(`/products/${id}`);
};
```

#### Server API Instance (`@/lib/server-api`):
```tsx
// For server components and authenticated SSR
import { serverApi } from '@/lib/server-api';

// Features:
// - Direct backend calls (no proxy)
// - Auto token refresh via middleware
// - Type-safe with generics
// - Returns null on auth errors

export default async function ProfilePage() {
  const user = await serverApi.get<User>('/users/me');
  
  if (!user) {
    redirect('/login');
  }
  
  return <Profile user={user} />;
}
```

#### Fetch for Public Data:
```tsx
// For server components with public data
export default async function ProductsPage() {
  const res = await fetch('http://localhost:8000/api/products/public', {
    next: { revalidate: 300 } // Cache 5 minutes
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  
  const products = await res.json();
  return <ProductList products={products} />;
}
```

### 14.4. Error Boundary Pattern

```tsx
// components/ErrorBoundary.tsx
'use client';

import { Component, ReactNode } from 'react';
import toast from 'react-hot-toast';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
    toast.error('Something went wrong. Please refresh the page.');
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-4 bg-red-50 border border-red-200 rounded">
          <h2 className="text-red-800 font-semibold">Something went wrong</h2>
          <p className="text-red-600">Please refresh the page and try again.</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

### 14.5. Loading States with Toast

```tsx
'use client';

import { useState } from 'react';
import { api } from '@/lib/axios';
import toast from 'react-hot-toast';

const DataExporter = () => {
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    if (exporting) return;
    
    setExporting(true);
    
    const exportPromise = api.get('/data/export', {
      responseType: 'blob',
    });
    
    toast.promise(exportPromise, {
      loading: 'Preparing export...',
      success: (response) => {
        // Download file
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'export.xlsx');
        document.body.appendChild(link);
        link.click();
        link.remove();
        
        return 'Export completed successfully!';
      },
      error: 'Export failed. Please try again.',
    });
    
    try {
      await exportPromise;
    } catch (error) {
      console.error('Export error:', error);
    } finally {
      setExporting(false);
    }
  };

  return (
    <button 
      onClick={handleExport} 
      disabled={exporting}
      className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
    >
      {exporting ? 'Exporting...' : 'Export Data'}
    </button>
  );
};
```

### 14.6. Global Error Handler

```tsx
// lib/error-handler.ts
import toast from 'react-hot-toast';

export const handleApiError = (error: any, defaultMessage = 'An error occurred') => {
  console.error('API Error:', error);
  
  let message = defaultMessage;
  
  if (error?.response) {
    const { status, data } = error.response;
    
    switch (status) {
      case 400:
        message = data?.message || 'Invalid request';
        break;
      case 401:
        message = 'Please log in to continue';
        // Optionally redirect to login
        break;
      case 403:
        message = 'You do not have permission to perform this action';
        break;
      case 404:
        message = 'The requested resource was not found';
        break;
      case 429:
        message = 'Too many requests. Please try again later';
        break;
      case 500:
        message = 'Server error. Please try again later';
        break;
      default:
        message = data?.message || defaultMessage;
    }
  } else if (error?.request) {
    message = 'Network error. Please check your connection';
  }
  
  toast.error(message);
  return message;
};
```

### 14.7. Best Practices for Error Handling

#### Always provide user feedback:
```tsx
// ✅ GOOD: User sees feedback
const handleSave = async () => {
  try {
    await api.put('/profile', data);
    toast.success('Profile updated successfully!');
  } catch (error) {
    handleApiError(error, 'Failed to update profile');
  }
};

// ❌ BAD: Silent failure
const handleSave = async () => {
  try {
    await api.put('/profile', data);
  } catch (error) {
    console.error(error); // User doesn't know
  }
};
```

#### Use appropriate toast types:
```tsx
// Success for completed actions
toast.success('Order placed successfully!');

// Error for failures
toast.error('Failed to place order');

// Info for notifications
toast('Your session expires in 5 minutes', { icon: '⚠️' });

// Loading for async operations
toast.loading('Processing payment...');
```

#### Handle loading states properly:
```tsx
const [loading, setLoading] = useState(false);

const handleSubmit = async () => {
  setLoading(true);
  
  try {
    await api.post('/submit', data);
    toast.success('Submitted successfully!');
  } catch (error) {
    handleApiError(error);
  } finally {
    setLoading(false);
  }
};
```

#### Use error boundaries for unexpected errors:
```tsx
// app/layout.tsx
import ErrorBoundary from '@/components/ErrorBoundary';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
```