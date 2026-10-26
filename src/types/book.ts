// Thể loại sách (Discriminated union - dùng trong toàn bộ hệ thống)
export type Category = 'CNTT' | 'Kinh tế' | 'Ngoại ngữ';

// Thể loại dùng cho bộ lọc (gồm cả 'Tất cả')
export type FilterCategory = Category | 'Tất cả';

// Đối tượng Sách đầy đủ
export interface Book {
  id: string;
  title: string;
  author: string;
  category: Category;
  year: number;
  available: number;
  /** URL ảnh bìa theo chủ đề — từ Unsplash stable query */
  coverUrl?: string;
}

// Giới hạn số sách được mượn cùng lúc (Single Source of Truth)
export const MAX_BORROW_LIMIT = 3;

// ============================================================
// UTILITY TYPES (Yêu cầu A)
// ============================================================

/**
 * [Utility Type 1] Pick — dùng trong BorrowedPanel.
 * Chỉ lấy id, title, category cho danh sách "đang mượn" để tránh
 * truyền dữ liệu thừa xuống component con.
 */
export type BorrowedBookSummary = Pick<Book, 'id' | 'title' | 'category'>;

/**
 * [Utility Type 2] Record — dùng trong StatsPage & selectors.
 * Bắt buộc 3 khoá Category phải có giá trị number, đảm bảo bảng
 * thống kê luôn đủ dữ liệu.
 */
export type CategoryStats = Record<Category, number>;

/**
 * [Utility Type 3] Readonly — dùng trong mockBooks.ts.
 * Ngăn việc vô tình sửa dữ liệu mẫu ở runtime.
 */
export type ImmutableBook = Readonly<Book>;
