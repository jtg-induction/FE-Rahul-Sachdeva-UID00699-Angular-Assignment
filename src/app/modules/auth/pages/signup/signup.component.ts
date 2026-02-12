import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  VALIDATION_LIMITS,
  VALIDATION_PATTERNS,
} from '@app/shared/constants/validation';
import { NotificationService } from '@core/services/notification.service';
import { RegisterRequest } from '@modules/auth/models/auth.models';
import { AuthService } from '@modules/auth/services/auth.service';
import { SUCCESS_MESSAGES } from '@shared/constants/messages';
import { ValidatorService } from '@shared/services/validator.service';
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
  private notifier = inject(NotificationService);
  private validatorService = inject(ValidatorService);
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
        [Validators.required, Validators.pattern(VALIDATION_PATTERNS.PASSWORD)],
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

  submit(): void {
    if (this.form.invalid) return;

    const payload = this.form.value as RegisterRequest;
    
    this.loading = true;

    this.authService
      .register(payload)
      .subscribe(() => {
        this.authService
          .login(payload)
          .pipe(finalize(() => (this.loading = false)))
          .subscribe(() => {
            this.notifier.showSuccess(SUCCESS_MESSAGES.REGISTER);
            this.router.navigate(['/']);
          });
      });
  }
}
