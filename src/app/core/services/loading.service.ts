import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private activeProcesses = 0;

  private readonly loadingSubject = new BehaviorSubject<boolean>(false);

  readonly isLoading$: Observable<boolean> = this.loadingSubject.asObservable();

  /**
   * Increments loading counter and shows loader.
   */
  show(): void {
    this.activeProcesses++;

    if (this.activeProcesses === 1) {
      this.loadingSubject.next(true);
    }
  }

  /**
   * Decrements loading counter and hides loader if no active processes remain.
   */
  hide(): void {
    if (this.activeProcesses > 0) {
      this.activeProcesses--;
    }

    if (this.activeProcesses === 0) {
      this.loadingSubject.next(false);
    }
  }
}
