import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { ValidationMessageService } from '@core/services/validation-message.service';
import { ValidatorService } from '@core/services/validator.service';
import { IRegisterRequest } from '@modules/auth/models/auth.model';
import {
  APP_ROUTES,
  IMAGES,
  VALIDATION_LIMITS,
  VALIDATION_PATTERNS,
} from '@shared/constants';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private validatorService = inject(ValidatorService);
  private readonly validationMessageService = inject(ValidationMessageService);
  private readonly destroyRef = inject(DestroyRef);

  readonly routes = APP_ROUTES;
  welcomeImage = IMAGES.AUTH.WELCOME;
  loading = false;
  hide = true;
  hide2 = true;

  form: FormGroup = this.fb.group(
    {
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(VALIDATION_LIMITS.USERNAME_MIN_LENGTH),
          Validators.maxLength(VALIDATION_LIMITS.USERNAME_MAX_LENGTH),
          this.validatorService.alphaNumeric(),
        ],
      ],
      email: [
        '',
        [Validators.required, Validators.pattern(VALIDATION_PATTERNS.EMAIL)],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(VALIDATION_LIMITS.PASSWORD_MIN_LENGTH),
          Validators.pattern(VALIDATION_PATTERNS.PASSWORD),
        ],
      ],
      confirmPassword: ['', Validators.required],
    },
    {
      validators: this.validatorService.passwordMatch(
        'password',
        'confirmPassword',
      ),
    },
  );

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
    this.form
      .get('confirmPassword')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.hide2 = true;
      });
  }

  get usernameError(): string | null {
    return this.validationMessageService.getUsernameMessage(
      this.form.get('username'),
    );
  }

  get emailError(): string | null {
    return this.validationMessageService.getEmailMessage(
      this.form.get('email'),
    );
  }

  get passwordError(): string | null {
    return this.validationMessageService.getPasswordMessage(
      this.form.get('password'),
    );
  }

  get confirmPasswordError(): string | null {
    return this.validationMessageService.getConfirmPasswordMessage(
      this.form.get('confirmPassword'),
    );
  }

  /** Handles Signup Submission */
  submit(): void {
    if (this.form.invalid) {
      return;
    }

    const payload: IRegisterRequest = this.form.value as IRegisterRequest;

    this.loading = true;

    this.authService
      .register(payload)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => (this.loading = false)),
      )
      .subscribe({
        next: (): void => {
          this.router.navigate([
            '/',
            APP_ROUTES.AUTH.BASE,
            APP_ROUTES.AUTH.LOGIN,
          ]);
        },
      });
  }
}
