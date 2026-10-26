import { useState, useEffect } from 'react';

/**
 * Hoãn cập nhật `value` cho đến khi không có thay đổi trong `delay` ms.
 * Dọn timer trong cleanup để tránh memory leak.
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState<T>(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}
