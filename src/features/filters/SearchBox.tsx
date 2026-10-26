import React, { useState, useEffect } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { useFilterStore } from './useFilterStore';

export const SearchBox: React.FC = () => {
  const globalKeyword = useFilterStore((s) => s.keyword);
  const setKeyword = useFilterStore((s) => s.setKeyword);

  // Giữ state cục bộ để gõ phím mượt mà không giật lag
  const [localInput, setLocalInput] = useState(globalKeyword);

  // Debounce 300ms theo đúng yêu cầu
  const debouncedKeyword = useDebounce(localInput, 300);

  useEffect(() => {
    setKeyword(debouncedKeyword);
  }, [debouncedKeyword, setKeyword]);

  // Đồng bộ khi state Zustand bị reset từ nơi khác
  useEffect(() => {
    if (globalKeyword === '' && localInput !== '') {
      setLocalInput('');
    }
  }, [globalKeyword]);

  return (
    <div className="search-box-container">
      <label htmlFor="library-search-input" className="sr-only">
        Tìm kiếm tài liệu
      </label>
      <div className="search-input-wrapper">
        <svg
          className="search-icon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        <input
          id="library-search-input"
          type="search"
          className="search-input"
          value={localInput}
          onChange={(e) => setLocalInput(e.target.value)}
          placeholder="Tìm sách, tài liệu, chủ đề hoặc tác giả…"
          autoComplete="off"
        />

        {localInput && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={() => setLocalInput('')}
            aria-label="Xoá từ khoá tìm kiếm"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};
