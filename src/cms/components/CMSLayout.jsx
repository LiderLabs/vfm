import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

export default function CMSLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { name: "Dashboard", path: "/cms/dashboard", icon: "📊" },
    { name: "Publications", path: "/cms/publications", icon: "📰" },
    { name: "Project Tracker", path: "/cms/projects", icon: "🏗️" },
    { name: "Sanctions", path: "/cms/sanctions", icon: "⚖️" },
    { name: "Complaints", path: "/cms/complaints", icon: "📝" },
  ];

  const handleLogout = () => {
    // In the future, this will clear the auth token
    navigate("/cms/login");
  };

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#F1F5F9", fontFamily: "'Inter', sans-serif" }}>
      
      {/* SIDEBAR */}
      <div style={{ 
        width: isSidebarOpen ? "260px" : "80px", 
        backgroundColor: "#001F3F", 
        color: "#FFFFFF", 
        display: "flex", 
        flexDirection: "column",
        transition: "width 0.3s ease",
        overflow: "hidden"
      }}>
        {/* Sidebar Header */}
        <div style={{ padding: "24px 20px", borderBottom: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "800", whiteSpace: "nowrap" }}>
            {isSidebarOpen ? "VFMO CMS" : "V"}
          </h2>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} style={{ background: "none", border: "none", color: "#FFFFFF", cursor: "pointer", fontSize: "18px" }}>
            {isSidebarOpen ? "◀" : "▶"}
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav style={{ flex: 1, padding: "20px 10px", display: "flex", flexDirection: "column", gap: "8px" }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "14px 16px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  color: isActive ? "#001F3F" : "#CBD5E1",
                  backgroundColor: isActive ? "#FCD116" : "transparent",
                  fontWeight: isActive ? "700" : "500",
                  transition: "all 0.2s ease",
                  whiteSpace: "nowrap"
                }}
              >
                <span style={{ fontSize: "20px" }}>{item.icon}</span>
                {isSidebarOpen && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div style={{ padding: "20px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <button 
            onClick={handleLogout}
            style={{ 
              width: "100%", padding: "12px", borderRadius: "6px", 
              backgroundColor: "rgba(255,255,255,0.1)", color: "#FFFFFF", 
              border: "none", fontWeight: "600", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "8px"
            }}
          >
            <span>🚪</span>
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        
        {/* TOP BAR */}
        <header style={{ 
          backgroundColor: "#FFFFFF", 
          padding: "16px 32px", 
          borderBottom: "1px solid #E2E8F0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <h1 style={{ margin: 0, fontSize: "20px", fontWeight: "800", color: "#0F172A" }}>
            {menuItems.find(item => item.path === location.pathname)?.name || "Admin Panel"}
          </h1>
          
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontSize: "14px", color: "#64748B", fontWeight: "600" }}>Admin User</span>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#001F3F", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800" }}>
              A
            </div>
          </div>
        </header>

        {/* PAGE CONTENT (Renders the sub-pages) */}
        <main style={{ flex: 1, padding: "32px", overflowY: "auto" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}