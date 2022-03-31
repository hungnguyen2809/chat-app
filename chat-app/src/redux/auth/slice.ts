import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, PayloadRegister, UserResponse } from './type';

const initialState: AuthState = {
  loading: false,
  userInfo: undefined,
};

const authSilce = createSlice({
  name: 'authSilce',
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<PayloadRegister>) => {
      state.loading = true;
    },
    registerSuccess: (state, action: PayloadAction<UserResponse>) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    registerFailed: (state) => {
      state.loading = false;
    },
  },
});

export const authActions = authSilce.actions;

export const authReducer = authSilce.reducer;
export default authReducer;
