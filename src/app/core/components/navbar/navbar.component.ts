import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { APP_ROUTES } from '@app/shared/constants';
import { AuthService } from '@modules/auth/services/auth.service';

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
    this.router.navigate(['/auth/login']);
  }
}
