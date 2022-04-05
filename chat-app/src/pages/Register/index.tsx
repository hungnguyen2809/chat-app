import { useAppDispatch } from 'app/hooks';
import logo from 'assets/images/logo.svg';
import routesMaps from 'layouts/routesMaps';
import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';
import { actionAuthRegisterUser } from 'redux/auth/actions';
import { getMessageError } from 'utils/commom';
import { toastError, toastSuccess } from 'utils/toastify';

function RegisterPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const usernameRef = useRef<HTMLInputElement>(null);
  const fullnameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confrimPassRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [fullname, setFullname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfrimPassword] = useState<string>('');

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
    if (!fullname) {
      toastError('Please enter Fullname.');
      fullnameRef.current?.focus();
      return true;
    }
    if (fullname.length < 5) {
      toastError('Fullname is less than 5 characters');
      fullnameRef.current?.focus();
      return true;
    }
    if (!email) {
      toastError('Please enter Email.');
      emailRef.current?.focus();
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
    if (!confirmPassword) {
      toastError('Please enter Confirm Password.');
      confrimPassRef.current?.focus();
      return true;
    }

    if (confirmPassword !== password) {
      toastError('Password and Confirm Password should be same.');
      confrimPassRef.current?.focus();
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
      await dispatch(actionAuthRegisterUser({ username, fullname, password, email }));
      setLoading(false);
      toastSuccess('Create success user !');
      navigate(routesMaps.LOGIN_PAGE);
    } catch (error) {
      setLoading(false);
      toastError(getMessageError(error));
    }
  };

  const handleChangeText = (setValueFunction: Function) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueFunction(event.target.value);
  };

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
          name="username"
          id="username"
          placeholder="Username"
          className="form-register-input"
          onChange={handleChangeText(setUsername)}
        />
        <input
          ref={fullnameRef}
          type="text"
          name="fullname"
          id="fullname"
          placeholder="Fullname"
          className="form-register-input"
          onChange={handleChangeText(setFullname)}
        />
        <input
          ref={emailRef}
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          className="form-register-input"
          onChange={handleChangeText(setEmail)}
        />
        <input
          ref={passwordRef}
          type="password"
          name="password"
          id="password"
          placeholder="Enter password"
          className="form-register-input"
          onChange={handleChangeText(setPassword)}
        />
        <input
          ref={confrimPassRef}
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm Password"
          className="form-register-input"
          onChange={handleChangeText(setConfrimPassword)}
        />

        <button className="btn-submit flex justify-center items-center">
          <HashLoader color={'#fff'} loading={loading} size={20} />
          <p className="ml-[10px]">Create User</p>
        </button>
        <span className="text-white">
          Already have an account ?{' '}
          <Link className="text-[#4e0eff] font-bold" to={routesMaps.LOGIN_PAGE}>
            Login
          </Link>
        </span>
      </form>
    </div>
  );
}

export default RegisterPage;
