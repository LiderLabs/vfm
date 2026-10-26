import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header style={{ backgroundColor: "#001F3F", color: "#FFFFFF", position: "relative", zIndex: 50 }}>
      <style>
        {`
          .nav-container {
            display: flex; justify-content: space-between; align-items: center; 
            max-width: 1200px; margin: 0 auto; padding: 16px 24px;
          }
          .nav-links { display: flex; gap: 24px; font-size: 14px; font-weight: 500; }
          .nav-link { color: #FFFFFF; textDecoration: none; transition: color 0.2s; }
          .nav-link:hover { color: #FCD116; }
          
          .mobile-menu-btn {
            display: none; background: none; border: none; color: white; cursor: pointer;
          }

          /* MOBILE STYLES */
          @media (max-width: 900px) {
            .nav-links { display: none; } /* Hide desktop links */
            .desktop-login { display: none; } /* Hide desktop login button */
            .mobile-menu-btn { display: block; } /* Show hamburger */
            
            /* Dropdown Menu Panel */
            .mobile-dropdown {
              position: absolute;
              top: 100%; left: 0; right: 0;
              background-color: #001F3F;
              border-top: 1px solid rgba(255,255,255,0.1);
              padding: 24px;
              display: flex;
              flex-direction: column;
              gap: 20px;
              box-shadow: 0 10px 20px rgba(0,0,0,0.3);
              transform-origin: top;
              animation: slideDown 0.3s ease-out forwards;
            }
            
            @keyframes slideDown {
              from { opacity: 0; transform: scaleY(0.9); }
              to { opacity: 1; transform: scaleY(1); }
            }

            .mobile-dropdown a {
              color: #FFFFFF; text-decoration: none; font-size: 16px; font-weight: 600;
              padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.05);
            }
            .mobile-dropdown button {
              margin-top: 12px; width: 100%; padding: 14px; 
              background-color: #FCD116; color: #001F3F; border: none; 
              border-radius: 4px; font-weight: bold; font-size: 16px; cursor: pointer;
            }
          }
        `}
      </style>

      <div className="nav-container">
        
        {/* Logo area */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img 
            src="/vfm-logo.png" 
            alt="VfM Office Logo" 
            style={{ width: "45px", height: "45px", objectFit: "contain", backgroundColor: "white", borderRadius: "50%", padding: "2px" }} 
          />
          <div>
            <h1 style={{ margin: 0, fontSize: "16px", fontWeight: "bold", letterSpacing: "1px" }}>
              VALUE FOR MONEY
            </h1>
            <p style={{ margin: 0, fontSize: "10px", opacity: 0.8, letterSpacing: "1px" }}>
              REPUBLIC OF GHANA
            </p>
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="nav-links">
          <a href="#" className="nav-link">About Us</a>
          <a href="#" className="nav-link">Mandate</a>
          <a href="#" className="nav-link">Resources</a>
          <a href="#" className="nav-link">News</a>
        </nav>

        {/* Desktop Portal Button */}
        <button className="desktop-login" style={{ 
          backgroundColor: "#FFFFFF", color: "#001F3F", border: "none", 
          padding: "10px 20px", borderRadius: "4px", fontWeight: "bold", 
          cursor: "pointer", fontSize: "14px"
        }}>
          Portal Login
        </button>

        {/* Mobile Hamburger Icon */}
        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {/* Simple SVG for hamburger/close */}
          {isMobileMenuOpen ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          )}
        </button>

      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-dropdown">
          <a href="#">About Us</a>
          <a href="#">Mandate</a>
          <a href="#">Resources</a>
          <a href="#">News</a>
          <button>Portal Login</button>
        </div>
      )}

    </header>
  );
}