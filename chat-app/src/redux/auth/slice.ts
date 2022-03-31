import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { AuthState, PayloadLogin, PayloadRegister, UserResponse } from './type';

const initialState: AuthState = {
  loading: false,
  userInfo: {},
};

const authSilce = createSlice({
  name: 'authSilce',
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<PayloadRegister>) => {
      state.loading = true;
    },
    registerSuccess: (state) => {
      state.loading = false;
    },
    registerFailed: (state) => {
      state.loading = false;
    },
    // -------
    loginUser: (state, action: PayloadAction<PayloadLogin>) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<UserResponse>) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    loginFailed: (state) => {
      state.loading = false;
    },
  },
});

export const authActions = authSilce.actions;

export const selectUserInfo = (state: RootState) => state.auth.userInfo;

export const authReducer = authSilce.reducer;
export default authReducer;
