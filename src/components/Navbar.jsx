export default function Navbar() {
  return (
    <header style={{ backgroundColor: "#001F3F", color: "#FFFFFF", padding: "16px 40px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Logo area */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <img 
            src="/vfm-logo.png" 
            alt="VfM Office Logo" 
            style={{ width: "55px", height: "55px", objectFit: "contain", backgroundColor: "white", borderRadius: "50%", padding: "2px" }} 
          />
          <div>
            <h1 style={{ margin: 0, fontSize: "20px", fontWeight: "bold" }}>Value for Money Office</h1>
            <p style={{ margin: 0, fontSize: "12px", opacity: 0.8 }}>Republic of Ghana</p>
          </div>
        </div>

        {/* Navigation Links - Home Removed */}
        <nav style={{ display: "flex", gap: "24px", fontSize: "14px", fontWeight: "500" }}>
          <a href="#" style={{ color: "#FFFFFF", textDecoration: "none" }}>About Us</a>
          <a href="#" style={{ color: "#FFFFFF", textDecoration: "none" }}>Mandate</a>
          <a href="#" style={{ color: "#FFFFFF", textDecoration: "none" }}>Resources</a>
          <a href="#" style={{ color: "#FFFFFF", textDecoration: "none" }}>News</a>
        </nav>

        {/* Portal Button */}
        <button style={{ 
          backgroundColor: "#FFFFFF", 
          color: "#001F3F", 
          border: "none", 
          padding: "10px 20px", 
          borderRadius: "4px", 
          fontWeight: "bold", 
          cursor: "pointer",
          fontSize: "14px"
        }}>
          Portal Login
        </button>

      </div>
    </header>
  );
}