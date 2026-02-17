import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { ValidationMessageService } from '@core/services/validation-message.service';
import { ValidatorService } from '@core/services/validator.service';
import {
  LoginResponse,
  RegisterRequest,
} from '@modules/auth/models/auth.model';
import { APP_ROUTES, IMAGES } from '@shared/constants';
import {
  VALIDATION_LIMITS,
  VALIDATION_PATTERNS,
} from '@shared/constants/validation';
import { finalize, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private validatorService = inject(ValidatorService);
  private readonly destroy$ = new Subject<void>();
  private readonly validationMessageService = inject(ValidationMessageService);

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
        'confirmPassword'
      ),
    }
  );

  ngOnInit(): void {
    this.form.get('password')?.valueChanges.subscribe(() => {
      this.hide = true;
    });

    this.form.get('confirmPassword')?.valueChanges.subscribe(() => {
      this.hide2 = true;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get usernameError(): string | null {
    return this.validationMessageService.getUsernameMessage(
      this.form.get('username')
    );
  }

  get emailError(): string | null {
    return this.validationMessageService.getEmailMessage(
      this.form.get('email')
    );
  }

  get passwordError(): string | null {
    return this.validationMessageService.getPasswordMessage(
      this.form.get('password')
    );
  }

  get confirmPasswordError(): string | null {
    return this.validationMessageService.getConfirmPasswordMessage(
      this.form.get('confirmPassword')
    );
  }

  /** Handles Signup Submission */
  submit(): void {
    if (this.form.invalid) return;

    const payload: RegisterRequest = this.form.value as RegisterRequest;

    this.loading = true;

    this.authService
      .register(payload)
      .pipe(
        switchMap(() => this.authService.login(payload)),
        finalize(() => (this.loading = false))
      )
      .subscribe({
        next: (response: LoginResponse) => {
          localStorage.setItem('token', response.data.token);
          this.router.navigate(['/']);
        },
      });
  }
}
