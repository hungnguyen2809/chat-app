import { useAppDispatch } from 'app/hooks';
import logo from 'assets/images/logo.svg';
import routesMaps from 'layouts/routesMaps';
import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authActions } from 'redux/auth/slice';
import { toastError } from 'utils/toastify';

function RegisterPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confrimPassRef = useRef<HTMLInputElement>(null);

  const [username, setUsername] = useState<string>('');
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

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (handleValidateData()) {
      return;
    }

    dispatch(authActions.registerUser({ username, password, email, navigate }));
  };

  const handleChangeText =
    (setValueFunction: Function) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValueFunction(event.target.value);
    };

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
          name="username"
          id="username"
          placeholder="Username"
          className="form-register-input"
          onChange={handleChangeText(setUsername)}
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

        <button className="bg-[#997af0] text-white text-base px-8 py-4 font-bold rounded-md cursor-pointer transition ease-in-out delay-[0.3s] hover:bg-[#4e0eff] hover:scale-110">
          Create User
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
