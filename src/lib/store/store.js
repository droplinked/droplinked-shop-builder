import { appDeveloment } from 'lib/utils/app/variable';
import { rootReducer } from './root-reduce';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: rootReducer,
  devTools: appDeveloment,
});
