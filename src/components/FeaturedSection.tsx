import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectBooks, selectBorrowedIds } from '../features/books/selectors';
import { borrowBook, returnBook } from '../features/books/booksSlice';

export const FeaturedSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const books = useAppSelector(selectBooks);
  const borrowedIds = useAppSelector(selectBorrowedIds);

  // Chọn 3 cuốn sách đại diện nổi bật cho 3 chuyên ngành
  const featured = useMemo(() => {
    if (books.length === 0) return [];
    const b1 = books.find((b) => b.category === 'CNTT');
    const b2 = books.find((b) => b.category === 'Kinh tế');
    const b3 = books.find((b) => b.category === 'Ngoại ngữ');
    return [b1, b2, b3].filter((b): b is NonNullable<typeof b> => Boolean(b));
  }, [books]);

  if (featured.length === 0) return null;

  return (
    <section id="featured-section" className="featured-section" aria-label="Tài liệu nổi bật">
      <div className="section-header-editorial">
        <div>
          <span className="section-eyebrow">ĐƯỢC CHỌN CHO BẠN</span>
          <h2 className="section-heading-editorial">Tiếp tục khám phá</h2>
        </div>
        <p className="section-subtext-editorial">
          Những tựa sách tiêu biểu được sinh viên và giảng viên tham khảo nhiều nhất trong kỳ.
        </p>
      </div>

      <div className="featured-grid">
        {featured.map((book) => {
          const isBorrowed = borrowedIds.includes(book.id);
          const isOutOfStock = book.available === 0;
          const isLimitReached = borrowedIds.length >= 3;
          const isBorrowDisabled = isOutOfStock || isLimitReached;

          return (
            <div
              key={book.id}
              className={`featured-card ${isBorrowed ? 'featured-card--borrowed' : ''}`}
            >
              <div className="featured-cover-wrapper">
                {book.coverUrl && (
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="featured-cover-img"
                    loading="lazy"
                  />
                )}
                <span className="featured-badge">{book.category}</span>
                {isBorrowed && (
                  <span className="featured-borrowed-pill">Đang mượn</span>
                )}
              </div>
              <div className="featured-content">
                <span className="featured-year">Xuất bản năm {book.year}</span>
                <h3 className="featured-title">{book.title}</h3>
                <p className="featured-author">{book.author}</p>
                <div className="featured-footer">
                  <span className={`stock-pill ${isOutOfStock ? 'stock-empty' : ''}`}>
                    {isOutOfStock ? 'Hết bản' : `Còn ${book.available} cuốn`}
                  </span>
                  {isBorrowed ? (
                    <button
                      type="button"
                      className="btn btn-sm btn-return btn-return--highlight"
                      onClick={() => dispatch(returnBook(book.id))}
                      aria-label={`Trả sách ${book.title}`}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="9 14 4 9 9 4" />
                        <path d="M20 20v-7a4 4 0 0 0-4-4H4" />
                      </svg>
                      Trả sách
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={`btn btn-sm btn-primary ${isBorrowDisabled ? 'btn-disabled' : ''}`}
                      disabled={isBorrowDisabled}
                      onClick={() => dispatch(borrowBook(book.id))}
                      title={
                        isOutOfStock
                          ? 'Sách đã hết bản'
                          : isLimitReached
                          ? 'Đã mượn tối đa 3/3 cuốn'
                          : 'Mượn ngay'
                      }
                    >
                      {isOutOfStock
                        ? 'Hết'
                        : isLimitReached
                        ? 'Đạt 3/3'
                        : 'Mượn ngay'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
