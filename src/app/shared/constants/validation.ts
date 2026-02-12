export const VALIDATION_PATTERNS = {
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,
  PASSWORD: /^(?=(?:.*\d){2,})(?=(?:.*[^A-Za-z0-9]){2,}).{8,}$/,
};

export const VALIDATION_LIMITS = {
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 30,
  PASSWORD_MIN_LENGTH: 8,
};

export const VALIDATION_ERRORS = {
  ALPHANUMERIC: 'alphaNumeric',
  PASSWORD_MISMATCH: 'passwordMismatch',
};
