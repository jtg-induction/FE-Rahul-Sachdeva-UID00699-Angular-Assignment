import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/modules/auth/services/auth.service';
import { STATUS_ERROR_MAP } from '@app/shared/constants';
import { NotificationService } from '@core/services/notification.service';
import { ERROR_MESSAGES } from '@shared/constants/messages';
import { catchError, EMPTY } from 'rxjs';

/**
 * A functional interceptor that handles HTTP-level errors.
 *
 * @remarks
 * This interceptor performs:
 * Logs technical details via {@link ErrorLoggingService}.
 *
 * @param req - The outgoing {@link HttpRequest} object.
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
      return EMPTY;
    })
  );
};

function resolveErrorMessage(error: HttpErrorResponse): string {
  const errorResponse = error.error;
  if (typeof errorResponse.error === 'string') {
    return errorResponse.error;
  } else if (
    Array.isArray(errorResponse.error) &&
    errorResponse.error.length > 0
  ) {
    return errorResponse.error.join(', ');
  } else if (STATUS_ERROR_MAP[errorResponse.status]) {
    return STATUS_ERROR_MAP[errorResponse.status];
  } else if (errorResponse.message) {
    return errorResponse.message;
  }

  return ERROR_MESSAGES.GENERIC;
}
