import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import userReducer from './user-slice';

export const storeReducers = {
  user: userReducer,
};

export const makeStore = () =>
  configureStore({
    reducer: storeReducers,
  });

const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
