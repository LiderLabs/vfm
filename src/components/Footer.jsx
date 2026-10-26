export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#001F3F", color: "#FFFFFF", padding: "60px 40px 20px", borderTop: "4px solid #FCD116" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "40px", justifyContent: "space-between" }}>
        
        {/* Column 1: Brand */}
        <div style={{ flex: "1", minWidth: "250px" }}>
          <h3 style={{ fontSize: "20px", fontWeight: "bold", margin: "0 0 16px 0" }}>Value for Money Office</h3>
          <p style={{ color: "#A0B3C6", fontSize: "14px", lineHeight: "1.6", maxWidth: "300px" }}>
            An independent statutory body under the Ministry of Finance, Republic of Ghana. Ensuring efficiency and fiscal integrity in public spending.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div style={{ minWidth: "150px" }}>
          <h4 style={{ fontSize: "16px", fontWeight: "bold", margin: "0 0 16px 0", color: "#FCD116" }}>Quick Links</h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
            <li><a href="#" style={{ color: "#FFFFFF", textDecoration: "none", fontSize: "14px" }}>About Us</a></li>
            <li><a href="#" style={{ color: "#FFFFFF", textDecoration: "none", fontSize: "14px" }}>Our Mandate</a></li>
            <li><a href="#" style={{ color: "#FFFFFF", textDecoration: "none", fontSize: "14px" }}>Resources</a></li>
            <li><a href="#" style={{ color: "#FFFFFF", textDecoration: "none", fontSize: "14px" }}>News & Updates</a></li>
          </ul>
        </div>

        {/* Column 3: Legal */}
        <div style={{ minWidth: "150px" }}>
          <h4 style={{ fontSize: "16px", fontWeight: "bold", margin: "0 0 16px 0", color: "#FCD116" }}>Legal</h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
            <li><a href="#" style={{ color: "#FFFFFF", textDecoration: "none", fontSize: "14px" }}>Act 1172</a></li>
            <li><a href="#" style={{ color: "#FFFFFF", textDecoration: "none", fontSize: "14px" }}>VfM Guidelines</a></li>
            <li><a href="#" style={{ color: "#FFFFFF", textDecoration: "none", fontSize: "14px" }}>FAQs</a></li>
            <li><a href="#" style={{ color: "#FFFFFF", textDecoration: "none", fontSize: "14px" }}>Privacy Policy</a></li>
          </ul>
        </div>

        {/* Column 4: Contact */}
        <div style={{ minWidth: "200px" }}>
          <h4 style={{ fontSize: "16px", fontWeight: "bold", margin: "0 0 16px 0", color: "#FCD116" }}>Contact Us</h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px", color: "#A0B3C6", fontSize: "14px" }}>
            <li>Ministry of Finance<br/>Accra, Ghana</li>
            <li>info@vfm.gov.gh</li>
            <li>+233 30 XXX XXXX</li>
          </ul>
        </div>

      </div>

      {/* Copyright Bar */}
      <div style={{ maxWidth: "1200px", margin: "40px auto 0", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.1)", textAlign: "center", fontSize: "13px", color: "#A0B3C6" }}>
        © 2026 Value for Money Office. All rights reserved.
      </div>
    </footer>
  );
}