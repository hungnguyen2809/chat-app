import { delayLazyLoad } from 'layouts/helper';
import routesMaps from 'layouts/routesMaps';
import { AppRouteType } from 'layouts/type';
import { memoize } from 'lodash';
import { lazy } from 'react';

const ChatPage = lazy(() => delayLazyLoad(import('pages/Chat')));
const ProfilePage = lazy(() => delayLazyLoad(import('pages/Profile')));

const routes = (): AppRouteType[] => {
  return [
    {
      path: routesMaps.HOME,
      component: ChatPage,
    },
    {
      path: routesMaps.PROFILE_PAGE,
      component: ProfilePage,
    },
  ];
};

export const useRoutesMain = memoize(() => {
  return routes();
});
