import { PayloadAction } from '@reduxjs/toolkit';
import authApi from 'api/apiAuth';
import routesMaps from 'layouts/routesMaps';
import { BaseResponse } from 'models';
import { call, put, takeEvery } from 'redux-saga/effects';
import { setLocalData } from 'services';
import { toastError, toastSuccess } from 'utils/toastify';
import { authActions } from './slice';
import { PayloadRegister, UserResponse } from './type';

function* registerUser(action: PayloadAction<PayloadRegister>) {
  try {
    const { navigate, ...data } = action.payload;

    const response: BaseResponse<object> = yield call(authApi.registerUser, data);
    if (response.error) {
      toastError(response.message);
    } else {
      toastSuccess('Create success user !');
      yield put(authActions.registerSuccess());
      navigate(routesMaps.LOGIN_PAGE);
    }
  } catch (error) {
    toastError('Something went wrong !');
    yield put(authActions.registerFailed());
  }
}

function* loginUser(action: PayloadAction<PayloadRegister>) {
  try {
    const { navigate, ...data } = action.payload;

    const response: BaseResponse<UserResponse> = yield call(authApi.loginUser, data);
    if (response.error) {
      toastError(response.message);
    } else {
      const { token, ...userInfo } = response.data;
      setLocalData('userInfo', userInfo);
      setLocalData('accessToken', token);

      toastSuccess('Login success!', { autoClose: 1500 });
      yield put(authActions.registerSuccess());
      navigate(routesMaps.HOME);
    }
  } catch (error) {
    toastError('Something went wrong !');
    yield put(authActions.loginFailed());
  }
}

export default function* authSaga() {
  yield takeEvery(authActions.registerUser.type, registerUser);
  yield takeEvery(authActions.loginUser.type, loginUser);
}
