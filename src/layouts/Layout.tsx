import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Lightbox } from "../components/ui/Lightbox";
import CosmicCursor from "../components/ui/CosmicCursor";
import CosmicSpaPlayer from "../components/ui/CosmicSpaPlayer";

const Layout: React.FC = () => {
  const location = useLocation();
  const isNotHome = location.pathname !== "/";

  return (
    <div className="min-h-screen flex flex-col bg-void text-moonbeam relative">
      {/* Premium SVG noise grain overlay */}
      <div className="grain-overlay" />

      {/* Custom celestial hover cursor */}
      <CosmicCursor />

      {/* Navbar Pinned & Sticky */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Floating Cosmic Spa Player (Internal Pages Only) */}
      {isNotHome && <CosmicSpaPlayer />}

      {/* Footer Pinned */}
      <Footer />

      {/* Lightbox Trigger Modal */}
      <Lightbox />
    </div>
  );
};

export default Layout;
