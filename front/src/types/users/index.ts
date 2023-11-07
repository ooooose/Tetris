export interface UserInfo {
  name: string;
  score: number;
}

export interface User {
  name: string;
  email: string;
  password: string;
}

export interface AuthUser {
  email: string;
  password: string;
}

export interface CsrfToken {
  csrf_token: string;
}

