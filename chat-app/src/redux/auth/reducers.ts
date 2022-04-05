import { createReducer } from '@reduxjs/toolkit';
import { actionAuthLoginUser, actionAuthLogoutUser } from './actions';
import { AuthState } from './type';

const initialState: AuthState = {
  userInfo: {},
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actionAuthLoginUser.fulfilled, (state, action) => {
      state.userInfo = action.payload;
    })
    .addCase(actionAuthLogoutUser, (state, action) => {
      state.userInfo = {};
    });
});

export default authReducer;
