import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();

  const handleNavClick = (path) => {
    navigate(path);
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  };

  return (
    <header style={{ backgroundColor: "#FFFFFF", color: "#001F3F", position: "relative", zIndex: 1000, borderBottom: "1px solid #E2E8F0" }}>
      <style>
        {`
          .nav-container {
            display: flex; justify-content: space-between; align-items: center; 
            max-width: 1300px; margin: 0 auto; padding: 12px 24px; gap: 20px;
          }
          .nav-links { display: flex; gap: 20px; font-size: 14px; font-weight: 600; align-items: center; }
          .nav-link { color: #001F3F; text-decoration: none; transition: color 0.2s; cursor: pointer; display: flex; align-items: center; gap: 4px; white-space: nowrap; }
          .nav-link:hover { color: #FCD116; }
          
          /* LOGO STYLE */
          .logo-image {
            height: 55px;
            width: auto;
            object-fit: contain;
          }

          /* DESKTOP DROPDOWNS */
          .dropdown-container { position: relative; padding: 10px 0; }
          .dropdown-menu {
            position: absolute; top: 100%; left: 0; margin-top: 0px;
            background-color: #FFFFFF; min-width: 220px; border-radius: 4px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.15); padding: 8px 0;
            display: flex; flex-direction: column; z-index: 9999; border: 1px solid #E2E8F0;
          }
          .dropdown-item {
            color: #001F3F; text-decoration: none; padding: 12px 20px; font-weight: 600; font-size: 14px;
            transition: background-color 0.2s;
          }
          .dropdown-item:hover { background-color: #F0F4F8; color: #001F3F; }

          .mobile-menu-btn { display: none; background: none; border: none; color: #001F3F; cursor: pointer; }

          /* MOBILE & TABLET STYLES */
          @media (max-width: 1200px) {
            .nav-links { display: none; }
            .desktop-actions { display: none !important; } 
            .mobile-menu-btn { display: block; }
            
            .mobile-dropdown {
              position: absolute; top: 100%; left: 0; right: 0;
              background-color: #FFFFFF; border-top: 1px solid #E2E8F0;
              padding: 24px; display: flex; flex-direction: column; gap: 20px;
              box-shadow: 0 10px 20px rgba(0,0,0,0.1); transform-origin: top;
              animation: slideDown 0.3s ease-out forwards; z-index: 1000;
              max-height: calc(100vh - 80px); overflow-y: auto;
            }
            
            @keyframes slideDown {
              from { opacity: 0; transform: scaleY(0.9); }
              to { opacity: 1; transform: scaleY(1); }
            }

            .mobile-dropdown a {
              color: #001F3F; text-decoration: none; font-size: 16px; font-weight: 600;
              padding-bottom: 12px; border-bottom: 1px solid #F1F5F9;
            }
            
            .mobile-portal-btn {
              display: flex; align-items: center; justify-content: center; gap: 8px;
              background-color: #FCD116; color: #001F3F; border: none;
              padding: 16px; border-radius: 6px; font-weight: 800; font-size: 16px;
              cursor: pointer; margin-top: 12px; width: 100%;
              box-shadow: 0 4px 15px rgba(252, 209, 22, 0.2);
            }
            
            .logo-image { height: 40px; }
          }
        `}
      </style>

      <div className="nav-container">
        
        {/* Logo area */}
        <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}>
          <img 
            src="/vfm-logo.png" 
            alt="VfM Office Logo" 
            className="logo-image"
          />
        </Link>

        {/* Desktop Links */}
        <nav className="nav-links">
          <Link to="/" className="nav-link" onClick={() => handleNavClick("/")}>Home</Link>
          
          <div className="dropdown-container" onMouseEnter={() => setActiveDropdown("about")} onMouseLeave={() => setActiveDropdown(null)}>
            <span className="nav-link" onClick={() => handleNavClick("/about")}>
              About Us <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </span>
            {activeDropdown === "about" && (
              <div className="dropdown-menu">
                <Link to="/about" className="dropdown-item" onClick={() => setActiveDropdown(null)}>Overview</Link>
                <Link to="/about#leadership" className="dropdown-item" onClick={() => setActiveDropdown(null)}>Leadership</Link>
                <Link to="/about#values" className="dropdown-item" onClick={() => setActiveDropdown(null)}>Institutional Values</Link>
              </div>
            )}
          </div>

          <div className="dropdown-container" onMouseEnter={() => setActiveDropdown("whatWeDo")} onMouseLeave={() => setActiveDropdown(null)}>
            <span className="nav-link" onClick={() => handleNavClick("/what-we-do")}>
              What We Do <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </span>
            {activeDropdown === "whatWeDo" && (
              <div className="dropdown-menu">
                <Link to="/what-we-do#assessments" className="dropdown-item" onClick={() => setActiveDropdown(null)}>VfM Assessments</Link>
                <Link to="/what-we-do#evaluation" className="dropdown-item" onClick={() => setActiveDropdown(null)}>Project Evaluation</Link>
                <Link to="/what-we-do#standards" className="dropdown-item" onClick={() => setActiveDropdown(null)}>Standards & Capacity</Link>
                <Link to="/clearance" className="dropdown-item" onClick={() => setActiveDropdown(null)} style={{ borderTop: "1px solid #E2E8F0", marginTop: "4px", paddingTop: "12px" }}>Certificate of Clearance</Link>
                <Link to="/sanctions" className="dropdown-item" onClick={() => setActiveDropdown(null)}>Sanctions & Debarment</Link>
                <Link to="/open-data" className="dropdown-item" onClick={() => setActiveDropdown(null)}>Open Data & Transparency</Link>
                <Link to="/engagement" className="dropdown-item" onClick={() => setActiveDropdown(null)}>Public Engagement</Link>
                <Link to="/review-panel" className="dropdown-item" onClick={() => setActiveDropdown(null)} style={{ borderTop: "1px solid #E2E8F0", marginTop: "4px", paddingTop: "12px" }}>Review Panel</Link>
              </div>
            )}
          </div>

          <Link to="/publications" className="nav-link" onClick={() => handleNavClick("/publications")}>Publications</Link>
          <Link to="/news" className="nav-link" onClick={() => handleNavClick("/news")}>News & Insights</Link>
          <Link to="/contact" className="nav-link" onClick={() => handleNavClick("/contact")}>Contact</Link>
        </nav>

        {/* Desktop Right Actions */}
        <div className="desktop-actions" style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
          
          <Link to="/submit" title="Report a Concern" style={{ 
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#001F3F", textDecoration: "none", 
            border: "1px solid #CBD5E1", width: "42px", height: "42px", borderRadius: "4px",
            transition: "all 0.2s ease"
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#F8FAFC"; e.currentTarget.style.borderColor = "#001F3F"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.borderColor = "#CBD5E1"; }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
          </Link>

          {/* Portal Button back to Gold */}
          <button onClick={() => handleNavClick("/portal")} style={{ 
            display: "flex", alignItems: "center", justifyContent: "center",
            backgroundColor: "#FCD116", color: "#001F3F", border: "none",
            padding: "12px 24px", borderRadius: "4px", fontWeight: "800", fontSize: "14px",
            cursor: "pointer", transition: "all 0.3s ease",
            boxShadow: "0 4px 15px rgba(252, 209, 22, 0.2)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(252, 209, 22, 0.4)";
            e.currentTarget.style.backgroundColor = "#FFDE45";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 15px rgba(252, 209, 22, 0.2)";
            e.currentTarget.style.backgroundColor = "#FCD116";
          }}
          >
            Portal
          </button>
        </div>

        {/* Mobile Hamburger Icon */}
        <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-dropdown">
          <Link to="/" onClick={() => handleNavClick("/")}>Home</Link>
          <Link to="/about" onClick={() => handleNavClick("/about")}>About Us</Link>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", paddingLeft: "16px", borderLeft: "2px solid #E2E8F0" }}>
            <span style={{ fontSize: "12px", fontWeight: "700", color: "#64748B", textTransform: "uppercase", letterSpacing: "1px" }}>What We Do</span>
            <Link to="/what-we-do#assessments" onClick={() => handleNavClick("/what-we-do")} style={{ fontSize: "14px", borderBottom: "none" }}>VfM Assessments</Link>
            <Link to="/what-we-do#evaluation" onClick={() => handleNavClick("/what-we-do")} style={{ fontSize: "14px", borderBottom: "none" }}>Project Evaluation</Link>
            <Link to="/what-we-do#standards" onClick={() => handleNavClick("/what-we-do")} style={{ fontSize: "14px", borderBottom: "none" }}>Standards & Capacity</Link>
            <Link to="/clearance" onClick={() => handleNavClick("/clearance")} style={{ fontSize: "14px", borderBottom: "none", color: "#FCD116" }}>Certificate of Clearance</Link>
            <Link to="/sanctions" onClick={() => handleNavClick("/sanctions")} style={{ fontSize: "14px", borderBottom: "none", color: "#FCD116" }}>Sanctions & Debarment</Link>
            <Link to="/open-data" onClick={() => handleNavClick("/open-data")} style={{ fontSize: "14px", borderBottom: "none", color: "#FCD116" }}>Open Data & Transparency</Link>
            <Link to="/engagement" onClick={() => handleNavClick("/engagement")} style={{ fontSize: "14px", borderBottom: "none", color: "#FCD116" }}>Public Engagement</Link>
            <Link to="/review-panel" onClick={() => handleNavClick("/review-panel")} style={{ fontSize: "14px", borderBottom: "none", color: "#FCD116" }}>Review Panel</Link>
          </div>

          <Link to="/publications" onClick={() => handleNavClick("/publications")}>Publications</Link>
          <Link to="/news" onClick={() => handleNavClick("/news")}>News & Insights</Link>
          <Link to="/contact" onClick={() => handleNavClick("/contact")}>Contact</Link>
          
          <Link to="/track" onClick={() => handleNavClick("/track")} style={{ fontSize: "16px", fontWeight: "600", color: "#001F3F", textDecoration: "none", paddingBottom: "12px", borderBottom: "1px solid #F1F5F9" }}>
            Track a Complaint
          </Link>

          <Link to="/submit" onClick={() => handleNavClick("/submit")} style={{ fontSize: "16px", fontWeight: "600", color: "#001F3F", textDecoration: "none", paddingBottom: "12px", borderBottom: "1px solid #F1F5F9", display: "flex", alignItems: "center", gap: "8px" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
            Report a Concern
          </Link>

          <button className="mobile-portal-btn" onClick={() => handleNavClick("/portal")}>
            Portal Login
          </button>
        </div>
      )}
    </header>
  );
}