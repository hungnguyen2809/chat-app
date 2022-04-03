import { PayloadAction } from '@reduxjs/toolkit';
import apiChatApp from 'api/apiChatApp';
import routesMaps from 'layouts/routesMaps';
import { get } from 'lodash';
import { BaseResponse, UserInfo } from 'models';
import { call, delay, put, takeEvery } from 'redux-saga/effects';
import { PayloadUpdateAvtar } from 'redux/auth/type';
import { setLocalData } from 'services';
import { MESSAGE_ERR } from 'utils/commom';
import { toastError, toastSuccess } from 'utils/toastify';
import { userActions } from './slice';
import { MessageUser, PayloadAddMessage } from './type';

function* loadUserList(action: PayloadAction<string>) {
  try {
    yield delay(2000);

    const response: BaseResponse<UserInfo[]> = yield call(apiChatApp.allUserOther, action.payload);
    if (response.error) {
      toastError(response.message);
      yield put(userActions.loadUserListFinish());
      return;
    }

    yield put(userActions.loadUserListSuccess(response.data));
  } catch (error) {
    toastError(get(error, 'message') || MESSAGE_ERR);
    yield put(userActions.loadUserListFinish());
  }
}

function* updateAvatar(action: PayloadAction<PayloadUpdateAvtar>) {
  try {
    yield delay(1000);

    const { navigate, ...data } = action.payload;
    const response: BaseResponse = yield call(apiChatApp.updateAvatar, data);
    if (response.error) {
      toastError(response.message);
      yield put(userActions.updateAvatarFinish());
      return;
    }

    setLocalData('userInfo', response.data);
    toastSuccess('Update success!', { autoClose: 1500 });

    yield put(userActions.updateAvatarFinish());
    navigate(routesMaps.HOME);
  } catch (error) {
    toastError(get(error, 'message') || MESSAGE_ERR);
    yield put(userActions.updateAvatarFinish());
  }
}

function* addMessage(action: PayloadAction<PayloadAddMessage>) {
  try {
    const response: BaseResponse = yield call(apiChatApp.addMessage, action.payload);
    if (response.error) {
      toastError(response.message);
      yield put(userActions.addMessageFinish());
      return;
    }

    yield put(userActions.addMessageFinish());
  } catch (error) {
    toastError(get(error, 'message') || MESSAGE_ERR);
    yield put(userActions.addMessageFinish());
  }
}

function* getAllMessage(action: PayloadAction<PayloadAddMessage>) {
  try {
    const response: BaseResponse<MessageUser[]> = yield call(
      apiChatApp.getAllMessage,
      action.payload
    );
    if (response.error) {
      toastError(response.message);
      yield put(userActions.getAllMessageFinish());
      return;
    }

    yield put(userActions.getAllMessageSuccess(response.data));
  } catch (error) {
    toastError(get(error, 'message') || MESSAGE_ERR);
    yield put(userActions.getAllMessageFinish());
  }
}

export default function* userSaga() {
  yield takeEvery(userActions.loadUserList.type, loadUserList);
  yield takeEvery(userActions.updateAvatar.type, updateAvatar);
  yield takeEvery(userActions.addMessage.type, addMessage);
  yield takeEvery(userActions.getAllMessage.type, getAllMessage);
}
