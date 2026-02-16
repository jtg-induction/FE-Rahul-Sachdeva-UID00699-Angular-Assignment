import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { LoadingService } from '@core/services/loading.service';
import { environment } from '@environments/environment';
import { finalize } from 'rxjs';

/**
 * 1. Base URL prefix
 * 2. Add Authorization header (if token exists)
 * @param req HTTP Request
 * @returns HTTP Request
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const loader = inject(LoadingService);

  queueMicrotask(() => loader.show());

  const apiRequest = attachBaseUrl(req);
  const authorizedRequest = attachAuthorizationHeader(apiRequest, authService);

  return next(authorizedRequest).pipe(
    finalize(() => queueMicrotask(() => loader.hide()))
  );
};

/**
 * Add BaseURL to requst if needed
 * @param req HTTP Request
 * @returns HTTP Request
 */
function attachBaseUrl(
  req: Parameters<HttpInterceptorFn>[0]
): HttpRequest<unknown> {
  if (req.url.startsWith('http')) {
    return req;
  }

  return req.clone({
    url: `${environment.baseUrl}${req.url}`,
  });
}

/**
 * Add Authorization header if token exists
 * @param req HTTP Request
 * @param authService To check token expiry
 * @returns HTTP Request
 */
function attachAuthorizationHeader(
  req: Parameters<HttpInterceptorFn>[0],
  authService: AuthService
): HttpRequest<unknown> {
  const token = localStorage.getItem('token');

  if (!token || authService.isTokenExpired()) {
    return req;
  }

  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
}
