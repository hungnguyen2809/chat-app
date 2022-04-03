import routesMaps from 'layouts/routesMaps';
import React from 'react';
import { BiPowerOff } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { removeAllData } from 'services';

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeAllData();
    navigate(routesMaps.LOGIN_PAGE);
  };

  return (
    <button className="btn-submit p-2 mr-2" onClick={handleLogout}>
      <BiPowerOff />
    </button>
  );
}

export default Logout;
