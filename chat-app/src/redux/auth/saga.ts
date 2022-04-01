import { PayloadAction } from '@reduxjs/toolkit';
import authApi from 'api/apiAuth';
import apiChatApp from 'api/apiChatApp';
import routesMaps from 'layouts/routesMaps';
import { get } from 'lodash';
import { BaseResponse } from 'models';
import { call, delay, put, takeEvery } from 'redux-saga/effects';
import { setLocalData } from 'services';
import { MESSAGE_ERR } from 'utils/commom';
import { toastError, toastSuccess } from 'utils/toastify';
import { authActions } from './slice';
import { PayloadRegister, PayloadUpdateAvtar, UserResponse } from './type';

function* registerUser(action: PayloadAction<PayloadRegister>) {
  try {
    yield delay(1000);

    const { navigate, ...data } = action.payload;
    const response: BaseResponse<object> = yield call(authApi.registerUser, data);
    if (response.error) {
      toastError(response.message);
      yield put(authActions.registerFinish());
      return;
    }

    toastSuccess('Create success user !');

    yield put(authActions.registerFinish());
    navigate(routesMaps.LOGIN_PAGE);
  } catch (error) {
    toastError(get(error, 'message') || MESSAGE_ERR);
    yield put(authActions.registerFinish());
  }
}

function* loginUser(action: PayloadAction<PayloadRegister>) {
  try {
    yield delay(2000);

    const { navigate, ...data } = action.payload;
    const response: BaseResponse<UserResponse> = yield call(authApi.loginUser, data);
    if (response.error) {
      toastError(response.message);
      yield put(authActions.loginFinish());
      return;
    }

    const { token, ...userInfo } = response.data;
    setLocalData('userInfo', userInfo);
    setLocalData('accessToken', token);
    toastSuccess('Login success!', { autoClose: 1500 });

    yield put(authActions.loginFinish());
    navigate(routesMaps.HOME);
  } catch (error) {
    toastError(get(error, 'message') || MESSAGE_ERR);
    yield put(authActions.loginFinish());
  }
}

function* updateAvatar(action: PayloadAction<PayloadUpdateAvtar>) {
  try {
    yield delay(1000);

    const { navigate, ...data } = action.payload;
    const response: BaseResponse<object> = yield call(apiChatApp.updateAvatar, data);
    if (response.error) {
      toastError(response.message);
      yield put(authActions.updateAvatarFinish());
      return;
    }

    setLocalData('userInfo', response.data);
    toastSuccess('Update success!', { autoClose: 1500 });

    yield put(authActions.updateAvatarFinish());
    navigate(routesMaps.HOME);
  } catch (error) {
    toastError(get(error, 'message') || MESSAGE_ERR);
    yield put(authActions.updateAvatarFinish());
  }
}

export default function* authSaga() {
  yield takeEvery(authActions.registerUser.type, registerUser);
  yield takeEvery(authActions.loginUser.type, loginUser);
  yield takeEvery(authActions.updateAvatar.type, updateAvatar);
}
