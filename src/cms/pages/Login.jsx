import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CMSLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // In the future, this is where the API call goes
    navigate("/cms/dashboard");
  };

  return (
    <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center", backgroundColor: "#F1F5F9", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ backgroundColor: "#FFFFFF", padding: "48px", borderRadius: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", width: "100%", maxWidth: "400px", border: "1px solid #E2E8F0" }}>
        
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "900", color: "#001F3F", margin: "0 0 8px 0" }}>VFMO CMS</h1>
          <p style={{ fontSize: "14px", color: "#64748B", margin: 0 }}>Sign in to manage website content</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@vfmo.gov.gh"
              style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
            />
          </div>
          
          <button type="submit" style={{ backgroundColor: "#001F3F", color: "#FFFFFF", border: "none", padding: "14px", borderRadius: "8px", fontSize: "15px", fontWeight: "700", cursor: "pointer", marginTop: "8px" }}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}