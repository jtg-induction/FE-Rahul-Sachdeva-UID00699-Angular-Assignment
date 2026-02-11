import { inject, Injectable, OnDestroy } from '@angular/core';
import { MatSnackBar, MatSnackBarDismiss } from '@angular/material/snack-bar';
import { AppNotification } from '@core/models/notificaiton.model';
import { concatMap, Observable, Subject, takeUntil } from 'rxjs';

import { DEFAULT_SNACKBAR_CONFIG } from './notification.config';

@Injectable({
  providedIn: 'root',
})
export class NotificationService implements OnDestroy {
  private snackBar = inject(MatSnackBar);

  private destroy$ = new Subject<void>();
  private notificationQueue$ = new Subject<AppNotification>();

  constructor() {
    this.notificationQueue$
      .pipe(
        concatMap((notification) => this.open(notification)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  /**
   * Displays an error message using a snackbar notification.
   * @param message - The error message or HTTP error description to display.
   */
  showError(message: string): void {
    this.enqueue({
      message,
      type: 'error',
    });
  }

  /**
   * Displays a success message using a snackbar notification.
   * @param message - The success message to display.
   */
  showSuccess(message: string): void {
    this.enqueue({
      message,
      type: 'success',
    });
  }

  /**
   * Adds a notification to the queue for sequential display.
   * Ensures that multiple triggers are handled gracefully without overlapping.
   *
   * @param notification - The notification object containing message, type, and optional config.
   * @private
   */
  private enqueue(notification: AppNotification): void {
    this.notificationQueue$.next(notification);
  }

  /**
   * Triggers the MatSnackBar to display a specific notification.
   * Maps the notification type to the appropriate global CSS panel class.
   *
   * @param notification - The notification data to be rendered.
   * @returns An Observable that emits when the snackbar has been dismissed.
   * @private
   */
  private open(notification: AppNotification): Observable<MatSnackBarDismiss> {
    const panelClass =
      notification.type === 'error'
        ? 'snackbar-design-error'
        : 'snackbar-design-success';

    const ref = this.snackBar.open(notification.message, 'Close', {
      ...DEFAULT_SNACKBAR_CONFIG,
      ...notification.config,
      panelClass: [panelClass],
    });

    return ref.afterDismissed();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
