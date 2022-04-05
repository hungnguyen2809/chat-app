import { combineReducers } from '@reduxjs/toolkit';
import authReducer from 'redux/auth/reducers';
import userReducer from 'redux/user/reducers';

const createRootReducers = () => {
  return combineReducers({
    auth: authReducer,
    user: userReducer,
  });
};

export default createRootReducers;
