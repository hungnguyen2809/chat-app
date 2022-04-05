import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import createRootReducers from './rootReducer';

const rootReducers = createRootReducers();

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddlware) => {
    return getDefaultMiddlware();
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
