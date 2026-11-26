import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

// ========================================================
// HAND-DRAWN ICONS FOR SIDEBAR
// ========================================================
const HandDrawnDashboard = () => (
  <svg width="22" height="22" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="6" width="15" height="15" rx="2" />
    <rect x="27" y="6" width="15" height="15" rx="2" />
    <rect x="6" y="27" width="15" height="15" rx="2" />
    <rect x="27" y="27" width="15" height="15" rx="2" />
  </svg>
);

const HandDrawnHome = () => (
  <svg width="22" height="22" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 24 L24 8 L40 24" />
    <path d="M12 22 L12 40 L36 40 L36 22" />
    <rect x="20" y="28" width="8" height="12" rx="1" />
  </svg>
);

const HandDrawnNews = () => (
  <svg width="22" height="22" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 8 L38 8 C39.5 8, 40 9.5, 40 11 L40 40 L10 40 C8.5 40, 8 38.5, 8 37 L8 11 C8 9.5, 9.5 8, 10 8 Z" />
    <path d="M14 16 L34 16" strokeWidth="2" />
    <path d="M14 24 L34 24" strokeWidth="2" />
    <path d="M14 32 L24 32" strokeWidth="2" />
  </svg>
);

export default function CMSLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/cms/dashboard", icon: HandDrawnDashboard },
    { name: "Homepage", path: "/cms/homepage", icon: HandDrawnHome },
    { name: "Publications", path: "/cms/publications", icon: HandDrawnNews },
  ];

  const handleLogout = () => {
    navigate("/cms/login");
  };

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#00172E", fontFamily: "'Inter', sans-serif" }}>
      
      {/* SIDEBAR */}
      <div style={{ 
        width: isSidebarOpen ? "260px" : "80px", 
        backgroundColor: "#001F3F", 
        color: "#FFFFFF", 
        display: "flex", 
        flexDirection: "column",
        transition: "width 0.3s ease",
        overflow: "visible", // Changed from hidden to visible so the toggle arrow can stick out
        boxShadow: "4px 0 15px rgba(0,0,0,0.05)",
        zIndex: 10,
        position: "relative"
      }}>
        {/* Sidebar Header (White background aligned with Top Bar) */}
        <div style={{ 
          height: "72px",
          backgroundColor: "#FFFFFF", 
          borderBottom: "1px solid #E2E8F0", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", // Centered logo for both states
          padding: isSidebarOpen ? "0 20px" : "0",
          flexShrink: 0,
          position: "relative"
        }}>
          
          {/* Logo */}
          <div style={{ 
            height: "100%",
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            transition: "all 0.3s ease",
            overflow: "hidden",
            paddingTop: "8px",
            paddingBottom: "8px",
            width: "100%"
          }}>
            <img 
              src="/vfm-logo.png" 
              alt="VFMO Logo" 
              style={{ 
                height: "100%", 
                width: "auto",
                maxWidth: isSidebarOpen ? "180px" : "50px",
                objectFit: "contain",
              }} 
            />
          </div>

          {/* Toggle Button (Expanded state) */}
          {isSidebarOpen && (
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
              style={{ 
                position: "absolute",
                right: "20px", // Kept inside the white area when expanded
                background: "#F1F5F9", 
                border: "1px solid #E2E8F0", 
                color: "#64748B", 
                cursor: "pointer", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                width: "28px",
                height: "28px",
                borderRadius: "6px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#001F3F"; e.currentTarget.style.background = "#E2E8F0"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#64748B"; e.currentTarget.style.background = "#F1F5F9"; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
          )}
        </div>

        {/* Toggle Button (Minimized state) - Overlapping the border nicely */}
        {!isSidebarOpen && (
          <button 
            onClick={() => setIsSidebarOpen(true)} 
            style={{ 
              position: "absolute",
              top: "22px", // Vertically centered in the 72px header
              right: "-14px", // Sticks out half-way
              background: "#FFFFFF", // Matches header background
              border: "1px solid #E2E8F0", 
              color: "#64748B", 
              cursor: "pointer", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              width: "28px",
              height: "28px",
              borderRadius: "50%", // Circular button
              transition: "all 0.2s ease",
              zIndex: 20,
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#001F3F"; e.currentTarget.style.background = "#F1F5F9"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#64748B"; e.currentTarget.style.background = "#FFFFFF"; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        )}

        {/* Sidebar Navigation */}
        <nav style={{ flex: 1, padding: "20px 12px", display: "flex", flexDirection: "column", gap: "6px", overflowY: "auto" }}>
          {isSidebarOpen && (
            <div style={{ padding: "10px 12px", fontSize: "11px", fontWeight: "700", color: "#64748B", textTransform: "uppercase", letterSpacing: "1px" }}>
              Website Management
            </div>
          )}
          
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: isSidebarOpen ? "flex-start" : "center",
                  gap: "16px",
                  padding: "14px",
                  borderRadius: "10px",
                  textDecoration: "none",
                  color: isActive ? "#001F3F" : "#CBD5E1",
                  backgroundColor: isActive ? "#FCD116" : "transparent",
                  fontWeight: isActive ? "700" : "500",
                  transition: "all 0.2s ease",
                  whiteSpace: "nowrap"
                }}
              >
                <span style={{ display: "flex", alignItems: "center", flexShrink: 0 }}><Icon /></span>
                {isSidebarOpen && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* SIDEBAR BASE: ADMIN PROFILE */}
        <div style={{ padding: "20px 12px", borderTop: "1px solid rgba(255,255,255,0.1)", position: "relative" }}>
          
          <div 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            style={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: isSidebarOpen ? "flex-start" : "center", 
              gap: "12px", 
              cursor: "pointer", 
              padding: "8px",
              borderRadius: "8px",
              transition: "background 0.2s",
              backgroundColor: isProfileOpen ? "rgba(255,255,255,0.1)" : "transparent"
            }}
            onMouseEnter={(e) => { if (!isProfileOpen) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)"; }}
            onMouseLeave={(e) => { if (!isProfileOpen) e.currentTarget.style.backgroundColor = "transparent"; }}
          >
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "#FCD116", color: "#001F3F", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "16px", flexShrink: 0 }}>
              A
            </div>
            {isSidebarOpen && (
              <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
                <span style={{ fontSize: "14px", fontWeight: "700", color: "#FFF", whiteSpace: "nowrap" }}>Admin User</span>
                <span style={{ fontSize: "12px", color: "#94A3B8", whiteSpace: "nowrap" }}>Content Manager</span>
              </div>
            )}
          </div>

          {/* Profile Dropdown Menu - UPDATED DARK THEME & POSITION */}
          {isProfileOpen && (
            <div style={{ 
              position: "absolute", 
              bottom: "80px", 
              left: isSidebarOpen ? "20px" : "80px", // Pops out to the right if minimized
              backgroundColor: "#0A2540", // Dark navy background
              borderRadius: "10px", 
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)", 
              width: "200px", 
              overflow: "hidden", 
              zIndex: 100, 
              border: "1px solid rgba(255,255,255,0.1)" 
            }}>
              <div 
                style={{ padding: "14px 16px", borderBottom: "1px solid rgba(255,255,255,0.05)", cursor: "pointer", transition: "background 0.2s" }} 
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)"} 
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
              >
                <span style={{ fontSize: "14px", fontWeight: "600", color: "#E2E8F0" }}>My Profile</span>
              </div>
              <div 
                onClick={handleLogout}
                style={{ padding: "14px 16px", cursor: "pointer", transition: "background 0.2s" }} 
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(251, 113, 133, 0.1)"} 
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
              >
                <span style={{ fontSize: "14px", fontWeight: "700", color: "#FB7185" }}>Sign Out</span>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        
        {/* TOP BAR */}
        <header style={{ 
          backgroundColor: "#FFFFFF", 
          padding: "16px 32px", 
          height: "72px",
          borderBottom: "1px solid #E2E8F0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
          zIndex: 5
        }}>
          <h1 style={{ margin: 0, fontSize: "20px", fontWeight: "800", color: "#0F172A" }}>
            {menuItems.find(item => item.path === location.pathname)?.name || "Admin Panel"}
          </h1>
          
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <Link to="/" target="_blank" style={{ textDecoration: "none" }}>
              <button style={{ 
                backgroundColor: "#F8FAFC", color: "#001F3F", border: "1px solid #CBD5E1", 
                padding: "8px 16px", borderRadius: "6px", fontWeight: "700", fontSize: "13px", 
                cursor: "pointer", display: "flex", alignItems: "center", gap: "6px",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#F1F5F9"; e.currentTarget.style.borderColor = "#001F3F"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#F8FAFC"; e.currentTarget.style.borderColor = "#CBD5E1"; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                View Live Site
              </button>
            </Link>
          </div>
        </header>

        <main style={{ flex: 1, backgroundColor: "#00172E", overflowY: "auto" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}