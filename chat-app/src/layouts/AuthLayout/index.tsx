import routesMaps from 'layouts/routesMaps';
import { trim } from 'lodash';
import React, { useMemo } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getLocalData } from 'services';

function AuthLayout() {
  const isLogined = useMemo(() => {
    return trim(getLocalData('accessToken'));
  }, []);

  return <section>{!isLogined ? <Outlet /> : <Navigate to={routesMaps.HOME} />}</section>;
}

export default AuthLayout;
