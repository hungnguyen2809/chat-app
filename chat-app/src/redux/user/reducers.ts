import { createReducer } from '@reduxjs/toolkit';
import {
  actionUserListAllUser,
  actionUserLoadLstContact,
  actionUserLstAllMessage,
  actionUserUpdateLstMessage,
} from './actions';
import { UserState } from './type';

const initialState: UserState = {
  listAllUser: [],
  listContact: [],
  listMessage: [],
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actionUserListAllUser.fulfilled, (state, action) => {
      state.listAllUser = action.payload;
    })
    .addCase(actionUserLoadLstContact.fulfilled, (state, action) => {
      state.listContact = action.payload;
    })
    .addCase(actionUserLstAllMessage.fulfilled, (state, action) => {
      state.listMessage = action.payload;
    })
    .addCase(actionUserUpdateLstMessage, (state, action) => {
      const msgs = [...state.listMessage];
      msgs.push(action.payload);
      state.listMessage = msgs;
    });
});

export default userReducer;
