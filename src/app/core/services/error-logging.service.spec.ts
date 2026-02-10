import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ErrorLoggingService } from '@core/services/error-logging.service';

describe('ErrorLoggingService', () => {
  let service: ErrorLoggingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorLoggingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('logs generic errors to console', () => {
    const consoleSpy = spyOn(console, 'error');
    const error = new Error('Test error');

    service.logError(error);

    expect(consoleSpy).toHaveBeenCalled();
    expect(consoleSpy.calls.mostRecent().args).toContain(error);
  });

  it('logs HTTP errors with metadata', () => {
    const consoleSpy = spyOn(console, 'error');

    const httpError = new HttpErrorResponse({
      status: 500,
      statusText: 'Server Error',
      url: '/api/test',
    });

    service.logHttpError(httpError, '/api/test');

    expect(consoleSpy).toHaveBeenCalled();
  });
});
