import { UserInfo } from 'models';

export interface UserState {
  loading: boolean;

  listContact: UserInfo[];
}
