// src/types/user.ts
export interface User {
  // id: string;
  // [key: string]: unknown;
}

export interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}