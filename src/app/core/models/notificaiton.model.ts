import { MatSnackBarConfig } from '@angular/material/snack-bar';

export type NotificationType = 'success' | 'error';

export interface AppNotification {
  message: string;
  type: NotificationType;
  config?: MatSnackBarConfig;
}
