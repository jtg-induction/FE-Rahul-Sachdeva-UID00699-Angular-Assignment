import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthResponse, LoginRequest } from '@modules/auth/models/auth.models';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('logs in and stores token', () => {
    const payload: LoginRequest = {
      email: 'test@test.com',
      password: '123456',
    };

    const response: AuthResponse = {
      token: 'jwt-token',
    };

    service.login(payload).subscribe((res) => {
      expect(res.token).toBe('jwt-token');
      expect(localStorage.getItem('token')).toBe('jwt-token');
    });

    const req = httpMock.expectOne('/users/login');
    req.flush(response);
  });

  it('logs out and clears token', () => {
    localStorage.setItem('token', 'jwt-token');

    service.logout();

    expect(localStorage.getItem('token')).toBeNull();
  });

  it('returns authentication status', () => {
    expect(service.isAuthenticated()).toBeFalse();
    localStorage.setItem('token', 'jwt-token');
    expect(service.isAuthenticated()).toBeTrue();
  });
});
