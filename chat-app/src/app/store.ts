import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import createRootReducers from './rootReducer';
import rootSagas from './rootSaga';

const sagaMiddleware = createSagaMiddleware();
const rootReducers = createRootReducers();

const middleware = [sagaMiddleware];

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddlware) => {
    return getDefaultMiddlware({ serializableCheck: false }).concat(middleware);
  },
});

sagaMiddleware.run(rootSagas);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
