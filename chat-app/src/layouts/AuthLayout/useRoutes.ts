import routesMaps from 'layouts/routesMaps';
import { AppRouteType } from 'layouts/type';
import { memoize } from 'lodash';
import { lazy } from 'react';

const LoginPage = lazy(() => import('pages/Login'));
const RegisterPage = lazy(() => import('pages/Register'));

const routes = (): AppRouteType[] => {
  return [
    {
      path: routesMaps.LOGIN_PAGE,
      component: LoginPage,
    },
    {
      path: routesMaps.REGISTER_PAGE,
      component: RegisterPage,
    },
  ];
};

export const useRoutesAuth = memoize(() => {
  return routes();
});
