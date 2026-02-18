import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  ILoginRequest,
  IRegisterRequest,
  LoginResponse,
  RegisterResponse,
} from '@modules/auth/models/auth.model';
import { JwtPayload } from '@modules/auth/models/jwt-payload.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  /**
   * Decodes a JWT token and returns its payload.
   *
   * @param token - The JWT token string.
   *
   * @returns JwtPayload | null - Decoded payload or null if invalid.
   */
  decodeJwt(token: string): JwtPayload | null {
    try {
      const payloadBase64 = token.split('.')[1];
      const decoded = atob(payloadBase64);

      return JSON.parse(decoded) as JwtPayload;
    } catch {
      return null;
    }
  }

  /**
   * Checks whether the current JWT token is expired.
   *
   * @returns boolean - Returns true if the token is expired or invalid.
   */
  isTokenExpired(): boolean {
    try {
      const token = localStorage.getItem('token');
      if (!token) return true;

      const payload = this.decodeJwt(token);
      if (!payload) return true;

      const expiry = payload.exp;

      return Math.floor(Date.now() / 1000) >= expiry;
    } catch {
      return true;
    }
  }

  /**
   * Sends login request and stores JWT token on success.
   *
   * @param payload - The login request body containing username and password.
   *
   * @returns Observable<LoginResponse> - Emits the login response from API.
   */
  login(payload: ILoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>('/users/login', payload)
      .pipe(tap((res) => localStorage.setItem('token', res.data.token)));
  }

  /**
   * Sends user registration request.
   *
   * @param payload - The registration request body.
   *
   * @returns Observable<RegisterResponse> - Emits the register response from API.
   */
  register(payload: IRegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>('/users/register', payload);
  }

  /**
   * Clears the stored authentication token.
   *
   * @returns void
   */
  logout(): void {
    localStorage.removeItem('token');
  }

  /**
   * Determines whether the user is authenticated.
   *
   * @returns boolean - Returns true if token exists and is not expired.
   */
  isAuthenticated(): boolean {
    return !this.isTokenExpired();
  }
}
