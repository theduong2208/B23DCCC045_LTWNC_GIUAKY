import React from 'react';

export const HeroSection: React.FC = () => {
  const scrollToCatalog = () => {
    const el = document.getElementById('library-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section" aria-label="Giới thiệu thư viện">
      <div className="hero-grid">
        <div className="hero-content">
          <span className="hero-eyebrow">KHÔNG GIAN TRI THỨC SỐ</span>
          <h1 className="hero-headline">
            Ý tưởng hay bắt đầu từ những điều bạn đọc.
          </h1>
          <p className="hero-description">
            Khám phá tài liệu, tra cứu giáo trình chuyên ngành và xây dựng thư viện tri thức
            khoa học của riêng bạn trong không gian học thuật số hiện đại.
          </p>

          <div className="hero-actions">
            <button
              type="button"
              className="btn btn-primary btn-hero"
              onClick={scrollToCatalog}
            >
              Khám phá thư viện
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="12" y1="5" x2="12" y2="19" />
                <polyline points="19 12 12 19 5 12" />
              </svg>
            </button>
            <a href="#featured-section" className="btn btn-secondary btn-hero">
              Tài liệu chọn lọc
            </a>
          </div>

          <div className="hero-stats-mini">
            <div className="mini-stat-item">
              <span className="mini-stat-number">18+</span>
              <span className="mini-stat-label">Đầu sách chuẩn</span>
            </div>
            <div className="mini-stat-divider" />
            <div className="mini-stat-item">
              <span className="mini-stat-number">3</span>
              <span className="mini-stat-label">Chuyên ngành chính</span>
            </div>
            <div className="mini-stat-divider" />
            <div className="mini-stat-item">
              <span className="mini-stat-number">100%</span>
              <span className="mini-stat-label">Tài liệu tra cứu mở</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image-card">
            <img
              src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80"
              alt="Không gian thư viện học thuật và sách nghiên cứu"
              className="hero-image"
              loading="eager"
            />
            <div className="hero-image-caption">
              <span className="caption-tag">Editorial</span>
              <span className="caption-text">Không gian tri thức khoa Công nghệ & Kinh tế</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
