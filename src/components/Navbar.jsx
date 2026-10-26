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
            
            /* HIDE the big Publications button on mobile */
            .desktop-pub-btn { display: none; } 
            
            /* Show the Portal Icon and Hamburger */
            .mobile-actions { display: flex; align-items: center; gap: 16px; }
            .mobile-menu-btn { display: block; }

            /* Logo Text Fix */
            .logo-title { font-size: 15px !important; }
            .logo-subtitle { font-size: 9px !important; }
            
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
            .mobile-menu-actions {
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
            style={{ width: "45px", height: "45px", objectFit: "contain", backgroundColor: "white", borderRadius: "50%", padding: "2px" }} 
          />
          <div>
            {/* Notice we removed the <br/> so it sits on one line now */}
            <h1 className="logo-title" style={{ margin: 0, fontSize: "18px", fontWeight: "800", letterSpacing: "0.5px", lineHeight: "1.2" }}>
              VALUE FOR MONEY OFFICE
            </h1>
            <p className="logo-subtitle" style={{ margin: 0, fontSize: "10px", color: "#FCD116", fontWeight: "700", letterSpacing: "1px", marginTop: "2px" }}>
              REPUBLIC OF GHANA
            </p>
          </div>
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

          <Link to="/mandate" className="nav-link" onClick={() => handleNavClick("/mandate")}>Our Mandate</Link>

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

        {/* Right Actions (Desktop only for the big button) */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          
          <button onClick={() => handleNavClick("/publications")} className="desktop-pub-btn" style={{ 
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
          
          {/* Portal Icon (Visible on Mobile) */}
          <button onClick={() => handleNavClick("/portal")} style={{ 
            backgroundColor: "#001F3F", color: "#FFFFFF", border: "1px solid rgba(255,255,255,0.4)", 
            width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", transition: "background-color 0.2s"
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#001F3F"}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"></path><path d="M9 8h1"></path><path d="M9 12h1"></path><path d="M9 16h1"></path><path d="M14 8h1"></path><path d="M14 12h1"></path><path d="M14 16h1"></path><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"></path></svg>
          </button>
          
          {/* Hamburger Icon (Visible on Mobile) */}
          <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            )}
          </button>
        </div>

      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-dropdown">
          <Link to="/" onClick={() => handleNavClick("/")}>Home</Link>
          <Link to="/about" onClick={() => handleNavClick("/about")}>About Us</Link>
          <Link to="/mandate" onClick={() => handleNavClick("/mandate")}>Our Mandate</Link>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", paddingLeft: "16px", borderLeft: "2px solid rgba(255,255,255,0.1)" }}>
            <span style={{ fontSize: "12px", fontWeight: "700", color: "#FCD116", textTransform: "uppercase", letterSpacing: "1px" }}>What We Do</span>
            <Link to="/what-we-do#assessments" onClick={() => handleNavClick("/what-we-do")} style={{ fontSize: "14px", borderBottom: "none" }}>VfM Assessments</Link>
            <Link to="/what-we-do#evaluation" onClick={() => handleNavClick("/what-we-do")} style={{ fontSize: "14px", borderBottom: "none" }}>Project Evaluation</Link>
            <Link to="/what-we-do#standards" onClick={() => handleNavClick("/what-we-do")} style={{ fontSize: "14px", borderBottom: "none" }}>Standards & Capacity</Link>
          </div>

          <Link to="/publications" onClick={() => handleNavClick("/publications")}>Publications</Link>
          <Link to="/news" onClick={() => handleNavClick("/news")}>News & Insights</Link>
          <Link to="/contact" onClick={() => handleNavClick("/contact")}>Contact</Link>
          
          <div className="mobile-menu-actions">
            <button onClick={() => handleNavClick("/publications")} style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "#FFFFFF", border: "1px solid #FFFFFF", padding: "14px", borderRadius: "4px", fontWeight: "bold", fontSize: "16px", cursor: "pointer" }}>
              Publications & Reports
            </button>
          </div>
        </div>
      )}
    </header>
  );
}