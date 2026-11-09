import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{ 
      backgroundColor: "#001F3F", 
      color: "#FFFFFF", 
      padding: "60px 40px 20px", 
      borderTop: "4px solid #FCD116",
      position: "relative",
      zIndex: 10
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "40px", justifyContent: "space-between" }}>
        
        {/* Column 1: Brand & Action */}
        <div style={{ flex: "1", minWidth: "280px" }}>
          <h3 style={{ fontSize: "20px", fontWeight: "800", margin: "0 0 16px 0", letterSpacing: "-0.5px" }}>Value for Money Office</h3>
          <p style={{ color: "#A0B3C6", fontSize: "14px", lineHeight: "1.6", maxWidth: "300px", marginBottom: "24px" }}>
            An independent statutory authority established under Act 1172 to regulate, monitor, and conduct value for money assessments across Ghana's public sector.
          </p>
          <Link to="/submit" style={{ 
            display: "inline-flex", alignItems: "center", gap: "8px", 
            backgroundColor: "#FCD116", color: "#001F3F", padding: "12px 20px", 
            borderRadius: "4px", fontSize: "14px", fontWeight: "800", textDecoration: "none",
            transition: "transform 0.2s ease"
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            Report a Concern
          </Link>
        </div>

        {/* Column 2: Quick Links */}
        <div style={{ minWidth: "150px" }}>
          <h4 style={{ fontSize: "14px", fontWeight: "800", margin: "0 0 20px 0", color: "#FCD116", letterSpacing: "1px", textTransform: "uppercase" }}>Quick Links</h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "4px" }}>
            <li><Link to="/about" style={{ color: "#FFFFFF", textDecoration: "none", fontSize: "14px", display: "block", padding: "8px 0", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "#FCD116"} onMouseLeave={(e) => e.target.style.color = "#FFFFFF"}>About Us</Link></li>
            <li><Link to="/what-we-do" style={{ color: "#FFFFFF", textDecoration: "none", fontSize: "14px", display: "block", padding: "8px 0", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "#FCD116"} onMouseLeave={(e) => e.target.style.color = "#FFFFFF"}>What We Do</Link></li>
            <li><Link to="/publications" style={{ color: "#FFFFFF", textDecoration: "none", fontSize: "14px", display: "block", padding: "8px 0", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "#FCD116"} onMouseLeave={(e) => e.target.style.color = "#FFFFFF"}>News & Publications</Link></li>
            <li><Link to="/contact" style={{ color: "#FFFFFF", textDecoration: "none", fontSize: "14px", display: "block", padding: "8px 0", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "#FCD116"} onMouseLeave={(e) => e.target.style.color = "#FFFFFF"}>Contact</Link></li>
          </ul>
        </div>

        {/* Column 3: Compliance & Transparency */}
        <div style={{ minWidth: "220px" }}>
          <h4 style={{ fontSize: "14px", fontWeight: "800", margin: "0 0 20px 0", color: "#FCD116", letterSpacing: "1px", textTransform: "uppercase" }}>Compliance & Transparency</h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "4px" }}>
            <li><Link to="/clearance" style={{ color: "#FFFFFF", textDecoration: "none", fontSize: "14px", display: "block", padding: "8px 0", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "#FCD116"} onMouseLeave={(e) => e.target.style.color = "#FFFFFF"}>Certificate of Clearance</Link></li>
            <li><Link to="/sanctions" style={{ color: "#FFFFFF", textDecoration: "none", fontSize: "14px", display: "block", padding: "8px 0", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "#FCD116"} onMouseLeave={(e) => e.target.style.color = "#FFFFFF"}>Sanctions & Debarment</Link></li>
            <li><Link to="/track" style={{ color: "#FFFFFF", textDecoration: "none", fontSize: "14px", display: "block", padding: "8px 0", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "#FCD116"} onMouseLeave={(e) => e.target.style.color = "#FFFFFF"}>Track a Complaint</Link></li>
            <li><Link to="/open-data" style={{ color: "#FFFFFF", textDecoration: "none", fontSize: "14px", display: "block", padding: "8px 0", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "#FCD116"} onMouseLeave={(e) => e.target.style.color = "#FFFFFF"}>Open Data Portal</Link></li>
            <li><Link to="/engagement" style={{ color: "#FFFFFF", textDecoration: "none", fontSize: "14px", display: "block", padding: "8px 0", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "#FCD116"} onMouseLeave={(e) => e.target.style.color = "#FFFFFF"}>Public Engagement</Link></li>
            <li><Link to="/review-panel" style={{ color: "#FFFFFF", textDecoration: "none", fontSize: "14px", display: "block", padding: "8px 0", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "#FCD116"} onMouseLeave={(e) => e.target.style.color = "#FFFFFF"}>Review Panel</Link></li>
            <li><Link to="/whistleblower" style={{ color: "#FFFFFF", textDecoration: "none", fontSize: "14px", display: "block", padding: "8px 0", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "#FCD116"} onMouseLeave={(e) => e.target.style.color = "#FFFFFF"}>Whistleblower Policy</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact & Notices */}
        <div style={{ minWidth: "240px" }}>
          <h4 style={{ fontSize: "14px", fontWeight: "800", margin: "0 0 20px 0", color: "#FCD116", letterSpacing: "1px", textTransform: "uppercase" }}>Contact</h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px", color: "#A0B3C6", fontSize: "14px", marginBottom: "32px" }}>
            <li style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginTop: "2px", flexShrink: 0 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              Ministry of Finance, Kanda-Accra, Ghana
            </li>
            <li style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginTop: "2px", flexShrink: 0 }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              <a href="mailto:info@vfmo.gov.gh" style={{ color: "#A0B3C6", textDecoration: "none" }}>info@vfmo.gov.gh</a>
            </li>
          </ul>

          <h4 style={{ fontSize: "12px", fontWeight: "800", margin: "0 0 12px 0", color: "#A0B3C6", letterSpacing: "1px", textTransform: "uppercase" }}>Regulatory Notices</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "12px", color: "#A0B3C6" }}>
            <span>Cybersecurity Act, 2020 (Act 1038) Compliant</span>
            <span>Data Protection Act, 2012 (Act 843) Compliant</span>
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div style={{ maxWidth: "1200px", margin: "40px auto 0", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div style={{ fontSize: "13px", color: "#A0B3C6" }}>
          © 2026 Value for Money Office. All rights reserved.
        </div>
        <div style={{ display: "flex", gap: "16px", fontSize: "12px", color: "#A0B3C6" }}>
          <Link to="/privacy" style={{ color: "#A0B3C6", textDecoration: "none" }} onMouseEnter={(e) => e.target.style.color = "#FFFFFF"} onMouseLeave={(e) => e.target.style.color = "#A0B3C6"}>Privacy Policy</Link>
          <span>•</span>
          <span>Republic of Ghana</span>
        </div>
      </div>
    </footer>
  );
}