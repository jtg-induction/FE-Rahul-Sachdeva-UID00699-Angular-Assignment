import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';

import { guestGuard } from './guest.guard';

describe('guestGuard', () => {
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
    mockState = { url: '/auth/login' } as RouterStateSnapshot;

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
      ],
    });
  });

  it('should allow access for guest', () => {
    authService.isAuthenticated.and.returnValue(false);

    const result = TestBed.runInInjectionContext(() =>
      guestGuard(mockRoute, mockState)
    );

    expect(result).toBeTrue();
  });

  it('should return UrlTree for authenticated user', () => {
    const mockTree = {} as UrlTree;

    authService.isAuthenticated.and.returnValue(true);
    router.createUrlTree.and.returnValue(mockTree);

    const result = TestBed.runInInjectionContext(() =>
      guestGuard(mockRoute, mockState)
    );

    expect(router.createUrlTree).toHaveBeenCalledWith(['/']);
    expect(result).toBe(mockTree);
  });
});
