import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#001F3F", color: "#FFFFFF", padding: "60px 40px 20px", borderTop: "4px solid #FCD116" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "40px", justifyContent: "space-between" }}>
        
        {/* Column 1: Brand */}
        <div style={{ flex: "1", minWidth: "250px" }}>
          <h3 style={{ fontSize: "20px", fontWeight: "bold", margin: "0 0 16px 0" }}>Value for Money Office</h3>
          <p style={{ color: "#A0B3C6", fontSize: "14px", lineHeight: "1.6", maxWidth: "300px", marginBottom: "24px" }}>
            An independent statutory body under the Ministry of Finance, Republic of Ghana. Ensuring efficiency and fiscal integrity in public spending.
          </p>
          <Link to="/submit" style={{ 
            display: "inline-flex", alignItems: "center", gap: "8px", 
            backgroundColor: "#FCD116", color: "#001F3F", padding: "10px 16px", 
            borderRadius: "4px", fontSize: "14px", fontWeight: "700", textDecoration: "none" 
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            Report a Concern
          </Link>
        </div>

        {/* Column 2: Quick Links */}
        <div style={{ minWidth: "150px" }}>
          <h4 style={{ fontSize: "16px", fontWeight: "bold", margin: "0 0 16px 0", color: "#FCD116" }}>Quick Links</h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
            <li><Link to="/about" style={{ color: "#FFFFFF", textDecoration: "none", fontSize: "14px" }}>About Us</Link></li>
            {/* "Our Mandate" link removed from here */}
            <li><Link to="/what-we-do" style={{ color: "#FFFFFF", textDecoration: "none", fontSize: "14px" }}>What We Do</Link></li>
            <li><Link to="/publications" style={{ color: "#FFFFFF", textDecoration: "none", fontSize: "14px" }}>Publications</Link></li>
          </ul>
        </div>

        {/* Column 3: Compliance & Transparency */}
        <div style={{ minWidth: "200px" }}>
          <h4 style={{ fontSize: "16px", fontWeight: "bold", margin: "0 0 16px 0", color: "#FCD116" }}>Compliance & Transparency</h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
            <li><Link to="/track" style={{ color: "#FFFFFF", textDecoration: "none", fontSize: "14px" }}>Track a Complaint</Link></li>
            <li><Link to="/open-data" style={{ color: "#FFFFFF", textDecoration: "none", fontSize: "14px" }}>Open Data Portal</Link></li>
            <li><Link to="/review-panel" style={{ color: "#FFFFFF", textDecoration: "none", fontSize: "14px" }}>Review Panel</Link></li>
            <li><Link to="/whistleblower" style={{ color: "#FFFFFF", textDecoration: "none", fontSize: "14px" }}>Whistleblower Policy</Link></li>
          </ul>
        </div>

        {/* Column 4: Legal & Contact */}
        <div style={{ minWidth: "200px" }}>
          <h4 style={{ fontSize: "16px", fontWeight: "bold", margin: "0 0 16px 0", color: "#FCD116" }}>Legal</h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
            <li><a href="/act-1172.pdf" target="_blank" rel="noopener noreferrer" style={{ color: "#FFFFFF", textDecoration: "none", fontSize: "14px" }}>Act 1172 (PDF)</a></li>
            <li><Link to="/guidelines" style={{ color: "#FFFFFF", textDecoration: "none", fontSize: "14px" }}>VfM Guidelines</Link></li>
            <li><Link to="/privacy" style={{ color: "#FFFFFF", textDecoration: "none", fontSize: "14px" }}>Privacy Policy</Link></li>
          </ul>
          
          <h4 style={{ fontSize: "16px", fontWeight: "bold", margin: "0 0 16px 0", color: "#FCD116" }}>Contact</h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px", color: "#A0B3C6", fontSize: "14px" }}>
            <li>Ministry of Finance, Accra</li>
            <li>info@vfm.gov.gh</li>
          </ul>
        </div>

      </div>

      {/* Copyright Bar */}
      <div style={{ maxWidth: "1200px", margin: "40px auto 0", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div style={{ fontSize: "13px", color: "#A0B3C6" }}>
          © 2026 Value for Money Office. All rights reserved.
        </div>
        <div style={{ display: "flex", gap: "16px", fontSize: "12px", color: "#A0B3C6" }}>
          <span>Secured by Cyber Security Authority</span>
          <span>•</span>
          <span>Data Protection Compliant</span>
        </div>
      </div>
    </footer>
  );
}