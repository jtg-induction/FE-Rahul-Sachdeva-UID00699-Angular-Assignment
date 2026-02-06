import { ErrorHandler, inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorLoggingService } from '@app/core/services/error-logging.service';
import { NotificationService } from '@app/core/services/notification.service';
import { ERROR_MESSAGES } from '@shared/constants/messages.constants';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private notifier = inject(NotificationService);
  private logger = inject(ErrorLoggingService);

  handleError(error: unknown): void {
    let message = ERROR_MESSAGES.GENERIC;

    if (error instanceof HttpErrorResponse) {
      if (!navigator.onLine) {
        message = ERROR_MESSAGES.NETWORK;
      } else {
        message = `HTTP Error: ${error.status}`;
      }
    } else if (error instanceof Error) {
      message = error.message;
      console.error('Global Error:', error);
    } else {
      console.error('Unknown error:', error);
    }

    this.notifier.showError(message);

    this.logger.logError(error, 'GlobalErrorHandler');
  }
}
