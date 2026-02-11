import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, inject, Injectable } from '@angular/core';
import { NotificationService } from '@core/services/notification.service';
import { ERROR_MESSAGES } from '@shared/constants/messages.constants';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private notifier = inject(NotificationService);

  /**
   * The core method used to handle when an error occurs.
   *
   * @param error - The error object thrown by the application.
   *
   * @returns void
   *
   * @example
   * triggered using:
   * throw new Error('Something went wrong!');
   */
  handleError(error: unknown): void {
    let message = ERROR_MESSAGES.GENERIC;

    if (error instanceof HttpErrorResponse) {
      if (!navigator.onLine) {
        message = ERROR_MESSAGES.NETWORK;
      } else {
        message = `HTTP Error: ${error.status}`;
      }
      console.error(message);
    } else if (error instanceof Error) {
      message = error.message;
      console.error('Global Error:', error);
    } else {
      console.error('Unknown error:', error);
    }

    this.notifier.showError(message);
  }
}
