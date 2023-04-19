import { rootReducer } from './root-reduce';
import { configureStore } from '@reduxjs/toolkit';
import { appDeveloment } from 'utils/app/variable';

export const store = configureStore({
  reducer: rootReducer,
  devTools: appDeveloment,
});