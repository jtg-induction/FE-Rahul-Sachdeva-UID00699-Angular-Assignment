import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { ValidationMessageService } from '@core/services/validation-message.service';
import { ValidatorService } from '@core/services/validator.service';
import { ILoginRequest } from '@modules/auth/models/auth.model';
import { APP_ROUTES, IMAGES, VALIDATION_LIMITS } from '@shared/constants';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly validatorService = inject(ValidatorService);
  private readonly validationMessageService = inject(ValidationMessageService);
  private readonly destroyRef = inject(DestroyRef);

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

  constructor() {
    this.initializeFormListeners();
  }

  private initializeFormListeners(): void {
    this.form
      .get('password')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
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
    return this.validationMessageService.getUsernameMessage(this.username);
  }

  get passwordError(): string | null {
    return this.validationMessageService.getPasswordMessage(this.password);
  }

  submit(): void {
    if (this.form.invalid) return;

    const payload = this.form.value as ILoginRequest;

    this.loading = true;

    this.authService
      .login(payload)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => (this.loading = false)),
      )
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }
}
