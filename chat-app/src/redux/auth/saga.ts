import { PayloadAction } from '@reduxjs/toolkit';
import authApi from 'api/apiAuth';
import routesMaps from 'layouts/routesMaps';
import { BaseResponse } from 'models';
import { call, put, takeEvery } from 'redux-saga/effects';
import { toastError, toastSuccess } from 'utils/toastify';
import { authActions } from './slice';
import { PayloadRegister, UserResponse } from './type';

function* registerUser(action: PayloadAction<PayloadRegister>) {
  try {
    const { navigate, ...data } = action.payload;

    const response: BaseResponse<UserResponse> = yield call(authApi.registerUser, data);
    console.log(response);

    toastSuccess('Create success user !');
    navigate(routesMaps.HOME);
  } catch (error) {
    toastError('Something went wrong !');
    yield put(authActions.registerFailed());
  }
}

export default function* authSaga() {
  yield takeEvery(authActions.registerUser.type, registerUser);
}
