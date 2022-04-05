import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosAuth } from 'api/createRequest';
import ChatApp_URL from 'api/urlChatApp';
import { BaseResponse } from 'models';
import { setLocalData } from 'services';
import { getMessageError } from 'utils/commom';
import { AuthLogin, AuthRegister, UserResponse } from './type';

export const actionAuthLogoutUser = createAction('auth/actionAuthLogoutUser');

export const actionAuthLoginUser = createAsyncThunk('auth/actionAuthLoginUser', async (body: AuthLogin) => {
  try {
    const { data } = await axiosAuth.post<BaseResponse<UserResponse>>(ChatApp_URL.loginUser, body);
    if (data.error) {
      throw new Error(data.message);
    }
    const { token, ...userInfo } = data.data;
    setLocalData('userInfo', userInfo);
    setLocalData('accessToken', token);

    return data.data;
  } catch (error) {
    throw new Error(getMessageError(error));
  }
});

export const actionAuthRegisterUser = createAsyncThunk('auth/actionAuthRegisterUser', async (body: AuthRegister) => {
  try {
    const { data } = await axiosAuth.post<BaseResponse>(ChatApp_URL.loginUser, body);
    if (data.error) {
      throw new Error(data.message);
    }
    return data.data;
  } catch (error) {
    throw new Error(getMessageError(error));
  }
});
