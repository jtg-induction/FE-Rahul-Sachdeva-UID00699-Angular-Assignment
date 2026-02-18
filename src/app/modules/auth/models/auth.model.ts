import { ApiResponse } from '@shared/models/api-response.model';

import { IAuthUser } from './auth-user.model';

export interface ILoginRequest {
  username: string;
  password: string;
}

export interface IRegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface ILoginResponseData {
  user: IAuthUser;
  token: string;
}

export type LoginResponse = ApiResponse<ILoginResponseData>;
export type RegisterResponse = ApiResponse<IAuthUser>;
