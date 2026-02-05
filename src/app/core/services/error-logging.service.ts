import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorLoggingService {
  logError(error: unknown, context?: string): void {
    console.error('[Error]: ', context, error);
  }

  logHttpError(error: unknown, url?: string): void {
    console.error('[HTTP Error]: ', url, error);
  }
}
