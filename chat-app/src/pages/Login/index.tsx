import { get } from 'lodash';
import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const fromPath = useMemo(() => {
    // from.pathname được lấy từ state ở Navigate ở MainLayout
    // có tác dụng là khi bấm vào trang nào đó mà bắt đăng nhập lại thì khi đăng nhập xong
    // là chuyển hướng lại đến trang đó luôn, trang thao tác cuối cùng.
    return get(location, 'state.from.pathname') || '/';
  }, [location]);

  const handleLogin = () => {
    //thường thay vì chuyển hướng lại về trang chủ thì ra chuyển về lại đúng cái trang trước đó, trước khi bắt đăng nhập
    navigate(fromPath, { replace: true });
  };

  return <div>LoginPage</div>;
}

export default LoginPage;
