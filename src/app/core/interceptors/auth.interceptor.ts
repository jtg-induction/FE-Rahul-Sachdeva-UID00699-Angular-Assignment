import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer token-value`,
    },
  });
  return next(authRequest);
};
