import React from 'react';
import { Book } from '../../types/book';

export interface BookItemProps {
  book: Book;
  isBorrowed: boolean;
  onBorrow: (id: string) => void;
  onReturn: (id: string) => void;
  isLimitReached?: boolean;
}

/**
 * Component hiển thị một cuốn sách.
 * Bọc bằng `React.memo` để tránh render lại không cần thiết khi danh sách
 * hoặc các cuốn khác thay đổi trạng thái.
 */
export const BookItem: React.FC<BookItemProps> = React.memo(
  ({ book, isBorrowed, onBorrow, onReturn, isLimitReached = false }) => {
    const isOutOfStock = book.available === 0;
    const isBorrowDisabled = isOutOfStock || isLimitReached;

    return (
      <article
        className={`book-card ${isBorrowed ? 'book-card--borrowed' : ''}`}
        data-book-id={book.id}
      >
        {/* Khung ảnh bìa tài liệu */}
        <div className="book-card-cover">
          {book.coverUrl ? (
            <img
              src={book.coverUrl}
              alt={`Bìa sách ${book.title}`}
              loading="lazy"
              className="book-cover-img"
              onError={(e) => {
                // Fallback nếu ảnh không tải được
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          ) : null}
          <div className="book-card-badge-container">
            <span className="book-category-badge">{book.category}</span>
            {isBorrowed && (
              <span className="book-borrowed-tag">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Bạn đang mượn
              </span>
            )}
          </div>
        </div>

        {/* Nội dung thông tin sách */}
        <div className="book-card-body">
          <div className="book-card-meta">
            <span className="book-year">Năm {book.year}</span>
            <span
              className={`book-stock-indicator ${
                isOutOfStock ? 'stock-empty' : 'stock-available'
              }`}
            >
              {isOutOfStock ? 'Hết bản' : `Còn ${book.available} bản`}
            </span>
          </div>

          <h3 className="book-title" title={book.title}>
            {book.title}
          </h3>

          <p className="book-author">
            <span className="sr-only">Tác giả: </span>
            {book.author}
          </p>

          <div className="book-card-actions">
            {isBorrowed ? (
              <button
                type="button"
                className="btn btn-return btn-return--highlight"
                onClick={() => onReturn(book.id)}
                aria-label={`Trả sách ${book.title}`}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="9 14 4 9 9 4" />
                  <path d="M20 20v-7a4 4 0 0 0-4-4H4" />
                </svg>
                Trả sách
              </button>
            ) : (
              <button
                type="button"
                className={`btn btn-primary btn-borrow ${isBorrowDisabled ? 'btn-disabled' : ''}`}
                disabled={isBorrowDisabled}
                onClick={() => onBorrow(book.id)}
                title={
                  isOutOfStock
                    ? 'Sách đã hết bản trên kệ'
                    : isLimitReached
                    ? 'Bạn đã đạt giới hạn mượn 3/3 cuốn'
                    : 'Mượn sách'
                }
              >
                {isOutOfStock ? (
                  'Hết sách'
                ) : isLimitReached ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    Đạt giới hạn (3/3)
                  </>
                ) : (
                  <>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                    Mượn sách
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </article>
    );
  }
);

BookItem.displayName = 'BookItem';
