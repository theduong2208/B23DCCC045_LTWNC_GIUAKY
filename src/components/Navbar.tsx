import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectTotalBorrowedCount } from '../features/books/selectors';
import { ThemeToggle } from '../features/theme/ThemeToggle';
import { MAX_BORROW_LIMIT } from '../types/book';

export const Navbar: React.FC = () => {
  const borrowedCount = useAppSelector(selectTotalBorrowedCount);

  return (
    <header className="site-header">
      <div className="header-inner container">
        {/* Logo / Wordmark */}
        <NavLink to="/" className="brand-logo" aria-label="Mini Library - Trang chủ">
          <div className="brand-icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          </div>
          <div className="brand-text-group">
            <span className="brand-title">Mini Library</span>
            <span className="brand-subtitle">Thư viện số khoa</span>
          </div>
        </NavLink>

        {/* Navigation links */}
        <nav className="site-nav" aria-label="Điều hướng chính">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-link ${isActive ? 'nav-link--active' : ''}`
            }
          >
            Thư viện
          </NavLink>
          <NavLink
            to="/stats"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'nav-link--active' : ''}`
            }
          >
            Thống kê
          </NavLink>
        </nav>

        {/* Action group */}
        <div className="header-actions">
          {/* Badge giỏ sách đang mượn */}
          <div className="borrowed-indicator" title={`Đang mượn ${borrowedCount}/${MAX_BORROW_LIMIT} cuốn`}>
            <span className="indicator-label">Đang mượn</span>
            <span className={`indicator-badge ${borrowedCount === MAX_BORROW_LIMIT ? 'indicator-full' : ''}`}>
              {borrowedCount}/{MAX_BORROW_LIMIT}
            </span>
          </div>

          {/* Nút chuyển chế độ sáng / tối */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
