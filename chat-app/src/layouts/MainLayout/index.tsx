import routesMaps from 'layouts/routesMaps';
import { trim } from 'lodash';
import React, { useMemo } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getLocalData } from 'services';

function MainLayout() {
  const location = useLocation();

  const isLogined = useMemo(() => {
    return trim(getLocalData('accessToken'));
  }, []);

  return (
    <section>
      {isLogined ? (
        <Outlet />
      ) : (
        //state={{ from: location }} replace dùng để lưu lại trạng thái của route trước đó trước khi navigate
        //và khi mà bấm back trên trình duyệt nó vẫn có thể back lại đc
        <Navigate to={routesMaps.LOGIN_PAGE} state={{ from: location }} replace />
      )}
    </section>
  );
}

export default MainLayout;
