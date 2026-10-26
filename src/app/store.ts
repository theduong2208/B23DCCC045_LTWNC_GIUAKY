import { configureStore, combineReducers } from '@reduxjs/toolkit';
import booksReducer from '../features/books/booksSlice';
import { borrowLimitMiddleware } from './middleware/borrowLimit';

export const rootReducer = combineReducers({
  books: booksReducer,
});

/**
 * Factory tạo Redux Store — giúp dễ dàng tạo store độc lập cho Unit Tests
 * mà không bị nhiễm state giữa các bài test.
 */
export function makeStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(borrowLimitMiddleware),
  });
}

// Instance store chính của ứng dụng
export const store = makeStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
