// User feature module (example)
// export interface User {
//   id: number;
//   username: string;
//   email: string;
// }
// src/features/user.ts

export interface Address {
  id: number;
  user_id: number;
  street: string;
  city: string;
  country: string;
  postal_code: string;
  is_default: boolean;
}

export interface User {
  // id: number;
  // username: string;
  // email: string;
  // addresses?: Address[];
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  dateOfBirth: Date;
}