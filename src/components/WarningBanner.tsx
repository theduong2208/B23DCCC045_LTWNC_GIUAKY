import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectWarning } from '../features/books/selectors';
import { clearWarning } from '../features/books/booksSlice';

export const WarningBanner: React.FC = () => {
  const dispatch = useAppDispatch();
  const warning = useAppSelector(selectWarning);

  // Tự động đóng sau 6 giây
  useEffect(() => {
    if (!warning) return;
    const timer = setTimeout(() => {
      dispatch(clearWarning());
    }, 6000);
    return () => clearTimeout(timer);
  }, [warning, dispatch]);

  if (!warning) return null;

  return (
    <div className="warning-banner" role="alert" aria-live="assertive">
      <div className="warning-banner-content">
        <svg
          className="warning-banner-icon"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <p className="warning-banner-text">{warning}</p>
      </div>
      <button
        type="button"
        className="warning-banner-close"
        onClick={() => dispatch(clearWarning())}
        aria-label="Đóng thông báo cảnh báo"
      >
        ×
      </button>
    </div>
  );
};
