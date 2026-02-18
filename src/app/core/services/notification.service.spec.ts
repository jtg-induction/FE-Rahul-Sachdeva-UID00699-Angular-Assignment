import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackbarComponent } from '@shared/components/snackbar';
import { of } from 'rxjs';

import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  let snackBar: jasmine.SpyObj<MatSnackBar>;
  let snackBarRef: jasmine.SpyObj<MatSnackBarRef<SnackbarComponent>>;

  beforeEach(() => {
    snackBarRef = jasmine.createSpyObj('MatSnackBarRef', ['afterDismissed']);

    snackBarRef.afterDismissed.and.returnValue(
      of({ dismissedByAction: false }),
    );

    snackBar = jasmine.createSpyObj('MatSnackBar', ['openFromComponent']);

    snackBar.openFromComponent.and.returnValue(snackBarRef);

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
});
