import { TestBed } from '@angular/core/testing';
import {
  MatSnackBar,
  MatSnackBarDismiss,
  MatSnackBarRef,
  SimpleSnackBar,
} from '@angular/material/snack-bar';
import { of } from 'rxjs';

import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  let snackBar: jasmine.SpyObj<MatSnackBar>;
  let snackBarRef: jasmine.SpyObj<MatSnackBarRef<SimpleSnackBar>>;

  beforeEach(() => {
    snackBarRef = jasmine.createSpyObj<MatSnackBarRef<SimpleSnackBar>>(
      'MatSnackBarRef',
      ['afterDismissed']
    );

    snackBarRef.afterDismissed.and.returnValue(
      of<MatSnackBarDismiss>({ dismissedByAction: false })
    );

    snackBar = jasmine.createSpyObj<MatSnackBar>('MatSnackBar', ['open']);
    snackBar.open.and.callFake(() => snackBarRef);

    TestBed.configureTestingModule({
      providers: [
        NotificationService,
        { provide: MatSnackBar, useValue: snackBar },
      ],
    });

    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('shows error snackbar with error styling', () => {
    service.showError('Error message');

    const config = snackBar.open.calls.mostRecent().args[2];
    expect(config?.panelClass).toContain('snackbar-design-error');
  });

  it('shows success snackbar with success styling', () => {
    service.showSuccess('Success message');

    const config = snackBar.open.calls.mostRecent().args[2];
    expect(config?.panelClass).toContain('snackbar-design-success');
  });
});
