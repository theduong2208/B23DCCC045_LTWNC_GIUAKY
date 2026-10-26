import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../../types/book';
import { fetchBooksThunk } from './booksThunks';

export type BookStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface BooksState {
  items: Book[];
  status: BookStatus;
  error: string | null;
  borrowedIds: string[];
  warning: string | null;
}

export const initialState: BooksState = {
  items: [],
  status: 'idle',
  error: null,
  borrowedIds: [],
  warning: null,
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    /**
     * Mượn sách — kiểm tra 3 điều kiện:
     * 1. Sách tồn tại trong kho
     * 2. Còn bản (available > 0)
     * 3. Chưa mượn cuốn này
     * Nếu vi phạm bất kỳ điều kiện nào, state không thay đổi.
     */
    borrowBook(state, action: PayloadAction<string>) {
      const book = state.items.find((b) => b.id === action.payload);
      if (!book || book.available <= 0 || state.borrowedIds.includes(action.payload)) return;
      book.available -= 1;
      state.borrowedIds.push(action.payload);
    },

    /** Trả sách — cộng lại 1 bản, xoá id khỏi borrowedIds */
    returnBook(state, action: PayloadAction<string>) {
      if (!state.borrowedIds.includes(action.payload)) return;
      state.borrowedIds = state.borrowedIds.filter((id) => id !== action.payload);
      const book = state.items.find((b) => b.id === action.payload);
      if (book) book.available += 1;
    },

    setWarning(state, action: PayloadAction<string>) { state.warning = action.payload; },
    clearWarning(state) { state.warning = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooksThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchBooksThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchBooksThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Đã xảy ra lỗi.';
      });
  },
});

export const { borrowBook, returnBook, setWarning, clearWarning } = booksSlice.actions;
export default booksSlice.reducer;
