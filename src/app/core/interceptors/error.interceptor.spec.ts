import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NotificationService } from '@core/services/notification.service';
import { ERROR_MESSAGES } from '@shared/constants/messages.constants';

import { errorInterceptor } from './error.interceptor';

describe('ErrorInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let notifier: jasmine.SpyObj<NotificationService>;

  beforeEach(() => {
    notifier = jasmine.createSpyObj('NotificationService', ['showError']);

    TestBed.configureTestingModule({
      providers: [
        { provide: NotificationService, useValue: notifier },
        provideHttpClient(withInterceptors([errorInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  function expectError(status: number, expectedMessage: string): void {
    http.get('/api/test').subscribe({
      next: () => fail('Expected request to fail'),
      error: (err) => expect(err).toBeTruthy(),
    });

    const req = httpMock.expectOne('/api/test');

    if (status === 0) {
      req.error(new ProgressEvent('error'));
    } else {
      req.flush(null, { status, statusText: 'Error' });
    }

    expect(notifier.showError).toHaveBeenCalledWith(expectedMessage);
  }

  const cases: [number, string][] = [
    [0, ERROR_MESSAGES.NETWORK],
    [400, ERROR_MESSAGES.VALIDATION_ISSUE],
    [401, ERROR_MESSAGES.UNAUTHORIZED],
    [403, ERROR_MESSAGES.FORBIDDEN],
    [404, ERROR_MESSAGES.NOT_FOUND],
    [409, ERROR_MESSAGES.ALREADY_EXISTS],
    [429, ERROR_MESSAGES.TOO_MANY_REQUESTS],
    [500, ERROR_MESSAGES.GENERIC],
  ];

  cases.forEach(([status, message]) => {
    it(`handles HTTP ${status} error`, () => {
      expectError(status, message);
    });
  });

  it('falls back to error.message for unmapped status', () => {
    expectError(418, 'Http failure response for /api/test: 418 Error');
  });
});
