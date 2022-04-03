import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { UserInfo } from 'models';
import { PayloadUpdateAvtar } from 'redux/auth/type';
import { UserState } from './type';

const initialState: UserState = {
  loading: false,
  listContact: [],
};

const userSilce = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    loadUserList: (state, action: PayloadAction<string>) => {
      state.loading = true;
    },
    loadUserListSuccess: (state, action: PayloadAction<UserInfo[]>) => {
      state.listContact = action.payload;
      state.loading = false;
    },
    loadUserListFinish: (state) => {
      state.loading = false;
    },
    //
    updateAvatar: (state, action: PayloadAction<PayloadUpdateAvtar>) => {
      state.loading = true;
    },
    updateAvatarFinish: (state) => {
      state.loading = false;
    },
  },
});

export const userActions = userSilce.actions;

export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserListContact = (state: RootState) => state.user.listContact;

const userReducer = userSilce.reducer;
export default userReducer;
