import { AbstractControl } from '@angular/forms';

export function getUsernameErrorMessage(
  control: AbstractControl | null
): string | null {
  if (!control || !control.touched || !control.errors) return null;

  const errors = control.errors;

  if (errors['required']) return 'Required';
  if (errors['minlength'])
    return `Min ${errors['minlength'].requiredLength} chars`;
  if (errors['maxlength'])
    return `Max ${errors['maxlength'].requiredLength} chars`;
  if (errors['alphaNumeric']) return 'Alphanumeric only';

  return null;
}

export function getEmailErrorMessage(
  control: AbstractControl | null
): string | null {
  if (!control || !control.touched || !control.errors) return null;

  const errors = control.errors;

  if (errors['required']) return 'Required';
  if (errors['pattern']) return 'Invalid email';

  return null;
}

export function getPasswordErrorMessage(
  control: AbstractControl | null
): string | null {
  if (!control || !control.touched || !control.errors) return null;

  const errors = control.errors;

  if (errors['required']) return 'Required';
  if (errors['pattern']) return 'Min 8 chars, 2 numbers & 2 special chars';

  return null;
}

export function getConfirmPasswordErrorMessage(
  control: AbstractControl | null
): string | null {
  if (!control || !control.touched || !control.errors) return null;

  const errors = control.errors;

  if (errors['required']) return 'Required';
  if (errors['passwordMismatch']) return 'Passwords must match';

  return null;
}
