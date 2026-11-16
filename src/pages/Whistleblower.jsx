import { Link } from "react-router-dom";

export default function Whistleblower() {
  return (
    <div style={{ backgroundColor: "#F8F9FA", minHeight: "100vh", overflowX: "hidden" }}>
      
      {/* 1. HERO SECTION */}
      <section style={{ position: "relative", backgroundColor: "#001F3F", padding: "100px 24px", textAlign: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "url(/building-bg.jpg)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.2, zIndex: 0 }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(180deg, rgba(0,31,63,0.8) 0%, rgba(0,31,63,1) 100%)", zIndex: 1 }} />
        
        <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", backgroundColor: "rgba(252, 209, 22, 0.1)", padding: "8px 16px", borderRadius: "30px", marginBottom: "24px" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FCD116" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            <span style={{ fontSize: "13px", fontWeight: "800", letterSpacing: "1px", color: "#FCD116", textTransform: "uppercase" }}>Legal Protection</span>
          </div>
          <h1 style={{ fontSize: "52px", fontWeight: "800", color: "#FFFFFF", margin: "0 0 24px 0", lineHeight: "1.1" }}>
            Whistleblower Protection Policy
          </h1>
          <p style={{ fontSize: "20px", color: "#CBD5E1", lineHeight: "1.6", margin: 0, maxWidth: "700px", marginLeft: "auto", marginRight: "auto" }}>
            The Value for Money Office is committed to protecting individuals who, in good faith, report corruption, waste, or irregularities in public spending.
          </p>
        </div>
      </section>

      {/* 2. LEGAL FRAMEWORK */}
      <section style={{ padding: "80px 24px", maxWidth: "1000px", margin: "0 auto" }}>
        
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "800", color: "#0F172A", margin: "0 0 16px 0" }}>Your Legal Shield</h2>
          <p style={{ color: "#475569", fontSize: "18px", margin: 0 }}>
            The Act provides absolute legal protection for whistleblowers under two key statutes.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px", marginBottom: "80px" }}>
          
          <div style={{ backgroundColor: "#FFFFFF", padding: "40px", borderRadius: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", border: "1px solid #E2E8F0" }}>
            <h3 style={{ fontSize: "22px", fontWeight: "800", color: "#0F172A", margin: "0 0 16px 0" }}>The Whistleblower Act, 2006 (Act 720)</h3>
            <p style={{ fontSize: "16px", color: "#475569", lineHeight: "1.6", margin: 0 }}>
              Any person who provides information or submits a complaint to the VfM Office in good faith is entitled to the full protection available to a whistleblower under this Act. This includes protection against harassment, victimization, or dismissal.
            </p>
          </div>

          <div style={{ backgroundColor: "#FFFFFF", padding: "40px", borderRadius: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", border: "1px solid #E2E8F0" }}>
            <h3 style={{ fontSize: "22px", fontWeight: "800", color: "#0F172A", margin: "0 0 16px 0" }}>The VfM Office Act, 2026 (Act 1172)</h3>
            <p style={{ fontSize: "16px", color: "#475569", lineHeight: "1.6", margin: 0 }}>
              Under Section 47 and 48, the VfM Office is legally mandated to put measures in place to protect the identity of a complainant. We will not disclose your identity without your consent, unless required by a court order.
            </p>
          </div>

        </div>

        {/* 3. HOW WE PROTECT YOU */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "800", color: "#0F172A", margin: "0 0 16px 0" }}>How We Protect You</h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "80px" }}>
          {[
            { title: "Anonymous Submissions", desc: "You can submit a report without providing your name or email address. If you choose to remain anonymous, we will never know who you are." },
            { title: "Secure Tracking", desc: "If you provide your email, we will only use it to send you a secure tracking code. We will not call you or visit your home." },
            { title: "Identity Redaction", desc: "Any documents you upload are scanned to ensure your personal information is redacted before being shared with our assessment team." },
            { title: "Anti-Retaliation", desc: "If you face any form of retaliation, harassment, or threats as a result of your report, the VfM Office will intervene and refer the matter to the relevant law enforcement authorities." }
          ].map((item, index) => (
            <div key={index} style={{ backgroundColor: "#FFFFFF", padding: "32px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0F172A", margin: "0 0 8px 0" }}>{item.title}</h3>
              <p style={{ fontSize: "16px", color: "#475569", lineHeight: "1.6", margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* 4. CALL TO ACTION */}
        <div style={{ backgroundColor: "#001F3F", borderRadius: "16px", padding: "48px", textAlign: "center" }}>
          <h2 style={{ fontSize: "28px", fontWeight: "800", color: "#FFFFFF", margin: "0 0 16px 0" }}>Ready to make a report?</h2>
          <p style={{ fontSize: "18px", color: "#CBD5E1", marginBottom: "32px" }}>
            Your report is safe with us. Help us protect Ghana's public funds.
          </p>
          <Link to="/submit" style={{ 
            display: "inline-flex", alignItems: "center", gap: "8px", 
            backgroundColor: "#FCD116", color: "#001F3F", padding: "16px 40px", 
            borderRadius: "4px", fontSize: "16px", fontWeight: "800", textDecoration: "none"
          }}>
            Submit a Confidential Report
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </Link>
        </div>

      </section>
    </div>
  );
}