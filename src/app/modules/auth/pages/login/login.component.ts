import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from '@app/modules/auth/models/auth.model';
import { APP_ROUTES, IMAGES } from '@app/shared/constants';
import { VALIDATION_LIMITS } from '@app/shared/constants/validation';
import { AuthService } from '@modules/auth/services/auth.service';
import { ValidatorService } from '@shared/services/validator.service';
import {
  getPasswordErrorMessage,
  getUsernameErrorMessage,
} from '@shared/utils/validation.utils';
import { finalize, Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private validatorService = inject(ValidatorService);
  private readonly destroy$ = new Subject<void>();

  readonly routes = APP_ROUTES;
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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

  /** Handles login Submission */
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
