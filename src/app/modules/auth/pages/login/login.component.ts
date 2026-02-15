import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IMAGES } from '@app/shared/constants';
import { LoginRequest } from '@app/modules/auth/models/auth.model';
import { VALIDATION_LIMITS } from '@app/shared/constants/validation';
import { NotificationService } from '@core/services/notification.service';
import { AuthService } from '@modules/auth/services/auth.service';
import { ValidatorService } from '@shared/services/validator.service';
import {
  getPasswordErrorMessage,
  getUsernameErrorMessage,
} from '@shared/utils/validation.utils';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private notifier = inject(NotificationService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private validatorService = inject(ValidatorService);
  welcomeBackImage = IMAGES.AUTH.WELCOME_BACK;
  loading = false;
  hide = true;

  form = this.fb.group({
    username: [
      '',
      [
        Validators.required,
        Validators.minLength(VALIDATION_LIMITS.USERNAME_MIN_LENGTH),
        Validators.maxLength(VALIDATION_LIMITS.USERNAME_MAX_LENGTH),
        this.validatorService.alphaNumeric(),
      ],
    ],
    password: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.form.get('password')?.valueChanges.subscribe(() => {
      this.hide = true;
    });
  }

  get username(): AbstractControl | null {
    return this.form.get('username');
  }

  get password(): AbstractControl | null {
    return this.form.get('password');
  }

  get usernameError(): string | null {
    return getUsernameErrorMessage(this.username);
  }

  get passwordError(): string | null {
    return getPasswordErrorMessage(this.password);
  }

  submit(): void {
    if (this.form.invalid) return;

    const payload = this.form.value as LoginRequest;

    this.loading = true;

    this.authService
      .login(payload)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }
}
