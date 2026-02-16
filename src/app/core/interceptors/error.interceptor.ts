import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/modules/auth/services/auth.service';
import { STATUS_ERROR_MAP } from '@app/shared/constants';
import { NotificationService } from '@core/services/notification.service';
import { ERROR_MESSAGES } from '@shared/constants/messages';
import { catchError, throwError } from 'rxjs';

/**
 * A functional interceptor that handles HTTP-level errors.
 *
 * @param req - The outgoing {@link HttpRequest}.
 * @param next - The next {@link HttpHandlerFn} in the interceptor chain.
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notifier = inject(NotificationService);
  const authService = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const message = resolveErrorMessage(error);

      notifier.showError(message);

      if (error.status === 401) {
        authService.logout();
        router.navigate(['/auth/login']);
      }

      return throwError(() => error);
    })
  );
};

/**
 * Resolves error message based on received error
 * @param error HttpErrorResponse Object
 * @returns error message
 */
function resolveErrorMessage(error: HttpErrorResponse): string {
  const errorResponse = error.error;
  console.log(errorResponse);
  if (typeof errorResponse.error === 'string') {
    return errorResponse.error;
  } else if (
    Array.isArray(errorResponse.error) &&
    typeof errorResponse.error[0] === 'string'
  ) {
    return errorResponse.error.join(', ');
  } else if (
    Array.isArray(errorResponse.error) &&
    typeof errorResponse.error[0] === 'object'
  ) {
    return errorResponse.error
      .map((err: Record<string, string>) => {
        return Object.values(err).join(',');
      })
      .join(', ');
  } else if (STATUS_ERROR_MAP[errorResponse.status]) {
    return STATUS_ERROR_MAP[errorResponse.status];
  } else if (errorResponse.message) {
    return errorResponse.message;
  }

  return ERROR_MESSAGES.GENERIC;
}
