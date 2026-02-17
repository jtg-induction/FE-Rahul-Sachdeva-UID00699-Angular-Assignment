import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { APP_ROUTES } from '@shared/constants';

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

  return authService.isAuthenticated()
    ? true
    : router.createUrlTree(['/', APP_ROUTES.AUTH.BASE, APP_ROUTES.AUTH.SIGNUP]);
};
