import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { WarningBanner } from './WarningBanner';
import { Footer } from './Footer';

export const Layout: React.FC = () => {
  return (
    <div className="site-wrapper">
      <Navbar />
      <div className="container banner-container">
        <WarningBanner />
      </div>
      <main className="site-main" id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
