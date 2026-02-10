import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ErrorLoggingService } from '@core/services/error-logging.service';
import { NotificationService } from '@core/services/notification.service';
import { ERROR_MESSAGES } from '@shared/constants/messages.constants';
import { catchError, throwError } from 'rxjs';

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
  const logger = inject(ErrorLoggingService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = ERROR_MESSAGES.GENERIC;

      if (error.error && typeof error.error === 'string') {
        message = error.error;
      } else if (error.error && Array.isArray(error.error)) {
        message = error.error[0];
      } else if (error.status === 0) {
        message = ERROR_MESSAGES.NETWORK;
      } else if (error.status === 400) {
        message = ERROR_MESSAGES.VALIDATION_ISSUE;
      } else if (error.status === 401) {
        message = ERROR_MESSAGES.UNAUTHORIZED;
      } else if (error.status === 403) {
        message = ERROR_MESSAGES.FORBIDDEN;
      } else if (error.status === 404) {
        message = ERROR_MESSAGES.NOT_FOUND;
      } else if (error.status === 409) {
        message = ERROR_MESSAGES.ALREADY_EXISTS;
      } else if (error.status === 429) {
        message = ERROR_MESSAGES.TOO_MANY_REQUESTS;
      } else if (error.status >= 500) {
        message = ERROR_MESSAGES.GENERIC;
      } else if (error.message) {
        message = error.message;
      }

      notifier.showError(message);
      logger.logHttpError(error, req.url);

      return throwError(() => error);
    })
  );
};
