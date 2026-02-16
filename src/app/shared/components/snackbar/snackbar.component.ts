import { Component, inject } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss',
})
export class SnackbarComponent {
  snackBarData: { message: string; action: string; variant: string } =
    inject(MAT_SNACK_BAR_DATA);
  snackBarRef: MatSnackBarRef<{
    message: string;
    action: string;
    variant: string;
  }> = inject(MatSnackBarRef);
}
