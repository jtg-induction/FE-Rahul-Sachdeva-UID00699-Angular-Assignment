import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private snackBar = inject(MatSnackBar);
  private isOpen = false;

  showError(message: string): void {
    this.openOnce(message);
  }

  showSuccess(message: string): void {
    this.openOnce(message);
  }

  private openOnce(message: string): void {
    if (this.isOpen) return;
    this.isOpen = false;
    this.snackBar
      .open(message, 'Close', {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      })
      .afterDismissed()
      .subscribe(() => {
        this.isOpen = false;
      });
  }
}
