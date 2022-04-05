import { RootState } from 'app/store';

export const selectAuthUserInfo = (state: RootState) => state.auth.userInfo;
