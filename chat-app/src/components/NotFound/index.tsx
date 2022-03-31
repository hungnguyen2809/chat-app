import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  const handleGoToHome = () => {
    navigate('/');
  };

  return (
    <div className="h-[100vh] bg-slate-50 text-center">
      <div className="h-[18%]"></div>
      <p className="text-2xl font-bold">404</p>
      <br />
      <button
        onClick={handleGoToHome}
        className="bg-blue-500 rounded-[5px] py-[5px] px-3 text-sm text-white font-bold hover:bg-blue-600"
      >
        Home
      </button>
    </div>
  );
}

export default NotFound;
