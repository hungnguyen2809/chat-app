import { combineReducers } from '@reduxjs/toolkit';
import authReducer from 'redux/auth/slice';

const createRootReducers = () => {
  return combineReducers({
    auth: authReducer,
  });
};

export default createRootReducers;
