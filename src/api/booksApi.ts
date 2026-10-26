import { Book } from '../types/book';
import { ApiResponse } from '../types/api';
import { MOCK_BOOKS } from './mockBooks';

/** Hằng số: bật true để luôn giả lập lỗi (dùng khi dev) */
export const FORCE_API_FAILURE = false;

/** Kiểm tra URL query ?fail=1 — cho phép demo lỗi không cần sửa code */
function shouldSimulateError(): boolean {
  if (typeof window === 'undefined') return false;
  const p = new URLSearchParams(window.location.search);
  const v = p.get('fail');
  return v === '1' || v === 'true';
}

/**
 * API giả lập lấy danh sách sách — delay 500ms.
 * @param shouldFail  true → trả về lỗi (dùng trong unit test)
 */
export function fetchBooks(shouldFail = false): Promise<ApiResponse<Book[]>> {
  const isError = shouldFail || FORCE_API_FAILURE || shouldSimulateError();
  return new Promise((resolve) => {
    setTimeout(() => {
      if (isError) {
        resolve({ ok: false, error: 'Không thể kết nối máy chủ thư viện. Vui lòng thử lại!' });
      } else {
        resolve({ ok: true, data: MOCK_BOOKS.map((b) => ({ ...b })) });
      }
    }, 500);
  });
}
