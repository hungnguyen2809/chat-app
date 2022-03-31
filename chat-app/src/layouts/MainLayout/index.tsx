import routesMaps from 'layouts/routesMaps';
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const isLogined = true;

function MainLayout() {
  const location = useLocation();

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
