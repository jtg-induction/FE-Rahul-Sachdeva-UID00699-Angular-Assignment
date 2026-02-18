export const APP_ROUTES = {
  ROOT: '',
  ARTICLES: {
    BASE: 'articles',
    DETAIL: ':id',
  },
  AUTH: {
    BASE: 'auth',
    LOGIN: 'login',
    SIGNUP: 'signup',
  },
  NOT_FOUND: '**',
} as const;
