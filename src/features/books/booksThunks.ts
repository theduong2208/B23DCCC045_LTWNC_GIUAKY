import { createAsyncThunk } from '@reduxjs/toolkit';
import { Book } from '../../types/book';
import { isSuccess } from '../../types/api';
import { fetchBooks } from '../../api/booksApi';

/**
 * Thunk tải sách từ API giả lập.
 * Dùng Type Guard `isSuccess` để narrowing kiểu — không cần `as`.
 */
export const fetchBooksThunk = createAsyncThunk<
  Book[],              // fulfilled payload
  boolean | undefined, // tham số (shouldFail)
  { rejectValue: string }
>('books/fetchBooks', async (shouldFail = false, { rejectWithValue }) => {
  try {
    const res = await fetchBooks(shouldFail);
    if (isSuccess(res)) return res.data;  // TypeScript hiểu res.data: Book[]
    return rejectWithValue(res.error);
  } catch (e) {
    return rejectWithValue(e instanceof Error ? e.message : 'Lỗi không xác định');
  }
});
