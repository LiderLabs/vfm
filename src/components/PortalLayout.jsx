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
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#F8FAFC", fontFamily: "sans-serif" }}>
      
      <style>
        {`
          /* DEFAULT MOBILE STYLES */
          .portal-sidebar {
            display: none; /* Hide sidebar on mobile */
          }

          .mobile-header {
            display: flex; /* Show mobile header */
            justify-content: space-between;
            align-items: center;
            padding: 16px 24px;
            background-color: #001F3F;
            color: white;
          }

          .main-content {
            flex: 1;
            padding: 24px;
            overflow-x: hidden; /* Prevent page-wide horizontal scroll */
          }

          .desktop-header-actions {
            display: none; /* Hide top right actions on mobile */
          }

          /* DESKTOP STYLES */
          @media (min-width: 1024px) {
            .portal-sidebar {
              display: flex; /* Show sidebar */
              flex-direction: column;
              width: 260px;
              background-color: #001F3F;
              padding: 24px 0;
              flex-shrink: 0;
            }

            .mobile-header {
              display: none; /* Hide mobile header */
            }

            .main-content {
              padding: 40px;
              overflow-y: auto;
            }

            .desktop-header-actions {
              display: flex; /* Show actions */
              gap: 16px;
              align-items: center;
            }
          }
        `}
      </style>

      {/* DESKTOP SIDEBAR */}
      <aside className="portal-sidebar">
        <SidebarContent />
      </aside>

      {/* MOBILE HEADER */}
      <div className="mobile-header" style={{ position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img src="/vfm-logo.png" alt="Logo" style={{ width: "32px", height: "32px", backgroundColor: "white", borderRadius: "50%", padding: "2px" }} />
          <span style={{ fontWeight: "800", fontSize: "16px" }}>VfM Portal</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}>
          {isMobileMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          )}
        </button>
      </div>

      {/* MOBILE SIDEBAR OVERLAY */}
      {isMobileMenuOpen && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 100 }} onClick={() => setIsMobileMenuOpen(false)}>
          <aside 
            style={{ width: "280px", height: "100%", backgroundColor: "#001F3F", display: "flex", flexDirection: "column", padding: "24px 0" }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <main className="main-content">
        
        {/* Page Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#0F172A", margin: "0 0 8px 0" }}>{pageTitle}</h1>
            <p style={{ fontSize: "14px", color: "#64748B", margin: 0 }}>{pageSubtitle}</p>
          </div>
          
          <div className="desktop-header-actions">
            <button style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
              <span style={{ position: "absolute", top: "8px", right: "10px", width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#EF4444", border: "2px solid #FFFFFF" }}></span>
            </button>
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