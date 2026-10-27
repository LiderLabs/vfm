import { useState } from "react";
import { Link } from "react-router-dom";

export default function Portal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    alert("Authentication service is currently under construction.");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#001F3F" }}>
      
      {/* LEFT SIDE: VISUAL & BRANDING (Hidden on Mobile) */}
      <div style={{ 
        flex: "1", 
        display: "none", 
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        position: "relative",
        overflow: "hidden",
        borderRight: "1px solid rgba(255,255,255,0.1)"
      }}
      className="desktop-portal-visual"
      >
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: "url(/building-bg.jpg)",
          backgroundSize: "cover", backgroundPosition: "center",
          opacity: 0.15, zIndex: 0
        }} />
        
        <div style={{ position: "relative", zIndex: 1, maxWidth: "500px" }}>
          <img src="/coat-of-arms.png" alt="Ghana Coat of Arms" style={{ width: "80px", height: "80px", marginBottom: "32px", opacity: 0.9 }} />
          
          <h1 style={{ fontSize: "48px", fontWeight: "800", color: "#FFFFFF", marginBottom: "24px", lineHeight: "1.1" }}>
            Secure Gateway to Fiscal Oversight.
          </h1>
          
          <p style={{ fontSize: "18px", color: "#CBD5E1", lineHeight: "1.6", marginBottom: "40px" }}>
            This portal is restricted to authorized staff of the Value for Money Office and designated officials of the Government of Ghana.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "#FCD116", fontSize: "14px", fontWeight: "600" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              256-bit Encrypted Connection
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "#FCD116", fontSize: "14px", fontWeight: "600" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              Multi-Factor Authentication Required
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "#FCD116", fontSize: "14px", fontWeight: "600" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 8v4l3 3"></path><circle cx="12" cy="12" r="10"></circle></svg>
              All Activity is Logged and Monitored
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: LOGIN FORM */}
      <div style={{ 
        flex: "1", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        padding: "40px 24px",
        backgroundColor: "#FFFFFF"
      }}>
        <div style={{ width: "100%", maxWidth: "420px" }}>
          
          {/* Mobile Logo (Only visible on mobile) */}
          <div className="mobile-portal-logo" style={{ display: "none", textAlign: "center", marginBottom: "40px" }}>
            <img src="/vfm-logo.png" alt="VfM Logo" style={{ width: "70px", height: "70px", marginBottom: "16px" }} />
            <h2 style={{ fontSize: "28px", fontWeight: "800", color: "#001F3F" }}>VfM Portal</h2>
          </div>

          {/* DESKTOP HEADER (Hidden on mobile) */}
          <div className="desktop-portal-header" style={{ textAlign: "center", marginBottom: "40px" }}>
            <div style={{ width: "64px", height: "64px", backgroundColor: "rgba(0,31,63,0.05)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px auto" }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#001F3F" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </div>
            <h2 style={{ fontSize: "32px", fontWeight: "800", color: "#001F3F", margin: "0 0 8px 0" }}>Authorized Access</h2>
            <p style={{ fontSize: "15px", color: "#64748B", margin: 0 }}>Enter your official credentials to proceed.</p>
          </div>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#0F172A", marginBottom: "8px" }}>Official Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="name@vfm.gov.gh"
                style={{ width: "100%", padding: "14px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "16px", outline: "none", transition: "border 0.2s" }}
                onFocus={(e) => e.target.style.border = "1px solid #001F3F"}
                onBlur={(e) => e.target.style.border = "1px solid #CBD5E1"}
              />
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <label style={{ fontSize: "14px", fontWeight: "700", color: "#0F172A" }}>Password</label>
                <a href="#reset" style={{ fontSize: "13px", color: "#001F3F", fontWeight: "600", textDecoration: "none" }}>Forgot Password?</a>
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                style={{ width: "100%", padding: "14px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "16px", outline: "none", transition: "border 0.2s" }}
                onFocus={(e) => e.target.style.border = "1px solid #001F3F"}
                onBlur={(e) => e.target.style.border = "1px solid #CBD5E1"}
              />
            </div>

            <button type="submit" style={{ 
              backgroundColor: "#001F3F", color: "#FFFFFF", border: "none", 
              padding: "16px", borderRadius: "8px", fontSize: "16px", fontWeight: "800", 
              cursor: "pointer", transition: "background-color 0.2s ease", marginTop: "8px"
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#0A2E4D"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#001F3F"}
            >
              Sign In Securely
            </button>

          </form>

          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <Link to="/" style={{ fontSize: "14px", color: "#64748B", textDecoration: "none", fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              Return to Public Site
            </Link>
          </div>

        </div>
      </div>

      {/* CSS for Mobile Responsiveness */}
      <style>
        {`
          @media (min-width: 1024px) {
            .desktop-portal-visual { display: flex !important; }
            .desktop-portal-header { display: block !important; }
          }
          @media (max-width: 1023px) {
            .mobile-portal-logo { display: block !important; }
            .desktop-portal-header { display: none !important; }
          }
        `}
      </style>
    </div>
  );
}