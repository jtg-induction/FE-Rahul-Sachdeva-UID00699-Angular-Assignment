import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { ErrorLoggingService } from '@app/core/services/error-logging.service';
import { ERROR_MESSAGES } from '@shared/constants/messages.constants';
import { NotificationService } from '@app/core/services/notification.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notifier = inject(NotificationService);
  const logger = inject(ErrorLoggingService);

  return next(req).pipe(
    retry({ count: 3, delay: 1000 }),
    catchError((error: HttpErrorResponse) => {
      let message = ERROR_MESSAGES.GENERIC;

      if (error.status === 0) {
        message = ERROR_MESSAGES.NETWORK;
      } else if (error.status === 401) {
        message = ERROR_MESSAGES.UNAUTHORIZED;
      } else if (error.status === 403) {
        message = ERROR_MESSAGES.FORBIDDEN;
      } else if (error.status === 404) {
        message = ERROR_MESSAGES.NOT_FOUND;
      } else if (error.error?.message) {
        message = error.error.message;
      }

      notifier.showError(message);

      logger.logHttpError(error, req.url);

      return throwError(() => error);
    })
  );
};
