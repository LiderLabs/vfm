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
    <header style={{ backgroundColor: "#001F3F", color: "#FFFFFF", position: "relative", zIndex: 1000 }}>
      <style>
        {`
          .nav-container {
            display: flex; justify-content: space-between; align-items: center; 
            max-width: 1300px; margin: 0 auto; padding: 16px 24px;
          }
          .nav-links { display: flex; gap: 24px; font-size: 14px; font-weight: 500; align-items: center; }
          .nav-link { color: #FFFFFF; text-decoration: none; transition: color 0.2s; cursor: pointer; display: flex; align-items: center; gap: 4px; }
          .nav-link:hover { color: #FCD116; }
          
          /* DESKTOP DROPDOWNS */
          .dropdown-container { position: relative; padding: 10px 0; }
          
          .dropdown-menu {
            position: absolute; top: 100%; left: 0; margin-top: 0px;
            background-color: #FFFFFF; min-width: 220px; border-radius: 4px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.3); padding: 8px 0;
            display: flex; flex-direction: column;
            z-index: 9999; 
          }
          
          .dropdown-item {
            color: #001F3F; text-decoration: none; padding: 12px 20px; font-weight: 600; font-size: 14px;
            transition: background-color 0.2s;
          }
          .dropdown-item:hover { background-color: #F0F4F8; }

          .mobile-menu-btn { display: none; background: none; border: none; color: white; cursor: pointer; }

          /* MOBILE STYLES */
          @media (max-width: 1150px) {
            .nav-links { display: none; }
            .desktop-actions { display: none; }
            .mobile-menu-btn { display: block; }
            
            .mobile-dropdown {
              position: absolute; top: 100%; left: 0; right: 0;
              background-color: #001F3F; border-top: 1px solid rgba(255,255,255,0.1);
              padding: 24px; display: flex; flex-direction: column; gap: 20px;
              box-shadow: 0 10px 20px rgba(0,0,0,0.3); transform-origin: top;
              animation: slideDown 0.3s ease-out forwards; z-index: 1000;
              max-height: calc(100vh - 80px); overflow-y: auto;
            }
            
            @keyframes slideDown {
              from { opacity: 0; transform: scaleY(0.9); }
              to { opacity: 1; transform: scaleY(1); }
            }

            .mobile-dropdown a {
              color: #FFFFFF; text-decoration: none; font-size: 16px; font-weight: 600;
              padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.05);
            }
            .mobile-actions {
              display: flex; flex-direction: column; gap: 12px; margin-top: 12px;
            }
          }
        `}
      </style>

      <div className="nav-container">
        
        {/* Logo area */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none", color: "white" }}>
          <img 
            src="/vfm-logo.png" 
            alt="VfM Office Logo" 
            style={{ width: "50px", height: "50px", objectFit: "contain", backgroundColor: "white", borderRadius: "50%", padding: "2px" }} 
          />
          <div>
            <h1 style={{ margin: 0, fontSize: "18px", fontWeight: "800", letterSpacing: "1px", lineHeight: "1.2" }}>
              VALUE FOR MONEY<br/>OFFICE
            </h1>
            <p style={{ margin: 0, fontSize: "10px", color: "#FCD116", fontWeight: "700", letterSpacing: "1px", marginTop: "4px" }}>
              REPUBLIC OF GHANA
            </p>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="nav-links">
          <Link to="/" className="nav-link" onClick={() => handleNavClick("/")}>Home</Link>
          
          {/* About Us Dropdown */}
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

          <Link to="/mandate" className="nav-link" onClick={() => handleNavClick("/mandate")}>Our Mandate</Link>

          {/* What We Do Dropdown */}
          <div className="dropdown-container" onMouseEnter={() => setActiveDropdown("whatWeDo")} onMouseLeave={() => setActiveDropdown(null)}>
            <span className="nav-link" onClick={() => handleNavClick("/what-we-do")}>
              What We Do <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </span>
            {activeDropdown === "whatWeDo" && (
              <div className="dropdown-menu">
                <Link to="/what-we-do#assessments" className="dropdown-item" onClick={() => setActiveDropdown(null)}>VfM Assessments</Link>
                <Link to="/what-we-do#evaluation" className="dropdown-item" onClick={() => setActiveDropdown(null)}>Project Evaluation</Link>
                <Link to="/what-we-do#standards" className="dropdown-item" onClick={() => setActiveDropdown(null)}>Standards & Capacity</Link>
              </div>
            )}
          </div>

          <Link to="/publications" className="nav-link" onClick={() => handleNavClick("/publications")}>Publications</Link>
          <Link to="/news" className="nav-link" onClick={() => handleNavClick("/news")}>News & Insights</Link>
          <Link to="/contact" className="nav-link" onClick={() => handleNavClick("/contact")}>Contact</Link>
        </nav>

        {/* Desktop Right Actions */}
        <div className="desktop-actions" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button onClick={() => handleNavClick("/publications")} style={{ 
            backgroundColor: "#001F3F", border: "1px solid #FFFFFF", color: "#FFFFFF", 
            padding: "10px 16px", borderRadius: "4px", fontWeight: "600", 
            cursor: "pointer", fontSize: "14px", lineHeight: "1.2", textAlign: "left",
            transition: "background-color 0.2s"
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#001F3F"}
          >
            Publications &<br/>Reports
          </button>
          
          <button onClick={() => handleNavClick("/portal")} style={{ 
            backgroundColor: "#001F3F", color: "#FFFFFF", border: "1px solid rgba(255,255,255,0.4)", 
            width: "44px", height: "44px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", transition: "background-color 0.2s"
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#001F3F"}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"></path><path d="M9 8h1"></path><path d="M9 12h1"></path><path d="M9 16h1"></path><path d="M14 8h1"></path><path d="M14 12h1"></path><path d="M14 16h1"></path><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"></path></svg>
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
          <Link to="/mandate" onClick={() => handleNavClick("/mandate")}>Our Mandate</Link>
          
          {/* Mobile Sub-menu for What We Do */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", paddingLeft: "16px", borderLeft: "2px solid rgba(255,255,255,0.1)" }}>
            <span style={{ fontSize: "12px", fontWeight: "700", color: "#FCD116", textTransform: "uppercase", letterSpacing: "1px" }}>What We Do</span>
            <Link to="/what-we-do#assessments" onClick={() => handleNavClick("/what-we-do")} style={{ fontSize: "14px", borderBottom: "none" }}>VfM Assessments</Link>
            <Link to="/what-we-do#evaluation" onClick={() => handleNavClick("/what-we-do")} style={{ fontSize: "14px", borderBottom: "none" }}>Project Evaluation</Link>
            <Link to="/what-we-do#standards" onClick={() => handleNavClick("/what-we-do")} style={{ fontSize: "14px", borderBottom: "none" }}>Standards & Capacity</Link>
          </div>

          <Link to="/publications" onClick={() => handleNavClick("/publications")}>Publications</Link>
          <Link to="/news" onClick={() => handleNavClick("/news")}>News & Insights</Link>
          <Link to="/contact" onClick={() => handleNavClick("/contact")}>Contact</Link>
          
          <div className="mobile-actions">
            <button onClick={() => handleNavClick("/publications")} style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "#FFFFFF", border: "1px solid #FFFFFF", padding: "14px", borderRadius: "4px", fontWeight: "bold", fontSize: "16px", cursor: "pointer" }}>
              Publications & Reports
            </button>
            <button onClick={() => handleNavClick("/portal")} style={{ backgroundColor: "#FCD116", color: "#001F3F", border: "none", padding: "14px", borderRadius: "4px", fontWeight: "bold", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18"></path><path d="M9 8h1"></path><path d="M9 12h1"></path><path d="M9 16h1"></path><path d="M14 8h1"></path><path d="M14 12h1"></path><path d="M14 16h1"></path><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"></path></svg>
              Portal Login
            </button>
          </div>
        </div>
      )}
    </header>
  );
}