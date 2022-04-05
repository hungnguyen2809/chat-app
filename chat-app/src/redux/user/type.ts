import { UserInfo } from 'redux/auth/type';

export interface UserState {
  listAllUser: UserInfo[];
  listContact: UserInfo[];
  listMessage: MessageUser[];
}

export interface MessageUser {
  id: string;
  fromSelf: boolean;
  message: string;
}

export interface PayloadAddMessage {
  from: string;
  to: string;
  message: string;
}

export interface PayloadAllMessage {
  from: string;
  to: string;
}
