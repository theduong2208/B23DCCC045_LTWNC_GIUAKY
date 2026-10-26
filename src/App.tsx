import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LibraryPage } from './pages/LibraryPage';

// [Tối ưu hiệu năng H] Lazy load trang /stats bằng React.lazy
const StatsPage = lazy(() => import('./features/stats/StatsPage'));

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Trang chủ Thư viện */}
        <Route index element={<LibraryPage />} />

        {/* Trang Thống kê với Suspense Fallback */}
        <Route
          path="stats"
          element={
            <Suspense
              fallback={
                <div className="stats-loading-fallback container" role="status">
                  <div className="spinner" aria-hidden="true" />
                  <p>Đang tải trang thống kê...</p>
                </div>
              }
            >
              <StatsPage />
            </Suspense>
          }
        />

        {/* Đường dẫn không tồn tại -> chuyển về trang chủ */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default App;
