export interface UserInfo {
  id: number;
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
