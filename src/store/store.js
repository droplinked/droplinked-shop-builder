import { compose, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import { rootReducer } from './root-reduce';
import { configureStore } from '@reduxjs/toolkit';

const middleWares = [process.env.NODE_ENV === 'development' && logger].filter(
  Boolean
);

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: composedEnhancers
});