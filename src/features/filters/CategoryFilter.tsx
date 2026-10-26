import React from 'react';
import { FilterCategory } from '../../types/book';
import { useFilterStore } from './useFilterStore';

const CATEGORIES: FilterCategory[] = ['Tất cả', 'CNTT', 'Kinh tế', 'Ngoại ngữ'];

export const CategoryFilter: React.FC = () => {
  const activeCategory = useFilterStore((s) => s.category);
  const setCategory = useFilterStore((s) => s.setCategory);

  return (
    <div className="category-filter-chips" role="radiogroup" aria-label="Lọc theo thể loại">
      {CATEGORIES.map((cat) => {
        const isActive = activeCategory === cat;
        return (
          <button
            key={cat}
            type="button"
            role="radio"
            aria-checked={isActive}
            className={`filter-chip ${isActive ? 'filter-chip--active' : ''}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
};
