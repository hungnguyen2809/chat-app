import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { AuthState, PayloadLogin, PayloadRegister } from './type';

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
    registerFinish: (state) => {
      state.loading = false;
    },
    // -------
    loginUser: (state, action: PayloadAction<PayloadLogin>) => {
      state.loading = true;
    },
    loginFinish: (state) => {
      state.loading = false;
    },
  },
});

export const authActions = authSilce.actions;

export const selectUserInfo = (state: RootState) => state.auth.userInfo;
export const selectAuthLoading = (state: RootState) => state.auth.loading;

export const authReducer = authSilce.reducer;
export default authReducer;
