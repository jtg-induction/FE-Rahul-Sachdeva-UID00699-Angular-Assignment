import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { VALIDATION_LIMITS } from '@shared/constants';

@Injectable({
  providedIn: 'root',
})
export class ValidationMessageService {
  getUsernameMessage(control: AbstractControl | null): string | null {
    if (!this.shouldShow(control)) return null;

    const errors = control!.errors!;

    if (errors['required']) return 'Required';
    if (errors['minlength'] || errors['maxlength']) {
      return `Only ${VALIDATION_LIMITS.USERNAME_MIN_LENGTH} to ${VALIDATION_LIMITS.USERNAME_MAX_LENGTH} characters allowed`;
    }
    if (errors['alphaNumeric']) return 'Only alphabets and numbers allowed';

    return null;
  }

  getEmailMessage(control: AbstractControl | null): string | null {
    if (!this.shouldShow(control)) return null;

    const errors = control!.errors!;

    if (errors['required']) return 'Required';
    if (errors['pattern']) return 'Invalid email';

    return null;
  }

  getPasswordMessage(control: AbstractControl | null): string | null {
    if (!this.shouldShow(control)) return null;

    const errors = control!.errors!;

    if (errors['required']) return 'Required';
    if (errors['minlength']) return 'Must be 8+ characters';
    if (errors['pattern']) return 'Include atleast 2 numbers and 2 symbols';

    return null;
  }

  getConfirmPasswordMessage(control: AbstractControl | null): string | null {
    if (!this.shouldShow(control)) return null;

    const errors = control!.errors!;

    if (errors['required']) return 'Required';
    if (errors['passwordMismatch']) return 'Passwords do not match';

    return null;
  }

  private shouldShow(control: AbstractControl | null): boolean {
    return !!control && control.touched && !!control.errors;
  }
}
