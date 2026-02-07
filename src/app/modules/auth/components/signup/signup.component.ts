import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '@core/services/notification.service';
import { RegisterRequest } from '@modules/auth/models/auth.models';
import { AuthService } from '@modules/auth/services/auth.service';
import { SUCCESS_MESSAGES } from '@shared/constants/messages.constants';

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

  passwordMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword');

    if (password !== confirmPassword?.value) {
      confirmPassword?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      if (confirmPassword?.hasError('passwordMismatch')) {
        confirmPassword.setErrors(null);
      }
      return null;
    }
  };

  form: FormGroup = this.fb.group(
    {
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/
          ),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: this.passwordMatchValidator }
  );

  submit(): void {
    if (this.form.invalid) return;

    const payload = this.form.value as RegisterRequest;
    this.authService.register(payload).subscribe(() => {
      this.notifier.showSuccess(SUCCESS_MESSAGES.REGISTER);
      this.router.navigate(['/auth/login']);
    });
  }
}
