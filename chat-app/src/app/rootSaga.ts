import { all, call } from 'redux-saga/effects';
import authSaga from 'redux/auth/saga';
import userSaga from 'redux/user/saga';

export default function* rootSaga() {
  yield all([call(authSaga), call(userSaga)]);
}
