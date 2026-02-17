import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, inject, Injectable } from '@angular/core';
import { NotificationService } from '@core/services/notification.service';
import { ERROR_MESSAGES } from '@shared/constants';

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
    const message = ERROR_MESSAGES.GENERIC;

    if (error instanceof HttpErrorResponse) {
      return;
    } else {
      console.error('Global Error:', error);
    }

    this.notifier.showError(message);
  }
}
