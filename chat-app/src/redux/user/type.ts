import { UserInfo } from 'models';

export interface UserState {
  loading: boolean;
  listContact: UserInfo[];

  loadingAddMessage: boolean;

  loadingMessage: boolean;
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
