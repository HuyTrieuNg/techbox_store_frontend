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
 * Logic: Chỉ ROLE_CUSTOMER về trang chủ (/), tất cả role khác đều vào /admin
 * 
 * @param user - User object hoặc null
 * @returns Redirect path string
 */
export const getRedirectPathByRole = (user: User | null | undefined): string => {
  if (!user || !user.roles || user.roles.length === 0) {
    return '/';
  }

  // Nếu user CHỈ có role CUSTOMER → về trang chủ
  // Tất cả các role khác (ADMIN, STAFF, custom roles) → về /admin
  const hasOnlyCustomerRole = 
    user.roles.length === 1 && 
    user.roles[0] === 'ROLE_CUSTOMER';
  
  if (hasOnlyCustomerRole) {
    return '/';
  }

  // Default: tất cả role khác đều vào trang admin
  return '/admin';
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
