import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectBorrowedBooks } from './selectors';
import { returnBook } from './booksSlice';
import { MAX_BORROW_LIMIT } from '../../types/book';

export const BorrowedPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const borrowedBooks = useAppSelector(selectBorrowedBooks);
  const count = borrowedBooks.length;

  return (
    <aside className="borrowed-panel" aria-labelledby="borrowed-panel-heading">
      <div className="borrowed-panel-header">
        <div className="borrowed-panel-title-group">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
          <h2 id="borrowed-panel-heading" className="borrowed-panel-title">
            Sách đang mượn
          </h2>
        </div>
        <span className={`borrowed-counter ${count === MAX_BORROW_LIMIT ? 'counter-full' : ''}`}>
          {count}/{MAX_BORROW_LIMIT}
        </span>
      </div>

      {count === 0 ? (
        <div className="borrowed-empty">
          <p className="borrowed-empty-text">Bạn chưa mượn cuốn sách nào.</p>
          <p className="borrowed-empty-sub">Tối đa có thể mượn {MAX_BORROW_LIMIT} cuốn cùng lúc.</p>
        </div>
      ) : (
        <ul className="borrowed-list">
          {borrowedBooks.map((book) => (
            <li key={book.id} className="borrowed-list-item">
              <div className="borrowed-item-info">
                <span className="borrowed-item-title" title={book.title}>
                  {book.title}
                </span>
                <span className="borrowed-item-category">{book.category}</span>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-return-compact"
                onClick={() => dispatch(returnBook(book.id))}
                aria-label={`Trả sách ${book.title}`}
              >
                Trả
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};
