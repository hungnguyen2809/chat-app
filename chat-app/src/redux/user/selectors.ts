import { RootState } from 'app/store';

export const selectUserLstUserAll = (state: RootState) => state.user.listAllUser;
export const selectUserLstContact = (state: RootState) => state.user.listContact;
export const selectUserLstMessage = (state: RootState) => state.user.listMessage;
