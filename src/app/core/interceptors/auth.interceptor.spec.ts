import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '@core/services/auth.service';
import { environment } from '@environments/environment';

import { authInterceptor } from './auth.interceptor';

describe('authInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    authService = jasmine.createSpyObj<AuthService>('AuthService', [
      'isTokenExpired',
    ]);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authService },
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should prefix base URL', () => {
    http.get('/users').subscribe();

    const req = httpMock.expectOne(`${environment.baseUrl}/users`);

    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should attach Authorization header when token is valid', () => {
    localStorage.setItem('token', 'jwt-token');
    authService.isTokenExpired.and.returnValue(false);

    http.get('/users').subscribe();

    const req = httpMock.expectOne(`${environment.baseUrl}/users`);

    expect(req.request.headers.get('Authorization')).toBe('Bearer jwt-token');

    req.flush({});
  });

  it('should not attach Authorization header if token expired', () => {
    localStorage.setItem('token', 'jwt-token');
    authService.isTokenExpired.and.returnValue(true);

    http.get('/users').subscribe();

    const req = httpMock.expectOne(`${environment.baseUrl}/users`);

    expect(req.request.headers.has('Authorization')).toBeFalse();

    req.flush({});
  });
});
