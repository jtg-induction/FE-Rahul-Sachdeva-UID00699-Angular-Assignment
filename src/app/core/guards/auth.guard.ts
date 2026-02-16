import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';

/**
 * Allows access only to authenticated users.
 *
 * If the user is not authenticated, it redirects to the login page.
 *
 * @returns true if authenticated, otherwise a UrlTree redirecting to login.
 */
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }
  return router.createUrlTree(['/auth/login']);
};
