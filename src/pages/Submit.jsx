import { useState } from "react";
import { Link } from "react-router-dom"; // Added Link import

export default function Submit() {
  const [fileName, setFileName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [trackingCode, setTrackingCode] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreedToTerms) {
      alert("You must confirm that the information provided is true before submitting.");
      return;
    }
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setTrackingCode(`VFM-WB-2026-${randomNum}`);
    setIsSubmitted(true);
  };

  return (
    <div style={{ backgroundColor: "#F4F5F0", minHeight: "100vh", overflowX: "hidden" }}>
      
      {/* HEADER SECTION */}
      <section style={{ 
        position: "relative", 
        padding: "80px 24px", 
        backgroundColor: "#001F3F", 
        textAlign: "center",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          width: "400px", height: "400px", backgroundImage: "url(/coat-of-arms.png)", 
          backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center",
          opacity: 0.05, zIndex: 0, pointerEvents: "none"
        }} />

        <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <h1 style={{ fontSize: "48px", fontWeight: "800", color: "#FFFFFF", margin: "0 0 16px 0", lineHeight: "1.1" }}>
            Report a Value for Money Concern
          </h1>
          <p style={{ fontSize: "18px", color: "#CBD5E1", maxWidth: "650px", margin: "0 auto", lineHeight: "1.6" }}>
            Submit a confidential report regarding public expenditure, contract inflation, or project irregularities.
          </p>
        </div>
      </section>

      {/* WHISTLEBLOWER PROTECTION BANNER */}
      <div style={{ backgroundColor: "#FCD116", padding: "16px 24px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", alignItems: "flex-start", gap: "16px" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#001F3F" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: "2px" }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          <div>
            <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#001F3F", margin: "0 0 4px 0" }}>Your identity is legally protected.</h3>
            <p style={{ fontSize: "14px", color: "#001F3F", margin: 0, lineHeight: "1.5", fontWeight: "500" }}>
              In accordance with the Whistleblower Act, 2006 (Act 720) and Section 48 of Act 1172, your identity will not be disclosed without your consent, unless required by a court order.
            </p>
          </div>
        </div>
      </div>

      {/* FORM SECTION */}
      <section style={{ padding: "60px 24px", maxWidth: "800px", margin: "0 auto" }}>
        
        <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", padding: "48px", boxShadow: "0 20px 40px rgba(0,0,0,0.05)", border: "1px solid #E2E8F0" }}>
          
          {isSubmitted ? (
            /* SUCCESS STATE */
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ width: "80px", height: "80px", backgroundColor: "#10B98120", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px auto" }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              </div>
              <h2 style={{ fontSize: "32px", fontWeight: "800", color: "#0F172A", marginBottom: "16px" }}>Report Received</h2>
              
              <div style={{ backgroundColor: "#F8FAFC", border: "1px dashed #CBD5E1", padding: "24px", borderRadius: "8px", marginBottom: "24px" }}>
                <p style={{ fontSize: "14px", color: "#64748B", margin: "0 0 8px 0", fontWeight: "600" }}>YOUR TRACKING CODE</p>
                <p style={{ fontSize: "28px", fontWeight: "800", color: "#001F3F", margin: 0, letterSpacing: "2px" }}>{trackingCode}</p>
              </div>

              <p style={{ fontSize: "16px", color: "#475569", marginBottom: "24px", lineHeight: "1.6" }}>
                Please save this code. You will need it to track the status of your report.
              </p>
              
              <div style={{ backgroundColor: "#F0FDF4", padding: "16px", borderRadius: "8px", border: "1px solid #BBF7D0", textAlign: "left", marginBottom: "32px" }}>
                <p style={{ fontSize: "14px", color: "#166534", margin: 0, lineHeight: "1.6" }}>
                  <strong>Statutory Timeline (Section 45):</strong><br/>
                  • The Office will acknowledge receipt of this complaint within <strong>7 days</strong>.<br/>
                  • A preliminary assessment will be conducted within <strong>14 days</strong> to determine if an investigation is warranted.
                </p>
              </div>

              <button 
                onClick={() => { setIsSubmitted(false); setFileName(""); setAgreedToTerms(false); }}
                style={{ padding: "14px 32px", backgroundColor: "#001F3F", color: "#FFFFFF", border: "none", borderRadius: "8px", fontSize: "16px", fontWeight: "700", cursor: "pointer" }}
              >
                Submit Another Report
              </button>
            </div>
          ) : (
            /* FORM STATE */
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              
              {/* Section A: Reporter Info */}
              <div>
                <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#001F3F", marginBottom: "16px", borderBottom: "1px solid #E2E8F0", paddingBottom: "8px" }}>Reporter Information (Optional)</h3>
                <p style={{ fontSize: "14px", color: "#64748B", marginBottom: "16px" }}>You may submit this report anonymously. Leave these fields blank if you wish to remain unidentified.</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#0F172A", marginBottom: "8px" }}>Full Name</label>
                    <input type="text" placeholder="Leave blank to remain anonymous" style={{ width: "100%", padding: "14px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "16px", outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#0F172A", marginBottom: "8px" }}>Email Address</label>
                    <input type="email" placeholder="For follow-up purposes" style={{ width: "100%", padding: "14px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "16px", outline: "none", boxSizing: "border-box" }} />
                  </div>
                </div>
              </div>

              {/* Section B: Incident Details */}
              <div>
                <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#001F3F", marginBottom: "16px", borderBottom: "1px solid #E2E8F0", paddingBottom: "8px", marginTop: "16px" }}>Incident Details</h3>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#0F172A", marginBottom: "8px" }}>Covered Entity / Ministry</label>
                    <input type="text" required placeholder="e.g., Ministry of Roads and Highways" style={{ width: "100%", padding: "14px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "16px", outline: "none", boxSizing: "border-box" }} />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#0F172A", marginBottom: "8px" }}>Project Name / Subject</label>
                    <input type="text" required placeholder="e.g., Tema Interchange Phase 2" style={{ width: "100%", padding: "14px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "16px", outline: "none", boxSizing: "border-box" }} />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#0F172A", marginBottom: "8px" }}>Category of Complaint (Section 44)</label>
                    <select required style={{ width: "100%", padding: "14px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "16px", outline: "none", backgroundColor: "#FFFFFF", cursor: "pointer", boxSizing: "border-box" }}>
                      <option value="">Select a category...</option>
                      <option value="Contract Price Inflation">Contract Price Inflation</option>
                      <option value="Cost Irregularity / Waste">Cost Irregularity / Waste</option>
                      <option value="Breach of Quality Standards">Breach of Quality Standards</option>
                      <option value="Abuse of Public Resources">Abuse of Public Resources</option>
                      <option value="Breach of VfM Standards">Breach of VfM Standards</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#0F172A", marginBottom: "8px" }}>Description of Issue</label>
                    <textarea required rows="5" placeholder="Please provide as much detail as possible. State the nature of the irregularity, when it occurred, and any officials or contractors involved." style={{ width: "100%", padding: "14px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "16px", outline: "none", resize: "vertical", boxSizing: "border-box" }} />
                  </div>
                </div>
              </div>

              {/* Section C: Evidence Upload */}
              <div style={{ marginTop: "16px" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#0F172A", marginBottom: "8px" }}>Upload Supporting Evidence</label>
                <div style={{ border: "2px dashed #CBD5E1", borderRadius: "12px", padding: "32px", textAlign: "center", backgroundColor: "#F8FAFC", position: "relative", cursor: "pointer" }}>
                  <input type="file" onChange={handleFileChange} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer" }} />
                  
                  <div style={{ width: "48px", height: "48px", backgroundColor: "#E2E8F0", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px auto" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                  </div>
                  
                  <p style={{ fontSize: "16px", fontWeight: "600", color: "#0F172A", margin: "0 0 4px 0" }}>
                    {fileName ? fileName : "Click to upload or drag and drop"}
                  </p>
                  <p style={{ fontSize: "13px", color: "#64748B", margin: 0 }}>PDF, DOCX, XLSX, or Images (Max 25MB)</p>
                </div>
                <p style={{ fontSize: "12px", color: "#64748B", marginTop: "8px" }}>Ensure documents are redacted if they contain sensitive personal information.</p>
              </div>

              {/* Section D: Legal Disclaimer */}
              <div style={{ backgroundColor: "#FFF7ED", padding: "16px", borderRadius: "8px", border: "1px solid #FED7AA", marginTop: "16px" }}>
                <label style={{ display: "flex", gap: "12px", alignItems: "flex-start", cursor: "pointer" }}>
                  <input 
                    type="checkbox" 
                    checked={agreedToTerms} 
                    onChange={(e) => setAgreedToTerms(e.target.checked)} 
                    style={{ marginTop: "4px", width: "18px", height: "18px", cursor: "pointer" }} 
                  />
                  <span style={{ fontSize: "13px", color: "#9A3412", lineHeight: "1.5", fontWeight: "500" }}>
                    I declare that the information provided in this report is true to the best of my knowledge. I understand that intentionally providing false or misleading information to the Office is a criminal offence under <strong>Section 54 of the Value for Money Office Act, 2026 (Act 1172)</strong>.
                  </span>
                </label>
              </div>

              {/* Section E: Submit Button */}
              <button 
                type="submit" 
                disabled={!agreedToTerms}
                style={{ 
                  backgroundColor: agreedToTerms ? "#001F3F" : "#94A3B8", 
                  color: "#FFFFFF", border: "none", padding: "18px", borderRadius: "8px", 
                  fontSize: "16px", fontWeight: "800", cursor: agreedToTerms ? "pointer" : "not-allowed", 
                  marginTop: "8px", transition: "background-color 0.2s ease" 
                }}
              >
                Submit Report Securely
              </button>
            </form>
          )}
        </div>

        {/* Footer Link to Track Complaint */}
        <div style={{ textAlign: "center", marginTop: "32px" }}>
          <Link to="/track" style={{ fontSize: "15px", color: "#001F3F", fontWeight: "700", textDecoration: "underline" }}>
            Already submitted a report? Track your complaint here.
          </Link>
        </div>

      </section>
    </div>
  );
}