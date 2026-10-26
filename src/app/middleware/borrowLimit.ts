import type { Middleware } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { borrowBook, setWarning } from '../../features/books/booksSlice';
import { MAX_BORROW_LIMIT } from '../../types/book';

/**
 * Middleware Redux tự viết — giới hạn sinh viên mượn tối đa 3 cuốn.
 * 
 * Logic:
 * - Lắng nghe action `books/borrowBook`.
 * - Đọc state hiện tại từ `getState().books.borrowedIds`.
 * - Nếu đã đạt giới hạn (>= MAX_BORROW_LIMIT = 3):
 *   -> Chặn action bằng cách KHÔNG gọi `next(action)`.
 *   -> Dispatch action `setWarning` để thông báo cho người dùng.
 * - Các action khác đi qua bình thường bằng `return next(action)`.
 */
export const borrowLimitMiddleware: Middleware<{}, RootState> = (storeApi) => (next) => (action) => {
  if (borrowBook.match(action)) {
    const state = storeApi.getState();
    const currentBorrowedCount = state.books.borrowedIds.length;

    if (currentBorrowedCount >= MAX_BORROW_LIMIT) {
      storeApi.dispatch(
        setWarning(`Bạn chỉ được mượn tối đa ${MAX_BORROW_LIMIT} cuốn cùng lúc. Vui lòng trả bớt sách trước khi mượn tiếp!`)
      );
      // Chặn action mượn sách, không gửi tiếp tới reducer
      return;
    }
  }

  return next(action);
};
