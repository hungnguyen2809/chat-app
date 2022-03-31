import React from 'react';
import { Outlet } from 'react-router-dom';

function FactoryLayout() {
  return (
    <main>
      <Outlet />
    </main>
  );
}

export default FactoryLayout;
