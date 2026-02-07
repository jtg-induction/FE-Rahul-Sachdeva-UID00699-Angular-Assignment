import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from '@modules/auth/models/auth.models';
import { environment } from 'environments/environment.development';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = environment.baseUrl;
  private readonly http = inject(HttpClient);

  login(payload: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`/users/login`, payload)
      .pipe(tap((res) => localStorage.setItem('token', res.token)));
  }

  register(payload: RegisterRequest): Observable<void> {
    return this.http.post<void>(`/users/register`, payload);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return Boolean(localStorage.getItem('token'));
  }
}
