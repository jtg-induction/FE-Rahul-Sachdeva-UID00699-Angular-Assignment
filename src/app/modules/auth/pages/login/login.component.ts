import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { ValidationMessageService } from '@core/services/validation-message.service';
import { ValidatorService } from '@core/services/validator.service';
import { LoginRequest } from '@modules/auth/models/auth.model';
import { APP_ROUTES, IMAGES } from '@shared/constants';
import { VALIDATION_LIMITS } from '@shared/constants/validation';
import { finalize, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly validatorService = inject(ValidatorService);
  private readonly validationMessageService = inject(ValidationMessageService);
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
    this.form
      .get('password')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(() => {
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
    return this.validationMessageService.getUsernameMessage(this.username);
  }

  get passwordError(): string | null {
    return this.validationMessageService.getPasswordMessage(this.password);
  }

  submit(): void {
    if (this.form.invalid) return;

    const payload = this.form.value as LoginRequest;

    this.loading = true;

    this.authService
      .login(payload)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.loading = false))
      )
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }
}
