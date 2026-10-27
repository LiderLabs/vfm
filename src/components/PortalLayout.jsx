import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function PortalLayout({ children, pageTitle, pageSubtitle }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sidebarLinks = [
    { name: "Dashboard", path: "/dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { name: "Assessments", path: "/dashboard/assessments", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" },
    { name: "Submissions", path: "#", icon: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" },
    { name: "Monitoring", path: "#", icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" },
    { name: "Reports", path: "#", icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
  ];

  const SidebarContent = () => (
    <>
      <div style={{ padding: "0 24px 24px", borderBottom: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", gap: "12px" }}>
        <img src="/vfm-logo.png" alt="Logo" style={{ width: "36px", height: "36px", backgroundColor: "white", borderRadius: "50%", padding: "2px" }} />
        <div>
          <h1 style={{ fontSize: "14px", fontWeight: "800", color: "#FFFFFF", margin: 0, lineHeight: "1.2" }}>VfM Portal</h1>
          <p style={{ fontSize: "10px", color: "#FCD116", margin: 0, fontWeight: "700" }}>INTERNAL SYSTEM</p>
        </div>
      </div>

      <nav style={{ flex: 1, padding: "24px 12px", display: "flex", flexDirection: "column", gap: "4px", overflowY: "auto" }}>
        {sidebarLinks.map((link, index) => {
          const isActive = location.pathname === link.path || (link.path === "/dashboard" && location.pathname === "/dashboard");
          return (
            <Link
              key={index}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                display: "flex", alignItems: "center", gap: "12px", width: "100%",
                padding: "12px 16px", borderRadius: "8px", textDecoration: "none",
                backgroundColor: isActive ? "#FCD116" : "transparent",
                color: isActive ? "#001F3F" : "#94A3B8",
                fontSize: "14px", fontWeight: isActive ? "700" : "500",
                transition: "all 0.2s ease"
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={link.icon}></path></svg>
              {link.name}
              {link.name === "Assessments" && (
                <span style={{ marginLeft: "auto", backgroundColor: "#EF4444", color: "#FFFFFF", fontSize: "11px", fontWeight: "700", padding: "2px 6px", borderRadius: "10px" }}>8</span>
              )}
            </Link>
          );
        })}
      </nav>

      <div style={{ padding: "24px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
          <div style={{ width: "36px", height: "36px", backgroundColor: "#FCD116", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "800", color: "#001F3F" }}>KA</div>
          <div>
            <div style={{ fontSize: "13px", fontWeight: "700", color: "#FFFFFF" }}>Kwame Asante</div>
            <div style={{ fontSize: "11px", color: "#94A3B8" }}>Senior Analyst</div>
          </div>
        </div>
        <button onClick={() => navigate("/portal")} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", padding: "10px", backgroundColor: "rgba(255,255,255,0.1)", color: "#FFFFFF", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "600" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <div className="portal-layout-wrapper">
      
      <style>
        {`
          /* MOBILE FIRST (Default) */
          .portal-layout-wrapper {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            background-color: #F8FAFC;
            font-family: sans-serif;
          }

          .desktop-sidebar {
            display: none;
          }

          .mobile-top-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 20px;
            background-color: #001F3F;
            color: #FFFFFF;
            position: sticky;
            top: 0;
            z-index: 50;
          }

          .portal-main-content {
            flex: 1;
            padding: 24px 16px;
            width: 100%;
            overflow-x: hidden; /* Prevent horizontal scrolling */
          }

          .mobile-menu-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background-color: rgba(0,0,0,0.6);
            z-index: 999;
            display: flex;
          }

          .mobile-menu-drawer {
            width: 280px;
            height: 100%;
            background-color: #001F3F;
            display: flex;
            flex-direction: column;
            animation: slideIn 0.3s ease-out forwards;
          }

          @keyframes slideIn {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
          }

          /* DESKTOP (1024px and up) */
          @media (min-width: 1024px) {
            .portal-layout-wrapper {
              display: grid;
              grid-template-columns: 260px 1fr; /* Fixed sidebar, fluid content */
            }

            .desktop-sidebar {
              display: flex;
              flex-direction: column;
              background-color: #001F3F;
              padding: 24px 0;
              height: 100vh;
              position: sticky;
              top: 0;
            }

            .mobile-top-bar {
              display: none;
            }

            .portal-main-content {
              padding: 40px;
              overflow-y: auto;
            }
          }
        `}
      </style>

      {/* DESKTOP SIDEBAR */}
      <aside className="desktop-sidebar">
        <SidebarContent />
      </aside>

      {/* MOBILE TOP BAR */}
      <div className="mobile-top-bar">
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img src="/vfm-logo.png" alt="Logo" style={{ width: "32px", height: "32px", backgroundColor: "white", borderRadius: "50%", padding: "2px" }} />
          <span style={{ fontWeight: "800", fontSize: "16px" }}>VfM Portal</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={{ background: "none", border: "none", color: "white", cursor: "pointer", padding: "4px" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
      </div>

      {/* MOBILE DRAWER OVERLAY */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mobile-menu-drawer" onClick={(e) => e.stopPropagation()}>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <main className="portal-main-content">
        
        {/* Page Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#0F172A", margin: "0 0 8px 0" }}>{pageTitle}</h1>
            <p style={{ fontSize: "14px", color: "#64748B", margin: 0 }}>{pageSubtitle}</p>
          </div>
          
          {/* Desktop-only action buttons */}
          <div style={{ display: "none" }} className="desktop-actions">
            <button style={{ padding: "10px 20px", backgroundColor: "#001F3F", color: "#FFFFFF", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              New Assessment
            </button>
          </div>
        </div>

        {/* PAGE CONTENT */}
        {children}
      </main>

    </div>
  );
}