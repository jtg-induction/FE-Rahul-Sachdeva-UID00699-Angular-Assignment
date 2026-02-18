import { ErrorHandler } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NotificationService } from '@core/services/notification.service';

import { GlobalErrorHandler } from './global-error.handler';

describe('GlobalErrorHandler', () => {
  let handler: ErrorHandler;
  let notifier: jasmine.SpyObj<NotificationService>;

  beforeEach(() => {
    notifier = jasmine.createSpyObj<NotificationService>(
      'NotificationService',
      ['showError'],
    );

    TestBed.configureTestingModule({
      providers: [
        {
          provide: NotificationService,
          useValue: notifier,
        },
        {
          provide: ErrorHandler,
          useClass: GlobalErrorHandler,
        },
      ],
    });

    handler = TestBed.inject(ErrorHandler);
  });
  it('shows error snackbar for runtime error', () => {
    const error = new Error('Runtime error');
    handler.handleError(error);

    expect(notifier.showError).toHaveBeenCalled();
  });
});
