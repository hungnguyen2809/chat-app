import { useAppDispatch } from 'app/hooks';
import logo from 'assets/images/logo.svg';
import routesMaps from 'layouts/routesMaps';
import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';
import { actionAuthLoginUser } from 'redux/auth/actions';
import { getMessageError } from 'utils/commom';
import { toastError } from 'utils/toastify';

function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState<boolean>(false);
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

  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (handleValidateData()) {
      return;
    }

    try {
      setLoading(true);
      await dispatch(actionAuthLoginUser({ username, password }));

      setLoading(false);
      navigate(routesMaps.HOME);
    } catch (error) {
      toastError(getMessageError(error));
      setLoading(false);
    }
  };

  const handleChangeText = (setValueFunction: Function) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueFunction(event.target.value);
  };

  //   const navigate = useNavigate();
  //   const location = useLocation();

  //   const fromPath = useMemo(() => {
  //     // from.pathname ???????c l???y t??? state ??? Navigate ??? MainLayout
  //     // c?? t??c d???ng l?? khi b???m v??o trang n??o ???? m?? b???t ????ng nh???p l???i th?? khi ????ng nh???p xong
  //     // l?? chuy???n h?????ng l???i ?????n trang ???? lu??n, trang thao t??c cu???i c??ng.
  //     return get(location, 'state.from.pathname') || '/';
  //   }, [location]);

  //   const handleLogin = () => {
  //     //th?????ng thay v?? chuy???n h?????ng l???i v??? trang ch??? th?? ra chuy???n v??? l???i ????ng c??i trang tr?????c ????, tr?????c khi b???t ????ng nh???p
  //     navigate(fromPath, { replace: true });
  //   };

  return (
    <div className="w-[100%] h-[100vh] flex flex-col justify-center items-center gap-4 bg-[#131324]">
      <form onSubmit={handleSubmitForm} className="flex flex-col gap-8 bg-[#00000076] rounded-[2rem] py-12 px-20">
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
