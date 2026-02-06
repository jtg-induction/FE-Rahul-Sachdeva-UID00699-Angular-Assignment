import { TestBed } from '@angular/core/testing';

import { ErrorLoggingService } from '@app/core/services/error-logging.service';

describe('ErrorLoggingService', () => {
  let service: ErrorLoggingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorLoggingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
