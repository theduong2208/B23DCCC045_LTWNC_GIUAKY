import { create } from 'zustand';
import { FilterCategory } from '../../types/book';

export interface FilterState {
  keyword: string;
  category: FilterCategory;
  setKeyword: (keyword: string) => void;
  setCategory: (category: FilterCategory) => void;
  reset: () => void;
}

/**
 * Zustand Store quản lý trạng thái bộ lọc (Search keyword & Category chip).
 * Giữ state bộ lọc tách biệt khỏi Redux giúp việc nhập liệu nhanh và độc lập.
 */
export const useFilterStore = create<FilterState>((set) => ({
  keyword: '',
  category: 'Tất cả',
  setKeyword: (keyword: string) => set({ keyword }),
  setCategory: (category: FilterCategory) => set({ category }),
  reset: () => set({ keyword: '', category: 'Tất cả' }),
}));
