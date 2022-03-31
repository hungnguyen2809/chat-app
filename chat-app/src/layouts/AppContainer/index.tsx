import NotFound from 'components/NotFound';
import AuthLayout from 'layouts/AuthLayout';
import { useRoutesAuth } from 'layouts/AuthLayout/useRoutes';
import FactoryLayout from 'layouts/FactoryLayout';
import MainLayout from 'layouts/MainLayout';
import { useRoutesMain } from 'layouts/MainLayout/useRoutes';
import { AppRouteType } from 'layouts/type';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const makeRoutes = (routes: AppRouteType[]) => {
  return routes.map((route, idx) => {
    const { component: Component } = route;
    return <Route key={idx} path={route.path} element={<Component />} />;
  });
};

function AppContainer() {
  const routesAuth = useRoutesAuth();
  const routesMain = useRoutesMain();

  return (
    <Routes>
      <Route path="/" element={<FactoryLayout />}>
        {/* Public routes */}
        <Route element={<AuthLayout />}>{makeRoutes(routesAuth)}</Route>

        {/* Private route */}
        <Route element={<MainLayout />}>{makeRoutes(routesMain)}</Route>

        {/* Catch all */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default AppContainer;
