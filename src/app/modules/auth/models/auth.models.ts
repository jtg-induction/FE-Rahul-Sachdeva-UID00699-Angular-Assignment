export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface UserData {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: UserData;
  timestamp: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: number;
      username: string;
      email: string;
      createdAt: string;
      updatedAt: string;
    };
    token: string;
  };
  timestamp: string;
}

export interface UserData {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: UserData;
  timestamp: string;
}
