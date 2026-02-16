import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import {
  VALIDATION_ERRORS,
  VALIDATION_PATTERNS,
} from '@shared/constants/validation';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  alphaNumeric(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      const valid = VALIDATION_PATTERNS.ALPHANUMERIC.test(control.value);
      return valid ? null : { [VALIDATION_ERRORS.ALPHANUMERIC]: true };
    };
  }

  passwordMatch(passwordKey: string, confirmPasswordKey: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get(passwordKey);
      const confirmPassword = group.get(confirmPasswordKey);

      if (!password || !confirmPassword) return null;

      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({
          ...confirmPassword.errors,
          [VALIDATION_ERRORS.PASSWORD_MISMATCH]: true,
        });
        return { [VALIDATION_ERRORS.PASSWORD_MISMATCH]: true };
      }

      if (confirmPassword.hasError(VALIDATION_ERRORS.PASSWORD_MISMATCH)) {
        const errors = { ...confirmPassword.errors };
        delete errors[VALIDATION_ERRORS.PASSWORD_MISMATCH];
        confirmPassword.setErrors(Object.keys(errors).length ? errors : null);
      }

      return null;
    };
  }
}
