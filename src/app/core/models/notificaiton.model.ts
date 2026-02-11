import { MatSnackBarConfig } from '@angular/material/snack-bar';

export enum NotificationType {
  Success = 'success',
  Error = 'error',
}

export interface AppNotification {
  message: string;
  type: NotificationType;
  config?: MatSnackBarConfig;
}
