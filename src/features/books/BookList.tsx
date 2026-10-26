import React, { useMemo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectBooks,
  selectBookStatus,
  selectBookError,
  selectBorrowedIds,
} from './selectors';
import { borrowBook, returnBook } from './booksSlice';
import { fetchBooksThunk } from './booksThunks';
import { MAX_BORROW_LIMIT } from '../../types/book';
import { useFilterStore } from '../filters/useFilterStore';
import { BookItem } from './BookItem';

export const BookList: React.FC = () => {
  const dispatch = useAppDispatch();
  const books = useAppSelector(selectBooks);
  const status = useAppSelector(selectBookStatus);
  const error = useAppSelector(selectBookError);
  const borrowedIds = useAppSelector(selectBorrowedIds);

  // Lấy riêng lẻ từ Zustand store để tránh re-render khi state khác đổi
  const keyword = useFilterStore((s) => s.keyword);
  const category = useFilterStore((s) => s.category);
  const resetFilters = useFilterStore((s) => s.reset);

  // [Tối ưu hiệu năng H] Lọc danh sách sách bằng useMemo với đúng dependencies
  const filteredBooks = useMemo(() => {
    const term = keyword.trim().toLowerCase();
    return books.filter((book) => {
      // 1. Lọc theo thể loại
      if (category !== 'Tất cả' && book.category !== category) {
        return false;
      }
      // 2. Tìm kiếm không phân biệt hoa thường theo tên hoặc tác giả
      if (term) {
        const matchesTitle = book.title.toLowerCase().includes(term);
        const matchesAuthor = book.author.toLowerCase().includes(term);
        if (!matchesTitle && !matchesAuthor) return false;
      }
      return true;
    });
  }, [books, keyword, category]);

  // [Tối ưu hiệu năng H] Callback mượn & trả sách bọc bằng useCallback
  const handleBorrow = useCallback(
    (id: string) => {
      dispatch(borrowBook(id));
    },
    [dispatch]
  );

  const handleReturn = useCallback(
    (id: string) => {
      dispatch(returnBook(id));
    },
    [dispatch]
  );

  const handleRetry = useCallback(() => {
    dispatch(fetchBooksThunk());
  }, [dispatch]);

  // 1. Trạng thái Đang tải
  if (status === 'loading') {
    return (
      <div className="state-container state-loading" role="status" aria-live="polite">
        <div className="spinner" aria-hidden="true" />
        <p className="state-message">Đang tải danh mục sách thư viện...</p>
      </div>
    );
  }

  // 2. Trạng thái Lỗi API (kèm nút Thử lại)
  if (status === 'failed') {
    return (
      <div className="state-container state-error" role="alert">
        <div className="error-icon-box" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h3 className="error-title">Không thể tải dữ liệu thư viện</h3>
        <p className="error-description">{error ?? 'Đã xảy ra lỗi khi kết nối máy chủ.'}</p>
        <button type="button" className="btn btn-primary" onClick={handleRetry}>
          Thử lại
        </button>
      </div>
    );
  }

  // 3. Trạng thái Không có kết quả sau khi tìm kiếm/lọc
  if (filteredBooks.length === 0) {
    return (
      <div className="state-container state-empty">
        <div className="empty-icon-box" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <h3 className="empty-title">Không tìm thấy tài liệu phù hợp</h3>
        <p className="empty-description">
          Không có sách nào khớp với từ khoá &ldquo;{keyword}&rdquo;
          {category !== 'Tất cả' ? ` trong thể loại ${category}` : ''}.
        </p>
        <button type="button" className="btn btn-secondary" onClick={resetFilters}>
          Xoá bộ lọc tìm kiếm
        </button>
      </div>
    );
  }

  const isLimitReached = borrowedIds.length >= MAX_BORROW_LIMIT;

  // 4. Danh sách sách chuẩn
  return (
    <div className="book-grid" role="region" aria-label="Danh sách sách">
      {filteredBooks.map((book) => (
        <BookItem
          key={book.id}
          book={book}
          isBorrowed={borrowedIds.includes(book.id)}
          isLimitReached={isLimitReached}
          onBorrow={handleBorrow}
          onReturn={handleReturn}
        />
      ))}
    </div>
  );
};
