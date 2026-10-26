import React from 'react';
import { Category } from '../types/book';
import { useFilterStore } from '../features/filters/useFilterStore';
import { useAppSelector } from '../app/hooks';
import { selectCategoryStats } from '../features/books/selectors';

interface TopicTile {
  category: Category;
  title: string;
  desc: string;
  accentClass: string;
}

const TOPICS: TopicTile[] = [
  {
    category: 'CNTT',
    title: 'Công nghệ & Lập trình',
    desc: 'Kiến trúc phần mềm, thuật toán, clean code, cơ sở dữ liệu và AI.',
    accentClass: 'tile-cntt',
  },
  {
    category: 'Kinh tế',
    title: 'Kinh tế & Quản trị',
    desc: 'Kinh tế vi mô - vĩ mô, tài chính doanh nghiệp và đổi mới sáng tạo.',
    accentClass: 'tile-kinhte',
  },
  {
    category: 'Ngoại ngữ',
    title: 'Ngoại ngữ & Kỹ năng',
    desc: 'Tiếng Anh học thuật, IELTS, TOEIC và giao tiếp chuyên ngành quốc tế.',
    accentClass: 'tile-ngoaingu',
  },
];

export const CategoryExplorer: React.FC = () => {
  const setCategory = useFilterStore((s) => s.setCategory);
  const activeCategory = useFilterStore((s) => s.category);
  const stats = useAppSelector(selectCategoryStats);

  const handleSelectCategory = (cat: Category) => {
    setCategory(cat);
    const catalog = document.getElementById('library-catalog');
    if (catalog) {
      catalog.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="topics-section" aria-label="Khám phá theo chủ đề">
      <div className="section-header-editorial">
        <div>
          <span className="section-eyebrow">CHỦ ĐỀ CHUYÊN MÔN</span>
          <h2 className="section-heading-editorial">Khám phá theo chuyên ngành</h2>
        </div>
        <p className="section-subtext-editorial">
          Lựa chọn lĩnh vực nghiên cứu để nhanh chóng tiếp cận nguồn tư liệu phù hợp.
        </p>
      </div>

      <div className="topics-grid">
        {TOPICS.map((topic) => {
          const count = stats[topic.category] || 0;
          const isSelected = activeCategory === topic.category;

          return (
            <button
              key={topic.category}
              type="button"
              className={`topic-tile ${topic.accentClass} ${isSelected ? 'topic-tile--selected' : ''}`}
              onClick={() => handleSelectCategory(topic.category)}
            >
              <div className="topic-tile-header">
                <span className="topic-count">{count} đầu sách</span>
                <span className="topic-arrow" aria-hidden="true">→</span>
              </div>
              <h3 className="topic-title">{topic.title}</h3>
              <p className="topic-desc">{topic.desc}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
};
