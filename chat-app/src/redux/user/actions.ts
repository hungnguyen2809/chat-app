import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient, multiAvatarApi } from 'api/createRequest';
import ChatApp_URL from 'api/urlChatApp';
import { BaseResponse } from 'models';
import { UserInfo, UserResponse } from 'redux/auth/type';
import { setLocalData } from 'services';
import { getMessageError } from 'utils/commom';
import { MessageUser, PayloadAddMessage, PayloadAllMessage } from './type';

export const actionUserListAllUser = createAsyncThunk('user/actionUserListAllUser', async () => {
  try {
    const { data } = await axiosClient.get<BaseResponse<UserInfo[]>>(ChatApp_URL.user);
    if (data.error) {
      throw new Error(data.message);
    }
    return data.data;
  } catch (error) {
    throw new Error(getMessageError(error));
  }
});

export const actionUserLoadLstContact = createAsyncThunk(
  'user/actionUserLoadLstContact',
  async (params: { id: string }) => {
    try {
      const { data } = await axiosClient.get<BaseResponse<UserInfo[]>>(`${ChatApp_URL.allContacts}/${params.id}`);
      if (data.error) {
        throw new Error(data.message);
      }
      return data.data;
    } catch (error) {
      throw new Error(getMessageError(error));
    }
  }
);

export const actionUserFindUser = createAsyncThunk('user/actionUserFindUser', async (params: { id: string }) => {
  try {
    const { data } = await axiosClient.get<BaseResponse<UserInfo>>(`${ChatApp_URL.user}/${params.id}`);
    if (data.error) {
      throw new Error(data.message);
    }
    return data.data;
  } catch (error) {
    throw new Error(getMessageError(error));
  }
});

export const actionUserAddMessage = createAsyncThunk('user/actionUserAddMessage', async (body: PayloadAddMessage) => {
  try {
    const { data } = await axiosClient.post<BaseResponse>(ChatApp_URL.addMessage, body);
    if (data.error) {
      throw new Error(data.message);
    }
    return data.data;
  } catch (error) {
    throw new Error(getMessageError(error));
  }
});

export const actionUserLstAllMessage = createAsyncThunk(
  'user/actionUserLstAllMessage',
  async (body: PayloadAllMessage) => {
    try {
      const { data } = await axiosClient.post<BaseResponse<MessageUser[]>>(ChatApp_URL.getAllMessage, body);
      if (data.error) {
        throw new Error(data.message);
      }
      return data.data;
    } catch (error) {
      throw new Error(getMessageError(error));
    }
  }
);

export const actionUserUpdateLstMessage = createAction<MessageUser>('user/actionUserUpdateLstMessage');

export const actionGetMultiAvatar = createAsyncThunk('user/actionGetMultiAvatar', async (id: number) => {
  try {
    const { data } = await multiAvatarApi.get(`/${id}`);
    return data;
  } catch (error) {
    throw new Error(getMessageError(error));
  }
});

export const actionUserUpdAvatar = createAsyncThunk(
  'user/actionUserUpdAvatar',
  async ({ id, image }: { id: string; image: string }) => {
    try {
      const { data } = await axiosClient.post<BaseResponse<UserResponse>>(`${ChatApp_URL.updateAvatar}/${id}`, {
        image,
      });
      if (data.error) {
        throw new Error(data.message);
      }
      setLocalData('userInfo', data.data);
      return data.data;
    } catch (error) {
      throw new Error(getMessageError(error));
    }
  }
);
