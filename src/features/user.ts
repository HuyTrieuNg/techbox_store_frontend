// User feature module
// src/features/user.ts

export interface Address {
  id: number;
  streetAddress: string;
  ward: string;
  district: string;
  city: string;
  postalCode: string;
  isDefault: boolean;
  addressType: string;
}

export interface User {
  id: number;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  phone: string;
  addresses?: Address[];
  dateOfBirth: Date;
  roles: string[];
  isActive: boolean;
  isLocked: boolean;
  createdAt: string;
}

export interface UserResponse {
  content: User[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface UserCreateRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: Date;
  roleNames: string[]; // Backend expects 'roleNames', not 'roles'
}

export interface UpdatePasswordData {
  email: string;
  password: string;
  newPassword: string;
}