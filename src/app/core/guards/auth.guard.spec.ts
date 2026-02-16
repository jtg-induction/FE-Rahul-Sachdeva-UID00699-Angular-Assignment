import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { APP_ROUTES } from '@shared/constants';

import { authGuard } from './auth.guard';

describe('authGuard', () => {
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let mockRoute: ActivatedRouteSnapshot;
  let mockState: RouterStateSnapshot;

  beforeEach(() => {
    authService = jasmine.createSpyObj<AuthService>('AuthService', [
      'isAuthenticated',
    ]);

    router = jasmine.createSpyObj<Router>('Router', ['createUrlTree']);

    mockRoute = {} as ActivatedRouteSnapshot;
    mockState = { url: '/protected' } as RouterStateSnapshot;

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
      ],
    });
  });

  it('should allow access when authenticated', () => {
    authService.isAuthenticated.and.returnValue(true);

    const result = TestBed.runInInjectionContext(() =>
      authGuard(mockRoute, mockState)
    );

    expect(result).toBeTrue();
  });

  it('should return UrlTree when not authenticated', () => {
    const mockTree = {} as UrlTree;

    authService.isAuthenticated.and.returnValue(false);
    router.createUrlTree.and.returnValue(mockTree);

    const result = TestBed.runInInjectionContext(() =>
      authGuard(mockRoute, mockState)
    );

    expect(router.createUrlTree).toHaveBeenCalledWith([
      '/',
      APP_ROUTES.AUTH.BASE,
      APP_ROUTES.AUTH.SIGNUP,
    ]);
    expect(result).toBe(mockTree);
  });
});
