import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

/**
 * Allows access only to unauthenticated users.
 *
 * If the user is already authenticated, it redirects to the home page.
 *
 * @returns true if not authenticated, otherwise a UrlTree redirecting to home.
 */
export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated() ? router.createUrlTree(['/']) : true;
};
