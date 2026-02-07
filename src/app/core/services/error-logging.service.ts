import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorLoggingService {
  /**
   * logs error to the console
   * @param error - The error object.
   * @param context - The name of the component or service where the error originated.
   */
  logError(error: unknown, context?: string): void {
    console.error('[Error]: ', context, error);
  }

  /**
   * logs failed Http Requests
   * @param error the error object.
   * @param url - The endpoint URL that triggered the user
   */
  logHttpError(error: unknown, url?: string): void {
    console.error('[HTTP Error]: ', url, error);
  }
}
