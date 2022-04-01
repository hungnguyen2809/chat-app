import { delayLazyLoad } from 'layouts/helper';
import routesMaps from 'layouts/routesMaps';
import { AppRouteType } from 'layouts/type';
import { memoize } from 'lodash';
import { lazy } from 'react';

const LoginPage = lazy(() => delayLazyLoad(import('pages/Login')));
const RegisterPage = lazy(() => delayLazyLoad(import('pages/Register')));

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
