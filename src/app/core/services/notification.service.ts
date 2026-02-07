import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private snackBar = inject(MatSnackBar);
  private isOpen = false;

  /**
   * Displays an error message using a snackbar notification.
   * @param message - The error message or HTTP error description to display.
   */
  showError(message: string): void {
    this.openOnce(message);
  }

  /**
   * Displays a success message using a snackbar notification.
   * @param message - The success message to display.
   */
  showSuccess(message: string): void {
    this.openOnce(message);
  }

  /**
   * Opens a single snackbar instance at a time to prevent UI stacking.
   * Configures the snackbar to appear at the top-right for 5 seconds.
   *
   * @param message - The content to be displayed in the snackbar.
   * @private
   */
  private openOnce(message: string): void {
    if (this.isOpen) return;
    this.isOpen = true;
    const config = new MatSnackBarConfig();
    config.panelClass = ['snackbar-design'];
    config.duration = 5000;
    config.horizontalPosition = 'right';
    config.verticalPosition = 'bottom';

    this.snackBar
      .open(message, 'Close', config)
      .afterDismissed()
      .subscribe(() => {
        this.isOpen = false;
      });
  }
}
