// User feature module (example)
// export interface User {
//   id: number;
//   username: string;
//   email: string;
// }
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
  // id: number;
  // username: string;
  // email: string;
  // addresses?: Address[];
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  addresses?: Address[];
  dateOfBirth: Date;
}

export interface UpdatePasswordData {
  email: string;
  password: string;
  newPassword: string;
}