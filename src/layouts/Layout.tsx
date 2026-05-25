          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`
        }}
      />

      {/* Navbar Pinned & Sticky */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer Pinned */}
      <Footer />

      {/* Lightbox Trigger Modal */}
      <Lightbox />
    </div>
  );
};

export default Layout;
