import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NotificationService } from '@core/services/notification.service';
import { ERROR_MESSAGES } from '@shared/constants/messages.constants';
import { catchError, throwError } from 'rxjs';

const STATUS_ERROR_MAP: Record<number, string> = {
  0: ERROR_MESSAGES.NETWORK,
  400: ERROR_MESSAGES.VALIDATION_ISSUE,
  401: ERROR_MESSAGES.UNAUTHORIZED,
  403: ERROR_MESSAGES.FORBIDDEN,
  404: ERROR_MESSAGES.NOT_FOUND,
  409: ERROR_MESSAGES.ALREADY_EXISTS,
  429: ERROR_MESSAGES.TOO_MANY_REQUESTS,
  500: ERROR_MESSAGES.GENERIC,
};

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notifier = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const message = resolveErrorMessage(error);

      console.log(message);
      notifier.showError(message);

      return throwError(() => error);
    })
  );
};

function resolveErrorMessage(error: HttpErrorResponse): string {
  if (typeof error.error === 'string') {
    return error.error;
  } else if (Array.isArray(error.error) && error.error.length > 0) {
    return error.error.join(', ');
  } else if (STATUS_ERROR_MAP[error.status]) {
    return STATUS_ERROR_MAP[error.status];
  } else if (error.message) {
    return error.message;
  }

  return ERROR_MESSAGES.GENERIC;
}
