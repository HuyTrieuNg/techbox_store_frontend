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
  dateOfBirth?: Date;
  roles?: string[];
  createdAt?: string;
  updatedAt?: string;
  isActive?: boolean;
}

export interface UserResponse {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  roles?: string[];
  createdAt?: string;
  updatedAt?: string;
  isActive?: boolean;
}

export interface PagedUserResponse {
  content: UserResponse[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface UserCreateRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  roles?: string[];
}

export interface UserUpdateRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export interface UpdatePasswordData {
  email: string;
  password: string;
  newPassword: string;
}