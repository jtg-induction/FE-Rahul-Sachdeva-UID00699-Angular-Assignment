import { inject, Injectable, OnDestroy } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarDismiss,
  MatSnackBarRef,
  TextOnlySnackBar,
} from '@angular/material/snack-bar';
import {
  AppNotification,
  NotificationType,
} from '@app/core/models/notification.model';
import { concatMap, Observable, Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService implements OnDestroy {
  private snackBar = inject(MatSnackBar);
  private destroy$ = new Subject<void>();
  private notificationQueue$ = new Subject<AppNotification>();
  private ref: MatSnackBarRef<TextOnlySnackBar> | null = null;

  private readonly DEFAULT_DURATION = 5000;

  /**
   * Initializes the notification queue listener.
   * Uses concatMap to ensure notifications wait for the previous one to dismiss.
   */
  constructor() {
    this.notificationQueue$
      .pipe(
        concatMap((notification) => this.open(notification)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
  /**
   * Cleans up subscriptions and completes subjects when the service is destroyed.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Displays an error message using a snackbar notification.
   * @param message - The error message or HTTP error description to display.
   */
  showError(message: string): void {
    this.enqueue({
      message,
      type: NotificationType.Error,
    });
  }

  /**
   * Displays a success message using a snackbar notification.
   * @param message - The success message to display.
   */
  showSuccess(message: string): void {
    this.enqueue({
      message,
      type: NotificationType.Success,
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
    this.ref?._dismissAfter(1);
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

    const config = new MatSnackBarConfig();

    config.duration = notification.config?.duration ?? this.DEFAULT_DURATION;

    config.horizontalPosition = 'right';
    config.verticalPosition = 'bottom';
    config.panelClass = [panelClass];

    this.ref = this.snackBar.open(notification.message, 'Close', config);

    return this.ref.afterDismissed();
  }
}
