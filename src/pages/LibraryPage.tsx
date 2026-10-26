import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectBookStatus } from '../features/books/selectors';
import { fetchBooksThunk } from '../features/books/booksThunks';
import { HeroSection } from '../components/HeroSection';
import { FeaturedSection } from '../components/FeaturedSection';
import { CategoryExplorer } from '../components/CategoryExplorer';
import { SearchBox } from '../features/filters/SearchBox';
import { CategoryFilter } from '../features/filters/CategoryFilter';
import { BookList } from '../features/books/BookList';
import { BorrowedPanel } from '../features/books/BorrowedPanel';

export const LibraryPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectBookStatus);

  // Gọi API giả lập khi app khởi động (Yêu cầu chức năng 1)
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBooksThunk());
    }
  }, [status, dispatch]);

  return (
    <div className="library-page">
      {/* Editorial Hero */}
      <div className="container">
        <HeroSection />
      </div>

      {/* Featured Curated Books */}
      <div className="container">
        <FeaturedSection />
      </div>

      {/* Category Explorer Tiles */}
      <div className="container">
        <CategoryExplorer />
      </div>

      {/* Main Catalog & Borrowed Section */}
      <div id="library-catalog" className="catalog-section">
        <div className="container">
          <div className="catalog-header">
            <div>
              <span className="section-eyebrow">TRA CỨU & MƯỢN TRẢ</span>
              <h2 className="section-heading-editorial">Danh mục sách thư viện</h2>
            </div>
            <p className="section-subtext-editorial">
              Tìm kiếm theo tên sách hoặc tác giả, lọc theo thể loại và quản lý số sách đang mượn.
            </p>
          </div>

          {/* Filter & Search Bar */}
          <div className="catalog-controls">
            <SearchBox />
            <CategoryFilter />
          </div>

          {/* Two-column Content Layout: Book Grid + Borrowed Panel */}
          <div className="catalog-layout">
            <section className="catalog-main" aria-label="Kết quả sách">
              <BookList />
            </section>

            <aside className="catalog-aside">
              <div className="sticky-panel-wrapper">
                <BorrowedPanel />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};
