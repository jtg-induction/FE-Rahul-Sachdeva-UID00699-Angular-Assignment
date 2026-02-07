export const ERROR_MESSAGES = {
  BAD_REQUEST: 'Bad Request. Provide valid inputs',
  GENERIC: 'Something Went Wrong. Please try Again.',
  NETWORK: 'Network error. Please check your internet.',
  VALIDATION_ISSUE: 'Validation Failed. Please Enter Valid Credentials',
  UNAUTHORIZED: 'Session Expired. Please Login Again.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'Requested Resource not Found',
  TOO_MANY_REQUESTS: 'Rate Limit Exceeded. Too Many Requests',
  ALREADY_EXISTS: 'Already Exists. Try Different Credentials',
};

export const SUCCESS_MESSAGES = {
  LOGIN: 'Logged in Successfully',
  REGISTER: 'Account created successfully',
};

export const STATUS_ERROR_MAP: Record<number, string> = {
  0: ERROR_MESSAGES.NETWORK,
  400: ERROR_MESSAGES.VALIDATION_ISSUE,
  401: ERROR_MESSAGES.UNAUTHORIZED,
  403: ERROR_MESSAGES.FORBIDDEN,
  404: ERROR_MESSAGES.NOT_FOUND,
  409: ERROR_MESSAGES.ALREADY_EXISTS,
  429: ERROR_MESSAGES.TOO_MANY_REQUESTS,
  500: ERROR_MESSAGES.GENERIC,
};
