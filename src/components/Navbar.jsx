export default function Navbar() {
  return (
    <header style={{ backgroundColor: "#001F3F", color: "#FFFFFF", padding: "16px 24px" }}>
      <style>
        {`
          .nav-container {
            display: flex; justify-content: space-between; align-items: center; 
            max-width: 1200px; margin: 0 auto;
          }
          .nav-links { display: flex; gap: 24px; font-size: 14px; font-weight: 500; }
          .nav-logo-text { margin: 0; fontSize: 18px; fontWeight: bold; letterSpacing: 1px; }
          
          @media (max-width: 900px) {
            .nav-links { display: none; } /* Hide desktop links */
            .nav-container { flex-direction: row; justify-content: space-between; }
            .nav-logo-text { font-size: 14px !important; }
            .nav-subtext { font-size: 10px !important; }
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
            <h1 className="nav-logo-text">VALUE FOR MONEY OFFICE</h1>
            <p className="nav-subtext" style={{ margin: 0, fontSize: "11px", opacity: 0.8, letterSpacing: "1px" }}>
              REPUBLIC OF GHANA
            </p>
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="nav-links">
          <a href="#" style={{ color: "#FFFFFF", textDecoration: "none" }}>About Us</a>
          <a href="#" style={{ color: "#FFFFFF", textDecoration: "none" }}>Mandate</a>
          <a href="#" style={{ color: "#FFFFFF", textDecoration: "none" }}>Resources</a>
          <a href="#" style={{ color: "#FFFFFF", textDecoration: "none" }}>News</a>
        </nav>

        {/* Portal Button */}
        <button style={{ 
          backgroundColor: "#FFFFFF", color: "#001F3F", border: "none", 
          padding: "8px 16px", borderRadius: "4px", fontWeight: "bold", 
          cursor: "pointer", fontSize: "13px"
        }}>
          Portal Login
        </button>

      </div>
    </header>
  );
}