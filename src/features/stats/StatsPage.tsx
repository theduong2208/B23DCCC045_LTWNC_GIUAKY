import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectBooks,
  selectBookStatus,
  selectCategoryStats,
  selectTotalBorrowedCount,
} from '../books/selectors';
import { fetchBooksThunk } from '../books/booksThunks';
import { Category, MAX_BORROW_LIMIT } from '../../types/book';

const StatsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const books = useAppSelector(selectBooks);
  const status = useAppSelector(selectBookStatus);
  const categoryStats = useAppSelector(selectCategoryStats);
  const totalBorrowed = useAppSelector(selectTotalBorrowedCount);

  // Tải dữ liệu nếu người dùng truy cập trực tiếp vào /stats
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBooksThunk());
    }
  }, [status, dispatch]);

  const totalTitles = books.length;
  const totalCopies = books.reduce((acc, b) => acc + b.available, 0);
  const categoriesList: Category[] = ['CNTT', 'Kinh tế', 'Ngoại ngữ'];

  return (
    <div className="stats-page container">
      {/* Header section */}
      <div className="stats-header">
        <div className="stats-breadcrumb">
          <Link to="/" className="breadcrumb-link">Thư viện</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">Thống kê</span>
        </div>
        <span className="section-eyebrow">DỮ LIỆU THƯ VIỆN KHOA</span>
        <h1 className="stats-title">Báo cáo & Thống kê tri thức</h1>
        <p className="stats-description">
          Tổng quan số lượng đầu sách theo từng chuyên ngành đào tạo và tình trạng lưu hành thực tế.
        </p>
      </div>

      {/* Overview Stat Cards */}
      <div className="stats-overview-grid">
        <div className="stat-card">
          <span className="stat-card-label">Tổng đầu sách</span>
          <div className="stat-card-value">{totalTitles}</div>
          <span className="stat-card-sub">Trong danh mục hiện hành</span>
        </div>

        <div className="stat-card stat-card-highlight">
          <span className="stat-card-label">Sách bạn đang mượn</span>
          <div className="stat-card-value">
            {totalBorrowed}
            <span className="stat-card-limit">/{MAX_BORROW_LIMIT}</span>
          </div>
          <span className="stat-card-sub">
            {totalBorrowed >= MAX_BORROW_LIMIT
              ? 'Đã đạt giới hạn tối đa'
              : `Còn có thể mượn thêm ${MAX_BORROW_LIMIT - totalBorrowed} cuốn`}
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-card-label">Tổng bản còn trên kệ</span>
          <div className="stat-card-value">{totalCopies}</div>
          <span className="stat-card-sub">Sẵn sàng để sinh viên mượn</span>
        </div>

        <div className="stat-card">
          <span className="stat-card-label">Chuyên ngành chính</span>
          <div className="stat-card-value">{categoriesList.length}</div>
          <span className="stat-card-sub">CNTT, Kinh tế, Ngoại ngữ</span>
        </div>
      </div>

      {/* Category Breakdown Table / Cards */}
      <section className="stats-category-section" aria-labelledby="category-breakdown-heading">
        <div className="section-header-editorial">
          <div>
            <span className="section-eyebrow">PHÂN BỐ TÀI LIỆU</span>
            <h2 id="category-breakdown-heading" className="section-heading-editorial">
              Số đầu sách theo từng thể loại
            </h2>
          </div>
          <p className="section-subtext-editorial">
            Dữ liệu được trích xuất thời gian thực bằng Utility Type <code>Record&lt;Category, number&gt;</code>.
          </p>
        </div>

        <div className="category-stats-grid">
          {categoriesList.map((cat) => {
            const count = categoryStats[cat] || 0;
            const percentage = totalTitles > 0 ? Math.round((count / totalTitles) * 100) : 0;

            return (
              <div key={cat} className="category-stat-box">
                <div className="category-stat-header">
                  <span className="cat-badge">{cat}</span>
                  <span className="cat-percentage">{percentage}%</span>
                </div>
                <div className="cat-count-group">
                  <span className="cat-count-number">{count}</span>
                  <span className="cat-count-unit">đầu sách</span>
                </div>
                {/* Visual bar */}
                <div className="cat-progress-track">
                  <div
                    className="cat-progress-bar"
                    style={{ width: `${percentage}%` }}
                    aria-label={`Tỷ lệ ${percentage}%`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Return to Library CTA */}
      <div className="stats-bottom-action">
        <Link to="/" className="btn btn-primary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Quay lại Thư viện mượn sách
        </Link>
      </div>
    </div>
  );
};

export default StatsPage;
