import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';

import { ticketSlice } from './slices/ticketSlice';

const loggerMiddleware = createLogger() as never;

// Create the root reducer independently to obtain the RootState type
const rootReducer = combineReducers({
  tickets: ticketSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  // Redux Toolkit's configureStore function automatically sets up the thunk middleware by default.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      // prepend and concat calls can be chained
      .concat(loggerMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
