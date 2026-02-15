import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '@modules/auth/models/auth.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  isTokenExpired(): boolean {
    try {
      const token = localStorage.getItem('token');
      if (!token) return true;

      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp;

      return Math.floor(Date.now() / 1000) >= expiry;
    } catch {
      return true;
    }
  }

  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>('/users/login', payload)
      .pipe(tap((res) => localStorage.setItem('token', res.data.token)));
  }

  register(payload: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>('/users/register', payload);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !this.isTokenExpired();
  }
}
