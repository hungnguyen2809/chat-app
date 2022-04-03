import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { UserInfo } from 'models';
import { PayloadUpdateAvtar } from 'redux/auth/type';
import { MessageUser, PayloadAddMessage, PayloadAllMessage, UserState } from './type';

const initialState: UserState = {
  loading: false,
  listContact: [],

  loadingAddMessage: false,

  loadingMessage: false,
  listMessage: [],
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
    //
    addMessage: (state, action: PayloadAction<PayloadAddMessage>) => {
      state.loadingAddMessage = true;
    },
    addMessageFinish: (state) => {
      state.loadingAddMessage = false;
    },
    getAllMessage: (state, action: PayloadAction<PayloadAllMessage>) => {
      state.loadingMessage = true;
    },
    getAllMessageSuccess: (state, action: PayloadAction<MessageUser[]>) => {
      state.loadingMessage = false;
      state.listMessage = action.payload;
    },
    getAllMessageFinish: (state) => {
      state.loadingMessage = false;
    },
    updateListMessages: (state, action: PayloadAction<MessageUser>) => {
      const msgs = [...state.listMessage];
      msgs.push(action.payload);
      state.listMessage = msgs;
    },
  },
});

export const userActions = userSilce.actions;

export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserListContact = (state: RootState) => state.user.listContact;

export const selectUserAddMesLoading = (state: RootState) => state.user.loadingAddMessage;

export const selectUserMesLoading = (state: RootState) => state.user.loadingMessage;
export const selectUserListMessage = (state: RootState) => state.user.listMessage;

const userReducer = userSilce.reducer;
export default userReducer;
