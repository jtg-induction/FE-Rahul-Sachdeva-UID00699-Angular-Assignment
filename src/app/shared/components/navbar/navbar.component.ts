import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { APP_ROUTES } from '@shared/constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  readonly routes = APP_ROUTES;

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/', APP_ROUTES.AUTH.BASE, APP_ROUTES.AUTH.SIGNUP]);
  }
}
