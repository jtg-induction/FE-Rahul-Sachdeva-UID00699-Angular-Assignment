import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '@core/services/notification.service';
import { LoginRequest } from '@modules/auth/models/auth.models';
import { AuthService } from '@modules/auth/services/auth.service';
import { SUCCESS_MESSAGES } from '@shared/constants/messages.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private notifier = inject(NotificationService);
  private authService = inject(AuthService);
  private router = inject(Router);

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  submit(): void {
    if (this.form.invalid) return;

    const payload = this.form.value as LoginRequest;

    this.authService.login(payload).subscribe(() => {
      this.notifier.showSuccess(SUCCESS_MESSAGES.LOGIN);
      this.router.navigate(['/']);
    });
  }
}
