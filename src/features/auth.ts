export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  dateOfBirth: Date;
  roleNames: string[];
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
}

export interface DecodedToken {
  sub: string;   // username
  type: string;
  iat: number;
  exp: number;
}


export interface User {
  username: string;
}