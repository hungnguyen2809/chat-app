import { useAppDispatch, useAppSelector } from 'app/hooks';
import logo from 'assets/images/logo.svg';
import routesMaps from 'layouts/routesMaps';
import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';
import { authActions, selectAuthLoading } from 'redux/auth/slice';
import { toastError } from 'utils/toastify';

function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loading = useAppSelector(selectAuthLoading);

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleValidateData = (): boolean => {
    if (!username) {
      toastError('Please enter Username.');
      usernameRef.current?.focus();
      return true;
    }
    if (username.length < 5) {
      toastError('Username is less than 5 characters');
      usernameRef.current?.focus();
      return true;
    }
    if (!password) {
      toastError('Please enter Password.');
      passwordRef.current?.focus();
      return true;
    }
    if (password.length < 5) {
      toastError('Password is less than 5 characters');
      passwordRef.current?.focus();
      return true;
    }

    return false;
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (handleValidateData()) {
      return;
    }

    const payload = { username, password, navigate };
    dispatch(authActions.loginUser(payload));
  };

  const handleChangeText =
    (setValueFunction: Function) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValueFunction(event.target.value);
    };

  //   const navigate = useNavigate();
  //   const location = useLocation();

  //   const fromPath = useMemo(() => {
  //     // from.pathname được lấy từ state ở Navigate ở MainLayout
  //     // có tác dụng là khi bấm vào trang nào đó mà bắt đăng nhập lại thì khi đăng nhập xong
  //     // là chuyển hướng lại đến trang đó luôn, trang thao tác cuối cùng.
  //     return get(location, 'state.from.pathname') || '/';
  //   }, [location]);

  //   const handleLogin = () => {
  //     //thường thay vì chuyển hướng lại về trang chủ thì ra chuyển về lại đúng cái trang trước đó, trước khi bắt đăng nhập
  //     navigate(fromPath, { replace: true });
  //   };

  return (
    <div className="w-[100%] h-[100vh] flex flex-col justify-center items-center gap-4 bg-[#131324]">
      <form
        onSubmit={handleSubmitForm}
        className="flex flex-col gap-8 bg-[#00000076] rounded-[2rem] py-12 px-20"
      >
        <div className="flex items-center justify-center gap-4">
          <img src={logo} alt="logo-snappy" className="h-[5rem]" />
          <h1 className="text-white uppercase">snappy</h1>
        </div>

        <input
          ref={usernameRef}
          type="text"
          placeholder="Username"
          className="form-register-input"
          onChange={handleChangeText(setUsername)}
        />
        <input
          ref={passwordRef}
          type="password"
          placeholder="Enter password"
          className="form-register-input"
          onChange={handleChangeText(setPassword)}
        />
        <button className="btn-submit flex justify-center items-center">
          <HashLoader color={'#fff'} loading={loading} size={20} />
          <p className="ml-[10px]">Login</p>
        </button>
        <span className="text-white">
          {"Don't have an account ?"}{' '}
          <Link className="text-[#4e0eff] font-bold" to={routesMaps.REGISTER_PAGE}>
            Register
          </Link>
        </span>
      </form>
    </div>
  );
}

export default LoginPage;
