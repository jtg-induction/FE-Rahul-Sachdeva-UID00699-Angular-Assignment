import { ApiResponse } from '@shared/models/api-response.model';

import { AuthUser } from './auth-user.model';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginResponseData {
  user: AuthUser;
  token: string;
}

export type LoginResponse = ApiResponse<LoginResponseData>;
export type RegisterResponse = ApiResponse<AuthUser>;
