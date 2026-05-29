import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Lightbox } from "../components/ui/Lightbox";
import CosmicSpacePlayer from "../components/ui/CosmicSpacePlayer";

const Layout: React.FC = () => {
  const location = useLocation();
  const isNotHome = location.pathname !== "/";

  return (
    <div className="min-h-screen flex flex-col bg-void text-moonbeam relative">
      {/* Premium SVG noise grain overlay */}
      <div className="grain-overlay" />

      {/* Navbar Pinned & Sticky */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Floating Cosmic Space Player (Internal Pages Only) */}
      {isNotHome && <CosmicSpacePlayer />}

      {/* Footer Pinned */}
      <Footer />

      {/* Lightbox Trigger Modal */}
      <Lightbox />
    </div>
  );
};

export default Layout;
