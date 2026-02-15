import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '@environments/environment.development';
import { LoginRequest, LoginResponse } from '@modules/auth/models/auth.model';

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
      username: 'test@test.com',
      password: '123456',
    };

    const response: LoginResponse = {
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: '2',
          username: 'hero',
          email: 'hero@gmail.com',
          createdAt: '2026-02-05 15:58:06',
          updatedAt: '2026-02-05 15:58:06',
        },
        token: 'jwt-token',
      },
      timestamp: '2026-02-10T07:47:54.823Z',
    };

    service.login(payload).subscribe((res) => {
      expect(res.data.token).toBe('jwt-token');
      expect(localStorage.getItem('token')).toBe('jwt-token');
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/users/login`);
    req.flush(response);
  });

  it('logs out and clears token', () => {
    localStorage.setItem('token', 'jwt-token');

    service.logout();

    expect(localStorage.getItem('token')).toBeNull();
  });

  it('returns authentication status', () => {
    expect(service.isAuthenticated()).toBeFalse();
    localStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoiaGVybyIsImlhdCI6MTc3MDg3Njc4MiwiZXhwIjoxNzcxNDgxNTgyLCJpc3MiOiJhcnRpY2xlLXNlcnZpY2UifQ.mwhotYXlfmLY6riRWUNxqKpjLpTmF9rEvb-h2h5em7E'
    );
    expect(service.isAuthenticated()).toBeTrue();
  });
});
