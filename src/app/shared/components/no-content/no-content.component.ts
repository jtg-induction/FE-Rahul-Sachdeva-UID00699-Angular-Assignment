import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-content',
  templateUrl: './no-content.component.html',
  styleUrl: './no-content.component.scss',
})
export class NoContentComponent {
  private router = inject(Router);
  @Input() code = '404';
  @Input() title = 'Page Not Found';
  @Input() message = 'The page you are trying to access does not exist.';
  @Input() buttonText = 'Go Home';
  @Input() redirectTo: string | null = '/';

  navigate(): void {
    if (this.redirectTo) {
      this.router.navigate([this.redirectTo]);
    }
  }
}
