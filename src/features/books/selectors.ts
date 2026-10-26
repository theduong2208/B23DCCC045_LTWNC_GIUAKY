import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { CategoryStats, BorrowedBookSummary } from '../../types/book';

export const selectBooksState = (state: RootState) => state.books;
export const selectBooks = (state: RootState) => state.books.items;
export const selectBookStatus = (state: RootState) => state.books.status;
export const selectBookError = (state: RootState) => state.books.error;
export const selectBorrowedIds = (state: RootState) => state.books.borrowedIds;
export const selectWarning = (state: RootState) => state.books.warning;

/**
 * Danh sách sách đang được mượn.
 * Dùng Utility Type BorrowedBookSummary = Pick<Book, 'id' | 'title' | 'category'>
 */
export const selectBorrowedBooks = createSelector(
  [selectBooks, selectBorrowedIds],
  (books, borrowedIds): BorrowedBookSummary[] => {
    return books
      .filter((b) => borrowedIds.includes(b.id))
      .map(({ id, title, category }) => ({ id, title, category }));
  }
);

/**
 * Thống kê số lượng sách theo từng thể loại.
 * Dùng Utility Type CategoryStats = Record<Category, number>
 */
export const selectCategoryStats = createSelector(
  [selectBooks],
  (books): CategoryStats => {
    const stats: CategoryStats = {
      CNTT: 0,
      'Kinh tế': 0,
      'Ngoại ngữ': 0,
    };

    for (const b of books) {
      if (b.category in stats) {
        stats[b.category] += 1;
      }
    }

    return stats;
  }
);

/** Tổng số lượng sách đang mượn */
export const selectTotalBorrowedCount = (state: RootState): number =>
  state.books.borrowedIds.length;
