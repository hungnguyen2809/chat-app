import { combineReducers } from '@reduxjs/toolkit';
import authReducer from 'redux/auth/slice';
import userReducer from 'redux/user/slice';

const createRootReducers = () => {
  return combineReducers({
    auth: authReducer,
    user: userReducer,
  });
};

export default createRootReducers;
