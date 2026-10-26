import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="footer-title">Mini Library</span>
          <p className="footer-desc">
            Nền tảng tra cứu và mượn/trả giáo trình học thuật số — Khoa Công nghệ & Kinh tế.
          </p>
        </div>
        <div className="footer-meta">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Thư viện khoa. Chuẩn React 18 + TypeScript Strict.
          </p>
          <div className="footer-badges">
            <span className="tech-badge">Redux Toolkit</span>
            <span className="tech-badge">Zustand</span>
            <span className="tech-badge">Vite</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
