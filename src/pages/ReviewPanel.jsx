import { Link } from "react-router-dom";

export default function ReviewPanel() {
  return (
    <div style={{ backgroundColor: "#F8F9FA", minHeight: "100vh", overflowX: "hidden" }}>
      
      {/* 1. HERO SECTION */}
      <section style={{ position: "relative", backgroundColor: "#001F3F", padding: "100px 24px", textAlign: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "url(/building-bg.jpg)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.2, zIndex: 0 }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(180deg, rgba(0,31,63,0.8) 0%, rgba(0,31,63,1) 100%)", zIndex: 1 }} />
        
        <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 2 }}>
          <h1 style={{ fontSize: "52px", fontWeight: "800", color: "#FFFFFF", margin: "0 0 24px 0", lineHeight: "1.1" }}>
            Value for Money Review Panel
          </h1>
          <p style={{ fontSize: "20px", color: "#CBD5E1", lineHeight: "1.6", margin: 0, maxWidth: "700px", marginLeft: "auto", marginRight: "auto" }}>
            An independent body established under Section 49 of Act 1172 to hear appeals against decisions made by the VfM Office.
          </p>
        </div>
      </section>

      {/* 2. RIGHT OF APPEAL & 14-DAY WARNING */}
      <section style={{ padding: "60px 24px 20px", maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ backgroundColor: "#FFF7ED", border: "2px solid #F97316", borderRadius: "12px", padding: "32px", display: "flex", gap: "20px", alignItems: "flex-start", boxShadow: "0 10px 20px rgba(249, 115, 22, 0.1)" }}>
          <div style={{ width: "48px", height: "48px", backgroundColor: "#FFEDD5", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          </div>
          <div>
            <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#9A3412", margin: "0 0 8px 0" }}>Strict 14-Day Deadline</h3>
            <p style={{ fontSize: "16px", color: "#C2410C", margin: 0, lineHeight: "1.6" }}>
              Pursuant to <strong>Section 50(1) of Act 1172</strong>, any person or covered entity aggrieved by a decision of the VfM Office must apply to the Review Panel within <strong>fourteen (14) days</strong> after receiving the notice of the decision. 
            </p>
          </div>
        </div>
      </section>

      {/* 3. HOW TO APPLY */}
      <section style={{ padding: "60px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "800", color: "#0F172A", margin: "0 0 16px 0" }}>Application Process</h2>
          <p style={{ color: "#475569", fontSize: "18px", margin: 0 }}>Follow these steps to file an application for review.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
          
          <div style={{ backgroundColor: "#FFFFFF", padding: "32px", borderRadius: "12px", border: "1px solid #E2E8F0", boxShadow: "0 4px 6px rgba(0,0,0,0.02)" }}>
            <div style={{ width: "40px", height: "40px", backgroundColor: "#F1F5F9", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
              <span style={{ fontSize: "20px", fontWeight: "800", color: "#001F3F" }}>1</span>
            </div>
            <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0F172A", margin: "0 0 12px 0" }}>Draft Your Grounds</h3>
            <p style={{ fontSize: "15px", color: "#475569", lineHeight: "1.6", margin: 0 }}>
              Set out the decision you are complaining about and the grounds for your dissatisfaction. Attach any relevant documents or information you intend to rely on (Section 50(2)).
            </p>
          </div>

          <div style={{ backgroundColor: "#FFFFFF", padding: "32px", borderRadius: "12px", border: "1px solid #E2E8F0", boxShadow: "0 4px 6px rgba(0,0,0,0.02)" }}>
            <div style={{ width: "40px", height: "40px", backgroundColor: "#F1F5F9", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
              <span style={{ fontSize: "20px", fontWeight: "800", color: "#001F3F" }}>2</span>
            </div>
            <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0F172A", margin: "0 0 12px 0" }}>Download & Complete Form</h3>
            <p style={{ fontSize: "15px", color: "#475569", lineHeight: "1.6", margin: 0 }}>
              Download the official Review Application Form, complete it, and attach your supporting documents.
            </p>
          </div>

          <div style={{ backgroundColor: "#FFFFFF", padding: "32px", borderRadius: "12px", border: "1px solid #E2E8F0", boxShadow: "0 4px 6px rgba(0,0,0,0.02)" }}>
            <div style={{ width: "40px", height: "40px", backgroundColor: "#F1F5F9", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
              <span style={{ fontSize: "20px", fontWeight: "800", color: "#001F3F" }}>3</span>
            </div>
            <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0F172A", margin: "0 0 12px 0" }}>Submit Application</h3>
            <p style={{ fontSize: "15px", color: "#475569", lineHeight: "1.6", margin: 0 }}>
              Submit the completed form and all attachments to the Secretary of the Review Panel via the VfM Office.
            </p>
          </div>

        </div>

        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <button style={{ 
            display: "inline-flex", alignItems: "center", gap: "8px", 
            backgroundColor: "#001F3F", color: "#FFFFFF", padding: "16px 40px", 
            borderRadius: "4px", fontSize: "16px", fontWeight: "800", cursor: "pointer", border: "none"
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Download Application Form (PDF)
          </button>
        </div>
      </section>

      {/* 4. PANEL COMPOSITION */}
      <section style={{ padding: "80px 24px", backgroundColor: "#FFFFFF", borderTop: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 style={{ fontSize: "32px", fontWeight: "800", color: "#0F172A", margin: "0 0 16px 0" }}>Composition of the Review Panel</h2>
            <p style={{ color: "#475569", fontSize: "16px", margin: 0, maxWidth: "700px", marginLeft: "auto", marginRight: "auto" }}>
              In accordance with Section 49(2) of Act 1172, the Review Panel consists of highly qualified professionals:
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
            {[
              { title: "Chairperson", desc: "A retired Justice of the Superior Court of Judicature or a lawyer with at least 15 years' experience in administrative law and public financial management." },
              { title: "Legal Expert", desc: "A legal practitioner of not less than 10 years' standing with expertise in administrative law and the Public Financial Management Act, 2016 (Act 921)." },
              { title: "Financial Management Expert", desc: "An expert with demonstrable knowledge in the application of the Public Financial Management Act, 2016 (Act 921) and its Regulations." },
              { title: "Procurement Expert", desc: "An expert in public procurement or value for money practice with knowledge of the Public Procurement Act, 2003 (Act 663)." },
              { title: "Governance & Audit Expert", desc: "An expert in governance, audit, risk management, or public sector oversight from a relevant professional body." }
            ].map((member, index) => (
              <div key={index} style={{ backgroundColor: "#F8FAFC", padding: "32px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#001F3F", margin: "0 0 12px 0" }}>{member.title}</h3>
                <p style={{ fontSize: "15px", color: "#475569", lineHeight: "1.6", margin: 0 }}>{member.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. HEARING PROCESS */}
      <section style={{ padding: "80px 24px", maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ backgroundColor: "#001F3F", borderRadius: "16px", padding: "48px", color: "#FFFFFF", boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}>
          <h2 style={{ fontSize: "28px", fontWeight: "800", margin: "0 0 24px 0" }}>What Happens After You Apply?</h2>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#FCD116", margin: "0 0 8px 0" }}>1. Hearing</h3>
              <p style={{ fontSize: "16px", color: "#CBD5E1", lineHeight: "1.6", margin: 0 }}>
                Within 30 days of receiving a complete application, the Review Panel will give the VfM Office and any interested party a reasonable opportunity to be heard (Section 51(1)).
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#FCD116", margin: "0 0 8px 0" }}>2. Determination</h3>
              <p style={{ fontSize: "16px", color: "#CBD5E1", lineHeight: "1.6", margin: 0 }}>
                The Panel will then confirm, vary, set aside the decision of the Office, or remit the matter to the Office with directions.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#FCD116", margin: "0 0 8px 0" }}>3. Effect of Application</h3>
              <p style={{ fontSize: "16px", color: "#CBD5E1", lineHeight: "1.6", margin: 0 }}>
                Filing an application does not automatically suspend the decision of the Office. However, the Panel may order a stay of execution if it considers it just and equitable to do so (Section 52).
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}