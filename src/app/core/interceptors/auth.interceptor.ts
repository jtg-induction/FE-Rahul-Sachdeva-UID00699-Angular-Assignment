import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { LoadingService } from '@core/services/loading.service';
import { NotificationService } from '@core/services/notification.service';
import { environment } from '@environments/environment';
import {
  APP_ROUTES,
  ERROR_MESSAGES,
  STATUS_ERROR_MAP,
} from '@shared/constants';
import { catchError, finalize, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const loadingService = inject(LoadingService);
  const notifier = inject(NotificationService);
  const router = inject(Router);

  queueMicrotask(() => loadingService.show());

  const apiRequest = attachBaseUrl(req);
  const authorizedRequest = attachAuthorizationHeader(apiRequest, authService);

  return next(authorizedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      const message = resolveErrorMessage(error);

      notifier.showError(message);

      if (error.status === 401) {
        authService.logout();
        router.navigate(['/', APP_ROUTES.AUTH.BASE, APP_ROUTES.AUTH.LOGIN]);
      }

      return throwError(() => error);
    }),
    finalize(() => queueMicrotask(() => loadingService.hide())),
  );
};
/**
 * Add BaseURL to requst if needed
 * @param req HTTP Request
 * @returns HTTP Request
 */
function attachBaseUrl(
  req: Parameters<HttpInterceptorFn>[0],
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
  authService: AuthService,
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

function resolveErrorMessage(error: HttpErrorResponse): string {
  const errorResponse = error.error ?? {};

  if (typeof errorResponse.error === 'string') {
    return errorResponse.error;
  }

  if (
    Array.isArray(errorResponse.error) &&
    typeof errorResponse.error[0] === 'string'
  ) {
    return errorResponse.error.join(', ');
  }

  if (
    Array.isArray(errorResponse.error) &&
    typeof errorResponse.error[0] === 'object'
  ) {
    return errorResponse.error
      .map((err: Record<string, string>) => Object.values(err).join(', '))
      .join(', ');
  }

  if (STATUS_ERROR_MAP[error.status]) {
    return STATUS_ERROR_MAP[error.status];
  }

  if (errorResponse.message) {
    return errorResponse.message;
  }

  return ERROR_MESSAGES.GENERIC;
}
