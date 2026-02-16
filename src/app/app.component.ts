import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { LoadingService } from '@core/services/loading.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly loadingService = inject(LoadingService);
  private readonly destroy$ = new Subject<void>();

  /**
   * Global loading state observable.
   * Used in template to control loader visibility.
   */
  readonly isLoading$ = this.loadingService.isLoading$;

  /**
   * Initializes router event listeners
   * to manage navigation-level loading state.
   */
  ngOnInit(): void {
    this.handleNavigationLoading();
  }

  /**
   * Cleans up router subscription.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Subscribes to router events and triggers
   * loading state updates accordingly.
   */
  private handleNavigationLoading(): void {
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      if (event instanceof NavigationStart) {
        queueMicrotask(() => this.loadingService.show());
      }

      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        queueMicrotask(() => this.loadingService.hide());
      }
    });
  }
}
