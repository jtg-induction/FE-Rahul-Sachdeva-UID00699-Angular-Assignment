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
import { ErrorLoggingService } from '@core/services/error-logging.service';
import { NotificationService } from '@core/services/notification.service';
import { ERROR_MESSAGES } from '@shared/constants/messages.constants';

import { errorInterceptor } from './error.interceptor';

describe('ErrorInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let notifier: jasmine.SpyObj<NotificationService>;
  let logger: jasmine.SpyObj<ErrorLoggingService>;

  beforeEach(() => {
    notifier = jasmine.createSpyObj('NotificationService', ['showError']);
    logger = jasmine.createSpyObj('ErrorLoggingService', ['logHttpError']);

    TestBed.configureTestingModule({
      providers: [
        { provide: NotificationService, useValue: notifier },
        { provide: ErrorLoggingService, useValue: logger },
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
      error: (_err) => {
        expect(_err).toBeTruthy();
      },
    });

    const req = httpMock.expectOne('/api/test');

    if (status === 0) {
      req.error(new ProgressEvent('error'));
    } else {
      req.flush(null, { status, statusText: 'Error' });
    }

    expect(notifier.showError).toHaveBeenCalledWith(expectedMessage);
    expect(logger.logHttpError).toHaveBeenCalled();
  }

  it('handles error.message fallback', () => {
    expectError(418, 'Http failure response for /api/test: 418 Error');
  });

  it('handles network error (status 0)', () => {
    expectError(0, ERROR_MESSAGES.NETWORK);
  });

  it('handles 400 validation error', () => {
    expectError(400, ERROR_MESSAGES.VALIDATION_ISSUE);
  });

  it('handles 401 unauthorized error', () => {
    expectError(401, ERROR_MESSAGES.UNAUTHORIZED);
  });

  it('handles 403 forbidden error', () => {
    expectError(403, ERROR_MESSAGES.FORBIDDEN);
  });

  it('handles 404 not found error', () => {
    expectError(404, ERROR_MESSAGES.NOT_FOUND);
  });

  it('handles 409 conflict error', () => {
    expectError(409, ERROR_MESSAGES.ALREADY_EXISTS);
  });

  it('handles 429 too many requests error', () => {
    expectError(429, ERROR_MESSAGES.TOO_MANY_REQUESTS);
  });

  it('handles 500 server error', () => {
    expectError(500, ERROR_MESSAGES.GENERIC);
  });
});
