import routesMaps from 'layouts/routesMaps';
import { AppRouteType } from 'layouts/type';
import { memoize } from 'lodash';
import { lazy } from 'react';

const ChatPage = lazy(() => import('pages/Chat'));

const routes = (): AppRouteType[] => {
  return [
    {
      path: routesMaps.HOME,
      component: ChatPage,
    },
  ];
};

export const useRoutesMain = memoize(() => {
  return routes();
});
