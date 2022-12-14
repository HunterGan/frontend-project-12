// @ts-check

const apiPath = '/api/v1';

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  usersPath: () => [apiPath, 'data'].join('/'),
  signUpPath: () => [apiPath, 'signup'].join('/'),
  chat: '/',
  login: '/login',
  signup: '/signup',
  pageNotFound: '*',
};
