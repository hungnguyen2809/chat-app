import React from 'react';
import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <section>
      <Outlet />
    </section>
  );
}

export default AuthLayout;
