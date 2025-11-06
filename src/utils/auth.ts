/**
 * Auth Utility Functions
 * 
 * Pure functions để xử lý authentication logic
 * - Reusable: Dùng ở nhiều nơi
 * - Testable: Pure function, dễ test
 * - Single source of truth: Logic tập trung 1 chỗ
 */

interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  authenticated: boolean;
  roles: string[];
}

export type UserRole = 'ROLE_ADMIN' | 'ROLE_STAFF' | 'ROLE_CUSTOMER';

/**
 * Lấy redirect path mặc định theo role của user
 * Priority: Admin > Staff > Customer
 * 
 * @param user - User object hoặc null
 * @returns Redirect path string
 */
export const getRedirectPathByRole = (user: User | null | undefined): string => {
  if (!user || !user.roles || user.roles.length === 0) {
    return '/';
  }

  // Priority: Admin > Staff > Customer
  if (user.roles.includes('ROLE_ADMIN')) {
    return '/admin';
  }
  
  if (user.roles.includes('ROLE_STAFF')) {
    return '/staff';
  }
  
  if (user.roles.includes('ROLE_CUSTOMER')) {
    return '/';
  }

  // Default fallback
  return '/';
};

/**
 * Check if user has specific role
 */
export const hasRole = (user: User | null | undefined, role: UserRole): boolean => {
  if (!user || !user.roles) return false;
  return user.roles.includes(role);
};

/**
 * Check if user is admin
 */
export const isAdmin = (user: User | null | undefined): boolean => {
  return hasRole(user, 'ROLE_ADMIN');
};

/**
 * Check if user is staff
 */
export const isStaff = (user: User | null | undefined): boolean => {
  return hasRole(user, 'ROLE_STAFF');
};

/**
 * Check if user is customer
 */
export const isCustomer = (user: User | null | undefined): boolean => {
  return hasRole(user, 'ROLE_CUSTOMER');
};
